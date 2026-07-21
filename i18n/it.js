// ── DICCIONARIO: ITALIANO ──────────────────────────────
// Generado a partir de i18n/template.js, con la misma estructura y las
// mismas claves que el diccionario base (Español). Cualquier clave que
// falte acá cae automáticamente a Español (ver i18n.js → FALLBACK_LOCALE).
I18N.registrarIdioma('it', {
  common: {
    save: 'Salva',
    cancel: 'Annulla',
    delete: 'Elimina',
    confirm: 'Conferma',
    menu: 'Menu'
  },
  login: {
    subtitle: 'Tracker personale',
    emailPlaceholder: 'Email',
    passwordPlaceholder: 'Password',
    signIn: 'Accedi',
    separator: 'o',
    createAccount: 'Crea nuovo account',
    continueWithGoogle: 'Continua con Google',
    fillCredentials: 'Inserisci email e password.',
    signingIn: 'Accesso in corso...',
    emailNotConfirmed: 'Conferma la tua email prima di accedere.',
    invalidCredentials: 'Email o password errati.',
    passwordMinLength: 'La password deve contenere almeno 6 caratteri.',
    creatingAccount: 'Creazione account...',
    signUpError: 'Impossibile creare l\'account: {{message}}',
    accountCreated: 'Account creato! Controlla la tua email per confermarlo.',
    connectingGoogle: 'Connessione in corso...',
    googleError: 'Impossibile connettersi a Google.'
  },
  country: {
    AR: 'Argentina', BR: 'Brasile', CL: 'Cile', UY: 'Uruguay',
    US: 'Stati Uniti', MX: 'Messico', ES: 'Spagna', FR: 'Francia',
    IT: 'Italia', DE: 'Germania', GB: 'Regno Unito', JP: 'Giappone',
    KR: 'Corea del Sud', CN: 'Cina'
  },
  config: {
    title: 'Impostazioni',
    subtitle: 'Preferenze del tuo account',
    profile: 'Profilo',
    name: 'Nome',
    nameNotSet: 'Non impostato',
    nationality: 'Nazionalità',
    language: 'Lingua',
    celebrations: 'Celebrazioni',
    celebrationsActive: 'Celebrazioni attive',
    sounds: 'Suoni',
    sound: 'Suono',
    volume: 'Volume',
    nameModalTitle: 'Il tuo nome',
    nameModalDesc: 'È solo un dettaglio visivo — appare sotto Mundialhito in tutta l\'app. Non influisce sul tuo account né sul login.',
    namePlaceholder: 'Es: Yamil',
    nationalityUpdated: 'Nazionalità aggiornata.',
    languageUpdated: 'Lingua aggiornata.',
    personalTracker: 'Tracker personale',
    nameSaving: 'Salvataggio...',
    nameUpdated: 'Nome aggiornato.',
    nameRemoved: 'Nome rimosso.'
  },
  nav: {
      mundialhito: 'Mundialhito',
      activity: 'Attività',
      streaks: 'Serie',
      archive: 'Archivia',
      history: 'Cronologia',
      streakHistory: 'Storico serie',
      logout: 'Esci'
  },
  activity: {
    title: 'Attività',
    subtitle: 'Piano e cronologia recenti'
  },
  copas: {
      trophiesWon: 'Coppe vinte',
      trophiesShort: 'Coppe'
  },
  stats: {
      played: 'Giocate',
      won: 'Vinte',
      lost: 'Perse',
      drawn: 'Pareggi'
  },
  phase: {
    name: {
      FG: 'Fase a Gironi',
      E8: 'Ottavi di Finale',
      E4: 'Quarti di Finale',
      SF: 'Semifinale',
      FINAL: 'Grande Finale'
    },
    desc: {
      FG: 'Giochi le 3 partite. Passi il turno con 2 o più vittorie.',
      E8: 'Partita secca — se perdi, ritorni all\'inizio.',
      E4: 'Partita secca — se perdi, ritorni all\'inizio.',
      SF: 'Partita secca — se perdi, ritorni all\'inizio.',
      FINAL: 'L\'ultima battaglia!'
    }
  },
  bracket: {
      r16: 'Ottavi',
      qf: 'Quarti',
      sf: 'Semi'
  },
  result: {
      sectionLabel: 'Registra risultato',
      win: 'Vinto',
      draw: 'Pareggio',
      loss: 'Perso',
      undo: 'Annulla ultima partita',
      resetTournament: 'Reimposta torneo',
      resetAll: 'Reimposta tutto',
      qualified: 'Ti sei qualificato per gli Ottavi ({{wins}}/3)',
      groupStageFailed: 'Fase a Gironi: {{wins}}/3. Si ricomincia.',
      advancedTo: 'Sei passato a {{phase}}',
      eliminated: 'Eliminato in {{phase}}. Ritorni all\'inizio.',
      champion: 'CAMPIONE! Coppa #{{n}} conquistata.',
      noUndo: 'Non c\'è nessuna mossa da annullare.',
      undoSuccess: 'Ultima partita annullata.',
      groupDrawPenalty: '≈ Pareggio (rigori) · P{{match}}/3',
      groupMatchWin: '✓ Vittoria · P{{match}}/3',
      groupMatchLoss: '✗ Sconfitta · P{{match}}/3',
      resetTournamentConfirmTitle: 'Reimposta torneo',
      resetTournamentConfirmBody: 'Il progresso del torneo attuale verrà cancellato. Statistiche e coppe verranno mantenute.',
      resetTournamentSuccess: 'Torneo reimpostato.',
      resetAllConfirmTitle: 'Reimposta tutto',
      resetAllConfirmBody: 'Statistiche, cronologia, coppe e progresso del torneo verranno cancellati. Questa azione non può essere annullata.',
      resetAllSuccess: 'Tutto reimpostato.'
  },
  plan: {
      title: 'Piano di 10 partite',
      matchNumber: 'Partita #',
      renew: 'Rinnova',
      recentHistory: 'Cronologia recente',
      emptyHistory: 'Nessuna partita registrata ancora.',
      renewed: 'Piano rinnovato da 1'
  },
  championModal: {
      title: 'Campione del MundialHito',
      continue: 'Continua'
  },
  coinModal: {
      title: 'Rigori decisivi',
      subtitleInitial: 'Pareggio. Scegli testa o croce prima di lanciare.',
      subtitleChosen: 'Hai scelto {{choice}}. Tocca la moneta.',
      heads: 'Testa',
      tails: 'Croce',
      confirm: 'Conferma risultato',
      resultOut: 'È uscito {{result}} — ',
      resultWin: 'Vinci!',
      resultLoss: 'Perdi'
  },
  rachas: {
    title: 'Serie',
    subtitle: 'Record personali',
    empty: 'Non ci sono ancora partite registrate.<br>Gioca la tua prima partita per iniziare a vedere le tue serie.',
    winStreak: 'Vittorie consecutive',
    lossStreak: 'Sconfitte consecutive',
    historicRecord: 'Record storico',
    current: 'Attuale',
    fastestCup: 'Coppa più veloce',
    longestCup: 'Coppa più lunga',
    currentCampaign: 'Campagna attuale',
    finals: 'Finali',
    played: 'Giocate',
    won: 'Vinte',
    lost: 'Perse',
    resetButton: 'Reimposta serie',
    resetConfirmTitle: 'Reimposta serie',
    resetConfirmBody: 'Le serie tornano a zero. I nuovi calcoli partiranno dalla prossima partita. Cronologia e statistiche globali non vengono modificate.',
    resetSuccess: 'Serie reimpostate. Nuovo ciclo da adesso.',
    archiveType: 'Serie',
    archiveDescription: 'Salva lo stato attuale delle tue serie con un nome. Le serie attive NON vengono modificate.',
    archivePlaceholder: 'Es: Tappa 2025',
    archiveSaving: 'Salvataggio...',
    archiveError: 'Errore nel salvataggio. Riprova.',
    archiveSuccess: 'Tappa "{{name}}" archiviata.'
  },
  history: {
    title: 'Cronologia',
    subtitle: 'Stagioni archiviate',
    archivedOn: 'Archiviato il {{date}}',
    loading: 'Caricamento...',
    loadError: 'Errore nel caricamento della cronologia.',
    empty: 'Non ci sono ancora stagioni archiviate.<br>Usa l\'opzione Archivia per salvare il progresso attuale.',
    deleteTitle: 'Elimina stagione',
    deleteConfirm: 'Sei sicuro di volerla eliminare? Questa azione non può essere annullata.',
    deleteError: 'Errore nell\'eliminazione.',
    deleteSuccess: 'Stagione eliminata.'
  },
  streakHistory: {
    title: 'Storico serie',
    subtitle: 'Tappe archiviate',
    wins: 'Vittorie',
    losses: 'Sconfitte',
    fastestCup: 'Coppa veloce',
    longestCup: 'Coppa lunga',
    finals: 'Finali',
    won: 'Vinte',
    lost: 'Perse',
    archivedOn: 'Archiviato il {{date}}',
    loading: 'Caricamento...',
    loadError: 'Errore nel caricamento.',
    empty: 'Non ci sono ancora tappe archiviate.<br>Usa "Archivia serie" per salvare lo stato attuale.',
    deleteTitle: 'Elimina tappa',
    deleteConfirm: 'Sei sicuro di volerla eliminare? Questa azione non può essere annullata.',
    deleteError: 'Errore nell\'eliminazione.',
    deleteSuccess: 'Tappa eliminata.'
  },
  archive: {
    title: 'Archivia',
    seasonType: 'Stagione',
    seasonDescription: 'Salva le statistiche attuali con un nome. Puoi continuare a giocare normalmente dopo.',
    seasonPlaceholder: 'Es: Stagione 2026',
    saving: 'Salvataggio...',
    saveError: 'Errore nel salvataggio. Riprova.',
    seasonArchived: 'Stagione "{{name}}" archiviata.'
  }
});
