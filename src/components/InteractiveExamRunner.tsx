import React, { useState, useEffect } from 'react';
import { InteractivePaper, InteractiveQuestion } from '../data/interactiveQuestions';
import { FormattedMathText } from './MathRenderer';
import { FormulaBookletModal } from './FormulaBookletModal';
import { FlipClock } from './FlipClock';
import { playExamChime } from '../utils/audio';
import confetti from 'canvas-confetti';
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
  ChevronDown,
  Eye,
  EyeOff,
  History,
  Award,
  Layers,
  Sparkles,
  FileText,
  Columns,
  Maximize2,
  ZoomIn,
  ZoomOut,
  ExternalLink,
  HelpCircle,
  AlertCircle
} from 'lucide-react';

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
  const [timingMode, setTimingMode] = useState<TimingMode>('timed');

  // Active question index
  const [currentIndex, setCurrentIndex] = useState(0);

  // User input states per question & subpart
  const [scores, setScores] = useState<Record<number, number>>({});
  const [subpartScores, setSubpartScores] = useState<Record<string, number>>({});
  const [studentAnswers, setStudentAnswers] = useState<Record<string, string>>({});
  const [studentWorking, setStudentWorking] = useState<Record<string, string>>({});
  const [revealedSolutions, setRevealedSolutions] = useState<Record<number, boolean>>({});
  const [revealedParts, setRevealedParts] = useState<Record<string, boolean>>({});
  const [flagged, setFlagged] = useState<Record<number, boolean>>({});

  // Timer state
  const totalSeconds = paper.durationMinutes * 60;
  const [secondsRemaining, setSecondsRemaining] = useState(totalSeconds);
  const [isTimerPaused, setIsTimerPaused] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);

  // Side drawers
  const [showFormulaDrawer, setShowFormulaDrawer] = useState(false);
  const [showPdfDrawer, setShowPdfDrawer] = useState(false);

  // Modals
  const [showFinishConfirm, setShowFinishConfirm] = useState(false);
  const [lightboxDiagram, setLightboxDiagram] = useState<{
    svg?: string;
    url?: string;
    caption?: string;
  } | null>(null);
  const [lightboxZoom, setLightboxZoom] = useState(1);

  // Completed exam summary view
  const [isFinished, setIsFinished] = useState(false);
  const [isReviewMode, setIsReviewMode] = useState(false);

  // Past attempts history
  const [pastAttempts, setPastAttempts] = useState<ExamAttempt[]>([]);
  const [showAttemptsModal, setShowAttemptsModal] = useState(false);

  // Draft recovery key
  const draftStorageKey = `matheseus_draft_${paper.id}`;
  const [savedDraft, setSavedDraft] = useState<{
    scores: Record<number, number>;
    subpartScores?: Record<string, number>;
    studentAnswers?: Record<string, string>;
    studentWorking?: Record<string, string>;
    flagged: Record<number, boolean>;
    currentIndex: number;
    timeSpent: number;
    secondsRemaining: number;
    timingMode: TimingMode;
    timestamp: number;
  } | null>(() => {
    try {
      const raw = localStorage.getItem(`matheseus_draft_${paper.id}`);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  // Load past attempts
  useEffect(() => {
    try {
      const saved = localStorage.getItem('matheseus_exam_attempts');
      if (saved) {
        setPastAttempts(JSON.parse(saved));
      }
    } catch (e) {
      console.warn('Failed to load past exam attempts', e);
    }
  }, []);

  // Auto-save ongoing draft
  useEffect(() => {
    if (isStarted && !isFinished) {
      try {
        localStorage.setItem(
          draftStorageKey,
          JSON.stringify({
            scores,
            subpartScores,
            studentAnswers,
            studentWorking,
            flagged,
            currentIndex,
            timeSpent,
            secondsRemaining,
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
    subpartScores,
    studentAnswers,
    studentWorking,
    flagged,
    currentIndex,
    timeSpent,
    secondsRemaining,
    timingMode,
    draftStorageKey,
  ]);

  // Main countdown timer
  useEffect(() => {
    if (!isStarted || isFinished || isTimerPaused) return;

    const interval = setInterval(() => {
      setTimeSpent((prev) => prev + 1);

      if (timingMode === 'timed') {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            handleAutoTimeUp();
            return 0;
          }
          if (prev === 600 || prev === 300 || prev === 60) {
            playExamChime();
          }
          return prev - 1;
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isStarted, isFinished, isTimerPaused, timingMode]);

  const handleAutoTimeUp = () => {
    playExamChime();
    setIsFinished(true);
    triggerCelebration();
  };

  // Keyboard navigation & shortcuts
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
      } else if (e.key === 'f' || e.key === 'F') {
        const qNum = paper.questions[currentIndex]?.number || (currentIndex + 1);
        setFlagged((prev) => ({ ...prev, [qNum]: !prev[qNum] }));
      } else if (e.key === 'b' || e.key === 'B') {
        setShowFormulaDrawer((prev) => !prev);
      } else if (e.key === 'p' || e.key === 'P') {
        setShowPdfDrawer((prev) => !prev);
      } else if (e.key === 'Escape') {
        if (lightboxDiagram) {
          setLightboxDiagram(null);
        } else if (showFormulaDrawer) {
          setShowFormulaDrawer(false);
        } else if (showPdfDrawer) {
          setShowPdfDrawer(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isStarted, isFinished, currentIndex, paper.questions, lightboxDiagram, showFormulaDrawer, showPdfDrawer]);

  // Current Question
  const currentQ = paper.questions[currentIndex] || paper.questions[0];
  const paperMaxMarks = paper.totalMarks || paper.questions.reduce((sum, q) => sum + q.totalMarks, 0);

  // Score calculations
  const totalAchievedScore = Object.values(scores).reduce((sum, val) => sum + (val || 0), 0);
  const percent = paperMaxMarks > 0 ? Math.round((totalAchievedScore / paperMaxMarks) * 100) : 0;

  // Grade predictor based on standard Edexcel thresholds
  const calculateGrade = (pct: number): string => {
    const isFM = paper.paperCode.includes('FM') || paper.paperCode.includes('cp') || paper.paperCode.includes('d');
    if (isFM) {
      if (pct >= 80) return 'A*';
      if (pct >= 68) return 'A';
      if (pct >= 56) return 'B';
      if (pct >= 45) return 'C';
      if (pct >= 35) return 'D';
      if (pct >= 25) return 'E';
      return 'U';
    } else {
      if (pct >= 76) return 'A*';
      if (pct >= 65) return 'A';
      if (pct >= 54) return 'B';
      if (pct >= 44) return 'C';
      if (pct >= 34) return 'D';
      if (pct >= 24) return 'E';
      return 'U';
    }
  };

  const handleScoreChange = (qNum: number, valueStr: string, maxMarks: number) => {
    const val = valueStr === '' ? undefined : Math.max(0, Math.min(maxMarks, Number(valueStr)));
    setScores((prev) => {
      const next = { ...prev };
      if (val === undefined || isNaN(val)) {
        delete next[qNum];
      } else {
        next[qNum] = val;
      }
      return next;
    });
  };

  const handleSubpartScoreChange = (qNum: number, partIdx: number, partMax: number, score: number) => {
    const key = `${qNum}_${partIdx}`;
    const newSubScores = { ...subpartScores, [key]: score };
    setSubpartScores(newSubScores);

    // Recompute total score for this question by summing its parts
    const q = paper.questions.find((item) => item.number === qNum);
    if (q) {
      let sum = 0;
      q.parts.forEach((_, idx) => {
        const k = `${qNum}_${idx}`;
        if (newSubScores[k] !== undefined) {
          sum += newSubScores[k];
        }
      });
      handleScoreChange(qNum, String(sum), q.totalMarks);
    }
  };

  const handleFinishExam = () => {
    setShowFinishConfirm(false);
    setIsFinished(true);
    triggerCelebration();

    try {
      localStorage.removeItem(draftStorageKey);
    } catch {}

    const newAttempt: ExamAttempt = {
      id: `${paper.id}_${Date.now()}`,
      paperId: paper.id,
      paperCode: paper.paperCode,
      paperTitle: paper.title,
      completedAt: new Date().toISOString(),
      achievedScore: totalAchievedScore,
      maxScore: paperMaxMarks,
      percentage: percent,
      predictedGrade: calculateGrade(percent),
      timingMode,
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

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#4A7BF7', '#10B981', '#F59E42', '#E8ECF4'],
      });
    } catch {}
  };

  const handleRestart = () => {
    try {
      localStorage.removeItem(draftStorageKey);
    } catch {}
    setSavedDraft(null);
    setScores({});
    setSubpartScores({});
    setStudentAnswers({});
    setStudentWorking({});
    setRevealedSolutions({});
    setRevealedParts({});
    setFlagged({});
    setCurrentIndex(0);
    setSecondsRemaining(totalSeconds);
    setTimeSpent(0);
    setIsFinished(false);
    setIsReviewMode(false);
    setIsStarted(false);
  };

  // --------------------------------------------------------------------------
  // Pre-Exam Start Screen
  // --------------------------------------------------------------------------
  if (!isStarted) {
    const paperAttempts = pastAttempts.filter((a) => a.paperId === paper.id);

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A1020]/90 backdrop-blur-sm text-[#E8ECF4] animate-fadeIn">
        <div className="bg-[#1A2540] border border-[#6382BF]/40 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl animate-modalFadeIn">
          {/* Header */}
          <div className="border-b border-[#6382BF]/25 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src="/logo.png" alt="matheseus" className="w-6 h-6 rounded-md object-cover ring-1 ring-white/10" />
                <span className="text-xs px-2.5 py-1 rounded bg-[#0A1020] border border-[#6382BF]/40 text-[#4A7BF7] font-semibold">
                  {paper.paperCode}
                </span>
              </div>
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
            <h2 className="text-xl font-bold text-[#E8ECF4] mt-3">{paper.title}</h2>
            <p className="text-xs text-[#7B8FAD] mt-1">
              Interactive Practice Mode · {paper.questions.length} questions · {paperMaxMarks} marks total · {paper.durationMinutes} minutes
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
                    if (savedDraft.subpartScores) setSubpartScores(savedDraft.subpartScores);
                    if (savedDraft.studentAnswers) setStudentAnswers(savedDraft.studentAnswers);
                    if (savedDraft.studentWorking) setStudentWorking(savedDraft.studentWorking);
                    setFlagged(savedDraft.flagged || {});
                    setCurrentIndex(savedDraft.currentIndex || 0);
                    setTimeSpent(savedDraft.timeSpent || 0);
                    if (savedDraft.secondsRemaining !== undefined) {
                      setSecondsRemaining(savedDraft.secondsRemaining);
                    }
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

          {/* Timing Option */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-[#E8ECF4] block uppercase tracking-wider">
              Exam Timer Mode
            </label>
            <div className="grid grid-cols-2 gap-2.5 text-xs">
              <button
                type="button"
                onClick={() => setTimingMode('timed')}
                className={`p-3 rounded-xl border text-left transition-colors ${
                  timingMode === 'timed'
                    ? 'bg-[#0A1020] border-[#4A7BF7] text-[#E8ECF4] font-medium shadow-sm'
                    : 'bg-[#0A1020]/50 border-[#6382BF]/25 text-[#7B8FAD] hover:text-[#E8ECF4]'
                }`}
              >
                <div className="font-semibold text-[#E8ECF4] mb-0.5 flex items-center gap-1.5">
                  <Clock size={13} className="text-[#4A7BF7]" />
                  <span>Timed ({paper.durationMinutes} mins)</span>
                </div>
                <div className="text-[11px] text-[#7B8FAD]">Real exam countdown conditions.</div>
              </button>

              <button
                type="button"
                onClick={() => setTimingMode('untimed')}
                className={`p-3 rounded-xl border text-left transition-colors ${
                  timingMode === 'untimed'
                    ? 'bg-[#0A1020] border-[#4A7BF7] text-[#E8ECF4] font-medium shadow-sm'
                    : 'bg-[#0A1020]/50 border-[#6382BF]/25 text-[#7B8FAD] hover:text-[#E8ECF4]'
                }`}
              >
                <div className="font-semibold text-[#E8ECF4] mb-0.5 flex items-center gap-1.5">
                  <Sparkles size={13} className="text-[#7B8FAD]" />
                  <span>Untimed Practice</span>
                </div>
                <div className="text-[11px] text-[#7B8FAD]">Work through questions at your pace.</div>
              </button>
            </div>
          </div>

          {/* Features Notice */}
          <div className="p-3.5 rounded-xl bg-[#0A1020] border border-[#6382BF]/30 text-xs text-[#7B8FAD] space-y-2">
            <div className="flex items-center gap-2 text-[#E8ECF4] font-semibold">
              <Sparkles size={14} className="text-[#4A7BF7]" />
              <span>Interactive Exam Features</span>
            </div>
            <ul className="text-[11px] space-y-1 list-disc list-inside leading-relaxed text-[#7B8FAD]">
              <li>Question-by-question layout with mathematical formatting.</li>
              <li>High-resolution diagram inspection with click-to-zoom Lightbox.</li>
              <li>Type mathematical working and final answers per subpart.</li>
              <li>Official step-by-step marking schemes with M1/A1/B1 breakdowns.</li>
              <li>Formula booklet and statistical tables docked throughout.</li>
            </ul>
          </div>

          {/* Action Buttons */}
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
              className="px-6 py-2.5 rounded-xl bg-[#4A7BF7] hover:bg-[#6382BF] text-[#E8ECF4] font-semibold text-xs shadow-md transition-colors flex items-center gap-2"
            >
              <span>Start Practice Mode</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // Exam Completed / Summary Screen
  // --------------------------------------------------------------------------
  if (isFinished && !isReviewMode) {
    const grade = calculateGrade(percent);

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A1020]/95 backdrop-blur-md text-[#E8ECF4] overflow-y-auto animate-fadeIn">
        <div className="bg-[#1A2540] border border-[#6382BF]/40 rounded-2xl max-w-2xl w-full p-6 space-y-6 shadow-2xl my-8 animate-modalFadeIn">
          {/* Header */}
          <div className="text-center space-y-2 border-b border-[#6382BF]/25 pb-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4A7BF7]/15 border border-[#4A7BF7]/30 text-[#4A7BF7] text-xs font-semibold">
              <Award size={14} />
              <span>Exam Practice Completed</span>
            </div>
            <h2 className="text-2xl font-bold font-serif text-[#E8ECF4]">{paper.title}</h2>
            <p className="text-xs text-[#7B8FAD]">
              Completed in {Math.floor(timeSpent / 60)}m {timeSpent % 60}s · {paper.paperCode}
            </p>
          </div>

          {/* Score & Grade Display */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-4 rounded-xl bg-[#0A1020] border border-[#6382BF]/30">
              <span className="text-[11px] font-semibold text-[#7B8FAD] uppercase tracking-wider block">
                Total Score
              </span>
              <div className="text-3xl font-bold text-[#E8ECF4] tabular-nums mt-1">
                {totalAchievedScore}
                <span className="text-sm font-normal text-[#7B8FAD]"> / {paperMaxMarks}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#0A1020] border border-[#6382BF]/30">
              <span className="text-[11px] font-semibold text-[#7B8FAD] uppercase tracking-wider block">
                Percentage
              </span>
              <div className="text-3xl font-bold text-[#4A7BF7] tabular-nums mt-1">
                {percent}%
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#0A1020] border border-[#6382BF]/30">
              <span className="text-[11px] font-semibold text-[#7B8FAD] uppercase tracking-wider block">
                Grade
              </span>
              <div className="text-3xl font-bold text-emerald-400 mt-1">
                {grade}
              </div>
            </div>
          </div>

          {/* Question Breakdown Table */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-[#7B8FAD] uppercase tracking-wider px-1">
              <span>Question Breakdown</span>
              <span>{Object.keys(scores).length} of {paper.questions.length} Scored</span>
            </div>
            <div className="border border-[#6382BF]/30 rounded-xl overflow-hidden bg-[#0A1020]">
              <div className="max-h-60 overflow-y-auto divide-y divide-[#6382BF]/15">
                {paper.questions.map((q) => {
                  const score = scores[q.number];
                  const hasAnswered = score !== undefined;
                  const isFullMarks = score === q.totalMarks;

                  return (
                    <div
                      key={q.number}
                      className="px-4 py-2.5 flex items-center justify-between text-xs hover:bg-[#1A2540]/40 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-[#E8ECF4] w-8">Q{q.number}</span>
                        <span className="text-[#7B8FAD] text-[11px] truncate max-w-[280px] sm:max-w-md">
                          {q.topic}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`font-semibold tabular-nums ${
                          !hasAnswered
                            ? 'text-[#7B8FAD]'
                            : isFullMarks
                            ? 'text-emerald-400'
                            : score > 0
                            ? 'text-amber-300'
                            : 'text-rose-400'
                        }`}>
                          {hasAnswered ? `${score} / ${q.totalMarks}` : `— / ${q.totalMarks}`}
                        </span>
                        <button
                          onClick={() => {
                            setCurrentIndex(q.number - 1);
                            setIsReviewMode(true);
                          }}
                          className="px-2 py-0.5 rounded bg-[#1A2540] hover:bg-[#4A7BF7] text-[#7B8FAD] hover:text-white border border-[#6382BF]/30 text-[10px] font-semibold transition-colors"
                        >
                          Review
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={handleRestart}
              className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#0A1020] hover:bg-[#1A2540] text-[#7B8FAD] hover:text-[#E8ECF4] border border-[#6382BF]/30 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <RotateCcw size={14} />
              <span>Retake Paper</span>
            </button>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => setIsReviewMode(true)}
                className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-[#0A1020] hover:bg-[#4A7BF7]/20 text-[#E8ECF4] border border-[#6382BF]/30 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <Eye size={14} className="text-[#4A7BF7]" />
                <span>Review All Questions</span>
              </button>
              <button
                onClick={onClose}
                className="flex-1 sm:flex-none px-6 py-2 rounded-xl bg-[#4A7BF7] hover:bg-[#6382BF] text-white text-xs font-semibold shadow-md transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // Main Interactive Exam Workspace
  // --------------------------------------------------------------------------
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#0F1729] text-[#E8ECF4] overflow-hidden animate-fadeIn">
      {/* Top Header Bar */}
      <header className="h-14 bg-[#1A2540] border-b border-[#6382BF]/30 px-4 flex items-center justify-between shrink-0 z-30">
        {/* Left: Brand & Paper Code */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (Object.keys(scores).length > 0 && !isFinished) {
                setShowFinishConfirm(true);
              } else {
                onClose();
              }
            }}
            className="p-1.5 rounded-lg hover:bg-[#0A1020] text-[#7B8FAD] hover:text-[#E8ECF4] transition-colors"
            title="Exit Practice Mode"
          >
            <X size={18} />
          </button>

          <img src="/logo.png" alt="matheseus" className="w-7 h-7 rounded-lg object-cover ring-1 ring-white/10 hidden sm:inline" />

          <span className="text-xs px-2.5 py-1 rounded bg-[#0A1020] border border-[#6382BF]/40 text-[#4A7BF7] font-semibold shrink-0">
            {paper.paperCode}
          </span>
          <span className="font-bold text-sm text-[#E8ECF4] truncate hidden md:inline max-w-sm">
            {paper.title}
          </span>
          <span className="text-xs px-2 py-0.5 rounded bg-[#4A7BF7]/15 text-[#4A7BF7] font-semibold border border-[#4A7BF7]/30 hidden lg:inline shrink-0">
            Interactive Practice
          </span>
        </div>

        {/* Center: FlipClock Countdown Timer */}
        <div className="flex items-center gap-2">
          {timingMode === 'timed' ? (
            <div className="flex items-center gap-2 bg-[#0A1020] px-2.5 py-1 rounded-xl border border-[#6382BF]/30 shadow-inner">
              <Clock size={13} className="text-[#4A7BF7]" />
              <FlipClock
                secondsRemaining={secondsRemaining}
                isPaused={isTimerPaused}
                onTogglePause={() => setIsTimerPaused(!isTimerPaused)}
              />
              <button
                onClick={() => setIsTimerPaused(!isTimerPaused)}
                className="text-[10px] px-2 py-0.5 rounded bg-[#1A2540] hover:bg-[#4A7BF7] hover:text-white text-[#7B8FAD] transition-colors ml-1 font-semibold"
                title={isTimerPaused ? 'Resume Timer' : 'Pause Timer'}
              >
                {isTimerPaused ? 'Resume' : 'Pause'}
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-xs text-[#7B8FAD] bg-[#0A1020] px-3 py-1.5 rounded-xl border border-[#6382BF]/30 tabular-nums">
              <Sparkles size={13} className="text-[#4A7BF7]" />
              <span>{Math.floor(timeSpent / 60)}m {timeSpent % 60}s</span>
            </div>
          )}
        </div>

        {/* Right: Tools & Submit */}
        <div className="flex items-center gap-2">
          {/* Formula Booklet Drawer Button */}
          <button
            onClick={() => setShowFormulaDrawer(!showFormulaDrawer)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-xl border font-medium transition-colors ${
              showFormulaDrawer
                ? 'bg-[#4A7BF7] text-white border-[#4A7BF7]'
                : 'bg-[#0A1020] hover:bg-[#1A2540] text-[#E8ECF4] border-[#6382BF]/40'
            }`}
            title="Open Formula Booklet Dock (Key: B)"
          >
            <BookOpen size={13} />
            <span className="hidden sm:inline">Formulas</span>
          </button>

          {/* Original Scanned PDF Drawer Button */}
          {paper.qpUrl && (
            <button
              onClick={() => setShowPdfDrawer(!showPdfDrawer)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-xl border font-medium transition-colors ${
                showPdfDrawer
                  ? 'bg-[#4A7BF7] text-white border-[#4A7BF7]'
                  : 'bg-[#0A1020] hover:bg-[#1A2540] text-[#E8ECF4] border-[#6382BF]/40'
              }`}
              title="View original official Question Paper scan (Key: P)"
            >
              <FileText size={13} />
              <span className="hidden md:inline">Original PDF</span>
            </button>
          )}

          {/* Finish & Grade Button */}
          <button
            onClick={() => setShowFinishConfirm(true)}
            className="px-4 py-1.5 text-xs rounded-xl bg-[#4A7BF7] hover:bg-[#6382BF] text-white font-semibold transition-colors shadow-sm shrink-0"
          >
            Finish Exam
          </button>
        </div>
      </header>

      {/* Question Navigation Strip */}
      <div className="bg-[#1A2540]/80 border-b border-[#6382BF]/25 px-4 py-2 flex items-center justify-between gap-3 overflow-x-auto shrink-0 z-20">
        <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
          {paper.questions.map((q, idx) => {
            const isCurrent = idx === currentIndex;
            const isScored = scores[q.number] !== undefined;
            const isFlag = !!flagged[q.number];
            const hasInput = !!studentAnswers[`${q.number}_0`] || !!studentWorking[`${q.number}_0`];

            return (
              <button
                key={q.number}
                onClick={() => setCurrentIndex(idx)}
                className={`h-7 px-2.5 rounded-lg text-xs font-semibold relative transition-all flex items-center gap-1 shrink-0 ${
                  isCurrent
                    ? 'bg-[#4A7BF7] text-white shadow-md ring-2 ring-white/30'
                    : isScored
                    ? 'bg-emerald-600/30 border border-emerald-500/50 text-emerald-300'
                    : hasInput
                    ? 'bg-[#0A1020] border border-[#4A7BF7]/60 text-[#E8ECF4]'
                    : 'bg-[#0A1020] border border-[#6382BF]/30 text-[#7B8FAD] hover:text-[#E8ECF4]'
                }`}
                title={`Question ${q.number} (${q.totalMarks} marks)`}
              >
                <span>Q{q.number}</span>
                {isScored && (
                  <span className="text-[10px] opacity-90 tabular-nums">({scores[q.number]}/{q.totalMarks})</span>
                )}
                {isFlag && (
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                )}
              </button>
            );
          })}
        </div>

        {/* Live Score Preview */}
        <div className="hidden sm:flex items-center gap-2 text-xs text-[#7B8FAD] shrink-0 font-medium">
          <span>Score:</span>
          <span className="text-[#E8ECF4] font-bold tabular-nums">
            {totalAchievedScore} / {paperMaxMarks}
          </span>
          <span className="text-[#4A7BF7]">({percent}%)</span>
        </div>
      </div>

      {/* Main Stage: Interactive Question Viewer */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 space-y-6">
        <div className="max-w-4xl mx-auto space-y-6 pb-12">
          {/* Question Card */}
          <div className="border border-[#6382BF]/30 rounded-2xl bg-[#1A2540] p-6 sm:p-8 shadow-xl space-y-6">
            {/* Question Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#6382BF]/25 gap-3">
              <div className="flex items-center gap-3">
                <span className="text-xl sm:text-2xl font-bold font-serif text-[#E8ECF4]">
                  Question {currentQ.number}
                </span>
                <span className="text-xs px-2.5 py-1 rounded-lg bg-[#0A1020] text-[#4A7BF7] font-semibold border border-[#6382BF]/30">
                  {currentQ.topic}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-[#0A1020] text-[#E8ECF4] border border-[#6382BF]/30 tabular-nums">
                  {currentQ.totalMarks} marks total
                </span>
                <button
                  onClick={() => setFlagged((prev) => ({ ...prev, [currentQ.number]: !prev[currentQ.number] }))}
                  className={`p-1.5 rounded-lg border text-xs transition-colors flex items-center gap-1.5 ${
                    flagged[currentQ.number]
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      : 'bg-[#0A1020] text-[#7B8FAD] border-[#6382BF]/30 hover:text-[#E8ECF4]'
                  }`}
                  title="Flag question for review"
                >
                  <Flag size={13} />
                  <span className="text-[11px] font-medium hidden sm:inline">
                    {flagged[currentQ.number] ? 'Flagged' : 'Flag'}
                  </span>
                </button>
              </div>
            </div>

            {/* Context Premise Text */}
            {currentQ.contextText && (
              <div className="p-4 sm:p-5 rounded-xl bg-[#0A1020] border border-[#6382BF]/25 text-sm sm:text-base leading-relaxed text-[#E8ECF4]">
                <FormattedMathText text={currentQ.contextText} />
              </div>
            )}

            {/* Diagram / Graph Card with Click-to-Zoom Lightbox trigger */}
            {(currentQ.diagramSvg || currentQ.diagramUrl) && (
              <div
                onClick={() => setLightboxDiagram({
                  svg: currentQ.diagramSvg,
                  url: currentQ.diagramUrl,
                  caption: currentQ.diagramCaption,
                })}
                className="border border-[#6382BF]/30 rounded-xl bg-[#0A1020] p-4 relative group cursor-pointer hover:border-[#4A7BF7]/60 transition-all shadow-md"
              >
                {currentQ.diagramSvg ? (
                  <div
                    className="flex justify-center"
                    dangerouslySetInnerHTML={{ __html: currentQ.diagramSvg }}
                  />
                ) : (
                  <img
                    src={currentQ.diagramUrl}
                    alt={currentQ.diagramCaption || `Question ${currentQ.number} figure`}
                    className="max-h-[340px] mx-auto object-contain select-none rounded-lg"
                  />
                )}
                {/* Overlay hover prompt */}
                <div className="text-center text-xs text-[#7B8FAD] mt-3 font-medium flex items-center justify-center gap-1.5">
                  <Eye size={13} className="text-[#4A7BF7]" />
                  <span>{currentQ.diagramCaption || 'Figure 1'}</span>
                  <span className="text-[#4A7BF7] group-hover:underline font-semibold ml-1">
                    · Click to Zoom / Inspect
                  </span>
                </div>
              </div>
            )}

            {/* Subparts List */}
            <div className="space-y-6 pt-2">
              {currentQ.parts.map((p, pIdx) => {
                const partKey = `${currentQ.number}_${pIdx}`;
                const isPartRevealed = revealedParts[partKey] || revealedSolutions[currentQ.number] || isReviewMode;
                const awarded = subpartScores[partKey];

                return (
                  <div
                    key={pIdx}
                    className="p-5 rounded-xl bg-[#0A1020]/70 border border-[#6382BF]/25 space-y-4 shadow-sm"
                  >
                    {/* Part Header */}
                    <div className="flex items-center justify-between text-xs border-b border-[#6382BF]/15 pb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#E8ECF4] text-sm">Part {p.partLabel}</span>
                        <span className="text-[#7B8FAD]">[{p.marks} {p.marks === 1 ? 'mark' : 'marks'}]</span>
                      </div>
                      {awarded !== undefined && (
                        <span className="px-2 py-0.5 rounded bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 font-semibold tabular-nums">
                          Awarded: {awarded} / {p.marks}
                        </span>
                      )}
                    </div>

                    {/* Part Question Text with Math */}
                    <FormattedMathText text={p.text} className="text-sm sm:text-base text-[#E8ECF4]" />

                    {/* Student Input: Answer & Working */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                      {/* Final Answer Input */}
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-[#7B8FAD] uppercase tracking-wider block">
                          Your Final Answer
                        </label>
                        <input
                          type="text"
                          value={studentAnswers[partKey] || ''}
                          onChange={(e) => setStudentAnswers({ ...studentAnswers, [partKey]: e.target.value })}
                          placeholder="e.g. x = 2/3, y = 14/3"
                          className="w-full px-3 py-2 bg-[#1A2540] border border-[#6382BF]/40 rounded-xl text-sm text-[#E8ECF4] focus:outline-none focus:border-[#4A7BF7] placeholder-[#7B8FAD]/50 font-mono"
                        />
                      </div>

                      {/* Working Notes */}
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-[#7B8FAD] uppercase tracking-wider block">
                          Working / Scratchpad Notes
                        </label>
                        <input
                          type="text"
                          value={studentWorking[partKey] || ''}
                          onChange={(e) => setStudentWorking({ ...studentWorking, [partKey]: e.target.value })}
                          placeholder="Key substitution steps, discriminant..."
                          className="w-full px-3 py-2 bg-[#1A2540] border border-[#6382BF]/40 rounded-xl text-sm text-[#E8ECF4] focus:outline-none focus:border-[#4A7BF7] placeholder-[#7B8FAD]/50"
                        />
                      </div>
                    </div>

                    {/* Solution & Mark Scheme Reveal Toggle */}
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => setRevealedParts({ ...revealedParts, [partKey]: !isPartRevealed })}
                        className="text-xs font-semibold text-[#4A7BF7] hover:text-[#6382BF] flex items-center gap-1.5 transition-colors"
                      >
                        {isPartRevealed ? <EyeOff size={13} /> : <Eye size={13} />}
                        <span>{isPartRevealed ? 'Hide Mark Scheme' : 'Reveal Solution & Mark Scheme'}</span>
                      </button>

                      {/* Revealed Solution Box */}
                      {isPartRevealed && (
                        <div className="mt-3 p-4 rounded-xl bg-[#1A2540] border border-[#4A7BF7]/40 space-y-3 animate-fadeIn">
                          <div className="text-xs font-semibold text-[#4A7BF7] flex items-center gap-1.5">
                            <CheckCircle2 size={13} />
                            <span>Official Solution & Marking Criteria</span>
                          </div>

                          {p.solution && (
                            <div className="p-3 rounded-lg bg-[#0A1020] border border-[#6382BF]/20 text-xs sm:text-sm">
                              <FormattedMathText text={p.solution} />
                            </div>
                          )}

                          {/* Self-Score Allocation for this Subpart */}
                          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#6382BF]/20 text-xs">
                            <span className="text-[#7B8FAD] font-medium">Self-Award Marks for Part {p.partLabel}:</span>
                            <div className="flex items-center gap-1.5">
                              {Array.from({ length: p.marks + 1 }).map((_, mVal) => (
                                <button
                                  key={mVal}
                                  type="button"
                                  onClick={() => handleSubpartScoreChange(currentQ.number, pIdx, p.marks, mVal)}
                                  className={`w-7 h-7 rounded-lg text-xs font-semibold transition-colors ${
                                    awarded === mVal
                                      ? 'bg-[#4A7BF7] text-white shadow-sm ring-1 ring-white/30'
                                      : 'bg-[#0A1020] text-[#7B8FAD] hover:text-[#E8ECF4] border border-[#6382BF]/30'
                                  }`}
                                >
                                  {mVal}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Question Mark Summary & Full Mark Scheme */}
            <div className="pt-4 border-t border-[#6382BF]/25 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-semibold text-[#7B8FAD] block">
                  Question {currentQ.number} Score
                </span>
                <div className="text-lg font-bold text-[#E8ECF4] tabular-nums mt-0.5">
                  {scores[currentQ.number] !== undefined ? scores[currentQ.number] : 0} <span className="text-xs text-[#7B8FAD] font-normal">/ {currentQ.totalMarks} marks</span>
                </div>
              </div>

              {/* Quick Overall Fill Buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleScoreChange(currentQ.number, '0', currentQ.totalMarks)}
                  className="px-2.5 py-1 text-xs rounded-lg bg-[#0A1020] hover:bg-[#1A2540] text-[#7B8FAD] hover:text-[#E8ECF4] border border-[#6382BF]/30 font-medium transition-colors"
                >
                  0
                </button>
                <button
                  type="button"
                  onClick={() => handleScoreChange(currentQ.number, String(Math.round(currentQ.totalMarks / 2)), currentQ.totalMarks)}
                  className="px-2.5 py-1 text-xs rounded-lg bg-[#0A1020] hover:bg-[#1A2540] text-[#7B8FAD] hover:text-[#E8ECF4] border border-[#6382BF]/30 font-medium transition-colors"
                >
                  ½ Marks
                </button>
                <button
                  type="button"
                  onClick={() => handleScoreChange(currentQ.number, String(currentQ.totalMarks), currentQ.totalMarks)}
                  className="px-3 py-1 text-xs rounded-lg bg-[#4A7BF7]/20 hover:bg-[#4A7BF7]/40 text-[#4A7BF7] hover:text-white border border-[#4A7BF7]/40 font-semibold transition-colors"
                >
                  Full Marks ({currentQ.totalMarks})
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Pagination Controls */}
          <div className="flex items-center justify-between gap-4 pt-2">
            <button
              onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
              disabled={currentIndex === 0}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 border transition-colors ${
                currentIndex === 0
                  ? 'opacity-30 cursor-not-allowed bg-[#0A1020] text-[#7B8FAD] border-transparent'
                  : 'bg-[#1A2540] hover:bg-[#4A7BF7] text-[#E8ECF4] border-[#6382BF]/40 shadow-sm'
              }`}
            >
              <ArrowLeft size={14} />
              <span>Previous Question</span>
            </button>

            <span className="text-xs text-[#7B8FAD] font-medium hidden sm:inline">
              Question {currentIndex + 1} of {paper.questions.length}
            </span>

            {currentIndex < paper.questions.length - 1 ? (
              <button
                onClick={() => setCurrentIndex(currentIndex + 1)}
                className="px-5 py-2.5 rounded-xl bg-[#4A7BF7] hover:bg-[#6382BF] text-white text-xs font-semibold flex items-center gap-2 transition-colors shadow-md"
              >
                <span>Next Question</span>
                <ArrowRight size={14} />
              </button>
            ) : (
              <button
                onClick={() => setShowFinishConfirm(true)}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-2 transition-colors shadow-md"
              >
                <span>Submit & View Results</span>
                <CheckCircle2 size={14} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------------- */}
      {/* High-Resolution Diagram Lightbox Modal (Click-to-Zoom / Inspect)       */}
      {/* ---------------------------------------------------------------------- */}
      {lightboxDiagram && (
        <div className="fixed inset-0 z-50 bg-[#0A1020]/95 backdrop-blur-md flex flex-col p-4 animate-fadeIn">
          {/* Lightbox Toolbar */}
          <div className="h-12 bg-[#1A2540] border border-[#6382BF]/30 rounded-xl px-4 flex items-center justify-between shrink-0 shadow-lg mb-4">
            <div className="flex items-center gap-2">
              <Eye size={15} className="text-[#4A7BF7]" />
              <span className="text-xs font-semibold text-[#E8ECF4] truncate max-w-md">
                {lightboxDiagram.caption || 'High-Resolution Diagram Inspection'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setLightboxZoom((prev) => Math.max(0.75, prev - 0.25))}
                className="p-1.5 rounded-lg bg-[#0A1020] hover:bg-[#4A7BF7] text-[#7B8FAD] hover:text-white border border-[#6382BF]/30 transition-colors"
                title="Zoom Out (-)"
              >
                <ZoomOut size={14} />
              </button>
              <span className="text-xs font-semibold text-[#E8ECF4] tabular-nums px-2">
                {Math.round(lightboxZoom * 100)}%
              </span>
              <button
                onClick={() => setLightboxZoom((prev) => Math.min(3, prev + 0.25))}
                className="p-1.5 rounded-lg bg-[#0A1020] hover:bg-[#4A7BF7] text-[#7B8FAD] hover:text-white border border-[#6382BF]/30 transition-colors"
                title="Zoom In (+)"
              >
                <ZoomIn size={14} />
              </button>
              <button
                onClick={() => setLightboxZoom(1)}
                className="px-2 py-1 rounded-lg bg-[#0A1020] hover:bg-[#1A2540] text-[11px] font-semibold text-[#7B8FAD] hover:text-[#E8ECF4] border border-[#6382BF]/30 transition-colors"
                title="Reset Zoom (100%)"
              >
                Reset
              </button>
              <button
                onClick={() => setLightboxDiagram(null)}
                className="p-1.5 rounded-lg bg-[#0A1020] hover:bg-rose-500 hover:text-white text-[#7B8FAD] border border-[#6382BF]/30 transition-colors ml-2"
                title="Close Lightbox (ESC)"
              >
                <X size={15} />
              </button>
            </div>
          </div>

          {/* Lightbox Canvas Viewport */}
          <div className="flex-1 overflow-auto flex items-center justify-center p-6 border border-[#6382BF]/20 rounded-2xl bg-[#0A1020]">
            <div
              style={{
                transform: `scale(${lightboxZoom})`,
                transformOrigin: 'center center',
                transition: 'transform 0.15s ease-out',
              }}
              className="max-w-4xl max-h-[80vh] flex items-center justify-center"
            >
              {lightboxDiagram.svg ? (
                <div
                  className="w-full h-auto select-none"
                  dangerouslySetInnerHTML={{ __html: lightboxDiagram.svg }}
                />
              ) : (
                <img
                  src={lightboxDiagram.url}
                  alt={lightboxDiagram.caption || 'Diagram'}
                  className="max-w-full max-h-[75vh] object-contain select-none rounded-lg"
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------- */}
      {/* Formula Booklet Slide-over Drawer                                     */}
      {/* ---------------------------------------------------------------------- */}
      {showFormulaDrawer && (
        <FormulaBookletModal
          mode="drawer"
          onClose={() => setShowFormulaDrawer(false)}
        />
      )}

      {/* ---------------------------------------------------------------------- */}
      {/* Scanned Official Question Paper Slide-over Drawer                     */}
      {/* ---------------------------------------------------------------------- */}
      {showPdfDrawer && paper.qpUrl && (
        <div className="fixed inset-y-0 left-0 z-50 w-full sm:w-[640px] md:w-[720px] bg-[#1A2540] border-r border-[#6382BF]/30 shadow-2xl flex flex-col animate-fadeIn">
          <div className="h-12 bg-[#0A1020] px-4 border-b border-[#6382BF]/30 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <FileText size={15} className="text-[#4A7BF7]" />
              <span className="text-xs font-bold text-[#E8ECF4]">
                Official Question Paper · {paper.title}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={paper.qpUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-[#7B8FAD] hover:text-[#E8ECF4] flex items-center gap-1"
              >
                <span>New Tab</span>
                <ExternalLink size={12} />
              </a>
              <button
                onClick={() => setShowPdfDrawer(false)}
                className="p-1 rounded-lg hover:bg-[#1A2540] text-[#7B8FAD] hover:text-[#E8ECF4]"
              >
                <X size={16} />
              </button>
            </div>
          </div>
          <iframe
            src={`${paper.qpUrl}#toolbar=0&navpanes=0&view=FitH`}
            className="flex-1 w-full border-0"
            title={`${paper.title} PDF reference`}
          />
        </div>
      )}

      {/* ---------------------------------------------------------------------- */}
      {/* Finish Confirmation Dialog                                             */}
      {/* ---------------------------------------------------------------------- */}
      {showFinishConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A1020]/90 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#1A2540] border border-[#6382BF]/40 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-modalFadeIn">
            <div className="flex items-center gap-3 text-[#E8ECF4]">
              <div className="p-2.5 rounded-xl bg-[#4A7BF7]/20 text-[#4A7BF7] border border-[#4A7BF7]/30">
                <AlertCircle size={20} />
              </div>
              <div>
                <h3 className="font-bold text-base text-[#E8ECF4]">Finish & Grade Exam?</h3>
                <p className="text-xs text-[#7B8FAD] mt-0.5">
                  You have marked {Object.keys(scores).length} of {paper.questions.length} questions.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#0A1020] border border-[#6382BF]/25 text-xs text-[#7B8FAD] space-y-1">
              <div className="flex justify-between">
                <span>Current Total Score:</span>
                <span className="text-[#E8ECF4] font-bold tabular-nums">{totalAchievedScore} / {paperMaxMarks} ({percent}%)</span>
              </div>
              <div className="flex justify-between">
                <span>Projected Grade:</span>
                <span className="text-emerald-400 font-bold">{calculateGrade(percent)}</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowFinishConfirm(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-[#7B8FAD] hover:text-[#E8ECF4] hover:bg-[#0A1020] transition-colors"
              >
                Keep Practicing
              </button>
              <button
                type="button"
                onClick={handleFinishExam}
                className="px-5 py-2 rounded-xl bg-[#4A7BF7] hover:bg-[#6382BF] text-white text-xs font-semibold transition-colors shadow-md"
              >
                Submit Exam
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
