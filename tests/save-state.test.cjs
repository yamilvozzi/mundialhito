// node --test tests/*.test.cjs — sin red ni datos reales.
const { readFileSync } = require('node:fs');
const { join } = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const { test } = require('node:test');
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const copy = value => JSON.parse(JSON.stringify(value));
const tick = () => new Promise(resolve => setImmediate(resolve));
function deferred() {
  let resolve, reject;
  const promise = new Promise((yes, no) => { resolve = yes; reject = no; });
  return { promise, resolve, reject };
}
function source(name) {
  const start = html.search(new RegExp(`(?:async )?function ${name}\\(`));
  assert.notEqual(start, -1);
  return html.slice(start, html.indexOf('\n}', start) + 2);
}
function app() {
  const elements = new Map(), timers = new Map(), writes = [], flashes = [], events = {};
  const fixture = { answers:[], active:0, maxActive:0, signouts:0, signoutError:null, celebrations:0 };
  let timerId=0;
  function element(id) {
    if (!elements.has(id)) elements.set(id, { style:{}, hidden:false, textContent:'', classList:{remove() {}} });
    return elements.get(id);
  }
  const c = vm.createContext({
    document:{ body:{}, visibilityState:'visible', getElementById:element,
      addEventListener:(name,fn)=>{events[name]=fn;} },
    window:{ addEventListener:(name,fn)=>{events[name]=fn;} },
    I18N:{t:key=>key}, renderizarConfig() {}, aplicarIdiomaLocalGuardado() {}, actualizarSubtitulosPerfil() {}, actualizarNavegacion() {}, cerrarDialogo() {}, cerrarDialogosSesion() {}, CELEBRACION:{detener(){}}, console:{error(){}},
    flash:(...args)=>flashes.push(args), renderizar(){}, renderizarRachas(){}, mostrarLogin(){},
    mostrarModalCampeon(){fixture.celebrations++;}, confirmar:async()=>true,
    setTimeout(fn,delay){timers.set(++timerId,{fn,delay});return timerId;},
    clearTimeout(id){timers.delete(id);},
    sb:{ from:table=>{
      assert.equal(table,'game_state');
      return {upsert:async(row,options)=>{
        writes.push({row,options});
        fixture.maxActive=Math.max(fixture.maxActive,++fixture.active);
        try {return await (fixture.answers.shift() || {error:null});}
        finally {fixture.active--;}
      }};
    }, auth:{signOut:async()=>{fixture.signouts++; return {error:fixture.signoutError};}} },
  });
  const names=['capturarSesion', 'sesionVigente', 'limpiarSesion', 'capturarSesion','sesionVigente','limpiarSesion','defaultState','estadoListo','invalidarCargaEstado','actualizarEstadoGuardado',
    'hayCambiosSinGuardar','prepararGuardado','vaciarGuardado','guardar','guardarConDebounce',
    'logout','crearSnapshotPartido','deshacerUltimoPartido','renovarPlan','procesarResultado',
    'continuarTrasCampeonato','reiniciarRachas'];
  vm.runInContext(`${names.map(source).join('\n')}
    var _confirmResolve=null, archTipoActual="temporada", eleccionUsuario=null, pendingResult=null, monedaUsada=false, panelAbierto=false, pantallaActiva="app";
    var state=defaultState(), currentUser={id:'alice'}, estadoCargadoUsuario='alice';
    var cargaEstadoVersion=0, guardado=null, guardarTimeout=null, salidaEnCurso=false;
    const FASES=['FG','E8','E4','SF','FINAL'];
    const FASE_NOMBRES={FG:'Fase de Grupos',E8:'Octavos',E4:'Cuartos',SF:'Semifinal',FINAL:'Gran Final'};`,c);
  for (const name of ['beforeunload','visibilitychange']) {
    const start=html.indexOf(`${name==='beforeunload'?'window':'document'}.addEventListener('${name}'`);
    vm.runInContext(html.slice(start,html.indexOf('\n});',start)+4),c);
  }
  return {c, fixture, elements, element, timers, writes, flashes, events};
}

