import React, { useState, useRef, useEffect } from 'react';
import { Home, GraduationCap, Layers, Sigma, BarChart3, Palette, Type, Check } from 'lucide-react';
import { THEMES, ThemeId, FONTS, FontId } from '../utils/theme';

interface NavbarProps {
  currentTab: 'home' | 'maths' | 'further-maths';
  onNavigate: (tab: 'home' | 'maths' | 'further-maths') => void;
  onOpenBoundaries: () => void;
  onOpenFormulas: () => void;
  currentTheme: ThemeId;
  onSelectTheme: (theme: ThemeId) => void;
  currentFont: FontId;
  onSelectFont: (font: FontId) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onNavigate,
  onOpenBoundaries,
  onOpenFormulas,
  currentTheme,
  onSelectTheme,
  currentFont,
  onSelectFont,
}) => {
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [showFontMenu, setShowFontMenu] = useState(false);
  const themeMenuRef = useRef<HTMLDivElement>(null);
  const fontMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (themeMenuRef.current && !themeMenuRef.current.contains(e.target as Node)) {
        setShowThemeMenu(false);
      }
      if (fontMenuRef.current && !fontMenuRef.current.contains(e.target as Node)) {
        setShowFontMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const activeThemeMeta = THEMES.find((t) => t.id === currentTheme) || THEMES[0];
  const activeFontMeta = FONTS.find((f) => f.id === currentFont) || FONTS[0];

  return (
    <header className="border-b border-[#93785B]/30 bg-[#3E362E]/95 backdrop-blur-md sticky top-0 z-40 transition-colors">
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

        {/* Resources, Theme & Font Controls */}
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

          {/* Palette Switcher */}
          <div className="relative" ref={themeMenuRef}>
            <button
              onClick={() => {
                setShowThemeMenu(!showThemeMenu);
                setShowFontMenu(false);
              }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[#FAF6F0] bg-[#2C2620] hover:bg-[#865D36] border border-[#93785B]/40 font-medium transition-colors"
              title="Change theme palette"
            >
              <Palette size={14} className="text-[#865D36]" />
              <span className="hidden lg:inline text-[11px]">{activeThemeMeta.name}</span>
            </button>

            {showThemeMenu && (
              <div className="absolute right-0 mt-2 w-56 rounded-xl bg-[#3E362E] border border-[#93785B]/40 shadow-xl p-1.5 z-50 space-y-1">
                <div className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#AC8968]">
                  Select Palette
                </div>
                {THEMES.map((theme) => {
                  const isCurrent = theme.id === currentTheme;
                  return (
                    <button
                      key={theme.id}
                      onClick={() => {
                        onSelectTheme(theme.id);
                        setShowThemeMenu(false);
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-left text-xs transition-colors ${
                        isCurrent
                          ? 'bg-[#2C2620] text-[#FAF6F0] font-semibold border border-[#93785B]/40'
                          : 'text-[#FAF6F0] hover:bg-[#2C2620]/60'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3.5 h-3.5 rounded-full border border-black/20 shrink-0"
                          style={{ backgroundColor: theme.previewAccent }}
                        />
                        <div>
                          <div className="font-medium text-xs leading-none">{theme.name}</div>
                          <div className="text-[10px] text-[#AC8968] mt-0.5">{theme.subtitle}</div>
                        </div>
                      </div>
                      {isCurrent && <Check size={14} className="text-[#865D36] shrink-0" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Font Switcher */}
          <div className="relative" ref={fontMenuRef}>
            <button
              onClick={() => {
                setShowFontMenu(!showFontMenu);
                setShowThemeMenu(false);
              }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[#FAF6F0] bg-[#2C2620] hover:bg-[#865D36] border border-[#93785B]/40 font-medium transition-colors"
              title="Change typography font"
            >
              <Type size={14} className="text-[#AC8968]" />
              <span className="hidden lg:inline text-[11px]">{activeFontMeta.name}</span>
            </button>

            {showFontMenu && (
              <div className="absolute right-0 mt-2 w-56 rounded-xl bg-[#3E362E] border border-[#93785B]/40 shadow-xl p-1.5 z-50 space-y-1">
                <div className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#AC8968]">
                  Select Typography
                </div>
                {FONTS.map((font) => {
                  const isCurrent = font.id === currentFont;
                  return (
                    <button
                      key={font.id}
                      onClick={() => {
                        onSelectFont(font.id);
                        setShowFontMenu(false);
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-left text-xs transition-colors ${
                        isCurrent
                          ? 'bg-[#2C2620] text-[#FAF6F0] font-semibold border border-[#93785B]/40'
                          : 'text-[#FAF6F0] hover:bg-[#2C2620]/60'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded bg-[#2C2620] border border-[#93785B]/30 flex items-center justify-center text-xs font-serif text-[#FAF6F0] shrink-0">
                          {font.sample}
                        </span>
                        <div>
                          <div className="font-medium text-xs leading-none">{font.name}</div>
                          <div className="text-[10px] text-[#AC8968] mt-0.5">{font.subtitle}</div>
                        </div>
                      </div>
                      {isCurrent && <Check size={14} className="text-[#865D36] shrink-0" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
