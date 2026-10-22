// node --test tests/*.test.cjs — funciones reales, Supabase/DOM simulados, sin red.
const { readFileSync } = require('node:fs');
const { join } = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const { test } = require('node:test');
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const copy = value => JSON.parse(JSON.stringify(value));

function source(name) {
  const start = html.search(new RegExp(`(?:async )?function ${name}\\(`));
  assert.notEqual(start, -1, name);
  return html.slice(start, html.indexOf('\n}', start) + 2);
}

function deferred() {
  let resolve;
  const promise = new Promise(done => { resolve = done; });
  return { promise, resolve };
}

function app() {
  const elements = new Map(), timers = new Map(), writes = [], queries = [];
  let nextTimer = 0;
  const fixture = {
    response: { data: [], error: null }, session: null, authListener: null,
    authResponse: { data: { user: { id: 'alice' }, session: {} }, error: null },
  };
  function element(id) {
    if (!elements.has(id)) elements.set(id, {
      classList:{remove(){}}, style: {}, hidden: false, textContent: '', value: '', handlers: {},
      addEventListener(event, fn) { this.handlers[event] = fn; },
    });
    return elements.get(id);
  }
  const c = vm.createContext({
    document: { getElementById: element, body: {} },
    I18N: { t: key => key, setLocale() {}, translateDOM() {} },
    aplicarIdiomaLocalGuardado() {}, guardarIdiomaLocal() {},
    poblarSelectsConfig() {}, actualizarSubtitulosPerfil() {}, renderizar() {},
    renderizarConfig() {}, aplicarIdiomaLocalGuardado() {}, actualizarSubtitulosPerfil() {}, actualizarNavegacion() {}, cerrarDialogo() {}, cerrarDialogosSesion() {}, CELEBRACION: { detener() {} }, console: { error() {} },
    setTimeout(fn) { timers.set(++nextTimer, fn); return nextTimer; },
    clearTimeout(id) { timers.delete(id); },
    sb: {
      from(table) {
        assert.equal(table, 'game_state');
        return {
          select(columns) {
            assert.equal(columns, 'state');
            return { eq: async (column, userId) => {
              queries.push({ column, userId });
              if (fixture.response instanceof Error) throw fixture.response;
              return await fixture.response;
            } };
          },
          async upsert(row, options) { writes.push(copy({ row, options })); return { error: null }; },
        };
      },
      auth: {
        async getSession() { return { data: { session: fixture.session } }; },
        onAuthStateChange(fn) { fixture.authListener = fn; },
        async signInWithPassword() { return fixture.authResponse; },
        async signUp() { return fixture.authResponse; },
        async signOut() { if (fixture.authListener) fixture.authListener('SIGNED_OUT', null); return { error:null }; },
      },
    },
  });
  const names = ['capturarSesion', 'sesionVigente', 'limpiarSesion', 'defaultState', 'estadoListo', 'invalidarCargaEstado',
    'actualizarEstadoGuardado', 'hayCambiosSinGuardar', 'prepararGuardado', 'vaciarGuardado',
    'interpretarPartidoHistorico', 'reconstruirRachasDesdeHistorial', 'guardarConDebounce', 'guardar', 'cargarEstado', 'cargarYMostrarApp',
    'cambiarPantallaSesion', 'mostrarLoading', 'mostrarLogin', 'mostrarApp', 'inicializar', 'logout'];
  vm.runInContext(`${html.split('\n').find(line => line.startsWith('const FASES ='))}
    ${names.map(source).join('\n')}
    var _confirmResolve=null, archTipoActual="temporada", eleccionUsuario=null, pendingResult=null, monedaUsada=false, panelAbierto=false, pantallaActiva="app";
    var state = defaultState(), currentUser = { id:'alice' };
    var estadoCargadoUsuario = null, cargaEstadoVersion = 0, guardarTimeout = null;
    var guardado = null, salidaEnCurso = false;`, c);
  const authStart = html.indexOf("document.getElementById('btnLogin').addEventListener");
  vm.runInContext(html.slice(authStart, html.indexOf('// ── PERSISTENCIA', authStart)), c);
  for (const id of ['btnRetryLoad', 'btnLogoutLoad']) {
    const line = html.split('\n').find(line => line.startsWith(`document.getElementById('${id}').addEventListener`));
    vm.runInContext(line, c);
  }
  element('loginEmail').value = 'test@example.invalid';
  element('loginPassword').value = 'test-only';
  return { c, fixture, writes, queries, element, timers };
}

