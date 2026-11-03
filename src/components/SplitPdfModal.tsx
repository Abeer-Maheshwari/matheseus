import React, { useState } from 'react';

interface SplitPdfModalProps {
  title: string;
  qpUrl: string;
  msUrl?: string;
  initialMode?: 'split' | 'single';
  onClose: () => void;
}

export const SplitPdfModal: React.FC<SplitPdfModalProps> = ({
  title,
  qpUrl,
  msUrl,
  initialMode = 'split',
  onClose,
}) => {
  const [mode, setMode] = useState<'split' | 'qp' | 'ms'>(
    !msUrl ? 'qp' : initialMode === 'split' ? 'split' : 'qp'
  );
  const [swapped, setSwapped] = useState(false);

  const leftUrl = swapped ? (msUrl || qpUrl) : qpUrl;
  const rightUrl = swapped ? qpUrl : (msUrl || qpUrl);

  const leftLabel = swapped ? 'Mark Scheme' : 'Question Paper';
  const rightLabel = swapped ? 'Question Paper' : 'Mark Scheme';

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black text-zinc-100">
      {/* Top Header */}
      <div className="h-12 px-4 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between gap-4 shrink-0">
        <div className="font-semibold text-sm text-white truncate">
          {title}
        </div>

        {/* View Switcher */}
        {msUrl && (
          <div className="flex items-center bg-zinc-900 p-0.5 rounded border border-zinc-800 text-xs">
            <button
              onClick={() => setMode('split')}
              className={`px-3 py-1 rounded font-medium ${
                mode === 'split' ? 'bg-zinc-800 text-white font-semibold' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Split View
            </button>
            <button
              onClick={() => setMode('qp')}
              className={`px-3 py-1 rounded font-medium ${
                mode === 'qp' ? 'bg-zinc-800 text-white font-semibold' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Question Paper
            </button>
            <button
              onClick={() => setMode('ms')}
              className={`px-3 py-1 rounded font-medium ${
                mode === 'ms' ? 'bg-zinc-800 text-white font-semibold' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Mark Scheme
            </button>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2 text-xs">
          {mode === 'split' && msUrl && (
            <button
              onClick={() => setSwapped(!swapped)}
              className="px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800"
            >
              Swap Sides
            </button>
          )}

          <button
            onClick={onClose}
            className="px-3 py-1 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800"
          >
            Close
          </button>
        </div>
      </div>

      {/* PDF Viewports */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {mode === 'split' && msUrl ? (
          <>
            {/* Left Viewer */}
            <div className="flex-1 flex flex-col h-1/2 md:h-full border-b md:border-b-0 md:border-r border-zinc-800">
              <div className="h-7 px-3 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between text-xs font-medium text-zinc-300">
                <span>{leftLabel}</span>
                <a
                  href={leftUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-white text-[11px] underline"
                >
                  Open in New Tab
                </a>
              </div>
              <iframe
                src={leftUrl}
                className="w-full flex-1 bg-zinc-950 border-none"
                title={leftLabel}
              />
            </div>

            {/* Right Viewer */}
            <div className="flex-1 flex flex-col h-1/2 md:h-full">
              <div className="h-7 px-3 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between text-xs font-medium text-zinc-300">
                <span>{rightLabel}</span>
                <a
                  href={rightUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-white text-[11px] underline"
                >
                  Open in New Tab
                </a>
              </div>
              <iframe
                src={rightUrl}
                className="w-full flex-1 bg-zinc-950 border-none"
                title={rightLabel}
              />
            </div>
          </>
        ) : (
          /* Single Viewer */
          <div className="flex-1 flex flex-col h-full">
            <div className="h-7 px-3 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between text-xs font-medium text-zinc-300">
              <span>{mode === 'ms' && msUrl ? 'Mark Scheme' : 'Question Paper'}</span>
              <a
                href={mode === 'ms' && msUrl ? msUrl : qpUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-white text-[11px] underline"
              >
                Open in New Tab
              </a>
            </div>
            <iframe
              src={mode === 'ms' && msUrl ? msUrl : qpUrl}
              className="w-full flex-1 bg-zinc-950 border-none"
              title={title}
            />
          </div>
        )}
      </div>
    </div>
  );
};
