// ── DICCIONARIO: ALEMÁN ────────────────────────────────
// Generado a partir de i18n/template.js, con la misma estructura y las
// mismas claves que el diccionario base (Español). Cualquier clave que
// falte acá cae automáticamente a Español (ver i18n.js → FALLBACK_LOCALE).
I18N.registrarIdioma('de', {
  common: {
    save: 'Speichern',
    cancel: 'Abbrechen',
    delete: 'Löschen',
    confirm: 'Bestätigen',
    menu: 'Menü'
  },
  login: {
    subtitle: 'Persönlicher Tracker',
    emailPlaceholder: 'E-Mail',
    passwordPlaceholder: 'Passwort',
    signIn: 'Anmelden',
    separator: 'oder',
    createAccount: 'Neues Konto erstellen',
    continueWithGoogle: 'Mit Google fortfahren',
    fillCredentials: 'Bitte E-Mail und Passwort eingeben.',
    signingIn: 'Anmeldung läuft...',
    emailNotConfirmed: 'Bestätige deine E-Mail, bevor du dich anmeldest.',
    invalidCredentials: 'E-Mail oder Passwort falsch.',
    passwordMinLength: 'Das Passwort muss mindestens 6 Zeichen enthalten.',
    creatingAccount: 'Konto wird erstellt...',
    signUpError: 'Konto konnte nicht erstellt werden: {{message}}',
    accountCreated: 'Konto erstellt! Überprüfe deine E-Mail, um es zu bestätigen.',
    connectingGoogle: 'Verbindung wird hergestellt...',
    googleError: 'Verbindung zu Google fehlgeschlagen.'
  },
  country: {
    AR: 'Argentinien', BR: 'Brasilien', CL: 'Chile', UY: 'Uruguay',
    US: 'Vereinigte Staaten', MX: 'Mexiko', ES: 'Spanien', FR: 'Frankreich',
    IT: 'Italien', DE: 'Deutschland', GB: 'Vereinigtes Königreich', JP: 'Japan',
    KR: 'Südkorea', CN: 'China'
  },
  config: {
    title: 'Einstellungen',
    subtitle: 'Einstellungen deines Kontos',
    profile: 'Profil',
    name: 'Name',
    nameNotSet: 'Nicht festgelegt',
    nationality: 'Nationalität',
    language: 'Sprache',
    celebrations: 'Feiern',
    celebrationsActive: 'Feiern aktiv',
    sounds: 'Sounds',
    sound: 'Ton',
    volume: 'Lautstärke',
    nameModalTitle: 'Dein Name',
    nameModalDesc: 'Das ist nur ein visuelles Detail — er erscheint unter Mundialhito in der ganzen App. Er wirkt sich nicht auf dein Konto oder deinen Login aus.',
    namePlaceholder: 'Z.B: Yamil',
    nationalityUpdated: 'Nationalität aktualisiert.',
    languageUpdated: 'Sprache aktualisiert.',
    personalTracker: 'Persönlicher Tracker',
    nameSaving: 'Wird gespeichert...',
    nameUpdated: 'Name aktualisiert.',
    nameRemoved: 'Name entfernt.'
  },
  nav: {
    mundialhito: 'Mundialhito',
    streaks: 'Serien',
    archive: 'Archivieren',
    history: 'Verlauf',
    streakHistory: 'Serienverlauf',
    logout: 'Abmelden'
  },
  copas: {
    trophiesWon: 'Gewonnene Pokale',
    trophiesShort: 'Pokale'
  },
  stats: {
    played: 'Gespielt',
    won: 'Gewonnen',
    lost: 'Verloren',
    drawn: 'Unentschieden'
  },
  phase: {
    name: {
      FG: 'Gruppenphase',
      E8: 'Achtelfinale',
      E4: 'Viertelfinale',
      SF: 'Halbfinale',
      FINAL: 'Großes Finale'
    },
    desc: {
      FG: 'Spiele die 3 Spiele. Du kommst weiter, wenn du 2 oder mehr gewinnst.',
      E8: 'Einzelspiel — bei einer Niederlage geht es zurück zum Anfang.',
      E4: 'Einzelspiel — bei einer Niederlage geht es zurück zum Anfang.',
      SF: 'Einzelspiel — bei einer Niederlage geht es zurück zum Anfang.',
      FINAL: 'Die letzte Schlacht!'
    }
  },
  bracket: {
    r16: 'Achtelfinale',
    qf: 'Viertelfinale',
    sf: 'Halbfinale'
  },
  result: {
    sectionLabel: 'Ergebnis eintragen',
    win: 'Gewonnen',
    draw: 'Unentschieden',
    loss: 'Verloren',
    undo: 'Letztes Spiel rückgängig machen',
    resetTournament: 'Turnier zurücksetzen',
    resetAll: 'Alles zurücksetzen',
    qualified: 'Du hast dich für das Achtelfinale qualifiziert ({{wins}}/3)',
    groupStageFailed: 'Gruppenphase: {{wins}}/3. Von vorne beginnen.',
    advancedTo: 'Du bist weitergekommen zu {{phase}}',
    eliminated: 'In {{phase}} ausgeschieden. Zurück zum Anfang.',
    champion: 'MEISTER! Pokal #{{n}} gewonnen.',
    noUndo: 'Es gibt keine Aktion, die rückgängig gemacht werden kann.',
    undoSuccess: 'Letztes Spiel rückgängig gemacht.',
    groupDrawPenalty: '≈ Unentschieden (Elfmeterschießen) · S{{match}}/3',
    groupMatchWin: '✓ Gewonnen · S{{match}}/3',
    groupMatchLoss: '✗ Verloren · S{{match}}/3',
    resetTournamentConfirmTitle: 'Turnier zurücksetzen',
    resetTournamentConfirmBody: 'Der Fortschritt des aktuellen Turniers wird gelöscht. Statistiken und Pokale bleiben erhalten.',
    resetTournamentSuccess: 'Turnier zurückgesetzt.',
    resetAllConfirmTitle: 'Alles zurücksetzen',
    resetAllConfirmBody: 'Statistiken, Verlauf, Pokale und Turnierfortschritt werden gelöscht. Diese Aktion kann nicht rückgängig gemacht werden.',
    resetAllSuccess: 'Alles zurückgesetzt.'
  },
  plan: {
    title: '10-Spiele-Plan',
    matchNumber: 'Spiel Nr.',
    renew: 'Erneuern',
    recentHistory: 'Letzter Verlauf',
    emptyHistory: 'Noch keine Spiele registriert.',
    renewed: 'Plan ab 1 erneuert'
  },
  coinModal: {
    title: 'Elfmeterschießen',
    subtitleInitial: 'Unentschieden. Wähle Kopf oder Zahl, bevor du wirfst.',
    subtitleChosen: 'Du hast {{choice}} gewählt. Tippe auf die Münze.',
    heads: 'Kopf',
    tails: 'Zahl',
    confirm: 'Ergebnis bestätigen',
    resultOut: 'Es fiel {{result}} — ',
    resultWin: 'Du gewinnst!',
    resultLoss: 'Du verlierst'
  },
  rachas: {
    title: 'Serien',
    subtitle: 'Persönliche Rekorde',
    empty: 'Es wurden noch keine Spiele registriert.<br>Spiele dein erstes Spiel, um deine Serien zu sehen.',
    winStreak: 'Siegesserie',
    lossStreak: 'Niederlagenserie',
    historicRecord: 'Allzeitrekord',
    current: 'Aktuell',
    fastestCup: 'Schnellster Pokal',
    longestCup: 'Längster Pokal',
    currentCampaign: 'Aktuelle Kampagne',
    finals: 'Finals',
    played: 'Gespielt',
    won: 'Gewonnen',
    lost: 'Verloren',
    resetButton: 'Serien zurücksetzen',
    resetConfirmTitle: 'Serien zurücksetzen',
    resetConfirmBody: 'Die Serien werden auf null zurückgesetzt. Die neuen Berechnungen beginnen mit dem nächsten Spiel. Verlauf und Gesamtstatistiken werden nicht verändert.',
    resetSuccess: 'Serien zurückgesetzt. Neuer Zyklus ab jetzt.',
    archiveType: 'Serien',
    archiveDescription: 'Speichere den aktuellen Stand deiner Serien mit einem Namen. Aktive Serien werden NICHT verändert.',
    archivePlaceholder: 'Z.B: Etappe 2025',
    archiveSaving: 'Wird gespeichert...',
    archiveError: 'Fehler beim Speichern. Versuche es erneut.',
    archiveSuccess: 'Etappe "{{name}}" archiviert.'
  },
  history: {
    title: 'Verlauf',
    subtitle: 'Archivierte Saisons',
    archivedOn: 'Archiviert am {{date}}',
    loading: 'Wird geladen...',
    loadError: 'Fehler beim Laden des Verlaufs.',
    empty: 'Es gibt noch keine archivierten Saisons.<br>Nutze die Option Archivieren, um den aktuellen Fortschritt zu speichern.',
    deleteTitle: 'Saison löschen',
    deleteConfirm: 'Bist du sicher, dass du sie löschen möchtest? Diese Aktion kann nicht rückgängig gemacht werden.',
    deleteError: 'Fehler beim Löschen.',
    deleteSuccess: 'Saison gelöscht.'
  },
  streakHistory: {
    title: 'Serienverlauf',
    subtitle: 'Archivierte Etappen',
    wins: 'Siege',
    losses: 'Niederlagen',
    fastestCup: 'Schneller Pokal',
    longestCup: 'Langer Pokal',
    finals: 'Finals',
    won: 'Gewonnen',
    lost: 'Verloren',
    archivedOn: 'Archiviert am {{date}}',
    loading: 'Wird geladen...',
    loadError: 'Fehler beim Laden.',
    empty: 'Es gibt noch keine archivierten Etappen.<br>Nutze "Serien archivieren", um den aktuellen Stand zu speichern.',
    deleteTitle: 'Etappe löschen',
    deleteConfirm: 'Bist du sicher, dass du sie löschen möchtest? Diese Aktion kann nicht rückgängig gemacht werden.',
    deleteError: 'Fehler beim Löschen.',
    deleteSuccess: 'Etappe gelöscht.'
  },
  archive: {
    title: 'Archivieren',
    seasonType: 'Saison',
    seasonDescription: 'Speichere die aktuellen Statistiken mit einem Namen. Du kannst danach normal weiterspielen.',
    seasonPlaceholder: 'Z.B: Saison 2026',
    saving: 'Wird gespeichert...',
    saveError: 'Fehler beim Speichern. Versuche es erneut.',
    seasonArchived: 'Saison "{{name}}" archiviert.'
  }
});
