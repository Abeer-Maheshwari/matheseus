import React, { useState, useEffect } from 'react';
import { InteractivePaper, InteractiveQuestion } from '../data/interactiveQuestions';
import { FormattedMathText } from './MathRenderer';
import { FormulaBookletModal } from './FormulaBookletModal';
import { FlipClock } from './FlipClock';
import { playExamChime } from '../utils/audio';
import { 
  BookOpen, 
  Flag, 
  CheckCircle2, 
  Clock, 
  ArrowLeft, 
  ArrowRight, 
  RotateCcw, 
  X, 
  ChevronRight,
  Eye,
  EyeOff,
  History,
  Award,
  Layers,
  Sparkles,
  FileText,
  Columns,
  Maximize2,
  Minimize2,
  ExternalLink
} from 'lucide-react';

export type FeedbackMode = 'immediate' | 'end';
export type TimingMode = 'timed' | 'untimed';
export type PracticeViewMode = 'paper' | 'ms' | 'split' | 'cards';

export interface ExamAttempt {
  id: string;
  paperId: string;
  paperCode: string;
  paperTitle: string;
  completedAt: string;
  achievedScore: number;
  maxScore: number;
  percentage: number;
  predictedGrade: string;
  timingMode: TimingMode;
  feedbackMode: FeedbackMode;
  questionScores: Record<number, number>;
}

interface InteractiveExamRunnerProps {
  paper: InteractivePaper;
  onClose: () => void;
  onSaveResult?: (paperId: string, score: number, maxScore: number) => void;
}

