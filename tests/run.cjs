// ejecutar las suites existentes; no inicia la app ni usa Supabase real.
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const mode = process.argv.slice(2);
if (mode.length > 1 || (mode.length && !['--unit', '--browser'].includes(mode[0]))) {
  console.error('Uso: node tests/run.cjs [--unit|--browser]');
  process.exit(2);
}
const files = fs.readdirSync(__dirname).sort();
const unit = files.filter(file => file.endsWith('.test.cjs'));
const browser = files.filter(file => file.endsWith('.browser.cjs'));
function run(args) {
  const result = spawnSync(process.execPath, args, {
    cwd: path.join(__dirname, '..'), stdio: 'inherit', env: process.env,
    timeout: 180000, windowsHide: true
  });
  if (result.error || result.status !== 0) {
    console.error('Falló:', args.join(' '), result.error?.message || result.signal || '');
    process.exit(result.status || 1);
  }
}
if (mode[0] !== '--browser') {
  if (!unit.length) throw new Error('No se encontraron tests de lógica.');
  run(['--test', ...unit.map(file => path.join('tests', file))]);
}
if (mode[0] !== '--unit') {
  if (!browser.length) throw new Error('No se encontraron tests de navegador.');
  // Secuenciales para facilitar el diagnóstico y evitar competir por navegadores.
  for (const file of browser) {
    console.log('\nSuite:', file);
    run([path.join('tests', file)]);
  }
}
console.log('\nTodas las suites seleccionadas finalizaron correctamente.');