function existing(c) {
  const result = copy(c.defaultState());
  result.totalJugados = 42;
  result.copas = 3;
  result.nombrePerfil = 'Conservar';
  result.historial = [{ res: 'win', texto: 'Histórico sin transformar' }];
  result.datoDesconocido = { preservar: true };
  delete result.snapshot; // Como el estado persistido real del cliente.
  return result;
}

test('login o registro pendiente no reabre una sesión invalidada', async () => {
  for (const id of ['btnLogin', 'btnRegister']) {
    const { c, fixture, element, queries } = app();
    const pending = deferred();
    fixture.authResponse = pending.promise;
    const request = element(id).handlers.click.call(element(id));
    c.limpiarSesion();
    pending.resolve({ data: { user: { id: 'alice' }, session: {} }, error: null });
    await request;
    assert.equal(c.currentUser, null);
    assert.equal(queries.length, 0);
    assert.equal(element('loginScreen').style.display, 'flex');
    assert.equal(element(id).disabled, false);
  }
});

test('estado existente: conserva datos, habilita app y no escribe al cargar', async () => {
  const { c, fixture, writes, queries, element } = app();
  const stored = existing(c);
  fixture.response = { data: [{ state: copy(stored) }], error: null };
  await c.cargarYMostrarApp();
  assert.deepEqual(copy(c.state), stored);
  assert.equal(c.estadoListo(), true);
  assert.equal(element('appScreen').style.display, 'block');
  assert.deepEqual(queries, [{ column:'user_id', userId:'alice' }]);
  assert.equal(writes.length, 0);
  await c.guardar();
  assert.deepEqual(writes[0].row.state, stored);
});

test('sin filas y sin error: inicializa y permite guardar al usuario nuevo', async () => {
  const { c, writes } = app();
  assert.equal(await c.cargarEstado(), true);
  assert.deepEqual(copy(c.state), copy(c.defaultState()));
  assert.equal(writes.length, 0);
  await c.guardar();
  assert.equal(writes.length, 1);
  assert.equal(writes[0].row.user_id, 'alice');
  assert.equal(writes[0].row.state.snapshot, undefined);
});

test('errores y respuestas ambiguas bloquean app y ambas vías de guardado', async () => {
  const failures = [
    { data:null, error:{ message:'offline' } },
    { data:[], error:{ code:'PGRST116', message:'cardinality error' } },
    { data:[], error:{ message:'permission denied' } },
    new Error('network failure'),
    { data:null, error:null },
    { data:[{ state:null }], error:null },
    { data:[{ state:{} }], error:null },
    { data:[{ state:[] }], error:null },
    { data:[{ state:'invalid' }], error:null },
    { data:[{ state:{ marcador:'incompleto' } }], error:null },
    ...['fgResultados', 'eliminatoriasDone', 'historial'].flatMap(field =>
      [undefined, null, {}].map(value => ({ data:[{ state:{ ...app().c.defaultState(), [field]:value } }], error:null }))),
    { data:[{ state:{ ...app().c.defaultState(), fase:'desconocida' } }], error:null },
  ];
  for (const response of failures) {
    const { c, fixture, writes, element, timers } = app();
    const previous = c.state;
    fixture.response = response;
    await c.cargarYMostrarApp();
    assert.equal(c.estadoListo(), false);
    assert.equal(c.state, previous, 'no reemplazar el estado ante error');
    assert.equal(element('loadError').hidden, false);
    c.mostrarApp();
    assert.equal(element('appScreen').style.display, 'none');
    c.state.totalJugados = 1; // Aun una llamada residual no puede escribir.
    await c.guardar();
    c.guardarConDebounce();
    assert.equal(timers.size, 0);
    assert.equal(writes.length, 0);
  }
});

test('múltiples filas no se interpretan como ausencia de datos', async () => {
  const { c, fixture, writes } = app();
  fixture.response = { data:[{ state:existing(c) }, { state:existing(c) }], error:null };
  assert.equal(await c.cargarEstado(), false);
  await c.guardar();
  assert.equal(writes.length, 0);
});

test('Reintentar recupera el estado remoto correcto y elimina el bloqueo', async () => {
  const { c, fixture, writes, element } = app();
  fixture.response = { data:null, error:{ message:'offline' } };
  await c.cargarYMostrarApp();
  const stored = existing(c);
  fixture.response = { data:[{ state:copy(stored) }], error:null };
  await element('btnRetryLoad').handlers.click();
  assert.deepEqual(copy(c.state), stored);
  assert.equal(element('loadError').hidden, true);
  assert.equal(element('appScreen').style.display, 'block');
  assert.equal(writes.length, 0);
});

