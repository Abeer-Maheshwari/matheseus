import React from 'react';

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
    <header className="border-b border-zinc-800 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <a href="/" className="flex items-center gap-2 text-white font-semibold tracking-tight text-base hover:opacity-80">
            <span className="w-6 h-6 rounded bg-zinc-800 border border-zinc-700 flex items-center justify-center font-mono text-xs text-zinc-200">
              M
            </span>
            <span>matheseus</span>
          </a>
          <span className="text-zinc-500 text-xs hidden sm:inline">/</span>
          <span className="text-xs text-zinc-400 font-mono hidden sm:inline">
            Edexcel Past Papers
          </span>
        </div>

        {/* Action Navigation */}
        <div className="flex items-center gap-1.5 sm:gap-2 text-xs">
          <button
            onClick={onOpenFormulas}
            className="px-2.5 py-1.5 rounded-md text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 font-medium"
          >
            Formula Booklets
          </button>

          <button
            onClick={onOpenBoundaries}
            className="px-2.5 py-1.5 rounded-md text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 font-medium"
          >
            Grade Boundaries
          </button>

          <button
            onClick={onOpenTimer}
            className="px-2.5 py-1.5 rounded-md text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 font-medium"
          >
            Exam Timer
          </button>

          <button
            onClick={onOpenTracker}
            className="ml-1 px-2.5 py-1.5 rounded-md bg-white hover:bg-zinc-200 text-black font-semibold"
          >
            Tracker ({completedCount}/{totalPapers})
          </button>
        </div>
      </div>
    </header>
  );
};
