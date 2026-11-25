import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  GraduationCap,
  Layers,
  Sigma,
  BarChart3,
  ChevronRight,
  ListFilter,
  BookOpen,
  FileCheck2,
  Clock,
  SplitSquareVertical,
  Sparkles,
  CheckCircle2,
  ZoomIn,
  TrendingUp,
  Play,
  Columns,
  Eye,
  EyeOff,
  Search,
  Check,
  Calculator,
} from 'lucide-react';
import { MODULES_DATA, ModuleSection, PaperEntry } from '../data/papersData';
import { MOCK_MODULES_DATA } from '../data/mockSetsData';
import { GRADE_BOUNDARIES } from '../data/gradeBoundaries';
import { assetUrl } from '../utils/assets';
import { contentFadeVariants, PILL_SPRING, EASE_SMOOTH } from '../utils/motion';

interface HomePageProps {
  onSelectSubject: (
    subject: 'maths' | 'further-maths' | 'more-papers',
    moduleId?: string
  ) => void;
  onOpenMocks?: () => void;
  onOpenFormulas: () => void;
  onOpenBoundaries: () => void;
  onOpenTopics?: (level?: 'all' | 'as' | 'a2') => void;
  onOpenPractice?: (paper: PaperEntry, module: ModuleSection) => void;
  onOpenSplitView?: (title: string, qpUrl: string, msUrl?: string) => void;
}

const FEATURES = [
  {
    icon: BookOpen,
    title: 'Latest Past Papers',
    body: 'Complete Pearson Edexcel 9MA0 & 9FM0 archive spanning 2018 through June 2026 with official mark schemes.',
  },
  {
    icon: FileCheck2,
    title: '50+ Official Mock Sets',
    body: 'Official Pearson Edexcel Maths and Further Maths mock sets structured by paper code with full mark schemes.',
  },
  {
    icon: ListFilter,
    title: '1,400+ Questions by Topic',
    body: 'Filter across 65+ syllabus topics by paper, module, theorem, or source across both Past Papers and Mock Sets.',
  },
  {
    icon: SplitSquareVertical,
    title: 'Side-by-Side Split View',
    body: 'Read Question Papers next to official Mark Schemes simultaneously, swap panes, or download PDFs directly.',
  },
  {
    icon: TrendingUp,
    title: 'Dashboard & Cloud Sync',
    body: 'Track completed papers, predicted A Level grades, practice time, and Topic Accuracy across all your devices.',
  },
  {
    icon: Sigma,
    title: 'Formulae & Boundaries',
    body: 'Built-in Edexcel formula booklets, searchable equation reference, and interactive A*–E boundary calculator.',
  },
];

const CAPABILITY_PILLS = [
  { icon: CheckCircle2, label: 'Step-by-step mark pills' },
  { icon: Clock, label: 'Exam hall timer' },
  { icon: ZoomIn, label: 'Question & MS zoom' },
  { icon: Layers, label: 'AS & Legacy modules' },
  { icon: BarChart3, label: 'Predicted grades' },
  { icon: Sparkles, label: 'Zero ads' },
];

const SAMPLE_TOPICS = [
  {
    id: 'trig',
    title: 'Trigonometry & Circular Functions',
    level: 'AS & A Level',
    questions: '210+ questions',
    modules: ['Pure 1', 'Pure 2'],
    subject: 'maths' as const,
  },
  {
    id: 'algebra',
    title: 'Algebra, Functions & Graphs',
    level: 'AS & A Level',
    questions: '90+ questions',
    modules: ['Pure 1', 'Pure 2'],
    subject: 'maths' as const,
  },
  {
    id: 'core-pure',
    title: 'Complex Numbers & Matrices',
    level: 'A Level',
    questions: '80+ questions',
    modules: ['Core Pure 1', 'Core Pure 2'],
    subject: 'further-maths' as const,
  },
  {
    id: 'decision',
    title: 'Algorithms & Complexity (Sorting & Bin Packing)',
    level: 'AS Level',
    questions: '60+ questions',
    modules: ['Decision 1', 'Decision 2'],
    subject: 'further-maths' as const,
  },
];

const scrollRevealProps = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.14 as const },
  transition: { duration: 0.45, delay, ease: EASE_SMOOTH },
});

