import React from 'react';
import { 
  BookOpen, 
  Clock, 
  BarChart3, 
  BookmarkCheck, 
  Sparkles,
  Calculator
} from 'lucide-react';

interface NavbarProps {
  onOpenTimer: () => void;
  onOpenBoundaries: () => void;
  onOpenFormulas: () => void;
  onOpenTracker: () => void;
  completedCount: number;
  totalPapers: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenTimer,
  onOpenBoundaries,
  onOpenFormulas,
  onOpenTracker,
  completedCount,
  totalPapers,
}) => {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-slate-950/80 border-b border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-[1.5px] shadow-lg shadow-indigo-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <span className="font-extrabold text-xl bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                μ
              </span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white">
                matheseus
              </span>
              <span className="text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                Edexcel
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              A Level Maths & Further Maths Vault
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Formula Booklet button */}
          <button
            onClick={onOpenFormulas}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 transition"
            title="Formula Sheet & Booklets"
          >
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <span className="hidden md:inline">Formula Sheet</span>
          </button>

          {/* Grade Boundaries button */}
          <button
            onClick={onOpenBoundaries}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 transition"
            title="Grade Boundaries & Calculator"
          >
            <BarChart3 className="w-4 h-4 text-indigo-400" />
            <span className="hidden md:inline">Grade Boundaries</span>
          </button>

          {/* Timed Exam Practice Mode */}
          <button
            onClick={onOpenTimer}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 transition"
            title="Exam Countdown Timer"
          >
            <Clock className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Exam Timer</span>
          </button>

          {/* Progress Tracker Pill */}
          <button
            onClick={onOpenTracker}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white shadow-md shadow-indigo-600/25 transition active:scale-95"
          >
            <BookmarkCheck className="w-4 h-4" />
            <span>
              {completedCount} / {totalPapers} Done
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
