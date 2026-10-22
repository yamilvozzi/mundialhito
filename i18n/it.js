// Diccionario it. Base de claves: es.js; plantilla: template.js.
// Editar las traducciones aquí y verificar con npm test.

I18N.registrarIdioma('it', {
  persistence: {
    saving: "Salvataggio…",
    saved: "Salvato",
    error: "Le modifiche non sono state salvate. Non chiudere questa scheda.",
    sessionEnded: "La sessione è terminata con modifiche non confermate. Accedi di nuovo e controlla gli ultimi dati.",
    logoutError: "Impossibile uscire. Riprova."
  },
  common: {
    save: 'Salva',
    cancel: 'Annulla',
    delete: 'Eliminare',
    confirm: 'Confermare',
    menu: 'Menu'
  },
  login: {
    loadError: "Impossibile caricare i tuoi dati. Riprova per continuare.",
    retryLoad: "Riprova",
    startupError: 'Impossibile avviare l’app. Controlla la connessione e riprova.',
    subtitle: "Tracker personale",
    emailPlaceholder: 'E-mail',
    passwordPlaceholder: 'Password',
    signIn: 'Entra',
    separator: "o",
    createAccount: 'Crea nuovo account',
    continueWithGoogle: 'Continua con Google',
    fillCredentials: "Inserisci email e password.",
    signingIn: 'Entrando...',
    emailNotConfirmed: 'Conferma la tua email prima di entrare.',
    invalidCredentials: 'E-mail o password errati.',
    passwordMinLength: 'La password deve contenere almeno 6 caratteri.',
    creatingAccount: 'Creazione dell\'account...',
    signUpError: 'Impossibile creare l\'account: {{message}}',
    accountCreated: 'Account creato! Controlla la tua email per confermarlo.',
    connectingGoogle: 'Collegamento...',
    googleError: 'Errore durante la connessione a Google.'
  },
  country: {
    AR: 'Argentina',
    BR: 'Brasile',
    CL: 'Cile',
    UY: 'Uruguay',
    US: 'U.S.A.',
    MX: 'Messico',
    ES: 'Spagna',
    FR: 'Francia',
    IT: 'Italia',
    DE: 'Germania',
    GB: 'Regno Unito',
    JP: 'Giappone',
    KR: 'Corea del Sud',
    CN: 'Cina',
    CT: 'Catalogna'
  },
  config: {
    title: 'Configurazione',
    subtitle: 'Le preferenze del tuo account',
    profile: 'Profilo',
    name: 'Nome',
    nameNotSet: 'Indefinito',
    nationality: 'Nazionalità',
    language: 'Lingua',
    celebrations: 'Celebrazioni',
    celebrationsActive: 'Celebrazioni attive',
    sounds: 'Suoni',
    sound: 'Suono',
    volume: 'Volume',
    nameModalTitle: 'il tuo nome',
    nameModalDesc: 'È il nome che verrà visualizzato nell\'applicazione. Non influisce sul tuo account o sul tuo accesso.',
    namePlaceholder: 'Esempio: Yamil',
    nationalityUpdated: 'Nazionalità aggiornata.',
    languageUpdated: 'Lingua aggiornata.',
    personalTracker: "Tracker personale",
    nameSaving: "Salvataggio...",
    nameUpdated: 'Nome aggiornato.',
    nameRemoved: 'Nome rimosso.'
  },
  nav: {
    mundialhito: 'MUNDIALHITO',
    activity: 'Attività',
    streaks: "Serie",
    archive: "Archivia",
    history: "Cronologia",
    streakHistory: "Storico serie",
    logout: 'Esci'
  },
  activity: {
    title: 'Attività',
    subtitle: "Piano e cronologia recenti"
  },
  copas: {
    trophiesWon: 'Coppe vinte',
    trophiesShort: "Coppe"
  },
  stats: {
    played: 'Partite',
    won: 'Vittorie',
    lost: 'Sconfitte',
    drawn: 'Pareggi'
  },
  phase: {
    name: {
      FG: 'Fase a gironi',
      E8: 'Ottavi di finale',
      E4: 'Quarti di finale',
      SF: 'Semifinale',
      FINAL: 'Gran Finale'
    },
    desc: {
      FG: 'Vinci 2 delle 3 partite per qualificarti.',
      E8: "Partita unica. Se perdi, ricominci da capo.",
      E4: "Partita unica. Se perdi, ricominci da capo.",
      SF: "Partita unica. Se perdi, ricominci da capo.",
      FINAL: "L’ultima battaglia!"
    }
  },
  bracket: {
    final: "Finale",
    r16: "Ottavi",
    qf: 'Quarti',
    sf: 'Semi'
  },
  result: {
    sectionLabel: 'Registra il risultato',
    win: 'Vittoria',
    draw: 'Pareggio',
    loss: 'Sconfitta',
    undo: 'Annulla l\'ultima partita',
    resetTournament: 'Ricomincia il torneo',
    resetAll: 'Ricomincia tutto',
    qualified: "Qualificato agli ottavi ({{wins}}/3)",
    groupStageFailed: 'Fase a gironi: {{wins}}/3. Per ricominciare.',
    advancedTo: "Passaggio a {{phase}}",
    eliminated: "Eliminazione: {{phase}}. Si torna all’inizio.",
    champion: 'CAMPIONE! Coppa #{{n}} conquistata.',
    noUndo: 'Non c\'è movimento da annullare.',
    undoSuccess: 'Ultima partita annullata.',
    groupDrawPenalty: '≈ Pareggio (rigori) · P{{match}}/3',
    groupMatchWin: '✓ Vittoria · P{{match}}/3',
    groupMatchLoss: '✗ Sconfitta · P{{match}}/3',
    resetTournamentConfirmTitle: 'Ricomincia il torneo',
    resetTournamentConfirmBody: 'Inizi un nuovo torneo. Le tue statistiche e le tue coppe vengono preservate.',
    resetTournamentSuccess: 'Torneo ricominciato.',
    resetAllConfirmTitle: 'Ricomincia tutto',
    resetAllConfirmBody: 'Azzera le tue statistiche, le coppe e il torneo in corso. Le serie, la cronologia e il piano della partita vengono preservati. Questa azione non può essere annullata.',
    resetAllSuccess: 'Reset delle statistiche del torneo.'
  },
  plan: {
    title: 'Piano di 10 partite',
    matchNumber: 'Completati',
    renew: 'Rinnovare',
    recentHistory: "Cronologia recente",
    emptyHistory: 'Nessuna partita ancora registrata.',
    renewed: 'Piano rinnovato: 0 di 10 completati',
    nextMatch: 'Prossima partita: {{number}}'
  },
  championModal: {
    title: 'Campione di MUNDIALHITO',
    continue: 'Continuare'
  },
  coinModal: {
    flip: 'Lancia la moneta',
    title: "Calci di rigore",
    subtitleInitial: "Pareggio. Scegli testa o croce prima di lanciare la moneta.",
    subtitleChosen: 'Hai scelto {{choice}}. Tocca la moneta.',
    heads: 'Testa',
    tails: 'Croce',
    confirm: 'Conferma risultato',
    resultOut: '{{result}} è uscito — ',
    resultWin: 'Hai vinto!',
    resultLoss: 'perdi'
  },
  rachas: {
    title: "Serie",
    subtitle: "Record personali",
    empty: 'Non ci sono ancora partite registrate.<br>Gioca la tua prima partita per iniziare a vedere le tue serie consecutive.',
    winStreak: 'Vittorie consecutive',
    lossStreak: "Sconfitte consecutive",
    historicRecord: "Record storico",
    current: 'Attuale',
    fastestCup: "Coppa più veloce",
    longestCup: "Coppa più lenta",
    currentCampaign: 'Campagna attuale',
    finals: 'Finale',
    played: 'Giocate',
    won: 'Vinte',
    lost: 'Perse',
    resetButton: 'Riavvia le serie',
    resetConfirmTitle: 'Riavvia le serie',
    resetConfirmBody: 'Tutte le serie tornano a zero. La cronologia e le statistiche vengono preservate.',
    resetSuccess: 'Serie ricominciate. Nuovo ciclo da ora in poi.',
    archiveType: "Serie",
    archiveDescription: 'Salva lo stato attuale delle tue serie.',
    archivePlaceholder: 'Esempio: Fase 2025',
    archiveSaving: "Salvataggio...",
    archiveError: 'Errore durante il salvataggio. Riprova.',
    archiveSuccess: 'Fase "{{name}}" archiviata.'
  },
  history: {
    title: "Cronologia",
    subtitle: 'Stagioni archiviate',
    archivedOn: 'Archiviato il {{date}}',
    loading: "Caricamento...",
    loadError: 'Errore durante il caricamento della cronologia.',
    empty: 'Non ci sono ancora stagioni archiviate.<br>Utilizza l\'opzione Archivia per salvare i tuoi progressi attuali.',
    deleteTitle: 'Elimina stagione',
    deleteConfirm: 'Sei sicuro di volerlo eliminare? Questa azione non può essere annullata.',
    deleteError: "Errore durante l’eliminazione.",
    deleteSuccess: 'Stagione eliminata.'
  },
  streakHistory: {
    title: "Storico serie",
    subtitle: 'Tappe archiviate',
    wins: 'Vittorie',
    losses: 'Sconfitte',
    fastestCup: "Coppa più veloce",
    longestCup: "Coppa più lenta",
    finals: 'Finale',
    won: 'Vinte',
    lost: 'Perse',
    archivedOn: 'Archiviato il {{date}}',
    loading: "Caricamento...",
    loadError: 'Errore durante il caricamento.',
    empty: 'Non ci sono ancora fasi archiviate.<br>Utilizza "Archivia serie" per salvare lo stato corrente.',
    deleteTitle: 'Elimina fase',
    deleteConfirm: 'Sei sicuro di volerlo eliminare? Questa azione non può essere annullata.',
    deleteError: "Errore durante l’eliminazione.",
    deleteSuccess: 'Fase eliminata.'
  },
  archive: {
    title: "Archivia",
    seasonType: 'Stagione',
    seasonDescription: 'Salva le statistiche attuali.',
    seasonPlaceholder: 'Esempio: stagione 2026',
    saving: "Salvataggio...",
    saveError: 'Errore durante il salvataggio. Riprova.',
    seasonArchived: 'Stagione "{{name}}" archiviata.'
  }
});
