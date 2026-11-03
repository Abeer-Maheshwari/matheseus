import React, { useState } from 'react';
import { GRADE_BOUNDARIES } from '../data/gradeBoundaries';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 text-zinc-100">
      <div className="bg-zinc-950 border border-zinc-800 rounded-lg w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-5 py-3 border-b border-zinc-800 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-white text-sm">Official Edexcel Grade Boundaries</h3>
            <p className="text-xs text-zinc-400">Raw mark thresholds by exam series</p>
          </div>
          <button
            onClick={onClose}
            className="px-2 py-1 text-xs rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800"
          >
            Close
          </button>
        </div>

        {/* Series Selector */}
        <div className="p-3 bg-zinc-900 border-b border-zinc-800 flex gap-1.5 overflow-x-auto text-xs shrink-0">
          {GRADE_BOUNDARIES.map((item, idx) => (
            <button
              key={`${item.qualification}-${item.year}`}
              onClick={() => setSelectedIdx(idx)}
              className={`px-3 py-1.5 rounded font-medium whitespace-nowrap border ${
                selectedIdx === idx
                  ? 'bg-white text-black border-white font-semibold'
                  : 'bg-zinc-950 text-zinc-400 hover:text-zinc-200 border-zinc-800'
              }`}
            >
              {item.qualification.includes('Further') ? 'FM' : 'Maths'} ({item.year})
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-5 text-xs">
          {/* Calculator */}
          <div className="p-3.5 rounded bg-zinc-900 border border-zinc-800">
            <div className="text-xs font-semibold text-zinc-200 mb-2">
              Mark Calculator ({currentData.year})
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="0"
                  max={currentData.overallMax}
                  value={userScore}
                  onChange={(e) => setUserScore(e.target.value)}
                  placeholder="Total mark"
                  className="w-28 px-2.5 py-1.5 bg-zinc-950 border border-zinc-700 rounded text-white font-mono text-xs focus:outline-none focus:border-zinc-500"
                />
                <span className="text-zinc-400 font-mono">/ {currentData.overallMax}</span>
              </div>

              {calculated && (
                <div className="flex items-center gap-2.5 font-mono">
                  <span className="text-zinc-400">Grade:</span>
                  <span className="px-2 py-0.5 rounded bg-zinc-800 text-white font-bold">
                    {calculated.grade}
                  </span>
                  {calculated.nextDiff !== null && calculated.nextGrade && (
                    <span className="text-zinc-400 text-[11px]">
                      ({calculated.nextDiff} marks to {calculated.nextGrade})
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Boundaries Grid */}
          <div>
            <div className="text-xs font-semibold text-zinc-300 mb-2">
              Overall Subject Boundaries (Max {currentData.overallMax})
            </div>
            <div className="grid grid-cols-6 gap-2">
              {(Object.entries(currentData.boundaries) as [string, number][]).map(([grade, mark]) => {
                const percent = Math.round((mark / currentData.overallMax) * 100);
                return (
                  <div
                    key={grade}
                    className="p-3 rounded bg-zinc-900 border border-zinc-800 text-center"
                  >
                    <div className="text-xs font-bold text-zinc-400">{grade}</div>
                    <div className="text-lg font-bold text-white font-mono my-0.5">{mark}</div>
                    <div className="text-[10px] text-zinc-500 font-mono">{percent}%</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Component Breakdown Table */}
          {currentData.paperBoundaries && (
            <div>
              <div className="text-xs font-semibold text-zinc-300 mb-2">
                Component Breakdown
              </div>
              <div className="border border-zinc-800 rounded overflow-hidden">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-zinc-900 text-zinc-400 font-semibold border-b border-zinc-800">
                    <tr>
                      <th className="py-2 px-3">Paper</th>
                      <th className="py-2 px-2 text-center">Max</th>
                      <th className="py-2 px-2 text-center">A*</th>
                      <th className="py-2 px-2 text-center">A</th>
                      <th className="py-2 px-2 text-center">B</th>
                      <th className="py-2 px-2 text-center">C</th>
                      <th className="py-2 px-2 text-center">D</th>
                      <th className="py-2 px-2 text-center">E</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800 font-mono text-zinc-300">
                    {currentData.paperBoundaries.map((pb, i) => (
                      <tr key={i} className="hover:bg-zinc-900/40">
                        <td className="py-2 px-3 font-sans text-zinc-200">{pb.paper}</td>
                        <td className="py-2 px-2 text-center text-zinc-400">{pb.maxMarks}</td>
                        <td className="py-2 px-2 text-center font-bold text-white">{pb['A*'] ?? '—'}</td>
                        <td className="py-2 px-2 text-center font-bold text-zinc-200">{pb['A']}</td>
                        <td className="py-2 px-2 text-center">{pb['B']}</td>
                        <td className="py-2 px-2 text-center">{pb['C']}</td>
                        <td className="py-2 px-2 text-center">{pb['D']}</td>
                        <td className="py-2 px-2 text-center">{pb['E']}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="text-zinc-500 text-[11px] leading-normal">
            Pearson Edexcel calculates overall qualification grade by summing raw marks from Paper 1, Paper 2, and Paper 3.
          </div>
        </div>
      </div>
    </div>
  );
};
