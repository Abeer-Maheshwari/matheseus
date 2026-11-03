import React, { useState, useEffect, useMemo } from 'react';
import { PAST_PAPERS_DATA } from './data/papersData';
import { PastPaper, QualificationType, PaperProgress } from './types';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PaperCard } from './components/PaperCard';
import { PaperTableView } from './components/PaperTableView';
import { SplitPdfModal } from './components/SplitPdfModal';
import { ExamTimerModal } from './components/ExamTimerModal';
import { GradeBoundariesModal } from './components/GradeBoundariesModal';
import { FormulaBookletModal } from './components/FormulaBookletModal';
import { ProgressTrackerModal } from './components/ProgressTrackerModal';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedQual, setSelectedQual] = useState<QualificationType | 'all'>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'unattempted'>('all');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');

  // Modals
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
      if (selectedQual !== 'all' && p.qualification !== selectedQual) return false;
      if (selectedYear !== 'all' && String(p.year) !== selectedYear) return false;

      const prog = progressMap[p.id];
      const isDone = prog?.status === 'completed';
      if (statusFilter === 'completed' && !isDone) return false;
      if (statusFilter === 'unattempted' && isDone) return false;

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

  const handleToggleStatus = (paperId: string, currentStatus: string) => {
    setProgressMap((prev) => {
      const nextStatus = currentStatus === 'completed' 
        ? 'not_started' 
        : currentStatus === 'in_progress' 
          ? 'completed' 
          : 'in_progress';

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
    <div className="min-h-screen bg-black text-zinc-100 flex flex-col font-sans">
      {/* Navigation */}
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

      {/* Header and Filter Controls */}
      <Hero
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedQual={selectedQual}
        onSelectQual={setSelectedQual}
        selectedYear={selectedYear}
        onSelectYear={setSelectedYear}
        yearsList={yearsList}
        totalPapersCount={PAST_PAPERS_DATA.length}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Results count & status filter */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white">
              {filteredPapers.length} {filteredPapers.length === 1 ? 'paper' : 'papers'}
            </span>
            {selectedQual !== 'all' && (
              <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono text-[11px]">
                {selectedQual}
              </span>
            )}
          </div>

          <div className="flex items-center bg-zinc-900 p-0.5 rounded border border-zinc-800">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-2.5 py-1 rounded font-medium ${
                statusFilter === 'all' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setStatusFilter('unattempted')}
              className={`px-2.5 py-1 rounded font-medium ${
                statusFilter === 'unattempted' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Unattempted
            </button>
            <button
              onClick={() => setStatusFilter('completed')}
              className={`px-2.5 py-1 rounded font-medium ${
                statusFilter === 'completed' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Completed ({completedCount})
            </button>
          </div>
        </div>

        {/* Papers View: Table or Grid */}
        {filteredPapers.length === 0 ? (
          <div className="text-center py-16 rounded border border-zinc-800 bg-zinc-950 p-6 text-xs text-zinc-400">
            <p className="mb-2 text-zinc-300 font-medium">No past papers match current filter criteria.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedQual('all');
                setSelectedYear('all');
                setStatusFilter('all');
              }}
              className="px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded border border-zinc-700 font-medium"
            >
              Reset Filters
            </button>
          </div>
        ) : viewMode === 'table' ? (
          <PaperTableView
            papers={filteredPapers}
            progressMap={progressMap}
            onOpenSplitView={(p) => setActiveSplitPaper({ paper: p, initialMode: 'split' })}
            onOpenSingleDoc={(p, type) => setActiveSplitPaper({ paper: p, initialMode: type })}
            onStartExam={(p) => {
              setActiveTimerPaper(p);
              setShowTimerModal(true);
            }}
            onToggleStatus={handleToggleStatus}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
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
      </main>

      {/* Clean, minimalist footer */}
      <footer className="border-t border-zinc-800 bg-zinc-950 py-6 text-xs text-zinc-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-zinc-300">matheseus</span>
            <span>·</span>
            <span>Pearson Edexcel Mathematics archive</span>
          </div>

          <div className="flex items-center gap-4 text-zinc-400">
            <button onClick={() => setShowFormulasModal(true)} className="hover:text-zinc-200">
              Formulae
            </button>
            <button onClick={() => setShowBoundariesModal(true)} className="hover:text-zinc-200">
              Boundaries
            </button>
            <button onClick={() => setShowTimerModal(true)} className="hover:text-zinc-200">
              Timer
            </button>
            <button onClick={() => setShowTrackerModal(true)} className="hover:text-zinc-200">
              Tracker
            </button>
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
