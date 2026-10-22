const {chromium}=require('playwright');
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.join(__dirname,'..');
(async()=>{
 const browser=await chromium.launch({headless:true,...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE?{executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE}:{})});
 let stored=null,writes=0,fail=false;
 try {
 const page=await browser.newPage({viewport:{width:1440,height:1000},serviceWorkers:'block'}),errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.exposeFunction('readStored',()=>stored);
 await page.exposeFunction('writeStored',row=>{writes++;if(fail)return {error:{message:'test failure'}};stored=structuredClone(row.state);return {error:null};});
 await page.addInitScript(()=>{
  window.supabase={createClient:()=>({auth:{getSession:async()=>({data:{session:{user:{id:'test'}}}}),onAuthStateChange(){}},
   from:()=>({select:()=>({eq:async()=>{const state=await window.readStored();return {data:state?[{state}]:[],error:null};}}),upsert:row=>window.writeStored(row)})})};
 });
 await page.route('**/*',route=>{
  const url=new URL(route.request().url());
  if(url.hostname!=='mundialhito.test')return route.fulfill({status:200,contentType:'text/javascript',body:''});
  const file=path.join(root,url.pathname==='/'?'index.html':decodeURIComponent(url.pathname).slice(1));
  return route.fulfill(fs.existsSync(file)?{body:fs.readFileSync(file),contentType:file.endsWith('.html')?'text/html':file.endsWith('.js')?'text/javascript':'application/octet-stream'}:{status:404,body:''});
 });
 await page.goto('http://mundialhito.test/');await page.locator('#appScreen').waitFor({state:'visible'});await page.evaluate(()=>irAConfig());
 async function synchronized(){
  const values=await page.evaluate(()=>({state:structuredClone(state),pairs:['Mob','Dt'].map(s=>({
   nacionalidad:document.getElementById('configNacionalidad'+s).value,
   idioma:document.getElementById('configIdioma'+s).value,
   celebracionesActivas:document.getElementById('configCelebraciones'+s).checked,
   sonidoActivo:document.getElementById('configSonido'+s).checked,
   volumenSonido:Number(document.getElementById('configVolumen'+s).value),
   volumenTexto:document.getElementById('configVolumenVal'+s).textContent,
   disabled:document.getElementById('configVolumen'+s).disabled,
   nombre:document.getElementById('configNombreVal'+s).textContent
  }))}));
  assert.deepEqual(values.pairs[0],values.pairs[1],'ambos layouts deben coincidir');
  for(const key of ['nacionalidad','idioma','celebracionesActivas','sonidoActivo','volumenSonido'])assert.equal(values.pairs[0][key],values.state[key],key);
  assert.equal(values.pairs[0].volumenTexto,values.state.volumenSonido+'%');
  assert.equal(values.pairs[0].disabled,!values.state.sonidoActivo);
  if(values.state.nombrePerfil)assert.equal(values.pairs[0].nombre,values.state.nombrePerfil);
 }
 for(const [suffix,width,country,locale,volume] of [['Dt',1440,'BR','en','25'],['Mob',390,'UY','es','85']]){
  await page.setViewportSize({width,height:1000});
  await page.locator('#configNacionalidad'+suffix).selectOption(country);await synchronized();
  await page.locator('#configIdioma'+suffix).selectOption(locale);await synchronized();
  for(const pref of ['Celebraciones','Sonido']){
   await page.locator('#config'+pref+suffix).locator('..').click();assert.equal(await page.locator('#config'+pref+suffix).isChecked(),false);await synchronized();
   await page.locator('#config'+pref+suffix).locator('..').click();assert.equal(await page.locator('#config'+pref+suffix).isChecked(),true);await synchronized();
  }
  for(const val of ['0','100',volume]){await page.locator('#configVolumen'+suffix).press('Home');for(let i=0;i<Number(val)/5;i++)await page.locator('#configVolumen'+suffix).press('ArrowRight');await synchronized();}
  await page.evaluate(()=>abrirModalNombre());await page.locator('#nombreInput').fill('Peña Ñandú');await page.locator('#btnNombreGuardar').click();
  await page.waitForFunction(()=>!document.getElementById('nombreOverlay').classList.contains('show'));await synchronized();
  for(const size of [{width:390,height:844},{width:844,height:390},{width:1440,height:1000}]){await page.setViewportSize(size);await synchronized();}
  assert.equal(await page.evaluate(()=>vaciarGuardado()),true);
  assert.equal(stored.nacionalidad,country);assert.equal(stored.idioma,locale);assert.equal(stored.volumenSonido,Number(volume));assert.equal('snapshot' in stored,false);
  const before=writes;await page.reload();await page.locator('#appScreen').waitFor({state:'visible'});await page.evaluate(()=>irAConfig());await synchronized();assert.equal(writes,before,'cargar/renderizar no escribe');
  console.log('OK '+suffix+': preferencias, nombre, extremos de volumen, cambio de layout/rotación y recarga');
 }
 // El error conserva el estado visible sincronizado y permite reintentar la misma copia.
 fail=true;await page.locator('#configNacionalidadDt').selectOption('BR');await synchronized();
 assert.equal(await page.evaluate(()=>vaciarGuardado()),false);await synchronized();assert.equal(stored.nacionalidad,'UY');
 fail=false;assert.equal(await page.evaluate(()=>vaciarGuardado()),true);assert.equal(stored.nacionalidad,'BR');
 for(const width of [1440,390]){await page.setViewportSize({width,height:1000});if(process.env.QA_OUTPUT_DIR)await page.screenshot({path:path.join(process.env.QA_OUTPUT_DIR,`a11-config-${width}.png`)});}
 assert.deepEqual(errors,[]);console.log('OK persistencia: error/reintento, sin cambios de formato ni escrituras por renderizado');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
