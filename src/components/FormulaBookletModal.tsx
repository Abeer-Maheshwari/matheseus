import React, { useState } from 'react';
import { 
  FORMULA_BOOKLET_DATA, 
  FORMULA_BOOKLET_PDF_URL, 
  FURTHER_MATHS_FORMULA_BOOKLET_PDF_URL 
} from '../data/formulaBooklet';

interface FormulaBookletModalProps {
  onClose: () => void;
}

export const FormulaBookletModal: React.FC<FormulaBookletModalProps> = ({ onClose }) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'Pure Mathematics', 'Further Pure Mathematics', 'Mechanics', 'Statistics'];

  const filtered = FORMULA_BOOKLET_DATA.filter((sec) => {
    const matchesCategory = selectedCategory === 'all' || sec.category === selectedCategory;
    if (!matchesCategory) return false;
    if (!search.trim()) return true;

    const query = search.toLowerCase();
    const titleMatch = sec.title.toLowerCase().includes(query);
    const formulaMatch = sec.formulas.some(
      (f) =>
        f.name.toLowerCase().includes(query) ||
        f.latex.toLowerCase().includes(query) ||
        (f.notes && f.notes.toLowerCase().includes(query))
    );
    return titleMatch || formulaMatch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 text-zinc-100">
      <div className="bg-zinc-950 border border-zinc-800 rounded-lg w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-5 py-3 border-b border-zinc-800 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-white text-sm">Edexcel Formulae & Statistical Tables</h3>
            <p className="text-xs text-zinc-400">Standard GCE mathematical formulae reference</p>
          </div>
          <button
            onClick={onClose}
            className="px-2 py-1 text-xs rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800"
          >
            Close
          </button>
        </div>

        {/* Official PDFs direct links */}
        <div className="p-3 bg-zinc-900 border-b border-zinc-800 flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="text-zinc-400">Complete official Pearson PDF booklets:</span>
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
        <div className="p-3 border-b border-zinc-800 space-y-2 bg-zinc-950">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter formula (e.g. Binomial, Trig, Integration, SUVAT)..."
            className="w-full px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 font-mono"
          />

          <div className="flex items-center gap-1 overflow-x-auto text-xs">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-2.5 py-1 rounded text-[11px] whitespace-nowrap border ${
                  selectedCategory === c
                    ? 'bg-zinc-800 text-white border-zinc-600 font-semibold'
                    : 'text-zinc-400 hover:text-zinc-200 bg-zinc-900 border-zinc-800'
                }`}
              >
                {c === 'all' ? 'All Sections' : c}
              </button>
            ))}
          </div>
        </div>

        {/* Content list */}
        <div className="p-5 overflow-y-auto space-y-5">
          {filtered.length === 0 ? (
            <div className="text-center py-10 text-zinc-500 text-xs font-mono">
              No matching formula found.
            </div>
          ) : (
            filtered.map((section, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800">
                    {section.category}
                  </span>
                  <span className="text-xs font-bold text-zinc-200">{section.title}</span>
                </div>

                <div className="space-y-2">
                  {section.formulas.map((f, i) => (
                    <div
                      key={i}
                      className="p-3 rounded bg-zinc-900/60 border border-zinc-800"
                    >
                      <div className="flex items-baseline justify-between mb-1.5">
                        <span className="text-xs font-semibold text-zinc-200">{f.name}</span>
                        {f.notes && (
                          <span className="text-[11px] text-zinc-400 font-mono">{f.notes}</span>
                        )}
                      </div>
                      <pre className="p-2.5 rounded bg-black border border-zinc-800 text-zinc-300 font-mono text-xs whitespace-pre-wrap leading-relaxed overflow-x-auto">
                        {f.latex}
                      </pre>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
