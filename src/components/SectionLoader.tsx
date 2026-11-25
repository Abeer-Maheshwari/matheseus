import React from 'react';
import { motion } from 'motion/react';
import { Loader2 } from 'lucide-react';
import { EASE_SMOOTH } from '../utils/motion';

interface SectionLoaderProps {
  label?: string;
  sublabel?: string;
  className?: string;
}

export const SectionLoader: React.FC<SectionLoaderProps> = ({
  label = 'Loading...',
  sublabel,
  className = 'min-h-[300px]',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18, ease: EASE_SMOOTH }}
      className={`w-full flex flex-col items-center justify-center p-8 text-center select-none ${className}`}
    >
      <div className="relative w-11 h-11 rounded-2xl bg-[#0A1020] border border-[#6382BF]/30 flex items-center justify-center shadow-lg">
        <Loader2 size={20} className="text-[#4A7BF7] animate-spin" />
      </div>
      <div className="mt-3.5 text-xs font-semibold text-[#E8ECF4]">{label}</div>
      {sublabel && (
        <div className="mt-1 text-[11px] text-[#7B8FAD]">{sublabel}</div>
      )}
    </motion.div>
  );
};
