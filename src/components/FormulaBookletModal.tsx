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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2C2620]/85 backdrop-blur-sm text-[#FAF6F0]">
      <div className="bg-[#3E362E] border border-[#93785B]/40 rounded-xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh] shadow-2xl">
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-[#93785B]/25 flex items-center justify-between shrink-0 bg-[#2C2620]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#3E362E] border border-[#93785B]/40 flex items-center justify-center text-[#865D36]">
              <Sigma size={18} />
            </div>
            <div>
              <h3 className="font-serif font-semibold text-[#FAF6F0] text-sm">Formula Booklet</h3>
              <p className="text-xs text-[#AC8968]">Official Edexcel formulas and tables</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#3E362E] hover:bg-[#865D36] text-[#AC8968] hover:text-[#FAF6F0] border border-[#93785B]/40 transition-colors"
            title="Close"
          >
            <X size={16} />
          </button>
        </div>

        {/* Official PDFs direct links */}
        <div className="px-5 py-2.5 bg-[#2C2620]/70 border-b border-[#93785B]/25 flex flex-wrap items-center justify-between gap-2 text-xs shrink-0">
          <span className="text-[#AC8968] flex items-center gap-1.5 font-medium">
            <FileText size={14} className="text-[#865D36]" />
            PDFs:
          </span>
          <div className="flex items-center gap-2">
            <a
              href={FORMULA_BOOKLET_PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#3E362E] hover:bg-[#865D36] text-[#FAF6F0] border border-[#93785B]/40 rounded-md font-medium text-[11px] transition-colors"
            >
              <span>Maths Booklet PDF</span>
              <ExternalLink size={12} className="text-[#AC8968]" />
            </a>
            <a
              href={FURTHER_MATHS_FORMULA_BOOKLET_PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#3E362E] hover:bg-[#865D36] text-[#FAF6F0] border border-[#93785B]/40 rounded-md font-medium text-[11px] transition-colors"
            >
              <span>Further Maths Booklet PDF</span>
              <ExternalLink size={12} className="text-[#AC8968]" />
            </a>
          </div>
        </div>

        {/* Filter & Search */}
        <div className="p-4 border-b border-[#93785B]/25 space-y-3 bg-[#3E362E] shrink-0">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#AC8968]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search formula by name, section, or notation..."
              className="w-full pl-9 pr-3 py-2 bg-[#2C2620] border border-[#93785B]/40 rounded-lg text-xs text-[#FAF6F0] placeholder-[#A69080] focus:outline-none focus:border-[#865D36]"
            />
          </div>

          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={() => setActiveQual('all')}
              className={`px-3 py-1 rounded-md text-[11px] font-medium border transition-colors ${
                activeQual === 'all'
                  ? 'bg-[#865D36] text-[#FAF6F0] border-[#865D36] font-semibold'
                  : 'text-[#AC8968] hover:text-[#FAF6F0] bg-[#2C2620] border-[#93785B]/30'
              }`}
            >
              All Formulae
            </button>
            <button
              onClick={() => setActiveQual('maths')}
              className={`px-3 py-1 rounded-md text-[11px] font-medium border transition-colors ${
                activeQual === 'maths'
                  ? 'bg-[#865D36] text-[#FAF6F0] border-[#865D36] font-semibold'
                  : 'text-[#AC8968] hover:text-[#FAF6F0] bg-[#2C2620] border-[#93785B]/30'
              }`}
            >
              A Level Maths
            </button>
            <button
              onClick={() => setActiveQual('fm')}
              className={`px-3 py-1 rounded-md text-[11px] font-medium border transition-colors ${
                activeQual === 'fm'
                  ? 'bg-[#865D36] text-[#FAF6F0] border-[#865D36] font-semibold'
                  : 'text-[#AC8968] hover:text-[#FAF6F0] bg-[#2C2620] border-[#93785B]/30'
              }`}
            >
              Further Maths
            </button>
          </div>
        </div>

        {/* Formulae Content List */}
        <div className="p-5 overflow-y-auto space-y-6">
          {filteredCategories.length === 0 ? (
            <div className="text-center py-12 text-[#AC8968] text-xs">
              No matching formulae found.
            </div>
          ) : (
            filteredCategories.map((cat, idx) => (
              <div key={idx} className="space-y-4">
                <div className="border-b border-[#93785B]/25 pb-1.5 flex items-center justify-between">
                  <h4 className="text-xs font-serif font-bold uppercase tracking-wider text-[#FAF6F0] flex items-center gap-2">
                    <BookOpen size={14} className="text-[#865D36]" />
                    {cat.title}
                  </h4>
                  <span className="text-[11px] text-[#AC8968] px-2 py-0.5 rounded bg-[#2C2620] border border-[#93785B]/30 font-medium">
                    {cat.qualification}
                  </span>
                </div>

                {cat.sections.map((sec, sIdx) => (
                  <div key={sIdx} className="space-y-2.5">
                    <h5 className="text-[11px] font-bold text-[#AC8968] tracking-wide">
                      {sec.sectionTitle}
                    </h5>
                    <div className="grid grid-cols-1 gap-2.5">
                      {sec.items.map((item, iIdx) => (
                        <div
                          key={iIdx}
                          className="p-3.5 rounded-lg bg-[#2C2620] border border-[#93785B]/30 hover:border-[#93785B]/60 transition-colors space-y-1.5"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-[#FAF6F0]">
                              {item.name}
                            </span>
                            {item.notes && (
                              <span className="text-[10px] text-[#A69080] italic">
                                {item.notes}
                              </span>
                            )}
                          </div>
                          <div className="p-2.5 rounded bg-[#3E362E] border border-[#93785B]/25 text-center overflow-x-auto text-[#FAF6F0]">
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
