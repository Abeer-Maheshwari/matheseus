import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MODULES_DATA, ModuleSection, PaperEntry } from '../data/papersData';
import { ExamAttempt } from '../types';
import { ScoreReportModal } from './ScoreReportModal';
import { getAllLatestAttemptsMap, deleteExamAttempt } from '../utils/attempts';
import { assetUrl } from '../utils/assets';
import { 
  FileText, 
  Columns, 
  Check, 
  CheckCircle2,
  Eye,
  Download, 
  GraduationCap, 
  Layers, 
  BookOpen,
  Play,
  FolderArchive,
  Pi,
  Compass,
  BarChart2,
  GitBranch
} from 'lucide-react';

const SUBJECT_ORDER: Record<string, number> = {
  'maths': 0,
  'further-maths': 1,
  'more-papers': 2,
};

const subjectVariants = {
  enter: (dir: number) => ({
    opacity: 0,
    x: dir * 18,
    scale: 0.994,
  }),
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.24,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir * -18,
    scale: 0.994,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  }),
};

const moduleContentVariants = {
  enter: { opacity: 0, y: 8 },
  center: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: {
    opacity: 0,
    y: -6,
    transition: { duration: 0.18, ease: [0.4, 0, 0.2, 1] as const },
  },
};

const getCategoryIcon = (title: string) => {
  const lower = title.toLowerCase();
  if (lower.includes('core pure')) return <Pi size={13} className="text-[#4A7BF7]" />;
  if (lower.includes('further pure')) return <Layers size={13} className="text-[#4A7BF7]" />;
  if (lower.includes('mechanics')) return <Compass size={13} className="text-[#4A7BF7]" />;
  if (lower.includes('statistics')) return <BarChart2 size={13} className="text-[#4A7BF7]" />;
  if (lower.includes('decision')) return <GitBranch size={13} className="text-[#4A7BF7]" />;
  if (lower.includes('madasmaths') || lower.includes('iygb')) return <GraduationCap size={13} className="text-[#4A7BF7]" />;
  if (lower.includes('crashmaths')) return <Layers size={13} className="text-[#4A7BF7]" />;
  if (lower.includes('activelearn')) return <FileText size={13} className="text-[#4A7BF7]" />;
  if (lower.includes('pure')) return <GraduationCap size={13} className="text-[#4A7BF7]" />;
  if (lower.includes('applied')) return <BarChart2 size={13} className="text-[#4A7BF7]" />;
  return <BookOpen size={13} className="text-[#4A7BF7]" />;
};

const getModuleDisplayTitle = (m: ModuleSection, currentSubject: string) => {
  if (currentSubject === 'further-maths' || currentSubject === 'more-papers') {
    if (m.title.startsWith('Further Mechanics ')) return m.title.replace('Further ', '');
    if (m.title.startsWith('Further Statistics ')) return m.title.replace('Further ', '');
    if (m.title.startsWith('Further Pure ')) return m.title.replace('Further Pure ', 'Pure ');
  }
  return m.title;
};

const getModuleCodeBadge = (m: ModuleSection, currentSubject: string) => {
  if (currentSubject === 'further-maths') {
    return m.code.split('/')[1] || m.code;
  }
  if (currentSubject === 'more-papers') {
    if (m.id === 'more-crash-p1') return 'P1';
    if (m.id === 'more-crash-p2') return 'P2';
    if (m.id === 'more-crash-p3') return 'P3';
    if (m.id === 'more-iygb-mp1') return 'MP1';
    if (m.id === 'more-iygb-mp2') return 'MP2';
    if (m.id === 'more-iygb-mms') return 'MMS';
    if (m.id === 'more-iygb-syn') return 'SYN';
    if (m.id.includes('cp1')) return 'CP1';
    if (m.id.includes('cp2')) return 'CP2';
    if (m.id.includes('fm1')) return 'FM1';
    if (m.id.includes('fs1')) return 'FS1';
  }
  return m.code;
};

interface PapersViewProps {
  currentSubject: 'maths' | 'further-maths' | 'more-papers';
  onSelectSubject: (subject: 'maths' | 'further-maths' | 'more-papers') => void;
  activeModuleId: string;
  onSelectModule: (moduleId: string) => void;
  onOpenSplitView: (title: string, qpUrl: string, msUrl: string) => void;
  onOpenSingleDoc: (title: string, url: string) => void;
  onOpenPractice: (
    paper: PaperEntry,
    module: ModuleSection,
    initialReviewMode?: boolean,
    initialQIndex?: number,
    initialAttempt?: ExamAttempt
  ) => void;
  completedMap: Record<string, boolean>;
  onToggleCompleted: (paperId: string) => void;
}

