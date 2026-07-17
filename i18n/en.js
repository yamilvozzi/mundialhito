// ── DICCIONARIO: ENGLISH ───────────────────────────────
// Solo necesita tener las claves que YA fueron migradas. Cualquier clave
// ausente acá cae automáticamente al Español (ver i18n.js → FALLBACK_LOCALE),
// así que está bien que este archivo crezca de a poco, pantalla por pantalla.
I18N.registrarIdioma('en', {
  common: {
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete'
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
    languageUpdated: 'Language updated.'
  },
  nav: {
      mundialhito: 'Mundialhito'
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
      champion: 'CHAMPION! Trophy #{{n}} won.'
  },
  plan: {
      title: '10-match plan',
      matchNumber: 'Match #',
      renew: 'Renew',
      recentHistory: 'Recent history',
      emptyHistory: 'No matches recorded yet.',
      renewed: 'Plan renewed from 1'
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
  nav: {
      mundialhito: 'Mundialhito'
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
      champion: 'CHAMPION! Trophy #{{n}} won.'
  },
  plan: {
      title: '10-match plan',
      matchNumber: 'Match #',
      renew: 'Renew',
      recentHistory: 'Recent history',
      emptyHistory: 'No matches recorded yet.',
      renewed: 'Plan renewed from 1'
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
  }
  // El resto de las claves (torneo, historial, rachas, etc.) todavía no está
  // traducido: mientras tanto se muestran en Español vía el fallback.
});
