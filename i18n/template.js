// ── DICCIONARIO: PLANTILLA PARA NUEVOS IDIOMAS ────────────────
// Generado automáticamente a partir de es.js — misma estructura y mismas
// claves que el diccionario base (Español), con valores vacíos listos
// para traducir. El comentario "// ES: ..." al lado de cada clave es sólo
// una referencia del texto original en Español; se puede borrar.
//
// Cómo agregar un idioma nuevo (ejemplo: portugués):
//   1. Copiar este archivo a i18n/pt.js (o el código de idioma que uses).
//   2. Completar los valores '' con la traducción correspondiente.
//   3. Cambiar el primer argumento de registrarIdioma más abajo, de
//      'xx' al código real (ej: 'pt').
//   4. Agregar <script src="i18n/pt.js"></script> en el <head> de
//      index.html, después de i18n.js y antes de que se use I18N.
//      No hace falta tocar i18n.js: soporta cualquier idioma registrado así.
//   5. Agregar el idioma a la lista IDIOMAS en index.html para que
//      aparezca como opción en Configuración → Idioma.
//
// No hace falta completar TODAS las claves de entrada: cualquier clave
// sin traducir cae automáticamente a Español (ver i18n.js → FALLBACK_LOCALE),
// tal como sucede hoy con en.js durante su migración progresiva.
I18N.registrarIdioma('xx', {
  common: {
    save: '',  // ES: Guardar
    cancel: '',  // ES: Cancelar
    delete: '',  // ES: Eliminar
    confirm: '',  // ES: Confirmar
    menu: ''  // ES: MenÃº
  },
  login: {
    subtitle: '',  // ES: Tracker personal
    emailPlaceholder: '',  // ES: Email
    passwordPlaceholder: '',  // ES: ContraseÃ±a
    signIn: '',  // ES: Ingresar
    separator: '',  // ES: o
    createAccount: '',  // ES: Crear cuenta nueva
    continueWithGoogle: '',  // ES: Continuar con Google
    fillCredentials: '',  // ES: CompletÃ¡ email y contraseÃ±a.
    signingIn: '',  // ES: Ingresando...
    emailNotConfirmed: '',  // ES: ConfirmÃ¡ tu email antes de ingresar.
    invalidCredentials: '',  // ES: Email o contraseÃ±a incorrectos.
    passwordMinLength: '',  // ES: La contraseÃ±a debe tener al menos 6 caracteres.
    creatingAccount: '',  // ES: Creando cuenta...
    signUpError: '',  // ES: No se pudo crear la cuenta: {{message}}
    accountCreated: '',  // ES: Â¡Cuenta creada! RevisÃ¡ tu email para confirmarla.
    connectingGoogle: '',  // ES: Conectando...
    googleError: ''  // ES: Error al conectar con Google.
  },
  country: {
    AR: '',  // ES: Argentina
    BR: '',  // ES: Brasil
    CL: '',  // ES: Chile
    UY: '',  // ES: Uruguay
    US: '',  // ES: Estados Unidos
    MX: '',  // ES: MÃ©xico
    ES: '',  // ES: EspaÃ±a
    FR: '',  // ES: Francia
    IT: '',  // ES: Italia
    DE: '',  // ES: Alemania
    GB: '',  // ES: Reino Unido
    JP: '',  // ES: JapÃ³n
    KR: '',  // ES: Corea del Sur
    CN: ''  // ES: China
  },
  config: {
    title: '',  // ES: ConfiguraciÃ³n
    subtitle: '',  // ES: Preferencias de tu cuenta
    profile: '',  // ES: Perfil
    name: '',  // ES: Nombre
    nameNotSet: '',  // ES: Sin definir
    nationality: '',  // ES: Nacionalidad
    language: '',  // ES: Idioma
    celebrations: '',  // ES: Celebraciones
    celebrationsActive: '',  // ES: Celebraciones activas
    sounds: '',  // ES: Sonidos
    sound: '',  // ES: Sonido
    volume: '',  // ES: Volumen
    nameModalTitle: '',  // ES: Tu nombre
    nameModalDesc: '',  // ES: Es solo un detalle visual â€” aparece debajo de Mundialhito en toda la app. No afecta tu c…
    namePlaceholder: '',  // ES: Ej: Yamil
    nationalityUpdated: '',  // ES: Nacionalidad actualizada.
    languageUpdated: '',  // ES: Idioma actualizado.
    personalTracker: '',  // ES: Tracker personal
    nameSaving: '',  // ES: Guardando...
    nameUpdated: '',  // ES: Nombre actualizado.
    nameRemoved: ''  // ES: Nombre eliminado.
  },
  nav: {
    mundialhito: '',  // ES: Mundialhito
    activity: 'Actividad',
    streaks: '',  // ES: Rachas
    archive: '',  // ES: Archivar
    history: '',  // ES: Historial
    streakHistory: '',  // ES: Hist. Rachas
    logout: ''  // ES: Salir
  },
  activity: {
    title: '',
    subtitle: ''
  },
  copas: {
    trophiesWon: '',  // ES: Copas ganadas
    trophiesShort: ''  // ES: Copas
  },
  stats: {
    played: '',  // ES: Jugados
    won: '',  // ES: Ganados
    lost: '',  // ES: Perdidos
    drawn: ''  // ES: Empates
  },
  phase: {
    name: {
      FG: '',  // ES: Fase de Grupos
      E8: '',  // ES: Octavos de Final
      E4: '',  // ES: Cuartos de Final
      SF: '',  // ES: Semifinal
      FINAL: ''  // ES: Gran Final
    },
    desc: {
      FG: '',  // ES: JugÃ¡s los 3 partidos. PasÃ¡s si ganÃ¡s 2 o mÃ¡s.
      E8: '',  // ES: Partido Ãºnico â€” si perdÃ©s, volvÃ©s al inicio.
      E4: '',  // ES: Partido Ãºnico â€” si perdÃ©s, volvÃ©s al inicio.
      SF: '',  // ES: Partido Ãºnico â€” si perdÃ©s, volvÃ©s al inicio.
      FINAL: ''  // ES: Â¡La Ãºltima batalla!
    }
  },
  bracket: {
    r16: '',  // ES: Octavos
    qf: '',  // ES: Cuartos
    sf: ''  // ES: Semi
  },
  result: {
    sectionLabel: '',  // ES: Registrar resultado
    win: '',  // ES: GanÃ©
    draw: '',  // ES: Empate
    loss: '',  // ES: PerdÃ­
    undo: '',  // ES: Deshacer Ãºltimo partido
    resetTournament: '',  // ES: Reiniciar torneo
    resetAll: '',  // ES: Reiniciar todo
    qualified: '',  // ES: Clasificaste a Octavos ({{wins}}/3)
    groupStageFailed: '',  // ES: Fase de Grupos: {{wins}}/3. A empezar de nuevo.
    advancedTo: '',  // ES: Pasaste a {{phase}}
    eliminated: '',  // ES: Eliminado en {{phase}}. VolvÃ©s al inicio.
    champion: '',  // ES: Â¡CAMPEÃ“N! Copa #{{n}} conquistada.
    noUndo: '',  // ES: No hay movimiento para deshacer.
    undoSuccess: '',  // ES: Ãšltimo partido deshecho.
    groupDrawPenalty: '',  // ES: â‰ˆ Empate (penales) Â· P{{match}}/3
    groupMatchWin: '',  // ES: âœ“ Victoria Â· P{{match}}/3
    groupMatchLoss: '',  // ES: âœ— Derrota Â· P{{match}}/3
    resetTournamentConfirmTitle: '',  // ES: Reiniciar torneo
    resetTournamentConfirmBody: '',  // ES: Se borra el progreso del torneo actual. Las estadÃ­sticas y copas se conservan.
    resetTournamentSuccess: '',  // ES: Torneo reiniciado.
    resetAllConfirmTitle: '',  // ES: Reiniciar todo
    resetAllConfirmBody: '',  // ES: Se borran estadÃ­sticas, historial, copas y el progreso del torneo. Esta acciÃ³n no se pue…
    resetAllSuccess: ''  // ES: Todo reiniciado.
  },
  plan: {
    title: '',  // ES: Plan de 10 partidos
    matchNumber: '',  // ES: Partido #
    renew: '',  // ES: Renovar
    recentHistory: '',  // ES: Historial reciente
    emptyHistory: '',  // ES: Sin partidos registrados todavÃ­a.
    renewed: ''  // ES: Plan renovado desde 1
  },
  coinModal: {
    title: '',  // ES: DefiniciÃ³n por penales
    subtitleInitial: '',  // ES: Empate. ElegÃ­ cara o ceca antes de tirar.
    subtitleChosen: '',  // ES: Elegiste {{choice}}. TocÃ¡ la moneda.
    heads: '',  // ES: Cara
    tails: '',  // ES: Ceca
    confirm: '',  // ES: Confirmar resultado
    resultOut: '',  // ES: SaliÃ³ {{result}} â€”
    resultWin: '',  // ES: Â¡GanÃ¡s!
    resultLoss: ''  // ES: PerdÃ©s
  },
  rachas: {
    title: '',  // ES: Rachas
    subtitle: '',  // ES: RÃ©cords personales
    empty: '',  // ES: TodavÃ­a no hay partidos registrados.<br>JugÃ¡ tu primer partido para empezar a ver tus ra…
    winStreak: '',  // ES: Victorias consecutivas
    lossStreak: '',  // ES: Derrotas consecutivas
    historicRecord: '',  // ES: RÃ©cord histÃ³rico
    current: '',  // ES: Actual
    fastestCup: '',  // ES: Copa mÃ¡s rÃ¡pida
    longestCup: '',  // ES: Copa mÃ¡s larga
    currentCampaign: '',  // ES: CampaÃ±a actual
    finals: '',  // ES: Finales
    played: '',  // ES: Jugadas
    won: '',  // ES: Ganadas
    lost: '',  // ES: Perdidas
    resetButton: '',  // ES: Reiniciar rachas
    resetConfirmTitle: '',  // ES: Reiniciar rachas
    resetConfirmBody: '',  // ES: Las rachas vuelven a cero. Los nuevos cÃ¡lculos arrancan desde el prÃ³ximo partido. El his…
    resetSuccess: '',  // ES: Rachas reiniciadas. Nuevo ciclo desde ahora.
    archiveType: '',  // ES: Rachas
    archiveDescription: '',  // ES: GuardÃ¡ el estado actual de tus rachas. Las rachas activas NO se modifican.
    archivePlaceholder: '',  // ES: Ej: Etapa 2025
    archiveSaving: '',  // ES: Guardando...
    archiveError: '',  // ES: Error al guardar. IntentÃ¡ de nuevo.
    archiveSuccess: ''  // ES: Etapa "{{name}}" archivada.
  },
  history: {
    title: '',  // ES: Historial
    subtitle: '',  // ES: Temporadas archivadas
    archivedOn: '',  // ES: Archivado el {{date}}
    loading: '',  // ES: Cargando...
    loadError: '',  // ES: Error al cargar el historial.
    empty: '',  // ES: No hay temporadas archivadas todavÃ­a.<br>UsÃ¡ la opciÃ³n Archivar para guardar el progres…
    deleteTitle: '',  // ES: Eliminar temporada
    deleteConfirm: '',  // ES: Â¿Seguro que querÃ©s eliminarla? Esta acciÃ³n no se puede deshacer.
    deleteError: '',  // ES: Error al eliminar.
    deleteSuccess: ''  // ES: Temporada eliminada.
  },
  streakHistory: {
    title: '',  // ES: Historial Rachas
    subtitle: '',  // ES: Etapas archivadas
    wins: '',  // ES: Victorias
    losses: '',  // ES: Derrotas
    fastestCup: '',  // ES: Copa rÃ¡pida
    longestCup: '',  // ES: Copa larga
    finals: '',  // ES: Finales
    won: '',  // ES: Ganadas
    lost: '',  // ES: Perdidas
    archivedOn: '',  // ES: Archivado el {{date}}
    loading: '',  // ES: Cargando...
    loadError: '',  // ES: Error al cargar.
    empty: '',  // ES: No hay etapas archivadas todavÃ­a.<br>UsÃ¡ "Archivar rachas" para guardar el estado actual…
    deleteTitle: '',  // ES: Eliminar etapa
    deleteConfirm: '',  // ES: Â¿Seguro que querÃ©s eliminarla? Esta acciÃ³n no se puede deshacer.
    deleteError: '',  // ES: Error al eliminar.
    deleteSuccess: ''  // ES: Etapa eliminada.
  },
  archive: {
    title: '',  // ES: Archivar
    seasonType: '',  // ES: Temporada
    seasonDescription: '',  // ES: GuardÃ¡ las estadÃ­sticas actuales con un nombre. PodÃ©s seguir jugando normalmente despuÃ…
    seasonPlaceholder: '',  // ES: Ej: Temporada 2026
    saving: '',  // ES: Guardando...
    saveError: '',  // ES: Error al guardar. IntentÃ¡ de nuevo.
    seasonArchived: ''  // ES: Temporada "{{name}}" archivada.
  }
});
