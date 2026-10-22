// aplicación completa, red interceptada; nunca usa Supabase real.
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
      // Salir de cada pantalla, y entrar de nuevo, sin residuos ni doble pantalla.
      for (const fn of ['irAApp', 'irAActividad', 'irAHistorial', 'irARachas', 'irAHistRachas', 'irAConfig']) {
        await page.evaluate(async fn => { state.nombrePerfil = 'PRIVADO'; actualizarSubtitulosPerfil(); await window[fn](); }, fn);
        if (process.env.QA_OUTPUT_DIR && fn === 'irAConfig') await page.screenshot({ path: path.join(process.env.QA_OUTPUT_DIR, `a7-config-${width}.png`) });
        await page.evaluate(() => logout());
        await signedOut();
        await login();
        assert.equal(await page.locator('#appScreen').isVisible(), true);
        assert.equal(await page.evaluate(() => panelAbierto), false);
      }
      // Cierre forzado con confirmación pendiente y, por separado, moneda comprometida.
      await page.evaluate(() => {
        abrirModalNombre(); abrirModalArchivar(); abrirPanel();
        window.confirmed = null; confirmar('PRIVADO', 'PRIVADO').then(ok => window.confirmed = ok);
        document.getElementById('championModalOverlay').classList.add('show');
        mock.authEvent('SIGNED_OUT', null);
      });
      await signedOut();
      assert.equal(await page.evaluate(() => confirmed), false);
      await login('alice');
      await page.evaluate(() => {
        abrirModal(); elegir('cara'); document.getElementById('moneda').click();
        mock.authEvent('SIGNED_OUT', null);
      });
      await signedOut();
      await login('alice');
      await page.waitForTimeout(900); // Vence el temporizador real de moneda de la sesión anterior.
      assert.equal(await page.evaluate(() => pendingResult), null);
      assert.equal(await page.locator('#modalResultado').textContent(), '');
      // Lecturas pendientes (éxito y error), incluso reingreso con la misma cuenta.
      for (const error of [null, { message: 'old error' }]) {
        await page.evaluate(() => { mock.hold = true; renderizarHistorial(); renderizarHistRachas(); });
        await page.evaluate(() => mock.authEvent('SIGNED_OUT', null));
        await login('alice');
        await page.evaluate(error => {
          mock.hold = false;
          mock.pending.splice(0).forEach(p => p.resolve({ data: [{ id: 'old', name: 'PRIVADO', data: {}, created_at: '2026-01-01' }], error }));
        }, error);
        assert.equal(await page.locator('#historialListaDt').textContent(), '');
        assert.equal(await page.locator('#histRachasListaDt').textContent(), '');
      }
      // Insertar y borrar ya enviados pertenecen a la cuenta original; sus respuestas no afectan a la nueva.
      for (const type of ['temporada', 'rachas']) {
        await page.evaluate(type => {
          mock.hold = true; abrirModalArchivar(type);
          document.getElementById('archivarNombre').value = 'PRIVADO';
          document.getElementById('btnArchivarGuardar').click();
          (type === 'temporada' ? eliminarTemporada : eliminarRachaArch)('old');
          document.getElementById('confirmOk').click();
        }, type);
        await page.waitForFunction(() => mock.pending.length === 2);
        assert.equal(await page.evaluate(() => mock.pending.every(p => p.user === 'alice')), true);
        await page.evaluate(() => mock.authEvent('SIGNED_OUT', null));
        await login('bob');
        await page.evaluate(() => {
          abrirModalArchivar(); document.getElementById('archivarNombre').value = 'NUEVO';
          mock.hold = false; mock.pending.splice(0).forEach(p => p.resolve({ error: null }));
        });
        assert.equal(await page.locator('#archivarOverlay').evaluate(el => el.classList.contains('show')), true);
        assert.equal(await page.locator('#archivarNombre').inputValue(), 'NUEVO');
        assert.equal(await page.locator('#flash').textContent(), '');
        assert.equal(await page.locator('#btnArchivarGuardar').isEnabled(), true);
        await page.evaluate(() => mock.authEvent('SIGNED_OUT', null));
        await login('alice');
      }
      // Fallar al guardar mantiene cuenta, pantalla y cambios. Reintentar permite salir.
      await page.evaluate(async () => { await irAConfig(); mock.failSave = true; state.nombrePerfil = 'Conservar'; guardarConDebounce(); await logout(); });
      assert.equal(await page.locator('#configScreen').isVisible(), true);
      assert.equal(await page.evaluate(() => state.nombrePerfil), 'Conservar');
      assert.equal(await page.evaluate(() => document.body.inert), false);
      await page.evaluate(async () => { mock.failSave = false; await logout(); });
      await signedOut();
      // Ninguna navegación protegida puede abrirse sin sesión.
      await page.evaluate(async () => { await irAConfig(); await irAHistRachas(); abrirPanel(); abrirModalNombre(); });
      await signedOut();
      if (process.env.QA_OUTPUT_DIR) await page.screenshot({ path: path.join(process.env.QA_OUTPUT_DIR, `a7-login-${width}.png`) });
      assert.deepEqual(errors, []);
      console.log(`OK ${width}px: 6 pantallas, overlays, moneda, confirmación, respuestas tardías, cambio de cuenta y fallo/reintento de logout`);
      await page.close();
    }
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
