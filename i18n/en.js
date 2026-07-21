// ── DICCIONARIO: ENGLISH ───────────────────────────────
// Solo necesita tener las claves que YA fueron migradas. Cualquier clave
// ausente acá cae automáticamente al Español (ver i18n.js → FALLBACK_LOCALE),
// así que está bien que este archivo crezca de a poco, pantalla por pantalla.
I18N.registrarIdioma('en', {
  common: {
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    confirm: 'Confirm',
    menu: 'Menu'
  },
  login: {
    subtitle: 'Personal tracker',
    emailPlaceholder: 'Email',
    passwordPlaceholder: 'Password',
    signIn: 'Sign in',
    separator: 'or',
    createAccount: 'Create new account',
    continueWithGoogle: 'Continue with Google',
    fillCredentials: 'Enter your email and password.',
    signingIn: 'Signing in...',
    emailNotConfirmed: 'Confirm your email before signing in.',
    invalidCredentials: 'Incorrect email or password.',
    passwordMinLength: 'Password must contain at least 6 characters.',
    creatingAccount: 'Creating account...',
    signUpError: 'Could not create the account: {{message}}',
    accountCreated: 'Account created! Check your email to confirm it.',
    connectingGoogle: 'Connecting...',
    googleError: 'Could not connect to Google.'
  },
  country: {
    AR: 'Argentina', BR: 'Brazil', CL: 'Chile', UY: 'Uruguay',
    US: 'United States', MX: 'Mexico', ES: 'Spain', FR: 'France',
    IT: 'Italy', DE: 'Germany', GB: 'United Kingdom', JP: 'Japan',
    KR: 'South Korea', CN: 'China'
  },
  config: {
    title: 'Settings',
    subtitle: 'Your account preferences',
    profile: 'Profile',
    name: 'Name',
    nameNotSet: 'Not set',
    nationality: 'Nationality',
    language: 'Language',
    celebrations: 'Celebrations',
    celebrationsActive: 'Celebrations enabled',
    sounds: 'Sounds',
    sound: 'Sound',
    volume: 'Volume',
    nameModalTitle: 'Your name',
    nameModalDesc: 'This is just a visual touch — it shows up under Mundialhito throughout the app. It doesn\'t affect your account or login.',
    namePlaceholder: 'E.g: Yamil',
    nationalityUpdated: 'Nationality updated.',
    languageUpdated: 'Language updated.',
    personalTracker: 'Personal tracker',
    nameSaving: 'Saving...',
    nameUpdated: 'Name updated.',
    nameRemoved: 'Name removed.'
  },
  nav: {
      mundialhito: 'Mundialhito',
      activity: 'Activity',
      streaks: 'Streaks',
      archive: 'Archive',
      history: 'History',
      streakHistory: 'Streak history',
      logout: 'Sign out'
  },
  activity: {
    title: 'Activity',
    subtitle: 'Plan and recent history'
  },
  copas: {
      trophiesWon: 'Trophies won',
      trophiesShort: 'Trophies'
  },
  stats: {
      played: 'Played',
      won: 'Won',
      lost: 'Lost',
      drawn: 'Drawn'
  },
  phase: {
    name: {
      FG: 'Group Stage',
      E8: 'Round of 16',
      E4: 'Quarter-finals',
      SF: 'Semi-final',
      FINAL: 'Grand Final'
    },
    desc: {
      FG: 'Play all 3 matches. You advance with 2 or more wins.',
      E8: 'Single match — lose and you\'re back to the start.',
      E4: 'Single match — lose and you\'re back to the start.',
      SF: 'Single match — lose and you\'re back to the start.',
      FINAL: 'The last battle!'
    }
  },
  bracket: {
      r16: 'Round of 16',
      qf: 'Quarters',
      sf: 'Semis'
  },
  result: {
      sectionLabel: 'Record result',
      win: 'Won',
      draw: 'Draw',
      loss: 'Lost',
      undo: 'Undo last match',
      resetTournament: 'Reset tournament',
      resetAll: 'Reset everything',
      qualified: 'You qualified for the Round of 16 ({{wins}}/3)',
      groupStageFailed: 'Group Stage: {{wins}}/3. Starting over.',
      advancedTo: 'You advanced to {{phase}}',
      eliminated: 'Eliminated in {{phase}}. Back to the start.',
      champion: 'CHAMPION! Trophy #{{n}} won.',
      noUndo: 'There is no move to undo.',
      undoSuccess: 'Last match undone.',
      groupDrawPenalty: '≈ Draw (penalties) · M{{match}}/3',
      groupMatchWin: '✓ Won · M{{match}}/3',
      groupMatchLoss: '✗ Lost · M{{match}}/3',
      resetTournamentConfirmTitle: 'Reset tournament',
      resetTournamentConfirmBody: 'Current tournament progress will be cleared. Statistics and trophies will be kept.',
      resetTournamentSuccess: 'Tournament reset.',
      resetAllConfirmTitle: 'Reset everything',
      resetAllConfirmBody: 'Statistics, history, trophies, and tournament progress will be cleared. This action cannot be undone.',
      resetAllSuccess: 'Everything reset.'
  },
  plan: {
      title: '10-match plan',
      matchNumber: 'Match #',
      renew: 'Renew',
      recentHistory: 'Recent history',
      emptyHistory: 'No matches recorded yet.',
      renewed: 'Plan renewed from 1'
  },
  championModal: {
      title: 'MundialHito Champion',
      continue: 'Continue'
  },
  coinModal: {
      title: 'Penalty shootout',
      subtitleInitial: 'Draw. Choose heads or tails before you flip.',
      subtitleChosen: 'You picked {{choice}}. Tap the coin.',
      heads: 'Heads',
      tails: 'Tails',
      confirm: 'Confirm result',
      resultOut: 'It landed {{result}} — ',
      resultWin: 'You win!',
      resultLoss: 'You lose'
  },
  rachas: {
    title: 'Streaks',
    subtitle: 'Personal records',
    empty: 'No matches have been recorded yet.<br>Play your first match to start tracking your streaks.',
    winStreak: 'Winning streak',
    lossStreak: 'Losing streak',
    historicRecord: 'All-time record',
    current: 'Current',
    fastestCup: 'Fastest trophy',
    longestCup: 'Longest trophy',
    currentCampaign: 'Current campaign',
    finals: 'Finals',
    played: 'Played',
    won: 'Won',
    lost: 'Lost',
    resetButton: 'Reset streaks',
    resetConfirmTitle: 'Reset streaks',
    resetConfirmBody: 'Your streaks will reset to zero. New calculations will begin with your next match. History and overall stats will not be changed.',
    resetSuccess: 'Streaks reset. A new cycle starts now.',
    archiveType: 'Streaks',
    archiveDescription: 'Save the current state of your streaks with a name. Active streaks will not be changed.',
    archivePlaceholder: 'E.g. Stage 2025',
    archiveSaving: 'Saving...',
    archiveError: 'Could not save. Try again.',
    archiveSuccess: 'Stage "{{name}}" archived.'
  }
,
  history: {
    title: 'History',
    subtitle: 'Archived seasons',
    archivedOn: 'Archived on {{date}}',
    loading: 'Loading...',
    loadError: 'Could not load history.',
    empty: 'There are no archived seasons yet.<br>Use Archive to save your current progress.',
    deleteTitle: 'Delete season',
    deleteConfirm: 'Are you sure you want to delete it? This action cannot be undone.',
    deleteError: 'Could not delete.',
    deleteSuccess: 'Season deleted.'
  },
  streakHistory: {
    title: 'Streak history',
    subtitle: 'Archived stages',
    wins: 'Wins',
    losses: 'Losses',
    fastestCup: 'Fastest trophy',
    longestCup: 'Longest trophy',
    finals: 'Finals',
    won: 'Won',
    lost: 'Lost',
    archivedOn: 'Archived on {{date}}',
    loading: 'Loading...',
    loadError: 'Could not load.',
    empty: 'There are no archived stages yet.<br>Use "Archive streaks" to save the current state.',
    deleteTitle: 'Delete stage',
    deleteConfirm: 'Are you sure you want to delete it? This action cannot be undone.',
    deleteError: 'Could not delete.',
    deleteSuccess: 'Stage deleted.'
  },
  archive: {
    title: 'Archive',
    seasonType: 'Season',
    seasonDescription: 'Save your current stats with a name. You can keep playing normally afterwards.',
    seasonPlaceholder: 'E.g. Season 2026',
    saving: 'Saving...',
    saveError: 'Could not save. Try again.',
    seasonArchived: 'Season "{{name}}" archived.'
  }

  // El resto de las claves (torneo, historial, rachas, etc.) todavía no está
  // traducido: mientras tanto se muestran en Español vía el fallback.
});
