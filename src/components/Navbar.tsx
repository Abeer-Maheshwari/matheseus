import React from 'react';

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
    <header className="border-b border-zinc-800 bg-zinc-950 sticky top-0 z-40">
      <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 text-white font-bold tracking-tight text-base hover:opacity-90"
          >
            <span className="w-6 h-6 rounded bg-zinc-800 border border-zinc-700 flex items-center justify-center font-mono text-xs text-zinc-200">
              M
            </span>
            <span>matheseus</span>
          </button>

          {/* Navigation Links */}
          <nav className="flex items-center gap-1 text-xs">
            <button
              onClick={() => onNavigate('home')}
              className={`px-2.5 py-1.5 rounded font-medium transition-colors ${
                currentTab === 'home'
                  ? 'bg-zinc-800 text-white font-semibold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => onNavigate('maths')}
              className={`px-2.5 py-1.5 rounded font-medium transition-colors ${
                currentTab === 'maths'
                  ? 'bg-zinc-800 text-white font-semibold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              A Level Maths
            </button>
            <button
              onClick={() => onNavigate('further-maths')}
              className={`px-2.5 py-1.5 rounded font-medium transition-colors ${
                currentTab === 'further-maths'
                  ? 'bg-zinc-800 text-white font-semibold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Further Maths
            </button>
          </nav>
        </div>

        {/* Resources */}
        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={onOpenFormulas}
            className="px-2.5 py-1.5 rounded text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800 font-medium"
          >
            Formulae
          </button>

          <button
            onClick={onOpenBoundaries}
            className="px-2.5 py-1.5 rounded text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800 font-medium"
          >
            Boundaries
          </button>
        </div>
      </div>
    </header>
  );
};
