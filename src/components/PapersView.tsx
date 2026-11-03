import React, { useState } from 'react';
import { MODULES_DATA } from '../data/papersData';
import { 
  BookOpen, 
  Columns, 
  Sparkles, 
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
      <div className="flex items-center gap-3 border-b border-[#90AEAD]/25 pb-3">
        <button
          onClick={() => {
            onSelectSubject('maths');
            onSelectModule('p1');
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
            currentSubject === 'maths'
              ? 'bg-[#E64833] text-[#FBE9D0] shadow-sm'
              : 'text-[#90AEAD] hover:text-[#FBE9D0] bg-[#244855] border border-[#90AEAD]/25 hover:border-[#90AEAD]/50'
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
              ? 'bg-[#874F41] text-[#FBE9D0] shadow-sm'
              : 'text-[#90AEAD] hover:text-[#FBE9D0] bg-[#244855] border border-[#90AEAD]/25 hover:border-[#90AEAD]/50'
          }`}
        >
          <Layers size={16} />
          <span>Further Maths (9FM0)</span>
        </button>
      </div>

      {/* Subsections: Module Navigation Pills */}
      <div className="space-y-2">
        <div className="text-xs text-[#90AEAD] font-semibold uppercase tracking-wider flex items-center gap-1.5">
          <BookOpen size={13} className="text-[#E64833]" />
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
                    ? 'bg-[#244855] text-[#FBE9D0] border-[#E64833] shadow-sm font-semibold'
                    : 'bg-[#162932] text-[#90AEAD] hover:text-[#FBE9D0] border-[#90AEAD]/25 hover:border-[#90AEAD]/50'
                }`}
              >
                <span>{m.title}</span>
                <span className="font-mono text-[11px] px-1.5 py-0.2 rounded bg-[#162932] border border-[#90AEAD]/30 text-[#90AEAD]">
                  {m.code}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Module Overview Card & Search */}
      <div className="p-4 rounded-xl bg-[#244855] border border-[#90AEAD]/25 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
        <div>
          <h3 className="text-base font-bold text-[#FBE9D0] flex items-center gap-2">
            <span>{activeModule.title}</span>
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-[#162932] text-[#E64833] border border-[#90AEAD]/30 font-semibold">
              {activeModule.code}
            </span>
          </h3>
          <p className="text-xs text-[#90AEAD] mt-0.5">
            Archive of official Edexcel past examination papers, mark schemes, and examiner reports.
          </p>
        </div>

        <div className="relative min-w-56">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#90AEAD]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search papers by year or season..."
            className="w-full pl-9 pr-3 py-1.5 bg-[#162932] border border-[#90AEAD]/30 rounded-lg text-xs text-[#FBE9D0] placeholder-[#90AEAD]/70 focus:outline-none focus:border-[#E64833]"
          />
        </div>
      </div>

      {/* Papers Table */}
      <div className="border border-[#90AEAD]/25 rounded-xl overflow-hidden bg-[#244855] shadow-md">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-[#90AEAD]/20 bg-[#1b3741] text-[#90AEAD] text-[11px] font-semibold uppercase tracking-wider">
              <th className="py-3 px-4">Exam Series</th>
              <th className="py-3 px-4 text-center">Website Mode</th>
              <th className="py-3 px-4 text-center">PDF (Split View)</th>
              <th className="py-3 px-4 text-center">Reports</th>
              <th className="py-3 px-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#90AEAD]/15">
            {filteredPapers.map((paper) => {
              const isDone = !!completedMap[paper.id];
              const paperTitle = `${activeModule.title} (${paper.season} ${paper.year})`;

              return (
                <tr key={paper.id} className="hover:bg-[#1f3d49] transition-colors">
                  {/* Series */}
                  <td className="py-3 px-4 font-medium text-[#FBE9D0]">
                    <div className="font-semibold text-[#FBE9D0]">
                      {paper.season} {paper.year}
                    </div>
                    <div className="text-[11px] text-[#90AEAD] font-mono">
                      {activeModule.code} {paper.paperNumber ? `· ${paper.paperNumber}` : ''}
                    </div>
                  </td>

                  {/* Website Version: Question-by-Question Interactive Mode */}
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => onOpenInteractive(paper.id, paperTitle, activeModule.code)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#E64833]/20 hover:bg-[#E64833]/30 text-[#FBE9D0] font-semibold border border-[#E64833]/60 transition-colors"
                      title="Launch Question-by-Question Website Mode"
                    >
                      <Sparkles size={13} className="text-[#E64833]" />
                      <span>Web Mode</span>
                    </button>
                  </td>

                  {/* Merged PDF Version + Split View */}
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => onOpenSplitView(paperTitle, paper.qpUrl, paper.msUrl)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#162932] hover:bg-[#874F41]/60 text-[#FBE9D0] font-medium border border-[#90AEAD]/30 transition-colors"
                      title="Open Question Paper and Mark Scheme side-by-side"
                    >
                      <Columns size={13} className="text-[#90AEAD]" />
                      <span>PDF (Split View)</span>
                    </button>
                  </td>

                  {/* Reports */}
                  <td className="py-3 px-4 text-center">
                    {paper.erUrl ? (
                      <button
                        onClick={() => onOpenSingleDoc(`${paperTitle} — Examiner Report`, paper.erUrl!)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#162932] hover:bg-[#244855] text-[#90AEAD] hover:text-[#FBE9D0] border border-[#90AEAD]/25 text-[11px] transition-colors"
                        title="Examiner Report"
                      >
                        <FileText size={11} />
                        <span>Report</span>
                      </button>
                    ) : (
                      <span className="text-[#90AEAD]/50 text-[11px]">—</span>
                    )}
                  </td>

                  {/* Done status */}
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => onToggleCompleted(paper.id)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-colors ${
                        isDone
                          ? 'bg-[#874F41] text-[#FBE9D0] border-[#874F41] font-semibold'
                          : 'bg-[#162932] text-[#90AEAD] hover:text-[#FBE9D0] border-[#90AEAD]/25 hover:border-[#90AEAD]/50'
                      }`}
                    >
                      {isDone ? (
                        <>
                          <Check size={12} className="text-[#FBE9D0]" />
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
