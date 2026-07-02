export const LANGUAGE_STORAGE_KEY = 'font-inspector-language';

export const LANGUAGE_OPTIONS = [
  { code: 'zh-CN', flag: '🇨🇳', label: '简体中文' },
  { code: 'zh-TW', flag: '🇹🇼', label: '繁體中文' },
  { code: 'en', flag: '🇺🇸', label: 'English' },
  { code: 'ko', flag: '🇰🇷', label: '한국어' },
  { code: 'ja', flag: '🇯🇵', label: '日本語' },
  { code: 'es', flag: '🇪🇸', label: 'Español' },
] as const;

export type LanguageCode = typeof LANGUAGE_OPTIONS[number]['code'];

type Translation = {
  seoTitle: string;
  seoDescription: string;
  languageLabel: string;
  tagline: string;
  scanner: string;
  resources: string;
  systemReady: string;
  scanningActive: string;
  canvasTitle: string;
  canvasDescription: string;
  canvasNoPermission: string;
  canvasWorks: string;
  canvasLimit: string;
  runCanvas: string;
  apiTitle: string;
  apiDescription: string;
  apiDetectsAll: string;
  apiRequiresPermission: string;
  apiChromiumOnly: string;
  requestApiAccess: string;
  loading: string;
  scanFailed: string;
  dismiss: string;
  activeFamilies: string;
  fontsLabel: string;
  source: string;
  sourceApi: string;
  sourceCanvas: string;
  searchPlaceholder: string;
  availableOnly: string;
  reset: string;
  noFonts: string;
  available: string;
  missing: string;
  fontNotInstalled: string;
  apiUnsupportedError: string;
  apiNoFontsError: string;
  genericError: string;
  sampleText: string;
};

