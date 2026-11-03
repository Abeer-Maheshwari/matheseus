import React, { useState } from 'react';
import { GRADE_BOUNDARIES } from '../data/gradeBoundaries';
import { BarChart3, Calculator, X, Award } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#162932]/85 backdrop-blur-sm text-[#FBE9D0]">
      <div className="bg-[#244855] border border-[#90AEAD]/30 rounded-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh] shadow-2xl">
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-[#90AEAD]/20 flex items-center justify-between shrink-0 bg-[#1b3741]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#162932] border border-[#90AEAD]/30 flex items-center justify-center text-[#E64833]">
              <BarChart3 size={18} />
            </div>
            <div>
              <h3 className="font-semibold text-[#FBE9D0] text-sm">Official Edexcel Grade Boundaries</h3>
              <p className="text-xs text-[#90AEAD]">Raw mark thresholds by exam series (2018–2024)</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#162932] hover:bg-[#E64833] text-[#90AEAD] hover:text-[#FBE9D0] border border-[#90AEAD]/30 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Series Selector */}
        <div className="p-3 bg-[#1e3c47] border-b border-[#90AEAD]/20 flex gap-2 overflow-x-auto text-xs shrink-0">
          {GRADE_BOUNDARIES.map((item, idx) => (
            <button
              key={`${item.qualification}-${item.year}`}
              onClick={() => setSelectedIdx(idx)}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap border transition-all ${
                selectedIdx === idx
                  ? 'bg-[#E64833] text-[#FBE9D0] border-[#E64833] font-semibold shadow-sm'
                  : 'bg-[#162932] text-[#90AEAD] hover:text-[#FBE9D0] border-[#90AEAD]/25'
              }`}
            >
              {item.qualification.includes('Further') ? 'Further Maths' : 'A Level Maths'} ({item.year})
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-5 text-xs">
          {/* Interactive Calculator */}
          <div className="p-4 rounded-xl bg-[#162932] border border-[#90AEAD]/25 shadow-sm space-y-2">
            <div className="text-xs font-semibold text-[#FBE9D0] flex items-center gap-1.5">
              <Calculator size={14} className="text-[#E64833]" />
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
                  className="w-36 px-3 py-1.5 bg-[#244855] border border-[#90AEAD]/30 rounded-lg text-[#FBE9D0] font-mono text-xs focus:outline-none focus:border-[#E64833]"
                />
                <span className="text-[#90AEAD] font-mono">/ {currentData.overallMax}</span>
              </div>

              {calculated && (
                <div className="flex items-center gap-2.5 font-mono">
                  <span className="text-[#90AEAD]">Projected:</span>
                  <span className="px-2.5 py-0.5 rounded-md bg-[#874F41] border border-[#90AEAD]/30 text-[#FBE9D0] font-extrabold text-sm">
                    {calculated.grade}
                  </span>
                  {calculated.nextDiff !== null && calculated.nextGrade && (
                    <span className="text-[#90AEAD] text-[11px]">
                      ({calculated.nextDiff} marks needed for {calculated.nextGrade})
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Boundaries Grid */}
          <div>
            <div className="text-xs font-semibold text-[#FBE9D0] mb-2 flex items-center gap-1.5">
              <Award size={14} className="text-[#E64833]" />
              <span>Overall Qualification Boundaries (Max {currentData.overallMax} marks)</span>
            </div>
            <div className="grid grid-cols-6 gap-2">
              {(Object.entries(currentData.boundaries) as [string, number][]).map(([grade, mark]) => {
                const percent = Math.round((mark / currentData.overallMax) * 100);
                return (
                  <div
                    key={grade}
                    className="p-3 rounded-xl bg-[#162932] border border-[#90AEAD]/25 text-center"
                  >
                    <div className="text-xs font-bold text-[#E64833]">{grade}</div>
                    <div className="text-xl font-bold text-[#FBE9D0] font-mono my-0.5">{mark}</div>
                    <div className="text-[11px] text-[#90AEAD] font-mono">{percent}%</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Component Breakdown Table */}
          {currentData.paperBoundaries && (
            <div>
              <div className="text-xs font-semibold text-[#FBE9D0] mb-2">
                Component Paper Breakdown
              </div>
              <div className="border border-[#90AEAD]/25 rounded-xl overflow-hidden bg-[#162932]">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-[#1e3c47] text-[#90AEAD] font-semibold border-b border-[#90AEAD]/20">
                    <tr>
                      <th className="py-2.5 px-3">Paper Component</th>
                      <th className="py-2.5 px-2 text-center">Max</th>
                      <th className="py-2.5 px-2 text-center text-[#E64833]">A*</th>
                      <th className="py-2.5 px-2 text-center">A</th>
                      <th className="py-2.5 px-2 text-center">B</th>
                      <th className="py-2.5 px-2 text-center">C</th>
                      <th className="py-2.5 px-2 text-center">D</th>
                      <th className="py-2.5 px-2 text-center">E</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#90AEAD]/15 font-mono text-[#FBE9D0]">
                    {currentData.paperBoundaries.map((pb, i) => (
                      <tr key={i} className="hover:bg-[#244855]/60">
                        <td className="py-2.5 px-3 font-sans text-[#FBE9D0] font-medium">{pb.paper}</td>
                        <td className="py-2.5 px-2 text-center text-[#90AEAD]">{pb.maxMarks}</td>
                        <td className="py-2.5 px-2 text-center font-bold text-[#E64833]">{pb['A*'] ?? '—'}</td>
                        <td className="py-2.5 px-2 text-center font-bold text-[#FBE9D0]">{pb['A']}</td>
                        <td className="py-2.5 px-2 text-center text-[#90AEAD]">{pb['B']}</td>
                        <td className="py-2.5 px-2 text-center text-[#90AEAD]">{pb['C']}</td>
                        <td className="py-2.5 px-2 text-center text-[#90AEAD]">{pb['D']}</td>
                        <td className="py-2.5 px-2 text-center text-[#90AEAD]">{pb['E']}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="text-[#90AEAD] text-[11px] leading-relaxed">
            Note: In Edexcel linear A Level Mathematics (9MA0), overall grades are determined strictly by aggregating raw marks across all three papers (Paper 1 + Paper 2 + Paper 3 out of 300).
          </div>
        </div>
      </div>
    </div>
  );
};
