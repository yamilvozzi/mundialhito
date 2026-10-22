const {chromium}=require('playwright');
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.join(__dirname,'..');
const names=['Temporada 2026','Peña Ñandú — José & Ana "A" \'B\'','<b>texto</b>','<script>window.injected=true</script>','<img src=x onerror="window.injected=true">','</div><svg onload="window.injected=true">','&lt;b&gt;literal&lt;/b&gt;'];
(async()=>{
 const browser=await chromium.launch({headless:true,...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE?{executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE}:{})});
 let checks=0;
 try{for(const width of [1440,390]){
  const page=await browser.newPage({viewport:{width,height:1000},serviceWorkers:'block'}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.addInitScript(()=>{
   window.mock={rows:[],deletes:[]};
   window.supabase={createClient:()=>({auth:{getSession:async()=>({data:{session:{user:{id:'test'}}}}),onAuthStateChange(){}},
    from:table=>({select:()=>({eq:()=>table==='game_state'?Promise.resolve({data:[],error:null}):{order:async()=>({data:structuredClone(mock.rows),error:null})}}),
    delete:()=>({eq:(_key,id)=>({eq:async()=>{mock.deletes.push({table,id});return {error:null};}})})})})};
  });
  await page.route('**/*',async route=>{
   const url=new URL(route.request().url());
   if(url.hostname!=='mundialhito.test')return route.fulfill({status:200,contentType:'text/javascript',body:''});
   const file=path.join(root,url.pathname==='/'?'index.html':decodeURIComponent(url.pathname).slice(1));
   if(!fs.existsSync(file))return route.fulfill({status:404,body:''});
   return route.fulfill({body:fs.readFileSync(file),contentType:path.extname(file)==='.html'?'text/html':path.extname(file)==='.js'?'text/javascript':'application/octet-stream'});
  });
  await page.goto('http://mundialhito.test/');await page.locator('#appScreen').waitFor({state:'visible'});
  const hostileId='x\'");window.injected=true;//" data-extra="x';
  const rows=names.map((name,i)=>({id:i===0?hostileId:String(i),name,created_at:'2026-01-02T12:00:00Z',jugados:12,ganados:7,empatados:2,perdidos:3,copas:1,data:{rachaWinsMax:3,rachaLossMax:2,copaMejorCampaña:7,copaPeorCampaña:12,finalesJugadas:3,finalesGanadas:1,finalesPerdidas:2}}));
  await page.evaluate(async rows=>{mock.rows=rows;await renderizarHistorial();await renderizarHistRachas();},rows);
  for(const [list,cls] of [['historialListaMob','temporada-nombre'],['historialListaDt','temporada-nombre'],['histRachasListaMob','racha-arch-nombre'],['histRachasListaDt','racha-arch-nombre']]){
   assert.deepEqual(await page.locator(`#${list} .${cls}`).allTextContents(),names);checks+=names.length;
   assert.equal(await page.locator(`#${list} script, #${list} img, #${list} svg, #${list} b`).count(),0);
   assert.equal(await page.locator(`#${list} [onclick]`).count(),0);
   assert.deepEqual(await page.locator(`#${list} button`).evaluateAll(buttons=>buttons.map(b=>b.getAttribute('aria-label'))),names.map(()=>'Eliminar'));
  }
  assert.deepEqual(await page.evaluate(()=>mock.rows),rows,'no cambiar registros existentes');
  for(const locale of ['en','ja']){
   const label=await page.evaluate(async locale=>{I18N.setLocale(locale);await renderizarHistorial();await renderizarHistRachas();return I18N.t('common.delete');},locale);
   for(const list of ['historialListaMob','historialListaDt','histRachasListaMob','histRachasListaDt']){
    assert.deepEqual(await page.locator(`#${list} button`).evaluateAll(buttons=>buttons.map(b=>b.getAttribute('aria-label'))),names.map(()=>label));
   }
  }
  assert.equal(await page.evaluate(()=>window.injected),undefined);
  // Historial reciente: texto y atributo de resultado tampoco deben crear HTML.
  await page.evaluate(()=>{state.historial=[{res:'win" onclick="window.injected=true',texto:'<img src=x onerror="window.injected=true">'}];renderizar();});
  assert.equal(await page.locator('#historialMob span').textContent(),'<img src=x onerror="window.injected=true">');
  assert.equal(await page.locator('#historialMob img, #historialDt img, #historialMob [onclick]').count(),0);
  // El ID pasa como dato al handler, sin evaluación como JavaScript ni selector interpolado.
  await page.evaluate(async()=>{confirmar=async()=>true;document.querySelector('#historialListaDt button').click();});
  await page.waitForFunction(()=>mock.deletes.length===1);
  await page.waitForFunction(()=>document.querySelectorAll('.temporada-card').length===12);
  assert.equal((await page.evaluate(()=>mock.deletes))[0].id,hostileId);
  await page.evaluate(()=>document.querySelector('#histRachasListaDt button').click());
  await page.waitForFunction(()=>mock.deletes.length===2);
  await page.waitForFunction(()=>document.querySelectorAll('.racha-arch-card').length===12);
  assert.equal((await page.evaluate(()=>mock.deletes))[1].id,hostileId);
  // Una fecha ausente o inválida no debe inventar una fecha de archivo.
  await page.evaluate(()=>{I18N.setLocale('es');});
  for(const created_at of [null,undefined,'fecha inválida']){
   await page.evaluate(async row=>{mock.rows=[row];await renderizarHistorial();await renderizarHistRachas();},{...rows[0],created_at});
   for(const selector of ['.temporada-fecha','.racha-arch-fecha']){
    assert.deepEqual(await page.locator(selector).allTextContents(),['Archivado el —','Archivado el —']);
   }
  }
  // Render normal para revisar tarjetas reales con las hojas de estilo existentes.
  await page.evaluate(async rows=>{mock.rows=rows;await irAHistorial();},rows.slice(0,2));
  if(process.env.QA_OUTPUT_DIR)await page.screenshot({path:path.join(process.env.QA_OUTPUT_DIR,`archivos-temporadas-${width}.png`),fullPage:true});
  await page.evaluate(()=>irAHistRachas());
  if(process.env.QA_OUTPUT_DIR)await page.screenshot({path:path.join(process.env.QA_OUTPUT_DIR,`archivos-rachas-${width}.png`),fullPage:true});
  assert.equal(await page.evaluate(()=>window.injected),undefined);assert.deepEqual(errors,[]);
  console.log(`OK ${width}px: ambas listas desktop/mobile, texto literal, payloads sin ejecución, historial, IDs y eliminación`);
  await page.close();
 }}finally{await browser.close();}
 console.log(`${checks} comprobaciones de nombres; sin acceso a Supabase real.`);
})().catch(e=>{console.error(e);process.exitCode=1;});
