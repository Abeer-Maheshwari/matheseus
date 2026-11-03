import React from 'react';
import { PastPaper, PaperProgress } from '../types';

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
    <div className="border border-zinc-800 rounded-lg overflow-hidden bg-zinc-950">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-zinc-800 bg-zinc-900/80 text-zinc-400 font-semibold uppercase tracking-wider text-[11px]">
              <th className="py-3 px-4">Series</th>
              <th className="py-3 px-4">Code</th>
              <th className="py-3 px-4">Paper Title</th>
              <th className="py-3 px-4 text-center">Marks & Time</th>
              <th className="py-3 px-4 text-center">Materials</th>
              <th className="py-3 px-4 text-center">Split Review</th>
              <th className="py-3 px-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/80">
            {papers.map((paper) => {
              const prog = progressMap[paper.id];
              const isCompleted = prog?.status === 'completed';
              const isInProgress = prog?.status === 'in_progress';

              return (
                <tr key={paper.id} className="hover:bg-zinc-900/50 transition-colors">
                  {/* Series */}
                  <td className="py-3 px-4 whitespace-nowrap font-medium text-zinc-200">
                    {paper.season} {paper.year}
                  </td>

                  {/* Code */}
                  <td className="py-3 px-4 whitespace-nowrap font-mono text-zinc-400 font-medium">
                    {paper.code}
                  </td>

                  {/* Title & Topics */}
                  <td className="py-3 px-4">
                    <div className="font-semibold text-zinc-100">{paper.title}</div>
                    <div className="text-[11px] text-zinc-400 truncate max-w-xs mt-0.5">
                      {paper.topics.join(' · ')}
                    </div>
                  </td>

                  {/* Marks & Time */}
                  <td className="py-3 px-4 text-center whitespace-nowrap text-zinc-400">
                    <div>{paper.maxMarks} marks</div>
                    <div className="text-[11px] text-zinc-400">{paper.durationMinutes} mins</div>
                  </td>

                  {/* Materials: QP, MS, ER */}
                  <td className="py-3 px-4 text-center whitespace-nowrap">
                    <div className="inline-flex items-center gap-1">
                      <button
                        onClick={() => onOpenSingleDoc(paper, 'qp')}
                        className="px-2 py-1 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 rounded border border-zinc-800 font-medium"
                      >
                        QP
                      </button>
                      <button
                        onClick={() => onOpenSingleDoc(paper, 'ms')}
                        className="px-2 py-1 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 rounded border border-zinc-800 font-medium"
                      >
                        MS
                      </button>
                      {paper.erUrl && (
                        <button
                          onClick={() => onOpenSingleDoc(paper, 'er')}
                          className="px-2 py-1 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 rounded border border-zinc-800 text-[11px]"
                          title="Examiner Report"
                        >
                          ER
                        </button>
                      )}
                      {paper.modelAnswersUrl && (
                        <button
                          onClick={() => onOpenSingleDoc(paper, 'ma')}
                          className="px-2 py-1 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 rounded border border-zinc-800 text-[11px]"
                          title="Model Solutions"
                        >
                          MA
                        </button>
                      )}
                    </div>
                  </td>

                  {/* Split Screen Button */}
                  <td className="py-3 px-4 text-center whitespace-nowrap">
                    <button
                      onClick={() => onOpenSplitView(paper)}
                      className="px-2.5 py-1 bg-zinc-800 hover:bg-zinc-700 text-white rounded font-medium border border-zinc-700"
                    >
                      Split View
                    </button>
                  </td>

                  {/* Status Toggle & Score */}
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2">
                      {prog?.score !== undefined && (
                        <span className="font-mono font-semibold text-zinc-300 text-[11px]">
                          {prog.score}/{paper.maxMarks}
                        </span>
                      )}
                      <button
                        onClick={() => onToggleStatus(paper.id, prog?.status || 'not_started')}
                        className={`px-2 py-1 rounded text-[11px] font-medium border ${
                          isCompleted
                            ? 'bg-zinc-200 text-black border-zinc-300 font-semibold'
                            : isInProgress
                              ? 'bg-zinc-800 text-zinc-300 border-zinc-700'
                              : 'bg-zinc-950 text-zinc-400 hover:text-zinc-200 border-zinc-800'
                        }`}
                      >
                        {isCompleted ? 'Done' : isInProgress ? 'In Progress' : 'Mark Done'}
                      </button>
                      <button
                        onClick={() => onStartExam(paper)}
                        className="px-2 py-1 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 text-[11px]"
                        title="Timed Exam Practice"
                      >
                        Timer
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
