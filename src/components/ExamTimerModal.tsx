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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
      <div className="bg-zinc-950 border border-zinc-800 rounded-lg w-full max-w-md overflow-hidden text-zinc-100">
        {/* Header */}
        <div className="px-5 py-3 border-b border-zinc-800 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-white text-sm">Exam Timer</h3>
            <p className="text-xs text-zinc-400">
              {paper ? `${paper.code} (${paper.title})` : 'Practice Timer'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`px-2 py-1 text-xs rounded border ${
                soundEnabled
                  ? 'bg-zinc-800 text-zinc-200 border-zinc-700'
                  : 'bg-zinc-950 text-zinc-500 border-zinc-800'
              }`}
            >
              Sound: {soundEnabled ? 'On' : 'Off'}
            </button>
            <button
              onClick={onClose}
              className="px-2 py-1 text-xs rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800"
            >
              Close
            </button>
          </div>
        </div>

        {/* Display */}
        <div className="p-8 text-center">
          <div className="font-mono text-5xl font-bold tracking-tight text-white mb-2">
            {formatTime(secondsRemaining)}
          </div>

          <div className="text-xs uppercase tracking-wider text-zinc-500 mb-6 font-mono">
            {isFinished ? 'Time has expired' : isRunning ? 'Timer running' : 'Paused'}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <button
              onClick={handleStartPause}
              className="px-6 py-2 rounded bg-white hover:bg-zinc-200 text-black font-semibold text-xs"
            >
              {isRunning ? 'Pause' : secondsRemaining < totalSeconds ? 'Resume' : 'Start'}
            </button>

            <button
              onClick={handleReset}
              className="px-4 py-2 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 text-xs font-medium"
            >
              Reset
            </button>
          </div>

          {/* Presets */}
          <div className="pt-4 border-t border-zinc-800/80">
            <div className="text-xs text-zinc-500 mb-2 font-medium">Standard Durations</div>
            <div className="grid grid-cols-4 gap-1.5 text-xs">
              {[
                { label: '120m (Pure)', mins: 120 },
                { label: '90m (FM)', mins: 90 },
                { label: '75m (AS)', mins: 75 },
                { label: '45m', mins: 45 },
              ].map((p) => (
                <button
                  key={p.mins}
                  onClick={() => handleSelectPreset(p.mins)}
                  className={`py-1.5 px-1 rounded border text-[11px] font-mono ${
                    totalSeconds === p.mins * 60
                      ? 'bg-zinc-800 text-white border-zinc-600 font-semibold'
                      : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border-zinc-800'
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
              className="mt-4 w-full py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 rounded border border-zinc-800 text-xs font-medium"
            >
              Open Question Paper in Viewer
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
