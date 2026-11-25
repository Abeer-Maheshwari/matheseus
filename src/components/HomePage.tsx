import React from 'react';
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
} from 'lucide-react';
import pastPapersPreview from '../../docs/screenshots/past-papers.jpg';
import topicPracticePreview from '../../docs/screenshots/topic-practice.jpg';
import practiceQuestionPreview from '../../docs/screenshots/practice-question.jpg';
import dashboardPreview from '../../docs/screenshots/dashboard.jpg';

interface HomePageProps {
  onSelectSubject: (
    subject: 'maths' | 'further-maths' | 'more-papers',
    moduleId?: string
  ) => void;
  onOpenMocks?: () => void;
  onOpenFormulas: () => void;
  onOpenBoundaries: () => void;
  onOpenTopics?: (level?: 'all' | 'as' | 'a2') => void;
}

const FEATURES = [
  {
    icon: BookOpen,
    title: 'Latest Past Papers',
    body: 'Complete Pearson Edexcel 9MA0 & 9FM0 archive spanning 2018 through June 2026 with official mark schemes.',
  },
  {
    icon: FileCheck2,
    title: '59 Curated Mock Sets',
    body: 'Dedicated Maths and Further Maths mock series structured by paper code with full practice and mark scheme support.',
  },
  {
    icon: ListFilter,
    title: '1,478 Questions by Topic',
    body: 'Filter across 68 syllabus topics by qualification, module, theorem, or paper source (Past Papers and Mock Sets).',
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

export const HomePage: React.FC<HomePageProps> = ({
  onSelectSubject,
  onOpenMocks,
  onOpenFormulas,
  onOpenBoundaries,
  onOpenTopics,
}) => {
  const showcases = [
    {
      eyebrow: 'Questions by Topic',
      title: 'Drill 1,478 questions filtered straight to your weak spots',
      body: 'Stop scrolling through dozens of PDFs for one integration or mechanics style. Filter 68 topics by subject, module, or theorem across both official Past Papers and Mock Sets.',
      img: topicPracticePreview,
      alt: 'Questions by Topic filter and search view in matheseus',
      ctaLabel: 'Open By Topic',
      onClick: () => onOpenTopics?.('all'),
    },
    {
      eyebrow: 'Interactive Practice Mode',
      title: 'Official papers and mark schemes built for active recall',
      body: 'Solve cropped official exam and mock questions one step at a time, reveal Pearson mark schemes inline, zoom into diagrams, and award yourself marks per subpart.',
      img: practiceQuestionPreview,
      alt: 'Interactive practice question card and self-marking pills',
      ctaLabel: 'Explore Mock Sets',
      onClick: () => (onOpenMocks ? onOpenMocks() : onSelectSubject('maths')),
    },
    {
      eyebrow: 'Student Dashboard',
      title: 'Track module coverage, predicted grades, and topic accuracy',
      body: 'Every completed paper and practice session feeds into your Maths & Further Maths coverage bars, attempt breakdowns, and accuracy badges synced safely to your account.',
      img: dashboardPreview,
      alt: 'Student dashboard displaying module coverage and topic accuracy',
      ctaLabel: 'Browse Past Papers',
      onClick: () => onSelectSubject('maths'),
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-16 text-center">
        <p className="mx-auto mb-5 w-fit rounded-full border border-[#6382BF]/30 bg-[#1A2540] px-4 py-1.5 text-[11px] font-semibold tracking-widest text-[#7B8FAD] uppercase shadow-sm">
          Edexcel 9MA0 &amp; 9FM0 · 2018–2026 Papers · 59 Mock Sets
        </p>

        <h1 className="mx-auto max-w-3xl text-4xl sm:text-5xl md:text-6xl font-serif font-bold tracking-tight text-[#E8ECF4] leading-[1.08]">
          Edexcel Maths. Practiced properly.
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-sm sm:text-base text-[#7B8FAD] leading-relaxed">
          matheseus brings together the latest A Level Maths &amp; Further Maths past papers up to{' '}
          <span className="text-[#E8ECF4] font-medium">June 2026</span>,{' '}
          <span className="text-[#E8ECF4] font-medium">59 curated mock sets</span>, topic-indexed question runs, and official mark schemes in one fast workspace.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
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
              <span>Mock Sets (59)</span>
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
        </div>

        <p className="mt-4 text-xs text-[#7B8FAD]">
          166 tracked papers · 1,478 indexed questions · 68 syllabus topics
        </p>

        {/* Hero Preview */}
        <div className="mt-12 rounded-2xl border border-[#6382BF]/25 bg-[#1A2540] p-2 sm:p-3 shadow-2xl">
          <img
            src={pastPapersPreview}
            alt="matheseus Past Papers explorer showing 2018 through June 2026 series"
            className="w-full rounded-xl border border-[#6382BF]/20 object-cover"
          />
        </div>
      </section>

      {/* Direct Subject & Mock Launchers */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 border-t border-[#6382BF]/15">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold tracking-widest text-[#4A7BF7] uppercase">
            Paper Archive
          </p>
          <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-[#E8ECF4]">
            Jump straight into a qualification
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* A Level Maths Card */}
          <div className="border border-[#6382BF]/25 rounded-2xl p-6 bg-[#1A2540] flex flex-col justify-between shadow-lg hover:border-[#4A7BF7]/60 transition-colors">
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
          </div>

          {/* Further Maths Card */}
          <div className="border border-[#6382BF]/25 rounded-2xl p-6 bg-[#1A2540] flex flex-col justify-between shadow-lg hover:border-[#4A7BF7]/60 transition-colors">
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
          </div>

          {/* Mock Sets & Archive Card */}
          <div className="border border-[#6382BF]/25 rounded-2xl p-6 bg-[#1A2540] flex flex-col justify-between shadow-lg hover:border-[#4A7BF7]/60 transition-colors">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#0A1020] border border-[#6382BF]/30 flex items-center justify-center text-[#4A7BF7]">
                    <FileCheck2 size={18} />
                  </div>
                  <h3 className="text-base font-bold text-[#E8ECF4]">Mock Sets &amp; Tools</h3>
                </div>
                <span className="text-[11px] px-2.5 py-0.5 rounded-md bg-[#0A1020] text-[#7B8FAD] border border-[#6382BF]/35 font-semibold">
                  59 Sets
                </span>
              </div>
              <p className="text-xs text-[#7B8FAD] mb-4 leading-relaxed">
                Exam-style mock series plus Grade Boundaries and the Edexcel Formula Booklet.
              </p>

              <div className="space-y-2 mb-5 text-xs">
                {onOpenMocks && (
                  <button
                    type="button"
                    onClick={onOpenMocks}
                    className="w-full text-left px-3.5 py-2.5 rounded-xl bg-[#0A1020] hover:bg-[#4A7BF7]/15 text-[#E8ECF4] border border-[#6382BF]/25 hover:border-[#4A7BF7]/50 flex justify-between items-center transition-colors"
                  >
                    <span className="font-medium">Mock Sets (Maths &amp; FM)</span>
                    <span className="text-[#7B8FAD] text-[11px]">59 papers</span>
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
          </div>
        </div>
      </section>

      {/* Bento Features Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 border-t border-[#6382BF]/15">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs font-semibold tracking-widest text-[#4A7BF7] uppercase">
            Features
          </p>
          <h2 className="mt-2.5 text-2xl sm:text-4xl font-bold tracking-tight text-[#E8ECF4]">
            Everything exam revision should have been
          </h2>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="rounded-2xl border border-[#6382BF]/25 bg-[#1A2540] p-6 shadow-sm hover:border-[#4A7BF7]/50 transition-colors"
              >
                <div className="mb-4 flex w-10 h-10 items-center justify-center rounded-xl bg-[#0A1020] border border-[#6382BF]/30 text-[#4A7BF7]">
                  <Icon size={19} />
                </div>
                <h3 className="text-base font-bold text-[#E8ECF4]">{f.title}</h3>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#7B8FAD]">{f.body}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
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
        </div>
      </section>

      {/* Alternating Screen Showcases */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 border-t border-[#6382BF]/15 space-y-20">
        {showcases.map((s, idx) => (
          <div
            key={s.eyebrow}
            className={`flex flex-col items-center gap-8 lg:gap-14 ${
              idx % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'
            }`}
          >
            <div className="lg:w-2/5 space-y-3 text-left">
              <p className="text-xs font-semibold tracking-widest text-[#4A7BF7] uppercase">
                {s.eyebrow}
              </p>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#E8ECF4] leading-snug">
                {s.title}
              </h3>
              <p className="text-sm leading-relaxed text-[#7B8FAD]">{s.body}</p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={s.onClick}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-[#6382BF]/30 bg-[#1A2540] hover:border-[#4A7BF7]/60 hover:bg-[#4A7BF7]/15 px-4 py-2 text-xs font-semibold text-[#E8ECF4] transition-colors"
                >
                  <span>{s.ctaLabel}</span>
                  <ChevronRight size={14} className="text-[#4A7BF7]" />
                </button>
              </div>
            </div>

            <div className="lg:w-3/5">
              <div className="rounded-2xl border border-[#6382BF]/25 bg-[#1A2540] p-2 shadow-2xl">
                <img
                  src={s.img}
                  alt={s.alt}
                  loading="lazy"
                  className="w-full rounded-xl border border-[#6382BF]/20 object-cover"
                />
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Bottom CTA Card */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        <div className="rounded-2xl border border-[#6382BF]/25 bg-[#1A2540] px-6 py-8 sm:px-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1.5 text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl font-bold text-[#E8ECF4]">
              Ready to start a paper or topic run?
            </h2>
            <p className="text-xs sm:text-sm text-[#7B8FAD]">
              Jump straight into June 2026 past papers, 59 mock sets, or sign in to sync your Dashboard.
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
      </section>
    </div>
  );
};
