import React, { useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExamAttempt } from '../types';
import { InteractivePaper, getInteractivePaper } from '../data/interactiveQuestions';
import { getQuestionDisplayInfo } from './InteractiveExamRunner';
import { FormattedMathText } from './MathRenderer';
import { assetUrl } from '../utils/assets';
import { EASE_SMOOTH, overlayFadeVariants } from '../utils/motion';
import {
  Award,
  X,
  Calendar,
  RotateCcw,
  Trash2,
  FileText,
  ArrowLeft,
  CheckCircle2,
  ChevronDown,
  Maximize2,
  ZoomIn,
  ZoomOut,
  ChevronsUpDown,
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
  onDelete,
  erUrl,
  onOpenSingleDoc,
}) => {
  const paperData = useMemo(() => {
    if (paper) return paper;
    return getInteractivePaper(attempt.paperId, attempt.paperTitle, attempt.paperCode);
  }, [paper, attempt]);

  const [expandedQuestions, setExpandedQuestions] = useState<Record<number, boolean>>({});
  const [lightboxDiagram, setLightboxDiagram] = useState<{
    url?: string;
    svg?: string;
    caption?: string;
  } | null>(null);
  const [lightboxZoom, setLightboxZoom] = useState(1);

  useEffect(() => {
    if (lightboxDiagram) setLightboxZoom(1);
  }, [lightboxDiagram]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && lightboxDiagram) {
        setLightboxDiagram(null);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxDiagram]);

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

  const questionsList = useMemo(() => {
    const scores = attempt.questionScores || {};
    return paperData.questions.map((q) => {
      const score = scores[q.number];
      const isScored = score !== undefined;
      const isFull = isScored && q.totalMarks > 0 && score === q.totalMarks;
      const isMedium = isScored && !isFull && q.totalMarks > 0 && score / q.totalMarks >= 0.5;
      const isLow = isScored && !isFull && !isMedium;

      return {
        ...q,
        achievedScore: score,
        isScored,
        isFull,
        isMedium,
        isLow,
      };
    });
  }, [paperData, attempt.questionScores]);

  const scoredCount = questionsList.filter((q) => q.isScored).length;
  const allExpanded =
    questionsList.length > 0 && questionsList.every((q) => !!expandedQuestions[q.number]);

  const toggleQuestion = (qNum: number) => {
    setExpandedQuestions((prev) => ({ ...prev, [qNum]: !prev[qNum] }));
  };

  const toggleAllQuestions = () => {
    if (allExpanded) {
      setExpandedQuestions({});
    } else {
      const next: Record<number, boolean> = {};
      questionsList.forEach((q) => {
        next[q.number] = true;
      });
      setExpandedQuestions(next);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#0F1729] text-[#E8ECF4] overflow-hidden">
      {/* Top Navigation Bar */}
      <header className="h-14 bg-[#1A2540] border-b border-[#6382BF]/30 px-4 sm:px-6 flex items-center justify-between shrink-0 z-30">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0A1020] hover:bg-[#1A2540] text-[#7B8FAD] hover:text-[#E8ECF4] border border-[#6382BF]/30 text-xs font-semibold transition-colors"
            title="Back to Papers"
          >
            <ArrowLeft size={14} />
            <span className="hidden sm:inline">Back to Papers</span>
          </button>

          <img src="/logo.png" alt="matheseus" className="w-7 h-7 rounded-lg object-cover ring-1 ring-white/10 hidden sm:inline" />

          <span className="text-xs px-2.5 py-1 rounded bg-[#0A1020] border border-[#6382BF]/40 text-[#4A7BF7] font-semibold tracking-wide font-sans shrink-0">
            {attempt.paperCode || paperData.paperCode || 'Paper'}
          </span>

          <span className="font-bold text-sm text-[#E8ECF4] truncate hidden md:inline max-w-sm">
            {attempt.paperTitle || paperData.title}
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          {erUrl && onOpenSingleDoc && (
            <button
              onClick={() => onOpenSingleDoc(`${attempt.paperTitle || paperData.title} — Examiner Report`, erUrl)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0A1020] hover:bg-[#1A2540] text-[#7B8FAD] hover:text-[#E8ECF4] border border-[#6382BF]/30 text-xs font-semibold transition-colors"
              title="Examiner Report PDF"
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
            title="Close"
          >
            <X size={18} />
          </button>
        </div>
      </header>

      {/* Main Scrollable Report Content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 space-y-6">
        <div className="max-w-5xl mx-auto space-y-6 pb-12">
          {/* Hero Performance Header Card */}
          <div className="border border-[#6382BF]/30 rounded-2xl bg-[#1A2540] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#4A7BF7]/10 blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#6382BF]/25 gap-3">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4A7BF7]/15 border border-[#4A7BF7]/30 text-[#4A7BF7] text-xs font-semibold">
                    <Award size={14} />
                    <span>Score Report</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#E8ECF4] pt-1">
                    {attempt.paperTitle || paperData.title}
                  </h2>
                  <p className="text-xs text-[#7B8FAD] flex items-center gap-2 flex-wrap">
                    <span>{formattedDate}</span>
                    <span>·</span>
                    <span>{attempt.timingMode === 'timed' ? 'Timed' : 'Untimed'}</span>
                    {formattedTimeSpent && (
                      <>
                        <span>·</span>
                        <span>{formattedTimeSpent}</span>
                      </>
                    )}
                  </p>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  {onRetake && (
                    <button
                      onClick={onRetake}
                      className="px-3.5 py-2 rounded-xl bg-[#0A1020] hover:bg-[#1A2540] text-[#E8ECF4] border border-[#6382BF]/30 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
                    >
                      <RotateCcw size={13} />
                      <span>Retake Paper</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Three Main Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div className="p-4 sm:p-5 rounded-xl bg-[#0A1020] border border-[#6382BF]/30 shadow-inner space-y-1 transition-all hover:border-[#6382BF]/60">
                  <span className="text-[11px] font-semibold text-[#7B8FAD] uppercase tracking-wider block">
                    Total Score
                  </span>
                  <div className="text-3xl sm:text-4xl font-bold text-[#E8ECF4] tabular-nums">
                    {attempt.achievedScore}
                    <span className="text-sm font-normal text-[#7B8FAD]"> / {attempt.maxScore}</span>
                  </div>
                  <p className="text-[11px] text-[#7B8FAD] pt-1">
                    {scoredCount} of {questionsList.length} marked
                  </p>
                </div>

                <div className="p-4 sm:p-5 rounded-xl bg-[#0A1020] border border-[#6382BF]/30 shadow-inner space-y-1 transition-all hover:border-[#6382BF]/60">
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

                <div className="p-4 sm:p-5 rounded-xl bg-[#0A1020] border border-[#6382BF]/30 shadow-inner space-y-1 transition-all hover:border-[#6382BF]/60">
                  <span className="text-[11px] font-semibold text-[#7B8FAD] uppercase tracking-wider block">
                    Grade
                  </span>
                  <div className="text-3xl sm:text-4xl font-bold text-emerald-400">
                    {attempt.predictedGrade || '—'}
                  </div>
                  <p className="text-[11px] text-emerald-400/80 font-medium pt-1">
                    Edexcel Boundary
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Question Breakdown Card with Inline Question + MS Dropdowns */}
          <div className="border border-[#6382BF]/30 rounded-2xl bg-[#1A2540] p-6 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#6382BF]/20 gap-3">
              <div>
                <h3 className="text-base font-bold text-[#E8ECF4]">Questions & Mark Schemes</h3>
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-2 text-xs text-[#7B8FAD]">
                  <span className="inline-flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /> 100%
                  </span>
                  <span className="inline-flex items-center gap-1 ml-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> 50–99%
                  </span>
                  <span className="inline-flex items-center gap-1 ml-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-400" /> &lt;50%
                  </span>
                </div>

                <button
                  type="button"
                  onClick={toggleAllQuestions}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0A1020] hover:bg-[#1A2540] text-[#7B8FAD] hover:text-[#E8ECF4] border border-[#6382BF]/30 text-xs font-semibold transition-colors"
                >
                  <ChevronsUpDown size={13} className="text-[#4A7BF7]" />
                  <span>{allExpanded ? 'Collapse All' : 'Expand All'}</span>
                </button>
              </div>
            </div>

            {/* Accordion List */}
            <div className="border border-[#6382BF]/25 rounded-xl overflow-hidden bg-[#0A1020]">
              <div className="divide-y divide-[#6382BF]/15">
                {questionsList.map((q, idx) => {
                  const qInfo = getQuestionDisplayInfo(paperData, q, idx);
                  const prevQInfo =
                    idx > 0 ? getQuestionDisplayInfo(paperData, questionsList[idx - 1], idx - 1) : null;
                  const isNewSection = qInfo.hasSections && (idx === 0 || qInfo.section !== prevQInfo?.section);
                  const isOpen = !!expandedQuestions[q.number];

                  return (
                    <React.Fragment key={q.number}>
                      {isNewSection && (
                        <div className="px-4 py-2 bg-[#1A2540]/80 border-b border-[#6382BF]/20 flex items-center justify-between text-xs font-bold text-[#E8ECF4]">
                          <span className="flex items-center gap-2">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${
                                qInfo.sectionShort === 'Stats'
                                  ? 'bg-[#4A7BF7]/15 text-[#4A7BF7] border border-[#4A7BF7]/30'
                                  : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                              }`}
                            >
                              {qInfo.sectionLetter}
                            </span>
                            <span>{qInfo.section}</span>
                          </span>
                        </div>
                      )}

                      <div>
                        <button
                          type="button"
                          onClick={() => toggleQuestion(q.number)}
                          className={`w-full px-4 py-3 flex items-center justify-between text-left text-xs transition-colors gap-3 ${
                            isOpen ? 'bg-[#1A2540]/80' : 'hover:bg-[#1A2540]/50'
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <span className="font-bold text-[#E8ECF4] min-w-14 shrink-0">
                              {qInfo.hasSections ? `${qInfo.sectionShort} Q${qInfo.displayNumber}` : `Q${q.number}`}
                            </span>
                            <span className="text-[#7B8FAD] text-xs truncate max-w-[200px] sm:max-w-xs md:max-w-md">
                              {q.topic || `Question ${qInfo.displayNumber}`}
                            </span>
                          </div>

                          <div className="flex items-center gap-3 shrink-0">
                            <span
                              className={`font-semibold tabular-nums px-2.5 py-1 rounded-md text-xs border ${
                                !q.isScored
                                  ? 'bg-[#0A1020] text-[#7B8FAD] border-[#6382BF]/20'
                                  : q.isFull
                                  ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30 font-bold'
                                  : q.isMedium
                                  ? 'bg-amber-500/15 text-amber-300 border-amber-500/30 font-bold'
                                  : 'bg-rose-500/15 text-rose-400 border-rose-500/30 font-bold'
                              }`}
                            >
                              {q.isScored ? `${q.achievedScore} / ${q.totalMarks}` : `— / ${q.totalMarks}`}
                            </span>

                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#1A2540] text-[#7B8FAD] border border-[#6382BF]/30 text-[11px] font-semibold">
                              <span className="hidden sm:inline">{isOpen ? 'Hide' : 'Question & MS'}</span>
                              <ChevronDown
                                size={13}
                                className={`transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#4A7BF7]' : ''}`}
                              />
                            </span>
                          </div>
                        </button>

                        {/* Smooth Inline Question + Mark Scheme Dropdown */}
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              key={`review-dd-${q.number}`}
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3, ease: EASE_SMOOTH }}
                              className="overflow-hidden border-t border-[#6382BF]/15 bg-[#070B14]/70"
                            >
                              <div className="p-4 sm:p-5 grid grid-cols-1 lg:grid-cols-2 gap-4">
                                {/* Question Side */}
                                <div className="space-y-2 min-w-0">
                                  <div className="flex items-center justify-between text-xs font-semibold text-[#7B8FAD]">
                                    <span className="text-[#E8ECF4]">
                                      Question {qInfo.displayNumber}
                                    </span>
                                    {q.questionImageUrl && (
                                      <button
                                        type="button"
                                        onClick={() =>
                                          setLightboxDiagram({
                                            url: q.questionImageUrl,
                                            caption: `Question ${qInfo.displayNumber} · ${attempt.paperCode || paperData.paperCode}`,
                                          })
                                        }
                                        className="text-[11px] text-[#4A7BF7] hover:underline inline-flex items-center gap-1 font-semibold"
                                      >
                                        <Maximize2 size={12} />
                                        <span>Zoom</span>
                                      </button>
                                    )}
                                  </div>

                                  {q.questionImageUrl ? (
                                    <div
                                      onClick={() =>
                                        setLightboxDiagram({
                                          url: q.questionImageUrl,
                                          caption: `Question ${qInfo.displayNumber} · ${attempt.paperCode || paperData.paperCode}`,
                                        })
                                      }
                                      className="rounded-xl bg-[#0A1020] border border-[#6382BF]/30 hover:border-[#4A7BF7]/60 p-2.5 sm:p-3 cursor-zoom-in transition-colors"
                                    >
                                      <div className="bg-white rounded-lg p-2 sm:p-3">
                                        <img
                                          src={assetUrl(q.questionImageUrl)}
                                          alt={`Question ${q.number}`}
                                          className="w-full max-h-[520px] object-contain mx-auto block select-none"
                                        />
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="p-4 rounded-xl bg-[#0A1020] border border-[#6382BF]/25 space-y-3 text-xs sm:text-sm text-[#E8ECF4]">
                                      {q.contextText && <FormattedMathText text={q.contextText} />}
                                      {q.parts.map((p, pIdx) => (
                                        <div key={pIdx} className="space-y-1">
                                          <div className="font-bold text-xs text-[#7B8FAD]">
                                            {p.partLabel ? `(${p.partLabel})` : `Part ${pIdx + 1}`} [{p.marks}m]
                                          </div>
                                          <FormattedMathText text={p.text} />
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>

                                {/* Mark Scheme Side */}
                                <div className="space-y-2 min-w-0">
                                  <div className="flex items-center justify-between text-xs font-semibold text-[#7B8FAD]">
                                    <span className="inline-flex items-center gap-1.5 text-[#E8ECF4]">
                                      <CheckCircle2 size={13} className="text-emerald-400" />
                                      <span>Mark Scheme</span>
                                    </span>
                                    {q.markSchemeImageUrl && (
                                      <button
                                        type="button"
                                        onClick={() =>
                                          setLightboxDiagram({
                                            url: q.markSchemeImageUrl,
                                            caption: `Question ${qInfo.displayNumber} · Mark Scheme`,
                                          })
                                        }
                                        className="text-[11px] text-emerald-400 hover:underline inline-flex items-center gap-1 font-semibold"
                                      >
                                        <Maximize2 size={12} />
                                        <span>Zoom</span>
                                      </button>
                                    )}
                                  </div>

                                  {q.markSchemeImageUrl ? (
                                    <div
                                      onClick={() =>
                                        setLightboxDiagram({
                                          url: q.markSchemeImageUrl,
                                          caption: `Question ${qInfo.displayNumber} · Mark Scheme`,
                                        })
                                      }
                                      className="rounded-xl bg-[#0A1020] border border-[#6382BF]/30 hover:border-emerald-500/60 p-2.5 sm:p-3 cursor-zoom-in transition-colors"
                                    >
                                      <div className="bg-white rounded-lg p-2 sm:p-3">
                                        <img
                                          src={assetUrl(q.markSchemeImageUrl)}
                                          alt={`Question ${q.number} Mark Scheme`}
                                          className="w-full max-h-[520px] object-contain mx-auto block select-none"
                                        />
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="p-4 rounded-xl bg-[#0A1020] border border-[#6382BF]/25 text-xs sm:text-sm text-[#E8ECF4] leading-relaxed">
                                      <FormattedMathText text={q.fullMarkScheme} />
                                    </div>
                                  )}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
            {onDelete ? (
              <button
                type="button"
                onClick={() => {
                  if (window.confirm('Delete this score report?')) {
                    onDelete();
                  }
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-semibold transition-colors"
              >
                <Trash2 size={13} />
                <span>Delete Record</span>
              </button>
            ) : (
              <div />
            )}

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

      {/* Inline Fullscreen Image Zoom Lightbox */}
      <AnimatePresence>
        {lightboxDiagram && (
          <motion.div
            key="review-lightbox"
            variants={overlayFadeVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="fixed inset-0 z-[60] bg-[#070B14] flex flex-col p-3 sm:p-4"
          >
            <div className="h-12 bg-[#1A2540] border border-[#6382BF]/30 rounded-xl px-4 flex items-center justify-between shrink-0 shadow-lg mb-3">
              <span className="text-xs font-semibold text-[#E8ECF4] truncate max-w-xs sm:max-w-md">
                {lightboxDiagram.caption}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setLightboxZoom((prev) => Math.max(0.75, prev - 0.25))}
                  className="p-1.5 rounded-lg bg-[#0A1020] hover:bg-[#4A7BF7] text-[#7B8FAD] hover:text-white border border-[#6382BF]/30 transition-colors"
                >
                  <ZoomOut size={14} />
                </button>
                <span className="text-xs font-semibold text-[#E8ECF4] tabular-nums px-2">
                  {Math.round(lightboxZoom * 100)}%
                </span>
                <button
                  onClick={() => setLightboxZoom((prev) => Math.min(3, prev + 0.25))}
                  className="p-1.5 rounded-lg bg-[#0A1020] hover:bg-[#4A7BF7] text-[#7B8FAD] hover:text-white border border-[#6382BF]/30 transition-colors"
                >
                  <ZoomIn size={14} />
                </button>
                <button
                  onClick={() => setLightboxZoom(1)}
                  className="px-2 py-1 rounded-lg bg-[#0A1020] hover:bg-[#1A2540] text-[11px] font-semibold text-[#7B8FAD] hover:text-[#E8ECF4] border border-[#6382BF]/30 transition-colors"
                >
                  Reset
                </button>
                <button
                  onClick={() => setLightboxDiagram(null)}
                  className="p-1.5 rounded-lg bg-[#0A1020] hover:bg-rose-500 hover:text-white text-[#7B8FAD] border border-[#6382BF]/30 transition-colors ml-2"
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain flex flex-col items-center p-2 sm:p-6 border border-[#6382BF]/20 rounded-2xl bg-[#0A1020]">
              <div
                style={{
                  transform: `scale(${lightboxZoom})`,
                  transformOrigin: 'top center',
                  willChange: 'transform',
                }}
                className="max-w-4xl w-full flex flex-col items-center py-2"
              >
                <div className="bg-white rounded-xl p-2 sm:p-4 shadow-2xl max-w-full">
                  <img
                    src={assetUrl(lightboxDiagram.url)}
                    alt={lightboxDiagram.caption || 'Preview'}
                    className="max-w-full h-auto object-contain select-none mx-auto block"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const ScoreReportModal = ScoreReportScreen;