export const HomePage: React.FC<HomePageProps> = ({
  onSelectSubject,
  onOpenMocks,
  onOpenFormulas,
  onOpenBoundaries,
  onOpenTopics,
  onOpenPractice,
  onOpenSplitView,
}) => {
  // Interactive Hero Paper Explorer state
  const [heroTab, setHeroTab] = useState<'maths' | 'further-maths' | 'mocks'>('maths');
  const [heroModuleId, setHeroModuleId] = useState<string>('p1');

  // Showcase 1: Interactive Topic Search preview
  const [topicFilter, setTopicFilter] = useState('');

  // Showcase 2: Live Practice Question & Mark Scheme Demo
  const [demoShowMs, setDemoShowMs] = useState(false);
  const [demoMarks, setDemoMarks] = useState<number | null>(null);

  // Showcase 3: Live Grade Boundary Estimator
  const [estQual, setEstQual] = useState<'maths' | 'further-maths'>('maths');
  const [estScore, setEstScore] = useState<number>(218);

  const heroModuleOptions = useMemo(() => {
    if (heroTab === 'maths') {
      return MODULES_DATA.filter((m) => m.subject === 'maths');
    }
    if (heroTab === 'further-maths') {
      return MODULES_DATA.filter((m) => m.subject === 'further-maths').slice(0, 4);
    }
    return MOCK_MODULES_DATA.filter((m) => m.subject === 'maths').slice(0, 3);
  }, [heroTab]);

  const activeHeroModule = useMemo(() => {
    return (
      heroModuleOptions.find((m) => m.id === heroModuleId) ||
      heroModuleOptions[0]
    );
  }, [heroModuleOptions, heroModuleId]);

  const heroPaperRows = useMemo(() => {
    if (!activeHeroModule) return [];
    return activeHeroModule.papers.slice(0, 4);
  }, [activeHeroModule]);

  const handleHeroTabChange = (tab: 'maths' | 'further-maths' | 'mocks') => {
    setHeroTab(tab);
    if (tab === 'maths') setHeroModuleId('p1');
    else if (tab === 'further-maths') setHeroModuleId('cp1');
    else setHeroModuleId(MOCK_MODULES_DATA[0]?.id || 'mock-p1');
  };

  const filteredSampleTopics = useMemo(() => {
    const q = topicFilter.trim().toLowerCase();
    if (!q) return SAMPLE_TOPICS;
    return SAMPLE_TOPICS.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.modules.some((m) => m.toLowerCase().includes(q))
    );
  }, [topicFilter]);

  const demoPurePaperModule = useMemo(
    () => MODULES_DATA.find((m) => m.id === 'p1'),
    []
  );
  const demoPurePaper = useMemo(
    () => demoPurePaperModule?.papers.find((p) => String(p.year) === '2024') || demoPurePaperModule?.papers[0],
    [demoPurePaperModule]
  );

  const activeBoundaryEntry = useMemo(() => {
    const targetQual =
      estQual === 'maths' ? 'A Level Mathematics (9MA0)' : 'A Level Further Mathematics (9FM0)';
    return GRADE_BOUNDARIES.find((g) => g.qualification === targetQual) || GRADE_BOUNDARIES[0];
  }, [estQual]);

  const estResult = useMemo(() => {
    const bounds = activeBoundaryEntry.optionRoutes?.[0]?.boundaries ?? activeBoundaryEntry.boundaries;
    const order = (['A*', 'A', 'B', 'C', 'D', 'E'] as const).filter(
      (g) => bounds[g] !== undefined
    );
    for (let i = 0; i < order.length; i++) {
      const grade = order[i];
      const threshold = bounds[grade]!;
      if (estScore >= threshold) {
        const nextGrade = i > 0 ? order[i - 1] : null;
        return {
          grade,
          sub: nextGrade ? `${bounds[nextGrade]! - estScore} marks to ${nextGrade}` : 'Top grade reached',
          bounds,
        };
      }
    }
    return {
      grade: 'U',
      sub: `${bounds['E'] - estScore} marks to E`,
      bounds,
    };
  }, [activeBoundaryEntry, estScore]);

  return (
    <div className="w-full">
      {/* Hero Section (Staggered open animation matching tmua.io) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-16 text-center">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: EASE_SMOOTH }}
          className="mx-auto mb-5 w-fit rounded-full border border-[#6382BF]/30 bg-[#1A2540] px-4 py-1.5 text-[11px] font-semibold tracking-widest text-[#7B8FAD] uppercase shadow-sm"
        >
          Edexcel 9MA0 &amp; 9FM0 · 2018–2026 Papers · 50+ Mock Sets
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.06, ease: EASE_SMOOTH }}
          className="mx-auto max-w-3xl text-4xl sm:text-5xl md:text-6xl font-serif font-bold tracking-tight text-[#E8ECF4] leading-[1.08]"
        >
          Edexcel Maths. Practiced properly.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.12, ease: EASE_SMOOTH }}
          className="mx-auto mt-5 max-w-2xl text-sm sm:text-base text-[#7B8FAD] leading-relaxed"
        >
          matheseus brings together the latest A Level Maths &amp; Further Maths past papers up to{' '}
          <span className="text-[#E8ECF4] font-medium">June 2026</span>,{' '}
          <span className="text-[#E8ECF4] font-medium">50+ official Pearson Edexcel mock sets</span>, topic-indexed question runs, and official mark schemes in one fast workspace.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.18, ease: EASE_SMOOTH }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3.5"
        >
          <button
            type="button"
            onClick={() => onSelectSubject('maths')}
            className="inline-flex items-center gap-2 rounded-full bg-[#4A7BF7] hover:bg-[#3D6CE0] px-7 py-3 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-[#4A7BF7]/25 transition-all active:scale-[0.98]"
          >
            <span>Browse Past Papers</span>
            <ChevronRight size={16} />
          </button>

          {onOpenMocks && (
            <button
              type="button"
              onClick={onOpenMocks}
              className="inline-flex items-center gap-2 rounded-full border border-[#6382BF]/35 bg-[#1A2540] hover:border-[#4A7BF7]/60 hover:bg-[#1A2540]/80 px-6 py-3 text-xs sm:text-sm font-medium text-[#E8ECF4] transition-all active:scale-[0.98]"
            >
              <span>Mock Sets (50+)</span>
            </button>
          )}

          {onOpenTopics && (
            <button
              type="button"
              onClick={() => onOpenTopics('all')}
              className="inline-flex items-center gap-2 rounded-full border border-[#6382BF]/35 bg-[#0A1020] hover:border-[#4A7BF7]/60 px-6 py-3 text-xs sm:text-sm font-medium text-[#7B8FAD] hover:text-[#E8ECF4] transition-all active:scale-[0.98]"
            >
              <ListFilter size={15} className="text-[#4A7BF7]" />
              <span>By Topic</span>
            </button>
          )}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.24, ease: EASE_SMOOTH }}
          className="mt-4 text-xs text-[#7B8FAD]"
        >
          160+ tracked papers · 1,400+ indexed questions · 65+ syllabus topics
        </motion.p>

        {/* Live Interactive Quick-Launch Archive Widget (Replaces static hero screenshot) */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.52, delay: 0.28, ease: EASE_SMOOTH }}
          className="mt-12 rounded-2xl border border-[#6382BF]/25 bg-[#1A2540] p-4 sm:p-6 shadow-2xl text-left"
        >
          {/* Top Subject Tabs & View All Link */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#6382BF]/20">
            <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-[#0A1020] border border-[#6382BF]/25 text-xs">
              {([
                ['maths', 'A Level Maths (9MA0)'],
                ['further-maths', 'Further Maths (9FM0)'],
                ['mocks', 'Official Mock Sets'],
              ] as const).map(([key, label]) => {
                const isSelected = heroTab === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleHeroTabChange(key)}
                    className={`relative px-3.5 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap ${
                      isSelected ? 'text-white font-semibold' : 'text-[#7B8FAD] hover:text-[#E8ECF4]'
                    }`}
                  >
                    {isSelected && (
                      <motion.div
                        layoutId="home-hero-tab-pill"
                        transition={PILL_SPRING}
                        className="absolute inset-0 bg-[#4A7BF7] rounded-lg shadow-sm"
                      />
                    )}
                    <span className="relative z-10">{label}</span>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() =>
                heroTab === 'mocks' && onOpenMocks
                  ? onOpenMocks()
                  : onSelectSubject(heroTab === 'further-maths' ? 'further-maths' : 'maths', activeHeroModule?.id)
              }
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#4A7BF7] hover:text-[#6B93F9] transition-colors self-end sm:self-center"
            >
              <span>Open Full Archive</span>
              <ChevronRight size={14} />
            </button>
          </div>

          {/* Module Selector Strip */}
          <div className="flex flex-wrap items-center gap-2 py-3.5">
            {heroModuleOptions.map((mod) => {
              const active = activeHeroModule?.id === mod.id;
              return (
                <button
                  key={mod.id}
                  type="button"
                  onClick={() => setHeroModuleId(mod.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors flex items-center gap-2 ${
                    active
                      ? 'bg-[#4A7BF7]/15 text-[#E8ECF4] border-[#4A7BF7]/60'
                      : 'bg-[#0A1020] text-[#7B8FAD] border-[#6382BF]/25 hover:text-[#E8ECF4] hover:border-[#6382BF]/45'
                  }`}
                >
                  <span>{mod.title}</span>
                  <span className="text-[10px] font-mono text-[#7B8FAD]">{mod.code}</span>
                </button>
              );
            })}
          </div>

          {/* Live Interactable Paper Rows */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`${heroTab}-${activeHeroModule?.id}`}
              variants={contentFadeVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="border border-[#6382BF]/20 rounded-xl overflow-hidden bg-[#0A1020] divide-y divide-[#6382BF]/15"
            >
              {heroPaperRows.map((paper) => {
                const label =
                  paper.year === 'Sample'
                    ? 'Sample Paper'
                    : paper.season
                    ? `${paper.season} ${paper.year}`
                    : `${paper.year}`;
                return (
                  <div
                    key={paper.id}
                    className="px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#1A2540]/45 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-xs font-semibold text-[#E8ECF4] truncate">
                        {label}
                      </span>
                      <span className="text-[11px] font-mono text-[#7B8FAD]">
                        {activeHeroModule?.code}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 text-xs">
                      {onOpenPractice && activeHeroModule && (
                        <button
                          type="button"
                          onClick={() => onOpenPractice(paper, activeHeroModule)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#4A7BF7]/15 hover:bg-[#4A7BF7] text-[#E8ECF4] hover:text-white border border-[#4A7BF7]/35 font-semibold transition-colors"
                        >
                          <Play size={12} className="fill-current" />
                          <span>Practice</span>
                        </button>
                      )}
                      {onOpenSplitView && activeHeroModule && (
                        <button
                          type="button"
                          onClick={() =>
                            onOpenSplitView(
                              `${label} · ${activeHeroModule.title} (${activeHeroModule.code})`,
                              paper.qpUrl,
                              paper.msUrl
                            )
                          }
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1A2540] hover:bg-[#1E2B4A] text-[#7B8FAD] hover:text-[#E8ECF4] border border-[#6382BF]/25 font-medium transition-colors"
                        >
                          <Columns size={12} />
                          <span>Split View</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Direct Paper Launchers */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 border-t border-[#6382BF]/15">
        <motion.div {...scrollRevealProps(0)} className="text-center mb-10">
          <p className="text-xs font-semibold tracking-widest text-[#4A7BF7] uppercase">
            Paper Archive
          </p>
          <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-[#E8ECF4]">
            Jump straight into a paper
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* A Level Maths Card */}
          <motion.div
            {...scrollRevealProps(0.05)}
            className="border border-[#6382BF]/25 rounded-2xl p-6 bg-[#1A2540] flex flex-col justify-between shadow-lg hover:border-[#4A7BF7]/60 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#0A1020] border border-[#6382BF]/30 flex items-center justify-center text-[#4A7BF7]">
                    <GraduationCap size={18} />
                  </div>
                  <h3 className="text-base font-bold text-[#E8ECF4]">A Level Maths</h3>
                </div>
                <span className="text-[11px] px-2.5 py-0.5 rounded-md bg-[#0A1020] text-[#E8ECF4] border border-[#6382BF]/35 font-semibold">
                  9MA0
                </span>
              </div>
              <p className="text-xs text-[#7B8FAD] mb-4 leading-relaxed">
                Pure 1, Pure 2, and Statistics &amp; Mechanics papers from 2018 to June 2026.
              </p>

              <div className="space-y-2 mb-5 text-xs">
                <button
                  type="button"
                  onClick={() => onSelectSubject('maths', 'p1')}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl bg-[#0A1020] hover:bg-[#4A7BF7]/15 text-[#E8ECF4] border border-[#6382BF]/25 hover:border-[#4A7BF7]/50 flex justify-between items-center transition-colors"
                >
                  <span className="font-medium">Pure Mathematics 1</span>
                  <span className="text-[#7B8FAD] text-[11px]">2018–2026</span>
                </button>
                <button
                  type="button"
                  onClick={() => onSelectSubject('maths', 'p2')}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl bg-[#0A1020] hover:bg-[#4A7BF7]/15 text-[#E8ECF4] border border-[#6382BF]/25 hover:border-[#4A7BF7]/50 flex justify-between items-center transition-colors"
                >
                  <span className="font-medium">Pure Mathematics 2</span>
                  <span className="text-[#7B8FAD] text-[11px]">2018–2026</span>
                </button>
                <button
                  type="button"
                  onClick={() => onSelectSubject('maths', 'p3')}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl bg-[#0A1020] hover:bg-[#4A7BF7]/15 text-[#E8ECF4] border border-[#6382BF]/25 hover:border-[#4A7BF7]/50 flex justify-between items-center transition-colors"
                >
                  <span className="font-medium">Stats &amp; Mechanics</span>
                  <span className="text-[#7B8FAD] text-[11px]">2018–2026</span>
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onSelectSubject('maths')}
              className="w-full py-2.5 bg-[#4A7BF7] hover:bg-[#3D6CE0] text-white font-semibold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <span>View Maths Papers</span>
              <ChevronRight size={14} />
            </button>
          </motion.div>

          {/* Further Maths Card */}
          <motion.div
            {...scrollRevealProps(0.1)}
            className="border border-[#6382BF]/25 rounded-2xl p-6 bg-[#1A2540] flex flex-col justify-between shadow-lg hover:border-[#4A7BF7]/60 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#0A1020] border border-[#6382BF]/30 flex items-center justify-center text-[#4A7BF7]">
                    <Layers size={18} />
                  </div>
                  <h3 className="text-base font-bold text-[#E8ECF4]">Further Maths</h3>
                </div>
                <span className="text-[11px] px-2.5 py-0.5 rounded-md bg-[#4A7BF7] text-white font-semibold">
                  9FM0
                </span>
              </div>
              <p className="text-xs text-[#7B8FAD] mb-4 leading-relaxed">
                Core Pure 1/2 alongside FP, FM, FS, and Decision option papers up to 2025.
              </p>

              <div className="space-y-2 mb-5 text-xs">
                <button
                  type="button"
                  onClick={() => onSelectSubject('further-maths', 'cp1')}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl bg-[#0A1020] hover:bg-[#4A7BF7]/15 text-[#E8ECF4] border border-[#6382BF]/25 hover:border-[#4A7BF7]/50 flex justify-between items-center transition-colors"
                >
                  <span className="font-medium">Core Pure 1 &amp; 2</span>
                  <span className="text-[#7B8FAD] text-[11px]">9FM0/01–02</span>
                </button>
                <button
                  type="button"
                  onClick={() => onSelectSubject('further-maths', 'fp1')}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl bg-[#0A1020] hover:bg-[#4A7BF7]/15 text-[#E8ECF4] border border-[#6382BF]/25 hover:border-[#4A7BF7]/50 flex justify-between items-center transition-colors"
                >
                  <span className="font-medium">Further Pure (FP1 / FP2)</span>
                  <span className="text-[#7B8FAD] text-[11px]">Options</span>
                </button>
                <button
                  type="button"
                  onClick={() => onSelectSubject('further-maths', 'fm1')}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl bg-[#0A1020] hover:bg-[#4A7BF7]/15 text-[#E8ECF4] border border-[#6382BF]/25 hover:border-[#4A7BF7]/50 flex justify-between items-center transition-colors"
                >
                  <span className="font-medium">FM1/2 · FS1/2 · D1/2</span>
                  <span className="text-[#7B8FAD] text-[11px]">Applied</span>
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onSelectSubject('further-maths')}
              className="w-full py-2.5 bg-[#4A7BF7] hover:bg-[#3D6CE0] text-white font-semibold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <span>View Further Maths Papers</span>
              <ChevronRight size={14} />
            </button>
          </motion.div>

          {/* Mock Sets & Tools Card */}
          <motion.div
            {...scrollRevealProps(0.15)}
            className="border border-[#6382BF]/25 rounded-2xl p-6 bg-[#1A2540] flex flex-col justify-between shadow-lg hover:border-[#4A7BF7]/60 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#0A1020] border border-[#6382BF]/30 flex items-center justify-center text-[#4A7BF7]">
                    <FileCheck2 size={18} />
                  </div>
                  <h3 className="text-base font-bold text-[#E8ECF4]">Mock Sets &amp; Tools</h3>
                </div>
                <span className="text-[11px] px-2.5 py-0.5 rounded-md bg-[#0A1020] text-[#7B8FAD] border border-[#6382BF]/35 font-semibold">
                  50+ Sets
                </span>
              </div>
              <p className="text-xs text-[#7B8FAD] mb-4 leading-relaxed">
                Official Pearson Edexcel mock sets plus Grade Boundaries and the Formula Booklet.
              </p>

              <div className="space-y-2 mb-5 text-xs">
                {onOpenMocks && (
                  <button
                    type="button"
                    onClick={onOpenMocks}
                    className="w-full text-left px-3.5 py-2.5 rounded-xl bg-[#0A1020] hover:bg-[#4A7BF7]/15 text-[#E8ECF4] border border-[#6382BF]/25 hover:border-[#4A7BF7]/50 flex justify-between items-center transition-colors"
                  >
                    <span className="font-medium">Mock Sets (Maths &amp; FM)</span>
                    <span className="text-[#7B8FAD] text-[11px]">50+ papers</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={onOpenBoundaries}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl bg-[#0A1020] hover:bg-[#4A7BF7]/15 text-[#E8ECF4] border border-[#6382BF]/25 hover:border-[#4A7BF7]/50 flex justify-between items-center transition-colors"
                >
                  <span className="font-medium">Grade Boundaries</span>
                  <span className="text-[#7B8FAD] text-[11px]">Calculator</span>
                </button>
                <button
                  type="button"
                  onClick={onOpenFormulas}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl bg-[#0A1020] hover:bg-[#4A7BF7]/15 text-[#E8ECF4] border border-[#6382BF]/25 hover:border-[#4A7BF7]/50 flex justify-between items-center transition-colors"
                >
                  <span className="font-medium">Formula Booklet</span>
                  <span className="text-[#7B8FAD] text-[11px]">9MA0 / 9FM0</span>
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={() => (onOpenMocks ? onOpenMocks() : onOpenBoundaries())}
              className="w-full py-2.5 bg-[#0A1020] hover:bg-[#4A7BF7]/15 text-[#E8ECF4] border border-[#6382BF]/35 hover:border-[#4A7BF7]/60 font-semibold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Open Mock Sets</span>
              <ChevronRight size={14} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Bento Features Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 border-t border-[#6382BF]/15">
        <motion.div {...scrollRevealProps(0)} className="text-center max-w-2xl mx-auto">
          <p className="text-xs font-semibold tracking-widest text-[#4A7BF7] uppercase">
            Features
          </p>
          <h2 className="mt-2.5 text-2xl sm:text-4xl font-bold tracking-tight text-[#E8ECF4]">
            Everything exam revision should have been
          </h2>
        </motion.div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                {...scrollRevealProps((i % 3) * 0.06)}
                className="rounded-2xl border border-[#6382BF]/25 bg-[#1A2540] p-6 shadow-sm hover:border-[#4A7BF7]/50 transition-colors"
              >
                <div className="mb-4 flex w-10 h-10 items-center justify-center rounded-xl bg-[#0A1020] border border-[#6382BF]/30 text-[#4A7BF7]">
                  <Icon size={19} />
                </div>
                <h3 className="text-base font-bold text-[#E8ECF4]">{f.title}</h3>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#7B8FAD]">{f.body}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          {...scrollRevealProps(0.1)}
          className="mt-8 flex flex-wrap items-center justify-center gap-2.5"
        >
          {CAPABILITY_PILLS.map((pill) => {
            const Icon = pill.icon;
            return (
              <span
                key={pill.label}
                className="inline-flex items-center gap-2 rounded-full border border-[#6382BF]/25 bg-[#1A2540] px-4 py-2 text-xs text-[#7B8FAD]"
              >
                <Icon size={14} className="text-[#4A7BF7]" />
                <span>{pill.label}</span>
              </span>
            );
          })}
        </motion.div>
      </section>

      {/* Alternating Interactive Feature Showcases (Zero static screenshots — all interactive!) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 border-t border-[#6382BF]/15 space-y-20">
        {/* Showcase 1: Interactive Questions by Topic */}
        <motion.div
          {...scrollRevealProps(0)}
          className="flex flex-col items-center gap-8 lg:gap-14 lg:flex-row"
        >
          <div className="lg:w-2/5 space-y-3 text-left">
            <p className="text-xs font-semibold tracking-widest text-[#4A7BF7] uppercase">
              Questions by Topic
            </p>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#E8ECF4] leading-snug">
              Drill 1,400+ questions filtered straight to your weak spots
            </h3>
            <p className="text-sm leading-relaxed text-[#7B8FAD]">
              Filter 65+ syllabus topics by qualification, module, or theorem across both official Past Papers and 50+ Mock Sets. Try filtering live on the right.
            </p>
            {onOpenTopics && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onOpenTopics('all')}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-[#6382BF]/30 bg-[#1A2540] hover:border-[#4A7BF7]/60 hover:bg-[#4A7BF7]/15 px-4 py-2 text-xs font-semibold text-[#E8ECF4] transition-colors"
                >
                  <span>Open By Topic</span>
                  <ChevronRight size={14} className="text-[#4A7BF7]" />
                </button>
              </div>
            )}
          </div>

          <div className="w-full lg:w-3/5">
            <div className="rounded-2xl border border-[#6382BF]/25 bg-[#1A2540] p-4 sm:p-5 shadow-2xl space-y-3.5">
              <div className="relative">
                <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7B8FAD]" />
                <input
                  type="text"
                  value={topicFilter}
                  onChange={(e) => setTopicFilter(e.target.value)}
                  placeholder="Try typing e.g. Trigonometry, Matrices, Decision..."
                  className="w-full bg-[#0A1020] border border-[#6382BF]/30 focus:border-[#4A7BF7] rounded-xl pl-9 pr-3 py-2.5 text-xs text-[#E8ECF4] placeholder-[#7B8FAD] focus:outline-none transition-colors"
                />
              </div>

              <div className="space-y-2">
                {filteredSampleTopics.map((topic) => (
                  <div
                    key={topic.id}
                    className="p-3.5 rounded-xl bg-[#0A1020] border border-[#6382BF]/20 hover:border-[#4A7BF7]/50 flex items-center justify-between gap-3 transition-colors"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 text-[10px] text-[#7B8FAD]">
                        <span className="px-2 py-0.5 rounded-full bg-[#4A7BF7]/15 text-[#4A7BF7] border border-[#4A7BF7]/30 font-semibold">
                          {topic.level}
                        </span>
                        <span>{topic.questions}</span>
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-[#E8ECF4] truncate mt-1">
                        {topic.title}
                      </div>
                    </div>
                    {onOpenTopics && (
                      <button
                        type="button"
                        onClick={() => onOpenTopics('all')}
                        className="px-3 py-1.5 rounded-lg bg-[#4A7BF7] hover:bg-[#3D6CE0] text-white text-xs font-semibold shrink-0 transition-colors inline-flex items-center gap-1"
                      >
                        <Play size={11} className="fill-current" />
                        <span>Practice</span>
                      </button>
                    )}
                  </div>
                ))}
                {filteredSampleTopics.length === 0 && (
                  <div className="py-6 text-center text-xs text-[#7B8FAD]">
                    No matching sample topic.{' '}
                    <button
                      type="button"
                      onClick={() => setTopicFilter('')}
                      className="text-[#4A7BF7] underline"
                    >
                      Reset filter
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Showcase 2: Interactive Live Question & Self-Marking Widget */}
        <motion.div
          {...scrollRevealProps(0)}
          className="flex flex-col items-center gap-8 lg:gap-14 lg:flex-row-reverse"
        >
          <div className="lg:w-2/5 space-y-3 text-left">
            <p className="text-xs font-semibold tracking-widest text-[#4A7BF7] uppercase">
              Interactive Practice Mode
            </p>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#E8ECF4] leading-snug">
              Official papers and mark schemes built for active recall
            </h3>
            <p className="text-sm leading-relaxed text-[#7B8FAD]">
              Test it directly here: inspect the real June 2024 Pure 1 Question 1, reveal the official Pearson mark scheme, and award yourself marks below.
            </p>
            {onOpenPractice && demoPurePaperModule && demoPurePaper && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onOpenPractice(demoPurePaper, demoPurePaperModule)}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-[#6382BF]/30 bg-[#1A2540] hover:border-[#4A7BF7]/60 hover:bg-[#4A7BF7]/15 px-4 py-2 text-xs font-semibold text-[#E8ECF4] transition-colors"
                >
                  <span>Open Full Paper</span>
                  <ChevronRight size={14} className="text-[#4A7BF7]" />
                </button>
              </div>
            )}
          </div>

          <div className="w-full lg:w-3/5">
            <div className="rounded-2xl border border-[#6382BF]/25 bg-[#1A2540] p-4 sm:p-5 shadow-2xl space-y-4">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-[#E8ECF4]">Question 1</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#4A7BF7]/15 text-[#4A7BF7] border border-[#4A7BF7]/30">
                    Algebra &amp; Functions · June 2024 P1
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-md bg-[#0A1020] border border-[#6382BF]/25 text-[11px] font-semibold text-[#E8ECF4]">
                  3 marks
                </span>
              </div>

              <div className="rounded-xl bg-white p-3 border border-[#6382BF]/20 overflow-hidden">
                <img
                  src={assetUrl('/crops/maths/p1/2024-q1.png')}
                  alt="Edexcel Pure 1 June 2024 Question 1"
                  loading="lazy"
                  className="w-full h-auto object-contain"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setDemoShowMs((prev) => !prev)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0A1020] hover:bg-[#4A7BF7]/15 border border-[#6382BF]/30 hover:border-[#4A7BF7]/50 text-xs font-semibold text-[#E8ECF4] transition-colors"
                >
                  {demoShowMs ? <EyeOff size={14} className="text-[#4A7BF7]" /> : <Eye size={14} className="text-[#4A7BF7]" />}
                  <span>{demoShowMs ? 'Hide Mark Scheme' : 'Reveal Mark Scheme'}</span>
                </button>

                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] text-[#7B8FAD] mr-1">Self-award:</span>
                  {[0, 1, 2, 3].map((m) => {
                    const active = demoMarks === m;
                    return (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setDemoMarks((prev) => (prev === m ? null : m))}
                        className={`w-8 h-8 rounded-lg text-xs font-bold border transition-colors flex items-center justify-center ${
                          active
                            ? 'bg-[#4A7BF7] text-white border-[#4A7BF7]'
                            : 'bg-[#0A1020] text-[#7B8FAD] border-[#6382BF]/30 hover:text-[#E8ECF4]'
                        }`}
                      >
                        {m}
                      </button>
                    );
                  })}
                </div>
              </div>

              <AnimatePresence initial={false}>
                {demoShowMs && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.24, ease: EASE_SMOOTH }}
                    className="overflow-hidden"
                  >
                    <div className="rounded-xl bg-white p-3 border border-emerald-500/35 mt-1">
                      <img
                        src={assetUrl('/crops/maths/p1/2024-q1-ms.png')}
                        alt="Edexcel Pure 1 June 2024 Question 1 Mark Scheme"
                        className="w-full h-auto object-contain"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {demoMarks !== null && (
                <div className="text-[11px] text-emerald-300 flex items-center gap-1.5">
                  <Check size={13} />
                  <span>Recorded {demoMarks}/3 marks — try full papers to track accuracy in your Dashboard.</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Showcase 3: Live Interactive Grade Boundary Estimator */}
        <motion.div
          {...scrollRevealProps(0)}
          className="flex flex-col items-center gap-8 lg:gap-14 lg:flex-row"
        >
          <div className="lg:w-2/5 space-y-3 text-left">
            <p className="text-xs font-semibold tracking-widest text-[#4A7BF7] uppercase">
              Boundaries &amp; Analytics
            </p>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#E8ECF4] leading-snug">
              See your A Level grade cleanly from real Edexcel boundaries
            </h3>
            <p className="text-sm leading-relaxed text-[#7B8FAD]">
              Drag the score slider to check official Pearson thresholds in real time, then open Grade Boundaries or sign in for full Dashboard analytics.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={onOpenBoundaries}
                className="inline-flex items-center gap-1.5 rounded-xl border border-[#6382BF]/30 bg-[#1A2540] hover:border-[#4A7BF7]/60 hover:bg-[#4A7BF7]/15 px-4 py-2 text-xs font-semibold text-[#E8ECF4] transition-colors"
              >
                <span>Explore Grade Boundaries</span>
                <ChevronRight size={14} className="text-[#4A7BF7]" />
              </button>
            </div>
          </div>

          <div className="w-full lg:w-3/5">
            <div className="rounded-2xl border border-[#6382BF]/25 bg-[#1A2540] p-5 shadow-2xl space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#E8ECF4]">
                  <Calculator size={15} className="text-[#4A7BF7]" />
                  <span>Live Boundary Estimator ({activeBoundaryEntry.year})</span>
                </div>
                <div className="flex items-center gap-1 bg-[#0A1020] p-1 rounded-xl border border-[#6382BF]/25 text-xs">
                  {([
                    ['maths', 'Maths (9MA0)'],
                    ['further-maths', 'Further (9FM0)'],
                  ] as const).map(([val, label]) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setEstQual(val)}
                      className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
                        estQual === val
                          ? 'bg-[#4A7BF7] text-white'
                          : 'text-[#7B8FAD] hover:text-[#E8ECF4]'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-xl bg-[#0A1020] border border-[#6382BF]/25 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#7B8FAD]">Raw score out of {activeBoundaryEntry.overallMax}</span>
                    <span className="font-mono font-bold text-[#E8ECF4]">
                      {estScore} / {activeBoundaryEntry.overallMax} ({Math.round((estScore / activeBoundaryEntry.overallMax) * 100)}%)
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={activeBoundaryEntry.overallMax}
                    value={estScore}
                    onChange={(e) => setEstScore(Number(e.target.value))}
                    className="w-full accent-[#4A7BF7] cursor-pointer"
                  />
                </div>

                <div className="px-4 py-2.5 rounded-xl bg-[#1A2540] border border-[#4A7BF7]/40 text-center shrink-0 min-w-[130px]">
                  <div className="text-2xl font-bold text-[#4A7BF7] leading-none">
                    {estResult.grade}
                  </div>
                  <div className="text-[11px] text-[#7B8FAD] mt-1">{estResult.sub}</div>
                </div>
              </div>

              <div className="grid grid-cols-6 gap-2 text-center text-xs">
                {(['A*', 'A', 'B', 'C', 'D', 'E'] as const).map((g) => (
                  <div
                    key={g}
                    className={`py-2 px-1 rounded-lg border ${
                      estResult.grade === g
                        ? 'bg-[#4A7BF7]/20 border-[#4A7BF7] text-[#E8ECF4]'
                        : 'bg-[#0A1020] border-[#6382BF]/20 text-[#7B8FAD]'
                    }`}
                  >
                    <div className="font-bold text-[#E8ECF4]">{g}</div>
                    <div className="font-mono text-[11px] mt-0.5">{estResult.bounds[g] ?? '–'}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Bottom CTA Card */}
      <motion.section {...scrollRevealProps(0)} className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        <div className="rounded-2xl border border-[#6382BF]/25 bg-[#1A2540] px-6 py-8 sm:px-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1.5 text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl font-bold text-[#E8ECF4]">
              Ready to start a paper or topic run?
            </h2>
            <p className="text-xs sm:text-sm text-[#7B8FAD]">
              Jump straight into June 2026 past papers, 50+ official mock sets, or sign in to sync your Dashboard.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => onSelectSubject('maths')}
              className="rounded-full bg-[#4A7BF7] hover:bg-[#3D6CE0] px-6 py-2.5 text-xs font-semibold text-white shadow-md shadow-[#4A7BF7]/25 transition-colors"
            >
              Past Papers
            </button>
            <button
              type="button"
              onClick={onOpenFormulas}
              className="rounded-full border border-[#6382BF]/35 bg-[#0A1020] hover:border-[#4A7BF7]/60 px-5 py-2.5 text-xs font-medium text-[#E8ECF4] transition-colors"
            >
              Formula Booklet
            </button>
          </div>
        </div>
      </motion.section>
    </div>
  );
};
