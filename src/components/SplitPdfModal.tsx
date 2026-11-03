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

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#0F1729] text-[#E8ECF4]">
      {/* Top Header */}
      <div className="h-14 px-4 bg-[#1A2540] border-b border-[#6382BF]/25 flex items-center justify-between gap-4 shrink-0 shadow-md">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-7 h-7 rounded-lg bg-[#0A1020] border border-[#6382BF]/40 flex items-center justify-center text-[#4A7BF7] shrink-0">
            <Columns size={15} />
          </div>
          <div className="font-serif font-semibold text-sm text-[#E8ECF4] truncate">
            {title}
          </div>
        </div>

        {/* View Switcher Tabs */}
        {msUrl && (
          <div className="flex items-center bg-[#0A1020] p-1 rounded-lg border border-[#6382BF]/30 text-xs">
            <button
              onClick={() => setMode('split')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md font-medium transition-colors ${
                mode === 'split'
                  ? 'bg-[#4A7BF7] text-white font-semibold shadow-sm'
                  : 'text-[#7B8FAD] hover:text-[#E8ECF4]'
              }`}
            >
              <Columns size={13} />
              <span>Split View</span>
            </button>
            <button
              onClick={() => setMode('qp')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md font-medium transition-colors ${
                mode === 'qp'
                  ? 'bg-[#4A7BF7] text-white font-semibold shadow-sm'
                  : 'text-[#7B8FAD] hover:text-[#E8ECF4]'
              }`}
            >
              <FileText size={13} />
              <span>Question Paper</span>
            </button>
            <button
              onClick={() => setMode('ms')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md font-medium transition-colors ${
                mode === 'ms'
                  ? 'bg-[#4A7BF7] text-white font-semibold shadow-sm'
                  : 'text-[#7B8FAD] hover:text-[#E8ECF4]'
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
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#0A1020] hover:bg-[#4A7BF7] hover:text-white text-[#E8ECF4] border border-[#6382BF]/40 transition-colors"
              title="Swap left and right panels without reloading"
            >
              <ArrowLeftRight size={13} />
              <span className="hidden sm:inline">Swap Sides</span>
            </button>
          )}

          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0A1020] hover:bg-[#4A7BF7] hover:text-white text-[#E8ECF4] border border-[#6382BF]/40 transition-colors"
          >
            <X size={14} />
            <span>Close</span>
          </button>
        </div>
      </div>

      {/* PDF Viewports Container */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        {/* Question Paper Container:
            Persistently mounted so drawings, annotations, and scroll positions are never lost */}
        <div
          className={`flex flex-col overflow-hidden transition-none ${
            mode === 'ms'
              ? 'absolute -left-[99999px] -top-[99999px] w-1 h-1 overflow-hidden opacity-0 pointer-events-none'
              : mode === 'split' && msUrl
              ? `flex-1 h-1/2 md:h-full relative ${
                  swapped ? 'order-2' : 'order-1'
                } ${
                  !swapped ? 'border-b md:border-b-0 md:border-r border-[#6382BF]/25' : ''
                }`
              : 'flex-1 w-full h-full relative order-1'
          }`}
        >
          <div className="h-8 px-3.5 bg-[#1A2540] border-b border-[#6382BF]/25 flex items-center justify-between text-xs font-semibold text-[#E8ECF4] shrink-0">
            <span className="flex items-center gap-1.5 text-[#E8ECF4]">
              <FileText size={13} className="text-[#4A7BF7]" />
              Question Paper
            </span>
            <a
              href={qpUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[#7B8FAD] hover:text-[#E8ECF4] text-[11px] transition-colors"
            >
              <span>Open in Tab</span>
              <ExternalLink size={11} />
            </a>
          </div>
          <iframe
            src={qpUrl}
            className="w-full flex-1 bg-[#0F1729] border-none"
            title={`${title} - Question Paper`}
          />
        </div>

        {/* Mark Scheme Container:
            Persistently mounted alongside QP so neither resets when toggling modes */}
        {msUrl && (
          <div
            className={`flex flex-col overflow-hidden transition-none ${
              mode === 'qp'
                ? 'absolute -left-[99999px] -top-[99999px] w-1 h-1 overflow-hidden opacity-0 pointer-events-none'
                : mode === 'split'
                ? `flex-1 h-1/2 md:h-full relative ${
                    swapped ? 'order-1' : 'order-2'
                  } ${
                    swapped ? 'border-b md:border-b-0 md:border-r border-[#6382BF]/25' : ''
                  }`
                : 'flex-1 w-full h-full relative order-1'
            }`}
          >
            <div className="h-8 px-3.5 bg-[#1A2540] border-b border-[#6382BF]/25 flex items-center justify-between text-xs font-semibold text-[#E8ECF4] shrink-0">
              <span className="flex items-center gap-1.5 text-[#E8ECF4]">
                <BookOpen size={13} className="text-[#4A7BF7]" />
                Mark Scheme
              </span>
              <a
                href={msUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[#7B8FAD] hover:text-[#E8ECF4] text-[11px] transition-colors"
              >
                <span>Open in Tab</span>
                <ExternalLink size={11} />
              </a>
            </div>
            <iframe
              src={msUrl}
              className="w-full flex-1 bg-[#0F1729] border-none"
              title={`${title} - Mark Scheme`}
            />
          </div>
        )}
      </div>
    </div>
  );
};
