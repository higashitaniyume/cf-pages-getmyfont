import { motion } from 'motion/react';
import { Type } from 'lucide-react';

interface FontCardProps {
  name: string;
  isAvailable: boolean;
  sampleText?: string;
  index: number;
  showStatus?: boolean;
  availableLabel?: string;
  missingLabel?: string;
  unavailableLabel?: string;
}

const CSS_FONT_FAMILIES = new Set([
  'serif',
  'sans-serif',
  'monospace',
  'cursive',
  'fantasy',
  'system-ui',
]);

function getFontFamilyValue(name: string) {
  if (CSS_FONT_FAMILIES.has(name.toLowerCase())) {
    return name;
  }

  return `"${name.replaceAll('\\', '\\\\').replaceAll('"', '\\"')}", serif`;
}

export function FontCard({
  name,
  isAvailable,
  sampleText = "The quick brown fox jumps over the lazy dog",
  index,
  showStatus = true,
  availableLabel = 'Available',
  missingLabel = 'Missing',
  unavailableLabel = 'Font not installed',
}: FontCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.02 }}
      className={`border rounded-lg p-5 flex min-w-0 overflow-hidden flex-col transition-colors ${
        isAvailable 
          ? 'bg-[#151515] border-[#333] hover:border-[#444]' 
          : 'bg-[#0d0d0d] border-[#222] opacity-60'
      }`}
    >
      <div className="mb-4 flex min-w-0 items-center gap-3">
        <div className="flex min-w-0 flex-1 items-center gap-2 text-[#888]">
          <Type size={14} className="shrink-0 text-[#555]" />
          <h3 className="min-w-0 truncate text-xs font-mono tracking-wide" title={name}>{name}</h3>
        </div>
        {showStatus && (
          <div className={`shrink-0 whitespace-nowrap text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm border ${
            isAvailable ? 'border-emerald-900/50 text-emerald-500 bg-emerald-950/20' : 'border-[#333] text-[#555] bg-[#111]'
          }`}>
            {isAvailable ? availableLabel : missingLabel}
          </div>
        )}
      </div>
      
      {isAvailable ? (
        <div 
          className="mt-auto w-full min-w-0 truncate text-2xl text-[#e0e0e0] font-serif"
          style={{ fontFamily: getFontFamilyValue(name) }}
          title={sampleText}
        >
          {sampleText}
        </div>
      ) : (
        <div className="text-[11px] text-[#444] italic font-mono flex items-center h-[32px] mt-auto">
          {unavailableLabel}
        </div>
      )}
    </motion.div>
  );
}
