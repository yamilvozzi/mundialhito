const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs'), path = require('node:path'), vm = require('node:vm');
const historicalState = require('./fixtures/historical-state.cjs');
const html = fs.readFileSync(path.join(__dirname,'..','index.html'),'utf8');
const copy = v => JSON.parse(JSON.stringify(v));
function source(name) {
  const start = html.search(new RegExp(`(?:async )?function ${name}\\(`));
  assert.notEqual(start,-1,name);
  return html.slice(start,html.indexOf('\n}',start)+2);
}
function app() {
  const fixture = {stored:null,writes:[],debounces:0};
  const c = vm.createContext({
    I18N:{t:k=>k,setLocale(){}},guardarIdiomaLocal(){},renderizar(){},flash(){},mostrarModalCampeon(){},
    hayCambiosSinGuardar:()=>false,
    invalidarCargaEstado(){c.cargaEstadoVersion++;c.estadoCargadoUsuario=null;},
    estadoListo:()=>c.estadoCargadoUsuario==='test',
    guardarConDebounce(){fixture.debounces++;},
    guardar:async()=>{fixture.writes.push(copy(c.state));return true;},
    confirmar:async()=>true,renderizarRachas(){},
    sb:{from:()=>({select:()=>({eq:async()=>({data:fixture.stored?[{state:copy(fixture.stored)}]:[],error:null})})})},
    console, document:{getElementById:()=>({hidden:false,style:{}})}
  });
  const names=['defaultState','interpretarPartidoHistorico','reconstruirRachasDesdeHistorial','calcRachas','cargarEstado',
    'crearSnapshotPartido','procesarResultado','deshacerUltimoPartido','reiniciarRachas','reiniciarEstadisticasPrincipales'];
  vm.runInContext(`${names.map(source).join('\n')}
    var state=defaultState(), currentUser={id:'test'}, cargaEstadoVersion=0, estadoCargadoUsuario='test', salidaEnCurso=false;
    const FASES=['FG','E8','E4','SF','FINAL'];
    const FASE_NOMBRES={FG:'Fase de Grupos',E8:'Octavos de Final',E4:'Cuartos de Final',SF:'Semifinal',FINAL:'Gran Final'};`,c);
  return {c,fixture,async load(stored){fixture.stored=copy(stored);assert.equal(await c.cargarEstado(),true);}};
}
async function tournament(c,result='win',draw=false) {
  for(let i=0;i<6;i++)await c.procesarResultado('win',false);
  await c.procesarResultado(result,draw);
}
function metrics(c) {return copy(c.calcRachas());}
function accumulated(c) {const keys=Object.keys(c.reconstruirRachasDesdeHistorial());return Object.fromEntries(keys.map(k=>[k,c.state[k]]));}

