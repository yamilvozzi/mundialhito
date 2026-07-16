// ── I18N: MOTOR DE TRADUCCIÓN ──────────────────────────
// Desacoplado de los diccionarios de cada idioma (ver i18n/es.js, i18n/en.js)
// y del resto de la app. No depende de módulos ES para mantenerse compatible
// con la estructura actual (scripts clásicos, sin build step).
//
// Uso:
//   I18N.setLocale(state.idioma)     → cambia el idioma activo y re-traduce el DOM
//   I18N.t('config.title')           → obtiene un texto por clave (con fallback a Español)
//   I18N.translateDOM()              → aplica traducciones a los elementos [data-i18n] ya presentes
//
// Agregar un idioma nuevo (mañana, por ejemplo, portugués) NO requiere tocar
// este archivo: solo se crea i18n/pt.js con I18N.registrarIdioma('pt', {...})
// y se agrega el <script> correspondiente en el <head>.
(function (global) {
  'use strict';

  const DICCIONARIOS = {};        // se completa vía registrarIdioma() desde cada archivo de idioma
  const FALLBACK_LOCALE = 'es';   // idioma que se usa cuando una clave no está traducida todavía
  let currentLocale = FALLBACK_LOCALE;
  const listeners = [];

  function registrarIdioma(code, dict) {
    DICCIONARIOS[code] = dict;
  }

  function resolveKey(dict, key) {
    return key.split('.').reduce(function (obj, part) {
      return (obj && obj[part] !== undefined) ? obj[part] : undefined;
    }, dict);
  }

  // Devuelve el texto traducido para "key" (ej: 'config.title').
  // Si la clave no existe en el idioma activo, cae a Español.
  // Si tampoco existe en Español, devuelve la propia key (útil para detectar
  // faltantes durante la migración progresiva de pantallas).
  function t(key, params) {
    const dictActual = DICCIONARIOS[currentLocale] || {};
    const dictFallback = DICCIONARIOS[FALLBACK_LOCALE] || {};
    let texto = resolveKey(dictActual, key);
    if (texto === undefined) texto = resolveKey(dictFallback, key);
    if (texto === undefined) return key;
    if (params) {
      Object.keys(params).forEach(function (k) {
        texto = texto.replace('{{' + k + '}}', params[k]);
      });
    }
    return texto;
  }

  // Traduce los elementos [data-i18n] / [data-i18n-placeholder] / [data-i18n-title]
  // presentes en el DOM. Las pantallas que todavía no fueron migradas simplemente
  // no tienen estos atributos, así que no se ven afectadas.
  function translateDOM(root) {
    root = root || document;
    root.querySelectorAll('[data-i18n]').forEach(function (el) {
      el.textContent = t(el.getAttribute('data-i18n'));
    });
    root.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      el.placeholder = t(el.getAttribute('data-i18n-placeholder'));
    });
    root.querySelectorAll('[data-i18n-title]').forEach(function (el) {
      el.title = t(el.getAttribute('data-i18n-title'));
    });
  }

  function setLocale(code) {
    currentLocale = DICCIONARIOS[code] ? code : FALLBACK_LOCALE;
    document.documentElement.lang = currentLocale;
    translateDOM();
    listeners.forEach(function (fn) { fn(currentLocale); });
  }

  function getLocale() {
    return currentLocale;
  }

  // Permite que otras partes de la app reaccionen a un cambio de idioma
  // (por ejemplo, para re-renderizar textos generados dinámicamente por JS).
  function onLocaleChange(fn) {
    listeners.push(fn);
  }

  global.I18N = {
    registrarIdioma: registrarIdioma,
    t: t,
    setLocale: setLocale,
    getLocale: getLocale,
    translateDOM: translateDOM,
    onLocaleChange: onLocaleChange
  };
})(window);
