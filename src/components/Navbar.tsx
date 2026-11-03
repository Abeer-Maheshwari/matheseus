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
    <header className="border-b border-[#90AEAD]/20 bg-[#244855]/95 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2.5 text-[#FBE9D0] font-bold tracking-tight text-base hover:opacity-90 transition-opacity"
          >
            <span className="w-7 h-7 rounded-lg bg-[#E64833] flex items-center justify-center font-mono text-xs font-bold text-[#FBE9D0] shadow-sm">
              m
            </span>
            <span className="font-semibold tracking-tight text-[#FBE9D0]">matheseus</span>
          </button>

          {/* Navigation Links */}
          <nav className="flex items-center gap-1.5 text-xs">
            <button
              onClick={() => onNavigate('home')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-colors ${
                currentTab === 'home'
                  ? 'bg-[#162932] text-[#FBE9D0] font-semibold border border-[#90AEAD]/30 shadow-sm'
                  : 'text-[#90AEAD] hover:text-[#FBE9D0] hover:bg-[#162932]/50'
              }`}
            >
              <Home size={14} className={currentTab === 'home' ? 'text-[#E64833]' : 'text-[#90AEAD]'} />
              <span>Home</span>
            </button>
            <button
              onClick={() => onNavigate('maths')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-colors ${
                currentTab === 'maths'
                  ? 'bg-[#162932] text-[#FBE9D0] font-semibold border border-[#90AEAD]/30 shadow-sm'
                  : 'text-[#90AEAD] hover:text-[#FBE9D0] hover:bg-[#162932]/50'
              }`}
            >
              <GraduationCap size={14} className={currentTab === 'maths' ? 'text-[#E64833]' : 'text-[#90AEAD]'} />
              <span>A Level Maths</span>
            </button>
            <button
              onClick={() => onNavigate('further-maths')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-colors ${
                currentTab === 'further-maths'
                  ? 'bg-[#162932] text-[#FBE9D0] font-semibold border border-[#90AEAD]/30 shadow-sm'
                  : 'text-[#90AEAD] hover:text-[#FBE9D0] hover:bg-[#162932]/50'
              }`}
            >
              <Layers size={14} className={currentTab === 'further-maths' ? 'text-[#E64833]' : 'text-[#90AEAD]'} />
              <span>Further Maths</span>
            </button>
          </nav>
        </div>

        {/* Resources */}
        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={onOpenFormulas}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[#FBE9D0] bg-[#162932] hover:bg-[#874F41] border border-[#90AEAD]/30 font-medium transition-colors"
          >
            <Sigma size={14} className="text-[#90AEAD]" />
            <span className="hidden sm:inline">Formulae</span>
          </button>

          <button
            onClick={onOpenBoundaries}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[#FBE9D0] bg-[#162932] hover:bg-[#874F41] border border-[#90AEAD]/30 font-medium transition-colors"
          >
            <BarChart3 size={14} className="text-[#E64833]" />
            <span className="hidden sm:inline">Boundaries</span>
          </button>
        </div>
      </div>
    </header>
  );
};
