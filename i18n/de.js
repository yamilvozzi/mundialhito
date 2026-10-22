// Diccionario de. Base de claves: es.js; plantilla: template.js.
// Editar las traducciones aquí y verificar con npm test.

I18N.registrarIdioma('de', {
  persistence: {
    saving: "Speichern…",
    saved: "Gespeichert",
    error: "Die Änderungen wurden nicht gespeichert. Schließen Sie diesen Tab nicht.",
    sessionEnded: "Die Sitzung wurde mit unbestätigten Änderungen beendet. Melden Sie sich erneut an und prüfen Sie Ihre letzten Daten.",
    logoutError: "Abmelden fehlgeschlagen. Versuchen Sie es erneut."
  },
  common: {
    save: 'Speichern',
    cancel: "Abbrechen",
    delete: 'Löschen',
    confirm: 'Bestätigen',
    menu: "Menü"
  },
  login: {
    loadError: "Ihre Daten konnten nicht geladen werden. Versuchen Sie es erneut, um fortzufahren.",
    retryLoad: "Erneut versuchen",
    startupError: 'Die App konnte nicht gestartet werden. Prüfe deine Verbindung und versuche es erneut.',
    subtitle: 'persönlicher Tracker',
    emailPlaceholder: 'E-Mail',
    passwordPlaceholder: 'Passwort',
    signIn: "Anmelden",
    separator: "oder",
    createAccount: 'Neues Konto erstellen',
    continueWithGoogle: 'Weiter mit Google',
    fillCredentials: "Geben Sie E-Mail-Adresse und Passwort ein.",
    signingIn: "Anmelden...",
    emailNotConfirmed: 'Bestätigen Sie Ihre E-Mail-Adresse, bevor Sie eintreten.',
    invalidCredentials: 'Falsche E-Mail-Adresse oder falsches Passwort.',
    passwordMinLength: 'Das Passwort muss mindestens 6 Zeichen lang sein.',
    creatingAccount: 'Konto erstellen...',
    signUpError: 'Konto konnte nicht erstellt werden: {{message}}',
    accountCreated: 'Konto erstellt! Überprüfen Sie Ihre E-Mails, um dies zu bestätigen.',
    connectingGoogle: 'Verbinden...',
    googleError: 'Fehler beim Herstellen der Verbindung zu Google.'
  },
  country: {
    AR: 'Argentinien',
    BR: 'Brasilien',
    CL: "Chile",
    UY: 'Uruguay',
    US: 'USA',
    MX: 'Mexiko',
    ES: 'Spanien',
    FR: 'Frankreich',
    IT: 'Italien',
    DE: 'Deutschland',
    GB: 'Vereinigtes Königreich',
    JP: 'Japan',
    KR: 'Südkorea',
    CN: 'China',
    CT: 'Katalonien'
  },
  config: {
    title: 'Konfiguration',
    subtitle: 'Ihre Kontoeinstellungen',
    profile: 'Profil',
    name: 'Name',
    nameNotSet: 'Undefiniert',
    nationality: 'Nationalität',
    language: 'Sprache',
    celebrations: 'Feierlichkeiten',
    celebrationsActive: 'Aktives Feiern',
    sounds: "Töne",
    sound: 'Klang',
    volume: 'Lautstärke',
    nameModalTitle: 'Ihr Name',
    nameModalDesc: 'Dies ist der Name, der in der Anwendung angezeigt wird. Es hat keine Auswirkungen auf Ihr Konto oder Ihre Anmeldung.',
    namePlaceholder: 'Beispiel: Yamil',
    nationalityUpdated: 'Aktualisierte Nationalität.',
    languageUpdated: 'Aktualisierte Sprache.',
    personalTracker: 'persönlicher Tracker',
    nameSaving: "Speichern...",
    nameUpdated: 'Name aktualisiert.',
    nameRemoved: 'Name entfernt.'
  },
  nav: {
    mundialhito: 'MUNDIALHITO',
    activity: 'Aktivität',
    streaks: "Serien",
    archive: "Archivieren",
    history: "Verlauf",
    streakHistory: "Serienverlauf",
    logout: 'Abmelden'
  },
  activity: {
    title: 'Aktivität',
    subtitle: "Aktueller Plan und Verlauf"
  },
  copas: {
    trophiesWon: 'Pokale gewonnen',
    trophiesShort: 'Pokale'
  },
  stats: {
    played: 'Spiele',
    won: 'Siege',
    lost: 'Niederlagen',
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
      FG: 'Gewinnen Sie 2 der 3 Spiele, um sich zu qualifizieren.',
      E8: "Ein Spiel. Bei einer Niederlage beginnen Sie von vorn.",
      E4: "Ein Spiel. Bei einer Niederlage beginnen Sie von vorn.",
      SF: "Ein Spiel. Bei einer Niederlage beginnen Sie von vorn.",
      FINAL: "Der letzte Kampf!"
    }
  },
  bracket: {
    final: "Finale",
    r16: "Achtelfinale",
    qf: 'Viertelfinale',
    sf: 'Halb'
  },
  result: {
    sectionLabel: 'Ergebnis aufzeichnen',
    win: 'Sieg',
    draw: 'Unentschieden',
    loss: 'Niederlage',
    undo: 'Letztes Spiel rückgängig machen',
    resetTournament: 'Turnier neu starten',
    resetAll: 'Starten Sie alles neu',
    qualified: "Für das Achtelfinale qualifiziert ({{wins}}/3)",
    groupStageFailed: 'Gruppenphase: {{wins}}/3. Um noch einmal zu beginnen.',
    advancedTo: "Nächste Runde: {{phase}}",
    eliminated: "Ausgeschieden: {{phase}}. Zurück zum Start.",
    champion: 'CHAMPION! Pokal #{{n}} erobert.',
    noUndo: 'Es gibt keine Bewegung, die rückgängig gemacht werden könnte.',
    undoSuccess: 'Letztes Spiel rückgängig gemacht.',
    groupDrawPenalty: "≈ Unentschieden (Elfmeterschießen) · P{{match}}/3",
    groupMatchWin: '✓ Sieg · P{{match}}/3',
    groupMatchLoss: "✗ Niederlage · P{{match}}/3",
    resetTournamentConfirmTitle: 'Turnier neu starten',
    resetTournamentConfirmBody: 'Du startest ein neues Turnier. Ihre Statistiken und Pokale bleiben erhalten.',
    resetTournamentSuccess: 'Das Turnier wurde neu gestartet.',
    resetAllConfirmTitle: 'Starten Sie alles neu',
    resetAllConfirmBody: 'Setzen Sie Ihre Statistiken, Pokale und das aktuelle Turnier zurück. Serien, Verlauf und Matchplan bleiben erhalten. Diese Aktion kann nicht rückgängig gemacht werden.',
    resetAllSuccess: 'Turnierstatistiken zurückgesetzt.'
  },
  plan: {
    title: '10-Match-Plan',
    matchNumber: 'Abgeschlossen',
    renew: 'Erneuern',
    recentHistory: "Letzte Spiele",
    emptyHistory: 'Noch keine Spiele registriert.',
    renewed: 'Plan erneuert: 0 von 10 abgeschlossen',
    nextMatch: 'Nächstes Spiel: {{number}}'
  },
  championModal: {
    title: 'MUNDIALHITO-Champion',
    continue: 'Weitermachen'
  },
  coinModal: {
    flip: 'Münze werfen',
    title: "Elfmeterschießen",
    subtitleInitial: "Unentschieden. Wählen Sie vor dem Münzwurf Kopf oder Zahl.",
    subtitleChosen: 'Sie haben {{choice}} gewählt. Berühre die Münze.',
    heads: 'Kopf',
    tails: 'Zahl',
    confirm: 'Ergebnis bestätigen',
    resultOut: '{{result}} kam heraus – ',
    resultWin: 'Du gewinnst!',
    resultLoss: 'Du verlierst'
  },
  rachas: {
    title: "Serien",
    subtitle: "Persönliche Rekorde",
    empty: 'Es sind noch keine Spiele registriert.<br>Spielen Sie Ihr erstes Spiel, um Ihre Serien zu sehen.',
    winStreak: 'Siege in Folge',
    lossStreak: "Niederlagen in Folge",
    historicRecord: 'Historischer Rekord',
    current: 'Aktuell',
    fastestCup: "Schnellster Pokalsieg",
    longestCup: "Langsamster Pokalsieg",
    currentCampaign: 'Aktuelle Kampagne',
    finals: 'Finale',
    played: 'Gespielt',
    won: 'Gewonnen',
    lost: 'Verloren',
    resetButton: 'Serien neu starten',
    resetConfirmTitle: 'Serien neu starten',
    resetConfirmBody: 'Alle Serien gehen auf Null zurück. Verlauf und Statistiken bleiben erhalten.',
    resetSuccess: 'Serien neu gestartet. Ab sofort neuer Zyklus.',
    archiveType: "Serien",
    archiveDescription: 'Speichern Sie den aktuellen Status Ihrer Serien.',
    archivePlaceholder: 'Beispiel: Etappe 2025',
    archiveSaving: "Speichern...",
    archiveError: 'Fehler beim Speichern. Versuchen Sie es erneut.',
    archiveSuccess: 'Stufe „{{name}}“ archiviert.'
  },
  history: {
    title: "Verlauf",
    subtitle: "Archivierte Saisons",
    archivedOn: 'Abgelegt am {{date}}',
    loading: "Laden...",
    loadError: 'Fehler beim Laden des Verlaufs.',
    empty: 'Es sind noch keine archivierten Saisons vorhanden.<br>Verwenden Sie die Option „Archivieren“, um Ihren aktuellen Fortschritt zu speichern.',
    deleteTitle: "Saison löschen",
    deleteConfirm: 'Sind Sie sicher, dass Sie es löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.',
    deleteError: "Fehler beim Löschen.",
    deleteSuccess: "Saison gelöscht."
  },
  streakHistory: {
    title: "Serienverlauf",
    subtitle: 'Archivierte Etappen',
    wins: 'Siege',
    losses: 'Niederlagen',
    fastestCup: "Schnellster Pokalsieg",
    longestCup: "Langsamster Pokalsieg",
    finals: 'Finale',
    won: 'Gewonnen',
    lost: 'Verloren',
    archivedOn: 'Abgelegt am {{date}}',
    loading: "Laden...",
    loadError: 'Fehler beim Laden.',
    empty: 'Es sind noch keine Etappen archiviert.<br>Verwenden Sie „Serien archivieren“, um den aktuellen Status zu speichern.',
    deleteTitle: 'Stufe löschen',
    deleteConfirm: 'Sind Sie sicher, dass Sie es löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.',
    deleteError: "Fehler beim Löschen.",
    deleteSuccess: "Etappe gelöscht."
  },
  archive: {
    title: "Archivieren",
    seasonType: "Saison",
    seasonDescription: 'Speichern Sie aktuelle Statistiken.',
    seasonPlaceholder: 'Beispiel: Saison 2026',
    saving: "Speichern...",
    saveError: 'Fehler beim Speichern. Versuchen Sie es erneut.',
    seasonArchived: "Saison „{{name}}“ archiviert."
  }
});
