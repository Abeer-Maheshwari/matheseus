import React, { useMemo } from 'react';
import { ExamAttempt } from '../types';
import { InteractivePaper, getInteractivePaper } from '../data/interactiveQuestions';
import { 
  Award, 
  X, 
  Clock, 
  Calendar, 
  RotateCcw, 
  Trash2, 
  FileText,
  Eye,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  BarChart3
} from 'lucide-react';

export interface ScoreReportScreenProps {
  attempt: ExamAttempt;
  paper?: InteractivePaper;
  onClose: () => void;
  onRetake?: () => void;
  onReview?: (questionIndex?: number) => void;
  onDelete?: () => void;
  erUrl?: string;
  onOpenSingleDoc?: (title: string, url: string) => void;
}

export const ScoreReportScreen: React.FC<ScoreReportScreenProps> = ({
  attempt,
  paper,
  onClose,
  onRetake,
  onReview,
  onDelete,
  erUrl,
  onOpenSingleDoc,
}) => {
  // Resolve authentic paper questions and topics
  const paperData = useMemo(() => {
    if (paper) return paper;
    return getInteractivePaper(attempt.paperId, attempt.paperTitle, attempt.paperCode);
  }, [paper, attempt]);

  const formattedDate = useMemo(() => {
    try {
      const d = new Date(attempt.completedAt);
      return d.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return attempt.completedAt;
    }
  }, [attempt.completedAt]);

  const formattedTimeSpent = useMemo(() => {
    if (!attempt.timeSpentSeconds) return null;
    const mins = Math.floor(attempt.timeSpentSeconds / 60);
    const secs = attempt.timeSpentSeconds % 60;
    if (mins === 0) return `${secs}s`;
    return `${mins}m ${secs}s`;
  }, [attempt.timeSpentSeconds]);

  // Question breakdown list
  const questionsList = useMemo(() => {
    const scores = attempt.questionScores || {};
    return paperData.questions.map((q) => {
      const score = scores[q.number];
      const isScored = score !== undefined;
      const isFull = isScored && score === q.totalMarks;
      const isZero = isScored && score === 0;
      const isPartial = isScored && score > 0 && score < q.totalMarks;

      return {
        ...q,
        achievedScore: score,
        isScored,
        isFull,
        isZero,
        isPartial,
      };
    });
  }, [paperData, attempt.questionScores]);

  const scoredCount = questionsList.filter((q) => q.isScored).length;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#0F1729] text-[#E8ECF4] overflow-hidden animate-fadeIn">
      {/* Top Navigation Bar */}
      <header className="h-14 bg-[#1A2540] border-b border-[#6382BF]/30 px-4 sm:px-6 flex items-center justify-between shrink-0 z-30">
        {/* Left: Back / Paper Details */}
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0A1020] hover:bg-[#1A2540] text-[#7B8FAD] hover:text-[#E8ECF4] border border-[#6382BF]/30 text-xs font-semibold transition-colors"
            title="Return to Past Papers"
          >
            <ArrowLeft size={14} />
            <span className="hidden sm:inline">Back to Papers</span>
          </button>

          <img src="/logo.png" alt="matheseus" className="w-7 h-7 rounded-lg object-cover ring-1 ring-white/10 hidden sm:inline" />

          <span className="text-xs px-2.5 py-1 rounded bg-[#0A1020] border border-[#6382BF]/40 text-[#4A7BF7] font-semibold tracking-wide font-sans shrink-0">
            {attempt.paperCode || paperData.paperCode || 'Official Exam'}
          </span>

          <span className="font-bold text-sm text-[#E8ECF4] truncate hidden md:inline max-w-sm">
            {attempt.paperTitle || paperData.title}
          </span>
        </div>

        {/* Right: Meta & Close */}
        <div className="flex items-center gap-2.5">
          {erUrl && onOpenSingleDoc && (
            <button
              onClick={() => onOpenSingleDoc(`${attempt.paperTitle || paperData.title} — Examiner Report`, erUrl)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0A1020] hover:bg-[#1A2540] text-[#7B8FAD] hover:text-[#E8ECF4] border border-[#6382BF]/30 text-xs font-semibold transition-colors"
              title="Official Examiner Report PDF"
            >
              <FileText size={13} className="text-[#4A7BF7]" />
              <span>Examiner Report</span>
            </button>
          )}

          <div className="hidden lg:flex items-center gap-1.5 text-xs text-[#7B8FAD] bg-[#0A1020] px-3 py-1.5 rounded-xl border border-[#6382BF]/30">
            <Calendar size={13} />
            <span>{formattedDate}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-[#0A1020] text-[#7B8FAD] hover:text-[#E8ECF4] transition-colors"
            title="Close Report (ESC)"
          >
            <X size={18} />
          </button>
        </div>
      </header>

      {/* Main Scrollable Report Content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 space-y-6">
        <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-modalFadeIn">
          
          {/* Hero Performance Header Card */}
          <div className="border border-[#6382BF]/30 rounded-2xl bg-[#1A2540] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            {/* Subtle decorative glow */}
            <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#4A7BF7]/10 blur-3xl pointer-events-none" />
            
            <div className="relative z-10 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#6382BF]/25 gap-3">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4A7BF7]/15 border border-[#4A7BF7]/30 text-[#4A7BF7] text-xs font-semibold">
                    <Award size={14} />
                    <span>Official Past Paper Score Report</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#E8ECF4] pt-1">
                    {attempt.paperTitle || paperData.title}
                  </h2>
                  <p className="text-xs text-[#7B8FAD] flex items-center gap-2 flex-wrap">
                    <span>Completed {formattedDate}</span>
                    <span>·</span>
                    <span>Timing: {attempt.timingMode === 'timed' ? 'Timed Countdown' : 'Untimed Practice'}</span>
                    {formattedTimeSpent && (
                      <>
                        <span>·</span>
                        <span>Time Spent: {formattedTimeSpent}</span>
                      </>
                    )}
                  </p>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  {onRetake && (
                    <button
                      onClick={onRetake}
                      className="px-3.5 py-2 rounded-xl bg-[#0A1020] hover:bg-[#1A2540] text-[#E8ECF4] border border-[#6382BF]/30 text-xs font-semibold flex items-center gap-1.5 transition-all duration-150 active:scale-95 shadow-sm"
                      title="Practice this paper again from start"
                    >
                      <RotateCcw size={13} />
                      <span>Retake Paper</span>
                    </button>
                  )}
                  {onReview && (
                    <button
                      onClick={() => onReview(0)}
                      className="px-4 py-2 rounded-xl bg-[#4A7BF7] hover:bg-[#6382BF] text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-[#4A7BF7]/20 transition-all duration-150 active:scale-95 hover:scale-[1.02]"
                      title="Step through all questions with Pearson mark scheme"
                    >
                      <Eye size={13} />
                      <span>Review Questions</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Three Main Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                {/* Total Marks */}
                <div className="p-4 sm:p-5 rounded-xl bg-[#0A1020] border border-[#6382BF]/30 shadow-inner space-y-1 transition-all duration-200 hover:border-[#6382BF]/60 hover:-translate-y-0.5">
                  <span className="text-[11px] font-semibold text-[#7B8FAD] uppercase tracking-wider block">
                    Total Score
                  </span>
                  <div className="text-3xl sm:text-4xl font-bold text-[#E8ECF4] tabular-nums">
                    {attempt.achievedScore}
                    <span className="text-sm font-normal text-[#7B8FAD]"> / {attempt.maxScore}</span>
                  </div>
                  <p className="text-[11px] text-[#7B8FAD] pt-1">
                    {scoredCount} of {questionsList.length} questions graded
                  </p>
                </div>

                {/* Percentage */}
                <div className="p-4 sm:p-5 rounded-xl bg-[#0A1020] border border-[#6382BF]/30 shadow-inner space-y-1 transition-all duration-200 hover:border-[#6382BF]/60 hover:-translate-y-0.5">
                  <span className="text-[11px] font-semibold text-[#7B8FAD] uppercase tracking-wider block">
                    Percentage
                  </span>
                  <div className="text-3xl sm:text-4xl font-bold text-[#4A7BF7] tabular-nums">
                    {attempt.percentage}%
                  </div>
                  <div className="w-full bg-[#1A2540] h-1.5 rounded-full overflow-hidden mt-2">
                    <div
                      className="bg-[#4A7BF7] h-full rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${Math.min(100, Math.max(0, attempt.percentage))}%` }}
                    />
                  </div>
                </div>

                {/* Predicted Grade */}
                <div className="p-4 sm:p-5 rounded-xl bg-[#0A1020] border border-[#6382BF]/30 shadow-inner space-y-1 transition-all duration-200 hover:border-[#6382BF]/60 hover:-translate-y-0.5">
                  <span className="text-[11px] font-semibold text-[#7B8FAD] uppercase tracking-wider block">
                    Predicted Grade
                  </span>
                  <div className="text-3xl sm:text-4xl font-bold text-emerald-400">
                    {attempt.predictedGrade || '—'}
                  </div>
                  <p className="text-[11px] text-emerald-400/80 font-medium pt-1">
                    Official Edexcel Boundary
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Question Breakdown Table Card */}
          <div className="border border-[#6382BF]/30 rounded-2xl bg-[#1A2540] p-6 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#6382BF]/20 gap-2">
              <div>
                <h3 className="text-base font-bold text-[#E8ECF4]">Question Breakdown</h3>
                <p className="text-xs text-[#7B8FAD]">
                  Detailed breakdown of marks achieved across each question
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#7B8FAD]">
                <span className="inline-flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /> Full Marks
                </span>
                <span className="inline-flex items-center gap-1 ml-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> Partial
                </span>
                <span className="inline-flex items-center gap-1 ml-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-400" /> Zero
                </span>
              </div>
            </div>

            {/* List of Questions */}
            <div className="border border-[#6382BF]/25 rounded-xl overflow-hidden bg-[#0A1020]">
              <div className="divide-y divide-[#6382BF]/15">
                {questionsList.map((q, idx) => (
                  <div
                    key={q.number}
                    className="px-4 py-3 flex items-center justify-between text-xs hover:bg-[#1A2540]/60 transition-colors gap-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="font-bold text-[#E8ECF4] w-9 shrink-0">Q{q.number}</span>
                      <span className="text-[#7B8FAD] text-xs truncate max-w-[200px] sm:max-w-xs md:max-w-md">
                        {q.topic || `Question ${q.number}`}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span
                        className={`font-semibold tabular-nums px-2.5 py-1 rounded-md text-xs border ${
                          !q.isScored
                            ? 'bg-[#0A1020] text-[#7B8FAD] border-[#6382BF]/20'
                            : q.isFull
                            ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30 font-bold'
                            : q.isPartial
                            ? 'bg-amber-500/15 text-amber-300 border-amber-500/30 font-bold'
                            : 'bg-rose-500/15 text-rose-400 border-rose-500/30 font-bold'
                        }`}
                      >
                        {q.isScored ? `${q.achievedScore} / ${q.totalMarks}` : `— / ${q.totalMarks}`}
                      </span>

                      {onReview && (
                        <button
                          type="button"
                          onClick={() => onReview(idx)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#1A2540] hover:bg-[#4A7BF7] text-[#7B8FAD] hover:text-white border border-[#6382BF]/30 text-[11px] font-semibold transition-all shadow-sm"
                          title={`Review Question ${q.number} and official mark scheme`}
                        >
                          <Eye size={12} />
                          <span className="hidden sm:inline">Review</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
            {onDelete ? (
              <button
                type="button"
                onClick={() => {
                  if (window.confirm('Are you sure you want to delete this score report from local storage?')) {
                    onDelete();
                  }
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-semibold transition-colors"
                title="Delete attempt from local history"
              >
                <Trash2 size={13} />
                <span>Delete Record</span>
              </button>
            ) : <div />}

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              {onRetake && (
                <button
                  type="button"
                  onClick={onRetake}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#0A1020] hover:bg-[#1A2540] text-[#E8ECF4] border border-[#6382BF]/30 text-xs font-semibold transition-colors"
                >
                  <RotateCcw size={13} />
                  <span>Practice Again</span>
                </button>
              )}

              {onReview && (
                <button
                  type="button"
                  onClick={() => onReview(0)}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#0A1020] hover:bg-[#4A7BF7]/20 text-[#E8ECF4] border border-[#6382BF]/30 text-xs font-semibold transition-colors"
                >
                  <Eye size={13} className="text-[#4A7BF7]" />
                  <span>Review All</span>
                </button>
              )}

              <button
                type="button"
                onClick={onClose}
                className="flex-1 sm:flex-none px-6 py-2 rounded-xl bg-[#4A7BF7] hover:bg-[#6382BF] text-white text-xs font-semibold shadow-md transition-colors"
              >
                Done
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

// Also export as ScoreReportModal for backwards compatibility
export const ScoreReportModal = ScoreReportScreen;
