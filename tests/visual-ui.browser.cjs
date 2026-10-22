// Regresiones puntuales de presentación; Supabase simulado, sin datos remotos.
const { chromium } = require('playwright');
const fs = require('node:fs'), path = require('node:path'), assert = require('node:assert/strict');
const root = path.join(__dirname, '..');

(async () => {
  const browser = await chromium.launch({ headless: true, ...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE } : {}) });
  try {
    for (const width of [1440, 390]) {
      const page = await browser.newPage({ viewport: { width, height: 1000 }, hasTouch: width < 900, serviceWorkers: 'block' });
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.addInitScript(() => {
        window.supabase = { createClient: () => ({
          auth: { getSession: async () => ({ data: { session: { user: { id: 'test' } } } }), onAuthStateChange() {} },
          from: () => ({ select: () => ({ eq: async () => ({ data: [], error: null }) }), upsert: async () => ({ error: null }) })
        }) };
      });
      await page.route('**/*', route => {
        const url = new URL(route.request().url());
        if (url.hostname !== 'mundialhito.test') return route.fulfill({ body: '', contentType: 'text/javascript' });
        const file = path.join(root, url.pathname === '/' ? 'index.html' : decodeURIComponent(url.pathname).slice(1));
        return route.fulfill(fs.existsSync(file) ? { body: fs.readFileSync(file), contentType: file.endsWith('.html') ? 'text/html' : file.endsWith('.js') ? 'text/javascript' : 'application/octet-stream' } : { status: 404, body: '' });
      });
      const shot = async name => {
        if (process.env.QA_OUTPUT_DIR) await page.screenshot({ path: path.join(process.env.QA_OUTPUT_DIR, `ui-${name}-${width}.png`), fullPage: true, animations: 'disabled' });
      };
      await page.goto('http://mundialhito.test/');
      await page.locator('#appScreen').waitFor({ state: 'visible' });
      const baseline = await page.evaluate(() => JSON.stringify(state));

      if (width < 900) {
        // La primera apertura táctil y la vuelta a Inicio comparten el estado activo.
        const activeStyle = () => page.locator('#panelBtnApp').evaluate(el => ({
          active: el.classList.contains('active'), background: getComputedStyle(el).backgroundColor, outline: getComputedStyle(el).outlineStyle
        }));
        await page.locator('#btnAbrirPanel').tap();
        await page.waitForTimeout(220); // Fin de la transición visual del menú.
        const first = await activeStyle();
        assert.equal(first.active, true);
        assert.equal(first.background, 'rgba(255, 224, 51, 0.18)');
        assert.equal(first.outline, 'none');
        await shot('menu');
        await page.locator('#panelBtnActividad').tap();
        await page.locator('#btnAbrirPanelActividad').tap();
        await page.locator('#panelBtnApp').tap();
        await page.locator('#btnAbrirPanel').tap();
        await page.waitForTimeout(220);
        assert.deepEqual(await activeStyle(), first);
        await page.keyboard.press('Escape');
        // La apertura con teclado conserva foco visible y permite salir con Escape.
        await page.locator('#btnAbrirPanel').focus();
        await page.keyboard.press('Enter');
        assert.equal(await page.locator('#panelBtnApp').evaluate(el => el === document.activeElement && el.matches(':focus-visible')), true);
        await page.keyboard.press('Escape');
      }

      // Mismos SVG de Archivar e Historial en los seis sidebars.
      for (const selector of ['[data-nav-action="archivar"]', '[data-screen="historial"]']) {
        const icons = await page.locator('.dt-sidebar ' + selector + ' svg').evaluateAll(nodes => nodes.map(el => el.outerHTML));
        assert.equal(icons.length, 6);
        assert.equal(new Set(icons).size, 1);
      }

      await page.evaluate(() => irAActividad());
      const suffix = width >= 900 ? 'Dt' : 'Mob';
      for (const testWidth of [width, width >= 900 ? 900 : 320]) {
        await page.setViewportSize({ width: testWidth, height: 1000 });
        for (const locale of ['es', 'de', 'ja']) {
          await page.evaluate(locale => I18N.setLocale(locale), locale);
          const grid = await page.locator('#planDots' + suffix).evaluate(el => {
            const dots = [...el.children].map(dot => dot.getBoundingClientRect());
            const card = el.closest('.plan-card');
            const renew = document.createRange();
            renew.selectNodeContents(card.querySelector('.btn-plan-reset span'));
            return { rows: dots.reduce((rows, dot) => { rows[dot.top] = (rows[dot.top] || 0) + 1; return rows; }, {}),
              columns: new Set(dots.map(dot => dot.left)).size, overflow: card.scrollWidth > card.clientWidth,
              renewLines: new Set([...renew.getClientRects()].map(rect => rect.top)).size };
          });
          assert.deepEqual(Object.values(grid.rows), [5, 5], `${testWidth}px ${locale}`);
          assert.equal(grid.columns, 5);
          assert.equal(grid.overflow, false, `${testWidth}px ${locale}: contenido dentro de la tarjeta`);
          assert.equal(grid.renewLines, 1, `${testWidth}px ${locale}: Renovar legible en una línea`);
          if (testWidth !== width && locale === 'de') await shot(`actividad-${testWidth}-de`);
        }
      }
      await page.setViewportSize({ width, height: 1000 });
      await page.evaluate(() => I18N.setLocale('es'));
      if (width >= 900) {
        const panels = await page.locator('.actividad-panels > .result-section').evaluateAll(nodes => nodes.map(el => {
          const rect = el.getBoundingClientRect(), css = getComputedStyle(el);
          return { top: rect.top, bottom: rect.bottom, border: css.borderTopWidth, radius: css.borderRadius };
        }));
        assert.equal(panels.length, 2);
        assert.ok(panels[1].top - panels[0].bottom >= 14);
        assert.ok(panels.every(panel => panel.border === '1px' && panel.radius === '12px'));
      }
      await shot('actividad');

      // Archivar y nombre mantienen su borde de foco, sin segundo outline.
      for (const open of ['abrirModalArchivar', 'abrirModalNombre']) {
        await page.evaluate(name => window[name](), open);
        const input = page.locator(open === 'abrirModalArchivar' ? '#archivarNombre' : '#nombreInput');
        await page.waitForTimeout(220);
        const css = await input.evaluate(el => ({ outline: getComputedStyle(el).outlineStyle, border: getComputedStyle(el).borderTopColor }));
        assert.deepEqual(css, { outline: 'none', border: 'rgb(255, 224, 51)' });
        await page.keyboard.press('Escape');
      }
      await page.evaluate(() => irAApp());
      await page.locator('.btn-draw:visible').click();
      const choice = page.locator('.modal-btn-cara');
      assert.equal(await choice.evaluate(el => getComputedStyle(el).backgroundColor), 'rgba(255, 224, 51, 0.18)');
      if (width >= 900) {
        await choice.hover();
        await page.waitForTimeout(220);
        assert.equal(await choice.evaluate(el => getComputedStyle(el).backgroundColor), 'rgba(255, 224, 51, 0.28)');
      }
      await shot('moneda');
      await page.keyboard.press('Escape');
      assert.equal(await page.evaluate(() => JSON.stringify(state)), baseline);
      await page.evaluate(() => mostrarLogin());
      for (const id of ['loginEmail', 'loginPassword']) {
        await page.locator('#' + id).focus();
        await page.waitForTimeout(220);
        assert.deepEqual(await page.locator('#' + id).evaluate(el => ({ outline: getComputedStyle(el).outlineStyle, border: getComputedStyle(el).borderTopColor })),
          { outline: 'none', border: 'rgb(255, 224, 51)' });
      }
      assert.deepEqual(errors, []);
      console.log(`OK ${width}px: grilla 5+5 en tres idiomas y ancho límite, menú, iconos, paneles, inputs y elecciones de moneda`);
      await page.close();
    }
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