test('guardado exitoso conserva contrato y usa una copia independiente sin snapshot',async()=>{
  const {c,writes,element}=app();
  c.state.snapshot={no:'persistir'};
  c.state.historial.push({res:'win',texto:'histórico'});
  assert.equal(await c.guardar(),true);
  c.state.historial[0].texto='cambio posterior';
  assert.equal(writes[0].row.state.historial[0].texto,'histórico');
  assert.equal(writes[0].row.state.snapshot,undefined);
  assert.equal(writes[0].row.user_id,'alice');
  assert.equal(writes[0].options.onConflict,'user_id');
  assert.equal(element('saveStatusText').textContent,'persistence.saved');
  assert.equal(element('saveStatus').hidden,true);
  assert.equal(c.hayCambiosSinGuardar(),false);
});

test('varios partidos cercanos: nunca hay escrituras simultáneas y se conserva el último estado',async()=>{
  const {c,fixture,writes,element}=app();
  const first=deferred();fixture.answers.push(first.promise);
  const a=c.procesarResultado('win',false);
  assert.equal(element('saveStatusText').textContent,'persistence.saving');
  assert.equal(element('saveStatus').hidden,false);
  const b=c.procesarResultado('loss',false);
  const d=c.procesarResultado('win',true);
  assert.equal(writes.length,1);
  assert.equal(writes[0].row.state.totalJugados,1);
  assert.equal(writes[0].row.state.historial.length,1);
  first.resolve({error:null});
  await Promise.all([a,b,d]);
  assert.equal(fixture.maxActive,1);
  assert.equal(writes.length,2);
  assert.equal(writes[1].row.state.totalJugados,3);
  assert.equal(writes[1].row.state.historial.length,3);
  assert.equal(writes[1].row.state.totalEmpatados,1);
});

test('debounce mantiene 800ms y agrupa preferencias; una acción inmediata lo vacía',async()=>{
  const {c,timers,writes}=app();
  for(const volume of [10,20,30]){c.state.volumenSonido=volume;c.guardarConDebounce();}
  assert.equal(writes.length,0);
  assert.equal(timers.size,1);
  assert.equal([...timers.values()][0].delay,800);
  await c.procesarResultado('win',false);
  assert.equal(timers.size,0);
  assert.equal(writes.length,1);
  assert.equal(writes[0].row.state.volumenSonido,30);
  assert.equal(writes[0].row.state.totalJugados,1);
});

test('error de Supabase conserva cambios, no anuncia éxito y permite reintento',async()=>{
  const {c,fixture,writes,element,flashes}=app();
  fixture.answers.push({error:{message:'failed'}});
  await c.procesarResultado('win',false);
  assert.equal(c.state.totalJugados,1);
  assert.equal(c.hayCambiosSinGuardar(),true);
  assert.equal(element('saveStatusText').textContent,'persistence.error');
  assert.equal(element('saveStatus').hidden,false);
  assert.equal(element('btnRetrySave').hidden,false);
  assert.equal(flashes.length,0);
  assert.equal(await c.vaciarGuardado(),true);
  assert.equal(writes.length,2);
  assert.deepEqual(copy(writes[0].row.state),copy(writes[1].row.state));
  assert.equal(element('saveStatusText').textContent,'persistence.saved');
  assert.equal(element('saveStatus').hidden,true);
});

test('excepción de red: retiene la versión más nueva llegada durante la petición fallida',async()=>{
  const {c,fixture,writes}=app();
  const first=deferred();fixture.answers.push(first.promise);
  c.state.totalJugados=1;const a=c.guardar();
  c.state.totalJugados=2;const b=c.guardar();
  first.reject(new Error('connection lost'));
  assert.deepEqual(await Promise.all([a,b]),[false,false]);
  assert.equal(c.guardado.pendiente.totalJugados,2);
  await c.vaciarGuardado();
  assert.equal(writes.at(-1).row.state.totalJugados,2);
  assert.equal(fixture.maxActive,1);
});

