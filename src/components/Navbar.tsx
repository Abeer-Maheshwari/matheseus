import React from 'react';
import { Home, BookOpen, Sigma, BarChart3, Clock } from 'lucide-react';

interface NavbarProps {
  currentTab: 'home' | 'maths' | 'further-maths';
  onNavigate: (tab: 'home' | 'maths' | 'further-maths') => void;
  onOpenBoundaries: () => void;
  onOpenFormulas: () => void;
  onOpenTimer: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onNavigate,
  onOpenBoundaries,
  onOpenFormulas,
  onOpenTimer,
}) => {
  const isPapersActive = currentTab === 'maths' || currentTab === 'further-maths';

  return (
    <header className="border-b border-[#6382BF]/25 bg-[#1A2540]/95 backdrop-blur-md sticky top-0 z-40 transition-colors">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        {/* Brand & Left Navigation */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2.5 text-[#E8ECF4] hover:opacity-90 transition-opacity"
          >
            <span className="w-7 h-7 rounded-lg bg-[#4A7BF7] flex items-center justify-center text-xs font-bold text-white shadow-sm">
              m
            </span>
            <span className="font-serif font-bold text-lg tracking-tight text-[#E8ECF4]">matheseus</span>
          </button>

          {/* Navigation Links: Replaced duplicate subject tabs with Past Papers */}
          <nav className="flex items-center gap-1.5 text-xs font-medium">
            <button
              onClick={() => onNavigate('home')}
              className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
                currentTab === 'home'
                  ? 'bg-[#0A1020] text-[#E8ECF4] font-semibold border border-[#6382BF]/40 shadow-sm'
                  : 'text-[#7B8FAD] hover:text-[#E8ECF4] hover:bg-[#0A1020]/50'
              }`}
            >
              <Home size={14} className="shrink-0 text-inherit opacity-80 group-hover:opacity-100" />
              <span>Home</span>
            </button>

            <button
              onClick={() => onNavigate(currentTab === 'further-maths' ? 'further-maths' : 'maths')}
              className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
                isPapersActive
                  ? 'bg-[#0A1020] text-[#E8ECF4] font-semibold border border-[#6382BF]/40 shadow-sm'
                  : 'text-[#7B8FAD] hover:text-[#E8ECF4] hover:bg-[#0A1020]/50'
              }`}
            >
              <BookOpen size={14} className="shrink-0 text-inherit opacity-80 group-hover:opacity-100" />
              <span>Past Papers</span>
            </button>
          </nav>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={onOpenTimer}
            className="group flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[#E8ECF4] bg-[#0A1020] hover:bg-[#4A7BF7] hover:text-white border border-[#6382BF]/30 font-medium transition-colors"
            title="Exam countdown timer"
          >
            <Clock size={14} className="shrink-0 text-inherit opacity-80 group-hover:opacity-100" />
            <span className="hidden sm:inline">Timer</span>
          </button>

          <button
            onClick={onOpenFormulas}
            className="group flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[#E8ECF4] bg-[#0A1020] hover:bg-[#4A7BF7] hover:text-white border border-[#6382BF]/30 font-medium transition-colors"
            title="Formula booklet reference"
          >
            <Sigma size={14} className="shrink-0 text-inherit opacity-80 group-hover:opacity-100" />
            <span className="hidden sm:inline">Formulae</span>
          </button>

          <button
            onClick={onOpenBoundaries}
            className="group flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[#E8ECF4] bg-[#0A1020] hover:bg-[#4A7BF7] hover:text-white border border-[#6382BF]/30 font-medium transition-colors"
            title="Grade boundaries thresholds"
          >
            <BarChart3 size={14} className="shrink-0 text-inherit opacity-80 group-hover:opacity-100" />
            <span className="hidden sm:inline">Boundaries</span>
          </button>
        </div>
      </div>
    </header>
  );
};
