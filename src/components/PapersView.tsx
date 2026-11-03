import React, { useState } from 'react';
import { MODULES_DATA } from '../data/papersData';
import { 
  BookOpen, 
  Columns, 
  Sparkles, 
  CheckCircle2, 
  FileText, 
  Search, 
  Check, 
  GraduationCap, 
  Layers, 
  ExternalLink 
} from 'lucide-react';

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
  const [searchTerm, setSearchTerm] = useState('');

  const availableModules = MODULES_DATA.filter((m) => m.subject === currentSubject);
  const activeModule = availableModules.find((m) => m.id === activeModuleId) || availableModules[0];

  const filteredPapers = activeModule.papers.filter((paper) => {
    if (!searchTerm.trim()) return true;
    const q = searchTerm.toLowerCase();
    return (
      paper.year.toString().includes(q) ||
      paper.season.toLowerCase().includes(q) ||
      (paper.paperNumber ? paper.paperNumber.toLowerCase().includes(q) : false)
    );
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      {/* Subject Selector Tabs */}
      <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
        <button
          onClick={() => {
            onSelectSubject('maths');
            onSelectModule('p1');
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
            currentSubject === 'maths'
              ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-500/20'
              : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700'
          }`}
        >
          <GraduationCap size={16} />
          <span>A Level Maths (9MA0)</span>
        </button>

        <button
          onClick={() => {
            onSelectSubject('further-maths');
            onSelectModule('cp1');
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
            currentSubject === 'further-maths'
              ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/20'
              : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700'
          }`}
        >
          <Layers size={16} />
          <span>Further Maths (9FM0)</span>
        </button>
      </div>

      {/* Subsections: Module Navigation Pills */}
      <div className="space-y-2">
        <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
          <BookOpen size={13} className="text-sky-400" />
          <span>Choose Module Specification:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {availableModules.map((m) => {
            const isSelected = m.id === activeModule.id;
            return (
              <button
                key={m.id}
                onClick={() => onSelectModule(m.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                  isSelected
                    ? 'bg-sky-950/80 text-sky-300 border-sky-500 shadow-sm font-semibold'
                    : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
                }`}
              >
                <span>{m.title}</span>
                <span className="font-mono text-[11px] px-1.5 py-0.2 rounded bg-slate-950 border border-slate-800 text-slate-400">
                  {m.code}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Module Overview Card & Search */}
      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <span>{activeModule.title}</span>
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-sky-950 text-sky-400 border border-sky-800/60 font-semibold">
              {activeModule.code}
            </span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Archive of official Edexcel examination past papers, mark schemes, and examiner reports.
          </p>
        </div>

        <div className="relative min-w-56">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search papers by year or season..."
            className="w-full pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
          />
        </div>
      </div>

      {/* Papers Table */}
      <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900/40 shadow-md">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-900/90 text-slate-400 text-[11px] font-semibold uppercase tracking-wider">
              <th className="py-3 px-4">Exam Series</th>
              <th className="py-3 px-4 text-center">Website Mode</th>
              <th className="py-3 px-4 text-center">PDF (Split View)</th>
              <th className="py-3 px-4 text-center">Reports</th>
              <th className="py-3 px-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80">
            {filteredPapers.map((paper) => {
              const isDone = !!completedMap[paper.id];
              const paperTitle = `${activeModule.title} (${paper.season} ${paper.year})`;

              return (
                <tr key={paper.id} className="hover:bg-slate-850/50 transition-colors">
                  {/* Series */}
                  <td className="py-3 px-4 font-medium text-slate-200">
                    <div className="font-semibold text-white">
                      {paper.season} {paper.year}
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono">
                      {activeModule.code} {paper.paperNumber ? `· ${paper.paperNumber}` : ''}
                    </div>
                  </td>

                  {/* Website Version: Question-by-Question Interactive Mode */}
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => onOpenInteractive(paper.id, paperTitle, activeModule.code)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500/15 hover:bg-sky-500/25 text-sky-300 font-semibold border border-sky-500/40 transition-colors"
                      title="Launch Question-by-Question Website Mode"
                    >
                      <Sparkles size={13} className="text-sky-400" />
                      <span>Web Mode</span>
                    </button>
                  </td>

                  {/* MERGED PDF VERSION + SPLIT VIEW DIRECTLY */}
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => onOpenSplitView(paperTitle, paper.qpUrl, paper.msUrl)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-medium border border-slate-700/80 transition-colors"
                      title="Open Question Paper and Mark Scheme side-by-side"
                    >
                      <Columns size={13} className="text-sky-400" />
                      <span>PDF (Split View)</span>
                    </button>
                  </td>

                  {/* Reports & Model Answers */}
                  <td className="py-3 px-4 text-center">
                    {paper.erUrl ? (
                      <button
                        onClick={() => onOpenSingleDoc(`${paperTitle} — Examiner Report`, paper.erUrl!)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 text-[11px] transition-colors"
                        title="Examiner Report"
                      >
                        <FileText size={11} />
                        <span>Report</span>
                      </button>
                    ) : (
                      <span className="text-slate-600 text-[11px]">—</span>
                    )}
                  </td>

                  {/* Done status */}
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => onToggleCompleted(paper.id)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-colors ${
                        isDone
                          ? 'bg-emerald-950/70 text-emerald-300 border-emerald-600/80 font-semibold'
                          : 'bg-slate-950 text-slate-400 hover:text-slate-200 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {isDone ? (
                        <>
                          <Check size={12} className="text-emerald-400" />
                          <span>Done</span>
                        </>
                      ) : (
                        <span>Mark Done</span>
                      )}
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
