import React from 'react';
import { PastPaper, PaperProgress } from '../types';
import { Columns, Check, Clock } from 'lucide-react';

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
  onStartExam,
  onToggleStatus,
}) => {
  return (
    <div className="border border-[#93785B]/30 rounded-xl overflow-hidden bg-[#3E362E] shadow-md">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-[#93785B]/25 bg-[#2C2620]/90 text-[#AC8968] font-semibold uppercase tracking-wider text-[11px]">
              <th className="py-3 px-4">Series</th>
              <th className="py-3 px-4">Code</th>
              <th className="py-3 px-4">Paper Title</th>
              <th className="py-3 px-4 text-center">Marks & Time</th>
              <th className="py-3 px-4 text-center">PDF (Split View)</th>
              <th className="py-3 px-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#93785B]/20">
            {papers.map((paper) => {
              const prog = progressMap[paper.id];
              const isCompleted = prog?.status === 'completed';
              const isInProgress = prog?.status === 'in_progress';

              return (
                <tr key={paper.id} className="hover:bg-[#2C2620]/50 transition-colors">
                  {/* Series */}
                  <td className="py-3 px-4 whitespace-nowrap font-medium text-[#FAF6F0]">
                    {paper.season} {paper.year}
                  </td>

                  {/* Code */}
                  <td className="py-3 px-4 whitespace-nowrap text-[#865D36] font-semibold">
                    {paper.code}
                  </td>

                  {/* Title & Topics */}
                  <td className="py-3 px-4">
                    <div className="font-semibold text-[#FAF6F0]">{paper.title}</div>
                    <div className="text-[11px] text-[#A69080] truncate max-w-xs mt-0.5">
                      {paper.topics.join(' · ')}
                    </div>
                  </td>

                  {/* Marks & Time */}
                  <td className="py-3 px-4 text-center whitespace-nowrap text-[#AC8968]">
                    <div className="text-[#FAF6F0]">{paper.maxMarks} marks</div>
                    <div className="text-[11px] text-[#A69080]">{paper.durationMinutes} mins</div>
                  </td>

                  {/* PDF Split View Merged Button */}
                  <td className="py-3 px-4 text-center whitespace-nowrap">
                    <button
                      onClick={() => onOpenSplitView(paper)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#2C2620] hover:bg-[#865D36]/30 text-[#FAF6F0] rounded-lg font-medium border border-[#93785B]/40 transition-colors"
                      title="Open Question Paper and Mark Scheme side-by-side"
                    >
                      <Columns size={13} className="text-[#AC8968]" />
                      <span>PDF (Split View)</span>
                    </button>
                  </td>

                  {/* Status Toggle & Score */}
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2">
                      {prog?.score !== undefined && (
                        <span className="font-semibold text-[#865D36] text-[11px] tabular-nums">
                          {prog.score}/{paper.maxMarks}
                        </span>
                      )}
                      <button
                        onClick={() => onToggleStatus(paper.id, prog?.status || 'not_started')}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-colors ${
                          isCompleted
                            ? 'bg-[#865D36] text-[#FAF6F0] border-[#865D36] font-semibold'
                            : isInProgress
                              ? 'bg-[#3E362E] text-[#865D36] border-[#865D36]/60'
                              : 'bg-[#2C2620] text-[#AC8968] hover:text-[#FAF6F0] border-[#93785B]/30'
                        }`}
                      >
                        {isCompleted ? (
                          <>
                            <Check size={12} className="text-[#FAF6F0]" />
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
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-[#2C2620] hover:bg-[#3E362E] text-[#AC8968] hover:text-[#FAF6F0] border border-[#93785B]/30 text-[11px] transition-colors"
                        title="Timed Exam Practice"
                      >
                        <Clock size={11} className="text-[#865D36]" />
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
