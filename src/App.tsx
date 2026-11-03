import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { PapersView } from './components/PapersView';
import { SplitPdfModal } from './components/SplitPdfModal';
import { GradeBoundariesModal } from './components/GradeBoundariesModal';
import { FormulaBookletModal } from './components/FormulaBookletModal';
import { InteractiveExamRunner } from './components/InteractiveExamRunner';
import { ExamTimerModal } from './components/ExamTimerModal';
import { getInteractivePaper, InteractivePaper } from './data/interactiveQuestions';
import { PaperEntry, ModuleSection } from './data/papersData';
import { applyTheme, applyFont } from './utils/theme';
import { Sigma, BarChart3 } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'home' | 'maths' | 'further-maths'>('home');
  const [activeModuleId, setActiveModuleId] = useState<string>('p1');

  // Initialize Midnight theme, Contemporary font, and tab title on mount
  useEffect(() => {
    document.title = 'matheseus.';
    applyTheme('midnight');
    applyFont('space');
  }, []);

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
  const [showBoundariesModal, setShowBoundariesModal] = useState(false);
  const [showFormulasModal, setShowFormulasModal] = useState(false);
  const [showTimerModal, setShowTimerModal] = useState(false);

  // Completed tracking
  const [completedMap, setCompletedMap] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('matheseus_done');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('matheseus_done', JSON.stringify(completedMap));
    } catch (e) {
      console.warn('Failed to save to localStorage', e);
    }
  }, [completedMap]);

  const handleToggleCompleted = (paperId: string) => {
    setCompletedMap((prev) => ({
      ...prev,
      [paperId]: !prev[paperId],
    }));
  };

  const handleSelectSubject = (subject: 'maths' | 'further-maths', moduleId?: string) => {
    setCurrentTab(subject);
    if (moduleId) {
      setActiveModuleId(moduleId);
    } else {
      setActiveModuleId(subject === 'maths' ? 'p1' : 'cp1');
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleLaunchPractice = (paper: PaperEntry, module: ModuleSection) => {
    // If digitized interactive questions exist for this exact paper
    const interactive = getInteractivePaper(paper.id);
    if (interactive) {
      setActiveInteractivePaper(interactive);
      return;
    }

    // Launch authentic Exam Practice Mode with official paper PDF, timer, and self-marking
    const isFM = module.subject === 'further-maths';
    setPdfModal({
      title: `${paper.season} ${paper.year} · ${module.title} (${module.code})`,
      qpUrl: paper.qpUrl,
      msUrl: paper.msUrl,
      mode: 'qp',
      isPractice: true,
      paperId: paper.id,
      durationMinutes: isFM ? 90 : 120,
      totalMarks: isFM ? 75 : 100,
    });
  };

  const handleSaveScore = (paperId: string) => {
    setCompletedMap((prev) => ({
      ...prev,
      [paperId]: true,
    }));
  };

  return (
    <div className="min-h-screen bg-[#0F1729] text-[#E8ECF4] flex flex-col font-sans selection:bg-[#4A7BF7]/30 selection:text-[#E8ECF4]">
      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        onNavigate={(tab) => {
          setCurrentTab(tab);
          if (tab === 'maths') setActiveModuleId('p1');
          if (tab === 'further-maths') setActiveModuleId('cp1');
        }}
        onOpenBoundaries={() => setShowBoundariesModal(true)}
        onOpenFormulas={() => setShowFormulasModal(true)}
        onOpenTimer={() => setShowTimerModal(true)}
      />

      {/* Main View */}
      <main key={currentTab} className="flex-1 animate-fadeIn">
        {currentTab === 'home' ? (
          <HomePage
            onSelectSubject={handleSelectSubject}
            onOpenFormulas={() => setShowFormulasModal(true)}
            onOpenBoundaries={() => setShowBoundariesModal(true)}
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
      </main>

      {/* Footer */}
      <footer className="border-t border-[#6382BF]/20 bg-[#1A2540] py-6 text-xs text-[#7B8FAD]">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-serif font-semibold text-[#E8ECF4]">matheseus.</span>
            <span className="text-[#6382BF]/50">·</span>
            <span>Edexcel A Level & Further Maths Past Papers Archive</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowFormulasModal(true)}
              className="hover:text-[#E8ECF4] transition-colors flex items-center gap-1.5"
            >
              <Sigma size={13} className="text-[#4A7BF7]" />
              <span>Formula Booklets</span>
            </button>
            <button
              onClick={() => setShowBoundariesModal(true)}
              className="hover:text-[#E8ECF4] transition-colors flex items-center gap-1.5"
            >
              <BarChart3 size={13} className="text-[#7B8FAD]" />
              <span>Grade Boundaries</span>
            </button>
          </div>
        </div>
      </footer>

      {/* Interactive Question-by-Question Exam Runner (for papers with digitized questions) */}
      {activeInteractivePaper && (
        <InteractiveExamRunner
          paper={activeInteractivePaper}
          onClose={() => setActiveInteractivePaper(null)}
          onSaveResult={handleSaveScore}
        />
      )}

      {/* PDF Modal (Split, Single, or Exam Practice View) */}
      {pdfModal && (
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
      )}

      {/* Grade Boundaries Modal */}
      {showBoundariesModal && (
        <GradeBoundariesModal onClose={() => setShowBoundariesModal(false)} />
      )}

      {/* Formula Booklet Modal */}
      {showFormulasModal && (
        <FormulaBookletModal onClose={() => setShowFormulasModal(false)} />
      )}

      {/* Standalone Exam Timer Modal */}
      {showTimerModal && (
        <ExamTimerModal onClose={() => setShowTimerModal(false)} />
      )}
    </div>
  );
}
