import React from 'react';
import { 
  FileText, 
  CheckCircle2, 
  Clock, 
  ExternalLink, 
  Columns, 
  Award, 
  BookMarked,
  Sparkles,
  Download,
  AlertCircle
} from 'lucide-react';
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
  onUpdateScore,
}) => {
  const isCompleted = progress?.status === 'completed';
  const isInProgress = progress?.status === 'in_progress';
  const scorePercent = progress?.score !== undefined 
    ? Math.round((progress.score / paper.maxMarks) * 100) 
    : null;

  return (
    <div 
      className={`group relative rounded-2xl border transition-all duration-200 flex flex-col justify-between overflow-hidden ${
        isCompleted 
          ? 'bg-slate-900/40 border-emerald-500/30 shadow-lg shadow-emerald-500/5' 
          : 'bg-slate-900/60 hover:bg-slate-900/90 border-slate-800/80 hover:border-slate-700 shadow-md'
      }`}
    >
      {/* Top Accent Strip */}
      <div 
        className={`h-1 w-full ${
          isCompleted 
            ? 'bg-gradient-to-r from-emerald-500 to-teal-400' 
            : isInProgress 
              ? 'bg-gradient-to-r from-amber-500 to-orange-400'
              : 'bg-gradient-to-r from-indigo-500/40 to-cyan-500/40 group-hover:from-indigo-500 group-hover:to-cyan-400 transition-colors'
        }`} 
      />

      <div className="p-5 flex-1 flex flex-col">
        {/* Header row: Season, Year, Code, Completion badge */}
        <div className="flex items-start justify-between gap-3 mb-2.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs px-2.5 py-0.5 rounded-md font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
              {paper.code}
            </span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-slate-800 text-slate-300">
              {paper.season} {paper.year}
            </span>
            <span className="text-xs text-slate-400 hidden sm:inline">
              {paper.paperNumber}
            </span>
          </div>

          {/* Status button toggle */}
          <button
            onClick={() => onToggleStatus(paper.id, progress?.status || 'not_started')}
            className={`flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-medium transition ${
              isCompleted 
                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' 
                : isInProgress
                  ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                  : 'bg-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
            title="Toggle Status (Not Started -> In Progress -> Completed)"
          >
            <CheckCircle2 className={`w-3.5 h-3.5 ${isCompleted ? 'text-emerald-400' : 'text-slate-500'}`} />
            <span>
              {isCompleted ? 'Completed' : isInProgress ? 'In Progress' : 'Mark Done'}
            </span>
          </button>
        </div>

        {/* Paper Title */}
        <h3 className="text-base font-bold text-white tracking-tight mb-2 group-hover:text-indigo-300 transition-colors">
          {paper.title}
        </h3>

        {/* Specs: Duration, Marks */}
        <div className="flex items-center gap-4 text-xs text-slate-400 mb-3 font-medium">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{Math.floor(paper.durationMinutes / 60)}h {paper.durationMinutes % 60 > 0 ? `${paper.durationMinutes % 60}m` : ''}</span>
          </div>
          <div className="flex items-center gap-1">
            <Award className="w-3.5 h-3.5 text-slate-400" />
            <span>{paper.maxMarks} marks</span>
          </div>
          {scorePercent !== null && (
            <div className="flex items-center gap-1 font-semibold text-emerald-400 ml-auto">
              <span>Score: {progress?.score}/{paper.maxMarks} ({scorePercent}%)</span>
            </div>
          )}
        </div>

        {/* Topics Tags */}
        <div className="flex flex-wrap gap-1.5 mt-auto pt-2 mb-4">
          {paper.topics.map((topic, i) => (
            <span
              key={i}
              className="text-[11px] px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700/50"
            >
              {topic}
            </span>
          ))}
        </div>
      </div>

      {/* Action Buttons Toolbar */}
      <div className="p-3 bg-slate-950/60 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
        {/* Primary View Buttons */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onOpenSingleDoc(paper, 'qp')}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 transition active:scale-95"
            title="View Question Paper"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Question Paper</span>
          </button>

          <button
            onClick={() => onOpenSingleDoc(paper, 'ms')}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-300 border border-cyan-500/30 transition active:scale-95"
            title="View Mark Scheme"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Mark Scheme</span>
          </button>

          {/* Side by side Split View - Killer feature */}
          <button
            onClick={() => onOpenSplitView(paper)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 hover:from-indigo-500/30 hover:to-cyan-500/30 text-slate-200 border border-indigo-500/30 transition active:scale-95"
            title="Side-by-side QP + MS Split View"
          >
            <Columns className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Split View</span>
          </button>
        </div>

        {/* Secondary Actions (Timer, ER, Model Solution) */}
        <div className="flex items-center gap-1">
          {paper.modelAnswersUrl && (
            <button
              onClick={() => onOpenSingleDoc(paper, 'ma')}
              className="px-2 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 transition"
              title="Model Answers / Worked Solutions"
            >
              Model Ans
            </button>
          )}

          {paper.erUrl && (
            <button
              onClick={() => onOpenSingleDoc(paper, 'er')}
              className="px-2 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 transition"
              title="Examiner's Report"
            >
              Report
            </button>
          )}

          <button
            onClick={() => onStartExam(paper)}
            className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs font-medium text-amber-300 hover:text-amber-200 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 transition active:scale-95"
            title="Timed Exam Practice Mode"
          >
            <Clock className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Timed</span>
          </button>
        </div>
      </div>
    </div>
  );
};
