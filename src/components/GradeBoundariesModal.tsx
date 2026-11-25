import React, { useState, useMemo, useId, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GRADE_BOUNDARIES } from '../data/gradeBoundaries';
import { GradeThresholds } from '../types';
import { X, Award, TrendingUp, Calculator } from 'lucide-react';
import { contentFadeVariants, PILL_SPRING } from '../utils/motion';
import { SectionLoader } from './SectionLoader';

interface GradeBoundariesModalProps {
  onClose?: () => void;
  mode?: 'modal' | 'page';
}

const QUALIFICATION_SHORT_LABELS: Record<string, string> = {
  'A Level Mathematics (9MA0)': 'A Level Maths (9MA0)',
  'A Level Further Mathematics (9FM0)': 'Further Maths (9FM0)',
  'AS Mathematics (8MA0)': 'AS Maths (8MA0)',
  'AS Further Mathematics (8FM0)': 'AS Further (8FM0)',
};

const QUALIFICATION_NOTES: Record<string, string> = {
  'A Level Mathematics (9MA0)':
    'In Edexcel linear A Level Mathematics (9MA0), overall grades are determined strictly by aggregating raw marks across all three papers (Paper 1 + Paper 2 + Paper 3 out of 300). Individual paper thresholds shown above are Pearson’s notional guides.',
  'A Level Further Mathematics (9FM0)':
    'In Edexcel A Level Further Mathematics (9FM0), overall grades are determined by your combined mark out of 300 across Core Pure 1 & 2 plus your two optional papers (3A–4D). Thresholds depend on your exact option route selected above.',
  'AS Mathematics (8MA0)':
    'In Edexcel AS Level Mathematics (8MA0), overall grades (A–E) are determined strictly by aggregating Paper 1 (100 marks) and Paper 2 (60 marks) out of 160.',
  'AS Further Mathematics (8FM0)':
    'In Edexcel AS Level Further Mathematics (8FM0), overall grades (A–E) depend on your combined raw mark out of 160 across Core Pure (Paper 01, 80 marks) and your two optional booklets (80 marks combined).',
};