test('logout vacía debounce, espera la confirmación y recién después cierra sesión',async()=>{
  const {c,fixture,writes,timers}=app();
  const write=deferred();fixture.answers.push(write.promise);
  c.state.totalJugados=4;c.guardarConDebounce();
  const exit=c.logout();
  assert.equal(timers.size,0);
  assert.equal(writes.length,1);
  assert.equal(fixture.signouts,0);
  assert.equal(c.currentUser.id,'alice');
  assert.equal(c.document.body.inert,true);
  write.resolve({error:null});await exit;
  assert.equal(fixture.signouts,1);
  assert.equal(c.currentUser,null);
  assert.equal(c.document.body.inert,false);
});

test('logout con error no descarta cambios ni cierra sesión; otro intento puede completarlo',async()=>{
  const {c,fixture,element}=app();
  fixture.answers.push({error:{message:'failed'}});
  c.state.totalJugados=7;c.guardarConDebounce();
  await c.logout();
  assert.equal(fixture.signouts,0);
  assert.equal(c.currentUser.id,'alice');
  assert.equal(c.state.totalJugados,7);
  assert.equal(c.document.body.inert,false);
  assert.equal(element('saveStatusText').textContent,'persistence.error');
  await c.logout();
  assert.equal(fixture.signouts,1);
  assert.equal(c.currentUser,null);
});

test('logout espera también una escritura ya en curso y una versión posterior',async()=>{
  const {c,fixture,writes}=app();
  const first=deferred(),second=deferred();fixture.answers.push(first.promise,second.promise);
  c.state.totalJugados=1;const save=c.guardar();
  c.state.totalJugados=2;c.guardarConDebounce();
  const exit=c.logout();
  first.resolve({error:null});await tick();
  assert.equal(writes.length,2);
  assert.equal(fixture.signouts,0);
  second.resolve({error:null});await Promise.all([save,exit]);
  assert.equal(fixture.signouts,1);
  assert.equal(writes[1].row.state.totalJugados,2);
});

test('fallo al cerrar sesión conserva la sesión válida y permite seguir',async()=>{
  const {c,fixture,flashes}=app();
  fixture.signoutError={message:'auth failed'};
  await c.logout();
  assert.equal(c.currentUser.id,'alice');
  assert.equal(c.estadoListo(),true);
  assert.equal(c.salidaEnCurso,false);
  assert.equal(flashes.at(-1)[0],'persistence.logoutError');
});

test('cambio forzado de sesión no reetiqueta ni continúa escrituras de la cuenta anterior',async()=>{
  const {c,fixture,writes,element}=app();
  const first=deferred();fixture.answers.push(first.promise);
  c.state.totalJugados=1;const save=c.guardar();
  c.state.totalJugados=2;c.guardarConDebounce();
  c.invalidarCargaEstado();
  c.currentUser={id:'bob'};c.estadoCargadoUsuario='bob';c.state=c.defaultState();
  first.resolve({error:null});
  assert.equal(await save,false);
  assert.equal(writes.length,1);
  assert.equal(writes[0].row.user_id,'alice');
  assert.equal(element('saveStatus').hidden,true);
  await c.guardar();
  assert.equal(writes[1].row.user_id,'bob');
  assert.equal(writes[1].row.state.totalJugados,0);
});

test('cerrar/recargar advierte solo si hay cambios y adelanta el envío pendiente',async()=>{
  const {c,fixture,writes,events}=app();
  let prevented=false;
  const e={preventDefault(){prevented=true;}};
  events.beforeunload(e);assert.equal(prevented,false);
  const write=deferred();fixture.answers.push(write.promise);
  c.state.volumenSonido=15;c.guardarConDebounce();
  events.beforeunload(e);
  assert.equal(prevented,true);
  assert.equal(e.returnValue,'');
  assert.equal(writes.length,1);
  write.resolve({error:null});await tick();
  prevented=false;events.beforeunload(e);assert.equal(prevented,false);
});

