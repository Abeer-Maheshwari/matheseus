import React, { useState } from 'react';
import { MODULES_DATA, ModuleSection, PaperEntry } from '../data/papersData';
import { 
  FileText, 
  Columns, 
  Check, 
  Download, 
  Search, 
  GraduationCap, 
  Layers, 
  BookOpen,
  Play
} from 'lucide-react';

interface PapersViewProps {
  currentSubject: 'maths' | 'further-maths';
  onSelectSubject: (subject: 'maths' | 'further-maths') => void;
  activeModuleId: string;
  onSelectModule: (moduleId: string) => void;
  onOpenSplitView: (title: string, qpUrl: string, msUrl: string) => void;
  onOpenSingleDoc: (title: string, url: string) => void;
  onOpenPractice: (paper: PaperEntry, module: ModuleSection) => void;
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
  onOpenPractice,
  completedMap,
  onToggleCompleted,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const availableModules = MODULES_DATA.filter((m) => m.subject === currentSubject);
  const activeModule = availableModules.find((m) => m.id === activeModuleId) || availableModules[0];

  // Group modules into logical categories for clean navigation
  const moduleCategories: { title: string; modules: ModuleSection[] }[] = 
    currentSubject === 'further-maths'
      ? [
          {
            title: 'Core Pure',
            modules: availableModules.filter((m) => ['cp1', 'cp2'].includes(m.id)),
          },
          {
            title: 'Further Pure',
            modules: availableModules.filter((m) => ['fp1', 'fp2'].includes(m.id)),
          },
          {
            title: 'Mechanics',
            modules: availableModules.filter((m) => ['fm1', 'fm2'].includes(m.id)),
          },
          {
            title: 'Statistics',
            modules: availableModules.filter((m) => ['fs1', 'fs2'].includes(m.id)),
          },
          {
            title: 'Decision',
            modules: availableModules.filter((m) => ['d1', 'd2'].includes(m.id)),
          },
        ].filter((cat) => cat.modules.length > 0)
      : [
          {
            title: 'Pure Mathematics',
            modules: availableModules.filter((m) => ['p1', 'p2'].includes(m.id)),
          },
          {
            title: 'Applied Mathematics',
            modules: availableModules.filter((m) => ['p3'].includes(m.id)),
          },
        ];

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
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6 animate-fadeIn">
      {/* Subject Selector Tabs */}
      <div className="flex items-center gap-3 border-b border-[#6382BF]/20 pb-3">
        <button
          onClick={() => {
            onSelectSubject('maths');
            onSelectModule('p1');
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
            currentSubject === 'maths'
              ? 'bg-[#4A7BF7] text-white shadow-sm'
              : 'text-[#7B8FAD] hover:text-[#E8ECF4] bg-[#1A2540] border border-[#6382BF]/30 hover:border-[#4A7BF7]/50'
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
              ? 'bg-[#4A7BF7] text-white shadow-sm'
              : 'text-[#7B8FAD] hover:text-[#E8ECF4] bg-[#1A2540] border border-[#6382BF]/30 hover:border-[#4A7BF7]/50'
          }`}
        >
          <Layers size={16} />
          <span>Further Maths (9FM0)</span>
        </button>
      </div>

      {/* Subsections: Categorized Module Navigation */}
      <div className="space-y-3">
        <div className="text-xs text-[#7B8FAD] font-semibold uppercase tracking-wider flex items-center gap-1.5">
          <BookOpen size={13} className="text-[#4A7BF7]" />
          <span>Modules:</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {moduleCategories.map((category) => (
            <div
              key={category.title}
              className="p-2.5 rounded-xl bg-[#1A2540] border border-[#6382BF]/25 space-y-1.5 shadow-sm"
            >
              <div className="text-[11px] font-semibold text-[#7B8FAD] uppercase tracking-wider px-1">
                {category.title}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {category.modules.map((m) => {
                  const isSelected = m.id === activeModule.id;
                  return (
                    <button
                      key={m.id}
                      onClick={() => onSelectModule(m.id)}
                      className={`flex-1 min-w-[120px] flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                        isSelected
                          ? 'bg-[#0A1020] text-[#E8ECF4] border-[#4A7BF7] shadow-sm font-semibold ring-1 ring-[#4A7BF7]/40'
                          : 'bg-[#0A1020]/60 text-[#7B8FAD] hover:text-[#E8ECF4] border-[#6382BF]/20 hover:border-[#6382BF]/50'
                      }`}
                    >
                      <span className="truncate">{m.title}</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#1A2540] border border-[#6382BF]/30 text-[#7B8FAD] ml-1.5 shrink-0">
                        {m.code.split('/')[1] || m.code}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Module Overview Card & Search */}
      <div className="p-4 rounded-xl bg-[#1A2540] border border-[#6382BF]/25 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
        <div>
          <h3 className="text-base font-serif font-bold text-[#E8ECF4] flex items-center gap-2">
            <span>{activeModule.title}</span>
            <span className="text-xs px-2.5 py-0.5 rounded bg-[#0A1020] text-[#4A7BF7] border border-[#6382BF]/40 font-semibold">
              {activeModule.code}
            </span>
          </h3>
          <p className="text-xs text-[#7B8FAD] mt-0.5">
            {filteredPapers.length} past exam paper series with mark schemes.
          </p>
        </div>

        <div className="relative min-w-56">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7B8FAD]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by year or season..."
            className="w-full pl-9 pr-3 py-1.5 bg-[#0A1020] border border-[#6382BF]/30 rounded-lg text-xs text-[#E8ECF4] placeholder-[#5A6E8A] focus:outline-none focus:border-[#4A7BF7]"
          />
        </div>
      </div>

      {/* Papers Table */}
      <div key={activeModule.id} className="border border-[#6382BF]/25 rounded-xl overflow-hidden bg-[#1A2540] shadow-md animate-fadeIn">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-[#6382BF]/20 bg-[#0A1020]/90 text-[#7B8FAD] text-[11px] font-semibold uppercase tracking-wider">
              <th className="py-3 px-4">Series</th>
              <th className="py-3 px-4 text-center">Practice</th>
              <th className="py-3 px-4 text-center">PDF Options</th>
              <th className="py-3 px-4 text-center">Report</th>
              <th className="py-3 px-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#6382BF]/15">
            {filteredPapers.map((paper) => {
              const isDone = !!completedMap[paper.id];
              const paperTitle = `${activeModule.title} (${paper.season} ${paper.year})`;

              return (
                <tr key={paper.id} className="hover:bg-[#0A1020]/40 transition-colors">
                  {/* Series */}
                  <td className="py-3 px-4 font-medium text-[#E8ECF4]">
                    <div className="font-semibold text-[#E8ECF4]">
                      {paper.season} {paper.year}
                    </div>
                    <div className="text-[11px] text-[#7B8FAD]">
                      {activeModule.code} {paper.paperNumber ? `· ${paper.paperNumber}` : ''}
                    </div>
                  </td>

                  {/* Practice Exam Mode */}
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => onOpenPractice(paper, activeModule)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#4A7BF7]/15 hover:bg-[#4A7BF7]/30 text-[#E8ECF4] font-semibold border border-[#4A7BF7]/40 transition-colors"
                      title="Practice this paper under exam conditions with timer and self-marking"
                    >
                      <Play size={13} className="text-[#4A7BF7]" />
                      <span>Practice</span>
                    </button>
                  </td>

                  {/* Split View + Quick Direct Download */}
                  <td className="py-3 px-4 text-center">
                    <div className="inline-flex items-center gap-2">
                      <button
                        onClick={() => onOpenSplitView(paperTitle, paper.qpUrl, paper.msUrl)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0A1020] hover:bg-[#4A7BF7]/20 text-[#E8ECF4] font-medium border border-[#6382BF]/30 transition-colors"
                        title="Open Question Paper and Mark Scheme side-by-side"
                      >
                        <Columns size={13} className="text-[#4A7BF7]" />
                        <span>Split View</span>
                      </button>

                      {/* Direct QP / MS Download icons */}
                      <div className="flex items-center border border-[#6382BF]/30 rounded-lg overflow-hidden bg-[#0A1020]">
                        <a
                          href={paper.qpUrl}
                          download
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2 py-1 text-[11px] text-[#7B8FAD] hover:text-[#E8ECF4] hover:bg-[#1A2540] transition-colors border-r border-[#6382BF]/20 flex items-center gap-1"
                          title="Download Question Paper PDF"
                        >
                          <Download size={11} className="text-[#4A7BF7]" />
                          <span>QP</span>
                        </a>
                        <a
                          href={paper.msUrl}
                          download
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2 py-1 text-[11px] text-[#7B8FAD] hover:text-[#E8ECF4] hover:bg-[#1A2540] transition-colors flex items-center gap-1"
                          title="Download Mark Scheme PDF"
                        >
                          <Download size={11} className="text-[#7B8FAD]" />
                          <span>MS</span>
                        </a>
                      </div>
                    </div>
                  </td>

                  {/* Reports */}
                  <td className="py-3 px-4 text-center">
                    {paper.erUrl ? (
                      <button
                        onClick={() => onOpenSingleDoc(`${paperTitle} — Examiner Report`, paper.erUrl!)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#0A1020] hover:bg-[#1A2540] text-[#7B8FAD] hover:text-[#E8ECF4] border border-[#6382BF]/30 text-[11px] transition-colors"
                        title="Examiner Report"
                      >
                        <FileText size={11} />
                        <span>Report</span>
                      </button>
                    ) : (
                      <span className="text-[#5A6E8A] text-[11px]">—</span>
                    )}
                  </td>

                  {/* Done status */}
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => onToggleCompleted(paper.id)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-colors ${
                        isDone
                          ? 'bg-[#4A7BF7] text-white border-[#4A7BF7] font-semibold'
                          : 'bg-[#0A1020] text-[#7B8FAD] hover:text-[#E8ECF4] border-[#6382BF]/30 hover:border-[#6382BF]/60'
                      }`}
                    >
                      {isDone ? (
                        <>
                          <Check size={12} className="text-white" />
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
