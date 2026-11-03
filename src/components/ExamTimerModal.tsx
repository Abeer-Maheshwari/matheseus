import React, { useState, useEffect } from 'react';
import { PastPaper } from '../types';
import { playExamChime } from '../utils/audio';

interface ExamTimerModalProps {
  paper?: PastPaper | null;
  onClose: () => void;
  onOpenPaper?: (paper: PastPaper) => void;
}

export const ExamTimerModal: React.FC<ExamTimerModalProps> = ({
  paper,
  onClose,
  onOpenPaper,
}) => {
  const initialDuration = paper ? paper.durationMinutes * 60 : 120 * 60;
  const [totalSeconds, setTotalSeconds] = useState<number>(initialDuration);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(initialDuration);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsFinished(true);
            if (soundEnabled) {
              playExamChime();
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, secondsRemaining, soundEnabled]);

  const handleStartPause = () => {
    if (isFinished) {
      setSecondsRemaining(totalSeconds);
      setIsFinished(false);
      setIsRunning(true);
    } else {
      setIsRunning(!isRunning);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setSecondsRemaining(totalSeconds);
    setIsFinished(false);
  };

  const handleSelectPreset = (minutes: number) => {
    setIsRunning(false);
    setIsFinished(false);
    setTotalSeconds(minutes * 60);
    setSecondsRemaining(minutes * 60);
  };

  const formatTime = (secs: number) => {
    const hours = Math.floor(secs / 3600);
    const mins = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F1729]/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#1A2540] border border-[#6382BF]/30 rounded-xl w-full max-w-md overflow-hidden text-[#E8ECF4] shadow-2xl animate-modalFadeIn">
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-[#6382BF]/20 flex items-center justify-between bg-[#0A1020]/60">
          <div>
            <h3 className="font-bold text-[#E8ECF4] text-sm">Exam Countdown Timer</h3>
            <p className="text-xs text-[#7B8FAD]">
              {paper ? `${paper.code} (${paper.title})` : 'Timed exam practice'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`px-2.5 py-1 text-xs rounded-lg border transition-colors ${
                soundEnabled
                  ? 'bg-[#4A7BF7]/20 text-[#4A7BF7] border-[#4A7BF7]/40 font-medium'
                  : 'bg-[#0A1020] text-[#7B8FAD] border-[#6382BF]/20'
              }`}
            >
              Sound: {soundEnabled ? 'On' : 'Off'}
            </button>
            <button
              onClick={onClose}
              className="px-2.5 py-1 text-xs rounded-lg bg-[#0A1020] hover:bg-[#1A2540] text-[#7B8FAD] hover:text-[#E8ECF4] border border-[#6382BF]/20 transition-colors"
            >
              Close
            </button>
          </div>
        </div>

        {/* Display */}
        <div className="p-8 text-center">
          <div className="font-sans text-5xl font-bold tracking-tight text-white mb-2 tabular-nums">
            {formatTime(secondsRemaining)}
          </div>

          <div className="text-xs uppercase tracking-wider text-[#7B8FAD] mb-6">
            {isFinished ? 'Time has expired' : isRunning ? 'Timer running' : 'Paused'}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <button
              onClick={handleStartPause}
              className="px-6 py-2 rounded-lg bg-[#4A7BF7] hover:bg-[#6B93F9] text-white font-semibold text-xs transition-colors shadow-sm"
            >
              {isRunning ? 'Pause' : secondsRemaining < totalSeconds ? 'Resume' : 'Start'}
            </button>

            <button
              onClick={handleReset}
              className="px-4 py-2 rounded-lg bg-[#0A1020] hover:bg-[#1A2540] text-[#E8ECF4] border border-[#6382BF]/30 text-xs font-medium transition-colors"
            >
              Reset
            </button>
          </div>

          {/* Presets */}
          <div className="pt-4 border-t border-[#6382BF]/20">
            <div className="text-xs text-[#7B8FAD] mb-2 font-medium">Exam Duration Presets</div>
            <div className="grid grid-cols-4 gap-1.5 text-xs">
              {[
                { label: '120m (Pure)', mins: 120 },
                { label: '90m (FM)', mins: 90 },
                { label: '75m (AS)', mins: 75 },
                { label: '45m (Sprint)', mins: 45 },
              ].map((p) => (
                <button
                  key={p.mins}
                  onClick={() => handleSelectPreset(p.mins)}
                  className={`py-1.5 px-1 rounded-lg border text-[11px] font-medium transition-colors ${
                    totalSeconds === p.mins * 60
                      ? 'bg-[#4A7BF7] text-white border-[#4A7BF7] font-semibold'
                      : 'bg-[#0A1020] text-[#7B8FAD] hover:text-[#E8ECF4] border-[#6382BF]/20'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {paper && onOpenPaper && (
            <button
              onClick={() => onOpenPaper(paper)}
              className="mt-4 w-full py-2 bg-[#0A1020] hover:bg-[#1A2540] text-[#E8ECF4] rounded-lg border border-[#6382BF]/30 text-xs font-medium transition-colors"
            >
              Open Question Paper in Viewer
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