test('pasar a segundo plano vacía el debounce',async()=>{
  const {c,writes,events}=app();
  c.guardarConDebounce();c.document.visibilityState='hidden';events.visibilitychange();
  await tick();assert.equal(writes.length,1);
});

test('Una carga inválida sigue bloqueando guardado, debounce y partidos sin carga válida',async()=>{
  const {c,writes,timers}=app();
  c.invalidarCargaEstado();
  assert.equal(await c.guardar(),false);c.guardarConDebounce();
  await c.procesarResultado('win',false);
  assert.equal(c.state.totalJugados,0);
  assert.equal(writes.length,0);assert.equal(timers.size,0);
});

test('Deshacer y reiniciar rachas no muestran éxito cuando falla la escritura',async()=>{
  const {c,fixture,flashes}=app();
  await c.procesarResultado('win',false);flashes.length=0;
  fixture.answers.push({error:{message:'failed'}});
  await c.deshacerUltimoPartido();
  assert.equal(flashes.length,0);assert.equal(c.state.totalJugados,0);
  fixture.answers.push({error:{message:'failed again'}});
  await c.reiniciarRachas();assert.equal(flashes.length,0);
});

test('final termina antes de guardar; recargar y registrar no duplica copa',async()=>{
  const {c,fixture,writes}=app();
  c.state.fase='FINAL';c.state.copaCampañaActual=6;
  const write=deferred();fixture.answers.push(write.promise);
  const match=c.procesarResultado('win',false);
  assert.equal(c.state.fase,'FG');assert.equal(fixture.celebrations,0);
  assert.equal(writes[0].row.state.fase,'FG');
  write.resolve({error:null});await match;
  assert.equal(fixture.celebrations,1);
  c.state=copy(writes[0].row.state); // Recarga antes de pulsar Continuar.
  await c.procesarResultado('win',false);
  assert.equal(c.state.copas,1);assert.equal(c.state.finalesGanadas,1);
  const before=copy(c.state);c.continuarTrasCampeonato();
  assert.deepEqual(copy(c.state),before,'cerrar celebración no modifica el torneo');
});

test('fallo al guardar final no celebra; reintentar guarda una sola copa',async()=>{
  const {c,fixture,writes}=app();
  c.state.fase='FINAL';fixture.answers.push({error:{message:'failed'}});
  await c.procesarResultado('win',true);
  assert.equal(fixture.celebrations,0);assert.equal(c.state.copas,1);
  await c.vaciarGuardado();
  assert.equal(writes.at(-1).row.state.copas,1);
  assert.equal(writes.at(-1).row.state.fase,'FG');
  await c.deshacerUltimoPartido();
  assert.equal(c.state.copas,0);assert.equal(c.state.fase,'FINAL');
});

test('una final ya completada por la versión anterior no vuelve a sumar copa',async()=>{
  const {c,writes}=app();
  c.state.fase='FINAL';c.state.eliminatoriasDone=['E8','E4','SF','FINAL'];
  c.state.copas=1;c.state.finalesGanadas=1;c.state.totalJugados=7;
  c.state.historial=[{res:'win',texto:'Gran Final histórica'}];
  await c.procesarResultado('win',false);
  assert.equal(c.state.copas,1);assert.equal(c.state.finalesGanadas,1);
  assert.equal(c.state.totalJugados,8);assert.equal(c.state.fase,'FG');
  assert.deepEqual(copy(c.state.historial[0]),{res:'win',texto:'Gran Final histórica'});
  assert.equal(writes[0].row.state.copas,1);
  await c.deshacerUltimoPartido();
  assert.equal(c.state.copas,1);assert.equal(c.state.totalJugados,7);
  assert.equal(c.state.fase,'FG');
});