test('reconstrucción coincide con registro vivo para finales directas y por penales',async()=>{
  for(const result of ['win','loss'])for(const draw of [false,true]) {
    const {c,load,fixture}=app();await tournament(c,result,draw);
    const before=copy(c.state), live=metrics(c);
    assert.deepEqual(copy(c.reconstruirRachasDesdeHistorial()),accumulated(c));
    assert.deepEqual(copy(c.state),before,'reconstruir no muta');
    const writes=fixture.writes.length;await load(before);
    assert.deepEqual(metrics(c),live);assert.equal(fixture.writes.length,writes);
    assert.equal(live.fj,1);assert.equal(live.fg,result==='win'?1:0);assert.equal(live.fp,result==='loss'?1:0);
    assert.equal(live.cmej,result==='win'?7:0);assert.equal(live.cca,result==='win'?0:7);
  }
});
test('varias campañas, eliminaciones y empates neutros mantienen las reglas actuales',async()=>{
  const {c,load}=app();
  await tournament(c,'loss',true);await tournament(c,'win',true);await tournament(c,'win',false);
  const live=metrics(c);assert.equal(live.cmej,7);assert.equal(live.cpeo,14);assert.equal(live.fj,3);
  assert.equal(live.fg,2);assert.equal(live.fp,1);assert.equal(live.rwm,19);
  await load(c.state);assert.deepEqual(metrics(c),live);
});
test('estados sin campos, en cero o parcialmente inicializados se resuelven al cargar',async()=>{
  const base=app();await tournament(base.c,'win',true);const complete=copy(base.c.state);
  for(const variant of ['sin campos','cero','parcial'])for(const visitFirst of [false,true]) {
    const {c,load,fixture}=app();const stored=copy(complete);
    for(const key of Object.keys(c.reconstruirRachasDesdeHistorial())) {
      if(variant==='sin campos')delete stored[key];else stored[key]=0;
    }
    if(variant==='parcial')stored.rachaWinsMax=1;
    delete stored.rachaResetIndex;
    await load(stored);const before=copy(c.state);
    if(visitFirst){metrics(c);metrics(c);assert.deepEqual(copy(c.state),before);}
    assert.equal(fixture.writes.length,0);assert.equal(fixture.debounces,0);
    await c.procesarResultado('win',false);
    assert.deepEqual(metrics(c),{rwa:7,rwm:7,rla:0,rlm:0,cca:1,cmej:7,cpeo:7,fj:1,fg:1,fp:0});
    await c.deshacerUltimoPartido();assert.deepEqual(metrics(c),{rwa:6,rwm:6,rla:0,rlm:0,cca:0,cmej:7,cpeo:7,fj:1,fg:1,fp:0});
    assert.deepEqual(copy(c.state.historial),complete.historial);
  }
});
test('muestra de 60 partidos con corte 60 conserva ceros, totales y preferencias',async()=>{
  const {c,load,fixture}=app();const stored=historicalState();assert.equal(stored.historial.length,60);
  await load(stored);assert.deepEqual(copy(c.state),stored);assert.equal(fixture.writes.length,0);
  await c.procesarResultado('win',false);
  assert.equal(metrics(c).rwa,1);assert.equal(metrics(c).fj,0);assert.equal(metrics(c).cca,1);
  assert.equal(c.state.totalJugados,1);assert.equal(c.state.copas,0);assert.equal(c.state.rachaResetIndex,60);
  await c.deshacerUltimoPartido();assert.equal(metrics(c).rwa,0);assert.equal(c.state.historial.length,60);
});
test('el mismo historial sin corte recupera métricas sin cambiar totales principales',async()=>{
  const {c,load}=app();const stored=historicalState();stored.rachaResetIndex=0;
  await load(stored);assert.equal(metrics(c).fj,8);assert.equal(metrics(c).fg,8);
  assert.equal(metrics(c).cmej,7);assert.equal(metrics(c).cpeo,8);assert.equal(metrics(c).cca,3);
  assert.equal(metrics(c).rwm,32);assert.equal(metrics(c).rla,3);
  assert.equal(c.state.copas,0);assert.equal(c.state.totalJugados,0);assert.deepEqual(copy(c.state.historial),stored.historial);
});
test('formatos inicial y actual, con/sin fecha, son independientes del idioma',async()=>{
  for(const idioma of ['es','en','pt','zh'])for(const old of [false,true])for(const win of [false,true]) {
    const {c,load}=app();const stored=copy(c.state);stored.idioma=idioma;
    stored.historial=[{res:old?(win?'win':'loss'):'draw',draw:true,
      texto:(old?'':'01/08/26 · ')+'Gran Final — Empate → '+(old?(win?'victoria penales':'derrota penales'):(win?'ganó por penales':'perdió por penales'))}];
    await load(stored);assert.equal(metrics(c).fg,win?1:0);assert.equal(metrics(c).fp,win?0:1);
    assert.equal(metrics(c).rwm,0);assert.deepEqual(copy(c.state.historial),stored.historial);
  }
});
test('corte parcial y reinicio antes de final preservan el nuevo período de medición',async()=>{
  const {c,load}=app();for(let i=0;i<6;i++)await c.procesarResultado('win',false);
  await c.reiniciarRachas();await c.procesarResultado('win',true);const live=metrics(c);
  assert.equal(live.cmej,1);assert.equal(c.state.rachaResetIndex,6);
  await load(c.state);assert.deepEqual(metrics(c),live);
  c.reiniciarEstadisticasPrincipales();await load(c.state);assert.deepEqual(metrics(c),live);
});
test('no adivina formatos desconocidos, contradictorios ni cortes inválidos',async()=>{
  for(const record of [{res:'draw',draw:true,texto:'Gran Final — Empate'},
    {res:'win',draw:false,texto:'Grand Final — Win'},
    {res:'loss',draw:false,texto:'Gran Final — Victoria'}]) {
    const {c,load}=app();const stored=copy(c.state);stored.historial=[record];stored.finalesJugadas=9;stored.rachaWinsMax=12;
    await load(stored);assert.equal(c.reconstruirRachasDesdeHistorial(),null);assert.deepEqual(copy(c.state),stored);
  }
  for(const cutoff of [-1,61,1.5,null]) {
    const {c,load}=app();const stored=historicalState();stored.rachaResetIndex=cutoff;
    await load(stored);assert.equal(c.reconstruirRachasDesdeHistorial(),null);assert.deepEqual(copy(c.state),stored);
  }
});
