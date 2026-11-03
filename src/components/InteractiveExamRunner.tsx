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
  Sparkles
} from 'lucide-react';

export type FeedbackMode = 'immediate' | 'end';
export type TimingMode = 'timed' | 'untimed';

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

  // Active question index
  const [currentIndex, setCurrentIndex] = useState(0);

  // User state per question
  const [scores, setScores] = useState<Record<number, number>>({});
  const [revealedSolutions, setRevealedSolutions] = useState<Record<number, boolean>>({});
  const [flagged, setFlagged] = useState<Record<number, boolean>>({});

  // Navigation drawer / filter
  const [navFilter, setNavFilter] = useState<'all' | 'flagged' | 'unanswered'>('all');
  const [showNavDrawer, setShowNavDrawer] = useState(false);

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
        if (feedbackMode === 'immediate') {
          const qNum = paper.questions[currentIndex].number;
          setRevealedSolutions((prev) => ({ ...prev, [qNum]: !prev[qNum] }));
        }
      } else if (e.key === 'f' || e.key === 'F') {
        const qNum = paper.questions[currentIndex].number;
        setFlagged((prev) => ({ ...prev, [qNum]: !prev[qNum] }));
      } else if (e.key === 'b' || e.key === 'B') {
        setShowFormulaDrawer((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isStarted, isFinished, currentIndex, paper.questions, feedbackMode]);

  // Load past attempts on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('matheseus_exam_attempts');
      if (saved) {
        const parsed = JSON.parse(saved);
        setPastAttempts(parsed);
      }
    } catch (e) {
      console.warn('Failed to parse past attempts', e);
    }
  }, []);

  // Timer loop
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isStarted && !isFinished && timingMode === 'timed' && !isTimerPaused && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            playExamChime();
            setIsFinished(true);
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
  const paperMaxMarks = paper.questions.reduce((a, b) => a + b.totalMarks, 0);
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
              {paper.questions.length} questions · {paperMaxMarks} marks
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

          {/* Option: Feedback Mode */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-[#E8ECF4] block uppercase tracking-wider">
              Mark Scheme Display
            </label>
            <div className="grid grid-cols-2 gap-2.5 text-xs">
              <button
                type="button"
                onClick={() => setFeedbackMode('immediate')}
                className={`p-3 rounded-lg border text-left transition-colors ${
                  feedbackMode === 'immediate'
                    ? 'bg-[#0A1020] border-[#4A7BF7] text-[#E8ECF4] font-medium shadow-sm'
                    : 'bg-[#0A1020]/50 border-[#6382BF]/25 text-[#7B8FAD] hover:text-[#E8ECF4]'
                }`}
              >
                <div className="font-semibold text-[#E8ECF4] mb-0.5 flex items-center gap-1.5">
                  <Eye size={13} className="text-[#4A7BF7]" />
                  <span>After Each Question</span>
                </div>
                <div className="text-[11px] text-[#7B8FAD]">Show answers and marking guidance as you go.</div>
              </button>

              <button
                type="button"
                onClick={() => setFeedbackMode('end')}
                className={`p-3 rounded-lg border text-left transition-colors ${
                  feedbackMode === 'end'
                    ? 'bg-[#0A1020] border-[#4A7BF7] text-[#E8ECF4] font-medium shadow-sm'
                    : 'bg-[#0A1020]/50 border-[#6382BF]/25 text-[#7B8FAD] hover:text-[#E8ECF4]'
                }`}
              >
                <div className="font-semibold text-[#E8ECF4] mb-0.5 flex items-center gap-1.5">
                  <EyeOff size={13} className="text-[#7B8FAD]" />
                  <span>At the End</span>
                </div>
                <div className="text-[11px] text-[#7B8FAD]">Show answers after submitting all questions.</div>
              </button>
            </div>
          </div>

          {/* Option: Timing */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-[#E8ECF4] block uppercase tracking-wider">
              Timer
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
                <div className="text-[11px] text-[#7B8FAD]">Countdown with sound alert.</div>
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
                  <span>Untimed</span>
                </div>
                <div className="text-[11px] text-[#7B8FAD]">Practice with no time limit.</div>
              </button>
            </div>
          </div>

          {/* Formula Booklet Access notice */}
          <div className="p-3 rounded-lg bg-[#0A1020] border border-[#6382BF]/30 text-xs text-[#7B8FAD] flex items-center gap-2.5">
            <BookOpen size={16} className="text-[#4A7BF7] shrink-0" />
            <span>Formula booklet is available throughout the test.</span>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs rounded-lg bg-[#0A1020] hover:bg-[#0A1020]/80 text-[#7B8FAD] hover:text-[#E8ECF4] border border-[#6382BF]/30 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => setIsStarted(true)}
              className="px-5 py-2 text-xs font-semibold rounded-lg bg-[#4A7BF7] hover:bg-[#6382BF] text-[#E8ECF4] transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <span>Start</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>

        {/* Past Attempts Modal */}
        {showAttemptsModal && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-[#1A2540] border border-[#6382BF]/40 rounded-xl max-w-md w-full p-5 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between border-b border-[#6382BF]/25 pb-2.5">
                <h3 className="font-semibold text-[#E8ECF4] text-sm flex items-center gap-2">
                  <History size={16} className="text-[#4A7BF7]" />
                  Past Attempts for {paper.paperCode}
                </h3>
                <button
                  onClick={() => setShowAttemptsModal(false)}
                  className="p-1 rounded text-[#7B8FAD] hover:text-[#E8ECF4]"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="max-h-72 overflow-y-auto space-y-2">
                {paperAttempts.map((att) => (
                  <div key={att.id} className="p-3 rounded-lg bg-[#0A1020] border border-[#6382BF]/30 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-semibold text-[#E8ECF4]">
                        {new Date(att.completedAt).toLocaleDateString()} {new Date(att.completedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                      <div className="text-[11px] text-[#7B8FAD]">
                        {att.timingMode === 'timed' ? 'Timed' : 'Untimed'} · {att.feedbackMode === 'immediate' ? 'Immediate' : 'Exam Mode'}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-[#E8ECF4] text-sm tabular-nums">
                        {att.achievedScore} / {att.maxScore}
                      </div>
                      <span className="inline-block px-1.5 py-0.2 rounded bg-[#4A7BF7] text-[#E8ECF4] font-bold text-[10px]">
                        Grade {att.predictedGrade} ({att.percentage}%)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Finished Summary / Review Screen
  if (isFinished) {
    const grade = calculateGrade(percent);

    return (
      <div className="fixed inset-0 z-50 flex flex-col bg-[#0A1020] text-[#E8ECF4] overflow-y-auto">
        <div className="max-w-4xl mx-auto w-full px-4 py-8 space-y-6">
          {/* Top Banner */}
          <div className="border-b border-[#6382BF]/30 pb-4 flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs px-2.5 py-0.5 rounded bg-[#1A2540] border border-[#6382BF]/40 text-[#4A7BF7] font-semibold">
                  {paper.paperCode}
                </span>
                <span className="text-xs text-[#7B8FAD] font-medium flex items-center gap-1">
                  <CheckCircle2 size={13} className="text-[#4A7BF7]" />
                  Saved
                </span>
              </div>
              <h2 className="text-2xl font-bold text-[#E8ECF4] mt-1.5">{paper.title} — Summary</h2>
            </div>
            <div className="flex items-center gap-2.5">
              <button
                onClick={handleRestart}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1A2540] hover:bg-[#4A7BF7] text-[#E8ECF4] border border-[#6382BF]/40 text-xs font-medium transition-colors"
              >
                <RotateCcw size={13} />
                <span>Retake</span>
              </button>
              <button
                onClick={onClose}
                className="px-4 py-1.5 rounded-lg bg-[#4A7BF7] hover:bg-[#6382BF] text-[#E8ECF4] font-semibold text-xs transition-colors shadow-sm"
              >
                Done
              </button>
            </div>
          </div>

          {/* Performance Summary Card */}
          <div className="p-6 rounded-xl border border-[#6382BF]/30 bg-[#1A2540] flex flex-wrap items-center justify-between gap-6 shadow-md">
            <div className="space-y-1">
              <div className="text-xs text-[#7B8FAD] uppercase tracking-wider font-semibold">Score</div>
              <div className="text-4xl font-serif font-extrabold text-[#E8ECF4] tabular-nums flex items-baseline gap-2">
                <span>{totalAchievedScore}</span>
                <span className="text-lg text-[#7B8FAD] font-normal">/ {paperMaxMarks}</span>
                <span className="text-xl text-[#4A7BF7] font-bold ml-2">({percent}%)</span>
              </div>
              <div className="text-xs text-[#7B8FAD]">
                Time: <span className="text-[#E8ECF4] tabular-nums">{Math.floor(timeSpent / 60)}m {timeSpent % 60}s</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-center p-3.5 rounded-xl bg-[#0A1020] border border-[#6382BF]/30 min-w-28">
                <div className="text-[11px] text-[#7B8FAD] uppercase tracking-wider">Projected Grade</div>
                <div className="text-3xl font-serif font-black text-[#4A7BF7] mt-0.5">{grade}</div>
              </div>
              <div className="text-center p-3.5 rounded-xl bg-[#0A1020] border border-[#6382BF]/30 min-w-28">
                <div className="text-[11px] text-[#7B8FAD] uppercase tracking-wider">Answered</div>
                <div className="text-2xl font-bold text-[#E8ECF4] tabular-nums mt-0.5">
                  {Object.keys(scores).length} / {paper.questions.length}
                </div>
              </div>
            </div>
          </div>

          {/* Question-by-Question Full Mark Scheme Review */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#E8ECF4] uppercase tracking-wider flex items-center gap-2">
                <Award size={16} className="text-[#4A7BF7]" />
                Questions & Mark Scheme
              </h3>
              <span className="text-xs text-[#7B8FAD]">Marks can be updated below</span>
            </div>

            {paper.questions.map((q) => {
              return (
                <div key={q.number} className="border border-[#6382BF]/30 rounded-xl p-5 bg-[#1A2540] space-y-4 shadow-sm">
                  <div className="flex items-center justify-between border-b border-[#6382BF]/25 pb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="font-bold text-[#E8ECF4] text-base">Question {q.number}</span>
                      <span className="text-xs text-[#E8ECF4] font-medium px-2 py-0.5 rounded bg-[#0A1020] border border-[#6382BF]/40">
                        {q.topic}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-[#7B8FAD]">Score:</span>
                      <input
                        type="number"
                        min="0"
                        max={q.totalMarks}
                        value={scores[q.number] !== undefined ? String(scores[q.number]) : ''}
                        onChange={(e) => handleScoreChange(q.number, e.target.value, q.totalMarks)}
                        className="w-14 px-2 py-1 bg-[#0A1020] border border-[#6382BF]/40 rounded text-center text-[#E8ECF4] font-bold text-xs tabular-nums focus:outline-none focus:border-[#4A7BF7]"
                      />
                      <span className="text-[#7B8FAD]">/ {q.totalMarks} marks</span>
                    </div>
                  </div>

                  {/* Question context */}
                  {q.contextText && (
                    <div className="text-sm text-[#E8ECF4] bg-[#0A1020] p-3.5 rounded-lg border border-[#6382BF]/25 leading-relaxed font-sans">
                      <FormattedMathText text={q.contextText} />
                    </div>
                  )}

                  {/* Parts */}
                  <div className="space-y-3.5">
                    {q.parts.map((part, pIdx) => (
                      <div key={pIdx} className="text-xs pl-3 border-l-2 border-[#4A7BF7] space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-[#E8ECF4] text-xs">
                            Part {part.partLabel}
                          </span>
                          <span className="text-[#7B8FAD]">[{part.marks} {part.marks === 1 ? 'mark' : 'marks'}]</span>
                        </div>
                        <FormattedMathText text={part.text} className="text-[#E8ECF4] text-sm" />
                        
                        {part.solution && (
                          <div className="mt-2 p-3 rounded-lg bg-[#0A1020] border border-[#6382BF]/25 text-xs text-[#E8ECF4] space-y-1">
                            <span className="text-[11px] font-semibold text-[#4A7BF7] block">Worked Solution:</span>
                            <FormattedMathText text={part.solution} />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Official Marking Guidance */}
                  <div className="pt-3 border-t border-[#6382BF]/25 space-y-2">
                    <span className="text-xs font-semibold text-[#7B8FAD] uppercase tracking-wider block">
                      Marking Guidance:
                    </span>
                    <div className="p-3.5 rounded-lg bg-[#0A1020] border border-[#6382BF]/25 text-[#E8ECF4] text-xs leading-relaxed">
                      <FormattedMathText text={q.fullMarkScheme} />
                    </div>
                  </div>

                  {/* Final Answer */}
                  <div className="p-2.5 rounded-lg bg-[#0A1020] border border-[#4A7BF7]/40 text-xs flex items-baseline gap-2">
                    <span className="text-[#4A7BF7] font-semibold">Final Answer:</span>
                    <FormattedMathText text={q.finalAnswer} className="font-semibold text-[#E8ECF4]" />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-[#6382BF]/25 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-lg bg-[#4A7BF7] hover:bg-[#6382BF] text-[#E8ECF4] font-semibold text-xs transition-colors shadow-sm"
            >
              Finish & Return to Papers
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Active question-by-question view
  const filteredQuestionList = paper.questions.filter((q) => {
    if (navFilter === 'flagged') return !!flagged[q.number];
    if (navFilter === 'unanswered') return scores[q.number] === undefined;
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#0A1020] text-[#E8ECF4]">
      {/* Top Exam Header */}
      <div className="h-14 px-4 bg-[#1A2540] border-b border-[#6382BF]/30 flex items-center justify-between gap-4 shrink-0 shadow-md">
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-xs px-2.5 py-0.5 rounded bg-[#0A1020] border border-[#6382BF]/40 text-[#4A7BF7] font-semibold">
            {paper.paperCode}
          </span>
          <span className="font-bold text-sm text-[#E8ECF4] truncate hidden md:inline">
            {paper.title}
          </span>
          <span className="text-[#7B8FAD] text-xs">
            Q{currentQ.number} of {paper.questions.length}
          </span>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2.5">
          {/* Formula Booklet Access Button (Dock / Drawer) */}
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
            <span className="hidden sm:inline">Formula Booklet</span>
          </button>

          {/* Question Review & Navigation Button */}
          <button
            onClick={() => setShowNavDrawer(!showNavDrawer)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border font-medium transition-colors ${
              showNavDrawer 
                ? 'bg-[#0A1020] border-[#4A7BF7] text-[#E8ECF4]' 
                : 'bg-[#0A1020] hover:bg-[#4A7BF7]/40 border-[#6382BF]/40 text-[#E8ECF4]'
            }`}
          >
            <Layers size={13} className="text-[#4A7BF7]" />
            <span>Questions</span>
          </button>

          {/* Finish & Review */}
          <button
            onClick={handleFinishExam}
            className="px-3.5 py-1.5 text-xs rounded-lg bg-[#4A7BF7] hover:bg-[#6382BF] text-[#E8ECF4] font-semibold transition-colors shadow-sm"
          >
            Finish
          </button>
        </div>
      </div>

      {/* Review & Navigation Section (Drawer / Panel) */}
      {showNavDrawer && (
        <div className="bg-[#1A2540] border-b border-[#6382BF]/35 p-4 shrink-0 transition-all shadow-xl">
          <div className="max-w-4xl mx-auto space-y-3">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-4">
                <span className="font-semibold text-[#E8ECF4]">Status:</span>
                <span className="text-[#7B8FAD]">
                  Answered: <strong className="text-[#E8ECF4] tabular-nums">{Object.keys(scores).length}</strong> / {paper.questions.length}
                </span>
                <span className="text-[#7B8FAD]">
                  Flagged: <strong className="text-[#4A7BF7] tabular-nums">{Object.values(flagged).filter(Boolean).length}</strong>
                </span>
              </div>

              {/* Filter tabs */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setNavFilter('all')}
                  className={`px-2 py-0.5 rounded text-[11px] font-medium border ${
                    navFilter === 'all'
                      ? 'bg-[#0A1020] border-[#4A7BF7] text-[#E8ECF4]'
                      : 'bg-[#0A1020]/60 border-[#6382BF]/30 text-[#7B8FAD] hover:text-[#E8ECF4]'
                  }`}
                >
                  All ({paper.questions.length})
                </button>
                <button
                  onClick={() => setNavFilter('flagged')}
                  className={`px-2 py-0.5 rounded text-[11px] font-medium border ${
                    navFilter === 'flagged'
                      ? 'bg-[#4A7BF7] border-[#4A7BF7] text-[#E8ECF4]'
                      : 'bg-[#0A1020]/60 border-[#6382BF]/30 text-[#7B8FAD] hover:text-[#E8ECF4]'
                  }`}
                >
                  Flagged
                </button>
                <button
                  onClick={() => setNavFilter('unanswered')}
                  className={`px-2 py-0.5 rounded text-[11px] font-medium border ${
                    navFilter === 'unanswered'
                      ? 'bg-[#0A1020] border-[#4A7BF7] text-[#E8ECF4]'
                      : 'bg-[#0A1020]/60 border-[#6382BF]/30 text-[#7B8FAD] hover:text-[#E8ECF4]'
                  }`}
                >
                  Unanswered
                </button>
              </div>
            </div>

            {/* Questions Grid */}
            <div className="flex flex-wrap gap-2 pt-1">
              {filteredQuestionList.map((q) => {
                const idx = paper.questions.findIndex((item) => item.number === q.number);
                const isCurrent = idx === currentIndex;
                const hasScore = scores[q.number] !== undefined;
                const isFlag = !!flagged[q.number];

                return (
                  <button
                    key={q.number}
                    onClick={() => {
                      setCurrentIndex(idx);
                      setShowNavDrawer(false);
                    }}
                    className={`w-9 h-9 rounded-lg text-xs font-semibold transition-all relative flex flex-col items-center justify-center ${
                      isCurrent
                        ? 'bg-[#4A7BF7] text-[#E8ECF4] ring-2 ring-[#E8ECF4]'
                        : hasScore
                          ? 'bg-[#6382BF] border border-[#6382BF]/50 text-[#E8ECF4]'
                          : 'bg-[#0A1020] border border-[#6382BF]/30 text-[#7B8FAD] hover:text-[#E8ECF4]'
                    }`}
                  >
                    <span className="tabular-nums">{q.number}</span>
                    {isFlag && (
                      <span className="w-2 h-2 rounded-full bg-[#4A7BF7] absolute top-1 right-1" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area (Question + Optional Docked Formula Drawer) */}
      <div className="flex-1 flex overflow-hidden">
        {/* Main Question Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Question Header Card with INLINE COUNTDOWN CLOCK in Libre Font */}
          <div className="p-4 sm:p-5 rounded-xl bg-[#1A2540] border border-[#6382BF]/30 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold text-[#E8ECF4]">Question {currentQ.number}</h2>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-[#0A1020] border border-[#6382BF]/40 text-[#4A7BF7]">
                  {currentQ.topic}
                </span>
              </div>
              <div className="text-xs text-[#7B8FAD] mt-1">
                Total marks: <strong className="text-[#E8ECF4] tabular-nums">{currentQ.totalMarks}</strong>
              </div>
            </div>

            {/* NORMAL TEXT FLIP ANIMATION TIMER (LIBRE FONT) */}
            <div className="flex items-center gap-3 self-end sm:self-auto">
              {timingMode === 'timed' && (
                <FlipClock
                  secondsRemaining={secondsRemaining}
                  isPaused={isTimerPaused}
                  onTogglePause={() => setIsTimerPaused(!isTimerPaused)}
                />
              )}

              {/* Flag Button */}
              <button
                type="button"
                onClick={() => setFlagged({ ...flagged, [currentQ.number]: !flagged[currentQ.number] })}
                className={`p-2 rounded-lg border text-xs font-medium transition-colors flex items-center gap-1.5 ${
                  flagged[currentQ.number]
                    ? 'bg-[#4A7BF7] border-[#4A7BF7] text-[#E8ECF4]'
                    : 'bg-[#0A1020] border-[#6382BF]/30 text-[#7B8FAD] hover:text-[#E8ECF4]'
                }`}
                title="Flag question for review"
              >
                <Flag size={14} className={flagged[currentQ.number] ? 'fill-[#E8ECF4] text-[#E8ECF4]' : ''} />
                <span className="hidden sm:inline">Flag</span>
              </button>
            </div>
          </div>

          {/* Context Statement */}
          {currentQ.contextText && (
            <div className="p-4 rounded-xl bg-[#1A2540] border border-[#6382BF]/30 text-sm text-[#E8ECF4] leading-relaxed font-sans shadow-sm">
              <FormattedMathText text={currentQ.contextText} />
            </div>
          )}

          {/* Parts (a), (b), (c) */}
          <div className="space-y-4">
            {currentQ.parts.map((part, pIdx) => (
              <div key={pIdx} className="p-4 rounded-xl bg-[#1A2540] border border-[#6382BF]/30 space-y-2.5 shadow-sm">
                <div className="flex items-center justify-between text-xs font-bold text-[#E8ECF4] border-b border-[#6382BF]/25 pb-2">
                  <span className="text-[#4A7BF7]">Part {part.partLabel}</span>
                  <span className="text-[#7B8FAD]">[{part.marks} {part.marks === 1 ? 'mark' : 'marks'}]</span>
                </div>
                <div className="text-sm text-[#E8ECF4] leading-relaxed">
                  <FormattedMathText text={part.text} />
                </div>
              </div>
            ))}
          </div>

          {/* Mark Scheme & Solution Display */}
          {feedbackMode === 'immediate' ? (
            <div className="space-y-4 pt-2">
              <button
                onClick={() =>
                  setRevealedSolutions({
                    ...revealedSolutions,
                    [currentQ.number]: !revealedSolutions[currentQ.number],
                  })
                }
                className="w-full py-2.5 rounded-lg bg-[#1A2540] hover:bg-[#4A7BF7]/40 text-[#E8ECF4] border border-[#6382BF]/40 text-xs font-semibold transition-colors flex items-center justify-center gap-2"
              >
                {revealedSolutions[currentQ.number] ? (
                  <>
                    <EyeOff size={14} className="text-[#7B8FAD]" />
                    <span>Hide Mark Scheme</span>
                  </>
                ) : (
                  <>
                    <Eye size={14} className="text-[#4A7BF7]" />
                    <span>Show Mark Scheme</span>
                  </>
                )}
              </button>

              {revealedSolutions[currentQ.number] && (
                <div className="p-5 rounded-xl bg-[#1A2540] border border-[#6382BF]/40 space-y-4 shadow-md">
                  <div className="font-semibold text-xs text-[#E8ECF4] border-b border-[#6382BF]/25 pb-2 flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-[#4A7BF7]" />
                    Mark Scheme & Solutions
                  </div>

                  {/* Part solutions */}
                  {currentQ.parts.map((p, i) => (
                    p.solution ? (
                      <div key={i} className="text-xs space-y-1.5">
                        <span className="font-semibold text-[#4A7BF7]">Part {p.partLabel} Solution:</span>
                        <div className="p-3 rounded-lg bg-[#0A1020] border border-[#6382BF]/30 text-[#E8ECF4]">
                          <FormattedMathText text={p.solution} />
                        </div>
                      </div>
                    ) : null
                  ))}

                  {/* Marking guidance */}
                  <div className="text-xs pt-1 space-y-1.5">
                    <span className="font-semibold text-[#7B8FAD] uppercase tracking-wider block">Marking Guidance:</span>
                    <div className="p-3.5 rounded-lg bg-[#0A1020] border border-[#6382BF]/30 text-[#E8ECF4] leading-relaxed text-xs">
                      <FormattedMathText text={currentQ.fullMarkScheme} />
                    </div>
                  </div>

                  {/* Final answer rendered via KaTeX */}
                  <div className="p-3 rounded-lg bg-[#0A1020] border border-[#4A7BF7]/50 text-xs flex items-baseline gap-2">
                    <span className="font-semibold text-[#4A7BF7]">Final Answer:</span>
                    <FormattedMathText text={currentQ.finalAnswer} className="font-semibold text-[#E8ECF4]" />
                  </div>

                  {/* SELF-MARKING INPUT: AFTER THE SOLUTION & MARK SCHEME */}
                  <div className="p-4 rounded-xl bg-[#0A1020] border border-[#6382BF]/40 flex items-center justify-between text-xs mt-3">
                    <span className="font-semibold text-[#E8ECF4]">
                      Question {currentQ.number} mark:
                    </span>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="0"
                        max={currentQ.totalMarks}
                        value={scores[currentQ.number] !== undefined ? String(scores[currentQ.number]) : ''}
                        onChange={(e) => handleScoreChange(currentQ.number, e.target.value, currentQ.totalMarks)}
                        placeholder="0"
                        className="w-16 px-2.5 py-1.5 bg-[#1A2540] border border-[#6382BF]/50 rounded-lg text-center text-[#E8ECF4] font-bold text-sm tabular-nums focus:outline-none focus:border-[#4A7BF7]"
                      />
                      <span className="text-[#7B8FAD] text-xs">/ {currentQ.totalMarks}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-3 pt-2">
              <div className="p-4 rounded-xl bg-[#1A2540] border border-[#6382BF]/30 text-xs text-[#7B8FAD] text-center flex items-center justify-center gap-2">
                <Clock size={14} className="text-[#4A7BF7]" />
                <span>Answers will be shown after submitting.</span>
              </div>

              {/* Self marking in exam mode */}
              <div className="p-4 rounded-xl bg-[#1A2540] border border-[#6382BF]/30 flex items-center justify-between text-xs">
                <span className="font-semibold text-[#E8ECF4]">
                  Question {currentQ.number} mark:
                </span>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    max={currentQ.totalMarks}
                    value={scores[currentQ.number] !== undefined ? String(scores[currentQ.number]) : ''}
                    onChange={(e) => handleScoreChange(currentQ.number, e.target.value, currentQ.totalMarks)}
                    placeholder="0"
                    className="w-16 px-2.5 py-1.5 bg-[#0A1020] border border-[#6382BF]/50 rounded-lg text-center text-[#E8ECF4] font-bold text-sm tabular-nums focus:outline-none focus:border-[#4A7BF7]"
                  />
                  <span className="text-[#7B8FAD] text-xs">/ {currentQ.totalMarks}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Docked Formula Drawer */}
      {showFormulaDrawer && (
        <FormulaBookletModal
          mode="drawer"
          onClose={() => setShowFormulaDrawer(false)}
        />
      )}
      </div>

      {/* Bottom Navigation Toolbar */}
      <div className="h-14 px-4 bg-[#1A2540] border-t border-[#6382BF]/30 flex items-center justify-between gap-4 shrink-0 shadow-lg">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
            disabled={currentIndex === 0}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
              currentIndex === 0
                ? 'opacity-40 cursor-not-allowed bg-[#0A1020] text-[#7B8FAD]/40 border-transparent'
                : 'bg-[#0A1020] hover:bg-[#4A7BF7] text-[#E8ECF4] border-[#6382BF]/40'
            }`}
          >
            <ArrowLeft size={13} />
            <span>Previous</span>
          </button>

          <div className="text-xs text-[#7B8FAD] tabular-nums hidden sm:inline">
            {Object.keys(scores).length} of {paper.questions.length} marked
          </div>
        </div>

        {/* Keyboard shortcut badges */}
        <div className="text-[11px] text-[#7B8FAD] hidden md:flex items-center gap-3">
          <span><kbd className="px-1.5 py-0.5 rounded bg-[#0A1020] border border-[#6382BF]/30 text-[10px] font-sans">←</kbd> <kbd className="px-1.5 py-0.5 rounded bg-[#0A1020] border border-[#6382BF]/30 text-[10px] font-sans">→</kbd> Navigate</span>
          <span><kbd className="px-1.5 py-0.5 rounded bg-[#0A1020] border border-[#6382BF]/30 text-[10px] font-sans">M</kbd> Mark Scheme</span>
          <span><kbd className="px-1.5 py-0.5 rounded bg-[#0A1020] border border-[#6382BF]/30 text-[10px] font-sans">F</kbd> Flag</span>
          <span><kbd className="px-1.5 py-0.5 rounded bg-[#0A1020] border border-[#6382BF]/30 text-[10px] font-sans">B</kbd> Formulas</span>
        </div>

        {currentIndex === paper.questions.length - 1 ? (
          <button
            onClick={handleFinishExam}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold bg-[#4A7BF7] hover:bg-[#6382BF] text-[#E8ECF4] transition-colors shadow-sm"
          >
            <span>Finish & Review</span>
            <CheckCircle2 size={13} />
          </button>
        ) : (
          <button
            onClick={() => setCurrentIndex(Math.min(paper.questions.length - 1, currentIndex + 1))}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold bg-[#4A7BF7] hover:bg-[#6382BF] text-[#E8ECF4] transition-colors shadow-sm"
          >
            <span>Next</span>
            <ArrowRight size={13} />
          </button>
        )}
      </div>
    </div>
  );
};
