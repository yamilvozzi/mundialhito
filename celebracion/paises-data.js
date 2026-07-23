// ── CELEBRACIÓN: DATOS POR PAÍS ────────────────────────
// Cada país trae sus colores de bandera (usados en el confetti) y la ruta
// del fragmento de himno a reproducir al ganar una Copa. Un país que ya
// existe en la lista de Configuración (ver PAISES en index.html) pero que
// NO tiene entrada acá usa automáticamente la celebración genérica —
// confetti con los colores de marca de la app y sin audio (ver
// celebracion.js → coloresGenericos()).
//
// Cómo agregar un país nuevo:
//   1. Confirmar que el código ya existe en PAISES (index.html). Si no,
//      agregarlo ahí primero (1 línea, como cualquier país nuevo).
//   2. Subir el archivo de audio a audio/himnos/{CODE}.mp3
//      (fragmento de 6–12s, formato MP3, dominio público o licencia libre).
//   3. Agregar acá una entrada de 4 líneas con CELEBRACION.registrarPais().
// No hace falta tocar celebracion.js ni index.html.
//
// Este archivo debe cargarse DESPUÉS de celebracion.js.

CELEBRACION.registrarPais('AR', {
  colores: ['#74ACDF', '#FFFFFF'],
  himno: 'audio/himnos/AR.mp3'
});
CELEBRACION.registrarPais('BR', {
  colores: ['#009739', '#FEDD00', '#012169'],
  himno: 'audio/himnos/BR.mp3'
});
CELEBRACION.registrarPais('CL', {
  colores: ['#0033A0', '#FFFFFF', '#D52B1E'],
  himno: 'audio/himnos/CL.mp3'
});
CELEBRACION.registrarPais('UY', {
  colores: ['#0038A8', '#FFFFFF', '#FCD116'],
  himno: 'audio/himnos/UY.mp3'
});
CELEBRACION.registrarPais('US', {
  colores: ['#3C3B6E', '#FFFFFF', '#B22234'],
  himno: 'audio/himnos/US.mp3'
});
CELEBRACION.registrarPais('MX', {
  colores: ['#006847', '#FFFFFF', '#CE1126'],
  himno: 'audio/himnos/MX.mp3'
});
CELEBRACION.registrarPais('ES', {
  colores: ['#AA151B', '#F1BF00'],
  himno: 'audio/himnos/ES.mp3'
});
CELEBRACION.registrarPais('FR', {
  colores: ['#0055A4', '#FFFFFF', '#EF4135'],
  himno: 'audio/himnos/FR.mp3'
});
CELEBRACION.registrarPais('IT', {
  colores: ['#008C45', '#F4F5F0', '#CD212A'],
  himno: 'audio/himnos/IT.mp3'
});
CELEBRACION.registrarPais('DE', {
  colores: ['#000000', '#DD0000', '#FFCE00'],
  himno: 'audio/himnos/DE.mp3'
});
CELEBRACION.registrarPais('GB', {
  colores: ['#00247D', '#FFFFFF', '#CF142B'],
  himno: 'audio/himnos/GB.mp3'
});

// Países pendientes de completar — usan celebración genérica hasta entonces:
// JP, KR, CN
