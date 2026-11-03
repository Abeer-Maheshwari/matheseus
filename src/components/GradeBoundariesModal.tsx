import React, { useState } from 'react';
import { GRADE_BOUNDARIES } from '../data/gradeBoundaries';
import { BarChart3, X, Calculator, Award } from 'lucide-react';

interface GradeBoundariesModalProps {
  onClose: () => void;
}

export const GradeBoundariesModal: React.FC<GradeBoundariesModalProps> = ({ onClose }) => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [userScore, setUserScore] = useState('');

  const currentData = GRADE_BOUNDARIES[selectedIdx] || GRADE_BOUNDARIES[0];
  const scoreNum = parseFloat(userScore);

  const calculateGrade = (mark: number) => {
    const b = currentData.boundaries;
    if (mark >= b['A*']) return { grade: 'A*', nextDiff: null, nextGrade: null };
    if (mark >= b['A']) return { grade: 'A', nextDiff: b['A*'] - mark, nextGrade: 'A*' };
    if (mark >= b['B']) return { grade: 'B', nextDiff: b['A'] - mark, nextGrade: 'A' };
    if (mark >= b['C']) return { grade: 'C', nextDiff: b['B'] - mark, nextGrade: 'B' };
    if (mark >= b['D']) return { grade: 'D', nextDiff: b['C'] - mark, nextGrade: 'C' };
    if (mark >= b['E']) return { grade: 'E', nextDiff: b['D'] - mark, nextGrade: 'D' };
    return { grade: 'U', nextDiff: b['E'] - mark, nextGrade: 'E' };
  };

  const calculated = !isNaN(scoreNum) ? calculateGrade(scoreNum) : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#0A1020]/80 backdrop-blur-sm text-[#E8ECF4] animate-fadeIn">
      <div className="bg-[#1A2540] border border-[#6382BF]/30 rounded-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh] shadow-2xl animate-modalFadeIn">
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-[#6382BF]/25 flex items-center justify-between shrink-0 bg-[#0A1020]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#1A2540] border border-[#6382BF]/40 flex items-center justify-center text-[#4A7BF7]">
              <BarChart3 size={18} />
            </div>
            <div>
              <h3 className="font-bold text-[#E8ECF4] text-sm">Grade Boundaries</h3>
              <p className="text-xs text-[#7B8FAD]">Raw mark boundaries from 2018 to 2024</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#1A2540] hover:bg-[#4A7BF7] hover:text-white text-[#7B8FAD] border border-[#6382BF]/40 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Series Selector */}
        <div className="p-3 bg-[#0A1020]/70 border-b border-[#6382BF]/20 flex gap-2 overflow-x-auto text-xs shrink-0">
          {GRADE_BOUNDARIES.map((item, idx) => (
            <button
              key={`${item.qualification}-${item.year}`}
              onClick={() => setSelectedIdx(idx)}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap border transition-all ${
                selectedIdx === idx
                  ? 'bg-[#4A7BF7] text-white border-[#4A7BF7] font-semibold shadow-sm'
                  : 'bg-[#1A2540] text-[#7B8FAD] hover:text-[#E8ECF4] border-[#6382BF]/25'
              }`}
            >
              {item.qualification.includes('Further') ? 'Further Maths' : 'A Level Maths'} ({item.year})
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-5 text-xs">
          {/* Interactive Calculator */}
          <div className="p-4 rounded-xl bg-[#0A1020] border border-[#6382BF]/25 shadow-sm space-y-2">
            <div className="text-xs font-semibold text-[#E8ECF4] flex items-center gap-1.5">
              <Calculator size={14} className="text-[#4A7BF7]" />
              <span>Mark Calculator ({currentData.year})</span>
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
                  className="w-36 px-3 py-1.5 bg-[#1A2540] border border-[#6382BF]/30 rounded-lg text-[#E8ECF4] text-xs tabular-nums focus:outline-none focus:border-[#4A7BF7]"
                />
                <span className="text-[#7B8FAD] tabular-nums">/ {currentData.overallMax}</span>
              </div>

              {calculated && (
                <div className="flex items-center gap-2.5">
                  <span className="text-[#7B8FAD]">Projected:</span>
                  <span className="px-2.5 py-0.5 rounded-md bg-[#4A7BF7] text-white font-bold text-sm">
                    {calculated.grade}
                  </span>
                  {calculated.nextDiff !== null && calculated.nextGrade && (
                    <span className="text-[#7B8FAD] text-[11px]">
                      ({calculated.nextDiff} marks needed for {calculated.nextGrade})
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Boundaries Grid */}
          <div>
            <div className="text-xs font-semibold text-[#E8ECF4] mb-2 flex items-center gap-1.5">
              <Award size={14} className="text-[#4A7BF7]" />
              <span>Overall Qualification Boundaries (Max {currentData.overallMax} marks)</span>
            </div>
            <div className="grid grid-cols-6 gap-2">
              {(Object.entries(currentData.boundaries) as [string, number][]).map(([grade, mark]) => {
                const percent = Math.round((mark / currentData.overallMax) * 100);
                return (
                  <div
                    key={grade}
                    className="p-3 rounded-xl bg-[#0A1020] border border-[#6382BF]/25 text-center"
                  >
                    <div className="text-xs font-bold text-[#4A7BF7]">{grade}</div>
                    <div className="text-xl font-bold text-[#E8ECF4] tabular-nums my-0.5">{mark}</div>
                    <div className="text-[11px] text-[#7B8FAD] tabular-nums">{percent}%</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Component Breakdown Table */}
          {currentData.paperBoundaries && (
            <div>
              <div className="text-xs font-semibold text-[#E8ECF4] mb-2">
                Component Paper Breakdown
              </div>
              <div className="border border-[#6382BF]/25 rounded-xl overflow-hidden bg-[#0A1020]">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-[#1A2540] text-[#7B8FAD] font-semibold border-b border-[#6382BF]/25">
                    <tr>
                      <th className="py-2.5 px-3">Paper Component</th>
                      <th className="py-2.5 px-2 text-center">Max</th>
                      <th className="py-2.5 px-2 text-center text-[#4A7BF7]">A*</th>
                      <th className="py-2.5 px-2 text-center">A</th>
                      <th className="py-2.5 px-2 text-center">B</th>
                      <th className="py-2.5 px-2 text-center">C</th>
                      <th className="py-2.5 px-2 text-center">D</th>
                      <th className="py-2.5 px-2 text-center">E</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#6382BF]/15 text-[#E8ECF4] tabular-nums">
                    {currentData.paperBoundaries.map((pb, i) => (
                      <tr key={i} className="hover:bg-[#1A2540]/60">
                        <td className="py-2.5 px-3 font-medium text-[#E8ECF4]">{pb.paper}</td>
                        <td className="py-2.5 px-2 text-center text-[#7B8FAD]">{pb.maxMarks}</td>
                        <td className="py-2.5 px-2 text-center font-bold text-[#4A7BF7]">{pb['A*'] ?? '—'}</td>
                        <td className="py-2.5 px-2 text-center font-bold text-[#E8ECF4]">{pb['A']}</td>
                        <td className="py-2.5 px-2 text-center text-[#7B8FAD]">{pb['B']}</td>
                        <td className="py-2.5 px-2 text-center text-[#7B8FAD]">{pb['C']}</td>
                        <td className="py-2.5 px-2 text-center text-[#7B8FAD]">{pb['D']}</td>
                        <td className="py-2.5 px-2 text-center text-[#7B8FAD]">{pb['E']}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="text-[#7B8FAD] text-[11px] leading-relaxed">
            Note: In Edexcel linear A Level Mathematics (9MA0), overall grades are determined strictly by aggregating raw marks across all three papers (Paper 1 + Paper 2 + Paper 3 out of 300).
          </div>
        </div>
      </div>
    </div>
  );
};