export const PapersView: React.FC<PapersViewProps> = ({
  currentSubject,
  onSelectSubject,
  activeModuleId,
  onSelectModule,
  onOpenSplitView,
  onOpenSingleDoc,
  onOpenPractice,
  completedMap,
  onToggleCompleted,
}) => {
  const [attemptsMap, setAttemptsMap] = useState<Record<string, ExamAttempt>>(() => getAllLatestAttemptsMap());
  const [selectedAttempt, setSelectedAttempt] = useState<ExamAttempt | null>(null);

  // Track subject tab order synchronously so AnimatePresence mode="wait" sees the true direction on both exit and delayed enter
  const prevSubjectRef = useRef(currentSubject);
  const subjectDirectionRef = useRef(1);
  if (prevSubjectRef.current !== currentSubject) {
    subjectDirectionRef.current = (SUBJECT_ORDER[currentSubject] ?? 0) >= (SUBJECT_ORDER[prevSubjectRef.current] ?? 0) ? 1 : -1;
    prevSubjectRef.current = currentSubject;
  }
  const subjectDirection = subjectDirectionRef.current;

  useEffect(() => {
    const handleUpdate = () => {
      setAttemptsMap(getAllLatestAttemptsMap());
    };
    window.addEventListener('matheseus_attempts_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('matheseus_attempts_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const availableModules = MODULES_DATA.filter((m) => m.subject === currentSubject);
  const activeModule = availableModules.find((m) => m.id === activeModuleId) || availableModules[0];

  // Group modules into logical categories for clean navigation
  const moduleCategories: { title: string; modules: ModuleSection[] }[] = 
    currentSubject === 'further-maths'
      ? [
          {
            title: 'Core Pure',
            modules: availableModules.filter((m) => ['cp1', 'cp2'].includes(m.id)),
          },
          {
            title: 'Further Pure',
            modules: availableModules.filter((m) => ['fp1', 'fp2'].includes(m.id)),
          },
          {
            title: 'Mechanics',
            modules: availableModules.filter((m) => ['fm1', 'fm2'].includes(m.id)),
          },
          {
            title: 'Statistics',
            modules: availableModules.filter((m) => ['fs1', 'fs2'].includes(m.id)),
          },
          {
            title: 'Decision',
            modules: availableModules.filter((m) => ['d1', 'd2'].includes(m.id)),
          },
        ].filter((cat) => cat.modules.length > 0)
      : currentSubject === 'more-papers'
      ? [
          {
            title: 'crashMATHS A-Level Maths',
            modules: availableModules.filter((m) => ['more-crash-p1', 'more-crash-p2', 'more-crash-p3'].includes(m.id)),
          },
          {
            title: 'MadAsMaths IYGB A-Level Maths',
            modules: availableModules.filter((m) => ['more-iygb-mp1', 'more-iygb-mp2', 'more-iygb-mms', 'more-iygb-syn'].includes(m.id)),
          },
          {
            title: 'crashMATHS Further Maths',
            modules: availableModules.filter((m) => ['more-crash-cp1', 'more-crash-cp2'].includes(m.id)),
          },
          {
            title: 'Pearson ActiveLearn Further Maths',
            modules: availableModules.filter((m) => ['more-al-cp1', 'more-al-cp2', 'more-al-fm1', 'more-al-fs1'].includes(m.id)),
          },
        ].filter((cat) => cat.modules.length > 0)
      : [
          {
            title: 'Pure Mathematics',
            modules: availableModules.filter((m) => ['p1', 'p2'].includes(m.id)),
          },
          {
            title: 'Applied Mathematics',
            modules: availableModules.filter((m) => ['p3'].includes(m.id)),
          },
        ];

  const filteredPapers = activeModule.papers;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 space-y-6">
      {/* Subject Selector Tabs */}
      <div className="flex items-center gap-3 border-b border-[#6382BF]/20 pb-3 overflow-x-auto scrollbar-none">
        <div className="p-1 rounded-2xl bg-[#0A1020] border border-[#6382BF]/30 inline-flex items-center gap-1 shadow-inner">
          <button
            onClick={() => {
              onSelectSubject('maths');
              onSelectModule('p1');
            }}
            className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors duration-300 active:scale-[0.98] ${
              currentSubject === 'maths'
                ? 'text-white'
                : 'text-[#7B8FAD] hover:text-[#E8ECF4] hover:bg-white/[0.04]'
            }`}
          >
            {currentSubject === 'maths' && (
              <motion.div
                layoutId="papers-subject-pill"
                className="absolute inset-0 bg-[#4A7BF7] rounded-xl shadow-md shadow-[#4A7BF7]/25"
                transition={{ type: 'spring', stiffness: 500, damping: 35 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              <GraduationCap size={16} />
              <span>A Level Maths (9MA0)</span>
            </span>
          </button>

          <button
            onClick={() => {
              onSelectSubject('further-maths');
              onSelectModule('cp1');
            }}
            className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors duration-300 active:scale-[0.98] ${
              currentSubject === 'further-maths'
                ? 'text-white'
                : 'text-[#7B8FAD] hover:text-[#E8ECF4] hover:bg-white/[0.04]'
            }`}
          >
            {currentSubject === 'further-maths' && (
              <motion.div
                layoutId="papers-subject-pill"
                className="absolute inset-0 bg-[#4A7BF7] rounded-xl shadow-md shadow-[#4A7BF7]/25"
                transition={{ type: 'spring', stiffness: 500, damping: 35 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              <Layers size={16} />
              <span>Further Maths (9FM0)</span>
            </span>
          </button>

          <button
            onClick={() => {
              onSelectSubject('more-papers');
              onSelectModule('more-crash-p1');
            }}
            className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors duration-300 active:scale-[0.98] ${
              currentSubject === 'more-papers'
                ? 'text-white'
                : 'text-[#7B8FAD] hover:text-[#E8ECF4] hover:bg-white/[0.04]'
            }`}
          >
            {currentSubject === 'more-papers' && (
              <motion.div
                layoutId="papers-subject-pill"
                className="absolute inset-0 bg-[#4A7BF7] rounded-xl shadow-md shadow-[#4A7BF7]/25"
                transition={{ type: 'spring', stiffness: 500, damping: 35 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              <FolderArchive size={16} />
              <span>More Papers</span>
            </span>
          </button>
        </div>
      </div>

      {/* Subsections: Categorized Module Navigation with Fluid Cross-fade */}
      <AnimatePresence mode="wait" custom={subjectDirection} initial={false}>
        <motion.div
          key={currentSubject}
          custom={subjectDirection}
          variants={subjectVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="w-full space-y-6"
        >
          {currentSubject === 'more-papers' ? (
            /* Redesigned More Papers Layout: 2 Comprehensive Full-Width Strands */
            <div className="w-full space-y-3">
              {/* Strand 1: A Level Mathematics Practice Papers */}
              {(() => {
                const aLevelMods = ['more-crash-p1', 'more-crash-p2', 'more-crash-p3', 'more-iygb-mp1', 'more-iygb-mp2', 'more-iygb-mms', 'more-iygb-syn'];
                const isALevelActive = aLevelMods.includes(activeModule.id);
                const crashMathsP1 = availableModules.find((m) => m.id === 'more-crash-p1');
                const crashMathsP2 = availableModules.find((m) => m.id === 'more-crash-p2');
                const crashMathsP3 = availableModules.find((m) => m.id === 'more-crash-p3');
                const iygbMP1 = availableModules.find((m) => m.id === 'more-iygb-mp1');
                const iygbMP2 = availableModules.find((m) => m.id === 'more-iygb-mp2');
                const iygbMMS = availableModules.find((m) => m.id === 'more-iygb-mms');
                const iygbSYN = availableModules.find((m) => m.id === 'more-iygb-syn');

                return (
                  <div
                    className={`w-full p-3.5 rounded-2xl bg-[#1A2540] border transition-all duration-200 shadow-sm flex flex-col gap-2.5 ${
                      isALevelActive
                        ? 'border-[#4A7BF7]/60 shadow-md shadow-[#4A7BF7]/10 ring-1 ring-[#4A7BF7]/25'
                        : 'border-[#6382BF]/25'
                    }`}
                  >
                    <div className="flex items-center justify-between px-1 pb-1 border-b border-[#6382BF]/15">
                      <div className="flex items-center gap-1.5">
                        <span className="p-1 rounded-md bg-[#0A1020] border border-[#6382BF]/25 text-[#4A7BF7]">
                          <GraduationCap size={13} className="text-[#4A7BF7]" />
                        </span>
                        <span className="text-xs font-bold text-[#E8ECF4] tracking-wide">
                          A Level Mathematics Practice Papers
                        </span>
                      </div>
                      <span className="text-[10px] text-[#7B8FAD] font-medium hidden sm:inline">
                        crashMATHS & MadAsMaths IYGB
                      </span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 pt-0.5">
                      {/* crashMATHS Section */}
                      <div className="lg:col-span-5 flex flex-col gap-1.5">
                        <span className="text-[10px] font-bold text-[#7B8FAD] uppercase tracking-wider px-0.5">
                          crashMATHS Series
                        </span>
                        <div className="grid grid-cols-3 gap-2">
                          {[crashMathsP1, crashMathsP2, crashMathsP3].filter(Boolean).map((m) => {
                            const isSelected = m!.id === activeModule.id;
                            return (
                              <button
                                key={m!.id}
                                onClick={() => onSelectModule(m!.id)}
                                className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-semibold border text-left transition-all duration-300 active:scale-[0.98] ${
                                  isSelected
                                    ? 'bg-[#4A7BF7] text-white border-[#4A7BF7] shadow-md shadow-[#4A7BF7]/25'
                                    : 'bg-[#0A1020]/70 text-[#7B8FAD] hover:text-[#E8ECF4] border-[#6382BF]/20 hover:border-[#6382BF]/50 hover:bg-[#0A1020]'
                                }`}
                                title={`${m!.title} (${m!.code})`}
                              >
                                <span className="truncate">{getModuleDisplayTitle(m!, currentSubject)}</span>
                                <span
                                  className={`text-[10px] px-1.5 py-0.5 rounded font-sans font-medium shrink-0 ml-1 transition-colors ${
                                    isSelected
                                      ? 'bg-white/20 text-white border border-white/25'
                                      : 'bg-[#1A2540] text-[#7B8FAD] border border-[#6382BF]/30'
                                  }`}
                                >
                                  {getModuleCodeBadge(m!, currentSubject)}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* MadAsMaths Section */}
                      <div className="lg:col-span-7 flex flex-col gap-1.5">
                        <span className="text-[10px] font-bold text-[#7B8FAD] uppercase tracking-wider px-0.5">
                          MadAsMaths IYGB Series
                        </span>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {[iygbMP1, iygbMP2, iygbMMS, iygbSYN].filter(Boolean).map((m) => {
                            const isSelected = m!.id === activeModule.id;
                            return (
                              <button
                                key={m!.id}
                                onClick={() => onSelectModule(m!.id)}
                                className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-semibold border text-left transition-all duration-300 active:scale-[0.98] ${
                                  isSelected
                                    ? 'bg-[#4A7BF7] text-white border-[#4A7BF7] shadow-md shadow-[#4A7BF7]/25'
                                    : 'bg-[#0A1020]/70 text-[#7B8FAD] hover:text-[#E8ECF4] border-[#6382BF]/20 hover:border-[#6382BF]/50 hover:bg-[#0A1020]'
                                }`}
                                title={`${m!.title} (${m!.code})`}
                              >
                                <span className="truncate">{getModuleDisplayTitle(m!, currentSubject)}</span>
                                <span
                                  className={`text-[10px] px-1.5 py-0.5 rounded font-sans font-medium shrink-0 ml-1 transition-colors ${
                                    isSelected
                                      ? 'bg-white/20 text-white border border-white/25'
                                      : 'bg-[#1A2540] text-[#7B8FAD] border border-[#6382BF]/30'
                                  }`}
                                >
                                  {getModuleCodeBadge(m!, currentSubject)}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Strand 2: Further Mathematics Practice Papers */}
              {(() => {
                const fmMods = ['more-crash-cp1', 'more-crash-cp2', 'more-al-cp1', 'more-al-cp2', 'more-al-fm1', 'more-al-fs1'];
                const isFurtherActive = fmMods.includes(activeModule.id);
                const crashCP1 = availableModules.find((m) => m.id === 'more-crash-cp1');
                const crashCP2 = availableModules.find((m) => m.id === 'more-crash-cp2');
                const alCP1 = availableModules.find((m) => m.id === 'more-al-cp1');
                const alCP2 = availableModules.find((m) => m.id === 'more-al-cp2');
                const alFM1 = availableModules.find((m) => m.id === 'more-al-fm1');
                const alFS1 = availableModules.find((m) => m.id === 'more-al-fs1');

                return (
                  <div
                    className={`w-full p-3.5 rounded-2xl bg-[#1A2540] border transition-all duration-200 shadow-sm flex flex-col gap-2.5 ${
                      isFurtherActive
                        ? 'border-[#4A7BF7]/60 shadow-md shadow-[#4A7BF7]/10 ring-1 ring-[#4A7BF7]/25'
                        : 'border-[#6382BF]/25'
                    }`}
                  >
                    <div className="flex items-center justify-between px-1 pb-1 border-b border-[#6382BF]/15">
                      <div className="flex items-center gap-1.5">
                        <span className="p-1 rounded-md bg-[#0A1020] border border-[#6382BF]/25 text-[#4A7BF7]">
                          <Layers size={13} className="text-[#4A7BF7]" />
                        </span>
                        <span className="text-xs font-bold text-[#E8ECF4] tracking-wide">
                          Further Mathematics Practice Papers
                        </span>
                      </div>
                      <span className="text-[10px] text-[#7B8FAD] font-medium hidden sm:inline">
                        crashMATHS & Pearson Series
                      </span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 pt-0.5">
                      {/* crashMATHS Section */}
                      <div className="lg:col-span-5 flex flex-col gap-1.5">
                        <span className="text-[10px] font-bold text-[#7B8FAD] uppercase tracking-wider px-0.5">
                          crashMATHS Series
                        </span>
                        <div className="grid grid-cols-2 gap-2">
                          {[crashCP1, crashCP2].filter(Boolean).map((m) => {
                            const isSelected = m!.id === activeModule.id;
                            return (
                              <button
                                key={m!.id}
                                onClick={() => onSelectModule(m!.id)}
                                className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-semibold border text-left transition-all duration-300 active:scale-[0.98] ${
                                  isSelected
                                    ? 'bg-[#4A7BF7] text-white border-[#4A7BF7] shadow-md shadow-[#4A7BF7]/25'
                                    : 'bg-[#0A1020]/70 text-[#7B8FAD] hover:text-[#E8ECF4] border-[#6382BF]/20 hover:border-[#6382BF]/50 hover:bg-[#0A1020]'
                                }`}
                                title={`${m!.title} (${m!.code})`}
                              >
                                <span className="truncate">{getModuleDisplayTitle(m!, currentSubject)}</span>
                                <span
                                  className={`text-[10px] px-1.5 py-0.5 rounded font-sans font-medium shrink-0 ml-1 transition-colors ${
                                    isSelected
                                      ? 'bg-white/20 text-white border border-white/25'
                                      : 'bg-[#1A2540] text-[#7B8FAD] border border-[#6382BF]/30'
                                  }`}
                                >
                                  {getModuleCodeBadge(m!, currentSubject)}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Pearson ActiveLearn & Shadow Section */}
                      <div className="lg:col-span-7 flex flex-col gap-1.5">
                        <span className="text-[10px] font-bold text-[#7B8FAD] uppercase tracking-wider px-0.5">
                          Pearson ActiveLearn & Shadow Series
                        </span>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {[alCP1, alCP2, alFM1, alFS1].filter(Boolean).map((m) => {
                            const isSelected = m!.id === activeModule.id;
                            return (
                              <button
                                key={m!.id}
                                onClick={() => onSelectModule(m!.id)}
                                className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-semibold border text-left transition-all duration-300 active:scale-[0.98] ${
                                  isSelected
                                    ? 'bg-[#4A7BF7] text-white border-[#4A7BF7] shadow-md shadow-[#4A7BF7]/25'
                                    : 'bg-[#0A1020]/70 text-[#7B8FAD] hover:text-[#E8ECF4] border-[#6382BF]/20 hover:border-[#6382BF]/50 hover:bg-[#0A1020]'
                                }`}
                                title={`${m!.title} (${m!.code})`}
                              >
                                <span className="truncate">{getModuleDisplayTitle(m!, currentSubject)}</span>
                                <span
                                  className={`text-[10px] px-1.5 py-0.5 rounded font-sans font-medium shrink-0 ml-1 transition-colors ${
                                    isSelected
                                      ? 'bg-white/20 text-white border border-white/25'
                                      : 'bg-[#1A2540] text-[#7B8FAD] border border-[#6382BF]/30'
                                  }`}
                                >
                                  {getModuleCodeBadge(m!, currentSubject)}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          ) : (
            /* A Level Maths & Further Maths Strands */
            <div
              className={
                currentSubject === 'further-maths'
                  ? 'w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3'
                  : 'w-full grid grid-cols-1 md:grid-cols-3 gap-3 items-start'
              }
            >
              {moduleCategories.map((category) => {
                const hasActiveModule = category.modules.some((m) => m.id === activeModule.id);
                const isMathsPureCard = currentSubject === 'maths' && category.modules.length === 2;
                const isMathsAppliedCard = currentSubject === 'maths' && category.modules.length === 1;

                return (
                  <div
                    key={category.title}
                    className={`p-3 rounded-2xl bg-[#1A2540] border transition-all duration-200 shadow-sm flex flex-col justify-start gap-2.5 ${
                      isMathsPureCard ? 'md:col-span-2' : isMathsAppliedCard ? 'md:col-span-1' : ''
                    } ${
                      hasActiveModule
                        ? 'border-[#4A7BF7]/60 shadow-md shadow-[#4A7BF7]/10 ring-1 ring-[#4A7BF7]/25'
                        : 'border-[#6382BF]/25'
                    }`}
                  >
                    {/* Strand Header */}
                    <div className="flex items-center justify-between px-1 pb-1 border-b border-[#6382BF]/15">
                      <div className="flex items-center gap-1.5">
                        <span className="p-1 rounded-md bg-[#0A1020] border border-[#6382BF]/25 text-[#4A7BF7]">
                          {getCategoryIcon(category.title)}
                        </span>
                        <span className="text-[11px] font-bold text-[#E8ECF4] tracking-wide">
                          {category.title}
                        </span>
                      </div>
                    </div>

                    {/* Modules Grid / List */}
                    <div
                      className={
                        currentSubject === 'further-maths'
                          ? 'space-y-1.5'
                          : category.modules.length === 2
                          ? 'grid grid-cols-2 gap-2'
                          : 'grid grid-cols-1 gap-2'
                      }
                    >
                      {category.modules.map((m) => {
                        const isSelected = m.id === activeModule.id;
                        return (
                          <button
                            key={m.id}
                            onClick={() => onSelectModule(m.id)}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold border text-left transition-all duration-300 active:scale-[0.98] ${
                              isSelected
                                ? 'bg-[#4A7BF7] text-white border-[#4A7BF7] shadow-md shadow-[#4A7BF7]/25'
                                : 'bg-[#0A1020]/70 text-[#7B8FAD] hover:text-[#E8ECF4] border-[#6382BF]/20 hover:border-[#6382BF]/50 hover:bg-[#0A1020]'
                            }`}
                            title={`${m.title} (${m.code})`}
                          >
                            <span className="truncate">{getModuleDisplayTitle(m, currentSubject)}</span>
                            <span
                              className={`text-[10px] px-1.5 py-0.5 rounded font-sans font-medium shrink-0 ml-1.5 transition-colors ${
                                isSelected
                                  ? 'bg-white/20 text-white border border-white/25'
                                  : 'bg-[#1A2540] text-[#7B8FAD] border border-[#6382BF]/30'
                              }`}
                            >
                              {getModuleCodeBadge(m, currentSubject)}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Module Overview Card & Table with Smooth Cross-fade */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeModule.id}
              variants={moduleContentVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="space-y-6"
            >
              <div className="p-4 rounded-2xl bg-[#1A2540] border border-[#6382BF]/25 flex items-center justify-between gap-3 shadow-md">
                <div className="flex items-center gap-3">
                  <span className="p-2 rounded-xl bg-[#0A1020] border border-[#6382BF]/30 text-[#4A7BF7] shadow-sm">
                    <BookOpen size={18} />
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-[#E8ECF4] font-sans flex items-center gap-2">
                      <span className="font-sans">{activeModule.title}</span>
                      <span className="text-xs px-2.5 py-0.5 rounded-md bg-[#0A1020] text-[#7B8FAD] border border-[#6382BF]/40 font-medium font-sans">
                        {activeModule.code}
                      </span>
                    </h3>
                    <p className="text-xs text-[#7B8FAD] mt-0.5">
                      {currentSubject === 'more-papers'
                        ? `${filteredPapers.length} practice papers available with mark schemes & solutions.`
                        : `${filteredPapers.length} past exam paper series with mark schemes.`}
                    </p>
                  </div>
                </div>
              </div>

          {/* Papers Table */}
          <div className="border border-[#6382BF]/25 rounded-2xl overflow-hidden bg-[#1A2540] shadow-md">
            <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-[#6382BF]/20 bg-[#0A1020]/90 text-[#7B8FAD] text-[11px] font-semibold uppercase tracking-wider">
              <th className="py-3 px-4">Series</th>
              {currentSubject !== 'more-papers' && (
                <th className="py-3 px-4 text-center">Practice</th>
              )}
              <th className="py-3 px-4 text-center">PDF Options</th>
              <th className="py-3 px-4 text-center">
                {currentSubject === 'more-papers' ? 'Status' : 'Report'}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#6382BF]/15">
            {filteredPapers.map((paper) => {
              const attempt = attemptsMap[paper.id];
              const isDone = !!completedMap[paper.id] || !!attempt;
              const isSample = paper.year === 'Sample';
              const seriesDisplay = isSample
                ? 'Sample Paper'
                : paper.season === 'Sample'
                  ? String(paper.year)
                  : `${paper.season} ${paper.year}`;
              const paperTitle = `${activeModule.title} (${seriesDisplay})`;

              return (
                <tr key={paper.id} className="hover:bg-[#4A7BF7]/5 transition-colors group">
                  {/* Series */}
                  <td className="py-3 px-4 font-medium text-[#E8ECF4]">
                    <div className="font-semibold text-[#E8ECF4]">
                      {seriesDisplay}
                    </div>
                    <div className="text-[11px] text-[#7B8FAD]">
                      {activeModule.code} {paper.paperNumber ? `· ${paper.paperNumber}` : ''}
                    </div>
                  </td>

                  {/* Practice Exam Mode (hidden for more-papers) */}
                  {currentSubject !== 'more-papers' && (
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => onOpenPractice(paper, activeModule)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#4A7BF7]/15 hover:bg-[#4A7BF7]/30 text-[#E8ECF4] font-semibold border border-[#4A7BF7]/40 transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-sm"
                        title="Practice this paper under exam conditions with timer and self-marking"
                      >
                        <Play size={13} className="text-[#4A7BF7]" />
                        <span>Practice</span>
                      </button>
                    </td>
                  )}

                  {/* Split View + Quick Direct Download */}
                  <td className="py-3 px-4 text-center">
                    <div className="inline-flex items-center gap-2">
                      <button
                        onClick={() => onOpenSplitView(paperTitle, paper.qpUrl, paper.msUrl)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0A1020] hover:bg-[#4A7BF7]/20 text-[#E8ECF4] font-medium border border-[#6382BF]/30 transition-all duration-300 active:scale-95 shadow-sm"
                        title="Open Question Paper and Mark Scheme side-by-side"
                      >
                        <Columns size={13} className="text-[#4A7BF7]" />
                        <span>Split View</span>
                      </button>

                      {/* Direct QP / MS Download icons */}
                      <div className="flex items-center border border-[#6382BF]/30 rounded-lg overflow-hidden bg-[#0A1020] shadow-sm">
                        <a
                          href={assetUrl(paper.qpUrl)}
                          download
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2 py-1 text-[11px] text-[#7B8FAD] hover:text-[#E8ECF4] hover:bg-[#1A2540] transition-colors border-r border-[#6382BF]/20 flex items-center gap-1 active:scale-95"
                          title="Download Question Paper PDF"
                        >
                          <Download size={11} className="text-[#4A7BF7]" />
                          <span>QP</span>
                        </a>
                        <a
                          href={assetUrl(paper.msUrl)}
                          download
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2 py-1 text-[11px] text-[#7B8FAD] hover:text-[#E8ECF4] hover:bg-[#1A2540] transition-colors flex items-center gap-1 active:scale-95"
                          title="Download Mark Scheme PDF"
                        >
                          <Download size={11} className="text-[#4A7BF7]" />
                          <span>MS</span>
                        </a>
                      </div>
                    </div>
                  </td>

                  {/* Report / Completion Status */}
                  <td className="py-3 px-4 text-center">
                    {currentSubject === 'more-papers' ? (
                      <button
                        onClick={() => onToggleCompleted(paper.id)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-300 active:scale-95 shadow-sm ${
                          isDone
                            ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                            : 'bg-[#0A1020] text-[#7B8FAD] hover:text-[#E8ECF4] border-[#6382BF]/30 hover:border-[#6382BF]/50'
                        }`}
                        title={isDone ? 'Mark as incomplete' : 'Mark as completed'}
                      >
                        {isDone ? (
                          <>
                            <CheckCircle2 size={13} className="text-emerald-400" />
                            <span>Completed</span>
                          </>
                        ) : (
                          <>
                            <Check size={13} className="text-[#7B8FAD]" />
                            <span>Mark Done</span>
                          </>
                        )}
                      </button>
                    ) : attempt ? (
                      <div className="inline-flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => setSelectedAttempt(attempt)}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-[#E8ECF4] border border-emerald-500/35 text-xs font-semibold transition-all duration-300 active:scale-95 shadow-sm group"
                          title="Click to view detailed interactive Score Report & Question Analysis"
                        >
                          <CheckCircle2 size={13} className="text-emerald-400" />
                          <span className="tabular-nums font-bold">{attempt.achievedScore}/{attempt.maxScore}</span>
                          <span className="text-emerald-400 font-bold">({attempt.predictedGrade || `${attempt.percentage}%`})</span>
                          <Eye size={12} className="opacity-70 group-hover:opacity-100 ml-0.5 text-emerald-400 transition-opacity" />
                        </button>
                        {paper.erUrl && (
                          <button
                            onClick={() => onOpenSingleDoc(`${paperTitle} — Examiner Report`, paper.erUrl!)}
                            className="p-1.5 rounded-lg bg-[#0A1020] hover:bg-[#1A2540] text-[#7B8FAD] hover:text-[#E8ECF4] border border-[#6382BF]/30 transition-all duration-300 active:scale-95"
                            title="Official Examiner Report PDF"
                          >
                            <FileText size={12} />
                          </button>
                        )}
                      </div>
                    ) : isDone ? (
                      <div className="inline-flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => onToggleCompleted(paper.id)}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/40 text-xs font-semibold transition-all duration-300 active:scale-95 shadow-sm"
                          title="Marked as done. Practice paper to record detailed score report."
                        >
                          <CheckCircle2 size={13} className="text-emerald-400" />
                          <span>Done</span>
                        </button>
                        {paper.erUrl && (
                          <button
                            onClick={() => onOpenSingleDoc(`${paperTitle} — Examiner Report`, paper.erUrl!)}
                            className="p-1.5 rounded-lg bg-[#0A1020] hover:bg-[#1A2540] text-[#7B8FAD] hover:text-[#E8ECF4] border border-[#6382BF]/30 transition-all duration-300 active:scale-95"
                            title="Official Examiner Report PDF"
                          >
                            <FileText size={12} />
                          </button>
                        )}
                      </div>
                    ) : (
                      <div className="inline-flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => onToggleCompleted(paper.id)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs text-[#7B8FAD] hover:text-[#E8ECF4] bg-[#0A1020] hover:bg-[#1A2540] border border-[#6382BF]/30 hover:border-[#6382BF]/60 transition-all duration-300 active:scale-95 font-medium"
                          title="Mark paper as done"
                        >
                          <Check size={13} className="opacity-40" />
                          <span>Mark Done</span>
                        </button>
                        {paper.erUrl && (
                          <button
                            onClick={() => onOpenSingleDoc(`${paperTitle} — Examiner Report`, paper.erUrl!)}
                            className="p-1.5 rounded-lg bg-[#0A1020] hover:bg-[#1A2540] text-[#7B8FAD] hover:text-[#E8ECF4] border border-[#6382BF]/30 transition-all duration-300 active:scale-95"
                            title="Official Examiner Report PDF"
                          >
                            <FileText size={12} />
                          </button>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  </AnimatePresence>

      {/* Full Interactive Score Report Modal / Screen */}
      <AnimatePresence>
        {selectedAttempt && (
          <motion.div
            key="score-report-modal"
            initial={{ opacity: 0, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.985 }}
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 bg-[#0F1729]"
          >
            <ScoreReportModal
              attempt={selectedAttempt}
              onClose={() => setSelectedAttempt(null)}
              onRetake={() => {
                const paperToRetake = filteredPapers.find((p) => p.id === selectedAttempt.paperId);
                setSelectedAttempt(null);
                if (paperToRetake) {
                  onOpenPractice(paperToRetake, activeModule);
                }
              }}
              onReview={(qIdx) => {
                const paperToReview = filteredPapers.find((p) => p.id === selectedAttempt.paperId);
                setSelectedAttempt(null);
                if (paperToReview) {
                  onOpenPractice(paperToReview, activeModule, true, qIdx || 0, selectedAttempt);
                }
              }}
              onDelete={() => {
                deleteExamAttempt(selectedAttempt.id);
                setSelectedAttempt(null);
              }}
              erUrl={filteredPapers.find((p) => p.id === selectedAttempt.paperId)?.erUrl}
              onOpenSingleDoc={onOpenSingleDoc}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
