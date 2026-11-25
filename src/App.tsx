import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, Variants } from 'motion/react';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { PapersView } from './components/PapersView';
import { MockSetsView } from './components/MockSetsView';
import { SplitPdfModal } from './components/SplitPdfModal';
import { GradeBoundariesModal } from './components/GradeBoundariesModal';
import { FormulaBookletModal } from './components/FormulaBookletModal';
import { InteractiveExamRunner } from './components/InteractiveExamRunner';
import { TopicPracticeView } from './components/TopicPracticeView';
import { ExamTimerModal } from './components/ExamTimerModal';
import { DashboardView } from './components/DashboardView';
import { AuthModal } from './components/AuthModal';
import { useAuth } from './context/AuthContext';
import {
  readLocalDoneMap,
  writeLocalDoneMap,
  persistPaperStatusToCloud,
} from './utils/progressSync';
import { getInteractivePaper, InteractivePaper } from './data/interactiveQuestions';
import { prewarmTopicIndex } from './data/questionIndex';
import { PaperEntry, ModuleSection } from './data/papersData';
import { ExamAttempt } from './types';
import { applyTheme, applyFont } from './utils/theme';
import { Sigma, BarChart3, ListFilter, CheckCircle2, X } from 'lucide-react';

const TAB_INDEX_MAP: Record<string, number> = {
  home: 0,
  dashboard: 0,
  maths: 1,
  'further-maths': 1,
  'more-papers': 1,
  'mock-sets': 2,
  topics: 3,
  formulae: 4,
  boundaries: 5,
};

