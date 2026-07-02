import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Search, ShieldAlert, CheckCircle2, AlertCircle, Terminal, Info, Globe } from 'lucide-react';
import { FontCard } from './components/FontCard';
import { POPULAR_FONTS } from './lib/fonts';
import { detectPopularFonts, detectLocalFonts, FontDetectionResult } from './lib/fontDetector';

export default function App() {
  const [fonts, setFonts] = useState<FontDetectionResult[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanMethod, setScanMethod] = useState<'canvas' | 'api' | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCanvasScan = () => {
    setIsScanning(true);
    setError(null);
    setScanMethod('canvas');
    
    // Use timeout to allow UI to update before blocking main thread
    setTimeout(() => {
      const results = detectPopularFonts(POPULAR_FONTS);
      // Sort: Available first, then alphabetical
      results.sort((a, b) => {
        if (a.isAvailable === b.isAvailable) {
          return a.name.localeCompare(b.name);
        }
        return a.isAvailable ? -1 : 1;
      });
      
      setFonts(results);
      setIsScanning(false);
    }, 50);
  };

  const handleApiScan = async () => {
    setIsScanning(true);
    setError(null);
    setScanMethod('api');
    
    if (!('queryLocalFonts' in window)) {
      setError("Your browser doesn't support the Local Font Access API. Try Canvas Scan instead.");
      setIsScanning(false);
      return;
    }
    
    try {
      const localFonts = await detectLocalFonts();
      
      if (localFonts && localFonts.length > 0) {
        // Dedup and format
        const uniqueFonts = Array.from(new Set(localFonts));
        const results = uniqueFonts.map(name => ({
          name,
          isAvailable: true
        })).sort((a, b) => a.name.localeCompare(b.name));
        
        setFonts(results);
      } else {
        setError("Permission denied or no fonts found. Try Canvas Scan instead.");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred while accessing fonts.");
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
    <div className="min-h-screen bg-[#0a0a0a] text-[#e0e0e0] font-sans selection:bg-[#333] selection:text-white">
      <div className="max-w-6xl mx-auto px-8 py-12 md:py-16 flex flex-col min-h-screen">
        
        {/* Header Section */}
        <header className="mb-12 border-b border-[#222] pb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full border border-[#444] flex items-center justify-center bg-[#111]">
                <span className="text-[10px] font-bold text-[#e0e0e0]">ƒ</span>
              </div>
              <h1 className="text-xs tracking-[0.2em] font-medium uppercase text-[#e0e0e0]">Font_Inspector / v1.0.4</h1>
            </div>
            <p className="text-[10px] font-mono text-[#555] uppercase tracking-widest">
              Discover which fonts are installed in your browser environment
            </p>
          </div>
          <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest text-[#888]">
            <div className="flex gap-4">
              <span className="text-white border-b border-white pb-1">Scanner</span>
              <span className="hover:text-white cursor-pointer transition-colors">Resources</span>
            </div>
            <div className="flex items-center gap-2 ml-4 pl-4 border-l border-[#222]">
              <div className={`h-2 w-2 rounded-full ${isScanning ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`}></div>
              <span className="text-[#555] font-mono">{isScanning ? 'SCANNING_ACTIVE' : 'SYSTEM_READY'}</span>
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
              <h2 className="text-xl font-serif italic mb-2 text-[#e0e0e0]">Canvas Scan Fallback</h2>
              <p className="text-xs font-mono text-[#888] mb-6 flex-1 leading-relaxed">
                Tests against a curated list of popular web and system fonts by rendering them in a hidden canvas and measuring their dimensions.
              </p>
              <ul className="space-y-3 text-[11px] text-[#777] mb-8 w-full font-mono border-t border-[#222] pt-4">
                <li className="flex justify-between items-center"><span className="flex items-center"><CheckCircle2 size={12} className="text-[#555] mr-2" /> No permissions required</span></li>
                <li className="flex justify-between items-center"><span className="flex items-center"><CheckCircle2 size={12} className="text-[#555] mr-2" /> Works on all modern browsers</span></li>
                <li className="flex justify-between items-center"><span className="flex items-center"><AlertCircle size={12} className="text-[#555] mr-2" /> Only tests ~50 known fonts</span></li>
              </ul>
              <button 
                onClick={handleCanvasScan}
                className="w-full py-3 px-4 bg-[#111] hover:bg-[#222] border border-[#333] text-[10px] tracking-[0.2em] uppercase text-[#e0e0e0] rounded-sm font-medium transition-colors"
              >
                Run Canvas Scan
              </button>
            </div>

            {/* API Scan Card */}
            <div className="bg-[#151515] p-8 rounded-lg border border-[#333] flex flex-col items-start hover:bg-[#1a1a1a] transition-colors relative overflow-hidden">
              <div className="w-8 h-8 border border-[#444] text-[#e0e0e0] bg-[#222] rounded-full flex items-center justify-center mb-6">
                <Globe size={14} />
              </div>
              <h2 className="text-xl font-serif italic mb-2 text-[#e0e0e0]">Local Font Access API</h2>
              <p className="text-xs font-mono text-[#888] mb-6 flex-1 leading-relaxed">
                Uses the experimental browser API to enumerate all locally installed fonts. Provides the most comprehensive and accurate results.
              </p>
              <ul className="space-y-3 text-[11px] text-[#777] mb-8 w-full font-mono border-t border-[#222] pt-4">
                <li className="flex justify-between items-center"><span className="flex items-center"><CheckCircle2 size={12} className="text-[#555] mr-2" /> Detects all installed fonts</span></li>
                <li className="flex justify-between items-center"><span className="flex items-center"><ShieldAlert size={12} className="text-[#555] mr-2" /> Requires explicit user permission</span></li>
                <li className="flex justify-between items-center"><span className="flex items-center"><AlertCircle size={12} className="text-[#555] mr-2" /> Chromium browsers only (Desktop)</span></li>
              </ul>
              <button 
                onClick={handleApiScan}
                className="w-full py-3 px-4 bg-[#e0e0e0] hover:bg-white text-[#0a0a0a] border border-[#e0e0e0] rounded-sm text-[10px] tracking-[0.2em] uppercase font-bold transition-colors"
              >
                Request API Access
              </button>
            </div>
          </motion.div>
        )}

        {/* Loading State */}
        {isScanning && (
          <div className="flex flex-col items-center justify-center py-32 flex-1">
            <div className="w-8 h-8 border border-[#333] border-t-[#e0e0e0] rounded-full animate-spin mb-6"></div>
            <p className="text-[10px] font-mono uppercase tracking-widest text-[#555] animate-pulse">Scanning typography environment...</p>
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
              <h3 className="text-xs font-mono uppercase tracking-widest mb-2 text-red-400">Scan Failed</h3>
              <p className="text-sm font-serif italic text-[#888]">{error}</p>
              <button 
                onClick={() => setError(null)}
                className="mt-4 text-[10px] uppercase tracking-widest text-[#555] hover:text-[#e0e0e0] transition-colors border-b border-[#333] hover:border-[#e0e0e0] pb-0.5"
              >
                Dismiss
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
                <span className="text-[11px] uppercase tracking-widest text-[#555] mb-1">Active Families</span>
                <span className="text-2xl font-light text-[#e0e0e0]">
                  {availableCount} <span className="text-[#555] text-lg font-serif italic">fonts</span>
                </span>
                <span className="text-[10px] font-mono text-[#555] flex items-center pt-2">
                  <Info size={12} className="mr-2" />
                  Source: {scanMethod === 'api' ? 'Local System API' : 'Canvas fallback'}
                </span>
              </div>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="relative">
                  <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#555]" />
                  <input 
                    type="text" 
                    placeholder="Search fonts..." 
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
                    <span>Available Only</span>
                  </label>
                )}
                <button 
                  onClick={() => {
                    setFonts([]);
                    setSearchQuery('');
                  }}
                  className="text-[10px] uppercase tracking-widest font-medium text-[#555] hover:text-[#e0e0e0] px-4 py-2 border border-transparent hover:border-[#333] rounded-sm transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>

            {filteredFonts.length === 0 ? (
              <div className="text-center py-24 bg-[#0d0d0d] rounded-lg border border-[#222] border-dashed flex-1 flex flex-col items-center justify-center">
                <p className="text-[11px] font-mono uppercase tracking-widest text-[#555]">No fonts found matching criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-12">
                {filteredFonts.map((font, idx) => (
                  <FontCard 
                    key={`${font.name}-${idx}`} 
                    name={font.name} 
                    isAvailable={font.isAvailable} 
                    index={idx} 
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
