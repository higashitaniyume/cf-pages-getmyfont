import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Search, ShieldAlert, CheckCircle2, AlertCircle, Info, Globe, Languages, ChevronDown } from 'lucide-react';
import { FontCard } from './components/FontCard';
import { BROWSER_DEFAULT_FONT_PRIORITY, BROWSER_DEFAULT_FONTS, POPULAR_FONTS } from './lib/fonts';
import { detectPopularFonts, detectLocalFonts, FontDetectionResult } from './lib/fontDetector';
import { getInitialLanguage, LANGUAGE_OPTIONS, LanguageCode, saveLanguage, TRANSLATIONS } from './lib/i18n';

const defaultFontRank = new Map(
  BROWSER_DEFAULT_FONT_PRIORITY.map((font, index) => [font.toLowerCase(), index]),
);

function sortFonts(fonts: FontDetectionResult[]) {
  return [...fonts].sort((a, b) => {
    if (a.isAvailable !== b.isAvailable) {
      return a.isAvailable ? -1 : 1;
    }

    const aRank = defaultFontRank.get(a.name.toLowerCase()) ?? Number.POSITIVE_INFINITY;
    const bRank = defaultFontRank.get(b.name.toLowerCase()) ?? Number.POSITIVE_INFINITY;

    if (aRank !== bRank) {
      return aRank - bRank;
    }
    return a.name.localeCompare(b.name);
  });
}

