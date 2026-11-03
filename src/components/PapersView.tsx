import React, { useState } from 'react';
import { MODULES_DATA } from '../data/papersData';
import { 
  BookOpen, 
  Columns, 
  Play, 
  FileText, 
  Search, 
  Check, 
  GraduationCap, 
  Layers 
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
      <div className="flex items-center gap-3 border-b border-[#93785B]/30 pb-3">
        <button
          onClick={() => {
            onSelectSubject('maths');
            onSelectModule('p1');
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
            currentSubject === 'maths'
              ? 'bg-[#865D36] text-[#FAF6F0] shadow-sm'
              : 'text-[#AC8968] hover:text-[#FAF6F0] bg-[#3E362E] border border-[#93785B]/30 hover:border-[#93785B]/60'
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
              ? 'bg-[#865D36] text-[#FAF6F0] shadow-sm'
              : 'text-[#AC8968] hover:text-[#FAF6F0] bg-[#3E362E] border border-[#93785B]/30 hover:border-[#93785B]/60'
          }`}
        >
          <Layers size={16} />
          <span>Further Maths (9FM0)</span>
        </button>
      </div>

      {/* Subsections: Module Navigation Pills */}
      <div className="space-y-2">
        <div className="text-xs text-[#AC8968] font-semibold uppercase tracking-wider flex items-center gap-1.5">
          <BookOpen size={13} className="text-[#865D36]" />
          <span>Module:</span>
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
                    ? 'bg-[#3E362E] text-[#FAF6F0] border-[#865D36] shadow-sm font-semibold'
                    : 'bg-[#2C2620] text-[#AC8968] hover:text-[#FAF6F0] border-[#93785B]/30 hover:border-[#93785B]/60'
                }`}
              >
                <span>{m.title}</span>
                <span className="text-[11px] px-1.5 py-0.2 rounded bg-[#2C2620] border border-[#93785B]/40 text-[#A69080]">
                  {m.code}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Module Overview Card & Search */}
      <div className="p-4 rounded-xl bg-[#3E362E] border border-[#93785B]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
        <div>
          <h3 className="text-base font-serif font-bold text-[#FAF6F0] flex items-center gap-2">
            <span>{activeModule.title}</span>
            <span className="text-xs px-2.5 py-0.5 rounded bg-[#2C2620] text-[#865D36] border border-[#93785B]/40 font-semibold">
              {activeModule.code}
            </span>
          </h3>
          <p className="text-xs text-[#AC8968] mt-0.5">
            Past papers and mark schemes.
          </p>
        </div>

        <div className="relative min-w-56">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#AC8968]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by year or season..."
            className="w-full pl-9 pr-3 py-1.5 bg-[#2C2620] border border-[#93785B]/40 rounded-lg text-xs text-[#FAF6F0] placeholder-[#A69080] focus:outline-none focus:border-[#865D36]"
          />
        </div>
      </div>

      {/* Papers Table */}
      <div className="border border-[#93785B]/30 rounded-xl overflow-hidden bg-[#3E362E] shadow-md">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-[#93785B]/25 bg-[#2C2620]/90 text-[#AC8968] text-[11px] font-semibold uppercase tracking-wider">
              <th className="py-3 px-4">Series</th>
              <th className="py-3 px-4 text-center">Practice</th>
              <th className="py-3 px-4 text-center">PDF (Split View)</th>
              <th className="py-3 px-4 text-center">Report</th>
              <th className="py-3 px-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#93785B]/20">
            {filteredPapers.map((paper) => {
              const isDone = !!completedMap[paper.id];
              const paperTitle = `${activeModule.title} (${paper.season} ${paper.year})`;

              return (
                <tr key={paper.id} className="hover:bg-[#2C2620]/50 transition-colors">
                  {/* Series */}
                  <td className="py-3 px-4 font-medium text-[#FAF6F0]">
                    <div className="font-semibold text-[#FAF6F0]">
                      {paper.season} {paper.year}
                    </div>
                    <div className="text-[11px] text-[#A69080]">
                      {activeModule.code} {paper.paperNumber ? `· ${paper.paperNumber}` : ''}
                    </div>
                  </td>

                  {/* Website Version: Question-by-Question Interactive Mode */}
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => onOpenInteractive(paper.id, paperTitle, activeModule.code)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#865D36]/25 hover:bg-[#865D36]/40 text-[#FAF6F0] font-semibold border border-[#865D36]/60 transition-colors"
                      title="Practice questions one by one"
                    >
                      <Play size={13} className="text-[#865D36]" />
                      <span>Practice</span>
                    </button>
                  </td>

                  {/* Merged PDF Version + Split View */}
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => onOpenSplitView(paperTitle, paper.qpUrl, paper.msUrl)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2C2620] hover:bg-[#865D36]/30 text-[#FAF6F0] font-medium border border-[#93785B]/40 transition-colors"
                      title="Open Question Paper and Mark Scheme side-by-side"
                    >
                      <Columns size={13} className="text-[#AC8968]" />
                      <span>PDF (Split View)</span>
                    </button>
                  </td>

                  {/* Reports */}
                  <td className="py-3 px-4 text-center">
                    {paper.erUrl ? (
                      <button
                        onClick={() => onOpenSingleDoc(`${paperTitle} — Examiner Report`, paper.erUrl!)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#2C2620] hover:bg-[#3E362E] text-[#AC8968] hover:text-[#FAF6F0] border border-[#93785B]/30 text-[11px] transition-colors"
                        title="Examiner Report"
                      >
                        <FileText size={11} />
                        <span>Report</span>
                      </button>
                    ) : (
                      <span className="text-[#A69080]/60 text-[11px]">—</span>
                    )}
                  </td>

                  {/* Done status */}
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => onToggleCompleted(paper.id)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-colors ${
                        isDone
                          ? 'bg-[#865D36] text-[#FAF6F0] border-[#865D36] font-semibold'
                          : 'bg-[#2C2620] text-[#AC8968] hover:text-[#FAF6F0] border-[#93785B]/30 hover:border-[#93785B]/60'
                      }`}
                    >
                      {isDone ? (
                        <>
                          <Check size={12} className="text-[#FAF6F0]" />
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
