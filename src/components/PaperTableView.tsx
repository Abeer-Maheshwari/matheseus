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
    <div className="border border-[#90AEAD]/25 rounded-xl overflow-hidden bg-[#244855] shadow-md">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-[#90AEAD]/20 bg-[#1b3741] text-[#90AEAD] font-semibold uppercase tracking-wider text-[11px]">
              <th className="py-3 px-4">Series</th>
              <th className="py-3 px-4">Code</th>
              <th className="py-3 px-4">Paper Title</th>
              <th className="py-3 px-4 text-center">Marks & Time</th>
              <th className="py-3 px-4 text-center">PDF (Split View)</th>
              <th className="py-3 px-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#90AEAD]/15">
            {papers.map((paper) => {
              const prog = progressMap[paper.id];
              const isCompleted = prog?.status === 'completed';
              const isInProgress = prog?.status === 'in_progress';

              return (
                <tr key={paper.id} className="hover:bg-[#1f3d49] transition-colors">
                  {/* Series */}
                  <td className="py-3 px-4 whitespace-nowrap font-medium text-[#FBE9D0]">
                    {paper.season} {paper.year}
                  </td>

                  {/* Code */}
                  <td className="py-3 px-4 whitespace-nowrap font-mono text-[#E64833] font-medium">
                    {paper.code}
                  </td>

                  {/* Title & Topics */}
                  <td className="py-3 px-4">
                    <div className="font-semibold text-[#FBE9D0]">{paper.title}</div>
                    <div className="text-[11px] text-[#90AEAD] truncate max-w-xs mt-0.5">
                      {paper.topics.join(' · ')}
                    </div>
                  </td>

                  {/* Marks & Time */}
                  <td className="py-3 px-4 text-center whitespace-nowrap text-[#90AEAD]">
                    <div className="text-[#FBE9D0]">{paper.maxMarks} marks</div>
                    <div className="text-[11px] text-[#90AEAD]">{paper.durationMinutes} mins</div>
                  </td>

                  {/* PDF Split View Merged Button */}
                  <td className="py-3 px-4 text-center whitespace-nowrap">
                    <button
                      onClick={() => onOpenSplitView(paper)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#162932] hover:bg-[#874F41]/60 text-[#FBE9D0] rounded-lg font-medium border border-[#90AEAD]/30 transition-colors"
                      title="Open Question Paper and Mark Scheme side-by-side"
                    >
                      <Columns size={13} className="text-[#90AEAD]" />
                      <span>PDF (Split View)</span>
                    </button>
                  </td>

                  {/* Status Toggle & Score */}
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2">
                      {prog?.score !== undefined && (
                        <span className="font-mono font-semibold text-[#E64833] text-[11px]">
                          {prog.score}/{paper.maxMarks}
                        </span>
                      )}
                      <button
                        onClick={() => onToggleStatus(paper.id, prog?.status || 'not_started')}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-colors ${
                          isCompleted
                            ? 'bg-[#874F41] text-[#FBE9D0] border-[#874F41] font-semibold'
                            : isInProgress
                              ? 'bg-[#244855] text-[#E64833] border-[#E64833]/60'
                              : 'bg-[#162932] text-[#90AEAD] hover:text-[#FBE9D0] border-[#90AEAD]/25'
                        }`}
                      >
                        {isCompleted ? (
                          <>
                            <Check size={12} className="text-[#FBE9D0]" />
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
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-[#162932] hover:bg-[#244855] text-[#90AEAD] hover:text-[#FBE9D0] border border-[#90AEAD]/25 text-[11px] transition-colors"
                        title="Timed Exam Practice"
                      >
                        <Clock size={11} className="text-[#E64833]" />
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
