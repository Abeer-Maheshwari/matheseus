import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Columns, 
  FileText, 
  ArrowLeftRight, 
  ExternalLink, 
  X, 
  BookOpen, 
  Clock, 
  Sigma, 
  Award, 
  CheckCircle2, 
  Check 
} from 'lucide-react';
import { FlipClock } from './FlipClock';
import { FormulaBookletModal } from './FormulaBookletModal';
import { playExamChime } from '../utils/audio';
import { assetUrl } from '../utils/assets';
import { saveExamAttempt } from '../utils/attempts';
import { PILL_SPRING, EASE_SMOOTH } from '../utils/motion';

interface SplitPdfModalProps {
  title: string;
  qpUrl: string;
  msUrl?: string;
  initialMode?: 'split' | 'single' | 'qp' | 'ms';
  onClose: () => void;
  // Optional Exam Practice Mode features
  isPractice?: boolean;
  paperId?: string;
  durationMinutes?: number;
  totalMarks?: number;
  onSaveScore?: (paperId: string, score: number, maxScore: number) => void;
}

export const SplitPdfModal: React.FC<SplitPdfModalProps> = ({
  title,
  qpUrl,
  msUrl,
  initialMode = 'split',
  onClose,
  isPractice = false,
  paperId,
  durationMinutes = 90,
  totalMarks = 75,
  onSaveScore,
}) => {
  // If in practice mode, start in QP view so student focuses on question paper without seeing MS
  const resolvedQpUrl = assetUrl(qpUrl);
  const resolvedMsUrl = msUrl ? assetUrl(msUrl) : undefined;
  const [mode, setMode] = useState<'split' | 'qp' | 'ms'>(
    !msUrl ? 'qp' : isPractice ? 'qp' : initialMode === 'split' ? 'split' : 'qp'
  );
  const [swapped, setSwapped] = useState(false);

  // Practice Timer state
  const totalSeconds = durationMinutes * 60;
  const [secondsRemaining, setSecondsRemaining] = useState(totalSeconds);
  const [isTimerPaused, setIsTimerPaused] = useState(false);
  const [isTimerFinished, setIsTimerFinished] = useState(false);

  // Practice Self-Marking Drawer / Score Input
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [enteredScore, setEnteredScore] = useState<string>('');
  const [isSaved, setIsSaved] = useState(false);

  // Formula Booklet Side Drawer
  const [showFormulaDrawer, setShowFormulaDrawer] = useState(false);

  // Timer loop for Practice Mode
  useEffect(() => {
    if (!isPractice || isTimerPaused || isTimerFinished || secondsRemaining <= 0) return;

    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsTimerFinished(true);
          playExamChime();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPractice, isTimerPaused, isTimerFinished, secondsRemaining]);

  // Calculate predicted grade
  const scoreNum = Math.min(Math.max(parseFloat(enteredScore) || 0, 0), totalMarks);
  const percentage = Math.round((scoreNum / totalMarks) * 100);

  const calculateGrade = (pct: number) => {
    if (pct >= 82) return 'A*';
    if (pct >= 68) return 'A';
    if (pct >= 55) return 'B';
    if (pct >= 44) return 'C';
    if (pct >= 34) return 'D';
    if (pct >= 24) return 'E';
    return 'U';
  };

  const predictedGrade = calculateGrade(percentage);

  const handleSaveResult = () => {
    if (!paperId) return;
    saveExamAttempt({
      id: `attempt_${Date.now()}`,
      paperId,
      paperTitle: title,
      completedAt: new Date().toISOString(),
      achievedScore: scoreNum,
      maxScore: totalMarks,
      percentage,
      predictedGrade,
    });

    if (onSaveScore) {
      onSaveScore(paperId, scoreNum, totalMarks);
    }
    setIsSaved(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#0F1729] text-[#E8ECF4]">
      {/* Top Header */}
      <div className="h-14 px-4 bg-[#1A2540] border-b border-[#6382BF]/25 flex items-center justify-between gap-3 shrink-0 shadow-md">
        {/* Paper Title & Badges */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-7 h-7 rounded-lg bg-[#0A1020] border border-[#6382BF]/40 flex items-center justify-center text-[#4A7BF7] shrink-0">
            {isPractice ? <Clock size={15} /> : <Columns size={15} />}
          </div>
          <div className="min-w-0">
            <div className="font-bold text-sm text-[#E8ECF4] truncate">
              {title}
            </div>
            {isPractice && (
              <div className="text-[11px] text-[#7B8FAD] flex items-center gap-2">
                <span className="text-[#4A7BF7] font-medium">Practice Mode</span>
                <span>·</span>
                <span>{durationMinutes} mins</span>
                <span>·</span>
                <span>{totalMarks} marks</span>
              </div>
            )}
          </div>
        </div>

        {/* Center: FlipClock Practice Countdown (if in Practice Mode) */}
        {isPractice && (
          <div className="hidden sm:flex items-center gap-2 bg-[#0A1020] px-3 py-1 rounded-lg border border-[#6382BF]/30 shadow-inner">
            <FlipClock
              secondsRemaining={secondsRemaining}
              isPaused={isTimerPaused}
              onTogglePause={() => setIsTimerPaused(!isTimerPaused)}
            />
          </div>
        )}

        {/* Header Right Actions */}
        <div className="flex items-center gap-2 text-xs">
          {/* Formula Booklet Drawer Toggle */}
          <button
            onClick={() => setShowFormulaDrawer(!showFormulaDrawer)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border transition-colors ${
              showFormulaDrawer
                ? 'bg-[#4A7BF7] text-white border-[#4A7BF7]'
                : 'bg-[#0A1020] hover:bg-[#4A7BF7]/20 text-[#E8ECF4] border-[#6382BF]/30'
            }`}
            title="Toggle Formula Booklet reference"
          >
            <Sigma size={13} className={showFormulaDrawer ? 'text-white' : 'text-[#4A7BF7]'} />
            <span className="hidden md:inline">Formulae</span>
          </button>

          {/* Self-Marking & Grade Score Button (in Practice Mode) */}
          {isPractice && (
            <button
              onClick={() => {
                setShowScoreModal(!showScoreModal);
                // When marking, open split view so they can review QP & MS side by side
                if (!showScoreModal && msUrl && mode === 'qp') {
                  setMode('split');
                }
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border font-medium transition-colors ${
                showScoreModal || isSaved
                  ? 'bg-emerald-600 text-white border-emerald-500'
                  : 'bg-[#0A1020] hover:bg-[#4A7BF7]/20 text-[#E8ECF4] border-[#6382BF]/30'
              }`}
              title="Record your score & predict grade"
            >
              {isSaved ? <CheckCircle2 size={13} /> : <Award size={13} />}
              <span className="hidden md:inline">{isSaved ? 'Marked' : 'Mark Paper'}</span>
            </button>
          )}

          {/* View Switcher Tabs (Split / QP / MS) */}
          {msUrl && (
            <div className="flex items-center bg-[#0A1020] p-1 rounded-lg border border-[#6382BF]/30 text-xs">
              <button
                onClick={() => setMode('split')}
                className={`relative flex items-center gap-1 px-2.5 py-1 rounded-md font-medium transition-colors ${
                  mode === 'split'
                    ? 'text-white'
                    : 'text-[#7B8FAD] hover:text-[#E8ECF4]'
                }`}
                title="Split View side-by-side"
              >
                {mode === 'split' && (
                  <motion.div
                    layoutId="splitpdf-mode-pill"
                    className="absolute inset-0 bg-[#4A7BF7] rounded-md shadow-sm"
                    transition={PILL_SPRING}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1">
                  <Columns size={13} />
                  <span className="hidden lg:inline">Split</span>
                </span>
              </button>
              <button
                onClick={() => setMode('qp')}
                className={`relative flex items-center gap-1 px-2.5 py-1 rounded-md font-medium transition-colors ${
                  mode === 'qp'
                    ? 'text-white'
                    : 'text-[#7B8FAD] hover:text-[#E8ECF4]'
                }`}
                title="Question Paper only"
              >
                {mode === 'qp' && (
                  <motion.div
                    layoutId="splitpdf-mode-pill"
                    className="absolute inset-0 bg-[#4A7BF7] rounded-md shadow-sm"
                    transition={PILL_SPRING}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1">
                  <FileText size={13} />
                  <span className="hidden lg:inline">Paper</span>
                </span>
              </button>
              <button
                onClick={() => setMode('ms')}
                className={`relative flex items-center gap-1 px-2.5 py-1 rounded-md font-medium transition-colors ${
                  mode === 'ms'
                    ? 'text-white'
                    : 'text-[#7B8FAD] hover:text-[#E8ECF4]'
                }`}
                title="Mark Scheme only"
              >
                {mode === 'ms' && (
                  <motion.div
                    layoutId="splitpdf-mode-pill"
                    className="absolute inset-0 bg-[#4A7BF7] rounded-md shadow-sm"
                    transition={PILL_SPRING}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1">
                  <BookOpen size={13} />
                  <span className="hidden lg:inline">Marks</span>
                </span>
              </button>
            </div>
          )}

          {/* Swap Sides (in Split View) */}
          {mode === 'split' && msUrl && (
            <button
              onClick={() => setSwapped(!swapped)}
              className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-[#0A1020] hover:bg-[#4A7BF7] hover:text-white text-[#E8ECF4] border border-[#6382BF]/40 transition-colors"
              title="Swap left and right panels without reloading"
            >
              <ArrowLeftRight size={13} />
            </button>
          )}

          {/* Close Modal */}
          <button
            onClick={onClose}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#0A1020] hover:bg-rose-600 hover:text-white text-[#E8ECF4] border border-[#6382BF]/40 transition-colors"
          >
            <X size={14} />
            <span className="hidden sm:inline">Close</span>
          </button>
        </div>
      </div>

      {/* Main Viewports + Optional Formula Drawer */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* PDF Viewports Container */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
          {/* Question Paper Container (Persistently mounted, never reloaded) */}
          <div
            className={`flex flex-col overflow-hidden transition-none ${
              mode === 'ms'
                ? 'absolute -left-[99999px] -top-[99999px] w-1 h-1 overflow-hidden opacity-0 pointer-events-none'
                : mode === 'split' && msUrl
                ? `flex-1 h-1/2 md:h-full relative ${
                    swapped ? 'order-2' : 'order-1'
                  } ${
                    !swapped ? 'border-b md:border-b-0 md:border-r border-[#6382BF]/25' : ''
                  }`
                : 'flex-1 w-full h-full relative order-1'
            }`}
          >
            <div className="h-8 px-3.5 bg-[#1A2540] border-b border-[#6382BF]/25 flex items-center justify-between text-xs font-semibold text-[#E8ECF4] shrink-0">
              <span className="flex items-center gap-1.5 text-[#E8ECF4]">
                <FileText size={13} className="text-[#4A7BF7]" />
                Question Paper
              </span>
              <a
                href={resolvedQpUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[#7B8FAD] hover:text-[#E8ECF4] text-[11px] transition-colors"
              >
                <span>Open in Tab</span>
                <ExternalLink size={11} />
              </a>
            </div>
            <iframe
              src={resolvedQpUrl}
              className="w-full flex-1 bg-[#0F1729] border-none"
              title={`${title} - Question Paper`}
            />
          </div>

          {/* Mark Scheme Container (Persistently mounted, never reloaded) */}
          {resolvedMsUrl && (
            <div
              className={`flex flex-col overflow-hidden transition-none ${
                mode === 'qp'
                  ? 'absolute -left-[99999px] -top-[99999px] w-1 h-1 overflow-hidden opacity-0 pointer-events-none'
                : mode === 'split'
                ? `flex-1 h-1/2 md:h-full relative ${
                    swapped ? 'order-1' : 'order-2'
                  } ${
                    swapped ? 'border-b md:border-b-0 md:border-r border-[#6382BF]/25' : ''
                  }`
                : 'flex-1 w-full h-full relative order-1'
              }`}
            >
              <div className="h-8 px-3.5 bg-[#1A2540] border-b border-[#6382BF]/25 flex items-center justify-between text-xs font-semibold text-[#E8ECF4] shrink-0">
                <span className="flex items-center gap-1.5 text-[#E8ECF4]">
                  <BookOpen size={13} className="text-[#4A7BF7]" />
                  Mark Scheme
                </span>
                <a
                  href={resolvedMsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[#7B8FAD] hover:text-[#E8ECF4] text-[11px] transition-colors"
                >
                  <span>Open in Tab</span>
                  <ExternalLink size={11} />
                </a>
              </div>
              <iframe
                src={resolvedMsUrl}
                className="w-full flex-1 bg-[#0F1729] border-none"
                title={`${title} - Mark Scheme`}
              />
            </div>
          )}
        </div>

        {/* Docked Formula Booklet Drawer */}
        <AnimatePresence>
          {showFormulaDrawer && (
            <motion.div
              key="split-formula-drawer"
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 40, opacity: 0 }}
              transition={{ duration: 0.28, ease: EASE_SMOOTH }}
              className="w-full md:w-[580px] lg:w-[680px] border-l border-[#6382BF]/30 bg-[#1A2540] flex flex-col h-full shadow-2xl shrink-0 z-30"
            >
              <FormulaBookletModal mode="drawer" onClose={() => setShowFormulaDrawer(false)} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Docked Self-Marking Bar (Bottom) */}
      {isPractice && showScoreModal && (
        <div className="px-4 py-3 bg-[#1A2540] border-t border-[#6382BF]/30 flex flex-wrap items-center justify-between gap-4 z-40 shadow-2xl">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-[#E8ECF4]">Self-Marking:</span>
            <div className="flex items-center gap-1.5">
              <input
                type="number"
                min="0"
                max={totalMarks}
                value={enteredScore}
                onChange={(e) => {
                  setEnteredScore(e.target.value);
                  setIsSaved(false);
                }}
                placeholder="0"
                className="w-16 px-2.5 py-1 bg-[#0A1020] border border-[#6382BF]/40 rounded-lg text-sm text-[#E8ECF4] text-center font-bold focus:outline-none focus:border-[#4A7BF7]"
              />
              <span className="text-xs text-[#7B8FAD] font-medium">/ {totalMarks} marks</span>
            </div>

            {enteredScore !== '' && (
              <div className="flex items-center gap-2 text-xs">
                <span className="px-2.5 py-0.5 rounded bg-[#0A1020] text-[#E8ECF4] border border-[#6382BF]/30 font-semibold tabular-nums">
                  {percentage}%
                </span>
                {isSaved && (
                  <span className="px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold">
                    Grade {predictedGrade}
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            {mode !== 'split' && msUrl && (
              <button
                onClick={() => setMode('split')}
                className="px-3 py-1.5 rounded-lg bg-[#0A1020] hover:bg-[#4A7BF7]/20 text-[#E8ECF4] border border-[#6382BF]/30 text-xs transition-colors flex items-center gap-1.5"
              >
                <Columns size={13} className="text-[#4A7BF7]" />
                <span>Open Mark Scheme Side-by-Side</span>
              </button>
            )}

            <button
              onClick={handleSaveResult}
              disabled={enteredScore === '' || isSaved}
              className={`px-4 py-1.5 rounded-lg font-semibold text-xs transition-colors flex items-center gap-1.5 ${
                isSaved
                  ? 'bg-emerald-600 text-white cursor-default'
                  : enteredScore === ''
                  ? 'bg-[#0A1020] text-[#7B8FAD] border border-[#6382BF]/20 cursor-not-allowed'
                  : 'bg-[#4A7BF7] hover:bg-[#3D6CE0] text-white shadow-sm'
              }`}
            >
              {isSaved ? <Check size={14} /> : <CheckCircle2 size={14} />}
              <span>{isSaved ? 'Score Saved' : 'Save Result & Complete'}</span>
            </button>

            <button
              onClick={() => setShowScoreModal(false)}
              className="p-1.5 rounded-lg hover:bg-[#0A1020] text-[#7B8FAD] hover:text-[#E8ECF4] transition-colors"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
