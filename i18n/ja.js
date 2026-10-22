// Diccionario ja. Base de claves: es.js; plantilla: template.js.
// Editar las traducciones aquí y verificar con npm test.

I18N.registrarIdioma('ja', {
  persistence: {
    saving: "保存中…",
    saved: "保存済み",
    error: "変更を保存できませんでした。このタブを閉じないでください。",
    sessionEnded: "未確認の変更を残してセッションが終了しました。再度ログインして、最新のデータを確認してください。",
    logoutError: "ログアウトできませんでした。もう一度お試しください。"
  },
  common: {
    save: '保存',
    cancel: 'キャンセル',
    delete: "削除",
    confirm: '確認する',
    menu: 'メニュー'
  },
  login: {
    loadError: "データを読み込めませんでした。もう一度お試しください。",
    retryLoad: "再試行",
    startupError: 'アプリを起動できませんでした。接続を確認して、もう一度お試しください。',
    subtitle: '個人トラッカー',
    emailPlaceholder: '電子メール',
    passwordPlaceholder: 'パスワード',
    signIn: "ログイン",
    separator: "または",
    createAccount: '新しいアカウントを作成する',
    continueWithGoogle: "Googleでログイン",
    fillCredentials: 'メールアドレスとパスワードを入力します。',
    signingIn: "ログイン中...",
    emailNotConfirmed: "ログインする前に確認メールで認証してください。",
    invalidCredentials: 'メールアドレスまたはパスワードが間違っています。',
    passwordMinLength: 'パスワードは 6 文字以上である必要があります。',
    creatingAccount: 'アカウントを作成しています...',
    signUpError: 'アカウントを作成できませんでした: {{message}}',
    accountCreated: 'アカウントが作成されました！メールをチェックして確認してください。',
    connectingGoogle: '接続中...',
    googleError: 'Google への接続エラー。'
  },
  country: {
    AR: 'アルゼンチン',
    BR: 'ブラジル',
    CL: 'チリ',
    UY: 'ウルグアイ',
    US: 'アメリカ合衆国',
    MX: 'メキシコ',
    ES: 'スペイン',
    FR: 'フランス',
    IT: 'イタリア',
    DE: 'ドイツ',
    GB: 'イギリス',
    JP: '日本',
    KR: '韓国',
    CN: '中国',
    CT: 'カタルーニャ'
  },
  config: {
    title: "設定",
    subtitle: 'アカウントの設定',
    profile: 'プロフィール',
    name: '名前',
    nameNotSet: '未設定',
    nationality: '国籍',
    language: '言語',
    celebrations: 'お祝い',
    celebrationsActive: "お祝い演出を有効にする",
    sounds: '音',
    sound: '音',
    volume: '音量',
    nameModalTitle: 'あなたの名前',
    nameModalDesc: 'アプリケーションに表示される名前です。アカウントやログインには影響しません。',
    namePlaceholder: '例：ヤミル',
    nationalityUpdated: '国籍を更新しました。',
    languageUpdated: '言語を更新しました。',
    personalTracker: '個人トラッカー',
    nameSaving: '保存中...',
    nameUpdated: '名前が更新されました。',
    nameRemoved: '名前は削除されました。'
  },
  nav: {
    mundialhito: 'MUNDIALHITO',
    activity: '活動',
    streaks: "連続記録",
    archive: "アーカイブ",
    history: '記録',
    streakHistory: "連続記録履歴",
    logout: 'ログアウト'
  },
  activity: {
    title: '活動',
    subtitle: '最近の計画と経緯'
  },
  copas: {
    trophiesWon: '優勝カップ数',
    trophiesShort: 'カップ'
  },
  stats: {
    played: '試合数',
    won: '勝',
    lost: '敗',
    drawn: '引き分け'
  },
  phase: {
    name: {
      FG: 'グループフェーズ',
      E8: 'ラウンド 16',
      E4: '準々決勝',
      SF: '準決勝',
      FINAL: "決勝"
    },
    desc: {
      FG: '3試合中2試合に勝てば出場権が得られます。',
      E8: "一発勝負。負けたら最初からやり直しです。",
      E4: "一発勝負。負けたら最初からやり直しです。",
      SF: "一発勝負。負けたら最初からやり直しです。",
      FINAL: "最後の戦い！"
    }
  },
  bracket: {
    final: "決勝",
    r16: "ベスト16",
    qf: '準々決勝',
    sf: "準決勝"
  },
  result: {
    sectionLabel: '記録結果',
    win: '勝ち',
    draw: '引き分け',
    loss: '負け',
    undo: "最後の試合を取り消す",
    resetTournament: 'トーナメントをリセット',
    resetAll: 'すべてを再起動します',
    qualified: "ベスト16進出 ({{wins}}/3)",
    groupStageFailed: 'グループステージ: {{wins}}/3。もう一度始めるために。',
    advancedTo: '{{phase}} に移動しました',
    eliminated: "{{phase}}で敗退。最初に戻ります。",
    champion: 'チャンピオン！カップ #{{n}} を制覇しました。',
    noUndo: '元に戻す動作はありません。',
    undoSuccess: '最後のゲームが取り消されました。',
    groupDrawPenalty: "≈ 引き分け (PK戦) · P{{match}}/3",
    groupMatchWin: '✓ 勝利 · P{{match}}/3',
    groupMatchLoss: '✗ 敗北 · P{{match}}/3',
    resetTournamentConfirmTitle: 'トーナメントをリセット',
    resetTournamentConfirmBody: '新しいトーナメントを開始します。あなたの統計とカップは保存されます。',
    resetTournamentSuccess: 'トーナメントをリセットしました。',
    resetAllConfirmTitle: 'すべてを再起動します',
    resetAllConfirmBody: '統計、カップ、現在のトーナメントをリセットします。記録、履歴、試合計画は保存されます。この操作は元に戻すことができません。',
    resetAllSuccess: 'トーナメント統計がリセットされました。'
  },
  plan: {
    title: '10マッチプラン',
    matchNumber: '完了',
    renew: '更新する',
    recentHistory: '最近の履歴',
    emptyHistory: '試合はまだ登録されていません。',
    renewed: 'プラン更新：10試合中0試合完了',
    nextMatch: '次の試合：{{number}}'
  },
  championModal: {
    title: 'MUNDIALHITO チャンピオン',
    continue: "続ける"
  },
  coinModal: {
    flip: 'コインを投げる',
    title: "PK戦",
    subtitleInitial: "引き分け。コインを投げる前に表か裏を選んでください。",
    subtitleChosen: '{{choice}} を選択しました。コインに触れます。',
    heads: '表',
    tails: '裏',
    confirm: '結果の確認',
    resultOut: '{{result}} が出てきました — ',
    resultWin: '勝ち！',
    resultLoss: 'あなたは負けます'
  },
  rachas: {
    title: "連続記録",
    subtitle: '個人記録',
    empty: 'まだ登録されている試合はありません。<br>最初の試合をプレイして、連続記録を確認してください。',
    winStreak: '連勝',
    lossStreak: '連敗',
    historicRecord: '歴史的記録',
    current: '現在',
    fastestCup: "最短優勝",
    longestCup: "最長優勝",
    currentCampaign: '現在の挑戦',
    finals: '決勝戦',
    played: '試合数',
    won: '勝利',
    lost: '敗戦',
    resetButton: '連続記録をリセット',
    resetConfirmTitle: '連続記録をリセット',
    resetConfirmBody: 'すべての連続記録がゼロに戻ります。履歴と統計は保存されます。',
    resetSuccess: '連続記録をリセットしました。新しい期間が始まります。',
    archiveType: "連続記録",
    archiveDescription: '連続記録の現在のステータスを保存します。',
    archivePlaceholder: '例：ステージ2025',
    archiveSaving: '保存中...',
    archiveError: '保存中にエラーが発生しました。もう一度やり直してください。',
    archiveSuccess: 'ステージ「{{name}}」をアーカイブしました。'
  },
  history: {
    title: '記録',
    subtitle: 'アーカイブされたシーズン',
    archivedOn: "{{date}} にアーカイブ",
    loading: "読み込み中...",
    loadError: '履歴の読み込み中にエラーが発生しました。',
    empty: 'まだアーカイブされたシーズンはありません。<br>現在の進行状況を保存するには、アーカイブ オプションを使用してください。',
    deleteTitle: 'シーズンを削除する',
    deleteConfirm: '削除してもよろしいですか?この操作は元に戻すことができません。',
    deleteError: '削除エラー。',
    deleteSuccess: "シーズンを削除しました。"
  },
  streakHistory: {
    title: "連続記録の履歴",
    subtitle: 'アーカイブされたステージ',
    wins: '勝利',
    losses: '敗北',
    fastestCup: "最短優勝",
    longestCup: "最長優勝",
    finals: '決勝戦',
    won: '勝利',
    lost: '敗戦',
    archivedOn: "{{date}} にアーカイブ",
    loading: "読み込み中...",
    loadError: '読み込みエラー。',
    empty: 'まだアーカイブされたステージはありません。<br>現在のステータスを保存するには、「連続記録のアーカイブ」を使用してください。',
    deleteTitle: 'ステージの削除',
    deleteConfirm: '削除してもよろしいですか?この操作は元に戻すことができません。',
    deleteError: '削除エラー。',
    deleteSuccess: "ステージを削除しました。"
  },
  archive: {
    title: "アーカイブ",
    seasonType: "シーズン",
    seasonDescription: '現在の統計を保存します。',
    seasonPlaceholder: '例: シーズン 2026',
    saving: '保存中...',
    saveError: '保存中にエラーが発生しました。もう一度やり直してください。',
    seasonArchived: 'シーズン「{{name}}」がアーカイブされました。'
  }
});
