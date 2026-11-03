import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { PapersView } from './components/PapersView';
import { SplitPdfModal } from './components/SplitPdfModal';
import { GradeBoundariesModal } from './components/GradeBoundariesModal';
import { FormulaBookletModal } from './components/FormulaBookletModal';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'home' | 'maths' | 'further-maths'>('home');
  const [activeModuleId, setActiveModuleId] = useState<string>('p1');

  // Modals
  const [pdfModal, setPdfModal] = useState<{
    title: string;
    qpUrl: string;
    msUrl?: string;
    mode: 'split' | 'single';
  } | null>(null);

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

  return (
    <div className="min-h-screen bg-black text-zinc-100 flex flex-col font-sans">
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
            completedMap={completedMap}
            onToggleCompleted={handleToggleCompleted}
          />
        )}
      </main>

      {/* Minimal Footer */}
      <footer className="border-t border-zinc-800 bg-zinc-950 py-6 text-xs text-zinc-500">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <span className="font-semibold text-zinc-300">matheseus</span>
            <span className="mx-2">·</span>
            <span>Edexcel Past Papers</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setShowFormulasModal(true)} className="hover:text-zinc-300">
              Formula Booklets
            </button>
            <button onClick={() => setShowBoundariesModal(true)} className="hover:text-zinc-300">
              Grade Boundaries
            </button>
          </div>
        </div>
      </footer>

      {/* PDF Modal */}
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
