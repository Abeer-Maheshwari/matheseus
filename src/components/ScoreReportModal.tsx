import React from 'react';
import { ExamAttempt } from '../types';
import { 
  Award, 
  X, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  RotateCcw, 
  Trash2, 
  FileText,
  Play
} from 'lucide-react';

interface ScoreReportModalProps {
  attempt: ExamAttempt;
  onClose: () => void;
  onRetake?: () => void;
  onDelete?: () => void;
  erUrl?: string;
  onOpenSingleDoc?: (title: string, url: string) => void;
}

export const ScoreReportModal: React.FC<ScoreReportModalProps> = ({
  attempt,
  onClose,
  onRetake,
  onDelete,
  erUrl,
  onOpenSingleDoc,
}) => {
  const formattedDate = (() => {
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
  })();

  const questionEntries = attempt.questionScores
    ? Object.entries(attempt.questionScores).map(([qNum, score]) => ({
        qNum: parseInt(qNum, 10),
        score,
      })).sort((a, b) => a.qNum - b.qNum)
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A1020]/90 backdrop-blur-sm text-[#E8ECF4] animate-fadeIn">
      <div className="bg-[#1A2540] border border-[#6382BF]/40 rounded-2xl max-w-2xl w-full p-6 space-y-6 shadow-2xl animate-modalFadeIn max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#6382BF]/25 pb-4 shrink-0">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-[#4A7BF7]/20 text-[#4A7BF7] border border-[#4A7BF7]/30">
                <Award size={16} />
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded bg-[#0A1020] border border-[#6382BF]/40 text-[#4A7BF7] font-semibold font-sans tracking-wide">
                {attempt.paperCode || 'Official Exam'}
              </span>
              <span className="text-xs text-[#7B8FAD] flex items-center gap-1">
                <Calendar size={12} />
                <span>{formattedDate}</span>
              </span>
            </div>
            <h3 className="text-xl font-bold text-[#E8ECF4] pt-1">
              {attempt.paperTitle || 'Examination Score Report'}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-[#0A1020] text-[#7B8FAD] hover:text-[#E8ECF4] transition-colors"
            title="Close Report (ESC)"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto space-y-6 pr-1">
          {/* Key Metric Cards */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-4 rounded-xl bg-[#0A1020] border border-[#6382BF]/30 shadow-inner">
              <span className="text-[11px] font-semibold text-[#7B8FAD] uppercase tracking-wider block">
                Total Score
              </span>
              <div className="text-2xl sm:text-3xl font-bold text-[#E8ECF4] tabular-nums mt-1">
                {attempt.achievedScore}
                <span className="text-xs font-normal text-[#7B8FAD]"> / {attempt.maxScore}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#0A1020] border border-[#6382BF]/30 shadow-inner">
              <span className="text-[11px] font-semibold text-[#7B8FAD] uppercase tracking-wider block">
                Percentage
              </span>
              <div className="text-2xl sm:text-3xl font-bold text-[#4A7BF7] tabular-nums mt-1">
                {attempt.percentage}%
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#0A1020] border border-[#6382BF]/30 shadow-inner">
              <span className="text-[11px] font-semibold text-[#7B8FAD] uppercase tracking-wider block">
                Grade
              </span>
              <div className="text-2xl sm:text-3xl font-bold text-emerald-400 mt-1">
                {attempt.predictedGrade}
              </div>
            </div>
          </div>

          {/* Mode & Timing Information */}
          <div className="p-3 rounded-xl bg-[#0A1020]/70 border border-[#6382BF]/20 flex items-center justify-between text-xs text-[#7B8FAD]">
            <div className="flex items-center gap-2">
              <Clock size={13} className="text-[#4A7BF7]" />
              <span>Timing Mode:</span>
              <span className="text-[#E8ECF4] font-semibold">
                {attempt.timingMode === 'timed' ? 'Timed Countdown' : 'Untimed Practice'}
              </span>
            </div>
            {erUrl && onOpenSingleDoc && (
              <button
                type="button"
                onClick={() => onOpenSingleDoc(`${attempt.paperTitle} — Examiner Report`, erUrl)}
                className="inline-flex items-center gap-1 text-[#4A7BF7] hover:underline font-semibold"
              >
                <FileText size={12} />
                <span>Official Examiner Report</span>
              </button>
            )}
          </div>

          {/* Question Breakdown Table */}
          {questionEntries.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-[#7B8FAD] uppercase tracking-wider px-1">
                <span>Question Breakdown</span>
                <span>{questionEntries.length} Questions Graded</span>
              </div>

              <div className="border border-[#6382BF]/30 rounded-xl overflow-hidden bg-[#0A1020]">
                <div className="max-h-60 overflow-y-auto divide-y divide-[#6382BF]/15">
                  {questionEntries.map(({ qNum, score }) => (
                    <div
                      key={qNum}
                      className="px-4 py-2 flex items-center justify-between text-xs hover:bg-[#1A2540]/40 transition-colors"
                    >
                      <span className="font-semibold text-[#E8ECF4]">Question {qNum}</span>
                      <span className="font-bold tabular-nums px-2 py-0.5 rounded text-xs bg-[#1A2540] border border-[#6382BF]/30 text-[#4A7BF7]">
                        {score} marks
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="pt-3 border-t border-[#6382BF]/25 flex items-center justify-between gap-3 shrink-0">
          {onDelete ? (
            <button
              type="button"
              onClick={() => {
                if (window.confirm('Are you sure you want to delete this score report from local storage?')) {
                  onDelete();
                }
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-semibold transition-colors"
              title="Delete attempt from local history"
            >
              <Trash2 size={13} />
              <span>Delete Record</span>
            </button>
          ) : <div />}

          <div className="flex items-center gap-3">
            {onRetake && (
              <button
                type="button"
                onClick={onRetake}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0A1020] hover:bg-[#1A2540] text-[#E8ECF4] border border-[#6382BF]/30 text-xs font-semibold transition-colors"
              >
                <RotateCcw size={13} />
                <span>Practice Again</span>
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-[#4A7BF7] hover:bg-[#6382BF] text-white text-xs font-semibold transition-colors shadow-md"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
