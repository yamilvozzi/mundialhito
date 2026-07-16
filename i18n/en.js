// ── DICCIONARIO: ENGLISH ───────────────────────────────
// Solo necesita tener las claves que YA fueron migradas. Cualquier clave
// ausente acá cae automáticamente al Español (ver i18n.js → FALLBACK_LOCALE),
// así que está bien que este archivo crezca de a poco, pantalla por pantalla.
I18N.registrarIdioma('en', {
  common: {
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete'
  },
  config: {
    title: 'Settings',
    language: 'Language',
    nationality: 'Nationality'
  }
  // El resto de las claves (torneo, historial, rachas, etc.) todavía no está
  // traducido: mientras tanto se muestran en Español vía el fallback.
});
