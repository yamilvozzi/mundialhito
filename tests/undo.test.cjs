// Ejecutar con: node --test tests/undo.test.cjs
// Se ejecutan las funciones reales del HTML, sin red ni datos de usuarios.
const { readFileSync } = require('node:fs');
const { join } = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const { test } = require('node:test');
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');

function source(name) {
  const start = html.search(new RegExp(`(?:async )?function ${name}\\(`));
  assert.notEqual(start, -1, name);
  return html.slice(start, html.indexOf('\n}', start) + 2);
}

function app() {
  const writes = [];
  const context = vm.createContext({
    I18N: { t: key => key }, flash() {}, renderizar() {}, renderizarRachas() {},
    guardarConDebounce() {}, setTimeout() {}, clearTimeout() {}, mostrarModalCampeon() {},
    actualizarEstadoGuardado() {},
    cerrarDialogo() {}, cerrarDialogosSesion() {}, CELEBRACION: { detener() {} },
    document: { getElementById: () => ({ classList: { remove() {} } }) },
    confirmar: async () => true,
    currentUser: { id: 'test-only' },
    estadoListo: () => true, // Estas pruebas comienzan con un estado ya cargado.
    sb: { from: table => ({ upsert: async row => {
      writes.push({ table, row: JSON.parse(JSON.stringify(row)) });
      return { error: null };
    } }) },
    console,
  });
  const names = ['defaultState', 'crearSnapshotPartido', 'deshacerUltimoPartido',
    'renovarPlan', 'procesarResultado', 'reiniciarRachas',
    'reiniciarEstadisticasPrincipales', 'continuarTrasCampeonato',
    'reconstruirRachasDesdeHistorial', 'calcRachas', 'prepararGuardado', 'vaciarGuardado', 'guardar'];
  vm.runInContext(`const FASES = ['FG','E8','E4','SF','FINAL'];
    const FASE_NOMBRES = {FG:'Fase de Grupos', E8:'Octavos de Final', E4:'Cuartos de Final', SF:'Semifinal', FINAL:'Gran Final'};
    ${names.map(source).join('\n')}
    var state = defaultState(), guardado = null, guardarTimeout = null, salidaEnCurso = false;`, context);
  return { context, writes };
}

const copy = value => JSON.parse(JSON.stringify(value));

test('reglas de torneo: ocho grupos, cuatro eliminaciones y copa con empates estadísticos', async () => {
  for (const sequence of ['WWW','WWL','WLW','LWW','WLL','LWL','LLW','LLL']) {
    const { context: c } = app();
    for (const result of sequence) await c.procesarResultado(result === 'W' ? 'win' : 'loss', false);
    const qualified = ['WWW','WWL','WLW','LWW'].includes(sequence);
    assert.equal(c.state.fase, qualified ? 'E8' : 'FG', sequence);
    assert.equal(c.state.totalJugados, 3);
    assert.equal(c.state.copas, 0);
    assert.equal(c.state.copaCampañaActual, 3);
  }
  for (const wins of [3,4,5,6]) {
    const { context: c } = app();
    for (let i=0;i<wins;i++) await c.procesarResultado('win', false);
    await c.procesarResultado('loss', false);
    assert.equal(c.state.fase, 'FG');
    assert.equal(c.state.copas, 0);
    assert.equal(c.state.copaCampañaActual, wins+1);
    assert.equal(c.state.finalesPerdidas, wins===6?1:0);
  }
  const { context: c, writes } = app();
  for (let i=0;i<7;i++) await c.procesarResultado('win', true);
  assert.equal(c.state.totalEmpatados, 7);
  assert.equal(c.state.totalGanados, 0);
  assert.equal(c.state.rachaWinsMax, 0);
  assert.equal(c.state.copas, 1);
  assert.equal(c.state.finalesGanadas, 1);
  assert.equal(c.state.copaMejorCampaña, 7);
  assert.equal(c.state.copaCampañaActual, 0);
  assert.equal(c.state.fase, 'FG');
  assert.equal(writes.at(-1).row.state.copas, 1);
  assert.equal(writes.at(-1).row.state.snapshot, undefined);
});

