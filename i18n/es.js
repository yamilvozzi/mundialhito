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
    confirm: 'Confirmar',
    menu: 'Menú'
  },
  login: {
    subtitle: 'Tracker personal',
    emailPlaceholder: 'Email',
    passwordPlaceholder: 'Contraseña',
    signIn: 'Ingresar',
    separator: 'o',
    createAccount: 'Crear cuenta nueva',
    continueWithGoogle: 'Continuar con Google',
    fillCredentials: 'Completá email y contraseña.',
    signingIn: 'Ingresando...',
    emailNotConfirmed: 'Confirmá tu email antes de ingresar.',
    invalidCredentials: 'Email o contraseña incorrectos.',
    passwordMinLength: 'La contraseña debe tener al menos 6 caracteres.',
    creatingAccount: 'Creando cuenta...',
    signUpError: 'No se pudo crear la cuenta: {{message}}',
    accountCreated: '¡Cuenta creada! Revisá tu email para confirmarla.',
    connectingGoogle: 'Conectando...',
    googleError: 'Error al conectar con Google.'
  },
  country: {
    AR: 'Argentina', BR: 'Brasil', CL: 'Chile', UY: 'Uruguay',
    US: 'Estados Unidos', MX: 'México', ES: 'España', FR: 'Francia',
    IT: 'Italia', DE: 'Alemania', GB: 'Reino Unido', JP: 'Japón',
    KR: 'Corea del Sur', CN: 'China'
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
    nameModalDesc: 'Es el nombre que se mostrará en la aplicación. No afecta tu cuenta ni el inicio de sesión.',
    namePlaceholder: 'Ej: Yamil',
    nationalityUpdated: 'Nacionalidad actualizada.',
    languageUpdated: 'Idioma actualizado.',
    personalTracker: 'Tracker personal',
    nameSaving: 'Guardando...',
    nameUpdated: 'Nombre actualizado.',
    nameRemoved: 'Nombre eliminado.'
  },
  nav: {
      mundialhito: 'Mundialhito',
      activity: 'Actividad',
      streaks: 'Rachas',
      archive: 'Archivar',
      history: 'Historial',
      streakHistory: 'Hist. Rachas',
      logout: 'Salir'
  },
  activity: {
    title: 'Actividad',
    subtitle: 'Plan e historial recientes'
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
      FG: 'Ganá 2 de los 3 partidos para clasificar.',
      E8: 'Partido único. Si perdés volvés a empezar.',
      E4: 'Partido único. Si perdés volvés a empezar.',
      SF: 'Partido único. Si perdés volvés a empezar.',
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
      draw: 'Empaté',
      loss: 'Perdí',
      undo: 'Deshacer último partido',
      resetTournament: 'Reiniciar torneo',
      resetAll: 'Reiniciar todo',
      qualified: 'Clasificaste a Octavos ({{wins}}/3)',
      groupStageFailed: 'Fase de Grupos: {{wins}}/3. A empezar de nuevo.',
      advancedTo: 'Pasaste a {{phase}}',
      eliminated: 'Eliminado en {{phase}}. Volvés al inicio.',
      champion: '¡CAMPEÓN! Copa #{{n}} conquistada.',
      noUndo: 'No hay movimiento para deshacer.',
      undoSuccess: 'Último partido deshecho.',
      groupDrawPenalty: '≈ Empate (penales) · P{{match}}/3',
      groupMatchWin: '✓ Victoria · P{{match}}/3',
      groupMatchLoss: '✗ Derrota · P{{match}}/3',
      resetTournamentConfirmTitle: 'Reiniciar torneo',
      resetTournamentConfirmBody: 'Empezás un torneo nuevo. Tus estadísticas y copas se conservan.',
      resetTournamentSuccess: 'Torneo reiniciado.',
      resetAllConfirmTitle: 'Reiniciar todo',
      resetAllConfirmBody: 'Reinicia tus estadísticas, copas y el torneo actual. Las rachas, el historial y el plan de partidos se conservan. Esta acción no se puede deshacer.',
      resetAllSuccess: 'Estadísticas del torneo reiniciadas.'
  },
  plan: {
      title: 'Plan de 10 partidos',
      matchNumber: 'Partido #',
      renew: 'Renovar',
      recentHistory: 'Historial reciente',
      emptyHistory: 'Sin partidos registrados todavía.',
      renewed: 'Plan renovado desde 1'
  },
  championModal: {
      title: 'Campeón del MundialHito',
      continue: 'Continuar'
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
    resetConfirmBody: 'Todas las rachas vuelven a cero. El historial y las estadísticas se conservan.',
    resetSuccess: 'Rachas reiniciadas. Nuevo ciclo desde ahora.',
    archiveType: 'Rachas',
    archiveDescription: 'Guardá el estado actual de tus rachas.',
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
    seasonDescription: 'Guardá las estadísticas actuales.',
    seasonPlaceholder: 'Ej: Temporada 2026',
    saving: 'Guardando...',
    saveError: 'Error al guardar. Intentá de nuevo.',
    seasonArchived: 'Temporada "{{name}}" archivada.'
  }

  // Próximas pantallas a migrar: torneo (fase de grupos / eliminatorias),
  // historial, rachas, modales de archivar y cambiar nombre, etc.
  // Cada una suma su propia sección acá cuando le toque migrar.
});
