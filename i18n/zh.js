// Diccionario zh. Base de claves: es.js; plantilla: template.js.
// Editar las traducciones aquí y verificar con npm test.

I18N.registrarIdioma('zh', {
  persistence: {
    saving: "正在保存…",
    saved: "已保存",
    error: "更改未保存。请勿关闭此标签页。",
    sessionEnded: "会话结束时仍有未确认的更改。请重新登录并检查最新数据。",
    logoutError: "无法退出登录。请重试。"
  },
  common: {
    save: '保存',
    cancel: '取消',
    delete: '删除',
    confirm: '确认',
    menu: '菜单'
  },
  login: {
    loadError: "无法加载您的数据。请重试以继续。",
    retryLoad: "重试",
    startupError: '无法启动应用。请检查网络连接后重试。',
    subtitle: '个人追踪器',
    emailPlaceholder: '电子邮件',
    passwordPlaceholder: '密码',
    signIn: "登录",
    separator: "或",
    createAccount: '创建新帐户',
    continueWithGoogle: '继续使用谷歌',
    fillCredentials: '填写电子邮件和密码。',
    signingIn: "登录中...",
    emailNotConfirmed: '进入前确认您的电子邮件。',
    invalidCredentials: '电子邮件或密码不正确。',
    passwordMinLength: '密码必须至少包含 6 个字符。',
    creatingAccount: '正在创建帐户...',
    signUpError: '无法创建帐户：{{message}}',
    accountCreated: '帐户已创建！检查您的电子邮件以确认。',
    connectingGoogle: '正在连接...',
    googleError: '连接到 Google 时出错。'
  },
  country: {
    AR: '阿根廷',
    BR: '巴西',
    CL: '智利',
    UY: '乌拉圭',
    US: '美国',
    MX: '墨西哥',
    ES: '西班牙',
    FR: '法国',
    IT: '意大利',
    DE: '德国',
    GB: '英国',
    JP: '日本',
    KR: '韩国',
    CN: '中国',
    CT: '加泰罗尼亚'
  },
  config: {
    title: "设置",
    subtitle: '您的帐户偏好设置',
    profile: "个人资料",
    name: '姓名',
    nameNotSet: "未设置",
    nationality: '国籍',
    language: '语言',
    celebrations: '庆祝活动',
    celebrationsActive: "启用庆祝效果",
    sounds: '声音',
    sound: '声音',
    volume: "音量",
    nameModalTitle: '你的名字',
    nameModalDesc: '这是将在应用程序中显示的名称。它不会影响您的帐户或登录。',
    namePlaceholder: '例如：亚米尔',
    nationalityUpdated: '更新国籍。',
    languageUpdated: '更新了语言。',
    personalTracker: '个人追踪器',
    nameSaving: '保存...',
    nameUpdated: '名称已更新。',
    nameRemoved: '名字被删除了。'
  },
  nav: {
    mundialhito: 'MUNDIALHITO',
    activity: '活动',
    streaks: "连续纪录",
    archive: "存档",
    history: '记录',
    streakHistory: "连续纪录历史",
    logout: '退出登录'
  },
  activity: {
    title: '活动',
    subtitle: '最近的计划和历史'
  },
  copas: {
    trophiesWon: '赢得的奖杯',
    trophiesShort: "奖杯"
  },
  stats: {
    sectionLabel: "总体统计",
    played: '场次',
    won: '胜',
    lost: '负',
    drawn: '平'
  },
  phase: {
    name: {
      FG: '小组阶段',
      E8: '16强',
      E4: '四分之一决赛',
      SF: '半决赛',
      FINAL: "决赛"
    },
    desc: {
      FG: '赢得 3 场比赛中的 2 场即可晋级。',
      E8: "单场决胜。输了就重新开始。",
      E4: "单场决胜。输了就重新开始。",
      SF: "单场决胜。输了就重新开始。",
      FINAL: "最后一战！"
    }
  },
  bracket: {
    final: "决赛",
    r16: "16强",
    qf: '四分之一决赛',
    sf: "半决赛"
  },
  result: {
    sectionLabel: '记录结果',
    win: '胜',
    draw: '平',
    loss: '负',
    undo: '撤消上一场比赛',
    resetTournament: '重新开始比赛',
    resetAll: '重新启动一切',
    qualified: "晋级16强 ({{wins}}/3)",
    groupStageFailed: '小组赛：{{wins}}/3。重新开始。',
    advancedTo: '您已移至 {{phase}}',
    eliminated: "在{{phase}}中被淘汰。重新开始。",
    champion: '冠军！杯#{{n}} 被征服。',
    noUndo: '没有任何动作可以撤消。',
    undoSuccess: '上一场比赛已取消。',
    groupDrawPenalty: "≈ 平局（点球） · P{{match}}/3",
    groupMatchWin: '✓ 胜利 · P{{match}}/3',
    groupMatchLoss: "✗ 失利 · P{{match}}/3",
    resetTournamentConfirmTitle: '重新开始比赛',
    resetTournamentConfirmBody: '您开始一场新的锦标赛。您的统计数据和奖杯将被保留。',
    resetTournamentSuccess: '比赛重新开始。',
    resetAllConfirmTitle: '重新启动一切',
    resetAllConfirmBody: '重置您的统计数据、杯赛和当前锦标赛。连续纪录、历史记录和比赛计划都会被保留。此操作无法撤消。',
    resetAllSuccess: '锦标赛统计数据重置。'
  },
  plan: {
    title: '10 比赛计划',
    matchNumber: '已完成',
    renew: '更新',
    recentHistory: '最近的历史',
    emptyHistory: '尚未注册任何比赛。',
    renewed: '计划已更新：已完成 0/10 场',
    nextMatch: '下一场：{{number}}'
  },
  championModal: {
    title: 'MUNDIALHITO 冠军',
    continue: '继续'
  },
  coinModal: {
    flip: '抛硬币',
    title: "点球大战",
    subtitleInitial: "平局。抛硬币前请选择正面或反面。",
    subtitleChosen: '您选择了{{choice}}。触摸硬币。',
    heads: '正面',
    tails: '反面',
    confirm: '确认结果',
    resultOut: '{{result}}出来了—— ',
    resultWin: '你赢了！',
    resultLoss: '你输了'
  },
  rachas: {
    title: "连续纪录",
    subtitle: '个人记录',
    empty: '尚未注册任何比赛。<br>参加您的第一场比赛即可开始查看您的连续纪录。',
    winStreak: '连胜',
    lossStreak: "连败",
    historicRecord: '历史记录',
    current: '当前的',
    fastestCup: "最快夺冠",
    longestCup: "最慢夺冠",
    currentCampaign: "本轮征程",
    finals: '决赛',
    played: '已赛',
    won: '胜',
    lost: '负',
    resetButton: '重置连续纪录',
    resetConfirmTitle: '重置连续纪录',
    resetConfirmBody: '所有连续纪录都归零。历史和统计数据被保留。',
    resetSuccess: '连续纪录已重置。新的周期从现在开始。',
    archiveType: "连续纪录",
    archiveDescription: '保存您的连续纪录的当前状态。',
    archivePlaceholder: '例如：2025 年阶段',
    archiveSaving: '保存...',
    archiveError: '保存时出错。再试一次。',
    archiveSuccess: '阶段“{{name}}”已存档。'
  },
  history: {
    title: '记录',
    subtitle: "已存档赛季",
    archivedOn: "存档于 {{date}}",
    loading: "加载中...",
    loadError: '加载历史记录时出错。',
    empty: "尚无存档赛季。<br>使用“存档”保存当前进度。",
    deleteTitle: "删除赛季",
    deleteConfirm: '您确定要删除它吗？此操作无法撤消。',
    deleteError: '删除错误。',
    deleteSuccess: "赛季已删除。"
  },
  streakHistory: {
    title: "连续纪录历史",
    subtitle: '存档阶段',
    wins: '胜利',
    losses: '失败',
    fastestCup: "最快夺冠",
    longestCup: "最慢夺冠",
    finals: '决赛',
    won: '胜',
    lost: '负',
    archivedOn: "存档于 {{date}}",
    loading: "加载中...",
    loadError: '加载时出错。',
    empty: '尚未存档任何阶段。<br>使用“存档连续纪录”保存当前状态。',
    deleteTitle: '删除阶段',
    deleteConfirm: '您确定要删除它吗？此操作无法撤消。',
    deleteError: '删除错误。',
    deleteSuccess: "阶段已删除。"
  },
  archive: {
    title: "存档",
    seasonType: "赛季",
    seasonDescription: '保存当前统计数据。',
    seasonPlaceholder: '例如：2026 年赛季',
    saving: '保存...',
    saveError: '保存时出错。再试一次。',
    seasonArchived: '赛季“{{name}}”已存档。'
  }
});
