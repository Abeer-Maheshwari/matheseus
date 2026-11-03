import React, { useState } from 'react';
import { Columns, FileText, ArrowLeftRight, ExternalLink, X, BookOpen } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 flex flex-col bg-[#2C2620] text-[#FAF6F0]">
      {/* Top Header */}
      <div className="h-14 px-4 bg-[#3E362E] border-b border-[#93785B]/30 flex items-center justify-between gap-4 shrink-0 shadow-md">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-7 h-7 rounded-lg bg-[#2C2620] border border-[#93785B]/40 flex items-center justify-center text-[#865D36] shrink-0">
            <Columns size={15} />
          </div>
          <div className="font-serif font-semibold text-sm text-[#FAF6F0] truncate">
            {title}
          </div>
        </div>

        {/* View Switcher Tabs */}
        {msUrl && (
          <div className="flex items-center bg-[#2C2620] p-1 rounded-lg border border-[#93785B]/30 text-xs">
            <button
              onClick={() => setMode('split')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md font-medium transition-colors ${
                mode === 'split'
                  ? 'bg-[#865D36] text-[#FAF6F0] font-semibold'
                  : 'text-[#AC8968] hover:text-[#FAF6F0]'
              }`}
            >
              <Columns size={13} />
              <span>Split View</span>
            </button>
            <button
              onClick={() => setMode('qp')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md font-medium transition-colors ${
                mode === 'qp'
                  ? 'bg-[#865D36] text-[#FAF6F0] font-semibold'
                  : 'text-[#AC8968] hover:text-[#FAF6F0]'
              }`}
            >
              <FileText size={13} />
              <span>Question Paper</span>
            </button>
            <button
              onClick={() => setMode('ms')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md font-medium transition-colors ${
                mode === 'ms'
                  ? 'bg-[#865D36] text-[#FAF6F0] font-semibold'
                  : 'text-[#AC8968] hover:text-[#FAF6F0]'
              }`}
            >
              <BookOpen size={13} />
              <span>Mark Scheme</span>
            </button>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2 text-xs">
          {mode === 'split' && msUrl && (
            <button
              onClick={() => setSwapped(!swapped)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#2C2620] hover:bg-[#865D36] text-[#FAF6F0] border border-[#93785B]/40 transition-colors"
              title="Swap left and right panels"
            >
              <ArrowLeftRight size={13} />
              <span className="hidden sm:inline">Swap Sides</span>
            </button>
          )}

          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2C2620] hover:bg-[#865D36] text-[#FAF6F0] border border-[#93785B]/40 transition-colors"
          >
            <X size={14} />
            <span>Close</span>
          </button>
        </div>
      </div>

      {/* PDF Viewports */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {mode === 'split' && msUrl ? (
          <>
            {/* Left Viewer */}
            <div className="flex-1 flex flex-col h-1/2 md:h-full border-b md:border-b-0 md:border-r border-[#93785B]/30">
              <div className="h-8 px-3.5 bg-[#2C2620] border-b border-[#93785B]/25 flex items-center justify-between text-xs font-semibold text-[#FAF6F0]">
                <span className="flex items-center gap-1.5 text-[#FAF6F0]">
                  <FileText size={13} className="text-[#865D36]" />
                  {leftLabel}
                </span>
                <a
                  href={leftUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[#AC8968] hover:text-[#FAF6F0] text-[11px] transition-colors"
                >
                  <span>Open in Tab</span>
                  <ExternalLink size={11} />
                </a>
              </div>
              <iframe
                src={leftUrl}
                className="w-full flex-1 bg-[#2C2620] border-none"
                title={leftLabel}
              />
            </div>

            {/* Right Viewer */}
            <div className="flex-1 flex flex-col h-1/2 md:h-full">
              <div className="h-8 px-3.5 bg-[#2C2620] border-b border-[#93785B]/25 flex items-center justify-between text-xs font-semibold text-[#FAF6F0]">
                <span className="flex items-center gap-1.5 text-[#FAF6F0]">
                  <BookOpen size={13} className="text-[#AC8968]" />
                  {rightLabel}
                </span>
                <a
                  href={rightUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[#AC8968] hover:text-[#FAF6F0] text-[11px] transition-colors"
                >
                  <span>Open in Tab</span>
                  <ExternalLink size={11} />
                </a>
              </div>
              <iframe
                src={rightUrl}
                className="w-full flex-1 bg-[#2C2620] border-none"
                title={rightLabel}
              />
            </div>
          </>
        ) : (
          /* Single Viewer */
          <div className="flex-1 flex flex-col h-full">
            <div className="h-8 px-3.5 bg-[#2C2620] border-b border-[#93785B]/25 flex items-center justify-between text-xs font-semibold text-[#FAF6F0]">
              <span className="flex items-center gap-1.5 text-[#FAF6F0]">
                <FileText size={13} className="text-[#865D36]" />
                {mode === 'ms' && msUrl ? 'Mark Scheme' : 'Question Paper'}
              </span>
              <a
                href={mode === 'ms' && msUrl ? msUrl : qpUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[#AC8968] hover:text-[#FAF6F0] text-[11px] transition-colors"
              >
                <span>Open in Tab</span>
                <ExternalLink size={11} />
              </a>
            </div>
            <iframe
              src={mode === 'ms' && msUrl ? msUrl : qpUrl}
              className="w-full flex-1 bg-[#2C2620] border-none"
              title={title}
            />
          </div>
        )}
      </div>
    </div>
  );
};
