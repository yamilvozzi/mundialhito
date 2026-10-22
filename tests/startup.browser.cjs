// SDK real fijado; todas las peticiones interceptadas, sin Supabase real.
const {chromium}=require('playwright');
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.join(__dirname,'..');
const sdk=fs.readFileSync(path.join(path.dirname(require.resolve('@supabase/supabase-js')),'umd','supabase.js'));
const sdkUrl='https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.118.0';
const uid='11111111-1111-4111-8111-111111111111';
const user={id:uid,aud:'authenticated',role:'authenticated',email:'startup@example.invalid'};
const token=[{alg:'HS256',typ:'JWT'},{sub:uid,role:'authenticated',aud:'authenticated',exp:Math.floor(Date.now()/1000)+3600},'test'];
const accessToken=token.map(v=>Buffer.from(typeof v==='string'?v:JSON.stringify(v)).toString('base64url')).join('.');
(async()=>{
 const browser=await chromium.launch({headless:true,...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE?{executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE}:{})});
 try {for(const width of [1440,390]){
  const page=await browser.newPage({viewport:{width,height:1000},serviceWorkers:'block'});
  let mode='abort',stored=null,writes=0,authRequests=0;const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.route('**/*',async route=>{
   const url=new URL(route.request().url()),method=route.request().method();
   if(url.href===sdkUrl){
    if(mode==='abort')return route.abort('failed');
    const body=mode==='empty'?'':mode==='constructor-error'?'window.supabase={createClient(){throw new Error("test constructor");}};'
      :mode==='session-error'?'window.supabase={createClient:()=>({auth:{onAuthStateChange(){},getSession:async()=>({data:{session:null},error:new Error("test session")})}})};':sdk;
    return route.fulfill({contentType:'text/javascript',body});
   }
   if(url.pathname.startsWith('/auth/v1/')){
    authRequests++;
    if(url.pathname.endsWith('/token'))return route.fulfill({json:{access_token:accessToken,refresh_token:'startup-refresh-test',expires_in:3600,token_type:'bearer',user}});
    if(url.pathname.endsWith('/user'))return route.fulfill({json:user});
    if(url.pathname.endsWith('/logout'))return route.fulfill({status:204,body:''});
    throw new Error('Unexpected auth request: '+url.pathname);
   }
   if(url.pathname==='/rest/v1/game_state'){
    if(method==='GET')return route.fulfill({json:stored?[{state:stored}]:[]});
    assert.equal(method,'POST');const row=route.request().postDataJSON();assert.equal(row.user_id,uid);stored=row.state;writes++;
    return route.fulfill({status:201,body:''});
   }
   if(url.hostname!=='mundialhito.test')return route.fulfill({status:200,contentType:'text/javascript',body:''});
   const file=path.join(root,url.pathname==='/'?'index.html':decodeURIComponent(url.pathname).slice(1));
   return route.fulfill(fs.existsSync(file)?{body:fs.readFileSync(file),contentType:file.endsWith('.html')?'text/html':file.endsWith('.js')?'text/javascript':'application/octet-stream'}:{status:404,body:''});
  });
  for(mode of ['abort','empty','constructor-error','session-error']){
   await page.goto('http://mundialhito.test/');
   await page.locator('#startupError').waitFor({state:'visible'});
   assert.equal(await page.locator('#loadingDots').isVisible(),false);
   for(const screen of ['login','app','config','rachas','historial','actividad','histRachas'])assert.equal(await page.locator('#'+screen+'Screen').isVisible(),false);
   assert.equal(await page.evaluate(()=>document.activeElement.id),'btnRetryStartup');
   assert.equal(writes,0);assert.equal(authRequests,0);
   if(process.env.QA_OUTPUT_DIR&&mode==='abort')await page.screenshot({path:path.join(process.env.QA_OUTPUT_DIR,`inicio-error-${width}.png`)});
  }
  // Reintentar vuelve a cargar el SDK y conserva el flujo normal.
  mode='real';await page.locator('#btnRetryStartup').click();await page.locator('#loginScreen').waitFor({state:'visible'});
  assert.equal(await page.locator('#startupError').isVisible(),false);
  await page.locator('#loginEmail').fill(user.email);await page.locator('#loginPassword').fill('test-only');await page.locator('#btnLogin').click();
  await page.locator('#appScreen').waitFor({state:'visible'});
  await page.locator('.btn-win:visible').click();await page.waitForFunction(()=>!hayCambiosSinGuardar());
  assert.equal(writes,1);assert.equal(stored.totalGanados,1);
  const validState=structuredClone(stored);
  stored={marcador:'incompleto'};
  await page.reload();await page.locator('#loadError').waitFor({state:'visible'});
  assert.equal(await page.locator('#appScreen').isVisible(),false);
  assert.equal(await page.evaluate(()=>estadoListo()),false);assert.equal(writes,1);
  stored=validState;
  await page.locator('#btnRetryLoad').click();await page.locator('#appScreen').waitFor({state:'visible'});
  assert.equal(await page.evaluate(()=>state.totalGanados),1);assert.equal(writes,1);
  await page.reload();await page.locator('#appScreen').waitFor({state:'visible'});
  assert.equal(await page.evaluate(()=>state.totalGanados),1);assert.equal(writes,1);
  await page.evaluate(()=>logout());await page.locator('#loginScreen').waitFor({state:'visible'});
  await page.reload();await page.locator('#loginScreen').waitFor({state:'visible'});
  assert.deepEqual(errors,[]);
  console.log(`OK ${width}px: SDK real 2.118.0, login, guardar, recargar, logout; CDN fallido/vacío, constructor y sesión fallidos; reintento sin escrituras durante error`);
  await page.close();
 }}finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
