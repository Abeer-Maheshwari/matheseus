import React from 'react';
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
  viewMode: 'cards' | 'table';
  onViewModeChange: (mode: 'cards' | 'table') => void;
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
  viewMode,
  onViewModeChange,
}) => {
  const qualifications: { id: QualificationType | 'all'; label: string; code?: string }[] = [
    { id: 'all', label: 'All Papers' },
    { id: 'a-level-maths', label: 'A Level Maths', code: '9MA0' },
    { id: 'a-level-further-maths', label: 'Further Maths', code: '9FM0' },
    { id: 'as-maths', label: 'AS Maths', code: '8MA0' },
    { id: 'as-further-maths', label: 'AS Further', code: '8FM0' },
    { id: 'legacy-modular', label: 'Legacy Modular', code: 'C1-C4' },
  ];

  return (
    <div className="border-b border-zinc-800 bg-zinc-950 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Simple, confident title */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
            Edexcel Mathematics Past Papers
          </h1>
          <p className="text-sm text-zinc-400 max-w-2xl">
            Complete collection of Pearson Edexcel past examination papers, mark schemes, and examiner reports.
            Review side by side or practice under timed conditions.
          </p>
        </div>

        {/* Search Input */}
        <div className="mb-6 max-w-2xl">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by topic, paper title, or paper code (e.g. 9MA0/01, Integration, Hypothesis)..."
              className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-500 font-sans"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-white px-1.5 py-0.5 rounded bg-zinc-800"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Qualification Selector Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 border-b border-zinc-800 pb-4 mb-4">
          {qualifications.map((q) => {
            const isSelected = selectedQual === q.id;
            return (
              <button
                key={q.id}
                onClick={() => onSelectQual(q.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  isSelected
                    ? 'bg-white text-black font-semibold'
                    : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 border border-zinc-800/80'
                }`}
              >
                <span>{q.label}</span>
                {q.code && (
                  <span
                    className={`font-mono text-[10px] px-1 py-0.2 rounded ${
                      isSelected ? 'bg-zinc-200 text-black' : 'bg-zinc-800 text-zinc-400'
                    }`}
                  >
                    {q.code}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Controls Bar: Years Filter & View Mode Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-1">
            <span className="text-zinc-500 font-medium mr-1.5">Series:</span>
            <button
              onClick={() => onSelectYear('all')}
              className={`px-2 py-1 rounded font-medium ${
                selectedYear === 'all'
                  ? 'bg-zinc-800 text-white font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
              }`}
            >
              All
            </button>
            {yearsList.map((yr) => (
              <button
                key={yr}
                onClick={() => onSelectYear(String(yr))}
                className={`px-2 py-1 rounded font-medium ${
                  selectedYear === String(yr)
                    ? 'bg-zinc-800 text-white font-semibold'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
                }`}
              >
                {yr}
              </button>
            ))}
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center border border-zinc-800 rounded-md bg-zinc-900 p-0.5">
            <button
              onClick={() => onViewModeChange('table')}
              className={`px-2.5 py-1 rounded text-xs font-medium ${
                viewMode === 'table'
                  ? 'bg-zinc-800 text-white'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Table View
            </button>
            <button
              onClick={() => onViewModeChange('cards')}
              className={`px-2.5 py-1 rounded text-xs font-medium ${
                viewMode === 'cards'
                  ? 'bg-zinc-800 text-white'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Cards View
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
