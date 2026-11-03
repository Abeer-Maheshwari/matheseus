import React from 'react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 text-zinc-100">
      <div className="bg-zinc-950 border border-zinc-800 rounded-lg w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-5 py-3 border-b border-zinc-800 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-white text-sm">Revision Progress Log</h3>
            <p className="text-xs text-zinc-400">Past paper tracker and score records</p>
          </div>
          <button
            onClick={onClose}
            className="px-2 py-1 text-xs rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800"
          >
            Close
          </button>
        </div>

        {/* Stats summary */}
        <div className="p-4 grid grid-cols-3 gap-2 bg-zinc-900 border-b border-zinc-800 text-xs shrink-0">
          <div className="p-3 rounded bg-zinc-950 border border-zinc-800 text-center">
            <div className="text-zinc-400 mb-0.5">Completed</div>
            <div className="text-xl font-bold text-white font-mono">{completedEntries.length}</div>
            <div className="text-[10px] text-zinc-500">of {papers.length} papers</div>
          </div>

          <div className="p-3 rounded bg-zinc-950 border border-zinc-800 text-center">
            <div className="text-zinc-400 mb-0.5">In Progress</div>
            <div className="text-xl font-bold text-zinc-200 font-mono">{inProgressEntries.length}</div>
            <div className="text-[10px] text-zinc-500">active attempts</div>
          </div>

          <div className="p-3 rounded bg-zinc-950 border border-zinc-800 text-center">
            <div className="text-zinc-400 mb-0.5">Average Score</div>
            <div className="text-xl font-bold text-white font-mono">
              {averagePercentage !== null ? `${averagePercentage}%` : '—'}
            </div>
            <div className="text-[10px] text-zinc-500">{scoredEntries.length} scored</div>
          </div>
        </div>

        {/* List of papers */}
        <div className="p-4 overflow-y-auto space-y-2 flex-1 text-xs">
          {completedEntries.length === 0 && inProgressEntries.length === 0 ? (
            <div className="text-center py-10 text-zinc-500 text-xs">
              No papers logged yet. Click "Mark Done" or log your score on any past paper.
            </div>
          ) : (
            completedEntries.map((prog) => {
              const paper = papers.find((p) => p.id === prog.paperId);
              if (!paper) return null;
              const percent = prog.score !== undefined
                ? Math.round((prog.score / paper.maxMarks) * 100)
                : null;

              return (
                <div
                  key={prog.paperId}
                  className="p-3 rounded bg-zinc-900/70 border border-zinc-800 flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-semibold text-zinc-300">
                        {paper.code}
                      </span>
                      <span className="text-zinc-200 font-medium truncate">
                        {paper.title}
                      </span>
                    </div>
                    <div className="text-zinc-400 text-[11px]">
                      {paper.season} {paper.year}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    {prog.score !== undefined && (
                      <span className="font-mono text-zinc-200 font-semibold text-xs">
                        {prog.score}/{paper.maxMarks} ({percent}%)
                      </span>
                    )}
                    <button
                      onClick={() => onOpenPaper(paper)}
                      className="px-2 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded border border-zinc-700 text-xs"
                    >
                      View
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {allProgressEntries.length > 0 && (
          <div className="p-3 bg-zinc-950 border-t border-zinc-800 flex justify-between items-center text-xs">
            <span className="text-zinc-500">Stored in browser localStorage</span>
            <button
              onClick={onClearProgress}
              className="text-zinc-400 hover:text-white underline text-[11px]"
            >
              Reset progress data
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
