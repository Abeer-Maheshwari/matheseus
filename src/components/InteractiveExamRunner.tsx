import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { InteractivePaper, InteractiveQuestion } from '../data/interactiveQuestions';
import { FormattedMathText } from './MathRenderer';
import { FormulaBookletModal } from './FormulaBookletModal';
import { FlipClock } from './FlipClock';
import { playExamChime } from '../utils/audio';
import { ExamAttempt } from '../types';
import { saveExamAttempt, getExamAttempts } from '../utils/attempts';
import { assetUrl } from '../utils/assets';
import { saveExamDraft, clearExamDraft } from '../utils/progressSync';
import { ScoreReportScreen } from './ScoreReportModal';
import { SectionLoader } from './SectionLoader';
import { getSettings } from '../utils/settings';
import { EASE_SMOOTH, overlayFadeVariants, modalPanelVariants } from '../utils/motion';
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
  Minimize2,
  ZoomIn,
  ZoomOut,
  ExternalLink,
  HelpCircle,
  AlertCircle,
  Pause
} from 'lucide-react';

export type TimingMode = 'timed' | 'untimed';

export const getQuestionDisplayInfo = (paper: InteractivePaper, q: InteractiveQuestion, index: number) => {
  const isJointAppliedPaper = 
    paper.paperCode === '9MA0/03' || 
    paper.id.includes('p3') || 
    paper.title.toLowerCase().includes('statistics & mechanics') || 
    paper.title.toLowerCase().includes('stats & mechanics');

  if (q.section && q.sectionQuestionNumber) {
    const isStats = q.section.toLowerCase().includes('stat');
    return {
      hasSections: true,
      section: q.section,
      sectionShort: isStats ? 'Stats' : 'Mech',
      sectionLetter: isStats ? 'Section A' : 'Section B',
      displayNumber: q.sectionQuestionNumber,
      fullTitle: `${isStats ? 'Section A: Statistics' : 'Section B: Mechanics'} · Question ${q.sectionQuestionNumber}`,
      shortLabel: `${isStats ? 'Stats' : 'Mech'} Q${q.sectionQuestionNumber}`,
    };
  }

  if (isJointAppliedPaper) {
    const totalQ = paper.questions.length;
    const statsCount = totalQ >= 11 ? 6 : 5;
    const isStats = index < statsCount;
    const section = isStats ? 'Section A: Statistics' : 'Section B: Mechanics';
    const displayNumber = isStats ? index + 1 : index + 1 - statsCount;

    return {
      hasSections: true,
      section,
      sectionShort: isStats ? 'Stats' : 'Mech',
      sectionLetter: isStats ? 'Section A' : 'Section B',
      displayNumber,
      fullTitle: `${section} · Question ${displayNumber}`,
      shortLabel: `${isStats ? 'Stats' : 'Mech'} Q${displayNumber}`,
    };
  }

  return {
    hasSections: false,
    section: '',
    sectionShort: '',
    sectionLetter: '',
    displayNumber: q.number,
    fullTitle: `Question ${q.number}`,
    shortLabel: `Q${q.number}`,
  };
};

const renderPartLabel = (rawLabel: string | undefined, index: number): React.ReactNode => {
  if (!rawLabel) return <span>Part {index + 1}</span>;
  const clean = rawLabel.replace(/[()]/g, '').trim();
  if (!clean) return <span>Part {index + 1}</span>;
  return (
    <span className="[font-variant-ligatures:none]" style={{ fontVariantLigatures: 'none' }}>
      Part (<span>{clean}</span>)
    </span>
  );
};

interface InteractiveExamRunnerProps {
  paper: InteractivePaper;
  onClose: () => void;
  onSaveResult?: (paperId: string, score: number, maxScore: number) => void;
  initialReviewMode?: boolean;
  initialQuestionIndex?: number;
  initialAttempt?: ExamAttempt;
}

