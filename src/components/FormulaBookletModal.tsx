import React, { useState } from 'react';
import { 
  X, 
  BookOpen, 
  Search, 
  ExternalLink, 
  Download, 
  FileText,
  Bookmark
} from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in text-slate-100">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Formula Sheet & Booklet Reference</h3>
              <p className="text-xs text-slate-400">Official Edexcel GCE Mathematical Formulae & Tables</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action Banner: Official PDFs */}
        <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <FileText className="w-4 h-4 text-indigo-400" />
            <span>Official Pearson Formula Booklets:</span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={FORMULA_BOOKLET_PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 transition font-medium"
            >
              <ExternalLink className="w-3.5 h-3.5" /> A Level Maths Booklet PDF
            </a>
            <a
              href={FURTHER_MATHS_FORMULA_BOOKLET_PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-300 border border-cyan-500/30 transition font-medium"
            >
              <ExternalLink className="w-3.5 h-3.5" /> Further Maths Booklet PDF
            </a>
          </div>
        </div>

        {/* Search & Category Filter */}
        <div className="p-4 bg-slate-950/40 border-b border-slate-800 space-y-3">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Quick search formula (e.g. Binomial, Trig, Integration, Maclaurin, SUVAT)..."
              className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-3 py-1 rounded-lg capitalize whitespace-nowrap transition ${
                  selectedCategory === c
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                    : 'text-slate-400 hover:text-slate-200 bg-slate-900/60 border border-slate-800'
                }`}
              >
                {c === 'all' ? 'All Formulas' : c}
              </button>
            ))}
          </div>
        </div>

        {/* Formulas List */}
        <div className="p-6 overflow-y-auto space-y-6">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-xs">
              No formulas matched your search. Try another keyword or check the official PDFs above.
            </div>
          ) : (
            filtered.map((section, idx) => (
              <div key={idx} className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                    {section.category}
                  </span>
                  <h4 className="text-sm font-bold text-white">{section.title}</h4>
                </div>

                <div className="space-y-2.5">
                  {section.formulas.map((f, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 hover:border-slate-700 transition"
                    >
                      <div className="flex items-baseline justify-between mb-2">
                        <span className="text-xs font-semibold text-indigo-300">{f.name}</span>
                        {f.notes && (
                          <span className="text-[11px] text-slate-400 italic">{f.notes}</span>
                        )}
                      </div>
                      <pre className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 font-mono text-xs whitespace-pre-wrap leading-relaxed overflow-x-auto">
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
