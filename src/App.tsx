import React, { useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  BookOpen, 
  HelpCircle, 
  Layers, 
  Flame, 
  ExternalLink,
  GraduationCap,
  ShieldCheck,
  CheckCircle2,
  FolderSync
} from 'lucide-react';

import { PAST_PAPERS_DATA } from './data/papersData';
import { PastPaper, QualificationType, PaperProgress } from './types';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PaperCard } from './components/PaperCard';
import { SplitPdfModal } from './components/SplitPdfModal';
import { ExamTimerModal } from './components/ExamTimerModal';
import { GradeBoundariesModal } from './components/GradeBoundariesModal';
import { FormulaBookletModal } from './components/FormulaBookletModal';
import { ProgressTrackerModal } from './components/ProgressTrackerModal';

export default function App() {
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedQual, setSelectedQual] = useState<QualificationType | 'all'>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'unattempted'>('all');

  // Modal States
  const [activeSplitPaper, setActiveSplitPaper] = useState<{
    paper: PastPaper;
    initialMode: 'split' | 'qp' | 'ms' | 'er' | 'ma';
  } | null>(null);

  const [activeTimerPaper, setActiveTimerPaper] = useState<PastPaper | null>(null);
  const [showTimerModal, setShowTimerModal] = useState(false);
  const [showBoundariesModal, setShowBoundariesModal] = useState(false);
  const [showFormulasModal, setShowFormulasModal] = useState(false);
  const [showTrackerModal, setShowTrackerModal] = useState(false);

  // LocalStorage User Progress
  const [progressMap, setProgressMap] = useState<Record<string, PaperProgress>>(() => {
    try {
      const saved = localStorage.getItem('matheseus_progress');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('matheseus_progress', JSON.stringify(progressMap));
    } catch (e) {
      console.warn('Failed to save progress to localStorage', e);
    }
  }, [progressMap]);

  // Derived list of years for filter pills
  const yearsList = useMemo(() => {
    const years = Array.from(new Set(PAST_PAPERS_DATA.map((p) => p.year)));
    return years.sort((a, b) => {
      if (typeof a === 'number' && typeof b === 'number') return b - a;
      return String(b).localeCompare(String(a));
    });
  }, []);

  // Filtered papers
  const filteredPapers = useMemo(() => {
    return PAST_PAPERS_DATA.filter((p) => {
      // Qualification filter
      if (selectedQual !== 'all' && p.qualification !== selectedQual) return false;

      // Year filter
      if (selectedYear !== 'all' && String(p.year) !== selectedYear) return false;

      // Status filter
      const prog = progressMap[p.id];
      const isDone = prog?.status === 'completed';
      if (statusFilter === 'completed' && !isDone) return false;
      if (statusFilter === 'unattempted' && isDone) return false;

      // Text search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesCode = p.code.toLowerCase().includes(query);
        const matchesTitle = p.title.toLowerCase().includes(query);
        const matchesYear = String(p.year).toLowerCase().includes(query);
        const matchesSeason = p.season.toLowerCase().includes(query);
        const matchesTopics = p.topics.some((t) => t.toLowerCase().includes(query));
        const matchesQual = p.qualificationName.toLowerCase().includes(query);

        if (!matchesCode && !matchesTitle && !matchesYear && !matchesSeason && !matchesTopics && !matchesQual) {
          return false;
        }
      }

      return true;
    });
  }, [selectedQual, selectedYear, statusFilter, searchQuery, progressMap]);

  // Handler: Status toggle
  const handleToggleStatus = (paperId: string, currentStatus: string) => {
    setProgressMap((prev) => {
      const nextStatus = currentStatus === 'completed' 
        ? 'not_started' 
        : currentStatus === 'in_progress' 
          ? 'completed' 
          : 'in_progress';
      
      if (nextStatus === 'completed') {
        confetti({
          particleCount: 50,
          spread: 50,
          origin: { y: 0.8 }
        });
      }

      const existing = prev[paperId] || { paperId, maxScore: 100 };
      return {
        ...prev,
        [paperId]: {
          ...existing,
          status: nextStatus,
          dateCompleted: nextStatus === 'completed' ? new Date().toISOString() : existing.dateCompleted,
        },
      };
    });
  };

  // Handler: Save score
  const handleSaveScore = (paperId: string, score: number, maxScore: number) => {
    setProgressMap((prev) => {
      const existing = prev[paperId] || { paperId, status: 'completed', maxScore };
      return {
        ...prev,
        [paperId]: {
          ...existing,
          status: 'completed',
          score,
          maxScore,
          dateCompleted: new Date().toISOString(),
        },
      };
    });
  };

  const completedCount = Object.values(progressMap).filter((p) => p.status === 'completed').length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Top Navbar */}
      <Navbar
        onOpenTimer={() => {
          setActiveTimerPaper(null);
          setShowTimerModal(true);
        }}
        onOpenBoundaries={() => setShowBoundariesModal(true)}
        onOpenFormulas={() => setShowFormulasModal(true)}
        onOpenTracker={() => setShowTrackerModal(true)}
        completedCount={completedCount}
        totalPapers={PAST_PAPERS_DATA.length}
      />

      {/* Hero Header with Search and Qualification selectors */}
      <Hero
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedQual={selectedQual}
        onSelectQual={setSelectedQual}
        selectedYear={selectedYear}
        onSelectYear={setSelectedYear}
        yearsList={yearsList}
        totalPapersCount={PAST_PAPERS_DATA.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Status filter & Count info */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-white">
              {filteredPapers.length} {filteredPapers.length === 1 ? 'Paper' : 'Papers'} Found
            </span>
            {selectedQual !== 'all' && (
              <span className="text-xs px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-medium">
                {selectedQual === 'a-level-maths' && 'A Level Maths (9MA0)'}
                {selectedQual === 'a-level-further-maths' && 'Further Maths (9FM0)'}
                {selectedQual === 'as-maths' && 'AS Maths (8MA0)'}
                {selectedQual === 'as-further-maths' && 'AS Further Maths (8FM0)'}
                {selectedQual === 'legacy-modular' && 'Legacy Modular (C1-C4, M1, S1, FP1)'}
              </span>
            )}
          </div>

          {/* Quick status tabs */}
          <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1 rounded-lg font-medium transition ${
                statusFilter === 'all'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setStatusFilter('unattempted')}
              className={`px-3 py-1 rounded-lg font-medium transition ${
                statusFilter === 'unattempted'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              To Do
            </button>
            <button
              onClick={() => setStatusFilter('completed')}
              className={`px-3 py-1 rounded-lg font-medium transition ${
                statusFilter === 'completed'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Completed ({completedCount})
            </button>
          </div>
        </div>

        {/* Papers Grid */}
        {filteredPapers.length === 0 ? (
          <div className="text-center py-20 rounded-3xl bg-slate-900/30 border border-slate-800/80 p-8">
            <p className="text-slate-400 text-base mb-2 font-medium">
              No past papers matched your criteria.
            </p>
            <p className="text-slate-400 text-xs mb-4">
              Try adjusting your search query, selecting "All Years", or clearing the filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedQual('all');
                setSelectedYear('all');
                setStatusFilter('all');
              }}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl transition"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredPapers.map((paper) => (
              <PaperCard
                key={paper.id}
                paper={paper}
                progress={progressMap[paper.id]}
                onOpenSplitView={(p) => setActiveSplitPaper({ paper: p, initialMode: 'split' })}
                onOpenSingleDoc={(p, type) => setActiveSplitPaper({ paper: p, initialMode: type })}
                onStartExam={(p) => {
                  setActiveTimerPaper(p);
                  setShowTimerModal(true);
                }}
                onToggleStatus={handleToggleStatus}
                onUpdateScore={handleSaveScore}
              />
            ))}
          </div>
        )}

        {/* Informative Tip Cards Banner */}
        <section className="mt-14 pt-10 border-t border-slate-900 grid grid-cols-1 md:grid-cols-3 gap-5 text-xs text-slate-400">
          <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800/80">
            <div className="flex items-center gap-2 mb-2 text-indigo-400 font-bold">
              <GraduationCap className="w-4 h-4" />
              <span>Exam Technique Tip</span>
            </div>
            <p className="leading-relaxed">
              In Edexcel Pure papers (9MA0/01 and 9MA0/02), questions often combine topics (e.g. calculus with trig identities or proof by contradiction with logarithms). Practice whole papers under timed conditions rather than isolated questions.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800/80">
            <div className="flex items-center gap-2 mb-2 text-cyan-400 font-bold">
              <FolderSync className="w-4 h-4" />
              <span>Side-by-Side Split View</span>
            </div>
            <p className="leading-relaxed">
              Click the <strong className="text-slate-300">Split View</strong> button on any paper card to open the Question Paper alongside the official Mark Scheme. You can review your steps question-by-question without switching tabs.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800/80">
            <div className="flex items-center gap-2 mb-2 text-amber-400 font-bold">
              <Flame className="w-4 h-4" />
              <span>The Goldmine Legacy Vault</span>
            </div>
            <p className="leading-relaxed">
              Running out of new-spec papers? Switch to <strong className="text-slate-300">Legacy Vault</strong>. Edexcel C3 and C4 contain some of the highest quality integration, vectors, and trigonometry questions ever written.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-slate-900 bg-slate-950 py-10 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center font-bold text-indigo-400 text-xs">
              μ
            </div>
            <span className="font-bold text-slate-300">matheseus</span>
            <span>— The open Edexcel A Level Maths portal</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <button onClick={() => setShowFormulasModal(true)} className="hover:text-slate-200">
              Formulae
            </button>
            <button onClick={() => setShowBoundariesModal(true)} className="hover:text-slate-200">
              Boundaries
            </button>
            <button onClick={() => setShowTimerModal(true)} className="hover:text-slate-200">
              Exam Timer
            </button>
            <span>•</span>
            <span className="text-slate-400">Designed for Maths Students</span>
          </div>
        </div>
      </footer>

      {/* Split PDF Modal */}
      {activeSplitPaper && (
        <SplitPdfModal
          paper={activeSplitPaper.paper}
          initialMode={activeSplitPaper.initialMode}
          onClose={() => setActiveSplitPaper(null)}
          onSaveScore={handleSaveScore}
          currentScore={progressMap[activeSplitPaper.paper.id]?.score}
        />
      )}

      {/* Exam Timer Modal */}
      {showTimerModal && (
        <ExamTimerModal
          paper={activeTimerPaper}
          onClose={() => setShowTimerModal(false)}
          onOpenPaper={(p) => {
            setShowTimerModal(false);
            setActiveSplitPaper({ paper: p, initialMode: 'qp' });
          }}
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

      {/* Progress Tracker Modal */}
      {showTrackerModal && (
        <ProgressTrackerModal
          papers={PAST_PAPERS_DATA}
          progressMap={progressMap}
          onClose={() => setShowTrackerModal(false)}
          onClearProgress={() => setProgressMap({})}
          onOpenPaper={(p) => {
            setShowTrackerModal(false);
            setActiveSplitPaper({ paper: p, initialMode: 'split' });
          }}
        />
      )}
    </div>
  );
}
