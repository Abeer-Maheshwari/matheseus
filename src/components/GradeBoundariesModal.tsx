import React, { useState } from 'react';
import { X, BarChart3, Calculator, Award, Info, Sparkles } from 'lucide-react';
import { GRADE_BOUNDARIES } from '../data/gradeBoundaries';

interface GradeBoundariesModalProps {
  onClose: () => void;
}

export const GradeBoundariesModal: React.FC<GradeBoundariesModalProps> = ({ onClose }) => {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const [userScore, setUserScore] = useState<string>('');

  const currentData = GRADE_BOUNDARIES[selectedIdx];
  const scoreNum = parseFloat(userScore);

  // Grade calculation logic
  const calculateGrade = (mark: number) => {
    if (isNaN(mark)) return null;
    const b = currentData.boundaries;
    if (mark >= b['A*']) return { grade: 'A*', color: 'text-purple-400', nextDiff: null };
    if (mark >= b['A']) return { grade: 'A', color: 'text-emerald-400', nextDiff: b['A*'] - mark, nextGrade: 'A*' };
    if (mark >= b['B']) return { grade: 'B', color: 'text-blue-400', nextDiff: b['A'] - mark, nextGrade: 'A' };
    if (mark >= b['C']) return { grade: 'C', color: 'text-amber-400', nextDiff: b['B'] - mark, nextGrade: 'B' };
    if (mark >= b['D']) return { grade: 'D', color: 'text-orange-400', nextDiff: b['C'] - mark, nextGrade: 'C' };
    if (mark >= b['E']) return { grade: 'E', color: 'text-rose-400', nextDiff: b['D'] - mark, nextGrade: 'D' };
    return { grade: 'U', color: 'text-slate-500', nextDiff: b['E'] - mark, nextGrade: 'E' };
  };

  const calculated = !isNaN(scoreNum) ? calculateGrade(scoreNum) : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in text-slate-100">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <BarChart3 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Official Edexcel Grade Boundaries</h3>
              <p className="text-xs text-slate-400">Pearson Edexcel GCE A Level Cutoffs & Calculator</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Series Selector Tabs */}
        <div className="p-4 bg-slate-950/60 border-b border-slate-800/80 overflow-x-auto flex gap-2 shrink-0">
          {GRADE_BOUNDARIES.map((item, idx) => (
            <button
              key={`${item.qualification}-${item.year}`}
              onClick={() => setSelectedIdx(idx)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                selectedIdx === idx
                  ? 'bg-indigo-600 text-white shadow'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800'
              }`}
            >
              {item.qualification.includes('Further') ? 'Further Maths' : 'A Level Maths'} — {item.year}
            </button>
          ))}
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Interactive Calculator Section */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-950/40 via-slate-900 to-indigo-950/30 border border-indigo-500/20">
            <div className="flex items-center gap-2 mb-2">
              <Calculator className="w-4 h-4 text-cyan-400" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                Grade Predictor ({currentData.year})
              </h4>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="0"
                  max={currentData.overallMax}
                  value={userScore}
                  onChange={(e) => setUserScore(e.target.value)}
                  placeholder={`Mark out of ${currentData.overallMax}`}
                  className="w-44 px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-indigo-500"
                />
                <span className="text-xs text-slate-400 font-mono">/ {currentData.overallMax}</span>
              </div>

              {calculated && (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-xs text-slate-400">Predicted Grade:</span>
                    <span className={`text-xl font-black ${calculated.color}`}>{calculated.grade}</span>
                  </div>
                  {calculated.nextDiff !== null && calculated.nextGrade && (
                    <span className="text-xs text-slate-400">
                      <strong className="text-slate-200">{calculated.nextDiff} marks</strong> away from {calculated.nextGrade}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Overall Cutoffs Grid */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-between">
              <span>Overall Qualification Boundaries (Max {currentData.overallMax})</span>
              <span className="text-[11px] font-normal text-slate-400">{currentData.qualification}</span>
            </h4>

            <div className="grid grid-cols-6 gap-2">
              {(Object.entries(currentData.boundaries) as [string, number][]).map(([grade, mark]) => {
                const percent = Math.round((mark / currentData.overallMax) * 100);
                return (
                  <div
                    key={grade}
                    className="p-3 rounded-2xl bg-slate-950 border border-slate-800/80 text-center flex flex-col justify-between"
                  >
                    <span className="text-xs font-bold text-indigo-400">{grade}</span>
                    <span className="text-xl font-extrabold text-white my-1 font-mono">{mark}</span>
                    <span className="text-[10px] text-slate-400">{percent}%</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Paper-by-Paper Breakdown */}
          {currentData.paperBoundaries && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Individual Component Breakdown
              </h4>
              <div className="rounded-2xl border border-slate-800 overflow-hidden bg-slate-950/40">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800">
                    <tr>
                      <th className="py-2.5 px-3">Paper</th>
                      <th className="py-2.5 px-2 text-center">Max</th>
                      <th className="py-2.5 px-2 text-center text-purple-300">A*</th>
                      <th className="py-2.5 px-2 text-center text-emerald-300">A</th>
                      <th className="py-2.5 px-2 text-center text-blue-300">B</th>
                      <th className="py-2.5 px-2 text-center text-amber-300">C</th>
                      <th className="py-2.5 px-2 text-center text-orange-300">D</th>
                      <th className="py-2.5 px-2 text-center text-rose-300">E</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono">
                    {currentData.paperBoundaries.map((pb, i) => (
                      <tr key={i} className="hover:bg-slate-900/60">
                        <td className="py-2.5 px-3 font-sans font-medium text-slate-300">{pb.paper}</td>
                        <td className="py-2.5 px-2 text-center text-slate-400">{pb.maxMarks}</td>
                        <td className="py-2.5 px-2 text-center text-purple-400 font-bold">{pb['A*'] ?? '-'}</td>
                        <td className="py-2.5 px-2 text-center text-emerald-400 font-bold">{pb['A']}</td>
                        <td className="py-2.5 px-2 text-center text-blue-400">{pb['B']}</td>
                        <td className="py-2.5 px-2 text-center text-amber-400">{pb['C']}</td>
                        <td className="py-2.5 px-2 text-center text-orange-400">{pb['D']}</td>
                        <td className="py-2.5 px-2 text-center text-rose-400">{pb['E']}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Note */}
          <div className="flex items-start gap-2 p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs text-slate-400">
            <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <span>
              Note: Pearson Edexcel awards final subject grades by adding raw marks from all three papers.
              For A Level Mathematics, an A* requires reaching the A threshold overall PLUS achieving at least 80% on Paper 1 and Paper 2 combined.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