function uniqueFontNames(fonts: string[]) {
  const seen = new Set<string>();

  return fonts.filter((font) => {
    const key = font.trim().toLowerCase();

    if (!key || seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

function setMetaContent(selector: string, content: string) {
  document.querySelector(selector)?.setAttribute('content', content);
}

function setCanonicalUrl() {
  const href = `${window.location.origin}${window.location.pathname}`;
  let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');

  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }

  canonical.href = href;
}

export default function App() {
  const [fonts, setFonts] = useState<FontDetectionResult[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanMethod, setScanMethod] = useState<'canvas' | 'api' | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [language, setLanguage] = useState<LanguageCode>(getInitialLanguage);
  const t = TRANSLATIONS[language];

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = t.seoTitle;
    setMetaContent('meta[name="description"]', t.seoDescription);
    setMetaContent('meta[property="og:title"]', t.seoTitle);
    setMetaContent('meta[property="og:description"]', t.seoDescription);
    setMetaContent('meta[name="twitter:title"]', t.seoTitle);
    setMetaContent('meta[name="twitter:description"]', t.seoDescription);
    setCanonicalUrl();
  }, [language, t.seoDescription, t.seoTitle]);

  const handleLanguageChange = (nextLanguage: LanguageCode) => {
    setLanguage(nextLanguage);
    saveLanguage(nextLanguage);
  };

  const handleCanvasScan = () => {
    setIsScanning(true);
    setError(null);
    setScanMethod('canvas');
    
    // Use timeout to allow UI to update before blocking main thread
    setTimeout(() => {
      const results = detectPopularFonts(POPULAR_FONTS);
      
      setFonts(sortFonts(results));
      setIsScanning(false);
    }, 50);
  };

  const handleApiScan = async () => {
    setIsScanning(true);
    setError(null);
    setScanMethod('api');
    
    if (!('queryLocalFonts' in window)) {
      setError(t.apiUnsupportedError);
      setIsScanning(false);
      return;
    }
    
    try {
      const localFonts = await detectLocalFonts();
      
      if (localFonts && localFonts.length > 0) {
        // Local Font Access returns installed fonts, not CSS generic default families.
        const uniqueFonts = uniqueFontNames([...BROWSER_DEFAULT_FONTS, ...localFonts]);
        const results = uniqueFonts.map(name => ({
          name,
          isAvailable: true
        }));
        
        setFonts(sortFonts(results));
      } else {
        setError(t.apiNoFontsError);
      }
    } catch {
      setError(t.genericError);
    } finally {
      setIsScanning(false);
    }
  };

  const filteredFonts = fonts.filter(font => {
    const matchesSearch = font.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = showOnlyAvailable ? font.isAvailable : true;
    return matchesSearch && matchesFilter;
  });

  const availableCount = fonts.filter(f => f.isAvailable).length;

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#e0e0e0] font-sans selection:bg-[#333] selection:text-white">
      <div className="max-w-6xl mx-auto px-8 py-12 md:py-16 flex flex-col min-h-screen">
        
        {/* Header Section */}
        <header className="mb-12 border-b border-[#222] pb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full border border-[#444] flex items-center justify-center bg-[#111]">
                <span className="text-[10px] font-bold text-[#e0e0e0]">ƒ</span>
              </div>
              <h1 className="text-xs tracking-[0.2em] font-medium uppercase text-[#e0e0e0]">Font Inspector</h1>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#555]">v1.0.4</span>
            </div>
            <p className="text-[10px] font-mono text-[#555] uppercase tracking-widest">
              {t.tagline}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-[10px] tracking-widest text-[#888]">
            <label className="relative flex items-center normal-case tracking-normal">
              <Languages size={13} className="pointer-events-none absolute left-3 text-[#555]" />
              <select
                aria-label={t.languageLabel}
                title={t.languageLabel}
                value={language}
                onChange={event => handleLanguageChange(event.target.value as LanguageCode)}
                className="h-9 min-w-36 appearance-none rounded-sm border border-[#333] bg-[#111] py-2 pl-8 pr-8 text-[11px] text-[#e0e0e0] outline-none transition-colors hover:border-[#444] focus:border-[#666]"
              >
                {LANGUAGE_OPTIONS.map(option => (
                  <option key={option.code} value={option.code}>
                    {option.flag} {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown size={13} className="pointer-events-none absolute right-3 text-[#555]" />
            </label>
            <div className="flex gap-4 uppercase">
              <span className="text-white border-b border-white pb-1">{t.scanner}</span>
              <span className="hover:text-white cursor-pointer transition-colors">{t.resources}</span>
            </div>
            <div className="flex items-center gap-2 border-l border-[#222] pl-4 uppercase">
              <div className={`h-2 w-2 rounded-full ${isScanning ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`}></div>
              <span className="text-[#555] font-mono">{isScanning ? t.scanningActive : t.systemReady}</span>
            </div>
          </div>
        </header>

        {/* Action Cards */}
        {fonts.length === 0 && !isScanning && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid md:grid-cols-2 gap-6 mb-12"
          >
            {/* Canvas Scan Card */}
            <div className="bg-[#151515] p-8 rounded-lg border border-[#333] flex flex-col items-start hover:bg-[#1a1a1a] transition-colors">
              <div className="w-8 h-8 border border-[#444] text-[#888] rounded-full flex items-center justify-center mb-6">
                <Search size={14} />
              </div>
              <h2 className="text-xl font-serif italic mb-2 text-[#e0e0e0]">{t.canvasTitle}</h2>
              <p className="text-xs font-mono text-[#888] mb-6 flex-1 leading-relaxed">
                {t.canvasDescription}
              </p>
              <ul className="space-y-3 text-[11px] text-[#777] mb-8 w-full font-mono border-t border-[#222] pt-4">
                <li className="flex justify-between items-center"><span className="flex items-center"><CheckCircle2 size={12} className="text-[#555] mr-2 shrink-0" /> {t.canvasNoPermission}</span></li>
                <li className="flex justify-between items-center"><span className="flex items-center"><CheckCircle2 size={12} className="text-[#555] mr-2 shrink-0" /> {t.canvasWorks}</span></li>
                <li className="flex justify-between items-center"><span className="flex items-center"><AlertCircle size={12} className="text-[#555] mr-2 shrink-0" /> {t.canvasLimit}</span></li>
              </ul>
              <button 
                onClick={handleCanvasScan}
                className="w-full py-3 px-4 bg-[#111] hover:bg-[#222] border border-[#333] text-[10px] tracking-[0.2em] uppercase text-[#e0e0e0] rounded-sm font-medium transition-colors"
              >
                {t.runCanvas}
              </button>
            </div>

            {/* API Scan Card */}
            <div className="bg-[#151515] p-8 rounded-lg border border-[#333] flex flex-col items-start hover:bg-[#1a1a1a] transition-colors relative overflow-hidden">
              <div className="w-8 h-8 border border-[#444] text-[#e0e0e0] bg-[#222] rounded-full flex items-center justify-center mb-6">
                <Globe size={14} />
              </div>
              <h2 className="text-xl font-serif italic mb-2 text-[#e0e0e0]">{t.apiTitle}</h2>
              <p className="text-xs font-mono text-[#888] mb-6 flex-1 leading-relaxed">
                {t.apiDescription}
              </p>
              <ul className="space-y-3 text-[11px] text-[#777] mb-8 w-full font-mono border-t border-[#222] pt-4">
                <li className="flex justify-between items-center"><span className="flex items-center"><CheckCircle2 size={12} className="text-[#555] mr-2 shrink-0" /> {t.apiDetectsAll}</span></li>
                <li className="flex justify-between items-center"><span className="flex items-center"><ShieldAlert size={12} className="text-[#555] mr-2 shrink-0" /> {t.apiRequiresPermission}</span></li>
                <li className="flex justify-between items-center"><span className="flex items-center"><AlertCircle size={12} className="text-[#555] mr-2 shrink-0" /> {t.apiChromiumOnly}</span></li>
              </ul>
              <button 
                onClick={handleApiScan}
                className="w-full py-3 px-4 bg-[#e0e0e0] hover:bg-white text-[#0a0a0a] border border-[#e0e0e0] rounded-sm text-[10px] tracking-[0.2em] uppercase font-bold transition-colors"
              >
                {t.requestApiAccess}
              </button>
            </div>
          </motion.div>
        )}

        {/* Loading State */}
        {isScanning && (
          <div className="flex flex-col items-center justify-center py-32 flex-1">
            <div className="w-8 h-8 border border-[#333] border-t-[#e0e0e0] rounded-full animate-spin mb-6"></div>
            <p className="text-[10px] font-mono uppercase tracking-widest text-[#555] animate-pulse">{t.loading}</p>
          </div>
        )}

        {/* Error State */}
        {error && !isScanning && fonts.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#111] text-[#e0e0e0] p-6 rounded-lg border border-red-900/50 flex items-start space-x-4 mb-8"
          >
            <AlertCircle className="mt-0.5 shrink-0 text-red-500" size={16} />
            <div>
              <h3 className="text-xs font-mono uppercase tracking-widest mb-2 text-red-400">{t.scanFailed}</h3>
              <p className="text-sm font-serif italic text-[#888]">{error}</p>
              <button 
                onClick={() => setError(null)}
                className="mt-4 text-[10px] uppercase tracking-widest text-[#555] hover:text-[#e0e0e0] transition-colors border-b border-[#333] hover:border-[#e0e0e0] pb-0.5"
              >
                {t.dismiss}
              </button>
            </div>
          </motion.div>
        )}

        {/* Results Section */}
        {fonts.length > 0 && !isScanning && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8 flex-1 flex flex-col"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-[#0d0d0d] p-6 rounded-lg border border-[#222]">
              <div className="flex flex-col space-y-1">
                <span className="text-[11px] uppercase tracking-widest text-[#555] mb-1">{t.activeFamilies}</span>
                <span className="text-2xl font-light text-[#e0e0e0]">
                  {availableCount} <span className="text-[#555] text-lg font-serif italic">{t.fontsLabel}</span>
                </span>
                <span className="text-[10px] font-mono text-[#555] flex items-center pt-2">
                  <Info size={12} className="mr-2" />
                  {t.source} {scanMethod === 'api' ? t.sourceApi : t.sourceCanvas}
                </span>
              </div>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="relative">
                  <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#555]" />
                  <input 
                    type="text" 
                    placeholder={t.searchPlaceholder}
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-[#111] border border-[#333] rounded-sm text-xs font-mono text-[#e0e0e0] w-full sm:w-64 focus:outline-none focus:border-[#555] transition-colors placeholder:text-[#555]"
                  />
                </div>
                {scanMethod === 'canvas' && (
                  <label className="flex items-center space-x-3 text-[10px] font-mono uppercase tracking-widest cursor-pointer bg-[#111] border border-[#333] px-4 py-2.5 rounded-sm hover:bg-[#151515] transition-colors text-[#888]">
                    <input 
                      type="checkbox" 
                      checked={showOnlyAvailable}
                      onChange={e => setShowOnlyAvailable(e.target.checked)}
                      className="rounded-sm border-[#444] bg-[#222] text-[#e0e0e0] focus:ring-0 focus:ring-offset-0"
                    />
                    <span>{t.availableOnly}</span>
                  </label>
                )}
                <button 
                  onClick={() => {
                    setFonts([]);
                    setSearchQuery('');
                  }}
                  className="text-[10px] uppercase tracking-widest font-medium text-[#555] hover:text-[#e0e0e0] px-4 py-2 border border-transparent hover:border-[#333] rounded-sm transition-colors"
                >
                  {t.reset}
                </button>
              </div>
            </div>

            {filteredFonts.length === 0 ? (
              <div className="text-center py-24 bg-[#0d0d0d] rounded-lg border border-[#222] border-dashed flex-1 flex flex-col items-center justify-center">
                <p className="text-[11px] font-mono uppercase tracking-widest text-[#555]">{t.noFonts}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-12">
                {filteredFonts.map((font, idx) => (
                  <FontCard 
                    key={`${font.name}-${idx}`} 
                    name={font.name} 
                    isAvailable={font.isAvailable} 
                    index={idx} 
                    showStatus={scanMethod !== 'api'}
                    sampleText={t.sampleText}
                    englishSampleText={TRANSLATIONS.en.sampleText}
                    availableLabel={t.available}
                    missingLabel={t.missing}
                    unavailableLabel={t.fontNotInstalled}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </main>
  );
}
