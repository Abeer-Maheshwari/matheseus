import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { PILL_SPRING, EASE_SMOOTH } from '../utils/motion';
import {
  Home,
  BookOpen,
  Sigma,
  BarChart3,
  Clock,
  Unlock,
  ListFilter,
  LayoutDashboard,
  User as UserIcon,
  LogOut,
  ChevronDown,
  Settings,
} from 'lucide-react';

export type AppTab =
  | 'home'
  | 'maths'
  | 'further-maths'
  | 'more-papers'
  | 'mock-sets'
  | 'topics'
  | 'dashboard'
  | 'formulae'
  | 'boundaries';

interface NavbarProps {
  currentTab: AppTab;
  onNavigate: (tab: AppTab) => void;
  onOpenBoundaries: () => void;
  onOpenFormulas: () => void;
  onOpenAuth: (initialView?: 'signin' | 'signup') => void;
  onOpenSettings?: () => void;
  isExamMode?: boolean;
  onOpenTimer?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onNavigate,
  onOpenBoundaries,
  onOpenFormulas,
  onOpenAuth,
  onOpenSettings,
  isExamMode = false,
  onOpenTimer,
}) => {
  const { user, profile, signOut } = useAuth();
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setAccountMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const isPapersActive =
    currentTab === 'maths' ||
    currentTab === 'further-maths' ||
    currentTab === 'more-papers';

  return (
    <header className="border-b border-[#6382BF]/25 bg-[#1A2540]/90 backdrop-blur-xl sticky top-0 z-40 transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between gap-3">
        {/* Brand & Left Navigation */}
        <div className="flex items-center gap-4 lg:gap-6 min-w-0">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2.5 text-[#E8ECF4] hover:opacity-90 active:scale-95 transition-all duration-200 shrink-0"
            title="Home"
          >
            <img
              src="/logo.png"
              alt="matheseus."
              className="w-7 h-7 rounded-lg object-cover shadow-sm ring-1 ring-white/15"
            />
            <span className="font-serif font-bold text-lg tracking-tight text-[#E8ECF4]">matheseus.</span>
          </button>

          {/* Navigation Links: When signed in, Dashboard replaces Home (logo opens Home) */}
          <nav className="flex items-center gap-1 sm:gap-1.5 text-xs font-medium overflow-x-auto no-scrollbar">
            {user ? (
              <button
                onClick={() => onNavigate('dashboard')}
                className={`relative group flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0 active:scale-95 transition-all duration-200 ${
                  currentTab === 'dashboard'
                    ? 'text-[#E8ECF4] font-semibold'
                    : 'text-[#7B8FAD] hover:text-[#E8ECF4]'
                }`}
              >
                {currentTab === 'dashboard' && (
                  <motion.div
                    layoutId="navbar-pill"
                    className="absolute inset-0 bg-[#0A1020] border border-[#6382BF]/40 rounded-lg shadow-sm"
                    transition={PILL_SPRING}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <LayoutDashboard size={14} className="shrink-0 text-inherit opacity-80 group-hover:opacity-100 transition-opacity" />
                  <span>Dashboard</span>
                </span>
              </button>
            ) : (
              <button
                onClick={() => onNavigate('home')}
                className={`relative group flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0 active:scale-95 transition-all duration-200 ${
                  currentTab === 'home'
                    ? 'text-[#E8ECF4] font-semibold'
                    : 'text-[#7B8FAD] hover:text-[#E8ECF4]'
                }`}
              >
                {currentTab === 'home' && (
                  <motion.div
                    layoutId="navbar-pill"
                    className="absolute inset-0 bg-[#0A1020] border border-[#6382BF]/40 rounded-lg shadow-sm"
                    transition={PILL_SPRING}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <Home size={14} className="shrink-0 text-inherit opacity-80 group-hover:opacity-100 transition-opacity" />
                  <span>Home</span>
                </span>
              </button>
            )}

            <button
              onClick={() => {
                if (isPapersActive) {
                  onNavigate(currentTab as 'maths' | 'further-maths' | 'more-papers');
                } else {
                  onNavigate('maths');
                }
              }}
              className={`relative group flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0 active:scale-95 transition-all duration-200 ${
                isPapersActive
                  ? 'text-[#E8ECF4] font-semibold'
                  : 'text-[#7B8FAD] hover:text-[#E8ECF4]'
              }`}
            >
              {isPapersActive && (
                <motion.div
                  layoutId="navbar-pill"
                  className="absolute inset-0 bg-[#0A1020] border border-[#6382BF]/40 rounded-lg shadow-sm"
                  transition={PILL_SPRING}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <BookOpen size={14} className="shrink-0 text-inherit opacity-80 group-hover:opacity-100 transition-opacity" />
                <span>Past Papers</span>
              </span>
            </button>

            <button
              onClick={() => onNavigate('mock-sets')}
              className={`relative group flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0 active:scale-95 transition-all duration-200 ${
                currentTab === 'mock-sets'
                  ? 'text-[#E8ECF4] font-semibold'
                  : 'text-[#7B8FAD] hover:text-[#E8ECF4]'
              }`}
            >
              {currentTab === 'mock-sets' && (
                <motion.div
                  layoutId="navbar-pill"
                  className="absolute inset-0 bg-[#0A1020] border border-[#6382BF]/40 rounded-lg shadow-sm"
                  transition={PILL_SPRING}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <Unlock size={14} className="shrink-0 text-inherit opacity-80 group-hover:opacity-100 transition-opacity" />
                <span>Mock Sets</span>
              </span>
            </button>

            <button
              onClick={() => onNavigate('topics')}
              className={`relative group flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0 active:scale-95 transition-all duration-200 ${
                currentTab === 'topics'
                  ? 'text-[#E8ECF4] font-semibold'
                  : 'text-[#7B8FAD] hover:text-[#E8ECF4]'
              }`}
            >
              {currentTab === 'topics' && (
                <motion.div
                  layoutId="navbar-pill"
                  className="absolute inset-0 bg-[#0A1020] border border-[#6382BF]/40 rounded-lg shadow-sm"
                  transition={PILL_SPRING}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <ListFilter size={14} className="shrink-0 text-inherit opacity-80 group-hover:opacity-100 transition-opacity" />
                <span>By Topic</span>
              </span>
            </button>
          </nav>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2 text-xs shrink-0">
          {isExamMode && onOpenTimer && (
            <button
              onClick={onOpenTimer}
              className="group flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[#E8ECF4] bg-[#0A1020] hover:bg-[#4A7BF7] hover:text-white border border-[#6382BF]/30 font-medium active:scale-95 transition-all duration-200 shadow-sm"
              title="Exam countdown timer"
            >
              <Clock size={14} className="shrink-0 text-inherit opacity-80 group-hover:opacity-100 transition-opacity" />
              <span className="hidden sm:inline">Timer</span>
            </button>
          )}

          <button
            onClick={onOpenFormulas}
            className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium active:scale-95 transition-all duration-200 shadow-sm ${
              currentTab === 'formulae'
                ? 'bg-[#4A7BF7] text-white border border-[#4A7BF7] shadow-md shadow-[#4A7BF7]/20 font-semibold'
                : 'text-[#E8ECF4] bg-[#0A1020] hover:bg-[#4A7BF7] hover:text-white border border-[#6382BF]/30'
            }`}
            title="Formula booklet reference"
          >
            <Sigma size={14} className="shrink-0 text-inherit opacity-80 group-hover:opacity-100 transition-opacity" />
            <span className="hidden sm:inline">Formulae</span>
          </button>

          <button
            onClick={onOpenBoundaries}
            className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium active:scale-95 transition-all duration-200 shadow-sm ${
              currentTab === 'boundaries'
                ? 'bg-[#4A7BF7] text-white border border-[#4A7BF7] shadow-md shadow-[#4A7BF7]/20 font-semibold'
                : 'text-[#E8ECF4] bg-[#0A1020] hover:bg-[#4A7BF7] hover:text-white border border-[#6382BF]/30'
            }`}
            title="Grade boundaries thresholds"
          >
            <BarChart3 size={14} className="shrink-0 text-inherit opacity-80 group-hover:opacity-100 transition-opacity" />
            <span className="hidden sm:inline">Boundaries</span>
          </button>

          {user ? (
            <div ref={menuRef} className="relative">
              <button
                type="button"
                onClick={() => setAccountMenuOpen((prev) => !prev)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#0A1020] hover:bg-[#1A2540] border border-[#6382BF]/35 text-[#E8ECF4] font-medium transition-colors"
                title={user.email || 'Account'}
              >
                <span className="w-5 h-5 rounded-md bg-[#4A7BF7]/20 text-[#4A7BF7] flex items-center justify-center">
                  <UserIcon size={12} />
                </span>
                <span className="hidden md:inline max-w-[110px] truncate text-xs">
                  {profile?.displayName || user.email?.split('@')[0]}
                </span>
                <ChevronDown size={12} className="text-[#7B8FAD]" />
              </button>

              <AnimatePresence>
                {accountMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.97 }}
                    transition={{ duration: 0.2, ease: EASE_SMOOTH }}
                    className="absolute right-0 mt-2 w-52 rounded-xl bg-[#1A2540] border border-[#6382BF]/35 shadow-2xl overflow-hidden z-50"
                  >
                    <div className="px-3.5 py-2.5 border-b border-[#6382BF]/20 bg-[#0A1020]/50">
                      <div className="text-xs font-semibold text-[#E8ECF4] truncate">
                        {profile?.displayName || 'Account'}
                      </div>
                      <div className="text-[11px] text-[#7B8FAD] truncate">{user.email}</div>
                    </div>
                    <div className="p-1.5 space-y-0.5">
                      <button
                        type="button"
                        onClick={() => {
                          setAccountMenuOpen(false);
                          onNavigate('dashboard');
                        }}
                        className="w-full px-3 py-2 rounded-lg text-left text-xs text-[#E8ECF4] hover:bg-[#0A1020] flex items-center gap-2"
                      >
                        <LayoutDashboard size={13} className="text-[#4A7BF7]" />
                        <span>Dashboard</span>
                      </button>
                      {onOpenSettings && (
                        <button
                          type="button"
                          onClick={() => {
                            setAccountMenuOpen(false);
                            onOpenSettings();
                          }}
                          className="w-full px-3 py-2 rounded-lg text-left text-xs text-[#E8ECF4] hover:bg-[#0A1020] flex items-center gap-2"
                        >
                          <Settings size={13} className="text-[#4A7BF7]" />
                          <span>Settings</span>
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => {
                          setAccountMenuOpen(false);
                          void (async () => {
                            await signOut();
                            onNavigate('home');
                          })();
                        }}
                        className="w-full px-3 py-2 rounded-lg text-left text-xs text-rose-300 hover:bg-rose-500/15 flex items-center gap-2"
                      >
                        <LogOut size={13} />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              {onOpenSettings && (
                <button
                  type="button"
                  onClick={onOpenSettings}
                  className="p-2 rounded-lg bg-[#0A1020] hover:bg-[#1A2540] border border-[#6382BF]/30 text-[#7B8FAD] hover:text-[#E8ECF4] transition-colors"
                  title="Settings"
                >
                  <Settings size={14} />
                </button>
              )}
              <button
                type="button"
                onClick={() => onOpenAuth('signin')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#4A7BF7] hover:bg-[#3D6CE0] text-white font-semibold shadow-sm transition-colors"
              >
                <UserIcon size={13} />
                <span className="hidden sm:inline">Sign In</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