export const TRANSLATIONS: Record<LanguageCode, Translation> = {
  'zh-CN': {
    seoTitle: 'Font Inspector - 在线检查浏览器可用字体',
    seoDescription: '在线检查当前浏览器中已安装和可用的字体。支持 Canvas 备用扫描和本地字体访问 API，可快速查看网页字体、系统字体、中文字体和 emoji 字体。',
    languageLabel: '语言',
    tagline: '发现当前浏览器环境中安装和可用的字体',
    scanner: '扫描器',
    resources: '资源',
    systemReady: '系统就绪',
    scanningActive: '正在扫描',
    canvasTitle: 'Canvas 备用扫描',
    canvasDescription: '针对常见网页和系统字体列表进行测试，通过隐藏元素渲染并测量尺寸来判断字体是否可用。',
    canvasNoPermission: '无需权限',
    canvasWorks: '适用于现代浏览器',
    canvasLimit: '仅测试约 50 种已知字体',
    runCanvas: '运行 Canvas 扫描',
    apiTitle: '本地字体访问 API',
    apiDescription: '使用浏览器实验性 API 枚举本机已安装字体。结果更完整，也更准确。',
    apiDetectsAll: '检测所有已安装字体',
    apiRequiresPermission: '需要用户明确授权',
    apiChromiumOnly: '仅支持桌面 Chromium 浏览器',
    requestApiAccess: '请求 API 访问',
    loading: '正在扫描字体环境...',
    scanFailed: '扫描失败',
    dismiss: '关闭',
    activeFamilies: '可用字体族',
    fontsLabel: '种字体',
    source: '来源：',
    sourceApi: '本地系统 API',
    sourceCanvas: 'Canvas 备用扫描',
    searchPlaceholder: '搜索字体...',
    availableOnly: '仅看可用',
    reset: '重置',
    noFonts: '没有找到匹配条件的字体。',
    available: '可用',
    missing: '缺失',
    fontNotInstalled: '未安装该字体',
    apiUnsupportedError: '你的浏览器不支持本地字体访问 API。请改用 Canvas 扫描。',
    apiNoFontsError: '权限被拒绝，或没有找到字体。请改用 Canvas 扫描。',
    genericError: '访问字体时发生错误。',
    sampleText: '字体预览：春风拂过湖面，文字清晰可辨',
  },
  'zh-TW': {
    seoTitle: 'Font Inspector - 線上檢查瀏覽器可用字型',
    seoDescription: '線上檢查目前瀏覽器中已安裝和可用的字型。支援 Canvas 備用掃描和本機字型存取 API，可快速查看網頁字型、系統字型、中文字型和 emoji 字型。',
    languageLabel: '語言',
    tagline: '發現目前瀏覽器環境中安裝和可用的字型',
    scanner: '掃描器',
    resources: '資源',
    systemReady: '系統就緒',
    scanningActive: '正在掃描',
    canvasTitle: 'Canvas 備用掃描',
    canvasDescription: '針對常見網頁和系統字型清單進行測試，透過隱藏元素渲染並測量尺寸來判斷字型是否可用。',
    canvasNoPermission: '不需要權限',
    canvasWorks: '適用於現代瀏覽器',
    canvasLimit: '僅測試約 50 種已知字型',
    runCanvas: '執行 Canvas 掃描',
    apiTitle: '本機字型存取 API',
    apiDescription: '使用瀏覽器實驗性 API 列出本機已安裝字型。結果更完整，也更準確。',
    apiDetectsAll: '偵測所有已安裝字型',
    apiRequiresPermission: '需要使用者明確授權',
    apiChromiumOnly: '僅支援桌面 Chromium 瀏覽器',
    requestApiAccess: '請求 API 存取',
    loading: '正在掃描字型環境...',
    scanFailed: '掃描失敗',
    dismiss: '關閉',
    activeFamilies: '可用字型族',
    fontsLabel: '種字型',
    source: '來源：',
    sourceApi: '本機系統 API',
    sourceCanvas: 'Canvas 備用掃描',
    searchPlaceholder: '搜尋字型...',
    availableOnly: '僅看可用',
    reset: '重設',
    noFonts: '沒有找到符合條件的字型。',
    available: '可用',
    missing: '缺少',
    fontNotInstalled: '未安裝該字型',
    apiUnsupportedError: '你的瀏覽器不支援本機字型存取 API。請改用 Canvas 掃描。',
    apiNoFontsError: '權限被拒絕，或沒有找到字型。請改用 Canvas 掃描。',
    genericError: '存取字型時發生錯誤。',
    sampleText: '字型預覽：春風拂過湖面，文字清晰可辨',
  },
  en: {
    seoTitle: 'Font Inspector - Check Browser Fonts Online',
    seoDescription: 'Check which fonts are installed and available in your browser. Scan web fonts, system fonts, CJK fonts, and emoji fonts with Canvas fallback or the Local Font Access API.',
    languageLabel: 'Language',
    tagline: 'Discover which fonts are installed in your browser environment',
    scanner: 'Scanner',
    resources: 'Resources',
    systemReady: 'System ready',
    scanningActive: 'Scanning',
    canvasTitle: 'Canvas Scan Fallback',
    canvasDescription: 'Tests against a curated list of popular web and system fonts by rendering them in a hidden element and measuring their dimensions.',
    canvasNoPermission: 'No permissions required',
    canvasWorks: 'Works on modern browsers',
    canvasLimit: 'Only tests about 50 known fonts',
    runCanvas: 'Run Canvas Scan',
    apiTitle: 'Local Font Access API',
    apiDescription: 'Uses the experimental browser API to enumerate locally installed fonts. Results are more comprehensive and accurate.',
    apiDetectsAll: 'Detects all installed fonts',
    apiRequiresPermission: 'Requires explicit user permission',
    apiChromiumOnly: 'Chromium desktop browsers only',
    requestApiAccess: 'Request API Access',
    loading: 'Scanning typography environment...',
    scanFailed: 'Scan Failed',
    dismiss: 'Dismiss',
    activeFamilies: 'Active Families',
    fontsLabel: 'fonts',
    source: 'Source:',
    sourceApi: 'Local System API',
    sourceCanvas: 'Canvas fallback',
    searchPlaceholder: 'Search fonts...',
    availableOnly: 'Available Only',
    reset: 'Reset',
    noFonts: 'No fonts found matching criteria.',
    available: 'Available',
    missing: 'Missing',
    fontNotInstalled: 'Font not installed',
    apiUnsupportedError: "Your browser doesn't support the Local Font Access API. Try Canvas Scan instead.",
    apiNoFontsError: 'Permission denied or no fonts found. Try Canvas Scan instead.',
    genericError: 'An error occurred while accessing fonts.',
    sampleText: 'The quick brown fox jumps over the lazy dog',
  },
  ko: {
    seoTitle: 'Font Inspector - 브라우저 글꼴 온라인 확인',
    seoDescription: '현재 브라우저에서 설치되었거나 사용할 수 있는 글꼴을 확인하세요. Canvas 예비 스캔과 로컬 글꼴 접근 API로 웹 글꼴, 시스템 글꼴, CJK 글꼴, emoji 글꼴을 검사합니다.',
    languageLabel: '언어',
    tagline: '현재 브라우저 환경에서 설치되었거나 사용할 수 있는 글꼴을 확인합니다',
    scanner: '스캐너',
    resources: '리소스',
    systemReady: '시스템 준비됨',
    scanningActive: '스캔 중',
    canvasTitle: 'Canvas 예비 스캔',
    canvasDescription: '자주 쓰이는 웹 및 시스템 글꼴 목록을 숨겨진 요소에 렌더링하고 크기를 측정해 사용 가능 여부를 확인합니다.',
    canvasNoPermission: '권한 필요 없음',
    canvasWorks: '최신 브라우저에서 동작',
    canvasLimit: '약 50개의 알려진 글꼴만 테스트',
    runCanvas: 'Canvas 스캔 실행',
    apiTitle: '로컬 글꼴 접근 API',
    apiDescription: '브라우저의 실험적 API로 로컬에 설치된 글꼴을 나열합니다. 더 포괄적이고 정확한 결과를 제공합니다.',
    apiDetectsAll: '설치된 모든 글꼴 감지',
    apiRequiresPermission: '명시적인 사용자 권한 필요',
    apiChromiumOnly: '데스크톱 Chromium 브라우저만 지원',
    requestApiAccess: 'API 접근 요청',
    loading: '글꼴 환경을 스캔하는 중...',
    scanFailed: '스캔 실패',
    dismiss: '닫기',
    activeFamilies: '사용 가능한 글꼴',
    fontsLabel: '개 글꼴',
    source: '출처:',
    sourceApi: '로컬 시스템 API',
    sourceCanvas: 'Canvas 예비 스캔',
    searchPlaceholder: '글꼴 검색...',
    availableOnly: '사용 가능만',
    reset: '초기화',
    noFonts: '조건에 맞는 글꼴을 찾지 못했습니다.',
    available: '사용 가능',
    missing: '없음',
    fontNotInstalled: '설치되지 않은 글꼴',
    apiUnsupportedError: '이 브라우저는 로컬 글꼴 접근 API를 지원하지 않습니다. Canvas 스캔을 사용해 보세요.',
    apiNoFontsError: '권한이 거부되었거나 글꼴을 찾지 못했습니다. Canvas 스캔을 사용해 보세요.',
    genericError: '글꼴에 접근하는 동안 오류가 발생했습니다.',
    sampleText: '글꼴 미리보기: 맑은 바람이 창가를 지나갑니다',
  },
  ja: {
    seoTitle: 'Font Inspector - ブラウザーのフォントをオンライン確認',
    seoDescription: '現在のブラウザーでインストール済み、または利用可能なフォントを確認できます。Canvas 予備スキャンとローカルフォントアクセス API でWebフォント、システムフォント、CJKフォント、emojiフォントを検査します。',
    languageLabel: '言語',
    tagline: '現在のブラウザー環境でインストール済み、または利用可能なフォントを確認します',
    scanner: 'スキャナー',
    resources: 'リソース',
    systemReady: 'システム準備完了',
    scanningActive: 'スキャン中',
    canvasTitle: 'Canvas 予備スキャン',
    canvasDescription: 'よく使われるWebフォントとシステムフォントを隠し要素に描画し、寸法を測定して利用可否を判定します。',
    canvasNoPermission: '権限は不要',
    canvasWorks: '最新ブラウザーで動作',
    canvasLimit: '既知の約50種類のフォントのみテスト',
    runCanvas: 'Canvas スキャンを実行',
    apiTitle: 'ローカルフォントアクセス API',
    apiDescription: 'ブラウザーの実験的 API を使ってローカルにインストールされたフォントを列挙します。より包括的で正確な結果を得られます。',
    apiDetectsAll: 'インストール済みフォントを検出',
    apiRequiresPermission: '明示的なユーザー許可が必要',
    apiChromiumOnly: 'デスクトップ版 Chromium ブラウザーのみ対応',
    requestApiAccess: 'API アクセスを要求',
    loading: 'フォント環境をスキャン中...',
    scanFailed: 'スキャン失敗',
    dismiss: '閉じる',
    activeFamilies: '利用可能なフォント',
    fontsLabel: 'フォント',
    source: 'ソース:',
    sourceApi: 'ローカルシステム API',
    sourceCanvas: 'Canvas 予備スキャン',
    searchPlaceholder: 'フォントを検索...',
    availableOnly: '利用可能のみ',
    reset: 'リセット',
    noFonts: '条件に一致するフォントはありません。',
    available: '使用可',
    missing: '未検出',
    fontNotInstalled: 'フォントはインストールされていません',
    apiUnsupportedError: 'このブラウザーはローカルフォントアクセス API に対応していません。Canvas スキャンを使用してください。',
    apiNoFontsError: '権限が拒否されたか、フォントが見つかりませんでした。Canvas スキャンを使用してください。',
    genericError: 'フォントへのアクセス中にエラーが発生しました。',
    sampleText: 'フォントプレビュー: 静かな風が窓辺を通り抜けます',
  },
  es: {
    seoTitle: 'Font Inspector - Comprueba las fuentes del navegador',
    seoDescription: 'Comprueba qué fuentes están instaladas y disponibles en tu navegador. Escanea fuentes web, del sistema, CJK y emoji con Canvas o con la API de acceso a fuentes locales.',
    languageLabel: 'Idioma',
    tagline: 'Descubre qué fuentes están instaladas o disponibles en tu navegador',
    scanner: 'Escáner',
    resources: 'Recursos',
    systemReady: 'Sistema listo',
    scanningActive: 'Escaneando',
    canvasTitle: 'Escaneo Canvas de respaldo',
    canvasDescription: 'Prueba una lista seleccionada de fuentes web y del sistema renderizándolas en un elemento oculto y midiendo sus dimensiones.',
    canvasNoPermission: 'No requiere permisos',
    canvasWorks: 'Funciona en navegadores modernos',
    canvasLimit: 'Solo prueba unas 50 fuentes conocidas',
    runCanvas: 'Ejecutar escaneo Canvas',
    apiTitle: 'API de acceso a fuentes locales',
    apiDescription: 'Usa la API experimental del navegador para enumerar las fuentes instaladas localmente. Ofrece resultados más completos y precisos.',
    apiDetectsAll: 'Detecta todas las fuentes instaladas',
    apiRequiresPermission: 'Requiere permiso explícito del usuario',
    apiChromiumOnly: 'Solo navegadores Chromium de escritorio',
    requestApiAccess: 'Solicitar acceso API',
    loading: 'Escaneando el entorno tipográfico...',
    scanFailed: 'Error de escaneo',
    dismiss: 'Cerrar',
    activeFamilies: 'Familias activas',
    fontsLabel: 'fuentes',
    source: 'Fuente:',
    sourceApi: 'API del sistema local',
    sourceCanvas: 'Escaneo Canvas',
    searchPlaceholder: 'Buscar fuentes...',
    availableOnly: 'Solo disponibles',
    reset: 'Restablecer',
    noFonts: 'No se encontraron fuentes que coincidan.',
    available: 'Disponible',
    missing: 'Falta',
    fontNotInstalled: 'Fuente no instalada',
    apiUnsupportedError: 'Tu navegador no admite la API de acceso a fuentes locales. Prueba el escaneo Canvas.',
    apiNoFontsError: 'Permiso denegado o no se encontraron fuentes. Prueba el escaneo Canvas.',
    genericError: 'Ocurrió un error al acceder a las fuentes.',
    sampleText: 'Vista previa: el veloz murciélago hindú comía feliz cardillo y kiwi',
  },
};

function isLanguageCode(value: string | null): value is LanguageCode {
  return LANGUAGE_OPTIONS.some((option) => option.code === value);
}

export function getInitialLanguage(): LanguageCode {
  if (typeof window === 'undefined') {
    return 'en';
  }

  try {
    const savedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);

    if (isLanguageCode(savedLanguage)) {
      return savedLanguage;
    }
  } catch {
    // Ignore private-mode storage failures and fall back to browser language.
  }

  const browserLanguage = window.navigator.language.toLowerCase();

  if (browserLanguage.startsWith('zh-tw') || browserLanguage.startsWith('zh-hk') || browserLanguage.startsWith('zh-mo')) {
    return 'zh-TW';
  }

  if (browserLanguage.startsWith('zh')) {
    return 'zh-CN';
  }

  if (browserLanguage.startsWith('ko')) {
    return 'ko';
  }

  if (browserLanguage.startsWith('ja')) {
    return 'ja';
  }

  if (browserLanguage.startsWith('es')) {
    return 'es';
  }

  return 'en';
}

export function saveLanguage(language: LanguageCode) {
  try {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch {
    // Language persistence is a convenience; the UI should still switch.
  }
}
