// diez idiomas en desktop/mobile, historial y métricas intactos.
const { chromium } = require('playwright');
const fs = require('node:fs'), path = require('node:path'), assert = require('node:assert/strict');
const root = path.join(__dirname, '..');
const historicalState = require('./fixtures/historical-state.cjs');
const vm = require('node:vm');
const dictionaries = {};
for (const file of fs.readdirSync(path.join(root, 'i18n')).filter(f=>!['i18n.js','template.js'].includes(f))) {
  vm.runInNewContext(fs.readFileSync(path.join(root,'i18n',file),'utf8'), {I18N:{registrarIdioma:(code,dict)=>{dictionaries[code]=dict;}}});
}
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
          return Promise.resolve({ data: table === 'racha_seasons' ? [{id:'archived',name:'Archivo de prueba',created_at:'2026-08-01T12:00:00Z',data:{rachaWinsMax:9,rachaLossMax:2,copaMejorCampaña:7,copaPeorCampaña:12,finalesJugadas:4,finalesGanadas:3,finalesPerdidas:1}}] : [], error: null });
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
              ? Promise.resolve({ data: [{state: window.fixture}], error: null }) : { order: () => response(table, 'read', user) } }),
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
      const fixture=historicalState(); fixture.rachaResetIndex=0; fixture.totalJugados=60; fixture.fase='FINAL';
      await page.addInitScript(fixture=>{window.fixture=fixture;},fixture);
      await page.goto('http://mundialhito.test/');
      await page.locator('#appScreen').waitFor({ state: 'visible' });

      const stateOnly = () => page.evaluate(() => { const {idioma,...rest}=state;return rest; });
      const baseline = await stateOnly();
      const metrics = await page.evaluate(()=>calcRachas());
      const functions = {app:'irAApp',actividad:'irAActividad',historial:'irAHistorial',rachas:'irARachas',histRachas:'irAHistRachas',config:'irAConfig'};
      for (const [locale,dict] of Object.entries(dictionaries)) {
        await page.evaluate(()=>irAConfig());
        await page.locator('#configIdioma'+(width===390?'Mob':'Dt')).selectOption(locale);
        await page.evaluate(()=>vaciarGuardado());
        assert.equal(await page.locator('html').getAttribute('lang'),locale);
        const attributes=await page.evaluate(()=>{
          const errors=[];
          for(const [attr,prop] of [['data-i18n','textContent'],['data-i18n-placeholder','placeholder'],['data-i18n-title','title'],['data-i18n-aria-label','ariaLabel']]){
            document.querySelectorAll('['+attr+']').forEach(el=>{const key=el.getAttribute(attr);if(el[prop]!==I18N.t(key))errors.push(key);});
          }
          return errors;
        });
        assert.deepEqual(attributes,[],locale+' atributos traducidos');
        for(const screen of screens){
          await page.evaluate(fn=>window[fn](),functions[screen]);
          assert.deepEqual(await stateOnly(),baseline,locale+' '+screen+' no cambia datos deportivos');
          assert.deepEqual(await page.evaluate(()=>calcRachas()),metrics);
        }
        await page.evaluate(()=>irAApp());
        for(const suffix of ['Mob','Dt'])assert.equal(await page.locator('#faseNombre'+suffix).textContent(),dict.phase.name.FINAL);
        for(const id of ['brm-FINAL','brd-FINAL'])assert.equal(await page.locator('#'+id+' .br-label').textContent(),dict.bracket.final);
        for(const suffix of ['Mob','Dt'])assert.equal(await page.locator('#planDots'+suffix+' .current').getAttribute('title'),dict.plan.nextMatch.replace('{{number}}','1'));
        for(const status of ['saving','saved','error']){
          await page.evaluate(status=>actualizarEstadoGuardado(status),status);
          assert.equal(await page.locator('#saveStatusText').textContent(),dict.persistence[status]);
        }
        await page.evaluate(()=>actualizarEstadoGuardado(null));
        await page.evaluate(()=>irARachas());
        const streaks=await page.locator('#rachasContenido'+(width===390?'Mob':'Dt')).textContent();
        assert.ok(streaks.includes(dict.rachas.fastestCup));assert.ok(streaks.includes(dict.rachas.longestCup));
        await page.evaluate(()=>irAHistRachas());
        const archived=await page.locator('#histRachasLista'+(width===390?'Mob':'Dt')).textContent();
        assert.ok(archived.includes(dict.streakHistory.fastestCup));assert.ok(archived.includes(dict.streakHistory.longestCup));
        assert.ok(archived.includes('12'));assert.ok(archived.includes('7'));
        assert.doesNotMatch(archived,/\{\{|\}\}/);
        for(const row of await page.evaluate(()=>mock.writes)){
          const {idioma,snapshot,...rest}=row.state;const {snapshot:ignored,...expected}=baseline;
          assert.deepEqual(rest,expected,'solo se guarda la preferencia de idioma');
        }
        if(process.env.QA_OUTPUT_DIR && ['en','de','ja','zh'].includes(locale)){
          for(const screen of ['app','rachas','histRachas','config']){
            await page.evaluate(fn=>window[fn](),functions[screen]);
            await page.screenshot({path:path.join(process.env.QA_OUTPUT_DIR,'b6-'+locale+'-'+screen+'-'+width+'.png'),fullPage:true});
          }
        }
      }
      assert.deepEqual(errors,[]);
      console.log('OK '+width+'px: diez idiomas, seis pantallas, FINAL visual, interpolación, estados de guardado, copas actuales/archivadas y datos intactos');
      await page.close();
    }
  } finally { await browser.close(); }
})().catch(error=>{console.error(error);process.exitCode=1;});
