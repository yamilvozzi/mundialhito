// todos los destinos desde las seis pantallas, sin Supabase real.
const { chromium } = require('playwright');
const fs = require('node:fs'), path = require('node:path'), assert = require('node:assert/strict');
const root = path.join(__dirname, '..');
const screens = ['app', 'actividad', 'historial', 'rachas', 'histRachas', 'config'];
(async () => {
  const browser = await chromium.launch({ headless: true, ...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE } : {}) });
  try {
    for (const width of [1440, 390]) {
      const page = await browser.newPage({ viewport: { width, height: 1000 }, serviceWorkers: 'block' });
      const errors = [];
      page.on('pageerror', e => errors.push(e.message));
      await page.addInitScript(() => {
        window.mock = { user: 'alice', pending: [], hold: false, writes: [], failSave: false };
        const response = (table, action, user) => {
          if (mock.hold) return new Promise(resolve => mock.pending.push({ table, action, user, resolve }));
          return Promise.resolve({ data: [], error: null });
        };
        window.supabase = { createClient: () => ({
          auth: {
            getSession: async () => ({ data: { session: { user: { id: mock.user } } } }),
            onAuthStateChange: fn => { mock.authEvent = fn; },
            signInWithPassword: async () => ({ data: { user: { id: mock.user } }, error: null }),
            signOut: async () => { mock.authEvent('SIGNED_OUT', null); return { error: null }; }
          },
          from: table => ({
            select: () => ({ eq: (_key, user) => table === 'game_state'
              ? Promise.resolve({ data: [], error: null }) : { order: () => response(table, 'read', user) } }),
            insert: row => { mock.writes.push(row); return response(table, 'insert', row.user_id); },
            delete: () => ({ eq: () => ({ eq: (_key, user) => response(table, 'delete', user) }) }),
            upsert: async row => { mock.writes.push(row); return { error: mock.failSave ? { message: 'test failure' } : null }; }
          })
        }) };
      });
      await page.route('**/*', route => {
        const url = new URL(route.request().url());
        if (url.hostname !== 'mundialhito.test') return route.fulfill({ status: 200, contentType: 'text/javascript', body: '' });
        const file = path.join(root, url.pathname === '/' ? 'index.html' : decodeURIComponent(url.pathname).slice(1));
        return route.fulfill(fs.existsSync(file) ? { body: fs.readFileSync(file), contentType: file.endsWith('.html') ? 'text/html' : 'text/javascript' } : { status: 404, body: '' });
      });
      await page.goto('http://mundialhito.test/');
      await page.locator('#appScreen').waitFor({ state: 'visible' });
      async function login(user = 'bob') {
        await page.evaluate(user => { mock.user = user; }, user);
        await page.locator('#loginEmail').fill('test@example.invalid');
        await page.locator('#loginPassword').fill('test-only');
        await page.locator('#btnLogin').click();
        await page.locator('#appScreen').waitFor({ state: 'visible' });
      }
      async function signedOut() {
        assert.equal(await page.locator('#loginScreen').isVisible(), true);
        for (const screen of screens) assert.equal(await page.locator(`#${screen}Screen`).isVisible(), false, screen);
        assert.equal(await page.evaluate(() => pantallaActiva), 'app');
        assert.equal(await page.evaluate(() => document.body.innerText.includes('PRIVADO')), false);
        assert.equal(await page.locator('#loginPassword').inputValue(), '');
        assert.equal(await page.locator('.modal-overlay.show, #panelLateral.show, #panelOverlay.show').count(), 0);
      }
      const functions = {app:'irAApp',actividad:'irAActividad',historial:'irAHistorial',rachas:'irARachas',histRachas:'irAHistRachas',config:'irAConfig'};
      const toggles={app:'btnAbrirPanel',actividad:'btnAbrirPanelActividad',historial:'btnAbrirPanelHistorial',rachas:'btnAbrirPanelRachas',histRachas:'btnAbrirPanelHistRachas',config:'btnAbrirPanelConfig'};
      await page.evaluate(() => {
        window.renderCalls=0;
        for(const name of ['renderizar','renderizarHistorial','renderizarRachas','renderizarHistRachas','renderizarConfig']){
          const original=window[name];window[name]=function(...args){renderCalls++;return original.apply(this,args);};
        }
      });
      const baseline=await page.evaluate(()=>JSON.stringify(state));
      async function menu(source){
        if(width===390){await page.locator('#'+toggles[source]).click();return page.locator('#panelLateral');}
        return page.locator('#'+source+'Screen .dt-sidebar');
      }
      for(const source of screens)for(const target of screens){
        await page.evaluate(fn=>window[fn](),functions[source]);
        const nav=await menu(source);
        await page.evaluate(()=>{renderCalls=0;});
        await nav.locator('[data-screen="'+target+'"]').click();
        await page.waitForFunction(target=>pantallaActiva===target,target);
        assert.equal(await page.evaluate(()=>renderCalls),1,source+' -> '+target+' ejecuta una vez');
        for(const screen of screens)assert.equal(await page.locator('#'+screen+'Screen').isVisible(),screen===target);
        assert.equal(await page.locator('#panelLateral').isVisible(),false);
        assert.equal(await page.locator('.dt-sidebar [data-screen].active').count(),6);
        assert.equal(await page.locator('.dt-sidebar [data-screen="'+target+'"].active').count(),6);
        assert.equal(await page.locator('#panelLateral [data-screen].active').count(),1);
        assert.equal(await page.locator('#panelLateral [data-screen="'+target+'"].active').count(),1);
        // Cambiar de layout no altera la pantalla ni deja activo otro destino.
        await page.setViewportSize({width:width===1440?390:1440,height:1000});
        assert.equal(await page.locator('#'+target+'Screen').isVisible(),true);
        await page.setViewportSize({width,height:1000});
      }
      assert.equal(await page.evaluate(()=>JSON.stringify(state)),baseline);
      assert.equal(await page.evaluate(()=>mock.writes.length),0);
      for(const source of screens){
        await page.evaluate(fn=>window[fn](),functions[source]);
        const nav=await menu(source);
        await nav.locator('[data-nav-action="archivar"]').click();
        assert.equal(await page.locator('#archivarOverlay').isVisible(),true);
        assert.equal(await page.evaluate(()=>archTipoActual),'temporada','archivar selecciona Temporada por defecto');
        assert.equal(await page.evaluate(()=>document.activeElement.id),'archivarNombre');
        await page.keyboard.press('Escape');
        assert.equal(await page.locator('#archivarOverlay').isVisible(),false);
        assert.equal(await page.evaluate(()=>mock.writes.length),0);
        if(process.env.QA_OUTPUT_DIR)await page.screenshot({path:path.join(process.env.QA_OUTPUT_DIR,`e4-${source}-${width}.png`)});
      }
      for(const source of screens){
        await page.evaluate(fn=>window[fn](),functions[source]);
        const nav=await menu(source);await nav.locator('[data-nav-action="logout"]').click();
        await page.locator('#loginScreen').waitFor({state:'visible'});await signedOut();await login();
      }
      assert.deepEqual(errors,[]);
      console.log(`OK ${width}px: 36 rutas, un render por clic, activos, cambio de layout, archivar y logout desde seis pantallas; sin escrituras`);
      await page.close();
    }
  } finally { await browser.close(); }
})().catch(error=>{console.error(error);process.exitCode=1;});
