// contrato de diccionarios, parámetros y fallback, sin navegador ni backend.
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.join(__dirname, '..');
const dictionaries = {};
for (const file of fs.readdirSync(path.join(root, 'i18n')).filter(f => f !== 'i18n.js')) {
  vm.runInNewContext(fs.readFileSync(path.join(root, 'i18n', file), 'utf8'), {
    I18N: { registrarIdioma: (code, dict) => { dictionaries[code] = dict; } }
  });
}
function flatten(object, prefix = '', result = {}) {
  for (const [key, value] of Object.entries(object)) {
    if (typeof value === 'object') flatten(value, prefix + key + '.', result);
    else result[prefix + key] = value;
  }
  return result;
}
const flat = Object.fromEntries(Object.entries(dictionaries).map(([code, dict]) => [code, flatten(dict)]));
const params = text => [...text.matchAll(/\{\{(\w+)\}\}/g)].map(m => m[1]).sort();
function engine() {
  const context = { window: {}, document: { documentElement: {}, querySelectorAll: () => [] } };
  vm.runInNewContext(fs.readFileSync(path.join(root, 'i18n/i18n.js'), 'utf8'), context);
  for (const [code, dict] of Object.entries(dictionaries)) context.window.I18N.registrarIdioma(code, dict);
  return context.window.I18N;
}

test('diez idiomas y plantilla tienen las mismas claves y parámetros completos', () => {
  assert.equal(Object.keys(dictionaries).length, 11);
  const keys = Object.keys(flat.es).sort();
  for (const [code, dict] of Object.entries(flat)) {
    assert.deepEqual(Object.keys(dict).sort(), keys, code);
    for (const key of keys) {
      assert.equal(typeof dict[key], 'string', code + ':' + key);
      assert.ok(dict[key].trim(), code + ':' + key);
      assert.deepEqual(params(dict[key]), params(flat.es[key]), code + ':' + key);
      assert.doesNotMatch(dict[key].replace(/\{\{\w+\}\}/g, ''), /[{}]/, code + ':' + key);
    }
  }
  assert.deepEqual(flat.xx, flat.es, 'plantilla española completa y sincronizada');
});

test('todas las claves estáticas y familias dinámicas usadas existen en español', () => {
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  const keys = [
    ...[...html.matchAll(/data-i18n(?:-placeholder|-title|-aria-label)?="([^"]+)"/g)].map(m => m[1]),
    ...[...html.matchAll(/I18N\.t\('([^']+)'\s*[,)]/g)].map(m => m[1])
  ];
  for (const key of keys) assert.ok(key in flat.es, key);
  for (const phase of ['FG','E8','E4','SF','FINAL']) {
    assert.ok('phase.name.' + phase in flat.es);
    assert.ok('phase.desc.' + phase in flat.es);
  }
  for (const status of ['saving','saved','error','sessionEnded','logoutError']) assert.ok('persistence.' + status in flat.es);
});

test('interpolación de todas las cadenas, valores literales y parámetros repetidos', () => {
  const i18n = engine();
  for (const [code, dict] of Object.entries(flat)) {
    i18n.setLocale(code);
    for (const [key, text] of Object.entries(dict)) {
      const values = Object.fromEntries(params(text).map(name => [name, '$&-7']));
      const expected = text.replace(/\{\{(\w+)\}\}/g, (_, name) => values[name]);
      assert.equal(i18n.t(key, values), expected, code + ':' + key);
    }
  }
  i18n.registrarIdioma('test', { repeated: '{{n}} / {{n}}' });
  i18n.setLocale('test');
  assert.equal(i18n.t('repeated', { n: 0 }), '0 / 0');
});

test('fallback a español para idioma o clave ausentes, incluida interpolación', () => {
  const i18n = engine();
  i18n.setLocale('unknown');
  assert.equal(i18n.getLocale(), 'es');
  assert.equal(i18n.t('login.loadError'), flat.es['login.loadError']);
  i18n.registrarIdioma('partial', { common: { save: 'Custom' } });
  i18n.setLocale('partial');
  assert.equal(i18n.t('common.save'), 'Custom');
  assert.equal(i18n.t('plan.nextMatch', { number: 4 }), 'Próximo partido: 4');
  assert.equal(i18n.t('missing.key'), 'missing.key');
});

test('vocabulario de copas y países, sin renombrar fases ni historial', () => {
  assert.equal(flat.en['rachas.fastestCup'], 'Fastest cup');
  assert.equal(flat.en['rachas.longestCup'], 'Slowest cup');
  assert.equal(flat.en['streakHistory.fastestCup'], flat.en['rachas.fastestCup']);
  assert.equal(flat.en['streakHistory.longestCup'], flat.en['rachas.longestCup']);
  assert.equal(flat.en['country.CL'], 'Chile');
  assert.equal(flat.de['country.CL'], 'Chile');
  assert.equal(flat.fr['country.CL'], 'Chili');
  assert.equal(flat.ko['country.CL'], '칠레');
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  assert.match(html, /const FASES = \['FG','E8','E4','SF','FINAL'\]/);
  assert.match(html, /FINAL:'Gran Final'/);
  assert.equal((html.match(/class="br-label" data-i18n="bracket.final"/g) || []).length, 2);
});
