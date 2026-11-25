import React from 'react';
import { GraduationCap, Layers, Sigma, BarChart3, ChevronRight, ListFilter } from 'lucide-react';

interface HomePageProps {
  onSelectSubject: (
    subject: 'maths' | 'further-maths' | 'more-papers',
    moduleId?: string
  ) => void;
  onOpenFormulas: () => void;
  onOpenBoundaries: () => void;
  onOpenTopics?: (level?: 'all' | 'as' | 'a2') => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onSelectSubject,
  onOpenFormulas,
  onOpenBoundaries,
  onOpenTopics,
}) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      {/* Intro */}
      <div className="text-center space-y-3 flex flex-col items-center">
        <img
          src="/logo.png"
          alt="matheseus."
          className="w-16 h-16 rounded-2xl shadow-xl ring-1 ring-white/15 object-cover"
        />
        <div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-[#E8ECF4]">
            matheseus.
          </h1>
          <p className="text-sm text-[#7B8FAD] max-w-xl mx-auto mt-1">
            Edexcel Maths and Further Maths past papers.
          </p>
        </div>
      </div>

      {/* Main Subjects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* A Level Maths Card */}
        <div className="border border-[#6382BF]/25 rounded-2xl p-6 bg-[#1A2540] flex flex-col justify-between shadow-lg hover:shadow-2xl hover:shadow-[#4A7BF7]/20 hover:border-[#4A7BF7]/70 hover:-translate-y-1.5 transition-all duration-300 group">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#0A1020] border border-[#6382BF]/30 flex items-center justify-center text-[#4A7BF7] group-hover:scale-110 group-hover:border-[#4A7BF7]/60 group-hover:bg-[#4A7BF7]/15 transition-all duration-200">
                  <GraduationCap size={19} />
                </div>
                <h2 className="text-base font-bold text-[#E8ECF4] group-hover:text-[#4A7BF7] transition-colors">A Level Maths</h2>
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded-md bg-[#0A1020] text-[#E8ECF4] border border-[#6382BF]/40 font-semibold font-sans">
                9MA0
              </span>
            </div>
            <p className="text-xs text-[#7B8FAD] mb-4">
              Papers 1, 2, and 3 from 2018 to 2026.
            </p>

            <div className="space-y-2 mb-6 text-xs">
              <button
                onClick={() => onSelectSubject('maths', 'p1')}
                className="w-full text-left px-3.5 py-2.5 rounded-xl bg-[#0A1020] hover:bg-[#4A7BF7]/15 text-[#E8ECF4] border border-[#6382BF]/25 hover:border-[#4A7BF7]/50 flex justify-between items-center transition-all duration-300 hover:translate-x-1 active:scale-[0.985] group/btn"
              >
                <span className="font-medium group-hover/btn:text-white">Pure Mathematics 1 (9MA0/01)</span>
                <span className="text-[#7B8FAD] text-[11px]">2018–2026</span>
              </button>
              <button
                onClick={() => onSelectSubject('maths', 'p2')}
                className="w-full text-left px-3.5 py-2.5 rounded-xl bg-[#0A1020] hover:bg-[#4A7BF7]/15 text-[#E8ECF4] border border-[#6382BF]/25 hover:border-[#4A7BF7]/50 flex justify-between items-center transition-all duration-300 hover:translate-x-1 active:scale-[0.985] group/btn"
              >
                <span className="font-medium group-hover/btn:text-white">Pure Mathematics 2 (9MA0/02)</span>
                <span className="text-[#7B8FAD] text-[11px]">2018–2026</span>
              </button>
              <button
                onClick={() => onSelectSubject('maths', 'p3')}
                className="w-full text-left px-3.5 py-2.5 rounded-xl bg-[#0A1020] hover:bg-[#4A7BF7]/15 text-[#E8ECF4] border border-[#6382BF]/25 hover:border-[#4A7BF7]/50 flex justify-between items-center transition-all duration-300 hover:translate-x-1 active:scale-[0.985] group/btn"
              >
                <span className="font-medium group-hover/btn:text-white">Statistics & Mechanics (9MA0/03)</span>
                <span className="text-[#7B8FAD] text-[11px]">2018–2026</span>
              </button>
            </div>
          </div>

          <button
            onClick={() => onSelectSubject('maths')}
            className="w-full py-2.5 bg-[#4A7BF7] hover:bg-[#3D6CE0] text-white font-semibold rounded-xl text-xs text-center transition-all duration-300 shadow-md hover:shadow-[#4A7BF7]/25 hover:shadow-lg active:scale-[0.975] flex items-center justify-center gap-1.5"
          >
            <span>View Maths Papers</span>
            <ChevronRight size={14} />
          </button>
        </div>

        {/* A Level Further Maths Card */}
        <div className="border border-[#6382BF]/25 rounded-2xl p-6 bg-[#1A2540] flex flex-col justify-between shadow-lg hover:shadow-2xl hover:shadow-[#4A7BF7]/20 hover:border-[#4A7BF7]/70 hover:-translate-y-1.5 transition-all duration-300 group">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#0A1020] border border-[#6382BF]/30 flex items-center justify-center text-[#4A7BF7] group-hover:scale-110 group-hover:border-[#4A7BF7]/60 group-hover:bg-[#4A7BF7]/15 transition-all duration-200">
                  <Layers size={19} />
                </div>
                <h2 className="text-base font-bold text-[#E8ECF4] group-hover:text-[#4A7BF7] transition-colors">Further Maths</h2>
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded-md bg-[#4A7BF7] text-white border border-[#4A7BF7]/50 font-semibold font-sans shadow-sm">
                9FM0
              </span>
            </div>
            <p className="text-xs text-[#7B8FAD] mb-4">
              Core Pure and options from 2019 to 2025.
            </p>

            <div className="space-y-1.5 mb-6 text-xs">
              <button
                onClick={() => onSelectSubject('further-maths', 'cp1')}
                className="w-full text-left px-3.5 py-2 rounded-xl bg-[#0A1020] hover:bg-[#4A7BF7]/15 text-[#E8ECF4] border border-[#6382BF]/25 hover:border-[#4A7BF7]/50 flex justify-between items-center transition-all duration-300 hover:translate-x-1 active:scale-[0.985] group/btn"
              >
                <span className="font-medium group-hover/btn:text-white">Core Pure 1 (9FM0/01)</span>
                <span className="text-[#7B8FAD] text-[11px]">2019–2025</span>
              </button>
              <button
                onClick={() => onSelectSubject('further-maths', 'cp2')}
                className="w-full text-left px-3.5 py-2 rounded-xl bg-[#0A1020] hover:bg-[#4A7BF7]/15 text-[#E8ECF4] border border-[#6382BF]/25 hover:border-[#4A7BF7]/50 flex justify-between items-center transition-all duration-300 hover:translate-x-1 active:scale-[0.985] group/btn"
              >
                <span className="font-medium group-hover/btn:text-white">Core Pure 2 (9FM0/02)</span>
                <span className="text-[#7B8FAD] text-[11px]">2019–2025</span>
              </button>
              <button
                onClick={() => onSelectSubject('further-maths', 'fp1')}
                className="w-full text-left px-3.5 py-2 rounded-xl bg-[#0A1020] hover:bg-[#4A7BF7]/15 text-[#E8ECF4] border border-[#6382BF]/25 hover:border-[#4A7BF7]/50 flex justify-between items-center transition-all duration-300 hover:translate-x-1 active:scale-[0.985] group/btn"
              >
                <span className="font-medium group-hover/btn:text-white">Further Pure 1 & 2 (FP1/2)</span>
                <span className="text-[#7B8FAD] text-[11px]">Options</span>
              </button>
              <button
                onClick={() => onSelectSubject('further-maths', 'fm1')}
                className="w-full text-left px-3.5 py-2 rounded-xl bg-[#0A1020] hover:bg-[#4A7BF7]/15 text-[#E8ECF4] border border-[#6382BF]/25 hover:border-[#4A7BF7]/50 flex justify-between items-center transition-all duration-300 hover:translate-x-1 active:scale-[0.985] group/btn"
              >
                <span className="font-medium group-hover/btn:text-white">Further Mechanics 1 & 2 (FM1/2)</span>
                <span className="text-[#7B8FAD] text-[11px]">Options</span>
              </button>
            </div>
          </div>

          <button
            onClick={() => onSelectSubject('further-maths')}
            className="w-full py-2.5 bg-[#4A7BF7] hover:bg-[#3D6CE0] text-white font-semibold rounded-xl text-xs text-center transition-all duration-300 shadow-md hover:shadow-[#4A7BF7]/25 hover:shadow-lg active:scale-[0.975] flex items-center justify-center gap-1.5"
          >
            <span>View Further Maths Papers</span>
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Quick Tools */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        {onOpenTopics && (
          <button
            onClick={() => onOpenTopics('all')}
            className="p-4 rounded-2xl border border-[#6382BF]/25 bg-[#1A2540] text-left shadow-lg hover:shadow-2xl hover:shadow-[#4A7BF7]/20 hover:border-[#4A7BF7]/70 hover:-translate-y-1.5 transition-all duration-300 flex items-start gap-3 group active:scale-[0.98]"
          >
            <div className="p-2.5 rounded-xl bg-[#0A1020] border border-[#6382BF]/30 text-[#4A7BF7] shrink-0 group-hover:scale-110 group-hover:border-[#4A7BF7]/60 group-hover:bg-[#4A7BF7]/15 transition-all duration-200">
              <ListFilter size={18} />
            </div>
            <div>
              <div className="font-bold text-[#E8ECF4] group-hover:text-[#4A7BF7] transition-colors flex items-center gap-1.5">
                <span>By Topic</span>
              </div>
              <div className="text-[#7B8FAD] text-[11px] mt-0.5">
                Questions by topic.
              </div>
            </div>
          </button>
        )}

        <button
          onClick={onOpenBoundaries}
          className="p-4 rounded-2xl border border-[#6382BF]/25 bg-[#1A2540] text-left shadow-lg hover:shadow-2xl hover:shadow-[#4A7BF7]/20 hover:border-[#4A7BF7]/70 hover:-translate-y-1.5 transition-all duration-300 flex items-start gap-3 group active:scale-[0.98]"
        >
          <div className="p-2.5 rounded-xl bg-[#0A1020] border border-[#6382BF]/30 text-[#4A7BF7] shrink-0 group-hover:scale-110 group-hover:border-[#4A7BF7]/60 group-hover:bg-[#4A7BF7]/15 transition-all duration-200">
            <BarChart3 size={18} />
          </div>
          <div>
            <div className="font-bold text-[#E8ECF4] group-hover:text-[#4A7BF7] transition-colors">
              Grade Boundaries
            </div>
            <div className="text-[#7B8FAD] text-[11px] mt-0.5">
              Maths & Further Maths boundaries.
            </div>
          </div>
        </button>

        <button
          onClick={onOpenFormulas}
          className="p-4 rounded-2xl border border-[#6382BF]/25 bg-[#1A2540] text-left shadow-lg hover:shadow-2xl hover:shadow-[#4A7BF7]/20 hover:border-[#4A7BF7]/70 hover:-translate-y-1.5 transition-all duration-300 flex items-start gap-3 group active:scale-[0.98]"
        >
          <div className="p-2.5 rounded-xl bg-[#0A1020] border border-[#6382BF]/30 text-[#4A7BF7] shrink-0 group-hover:scale-110 group-hover:border-[#4A7BF7]/60 group-hover:bg-[#4A7BF7]/15 transition-all duration-200">
            <Sigma size={18} />
          </div>
          <div>
            <div className="font-bold text-[#E8ECF4] group-hover:text-[#4A7BF7] transition-colors">
              Formula Booklet
            </div>
            <div className="text-[#7B8FAD] text-[11px] mt-0.5">
              AS & A Level formula book.
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};
