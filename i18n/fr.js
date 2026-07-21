// ── DICCIONARIO: FRANCÉS ───────────────────────────────
// Generado a partir de i18n/template.js — misma estructura y mismas claves
// que el diccionario base (Español). Cualquier clave sin traducir cae
// automáticamente a Español (ver i18n.js → FALLBACK_LOCALE).
I18N.registrarIdioma('fr', {
  common: {
    save: 'Enregistrer',
    cancel: 'Annuler',
    delete: 'Supprimer',
    confirm: 'Confirmer',
    menu: 'Menu'
  },
  login: {
    subtitle: 'Suivi personnel',
    emailPlaceholder: 'Email',
    passwordPlaceholder: 'Mot de passe',
    signIn: 'Se connecter',
    separator: 'ou',
    createAccount: 'Créer un compte',
    continueWithGoogle: 'Continuer avec Google',
    fillCredentials: 'Renseignez l\'email et le mot de passe.',
    signingIn: 'Connexion...',
    emailNotConfirmed: 'Confirmez votre email avant de vous connecter.',
    invalidCredentials: 'Email ou mot de passe incorrect.',
    passwordMinLength: 'Le mot de passe doit contenir au moins 6 caractères.',
    creatingAccount: 'Création du compte...',
    signUpError: 'Impossible de créer le compte : {{message}}',
    accountCreated: 'Compte créé ! Vérifiez votre email pour le confirmer.',
    connectingGoogle: 'Connexion...',
    googleError: 'Erreur de connexion avec Google.'
  },
  country: {
    AR: 'Argentine',
    BR: 'Brésil',
    CL: 'Chili',
    UY: 'Uruguay',
    US: 'États-Unis',
    MX: 'Mexique',
    ES: 'Espagne',
    FR: 'France',
    IT: 'Italie',
    DE: 'Allemagne',
    GB: 'Royaume-Uni',
    JP: 'Japon',
    KR: 'Corée du Sud',
    CN: 'Chine'
  },
  config: {
    title: 'Configuration',
    subtitle: 'Préférences de votre compte',
    profile: 'Profil',
    name: 'Nom',
    nameNotSet: 'Non défini',
    nationality: 'Nationalité',
    language: 'Langue',
    celebrations: 'Célébrations',
    celebrationsActive: 'Célébrations activées',
    sounds: 'Sons',
    sound: 'Son',
    volume: 'Volume',
    nameModalTitle: 'Votre nom',
    nameModalDesc: 'C\'est un simple détail visuel — il apparaît sous Mundialhito dans toute l\'application. Cela n\'affecte pas votre compte ni votre connexion.',
    namePlaceholder: 'Ex : Yamil',
    nationalityUpdated: 'Nationalité mise à jour.',
    languageUpdated: 'Langue mise à jour.',
    personalTracker: 'Suivi personnel',
    nameSaving: 'Enregistrement...',
    nameUpdated: 'Nom mis à jour.',
    nameRemoved: 'Nom supprimé.'
  },
  nav: {
      mundialhito: 'Mundialhito',
      activity: 'Activité',
      streaks: 'Séries',
      archive: 'Archiver',
      history: 'Historique',
      streakHistory: 'Hist. Séries',
      logout: 'Déconnexion'
  },
  activity: {
    title: 'Activité',
    subtitle: 'Plan et historique récent'
  },
  copas: {
      trophiesWon: 'Coupes gagnées',
      trophiesShort: 'Coupes'
  },
  stats: {
      played: 'Joués',
      won: 'Gagnés',
      lost: 'Perdus',
      drawn: 'Nuls'
  },
  phase: {
    name: {
      FG: 'Phase de groupes',
      E8: 'Huitièmes de finale',
      E4: 'Quarts de finale',
      SF: 'Demi-finale',
      FINAL: 'Grande Finale'
    },
    desc: {
      FG: 'Jouez les 3 matchs. Vous passez si vous gagnez 2 ou plus.',
      E8: 'Match unique — si vous perdez, vous repartez du début.',
      E4: 'Match unique — si vous perdez, vous repartez du début.',
      SF: 'Match unique — si vous perdez, vous repartez du début.',
      FINAL: 'La dernière bataille !'
    }
  },
  bracket: {
      r16: 'Huitièmes',
      qf: 'Quarts',
      sf: 'Demi'
  },
  result: {
      sectionLabel: 'Enregistrer le résultat',
      win: 'Gagné',
      draw: 'Nul',
      loss: 'Perdu',
      undo: 'Annuler le dernier match',
      resetTournament: 'Réinitialiser le tournoi',
      resetAll: 'Tout réinitialiser',
      qualified: 'Qualifié pour les Huitièmes ({{wins}}/3)',
      groupStageFailed: 'Phase de groupes : {{wins}}/3. On recommence.',
      advancedTo: 'Vous êtes passé à {{phase}}',
      eliminated: 'Éliminé en {{phase}}. Retour au début.',
      champion: 'CHAMPION ! Coupe n° {{n}} conquise.',
      noUndo: 'Aucune action à annuler.',
      undoSuccess: 'Dernier match annulé.',
      groupDrawPenalty: '≈ Nul (penalties) · M{{match}}/3',
      groupMatchWin: '✓ Victoire · M{{match}}/3',
      groupMatchLoss: '✗ Défaite · M{{match}}/3',
      resetTournamentConfirmTitle: 'Réinitialiser le tournoi',
      resetTournamentConfirmBody: 'La progression du tournoi actuel sera effacée. Les statistiques et les coupes sont conservées.',
      resetTournamentSuccess: 'Tournoi réinitialisé.',
      resetAllConfirmTitle: 'Tout réinitialiser',
      resetAllConfirmBody: 'Les statistiques, l\'historique, les coupes et la progression du tournoi seront effacés. Cette action est irréversible.',
      resetAllSuccess: 'Tout a été réinitialisé.'
  },
  plan: {
      title: 'Plan de 10 matchs',
      matchNumber: 'Match n°',
      renew: 'Renouveler',
      recentHistory: 'Historique récent',
      emptyHistory: 'Aucun match enregistré pour le moment.',
      renewed: 'Plan renouvelé depuis 1'
  },
  championModal: {
      title: 'Champion de MundialHito',
      continue: 'Continuer'
  },
  coinModal: {
      title: 'Décision aux penalties',
      subtitleInitial: 'Match nul. Choisissez pile ou face avant de lancer.',
      subtitleChosen: 'Vous avez choisi {{choice}}. Touchez la pièce.',
      heads: 'Pile',
      tails: 'Face',
      confirm: 'Confirmer le résultat',
      resultOut: 'C\'est {{result}} — ',
      resultWin: 'Vous gagnez !',
      resultLoss: 'Vous perdez'
  },
  rachas: {
    title: 'Séries',
    subtitle: 'Records personnels',
    empty: 'Aucun match enregistré pour le moment.<br>Jouez votre premier match pour commencer à voir vos séries.',
    winStreak: 'Victoires consécutives',
    lossStreak: 'Défaites consécutives',
    historicRecord: 'Record historique',
    current: 'Actuelle',
    fastestCup: 'Coupe la plus rapide',
    longestCup: 'Coupe la plus longue',
    currentCampaign: 'Campagne actuelle',
    finals: 'Finales',
    played: 'Jouées',
    won: 'Gagnées',
    lost: 'Perdues',
    resetButton: 'Réinitialiser les séries',
    resetConfirmTitle: 'Réinitialiser les séries',
    resetConfirmBody: 'Les séries reviennent à zéro. Les nouveaux calculs commencent au prochain match. L\'historique et les statistiques globales ne sont pas modifiés.',
    resetSuccess: 'Séries réinitialisées. Nouveau cycle à partir de maintenant.',
    archiveType: 'Séries',
    archiveDescription: 'Enregistrez l\'état actuel de vos séries. Les séries actives ne sont PAS modifiées.',
    archivePlaceholder: 'Ex : Étape 2025',
    archiveSaving: 'Enregistrement...',
    archiveError: 'Erreur lors de l\'enregistrement. Réessayez.',
    archiveSuccess: 'Étape « {{name}} » archivée.'
  },
  history: {
    title: 'Historique',
    subtitle: 'Saisons archivées',
    archivedOn: 'Archivé le {{date}}',
    loading: 'Chargement...',
    loadError: 'Erreur lors du chargement de l\'historique.',
    empty: 'Aucune saison archivée pour le moment.<br>Utilisez l\'option Archiver pour enregistrer la progression actuelle.',
    deleteTitle: 'Supprimer la saison',
    deleteConfirm: 'Voulez-vous vraiment la supprimer ? Cette action est irréversible.',
    deleteError: 'Erreur lors de la suppression.',
    deleteSuccess: 'Saison supprimée.'
  },
  streakHistory: {
    title: 'Historique des séries',
    subtitle: 'Étapes archivées',
    wins: 'Victoires',
    losses: 'Défaites',
    fastestCup: 'Coupe rapide',
    longestCup: 'Coupe longue',
    finals: 'Finales',
    won: 'Gagnées',
    lost: 'Perdues',
    archivedOn: 'Archivé le {{date}}',
    loading: 'Chargement...',
    loadError: 'Erreur lors du chargement.',
    empty: 'Aucune étape archivée pour le moment.<br>Utilisez « Archiver les séries » pour enregistrer l\'état actuel.',
    deleteTitle: 'Supprimer l\'étape',
    deleteConfirm: 'Voulez-vous vraiment la supprimer ? Cette action est irréversible.',
    deleteError: 'Erreur lors de la suppression.',
    deleteSuccess: 'Étape supprimée.'
  },
  archive: {
    title: 'Archiver',
    seasonType: 'Saison',
    seasonDescription: 'Enregistrez les statistiques actuelles avec un nom. Vous pouvez continuer à jouer normalement ensuite.',
    seasonPlaceholder: 'Ex : Saison 2026',
    saving: 'Enregistrement...',
    saveError: 'Erreur lors de l\'enregistrement. Réessayez.',
    seasonArchived: 'Saison « {{name}} » archivée.'
  }
});
