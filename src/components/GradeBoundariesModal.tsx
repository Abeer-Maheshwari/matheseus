import React, { useState } from 'react';
import { GRADE_BOUNDARIES } from '../data/gradeBoundaries';
import { BarChart3, Calculator, X, Award, Percent } from 'lucide-react';

interface GradeBoundariesModalProps {
  onClose: () => void;
}

export const GradeBoundariesModal: React.FC<GradeBoundariesModalProps> = ({ onClose }) => {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const [userScore, setUserScore] = useState<string>('');

  const currentData = GRADE_BOUNDARIES[selectedIdx];
  const scoreNum = parseFloat(userScore);

  const calculateGrade = (mark: number) => {
    if (isNaN(mark)) return null;
    const b = currentData.boundaries;
    if (mark >= b['A*']) return { grade: 'A*', nextDiff: null };
    if (mark >= b['A']) return { grade: 'A', nextDiff: b['A*'] - mark, nextGrade: 'A*' };
    if (mark >= b['B']) return { grade: 'B', nextDiff: b['A'] - mark, nextGrade: 'A' };
    if (mark >= b['C']) return { grade: 'C', nextDiff: b['B'] - mark, nextGrade: 'B' };
    if (mark >= b['D']) return { grade: 'D', nextDiff: b['C'] - mark, nextGrade: 'C' };
    if (mark >= b['E']) return { grade: 'E', nextDiff: b['D'] - mark, nextGrade: 'D' };
    return { grade: 'U', nextDiff: b['E'] - mark, nextGrade: 'E' };
  };

  const calculated = !isNaN(scoreNum) ? calculateGrade(scoreNum) : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm text-slate-100">
      <div className="bg-slate-950 border border-slate-800 rounded-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh] shadow-2xl">
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-slate-800 flex items-center justify-between shrink-0 bg-slate-900/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-950/80 border border-amber-800/60 flex items-center justify-center text-amber-400">
              <BarChart3 size={18} />
            </div>
            <div>
              <h3 className="font-semibold text-white text-sm">Official Edexcel Grade Boundaries</h3>
              <p className="text-xs text-slate-400">Raw mark thresholds by exam series (2018–2024)</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700/60 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Series Selector */}
        <div className="p-3 bg-slate-900/40 border-b border-slate-800 flex gap-2 overflow-x-auto text-xs shrink-0">
          {GRADE_BOUNDARIES.map((item, idx) => (
            <button
              key={`${item.qualification}-${item.year}`}
              onClick={() => setSelectedIdx(idx)}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap border transition-all ${
                selectedIdx === idx
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/60 font-semibold shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border-slate-800'
              }`}
            >
              {item.qualification.includes('Further') ? 'Further Maths' : 'A Level Maths'} ({item.year})
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-5 text-xs">
          {/* Interactive Calculator */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 shadow-sm space-y-2">
            <div className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
              <Calculator size={14} className="text-sky-400" />
              <span>Interactive Mark Calculator ({currentData.year})</span>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="0"
                  max={currentData.overallMax}
                  value={userScore}
                  onChange={(e) => setUserScore(e.target.value)}
                  placeholder="Enter total marks"
                  className="w-36 px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-xs focus:outline-none focus:border-sky-500"
                />
                <span className="text-slate-400 font-mono">/ {currentData.overallMax}</span>
              </div>

              {calculated && (
                <div className="flex items-center gap-2.5 font-mono">
                  <span className="text-slate-400">Projected:</span>
                  <span className="px-2.5 py-0.5 rounded-md bg-amber-950/80 border border-amber-600/70 text-amber-300 font-extrabold text-sm">
                    {calculated.grade}
                  </span>
                  {calculated.nextDiff !== null && calculated.nextGrade && (
                    <span className="text-slate-400 text-[11px]">
                      ({calculated.nextDiff} marks needed for {calculated.nextGrade})
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Boundaries Grid */}
          <div>
            <div className="text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
              <Award size={14} className="text-amber-400" />
              <span>Overall Qualification Boundaries (Max {currentData.overallMax} marks)</span>
            </div>
            <div className="grid grid-cols-6 gap-2">
              {(Object.entries(currentData.boundaries) as [string, number][]).map(([grade, mark]) => {
                const percent = Math.round((mark / currentData.overallMax) * 100);
                return (
                  <div
                    key={grade}
                    className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-center"
                  >
                    <div className="text-xs font-bold text-amber-400">{grade}</div>
                    <div className="text-xl font-bold text-white font-mono my-0.5">{mark}</div>
                    <div className="text-[11px] text-slate-500 font-mono">{percent}%</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Component Breakdown Table */}
          {currentData.paperBoundaries && (
            <div>
              <div className="text-xs font-semibold text-slate-300 mb-2">
                Component Paper Breakdown
              </div>
              <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900/40">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-900/80 text-slate-400 font-semibold border-b border-slate-800">
                    <tr>
                      <th className="py-2.5 px-3">Paper Component</th>
                      <th className="py-2.5 px-2 text-center">Max</th>
                      <th className="py-2.5 px-2 text-center text-amber-400">A*</th>
                      <th className="py-2.5 px-2 text-center">A</th>
                      <th className="py-2.5 px-2 text-center">B</th>
                      <th className="py-2.5 px-2 text-center">C</th>
                      <th className="py-2.5 px-2 text-center">D</th>
                      <th className="py-2.5 px-2 text-center">E</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 font-mono text-slate-300">
                    {currentData.paperBoundaries.map((pb, i) => (
                      <tr key={i} className="hover:bg-slate-850/50">
                        <td className="py-2.5 px-3 font-sans text-slate-200 font-medium">{pb.paper}</td>
                        <td className="py-2.5 px-2 text-center text-slate-400">{pb.maxMarks}</td>
                        <td className="py-2.5 px-2 text-center font-bold text-amber-300">{pb['A*'] ?? '—'}</td>
                        <td className="py-2.5 px-2 text-center font-bold text-white">{pb['A']}</td>
                        <td className="py-2.5 px-2 text-center">{pb['B']}</td>
                        <td className="py-2.5 px-2 text-center">{pb['C']}</td>
                        <td className="py-2.5 px-2 text-center">{pb['D']}</td>
                        <td className="py-2.5 px-2 text-center">{pb['E']}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="text-slate-500 text-[11px] leading-relaxed">
            Note: In Edexcel linear A Level Mathematics (9MA0), overall grades are determined strictly by aggregating raw marks across all three papers (Paper 1 + Paper 2 + Paper 3 out of 300).
          </div>
        </div>
      </div>
    </div>
  );
};
