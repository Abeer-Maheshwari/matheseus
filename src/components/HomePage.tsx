import React from 'react';

interface HomePageProps {
  onSelectSubject: (subject: 'maths' | 'further-maths', moduleId?: string) => void;
  onOpenFormulas: () => void;
  onOpenBoundaries: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onSelectSubject,
  onOpenFormulas,
  onOpenBoundaries,
}) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Intro */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
          matheseus
        </h1>
        <p className="text-sm text-zinc-400">
          Instant, self-hosted Edexcel A Level Mathematics and Further Mathematics past papers.
        </p>
      </div>

      {/* Main Subjects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        {/* A Level Maths */}
        <div className="border border-zinc-800 rounded-lg p-5 bg-zinc-950 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-base font-bold text-white">A Level Mathematics</h2>
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-800">
                9MA0
              </span>
            </div>
            <p className="text-xs text-zinc-400 mb-4">
              All 3 linear exam papers from June 2018 through 2024.
            </p>

            <div className="space-y-1.5 mb-6 text-xs">
              <button
                onClick={() => onSelectSubject('maths', 'p1')}
                className="w-full text-left px-3 py-2 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 flex justify-between items-center"
              >
                <span>Pure Mathematics 1 (9MA0/01)</span>
                <span className="text-zinc-500 font-mono">2018–2024</span>
              </button>
              <button
                onClick={() => onSelectSubject('maths', 'p2')}
                className="w-full text-left px-3 py-2 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 flex justify-between items-center"
              >
                <span>Pure Mathematics 2 (9MA0/02)</span>
                <span className="text-zinc-500 font-mono">2018–2024</span>
              </button>
              <button
                onClick={() => onSelectSubject('maths', 'p3')}
                className="w-full text-left px-3 py-2 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 flex justify-between items-center"
              >
                <span>Statistics & Mechanics (9MA0/03)</span>
                <span className="text-zinc-500 font-mono">2018–2024</span>
              </button>
            </div>
          </div>

          <button
            onClick={() => onSelectSubject('maths')}
            className="w-full py-2 bg-white hover:bg-zinc-200 text-black font-semibold rounded text-xs text-center"
          >
            Browse All Maths Papers
          </button>
        </div>

        {/* A Level Further Maths */}
        <div className="border border-zinc-800 rounded-lg p-5 bg-zinc-950 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-base font-bold text-white">Further Mathematics</h2>
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-800">
                9FM0
              </span>
            </div>
            <p className="text-xs text-zinc-400 mb-4">
              All 10 modules (Core Pure 1/2, FP1/2, Stats 1/2, Mech 1/2, Decision 1/2).
            </p>

            <div className="space-y-1.5 mb-6 text-xs">
              <button
                onClick={() => onSelectSubject('further-maths', 'cp1')}
                className="w-full text-left px-3 py-1.5 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 flex justify-between items-center"
              >
                <span>Core Pure 1 (9FM0/01)</span>
                <span className="text-zinc-500 font-mono">2019–2025</span>
              </button>
              <button
                onClick={() => onSelectSubject('further-maths', 'cp2')}
                className="w-full text-left px-3 py-1.5 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 flex justify-between items-center"
              >
                <span>Core Pure 2 (9FM0/02)</span>
                <span className="text-zinc-500 font-mono">2019–2025</span>
              </button>
              <button
                onClick={() => onSelectSubject('further-maths', 'fp1')}
                className="w-full text-left px-3 py-1.5 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 flex justify-between items-center"
              >
                <span>Further Pure 1 & 2 (FP1 / FP2)</span>
                <span className="text-zinc-500 font-mono">Options</span>
              </button>
              <button
                onClick={() => onSelectSubject('further-maths', 'fm1')}
                className="w-full text-left px-3 py-1.5 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 flex justify-between items-center"
              >
                <span>Further Mechanics 1 & 2 (FM1 / FM2)</span>
                <span className="text-zinc-500 font-mono">Options</span>
              </button>
              <button
                onClick={() => onSelectSubject('further-maths', 'fs1')}
                className="w-full text-left px-3 py-1.5 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 flex justify-between items-center"
              >
                <span>Further Statistics 1 & 2 (FS1 / FS2)</span>
                <span className="text-zinc-500 font-mono">Options</span>
              </button>
              <button
                onClick={() => onSelectSubject('further-maths', 'd1')}
                className="w-full text-left px-3 py-1.5 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 flex justify-between items-center"
              >
                <span>Decision 1 & 2 (D1 / D2)</span>
                <span className="text-zinc-500 font-mono">Options</span>
              </button>
            </div>
          </div>

          <button
            onClick={() => onSelectSubject('further-maths')}
            className="w-full py-2 bg-white hover:bg-zinc-200 text-black font-semibold rounded text-xs text-center"
          >
            Browse All 10 FM Modules
          </button>
        </div>
      </div>

      {/* Quick Tools */}
      <div className="grid grid-cols-2 gap-3 text-xs">
        <button
          onClick={onOpenBoundaries}
          className="p-3.5 rounded-lg border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-left transition-colors"
        >
          <div className="font-semibold text-white mb-0.5">Grade Boundaries</div>
          <div className="text-zinc-400 text-[11px]">Official Edexcel raw mark cutoffs (2018–2024)</div>
        </button>

        <button
          onClick={onOpenFormulas}
          className="p-3.5 rounded-lg border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-left transition-colors"
        >
          <div className="font-semibold text-white mb-0.5">Formula Booklets</div>
          <div className="text-zinc-400 text-[11px]">Formula sheet reference and Pearson PDFs</div>
        </button>
      </div>
    </div>
  );
};