export const GradeBoundariesModal: React.FC<GradeBoundariesModalProps> = ({ onClose, mode = 'modal' }) => {
  const uniqueId = useId();

  const qualifications = useMemo(
    () => Array.from(new Set(GRADE_BOUNDARIES.map((g) => g.qualification))),
    []
  );

  const [selectedQual, setSelectedQual] = useState(qualifications[0]);
  const yearsForQual = useMemo(
    () => GRADE_BOUNDARIES.filter((g) => g.qualification === selectedQual),
    [selectedQual]
  );

  const [selectedYear, setSelectedYear] = useState(GRADE_BOUNDARIES[0].year);
  const selected = useMemo(
    () => yearsForQual.find((g) => g.year === selectedYear) ?? yearsForQual[0],
    [yearsForQual, selectedYear]
  );

  const [selectedRouteId, setSelectedRouteId] = useState<string>(
    () => GRADE_BOUNDARIES[0].optionRoutes?.[0]?.id ?? ''
  );
  const [userScore, setUserScore] = useState('');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsReady(true), 180);
    return () => window.clearTimeout(timer);
  }, []);

  const handleSelectQual = (qual: string) => {
    setSelectedQual(qual);
    const matching = GRADE_BOUNDARIES.filter((g) => g.qualification === qual);
    const nextItem = matching.find((g) => g.year === selectedYear) ?? matching[0];
    setSelectedYear(nextItem.year);
    setSelectedRouteId(nextItem.optionRoutes?.[0]?.id ?? '');
  };

  const handleSelectYear = (year: string) => {
    setSelectedYear(year);
    const nextItem = yearsForQual.find((g) => g.year === year) ?? yearsForQual[0];
    if (nextItem.optionRoutes?.length) {
      const keepsSameRoute = nextItem.optionRoutes.some((r) => r.id === selectedRouteId);
      if (!keepsSameRoute) {
        setSelectedRouteId(nextItem.optionRoutes[0].id);
      }
    } else {
      setSelectedRouteId('');
    }
  };

  const activeRoute = selected.optionRoutes?.find((r) => r.id === selectedRouteId) ?? selected.optionRoutes?.[0];
  const activeBoundaries: GradeThresholds = activeRoute ? activeRoute.boundaries : selected.boundaries;
  const gradeEntries = Object.entries(activeBoundaries) as [keyof GradeThresholds, number][];
  const hasAStar = activeBoundaries['A*'] !== undefined;

  const parsedScore = userScore.trim() === '' ? null : Number(userScore);
  const scoreEvaluation = useMemo(() => {
    if (parsedScore === null || Number.isNaN(parsedScore) || parsedScore < 0) return null;
    const clampedScore = Math.min(parsedScore, selected.overallMax);

    for (let i = 0; i < gradeEntries.length; i++) {
      const [grade, minMark] = gradeEntries[i];
      if (clampedScore >= minMark) {
        const marginAbove = clampedScore - minMark;
        const nextTier = i > 0 ? gradeEntries[i - 1] : null;
        return {
          grade,
          isPass: true,
          subtext: nextTier
            ? `${nextTier[1] - clampedScore} away from ${nextTier[0]}`
            : `+${marginAbove} above ${grade}`,
        };
      }
    }
    const minE = activeBoundaries['E'];
    return {
      grade: 'U',
      isPass: false,
      subtext: `${minE - clampedScore} away from E`,
    };
  }, [parsedScore, selected.overallMax, gradeEntries, activeBoundaries]);

  const containerClasses =
    mode === 'page'
      ? 'max-w-4xl mx-auto px-4 py-8 space-y-6 text-[#E8ECF4]'
      : 'fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#0A1020]/80 backdrop-blur-sm text-[#E8ECF4]';

  const cardClasses =
    mode === 'page'
      ? 'bg-[#1A2540] border border-[#6382BF]/25 rounded-2xl overflow-hidden flex flex-col shadow-xl'
      : 'bg-[#1A2540] border border-[#6382BF]/30 rounded-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh] shadow-2xl';

  const contentTransitionKey = `${selected.qualification}_${selected.year}_${activeRoute?.id ?? 'default'}`;

  return (
    <div className={containerClasses}>
      <div className={cardClasses}>
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#6382BF]/20 flex items-center justify-between bg-[#0A1020]/60 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#4A7BF7]/15 text-[#4A7BF7] rounded-lg border border-[#4A7BF7]/30">
              <Award size={18} />
            </div>
            <div>
              <h2 className="font-serif font-bold text-[#E8ECF4] text-base">Grade Boundaries & Mark Calculator</h2>
              <p className="text-xs text-[#7B8FAD]">Raw mark boundaries (2018 – 2026)</p>
            </div>
          </div>
          {onClose && mode === 'modal' && (
            <button
              onClick={onClose}
              className="p-1.5 text-[#7B8FAD] hover:text-[#E8ECF4] hover:bg-[#1E2B4A] rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Selector Bar: Qualification Tabs + Year Pills */}
        <div className="px-4 py-3 bg-[#0F1729]/60 border-b border-[#6382BF]/20 space-y-2.5 shrink-0">
          {/* Qualification Tabs */}
          <div className="flex flex-wrap gap-1.5">
            {qualifications.map((qual) => {
              const isSelected = qual === selectedQual;
              return (
                <button
                  key={qual}
                  onClick={() => handleSelectQual(qual)}
                  className={`relative px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                    isSelected
                      ? 'text-white font-semibold'
                      : 'text-[#7B8FAD] hover:text-[#E8ECF4] hover:bg-[#1A2540]'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId={`gb-qual-${uniqueId}`}
                      transition={PILL_SPRING}
                      className="absolute inset-0 bg-[#4A7BF7] rounded-lg -z-0 shadow-sm shadow-[#4A7BF7]/30"
                    />
                  )}
                  <span className="relative z-10">{QUALIFICATION_SHORT_LABELS[qual] ?? qual}</span>
                </button>
              );
            })}
          </div>

          {/* Series / Year Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-0.5">
            <span className="text-[11px] font-medium text-[#7B8FAD] uppercase tracking-wider shrink-0">Series:</span>
            <div className="flex items-center gap-1.5">
              {yearsForQual.map((item) => {
                const isSelected = item.year === selected.year;
                return (
                  <button
                    key={item.year}
                    onClick={() => handleSelectYear(item.year)}
                    className={`relative px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                      isSelected
                        ? 'text-[#E8ECF4] font-semibold'
                        : 'text-[#7B8FAD] hover:text-[#E8ECF4] hover:bg-[#1A2540]'
                    }`}
                  >
                    {isSelected && (
                      <motion.div
                        layoutId={`gb-year-${uniqueId}`}
                        transition={PILL_SPRING}
                        className="absolute inset-0 bg-[#1E2B4A] border border-[#4A7BF7]/50 rounded-md -z-0"
                      />
                    )}
                    <span className="relative z-10">{item.year}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Further Maths Option Route Selector (when multiple official option pairs exist) */}
          {selected.optionRoutes && selected.optionRoutes.length > 0 && (
            <div className="flex items-center gap-2 overflow-x-auto pt-1 border-t border-[#6382BF]/10">
              <span className="text-[11px] font-medium text-[#7B8FAD] uppercase tracking-wider shrink-0">
                Option Route:
              </span>
              <div className="flex items-center gap-1.5">
                {selected.optionRoutes.map((route) => {
                  const isActive = route.id === (activeRoute?.id ?? '');
                  return (
                    <button
                      key={route.id}
                      onClick={() => setSelectedRouteId(route.id)}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-mono whitespace-nowrap border transition-colors ${
                        isActive
                          ? 'bg-[#4A7BF7]/15 text-[#E8ECF4] border-[#4A7BF7]/60 font-semibold'
                          : 'bg-[#0A1020]/50 text-[#7B8FAD] border-[#6382BF]/20 hover:text-[#E8ECF4] hover:border-[#6382BF]/40'
                      }`}
                    >
                      {route.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Content with Smooth Transition */}
        <AnimatePresence mode="wait" initial={false}>
          {!isReady ? (
            <SectionLoader
              key="boundaries-loading"
              label="Loading grade boundaries..."
              sublabel="2018 – 2026 Maths & Further Maths thresholds"
              className="min-h-[340px]"
            />
          ) : (
          <motion.div
            key={contentTransitionKey}
            variants={contentFadeVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="p-5 overflow-y-auto space-y-5 text-xs"
          >
            {/* Interactive Score Calculator */}
            <div className="p-4 rounded-xl bg-[#0A1020] border border-[#4A7BF7]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Calculator size={18} className="text-[#4A7BF7] shrink-0" />
                <div>
                  <div className="font-semibold text-[#E8ECF4] text-sm">Check Your Practice Mark</div>
                  <div className="text-[#7B8FAD] text-xs">
                    Enter total marks out of {selected.overallMax}
                    {activeRoute ? ` · ${activeRoute.label}` : ''}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    max={selected.overallMax}
                    value={userScore}
                    onChange={(e) => setUserScore(e.target.value)}
                    placeholder={`0 – ${selected.overallMax}`}
                    className="w-28 pl-3 pr-2 py-2 bg-[#1A2540] border border-[#6382BF]/40 rounded-lg text-sm font-mono font-bold text-[#E8ECF4] focus:outline-none focus:border-[#4A7BF7]"
                  />
                </div>
                {scoreEvaluation && (
                  <div className="flex items-center gap-2.5 bg-[#1A2540] border border-[#6382BF]/30 px-3 py-1.5 rounded-lg">
                    <span className="text-[#7B8FAD] text-xs">Est. Grade:</span>
                    <span
                      className={`text-base font-bold font-mono ${
                        scoreEvaluation.isPass ? 'text-[#4A7BF7]' : 'text-[#7B8FAD]'
                      }`}
                    >
                      {scoreEvaluation.grade}
                    </span>
                    <span className="text-[11px] text-[#7B8FAD] border-l border-[#6382BF]/25 pl-2">
                      {scoreEvaluation.subtext}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Overall Boundaries Table */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-[#E8ECF4] flex items-center gap-1.5">
                  <TrendingUp size={14} className="text-[#4A7BF7]" />
                  <span>
                    Overall {selected.qualification} — {selected.year}
                    {activeRoute ? ` · ${activeRoute.label}` : ''}
                  </span>
                </h3>
                <span className="text-[#7B8FAD]">Max Marks: {selected.overallMax}</span>
              </div>

              <div className={`grid gap-2 ${hasAStar ? 'grid-cols-3 sm:grid-cols-6' : 'grid-cols-5'}`}>
                {gradeEntries.map(([grade, mark]) => {
                  const pct = Math.round((mark / selected.overallMax) * 100);
                  return (
                    <div
                      key={grade}
                      className="p-2.5 rounded-lg bg-[#0F1729] border border-[#6382BF]/20 text-center flex flex-col items-center justify-center"
                    >
                      <span className="text-sm font-bold font-mono text-[#4A7BF7]">
                        {grade}
                      </span>
                      <span className="text-lg font-bold text-[#E8ECF4] mt-0.5">{mark}</span>
                      <span className="text-[10px] text-[#7B8FAD] mt-0.5">{pct}%</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Individual Paper Boundaries Breakdown */}
            {selected.paperBoundaries && (
              <div>
                <h3 className="font-semibold text-[#E8ECF4] mb-2">
                  Component Notional Boundaries (Per Paper)
                </h3>
                <div className="border border-[#6382BF]/20 rounded-xl overflow-hidden bg-[#0F1729]">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-[#6382BF]/20 bg-[#0A1020] text-[#7B8FAD] text-[11px] uppercase tracking-wider">
                          <th className="py-2.5 px-3 font-medium">Paper</th>
                          <th className="py-2.5 px-2 font-medium text-center">Max</th>
                          {hasAStar && (
                            <th className="py-2.5 px-2 font-medium text-center text-[#6B93F9]">A*</th>
                          )}
                          <th className="py-2.5 px-2 font-medium text-center text-[#6B93F9]">A</th>
                          <th className="py-2.5 px-2 font-medium text-center text-[#4A7BF7]">B</th>
                          <th className="py-2.5 px-2 font-medium text-center text-[#4A7BF7]">C</th>
                          <th className="py-2.5 px-2 font-medium text-center">D</th>
                          <th className="py-2.5 px-2 font-medium text-center">E</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#6382BF]/10">
                        {selected.paperBoundaries.map((pb) => (
                          <tr key={pb.paper} className="hover:bg-[#1A2540]/60 transition-colors">
                            <td className="py-2.5 px-3 font-medium text-[#E8ECF4] whitespace-nowrap">
                              {pb.paper}
                            </td>
                            <td className="py-2.5 px-2 text-center text-[#7B8FAD] font-mono">
                              {pb.maxMarks}
                            </td>
                            {hasAStar && (
                              <td className="py-2.5 px-2 text-center font-mono font-bold text-[#6B93F9]">
                                {pb['A*'] ?? '–'}
                              </td>
                            )}
                            <td className="py-2.5 px-2 text-center font-mono font-bold text-[#6B93F9]">
                              {pb['A']}
                            </td>
                            <td className="py-2.5 px-2 text-center font-mono font-semibold text-[#E8ECF4]">
                              {pb['B']}
                            </td>
                            <td className="py-2.5 px-2 text-center font-mono text-[#E8ECF4]">{pb['C']}</td>
                            <td className="py-2.5 px-2 text-center font-mono text-[#7B8FAD]">{pb['D']}</td>
                            <td className="py-2.5 px-2 text-center font-mono text-[#7B8FAD]">{pb['E']}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Qualification-aware Note */}
            <div className="text-[#7B8FAD] text-[11px] leading-relaxed">
              Note: {QUALIFICATION_NOTES[selected.qualification] ?? ''}
            </div>
          </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
