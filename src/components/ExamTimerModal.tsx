import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize,
  Clock, 
  CheckCircle,
  FileText
} from 'lucide-react';
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
  const initialDuration = paper ? paper.durationMinutes * 60 : 120 * 60; // in seconds
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

  const percentComplete = ((totalSeconds - secondsRemaining) / totalSeconds) * 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl relative flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Exam Hall Timer</h3>
              <p className="text-xs text-slate-400">
                {paper ? `${paper.code} — ${paper.title}` : 'Strict Timed Conditions'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-2 rounded-lg border transition ${
                soundEnabled
                  ? 'bg-slate-800 text-amber-400 border-slate-700'
                  : 'bg-slate-950 text-slate-500 border-slate-800'
              }`}
              title={soundEnabled ? 'Sound is ON' : 'Sound is MUTED'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Timer Main Display */}
        <div className="p-8 flex flex-col items-center justify-center text-center">
          {/* Progress bar line */}
          <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden mb-6 border border-slate-800">
            <div 
              className={`h-full transition-all duration-300 ${
                isFinished 
                  ? 'bg-red-500' 
                  : percentComplete > 80 
                    ? 'bg-amber-500' 
                    : 'bg-indigo-500'
              }`}
              style={{ width: `${percentComplete}%` }}
            />
          </div>

          {/* Huge Digits */}
          <div className="font-mono text-5xl sm:text-6xl font-extrabold tracking-tight text-white mb-2 select-none">
            {formatTime(secondsRemaining)}
          </div>

          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-8">
            {isFinished ? (
              <span className="text-red-400 font-bold animate-bounce">
                Time is up! Pens down.
              </span>
            ) : isRunning ? (
              <span className="text-emerald-400 flex items-center justify-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Exam in progress
              </span>
            ) : (
              'Paused'
            )}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={handleStartPause}
              className={`flex items-center gap-2 px-8 py-3.5 rounded-2xl font-bold text-sm shadow-lg transition active:scale-95 ${
                isRunning
                  ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'
              }`}
            >
              {isRunning ? (
                <>
                  <Pause className="w-4 h-4" /> Pause
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" /> {secondsRemaining < totalSeconds ? 'Resume' : 'Start Timer'}
                </>
              )}
            </button>

            <button
              onClick={handleReset}
              className="p-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition active:scale-95"
              title="Reset Timer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Preset Buttons */}
          <div className="w-full pt-4 border-t border-slate-800/80">
            <span className="text-xs text-slate-400 block mb-2.5">
              Standard Exam Durations:
            </span>
            <div className="grid grid-cols-4 gap-2">
              {[
                { label: '2 Hours (Pure)', mins: 120 },
                { label: '1.5 Hours (FM)', mins: 90 },
                { label: '1h 15m (AS S/M)', mins: 75 },
                { label: '45 Mins', mins: 45 },
              ].map((p) => (
                <button
                  key={p.mins}
                  onClick={() => handleSelectPreset(p.mins)}
                  className={`px-2 py-2 rounded-xl text-xs font-medium border transition ${
                    totalSeconds === p.mins * 60
                      ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
                      : 'bg-slate-950 hover:bg-slate-800/60 text-slate-400 border-slate-800'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Shortcut to view paper */}
          {paper && onOpenPaper && (
            <div className="mt-5 w-full">
              <button
                onClick={() => onOpenPaper(paper)}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-700 transition"
              >
                <FileText className="w-3.5 h-3.5 text-cyan-400" />
                <span>Open {paper.code} Question Paper alongside timer</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
