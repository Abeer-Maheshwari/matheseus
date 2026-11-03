import React from 'react';
import { PastPaper, PaperProgress } from '../types';

interface PaperCardProps {
  paper: PastPaper;
  progress?: PaperProgress;
  onOpenSplitView: (paper: PastPaper) => void;
  onOpenSingleDoc: (paper: PastPaper, type: 'qp' | 'ms' | 'er' | 'ma') => void;
  onStartExam: (paper: PastPaper) => void;
  onToggleStatus: (paperId: string, currentStatus: string) => void;
  onUpdateScore: (paperId: string, score: number, maxScore: number) => void;
}

export const PaperCard: React.FC<PaperCardProps> = ({
  paper,
  progress,
  onOpenSplitView,
  onOpenSingleDoc,
  onStartExam,
  onToggleStatus,
}) => {
  const isCompleted = progress?.status === 'completed';
  const isInProgress = progress?.status === 'in_progress';
  const scorePercent = progress?.score !== undefined 
    ? Math.round((progress.score / paper.maxMarks) * 100) 
    : null;

  return (
    <div 
      className={`rounded-lg border p-4 flex flex-col justify-between transition-colors ${
        isCompleted 
          ? 'bg-zinc-950 border-zinc-700' 
          : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700'
      }`}
    >
      <div>
        {/* Top bar: Code, Series, Status */}
        <div className="flex items-center justify-between gap-2 mb-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-xs px-2 py-0.5 rounded bg-[#2C2620] text-[#865D36] border border-[#93785B]/40">
              {paper.code}
            </span>
            <span className="text-zinc-400 font-medium">
              {paper.season} {paper.year}
            </span>
          </div>

          <button
            onClick={() => onToggleStatus(paper.id, progress?.status || 'not_started')}
            className={`px-2 py-0.5 rounded text-[11px] font-medium border ${
              isCompleted 
                ? 'bg-zinc-200 text-black border-zinc-300 font-semibold' 
                : isInProgress
                  ? 'bg-zinc-800 text-zinc-300 border-zinc-700'
                  : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border-zinc-800'
            }`}
          >
            {isCompleted ? 'Done' : isInProgress ? 'In Progress' : 'Mark Done'}
          </button>
        </div>

        {/* Paper Title */}
        <h3 className="text-sm font-semibold text-white mb-1.5">
          {paper.title}
        </h3>

        {/* Specs: Duration, Marks, Score */}
        <div className="flex items-center gap-3 text-xs text-[#AC8968] mb-3 tabular-nums">
          <span>{paper.durationMinutes} mins</span>
          <span>·</span>
          <span>{paper.maxMarks} marks</span>
          {scorePercent !== null && (
            <>
              <span>·</span>
              <span className="text-zinc-200 font-medium">
                {progress?.score}/{paper.maxMarks} ({scorePercent}%)
              </span>
            </>
          )}
        </div>

        {/* Topics */}
        <div className="flex flex-wrap gap-1 mb-4">
          {paper.topics.map((topic, i) => (
            <span
              key={i}
              className="text-[11px] px-1.5 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800/80"
            >
              {topic}
            </span>
          ))}
        </div>
      </div>

      {/* Action Buttons Toolbar */}
      <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onOpenSingleDoc(paper, 'qp')}
            className="px-2 py-1 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 font-medium"
          >
            QP
          </button>
          <button
            onClick={() => onOpenSingleDoc(paper, 'ms')}
            className="px-2 py-1 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 font-medium"
          >
            MS
          </button>
          <button
            onClick={() => onOpenSplitView(paper)}
            className="px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 font-medium"
          >
            Split View
          </button>
        </div>

        <div className="flex items-center gap-1">
          {paper.erUrl && (
            <button
              onClick={() => onOpenSingleDoc(paper, 'er')}
              className="px-1.5 py-1 text-zinc-400 hover:text-zinc-200 text-[11px]"
              title="Examiner Report"
            >
              Report
            </button>
          )}
          {paper.modelAnswersUrl && (
            <button
              onClick={() => onOpenSingleDoc(paper, 'ma')}
              className="px-1.5 py-1 text-zinc-400 hover:text-zinc-200 text-[11px]"
              title="Model Answers"
            >
              Model
            </button>
          )}
          <button
            onClick={() => onStartExam(paper)}
            className="px-2 py-1 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-800 text-[11px]"
            title="Timed Exam Mode"
          >
            Timer
          </button>
        </div>
      </div>
    </div>
  );
};
