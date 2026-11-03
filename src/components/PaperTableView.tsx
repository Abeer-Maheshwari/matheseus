import React from 'react';
import { PastPaper, PaperProgress } from '../types';
import { Columns, CheckCircle2, Check, Clock, Award, FileText } from 'lucide-react';

interface PaperTableViewProps {
  papers: PastPaper[];
  progressMap: Record<string, PaperProgress>;
  onOpenSplitView: (paper: PastPaper) => void;
  onOpenSingleDoc: (paper: PastPaper, type: 'qp' | 'ms' | 'er' | 'ma') => void;
  onStartExam: (paper: PastPaper) => void;
  onToggleStatus: (paperId: string, currentStatus: string) => void;
}

export const PaperTableView: React.FC<PaperTableViewProps> = ({
  papers,
  progressMap,
  onOpenSplitView,
  onOpenSingleDoc,
  onStartExam,
  onToggleStatus,
}) => {
  return (
    <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900/40 shadow-md">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-900/90 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
              <th className="py-3 px-4">Series</th>
              <th className="py-3 px-4">Code</th>
              <th className="py-3 px-4">Paper Title</th>
              <th className="py-3 px-4 text-center">Marks & Time</th>
              <th className="py-3 px-4 text-center">PDF (Split View)</th>
              <th className="py-3 px-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80">
            {papers.map((paper) => {
              const prog = progressMap[paper.id];
              const isCompleted = prog?.status === 'completed';
              const isInProgress = prog?.status === 'in_progress';

              return (
                <tr key={paper.id} className="hover:bg-slate-850/50 transition-colors">
                  {/* Series */}
                  <td className="py-3 px-4 whitespace-nowrap font-medium text-slate-200">
                    {paper.season} {paper.year}
                  </td>

                  {/* Code */}
                  <td className="py-3 px-4 whitespace-nowrap font-mono text-sky-400 font-medium">
                    {paper.code}
                  </td>

                  {/* Title & Topics */}
                  <td className="py-3 px-4">
                    <div className="font-semibold text-white">{paper.title}</div>
                    <div className="text-[11px] text-slate-400 truncate max-w-xs mt-0.5">
                      {paper.topics.join(' · ')}
                    </div>
                  </td>

                  {/* Marks & Time */}
                  <td className="py-3 px-4 text-center whitespace-nowrap text-slate-400">
                    <div>{paper.maxMarks} marks</div>
                    <div className="text-[11px] text-slate-500">{paper.durationMinutes} mins</div>
                  </td>

                  {/* PDF Split View Merged Button */}
                  <td className="py-3 px-4 text-center whitespace-nowrap">
                    <button
                      onClick={() => onOpenSplitView(paper)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg font-medium border border-slate-700/80 transition-colors"
                      title="Open Question Paper and Mark Scheme side-by-side"
                    >
                      <Columns size={13} className="text-sky-400" />
                      <span>PDF (Split View)</span>
                    </button>
                  </td>

                  {/* Status Toggle & Score */}
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2">
                      {prog?.score !== undefined && (
                        <span className="font-mono font-semibold text-emerald-400 text-[11px]">
                          {prog.score}/{paper.maxMarks}
                        </span>
                      )}
                      <button
                        onClick={() => onToggleStatus(paper.id, prog?.status || 'not_started')}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-colors ${
                          isCompleted
                            ? 'bg-emerald-950/70 text-emerald-300 border-emerald-600/80 font-semibold'
                            : isInProgress
                              ? 'bg-amber-950/60 text-amber-300 border-amber-600/60'
                              : 'bg-slate-950 text-slate-400 hover:text-slate-200 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        {isCompleted ? (
                          <>
                            <Check size={12} className="text-emerald-400" />
                            <span>Done</span>
                          </>
                        ) : isInProgress ? (
                          <span>In Progress</span>
                        ) : (
                          <span>Mark Done</span>
                        )}
                      </button>
                      <button
                        onClick={() => onStartExam(paper)}
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 text-[11px] transition-colors"
                        title="Timed Exam Practice"
                      >
                        <Clock size={11} className="text-sky-400" />
                        <span>Timer</span>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
