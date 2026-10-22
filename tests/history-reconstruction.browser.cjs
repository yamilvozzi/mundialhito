// navegador completo con lectura/guardado simulados; sin Supabase real.
const {chromium}=require('playwright');
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const historicalState=require('./fixtures/historical-state.cjs');
const root=path.join(__dirname,'..');
(async()=>{
 const browser=await chromium.launch({headless:true,...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE?{executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE}:{})});
 try {for(const width of [1440,390]){
  let stored=historicalState(),writes=0;
  const page=await browser.newPage({viewport:{width,height:1000},serviceWorkers:'block'}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.exposeFunction('readStored',()=>structuredClone(stored));
  await page.exposeFunction('writeStored',row=>{stored=structuredClone(row.state);writes++;return {error:null};});
  await page.addInitScript(()=>{
   window.supabase={createClient:()=>({auth:{getSession:async()=>({data:{session:{user:{id:'test'}}}}),onAuthStateChange(){}},
    from:()=>({select:()=>({eq:async()=>({data:[{state:await window.readStored()}],error:null})}),upsert:row=>window.writeStored(row)})})};
  });
  await page.route('**/*',route=>{
   const url=new URL(route.request().url());
   if(url.hostname!=='mundialhito.test')return route.fulfill({status:200,contentType:'text/javascript',body:''});
   const file=path.join(root,url.pathname==='/'?'index.html':decodeURIComponent(url.pathname).slice(1));
   return route.fulfill(fs.existsSync(file)?{body:fs.readFileSync(file),contentType:file.endsWith('.html')?'text/html':file.endsWith('.js')?'text/javascript':'application/octet-stream'}:{status:404,body:''});
  });
  await page.goto('http://mundialhito.test/');await page.locator('#appScreen').waitFor({state:'visible'});
  const read=()=>page.evaluate(()=>({metrics:calcRachas(),state:structuredClone(state),pending:hayCambiosSinGuardar()}));
  const before=await read();assert.deepEqual(before.state,stored);assert.equal(writes,0);
  await page.evaluate(()=>irARachas());assert.deepEqual(await read(),before);assert.equal(writes,0);
  assert.deepEqual(before.metrics,{rwa:0,rwm:0,rla:0,rlm:0,cca:0,cmej:0,cpeo:0,fj:0,fg:0,fp:0});
  // Un estado anterior con una final por penales y acumuladores parciales.
  const legacy=historicalState();legacy.rachaResetIndex=0;legacy.rachaWinsMax=1;
  legacy.historial[6]={res:'draw',draw:true,texto:'27/07/26 · Gran Final — Empate → ganó por penales'};
  let expected;
  for(const visitFirst of [false,true]){
   stored=structuredClone(legacy);writes=0;await page.reload();await page.locator('#appScreen').waitFor({state:'visible'});
   const loaded=await read();assert.equal(writes,0);assert.equal(loaded.metrics.fg,8);assert.equal(loaded.metrics.cmej,7);assert.equal(loaded.metrics.cpeo,8);
   if(visitFirst){await page.evaluate(()=>irARachas());assert.deepEqual(await read(),loaded);assert.equal(writes,0);}
   await page.evaluate(()=>procesarResultado('win',false));const after=await read();
   if(expected)assert.deepEqual(after.metrics,expected);else expected=after.metrics;
   assert.equal(after.metrics.rwa,1);assert.equal(after.metrics.cca,4);assert.equal(after.metrics.fj,8);
   assert.equal(stored.historial.length,61);assert.deepEqual(stored.historial.slice(0,60),legacy.historial);
   assert.equal(stored.totalJugados,1);assert.equal(stored.copas,0);assert.equal('snapshot' in stored,false);
   const count=writes;await page.evaluate(()=>irARachas());assert.deepEqual(await read(),after);assert.equal(writes,count);
  }
  // Cambiar idioma no cambia métricas ni textos históricos; recargar conserva ambas cosas.
  await page.evaluate(async()=>{await irAConfig();onChangeIdioma('en');await vaciarGuardado();await irARachas();});
  assert.deepEqual((await read()).metrics,expected);assert.deepEqual(stored.historial.slice(0,60),legacy.historial);
  const count=writes;await page.reload();await page.locator('#appScreen').waitFor({state:'visible'});await page.evaluate(()=>irARachas());
  assert.deepEqual((await read()).metrics,expected);assert.equal(writes,count);
  if(process.env.QA_OUTPUT_DIR)await page.screenshot({path:path.join(process.env.QA_OUTPUT_DIR,`a8-rachas-${width}.png`),fullPage:true});
  assert.deepEqual(errors,[]);console.log(`OK ${width}px: corte 60, carga compatible, visita sin escrituras, orden de pantallas, nuevo partido, idioma y recarga`);
  await page.close();
 }}finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
