import React, { useEffect, useState, useRef } from 'react';
import { Pause, Play, AlertCircle } from 'lucide-react';

interface FlipClockProps {
  secondsRemaining: number;
  isPaused: boolean;
  onTogglePause?: () => void;
  className?: string;
}

// Single animated flip digit slot
const FlipDigit: React.FC<{ digit: string }> = ({ digit }) => {
  const [current, setCurrent] = useState(digit);
  const [previous, setPrevious] = useState(digit);
  const [animating, setAnimating] = useState(false);
  const prevDigitRef = useRef(digit);

  useEffect(() => {
    if (digit !== prevDigitRef.current) {
      setPrevious(prevDigitRef.current);
      setCurrent(digit);
      prevDigitRef.current = digit;
      setAnimating(true);
      const timer = setTimeout(() => {
        setAnimating(false);
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [digit]);

  return (
    <div className="relative w-7 h-10 sm:w-8 sm:h-11 bg-slate-900 border border-slate-700/80 rounded flex items-center justify-center overflow-hidden shadow-inner select-none">
      {/* Horizontal split line mimicking mechanical flip clock flap */}
      <div className="absolute inset-x-0 top-1/2 h-[1px] bg-slate-950/80 z-20 pointer-events-none" />

      {/* Top and bottom subtle sheen */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] via-transparent to-black/40 pointer-events-none z-10" />

      {animating ? (
        <>
          {/* Exiting previous digit */}
          <div className="absolute inset-0 flex items-center justify-center font-mono font-bold text-lg sm:text-xl text-slate-300 flip-digit-exit">
            {previous}
          </div>
          {/* Incoming new digit animating up */}
          <div className="absolute inset-0 flex items-center justify-center font-mono font-bold text-lg sm:text-xl text-white flip-animate-up">
            {current}
          </div>
        </>
      ) : (
        <div className="font-mono font-bold text-lg sm:text-xl text-white">
          {current}
        </div>
      )}
    </div>
  );
};

export const FlipClock: React.FC<FlipClockProps> = ({
  secondsRemaining,
  isPaused,
  onTogglePause,
  className = '',
}) => {
  const hours = Math.floor(secondsRemaining / 3600);
  const mins = Math.floor((secondsRemaining % 3600) / 60);
  const secs = secondsRemaining % 60;

  const hStr = hours.toString().padStart(2, '0');
  const mStr = mins.toString().padStart(2, '0');
  const sStr = secs.toString().padStart(2, '0');

  const isUrgent = secondsRemaining < 300 && secondsRemaining > 0; // < 5 mins

  return (
    <div className={`flex items-center gap-3 p-2 bg-slate-950/90 border rounded-lg shadow-sm ${
      isUrgent ? 'border-amber-500/60 ring-1 ring-amber-500/30' : 'border-slate-800'
    } ${className}`}>
      <div className="flex items-center gap-1">
        {/* Hours (if applicable) */}
        {hours > 0 && (
          <>
            <div className="flex items-center gap-0.5">
              <FlipDigit digit={hStr[0]} />
              <FlipDigit digit={hStr[1]} />
            </div>
            <span className="font-mono font-bold text-slate-500 text-base px-0.5 animate-pulse">:</span>
          </>
        )}

        {/* Minutes */}
        <div className="flex items-center gap-0.5">
          <FlipDigit digit={mStr[0]} />
          <FlipDigit digit={mStr[1]} />
        </div>

        <span className="font-mono font-bold text-slate-500 text-base px-0.5 animate-pulse">:</span>

        {/* Seconds */}
        <div className="flex items-center gap-0.5">
          <FlipDigit digit={sStr[0]} />
          <FlipDigit digit={sStr[1]} />
        </div>
      </div>

      {/* Clock Controls */}
      {onTogglePause && (
        <div className="flex flex-col items-start pl-1 border-l border-slate-800">
          <button
            type="button"
            onClick={onTogglePause}
            className="flex items-center gap-1 px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-[11px] font-medium border border-slate-700/60 transition-colors"
            title={isPaused ? 'Resume exam clock' : 'Pause exam clock'}
          >
            {isPaused ? <Play size={11} className="text-emerald-400" /> : <Pause size={11} className="text-amber-400" />}
            <span>{isPaused ? 'Resume' : 'Pause'}</span>
          </button>
          {isUrgent && (
            <span className="flex items-center gap-0.5 text-[10px] text-amber-400 font-medium mt-0.5">
              <AlertCircle size={10} />
              &lt; 5m left
            </span>
          )}
        </div>
      )}
    </div>
  );
};
