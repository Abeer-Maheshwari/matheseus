import React from 'react';
import { GraduationCap, Layers, Sigma, BarChart3, ChevronRight, BookOpen, Sparkles } from 'lucide-react';

interface HomePageProps {
  onSelectSubject: (subject: 'maths' | 'further-maths', moduleId?: string) => void;
  onOpenFormulas: () => void;
  onOpenBoundaries: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onSelectSubject,
  onOpenFormulas,
  onOpenBoundaries,
}) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      {/* Intro */}
      <div className="text-center space-y-2.5">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#244855] border border-[#90AEAD]/30 text-[#FBE9D0] text-xs font-medium shadow-sm">
          <Sparkles size={13} className="text-[#E64833]" />
          <span>Edexcel GCE Past Papers Archive & Interactive Exam Hall</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#FBE9D0]">
          matheseus
        </h1>
        <p className="text-sm text-[#90AEAD] max-w-xl mx-auto leading-relaxed">
          Instant, local access to Edexcel A Level Maths and Further Maths past papers with side-by-side split review and interactive exam mode.
        </p>
      </div>

      {/* Main Subjects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* A Level Maths Card */}
        <div className="border border-[#90AEAD]/25 rounded-xl p-6 bg-[#244855] flex flex-col justify-between shadow-md hover:border-[#90AEAD]/50 transition-all">
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#162932] border border-[#90AEAD]/30 flex items-center justify-center text-[#E64833]">
                  <GraduationCap size={18} />
                </div>
                <h2 className="text-base font-bold text-[#FBE9D0]">A Level Mathematics</h2>
              </div>
              <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-[#162932] text-[#FBE9D0] border border-[#90AEAD]/30 font-semibold">
                9MA0
              </span>
            </div>
            <p className="text-xs text-[#90AEAD] mb-4">
              All 3 linear exam papers from June 2018 through 2024.
            </p>

            <div className="space-y-2 mb-6 text-xs">
              <button
                onClick={() => onSelectSubject('maths', 'p1')}
                className="w-full text-left px-3.5 py-2.5 rounded-lg bg-[#162932] hover:bg-[#874F41]/60 text-[#FBE9D0] border border-[#90AEAD]/20 flex justify-between items-center transition-colors group"
              >
                <span className="font-medium group-hover:text-[#FBE9D0]">Pure Mathematics 1 (9MA0/01)</span>
                <span className="text-[#90AEAD] font-mono text-[11px]">2018–2024</span>
              </button>
              <button
                onClick={() => onSelectSubject('maths', 'p2')}
                className="w-full text-left px-3.5 py-2.5 rounded-lg bg-[#162932] hover:bg-[#874F41]/60 text-[#FBE9D0] border border-[#90AEAD]/20 flex justify-between items-center transition-colors group"
              >
                <span className="font-medium group-hover:text-[#FBE9D0]">Pure Mathematics 2 (9MA0/02)</span>
                <span className="text-[#90AEAD] font-mono text-[11px]">2018–2024</span>
              </button>
              <button
                onClick={() => onSelectSubject('maths', 'p3')}
                className="w-full text-left px-3.5 py-2.5 rounded-lg bg-[#162932] hover:bg-[#874F41]/60 text-[#FBE9D0] border border-[#90AEAD]/20 flex justify-between items-center transition-colors group"
              >
                <span className="font-medium group-hover:text-[#FBE9D0]">Statistics & Mechanics (9MA0/03)</span>
                <span className="text-[#90AEAD] font-mono text-[11px]">2018–2024</span>
              </button>
            </div>
          </div>

          <button
            onClick={() => onSelectSubject('maths')}
            className="w-full py-2.5 bg-[#E64833] hover:bg-[#874F41] text-[#FBE9D0] font-semibold rounded-lg text-xs text-center transition-colors shadow-sm flex items-center justify-center gap-1.5"
          >
            <span>Browse All Maths Papers</span>
            <ChevronRight size={14} />
          </button>
        </div>

        {/* A Level Further Maths Card */}
        <div className="border border-[#90AEAD]/25 rounded-xl p-6 bg-[#244855] flex flex-col justify-between shadow-md hover:border-[#90AEAD]/50 transition-all">
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#162932] border border-[#90AEAD]/30 flex items-center justify-center text-[#90AEAD]">
                  <Layers size={18} />
                </div>
                <h2 className="text-base font-bold text-[#FBE9D0]">Further Mathematics</h2>
              </div>
              <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-[#874F41] text-[#FBE9D0] border border-[#90AEAD]/30 font-semibold">
                9FM0
              </span>
            </div>
            <p className="text-xs text-[#90AEAD] mb-4">
              All 10 modules: Core Pure 1/2, FP1/2, Stats 1/2, Mech 1/2, Decision 1/2.
            </p>

            <div className="space-y-1.5 mb-6 text-xs">
              <button
                onClick={() => onSelectSubject('further-maths', 'cp1')}
                className="w-full text-left px-3 py-2 rounded-lg bg-[#162932] hover:bg-[#874F41]/60 text-[#FBE9D0] border border-[#90AEAD]/20 flex justify-between items-center transition-colors group"
              >
                <span className="font-medium group-hover:text-[#FBE9D0]">Core Pure 1 (9FM0/01)</span>
                <span className="text-[#90AEAD] font-mono text-[11px]">2019–2025</span>
              </button>
              <button
                onClick={() => onSelectSubject('further-maths', 'cp2')}
                className="w-full text-left px-3 py-2 rounded-lg bg-[#162932] hover:bg-[#874F41]/60 text-[#FBE9D0] border border-[#90AEAD]/20 flex justify-between items-center transition-colors group"
              >
                <span className="font-medium group-hover:text-[#FBE9D0]">Core Pure 2 (9FM0/02)</span>
                <span className="text-[#90AEAD] font-mono text-[11px]">2019–2025</span>
              </button>
              <button
                onClick={() => onSelectSubject('further-maths', 'fp1')}
                className="w-full text-left px-3 py-2 rounded-lg bg-[#162932] hover:bg-[#874F41]/60 text-[#FBE9D0] border border-[#90AEAD]/20 flex justify-between items-center transition-colors group"
              >
                <span className="font-medium group-hover:text-[#FBE9D0]">Further Pure 1 & 2 (FP1/2)</span>
                <span className="text-[#90AEAD] font-mono text-[11px]">Options</span>
              </button>
              <button
                onClick={() => onSelectSubject('further-maths', 'fm1')}
                className="w-full text-left px-3 py-2 rounded-lg bg-[#162932] hover:bg-[#874F41]/60 text-[#FBE9D0] border border-[#90AEAD]/20 flex justify-between items-center transition-colors group"
              >
                <span className="font-medium group-hover:text-[#FBE9D0]">Further Mechanics 1 & 2 (FM1/2)</span>
                <span className="text-[#90AEAD] font-mono text-[11px]">Options</span>
              </button>
            </div>
          </div>

          <button
            onClick={() => onSelectSubject('further-maths')}
            className="w-full py-2.5 bg-[#874F41] hover:bg-[#E64833] text-[#FBE9D0] font-semibold rounded-lg text-xs text-center transition-colors shadow-sm flex items-center justify-center gap-1.5"
          >
            <span>Browse All 10 FM Modules</span>
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Quick Tools */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <button
          onClick={onOpenBoundaries}
          className="p-4 rounded-xl border border-[#90AEAD]/25 bg-[#244855] hover:bg-[#244855]/80 text-left transition-all hover:border-[#90AEAD]/50 flex items-start gap-3 group shadow-sm"
        >
          <div className="p-2 rounded-lg bg-[#162932] border border-[#90AEAD]/30 text-[#E64833] shrink-0">
            <BarChart3 size={18} />
          </div>
          <div>
            <div className="font-semibold text-[#FBE9D0] group-hover:text-[#E64833] transition-colors">
              Grade Boundaries Explorer
            </div>
            <div className="text-[#90AEAD] text-[11px] mt-0.5">
              Official Edexcel raw mark cutoffs (A*, A, B, C, D, E) for June 2018–2024.
            </div>
          </div>
        </button>

        <button
          onClick={onOpenFormulas}
          className="p-4 rounded-xl border border-[#90AEAD]/25 bg-[#244855] hover:bg-[#244855]/80 text-left transition-all hover:border-[#90AEAD]/50 flex items-start gap-3 group shadow-sm"
        >
          <div className="p-2 rounded-lg bg-[#162932] border border-[#90AEAD]/30 text-[#90AEAD] shrink-0">
            <Sigma size={18} />
          </div>
          <div>
            <div className="font-semibold text-[#FBE9D0] group-hover:text-[#90AEAD] transition-colors">
              Formula Booklets & Tables
            </div>
            <div className="text-[#90AEAD] text-[11px] mt-0.5">
              Interactive formulae database and official Pearson PDF booklets.
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};
