// navegador completo con lectura/guardado simulados; sin Supabase real.
const {chromium}=require('playwright');
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const historicalState=require('./fixtures/historical-state.cjs');
const root=path.join(__dirname,'..');
(async()=>{
 const browser=await chromium.launch({headless:true,...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE?{executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE}:{})});
 try {for(const width of [1440,390]){
  let stored=historicalState(),writes=0;
  const page=await browser.newPage({viewport:{width,height:1000},hasTouch:true,serviceWorkers:'block'}),errors=[];
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

  const suffix=width===1440?'Dt':'Mob';
  const ax=await page.context().newCDPSession(page);
  async function closed(){
   assert.equal(await page.locator('[role="dialog"]:visible').count(),0);
   const tree=await ax.send('Accessibility.getFullAXTree');assert.equal(tree.nodes.filter(n=>!n.ignored&&n.role?.value==='dialog').length,0);
  }
  async function trapped(id){
   assert.equal(await page.locator('#'+id).getAttribute('aria-modal'),'true');
   for(const key of ['Tab','Shift+Tab'])for(let i=0;i<12;i++){
    await page.keyboard.press(key);
    assert.equal(await page.evaluate(id=>document.getElementById(id).contains(document.activeElement),id),true,key+' '+id);
   }
   const tree=await ax.send('Accessibility.getFullAXTree');
   assert.equal(tree.nodes.filter(n=>!n.ignored&&n.role?.value==='dialog').length,1);
   assert.equal(await page.evaluate(()=>document.getElementById('loginScreen').inert),true);
  }
  await closed();const baseline=await page.evaluate(()=>JSON.stringify(state));
  await page.evaluate(()=>irAConfig());
  for(const field of ['Nacionalidad','Idioma','Celebraciones','Sonido','Volumen']){
   const id='config'+field+suffix;const label=await page.locator('#'+id).getAttribute('aria-labelledby');
   assert.ok(await page.locator('#'+label).textContent());
  }
  const nameButton=page.locator('#btnAbrirNombre'+suffix);
  await nameButton.click();assert.equal(await page.evaluate(()=>document.activeElement.id),'nombreInput');
  await trapped('nombreOverlay');await page.keyboard.press('Escape');await closed();assert.equal(await nameButton.evaluate(el=>el===document.activeElement),true);
  await nameButton.tap();await page.locator('#nombreInput').fill('No guardar');await page.locator('#btnNombreCancelar').tap();await closed();
  // Archivo, incluyendo panel móvil con foco contenido y salida por Escape.
  if(width===390){
   await page.locator('#btnAbrirPanelConfig').tap();await trapped('panelLateral');await page.keyboard.press('Escape');await closed();
   assert.equal(await page.evaluate(()=>document.activeElement.id),'btnAbrirPanelConfig');
   await page.locator('#btnAbrirPanelConfig').tap();await page.locator('#panelBtnArchivar').tap();
  }else await page.locator('#dtBtnArchivarFromConfig').click();
  assert.equal(await page.evaluate(()=>document.activeElement.id),'archivarNombre');await trapped('archivarOverlay');await page.keyboard.press('Escape');await closed();
  await page.evaluate(()=>irAApp());
  const draw=page.locator('.btn-draw:visible');await draw.focus();await page.keyboard.press('Enter');
  assert.equal(await page.evaluate(()=>document.activeElement.classList.contains('modal-btn-cara')),true);
  await trapped('modalOverlay');await page.keyboard.press('Escape');await closed();assert.equal(await draw.evaluate(el=>el===document.activeElement),true);
  assert.equal(await page.evaluate(()=>JSON.stringify(state)),baseline);assert.equal(writes,0);
  // Antes de lanzar se puede cancelar incluso después de elegir cara/ceca.
  for(const action of ['cancel','escape']){
   await draw.tap();await page.locator('.modal-btn-cara').click();
   if(action==='cancel')await page.locator('#btnCancelarEmpate').tap();else await page.keyboard.press('Escape');
   await closed();assert.equal(await page.evaluate(()=>JSON.stringify(state)),baseline);assert.equal(writes,0);
  }
  // La propia moneda es el control de lanzamiento por mouse, touch y teclado.
  for(const action of ['click','tap','Enter','Space']){
   await draw.click();await page.locator('.modal-btn-cara').click();
   const coin=page.locator('#moneda');assert.equal(await page.evaluate(()=>document.activeElement.id),'moneda');
   if(action==='click')await coin.click();else if(action==='tap')await coin.tap();else await coin.press(action);
   assert.equal(await page.locator('#btnCancelarEmpate').isDisabled(),true);
   await page.keyboard.press('Escape');await page.evaluate(()=>cancelarEmpate());
   assert.equal(await page.locator('#modalOverlay').isVisible(),true);
   await page.keyboard.press('Tab');await page.keyboard.press('Shift+Tab');
   assert.equal(await page.evaluate(()=>document.getElementById('modalOverlay').contains(document.activeElement)),true);
   await page.locator('#btnConfirmar').waitFor({state:'visible'});
   const result=await page.evaluate(()=>pendingResult);
   await page.keyboard.press('Escape');
   await page.locator('#modalOverlay').click({position:{x:5,y:5}});
   await page.evaluate(()=>{cancelarEmpate();abrirModal();elegir('ceca');});
   assert.equal(await page.locator('#modalOverlay').isVisible(),true);
   assert.equal(await page.evaluate(()=>pendingResult),result);
   await trapped('modalOverlay');
   const count=['click','tap','Enter','Space'].indexOf(action)+1;
   assert.equal(writes,count-1);
   await page.locator('#btnConfirmar').press('Enter');
   await page.waitForFunction(n=>state.totalJugados===n&&!hayCambiosSinGuardar(),count);
   await page.evaluate(()=>confirmarEmpate());assert.equal(writes,count);assert.equal(stored.totalEmpatados,count);await closed();
   assert.equal(await draw.evaluate(el=>el===document.activeElement),true);
  }
  // Confirmación genérica: Escape cancela y restaura su disparador.
  const reset=page.locator('#btnReiniciar'+suffix);await reset.click();assert.equal(await page.evaluate(()=>document.activeElement.id),'confirmCancel');
  const beforeReset=await page.evaluate(()=>JSON.stringify(state));await trapped('confirmOverlay');await page.keyboard.press('Escape');await closed();
  assert.equal(await reset.evaluate(el=>el===document.activeElement),true);assert.equal(await page.evaluate(()=>JSON.stringify(state)),beforeReset);assert.equal(writes,4);
  // Campeonato ya registrado: Escape equivale a Continuar, no registra ni revierte.
  await page.evaluate(()=>{state.celebracionesActivas=false;state.sonidoActivo=false;mostrarModalCampeon();});
  assert.equal(await page.evaluate(()=>document.activeElement.id),'btnChampionContinue');await trapped('championModalOverlay');
  await page.keyboard.press('Escape');await closed();assert.equal(writes,4);
  // Ningún control de overlays cerrados puede recibir foco programático.
  await page.evaluate(()=>document.getElementById('moneda').focus());assert.notEqual(await page.evaluate(()=>document.activeElement.id),'moneda');
  assert.deepEqual(errors,[]);console.log(`OK ${width}px: mouse/touch, Tab/Shift+Tab, Escape, foco, árbol accesible, fondo inert, cancelación y confirmación única`);
  await page.close();
 }}finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