const pageVariants: Variants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 18 : -18,
  }),
  center: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.24,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -18 : 18,
    transition: {
      duration: 0.2,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export default function App() {
  const { user, loading, verifiedNotice, dismissVerifiedNotice } = useAuth();
  const [authModalView, setAuthModalView] = useState<'signin' | 'signup' | null>(null);
  const prevUserIdRef = useRef<string | null>(null);
  const didInitialAuthRouteRef = useRef(false);

  const [currentTab, setCurrentTab] = useState<
    'home' | 'maths' | 'further-maths' | 'more-papers' | 'mock-sets' | 'topics' | 'dashboard' | 'formulae' | 'boundaries'
  >('home');
  const [previousTab, setPreviousTab] = useState<
    'home' | 'maths' | 'further-maths' | 'more-papers' | 'mock-sets' | 'topics' | 'dashboard'
  >('home');
  const [tabDirection, setTabDirection] = useState<number>(1);
  const [activeModuleId, setActiveModuleId] = useState<string>('p1');
  const pendingScrollTopRef = useRef(false);

  // Centralized tab navigation with directional tracking & smooth post-exit scroll reset
  const navigateToTab = (
    nextTab: typeof currentTab,
    options?: { scrollToTop?: boolean }
  ) => {
    const prevIdx = TAB_INDEX_MAP[currentTab] ?? 1;
    const nextIdx = TAB_INDEX_MAP[nextTab] ?? 1;
    if (nextIdx !== prevIdx) {
      setTabDirection(nextIdx > prevIdx ? 1 : -1);
    }
    if (options?.scrollToTop) {
      pendingScrollTopRef.current = true;
    }
    setCurrentTab(nextTab);
  };

  // Initialize Midnight theme, Manrope font, tab title, and idle topic index warm-up
  useEffect(() => {
    document.title = 'matheseus.';
    applyTheme('midnight');
    applyFont('manrope');

    // Build question/topic index when idle so switching to By Topic is instant
    const ric = (window as unknown as { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number }).requestIdleCallback;
    const cancelRic = (window as unknown as { cancelIdleCallback?: (id: number) => void }).cancelIdleCallback;
    if (ric) {
      const id = ric(() => prewarmTopicIndex(), { timeout: 1200 });
      return () => cancelRic?.(id);
    }
    const timer = window.setTimeout(() => prewarmTopicIndex(), 600);
    return () => window.clearTimeout(timer);
  }, []);

  // Route signed-in users to Dashboard initially/on login, and back to Home on sign out
  useEffect(() => {
    if (loading) return;
    const prevId = prevUserIdRef.current;
    const currId = user?.id ?? null;

    if (!didInitialAuthRouteRef.current) {
      didInitialAuthRouteRef.current = true;
      if (currId && currentTab === 'home') {
        setCurrentTab('dashboard');
      }
    } else if (!prevId && currId) {
      navigateToTab('dashboard', { scrollToTop: true });
    } else if (prevId && !currId) {
      navigateToTab('home', { scrollToTop: true });
    }

    prevUserIdRef.current = currId;
  }, [loading, user]);

  const handleOpenScreen = (screen: 'formulae' | 'boundaries') => {
    if (currentTab !== 'formulae' && currentTab !== 'boundaries') {
      setPreviousTab(currentTab);
    }
    navigateToTab(screen, { scrollToTop: true });
  };

  const handleCloseScreen = () => {
    navigateToTab(previousTab || 'home', { scrollToTop: true });
  };

  // Modals
  const [pdfModal, setPdfModal] = useState<{
    title: string;
    qpUrl: string;
    msUrl?: string;
    mode: 'split' | 'single' | 'qp' | 'ms';
    isPractice?: boolean;
    paperId?: string;
    durationMinutes?: number;
    totalMarks?: number;
  } | null>(null);

  const [activeInteractivePaper, setActiveInteractivePaper] = useState<InteractivePaper | null>(null);
  const [topicsInitialLevel, setTopicsInitialLevel] = useState<'all' | 'as' | 'a2'>('all');
  const [showTimerModal, setShowTimerModal] = useState(false);

  // Completed tracking (synced with localStorage + Supabase when logged in)
  const [completedMap, setCompletedMap] = useState<Record<string, boolean>>(() =>
    readLocalDoneMap()
  );

  useEffect(() => {
    const syncDoneFromStorage = () => {
      setCompletedMap(readLocalDoneMap());
    };
    window.addEventListener('matheseus_done_updated', syncDoneFromStorage);
    window.addEventListener('matheseus_sync_updated', syncDoneFromStorage);
    return () => {
      window.removeEventListener('matheseus_done_updated', syncDoneFromStorage);
      window.removeEventListener('matheseus_sync_updated', syncDoneFromStorage);
    };
  }, []);

  const handleToggleCompleted = (paperId: string) => {
    setCompletedMap((prev) => {
      const nextVal = !prev[paperId];
      const next = { ...prev, [paperId]: nextVal };
      writeLocalDoneMap(next);
      void persistPaperStatusToCloud(paperId, nextVal);
      return next;
    });
  };

  const handleSelectSubject = (
    subject: 'maths' | 'further-maths' | 'more-papers',
    moduleId?: string
  ) => {
    const isPastPapersView =
      currentTab === 'maths' ||
      currentTab === 'further-maths' ||
      currentTab === 'more-papers';
    navigateToTab(subject, { scrollToTop: !isPastPapersView });
    if (moduleId) {
      setActiveModuleId(moduleId);
    } else {
      if (subject === 'maths') setActiveModuleId('p1');
      else if (subject === 'further-maths') setActiveModuleId('cp1');
      else setActiveModuleId('more-al-cp1');
    }
  };

  const [practiceConfig, setPracticeConfig] = useState<{
    reviewMode?: boolean;
    questionIndex?: number;
    attempt?: ExamAttempt;
  }>({});

  const handleLaunchPractice = (
    paper: PaperEntry,
    module: ModuleSection,
    initialReviewMode?: boolean,
    initialQIndex?: number,
    initialAttempt?: ExamAttempt
  ) => {
    // Launch actual digital Practice Mode for all papers with module-matched questions
    const isSample = paper.year === 'Sample';
    const seriesLabel = isSample
      ? 'Sample Paper'
      : paper.season === 'Sample' || !paper.season
        ? `${paper.year}`
        : `${paper.season} ${paper.year}`;
    const displayTitle = `${seriesLabel} · ${module.title} (${module.code})`;
    const interactive = getInteractivePaper(
      paper.id,
      displayTitle,
      module.code,
      paper.year,
      paper.season,
      module.id,
      module.subject
    );
    interactive.qpUrl = paper.qpUrl;
    interactive.msUrl = paper.msUrl;
    interactive.erUrl = paper.erUrl;
    setPracticeConfig({
      reviewMode: initialReviewMode,
      questionIndex: initialQIndex,
      attempt: initialAttempt,
    });
    setActiveInteractivePaper(interactive);
  };

  const handleSaveScore = (paperId: string) => {
    setCompletedMap((prev) => {
      const next = { ...prev, [paperId]: true };
      writeLocalDoneMap(next);
      void persistPaperStatusToCloud(paperId, true);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-[#0F1729] text-[#E8ECF4] flex flex-col font-sans selection:bg-[#4A7BF7]/30 selection:text-[#E8ECF4]">
      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        onNavigate={(tab) => {
          const isCurrentPastPapers =
            currentTab === 'maths' ||
            currentTab === 'further-maths' ||
            currentTab === 'more-papers';
          const isTargetPastPapers =
            tab === 'maths' ||
            tab === 'further-maths' ||
            tab === 'more-papers';
          navigateToTab(tab, { scrollToTop: !(isCurrentPastPapers && isTargetPastPapers) });
          if (tab === 'maths') setActiveModuleId('p1');
          if (tab === 'further-maths') setActiveModuleId('cp1');
          if (tab === 'more-papers') setActiveModuleId('more-al-cp1');
        }}
        onOpenBoundaries={() => handleOpenScreen('boundaries')}
        onOpenFormulas={() => handleOpenScreen('formulae')}
        onOpenAuth={(mode) => setAuthModalView(mode || 'signin')}
        onOpenTimer={() => setShowTimerModal(true)}
      />

      {/* Email Verified Confirmation Toast */}
      <AnimatePresence>
        {verifiedNotice && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="bg-emerald-500/15 border-b border-emerald-500/30 px-4 py-2.5 text-xs text-emerald-200"
          >
            <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                <span>Email verified. Your exam progress is synced.</span>
              </div>
              <button
                type="button"
                onClick={dismissVerifiedNotice}
                className="text-emerald-300 hover:text-white p-1"
              >
                <X size={13} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main View with Fluid Screen Transitions */}
      <AnimatePresence
        mode="wait"
        custom={tabDirection}
        initial={false}
        onExitComplete={() => {
          if (pendingScrollTopRef.current) {
            pendingScrollTopRef.current = false;
            window.scrollTo({ top: 0, behavior: 'instant' });
          }
        }}
      >
        <motion.main
          key={
            currentTab === 'maths' ||
            currentTab === 'further-maths' ||
            currentTab === 'more-papers'
              ? 'past-papers'
              : currentTab
          }
          custom={tabDirection}
          variants={pageVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="flex-1 flex flex-col w-full overflow-x-hidden"
        >
          {currentTab === 'home' ? (
            <HomePage
              onSelectSubject={handleSelectSubject}
              onOpenMocks={() => navigateToTab('mock-sets', { scrollToTop: true })}
              onOpenFormulas={() => handleOpenScreen('formulae')}
              onOpenBoundaries={() => handleOpenScreen('boundaries')}
              onOpenTopics={(level) => {
                setTopicsInitialLevel(level || 'all');
                navigateToTab('topics', { scrollToTop: true });
              }}
            />
          ) : currentTab === 'topics' ? (
            <TopicPracticeView
              initialLevel={topicsInitialLevel}
              onOpenPracticeInteractive={(paper, reviewMode, qIndex) => {
                setPracticeConfig({
                  reviewMode,
                  questionIndex: qIndex,
                });
                setActiveInteractivePaper(paper);
              }}
            />
          ) : currentTab === 'mock-sets' ? (
            <MockSetsView
              onOpenSplitView={(title, qpUrl, msUrl) =>
                setPdfModal({ title, qpUrl, msUrl, mode: 'split' })
              }
              onOpenSingleDoc={(title, url) =>
                setPdfModal({ title, qpUrl: url, mode: 'single' })
              }
              onOpenPractice={handleLaunchPractice}
              completedMap={completedMap}
              onToggleCompleted={handleToggleCompleted}
            />
          ) : currentTab === 'dashboard' ? (
            <DashboardView
              completedMap={completedMap}
              onOpenAuth={(mode) => setAuthModalView(mode || 'signin')}
              onNavigateModule={(subject, moduleId) => {
                if (subject === 'mock-sets') {
                  navigateToTab('mock-sets', { scrollToTop: true });
                } else {
                  handleSelectSubject(subject, moduleId);
                }
              }}
              onLaunchPaper={handleLaunchPractice}
              onOpenSingleDoc={(title, url) =>
                setPdfModal({ title, qpUrl: url, mode: 'single' })
              }
            />
          ) : currentTab === 'formulae' ? (
            <FormulaBookletModal
              mode="page"
              onClose={handleCloseScreen}
            />
          ) : currentTab === 'boundaries' ? (
            <GradeBoundariesModal
              mode="page"
              onClose={handleCloseScreen}
            />
          ) : (
            <PapersView
              currentSubject={currentTab}
              onSelectSubject={(subj) => handleSelectSubject(subj)}
              activeModuleId={activeModuleId}
              onSelectModule={setActiveModuleId}
              onOpenSplitView={(title, qpUrl, msUrl) =>
                setPdfModal({ title, qpUrl, msUrl, mode: 'split' })
              }
              onOpenSingleDoc={(title, url) =>
                setPdfModal({ title, qpUrl: url, mode: 'single' })
              }
              onOpenPractice={handleLaunchPractice}
              completedMap={completedMap}
              onToggleCompleted={handleToggleCompleted}
            />
          )}
        </motion.main>
      </AnimatePresence>

      {/* Footer */}
      <footer className="border-t border-[#6382BF]/20 bg-[#1A2540] py-6 text-xs text-[#7B8FAD]">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <img
              src="/logo.png"
              alt="matheseus."
              className="w-5 h-5 rounded-md object-cover shadow-sm ring-1 ring-white/10"
            />
            <span className="font-serif font-semibold text-[#E8ECF4]">matheseus.</span>
            <span className="text-[#6382BF]/50">·</span>
            <span>Edexcel Maths & Further Maths</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                navigateToTab('topics', { scrollToTop: true });
              }}
              className="hover:text-[#E8ECF4] transition-colors flex items-center gap-1.5"
            >
              <ListFilter size={13} className="text-[#4A7BF7]" />
              <span>Questions by Topic</span>
            </button>
            <button
              onClick={() => handleOpenScreen('formulae')}
              className="hover:text-[#E8ECF4] transition-colors flex items-center gap-1.5"
            >
              <Sigma size={13} className="text-[#7B8FAD]" />
              <span>Formula Booklets</span>
            </button>
            <button
              onClick={() => handleOpenScreen('boundaries')}
              className="hover:text-[#E8ECF4] transition-colors flex items-center gap-1.5"
            >
              <BarChart3 size={13} className="text-[#7B8FAD]" />
              <span>Grade Boundaries</span>
            </button>
          </div>
        </div>
      </footer>

      {/* Interactive Question-by-Question Exam Runner (for papers with digitized questions) */}
      <AnimatePresence>
        {activeInteractivePaper && (
          <motion.div
            key={`${activeInteractivePaper.id}_${practiceConfig.reviewMode ? 'review' : 'practice'}`}
            initial={{ opacity: 0, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.985 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 bg-[#0F1729]"
          >
            <InteractiveExamRunner
              paper={activeInteractivePaper}
              initialReviewMode={practiceConfig.reviewMode}
              initialQuestionIndex={practiceConfig.questionIndex}
              initialAttempt={practiceConfig.attempt}
              onClose={() => {
                setActiveInteractivePaper(null);
                setPracticeConfig({});
              }}
              onSaveResult={handleSaveScore}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* PDF Modal (Split, Single, or Exam Practice View) */}
      <AnimatePresence>
        {pdfModal && (
          <motion.div
            key={pdfModal.title}
            initial={{ opacity: 0, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.985 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 bg-[#0F1729]"
          >
            <SplitPdfModal
              title={pdfModal.title}
              qpUrl={pdfModal.qpUrl}
              msUrl={pdfModal.msUrl}
              initialMode={pdfModal.mode}
              isPractice={pdfModal.isPractice}
              paperId={pdfModal.paperId}
              durationMinutes={pdfModal.durationMinutes}
              totalMarks={pdfModal.totalMarks}
              onSaveScore={handleSaveScore}
              onClose={() => setPdfModal(null)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Standalone Exam Timer Modal */}
      <AnimatePresence>
        {showTimerModal && (
          <motion.div
            key="timer-modal"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50"
          >
            <ExamTimerModal onClose={() => setShowTimerModal(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Authentication Modal */}
      <AnimatePresence>
        {authModalView && (
          <AuthModal
            initialView={authModalView}
            onClose={() => setAuthModalView(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