test('una nueva carga vacía los cambios pendientes antes de reemplazar el estado', async () => {
  const { c, fixture, timers, writes } = app();
  await c.cargarEstado();
  c.state.totalJugados = 5;
  c.guardarConDebounce();
  fixture.response = { data:null, error:{ message:'offline' } };
  await c.cargarYMostrarApp();
  assert.equal(c.estadoListo(), false);
  assert.equal(timers.size, 0);
  assert.equal(writes.length, 1);
  assert.equal(writes[0].row.state.totalJugados, 5);
  await c.guardar();
  assert.equal(writes.length, 1);
});

test('logout durante carga descarta la respuesta tardía y no abre la app', async () => {
  const { c, fixture, element, writes } = app();
  const load = deferred();
  fixture.response = load.promise;
  const stored = existing(c);
  const loading = c.cargarYMostrarApp();
  await element('btnLogoutLoad').handlers.click();
  load.resolve({ data:[{ state:stored }], error:null });
  await loading;
  assert.equal(c.currentUser, null);
  assert.equal(c.estadoListo(), false);
  assert.equal(element('loginScreen').style.display, 'flex');
  assert.equal(element('appScreen').style.display, 'none');
  assert.equal(c.state.totalJugados, 0);
  await c.guardar();
  assert.equal(writes.length, 0);
});

test('otra cuenta u otro intento no recibe la respuesta de una carga antigua', async () => {
  for (const sameUser of [true, false]) {
    const { c, fixture } = app();
    const old = deferred();
    fixture.response = old.promise;
    const loadingOld = c.cargarEstado();
    c.currentUser = { id: sameUser ? 'alice' : 'bob' };
    const stored = existing(c);
    fixture.response = { data:[{ state:stored }], error:null };
    assert.equal(await c.cargarEstado(), true);
    old.resolve({ data:[], error:null });
    assert.equal(await loadingOld, false);
    assert.equal(c.state.totalJugados, 42);
    assert.equal(c.estadoListo(), true);
    c.currentUser = { id:'other' };
    assert.equal(c.estadoListo(), false);
  }
});

test('login y registro con sesión consultan y solo abren tras carga correcta', async () => {
  for (const id of ['btnLogin', 'btnRegister']) for (const fail of [true, false]) {
    const { c, fixture, element, writes, queries } = app();
    fixture.response = fail ? { data:null, error:{ message:'offline' } }
      : { data:[{ state:existing(c) }], error:null };
    await element(id).handlers.click.call(element(id));
    assert.equal(queries.length, 1);
    assert.equal(c.estadoListo(), !fail);
    assert.equal(element('appScreen').style.display, fail ? 'none' : 'block');
    assert.equal(writes.length, 0, 'registro no debe escribir un estado vacío antes de consultar');
  }
});

test('registro sin sesión conserva la confirmación por correo', async () => {
  const { fixture, element, queries, writes } = app();
  fixture.authResponse = { data:{ user:{ id:'alice' }, session:null }, error:null };
  await element('btnRegister').handlers.click.call(element('btnRegister'));
  assert.equal(element('loginError').textContent, 'login.accountCreated');
  assert.equal(queries.length, 0);
  assert.equal(writes.length, 0);
});

test('arranque con sesión, refresh, SIGNED_OUT y arranque sin sesión', async () => {
  for (const hasSession of [false, true]) for (const fail of [false, true]) {
    const { c, fixture, element, writes } = app();
    c.currentUser = null;
    fixture.session = hasSession ? { user:{ id:'alice' } } : null;
    fixture.response = fail ? { data:null, error:{ message:'offline' } }
      : { data:[{ state:existing(c) }], error:null };
    await c.inicializar();
    assert.equal(c.estadoListo(), hasSession && !fail);
    if (!hasSession) assert.equal(element('loginScreen').style.display, 'flex');
    if (hasSession) {
      fixture.authListener('TOKEN_REFRESHED', { user:{ id:'alice' } });
      assert.equal(c.estadoListo(), !fail);
      fixture.authListener('SIGNED_OUT', null);
      assert.equal(c.estadoListo(), false);
      assert.equal(c.currentUser, null);
      assert.equal(element('loginScreen').style.display, 'flex');
    }
    await c.guardar();
    assert.equal(writes.length, 0);
  }
});
