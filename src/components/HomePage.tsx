import React from 'react';
import { GraduationCap, Layers, Sigma, BarChart3, ChevronRight } from 'lucide-react';

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
      <div className="text-center space-y-2">
        <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-[#FAF6F0]">
          matheseus
        </h1>
        <p className="text-sm text-[#AC8968] max-w-xl mx-auto">
          Edexcel A Level Maths and Further Maths past papers with mark schemes and practice mode.
        </p>
      </div>

      {/* Main Subjects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* A Level Maths Card */}
        <div className="border border-[#93785B]/30 rounded-xl p-6 bg-[#3E362E] flex flex-col justify-between shadow-md hover:border-[#93785B]/60 transition-all">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#2C2620] border border-[#93785B]/40 flex items-center justify-center text-[#865D36]">
                  <GraduationCap size={18} />
                </div>
                <h2 className="text-base font-serif font-bold text-[#FAF6F0]">A Level Maths</h2>
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded bg-[#2C2620] text-[#FAF6F0] border border-[#93785B]/40 font-semibold">
                9MA0
              </span>
            </div>
            <p className="text-xs text-[#AC8968] mb-4">
              Papers 1, 2, and 3 from 2018 to 2024.
            </p>

            <div className="space-y-2 mb-6 text-xs">
              <button
                onClick={() => onSelectSubject('maths', 'p1')}
                className="w-full text-left px-3.5 py-2.5 rounded-lg bg-[#2C2620] hover:bg-[#865D36]/30 text-[#FAF6F0] border border-[#93785B]/30 flex justify-between items-center transition-colors group"
              >
                <span className="font-medium group-hover:text-[#FAF6F0]">Pure Mathematics 1 (9MA0/01)</span>
                <span className="text-[#A69080] text-[11px]">2018–2024</span>
              </button>
              <button
                onClick={() => onSelectSubject('maths', 'p2')}
                className="w-full text-left px-3.5 py-2.5 rounded-lg bg-[#2C2620] hover:bg-[#865D36]/30 text-[#FAF6F0] border border-[#93785B]/30 flex justify-between items-center transition-colors group"
              >
                <span className="font-medium group-hover:text-[#FAF6F0]">Pure Mathematics 2 (9MA0/02)</span>
                <span className="text-[#A69080] text-[11px]">2018–2024</span>
              </button>
              <button
                onClick={() => onSelectSubject('maths', 'p3')}
                className="w-full text-left px-3.5 py-2.5 rounded-lg bg-[#2C2620] hover:bg-[#865D36]/30 text-[#FAF6F0] border border-[#93785B]/30 flex justify-between items-center transition-colors group"
              >
                <span className="font-medium group-hover:text-[#FAF6F0]">Statistics & Mechanics (9MA0/03)</span>
                <span className="text-[#A69080] text-[11px]">2018–2024</span>
              </button>
            </div>
          </div>

          <button
            onClick={() => onSelectSubject('maths')}
            className="w-full py-2.5 bg-[#865D36] hover:bg-[#93785B] text-[#FAF6F0] font-semibold rounded-lg text-xs text-center transition-colors shadow-sm flex items-center justify-center gap-1.5"
          >
            <span>View Maths Papers</span>
            <ChevronRight size={14} />
          </button>
        </div>

        {/* A Level Further Maths Card */}
        <div className="border border-[#93785B]/30 rounded-xl p-6 bg-[#3E362E] flex flex-col justify-between shadow-md hover:border-[#93785B]/60 transition-all">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#2C2620] border border-[#93785B]/40 flex items-center justify-center text-[#AC8968]">
                  <Layers size={18} />
                </div>
                <h2 className="text-base font-serif font-bold text-[#FAF6F0]">Further Maths</h2>
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded bg-[#865D36] text-[#FAF6F0] border border-[#93785B]/40 font-semibold">
                9FM0
              </span>
            </div>
            <p className="text-xs text-[#AC8968] mb-4">
              Core Pure and options from 2019 to 2025.
            </p>

            <div className="space-y-1.5 mb-6 text-xs">
              <button
                onClick={() => onSelectSubject('further-maths', 'cp1')}
                className="w-full text-left px-3 py-2 rounded-lg bg-[#2C2620] hover:bg-[#865D36]/30 text-[#FAF6F0] border border-[#93785B]/30 flex justify-between items-center transition-colors group"
              >
                <span className="font-medium group-hover:text-[#FAF6F0]">Core Pure 1 (9FM0/01)</span>
                <span className="text-[#A69080] text-[11px]">2019–2025</span>
              </button>
              <button
                onClick={() => onSelectSubject('further-maths', 'cp2')}
                className="w-full text-left px-3 py-2 rounded-lg bg-[#2C2620] hover:bg-[#865D36]/30 text-[#FAF6F0] border border-[#93785B]/30 flex justify-between items-center transition-colors group"
              >
                <span className="font-medium group-hover:text-[#FAF6F0]">Core Pure 2 (9FM0/02)</span>
                <span className="text-[#A69080] text-[11px]">2019–2025</span>
              </button>
              <button
                onClick={() => onSelectSubject('further-maths', 'fp1')}
                className="w-full text-left px-3 py-2 rounded-lg bg-[#2C2620] hover:bg-[#865D36]/30 text-[#FAF6F0] border border-[#93785B]/30 flex justify-between items-center transition-colors group"
              >
                <span className="font-medium group-hover:text-[#FAF6F0]">Further Pure 1 & 2 (FP1/2)</span>
                <span className="text-[#A69080] text-[11px]">Options</span>
              </button>
              <button
                onClick={() => onSelectSubject('further-maths', 'fm1')}
                className="w-full text-left px-3 py-2 rounded-lg bg-[#2C2620] hover:bg-[#865D36]/30 text-[#FAF6F0] border border-[#93785B]/30 flex justify-between items-center transition-colors group"
              >
                <span className="font-medium group-hover:text-[#FAF6F0]">Further Mechanics 1 & 2 (FM1/2)</span>
                <span className="text-[#A69080] text-[11px]">Options</span>
              </button>
            </div>
          </div>

          <button
            onClick={() => onSelectSubject('further-maths')}
            className="w-full py-2.5 bg-[#865D36] hover:bg-[#93785B] text-[#FAF6F0] font-semibold rounded-lg text-xs text-center transition-colors shadow-sm flex items-center justify-center gap-1.5"
          >
            <span>View Further Maths Papers</span>
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Quick Tools */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <button
          onClick={onOpenBoundaries}
          className="p-4 rounded-xl border border-[#93785B]/30 bg-[#3E362E] hover:bg-[#3E362E]/80 text-left transition-all hover:border-[#93785B]/60 flex items-start gap-3 group shadow-sm"
        >
          <div className="p-2 rounded-lg bg-[#2C2620] border border-[#93785B]/40 text-[#865D36] shrink-0">
            <BarChart3 size={18} />
          </div>
          <div>
            <div className="font-serif font-bold text-[#FAF6F0] group-hover:text-[#865D36] transition-colors">
              Grade Boundaries
            </div>
            <div className="text-[#AC8968] text-[11px] mt-0.5">
              Raw mark boundaries from 2018 to 2024.
            </div>
          </div>
        </button>

        <button
          onClick={onOpenFormulas}
          className="p-4 rounded-xl border border-[#93785B]/30 bg-[#3E362E] hover:bg-[#3E362E]/80 text-left transition-all hover:border-[#93785B]/60 flex items-start gap-3 group shadow-sm"
        >
          <div className="p-2 rounded-lg bg-[#2C2620] border border-[#93785B]/40 text-[#AC8968] shrink-0">
            <Sigma size={18} />
          </div>
          <div>
            <div className="font-serif font-bold text-[#FAF6F0] group-hover:text-[#AC8968] transition-colors">
              Formula Booklet
            </div>
            <div className="text-[#AC8968] text-[11px] mt-0.5">
              Official Edexcel formulas and tables.
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};
