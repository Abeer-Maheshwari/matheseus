import React, { useState } from 'react';
import { PastPaper } from '../types';

interface SplitPdfModalProps {
  paper: PastPaper;
  initialMode?: 'split' | 'qp' | 'ms' | 'er' | 'ma';
  onClose: () => void;
  onSaveScore: (paperId: string, score: number, maxScore: number) => void;
  currentScore?: number;
}

export const SplitPdfModal: React.FC<SplitPdfModalProps> = ({
  paper,
  initialMode = 'split',
  onClose,
  onSaveScore,
  currentScore,
}) => {
  const [viewMode, setViewMode] = useState<'split' | 'qp' | 'ms' | 'er' | 'ma'>(initialMode);
  const [swapped, setSwapped] = useState(false);
  const [userScore, setUserScore] = useState<string>(currentScore !== undefined ? String(currentScore) : '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const getDocUrl = (type: 'qp' | 'ms' | 'er' | 'ma') => {
    switch (type) {
      case 'qp': return paper.qpUrl;
      case 'ms': return paper.msUrl;
      case 'er': return paper.erUrl || paper.msUrl;
      case 'ma': return paper.modelAnswersUrl || paper.msUrl;
    }
  };

  const handleSaveScore = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseFloat(userScore);
    if (!isNaN(num) && num >= 0 && num <= paper.maxMarks) {
      onSaveScore(paper.id, num, paper.maxMarks);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2500);
    }
  };

  const leftDoc = swapped ? 'ms' : 'qp';
  const rightDoc = swapped ? 'qp' : 'ms';

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black text-zinc-100">
      {/* Top Bar Navigation */}
      <div className="h-12 px-4 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <span className="font-mono text-xs px-2 py-0.5 rounded font-semibold bg-zinc-800 text-zinc-300">
            {paper.code}
          </span>
          <span className="font-semibold text-sm text-white truncate">
            {paper.title} ({paper.season} {paper.year})
          </span>
        </div>

        {/* Center: View Switcher */}
        <div className="hidden md:flex items-center bg-zinc-900 p-0.5 rounded border border-zinc-800 text-xs">
          <button
            onClick={() => setViewMode('split')}
            className={`px-3 py-1 rounded font-medium ${
              viewMode === 'split' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Split View
          </button>
          <button
            onClick={() => setViewMode('qp')}
            className={`px-3 py-1 rounded font-medium ${
              viewMode === 'qp' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Question Paper
          </button>
          <button
            onClick={() => setViewMode('ms')}
            className={`px-3 py-1 rounded font-medium ${
              viewMode === 'ms' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Mark Scheme
          </button>
          {paper.modelAnswersUrl && (
            <button
              onClick={() => setViewMode('ma')}
              className={`px-3 py-1 rounded font-medium ${
                viewMode === 'ma' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Model Answer
            </button>
          )}
          {paper.erUrl && (
            <button
              onClick={() => setViewMode('er')}
              className={`px-3 py-1 rounded font-medium ${
                viewMode === 'er' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Examiner Report
            </button>
          )}
        </div>

        {/* Right side: Swap & Close */}
        <div className="flex items-center gap-2 text-xs">
          {viewMode === 'split' && (
            <button
              onClick={() => setSwapped(!swapped)}
              className="px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800"
            >
              Swap Left / Right
            </button>
          )}

          <button
            onClick={onClose}
            className="px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800"
          >
            Close (Esc)
          </button>
        </div>
      </div>

      {/* External Direct Links bar */}
      <div className="bg-zinc-900/90 border-b border-zinc-800 px-4 py-1.5 text-xs text-zinc-400 flex items-center justify-between">
        <span>If embedded PDF preview is restricted by browser settings, use direct links:</span>
        <div className="flex items-center gap-4">
          <a
            href={paper.qpUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-300 hover:text-white underline"
          >
            Open Question Paper in Tab
          </a>
          <a
            href={paper.msUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-300 hover:text-white underline"
          >
            Open Mark Scheme in Tab
          </a>
        </div>
      </div>

      {/* PDF Viewports */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {viewMode === 'split' ? (
          <>
            <div className="flex-1 flex flex-col h-1/2 md:h-full border-b md:border-b-0 md:border-r border-zinc-800">
              <div className="h-7 px-3 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between text-xs font-medium text-zinc-300">
                <span>{leftDoc === 'qp' ? 'Question Paper' : 'Mark Scheme'}</span>
                <a
                  href={getDocUrl(leftDoc)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-white text-[11px]"
                >
                  Open in New Tab
                </a>
              </div>
              <iframe
                src={getDocUrl(leftDoc)}
                className="w-full flex-1 bg-zinc-950 border-none"
                title={`${paper.code} Left`}
              />
            </div>

            <div className="flex-1 flex flex-col h-1/2 md:h-full">
              <div className="h-7 px-3 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between text-xs font-medium text-zinc-300">
                <span>{rightDoc === 'qp' ? 'Question Paper' : 'Mark Scheme'}</span>
                <a
                  href={getDocUrl(rightDoc)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-white text-[11px]"
                >
                  Open in New Tab
                </a>
              </div>
              <iframe
                src={getDocUrl(rightDoc)}
                className="w-full flex-1 bg-zinc-950 border-none"
                title={`${paper.code} Right`}
              />
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col h-full">
            <div className="h-7 px-3 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between text-xs font-medium text-zinc-300">
              <span>
                {viewMode === 'qp' && 'Question Paper'}
                {viewMode === 'ms' && 'Mark Scheme'}
                {viewMode === 'er' && 'Examiner Report'}
                {viewMode === 'ma' && 'Model Answer'}
              </span>
              <a
                href={getDocUrl(viewMode)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-white text-[11px]"
              >
                Open in New Tab
              </a>
            </div>
            <iframe
              src={getDocUrl(viewMode)}
              className="w-full flex-1 bg-zinc-950 border-none"
              title={`${paper.code} ${viewMode}`}
            />
          </div>
        )}
      </div>

      {/* Bottom Bar: Score Logging */}
      <div className="bg-zinc-950 border-t border-zinc-800 px-4 py-2 flex items-center justify-between text-xs shrink-0">
        <form onSubmit={handleSaveScore} className="flex items-center gap-2">
          <span className="text-zinc-400">Log Mark:</span>
          <input
            type="number"
            min="0"
            max={paper.maxMarks}
            value={userScore}
            onChange={(e) => setUserScore(e.target.value)}
            placeholder="Score"
            className="w-16 px-2 py-1 bg-zinc-900 border border-zinc-700 rounded text-center text-white font-mono"
          />
          <span className="text-zinc-400 font-mono">/ {paper.maxMarks}</span>
          <button
            type="submit"
            className="px-2.5 py-1 bg-white hover:bg-zinc-200 text-black font-semibold rounded"
          >
            Save Mark
          </button>
          {savedSuccess && (
            <span className="text-zinc-300 font-medium ml-2">Saved.</span>
          )}
        </form>

        <div className="text-zinc-400">
          Max Marks: <span className="text-zinc-200 font-mono">{paper.maxMarks}</span> | Duration: <span className="text-zinc-200 font-mono">{paper.durationMinutes}m</span>
        </div>
      </div>
    </div>
  );
};