export const InteractiveExamRunner: React.FC<InteractiveExamRunnerProps> = ({
  paper,
  onClose,
  onSaveResult,
}) => {
  // Pre-exam setup
  const [isStarted, setIsStarted] = useState(false);
  const [feedbackMode, setFeedbackMode] = useState<FeedbackMode>('immediate');
  const [timingMode, setTimingMode] = useState<TimingMode>('timed');

  // Practice View mode: default to authentic Question Paper PDF if available
  const [viewMode, setViewMode] = useState<PracticeViewMode>(paper.qpUrl ? 'paper' : 'cards');
  const [showScoringPanel, setShowScoringPanel] = useState(true);

  // Active question index
  const [currentIndex, setCurrentIndex] = useState(0);

  // User state per question
  const [scores, setScores] = useState<Record<number, number>>({});
  const [revealedSolutions, setRevealedSolutions] = useState<Record<number, boolean>>({});
  const [flagged, setFlagged] = useState<Record<number, boolean>>({});

  // Timer state
  const totalSeconds = paper.durationMinutes * 60;
  const [secondsRemaining, setSecondsRemaining] = useState(totalSeconds);
  const [isTimerPaused, setIsTimerPaused] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);

  // Formula booklet side drawer
  const [showFormulaDrawer, setShowFormulaDrawer] = useState(false);

  // Completed exam summary view
  const [isFinished, setIsFinished] = useState(false);

  // Past attempts history
  const [pastAttempts, setPastAttempts] = useState<ExamAttempt[]>([]);
  const [showAttemptsModal, setShowAttemptsModal] = useState(false);

  // In-progress session draft recovery
  const draftStorageKey = `matheseus_draft_${paper.id}`;
  const [savedDraft, setSavedDraft] = useState<{
    scores: Record<number, number>;
    flagged: Record<number, boolean>;
    currentIndex: number;
    timeSpent: number;
    secondsRemaining: number;
    feedbackMode: 'immediate' | 'end';
    timingMode: 'timed' | 'untimed';
    timestamp: number;
  } | null>(() => {
    try {
      const raw = localStorage.getItem(`matheseus_draft_${paper.id}`);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  // Auto-save ongoing draft
  useEffect(() => {
    if (isStarted && !isFinished) {
      try {
        localStorage.setItem(
          draftStorageKey,
          JSON.stringify({
            scores,
            flagged,
            currentIndex,
            timeSpent,
            secondsRemaining,
            feedbackMode,
            timingMode,
            timestamp: Date.now(),
          })
        );
      } catch (e) {
        console.warn('Failed to auto-save exam draft', e);
      }
    }
  }, [
    isStarted,
    isFinished,
    scores,
    flagged,
    currentIndex,
    timeSpent,
    secondsRemaining,
    feedbackMode,
    timingMode,
    draftStorageKey,
  ]);

  // Keyboard Shortcuts navigation
  useEffect(() => {
    if (!isStarted || isFinished) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA')) {
        return;
      }

      if (e.key === 'ArrowRight' || e.key === 'l' || e.key === 'L') {
        setCurrentIndex((prev) => Math.min(paper.questions.length - 1, prev + 1));
      } else if (e.key === 'ArrowLeft' || e.key === 'h' || e.key === 'H') {
        setCurrentIndex((prev) => Math.max(0, prev - 1));
      } else if (e.key === 'm' || e.key === 'M') {
        if (paper.msUrl) {
          setViewMode((prev) => (prev === 'ms' ? 'paper' : 'ms'));
        }
      } else if (e.key === 's' || e.key === 'S') {
        if (paper.msUrl) {
          setViewMode((prev) => (prev === 'split' ? 'paper' : 'split'));
        }
      } else if (e.key === 'f' || e.key === 'F') {
        const qNum = paper.questions[currentIndex]?.number || (currentIndex + 1);
        setFlagged((prev) => ({ ...prev, [qNum]: !prev[qNum] }));
      } else if (e.key === 'b' || e.key === 'B') {
        setShowFormulaDrawer((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isStarted, isFinished, currentIndex, paper.questions, paper.msUrl]);

  // Load past attempts on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('matheseus_exam_attempts');
      if (saved) {
        setPastAttempts(JSON.parse(saved));
      }
    } catch (e) {
      console.warn('Failed to load past attempts', e);
    }
  }, []);

  // Timer loop
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isStarted && !isFinished && timingMode === 'timed' && !isTimerPaused && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            playExamChime();
            return 0;
          }
          return prev - 1;
        });
        setTimeSpent((prev) => prev + 1);
      }, 1000);
    } else if (isStarted && !isFinished && timingMode === 'untimed') {
      interval = setInterval(() => {
        setTimeSpent((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isStarted, isFinished, timingMode, isTimerPaused, secondsRemaining]);

  const currentQ: InteractiveQuestion = paper.questions[currentIndex] || paper.questions[0];

  const handleScoreChange = (qNum: number, value: string, maxMarks: number) => {
    const num = parseInt(value, 10);
    if (!isNaN(num)) {
      const clamped = Math.max(0, Math.min(num, maxMarks));
      setScores((prev) => ({ ...prev, [qNum]: clamped }));
    } else if (value === '') {
      setScores((prev) => {
        const copy = { ...prev };
        delete copy[qNum];
        return copy;
      });
    }
  };

  const totalAchievedScore = Object.values(scores).reduce((a, b) => a + b, 0);
  const paperMaxMarks = paper.totalMarks || paper.questions.reduce((a, b) => a + b.totalMarks, 0);
  const percent = Math.round((totalAchievedScore / paperMaxMarks) * 100);

  const calculateGrade = (pct: number) => {
    if (pct >= 82) return 'A*';
    if (pct >= 68) return 'A';
    if (pct >= 55) return 'B';
    if (pct >= 44) return 'C';
    if (pct >= 34) return 'D';
    if (pct >= 24) return 'E';
    return 'U';
  };

  const handleFinishExam = () => {
    setIsFinished(true);
    const grade = calculateGrade(percent);

    // Save to local storage attempts
    const newAttempt: ExamAttempt = {
      id: `attempt_${Date.now()}`,
      paperId: paper.id,
      paperCode: paper.paperCode,
      paperTitle: paper.title,
      completedAt: new Date().toISOString(),
      achievedScore: totalAchievedScore,
      maxScore: paperMaxMarks,
      percentage: percent,
      predictedGrade: grade,
      timingMode,
      feedbackMode,
      questionScores: scores,
    };

    const updated = [newAttempt, ...pastAttempts];
    setPastAttempts(updated);
    try {
      localStorage.setItem('matheseus_exam_attempts', JSON.stringify(updated));
      localStorage.removeItem(draftStorageKey);
    } catch (e) {
      console.warn('Failed to save attempt', e);
    }

    if (onSaveResult) {
      onSaveResult(paper.id, totalAchievedScore, paperMaxMarks);
    }
  };

  const handleRestart = () => {
    try {
      localStorage.removeItem(draftStorageKey);
    } catch {}
    setSavedDraft(null);
    setScores({});
    setRevealedSolutions({});
    setFlagged({});
    setCurrentIndex(0);
    setSecondsRemaining(totalSeconds);
    setTimeSpent(0);
    setIsFinished(false);
    setIsStarted(false);
  };

  // Setup / Start screen
  if (!isStarted) {
    const paperAttempts = pastAttempts.filter((a) => a.paperId === paper.id);

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A1020]/90 backdrop-blur-sm text-[#E8ECF4] animate-fadeIn">
        <div className="bg-[#1A2540] border border-[#6382BF]/40 rounded-xl max-w-lg w-full p-6 space-y-5 shadow-2xl animate-modalFadeIn">
          <div className="border-b border-[#6382BF]/25 pb-4">
            <div className="flex items-center justify-between">
              <span className="text-xs px-2.5 py-1 rounded bg-[#0A1020] border border-[#6382BF]/40 text-[#4A7BF7] font-semibold">
                {paper.paperCode}
              </span>
              {paperAttempts.length > 0 && (
                <button
                  onClick={() => setShowAttemptsModal(true)}
                  className="flex items-center gap-1.5 text-xs text-[#7B8FAD] hover:text-[#E8ECF4] transition-colors"
                >
                  <History size={13} className="text-[#4A7BF7]" />
                  <span>{paperAttempts.length} Past {paperAttempts.length === 1 ? 'Attempt' : 'Attempts'}</span>
                </button>
              )}
            </div>
            <h2 className="text-xl font-bold text-[#E8ECF4] mt-2.5">{paper.title}</h2>
            <p className="text-xs text-[#7B8FAD] mt-1">
              {paper.questions.length} questions · {paperMaxMarks} marks total · {paper.durationMinutes} minutes
            </p>
          </div>

          {/* Session Draft Recovery Banner */}
          {savedDraft && (
            <div className="p-3.5 rounded-xl bg-[#0A1020] border border-[#4A7BF7]/60 flex items-center justify-between text-xs shadow-sm">
              <div>
                <div className="font-semibold text-[#E8ECF4] flex items-center gap-1.5">
                  <Clock size={13} className="text-[#4A7BF7]" />
                  <span>Resume In-Progress Attempt?</span>
                </div>
                <div className="text-[11px] text-[#7B8FAD] mt-0.5">
                  {Object.keys(savedDraft.scores || {}).length} questions marked · Q{(savedDraft.currentIndex || 0) + 1} of {paper.questions.length}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    try {
                      localStorage.removeItem(draftStorageKey);
                    } catch {}
                    setSavedDraft(null);
                  }}
                  className="px-2 py-1 text-[11px] text-[#7B8FAD] hover:text-[#E8ECF4] transition-colors"
                >
                  Discard
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setScores(savedDraft.scores || {});
                    setFlagged(savedDraft.flagged || {});
                    setCurrentIndex(savedDraft.currentIndex || 0);
                    setTimeSpent(savedDraft.timeSpent || 0);
                    if (savedDraft.secondsRemaining !== undefined) {
                      setSecondsRemaining(savedDraft.secondsRemaining);
                    }
                    if (savedDraft.feedbackMode) setFeedbackMode(savedDraft.feedbackMode);
                    if (savedDraft.timingMode) setTimingMode(savedDraft.timingMode);
                    setIsStarted(true);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-[#4A7BF7] hover:bg-[#6382BF] text-[#E8ECF4] font-semibold text-xs transition-colors shadow-sm"
                >
                  Resume
                </button>
              </div>
            </div>
          )}

          {/* Option: Timing */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-[#E8ECF4] block uppercase tracking-wider">
              Exam Timer
            </label>
            <div className="grid grid-cols-2 gap-2.5 text-xs">
              <button
                type="button"
                onClick={() => setTimingMode('timed')}
                className={`p-3 rounded-lg border text-left transition-colors ${
                  timingMode === 'timed'
                    ? 'bg-[#0A1020] border-[#4A7BF7] text-[#E8ECF4] font-medium shadow-sm'
                    : 'bg-[#0A1020]/50 border-[#6382BF]/25 text-[#7B8FAD] hover:text-[#E8ECF4]'
                }`}
              >
                <div className="font-semibold text-[#E8ECF4] mb-0.5 flex items-center gap-1.5">
                  <Clock size={13} className="text-[#4A7BF7]" />
                  <span>Timed ({paper.durationMinutes} mins)</span>
                </div>
                <div className="text-[11px] text-[#7B8FAD]">Real exam conditions with alert.</div>
              </button>

              <button
                type="button"
                onClick={() => setTimingMode('untimed')}
                className={`p-3 rounded-lg border text-left transition-colors ${
                  timingMode === 'untimed'
                    ? 'bg-[#0A1020] border-[#4A7BF7] text-[#E8ECF4] font-medium shadow-sm'
                    : 'bg-[#0A1020]/50 border-[#6382BF]/25 text-[#7B8FAD] hover:text-[#E8ECF4]'
                }`}
              >
                <div className="font-semibold text-[#E8ECF4] mb-0.5 flex items-center gap-1.5">
                  <Sparkles size={13} className="text-[#7B8FAD]" />
                  <span>Untimed Practice</span>
                </div>
                <div className="text-[11px] text-[#7B8FAD]">Work through at your own pace.</div>
              </button>
            </div>
          </div>

          {/* Information Notice */}
          <div className="p-3 rounded-lg bg-[#0A1020] border border-[#6382BF]/30 text-xs text-[#7B8FAD] space-y-1">
            <div className="flex items-center gap-2 text-[#E8ECF4] font-semibold">
              <FileText size={14} className="text-[#4A7BF7]" />
              <span>Authentic Past Exam Paper Loaded</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Practicing under official conditions with the authentic {paper.title} question paper. You can score question-by-question, toggle the mark scheme, and access formula tables throughout.
            </p>
          </div>

          {/* Actions */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-[#7B8FAD] hover:text-[#E8ECF4] hover:bg-[#0A1020] transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => setIsStarted(true)}
              className="px-6 py-2 rounded-lg bg-[#4A7BF7] hover:bg-[#6382BF] text-[#E8ECF4] font-semibold text-xs shadow-md transition-colors"
            >
              Start Exam Practice
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Finished / Review screen
  if (isFinished) {
    const grade = calculateGrade(percent);

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A1020]/95 backdrop-blur-md text-[#E8ECF4] overflow-y-auto animate-fadeIn">
        <div className="bg-[#1A2540] border border-[#6382BF]/40 rounded-2xl max-w-2xl w-full p-6 md:p-8 space-y-6 shadow-2xl my-8 animate-modalFadeIn">
          {/* Header */}
          <div className="border-b border-[#6382BF]/25 pb-5 flex items-center justify-between">
            <div>
              <span className="text-xs px-2.5 py-1 rounded bg-[#0A1020] border border-[#6382BF]/40 text-[#4A7BF7] font-semibold">
                {paper.paperCode}
              </span>
              <h2 className="text-2xl font-bold text-[#E8ECF4] mt-2">Exam Results & Review</h2>
              <p className="text-xs text-[#7B8FAD] mt-1">{paper.title}</p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#7B8FAD] hover:text-[#E8ECF4] hover:bg-[#0A1020] transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Score & Grade Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-[#0A1020] border border-[#6382BF]/30 text-center">
              <span className="text-xs text-[#7B8FAD] uppercase tracking-wider block mb-1">
                Total Score
              </span>
              <div className="text-3xl font-extrabold text-[#E8ECF4] tabular-nums">
                {totalAchievedScore} <span className="text-lg text-[#7B8FAD] font-normal">/ {paperMaxMarks}</span>
              </div>
              <div className="text-xs text-[#7B8FAD] mt-1 tabular-nums">{percent}% achieved</div>
            </div>

            <div className="p-4 rounded-xl bg-[#0A1020] border border-[#6382BF]/30 text-center">
              <span className="text-xs text-[#7B8FAD] uppercase tracking-wider block mb-1">
                Predicted Grade
              </span>
              <div className="text-3xl font-extrabold text-[#4A7BF7]">{grade}</div>
              <div className="text-[11px] text-[#7B8FAD] mt-1">Official Edexcel boundaries</div>
            </div>

            <div className="p-4 rounded-xl bg-[#0A1020] border border-[#6382BF]/30 text-center">
              <span className="text-xs text-[#7B8FAD] uppercase tracking-wider block mb-1">
                Time Spent
              </span>
              <div className="text-2xl font-extrabold text-[#E8ECF4] tabular-nums">
                {Math.floor(timeSpent / 60)}m {timeSpent % 60}s
              </div>
              <div className="text-xs text-[#7B8FAD] mt-1">
                {timingMode === 'timed' ? `${paper.durationMinutes}m limit` : 'Untimed'}
              </div>
            </div>
          </div>

          {/* Question Breakdown Table */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-[#7B8FAD] uppercase tracking-wider">
              Question Score Breakdown
            </h3>
            <div className="border border-[#6382BF]/25 rounded-xl overflow-hidden bg-[#0A1020]">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#6382BF]/20 bg-[#1A2540] text-[#7B8FAD] text-[11px] font-semibold">
                    <th className="py-2.5 px-3">Question</th>
                    <th className="py-2.5 px-3">Topic</th>
                    <th className="py-2.5 px-3 text-right">Score</th>
                    <th className="py-2.5 px-3 text-right">Max</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#6382BF]/15">
                  {paper.questions.map((q) => {
                    const qScore = scores[q.number] || 0;
                    return (
                      <tr key={q.number} className="hover:bg-[#1A2540]/40">
                        <td className="py-2 px-3 font-semibold text-[#E8ECF4]">Q{q.number}</td>
                        <td className="py-2 px-3 text-[#7B8FAD] truncate max-w-xs">{q.topic}</td>
                        <td className="py-2 px-3 text-right font-bold text-[#E8ECF4] tabular-nums">
                          {qScore}
                        </td>
                        <td className="py-2 px-3 text-right text-[#7B8FAD] tabular-nums">
                          {q.totalMarks}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-[#6382BF]/25 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={handleRestart}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium text-[#7B8FAD] hover:text-[#E8ECF4] hover:bg-[#0A1020] transition-colors"
            >
              <RotateCcw size={13} />
              <span>Retry Paper</span>
            </button>

            <div className="flex items-center gap-2.5">
              {paper.msUrl && (
                <button
                  onClick={() => {
                    setIsFinished(false);
                    setViewMode('split');
                  }}
                  className="px-4 py-2 rounded-lg bg-[#0A1020] hover:bg-[#4A7BF7]/20 text-[#E8ECF4] border border-[#6382BF]/40 font-medium text-xs transition-colors"
                >
                  Review with Mark Scheme
                </button>
              )}
              <button
                onClick={onClose}
                className="px-6 py-2 rounded-lg bg-[#4A7BF7] hover:bg-[#6382BF] text-[#E8ECF4] font-semibold text-xs shadow-sm transition-colors"
              >
                Return to Papers
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Active Practice Exam Runner View
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#0A1020] text-[#E8ECF4]">
      {/* Top Exam Header */}
      <div className="h-14 px-4 bg-[#1A2540] border-b border-[#6382BF]/30 flex items-center justify-between gap-4 shrink-0 shadow-md">
        {/* Left: Paper Identifier */}
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-xs px-2.5 py-0.5 rounded bg-[#0A1020] border border-[#6382BF]/40 text-[#4A7BF7] font-semibold shrink-0">
            {paper.paperCode}
          </span>
          <span className="font-bold text-sm text-[#E8ECF4] truncate hidden md:inline">
            {paper.title}
          </span>
          <span className="text-xs px-2 py-0.5 rounded bg-[#4A7BF7]/15 text-[#4A7BF7] font-semibold border border-[#4A7BF7]/30 hidden sm:inline shrink-0">
            Practice Mode
          </span>
        </div>

        {/* Center: FlipClock Countdown Timer */}
        <div className="flex items-center gap-2">
          {timingMode === 'timed' ? (
            <div className="flex items-center gap-2 bg-[#0A1020] px-2.5 py-1 rounded-lg border border-[#6382BF]/30">
              <Clock size={13} className="text-[#4A7BF7]" />
              <FlipClock
                secondsRemaining={secondsRemaining}
                isPaused={isTimerPaused}
                onTogglePause={() => setIsTimerPaused(!isTimerPaused)}
              />
              <button
                onClick={() => setIsTimerPaused(!isTimerPaused)}
                className="text-[10px] px-1.5 py-0.5 rounded bg-[#1A2540] hover:bg-[#4A7BF7] hover:text-white text-[#7B8FAD] transition-colors ml-1 font-semibold"
                title={isTimerPaused ? 'Resume Timer' : 'Pause Timer'}
              >
                {isTimerPaused ? 'Resume' : 'Pause'}
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-xs text-[#7B8FAD] bg-[#0A1020] px-3 py-1 rounded-lg border border-[#6382BF]/30 tabular-nums">
              <Sparkles size={13} className="text-[#4A7BF7]" />
              <span>{Math.floor(timeSpent / 60)}m {timeSpent % 60}s</span>
            </div>
          )}
        </div>

        {/* Right: View Mode Tabs & Tools */}
        <div className="flex items-center gap-2">
          {/* View Switcher Tabs (Paper / MS / Split / Cards) */}
          <div className="flex items-center bg-[#0A1020] p-1 rounded-lg border border-[#6382BF]/30 text-xs">
            {paper.qpUrl && (
              <button
                onClick={() => setViewMode('paper')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md font-medium transition-colors ${
                  viewMode === 'paper'
                    ? 'bg-[#4A7BF7] text-white font-semibold shadow-sm'
                    : 'text-[#7B8FAD] hover:text-[#E8ECF4]'
                }`}
                title="View Question Paper PDF"
              >
                <FileText size={13} />
                <span className="hidden lg:inline">Paper</span>
              </button>
            )}

            {paper.msUrl && (
              <button
                onClick={() => setViewMode('ms')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md font-medium transition-colors ${
                  viewMode === 'ms'
                    ? 'bg-[#4A7BF7] text-white font-semibold shadow-sm'
                    : 'text-[#7B8FAD] hover:text-[#E8ECF4]'
                }`}
                title="View Mark Scheme PDF"
              >
                <BookOpen size={13} />
                <span className="hidden lg:inline">Mark Scheme</span>
              </button>
            )}

            {paper.qpUrl && paper.msUrl && (
              <button
                onClick={() => setViewMode('split')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md font-medium transition-colors ${
                  viewMode === 'split'
                    ? 'bg-[#4A7BF7] text-white font-semibold shadow-sm'
                    : 'text-[#7B8FAD] hover:text-[#E8ECF4]'
                }`}
                title="Split View side-by-side"
              >
                <Columns size={13} />
                <span className="hidden lg:inline">Split</span>
              </button>
            )}
          </div>

          {/* Toggle Formula Booklet Side Drawer */}
          <button
            onClick={() => setShowFormulaDrawer(!showFormulaDrawer)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border font-medium transition-colors ${
              showFormulaDrawer
                ? 'bg-[#0A1020] border-[#4A7BF7] text-[#E8ECF4]'
                : 'bg-[#0A1020] hover:bg-[#4A7BF7] text-[#E8ECF4] border-[#6382BF]/40'
            }`}
            title="Toggle Formula Booklet Dock (Key: B)"
          >
            <BookOpen size={13} className="text-[#7B8FAD]" />
            <span className="hidden md:inline">Formulas</span>
          </button>

          {/* Toggle Scoring Panel */}
          <button
            onClick={() => setShowScoringPanel(!showScoringPanel)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded-lg border font-medium transition-colors ${
              showScoringPanel
                ? 'bg-[#0A1020] border-[#4A7BF7] text-[#E8ECF4]'
                : 'bg-[#0A1020] hover:bg-[#4A7BF7]/40 border-[#6382BF]/40 text-[#E8ECF4]'
            }`}
            title="Toggle Scoring Panel"
          >
            <Layers size={13} className="text-[#4A7BF7]" />
            <span className="hidden sm:inline">Scoring</span>
          </button>

          {/* Finish & Grade Button */}
          <button
            onClick={handleFinishExam}
            className="px-3.5 py-1.5 text-xs rounded-lg bg-[#4A7BF7] hover:bg-[#6382BF] text-[#E8ECF4] font-semibold transition-colors shadow-sm shrink-0"
          >
            Finish
          </button>
        </div>
      </div>

      {/* Main Workspace Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left/Center Workspace: PDF Viewports with Persistent IFrames */}
        <div className="flex-1 flex h-full overflow-hidden bg-[#0A1020]">
          {/* Question Paper PDF Panel */}
          {paper.qpUrl && (
            <div
              className={`h-full ${
                viewMode === 'paper' || viewMode === 'split' ? 'flex-1' : 'hidden'
              } flex flex-col border-r border-[#6382BF]/25`}
            >
              <div className="h-8 px-3 bg-[#1A2540] border-b border-[#6382BF]/20 flex items-center justify-between text-[11px] text-[#7B8FAD]">
                <span className="font-semibold text-[#E8ECF4] flex items-center gap-1.5">
                  <FileText size={12} className="text-[#4A7BF7]" />
                  Question Paper · {paper.title}
                </span>
                <a
                  href={paper.qpUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#E8ECF4] flex items-center gap-1"
                >
                  <span>Open in tab</span>
                  <ExternalLink size={10} />
                </a>
              </div>
              <iframe
                src={`${paper.qpUrl}#toolbar=0&navpanes=0&view=FitH`}
                className="w-full flex-1 border-0"
                title={`${paper.title} Question Paper`}
              />
            </div>
          )}

          {/* Mark Scheme PDF Panel */}
          {paper.msUrl && (
            <div
              className={`h-full ${
                viewMode === 'ms' || viewMode === 'split' ? 'flex-1' : 'hidden'
              } flex flex-col`}
            >
              <div className="h-8 px-3 bg-[#1A2540] border-b border-[#6382BF]/20 flex items-center justify-between text-[11px] text-[#7B8FAD]">
                <span className="font-semibold text-[#E8ECF4] flex items-center gap-1.5">
                  <BookOpen size={12} className="text-[#4A7BF7]" />
                  Mark Scheme · {paper.title}
                </span>
                <a
                  href={paper.msUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#E8ECF4] flex items-center gap-1"
                >
                  <span>Open in tab</span>
                  <ExternalLink size={10} />
                </a>
              </div>
              <iframe
                src={`${paper.msUrl}#toolbar=0&navpanes=0&view=FitH`}
                className="w-full flex-1 border-0"
                title={`${paper.title} Mark Scheme`}
              />
            </div>
          )}

          {/* Fallback Cards View (if no PDF or toggled to cards) */}
          {viewMode === 'cards' && (
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
              <div className="max-w-3xl mx-auto space-y-6">
                <div className="border border-[#6382BF]/30 rounded-xl p-5 bg-[#1A2540] space-y-4 shadow-sm">
                  <div className="flex items-center justify-between border-b border-[#6382BF]/25 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-base text-[#E8ECF4]">Question {currentQ.number}</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-[#0A1020] text-[#4A7BF7] font-semibold border border-[#6382BF]/30">
                        {currentQ.topic}
                      </span>
                    </div>
                    <span className="text-xs text-[#7B8FAD]">{currentQ.totalMarks} marks</span>
                  </div>

                  {currentQ.contextText && (
                    <div className="p-4 rounded-lg bg-[#0A1020] border border-[#6382BF]/25 text-sm leading-relaxed">
                      <FormattedMathText text={currentQ.contextText} />
                    </div>
                  )}

                  <div className="space-y-4">
                    {currentQ.parts.map((p, pIdx) => (
                      <div key={pIdx} className="pl-3 border-l-2 border-[#4A7BF7] space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-[#E8ECF4]">Part {p.partLabel}</span>
                          <span className="text-[#7B8FAD]">[{p.marks} marks]</span>
                        </div>
                        <FormattedMathText text={p.text} className="text-sm text-[#E8ECF4]" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Interactive Question Scoring Companion */}
        {showScoringPanel && (
          <div className="w-80 md:w-96 bg-[#1A2540] border-l border-[#6382BF]/30 flex flex-col shrink-0 shadow-2xl">
            {/* Companion Header */}
            <div className="p-3.5 border-b border-[#6382BF]/25 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-[#7B8FAD] uppercase tracking-wider block">
                  Self-Marking
                </span>
                <div className="text-base font-bold text-[#E8ECF4] tabular-nums mt-0.5">
                  {totalAchievedScore} <span className="text-xs text-[#7B8FAD] font-normal">/ {paperMaxMarks} marks</span>
                  <span className="text-xs text-[#4A7BF7] ml-2">({percent}%)</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-[#7B8FAD] block">Grade</span>
                <span className="text-base font-bold text-[#4A7BF7]">{calculateGrade(percent)}</span>
              </div>
            </div>

            {/* Questions Grid Selector */}
            <div className="p-3 border-b border-[#6382BF]/25 overflow-y-auto max-h-40">
              <div className="text-[11px] font-semibold text-[#7B8FAD] uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>Questions</span>
                <span>{Object.keys(scores).length}/{paper.questions.length} marked</span>
              </div>
              <div className="grid grid-cols-6 gap-1.5">
                {paper.questions.map((q, idx) => {
                  const isAnswered = scores[q.number] !== undefined;
                  const isCurrent = idx === currentIndex;
                  const isFlag = !!flagged[q.number];

                  return (
                    <button
                      key={q.number}
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-8 rounded text-xs font-semibold relative transition-colors flex items-center justify-center ${
                        isCurrent
                          ? 'bg-[#4A7BF7] text-white shadow-sm ring-1 ring-white/50'
                          : isAnswered
                          ? 'bg-emerald-600/30 border border-emerald-500/50 text-emerald-300'
                          : 'bg-[#0A1020] border border-[#6382BF]/30 text-[#7B8FAD] hover:text-[#E8ECF4]'
                      }`}
                    >
                      <span>Q{q.number}</span>
                      {isFlag && (
                        <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-400" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Current Question Scoring Box */}
            <div className="p-4 flex-1 overflow-y-auto space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-[#E8ECF4]">Question {currentQ.number}</span>
                  <p className="text-[11px] text-[#7B8FAD] truncate max-w-[200px]">{currentQ.topic}</p>
                </div>
                <button
                  onClick={() => setFlagged((prev) => ({ ...prev, [currentQ.number]: !prev[currentQ.number] }))}
                  className={`p-1.5 rounded-lg border text-xs transition-colors ${
                    flagged[currentQ.number]
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      : 'bg-[#0A1020] text-[#7B8FAD] border-[#6382BF]/30 hover:text-[#E8ECF4]'
                  }`}
                  title="Flag question for review"
                >
                  <Flag size={13} />
                </button>
              </div>

              {/* Score Input Card */}
              <div className="p-4 rounded-xl bg-[#0A1020] border border-[#6382BF]/30 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#7B8FAD]">Award Marks:</span>
                  <span className="text-[#E8ECF4] font-semibold tabular-nums">
                    Max: {currentQ.totalMarks} marks
                  </span>
                </div>

                <div className="flex items-center justify-center gap-3">
                  <input
                    type="number"
                    min="0"
                    max={currentQ.totalMarks}
                    value={scores[currentQ.number] !== undefined ? String(scores[currentQ.number]) : ''}
                    onChange={(e) => handleScoreChange(currentQ.number, e.target.value, currentQ.totalMarks)}
                    placeholder="0"
                    className="w-20 px-3 py-2 bg-[#1A2540] border border-[#6382BF]/50 rounded-lg text-center text-[#E8ECF4] font-bold text-lg tabular-nums focus:outline-none focus:border-[#4A7BF7]"
                  />
                  <span className="text-[#7B8FAD] text-sm">/ {currentQ.totalMarks}</span>
                </div>

                {/* Quick-fill score presets */}
                <div className="grid grid-cols-3 gap-1.5 pt-1">
                  <button
                    type="button"
                    onClick={() => handleScoreChange(currentQ.number, '0', currentQ.totalMarks)}
                    className="py-1 text-[11px] rounded bg-[#1A2540] hover:bg-[#1A2540]/80 text-[#7B8FAD] hover:text-[#E8ECF4] border border-[#6382BF]/25 font-medium"
                  >
                    0
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleScoreChange(
                        currentQ.number,
                        String(Math.round(currentQ.totalMarks / 2)),
                        currentQ.totalMarks
                      )
                    }
                    className="py-1 text-[11px] rounded bg-[#1A2540] hover:bg-[#1A2540]/80 text-[#7B8FAD] hover:text-[#E8ECF4] border border-[#6382BF]/25 font-medium"
                  >
                    ½ Marks
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleScoreChange(currentQ.number, String(currentQ.totalMarks), currentQ.totalMarks)
                    }
                    className="py-1 text-[11px] rounded bg-[#1A2540] hover:bg-[#1A2540]/80 text-[#7B8FAD] hover:text-[#E8ECF4] border border-[#6382BF]/25 font-medium"
                  >
                    Full ({currentQ.totalMarks})
                  </button>
                </div>
              </div>

              {/* Quick Mark Scheme Trigger */}
              {paper.msUrl && (
                <button
                  type="button"
                  onClick={() => setViewMode(viewMode === 'split' ? 'paper' : 'split')}
                  className="w-full py-2 rounded-lg bg-[#0A1020] hover:bg-[#4A7BF7]/20 text-[#E8ECF4] border border-[#6382BF]/30 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <BookOpen size={13} className="text-[#4A7BF7]" />
                  <span>{viewMode === 'split' ? 'Close Mark Scheme' : 'Split with Mark Scheme'}</span>
                </button>
              )}
            </div>

            {/* Bottom Nav inside companion */}
            <div className="p-3 border-t border-[#6382BF]/25 flex items-center justify-between gap-2 bg-[#0A1020]/50">
              <button
                onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
                disabled={currentIndex === 0}
                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 border transition-colors ${
                  currentIndex === 0
                    ? 'opacity-40 cursor-not-allowed bg-[#0A1020] text-[#7B8FAD]/40 border-transparent'
                    : 'bg-[#0A1020] hover:bg-[#4A7BF7] text-[#E8ECF4] border-[#6382BF]/40'
                }`}
              >
                <ArrowLeft size={12} />
                <span>Prev Q</span>
              </button>

              <button
                onClick={() => setCurrentIndex(Math.min(paper.questions.length - 1, currentIndex + 1))}
                disabled={currentIndex === paper.questions.length - 1}
                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 border transition-colors ${
                  currentIndex === paper.questions.length - 1
                    ? 'opacity-40 cursor-not-allowed bg-[#0A1020] text-[#7B8FAD]/40 border-transparent'
                    : 'bg-[#0A1020] hover:bg-[#4A7BF7] text-[#E8ECF4] border-[#6382BF]/40'
                }`}
              >
                <span>Next Q</span>
                <ArrowRight size={12} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Docked Formula Drawer */}
      {showFormulaDrawer && (
        <FormulaBookletModal
          mode="drawer"
          onClose={() => setShowFormulaDrawer(false)}
        />
      )}
    </div>
  );
};
