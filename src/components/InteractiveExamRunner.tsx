import React, { useState, useEffect } from 'react';
import { InteractivePaper, InteractiveQuestion } from '../data/interactiveQuestions';
import { FormattedMathText } from './MathRenderer';
import { FormulaBookletModal } from './FormulaBookletModal';
import { playExamChime } from '../utils/audio';

export type FeedbackMode = 'immediate' | 'end';
export type TimingMode = 'timed' | 'untimed';

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
  const [notes, setNotes] = useState<Record<number, string>>({});

  // Timer state
  const totalSeconds = paper.durationMinutes * 60;
  const [secondsRemaining, setSecondsRemaining] = useState(totalSeconds);
  const [isTimerPaused, setIsTimerPaused] = useState(false);

  // Formula booklet overlay
  const [showFormulaModal, setShowFormulaModal] = useState(false);

  // Completed exam summary view
  const [isFinished, setIsFinished] = useState(false);

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
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isStarted, isFinished, timingMode, isTimerPaused, secondsRemaining]);

  const formatTime = (secs: number) => {
    const hours = Math.floor(secs / 3600);
    const mins = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${hours > 0 ? `${hours}:` : ''}${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const currentQ: InteractiveQuestion = paper.questions[currentIndex];

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

  const handleFinishExam = () => {
    setIsFinished(true);
    if (onSaveResult) {
      onSaveResult(paper.id, totalAchievedScore, paperMaxMarks);
    }
  };

  // Setup / Start screen
  if (!isStarted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 text-zinc-100">
        <div className="bg-zinc-950 border border-zinc-800 rounded-lg max-w-lg w-full p-6 space-y-6">
          <div className="border-b border-zinc-800 pb-4">
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">
              {paper.paperCode}
            </span>
            <h2 className="text-lg font-bold text-white mt-2">{paper.title}</h2>
            <p className="text-xs text-zinc-400 mt-1">
              Interactive Digital Exam · {paper.questions.length} Questions · {paperMaxMarks} Marks
            </p>
          </div>

          {/* Option: Feedback Mode */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-300 block uppercase tracking-wider">
              1. Mark Scheme & Solution Display
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setFeedbackMode('immediate')}
                className={`p-3 rounded border text-left transition-colors ${
                  feedbackMode === 'immediate'
                    ? 'bg-zinc-800 border-zinc-500 text-white font-semibold'
                    : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <div className="font-medium text-white mb-0.5">Directly After Question</div>
                <div className="text-[11px] text-zinc-400">Reveal solution & mark scheme immediately on each question.</div>
              </button>

              <button
                type="button"
                onClick={() => setFeedbackMode('end')}
                className={`p-3 rounded border text-left transition-colors ${
                  feedbackMode === 'end'
                    ? 'bg-zinc-800 border-zinc-500 text-white font-semibold'
                    : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <div className="font-medium text-white mb-0.5">Shown at the End</div>
                <div className="text-[11px] text-zinc-400">Exam simulation. Solutions revealed after you submit all questions.</div>
              </button>
            </div>
          </div>

          {/* Option: Timing */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-300 block uppercase tracking-wider">
              2. Exam Timing
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setTimingMode('timed')}
                className={`p-3 rounded border text-left transition-colors ${
                  timingMode === 'timed'
                    ? 'bg-zinc-800 border-zinc-500 text-white font-semibold'
                    : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <div className="font-medium text-white mb-0.5">Timed ({paper.durationMinutes} mins)</div>
                <div className="text-[11px] text-zinc-400">Strict exam timer with countdown and audio alert.</div>
              </button>

              <button
                type="button"
                onClick={() => setTimingMode('untimed')}
                className={`p-3 rounded border text-left transition-colors ${
                  timingMode === 'untimed'
                    ? 'bg-zinc-800 border-zinc-500 text-white font-semibold'
                    : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <div className="font-medium text-white mb-0.5">Untimed Practice</div>
                <div className="text-[11px] text-zinc-400">Practice at your own pace with no clock pressure.</div>
              </button>
            </div>
          </div>

          {/* Formula Booklet Access notice */}
          <div className="p-3 rounded bg-zinc-900 border border-zinc-800 text-xs text-zinc-400 flex items-center justify-between">
            <span>You can open the official Formula Booklet at any time during the test.</span>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-800"
            >
              Cancel
            </button>
            <button
              onClick={() => setIsStarted(true)}
              className="px-5 py-2 text-xs font-semibold rounded bg-white hover:bg-zinc-200 text-black"
            >
              Start Interactive Exam
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Finished Summary Screen
  if (isFinished) {
    const percent = Math.round((totalAchievedScore / paperMaxMarks) * 100);

    return (
      <div className="fixed inset-0 z-50 flex flex-col bg-black text-zinc-100 overflow-y-auto">
        <div className="max-w-3xl mx-auto w-full px-4 py-8 space-y-6">
          {/* Header */}
          <div className="border-b border-zinc-800 pb-4 flex items-center justify-between">
            <div>
              <span className="font-mono text-xs text-zinc-400">{paper.paperCode}</span>
              <h2 className="text-xl font-bold text-white">{paper.title} — Review & Scorecard</h2>
            </div>
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 text-xs font-medium"
            >
              Close Exam
            </button>
          </div>

          {/* Score banner */}
          <div className="p-5 rounded-lg border border-zinc-800 bg-zinc-950 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-xs text-zinc-400 font-medium">Your Total Score</div>
              <div className="text-3xl font-bold text-white font-mono mt-0.5">
                {totalAchievedScore} / {paperMaxMarks}
                <span className="text-sm font-normal text-zinc-400 ml-2">({percent}%)</span>
              </div>
            </div>
            <div className="text-xs text-zinc-400">
              Exam Mode: <span className="text-zinc-200 font-semibold">{feedbackMode === 'immediate' ? 'Immediate' : 'End Review'}</span>
              <span className="mx-2">·</span>
              Timing: <span className="text-zinc-200 font-semibold">{timingMode === 'timed' ? 'Timed' : 'Untimed'}</span>
            </div>
          </div>

          {/* Question-by-Question Full Mark Scheme Review */}
          <div className="space-y-6">
            <h3 className="text-sm font-bold text-zinc-300 uppercase tracking-wider">
              Question by Question Mark Scheme Review
            </h3>

            {paper.questions.map((q) => {
              const scored = scores[q.number] ?? 0;
              return (
                <div key={q.number} className="border border-zinc-800 rounded-lg p-5 bg-zinc-950 space-y-4">
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">Question {q.number}</span>
                      <span className="text-xs text-zinc-400">({q.topic})</span>
                    </div>
                    <div className="font-mono text-xs">
                      Score: <span className="font-bold text-white">{scored}</span> / {q.totalMarks} marks
                    </div>
                  </div>

                  {/* Question context */}
                  {q.contextText && (
                    <div className="text-xs text-zinc-200 bg-zinc-900/60 p-3 rounded border border-zinc-800/80">
                      <FormattedMathText text={q.contextText} />
                    </div>
                  )}

                  {/* Parts */}
                  <div className="space-y-3">
                    {q.parts.map((p, pIdx) => (
                      <div key={pIdx} className="text-xs pl-2 border-l border-zinc-800 space-y-1">
                        <div className="font-semibold text-zinc-300">
                          {p.partLabel} <span className="text-zinc-500 font-normal">[{p.marks} marks]</span>
                        </div>
                        <FormattedMathText text={p.text} className="text-zinc-300" />
                        {p.solution && (
                          <div className="mt-2 p-2.5 rounded bg-black border border-zinc-800 font-mono text-xs text-zinc-300">
                            <span className="text-[11px] font-sans text-zinc-500 block mb-1 font-semibold">Solution:</span>
                            <FormattedMathText text={p.solution} />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Mark scheme breakdown */}
                  <div className="pt-2 border-t border-zinc-800 text-xs">
                    <div className="font-semibold text-zinc-400 mb-1">Official Marking Guidance:</div>
                    <div className="p-3 rounded bg-zinc-900/80 border border-zinc-800 text-zinc-300 leading-relaxed font-mono text-[11px]">
                      <FormattedMathText text={q.fullMarkScheme} />
                    </div>
                  </div>

                  {/* Final answer */}
                  <div className="text-xs flex items-center gap-2 pt-1">
                    <span className="text-zinc-500 font-medium">Final Answer:</span>
                    <span className="font-mono font-semibold text-zinc-200">
                      <FormattedMathText text={q.finalAnswer} />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-zinc-800 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded bg-white hover:bg-zinc-200 text-black font-semibold text-xs"
            >
              Finish & Return to Papers
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Active question-by-question view
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black text-zinc-100">
      {/* Top Exam Header */}
      <div className="h-14 px-4 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <span className="font-mono text-xs px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
            {paper.paperCode}
          </span>
          <span className="font-bold text-sm text-white truncate hidden sm:inline">
            {paper.title}
          </span>
          <span className="text-zinc-400 text-xs font-mono">
            Q{currentQ.number} of {paper.questions.length}
          </span>
        </div>

        {/* Center: Timer & Controls */}
        <div className="flex items-center gap-3">
          {timingMode === 'timed' && (
            <div className="flex items-center gap-2 font-mono text-xs bg-zinc-900 px-3 py-1 rounded border border-zinc-800">
              <span className={secondsRemaining < 300 ? 'text-rose-400 font-bold' : 'text-zinc-200 font-semibold'}>
                {formatTime(secondsRemaining)}
              </span>
              <button
                onClick={() => setIsTimerPaused(!isTimerPaused)}
                className="text-[10px] text-zinc-400 hover:text-white underline ml-1"
              >
                {isTimerPaused ? 'Resume' : 'Pause'}
              </button>
            </div>
          )}

          {/* Formula Booklet Quick Access Button */}
          <button
            onClick={() => setShowFormulaModal(true)}
            className="px-2.5 py-1 text-xs rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 font-medium"
            title="Open Formula Booklet"
          >
            Formula Booklet
          </button>
        </div>

        {/* Right side: Finish Exam */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleFinishExam}
            className="px-3 py-1 text-xs rounded bg-zinc-200 hover:bg-white text-black font-semibold"
          >
            Finish & Review
          </button>
        </div>
      </div>

      {/* Question Selector Strip */}
      <div className="px-4 py-2 bg-zinc-900/70 border-b border-zinc-800 flex items-center justify-between text-xs overflow-x-auto shrink-0">
        <div className="flex items-center gap-1.5">
          <span className="text-zinc-500 font-medium mr-1 text-[11px]">Jump to:</span>
          {paper.questions.map((q, idx) => {
            const isCurrent = idx === currentIndex;
            const hasScore = scores[q.number] !== undefined;
            const isFlag = flagged[q.number];

            return (
              <button
                key={q.number}
                onClick={() => setCurrentIndex(idx)}
                className={`w-7 h-7 rounded text-xs font-mono font-medium transition-colors flex items-center justify-center relative ${
                  isCurrent
                    ? 'bg-white text-black font-bold'
                    : hasScore
                      ? 'bg-zinc-800 text-zinc-200 border border-zinc-700'
                      : 'bg-zinc-950 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
                }`}
              >
                {q.number}
                {isFlag && (
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 absolute top-0.5 right-0.5" />
                )}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3 text-zinc-400 text-xs shrink-0">
          <label className="flex items-center gap-1 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={!!flagged[currentQ.number]}
              onChange={(e) => setFlagged({ ...flagged, [currentQ.number]: e.target.checked })}
              className="rounded bg-zinc-900 border-zinc-700 text-white focus:ring-0"
            />
            <span>Flag for review</span>
          </label>
        </div>
      </div>

      {/* Main Question Scrollable Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-8">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Question Title & Marks */}
          <div className="flex items-baseline justify-between border-b border-zinc-800 pb-3">
            <div>
              <h2 className="text-lg font-bold text-white">Question {currentQ.number}</h2>
              <span className="text-xs text-zinc-400">{currentQ.topic}</span>
            </div>
            <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-200">
              Total: {currentQ.totalMarks} marks
            </span>
          </div>

          {/* Context Statement */}
          {currentQ.contextText && (
            <div className="p-4 rounded bg-zinc-950 border border-zinc-800 text-sm text-zinc-100 leading-relaxed font-sans">
              <FormattedMathText text={currentQ.contextText} />
            </div>
          )}

          {/* Parts (a), (b), (c) */}
          <div className="space-y-5">
            {currentQ.parts.map((part, pIdx) => (
              <div key={pIdx} className="p-4 rounded bg-zinc-950 border border-zinc-800/80 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-zinc-200 border-b border-zinc-800/60 pb-1.5">
                  <span>Part {part.partLabel}</span>
                  <span className="font-mono text-zinc-400">[{part.marks} {part.marks === 1 ? 'mark' : 'marks'}]</span>
                </div>
                <div className="text-sm text-zinc-200 leading-relaxed">
                  <FormattedMathText text={part.text} />
                </div>
              </div>
            ))}
          </div>

          {/* Scratchpad Working Notes */}
          <div className="space-y-1.5 pt-2">
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">
              Working Notes & Interim Values:
            </span>
            <textarea
              rows={3}
              value={notes[currentQ.number] || ''}
              onChange={(e) => setNotes({ ...notes, [currentQ.number]: e.target.value })}
              placeholder="Jot down rough calculations, formulas, or steps..."
              className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-zinc-500 font-mono"
            />
          </div>

          {/* Self-Marking Input Bar */}
          <div className="p-3.5 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-between text-xs">
            <span className="font-medium text-zinc-300">
              Enter mark achieved for Question {currentQ.number}:
            </span>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="0"
                max={currentQ.totalMarks}
                value={scores[currentQ.number] !== undefined ? String(scores[currentQ.number]) : ''}
                onChange={(e) => handleScoreChange(currentQ.number, e.target.value, currentQ.totalMarks)}
                placeholder="Mark"
                className="w-16 px-2 py-1.5 bg-zinc-950 border border-zinc-700 rounded text-center text-white font-mono text-xs focus:outline-none focus:border-zinc-500"
              />
              <span className="text-zinc-400 font-mono">/ {currentQ.totalMarks}</span>
            </div>
          </div>

          {/* Solution & Mark Scheme Display */}
          {feedbackMode === 'immediate' ? (
            <div className="pt-2">
              <button
                onClick={() =>
                  setRevealedSolutions({
                    ...revealedSolutions,
                    [currentQ.number]: !revealedSolutions[currentQ.number],
                  })
                }
                className="w-full py-2.5 rounded bg-zinc-900 hover:bg-zinc-850 text-zinc-300 border border-zinc-800 text-xs font-medium transition-colors text-center"
              >
                {revealedSolutions[currentQ.number]
                  ? 'Hide Mark Scheme & Solution'
                  : 'Reveal Mark Scheme & Solution'}
              </button>

              {revealedSolutions[currentQ.number] && (
                <div className="mt-4 p-4 rounded bg-zinc-950 border border-zinc-800 space-y-3">
                  <div className="font-semibold text-xs text-zinc-300 border-b border-zinc-800 pb-1.5">
                    Official Mark Scheme & Working:
                  </div>

                  {currentQ.parts.map((p, i) => (
                    p.solution ? (
                      <div key={i} className="text-xs space-y-1">
                        <span className="font-semibold text-zinc-400">{p.partLabel} Solution:</span>
                        <div className="p-2.5 rounded bg-black border border-zinc-800 text-zinc-300 font-mono">
                          <FormattedMathText text={p.solution} />
                        </div>
                      </div>
                    ) : null
                  ))}

                  <div className="text-xs pt-2">
                    <span className="font-semibold text-zinc-400 block mb-1">Marking Guidance:</span>
                    <div className="p-2.5 rounded bg-black border border-zinc-800 text-zinc-300 font-mono text-[11px]">
                      <FormattedMathText text={currentQ.fullMarkScheme} />
                    </div>
                  </div>

                  <div className="text-xs font-medium text-zinc-400 pt-1">
                    Final Answer: <span className="text-white font-mono">{currentQ.finalAnswer}</span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="p-3 rounded bg-zinc-950 border border-zinc-800/80 text-xs text-zinc-500 text-center">
              Answers are hidden in Exam Mode. Full solutions and mark scheme guidance will be revealed in the final summary when you submit.
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation Toolbar */}
      <div className="h-14 px-4 bg-zinc-950 border-t border-zinc-800 flex items-center justify-between gap-4 shrink-0">
        <button
          onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
          disabled={currentIndex === 0}
          className={`px-4 py-1.5 rounded text-xs font-medium border ${
            currentIndex === 0
              ? 'opacity-40 cursor-not-allowed bg-zinc-950 text-zinc-600 border-zinc-800'
              : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border-zinc-800'
          }`}
        >
          Previous Question
        </button>

        <div className="text-xs font-mono text-zinc-400">
          Score Logged: <span className="text-white font-bold">{totalAchievedScore}</span> / {paperMaxMarks}
        </div>

        {currentIndex === paper.questions.length - 1 ? (
          <button
            onClick={handleFinishExam}
            className="px-4 py-1.5 rounded text-xs font-semibold bg-white hover:bg-zinc-200 text-black"
          >
            Finish Exam
          </button>
        ) : (
          <button
            onClick={() => setCurrentIndex(Math.min(paper.questions.length - 1, currentIndex + 1))}
            className="px-4 py-1.5 rounded text-xs font-medium bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800"
          >
            Next Question
          </button>
        )}
      </div>

      {/* Formula Booklet overlay modal */}
      {showFormulaModal && (
        <FormulaBookletModal onClose={() => setShowFormulaModal(false)} />
      )}
    </div>
  );
};
