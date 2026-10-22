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

  async function check(completed){
   const values=await page.evaluate(()=>['Mob','Dt'].map(suffix=>({
    number:Number(document.getElementById('numPartido'+suffix).textContent),
    used:document.querySelectorAll('#planDots'+suffix+' .used').length,
    current:[...document.querySelectorAll('#planDots'+suffix+' .plan-dot')].findIndex(el=>el.classList.contains('current'))+1,
    count:document.querySelectorAll('#planDots'+suffix+' .plan-dot').length
   })));
   for(const v of values)assert.deepEqual(v,{number:completed,used:completed,current:completed===10?0:completed+1,count:10});
   assert.equal(await page.evaluate(()=>state.contadorRenov),completed+1);
  }
  async function reload(completed){
   const count=writes;await page.reload();await page.locator('#appScreen').waitFor({state:'visible'});await check(completed);assert.equal(writes,count);
  }
  await check(0);
  for(let i=1;i<=10;i++){
   await page.evaluate(()=>procesarResultado('loss',false));await check(i);assert.equal(stored.contadorRenov,i+1);
   if([1,5,9,10].includes(i))await reload(i);
  }
  // El siguiente partido inicia otro ciclo; deshacer recupera los diez completados.
  await page.evaluate(()=>procesarResultado('loss',false));await check(1);
  await page.evaluate(()=>deshacerUltimoPartido());await check(10);
  await page.evaluate(()=>procesarResultado('loss',false));await check(1);
  // Renovación después de un partido: deshacer no debe cancelar esa renovación.
  await page.evaluate(()=>renovarPlan());await check(0);await page.evaluate(()=>deshacerUltimoPartido());await check(0);
  await page.evaluate(()=>procesarResultado('loss',false));await check(1);await page.evaluate(()=>deshacerUltimoPartido());await check(0);
  // Cada valor antiguo conserva su significado. No se infiere el ciclo a partir del historial.
  for(let value=1;value<=10;value++){
   stored=historicalState();stored.contadorRenov=value;await reload(value-1);
  }
  // Deshacer el décimo también debe volver a nueve sin perder el historial.
  await page.evaluate(()=>procesarResultado('loss',false));await check(10);
  await page.evaluate(()=>deshacerUltimoPartido());await check(9);
  await page.evaluate(()=>procesarResultado('loss',false));await check(10);
  await page.evaluate(()=>irAActividad());
  if(process.env.QA_OUTPUT_DIR)await page.screenshot({path:path.join(process.env.QA_OUTPUT_DIR,`a10-completo-${width}.png`),fullPage:true});
  await page.locator(width===1440?'#btnRenovarDt':'#btnRenovarMob').click();
  await page.waitForFunction(()=>state.contadorRenov===1 && !hayCambiosSinGuardar());await check(0);
  assert.match(await page.locator('#flash').textContent(),/0 de 10/);
  await reload(0);await page.evaluate(()=>irAActividad());
  if(process.env.QA_OUTPUT_DIR)await page.screenshot({path:path.join(process.env.QA_OUTPUT_DIR,`a10-inicial-${width}.png`),fullPage:true});
  assert.deepEqual(errors,[]);console.log(`OK ${width}px: 0..10, ciclo siguiente, manual, recargas, valores antiguos 1..10, Deshacer y dos layouts`);
  await page.close();
 }}finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
