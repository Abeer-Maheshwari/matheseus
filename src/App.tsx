import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { PapersView } from './components/PapersView';
import { SplitPdfModal } from './components/SplitPdfModal';
import { GradeBoundariesModal } from './components/GradeBoundariesModal';
import { FormulaBookletModal } from './components/FormulaBookletModal';
import { InteractiveExamRunner } from './components/InteractiveExamRunner';
import { getInteractivePaper, InteractivePaper } from './data/interactiveQuestions';
import { getStoredTheme, applyTheme, ThemeId, getStoredFont, applyFont, FontId } from './utils/theme';
import { Sigma, BarChart3 } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'home' | 'maths' | 'further-maths'>('home');
  const [activeModuleId, setActiveModuleId] = useState<string>('p1');
  const [currentTheme, setCurrentTheme] = useState<ThemeId>(() => getStoredTheme());
  const [currentFont, setCurrentFont] = useState<FontId>(() => getStoredFont());

  // Initialize theme and font on mount
  useEffect(() => {
    applyTheme(currentTheme);
  }, [currentTheme]);

  useEffect(() => {
    applyFont(currentFont);
  }, [currentFont]);

  const handleSelectTheme = (theme: ThemeId) => {
    setCurrentTheme(theme);
    applyTheme(theme);
  };

  const handleSelectFont = (font: FontId) => {
    setCurrentFont(font);
    applyFont(font);
  };

  // Modals
  const [pdfModal, setPdfModal] = useState<{
    title: string;
    qpUrl: string;
    msUrl?: string;
    mode: 'split' | 'single';
  } | null>(null);

  const [activeInteractivePaper, setActiveInteractivePaper] = useState<InteractivePaper | null>(null);
  const [showBoundariesModal, setShowBoundariesModal] = useState(false);
  const [showFormulasModal, setShowFormulasModal] = useState(false);

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

  const handleLaunchInteractive = (paperId: string, title: string, code: string) => {
    const paper = getInteractivePaper(paperId, title, code);
    setActiveInteractivePaper(paper);
  };

  const handleSaveInteractiveScore = (paperId: string, score: number, maxScore: number) => {
    setCompletedMap((prev) => ({
      ...prev,
      [paperId]: true,
    }));
  };

  return (
    <div className="min-h-screen bg-[#2C2620] text-[#FAF6F0] flex flex-col font-sans selection:bg-[#865D36]/40 selection:text-[#FAF6F0]">
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
        currentTheme={currentTheme}
        onSelectTheme={handleSelectTheme}
        currentFont={currentFont}
        onSelectFont={handleSelectFont}
      />

      {/* Main View */}
      <main className="flex-1">
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
            onOpenInteractive={handleLaunchInteractive}
            completedMap={completedMap}
            onToggleCompleted={handleToggleCompleted}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#93785B]/25 bg-[#3E362E] py-6 text-xs text-[#AC8968]">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-serif font-semibold text-[#FAF6F0]">matheseus</span>
            <span className="text-[#93785B]">·</span>
            <span>Edexcel A Level & Further Maths Past Papers Archive</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowFormulasModal(true)}
              className="hover:text-[#FAF6F0] transition-colors flex items-center gap-1.5"
            >
              <Sigma size={13} className="text-[#865D36]" />
              <span>Formula Booklets</span>
            </button>
            <button
              onClick={() => setShowBoundariesModal(true)}
              className="hover:text-[#FAF6F0] transition-colors flex items-center gap-1.5"
            >
              <BarChart3 size={13} className="text-[#AC8968]" />
              <span>Grade Boundaries</span>
            </button>
          </div>
        </div>
      </footer>

      {/* Interactive Question-by-Question Exam Runner */}
      {activeInteractivePaper && (
        <InteractiveExamRunner
          paper={activeInteractivePaper}
          onClose={() => setActiveInteractivePaper(null)}
          onSaveResult={handleSaveInteractiveScore}
        />
      )}

      {/* PDF Modal (Split or Single View) */}
      {pdfModal && (
        <SplitPdfModal
          title={pdfModal.title}
          qpUrl={pdfModal.qpUrl}
          msUrl={pdfModal.msUrl}
          initialMode={pdfModal.mode}
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
    </div>
  );
}
