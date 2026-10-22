const { test } = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');
const code = fs.readFileSync(path.join(__dirname, '..', 'sw.js'), 'utf8');
function worker(fetch) {
  const handlers = {};
  const lifecycle = { installed: false, claimed: false };
  vm.runInNewContext(code, {
    Response, fetch,
    self: { addEventListener: (name, fn) => { handlers[name] = fn; }, skipWaiting: () => { lifecycle.installed = true; } },
    clients: { claim: async () => { lifecycle.claimed = true; } },
    caches: new Proxy({}, { get() { throw new Error('No debe usar Cache Storage'); } })
  });
  return { handlers, lifecycle, request(request) {
    let response;
    handlers.fetch({ request, respondWith: promise => { response = promise; } });
    return response;
  } };
}
test('instala y activa sin caché', async () => {
  const w = worker(() => {});
  w.handlers.install({});
  let activation;
  w.handlers.activate({ waitUntil: promise => { activation = promise; } });
  await activation;
  assert.deepEqual(w.lifecycle, { installed: true, claimed: true });
});
test('conserva la petición y la respuesta de red, incluidos errores HTTP', async () => {
  for (const status of [200, 404, 500, 503]) {
    const response = new Response('original', { status, headers: { 'Content-Type': 'application/javascript' } });
    const request = { mode: 'navigate' };
    const w = worker(async received => { assert.equal(received, request); return response; });
    assert.equal(await w.request(request), response);
  }
});
test('navegación sin red recibe HTML 503 que no se almacena', async () => {
  const w = worker(async () => { throw new TypeError('offline'); });
  const response = await w.request({ mode: 'navigate', destination: 'document' });
  assert.equal(response.status, 503);
  assert.equal(response.ok, false);
  assert.equal(response.headers.get('Content-Type'), 'text/html; charset=utf-8');
  assert.equal(response.headers.get('Cache-Control'), 'no-store');
  assert.match(await response.text(), /Sin conexión/);
});
test('JS, CSS, imágenes, fuentes y API sin red son errores de red sin HTML', async () => {
  const w = worker(async () => { throw new TypeError('offline'); });
  for (const destination of ['script', 'style', 'image', 'font', '', 'document']) {
    const response = await w.request({ mode: 'cors', destination });
    assert.equal(response.type, 'error');
    assert.equal(response.status, 0);
    assert.equal(await response.text(), '');
    assert.equal(response.headers.get('Content-Type'), null);
  }
});
test('al volver la red se consulta otra vez, sin reutilizar el fallback', async () => {
  let offline = true, calls = 0;
  const w = worker(async () => { calls++; if (offline) throw new TypeError('offline'); return new Response('recuperado'); });
  assert.equal((await w.request({ mode: 'navigate' })).status, 503);
  offline = false;
  assert.equal(await (await w.request({ mode: 'navigate' })).text(), 'recuperado');
  assert.equal(calls, 2);
});
