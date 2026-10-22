// Diccionario ko. Base de claves: es.js; plantilla: template.js.
// Editar las traducciones aquí y verificar con npm test.

I18N.registrarIdioma('ko', {
  persistence: {
    saving: "저장 중…",
    saved: "저장됨",
    error: "변경 사항을 저장하지 못했습니다. 이 탭을 닫지 마세요.",
    sessionEnded: "확인되지 않은 변경 사항이 있는 상태로 세션이 종료되었습니다. 다시 로그인하여 최신 데이터를 확인하세요.",
    logoutError: "로그아웃하지 못했습니다. 다시 시도하세요."
  },
  common: {
    save: '저장',
    cancel: '취소',
    delete: "삭제",
    confirm: '확인하다',
    menu: '메뉴'
  },
  login: {
    loadError: "데이터를 불러오지 못했습니다. 계속하려면 다시 시도하세요.",
    retryLoad: "다시 시도",
    startupError: '앱을 시작할 수 없습니다. 연결을 확인하고 다시 시도하세요.',
    subtitle: '개인 추적기',
    emailPlaceholder: '이메일',
    passwordPlaceholder: '비밀번호',
    signIn: "로그인",
    separator: "또는",
    createAccount: '새 계정 만들기',
    continueWithGoogle: 'Google로 계속하기',
    fillCredentials: '이메일과 비밀번호를 입력하세요.',
    signingIn: "로그인 중...",
    emailNotConfirmed: '입장하기 전에 이메일을 확인하세요.',
    invalidCredentials: '이메일이나 비밀번호가 잘못되었습니다.',
    passwordMinLength: '비밀번호는 6자 이상이어야 합니다.',
    creatingAccount: '계정을 만드는 중...',
    signUpError: '계정을 생성할 수 없습니다: {{message}}',
    accountCreated: '계정이 생성되었습니다! 이메일을 확인하여 확인하세요.',
    connectingGoogle: '연결 중...',
    googleError: 'Google에 연결하는 중에 오류가 발생했습니다.'
  },
  country: {
    AR: '아르헨티나',
    BR: '브라질',
    CL: "칠레",
    UY: '우루과이',
    US: '미국',
    MX: '멕시코',
    ES: '스페인',
    FR: '프랑스',
    IT: '이탈리아',
    DE: '독일',
    GB: '영국',
    JP: '일본',
    KR: '대한민국',
    CN: '중국',
    CT: '카탈루냐'
  },
  config: {
    title: "설정",
    subtitle: '귀하의 계정 환경설정',
    profile: "프로필",
    name: '이름',
    nameNotSet: "미설정",
    nationality: '국적',
    language: '언어',
    celebrations: '축하',
    celebrationsActive: "축하 효과 활성화",
    sounds: '소리',
    sound: '소리',
    volume: "음량",
    nameModalTitle: '당신의 이름',
    nameModalDesc: '애플리케이션에 표시될 이름입니다. 귀하의 계정이나 로그인에는 영향을 미치지 않습니다.',
    namePlaceholder: '예: 야밀',
    nationalityUpdated: '국적이 업데이트되었습니다.',
    languageUpdated: '언어가 업데이트되었습니다.',
    personalTracker: '개인 추적기',
    nameSaving: "저장 중...",
    nameUpdated: '이름이 업데이트되었습니다.',
    nameRemoved: '이름이 삭제되었습니다.'
  },
  nav: {
    mundialhito: 'MUNDIALHITO',
    activity: '활동',
    streaks: "연속 기록",
    archive: "보관",
    history: '기록',
    streakHistory: "연속 기록 내역",
    logout: '로그아웃'
  },
  activity: {
    title: '활동',
    subtitle: '최근 계획 및 내역'
  },
  copas: {
    trophiesWon: '컵 우승',
    trophiesShort: "우승컵"
  },
  stats: {
    sectionLabel: "전체 통계",
    played: '경기',
    won: '승',
    lost: '패',
    drawn: '무'
  },
  phase: {
    name: {
      FG: '그룹 단계',
      E8: '16강',
      E4: '준준결승',
      SF: '준결승',
      FINAL: "결승"
    },
    desc: {
      FG: '3경기 중 2승을 하면 자격을 얻습니다.',
      E8: "단판 승부. 패배하면 처음부터 다시 시작합니다.",
      E4: "단판 승부. 패배하면 처음부터 다시 시작합니다.",
      SF: "단판 승부. 패배하면 처음부터 다시 시작합니다.",
      FINAL: "마지막 승부!"
    }
  },
  bracket: {
    final: "결승",
    r16: "16강",
    qf: '8강',
    sf: "4강"
  },
  result: {
    sectionLabel: '기록 결과',
    win: '승리',
    draw: '무승부',
    loss: '패배',
    undo: '마지막 경기 취소',
    resetTournament: '토너먼트 다시 시작',
    resetAll: '모든 것을 다시 시작하세요',
    qualified: "16강 진출 ({{wins}}/3)",
    groupStageFailed: '그룹 스테이지: {{wins}}/3. 다시 시작하려면.',
    advancedTo: '{{phase}}(으)로 이동했습니다.',
    eliminated: "{{phase}}에서 탈락. 처음으로 돌아갑니다.",
    champion: '챔피언! 컵 #{{n}}을(를) 정복했습니다.',
    noUndo: '실행 취소할 동작이 없습니다.',
    undoSuccess: '마지막 게임이 취소되었습니다.',
    groupDrawPenalty: "≈ 무승부 (승부차기) · P{{match}}/3",
    groupMatchWin: '✓ 승리 · P{{match}}/3',
    groupMatchLoss: '✗ 패배 · P{{match}}/3',
    resetTournamentConfirmTitle: '토너먼트 다시 시작',
    resetTournamentConfirmBody: '새로운 토너먼트를 시작합니다. 귀하의 통계와 컵은 보존됩니다.',
    resetTournamentSuccess: '토너먼트가 다시 시작되었습니다.',
    resetAllConfirmTitle: '모든 것을 다시 시작하세요',
    resetAllConfirmBody: '통계, 컵, 현재 토너먼트를 재설정하세요. 연속 기록, 기록 및 경기 계획이 보존됩니다. 이 작업은 취소할 수 없습니다.',
    resetAllSuccess: '토너먼트 통계가 재설정되었습니다.'
  },
  plan: {
    title: '10경기 계획',
    matchNumber: '완료',
    renew: "갱신",
    recentHistory: "최근 기록",
    emptyHistory: "아직 등록된 경기가 없습니다.",
    renewed: '플랜 갱신: 10경기 중 0경기 완료',
    nextMatch: '다음 경기: {{number}}'
  },
  championModal: {
    title: 'MUNDIALHITO 챔피언',
    continue: '계속하다'
  },
  coinModal: {
    flip: '동전 던지기',
    title: "승부차기",
    subtitleInitial: "무승부. 동전을 던지기 전에 앞면이나 뒷면을 선택하세요.",
    subtitleChosen: '{{choice}}을 선택하셨습니다. 동전을 터치하세요.',
    heads: '앞면',
    tails: '뒷면',
    confirm: '결과 확인',
    resultOut: '{{result}}이 나왔습니다 — ',
    resultWin: '승리!',
    resultLoss: "패배"
  },
  rachas: {
    title: "연속 기록",
    subtitle: '개인 기록',
    empty: '아직 등록된 경기가 없습니다.<br>첫 번째 경기를 플레이하여 연속 기록을 확인하세요.',
    winStreak: '연속 승리',
    lossStreak: "연속 패배",
    historicRecord: '역사적 기록',
    current: '현재의',
    fastestCup: "최단 우승",
    longestCup: "최장 우승",
    currentCampaign: '현재 도전',
    finals: '결승',
    played: '경기',
    won: '승리',
    lost: '패배',
    resetButton: '연속 기록 다시 시작',
    resetConfirmTitle: '연속 기록 다시 시작',
    resetConfirmBody: '모든 연속 기록이 0으로 돌아갑니다. 경기 내역과 통계는 보존됩니다.',
    resetSuccess: '연속 기록를 다시 시작했습니다. 이제부터 새로운 사이클.',
    archiveType: "연속 기록",
    archiveDescription: '현재 연속 기록 상태를 저장하세요.',
    archivePlaceholder: '예: 2025년 단계',
    archiveSaving: "저장 중...",
    archiveError: '저장하는 중에 오류가 발생했습니다. 다시 시도해 보세요.',
    archiveSuccess: '\'{{name}}\' 단계가 보관되었습니다.'
  },
  history: {
    title: '기록',
    subtitle: '보관된 시즌',
    archivedOn: "{{date}}에 보관됨",
    loading: "불러오는 중...",
    loadError: '기록을 로드하는 중에 오류가 발생했습니다.',
    empty: '아직 보관된 시즌이 없습니다.<br>현재 진행 상황을 저장하려면 보관 옵션을 사용하세요.',
    deleteTitle: '시즌 삭제',
    deleteConfirm: '삭제하시겠습니까? 이 작업은 취소할 수 없습니다.',
    deleteError: '삭제 오류입니다.',
    deleteSuccess: '시즌을 없앴습니다.'
  },
  streakHistory: {
    title: "연속 기록 내역",
    subtitle: '보관된 단계',
    wins: '승리',
    losses: '패배',
    fastestCup: "최단 우승",
    longestCup: "최장 우승",
    finals: '결승',
    won: '승리',
    lost: '패배',
    archivedOn: "{{date}}에 보관됨",
    loading: "불러오는 중...",
    loadError: '로드 중 오류가 발생했습니다.',
    empty: '아직 보관된 스테이지가 없습니다.<br>현재 상태를 저장하려면 "연속 보관"을 사용하세요.',
    deleteTitle: '단계 삭제',
    deleteConfirm: '삭제하시겠습니까? 이 작업은 취소할 수 없습니다.',
    deleteError: '삭제 오류입니다.',
    deleteSuccess: '스테이지가 제거되었습니다.'
  },
  archive: {
    title: "보관",
    seasonType: "시즌",
    seasonDescription: '현재 통계를 저장합니다.',
    seasonPlaceholder: '예: 2026년 시즌',
    saving: "저장 중...",
    saveError: '저장하는 중에 오류가 발생했습니다. 다시 시도해 보세요.',
    seasonArchived: '\'{{name}}\' 시즌이 보관되었습니다.'
  }
});
