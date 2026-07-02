import { motion } from 'motion/react';
import { Type } from 'lucide-react';

interface FontCardProps {
  name: string;
  isAvailable: boolean;
  sampleText?: string;
  index: number;
}

export function FontCard({ name, isAvailable, sampleText = "The quick brown fox jumps over the lazy dog", index }: FontCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.02 }}
      className={`border rounded-lg p-5 flex flex-col transition-colors ${
        isAvailable 
          ? 'bg-[#151515] border-[#333] hover:border-[#444]' 
          : 'bg-[#0d0d0d] border-[#222] opacity-60'
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2 text-[#888]">
          <Type size={14} className="text-[#555]" />
          <h3 className="text-xs font-mono tracking-wide truncate" title={name}>{name}</h3>
        </div>
        <div className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm border ${
          isAvailable ? 'border-emerald-900/50 text-emerald-500 bg-emerald-950/20' : 'border-[#333] text-[#555] bg-[#111]'
        }`}>
          {isAvailable ? 'Available' : 'Missing'}
        </div>
      </div>
      
      {isAvailable ? (
        <div 
          className="text-2xl text-[#e0e0e0] font-serif truncate mt-auto"
          style={{ fontFamily: `"${name}", serif` }}
          title={sampleText}
        >
          {sampleText}
        </div>
      ) : (
        <div className="text-[11px] text-[#444] italic font-mono flex items-center h-[32px] mt-auto">
          Font not installed
        </div>
      )}
    </motion.div>
  );
}
