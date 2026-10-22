// Diccionario pt. Base de claves: es.js; plantilla: template.js.
// Editar las traducciones aquí y verificar con npm test.

I18N.registrarIdioma('pt', {
  persistence: {
    saving: "Salvando…",
    saved: "Salvo",
    error: "As alterações não foram salvas. Não feche esta aba.",
    sessionEnded: "A sessão terminou com alterações não confirmadas. Entre novamente e confira seus últimos dados.",
    logoutError: "Não foi possível sair. Tente novamente."
  },
  common: {
    save: 'Salvar',
    cancel: 'Cancelar',
    delete: 'Eliminar',
    confirm: 'Confirmar',
    menu: 'Menu'
  },
  login: {
    loadError: "Não foi possível carregar seus dados. Tente novamente para continuar.",
    retryLoad: "Tentar novamente",
    startupError: 'Não foi possível iniciar o aplicativo. Verifique sua conexão e tente novamente.',
    subtitle: 'rastreador pessoal',
    emailPlaceholder: 'E-mail',
    passwordPlaceholder: 'Senha',
    signIn: 'Entre',
    separator: 'ou',
    createAccount: 'Criar nova conta',
    continueWithGoogle: 'Continuar com o Google',
    fillCredentials: "Preencha o e-mail e a senha.",
    signingIn: 'Entrando...',
    emailNotConfirmed: 'Confirme seu e-mail antes de entrar.',
    invalidCredentials: 'E-mail ou senha incorretos.',
    passwordMinLength: 'A senha deve ter pelo menos 6 caracteres.',
    creatingAccount: 'Criando conta...',
    signUpError: 'Não foi possível criar a conta: {{message}}',
    accountCreated: 'Conta criada! Verifique seu e-mail para confirmar.',
    connectingGoogle: 'Conectando...',
    googleError: 'Erro ao conectar-se ao Google.'
  },
  country: {
    AR: 'Argentina',
    BR: 'Brasil',
    CL: 'Chile',
    UY: 'Uruguai',
    US: 'EUA',
    MX: 'México',
    ES: 'Espanha',
    FR: 'França',
    IT: 'Itália',
    DE: 'Alemanha',
    GB: 'Reino Unido',
    JP: 'Japão',
    KR: 'Coréia do Sul',
    CN: 'China',
    CT: 'Catalunha'
  },
  config: {
    title: 'Configuração',
    subtitle: 'Suas preferências de conta',
    profile: 'Perfil',
    name: 'Nome',
    nameNotSet: 'Indefinido',
    nationality: 'Nacionalidade',
    language: 'Linguagem',
    celebrations: 'Celebrações',
    celebrationsActive: 'Celebrações ativas',
    sounds: 'Sons',
    sound: 'Som',
    volume: 'Volume',
    nameModalTitle: 'seu nome',
    nameModalDesc: 'É o nome que será exibido no aplicativo. Isso não afeta sua conta ou login.',
    namePlaceholder: 'Ex: Yamil',
    nationalityUpdated: 'Nacionalidade atualizada.',
    languageUpdated: 'Idioma atualizado.',
    personalTracker: 'rastreador pessoal',
    nameSaving: 'Salvando...',
    nameUpdated: 'Nome atualizado.',
    nameRemoved: 'Nome removido.'
  },
  nav: {
    mundialhito: 'MUNDIALHITO',
    activity: 'Atividade',
    streaks: "Sequências",
    archive: "Arquivar",
    history: 'Registro',
    streakHistory: "Hist. sequências",
    logout: 'Sair'
  },
  activity: {
    title: 'Atividade',
    subtitle: "Plano e histórico recentes"
  },
  copas: {
    trophiesWon: 'Taças vencidas',
    trophiesShort: "Taças"
  },
  stats: {
    sectionLabel: "Estatísticas gerais",
    played: 'Jogos',
    won: 'Vitórias',
    lost: 'Derrotas',
    drawn: 'Empates'
  },
  phase: {
    name: {
      FG: 'Fase de Grupo',
      E8: "Oitavas de final",
      E4: 'Quartas de final',
      SF: 'Semifinal',
      FINAL: 'Grande Final'
    },
    desc: {
      FG: 'Ganhe 2 dos 3 jogos para se qualificar.',
      E8: "Jogo único. Se perder, você recomeça.",
      E4: "Jogo único. Se perder, você recomeça.",
      SF: "Jogo único. Se perder, você recomeça.",
      FINAL: "A última batalha!"
    }
  },
  bracket: {
    final: "Final",
    r16: "Oitavas",
    qf: "Quartas",
    sf: 'Semi'
  },
  result: {
    sectionLabel: 'Registrar resultado',
    win: 'Vitória',
    draw: 'Empate',
    loss: 'Derrota',
    undo: 'Desfazer última partida',
    resetTournament: 'Reiniciar torneio',
    resetAll: 'Reinicie tudo',
    qualified: "Você se classificou para as oitavas ({{wins}}/3)",
    groupStageFailed: 'Fase de grupos: {{wins}}/3. Para começar de novo.',
    advancedTo: "Você avançou para {{phase}}",
    eliminated: "Eliminado em {{phase}}. De volta ao início.",
    champion: 'CAMPEÃO! Taça #{{n}} conquistada.',
    noUndo: 'Não há movimento para desfazer.',
    undoSuccess: 'Último jogo desfeito.',
    groupDrawPenalty: '≈ Empate (pênaltis) · P{{match}}/3',
    groupMatchWin: '✓ Vitória · P{{match}}/3',
    groupMatchLoss: '✗ Derrota · P{{match}}/3',
    resetTournamentConfirmTitle: 'Reiniciar torneio',
    resetTournamentConfirmBody: 'Você inicia um novo torneio. Suas estatísticas e copas são preservadas.',
    resetTournamentSuccess: 'Torneio reiniciado.',
    resetAllConfirmTitle: 'Reinicie tudo',
    resetAllConfirmBody: 'Redefina suas estatísticas, copas e o torneio atual. Sequências, histórico e plano de jogo são preservados. Esta ação não pode ser desfeita.',
    resetAllSuccess: 'Estatísticas do torneio redefinidas.'
  },
  plan: {
    title: 'Plano de 10 jogos',
    matchNumber: 'Concluídos',
    renew: 'Renovar',
    recentHistory: "Histórico recente",
    emptyHistory: 'Nenhuma partida registrada ainda.',
    renewed: 'Plano renovado: 0 de 10 concluídos',
    nextMatch: 'Próxima partida: {{number}}'
  },
  championModal: {
    title: 'Campeão do MUNDIALHITO',
    continue: 'Continuar'
  },
  coinModal: {
    flip: 'Lançar moeda',
    title: "Disputa de pênaltis",
    subtitleInitial: "Empate. Escolha cara ou coroa antes de lançar a moeda.",
    subtitleChosen: 'Você escolheu {{choice}}. Toque na moeda.',
    heads: "Cara",
    tails: 'Coroa',
    confirm: 'Confirmar resultado',
    resultOut: '{{result}} saiu - ',
    resultWin: 'Você ganhou!',
    resultLoss: 'você perde'
  },
  rachas: {
    title: "Sequências",
    subtitle: 'Registros pessoais',
    empty: 'Ainda não há partidas registradas.<br>Jogue sua primeira partida para começar a ver suas sequências.',
    winStreak: 'Vitórias consecutivas',
    lossStreak: "Derrotas consecutivas",
    historicRecord: 'Registro histórico',
    current: 'Atual',
    fastestCup: "Taça mais rápida",
    longestCup: "Taça mais demorada",
    currentCampaign: 'Campanha atual',
    finals: 'Finais',
    played: 'Jogadas',
    won: 'Vencidas',
    lost: 'Perdidas',
    resetButton: 'Reiniciar sequências',
    resetConfirmTitle: 'Reiniciar sequências',
    resetConfirmBody: 'Todas as sequências voltam a zero. O histórico e as estatísticas são preservadas.',
    resetSuccess: 'Sequências reiniciadas. Novo ciclo a partir de agora.',
    archiveType: "Sequências",
    archiveDescription: 'Salve o status atual de suas sequências.',
    archivePlaceholder: 'Ex: Etapa 2025',
    archiveSaving: 'Salvando...',
    archiveError: 'Erro ao salvar. Tente novamente.',
    archiveSuccess: 'Estágio "{{name}}" arquivado.'
  },
  history: {
    title: 'Registro',
    subtitle: 'Temporadas arquivadas',
    archivedOn: 'Arquivado em {{date}}',
    loading: 'Carregando...',
    loadError: 'Erro ao carregar o histórico.',
    empty: 'Ainda não há temporadas arquivadas.<br>Use a opção Arquivar para salvar seu progresso atual.',
    deleteTitle: 'Excluir temporada',
    deleteConfirm: 'Tem certeza de que deseja excluí-lo? Esta ação não pode ser desfeita.',
    deleteError: "Erro ao excluir.",
    deleteSuccess: 'Temporada eliminada.'
  },
  streakHistory: {
    title: "Histórico de sequências",
    subtitle: 'Etapas arquivadas',
    wins: 'Vitórias',
    losses: 'Derrotas',
    fastestCup: "Taça mais rápida",
    longestCup: "Taça mais demorada",
    finals: 'Finais',
    won: 'Vencidas',
    lost: 'Perdidas',
    archivedOn: 'Arquivado em {{date}}',
    loading: 'Carregando...',
    loadError: 'Erro ao carregar.',
    empty: 'Ainda não há etapas arquivadas.<br>Use "Arquivar sequências" para salvar o status atual.',
    deleteTitle: 'Excluir estágio',
    deleteConfirm: 'Tem certeza de que deseja excluí-lo? Esta ação não pode ser desfeita.',
    deleteError: "Erro ao excluir.",
    deleteSuccess: 'Etapa eliminada.'
  },
  archive: {
    title: "Arquivar",
    seasonType: 'Temporada',
    seasonDescription: 'Salve as estatísticas atuais.',
    seasonPlaceholder: 'Ex: Temporada 2026',
    saving: 'Salvando...',
    saveError: 'Erro ao salvar. Tente novamente.',
    seasonArchived: 'Temporada "{{name}}" arquivada.'
  }
});
