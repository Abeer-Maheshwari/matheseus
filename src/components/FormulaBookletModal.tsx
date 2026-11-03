import React, { useState } from 'react';
import { 
  FORMULA_BOOKLET_CATEGORIES, 
  FORMULA_BOOKLET_PDF_URL, 
  FURTHER_MATHS_FORMULA_BOOKLET_PDF_URL 
} from '../data/formulaBooklet';
import { MathRenderer } from './MathRenderer';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 text-zinc-100">
      <div className="bg-zinc-950 border border-zinc-800 rounded-lg w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-5 py-3 border-b border-zinc-800 flex items-center justify-between shrink-0">
          <div>
            <h3 className="font-semibold text-white text-sm">Edexcel Formulae & Statistical Tables</h3>
            <p className="text-xs text-zinc-400">Mathematical formulae formatted for GCE examinations</p>
          </div>
          <button
            onClick={onClose}
            className="px-2.5 py-1 text-xs rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 font-medium"
          >
            Close
          </button>
        </div>

        {/* Official PDFs direct links */}
        <div className="p-3 bg-zinc-900 border-b border-zinc-800 flex flex-wrap items-center justify-between gap-2 text-xs shrink-0">
          <span className="text-zinc-400">Official Pearson PDF booklets:</span>
          <div className="flex items-center gap-2">
            <a
              href={FORMULA_BOOKLET_PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 bg-zinc-950 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 rounded font-medium"
            >
              Maths Booklet PDF
            </a>
            <a
              href={FURTHER_MATHS_FORMULA_BOOKLET_PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 bg-zinc-950 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 rounded font-medium"
            >
              Further Maths Booklet PDF
            </a>
          </div>
        </div>

        {/* Filter & Search */}
        <div className="p-3 border-b border-zinc-800 space-y-2 bg-zinc-950 shrink-0">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search formula (e.g. Binomial, Trigonometry, Parts, Hyperbolic, SUVAT)..."
            className="w-full px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 font-mono"
          />

          <div className="flex items-center gap-1.5 text-xs">
            <button
              onClick={() => setActiveQual('all')}
              className={`px-2.5 py-1 rounded text-[11px] border ${
                activeQual === 'all'
                  ? 'bg-zinc-800 text-white border-zinc-600 font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200 bg-zinc-900 border-zinc-800'
              }`}
            >
              All Formulae
            </button>
            <button
              onClick={() => setActiveQual('maths')}
              className={`px-2.5 py-1 rounded text-[11px] border ${
                activeQual === 'maths'
                  ? 'bg-zinc-800 text-white border-zinc-600 font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200 bg-zinc-900 border-zinc-800'
              }`}
            >
              A Level Maths
            </button>
            <button
              onClick={() => setActiveQual('fm')}
              className={`px-2.5 py-1 rounded text-[11px] border ${
                activeQual === 'fm'
                  ? 'bg-zinc-800 text-white border-zinc-600 font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200 bg-zinc-900 border-zinc-800'
              }`}
            >
              Further Maths
            </button>
          </div>
        </div>

        {/* Formulae Content List */}
        <div className="p-5 overflow-y-auto space-y-6">
          {filteredCategories.length === 0 ? (
            <div className="text-center py-12 text-zinc-500 text-xs font-mono">
              No matching formulae found.
            </div>
          ) : (
            filteredCategories.map((cat, idx) => (
              <div key={idx} className="space-y-4">
                <div className="border-b border-zinc-800 pb-1 flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                    {cat.title}
                  </h4>
                  <span className="text-[11px] text-zinc-500 font-mono">
                    {cat.qualification}
                  </span>
                </div>

                {cat.sections.map((sec, sIdx) => (
                  <div key={sIdx} className="space-y-2.5 pl-1">
                    <h5 className="text-xs font-semibold text-zinc-400">
                      {sec.sectionTitle}
                    </h5>

                    <div className="space-y-2">
                      {sec.items.map((item, iIdx) => (
                        <div
                          key={iIdx}
                          className="p-3.5 rounded bg-zinc-900/60 border border-zinc-800 text-zinc-100"
                        >
                          <div className="flex items-baseline justify-between mb-2">
                            <span className="text-xs font-semibold text-zinc-200">
                              {item.name}
                            </span>
                            {item.notes && (
                              <span className="text-[11px] text-zinc-400 font-mono">
                                {item.notes}
                              </span>
                            )}
                          </div>

                          {/* KaTeX Formatted Math Render */}
                          <div className="p-3 rounded bg-black border border-zinc-800/80 overflow-x-auto text-sm text-center">
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
