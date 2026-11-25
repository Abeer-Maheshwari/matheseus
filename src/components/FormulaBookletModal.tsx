import React, { useState, useMemo, useRef, useId, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FORMULA_BOOKLET_CATEGORIES,
  FORMULA_BOOKLET_PDF_URL,
  FURTHER_MATHS_FORMULA_BOOKLET_PDF_URL,
} from '../data/formulaBooklet';
import { STATISTICAL_TABLES } from '../data/statisticalTables';
import { MathRenderer } from './MathRenderer';
import { assetUrl } from '../utils/assets';
import { getSettings } from '../utils/settings';
import { isFormulaKatexWarmed, prewarmFormulaBookletKatexSync } from '../utils/prewarm';
import { contentFadeVariants, PILL_SPRING, EASE_SMOOTH } from '../utils/motion';
import { SectionLoader } from './SectionLoader';
import {
  BookOpen,
  FileText,
  Search,
  X,
  ExternalLink,
  Sigma,
  Table as TableIcon,
  Layers,
  GraduationCap,
  Copy,
  Check,
  Hash,
} from 'lucide-react';

interface FormulaBookletModalProps {
  onClose?: () => void;
  mode?: 'modal' | 'drawer' | 'page';
}

const makeSectionAnchor = (catTitle: string, secTitle: string) =>
  `${catTitle}-${secTitle}`.toLowerCase().replace(/[^a-z0-9]+/g, '-');

const TABLE_SHORT_LABELS: Record<string, string> = {
  'binomial-cdf': 'Binomial B(n, p)',
  'poisson-low': 'Poisson (λ = 0.5–5)',
  'poisson-high': 'Poisson (λ = 5.5–10)',
  'normal-points': 'Normal Points',
  'normal-cdf': 'Normal Φ(z)',
  'pmcc': 'PMCC (r)',
  'spearman': "Spearman's (r_s)",
  'chi-squared': 'Chi-Squared (χ²)',
  't-distribution': 'Student t',
  'f-distribution-05': 'F-Dist (p = 0.05)',
  'f-distribution-01': 'F-Dist (p = 0.01)',
  'random-numbers': 'Random Numbers',
  'centers-of-mass': 'Centres of Mass',
};

