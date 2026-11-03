import React from 'react';
import { 
  X, 
  BookmarkCheck, 
  Award, 
  TrendingUp, 
  CheckCircle2, 
  Trash2, 
  FileText,
  Clock
} from 'lucide-react';
import { PastPaper, PaperProgress } from '../types';

interface ProgressTrackerModalProps {
  papers: PastPaper[];
  progressMap: Record<string, PaperProgress>;
  onClose: () => void;
  onClearProgress: () => void;
  onOpenPaper: (paper: PastPaper) => void;
}

export const ProgressTrackerModal: React.FC<ProgressTrackerModalProps> = ({
  papers,
  progressMap,
  onClose,
  onClearProgress,
  onOpenPaper,
}) => {
  const allProgressEntries = Object.values(progressMap);
  const completedEntries = allProgressEntries.filter((p) => p.status === 'completed');
  const inProgressEntries = allProgressEntries.filter((p) => p.status === 'in_progress');

  const scoredEntries = completedEntries.filter((p) => p.score !== undefined);
  const averagePercentage = scoredEntries.length > 0
    ? Math.round(
        scoredEntries.reduce((acc, curr) => acc + ((curr.score! / curr.maxScore) * 100), 0) /
          scoredEntries.length
      )
    : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in text-slate-100">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <BookmarkCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Revision Progress Tracker</h3>
              <p className="text-xs text-slate-400">Personal past paper checklist & score log</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Top Summary Cards */}
        <div className="p-6 grid grid-cols-3 gap-3 bg-slate-950/40 border-b border-slate-800 shrink-0">
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-center">
            <span className="text-[11px] font-semibold text-slate-400 block mb-1">Completed</span>
            <span className="text-2xl font-black text-emerald-400 font-mono">
              {completedEntries.length}
            </span>
            <span className="text-[10px] text-slate-400 block mt-0.5">
              of {papers.length} papers
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-center">
            <span className="text-[11px] font-semibold text-slate-400 block mb-1">In Progress</span>
            <span className="text-2xl font-black text-amber-400 font-mono">
              {inProgressEntries.length}
            </span>
            <span className="text-[10px] text-slate-400 block mt-0.5">currently tackling</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-center">
            <span className="text-[11px] font-semibold text-slate-400 block mb-1">Avg Score</span>
            <span className="text-2xl font-black text-indigo-400 font-mono">
              {averagePercentage !== null ? `${averagePercentage}%` : '—'}
            </span>
            <span className="text-[10px] text-slate-400 block mt-0.5">
              across {scoredEntries.length} logged
            </span>
          </div>
        </div>

        {/* Papers List */}
        <div className="p-6 overflow-y-auto space-y-3 flex-1">
          {completedEntries.length === 0 && inProgressEntries.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-xs">
              <p className="mb-2">No papers tracked yet.</p>
              <p className="text-slate-400">
                Click "Mark Done" or log your score on any past paper card to track your progress here!
              </p>
            </div>
          ) : (
            <>
              {completedEntries.map((prog) => {
                const paper = papers.find((p) => p.id === prog.paperId);
                if (!paper) return null;
                const percent = prog.score !== undefined
                  ? Math.round((prog.score / paper.maxMarks) * 100)
                  : null;

                return (
                  <div
                    key={prog.paperId}
                    className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between gap-3 hover:border-slate-700 transition"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <div className="truncate">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-indigo-400">
                            {paper.code}
                          </span>
                          <span className="text-xs font-semibold text-white truncate">
                            {paper.title}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-400">
                          {paper.season} {paper.year}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      {prog.score !== undefined && (
                        <div className="text-right">
                          <span className="font-mono text-xs font-bold text-emerald-400">
                            {prog.score} / {paper.maxMarks}
                          </span>
                          <span className="text-[10px] text-slate-400 block">
                            ({percent}%)
                          </span>
                        </div>
                      )}
                      <button
                        onClick={() => onOpenPaper(paper)}
                        className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                        title="View Paper"
                      >
                        <FileText className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>

        {/* Footer */}
        {allProgressEntries.length > 0 && (
          <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-between items-center text-xs">
            <span className="text-slate-400">Data saved locally in browser</span>
            <button
              onClick={onClearProgress}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Reset All Progress</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
