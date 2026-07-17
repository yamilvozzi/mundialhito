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
    delete: 'Eliminar',
    confirm: 'Confirmar'
  },
  config: {
    title: 'Configuración',
    subtitle: 'Preferencias de tu cuenta',
    profile: 'Perfil',
    name: 'Nombre',
    nameNotSet: 'Sin definir',
    nationality: 'Nacionalidad',
    language: 'Idioma',
    celebrations: 'Celebraciones',
    celebrationsActive: 'Celebraciones activas',
    sounds: 'Sonidos',
    sound: 'Sonido',
    volume: 'Volumen',
    nameModalTitle: 'Tu nombre',
    nameModalDesc: 'Es solo un detalle visual — aparece debajo de Mundialhito en toda la app. No afecta tu cuenta ni tu login.',
    namePlaceholder: 'Ej: Yamil',
    nationalityUpdated: 'Nacionalidad actualizada.',
    languageUpdated: 'Idioma actualizado.'
  },
  nav: {
      mundialhito: 'Mundialhito',
      streaks: 'Rachas',
      archive: 'Archivar',
      history: 'Historial',
      streakHistory: 'Hist. Rachas',
      logout: 'Salir'
  },
  copas: {
      trophiesWon: 'Copas ganadas',
      trophiesShort: 'Copas'
  },
  stats: {
      played: 'Jugados',
      won: 'Ganados',
      lost: 'Perdidos',
      drawn: 'Empates'
  },
  phase: {
    name: {
      FG: 'Fase de Grupos',
      E8: 'Octavos de Final',
      E4: 'Cuartos de Final',
      SF: 'Semifinal',
      FINAL: 'Gran Final'
    },
    desc: {
      FG: 'Jugás los 3 partidos. Pasás si ganás 2 o más.',
      E8: 'Partido único — si perdés, volvés al inicio.',
      E4: 'Partido único — si perdés, volvés al inicio.',
      SF: 'Partido único — si perdés, volvés al inicio.',
      FINAL: '¡La última batalla!'
    }
  },
  bracket: {
      r16: 'Octavos',
      qf: 'Cuartos',
      sf: 'Semi'
  },
  result: {
      sectionLabel: 'Registrar resultado',
      win: 'Gané',
      draw: 'Empate',
      loss: 'Perdí',
      undo: 'Deshacer último partido',
      resetTournament: 'Reiniciar torneo',
      resetAll: 'Reiniciar todo',
      qualified: 'Clasificaste a Octavos ({{wins}}/3)',
      groupStageFailed: 'Fase de Grupos: {{wins}}/3. A empezar de nuevo.',
      advancedTo: 'Pasaste a {{phase}}',
      eliminated: 'Eliminado en {{phase}}. Volvés al inicio.',
      champion: '¡CAMPEÓN! Copa #{{n}} conquistada.'
  },
  plan: {
      title: 'Plan de 10 partidos',
      matchNumber: 'Partido #',
      renew: 'Renovar',
      recentHistory: 'Historial reciente',
      emptyHistory: 'Sin partidos registrados todavía.',
      renewed: 'Plan renovado desde 1'
  },
  coinModal: {
      title: 'Definición por penales',
      subtitleInitial: 'Empate. Elegí cara o ceca antes de tirar.',
      subtitleChosen: 'Elegiste {{choice}}. Tocá la moneda.',
      heads: 'Cara',
      tails: 'Ceca',
      confirm: 'Confirmar resultado',
      resultOut: 'Salió {{result}} — ',
      resultWin: '¡Ganás!',
      resultLoss: 'Perdés'
  },
  rachas: {
    title: 'Rachas',
    subtitle: 'Récords personales',
    empty: 'Todavía no hay partidos registrados.<br>Jugá tu primer partido para empezar a ver tus rachas.',
    winStreak: 'Victorias consecutivas',
    lossStreak: 'Derrotas consecutivas',
    historicRecord: 'Récord histórico',
    current: 'Actual',
    fastestCup: 'Copa más rápida',
    longestCup: 'Copa más larga',
    currentCampaign: 'Campaña actual',
    finals: 'Finales',
    played: 'Jugadas',
    won: 'Ganadas',
    lost: 'Perdidas',
    resetButton: 'Reiniciar rachas',
    resetConfirmTitle: 'Reiniciar rachas',
    resetConfirmBody: 'Las rachas vuelven a cero. Los nuevos cálculos arrancan desde el próximo partido. El historial y las estadísticas globales no se modifican.',
    resetSuccess: 'Rachas reiniciadas. Nuevo ciclo desde ahora.',
    archiveType: 'Rachas',
    archiveDescription: 'Guardá el estado actual de tus rachas. Las rachas activas NO se modifican.',
    archivePlaceholder: 'Ej: Etapa 2025',
    archiveSaving: 'Guardando...',
    archiveError: 'Error al guardar. Intentá de nuevo.',
    archiveSuccess: 'Etapa "{{name}}" archivada.'
  }
,
  history: {
    title: 'Historial',
    subtitle: 'Temporadas archivadas',
    archivedOn: 'Archivado el {{date}}',
    loading: 'Cargando...',
    loadError: 'Error al cargar el historial.',
    empty: 'No hay temporadas archivadas todavía.<br>Usá la opción Archivar para guardar el progreso actual.',
    deleteTitle: 'Eliminar temporada',
    deleteConfirm: '¿Seguro que querés eliminarla? Esta acción no se puede deshacer.',
    deleteError: 'Error al eliminar.',
    deleteSuccess: 'Temporada eliminada.'
  },
  streakHistory: {
    title: 'Historial Rachas',
    subtitle: 'Etapas archivadas',
    wins: 'Victorias',
    losses: 'Derrotas',
    fastestCup: 'Copa rápida',
    longestCup: 'Copa larga',
    finals: 'Finales',
    won: 'Ganadas',
    lost: 'Perdidas',
    archivedOn: 'Archivado el {{date}}',
    loading: 'Cargando...',
    loadError: 'Error al cargar.',
    empty: 'No hay etapas archivadas todavía.<br>Usá "Archivar rachas" para guardar el estado actual.',
    deleteTitle: 'Eliminar etapa',
    deleteConfirm: '¿Seguro que querés eliminarla? Esta acción no se puede deshacer.',
    deleteError: 'Error al eliminar.',
    deleteSuccess: 'Etapa eliminada.'
  },
  archive: {
    title: 'Archivar',
    seasonType: 'Temporada',
    seasonDescription: 'Guardá las estadísticas actuales con un nombre. Podés seguir jugando normalmente después.',
    seasonPlaceholder: 'Ej: Temporada 2026',
    saving: 'Guardando...',
    saveError: 'Error al guardar. Intentá de nuevo.',
    seasonArchived: 'Temporada "{{name}}" archivada.'
  }

  // Próximas pantallas a migrar: torneo (fase de grupos / eliminatorias),
  // historial, rachas, modales de archivar y cambiar nombre, etc.
  // Cada una suma su propia sección acá cuando le toque migrar.
});