export const FormulaBookletModal: React.FC<FormulaBookletModalProps> = ({ onClose, mode = 'modal' }) => {
  const uniqueId = useId();
  const [activeTab, setActiveTab] = useState<'formulas' | 'tables' | 'pdf'>('formulas');
  const [search, setSearch] = useState('');
  const [activeQual, setActiveQual] = useState<'all' | 'maths' | 'fm'>('all');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const formulaScrollRef = useRef<HTMLDivElement | null>(null);

  // Tables state
  const [activeTableId, setActiveTableId] = useState<string>('binomial-cdf');
  const [tableRowFilter, setTableRowFilter] = useState('');
  const [highlightedRowIdx, setHighlightedRowIdx] = useState<number | null>(null);
  const activeTable = STATISTICAL_TABLES.find((t) => t.id === activeTableId) || STATISTICAL_TABLES[0];

  // PDF Viewer state — uses preferred Fit setting from SettingsModal
  const [activePdfQual, setActivePdfQual] = useState<'maths' | 'fm'>('maths');
  const [fitMode, setFitMode] = useState<'FitH' | 'Fit'>(() => getSettings().defaultPdfFit);
  const [isReady, setIsReady] = useState<boolean>(() => isFormulaKatexWarmed());
  const [pdfLoading, setPdfLoading] = useState(true);

  useEffect(() => {
    if (isReady) return;
    const timer = window.setTimeout(() => {
      prewarmFormulaBookletKatexSync();
      setIsReady(true);
    }, 270);
    return () => window.clearTimeout(timer);
  }, [isReady]);

  useEffect(() => {
    if (activeTab !== 'pdf') return;
    setPdfLoading(true);
    const fallback = window.setTimeout(() => setPdfLoading(false), 7000);
    return () => window.clearTimeout(fallback);
  }, [activeTab, activePdfQual, fitMode]);

  const isDrawer = mode === 'drawer';

  const filteredCategories = useMemo(() => {
    const query = search.trim().toLowerCase();
    return FORMULA_BOOKLET_CATEGORIES.filter((cat) => {
      if (activeQual === 'maths' && cat.qualification !== 'A Level Mathematics') return false;
      if (activeQual === 'fm' && cat.qualification !== 'Further Mathematics') return false;
      return true;
    })
      .map((cat) => {
        const matchingSections = cat.sections
          .map((sec) => {
            const filteredItems = sec.items.filter((item) => {
              if (!query) return true;
              return (
                item.name.toLowerCase().includes(query) ||
                (item.notes && item.notes.toLowerCase().includes(query)) ||
                item.latex.toLowerCase().includes(query) ||
                sec.sectionTitle.toLowerCase().includes(query)
              );
            });
            return { ...sec, items: filteredItems };
          })
          .filter((sec) => sec.items.length > 0);

        return { ...cat, sections: matchingSections };
      })
      .filter((cat) => cat.sections.length > 0);
  }, [activeQual, search]);

  const totalFormulaCount = useMemo(
    () =>
      filteredCategories.reduce(
        (acc, cat) => acc + cat.sections.reduce((sAcc, sec) => sAcc + sec.items.length, 0),
        0
      ),
    [filteredCategories]
  );

  const filteredTableRows = useMemo(() => {
    const q = tableRowFilter.trim().toLowerCase();
    if (!q) return activeTable.rows;
    return activeTable.rows.filter(
      (row) =>
        row.label.toLowerCase().includes(q) ||
        row.values.some((v) => String(v).toLowerCase().includes(q))
    );
  }, [activeTable, tableRowFilter]);

  const handleCopyLatex = (key: string, latex: string) => {
    navigator.clipboard?.writeText(latex);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey((prev) => (prev === key ? null : prev));
    }, 1500);
  };

  const scrollToSection = (anchorId: string) => {
    const el = document.getElementById(anchorId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleTableSelect = (id: string) => {
    setActiveTableId(id);
    setTableRowFilter('');
    setHighlightedRowIdx(null);
  };

  const containerClasses = isDrawer
    ? 'w-full h-full flex flex-col overflow-hidden bg-[#1A2540]'
    : mode === 'page'
    ? 'w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 text-[#E8ECF4]'
    : 'fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-[#0A1020]/80 backdrop-blur-sm text-[#E8ECF4]';

  const cardClasses = isDrawer
    ? 'flex flex-col h-full w-full overflow-hidden'
    : mode === 'page'
    ? 'bg-[#1A2540] border border-[#6382BF]/25 rounded-2xl w-full h-[calc(100vh-112px)] min-h-[700px] overflow-hidden flex flex-col shadow-xl'
    : 'bg-[#1A2540] border border-[#6382BF]/30 rounded-2xl w-full max-w-6xl xl:max-w-7xl h-[90vh] md:h-[92vh] overflow-hidden flex flex-col shadow-2xl';

  return (
    <div className={containerClasses}>
      <div className={cardClasses}>
        {/* Header */}
        <div className={`border-b border-[#6382BF]/25 flex items-center justify-between shrink-0 bg-[#0A1020] ${isDrawer ? 'px-4 py-3' : 'px-6 py-4'}`}>
          <div className="flex items-center gap-3.5">
            <div className={`${isDrawer ? 'w-8 h-8' : 'w-10 h-10'} rounded-xl bg-[#1A2540] border border-[#6382BF]/40 flex items-center justify-center text-[#4A7BF7] shadow-inner`}>
              <Sigma size={isDrawer ? 17 : 20} />
            </div>
            <div>
              <h3 className={`font-bold text-[#E8ECF4] ${isDrawer ? 'text-sm' : 'text-base sm:text-lg'}`}>
                Formulae Booklet & Statistical Tables
              </h3>
              <p className="text-xs text-[#7B8FAD]">
                Edexcel AS & A Level Maths & Further Maths
              </p>
            </div>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#1A2540] hover:bg-[#4A7BF7] hover:text-white text-[#7B8FAD] border border-[#6382BF]/30 transition-all duration-300 text-xs font-semibold active:scale-95 shadow-sm"
              title="Return to previous screen"
            >
              <span>{mode === 'page' ? 'Back' : 'Close'}</span>
              <X size={14} />
            </button>
          )}
        </div>

        {/* Navigation Tabs: Formulas | Statistical Tables | Official PDF */}
        <div className="px-5 py-2.5 bg-[#0A1020]/70 border-b border-[#6382BF]/20 flex flex-wrap items-center justify-between gap-2 text-xs shrink-0">
          <div className="flex items-center gap-1.5 bg-[#1A2540] p-1 rounded-xl border border-[#6382BF]/30">
            {[
              { id: 'formulas' as const, label: 'Formulas', Icon: Sigma },
              { id: 'tables' as const, label: 'Statistical Tables', Icon: TableIcon },
              { id: 'pdf' as const, label: 'Official PDF', Icon: FileText },
            ].map(({ id, label, Icon }) => {
              const isSelected = activeTab === id;
              return (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-medium transition-colors ${
                    isSelected ? 'text-white font-semibold' : 'text-[#7B8FAD] hover:text-[#E8ECF4]'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId={`formula-tab-pill-${uniqueId}`}
                      className="absolute inset-0 bg-[#4A7BF7] rounded-lg shadow-sm shadow-[#4A7BF7]/30"
                      transition={PILL_SPRING}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    <Icon size={13} />
                    <span>{label}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="hidden sm:flex items-center gap-2 text-[11px] text-[#7B8FAD]">
            {activeTab === 'formulas' && (
              <span>
                <strong className="text-[#E8ECF4]">{totalFormulaCount}</strong> official booklet formulae
              </span>
            )}
            {activeTab === 'tables' && (
              <span>{isDrawer ? 'Filter rows or tap to highlight' : 'Click any table row to highlight across columns'}</span>
            )}
            {activeTab === 'pdf' && (
              <span>Pearson Edexcel MFSP Official Booklet</span>
            )}
          </div>
        </div>

        {/* Tab Content with Fluid Transition */}
        <AnimatePresence mode="wait" initial={false}>
          {activeTab === 'formulas' && (
            <motion.div
              key="formulas"
              variants={contentFadeVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="flex-1 flex flex-col overflow-hidden"
            >
              {/* Mobile / Drawer Compact Controls */}
              <div className={`${isDrawer ? 'flex' : 'flex md:hidden'} flex-col gap-2.5 p-3.5 border-b border-[#6382BF]/20 bg-[#1A2540] shrink-0`}>
                <div className="relative max-w-xl w-full mx-auto">
                  <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7B8FAD]" />
                  <input
                    type="text"
                    placeholder="Search formulas (e.g. binomial, integration, Maclaurin)..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-9 pr-8 py-2 bg-[#0A1020] border border-[#6382BF]/30 rounded-xl text-xs text-[#E8ECF4] placeholder-[#5A6E8A] focus:outline-none focus:border-[#4A7BF7] focus:ring-1 focus:ring-[#4A7BF7]/40 transition-all"
                  />
                  {search && (
                    <button
                      onClick={() => setSearch('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-md text-[#7B8FAD] hover:text-[#E8ECF4]"
                      title="Clear search"
                    >
                      <X size={12} />
                    </button>
                  )}
                </div>
                <div className="flex items-center justify-center gap-1.5 text-xs">
                  {[
                    { id: 'all' as const, label: 'All Formulae' },
                    { id: 'maths' as const, label: 'A Level Maths' },
                    { id: 'fm' as const, label: 'Further Maths' },
                  ].map(({ id, label }) => {
                    const isActive = activeQual === id;
                    return (
                      <button
                        key={id}
                        onClick={() => setActiveQual(id)}
                        className={`relative px-2.5 py-1 rounded-lg transition-colors border ${
                          isActive
                            ? 'text-white border-transparent font-semibold'
                            : 'bg-[#0A1020] text-[#7B8FAD] border-[#6382BF]/20 hover:text-[#E8ECF4]'
                        }`}
                      >
                        {isActive && (
                          <motion.div
                            layoutId={`formula-qual-mobile-${uniqueId}`}
                            className="absolute inset-0 bg-[#4A7BF7] rounded-lg"
                            transition={PILL_SPRING}
                          />
                        )}
                        <span className="relative z-10">{label}</span>
                      </button>
                    );
                  })}
                </div>
                {isDrawer && filteredCategories.length > 0 && (
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 text-[11px]">
                    <span className="text-[#7B8FAD] font-semibold shrink-0">Jump:</span>
                    {filteredCategories.flatMap((cat) =>
                      cat.sections.map((sec) => {
                        const anchor = makeSectionAnchor(cat.title, sec.sectionTitle);
                        return (
                          <button
                            key={anchor}
                            onClick={() => scrollToSection(anchor)}
                            className="px-2.5 py-1 rounded-md bg-[#0A1020] hover:bg-[#4A7BF7]/15 text-[#7B8FAD] hover:text-[#E8ECF4] border border-[#6382BF]/25 hover:border-[#4A7BF7]/45 whitespace-nowrap transition-colors duration-200 shrink-0"
                          >
                            {sec.sectionTitle}
                          </button>
                        );
                      })
                    )}
                  </div>
                )}
              </div>

              {/* Body: All Filters on Side (md+) + Centered Search & Formula Cards */}
              <div className="flex-1 flex overflow-hidden">
                {!isDrawer && (
                  <aside className="hidden md:flex w-64 xl:w-72 border-r border-[#6382BF]/20 bg-[#0F1729]/50 flex-col overflow-y-auto p-4 space-y-5 shrink-0">
                    {/* Side Qualification Filter */}
                    <div className="space-y-2">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[#7B8FAD] px-1">
                        Qualification Filter
                      </div>
                      <div className="flex flex-col gap-1 bg-[#0A1020] p-1.5 rounded-xl border border-[#6382BF]/25 text-xs">
                        {[
                          { id: 'all' as const, label: 'All Formulae' },
                          { id: 'maths' as const, label: 'A Level Maths' },
                          { id: 'fm' as const, label: 'Further Maths' },
                        ].map(({ id, label }) => {
                          const isActive = activeQual === id;
                          return (
                            <button
                              key={id}
                              onClick={() => setActiveQual(id)}
                              className={`relative w-full text-left px-3 py-2 rounded-lg transition-colors ${
                                isActive ? 'text-white font-semibold' : 'text-[#7B8FAD] hover:text-[#E8ECF4]'
                              }`}
                            >
                              {isActive && (
                                <motion.div
                                  layoutId={`formula-qual-side-${uniqueId}`}
                                  className="absolute inset-0 bg-[#4A7BF7] rounded-lg shadow-sm"
                                  transition={PILL_SPRING}
                                />
                              )}
                              <span className="relative z-10">{label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Side Quick-Jump Topic Links */}
                    {filteredCategories.length > 0 && (
                      <div className="space-y-3 pt-1 border-t border-[#6382BF]/15">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-[#7B8FAD] px-1">
                          Quick Jump ({totalFormulaCount})
                        </div>
                        {filteredCategories.map((cat) => (
                          <div key={cat.title} className="space-y-1.5">
                            <div className="text-xs font-bold text-[#E8ECF4] px-2 flex items-center gap-1.5">
                              <BookOpen size={12} className="text-[#4A7BF7] shrink-0" />
                              <span className="truncate">{cat.title}</span>
                            </div>
                            <div className="space-y-0.5">
                              {cat.sections.map((sec) => {
                                const anchor = makeSectionAnchor(cat.title, sec.sectionTitle);
                                return (
                                  <button
                                    key={sec.sectionTitle}
                                    onClick={() => scrollToSection(anchor)}
                                    className="w-full text-left px-2.5 py-1.5 rounded-lg text-[11px] text-[#7B8FAD] hover:text-[#E8ECF4] hover:bg-[#1A2540] transition-colors flex items-center justify-between gap-2 group"
                                  >
                                    <span className="truncate">{sec.sectionTitle}</span>
                                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#0A1020] text-[#7B8FAD] group-hover:text-[#4A7BF7] border border-[#6382BF]/20 shrink-0">
                                      {sec.items.length}
                                    </span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </aside>
                )}

                {/* Main Content Area: Centered Search Bar + Scrollable Formula Cards */}
                <div className="flex-1 flex flex-col overflow-hidden min-w-0">
                  {!isDrawer && (
                    <div className="hidden md:flex justify-center px-6 py-3.5 border-b border-[#6382BF]/20 bg-[#1A2540] shrink-0">
                      <div className="relative w-full max-w-2xl">
                        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7B8FAD]" />
                        <input
                          type="text"
                          placeholder="Search official booklet formulae (e.g. Binomial, Maclaurin, Compound Angle)..."
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          className="w-full pl-11 pr-10 py-2.5 bg-[#0A1020] border border-[#6382BF]/30 hover:border-[#6382BF]/50 rounded-2xl text-sm text-[#E8ECF4] placeholder-[#5A6E8A] focus:outline-none focus:border-[#4A7BF7] focus:ring-1 focus:ring-[#4A7BF7]/40 transition-all shadow-sm"
                        />
                        <AnimatePresence>
                          {search && (
                            <motion.button
                              initial={{ opacity: 0, scale: 0.75 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.75 }}
                              transition={{ duration: 0.16, ease: EASE_SMOOTH }}
                              onClick={() => setSearch('')}
                              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg text-[#7B8FAD] hover:text-[#E8ECF4] hover:bg-[#1E2B4A] transition-colors"
                              title="Clear search"
                            >
                              <X size={14} />
                            </motion.button>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  )}

                  <div ref={formulaScrollRef} className="flex-1 overflow-y-auto p-5 sm:p-6">
                    <AnimatePresence mode="wait" initial={false}>
                      {!isReady ? (
                        <SectionLoader
                          key="formula-loading"
                          label="Loading formula booklet..."
                          sublabel="Rendering mathematical formulae & equations"
                          className="min-h-[360px]"
                        />
                      ) : filteredCategories.length === 0 ? (
                        <motion.div
                          key="no-formula-results"
                          variants={contentFadeVariants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          className="text-center py-16 space-y-3"
                        >
                          <Sigma size={32} className="mx-auto text-[#7B8FAD]" />
                          <div className="text-sm font-semibold text-[#E8ECF4]">No formulas match your filter</div>
                          <p className="text-xs text-[#7B8FAD]">
                            Try clearing your search query or switching back to All Formulae.
                          </p>
                          <button
                            onClick={() => {
                              setSearch('');
                              setActiveQual('all');
                            }}
                            className="px-3.5 py-1.5 rounded-lg bg-[#4A7BF7] text-white text-xs font-semibold hover:bg-[#3D6CE0] transition-colors"
                          >
                            Reset Filters
                          </button>
                        </motion.div>
                      ) : (
                        <motion.div
                          key={`${activeQual}-${search.trim() ? 'filtered' : 'full'}`}
                          variants={contentFadeVariants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          className="space-y-8"
                        >
                          {filteredCategories.map((category) => (
                            <div
                              key={category.title}
                              className="space-y-5"
                            >
                              <div className="border-b border-[#6382BF]/25 pb-2 flex items-center justify-between gap-2">
                                <h4 className="text-sm font-bold uppercase tracking-wider text-[#E8ECF4] flex items-center gap-2">
                                  <BookOpen size={15} className="text-[#4A7BF7]" />
                                  <span>{category.title}</span>
                                </h4>
                                <span className="text-[11px] px-2.5 py-0.5 rounded-md bg-[#0A1020] text-[#7B8FAD] border border-[#6382BF]/30 font-medium">
                                  {category.qualification}
                                </span>
                              </div>

                              <div className="space-y-6">
                                {category.sections.map((section) => {
                                  const anchor = makeSectionAnchor(category.title, section.sectionTitle);
                                  return (
                                    <div key={section.sectionTitle} id={anchor} className="space-y-3 scroll-mt-4">
                                      <h5 className="text-xs font-semibold text-[#7B8FAD] uppercase tracking-wider">
                                        {section.sectionTitle}
                                      </h5>
                                      <div
                                        className={`grid gap-3 ${
                                          isDrawer ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'
                                        }`}
                                      >
                                        {section.items.map((item) => {
                                          const itemKey = `${category.title}-${section.sectionTitle}-${item.name}`;
                                          const isCopied = copiedKey === itemKey;
                                          return (
                                            <div
                                              key={item.name}
                                              className={`p-3.5 sm:p-4 bg-[#0A1020] border border-[#6382BF]/25 rounded-xl space-y-2.5 hover:border-[#4A7BF7]/45 transition-colors flex flex-col justify-between ${
                                                !isDrawer && item.wide ? 'lg:col-span-2' : ''
                                              }`}
                                            >
                                              <div className="flex items-start justify-between gap-2">
                                                <div className="text-xs sm:text-[13px] font-semibold text-[#E8ECF4] leading-snug">
                                                  {item.name}
                                                </div>
                                                <button
                                                  onClick={() => handleCopyLatex(itemKey, item.latex)}
                                                  className="p-1.5 rounded-lg bg-[#1A2540] border border-[#6382BF]/25 text-[#7B8FAD] hover:text-[#E8ECF4] hover:border-[#4A7BF7]/50 transition-colors shrink-0"
                                                  title="Copy LaTeX formula"
                                                >
                                                  <AnimatePresence mode="wait" initial={false}>
                                                    {isCopied ? (
                                                      <motion.span
                                                        key="copied"
                                                        initial={{ scale: 0.7, opacity: 0 }}
                                                        animate={{ scale: 1, opacity: 1 }}
                                                        exit={{ scale: 0.7, opacity: 0 }}
                                                        transition={{ duration: 0.16, ease: EASE_SMOOTH }}
                                                        className="block text-emerald-400"
                                                      >
                                                        <Check size={12} />
                                                      </motion.span>
                                                    ) : (
                                                      <motion.span
                                                        key="copy"
                                                        initial={{ scale: 0.7, opacity: 0 }}
                                                        animate={{ scale: 1, opacity: 1 }}
                                                        exit={{ scale: 0.7, opacity: 0 }}
                                                        transition={{ duration: 0.16, ease: EASE_SMOOTH }}
                                                        className="block"
                                                      >
                                                        <Copy size={12} />
                                                      </motion.span>
                                                    )}
                                                  </AnimatePresence>
                                                </button>
                                              </div>

                                              <div className="py-2.5 px-3 rounded-lg bg-[#1A2540] border border-[#6382BF]/20 text-xs sm:text-sm overflow-x-auto text-[#E8ECF4]">
                                                <MathRenderer math={item.latex} displayMode={true} />
                                              </div>

                                              {item.notes && (
                                                <div className="text-[11px] sm:text-xs text-[#7B8FAD] leading-relaxed">
                                                  {item.notes}
                                                </div>
                                              )}
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: STATISTICAL & MECHANICS TABLES */}
          {activeTab === 'tables' && (
            <motion.div
              key="tables"
              variants={contentFadeVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="flex-1 flex flex-col overflow-hidden"
            >
              {/* Centered Row Lookup Bar + Filters on the Side (Desktop) */}
              <div className="flex-1 flex overflow-hidden">
                {!isDrawer && (
                  <aside className="hidden md:flex w-64 xl:w-72 border-r border-[#6382BF]/20 bg-[#0F1729]/50 flex-col overflow-y-auto p-4 space-y-3 shrink-0">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#7B8FAD] px-1">
                      Statistical & Mechanics Tables
                    </div>
                    <div className="flex flex-col gap-1 bg-[#0A1020] p-1.5 rounded-xl border border-[#6382BF]/25 text-xs">
                      {STATISTICAL_TABLES.map((table) => {
                        const isSelected = table.id === activeTable.id;
                        return (
                          <button
                            key={table.id}
                            onClick={() => handleTableSelect(table.id)}
                            className={`relative w-full text-left px-3 py-2 rounded-lg font-medium transition-colors ${
                              isSelected ? 'text-white font-semibold' : 'text-[#7B8FAD] hover:text-[#E8ECF4]'
                            }`}
                          >
                            {isSelected && (
                              <motion.div
                                layoutId={`table-tab-side-${uniqueId}`}
                                className="absolute inset-0 bg-[#4A7BF7] rounded-lg shadow-sm"
                                transition={PILL_SPRING}
                              />
                            )}
                            <span className="relative z-10 block truncate">
                              {TABLE_SHORT_LABELS[table.id] ?? table.title}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </aside>
                )}

                <div className="flex-1 flex flex-col overflow-hidden min-w-0">
                  {/* Mobile/Drawer Table Selector Pills */}
                  <div className={`${isDrawer ? 'flex' : 'flex md:hidden'} items-center gap-1.5 p-3 border-b border-[#6382BF]/20 bg-[#1A2540] overflow-x-auto shrink-0`}>
                    {STATISTICAL_TABLES.map((table) => {
                      const isSelected = table.id === activeTable.id;
                      return (
                        <button
                          key={table.id}
                          onClick={() => handleTableSelect(table.id)}
                          className={`relative px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors shrink-0 whitespace-nowrap ${
                            isSelected
                              ? 'text-white border-transparent font-semibold'
                              : 'bg-[#0A1020] text-[#7B8FAD] hover:text-[#E8ECF4] border-[#6382BF]/20'
                          }`}
                        >
                          {isSelected && (
                            <motion.div
                              layoutId={`table-tab-mobile-${uniqueId}`}
                              className="absolute inset-0 bg-[#4A7BF7] rounded-lg"
                              transition={PILL_SPRING}
                            />
                          )}
                          <span className="relative z-10">
                            {TABLE_SHORT_LABELS[table.id] ?? table.title}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Centered Row Lookup Bar */}
                  <div className="px-5 py-3 border-b border-[#6382BF]/20 bg-[#1A2540] flex justify-center shrink-0">
                    <div className="relative w-full max-w-xl">
                      <Hash size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7B8FAD]" />
                      <input
                        type="text"
                        placeholder="Filter table row (e.g. 15, 1.96, Cone)..."
                        value={tableRowFilter}
                        onChange={(e) => {
                          setTableRowFilter(e.target.value);
                          setHighlightedRowIdx(null);
                        }}
                        className="w-full pl-9 pr-8 py-2 bg-[#0A1020] border border-[#6382BF]/30 rounded-xl text-xs sm:text-sm text-[#E8ECF4] placeholder-[#5A6E8A] focus:outline-none focus:border-[#4A7BF7]"
                      />
                      {tableRowFilter && (
                        <button
                          onClick={() => setTableRowFilter('')}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#7B8FAD] hover:text-[#E8ECF4]"
                        >
                          <X size={13} />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Animated Table Body Switching */}
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={activeTable.id}
                      variants={contentFadeVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="flex-1 flex flex-col overflow-hidden"
                    >
                      {/* Table Details Banner */}
                      <div className="px-5 py-3 bg-[#0A1020]/90 border-b border-[#6382BF]/20 flex items-center justify-between gap-3 shrink-0">
                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-[#E8ECF4]">{activeTable.title}</h4>
                          <p className="text-[11px] sm:text-xs text-[#7B8FAD]">{activeTable.description}</p>
                        </div>
                        <span className="text-[11px] px-2.5 py-0.5 rounded-md bg-[#1A2540] text-[#4A7BF7] border border-[#6382BF]/30 font-semibold shrink-0">
                          {activeTable.qualification}
                        </span>
                      </div>

                      {/* Rendered Table */}
                      <div className="flex-1 overflow-y-auto p-5 space-y-3">
                        <div className="border border-[#6382BF]/25 rounded-xl overflow-x-auto bg-[#0A1020] shadow-sm">
                          <table className="w-full text-left text-xs border-collapse">
                            <thead>
                              <tr className="border-b border-[#6382BF]/25 bg-[#1A2540] text-[#7B8FAD] text-[11px] font-semibold uppercase tracking-wider">
                                {activeTable.headers.map((header, idx) => (
                                  <th key={idx} className="py-3 px-4 whitespace-pre-line">
                                    {header}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-[#6382BF]/15 font-mono text-xs">
                              {filteredTableRows.length === 0 ? (
                                <tr>
                                  <td
                                    colSpan={activeTable.headers.length}
                                    className="py-8 text-center text-[#7B8FAD] font-sans"
                                  >
                                    No table rows match "{tableRowFilter}"
                                  </td>
                                </tr>
                              ) : (
                                filteredTableRows.map((row, idx) => {
                                  const isHighlighted = highlightedRowIdx === idx;
                                  return (
                                    <tr
                                      key={`${row.label}-${idx}`}
                                      onClick={() =>
                                        setHighlightedRowIdx((prev) => (prev === idx ? null : idx))
                                      }
                                      className={`cursor-pointer transition-colors ${
                                        isHighlighted
                                          ? 'bg-[#4A7BF7]/20 hover:bg-[#4A7BF7]/25'
                                          : 'hover:bg-[#1A2540]/60'
                                      }`}
                                    >
                                      <td className="py-2.5 px-4 font-semibold text-[#E8ECF4] whitespace-nowrap">
                                        {row.label}
                                      </td>
                                      {row.values.map((val, vIdx) => (
                                        <td key={vIdx} className="py-2.5 px-4 text-[#E8ECF4]/90 whitespace-nowrap">
                                          {val}
                                        </td>
                                      ))}
                                    </tr>
                                  );
                                })
                              )}
                            </tbody>
                          </table>
                        </div>

                        {activeTable.notes && (
                          <div className="p-3.5 rounded-xl bg-[#0A1020] border border-[#6382BF]/20 text-xs text-[#7B8FAD]">
                            <span className="font-semibold text-[#E8ECF4]">Notes: </span>
                            {activeTable.notes}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: EMBEDDED OFFICIAL PDF BOOKLET */}
          {activeTab === 'pdf' && (
            <motion.div
              key="pdf"
              variants={contentFadeVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="flex-1 flex flex-col h-full overflow-hidden"
            >
              {/* Qualification Selector & Controls for PDF */}
              <div className="px-5 py-3 border-b border-[#6382BF]/20 bg-[#1A2540] flex flex-wrap items-center justify-between gap-2.5 shrink-0">
                <div className="flex items-center gap-1 bg-[#0A1020] p-1 rounded-xl border border-[#6382BF]/30 text-xs">
                  {[
                    { id: 'maths' as const, label: 'A Level Mathematics', Icon: GraduationCap },
                    { id: 'fm' as const, label: 'Further Mathematics', Icon: Layers },
                  ].map(({ id, label, Icon }) => {
                    const isActive = activePdfQual === id;
                    return (
                      <button
                        key={id}
                        onClick={() => setActivePdfQual(id)}
                        className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-colors ${
                          isActive ? 'text-white font-semibold' : 'text-[#7B8FAD] hover:text-[#E8ECF4]'
                        }`}
                      >
                        {isActive && (
                          <motion.div
                            layoutId={`pdf-qual-pill-${uniqueId}`}
                            className="absolute inset-0 bg-[#4A7BF7] rounded-lg shadow-sm"
                            transition={PILL_SPRING}
                          />
                        )}
                        <span className="relative z-10 flex items-center gap-1.5">
                          <Icon size={14} />
                          <span>{label}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center gap-2 text-xs">
                  {/* Fit Mode Toggle */}
                  <div className="flex items-center bg-[#0A1020] p-1 rounded-xl border border-[#6382BF]/30 text-[11px]">
                    {[
                      { id: 'FitH' as const, label: 'Fit Width', title: 'Fit to page width' },
                      { id: 'Fit' as const, label: 'Fit Page', title: 'Fit entire page' },
                    ].map(({ id, label, title }) => {
                      const isActive = fitMode === id;
                      return (
                        <button
                          key={id}
                          onClick={() => setFitMode(id)}
                          title={title}
                          className={`relative px-2.5 py-1 rounded-lg font-medium transition-colors ${
                            isActive ? 'text-white font-semibold' : 'text-[#7B8FAD] hover:text-[#E8ECF4]'
                          }`}
                        >
                          {isActive && (
                            <motion.div
                              layoutId={`pdf-fit-pill-${uniqueId}`}
                              className="absolute inset-0 bg-[#4A7BF7] rounded-lg"
                              transition={PILL_SPRING}
                            />
                          )}
                          <span className="relative z-10">{label}</span>
                        </button>
                      );
                    })}
                  </div>

                  <a
                    href={assetUrl(activePdfQual === 'maths' ? FORMULA_BOOKLET_PDF_URL : FURTHER_MATHS_FORMULA_BOOKLET_PDF_URL)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0A1020] hover:bg-[#4A7BF7]/20 text-[#E8ECF4] border border-[#6382BF]/30 text-xs font-medium transition-colors"
                  >
                    <span>Open in Tab</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>

              {/* Iframe Viewport with Loading Overlay & Smooth Cross-Fade */}
              <div className="relative flex-1 w-full h-full min-h-[540px] bg-[#0A1020] overflow-hidden">
                <AnimatePresence>
                  {pdfLoading && (
                    <motion.div
                      key="pdf-loading-overlay"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.16, ease: EASE_SMOOTH }}
                      className="absolute inset-0 z-10 flex items-center justify-center bg-[#0A1020]"
                    >
                      <SectionLoader
                        label="Loading official PDF booklet..."
                        sublabel={activePdfQual === 'maths' ? 'A Level Mathematics Formulae' : 'Further Mathematics Formulae'}
                        className="min-h-[240px]"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.iframe
                    key={`${activePdfQual}-${fitMode}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: pdfLoading ? 0 : 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, ease: EASE_SMOOTH }}
                    onLoad={() => setPdfLoading(false)}
                    onError={() => setPdfLoading(false)}
                    src={`${assetUrl(
                      activePdfQual === 'maths'
                        ? FORMULA_BOOKLET_PDF_URL
                        : FURTHER_MATHS_FORMULA_BOOKLET_PDF_URL
                    )}#view=${fitMode}&toolbar=0&navpanes=0`}
                    className="absolute inset-0 w-full h-full border-0 bg-white"
                    title="Official Formula Booklet PDF"
                  />
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
