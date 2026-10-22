// copas y posición del menú entre las seis pantallas, sin Supabase real.
const { chromium } = require('playwright');
const fs = require('node:fs'), path = require('node:path'), assert = require('node:assert/strict');
const root = path.join(__dirname, '..');
const screens = ['app', 'actividad', 'historial', 'rachas', 'histRachas', 'config'];
(async () => {
  const browser = await chromium.launch({ headless: true, ...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE } : {}) });
  try {
    for (const width of [900, 1024, 1440, 1920, 390]) {
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

      const functions = {app:'irAApp',actividad:'irAActividad',historial:'irAHistorial',rachas:'irARachas',histRachas:'irAHistRachas',config:'irAConfig'};
      let expectedGeometry;
      for (const cups of [0, 1, 8, 12, 0]) {
        await page.evaluate(cups => { state.copas=cups; renderizar(); }, cups);
        const baseline=await page.evaluate(()=>JSON.stringify(state));
        for (const source of screens) for (const target of screens) {
          await page.evaluate(fn=>window[fn](),functions[source]);
          if(width>=900) await page.locator('#'+source+'Screen .dt-sidebar [data-screen="'+target+'"]').click();
          else await page.evaluate(fn=>window[fn](),functions[target]);
          const block=page.locator('#copasNumDt');
          assert.equal(await block.textContent(),String(cups));
          assert.equal(await page.locator('#copasIconsDt .trophy-icon').count(),Math.min(cups,8));
          assert.equal(await page.locator('#copasNumMob').textContent(),String(cups));
          assert.equal(await block.isVisible(),width>=900);
          if(width>=900){
            const geometry=await page.locator('#'+target+'Screen .dt-sidebar').evaluate(el=>{
              const rect=e=>{const r=e.getBoundingClientRect();return [r.x,r.y,r.width,r.height];};
              return [rect(el.querySelector('.dt-sidebar-header')), ...Array.from(el.querySelectorAll('.dt-nav [data-screen]'),rect)];
            });
            expectedGeometry ||= geometry;
            assert.deepEqual(geometry,expectedGeometry,'menú estable '+source+' -> '+target+' con '+cups+' copas');
          }
          assert.equal(await page.evaluate(()=>JSON.stringify(state)),baseline);
        }
        if(process.env.QA_OUTPUT_DIR && cups===8){
          for(const screen of screens){
            await page.evaluate(fn=>window[fn](),functions[screen]);
            await page.screenshot({path:path.join(process.env.QA_OUTPUT_DIR,'b8-'+screen+'-'+width+'.png')});
          }
        }
      }
      assert.equal(await page.evaluate(()=>mock.writes.length),0);
      assert.deepEqual(errors,[]);
      console.log('OK '+width+'px: 180 transiciones, copas 0/1/8/12/0, geometría estable, sin escrituras');
      await page.close();
    }
  } finally { await browser.close(); }
})().catch(error=>{console.error(error);process.exitCode=1;});