test('sintaxis de todos los scripts inline y conexión de ambos botones', () => {
  for (const match of html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)) {
    new vm.Script(match[1]);
  }
  for (const suffix of ['Mob', 'Dt']) {
    assert.ok(html.includes(`getElementById('btnUndo${suffix}').addEventListener('click', deshacerUltimoPartido)`));
    assert.ok(html.includes(`getElementById('btnRenovar${suffix}').addEventListener('click', renovarPlan)`));
  }
});

test('deshacer restaura cada transición, incluidos empates y finales', async () => {
  const stages = [[], ['win'], ['win', 'loss']];
  for (const fase of ['FG', 'E8', 'E4', 'SF', 'FINAL']) {
    for (const grupo of (fase === 'FG' ? stages : [[]])) {
      for (const result of ['win', 'loss']) for (const draw of [false, true]) {
        const { context: c } = app();
        c.state.fase = fase;
        c.state.fgResultados = grupo;
        c.state.eliminatoriasDone = fase === 'FINAL' ? ['E8', 'E4', 'SF'] : [];
        c.state.rachaWinsActual = 3;
        c.state.rachaWinsMax = 3;
        c.state.copaCampañaActual = 12;
        c.state.contadorRenov = 10;
        const before = copy(c.state);
        await c.procesarResultado(result, draw);
        if (fase === 'FINAL' && result === 'win') c.continuarTrasCampeonato();
        await c.deshacerUltimoPartido();
        assert.deepEqual(copy(c.state), before, `${fase} ${result} draw=${draw}`);
        await c.deshacerUltimoPartido();
        assert.deepEqual(copy(c.state), before, 'solo un nivel de deshacer');
      }
    }
  }
});

test('1000 partidos: snapshot acotado, independiente y sin historial acumulado', async () => {
  const { context: c } = app();
  let maxSize = 0;
  for (let i = 0; i < 1000; i++) {
    const before = copy({ ...c.state, snapshot: null });
    await c.procesarResultado(i % 3 ? 'win' : 'loss', i % 5 === 0);
    const snap = c.state.snapshot;
    assert.equal(snap.historialLength, i);
    assert.equal(snap.snapshot, undefined);
    assert.equal(snap.historial, undefined);
    maxSize = Math.max(maxSize, JSON.stringify(snap).length);
    if (c.state.fase === 'FINAL' && c.state.eliminatoriasDone.includes('FINAL')) c.continuarTrasCampeonato();
    if (i % 100 === 99) {
      await c.deshacerUltimoPartido();
      assert.deepEqual(copy(c.state), before);
      await c.procesarResultado(i % 3 ? 'win' : 'loss', i % 5 === 0);
      if (c.state.fase === 'FINAL' && c.state.eliminatoriasDone.includes('FINAL')) c.continuarTrasCampeonato();
    }
  }
  assert.ok(maxSize < 1000, `snapshot máximo: ${maxSize} caracteres`);
  assert.equal(c.state.historial.length, 1000);
  console.log(`Snapshot máximo en 1000 partidos: ${maxSize} caracteres`);
});

test('conserva preferencias y cualquier dato ajeno al partido', async () => {
  const { context: c } = app();
  await c.procesarResultado('win', false);
  const preferences = { nombrePerfil: 'Nuevo', nacionalidad: 'BR', idioma: 'pt',
    celebracionesActivas: false, sonidoActivo: false, volumenSonido: 23,
    datoAdicional: { conservar: true } };
  Object.assign(c.state, preferences);
  const stateReference = c.state;
  await c.deshacerUltimoPartido();
  assert.equal(c.state, stateReference);
  for (const [key, value] of Object.entries(preferences)) assert.deepEqual(c.state[key], value);
  assert.equal(c.state.rachaWinsActual, 0);
  assert.equal(c.state.totalJugados, 0);
});

