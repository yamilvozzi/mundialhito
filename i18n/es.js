// ── DICCIONARIO: ESPAÑOL ───────────────────────────────
// Idioma base y fallback de la aplicación: si una clave no existe en el
// idioma activo, el motor (i18n.js) siempre cae acá.
// Organizado por pantalla/módulo. Se completa progresivamente a medida que
// cada pantalla se migra al sistema de i18n — no hace falta llenarlo todo
// de una sola vez.
I18N.registrarIdioma('es', {
  common: {
    save: 'Guardar',
    cancel: 'Cancelar',
    delete: 'Eliminar'
  },
  config: {
    title: 'Configuración',
    language: 'Idioma',
    nationality: 'Nacionalidad'
  }
  // Próximas pantallas a migrar: torneo (fase de grupos / eliminatorias),
  // historial, rachas, modales de archivar y cambiar nombre, etc.
  // Cada una suma su propia sección acá cuando le toque migrar.
});
