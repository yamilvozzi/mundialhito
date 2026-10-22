// Diccionario fr. Base de claves: es.js; plantilla: template.js.
// Editar las traducciones aquí y verificar con npm test.

I18N.registrarIdioma('fr', {
  persistence: {
    saving: "Enregistrement…",
    saved: "Enregistré",
    error: "Les modifications n’ont pas été enregistrées. Ne fermez pas cet onglet.",
    sessionEnded: "La session s’est terminée avec des modifications non confirmées. Reconnectez-vous et vérifiez vos dernières données.",
    logoutError: "Impossible de se déconnecter. Réessayez."
  },
  common: {
    save: 'Enregistrer',
    cancel: 'Annuler',
    delete: 'Supprimer',
    confirm: 'Confirmer',
    menu: 'Menu'
  },
  login: {
    loadError: "Impossible de charger vos données. Réessayez pour continuer.",
    retryLoad: "Réessayer",
    startupError: 'Impossible de démarrer l’application. Vérifiez votre connexion et réessayez.',
    subtitle: 'tracker personnel',
    emailPlaceholder: 'E-mail',
    passwordPlaceholder: 'Mot de passe',
    signIn: 'Se connecter',
    separator: 'ou',
    createAccount: 'Créer un nouveau compte',
    continueWithGoogle: 'Continuer avec Google',
    fillCredentials: "Saisissez votre adresse e-mail et votre mot de passe.",
    signingIn: "Connexion...",
    emailNotConfirmed: 'Confirmez votre email avant d\'entrer.',
    invalidCredentials: 'Email ou mot de passe incorrect.',
    passwordMinLength: 'Le mot de passe doit comporter au moins 6 caractères.',
    creatingAccount: 'Création d\'un compte...',
    signUpError: 'Impossible de créer le compte : {{message}}',
    accountCreated: 'Compte créé ! Vérifiez votre courrier électronique pour le confirmer.',
    connectingGoogle: "Connexion...",
    googleError: 'Erreur de connexion à Google.'
  },
  country: {
    AR: 'Argentine',
    BR: 'Brésil',
    CL: 'Chili',
    UY: 'Uruguay',
    US: 'USA',
    MX: 'Mexique',
    ES: 'Espagne',
    FR: 'France',
    IT: 'Italie',
    DE: 'Allemagne',
    GB: 'Royaume-Uni',
    JP: 'Japon',
    KR: 'Corée du Sud',
    CN: 'Chine',
    CT: 'Catalogne'
  },
  config: {
    title: 'Configuration',
    subtitle: 'Les préférences de votre compte',
    profile: 'Profil',
    name: 'Nom',
    nameNotSet: 'Indéfini',
    nationality: 'Nationalité',
    language: 'Langue',
    celebrations: 'Célébrations',
    celebrationsActive: 'Célébrations actives',
    sounds: 'Des sons',
    sound: 'Son',
    volume: 'Volume',
    nameModalTitle: 'ton nom',
    nameModalDesc: 'C\'est le nom qui sera affiché dans l\'application. Cela n\'affecte pas votre compte ou votre connexion.',
    namePlaceholder: 'Ex : Yamil',
    nationalityUpdated: 'Nationalité mise à jour.',
    languageUpdated: 'Langue mise à jour.',
    personalTracker: 'tracker personnel',
    nameSaving: "Enregistrement...",
    nameUpdated: 'Nom mis à jour.',
    nameRemoved: 'Nom supprimé.'
  },
  nav: {
    mundialhito: 'MUNDIALHITO',
    activity: 'Activité',
    streaks: "Séries",
    archive: "Archiver",
    history: "Historique",
    streakHistory: "Hist. séries",
    logout: 'Se déconnecter'
  },
  activity: {
    title: 'Activité',
    subtitle: 'Plan récent et historique'
  },
  copas: {
    trophiesWon: 'Coupes gagnées',
    trophiesShort: 'Coupes'
  },
  stats: {
    sectionLabel: "Statistiques générales",
    played: 'Joués',
    won: 'Gagnés',
    lost: 'Perdus',
    drawn: 'Nuls'
  },
  phase: {
    name: {
      FG: 'Phase de groupe',
      E8: 'Huitièmes de finale',
      E4: 'Quarts de finale',
      SF: 'Demi-finale',
      FINAL: 'Grande Finale'
    },
    desc: {
      FG: 'Gagnez 2 des 3 matchs pour vous qualifier.',
      E8: "Match unique. Si vous perdez, vous recommencez.",
      E4: "Match unique. Si vous perdez, vous recommencez.",
      SF: "Match unique. Si vous perdez, vous recommencez.",
      FINAL: "La dernière bataille !"
    }
  },
  bracket: {
    final: "Finale",
    r16: "Huitièmes",
    qf: 'Quarts',
    sf: "Demi"
  },
  result: {
    sectionLabel: 'Enregistrer le résultat',
    win: 'Victoire',
    draw: 'Match nul',
    loss: 'Défaite',
    undo: 'Annuler le dernier match',
    resetTournament: 'Recommencer le tournoi',
    resetAll: 'Redémarrez tout',
    qualified: "Qualification pour les huitièmes ({{wins}}/3)",
    groupStageFailed: 'Phase de groupes : {{wins}}/3. A recommencer.',
    advancedTo: "Qualification : {{phase}}",
    eliminated: "Élimination : {{phase}}. Retour au début.",
    champion: 'CHAMPION! Coupe #{{n}} conquise.',
    noUndo: 'Il n\'y a aucun mouvement à annuler.',
    undoSuccess: 'Dernière partie annulée.',
    groupDrawPenalty: "≈ Nul (tirs au but) · P{{match}}/3",
    groupMatchWin: '✓ Victoire · P{{match}}/3',
    groupMatchLoss: '✗ Défaite · P{{match}}/3',
    resetTournamentConfirmTitle: 'Recommencer le tournoi',
    resetTournamentConfirmBody: 'Vous démarrez un nouveau tournoi. Vos statistiques et vos coupes sont préservées.',
    resetTournamentSuccess: 'Le tournoi a repris.',
    resetAllConfirmTitle: 'Redémarrez tout',
    resetAllConfirmBody: 'Réinitialisez vos statistiques, vos coupes et le tournoi en cours. Les séries, l\'historique et le plan de match sont préservés. Cette action ne peut pas être annulée.',
    resetAllSuccess: 'Les statistiques du tournoi sont réinitialisées.'
  },
  plan: {
    title: 'plan de 10 matchs',
    matchNumber: 'Terminés',
    renew: 'Renouveler',
    recentHistory: "Historique récent",
    emptyHistory: 'Aucun match enregistré pour l\'instant.',
    renewed: 'Plan renouvelé : 0 sur 10 terminés',
    nextMatch: 'Prochain match : {{number}}'
  },
  championModal: {
    title: 'Champion de MUNDIALHITO',
    continue: 'Continuer'
  },
  coinModal: {
    flip: 'Lancer la pièce',
    title: "Tirs au but",
    subtitleInitial: "Match nul. Choisissez pile ou face avant de lancer la pièce.",
    subtitleChosen: 'Vous avez choisi {{choice}}. Touchez la pièce.',
    heads: 'Face',
    tails: 'Pile',
    confirm: 'Confirmer le résultat',
    resultOut: '{{result}} est sorti — ',
    resultWin: 'Vous gagnez !',
    resultLoss: 'tu perds'
  },
  rachas: {
    title: "Séries",
    subtitle: "Records personnels",
    empty: 'Il n\'y a pas encore de matchs enregistrés.<br>Jouez votre premier match pour commencer à voir vos séries.',
    winStreak: 'Victoires consécutives',
    lossStreak: "Défaites consécutives",
    historicRecord: "Record historique",
    current: 'Actuel',
    fastestCup: "Coupe la plus rapide",
    longestCup: "Coupe la plus longue",
    currentCampaign: 'Campagne en cours',
    finals: 'Finales',
    played: 'Jouées',
    won: 'Gagné',
    lost: 'Perdues',
    resetButton: 'Redémarrer les séries',
    resetConfirmTitle: 'Redémarrer les séries',
    resetConfirmBody: 'Toutes les séries reviennent à zéro. L\'histoire et les statistiques sont préservées.',
    resetSuccess: 'Séries redémarrées. Nouveau cycle à partir de maintenant.',
    archiveType: "Séries",
    archiveDescription: 'Enregistrez l\'état actuel de vos séries.',
    archivePlaceholder: 'Ex : Étape 2025',
    archiveSaving: "Enregistrement...",
    archiveError: 'Erreur d\'enregistrement. Essayer à nouveau.',
    archiveSuccess: 'Étape "{{name}}" archivée.'
  },
  history: {
    title: "Historique",
    subtitle: 'Saisons archivées',
    archivedOn: 'Déposé le {{date}}',
    loading: 'Chargement...',
    loadError: 'Erreur de chargement de l\'historique.',
    empty: 'Il n\'y a pas encore de saisons archivées.<br>Utilisez l\'option Archiver pour enregistrer votre progression actuelle.',
    deleteTitle: 'Supprimer la saison',
    deleteConfirm: 'Êtes-vous sûr de vouloir le supprimer ? Cette action ne peut pas être annulée.',
    deleteError: "Erreur lors de la suppression.",
    deleteSuccess: "Saison supprimée."
  },
  streakHistory: {
    title: "Historique des séries",
    subtitle: 'Étapes archivées',
    wins: 'Victoires',
    losses: 'Défaites',
    fastestCup: "Coupe la plus rapide",
    longestCup: "Coupe la plus longue",
    finals: 'Finales',
    won: 'Gagné',
    lost: 'Perdues',
    archivedOn: 'Déposé le {{date}}',
    loading: 'Chargement...',
    loadError: 'Erreur de chargement.',
    empty: 'Il n\'y a pas encore d\'étapes archivées.<br>Utilisez "Archiver les séries" pour enregistrer l\'état actuel.',
    deleteTitle: 'Supprimer l\'étape',
    deleteConfirm: 'Êtes-vous sûr de vouloir le supprimer ? Cette action ne peut pas être annulée.',
    deleteError: "Erreur lors de la suppression.",
    deleteSuccess: 'Étape supprimée.'
  },
  archive: {
    title: "Archiver",
    seasonType: 'Saison',
    seasonDescription: 'Enregistrez les statistiques actuelles.',
    seasonPlaceholder: 'Ex : Saison 2026',
    saving: "Enregistrement...",
    saveError: 'Erreur d\'enregistrement. Essayer à nouveau.',
    seasonArchived: 'Saison "{{name}}" archivée.'
  }
});
