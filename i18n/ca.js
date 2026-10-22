// Diccionario ca. Base de claves: es.js; plantilla: template.js.
// Editar las traducciones aquí y verificar con npm test.

I18N.registrarIdioma('ca', {
  persistence: {
    saving: "Desant…",
    saved: "Desat",
    error: "No s’han desat els canvis. No tanquis aquesta pestanya.",
    sessionEnded: "La sessió ha acabat amb canvis sense confirmar. Torna a iniciar sessió i revisa les últimes dades.",
    logoutError: "No s’ha pogut tancar la sessió. Torna-ho a provar."
  },
  common: {
    save: 'Desa',
    cancel: 'Cancel·la',
    delete: 'Eliminar',
    confirm: 'Confirma',
    menu: 'Menú'
  },
  login: {
    loadError: "No hem pogut carregar les dades. Torna-ho a provar per continuar.",
    retryLoad: "Torna-ho a provar",
    startupError: 'No hem pogut iniciar l’aplicació. Comprova la connexió i torna-ho a provar.',
    subtitle: 'Tracker personal',
    emailPlaceholder: 'Email',
    passwordPlaceholder: 'Contrasenya',
    signIn: 'Ingressar',
    separator: 'o',
    createAccount: 'Crear compte nou',
    continueWithGoogle: 'Continuar amb Google',
    fillCredentials: 'Completeu correu electrònic i contrasenya.',
    signingIn: 'Ingressant...',
    emailNotConfirmed: 'Confirmeu el vostre email abans d\'ingressar.',
    invalidCredentials: 'Email o contrasenya incorrectes.',
    passwordMinLength: 'La contrasenya ha de tenir com a mínim 6 caràcters.',
    creatingAccount: 'Creant compte...',
    signUpError: 'No s\'ha pogut crear el compte: {{message}}',
    accountCreated: 'Compte creat! Reviseu el vostre email per confirmar-la.',
    connectingGoogle: 'Connectant...',
    googleError: 'Error en connectar amb Google.'
  },
  country: {
    AR: 'Argentina',
    BR: 'Brasil',
    CL: 'Xile',
    UY: 'Uruguai',
    US: 'Estats Units',
    MX: 'Mèxic',
    ES: 'Espanya',
    FR: 'França',
    IT: 'Itàlia',
    DE: 'Alemanya',
    GB: 'Regne Unit',
    JP: 'Japó',
    KR: 'Corea del Sud',
    CN: 'Xina',
    CT: 'Catalunya'
  },
  config: {
    title: 'Configuració',
    subtitle: 'Preferències del vostre compte',
    profile: 'Perfil',
    name: 'Nom',
    nameNotSet: 'Sense definir',
    nationality: 'Nacionalitat',
    language: 'Idioma',
    celebrations: 'Celebracions',
    celebrationsActive: 'Celebracions actives',
    sounds: 'Sons',
    sound: 'So',
    volume: 'Volum',
    nameModalTitle: 'El teu nom',
    nameModalDesc: 'És el nom que es mostrarà a l\'aplicació. No afecta el vostre compte ni l\'inici de sessió.',
    namePlaceholder: 'Ex: Yamil',
    nationalityUpdated: 'Nacionalitat actualitzada.',
    languageUpdated: 'Idioma actualitzat.',
    personalTracker: 'Tracker personal',
    nameSaving: 'Desant...',
    nameUpdated: 'Nom actualitzat.',
    nameRemoved: 'Nom eliminat.'
  },
  nav: {
    mundialhito: 'Mundialhito',
    activity: 'Activitat',
    streaks: 'Ratxes',
    archive: 'Arxivar',
    history: 'Historial',
    streakHistory: 'Hist. Ratxes',
    logout: 'Sortir'
  },
  activity: {
    title: 'Activitat',
    subtitle: 'Pla i historial recents'
  },
  copas: {
    trophiesWon: 'Copes guanyades',
    trophiesShort: 'Copes'
  },
  stats: {
    sectionLabel: "Estadístiques generals",
    played: 'Jugats',
    won: 'Guanyats',
    lost: 'Perduts',
    drawn: 'Empatats'
  },
  phase: {
    name: {
      FG: 'Fase de Grups',
      E8: 'Vuitens de Final',
    E4: 'Quarts de final',
      SF: 'Semifinal',
      FINAL: 'Gran Final'
    },
    desc: {
      FG: 'Guanya 2 dels 3 partits per classificar.',
      E8: "Partit únic. Si perds, tornes a començar.",
      E4: "Partit únic. Si perds, tornes a començar.",
      SF: "Partit únic. Si perds, tornes a començar.",
      FINAL: "L’última batalla!"
    }
  },
  bracket: {
    final: "Final",
    r16: 'Vuitens',
    qf: 'Quarts',
    sf: 'Semi'
  },
  result: {
    sectionLabel: 'Registrar resultat',
    win: 'Victòria',
    draw: 'Empat',
    loss: 'Derrota',
    undo: 'Desfer últim partit',
    resetTournament: 'Reiniciar torneig',
    resetAll: 'Reiniciar-ho tot',
    qualified: 'Vas classificar Vuitens ({{wins}}/3)',
    groupStageFailed: 'Fase de grups: {{wins}}/3. A començar de nou.',
    advancedTo: 'Vas passar a {{phase}}',
    eliminated: 'Eliminat a {{phase}}. Torneu a l\'inici.',
    champion: 'CAMPIÓ! Copa #{{n}} conquerida.',
    noUndo: 'No hi ha moviment per desfer.',
    undoSuccess: 'Últim partit desfet.',
    groupDrawPenalty: '≈ Empat (penals) · P{{match}}/3',
    groupMatchWin: '✓ Victòria · P{{match}}/3',
    groupMatchLoss: '✗ Derrota · P{{match}}/3',
    resetTournamentConfirmTitle: 'Reiniciar torneig',
    resetTournamentConfirmBody: 'Començaràs un torneig nou. Les teves estadístiques i copes es conserven.',
    resetTournamentSuccess: 'Torneig reiniciat.',
    resetAllConfirmTitle: 'Reiniciar-ho tot',
    resetAllConfirmBody: 'Reinicia les estadístiques, les copes i el torneig actual. Les ratxes, l\'historial i el pla de partits es conserven. Aquesta acció no es pot desfer.',
    resetAllSuccess: 'Estadístiques del torneig reiniciades.'
  },
  plan: {
    title: 'Pla de 10 partits',
    matchNumber: 'Completats',
    renew: 'Renovar',
    recentHistory: 'Historial recent',
    emptyHistory: 'Sense partits registrats encara.',
    renewed: 'Pla renovat: 0 de 10 completats',
    nextMatch: 'Proper partit: {{number}}'
  },
  championModal: {
    title: 'Campió de MUNDIALHITO',
    continue: 'Continuar'
  },
  coinModal: {
    flip: 'Llançar moneda',
    title: 'Definició per penals',
    subtitleInitial: 'Empat. Tria cara o creu abans de llançar.',
    subtitleChosen: 'Has triat {{choice}}. Toca la moneda.',
    heads: 'Cara',
    tails: "Creu",
    confirm: 'Confirmar resultat',
    resultOut: 'Va sortir {{result}} — ',
    resultWin: 'Guanyes!',
    resultLoss: "Perds"
  },
  rachas: {
    title: 'Ratxes',
    subtitle: 'Rècords personals',
    empty: 'Encara no hi ha partits registrats.<br>Juga el teu primer partit per començar a veure les teves ratxes.',
    winStreak: 'Victòries consecutives',
    lossStreak: 'Derrotes consecutives',
    historicRecord: 'Rècord històric',
    current: 'Actual',
    fastestCup: 'Copa més ràpida',
    longestCup: 'Copa més llarga',
    currentCampaign: 'Campanya actual',
    finals: 'Finals',
    played: 'Jugades',
    won: 'Guanyades',
    lost: 'Perdudes',
    resetButton: 'Reiniciar ratxes',
    resetConfirmTitle: 'Reiniciar ratxes',
    resetConfirmBody: 'Totes les ratxes tornen a zero. L\'historial i les estadístiques es conserven.',
    resetSuccess: 'Ratxes reiniciades. Nou cicle des d\'ara.',
    archiveType: 'Ratxes',
    archiveDescription: 'Deseu l\'estat actual de les ratxes.',
    archivePlaceholder: 'Ex: Etapa 2025',
    archiveSaving: 'Desant...',
    archiveError: 'Error en desar. Torna a intentar.',
    archiveSuccess: 'Etapa "{{name}}" arxivada.'
  },
  history: {
    title: 'Historial',
    subtitle: 'Temporades arxivades',
    archivedOn: 'Arxivat el {{date}}',
    loading: 'Carregant...',
    loadError: 'Error en carregar l\'historial.',
    empty: "Encara no hi ha temporades arxivades.<br>Fes servir l’opció Arxivar per desar el progrés actual.",
    deleteTitle: 'Eliminar temporada',
    deleteConfirm: 'Esteu segur que voleu eliminar-la? Aquesta acció no es pot desfer.',
    deleteError: 'Error en suprimir.',
    deleteSuccess: 'Temporada eliminada.'
  },
  streakHistory: {
    title: 'Historial Ratxes',
    subtitle: 'Etapes arxivades',
    wins: 'Victòries',
    losses: 'Derrotes',
    fastestCup: 'Copa ràpida',
    longestCup: 'Copa llarga',
    finals: 'Finals',
    won: 'Guanyades',
    lost: 'Perdudes',
    archivedOn: 'Arxivat el {{date}}',
    loading: 'Carregant...',
    loadError: 'Error en carregar.',
    empty: 'Encara no hi ha etapes arxivades.<br>Utilitzeu "Arxivar ratxes" per desar l\'estat actual.',
    deleteTitle: 'Eliminar etapa',
    deleteConfirm: 'Esteu segur que voleu eliminar-la? Aquesta acció no es pot desfer.',
    deleteError: 'Error en suprimir.',
    deleteSuccess: 'Etapa eliminada.'
  },
  archive: {
    title: 'Arxivar',
    seasonType: 'Temporada',
    seasonDescription: 'Deseu les estadístiques actuals.',
    seasonPlaceholder: 'Ex: Temporada 2026',
    saving: 'Desant...',
    saveError: 'Error en desar. Torna a intentar.',
    seasonArchived: 'Temporada "{{name}}" arxivada.'
  }
});
