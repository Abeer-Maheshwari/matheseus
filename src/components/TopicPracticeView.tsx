import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  X,
  Play,
  Eye,
  ChevronDown,
  ChevronUp,
  Layers,
  GraduationCap,
  CheckCircle2,
  FileQuestion,
  Filter,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';
import {
  TopicGroup,
  IndexedQuestion,
  MODULE_FILTER_OPTIONS,
  getTopicGroups,
  createTopicInteractivePaper,
  createSingleQuestionInteractivePaper,
  isTopicIndexCached,
} from '../data/questionIndex';
import { InteractivePaper } from '../data/interactiveQuestions';
import { contentFadeVariants, PILL_SPRING, EASE_SMOOTH } from '../utils/motion';
import { SectionLoader } from './SectionLoader';

interface TopicPracticeViewProps {
  onOpenPracticeInteractive: (paper: InteractivePaper, reviewMode?: boolean, questionIndex?: number) => void;
  initialLevel?: 'all' | 'as' | 'a2';
}

export const TopicPracticeView: React.FC<TopicPracticeViewProps> = ({
  onOpenPracticeInteractive,
  initialLevel = 'all',
}) => {
  // Filters: Subject is the single source of truth for qualification & level
  const [selectedSubject, setSelectedSubject] = useState<'all' | 'maths' | 'further-maths' | 'as-maths' | 'as-further-maths'>(
    initialLevel === 'as' ? 'as-maths' : 'all'
  );
  const [selectedModule, setSelectedModule] = useState<string>('all');
  const [sourceFilter, setSourceFilter] = useState<'all' | 'past-papers' | 'mocks'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState<boolean>(false);

  // Expanded topic IDs
  const [expandedTopicIds, setExpandedTopicIds] = useState<Set<string>>(new Set());
  // Defer cold index build until after mount so tab entry shows loader smoothly instead of stalling
  const [indexReady, setIndexReady] = useState<boolean>(() => isTopicIndexCached());
  // Defer off-screen cards until after the tab enter transition finishes so mounting is instant
  const [showAllTopics, setShowAllTopics] = useState<boolean>(false);

  useEffect(() => {
    const timers: number[] = [];
    if (!indexReady) {
      timers.push(window.setTimeout(() => setIndexReady(true), 80));
    }
    timers.push(window.setTimeout(() => setShowAllTopics(true), 250));
    return () => timers.forEach((id) => window.clearTimeout(id));
  }, [indexReady]);

  const toggleTopicExpand = (topicId: string) => {
    setExpandedTopicIds((prev) => {
      const next = new Set(prev);
      if (next.has(topicId)) next.delete(topicId);
      else next.add(topicId);
      return next;
    });
  };

  const expandAll = (topics: TopicGroup[]) => {
    setShowAllTopics(true);
    setExpandedTopicIds(new Set(topics.map((t) => t.id)));
  };

  const collapseAll = () => {
    setExpandedTopicIds(new Set());
  };

  // Map selected subject to underlying query criteria
  const effectiveSubject: 'all' | 'maths' | 'further-maths' =
    selectedSubject === 'as-maths' ? 'maths' : selectedSubject === 'as-further-maths' ? 'further-maths' : selectedSubject;

  const effectiveLevel: 'all' | 'as' | 'a2' =
    selectedSubject === 'as-maths' || selectedSubject === 'as-further-maths' ? 'as' : 'all';

  const topicGroups = useMemo(() => {
    if (!indexReady) return [];
    return getTopicGroups({
      subject: effectiveSubject,
      moduleId: selectedModule,
      source: sourceFilter,
      searchQuery,
      level: effectiveLevel,
    });
  }, [indexReady, effectiveSubject, selectedModule, sourceFilter, searchQuery, effectiveLevel]);

  // Aggregate stats
  const totalQuestionsCount = useMemo(() => {
    return topicGroups.reduce((sum, g) => sum + g.totalQuestions, 0);
  }, [topicGroups]);

  const totalMarksCount = useMemo(() => {
    return topicGroups.reduce((sum, g) => sum + g.totalMarks, 0);
  }, [topicGroups]);

  // Available modules based on subject
  const availableModules = useMemo(() => {
    if (selectedSubject === 'all') return MODULE_FILTER_OPTIONS;
    if (selectedSubject === 'as-maths') {
      return MODULE_FILTER_OPTIONS.filter((m) => m.subject === 'maths' && m.level !== 'A2');
    }
    if (selectedSubject === 'as-further-maths') {
      return MODULE_FILTER_OPTIONS.filter((m) => m.subject === 'further-maths' && m.level !== 'A2');
    }
    return MODULE_FILTER_OPTIONS.filter((m) => m.subject === selectedSubject);
  }, [selectedSubject]);

  // When changing subject, preserve search query and only reset module if not in new subject
  const handleSubjectChange = (newSub: 'all' | 'maths' | 'further-maths' | 'as-maths' | 'as-further-maths') => {
    setSelectedSubject(newSub);
    if (selectedModule !== 'all') {
      const newAvail =
        newSub === 'all'
          ? MODULE_FILTER_OPTIONS
          : newSub === 'as-maths'
          ? MODULE_FILTER_OPTIONS.filter((m) => m.subject === 'maths' && m.level !== 'A2')
          : newSub === 'as-further-maths'
          ? MODULE_FILTER_OPTIONS.filter((m) => m.subject === 'further-maths' && m.level !== 'A2')
          : MODULE_FILTER_OPTIONS.filter((m) => m.subject === newSub);
      if (!newAvail.some((m) => m.id === selectedModule)) {
        setSelectedModule('all');
      }
    }
  };

  // Active filter state detection (category removed)
  const hasActiveFilters =
    selectedSubject !== 'all' ||
    selectedModule !== 'all' ||
    sourceFilter !== 'all';

  const handleResetFilters = () => {
    setSelectedSubject('all');
    setSelectedModule('all');
    setSourceFilter('all');
    setSearchQuery('');
  };

  const handlePracticeTopic = (group: TopicGroup) => {
    const paper = createTopicInteractivePaper(group);
    onOpenPracticeInteractive(paper, false, 0);
  };

  const handleSolveSingleQuestion = (q: IndexedQuestion) => {
    const paper = createSingleQuestionInteractivePaper(q);
    onOpenPracticeInteractive(paper, false, 0);
  };

  const handleViewMarkScheme = (q: IndexedQuestion) => {
    const paper = createSingleQuestionInteractivePaper(q);
    onOpenPracticeInteractive(paper, true, 0);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-[#1A2540] border border-[#6382BF]/25 p-6 sm:p-7 shadow-xl">
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1.5">
              <h1 className="text-2xl sm:text-3xl font-bold text-[#E8ECF4] tracking-tight">
                Questions by Topic
              </h1>
              <p className="text-xs sm:text-sm text-[#7B8FAD] max-w-2xl leading-relaxed">
                Filter by subject or module, search by topic or theorem, and practice Pearson past paper questions under exam conditions.
              </p>
            </div>

            {/* Quick Metrics Cards */}
            <div className="grid grid-cols-3 gap-2.5 shrink-0">
              <div className="bg-[#0A1020]/70 border border-[#6382BF]/20 rounded-xl px-3.5 py-2 text-center">
                <div className="text-[10px] text-[#7B8FAD] font-medium uppercase tracking-wider">Topics</div>
                <div className="text-lg font-bold text-[#E8ECF4] mt-0.5">{topicGroups.length}</div>
              </div>
              <div className="bg-[#0A1020]/70 border border-[#6382BF]/20 rounded-xl px-3.5 py-2 text-center">
                <div className="text-[10px] text-[#7B8FAD] font-medium uppercase tracking-wider">Questions</div>
                <div className="text-lg font-bold text-[#4A7BF7] mt-0.5">{totalQuestionsCount}</div>
              </div>
              <div className="bg-[#0A1020]/70 border border-[#6382BF]/20 rounded-xl px-3.5 py-2 text-center">
                <div className="text-[10px] text-[#7B8FAD] font-medium uppercase tracking-wider">Marks</div>
                <div className="text-lg font-bold text-[#E8ECF4] mt-0.5">{totalMarksCount}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filters Toggle Button */}
      <div className="lg:hidden">
        <button
          onClick={() => setMobileFiltersOpen((prev) => !prev)}
          className="w-full flex items-center justify-between p-3.5 rounded-xl bg-[#1A2540] border border-[#6382BF]/25 text-xs text-[#E8ECF4] font-semibold shadow-md active:scale-[0.99] transition-all"
        >
          <div className="flex items-center gap-2">
            <Filter size={15} className="text-[#4A7BF7]" />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-[#4A7BF7] text-white font-bold">
                Active
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 text-[#7B8FAD]">
            <span>{totalQuestionsCount} questions</span>
            {mobileFiltersOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
        </button>
      </div>

      {/* Main 2-Column Responsive Layout */}
      <div className="flex flex-col lg:flex-row items-start gap-6">
        {/* Left Column: Sidebar Filters */}
        <aside
          className={`w-full lg:w-72 xl:w-80 shrink-0 ${
            mobileFiltersOpen ? 'block' : 'hidden lg:block'
          }`}
        >
          <div className="bg-[#1A2540] border border-[#6382BF]/25 rounded-2xl p-4 shadow-lg space-y-5 lg:sticky lg:top-20 max-h-[calc(100vh-6rem)] overflow-y-auto scrollbar-thin">
            {/* Sidebar Title & Reset */}
            <div className="flex items-center justify-between pb-3 border-b border-[#6382BF]/20">
              <div className="flex items-center gap-2 font-bold text-xs text-[#E8ECF4] uppercase tracking-wider">
                <Filter size={14} className="text-[#4A7BF7]" />
                <span>Filter Questions</span>
              </div>
              {hasActiveFilters && (
                <button
                  onClick={handleResetFilters}
                  className="flex items-center gap-1 text-[11px] text-[#7B8FAD] hover:text-[#E8ECF4] font-medium transition-colors"
                >
                  <RotateCcw size={11} />
                  <span>Reset all</span>
                </button>
              )}
            </div>

            {/* 1. Subject & Level Filter with Smooth Animated Pill */}
            <div className="space-y-1.5">
              <div className="text-[11px] font-semibold text-[#7B8FAD] uppercase tracking-wider">
                Subject & Level
              </div>
              <div className="space-y-1">
                {[
                  { id: 'all', label: 'All Subjects & Levels', icon: null },
                  { id: 'maths', label: 'A Level Maths (9MA0)', icon: <GraduationCap size={13} /> },
                  { id: 'further-maths', label: 'Further Maths (9FM0)', icon: <Layers size={13} /> },
                  { id: 'as-maths', label: 'AS Maths (8MA0)', icon: <GraduationCap size={13} /> },
                  { id: 'as-further-maths', label: 'AS Further (8FM0)', icon: <Layers size={13} /> },
                ].map((sub) => {
                  const isActive = selectedSubject === sub.id;
                  return (
                    <button
                      key={sub.id}
                      onClick={() => handleSubjectChange(sub.id as any)}
                      className={`relative w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors duration-300 active:scale-[0.99] ${
                        isActive
                          ? 'text-white font-semibold'
                          : 'text-[#7B8FAD] hover:text-[#E8ECF4] hover:bg-[#0A1020]/60'
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="sidebar-subject-pill"
                          className="absolute inset-0 bg-[#4A7BF7] rounded-xl shadow-md shadow-[#4A7BF7]/25"
                          transition={PILL_SPRING}
                        />
                      )}
                      <span className="relative z-10 flex items-center gap-2 truncate">
                        {sub.icon}
                        <span className="truncate">{sub.label}</span>
                      </span>
                      {isActive && <CheckCircle2 size={13} className="relative z-10 text-white shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Module Filter Chips */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-[#7B8FAD] uppercase tracking-wider">
                  Module
                </span>
                {selectedModule !== 'all' && (
                  <button
                    onClick={() => setSelectedModule('all')}
                    className="text-[10px] text-[#4A7BF7] hover:underline"
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-1 max-h-48 overflow-y-auto scrollbar-thin p-0.5">
                <button
                  onClick={() => setSelectedModule('all')}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all duration-300 active:scale-95 ${
                    selectedModule === 'all'
                      ? 'bg-[#4A7BF7] text-white font-semibold shadow-sm'
                      : 'bg-[#0A1020] text-[#7B8FAD] hover:text-[#E8ECF4] border border-[#6382BF]/20'
                  }`}
                >
                  All
                </button>
                {availableModules.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setSelectedModule(m.id)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all duration-300 active:scale-95 ${
                      selectedModule === m.id
                        ? 'bg-[#4A7BF7] text-white font-semibold shadow-sm'
                        : 'bg-[#0A1020] text-[#7B8FAD] hover:text-[#E8ECF4] border border-[#6382BF]/20'
                    }`}
                  >
                    {m.name}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Paper Source Filter with Sliding Pill Transition */}
            <div className="space-y-1.5">
              <div className="text-[11px] font-semibold text-[#7B8FAD] uppercase tracking-wider">
                Paper Source
              </div>
              <div className="relative grid grid-cols-3 gap-1 bg-[#0A1020] p-1 rounded-xl border border-[#6382BF]/20 text-[11px]">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'past-papers', label: 'Past Papers' },
                  { id: 'mocks', label: 'Mocks' },
                ].map((source) => {
                  const isActive = sourceFilter === source.id;
                  return (
                    <button
                      key={source.id}
                      onClick={() => setSourceFilter(source.id as any)}
                      className={`relative py-1.5 rounded-lg font-medium transition-colors duration-300 active:scale-[0.98] ${
                        isActive ? 'text-white font-semibold' : 'text-[#7B8FAD] hover:text-[#E8ECF4]'
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="paper-source-pill"
                          className="absolute inset-0 bg-[#4A7BF7] rounded-lg shadow-sm"
                          transition={PILL_SPRING}
                        />
                      )}
                      <span className="relative z-10">{source.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </aside>

        {/* Right Column: Topics List & Question Cards */}
        <main className="flex-1 min-w-0 space-y-4 w-full">
          {/* Search Bar Centered with the Topic Boxes */}
          <div className="w-full">
            <div className="relative group">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7B8FAD] group-focus-within:text-[#4A7BF7] transition-colors" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search any topic, theorem or keyword (e.g. 'De Moivre', 'Integration', 'Normal Distribution')..."
                className="w-full bg-[#1A2540] border border-[#6382BF]/25 hover:border-[#6382BF]/45 focus:border-[#4A7BF7] rounded-2xl pl-11 pr-11 py-3 text-sm text-[#E8ECF4] placeholder-[#7B8FAD] focus:outline-none focus:ring-1 focus:ring-[#4A7BF7] transition-all shadow-lg"
              />
              <AnimatePresence>
                {searchQuery && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    transition={PILL_SPRING}
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#7B8FAD] hover:text-[#E8ECF4] p-1 rounded-lg transition-colors"
                  >
                    <X size={16} />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Active Filter Chips */}
          <AnimatePresence>
            {hasActiveFilters && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18, ease: EASE_SMOOTH }}
                className="flex flex-wrap items-center gap-1.5 p-3 rounded-xl bg-[#1A2540]/60 border border-[#6382BF]/20 text-xs"
              >
                <span className="text-[#7B8FAD] font-medium text-[11px] mr-1">Active:</span>

                <AnimatePresence>
                  {selectedSubject !== 'all' && (
                    <motion.span
                      key="filter-chip-subject"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.16, ease: EASE_SMOOTH }}
                      className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#4A7BF7]/15 text-[#4A7BF7] border border-[#4A7BF7]/30"
                    >
                      <span>
                        {selectedSubject === 'maths'
                          ? 'A Level Maths'
                          : selectedSubject === 'further-maths'
                          ? 'Further Maths'
                          : selectedSubject === 'as-maths'
                          ? 'AS Maths'
                          : 'AS Further'}
                      </span>
                      <button onClick={() => handleSubjectChange('all')} className="hover:text-white transition-colors">
                        <X size={11} />
                      </button>
                    </motion.span>
                  )}

                  {selectedModule !== 'all' && (
                    <motion.span
                      key="filter-chip-module"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.16, ease: EASE_SMOOTH }}
                      className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#4A7BF7]/15 text-[#4A7BF7] border border-[#4A7BF7]/30"
                    >
                      <span>{MODULE_FILTER_OPTIONS.find((m) => m.id === selectedModule)?.name || selectedModule}</span>
                      <button onClick={() => setSelectedModule('all')} className="hover:text-white transition-colors">
                        <X size={11} />
                      </button>
                    </motion.span>
                  )}

                  {sourceFilter !== 'all' && (
                    <motion.span
                      key="filter-chip-source"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.16, ease: EASE_SMOOTH }}
                      className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#4A7BF7]/15 text-[#4A7BF7] border border-[#4A7BF7]/30"
                    >
                      <span>{sourceFilter === 'past-papers' ? 'Past Papers Only' : 'Mock Sets Only'}</span>
                      <button onClick={() => setSourceFilter('all')} className="hover:text-white transition-colors">
                        <X size={11} />
                      </button>
                    </motion.span>
                  )}
                </AnimatePresence>

                <button
                  onClick={handleResetFilters}
                  className="text-[11px] text-[#7B8FAD] hover:text-[#E8ECF4] underline ml-auto font-medium transition-colors"
                >
                  Clear all
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Control bar: Topic count & Expand/Collapse All */}
          <div className="flex items-center justify-between text-xs text-[#7B8FAD] py-1">
            <div>
              Showing <span className="text-[#E8ECF4] font-semibold">{topicGroups.length}</span> topics (
              <span className="text-[#4A7BF7] font-semibold">{totalQuestionsCount}</span> questions ·{' '}
              <span className="text-[#E8ECF4] font-semibold">{totalMarksCount}</span> marks)
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => expandAll(topicGroups)}
                className="hover:text-[#E8ECF4] transition-colors"
              >
                Expand All
              </button>
              <span>·</span>
              <button
                onClick={collapseAll}
                className="hover:text-[#E8ECF4] transition-colors"
              >
                Collapse All
              </button>
            </div>
          </div>

          {/* Topics Grid with Unified Fade Transition */}
          <AnimatePresence mode="wait" initial={false}>
            {!indexReady ? (
              <SectionLoader
                key="topic-loading"
                label="Loading topic questions..."
                sublabel="Indexing Past Papers & Official Mock Sets"
                className="min-h-[320px] rounded-2xl bg-[#1A2540]/50 border border-[#6382BF]/20"
              />
            ) : topicGroups.length === 0 ? (
              <motion.div
                key="no-results"
                variants={contentFadeVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="rounded-2xl bg-[#1A2540]/50 border border-[#6382BF]/20 p-12 text-center space-y-3"
              >
                <FileQuestion size={40} className="mx-auto text-[#7B8FAD]" />
                <div className="text-base font-semibold text-[#E8ECF4]">No topics match your search or filters</div>
                <p className="text-xs text-[#7B8FAD] max-w-sm mx-auto">
                  Try searching a different theorem or keyword, or switch subjects to explore questions.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-[#4A7BF7] text-white hover:bg-[#3D6CE0] transition-colors mt-2"
                >
                  Reset All Filters
                </button>
              </motion.div>
            ) : (
              <motion.div
                key={`${selectedSubject}-${selectedModule}-${sourceFilter}-${searchQuery.trim() ? 'search' : 'all'}`}
                variants={contentFadeVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="space-y-4"
              >
                {(showAllTopics ? topicGroups : topicGroups.slice(0, 14)).map((group) => {
                  const isExpanded = expandedTopicIds.has(group.id);

                  return (
                    <div
                      key={group.id}
                      className="rounded-2xl bg-[#1A2540]/80 border border-[#6382BF]/20 hover:border-[#6382BF]/40 transition-colors duration-200 overflow-hidden shadow-sm"
                    >
                        {/* Topic Header Card */}
                        <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          {/* Left: Info */}
                          <div className="space-y-2 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#4A7BF7]/15 text-[#4A7BF7] border border-[#4A7BF7]/30">
                                {group.level === 'AS' ? 'AS Level' : group.level === 'A2' ? 'A Level' : 'AS & A Level'}
                              </span>
                              <span className="text-xs text-[#7B8FAD] font-medium">
                                {group.totalQuestions} {group.totalQuestions === 1 ? 'question' : 'questions'}
                              </span>
                              <span className="text-xs text-[#6382BF]/40">·</span>
                              <span className="text-xs text-[#7B8FAD] font-medium">
                                {group.totalMarks} marks
                              </span>
                            </div>

                            <h3 className="text-lg font-bold text-[#E8ECF4] tracking-tight">
                              {group.title}
                            </h3>

                            {/* Modules badges */}
                            <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                              {group.modules.map((m) => {
                                const mOption = MODULE_FILTER_OPTIONS.find((opt) => opt.id === m);
                                return (
                                  <span
                                    key={m}
                                    className="px-2 py-0.5 rounded text-[11px] bg-[#0A1020] border border-[#6382BF]/20 text-[#7B8FAD] font-mono"
                                  >
                                    {mOption ? mOption.name : m.toUpperCase()}
                                  </span>
                                );
                              })}
                            </div>
                          </div>

                          {/* Right: Actions */}
                          <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
                            <button
                              onClick={() => handlePracticeTopic(group)}
                              className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs bg-[#4A7BF7] text-white hover:bg-[#3D6CE0] active:scale-95 transition-all shadow-md shadow-[#4A7BF7]/20"
                              title={`Practice all ${group.totalQuestions} questions in this topic`}
                            >
                              <Play size={14} className="fill-current" />
                              <span>Practice Topic ({group.totalQuestions})</span>
                            </button>

                            <button
                              onClick={() => toggleTopicExpand(group.id)}
                              className={`p-2.5 rounded-xl border transition-all ${
                                isExpanded
                                  ? 'bg-[#0A1020] border-[#4A7BF7]/50 text-[#E8ECF4]'
                                  : 'bg-[#0A1020]/60 border-[#6382BF]/20 text-[#7B8FAD] hover:text-[#E8ECF4] hover:bg-[#0A1020]'
                              }`}
                              title={isExpanded ? 'Collapse questions' : 'View individual questions'}
                            >
                              {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </button>
                          </div>
                        </div>

                        {/* Collapsible Question List Drawer */}
                        {isExpanded && (
                          <div className="border-t border-[#6382BF]/20 bg-[#0A1020]/60">
                            <div className="p-4 sm:p-5 space-y-3">
                              <div className="text-xs font-semibold text-[#7B8FAD] uppercase tracking-wider">
                                Questions in this Topic ({group.questions.length})
                              </div>

                              <div className="grid grid-cols-1 gap-2.5">
                                {group.questions.map((q) => (
                                  <div
                                    key={q.id}
                                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-[#1A2540]/60 border border-[#6382BF]/20 hover:border-[#4A7BF7]/40 transition-colors"
                                  >
                                    {/* Question details */}
                                    <div className="space-y-1 flex-1">
                                      <div className="flex flex-wrap items-center gap-2">
                                        <span className="font-semibold text-xs text-[#E8ECF4]">
                                          {q.paperTitle}
                                        </span>
                                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#4A7BF7]/15 text-[#4A7BF7] border border-[#4A7BF7]/30">
                                          Q{q.number}
                                        </span>
                                        <span className="text-xs text-[#7B8FAD] font-medium">
                                          {q.totalMarks} marks
                                        </span>
                                        <span className="px-1.5 py-0.2 rounded text-[10px] font-medium bg-[#0A1020] text-[#7B8FAD] border border-[#6382BF]/25">
                                          {q.level === 'AS' ? 'AS' : q.level === 'A2' ? 'A2' : 'AS & A2'}
                                        </span>
                                        {q.isMock && (
                                          <span className="px-1.5 py-0.2 rounded text-[10px] font-medium bg-[#0A1020] text-[#7B8FAD] border border-[#6382BF]/25">
                                            Mock
                                          </span>
                                        )}
                                      </div>

                                      {q.parts && q.parts.length > 1 && (
                                        <div className="text-[11px] text-[#7B8FAD]">
                                          Subparts:{' '}
                                          {q.parts
                                            .map((p) => `${p.partLabel || 'part'} (${p.marks}m)`)
                                            .join(', ')}
                                        </div>
                                      )}
                                    </div>

                                    {/* Question Actions */}
                                    <div className="flex items-center gap-2 shrink-0">
                                      <button
                                        onClick={() => handleViewMarkScheme(q)}
                                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#0A1020] text-[#7B8FAD] hover:text-[#E8ECF4] border border-[#6382BF]/25 hover:border-[#6382BF]/45 transition-colors"
                                        title="View question snippet and official mark scheme"
                                      >
                                        <Eye size={13} />
                                        <span>Mark Scheme</span>
                                      </button>

                                      <button
                                        onClick={() => handleSolveSingleQuestion(q)}
                                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#4A7BF7]/15 hover:bg-[#4A7BF7] text-[#4A7BF7] hover:text-white border border-[#4A7BF7]/30 transition-all active:scale-95"
                                        title="Solve this single question in practice mode"
                                      >
                                        <span>Solve</span>
                                        <ArrowRight size={13} />
                                      </button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};
