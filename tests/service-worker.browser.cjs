// Servidor local y service worker real. Autenticación simulada, sin Supabase real.
const { chromium } = require('playwright');
const http = require('node:http'), fs = require('node:fs'), path = require('node:path'), assert = require('node:assert/strict');
const root = path.join(__dirname, '..');
(async () => {
  const server = http.createServer((req, res) => {
    const url = new URL(req.url, 'http://localhost');
    res.setHeader('Cache-Control', 'no-store');
    if (url.pathname === '/test-external.js') { res.setHeader('Content-Type', 'text/javascript'); return res.end(''); }
    if (url.pathname === '/http-error') { res.writeHead(500, { 'Content-Type': 'text/plain' }); return res.end('server error'); }
    const file = path.join(root, url.pathname === '/' ? 'index.html' : url.pathname.slice(1));
    if (!fs.existsSync(file) || !fs.statSync(file).isFile()) { res.writeHead(404); return res.end('missing'); }
    let body = fs.readFileSync(file);
    if (file.endsWith('index.html')) {
      // El HTML y el registro SW son reales; sustituir únicamente dependencias externas.
      body = body.toString().replace(/src="https:[^"]+"/g, 'src="/test-external.js"').replace(/<link[^>]+href="https:[^>]+>/g, '');
    }
    res.setHeader('Content-Type', file.endsWith('.html') ? 'text/html; charset=utf-8' : file.endsWith('.js') ? 'text/javascript' : file.endsWith('.json') ? 'application/json' : 'image/png');
    res.end(body);
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  const browser = await chromium.launch({ headless: true, ...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE } : {}) });
  try {
    for (const width of [1440, 390]) {
      const context = await browser.newContext({ viewport: { width, height: 900 }, serviceWorkers: 'allow' });
      await context.addInitScript(() => {
        window.supabase = { createClient: () => ({ auth: { getSession: async () => ({ data: { session: null } }), onAuthStateChange() {} } }) };
      });
      const page = await context.newPage();
      const errors = []; page.on('pageerror', e => errors.push(e.message));
      assert.equal((await page.goto(base)).status(), 200);
      await page.locator('#loginScreen').waitFor({ state: 'visible' });
      await page.evaluate(() => navigator.serviceWorker.ready);
      await page.waitForFunction(() => !!navigator.serviceWorker.controller);
      assert.equal((await page.reload()).status(), 200);
      await page.locator('#loginScreen').waitFor({ state: 'visible' });
      assert.deepEqual(await page.evaluate(() => caches.keys()), []);
      assert.equal(await page.evaluate(async () => (await fetch('/http-error')).status), 500);
      assert.equal(await page.evaluate(async () => (await fetch('/missing')).status), 404);
      // El start_url del manifiesto sigue abriendo la aplicación controlada por el SW.
      const manifest = await page.evaluate(async () => (await fetch('/manifest.json')).json());
      assert.equal(manifest.display, 'standalone');
      // el navegador debe poder decodificar los tamaños declarados.
      const metadata = await page.evaluate(async manifest => {
        const manifestURL = document.querySelector('link[rel="manifest"]').href;
        const icons = manifest.icons.map(icon => ({ ...icon, src: new URL(icon.src, manifestURL).href }));
        document.querySelectorAll('link[rel="icon"], link[rel="apple-touch-icon"]').forEach(link => {
          icons.push({ src: link.href, sizes: link.sizes.value });
        });
        const decoded = [];
        for (const icon of icons) {
          const response = await fetch(icon.src);
          const bitmap = await createImageBitmap(await response.blob());
          decoded.push({ declared: icon.sizes, actual: `${bitmap.width}x${bitmap.height}`, status: response.status, type: response.headers.get('content-type') });
          bitmap.close();
        }
        return { decoded, theme: document.querySelector('meta[name="theme-color"]').content,
          background: getComputedStyle(document.documentElement).getPropertyValue('--bg').trim() };
      }, manifest);
      for (const icon of metadata.decoded) {
        assert.equal(icon.status, 200);
        assert.equal(icon.type, 'image/png');
        assert.equal(icon.actual, icon.declared);
      }
      assert.deepEqual(manifest.icons.map(icon => icon.sizes).sort(), ['192x192', '512x512']);
      assert.equal(manifest.theme_color, metadata.background);
      assert.equal(manifest.background_color, metadata.background);
      assert.equal(metadata.theme, metadata.background);
      const cdp = await context.newCDPSession(page);
      const parsedManifest = await cdp.send('Page.getAppManifest');
      assert.deepEqual(parsedManifest.errors, [], 'manifest válido para Chromium');
      await cdp.detach();
      const launch = await context.newPage();
      await launch.goto(base + manifest.start_url);
      await launch.locator('#loginScreen').waitFor({ state: 'visible' });
      assert.equal(await launch.evaluate(() => !!navigator.serviceWorker.controller), true);
      await launch.close();
      await context.setOffline(true);
      for (const resource of ['/i18n/es.js?offline', '/styles.css?offline', '/icon.png?offline', ...manifest.icons.map(icon => '/' + icon.src + '?offline'), '/api?offline']) {
        assert.equal(await page.evaluate(async url => { try { await fetch(url); return 'response'; } catch (e) { return e.name; } }, resource), 'TypeError');
      }
      // Destinos reales script/style/image: deben disparar error, nunca load.
      for (const tag of ['script', 'link', 'img']) {
        assert.equal(await page.evaluate(tag => new Promise(resolve => {
          const el = document.createElement(tag);
          el.onload = () => resolve('load'); el.onerror = () => resolve('error');
          if (tag === 'link') { el.rel = 'stylesheet'; el.href = '/offline.css'; }
          else el.src = tag === 'script' ? '/offline.js' : '/offline.png';
          document.head.appendChild(el);
        }), tag), 'error');
      }
      const offline = await page.reload();
      assert.equal(offline.status(), 503);
      assert.equal(offline.headers()['cache-control'], 'no-store');
      assert.match(await page.locator('body').innerText(), /Sin conexión/);
      assert.equal(await page.locator('#appScreen').count(), 0);
      if (process.env.QA_OUTPUT_DIR) await page.screenshot({ path: path.join(process.env.QA_OUTPUT_DIR, `a13-offline-${width}.png`) });
      await context.setOffline(false);
      assert.equal((await page.reload()).status(), 200);
      await page.locator('#loginScreen').waitFor({ state: 'visible' });
      assert.equal(await page.evaluate(async () => (await fetch('/i18n/es.js')).status), 200);
      assert.deepEqual(await page.evaluate(() => caches.keys()), []);
      assert.deepEqual(errors, []);
      console.log(`OK ${width}px: registro/activación, inicio, start_url PWA, HTTP 404/500, navegación 503, recursos con error de red y recuperación sin caché`);
      console.log(`OK ${width}px: manifest válido, iconos decodificados con dimensiones correctas y colores coherentes`);
      await context.close();
    }
  } finally { await browser.close(); await new Promise(resolve => server.close(resolve)); }
})().catch(error => { console.error(error); process.exitCode = 1; });
