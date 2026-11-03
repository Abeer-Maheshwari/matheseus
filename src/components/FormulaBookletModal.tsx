import React, { useState } from 'react';
import { 
  FORMULA_BOOKLET_CATEGORIES, 
  FORMULA_BOOKLET_PDF_URL, 
  FURTHER_MATHS_FORMULA_BOOKLET_PDF_URL 
} from '../data/formulaBooklet';
import { MathRenderer } from './MathRenderer';
import { BookOpen, FileText, Search, X, ExternalLink, Sigma } from 'lucide-react';

interface FormulaBookletModalProps {
  onClose: () => void;
}

export const FormulaBookletModal: React.FC<FormulaBookletModalProps> = ({ onClose }) => {
  const [search, setSearch] = useState('');
  const [activeQual, setActiveQual] = useState<'all' | 'maths' | 'fm'>('all');

  const filteredCategories = FORMULA_BOOKLET_CATEGORIES.filter((cat) => {
    if (activeQual === 'maths' && cat.qualification !== 'A Level Mathematics') return false;
    if (activeQual === 'fm' && cat.qualification !== 'Further Mathematics') return false;
    return true;
  }).map((cat) => {
    if (!search.trim()) return cat;
    const query = search.toLowerCase();

    const matchingSections = cat.sections.map((sec) => {
      const filteredItems = sec.items.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          (item.notes && item.notes.toLowerCase().includes(query)) ||
          item.latex.toLowerCase().includes(query)
      );
      return { ...sec, items: filteredItems };
    }).filter((sec) => sec.items.length > 0);

    return { ...cat, sections: matchingSections };
  }).filter((cat) => cat.sections.length > 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm text-slate-100">
      <div className="bg-slate-950 border border-slate-800 rounded-xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh] shadow-2xl">
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-slate-800 flex items-center justify-between shrink-0 bg-slate-900/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-950/80 border border-sky-800/60 flex items-center justify-center text-sky-400">
              <Sigma size={18} />
            </div>
            <div>
              <h3 className="font-semibold text-white text-sm">Edexcel Formulae & Statistical Tables</h3>
              <p className="text-xs text-slate-400">Official mathematical formulae for GCE examinations</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700/60 transition-colors"
            title="Close"
          >
            <X size={16} />
          </button>
        </div>

        {/* Official PDFs direct links */}
        <div className="px-5 py-2.5 bg-slate-900/40 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs shrink-0">
          <span className="text-slate-400 flex items-center gap-1.5 font-medium">
            <FileText size={14} className="text-sky-400" />
            Official Pearson PDF Booklets:
          </span>
          <div className="flex items-center gap-2">
            <a
              href={FORMULA_BOOKLET_PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 rounded-md font-medium text-[11px] transition-colors"
            >
              <span>Maths Booklet PDF</span>
              <ExternalLink size={12} className="text-slate-400" />
            </a>
            <a
              href={FURTHER_MATHS_FORMULA_BOOKLET_PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 rounded-md font-medium text-[11px] transition-colors"
            >
              <span>Further Maths Booklet PDF</span>
              <ExternalLink size={12} className="text-slate-400" />
            </a>
          </div>
        </div>

        {/* Filter & Search */}
        <div className="p-4 border-b border-slate-800 space-y-3 bg-slate-950 shrink-0">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search formula by name, section, or notation..."
              className="w-full pl-9 pr-3 py-2 bg-slate-900/80 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500/50"
            />
          </div>

          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={() => setActiveQual('all')}
              className={`px-3 py-1 rounded-md text-[11px] font-medium border transition-colors ${
                activeQual === 'all'
                  ? 'bg-sky-500/15 text-sky-400 border-sky-500/40 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 bg-slate-900/60 border-slate-800'
              }`}
            >
              All Formulae
            </button>
            <button
              onClick={() => setActiveQual('maths')}
              className={`px-3 py-1 rounded-md text-[11px] font-medium border transition-colors ${
                activeQual === 'maths'
                  ? 'bg-sky-500/15 text-sky-400 border-sky-500/40 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 bg-slate-900/60 border-slate-800'
              }`}
            >
              A Level Maths
            </button>
            <button
              onClick={() => setActiveQual('fm')}
              className={`px-3 py-1 rounded-md text-[11px] font-medium border transition-colors ${
                activeQual === 'fm'
                  ? 'bg-indigo-500/15 text-indigo-400 border-indigo-500/40 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 bg-slate-900/60 border-slate-800'
              }`}
            >
              Further Maths
            </button>
          </div>
        </div>

        {/* Formulae Content List */}
        <div className="p-5 overflow-y-auto space-y-6">
          {filteredCategories.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-xs font-mono">
              No matching formulae found.
            </div>
          ) : (
            filteredCategories.map((cat, idx) => (
              <div key={idx} className="space-y-4">
                <div className="border-b border-slate-800 pb-1.5 flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
                    <BookOpen size={14} className="text-sky-400" />
                    {cat.title}
                  </h4>
                  <span className="text-[11px] text-slate-400 font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                    {cat.qualification}
                  </span>
                </div>

                {cat.sections.map((sec, sIdx) => (
                  <div key={sIdx} className="space-y-2.5">
                    <h5 className="text-[11px] font-bold text-slate-400 tracking-wide">
                      {sec.sectionTitle}
                    </h5>
                    <div className="grid grid-cols-1 gap-2.5">
                      {sec.items.map((item, iIdx) => (
                        <div
                          key={iIdx}
                          className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800 hover:border-slate-700/80 transition-colors space-y-1.5"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-slate-100">
                              {item.name}
                            </span>
                            {item.notes && (
                              <span className="text-[10px] text-slate-400 italic">
                                {item.notes}
                              </span>
                            )}
                          </div>
                          <div className="p-2.5 rounded bg-slate-950 border border-slate-800/80 text-center overflow-x-auto text-sky-200">
                            <MathRenderer math={item.latex} displayMode={true} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