test('respeta reinicio de rachas posterior y cuenta el siguiente partido', async () => {
  for (const previousMatches of [0, 4]) {
    const { context: c } = app();
    for (let i = 0; i < previousMatches; i++) await c.procesarResultado('win', false);
    await c.procesarResultado('win', false);
    await c.reiniciarRachas();
    await c.deshacerUltimoPartido();
    assert.equal(c.state.rachaResetIndex, previousMatches);
    assert.deepEqual(copy(c.calcRachas()), { rwa:0, rwm:0, rla:0, rlm:0, cca:0, cmej:0, cpeo:0, fj:0, fg:0, fp:0 });
    await c.procesarResultado('win', false);
    assert.equal(c.calcRachas().rwa, 1);
    await c.deshacerUltimoPartido();
    assert.equal(c.calcRachas().rwa, 0);
  }
});

test('cancelar reinicio mantiene la reversión deportiva', async () => {
  const { context: c } = app();
  await c.procesarResultado('win', false);
  const before = copy({ ...c.state, snapshot: null });
  await c.procesarResultado('win', false);
  c.confirmar = async () => false;
  await c.reiniciarRachas();
  await c.deshacerUltimoPartido();
  assert.deepEqual(copy(c.state), before);
});

test('renovación manual se conserva; el próximo partido sigue siendo reversible', async () => {
  const { context: c } = app();
  c.state.contadorRenov = 7;
  await c.procesarResultado('win', false);
  c.renovarPlan();
  await c.deshacerUltimoPartido();
  assert.equal(c.state.contadorRenov, 1);
  await c.procesarResultado('loss', false);
  assert.equal(c.state.contadorRenov, 2);
  await c.deshacerUltimoPartido();
  assert.equal(c.state.contadorRenov, 1);
});

test('estado antiguo sin campos de rachas se conserva al deshacer', async () => {
  const { context: c } = app();
  for (const key of Object.keys(c.state)) {
    if (/^(racha|finales|copa[A-Z])/.test(key)) delete c.state[key];
  }
  const before = copy(c.state);
  await c.procesarResultado('win', false);
  await c.deshacerUltimoPartido();
  assert.deepEqual(copy(c.state), before);
});

test('guardar excluye el snapshot y mantiene los campos persistidos', async () => {
  const { context: c, writes } = app();
  const keys = Object.keys(c.state).filter(key => key !== 'snapshot').sort();
  await c.procesarResultado('win', false);
  await c.guardar();
  await c.deshacerUltimoPartido();
  for (const { table, row } of writes) {
    assert.equal(table, 'game_state');
    assert.deepEqual(Object.keys(row.state).sort(), keys);
    assert.equal(row.state.snapshot, undefined);
  }
  assert.equal(writes.at(-1).row.state.totalJugados, 0);
});

test('reiniciar estadísticas invalida Deshacer como antes', async () => {
  const { context: c } = app();
  await c.procesarResultado('win', false);
  c.reiniciarEstadisticasPrincipales();
  const before = copy(c.state);
  await c.deshacerUltimoPartido();
  assert.deepEqual(copy(c.state), before);
});

test('tres ciclos completos muestran 0..10 y Deshacer restaura cada transición', async () => {
  const { context: c } = app();
  assert.equal(c.state.contadorRenov, 1);
  for (let n = 1; n <= 30; n++) {
    const previous = c.state.contadorRenov;
    await c.procesarResultado(n % 2 ? 'win' : 'loss', n % 3 === 0);
    const expected = ((n - 1) % 10) + 2;
    assert.equal(c.state.contadorRenov, expected);
    await c.deshacerUltimoPartido();
    assert.equal(c.state.contadorRenov, previous);
    await c.procesarResultado(n % 2 ? 'win' : 'loss', n % 3 === 0);
    assert.equal(c.state.contadorRenov, expected);
  }
  assert.equal(c.state.historial.length, 30);
  const history = copy(c.state.historial);
  await c.renovarPlan();
  assert.equal(c.state.contadorRenov, 1);
  assert.deepEqual(copy(c.state.historial), history);
  assert.equal(c.state.totalJugados, 30);
});
