import React from 'react';
import { MODULES_DATA, ModuleSection, PaperEntry } from '../data/papersData';

interface PapersViewProps {
  currentSubject: 'maths' | 'further-maths';
  onSelectSubject: (subject: 'maths' | 'further-maths') => void;
  activeModuleId: string;
  onSelectModule: (moduleId: string) => void;
  onOpenSplitView: (title: string, qpUrl: string, msUrl: string) => void;
  onOpenSingleDoc: (title: string, url: string) => void;
  onOpenInteractive: (paperId: string, title: string, code: string) => void;
  completedMap: Record<string, boolean>;
  onToggleCompleted: (paperId: string) => void;
}

export const PapersView: React.FC<PapersViewProps> = ({
  currentSubject,
  onSelectSubject,
  activeModuleId,
  onSelectModule,
  onOpenSplitView,
  onOpenSingleDoc,
  onOpenInteractive,
  completedMap,
  onToggleCompleted,
}) => {
  const availableModules = MODULES_DATA.filter((m) => m.subject === currentSubject);
  const activeModule = availableModules.find((m) => m.id === activeModuleId) || availableModules[0];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Subject Selector */}
      <div className="flex items-center gap-2 border-b border-zinc-800 pb-3 mb-6">
        <button
          onClick={() => {
            onSelectSubject('maths');
            onSelectModule('p1');
          }}
          className={`px-3 py-1.5 rounded text-sm font-semibold transition-colors ${
            currentSubject === 'maths'
              ? 'bg-white text-black'
              : 'text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800'
          }`}
        >
          A Level Maths (9MA0)
        </button>

        <button
          onClick={() => {
            onSelectSubject('further-maths');
            onSelectModule('cp1');
          }}
          className={`px-3 py-1.5 rounded text-sm font-semibold transition-colors ${
            currentSubject === 'further-maths'
              ? 'bg-white text-black'
              : 'text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800'
          }`}
        >
          Further Maths (9FM0)
        </button>
      </div>

      {/* Subsections: Module Navigation */}
      <div className="mb-6">
        <div className="text-xs text-zinc-400 font-medium mb-2 uppercase tracking-wider">
          Select Module:
        </div>
        <div className="flex flex-wrap gap-1.5">
          {availableModules.map((m) => {
            const isSelected = m.id === activeModule.id;
            return (
              <button
                key={m.id}
                onClick={() => onSelectModule(m.id)}
                className={`px-3 py-1.5 rounded text-xs font-medium border transition-colors ${
                  isSelected
                    ? 'bg-zinc-800 text-white border-zinc-600 font-semibold'
                    : 'bg-zinc-950 text-zinc-400 hover:text-zinc-200 border-zinc-800 hover:bg-zinc-900'
                }`}
              >
                <span>{m.title}</span>
                <span className="font-mono text-[10px] ml-1.5 text-zinc-400">({m.code})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Paper List */}
      <div className="border border-zinc-800 rounded-lg overflow-hidden bg-zinc-950">
        <div className="px-4 py-3 border-b border-zinc-800 bg-zinc-900 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white">{activeModule.title}</h3>
            <p className="text-xs text-zinc-400 font-mono">{activeModule.code} past examination papers</p>
          </div>
          <span className="text-xs text-zinc-400 font-mono">
            {activeModule.papers.length} papers
          </span>
        </div>

        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-zinc-800 bg-zinc-900/60 text-zinc-400 text-[11px] font-semibold uppercase tracking-wider">
              <th className="py-2.5 px-4">Series</th>
              <th className="py-2.5 px-4 text-center">Interactive (Web Mode)</th>
              <th className="py-2.5 px-4 text-center">PDF Version</th>
              <th className="py-2.5 px-4 text-center">Split View</th>
              <th className="py-2.5 px-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {activeModule.papers.map((paper) => {
              const isDone = !!completedMap[paper.id];
              const paperTitle = `${activeModule.title} (${paper.season} ${paper.year})`;

              return (
                <tr key={paper.id} className="hover:bg-zinc-900/40 transition-colors">
                  {/* Series */}
                  <td className="py-3 px-4 font-medium text-zinc-200">
                    {paper.season} {paper.year}
                  </td>

                  {/* Website Version: Question by Question mode */}
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => onOpenInteractive(paper.id, paperTitle, activeModule.code)}
                      className="px-3 py-1 rounded bg-zinc-100 hover:bg-white text-black font-semibold border border-zinc-200"
                      title="Launch Question-by-Question Website Mode"
                    >
                      Web Mode
                    </button>
                  </td>

                  {/* PDF Version: QP & MS */}
                  <td className="py-3 px-4 text-center">
                    <div className="inline-flex items-center gap-1.5">
                      <button
                        onClick={() => onOpenSingleDoc(`${paperTitle} — QP`, paper.qpUrl)}
                        className="px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 font-medium"
                        title="View Question Paper PDF"
                      >
                        QP
                      </button>
                      <button
                        onClick={() => onOpenSingleDoc(`${paperTitle} — MS`, paper.msUrl)}
                        className="px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 font-medium"
                        title="View Mark Scheme PDF"
                      >
                        MS
                      </button>
                    </div>
                  </td>

                  {/* Split Screen PDF Button */}
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => onOpenSplitView(paperTitle, paper.qpUrl, paper.msUrl)}
                      className="px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white font-medium border border-zinc-800"
                      title="View Question Paper and Mark Scheme side-by-side"
                    >
                      Split View
                    </button>
                  </td>

                  {/* Done status */}
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => onToggleCompleted(paper.id)}
                      className={`px-2 py-0.5 rounded text-[11px] font-medium border ${
                        isDone
                          ? 'bg-zinc-200 text-black border-zinc-300 font-semibold'
                          : 'bg-zinc-950 text-zinc-400 hover:text-zinc-200 border-zinc-800'
                      }`}
                    >
                      {isDone ? 'Done' : 'Mark Done'}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
