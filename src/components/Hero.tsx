import React from 'react';
import { Search, Sparkles, Filter, CheckCircle2, FileText, Zap } from 'lucide-react';
import { QualificationType } from '../types';

interface HeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedQual: QualificationType | 'all';
  onSelectQual: (qual: QualificationType | 'all') => void;
  selectedYear: string;
  onSelectYear: (year: string) => void;
  yearsList: (string | number)[];
  totalPapersCount: number;
}

export const Hero: React.FC<HeroProps> = ({
  searchQuery,
  onSearchChange,
  selectedQual,
  onSelectQual,
  selectedYear,
  onSelectYear,
  yearsList,
  totalPapersCount,
}) => {
  const qualifications: { id: QualificationType | 'all'; label: string; badge?: string }[] = [
    { id: 'all', label: 'All Qualifications' },
    { id: 'a-level-maths', label: 'A Level Maths', badge: '9MA0' },
    { id: 'a-level-further-maths', label: 'Further Maths', badge: '9FM0' },
    { id: 'as-maths', label: 'AS Maths', badge: '8MA0' },
    { id: 'as-further-maths', label: 'AS Further', badge: '8FM0' },
    { id: 'legacy-modular', label: 'Legacy Vault', badge: 'C1-C4/M1/S1' },
  ];

  return (
    <div className="relative overflow-hidden pt-8 pb-6 border-b border-slate-900 bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-indigo-500/10 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The definitive Edexcel past paper vault & revision hub</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Crack Edexcel Maths with{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-sky-300 bg-clip-text text-transparent">
              zero friction.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Every Question Paper, Mark Scheme, and Examiner's Report for Pearson Edexcel A Level & Further Maths. 
            Features instant side-by-side QP + MS split-view, practice countdown timer, and grade boundary checker.
          </p>

          {/* Search Box */}
          <div className="pt-2 max-w-2xl mx-auto">
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search by topic (e.g. Integration, Hypothesis, De Moivre), paper code, or year..."
                className="w-full pl-12 pr-4 py-3.5 bg-slate-900/90 hover:bg-slate-900 focus:bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-2xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 shadow-xl transition text-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3.5 text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Qualification Tabs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {qualifications.map((q) => {
            const isSelected = selectedQual === q.id;
            return (
              <button
                key={q.id}
                onClick={() => onSelectQual(q.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 scale-102'
                    : 'bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800/80'
                }`}
              >
                <span>{q.label}</span>
                {q.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                      isSelected
                        ? 'bg-indigo-700/80 text-white'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {q.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Year Filter Pill Row */}
        <div className="mt-4 flex items-center justify-center flex-wrap gap-1.5 text-xs">
          <span className="text-slate-400 mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Series:
          </span>
          <button
            onClick={() => onSelectYear('all')}
            className={`px-2.5 py-1 rounded-lg font-medium transition ${
              selectedYear === 'all'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            All Years
          </button>
          {yearsList.map((yr) => (
            <button
              key={yr}
              onClick={() => onSelectYear(String(yr))}
              className={`px-2.5 py-1 rounded-lg font-medium transition ${
                selectedYear === String(yr)
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              {yr}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
