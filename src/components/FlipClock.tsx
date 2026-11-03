import React, { useEffect, useState, useRef } from 'react';
import { Pause, Play, Clock, AlertCircle } from 'lucide-react';

interface FlipClockProps {
  secondsRemaining: number;
  isPaused: boolean;
  onTogglePause?: () => void;
  className?: string;
}

// Single animated text digit slot (Libre font with smooth flip transition, no code font)
const FlipTextDigit: React.FC<{ digit: string }> = ({ digit }) => {
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
      }, 280);
      return () => clearTimeout(timer);
    }
  }, [digit]);

  return (
    <span className="inline-block relative h-[1.3em] w-[0.68em] overflow-hidden align-middle text-center select-none tabular-nums font-semibold">
      {animating ? (
        <>
          <span className="absolute inset-0 flex items-center justify-center flip-digit-exit">
            {previous}
          </span>
          <span className="absolute inset-0 flex items-center justify-center flip-animate-up">
            {current}
          </span>
        </>
      ) : (
        <span className="inline-block w-full">{current}</span>
      )}
    </span>
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
    <div className={`inline-flex items-center gap-2.5 text-sm sm:text-base ${className}`}>
      {/* Clock Icon */}
      <Clock size={15} className={isUrgent ? 'text-[#865D36] animate-pulse' : 'text-[#AC8968]'} />

      {/* Normal Text with Flip Animation in Libre font */}
      <div className={`inline-flex items-center font-bold tracking-wide tabular-nums ${
        isUrgent ? 'text-[#865D36]' : 'text-[#FAF6F0]'
      }`}>
        {hours > 0 && (
          <>
            <FlipTextDigit digit={hStr[0]} />
            <FlipTextDigit digit={hStr[1]} />
            <span className="mx-0.5 opacity-70">:</span>
          </>
        )}
        <FlipTextDigit digit={mStr[0]} />
        <FlipTextDigit digit={mStr[1]} />
        <span className="mx-0.5 opacity-70">:</span>
        <FlipTextDigit digit={sStr[0]} />
        <FlipTextDigit digit={sStr[1]} />
      </div>

      {/* Control Pause / Resume Button */}
      {onTogglePause && (
        <button
          type="button"
          onClick={onTogglePause}
          className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-medium transition-colors bg-[#3E362E] hover:bg-[#865D36] text-[#FAF6F0] border border-[#93785B]/40"
          title={isPaused ? 'Resume exam clock' : 'Pause exam clock'}
        >
          {isPaused ? <Play size={10} className="text-[#AC8968]" /> : <Pause size={10} className="text-[#865D36]" />}
          <span>{isPaused ? 'Resume' : 'Pause'}</span>
        </button>
      )}

      {isUrgent && (
        <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-[#865D36] font-medium">
          <AlertCircle size={11} />
          <span>&lt; 5m</span>
        </span>
      )}
    </div>
  );
};
