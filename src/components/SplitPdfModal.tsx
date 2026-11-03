import React, { useState } from 'react';
import { 
  X, 
  Columns, 
  ExternalLink, 
  Download, 
  Maximize2, 
  RotateCw, 
  CheckCircle2, 
  Award,
  AlertTriangle,
  FileText
} from 'lucide-react';
import confetti from 'canvas-confetti';
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
      if (num >= paper.maxMarks * 0.7) {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.8 }
        });
      }
      setTimeout(() => setSavedSuccess(false), 3000);
    }
  };

  const leftDoc = swapped ? 'ms' : 'qp';
  const rightDoc = swapped ? 'qp' : 'ms';

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-950/95 backdrop-blur-xl animate-fade-in text-slate-100">
      {/* Top Bar Navigation */}
      <div className="h-14 px-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <span className="font-mono text-xs px-2.5 py-0.5 rounded font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            {paper.code}
          </span>
          <h2 className="font-bold text-sm sm:text-base text-white truncate">
            {paper.title} ({paper.season} {paper.year})
          </h2>
        </div>

        {/* Center: View Switcher */}
        <div className="hidden md:flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setViewMode('split')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition ${
              viewMode === 'split' 
                ? 'bg-indigo-600 text-white shadow' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Columns className="w-3.5 h-3.5" />
            <span>Split View</span>
          </button>
          <button
            onClick={() => setViewMode('qp')}
            className={`px-3 py-1.5 rounded-lg font-medium transition ${
              viewMode === 'qp' 
                ? 'bg-indigo-600 text-white shadow' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            QP Only
          </button>
          <button
            onClick={() => setViewMode('ms')}
            className={`px-3 py-1.5 rounded-lg font-medium transition ${
              viewMode === 'ms' 
                ? 'bg-indigo-600 text-white shadow' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            MS Only
          </button>
          {paper.modelAnswersUrl && (
            <button
              onClick={() => setViewMode('ma')}
              className={`px-3 py-1.5 rounded-lg font-medium transition ${
                viewMode === 'ma' 
                  ? 'bg-indigo-600 text-white shadow' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Model Ans
            </button>
          )}
          {paper.erUrl && (
            <button
              onClick={() => setViewMode('er')}
              className={`px-3 py-1.5 rounded-lg font-medium transition ${
                viewMode === 'er' 
                  ? 'bg-indigo-600 text-white shadow' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Report
            </button>
          )}
        </div>

        {/* Right side: Swap sides & Close button */}
        <div className="flex items-center gap-2">
          {viewMode === 'split' && (
            <button
              onClick={() => setSwapped(!swapped)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition"
              title="Swap Left & Right Documents"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Swap Sides</span>
            </button>
          )}

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            title="Close Viewer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Notice bar for External Direct Open if browser PDF sandbox blocks iFrame */}
      <div className="bg-slate-900/60 border-b border-slate-800/80 px-4 py-1.5 text-xs text-slate-400 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>If the preview doesn't render in your browser, open or download directly:</span>
        </div>
        <div className="flex items-center gap-3">
          <a
            href={paper.qpUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1 underline font-medium"
          >
            <ExternalLink className="w-3 h-3" /> Question Paper
          </a>
          <a
            href={paper.msUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 underline font-medium"
          >
            <ExternalLink className="w-3 h-3" /> Mark Scheme
          </a>
        </div>
      </div>

      {/* Main PDF View Area */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        {viewMode === 'split' ? (
          <>
            {/* Left Frame */}
            <div className="flex-1 flex flex-col h-1/2 md:h-full border-b md:border-b-0 md:border-r border-slate-800">
              <div className="h-8 px-3 bg-slate-900/90 flex items-center justify-between text-xs font-semibold text-slate-300">
                <span>{leftDoc === 'qp' ? '📄 Question Paper' : '📝 Mark Scheme'}</span>
                <a
                  href={getDocUrl(leftDoc)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white"
                >
                  <ExternalLink className="w-3 h-3" /> Open In Tab
                </a>
              </div>
              <iframe
                src={getDocUrl(leftDoc)}
                className="w-full flex-1 bg-slate-900 border-none"
                title={`${paper.code} ${leftDoc.toUpperCase()}`}
              />
            </div>

            {/* Right Frame */}
            <div className="flex-1 flex flex-col h-1/2 md:h-full">
              <div className="h-8 px-3 bg-slate-900/90 flex items-center justify-between text-xs font-semibold text-slate-300">
                <span>{rightDoc === 'qp' ? '📄 Question Paper' : '📝 Mark Scheme'}</span>
                <a
                  href={getDocUrl(rightDoc)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white"
                >
                  <ExternalLink className="w-3 h-3" /> Open In Tab
                </a>
              </div>
              <iframe
                src={getDocUrl(rightDoc)}
                className="w-full flex-1 bg-slate-900 border-none"
                title={`${paper.code} ${rightDoc.toUpperCase()}`}
              />
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col h-full">
            <div className="h-8 px-3 bg-slate-900/90 flex items-center justify-between text-xs font-semibold text-slate-300">
              <span>
                {viewMode === 'qp' && '📄 Question Paper'}
                {viewMode === 'ms' && '📝 Mark Scheme'}
                {viewMode === 'er' && "📊 Examiner's Report"}
                {viewMode === 'ma' && '💡 Model Answers & Worked Solutions'}
              </span>
              <a
                href={getDocUrl(viewMode)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white"
              >
                <ExternalLink className="w-3 h-3" /> Open In Tab
              </a>
            </div>
            <iframe
              src={getDocUrl(viewMode)}
              className="w-full flex-1 bg-slate-900 border-none"
              title={`${paper.code} ${viewMode.toUpperCase()}`}
            />
          </div>
        )}
      </div>

      {/* Bottom Floating Bar: Quick Score Logger */}
      <div className="bg-slate-900 border-t border-slate-800 px-4 py-2 flex flex-wrap items-center justify-between gap-3 text-xs shrink-0">
        <form onSubmit={handleSaveScore} className="flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="font-medium text-slate-300">Log Your Mark:</span>
          <input
            type="number"
            min="0"
            max={paper.maxMarks}
            value={userScore}
            onChange={(e) => setUserScore(e.target.value)}
            placeholder="Score"
            className="w-16 px-2 py-1 bg-slate-950 border border-slate-700 rounded text-center text-white focus:outline-none focus:border-indigo-500 font-mono"
          />
          <span className="text-slate-400 font-mono">/ {paper.maxMarks}</span>
          <button
            type="submit"
            className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded font-medium transition active:scale-95"
          >
            Save Result
          </button>
          {savedSuccess && (
            <span className="text-emerald-400 flex items-center gap-1 font-semibold animate-pulse">
              <CheckCircle2 className="w-3.5 h-3.5" /> Saved!
            </span>
          )}
        </form>

        <div className="text-slate-400 hidden sm:block">
          Duration: <span className="text-slate-200 font-semibold">{paper.durationMinutes} mins</span>
        </div>
      </div>
    </div>
  );
};
