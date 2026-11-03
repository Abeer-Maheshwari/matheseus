import React from 'react';
import { Home, GraduationCap, Layers, Sigma, BarChart3 } from 'lucide-react';

interface NavbarProps {
  currentTab: 'home' | 'maths' | 'further-maths';
  onNavigate: (tab: 'home' | 'maths' | 'further-maths') => void;
  onOpenBoundaries: () => void;
  onOpenFormulas: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onNavigate,
  onOpenBoundaries,
  onOpenFormulas,
}) => {
  return (
    <header className="border-b border-[#93785B]/30 bg-[#3E362E]/95 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2.5 text-[#FAF6F0] hover:opacity-90 transition-opacity"
          >
            <span className="w-7 h-7 rounded-lg bg-[#865D36] flex items-center justify-center text-xs font-bold text-[#FAF6F0] shadow-sm">
              m
            </span>
            <span className="font-serif font-bold text-lg tracking-tight text-[#FAF6F0]">matheseus</span>
          </button>

          {/* Navigation Links */}
          <nav className="flex items-center gap-1.5 text-xs font-medium">
            <button
              onClick={() => onNavigate('home')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
                currentTab === 'home'
                  ? 'bg-[#2C2620] text-[#FAF6F0] font-semibold border border-[#93785B]/50 shadow-sm'
                  : 'text-[#AC8968] hover:text-[#FAF6F0] hover:bg-[#2C2620]/50'
              }`}
            >
              <Home size={14} className={currentTab === 'home' ? 'text-[#865D36]' : 'text-[#A69080]'} />
              <span>Home</span>
            </button>
            <button
              onClick={() => onNavigate('maths')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
                currentTab === 'maths'
                  ? 'bg-[#2C2620] text-[#FAF6F0] font-semibold border border-[#93785B]/50 shadow-sm'
                  : 'text-[#AC8968] hover:text-[#FAF6F0] hover:bg-[#2C2620]/50'
              }`}
            >
              <GraduationCap size={14} className={currentTab === 'maths' ? 'text-[#865D36]' : 'text-[#A69080]'} />
              <span>A Level Maths</span>
            </button>
            <button
              onClick={() => onNavigate('further-maths')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
                currentTab === 'further-maths'
                  ? 'bg-[#2C2620] text-[#FAF6F0] font-semibold border border-[#93785B]/50 shadow-sm'
                  : 'text-[#AC8968] hover:text-[#FAF6F0] hover:bg-[#2C2620]/50'
              }`}
            >
              <Layers size={14} className={currentTab === 'further-maths' ? 'text-[#865D36]' : 'text-[#A69080]'} />
              <span>Further Maths</span>
            </button>
          </nav>
        </div>

        {/* Resources */}
        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={onOpenFormulas}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[#FAF6F0] bg-[#2C2620] hover:bg-[#865D36] border border-[#93785B]/40 font-medium transition-colors"
          >
            <Sigma size={14} className="text-[#AC8968]" />
            <span className="hidden sm:inline">Formulae</span>
          </button>

          <button
            onClick={onOpenBoundaries}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[#FAF6F0] bg-[#2C2620] hover:bg-[#865D36] border border-[#93785B]/40 font-medium transition-colors"
          >
            <BarChart3 size={14} className="text-[#865D36]" />
            <span className="hidden sm:inline">Boundaries</span>
          </button>
        </div>
      </div>
    </header>
  );
};
