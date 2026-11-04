import React, { useState } from 'react';
import { 
  FORMULA_BOOKLET_CATEGORIES, 
  FORMULA_BOOKLET_PDF_URL, 
  FURTHER_MATHS_FORMULA_BOOKLET_PDF_URL 
} from '../data/formulaBooklet';
import { STATISTICAL_TABLES, StatisticalTable } from '../data/statisticalTables';
import { MathRenderer } from './MathRenderer';
import { 
  BookOpen, 
  FileText, 
  Search, 
  X, 
  ExternalLink, 
  Sigma, 
  Table as TableIcon,
  Layers,
  GraduationCap
} from 'lucide-react';

interface FormulaBookletModalProps {
  onClose: () => void;
  mode?: 'modal' | 'drawer';
}

export const FormulaBookletModal: React.FC<FormulaBookletModalProps> = ({ onClose, mode = 'modal' }) => {
  const [activeTab, setActiveTab] = useState<'formulas' | 'tables' | 'pdf'>('formulas');
  const [search, setSearch] = useState('');
  const [activeQual, setActiveQual] = useState<'all' | 'maths' | 'fm'>('all');

  // Tables state
  const [activeTableId, setActiveTableId] = useState<string>('pmcc');
  const activeTable = STATISTICAL_TABLES.find((t) => t.id === activeTableId) || STATISTICAL_TABLES[0];

  // PDF Viewer state
  const [activePdfQual, setActivePdfQual] = useState<'maths' | 'fm'>('maths');
  const [fitMode, setFitMode] = useState<'FitH' | 'Fit'>('Fit');

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

  const containerClasses = mode === 'drawer'
    ? 'w-full h-full flex flex-col overflow-hidden bg-[#1A2540]'
    : 'fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#0A1020]/80 backdrop-blur-sm text-[#E8ECF4] animate-fadeIn';

  const cardClasses = mode === 'drawer'
    ? 'flex flex-col h-full w-full overflow-hidden'
    : 'bg-[#1A2540] border border-[#6382BF]/30 rounded-2xl w-full max-w-5xl md:max-w-6xl h-[88vh] md:h-[92vh] overflow-hidden flex flex-col shadow-2xl animate-modalFadeIn';

  return (
    <div className={containerClasses}>
      <div className={cardClasses}>
        {/* Header */}
        <div className="px-5 py-3 border-b border-[#6382BF]/25 flex items-center justify-between shrink-0 bg-[#0A1020]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#1A2540] border border-[#6382BF]/40 flex items-center justify-center text-[#4A7BF7]">
              <Sigma size={18} />
            </div>
            <div>
              <h3 className="font-bold text-[#E8ECF4] text-sm">Formula Booklet & Tables</h3>
              <p className="text-xs text-[#7B8FAD]">Official Pearson Edexcel formulas, PMCC & statistical tables</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#1A2540] hover:bg-[#4A7BF7] hover:text-white text-[#7B8FAD] border border-[#6382BF]/40 transition-colors"
            title="Close"
          >
            <X size={16} />
          </button>
        </div>

        {/* Navigation Tabs: Formulas | Tables | Official PDF */}
        <div className="px-5 py-2 bg-[#0A1020]/70 border-b border-[#6382BF]/20 flex items-center justify-between gap-2 text-xs shrink-0">
          <div className="flex items-center gap-1.5 bg-[#1A2540] p-1 rounded-lg border border-[#6382BF]/30">
            <button
              onClick={() => setActiveTab('formulas')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md font-medium transition-colors ${
                activeTab === 'formulas'
                  ? 'bg-[#4A7BF7] text-white font-semibold shadow-sm'
                  : 'text-[#7B8FAD] hover:text-[#E8ECF4]'
              }`}
            >
              <Sigma size={13} />
              <span>Formulas</span>
            </button>
            <button
              onClick={() => setActiveTab('tables')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md font-medium transition-colors ${
                activeTab === 'tables'
                  ? 'bg-[#4A7BF7] text-white font-semibold shadow-sm'
                  : 'text-[#7B8FAD] hover:text-[#E8ECF4]'
              }`}
            >
              <TableIcon size={13} />
              <span>Statistical Tables</span>
            </button>
            <button
              onClick={() => setActiveTab('pdf')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md font-medium transition-colors ${
                activeTab === 'pdf'
                  ? 'bg-[#4A7BF7] text-white font-semibold shadow-sm'
                  : 'text-[#7B8FAD] hover:text-[#E8ECF4]'
              }`}
            >
              <FileText size={13} />
              <span>Official PDF</span>
            </button>
          </div>

          {activeTab !== 'pdf' && (
            <div className="hidden sm:flex items-center gap-2">
              <a
                href={FORMULA_BOOKLET_PDF_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#1A2540] hover:bg-[#4A7BF7] hover:text-white text-[#7B8FAD] border border-[#6382BF]/30 rounded-md text-[11px] transition-colors"
              >
                <span>Maths PDF</span>
                <ExternalLink size={10} />
              </a>
              <a
                href={FURTHER_MATHS_FORMULA_BOOKLET_PDF_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#1A2540] hover:bg-[#4A7BF7] hover:text-white text-[#7B8FAD] border border-[#6382BF]/30 rounded-md text-[11px] transition-colors"
              >
                <span>FM PDF</span>
                <ExternalLink size={10} />
              </a>
            </div>
          )}
        </div>

        {/* TAB 1: FORMULAS LIST */}
        {activeTab === 'formulas' && (
          <div className="flex-1 flex flex-col overflow-hidden animate-fadeIn">
            {/* Filter & Search */}
            <div className="p-3.5 border-b border-[#6382BF]/20 space-y-2.5 bg-[#1A2540] shrink-0">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7B8FAD]" />
                <input
                  type="text"
                  placeholder="Search formulas (e.g. binomial, integration, normal)..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-[#0A1020] border border-[#6382BF]/30 rounded-xl text-xs text-[#E8ECF4] placeholder-[#5A6E8A] focus:outline-none focus:border-[#4A7BF7] focus:ring-1 focus:ring-[#4A7BF7]/40 transition-all duration-200"
                />
              </div>

              <div className="flex items-center gap-1.5 text-xs">
                <button
                  onClick={() => setActiveQual('all')}
                  className={`px-3 py-1 rounded-lg transition-all duration-150 active:scale-95 border ${
                    activeQual === 'all'
                      ? 'bg-[#4A7BF7] text-white border-[#4A7BF7] font-semibold shadow-sm'
                      : 'text-[#7B8FAD] hover:text-[#E8ECF4] bg-[#0A1020] border-[#6382BF]/20'
                  }`}
                >
                  All Formulas
                </button>
                <button
                  onClick={() => setActiveQual('maths')}
                  className={`px-3 py-1 rounded-lg transition-all duration-150 active:scale-95 border ${
                    activeQual === 'maths'
                      ? 'bg-[#4A7BF7] text-white border-[#4A7BF7] font-semibold shadow-sm'
                      : 'text-[#7B8FAD] hover:text-[#E8ECF4] bg-[#0A1020] border-[#6382BF]/20'
                  }`}
                >
                  A Level Maths
                </button>
                <button
                  onClick={() => setActiveQual('fm')}
                  className={`px-3 py-1 rounded-lg transition-all duration-150 active:scale-95 border ${
                    activeQual === 'fm'
                      ? 'bg-[#4A7BF7] text-white border-[#4A7BF7] font-semibold shadow-sm'
                      : 'text-[#7B8FAD] hover:text-[#E8ECF4] bg-[#0A1020] border-[#6382BF]/20'
                  }`}
                >
                  Further Maths
                </button>
              </div>
            </div>

            {/* Content List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-5">
              {filteredCategories.length === 0 ? (
                <div className="text-center py-12 text-[#7B8FAD] text-xs">
                  No formulas match your search query.
                </div>
              ) : (
                filteredCategories.map((category) => (
                  <div key={category.title} className="space-y-3">
                    <div className="border-b border-[#6382BF]/20 pb-1.5 flex items-center justify-between">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#E8ECF4] flex items-center gap-2">
                        <BookOpen size={14} className="text-[#4A7BF7]" />
                        <span>{category.title}</span>
                      </h4>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-[#0A1020] text-[#7B8FAD] border border-[#6382BF]/30 font-medium">
                        {category.qualification}
                      </span>
                    </div>

                    <div className="space-y-3">
                      {category.sections.map((section) => (
                        <div key={section.sectionTitle} className="space-y-2">
                          <h5 className="text-[11px] font-semibold text-[#7B8FAD] uppercase tracking-wide">
                            {section.sectionTitle}
                          </h5>
                          <div className="grid grid-cols-1 gap-2">
                            {section.items.map((item) => (
                              <div
                                key={item.name}
                                className="p-3 bg-[#0A1020] border border-[#6382BF]/25 rounded-lg space-y-1.5 hover:border-[#4A7BF7]/40 transition-colors"
                              >
                                <div className="text-xs font-semibold text-[#E8ECF4]">
                                  {item.name}
                                </div>
                                <div className="py-1 px-2 rounded bg-[#1A2540] border border-[#6382BF]/20 text-xs overflow-x-auto text-[#E8ECF4]">
                                  <MathRenderer math={item.latex} displayMode={true} />
                                </div>
                                {item.notes && (
                                  <div className="text-[11px] text-[#7B8FAD]">
                                    {item.notes}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 2: STATISTICAL & MECHANICS TABLES */}
        {activeTab === 'tables' && (
          <div className="flex-1 flex flex-col overflow-hidden animate-fadeIn">
            {/* Table Selector Sub-Bar */}
            <div className="p-3 border-b border-[#6382BF]/20 bg-[#1A2540] flex flex-wrap items-center gap-1.5 shrink-0 overflow-x-auto">
              {STATISTICAL_TABLES.map((table) => {
                const isSelected = table.id === activeTable.id;
                return (
                  <button
                    key={table.id}
                    onClick={() => setActiveTableId(table.id)}
                    className={`px-3 py-1 rounded-md text-xs font-medium border transition-colors shrink-0 ${
                      isSelected
                        ? 'bg-[#4A7BF7] text-white border-[#4A7BF7] font-semibold shadow-sm'
                        : 'bg-[#0A1020] text-[#7B8FAD] hover:text-[#E8ECF4] border-[#6382BF]/20'
                    }`}
                  >
                    {table.id === 'pmcc' && 'PMCC (r)'}
                    {table.id === 'spearman' && "Spearman's (r_s)"}
                    {table.id === 'normal-points' && 'Normal Points'}
                    {table.id === 'normal-cdf' && 'Normal Φ(z)'}
                    {table.id === 'chi-squared' && 'Chi-Squared (χ²)'}
                    {table.id === 't-distribution' && 'Student t'}
                    {table.id === 'centers-of-mass' && 'Centers of Mass'}
                  </button>
                );
              })}
            </div>

            {/* Table Details Banner */}
            <div className="px-5 py-2.5 bg-[#0A1020]/90 border-b border-[#6382BF]/20 flex items-center justify-between gap-3 shrink-0">
              <div>
                <h4 className="text-xs font-bold text-[#E8ECF4]">{activeTable.title}</h4>
                <p className="text-[11px] text-[#7B8FAD]">{activeTable.description}</p>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#1A2540] text-[#4A7BF7] border border-[#6382BF]/30 font-semibold shrink-0">
                {activeTable.qualification}
              </span>
            </div>

            {/* Rendered Table */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              <div className="border border-[#6382BF]/25 rounded-xl overflow-x-auto bg-[#0A1020] shadow-sm">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-[#6382BF]/25 bg-[#1A2540] text-[#7B8FAD] text-[11px] font-semibold uppercase tracking-wider">
                      {activeTable.headers.map((header, idx) => (
                        <th key={idx} className="py-2.5 px-3 whitespace-pre-line">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#6382BF]/15 font-mono text-[11px]">
                    {activeTable.rows.map((row, idx) => (
                      <tr key={idx} className="hover:bg-[#1A2540]/60 transition-colors">
                        <td className="py-2 px-3 font-semibold text-[#E8ECF4] whitespace-nowrap">
                          {row.label}
                        </td>
                        {row.values.map((val, vIdx) => (
                          <td key={vIdx} className="py-2 px-3 text-[#E8ECF4]/90 whitespace-nowrap">
                            {val}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {activeTable.notes && (
                <div className="p-3 rounded-lg bg-[#0A1020] border border-[#6382BF]/20 text-[11px] text-[#7B8FAD]">
                  <span className="font-semibold text-[#E8ECF4]">Notes: </span>
                  {activeTable.notes}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: EMBEDDED OFFICIAL PDF BOOKLET */}
        {activeTab === 'pdf' && (
          <div className="flex-1 flex flex-col h-full overflow-hidden animate-fadeIn">
            {/* Qualification Selector & Controls for PDF */}
            <div className="px-4 py-2.5 border-b border-[#6382BF]/20 bg-[#1A2540] flex flex-wrap items-center justify-between gap-2.5 shrink-0">
              <div className="flex items-center gap-1.5 text-xs">
                <button
                  onClick={() => setActivePdfQual('maths')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-colors ${
                    activePdfQual === 'maths'
                      ? 'bg-[#4A7BF7] text-white font-semibold shadow-sm'
                      : 'bg-[#0A1020] text-[#7B8FAD] hover:text-[#E8ECF4] border border-[#6382BF]/30'
                  }`}
                >
                  <GraduationCap size={14} />
                  <span>A Level Mathematics</span>
                </button>
                <button
                  onClick={() => setActivePdfQual('fm')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-colors ${
                    activePdfQual === 'fm'
                      ? 'bg-[#4A7BF7] text-white font-semibold shadow-sm'
                      : 'bg-[#0A1020] text-[#7B8FAD] hover:text-[#E8ECF4] border border-[#6382BF]/30'
                  }`}
                >
                  <Layers size={14} />
                  <span>Further Mathematics</span>
                </button>
              </div>

              <div className="flex items-center gap-2 text-xs">
                {/* Fit Mode Toggle */}
                <div className="flex items-center bg-[#0A1020] p-0.5 rounded-lg border border-[#6382BF]/30 text-[11px]">
                  <button
                    onClick={() => setFitMode('FitH')}
                    className={`px-2 py-0.5 rounded font-medium transition-colors ${
                      fitMode === 'FitH'
                        ? 'bg-[#4A7BF7] text-white font-semibold'
                        : 'text-[#7B8FAD] hover:text-[#E8ECF4]'
                    }`}
                    title="Fit to page width"
                  >
                    Fit Width
                  </button>
                  <button
                    onClick={() => setFitMode('Fit')}
                    className={`px-2 py-0.5 rounded font-medium transition-colors ${
                      fitMode === 'Fit'
                        ? 'bg-[#4A7BF7] text-white font-semibold'
                        : 'text-[#7B8FAD] hover:text-[#E8ECF4]'
                    }`}
                    title="Fit entire page"
                  >
                    Fit Page
                  </button>
                </div>

                <a
                  href={activePdfQual === 'maths' ? FORMULA_BOOKLET_PDF_URL : FURTHER_MATHS_FORMULA_BOOKLET_PDF_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#0A1020] hover:bg-[#4A7BF7]/20 text-[#E8ECF4] border border-[#6382BF]/30 text-xs font-medium transition-colors"
                >
                  <span>Open in Tab</span>
                  <ExternalLink size={11} />
                </a>
              </div>
            </div>

            {/* Iframe Viewport: Solid full-height container */}
            <div className="relative flex-1 w-full h-full min-h-[450px] bg-white">
              <iframe
                key={`${activePdfQual}-${fitMode}`}
                src={`${
                  activePdfQual === 'maths'
                    ? FORMULA_BOOKLET_PDF_URL
                    : FURTHER_MATHS_FORMULA_BOOKLET_PDF_URL
                }#view=${fitMode}&toolbar=0&navpanes=0`}
                className="absolute inset-0 w-full h-full border-0"
                title="Official Formula Booklet PDF"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
