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
  Trophy, 
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

  // Formula booklet overlay
  const [showFormulaModal, setShowFormulaModal] = useState(false);

  // Completed exam summary view
  const [isFinished, setIsFinished] = useState(false);

  // Past attempts history
  const [pastAttempts, setPastAttempts] = useState<ExamAttempt[]>([]);
  const [showAttemptsModal, setShowAttemptsModal] = useState(false);

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
    } catch (e) {
      console.warn('Failed to save attempt', e);
    }

    if (onSaveResult) {
      onSaveResult(paper.id, totalAchievedScore, paperMaxMarks);
    }
  };

  const handleRestart = () => {
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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-sm text-slate-100">
        <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-lg w-full p-6 space-y-6 shadow-2xl">
          <div className="border-b border-slate-800 pb-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs px-2.5 py-1 rounded bg-sky-950/80 border border-sky-800/60 text-sky-400 font-semibold">
                {paper.paperCode}
              </span>
              {paperAttempts.length > 0 && (
                <button
                  onClick={() => setShowAttemptsModal(true)}
                  className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
                >
                  <History size={13} className="text-sky-400" />
                  <span>{paperAttempts.length} Past {paperAttempts.length === 1 ? 'Attempt' : 'Attempts'}</span>
                </button>
              )}
            </div>
            <h2 className="text-xl font-bold text-white mt-2.5">{paper.title}</h2>
            <p className="text-xs text-slate-400 mt-1">
              Interactive Digital Mode · {paper.questions.length} Questions · {paperMaxMarks} Marks
            </p>
          </div>

          {/* Option: Feedback Mode */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 block uppercase tracking-wider">
              1. Mark Scheme & Solution Display
            </label>
            <div className="grid grid-cols-2 gap-2.5 text-xs">
              <button
                type="button"
                onClick={() => setFeedbackMode('immediate')}
                className={`p-3 rounded-lg border text-left transition-colors ${
                  feedbackMode === 'immediate'
                    ? 'bg-sky-950/40 border-sky-500 text-white font-medium ring-1 ring-sky-500/30'
                    : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="font-semibold text-white mb-0.5 flex items-center gap-1.5">
                  <Eye size={13} className="text-sky-400" />
                  <span>Directly After Question</span>
                </div>
                <div className="text-[11px] text-slate-400">Reveal solutions and mark schemes on each question as you work.</div>
              </button>

              <button
                type="button"
                onClick={() => setFeedbackMode('end')}
                className={`p-3 rounded-lg border text-left transition-colors ${
                  feedbackMode === 'end'
                    ? 'bg-sky-950/40 border-sky-500 text-white font-medium ring-1 ring-sky-500/30'
                    : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="font-semibold text-white mb-0.5 flex items-center gap-1.5">
                  <EyeOff size={13} className="text-indigo-400" />
                  <span>Shown at the End</span>
                </div>
                <div className="text-[11px] text-slate-400">Exam hall conditions. Solutions revealed after you submit all questions.</div>
              </button>
            </div>
          </div>

          {/* Option: Timing */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 block uppercase tracking-wider">
              2. Timing Mode
            </label>
            <div className="grid grid-cols-2 gap-2.5 text-xs">
              <button
                type="button"
                onClick={() => setTimingMode('timed')}
                className={`p-3 rounded-lg border text-left transition-colors ${
                  timingMode === 'timed'
                    ? 'bg-sky-950/40 border-sky-500 text-white font-medium ring-1 ring-sky-500/30'
                    : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="font-semibold text-white mb-0.5 flex items-center gap-1.5">
                  <Clock size={13} className="text-sky-400" />
                  <span>Timed ({paper.durationMinutes} mins)</span>
                </div>
                <div className="text-[11px] text-slate-400">Animated flip clock countdown with audio alerts.</div>
              </button>

              <button
                type="button"
                onClick={() => setTimingMode('untimed')}
                className={`p-3 rounded-lg border text-left transition-colors ${
                  timingMode === 'untimed'
                    ? 'bg-sky-950/40 border-sky-500 text-white font-medium ring-1 ring-sky-500/30'
                    : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="font-semibold text-white mb-0.5 flex items-center gap-1.5">
                  <Sparkles size={13} className="text-emerald-400" />
                  <span>Untimed Practice</span>
                </div>
                <div className="text-[11px] text-slate-400">Practice at your own pace without timer constraints.</div>
              </button>
            </div>
          </div>

          {/* Formula Booklet Access notice */}
          <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800/80 text-xs text-slate-300 flex items-center gap-2.5">
            <BookOpen size={16} className="text-sky-400 shrink-0" />
            <span>Official Edexcel Formula Booklet is accessible at any time during the exam.</span>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700/60 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => setIsStarted(true)}
              className="px-5 py-2 text-xs font-semibold rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 transition-colors flex items-center gap-1.5 shadow-md shadow-sky-500/20"
            >
              <span>Start Interactive Exam</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>

        {/* Past Attempts Modal if clicked */}
        {showAttemptsModal && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-md w-full p-5 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                <h3 className="font-semibold text-white text-sm flex items-center gap-2">
                  <History size={16} className="text-sky-400" />
                  Past Attempts for {paper.paperCode}
                </h3>
                <button
                  onClick={() => setShowAttemptsModal(false)}
                  className="p-1 rounded text-slate-400 hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="max-h-72 overflow-y-auto space-y-2">
                {paperAttempts.map((att) => (
                  <div key={att.id} className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-semibold text-slate-200">
                        {new Date(att.completedAt).toLocaleDateString()} {new Date(att.completedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {att.timingMode === 'timed' ? 'Timed' : 'Untimed'} · {att.feedbackMode === 'immediate' ? 'Immediate' : 'Exam Mode'}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-bold text-white text-sm">
                        {att.achievedScore} / {att.maxScore}
                      </div>
                      <span className="inline-block px-1.5 py-0.2 rounded bg-sky-950 text-sky-400 font-bold text-[10px] border border-sky-800">
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
      <div className="fixed inset-0 z-50 flex flex-col bg-slate-950 text-slate-100 overflow-y-auto">
        <div className="max-w-4xl mx-auto w-full px-4 py-8 space-y-6">
          {/* Top Banner */}
          <div className="border-b border-slate-800 pb-4 flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-sky-950/80 border border-sky-800/60 text-sky-400 font-semibold">
                  {paper.paperCode}
                </span>
                <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                  <CheckCircle2 size={13} />
                  Exam Complete & Attempt Saved
                </span>
              </div>
              <h2 className="text-2xl font-bold text-white mt-1.5">{paper.title} — Review & Performance</h2>
            </div>
            <div className="flex items-center gap-2.5">
              <button
                onClick={handleRestart}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700/60 text-xs font-medium transition-colors"
              >
                <RotateCcw size={13} />
                <span>Retake Exam</span>
              </button>
              <button
                onClick={onClose}
                className="px-4 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold text-xs transition-colors"
              >
                Finish & Return
              </button>
            </div>
          </div>

          {/* Performance Summary Card */}
          <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/60 flex flex-wrap items-center justify-between gap-6 shadow-xl">
            <div className="space-y-1">
              <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Your Overall Score</div>
              <div className="text-4xl font-extrabold text-white font-mono flex items-baseline gap-2">
                <span>{totalAchievedScore}</span>
                <span className="text-lg text-slate-500 font-normal">/ {paperMaxMarks}</span>
                <span className="text-xl text-sky-400 font-bold ml-2">({percent}%)</span>
              </div>
              <div className="text-xs text-slate-400">
                Time Spent: <span className="text-slate-200 font-mono">{Math.floor(timeSpent / 60)}m {timeSpent % 60}s</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-center p-3.5 rounded-xl bg-slate-950 border border-slate-800 min-w-28">
                <div className="text-[11px] text-slate-400 uppercase tracking-wider">Projected Grade</div>
                <div className="text-3xl font-black text-sky-400 font-mono mt-0.5">{grade}</div>
              </div>
              <div className="text-center p-3.5 rounded-xl bg-slate-950 border border-slate-800 min-w-28">
                <div className="text-[11px] text-slate-400 uppercase tracking-wider">Questions Answered</div>
                <div className="text-2xl font-bold text-emerald-400 font-mono mt-0.5">
                  {Object.keys(scores).length} / {paper.questions.length}
                </div>
              </div>
            </div>
          </div>

          {/* Question-by-Question Full Mark Scheme Review */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <Award size={16} className="text-sky-400" />
                Detailed Question-by-Question Review & Mark Scheme
              </h3>
              <span className="text-xs text-slate-400">You can adjust marks below; changes update automatically</span>
            </div>

            {paper.questions.map((q) => {
              const scored = scores[q.number] ?? 0;
              const hasScore = scores[q.number] !== undefined;

              return (
                <div key={q.number} className="border border-slate-800 rounded-xl p-5 bg-slate-900/50 space-y-4 shadow-sm">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="font-bold text-white text-base">Question {q.number}</span>
                      <span className="text-xs text-sky-400 font-medium px-2 py-0.5 rounded bg-sky-950/60 border border-sky-800/60">
                        {q.topic}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 font-mono text-xs">
                      <span className="text-slate-400">Score:</span>
                      <input
                        type="number"
                        min="0"
                        max={q.totalMarks}
                        value={scores[q.number] !== undefined ? String(scores[q.number]) : ''}
                        onChange={(e) => handleScoreChange(q.number, e.target.value, q.totalMarks)}
                        className="w-14 px-2 py-1 bg-slate-950 border border-slate-700 rounded text-center text-white font-mono font-bold text-xs focus:outline-none focus:border-sky-500"
                      />
                      <span className="text-slate-400">/ {q.totalMarks} marks</span>
                    </div>
                  </div>

                  {/* Question context */}
                  {q.contextText && (
                    <div className="text-sm text-slate-200 bg-slate-950/80 p-3.5 rounded-lg border border-slate-800/80 leading-relaxed">
                      <FormattedMathText text={q.contextText} />
                    </div>
                  )}

                  {/* Parts */}
                  <div className="space-y-3.5">
                    {q.parts.map((p, pIdx) => (
                      <div key={pIdx} className="text-xs pl-3 border-l-2 border-slate-700/80 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-200 text-xs">
                            Part {p.partLabel}
                          </span>
                          <span className="font-mono text-slate-400">[{p.marks} {p.marks === 1 ? 'mark' : 'marks'}]</span>
                        </div>
                        <FormattedMathText text={p.text} className="text-slate-300 text-sm" />
                        
                        {p.solution && (
                          <div className="mt-2 p-3 rounded-lg bg-slate-950 border border-slate-800/90 text-xs text-slate-300 space-y-1">
                            <span className="text-[11px] font-semibold text-sky-400 block">Worked Solution:</span>
                            <FormattedMathText text={p.solution} />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Official Marking Guidance */}
                  <div className="pt-3 border-t border-slate-800/80 space-y-2">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                      Marking Guidance:
                    </span>
                    <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800/90 text-slate-300 text-xs leading-relaxed">
                      <FormattedMathText text={q.fullMarkScheme} />
                    </div>
                  </div>

                  {/* Final Answer */}
                  <div className="p-2.5 rounded-lg bg-sky-950/30 border border-sky-800/50 text-xs flex items-baseline gap-2">
                    <span className="text-sky-400 font-semibold">Final Answer:</span>
                    <FormattedMathText text={q.finalAnswer} className="font-semibold text-white" />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold text-xs transition-colors shadow-lg shadow-sky-500/20"
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
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-950 text-slate-100">
      {/* Top Exam Header */}
      <div className="h-14 px-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between gap-4 shrink-0 shadow-md">
        <div className="flex items-center gap-3 min-w-0">
          <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-sky-950 border border-sky-800/60 text-sky-400 font-semibold">
            {paper.paperCode}
          </span>
          <span className="font-bold text-sm text-white truncate hidden md:inline">
            {paper.title}
          </span>
          <span className="text-slate-400 text-xs font-mono">
            Q{currentQ.number} of {paper.questions.length}
          </span>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2.5">
          {/* Formula Booklet Access Button */}
          <button
            onClick={() => setShowFormulaModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-200 border border-slate-700/70 font-medium transition-colors"
            title="Open Formula Booklet"
          >
            <BookOpen size={13} className="text-sky-400" />
            <span className="hidden sm:inline">Formula Booklet</span>
          </button>

          {/* Question Review & Navigation Button */}
          <button
            onClick={() => setShowNavDrawer(!showNavDrawer)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border font-medium transition-colors ${
              showNavDrawer 
                ? 'bg-sky-500/20 border-sky-500 text-sky-300' 
                : 'bg-slate-950 hover:bg-slate-800 border-slate-700/70 text-slate-300'
            }`}
          >
            <Layers size={13} className="text-indigo-400" />
            <span>Navigation & Review</span>
          </button>

          {/* Finish & Review */}
          <button
            onClick={handleFinishExam}
            className="px-3.5 py-1.5 text-xs rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold transition-colors shadow-sm shadow-sky-500/20"
          >
            Finish Exam
          </button>
        </div>
      </div>

      {/* Review & Navigation Section (Drawer / Panel) */}
      {showNavDrawer && (
        <div className="bg-slate-900 border-b border-slate-800 p-4 shrink-0 transition-all shadow-xl">
          <div className="max-w-4xl mx-auto space-y-3">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-4">
                <span className="font-semibold text-slate-200">Exam Question Overview:</span>
                <span className="text-slate-400">
                  Answered: <strong className="text-emerald-400">{Object.keys(scores).length}</strong> / {paper.questions.length}
                </span>
                <span className="text-slate-400">
                  Flagged: <strong className="text-amber-400">{Object.values(flagged).filter(Boolean).length}</strong>
                </span>
              </div>

              {/* Filter tabs */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setNavFilter('all')}
                  className={`px-2 py-0.5 rounded text-[11px] font-medium border ${
                    navFilter === 'all'
                      ? 'bg-slate-800 border-slate-600 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  All ({paper.questions.length})
                </button>
                <button
                  onClick={() => setNavFilter('flagged')}
                  className={`px-2 py-0.5 rounded text-[11px] font-medium border ${
                    navFilter === 'flagged'
                      ? 'bg-amber-950/60 border-amber-600 text-amber-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  Flagged
                </button>
                <button
                  onClick={() => setNavFilter('unanswered')}
                  className={`px-2 py-0.5 rounded text-[11px] font-medium border ${
                    navFilter === 'unanswered'
                      ? 'bg-slate-800 border-slate-600 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
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
                    className={`w-9 h-9 rounded-lg text-xs font-mono font-semibold transition-all relative flex flex-col items-center justify-center ${
                      isCurrent
                        ? 'bg-sky-500 text-slate-950 ring-2 ring-sky-300'
                        : hasScore
                          ? 'bg-emerald-950/70 border border-emerald-600/70 text-emerald-300'
                          : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    <span>{q.number}</span>
                    {isFlag && (
                      <span className="w-2 h-2 rounded-full bg-amber-400 absolute top-1 right-1" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Main Question Scrollable Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Question Header Card with INLINE FLIP CLOCK TIMER */}
          <div className="p-4 sm:p-5 rounded-xl bg-slate-900 border border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold text-white">Question {currentQ.number}</h2>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-sky-950/80 border border-sky-800/60 text-sky-400">
                  {currentQ.topic}
                </span>
              </div>
              <div className="text-xs text-slate-400 mt-1">
                Total marks: <strong className="text-white font-mono">{currentQ.totalMarks}</strong>
              </div>
            </div>

            {/* Timer in Current Question Area */}
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
                    ? 'bg-amber-950/60 border-amber-500 text-amber-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
                title="Flag question for review"
              >
                <Flag size={14} className={flagged[currentQ.number] ? 'fill-amber-400 text-amber-400' : ''} />
                <span className="hidden sm:inline">Flag</span>
              </button>
            </div>
          </div>

          {/* Context Statement (Problem Setup) */}
          {currentQ.contextText && (
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-sm text-slate-100 leading-relaxed font-sans shadow-sm">
              <FormattedMathText text={currentQ.contextText} />
            </div>
          )}

          {/* Parts (a), (b), (c) */}
          <div className="space-y-4">
            {currentQ.parts.map((part, pIdx) => (
              <div key={pIdx} className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 space-y-2.5 shadow-sm">
                <div className="flex items-center justify-between text-xs font-bold text-slate-200 border-b border-slate-800/80 pb-2">
                  <span className="text-sky-400">Part {part.partLabel}</span>
                  <span className="font-mono text-slate-400">[{part.marks} {part.marks === 1 ? 'mark' : 'marks'}]</span>
                </div>
                <div className="text-sm text-slate-200 leading-relaxed">
                  <FormattedMathText text={part.text} />
                </div>
              </div>
            ))}
          </div>

          {/* Mark Scheme & Solution Display (Immediate or Exam Mode) */}
          {feedbackMode === 'immediate' ? (
            <div className="space-y-4 pt-2">
              <button
                onClick={() =>
                  setRevealedSolutions({
                    ...revealedSolutions,
                    [currentQ.number]: !revealedSolutions[currentQ.number],
                  })
                }
                className="w-full py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/70 text-xs font-semibold transition-colors flex items-center justify-center gap-2"
              >
                {revealedSolutions[currentQ.number] ? (
                  <>
                    <EyeOff size={14} className="text-slate-400" />
                    <span>Hide Mark Scheme & Solution</span>
                  </>
                ) : (
                  <>
                    <Eye size={14} className="text-sky-400" />
                    <span>Reveal Mark Scheme & Solution</span>
                  </>
                )}
              </button>

              {revealedSolutions[currentQ.number] && (
                <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-4 shadow-md">
                  <div className="font-semibold text-xs text-slate-200 border-b border-slate-800 pb-2 flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-sky-400" />
                    Official Mark Scheme & Worked Solutions
                  </div>

                  {/* Part solutions */}
                  {currentQ.parts.map((p, i) => (
                    p.solution ? (
                      <div key={i} className="text-xs space-y-1.5">
                        <span className="font-semibold text-sky-400">Part {p.partLabel} Solution:</span>
                        <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 text-slate-200">
                          <FormattedMathText text={p.solution} />
                        </div>
                      </div>
                    ) : null
                  ))}

                  {/* Marking guidance */}
                  <div className="text-xs pt-1 space-y-1.5">
                    <span className="font-semibold text-slate-400 uppercase tracking-wider block">Marking Guidance:</span>
                    <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800/80 text-slate-200 leading-relaxed text-xs">
                      <FormattedMathText text={currentQ.fullMarkScheme} />
                    </div>
                  </div>

                  {/* Final answer rendered via KaTeX */}
                  <div className="p-3 rounded-lg bg-sky-950/40 border border-sky-800/50 text-xs flex items-baseline gap-2">
                    <span className="font-semibold text-sky-400">Final Answer:</span>
                    <FormattedMathText text={currentQ.finalAnswer} className="font-semibold text-white" />
                  </div>

                  {/* SELF-MARKING INPUT MOVED HERE: AFTER THE SOLUTION & MARK SCHEME! */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-700/80 flex items-center justify-between text-xs mt-3">
                    <div className="space-y-0.5">
                      <span className="font-semibold text-white block">
                        Enter mark achieved for Question {currentQ.number}:
                      </span>
                      <span className="text-[11px] text-slate-400">
                        Based on the official marking criteria above.
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="0"
                        max={currentQ.totalMarks}
                        value={scores[currentQ.number] !== undefined ? String(scores[currentQ.number]) : ''}
                        onChange={(e) => handleScoreChange(currentQ.number, e.target.value, currentQ.totalMarks)}
                        placeholder="0"
                        className="w-16 px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-center text-white font-mono font-bold text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500/50"
                      />
                      <span className="text-slate-400 font-mono text-xs">/ {currentQ.totalMarks}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-3 pt-2">
              <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 text-xs text-slate-400 text-center flex items-center justify-center gap-2">
                <Clock size={14} className="text-sky-400" />
                <span>Exam Mode active: Solutions and marking criteria will be displayed in the final scorecard once you submit the exam.</span>
              </div>

              {/* Self marking in exam mode */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-200">
                  Mark question complete / record score:
                </span>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    max={currentQ.totalMarks}
                    value={scores[currentQ.number] !== undefined ? String(scores[currentQ.number]) : ''}
                    onChange={(e) => handleScoreChange(currentQ.number, e.target.value, currentQ.totalMarks)}
                    placeholder="0"
                    className="w-16 px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-center text-white font-mono font-bold text-sm focus:outline-none focus:border-sky-500"
                  />
                  <span className="text-slate-400 font-mono text-xs">/ {currentQ.totalMarks}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation Toolbar */}
      <div className="h-14 px-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between gap-4 shrink-0 shadow-lg">
        <button
          onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
          disabled={currentIndex === 0}
          className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
            currentIndex === 0
              ? 'opacity-40 cursor-not-allowed bg-slate-950 text-slate-600 border-slate-800'
              : 'bg-slate-950 hover:bg-slate-800 text-slate-200 border-slate-700/70'
          }`}
        >
          <ArrowLeft size={13} />
          <span>Previous Question</span>
        </button>

        <div className="text-xs text-slate-400 font-mono hidden sm:inline">
          {Object.keys(scores).length} of {paper.questions.length} marked
        </div>

        {currentIndex === paper.questions.length - 1 ? (
          <button
            onClick={handleFinishExam}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors shadow-md shadow-emerald-500/20"
          >
            <span>Finish & Review Exam</span>
            <CheckCircle2 size={13} />
          </button>
        ) : (
          <button
            onClick={() => setCurrentIndex(Math.min(paper.questions.length - 1, currentIndex + 1))}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold bg-sky-500 hover:bg-sky-400 text-slate-950 transition-colors shadow-md shadow-sky-500/20"
          >
            <span>Next Question</span>
            <ArrowRight size={13} />
          </button>
        )}
      </div>

      {/* Formula Booklet Overlay Modal */}
      {showFormulaModal && (
        <FormulaBookletModal onClose={() => setShowFormulaModal(false)} />
      )}
    </div>
  );
};