export const InteractiveExamRunner: React.FC<InteractiveExamRunnerProps> = ({
  paper,
  onClose,
  onSaveResult,
  initialReviewMode = false,
  initialQuestionIndex = 0,
  initialAttempt,
}) => {
  // Pre-exam setup
  const [isStarted, setIsStarted] = useState(initialReviewMode);
  const [timingMode, setTimingMode] = useState<TimingMode>(
    () => initialAttempt?.timingMode || getSettings().defaultTimingMode
  );

  // Active question index & scroll ref
  const [currentIndex, setCurrentIndex] = useState(initialQuestionIndex);
  const mainStageRef = useRef<HTMLDivElement | null>(null);

  // Image preloading & real loading completion states (no artificial timers)
  const [isScreenTransitioning, setIsScreenTransitioning] = useState(false);
  const [transitionMessage, setTransitionMessage] = useState('Preparing exam environment...');
  const [isImgReady, setIsImgReady] = useState(false);
  const [isMsImgReady, setIsMsImgReady] = useState(false);
  const [pdfDrawerLoading, setPdfDrawerLoading] = useState(true);
  const qImgRef = useRef<HTMLImageElement | null>(null);
  const msImgRef = useRef<HTMLImageElement | null>(null);

  const isImgLoaded = isImgReady;
  const isMsImgLoaded = isMsImgReady;

  // Preload next and previous question images & mark schemes into browser cache
  useEffect(() => {
    if (!paper?.questions?.length) return;
    const targets = [currentIndex + 1, currentIndex + 2, currentIndex - 1];
    targets.forEach((idx) => {
      if (idx >= 0 && idx < paper.questions.length) {
        const q = paper.questions[idx];
        if (q.questionImageUrl) {
          const img = new Image();
          img.src = assetUrl(q.questionImageUrl);
        }
        if (q.markSchemeImageUrl) {
          const msImg = new Image();
          msImg.src = assetUrl(q.markSchemeImageUrl);
        }
      }
    });
  }, [currentIndex, paper.questions]);

  // User input states per question & subpart
  const [scores, setScores] = useState<Record<number, number>>(() => {
    if (initialAttempt?.questionScores) return initialAttempt.questionScores;
    return {};
  });
  const [subpartScores, setSubpartScores] = useState<Record<string, number>>(() => {
    if (initialAttempt?.subpartScores) return initialAttempt.subpartScores;
    return {};
  });
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

  useEffect(() => {
    if (!showPdfDrawer) return;
    setPdfDrawerLoading(true);
    const fallback = window.setTimeout(() => setPdfDrawerLoading(false), 7000);
    return () => window.clearTimeout(fallback);
  }, [showPdfDrawer, paper.qpUrl]);

  // Modals
  const [showFinishConfirm, setShowFinishConfirm] = useState(false);
  const [lightboxDiagram, setLightboxDiagram] = useState<{
    svg?: string;
    url?: string;
    caption?: string;
  } | null>(null);
  const [lightboxZoom, setLightboxZoom] = useState(1);

  // Fullscreen mode state
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFsChange);
    };
  }, []);

  const toggleFullscreen = () => {
    try {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen?.().catch((err) => {
          console.warn('Error entering fullscreen:', err);
        });
      } else {
        document.exitFullscreen?.().catch((err) => {
          console.warn('Error exiting fullscreen:', err);
        });
      }
    } catch (e) {
      console.warn('Fullscreen toggle error:', e);
    }
  };

  const handleCloseRunner = () => {
    if (document.fullscreenElement) {
      try {
        document.exitFullscreen?.();
      } catch {
        // ignore
      }
    }
    onClose();
  };

  // Completed exam summary view
  const [isFinished, setIsFinished] = useState(initialReviewMode);
  const [isReviewMode, setIsReviewMode] = useState(initialReviewMode);
  const isQuickReview = initialReviewMode && !initialAttempt;

  // Past attempts history
  const [pastAttempts, setPastAttempts] = useState<ExamAttempt[]>([]);
  const [showAttemptsModal, setShowAttemptsModal] = useState(false);

  // Draft recovery key
  const draftStorageKey = `matheseus_draft_${paper.id}`;
  const [savedDraft, setSavedDraft] = useState<{
    scores: Record<number, number>;
    subpartScores?: Record<string, number>;
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
    setPastAttempts(getExamAttempts());
  }, []);

  // Auto-save ongoing draft (local + Supabase when signed in)
  useEffect(() => {
    if (isStarted && !isFinished) {
      saveExamDraft(paper.id, {
        scores,
        subpartScores,
        flagged,
        currentIndex,
        timeSpent,
        secondsRemaining,
        timingMode,
        timestamp: Date.now(),
      });
    }
  }, [
    paper.id,
    isStarted,
    isFinished,
    scores,
    subpartScores,
    flagged,
    currentIndex,
    timeSpent,
    secondsRemaining,
    timingMode,
  ]);

  // Check if viewing mark scheme (timer pauses when viewing mark scheme ONLY in timed mode)
  const isViewingMs = Boolean(
    timingMode === 'timed' &&
    !isReviewMode && (
      (paper.questions[currentIndex] && revealedSolutions[paper.questions[currentIndex].number]) ||
      (lightboxDiagram && (
        (paper.questions[currentIndex] && lightboxDiagram.url === paper.questions[currentIndex].markSchemeImageUrl) ||
        lightboxDiagram.caption?.toLowerCase().includes('mark scheme')
      ))
    )
  );

  // Main countdown timer (pauses if manually paused or if viewing mark scheme)
  useEffect(() => {
    if (!isStarted || isFinished || isTimerPaused || isViewingMs) return;

    const interval = setInterval(() => {
      setTimeSpent((prev) => prev + 1);

      if (timingMode === 'timed') {
        setSecondsRemaining((prev) => (prev <= 1 ? 0 : prev - 1));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isStarted, isFinished, isTimerPaused, isViewingMs, timingMode]);

  // Save and finish automatically when countdown hits zero
  useEffect(() => {
    if (isStarted && !isFinished && timingMode === 'timed' && secondsRemaining === 0) {
      playExamChime();
      handleFinishExam();
    }
  }, [secondsRemaining, isStarted, isFinished, timingMode]);

  // Keyboard navigation & shortcuts
  useEffect(() => {
    if (!isStarted || isFinished) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA')) {
        return;
      }

      if (e.key === 'ArrowRight' || e.key === 'l' || e.key === 'L') {
        handleNavigateQuestion(currentIndex + 1);
      } else if (e.key === 'ArrowLeft' || e.key === 'h' || e.key === 'H') {
        handleNavigateQuestion(currentIndex - 1);
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
  const currentQInfo = getQuestionDisplayInfo(paper, currentQ, currentIndex);
  const paperMaxMarks = paper.totalMarks || paper.questions.reduce((sum, q) => sum + q.totalMarks, 0);
  const isMsPanelOpen = Boolean(currentQ && (revealedSolutions[currentQ.number] || isReviewMode));
  const resolvedQImgUrl = currentQ?.questionImageUrl ? assetUrl(currentQ.questionImageUrl) : '';
  const resolvedMsImgUrl = currentQ?.markSchemeImageUrl ? assetUrl(currentQ.markSchemeImageUrl) : '';

  // Sync question image readiness synchronously before paint so cached images never flash a spinner
  useLayoutEffect(() => {
    if (!isStarted || (isFinished && !isReviewMode) || !resolvedQImgUrl) return;
    const el = qImgRef.current;
    if (el && el.complete && el.naturalWidth > 0) {
      setIsImgReady(true);
    } else {
      setIsImgReady(false);
    }
  }, [resolvedQImgUrl, isStarted, isFinished, isReviewMode]);

  // Sync mark scheme image readiness synchronously before paint so cached images never flash a spinner
  useLayoutEffect(() => {
    if (!isStarted || (isFinished && !isReviewMode) || !isMsPanelOpen || !resolvedMsImgUrl) {
      setIsMsImgReady(false);
      return;
    }
    const el = msImgRef.current;
    if (el && el.complete && el.naturalWidth > 0) {
      setIsMsImgReady(true);
    } else {
      setIsMsImgReady(false);
    }
  }, [resolvedMsImgUrl, isMsPanelOpen, isStarted, isFinished, isReviewMode]);

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

  const handleSubpartScoreChange = (qNum: number, partIdx: number, _partMax: number, score: number) => {
    const key = `${qNum}_${partIdx}`;
    const newSubScores = { ...subpartScores };
    if (newSubScores[key] === score) {
      delete newSubScores[key];
    } else {
      newSubScores[key] = score;
    }
    setSubpartScores(newSubScores);

    // Recompute total score for this question; clear total if no subparts remain marked
    const q = paper.questions.find((item) => item.number === qNum);
    if (q) {
      let sum = 0;
      let hasAny = false;
      q.parts.forEach((_, idx) => {
        const k = `${qNum}_${idx}`;
        if (newSubScores[k] !== undefined) {
          sum += newSubScores[k];
          hasAny = true;
        }
      });
      handleScoreChange(qNum, hasAny ? String(sum) : '', q.totalMarks);
    }
  };

  const handleFinishExam = () => {
    setShowFinishConfirm(false);
    setIsFinished(true);

    clearExamDraft(paper.id);

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
      timeSpentSeconds: timeSpent,
      questionScores: scores,
      subpartScores,
    };

    const updated = saveExamAttempt(newAttempt);
    setPastAttempts(updated);

    if (onSaveResult) {
      onSaveResult(paper.id, totalAchievedScore, paperMaxMarks);
    }
  };

  const handleNavigateQuestion = (targetIdx: number) => {
    if (targetIdx === currentIndex || targetIdx < 0 || targetIdx >= paper.questions.length) return;
    setCurrentIndex(targetIdx);
  };

  const handleStartPracticeWithTransition = () => {
    setIsScreenTransitioning(false);
    setIsStarted(true);
  };

  const handleFinishExamWithTransition = () => {
    setShowFinishConfirm(false);
    setIsScreenTransitioning(false);
    handleFinishExam();
  };

  const handleRestart = () => {
    try {
      localStorage.removeItem(draftStorageKey);
    } catch {}
    setSavedDraft(null);
    setScores({});
    setSubpartScores({});
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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A1020]/90 backdrop-blur-sm text-[#E8ECF4]">
        <div className="bg-[#1A2540] border border-[#6382BF]/40 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl">
          {/* Header */}
          <div className="border-b border-[#6382BF]/25 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src="/logo.png" alt="matheseus" className="w-6 h-6 rounded-md object-cover ring-1 ring-white/10" />
                <span className="text-xs px-2.5 py-1 rounded bg-[#0A1020] border border-[#6382BF]/40 text-[#4A7BF7] font-semibold tracking-wide font-sans">
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
              {paper.questions.length} questions · {paperMaxMarks} marks · {paper.durationMinutes} min
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
                    clearExamDraft(paper.id);
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
              onClick={handleStartPracticeWithTransition}
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
  // Exam Completed / Summary Screen (Unified Report Screen)
  // --------------------------------------------------------------------------
  if (isFinished && !isReviewMode) {
    const latestAttempt: ExamAttempt = pastAttempts.find((a) => a.paperId === paper.id) || {
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
      timeSpentSeconds: timeSpent,
      questionScores: scores,
    };

    return (
      <ScoreReportScreen
        attempt={latestAttempt}
        paper={paper}
        onClose={handleCloseRunner}
        onRetake={handleRestart}
        onReview={(qIdx) => {
          setIsScreenTransitioning(true);
          setTransitionMessage('Loading Review Mode...');
          if (qIdx !== undefined) setCurrentIndex(qIdx);
          setIsReviewMode(true);
          setIsScreenTransitioning(false);
        }}
        erUrl={paper.erUrl || (paper.qpUrl ? paper.qpUrl.replace(/qp/g, 'er') : undefined)}
        onOpenSingleDoc={(title, url) => window.open(url, '_blank')}
      />
    );
  }

  // --------------------------------------------------------------------------
  // Main Interactive Exam Workspace
  // --------------------------------------------------------------------------
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#0F1729] text-[#E8ECF4] overflow-hidden">
      {/* Top Header Bar */}
      <header className="h-14 bg-[#1A2540] border-b border-[#6382BF]/30 px-4 flex items-center justify-between shrink-0 z-30">
        {/* Left: Brand & Paper Code */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (isQuickReview) {
                handleCloseRunner();
              } else if (isReviewMode) {
                setIsReviewMode(false);
              } else if (getSettings().confirmBeforeExit && Object.keys(scores).length > 0 && !isFinished) {
                setShowFinishConfirm(true);
              } else {
                handleCloseRunner();
              }
            }}
            className="p-1.5 rounded-lg hover:bg-[#0A1020] text-[#7B8FAD] hover:text-[#E8ECF4] transition-colors"
            title={isQuickReview ? "Back to Topics" : isReviewMode ? "Return to Score Report" : "Exit Practice Mode"}
          >
            {isReviewMode ? <ArrowLeft size={18} /> : <X size={18} />}
          </button>

          <img src="/logo.png" alt="matheseus" className="w-7 h-7 rounded-lg object-cover ring-1 ring-white/10 hidden sm:inline" />

          <span className="text-xs px-2.5 py-1 rounded bg-[#0A1020] border border-[#6382BF]/40 text-[#4A7BF7] font-semibold tracking-wide font-sans shrink-0">
            {paper.paperCode}
          </span>
          <span className="font-bold text-sm text-[#E8ECF4] truncate hidden md:inline max-w-sm">
            {paper.title}
          </span>
        </div>

        {/* Center: Countdown Timer or Review Mode Indicator */}
        <div className="flex items-center gap-2">
          {isReviewMode ? (
            <div className="flex items-center gap-2 bg-[#0A1020] px-3.5 py-1.5 rounded-xl border border-[#4A7BF7]/40 shadow-inner">
              <Eye size={13} className="text-[#4A7BF7]" />
              <span className="text-xs font-bold text-[#E8ECF4]">Review Mode</span>
              <span className="text-[11px] text-[#7B8FAD] hidden sm:inline">· Official Mark Scheme Active</span>
            </div>
          ) : timingMode === 'timed' ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-[#0A1020] px-3 py-1.5 rounded-xl border border-[#6382BF]/30 shadow-inner">
                <FlipClock
                  secondsRemaining={secondsRemaining}
                  isPaused={isTimerPaused || isViewingMs}
                  onTogglePause={() => setIsTimerPaused(!isTimerPaused)}
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 text-xs text-[#7B8FAD] bg-[#0A1020] px-3 py-1.5 rounded-xl border border-[#6382BF]/30 tabular-nums">
                <Sparkles size={13} className="text-[#4A7BF7]" />
                <span>{Math.floor(timeSpent / 60)}m {timeSpent % 60}s</span>
              </div>
            </div>
          )}
        </div>

        {/* Right: Tools & Submit */}
        <div className="flex items-center gap-2">
          {/* Fullscreen Mode Toggle Button */}
          <button
            type="button"
            onClick={toggleFullscreen}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-xl border font-medium transition-colors ${
              isFullscreen
                ? 'bg-[#4A7BF7] text-white border-[#4A7BF7] shadow-sm'
                : 'bg-[#0A1020] hover:bg-[#1A2540] text-[#E8ECF4] border-[#6382BF]/40'
            }`}
            title={isFullscreen ? "Exit Fullscreen (Esc)" : "Enter Fullscreen Mode"}
          >
            {isFullscreen ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
            <span className="hidden sm:inline">{isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}</span>
          </button>

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

          {/* Finish & Grade or Back to Report Button */}
          {isQuickReview ? (
            <button
              onClick={handleCloseRunner}
              className="px-4 py-1.5 text-xs rounded-xl bg-[#0A1020] hover:bg-[#1A2540] text-[#E8ECF4] border border-[#6382BF]/40 font-semibold transition-colors shadow-sm shrink-0 flex items-center gap-1.5"
            >
              <X size={13} />
              <span>Close</span>
            </button>
          ) : isReviewMode ? (
            <button
              onClick={() => setIsReviewMode(false)}
              className="px-4 py-1.5 text-xs rounded-xl bg-[#4A7BF7] hover:bg-[#6382BF] text-white font-semibold transition-colors shadow-sm shrink-0 flex items-center gap-1.5"
            >
              <Award size={13} />
              <span>Back to Report</span>
            </button>
          ) : (
            <button
              onClick={() => setShowFinishConfirm(true)}
              className="px-4 py-1.5 text-xs rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold transition-colors shadow-sm shadow-red-950/30 shrink-0 active:scale-[0.98]"
            >
              Finish Exam
            </button>
          )}
        </div>
      </header>

      {/* Question Navigation Strip */}
      <div className="bg-[#1A2540]/80 border-b border-[#6382BF]/25 px-4 py-2 flex items-center justify-between gap-3 overflow-x-auto shrink-0 z-20">
        <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
          {paper.questions.map((q, idx) => {
            const isCurrent = idx === currentIndex;
            const isScored = scores[q.number] !== undefined;
            const isFlag = !!flagged[q.number];
            const qInfo = getQuestionDisplayInfo(paper, q, idx);

            const prevQInfo = idx > 0 ? getQuestionDisplayInfo(paper, paper.questions[idx - 1], idx - 1) : null;
            const isNewSection = qInfo.hasSections && (idx === 0 || qInfo.section !== prevQInfo?.section);

            return (
              <React.Fragment key={q.number}>
                {isNewSection && (
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider shrink-0 ${
                    qInfo.sectionShort === 'Stats'
                      ? 'bg-[#4A7BF7]/15 text-[#4A7BF7] border border-[#4A7BF7]/30'
                      : 'bg-amber-500/15 text-amber-300 border border-amber-500/30 ml-2'
                  }`}>
                    {qInfo.sectionLetter}: {qInfo.sectionShort}
                  </span>
                )}
                {(() => {
                  const scoreRatio = isScored && q.totalMarks > 0 ? scores[q.number] / q.totalMarks : null;
                  const scoredNavClass =
                    scoreRatio === 1
                      ? 'bg-emerald-600/30 border border-emerald-500/50 text-emerald-300 hover:bg-emerald-600/40'
                      : scoreRatio !== null && scoreRatio >= 0.5
                      ? 'bg-amber-500/20 border border-amber-500/50 text-amber-300 hover:bg-amber-500/30'
                      : 'bg-rose-500/20 border border-rose-500/50 text-rose-300 hover:bg-rose-500/30';
                  return (
                    <button
                      key={q.number}
                      onClick={() => handleNavigateQuestion(idx)}
                      className={`h-7 px-2.5 rounded-lg text-xs font-semibold relative transition-all flex items-center gap-1 shrink-0 ${
                        isCurrent
                          ? 'bg-[#4A7BF7] text-white shadow-md shadow-[#4A7BF7]/25'
                          : isScored
                          ? scoredNavClass
                          : 'bg-[#0A1020] border border-[#6382BF]/30 text-[#7B8FAD] hover:text-[#E8ECF4] hover:border-[#6382BF]/50'
                      }`}
                      title={`${qInfo.fullTitle} (${q.totalMarks} marks)`}
                    >
                      <span>Q{qInfo.displayNumber}</span>
                      {isScored && (
                        <span className="text-[10px] opacity-90 tabular-nums">({scores[q.number]}/{q.totalMarks})</span>
                      )}
                      {isFlag && (
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      )}
                    </button>
                  );
                })()}
              </React.Fragment>
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

      {/* Main Stage: Interactive Question Viewer with Clean Crossfade */}
      <div ref={mainStageRef} className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 space-y-6">
        <AnimatePresence
          mode="wait"
          initial={false}
          onExitComplete={() => {
            if (getSettings().autoScrollNextQuestion) {
              mainStageRef.current?.scrollTo({ top: 0 });
            }
          }}
        >
          <motion.div
            key={currentQ.number}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: EASE_SMOOTH }}
            className="max-w-4xl mx-auto space-y-6 pb-12"
          >
          {/* Question Card */}
          <div className="border border-[#6382BF]/30 hover:border-[#4A7BF7]/40 rounded-2xl bg-[#1A2540] p-6 sm:p-8 shadow-xl space-y-6 transition-colors duration-200">
            {/* Question Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#6382BF]/25 gap-3">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-xl sm:text-2xl font-bold text-[#E8ECF4]">
                  Question {currentQInfo.displayNumber}
                </span>
                {currentQInfo.hasSections && (
                  <span className={`text-xs px-2.5 py-1 rounded-lg font-semibold border ${
                    currentQInfo.sectionShort === 'Stats'
                      ? 'bg-[#4A7BF7]/15 text-[#4A7BF7] border-[#4A7BF7]/30'
                      : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                  }`}>
                    {currentQInfo.section}
                  </span>
                )}
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

            {/* Authentic Question Card (High-Resolution Official Pearson Crop) */}
            {currentQ.questionImageUrl ? (
              <div
                onClick={() => setLightboxDiagram({
                  url: currentQ.questionImageUrl,
                  caption: `${currentQInfo.hasSections ? `${currentQInfo.section} · ` : ''}Question ${currentQInfo.displayNumber} · Question Paper (${paper.paperCode})`,
                })}
                className="border border-[#6382BF]/30 hover:border-[#4A7BF7]/60 rounded-xl bg-[#0A1020] p-3 sm:p-4 relative group cursor-zoom-in transition-all shadow-md overflow-hidden"
              >
                <div className="relative min-h-[220px] bg-white rounded-lg p-2.5 sm:p-4 mx-auto flex items-center justify-center shadow-sm overflow-hidden">
                  {!isImgLoaded && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#F8FAFC] rounded-lg gap-2.5 z-10 shadow-inner">
                      <div className="relative flex items-center justify-center">
                        <div className="w-9 h-9 rounded-full border-2 border-[#4A7BF7]/25 border-t-[#4A7BF7] animate-spin" />
                        <FileText size={15} className="text-[#4A7BF7] absolute animate-pulse" />
                      </div>
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4A7BF7]/10 border border-[#4A7BF7]/25 shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#4A7BF7] animate-ping" />
                        <span className="text-xs font-bold text-[#2563EB] tracking-tight">
                          Loading question...
                        </span>
                      </div>
                    </div>
                  )}
                  <img
                    key={resolvedQImgUrl}
                    ref={qImgRef}
                    src={resolvedQImgUrl}
                    alt={`Question ${currentQ.number}`}
                    onLoad={() => setIsImgReady(true)}
                    onError={() => setIsImgReady(true)}
                    className={`w-full max-h-[620px] object-contain select-none mx-auto block transition-opacity duration-200 ${
                      isImgLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </div>
                <div className="text-center text-xs text-[#7B8FAD] mt-2.5 font-medium flex items-center justify-center gap-1.5">
                  <Eye size={13} className="text-[#4A7BF7]" />
                  <span>
                    {currentQInfo.hasSections ? `${currentQInfo.sectionLetter} · ` : ''}Question {currentQInfo.displayNumber}
                  </span>
                  <span className="text-[#4A7BF7] group-hover:underline font-semibold ml-1">
                    · Click to Zoom
                  </span>
                </div>
              </div>
            ) : (
              <>
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
                      <div className="bg-white rounded-lg p-3 mx-auto max-w-2xl flex items-center justify-center shadow-sm">
                        <img
                          src={assetUrl(currentQ.diagramUrl)}
                          alt={currentQ.diagramCaption || `Question ${currentQ.number} figure`}
                          className="max-h-[340px] max-w-full object-contain select-none"
                        />
                      </div>
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
              </>
            )}

            {/* Legacy Text Parts Fallback (if no question image is present) */}
            {!currentQ.questionImageUrl && (
              <div className="space-y-4 pt-2">
                {currentQ.parts.map((p, pIdx) => (
                  <div key={pIdx} className="p-4 rounded-xl bg-[#0A1020]/70 border border-[#6382BF]/25 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#E8ECF4]">
                      <span className="[font-variant-ligatures:none]">{currentQ.parts.length === 1 ? `Question ${currentQ.number}` : renderPartLabel(p.partLabel, pIdx)}</span>
                      <span className="text-[#7B8FAD]">[{p.marks} {p.marks === 1 ? 'mark' : 'marks'}]</span>
                    </div>
                    <FormattedMathText text={p.text} className="text-sm sm:text-base text-[#E8ECF4]" />
                  </div>
                ))}
              </div>
            )}

            {/* Solution & Official Mark Scheme Section */}
            <div className="pt-2 space-y-4">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <button
                  type="button"
                  onClick={() => {
                    const willReveal = !revealedSolutions[currentQ.number];
                    if (willReveal) {
                      setIsMsImgReady(false);
                    }
                    setRevealedSolutions((prev) => ({
                      ...prev,
                      [currentQ.number]: willReveal
                    }));
                  }}
                  className="px-4 py-2 rounded-xl bg-[#0A1020] hover:bg-[#1A2540] border border-[#6382BF]/30 hover:border-[#4A7BF7] text-xs font-semibold text-[#4A7BF7] flex items-center gap-2 transition-all shadow-sm"
                >
                  {revealedSolutions[currentQ.number] || isReviewMode ? (
                    <>
                      <EyeOff size={14} />
                      <span>Hide Official Mark Scheme</span>
                    </>
                  ) : (
                    <>
                      <Eye size={14} />
                      <span>Reveal Mark Scheme ({currentQ.totalMarks} marks)</span>
                    </>
                  )}
                </button>
              </div>

              {/* Revealed Solution & Mark Scheme Card */}
              <AnimatePresence initial={false}>
                {(revealedSolutions[currentQ.number] || isReviewMode) && (
                  <motion.div
                    key={`ms-${currentQ.number}`}
                    initial={{ opacity: 0, height: 0, y: -6 }}
                    animate={{ opacity: 1, height: 'auto', y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -6 }}
                    transition={{ duration: 0.34, ease: EASE_SMOOTH }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 sm:p-5 rounded-2xl bg-[#0A1020]/90 border border-[#4A7BF7]/40 space-y-4 shadow-lg">
                  <div className="flex items-center justify-between border-b border-[#6382BF]/20 pb-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#E8ECF4]">
                      <CheckCircle2 size={15} className="text-emerald-400" />
                      <span>Mark Scheme</span>
                    </div>
                    {currentQ.markSchemeImageUrl && (
                      <button
                        type="button"
                        onClick={() => setLightboxDiagram({
                          url: currentQ.markSchemeImageUrl,
                          caption: `${currentQInfo.hasSections ? `${currentQInfo.section} · ` : ''}Question ${currentQInfo.displayNumber} · Mark Scheme`,
                        })}
                        className="text-[11px] text-[#4A7BF7] hover:underline flex items-center gap-1 font-semibold"
                      >
                        <Maximize2 size={12} />
                        <span>Zoom</span>
                      </button>
                    )}
                  </div>

                  {currentQ.markSchemeImageUrl ? (
                    <div
                      onClick={() => setLightboxDiagram({
                        url: currentQ.markSchemeImageUrl,
                        caption: `${currentQInfo.hasSections ? `${currentQInfo.section} · ` : ''}Question ${currentQInfo.displayNumber} · Official Mark Scheme Table`,
                      })}
                      className="border border-[#6382BF]/30 hover:border-emerald-500/60 rounded-xl bg-[#0A1020] p-3 sm:p-4 relative group cursor-zoom-in transition-all shadow-md overflow-hidden"
                    >
                      <div className="relative min-h-[200px] bg-white rounded-lg p-2.5 sm:p-4 mx-auto flex items-center justify-center shadow-sm overflow-hidden">
                        {!isMsImgLoaded && (
                          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#F8FAFC] rounded-lg gap-2.5 z-10 shadow-inner">
                            <div className="relative flex items-center justify-center">
                              <div className="w-9 h-9 rounded-full border-2 border-emerald-500/20 border-t-emerald-600 animate-spin" />
                              <CheckCircle2 size={15} className="text-emerald-600 absolute animate-pulse" />
                            </div>
                            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 shadow-sm">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                              <span className="text-xs font-bold text-emerald-700 tracking-tight">
                                Loading mark scheme...
                              </span>
                            </div>
                          </div>
                        )}
                        <img
                          key={resolvedMsImgUrl}
                          ref={msImgRef}
                          src={resolvedMsImgUrl}
                          alt={`Question ${currentQ.number} Mark Scheme`}
                          onLoad={() => setIsMsImgReady(true)}
                          onError={() => setIsMsImgReady(true)}
                          className={`w-full max-h-[620px] object-contain select-none mx-auto block transition-opacity duration-200 ${
                            isMsImgLoaded ? 'opacity-100' : 'opacity-0'
                          }`}
                        />
                      </div>
                      <div className="text-center text-xs text-[#7B8FAD] mt-2.5 font-medium flex items-center justify-center gap-1.5">
                        <Eye size={13} className="text-emerald-400" />
                        <span>
                          {currentQInfo.hasSections ? `${currentQInfo.sectionLetter} · ` : ''}Question {currentQInfo.displayNumber} Mark Scheme
                        </span>
                        <span className="text-emerald-400 group-hover:underline font-semibold ml-1">
                          · Click to Zoom
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="p-3.5 rounded-xl bg-[#1A2540] border border-[#6382BF]/20 text-xs sm:text-sm text-[#E8ECF4] leading-relaxed">
                      <FormattedMathText text={currentQ.fullMarkScheme} />
                    </div>
                  )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Marking / Scoring Section */}
            {isReviewMode ? (
              /* Review Mode: Read-Only Result Display (No Self-Awarding) */
              <div className="pt-4 border-t border-[#6382BF]/25 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-[#7B8FAD]">
                    {currentQInfo.hasSections ? `${currentQInfo.sectionLetter} · ` : ''}Question {currentQInfo.displayNumber} Score:
                  </span>
                  <span
                    className={`px-3 py-1 rounded-lg text-xs font-bold tabular-nums border ${
                      scores[currentQ.number] === currentQ.totalMarks
                        ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                        : currentQ.totalMarks > 0 && (scores[currentQ.number] || 0) / currentQ.totalMarks >= 0.5
                        ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                        : 'bg-rose-500/15 text-rose-400 border-rose-500/30'
                    }`}
                  >
                    {scores[currentQ.number] !== undefined ? `${scores[currentQ.number]} / ${currentQ.totalMarks} marks` : `0 / ${currentQ.totalMarks} marks`}
                  </span>
                </div>

                <div className="text-xs text-[#7B8FAD] flex items-center gap-1.5 font-medium">
                  <CheckCircle2 size={14} className="text-emerald-400" />
                  <span>Reviewing with Pearson Mark Scheme</span>
                </div>
              </div>
            ) : (
              /* Practice Mode: Subpart Marking Controls */
              <>
                <div className="space-y-3 pt-2">
                  <div className="text-xs font-semibold text-[#7B8FAD] uppercase tracking-wider">
                    Self-Award Marks
                  </div>

                  <div className="grid gap-2.5">
                    {currentQ.parts.map((p, pIdx) => {
                      const partKey = `${currentQ.number}_${pIdx}`;
                      const awarded = subpartScores[partKey];
                      const hasSubparts = currentQ.parts.length > 1;
                      const label = hasSubparts
                        ? renderPartLabel(p.partLabel, pIdx)
                        : `${currentQInfo.hasSections ? `${currentQInfo.sectionLetter} · ` : ''}Question ${currentQInfo.displayNumber} Score`;

                      return (
                        <div
                          key={pIdx}
                          className="p-3.5 rounded-xl bg-[#0A1020]/60 border border-[#6382BF]/25 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm"
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-[#E8ECF4] text-xs sm:text-sm [font-variant-ligatures:none]">
                              {label}
                            </span>
                            <span className="text-[11px] text-[#7B8FAD]">
                              [{p.marks} {p.marks === 1 ? 'mark' : 'marks'}]
                            </span>
                            {awarded !== undefined && (
                              <span className="ml-2 px-2 py-0.5 rounded text-[11px] bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 font-semibold tabular-nums">
                                Awarded: {awarded} / {p.marks}
                              </span>
                            )}
                          </div>

                          {/* Marks selector pills */}
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {Array.from({ length: p.marks + 1 }).map((_, mVal) => (
                              <button
                                key={mVal}
                                type="button"
                                onClick={() => handleSubpartScoreChange(currentQ.number, pIdx, p.marks, mVal)}
                                className={`w-7 h-7 rounded-lg text-xs font-semibold transition-all ${
                                  awarded === mVal
                                    ? 'bg-[#4A7BF7] text-white shadow-md shadow-[#4A7BF7]/25'
                                    : 'bg-[#1A2540] text-[#7B8FAD] hover:text-[#E8ECF4] hover:bg-[#6382BF]/20 border border-[#6382BF]/30'
                                }`}
                              >
                                {mVal}
                              </button>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Question Mark Summary */}
                <div className="pt-4 border-t border-[#6382BF]/25 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-semibold text-[#7B8FAD] block">
                      {currentQInfo.hasSections ? `${currentQInfo.sectionLetter} · ` : ''}Question {currentQInfo.displayNumber} Score
                    </span>
                    <div className="text-lg font-bold text-[#E8ECF4] tabular-nums mt-0.5">
                      {scores[currentQ.number] !== undefined ? scores[currentQ.number] : 0}{' '}
                      <span className="text-xs text-[#7B8FAD] font-normal">/ {currentQ.totalMarks} marks</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Bottom Pagination Controls */}
          <div className="flex items-center justify-between gap-4 pt-2">
            <button
              onClick={() => handleNavigateQuestion(currentIndex - 1)}
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
              {currentQInfo.hasSections ? `${currentQInfo.sectionShort} · ` : ''}Question {currentQInfo.displayNumber} of {currentQInfo.hasSections ? (currentQInfo.sectionShort === 'Stats' ? (paper.questions.length >= 11 ? 6 : 5) : (paper.questions.length - (paper.questions.length >= 11 ? 6 : 5))) : paper.questions.length} (Q{currentIndex + 1} of {paper.questions.length} overall)
            </span>

            {currentIndex < paper.questions.length - 1 ? (
              <button
                onClick={() => handleNavigateQuestion(currentIndex + 1)}
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
        </motion.div>
      </AnimatePresence>
      </div>

      {/* ---------------------------------------------------------------------- */}
      {/* High-Resolution Diagram Lightbox Modal (Click-to-Zoom / Inspect)       */}
      {/* ---------------------------------------------------------------------- */}
      <AnimatePresence>
        {lightboxDiagram && (
          <motion.div
            key="exam-lightbox"
            initial={{ opacity: 0, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.985 }}
            transition={{ duration: 0.24, ease: EASE_SMOOTH }}
            className="fixed inset-0 z-50 bg-[#070B14] flex flex-col p-3 sm:p-4"
          >
          {/* Lightbox Toolbar */}
          <div className="h-12 bg-[#1A2540] border border-[#6382BF]/30 rounded-xl px-4 flex items-center justify-between shrink-0 shadow-lg mb-3">
            <div className="flex items-center gap-2 min-w-0">
              <Eye size={15} className="text-[#4A7BF7] shrink-0" />
              <span className="text-xs font-semibold text-[#E8ECF4] truncate max-w-xs sm:max-w-md">
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
          <div className="flex-1 overflow-y-auto overscroll-contain flex flex-col items-center p-2 sm:p-6 border border-[#6382BF]/20 rounded-2xl bg-[#0A1020]">
            <div
              style={{
                transform: `scale(${lightboxZoom})`,
                transformOrigin: 'top center',
                willChange: 'transform',
              }}
              className="max-w-4xl w-full flex flex-col items-center py-2"
            >
              {lightboxDiagram.svg ? (
                <div
                  className="w-full h-auto select-none"
                  dangerouslySetInnerHTML={{ __html: lightboxDiagram.svg }}
                />
              ) : (
                <div className="bg-white rounded-xl p-2 sm:p-4 shadow-2xl max-w-full">
                  <img
                    src={assetUrl(lightboxDiagram.url)}
                    alt={lightboxDiagram.caption || 'Diagram'}
                    className="max-w-full h-auto object-contain select-none mx-auto block"
                    style={{ transform: 'translateZ(0)' }}
                  />
                </div>
              )}
            </div>
          </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---------------------------------------------------------------------- */}
      {/* Formula Booklet Slide-over Drawer                                     */}
      {/* ---------------------------------------------------------------------- */}
      <AnimatePresence>
        {showFormulaDrawer && (
          <>
            {/* Subtle click-outside backdrop on smaller screens */}
            <motion.div
              key="formula-drawer-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.24, ease: EASE_SMOOTH }}
              className="fixed inset-0 z-40 bg-black/45 backdrop-blur-[2px]"
              onClick={() => setShowFormulaDrawer(false)}
            />
            <motion.div
              key="formula-drawer-panel"
              initial={{ x: '100%', opacity: 0.6 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0.6 }}
              transition={{ duration: 0.28, ease: EASE_SMOOTH }}
              className="fixed inset-y-0 right-0 z-50 w-full sm:w-[580px] md:w-[680px] lg:w-[760px] bg-[#1A2540] border-l border-[#6382BF]/30 shadow-2xl flex flex-col"
            >
              <FormulaBookletModal
                mode="drawer"
                onClose={() => setShowFormulaDrawer(false)}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ---------------------------------------------------------------------- */}
      {/* Scanned Official Question Paper Slide-over Drawer                     */}
      {/* ---------------------------------------------------------------------- */}
      <AnimatePresence>
        {showPdfDrawer && paper.qpUrl && (
          <>
            <motion.div
              key="pdf-drawer-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.24, ease: EASE_SMOOTH }}
              className="fixed inset-0 z-40 bg-black/45 backdrop-blur-[2px]"
              onClick={() => setShowPdfDrawer(false)}
            />
            <motion.div
              key="pdf-drawer-panel"
              initial={{ x: '-100%', opacity: 0.6 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '-100%', opacity: 0.6 }}
              transition={{ duration: 0.28, ease: EASE_SMOOTH }}
              className="fixed inset-y-0 left-0 z-50 w-full sm:w-[640px] md:w-[720px] bg-[#1A2540] border-r border-[#6382BF]/30 shadow-2xl flex flex-col"
            >
          <div className="h-12 bg-[#0A1020] px-4 border-b border-[#6382BF]/30 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <FileText size={15} className="text-[#4A7BF7]" />
              <span className="text-xs font-bold text-[#E8ECF4]">
                Official Question Paper · {paper.title}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={assetUrl(paper.qpUrl)}
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
          <div className="relative flex-1 w-full overflow-hidden bg-[#0F1729]">
            {pdfDrawerLoading && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#0F1729]">
                <SectionLoader label="Loading Question Paper PDF..." className="min-h-[200px]" />
              </div>
            )}
            <iframe
              src={`${assetUrl(paper.qpUrl)}#toolbar=0&navpanes=0&view=FitH`}
              onLoad={() => setPdfDrawerLoading(false)}
              onError={() => setPdfDrawerLoading(false)}
              className="w-full h-full border-0"
              title={`${paper.title} PDF reference`}
            />
          </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ---------------------------------------------------------------------- */}
      {/* Finish Confirmation Dialog                                             */}
      {/* ---------------------------------------------------------------------- */}
      <AnimatePresence>
        {showFinishConfirm && (
          <motion.div
            key="finish-confirm-backdrop"
            variants={overlayFadeVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A1020]/90 backdrop-blur-sm"
          >
            <motion.div
              variants={modalPanelVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="bg-[#1A2540] border border-[#6382BF]/40 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl"
            >
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

            <div className="p-3.5 rounded-xl bg-[#0A1020] border border-[#6382BF]/25 text-xs text-[#7B8FAD] space-y-1.5">
              <div className="flex justify-between items-center">
                <span>Graded Questions:</span>
                <span className="text-[#E8ECF4] font-bold tabular-nums">
                  {Object.keys(scores).length} of {paper.questions.length} questions
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Current Total Score:</span>
                <span className="text-[#E8ECF4] font-bold tabular-nums">
                  {totalAchievedScore} / {paperMaxMarks} marks
                </span>
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
                onClick={handleFinishExamWithTransition}
                className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold transition-colors shadow-md shadow-red-950/30"
              >
                Submit Exam
              </button>
            </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---------------------------------------------------------------------- */}
      {/* Smooth Screen Transition Mask                                          */}
      {/* ---------------------------------------------------------------------- */}
      {isScreenTransitioning && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0A1020]/95 backdrop-blur-md transition-opacity duration-200 animate-fadeIn">
          <div className="p-6 rounded-2xl bg-[#1A2540] border border-[#6382BF]/40 shadow-2xl flex flex-col items-center gap-3 animate-modalFadeIn">
            <div className="w-9 h-9 rounded-full border-2 border-[#4A7BF7] border-t-transparent animate-spin" />
            <span className="text-sm font-semibold text-[#E8ECF4] tracking-wide">{transitionMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
};
