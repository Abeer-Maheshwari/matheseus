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
    <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2.5 text-white font-bold tracking-tight text-base hover:opacity-95 transition-opacity"
          >
            <span className="w-7 h-7 rounded-lg bg-sky-950 border border-sky-800/80 flex items-center justify-center font-mono text-xs font-bold text-sky-400">
              m
            </span>
            <span className="font-semibold tracking-tight">matheseus</span>
          </button>

          {/* Navigation Links */}
          <nav className="flex items-center gap-1.5 text-xs">
            <button
              onClick={() => onNavigate('home')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-colors ${
                currentTab === 'home'
                  ? 'bg-slate-850 text-white font-semibold border border-slate-700/80'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Home size={14} className={currentTab === 'home' ? 'text-sky-400' : 'text-slate-500'} />
              <span>Home</span>
            </button>
            <button
              onClick={() => onNavigate('maths')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-colors ${
                currentTab === 'maths'
                  ? 'bg-slate-850 text-white font-semibold border border-slate-700/80'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <GraduationCap size={14} className={currentTab === 'maths' ? 'text-sky-400' : 'text-slate-500'} />
              <span>A Level Maths</span>
            </button>
            <button
              onClick={() => onNavigate('further-maths')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-colors ${
                currentTab === 'further-maths'
                  ? 'bg-slate-850 text-white font-semibold border border-slate-700/80'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Layers size={14} className={currentTab === 'further-maths' ? 'text-indigo-400' : 'text-slate-500'} />
              <span>Further Maths</span>
            </button>
          </nav>
        </div>

        {/* Resources */}
        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={onOpenFormulas}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 font-medium transition-colors"
          >
            <Sigma size={14} className="text-sky-400" />
            <span className="hidden sm:inline">Formulae</span>
          </button>

          <button
            onClick={onOpenBoundaries}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 font-medium transition-colors"
          >
            <BarChart3 size={14} className="text-amber-400" />
            <span className="hidden sm:inline">Boundaries</span>
          </button>
        </div>
      </div>
    </header>
  );
};
