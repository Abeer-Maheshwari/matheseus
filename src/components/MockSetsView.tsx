import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PaperEntry, ModuleSection } from '../data/papersData';
import { MOCK_MODULES_DATA, MOCK_SETS_BY_SERIES, MockSetGroup } from '../data/mockSetsData';
import { ExamAttempt } from '../types';
import { getAllLatestAttemptsMap, deleteExamAttempt } from '../utils/attempts';
import { ScoreReportModal } from './ScoreReportModal';
import { subTabVariants, contentFadeVariants, overlayFadeVariants, PILL_SPRING } from '../utils/motion';
import {
  FileText,
  Columns,
  Check,
  GraduationCap,
  Layers,
  BookOpen,
  Info,
  CheckCircle2,
  Lock,
  Pi,
  Compass,
  BarChart2,
  GitBranch,
  Play,
  Award,
  Eye,
} from 'lucide-react';

const SUBJECT_ORDER: Record<string, number> = {
  'maths': 0,
  'further-maths': 1,
};

const subjectVariants = subTabVariants;
const contentVariants = contentFadeVariants;

const getCategoryIcon = (title: string) => {
  const lower = title.toLowerCase();
  if (lower.includes('core pure')) return <Pi size={13} className="text-[#4A7BF7]" />;
  if (lower.includes('further pure')) return <Layers size={13} className="text-[#4A7BF7]" />;
  if (lower.includes('mechanics')) return <Compass size={13} className="text-[#4A7BF7]" />;
  if (lower.includes('statistics')) return <BarChart2 size={13} className="text-[#4A7BF7]" />;
  if (lower.includes('decision')) return <GitBranch size={13} className="text-[#4A7BF7]" />;
  if (lower.includes('pure')) return <GraduationCap size={13} className="text-[#4A7BF7]" />;
  if (lower.includes('applied')) return <BarChart2 size={13} className="text-[#4A7BF7]" />;
  return <BookOpen size={13} className="text-[#4A7BF7]" />;
};

const getModuleDisplayTitle = (m: ModuleSection, currentSubject: string) => {
  if (currentSubject === 'further-maths') {
    if (m.title.startsWith('Further Mechanics ')) return m.title.replace('Further ', '');
    if (m.title.startsWith('Further Statistics ')) return m.title.replace('Further ', '');
    if (m.title.startsWith('Further Pure ')) return m.title.replace('Further Pure ', 'Pure ');
  }
  return m.title;
};

interface MockSetsViewProps {
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

export const MockSetsView: React.FC<MockSetsViewProps> = ({
  onOpenSplitView,
  onOpenSingleDoc,
  onOpenPractice,
  completedMap,
  onToggleCompleted,
}) => {
  const [currentSubject, setCurrentSubject] = useState<'maths' | 'further-maths'>('maths');
  const [viewMode, setViewMode] = useState<'by-module' | 'by-set'>('by-module');
  const [activeModuleId, setActiveModuleId] = useState<string>('mock-p1');
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
    window.addEventListener('storage', handleUpdate);
    window.addEventListener('matheseus_attempts_updated', handleUpdate);
    return () => {
      window.removeEventListener('storage', handleUpdate);
      window.removeEventListener('matheseus_attempts_updated', handleUpdate);
    };
  }, []);

  // Filter modules by subject
  const availableModules = MOCK_MODULES_DATA.filter((m) => m.subject === currentSubject);
  const activeModule =
    availableModules.find((m) => m.id === activeModuleId) || availableModules[0] || MOCK_MODULES_DATA[0];

  // Group modules into categorized subsections identical to PapersView
  const moduleCategories: { title: string; modules: ModuleSection[] }[] =
    currentSubject === 'further-maths'
      ? [
          {
            title: 'Core Pure',
            modules: availableModules.filter((m) => ['mock-cp1', 'mock-cp2'].includes(m.id)),
          },
          {
            title: 'Further Pure',
            modules: availableModules.filter((m) => ['mock-fp1', 'mock-fp2'].includes(m.id)),
          },
          {
            title: 'Mechanics',
            modules: availableModules.filter((m) => ['mock-fm1', 'mock-fm2'].includes(m.id)),
          },
          {
            title: 'Statistics',
            modules: availableModules.filter((m) => ['mock-fs1', 'mock-fs2'].includes(m.id)),
          },
          {
            title: 'Decision',
            modules: availableModules.filter((m) => ['mock-d1', 'mock-d2'].includes(m.id)),
          },
        ].filter((cat) => cat.modules.length > 0)
      : [
          {
            title: 'Pure Mathematics',
            modules: availableModules.filter((m) => ['mock-p1', 'mock-p2'].includes(m.id)),
          },
          {
            title: 'Applied Mathematics',
            modules: availableModules.filter((m) => ['mock-stats', 'mock-mech'].includes(m.id)),
          },
        ];

  // Filter papers in active module
  const filteredModulePapers = activeModule.papers;

  // Filter mock sets by subject
  const filteredMockSets = MOCK_SETS_BY_SERIES.filter(
    (group) => !group.subject || group.subject === currentSubject
  );

  const completedCount = activeModule.papers.filter((p) => completedMap[p.id] || !!attemptsMap[p.id]).length;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 space-y-6">
      {/* Subject Selector Tabs & View Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#6382BF]/20 pb-3">
        <div className="p-1 rounded-2xl bg-[#0A1020] border border-[#6382BF]/30 inline-flex items-center gap-1 shadow-inner">
          <button
            onClick={() => {
              setCurrentSubject('maths');
              setActiveModuleId('mock-p1');
            }}
            className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors duration-300 active:scale-[0.98] ${
              currentSubject === 'maths'
                ? 'text-white'
                : 'text-[#7B8FAD] hover:text-[#E8ECF4] hover:bg-white/[0.04]'
            }`}
          >
            {currentSubject === 'maths' && (
              <motion.div
                layoutId="mock-subject-pill"
                className="absolute inset-0 bg-[#4A7BF7] rounded-xl shadow-md shadow-[#4A7BF7]/25"
                transition={PILL_SPRING}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              <GraduationCap size={16} />
              <span>A Level Maths (9MA0)</span>
            </span>
          </button>

          <button
            onClick={() => {
              setCurrentSubject('further-maths');
              setActiveModuleId('mock-cp1');
            }}
            className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors duration-300 active:scale-[0.98] ${
              currentSubject === 'further-maths'
                ? 'text-white'
                : 'text-[#7B8FAD] hover:text-[#E8ECF4] hover:bg-white/[0.04]'
            }`}
          >
            {currentSubject === 'further-maths' && (
              <motion.div
                layoutId="mock-subject-pill"
                className="absolute inset-0 bg-[#4A7BF7] rounded-xl shadow-md shadow-[#4A7BF7]/25"
                transition={PILL_SPRING}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              <Layers size={16} />
              <span>Further Maths (9FM0)</span>
            </span>
          </button>
        </div>

        {/* View by Mode Toggle */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-[11px] font-semibold text-[#7B8FAD] uppercase tracking-wider mr-1">
            View by:
          </span>
          <div className="p-1 rounded-xl bg-[#0A1020] border border-[#6382BF]/30 flex items-center gap-1 shadow-sm">
            <button
              onClick={() => setViewMode('by-module')}
              className={`relative px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 ${
                viewMode === 'by-module'
                  ? 'text-white'
                  : 'text-[#7B8FAD] hover:text-[#E8ECF4]'
              }`}
            >
              {viewMode === 'by-module' && (
                <motion.div
                  layoutId="mock-viewmode-pill"
                  className="absolute inset-0 bg-[#4A7BF7] rounded-lg shadow-sm"
                  transition={PILL_SPRING}
                />
              )}
              <span className="relative z-10">Module</span>
            </button>
            <button
              onClick={() => setViewMode('by-set')}
              className={`relative px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 ${
                viewMode === 'by-set'
                  ? 'text-white'
                  : 'text-[#7B8FAD] hover:text-[#E8ECF4]'
              }`}
            >
              {viewMode === 'by-set' && (
                <motion.div
                  layoutId="mock-viewmode-pill"
                  className="absolute inset-0 bg-[#4A7BF7] rounded-lg shadow-sm"
                  transition={PILL_SPRING}
                />
              )}
              <span className="relative z-10">Mock Set</span>
            </button>
          </div>
        </div>
      </div>

      {/* Subject Container with Smooth Directional Fluid Transitions */}
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
          {/* Categorized Module Navigation */}
          {viewMode === 'by-module' && (
            <div
              className={
                currentSubject === 'further-maths'
                  ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3'
                  : 'grid grid-cols-1 md:grid-cols-2 gap-3 items-start'
              }
            >
            {moduleCategories.map((category) => {
              const hasActiveModule = category.modules.some((m) => m.id === activeModule.id);
              return (
                <div
                  key={category.title}
                  className={`p-3 rounded-2xl bg-[#1A2540] border transition-all duration-200 shadow-sm flex flex-col justify-start gap-2.5 ${
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
                      currentSubject === 'maths'
                        ? 'grid grid-cols-1 sm:grid-cols-2 gap-2'
                        : 'space-y-1.5'
                    }
                  >
                    {category.modules.map((m) => {
                      const isSelected = m.id === activeModule.id;
                      return (
                        <button
                          key={m.id}
                          onClick={() => setActiveModuleId(m.id)}
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
                            {currentSubject === 'further-maths'
                              ? m.code.split('/')[1] || m.code
                              : m.code}
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

          {/* Active Module / Set Content with Smooth Transition */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`${viewMode}_${activeModule.id}`}
              variants={contentVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="space-y-6"
            >
              {/* Active Module Summary Bar */}
              <div className="p-4 rounded-2xl bg-[#1A2540] border border-[#6382BF]/25 flex items-center justify-between gap-3 shadow-md">
                <div className="flex items-center gap-3">
                  <span className="p-2 rounded-xl bg-[#0A1020] border border-[#6382BF]/30 text-[#4A7BF7] shadow-sm">
                    <BookOpen size={18} />
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-base font-bold text-[#E8ECF4] font-sans">
                        {viewMode === 'by-module' ? activeModule.title : `${currentSubject === 'maths' ? 'A Level Maths' : 'Further Maths'} Mock Sets`}
                      </h2>
                      {viewMode === 'by-module' && (
                        <span className="px-2 py-0.5 rounded-md bg-[#0A1020] border border-[#6382BF]/30 text-[11px] text-[#7B8FAD] font-sans font-medium">
                          {activeModule.code}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#7B8FAD]">
                      {viewMode === 'by-module'
                        ? `${activeModule.papers.length} Papers available · ${completedCount} Completed`
                        : `${filteredMockSets.length} Sets available across modules`}
                    </p>
                  </div>
                </div>
              </div>

      {/* Main Content: Table View (by-module) vs Cards View (by-set) */}
      {viewMode === 'by-module' ? (
        <div className="overflow-x-auto rounded-2xl border border-[#6382BF]/25 shadow-md bg-[#1A2540]">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#6382BF]/20 bg-[#0A1020]/60 text-[#7B8FAD] uppercase font-semibold text-[11px] tracking-wider">
                <th className="py-3 px-4">YEAR / SET</th>
                <th className="py-3 px-4 text-center">PRACTICE</th>
                <th className="py-3 px-4 text-center">PDF OPTIONS</th>
                <th className="py-3 px-4 text-center">REPORT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#6382BF]/15">
              {filteredModulePapers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-[#7B8FAD]">
                    No mock papers available for this module yet.
                  </td>
                </tr>
              ) : (
                filteredModulePapers.map((paper) => {
                  const attempt = attemptsMap[paper.id];
                  const isDone = !!completedMap[paper.id] || !!attempt;
                  const paperTitle = `${paper.year} · ${activeModule.title} (${activeModule.code})`;
                  const hasQp = !!paper.qpUrl;
                  const isLocked = !!paper.isLocked;

                  return (
                    <tr
                      key={paper.id}
                      className="hover:bg-[#4A7BF7]/5 transition-colors group"
                    >
                      {/* Year & Series Name */}
                      <td className="py-3.5 px-4 font-medium text-[#E8ECF4]">
                        <div className="font-semibold text-[#E8ECF4] text-xs flex items-center gap-1.5">
                          <span>{paper.year}</span>
                          {isLocked && (
                            <span
                              className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30 text-[10px] font-semibold"
                              title="Password protected by Pearson Edexcel Online"
                            >
                              <Lock size={10} />
                              Locked
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-[#7B8FAD]">
                          {activeModule.code} · Pearson Edexcel
                        </div>
                      </td>

                      {/* Practice Exam Mode */}
                      <td className="py-3.5 px-4 text-center">
                        {isLocked ? (
                          <span className="text-[11px] text-[#7B8FAD] italic">Unavailable</span>
                        ) : (
                          <button
                            onClick={() => onOpenPractice(paper, activeModule)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#4A7BF7]/15 hover:bg-[#4A7BF7]/30 text-[#E8ECF4] font-semibold border border-[#4A7BF7]/40 transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-sm"
                            title="Practice this mock paper under exam conditions with timer and self-marking"
                          >
                            <Play size={13} className="text-[#4A7BF7]" />
                            <span>Practice</span>
                          </button>
                        )}
                      </td>

                      {/* Options: Split View + QP / MS Buttons */}
                      <td className="py-3.5 px-4 text-center">
                        {isLocked ? (
                          <div className="inline-flex items-center gap-2">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-300 font-medium">
                              <Lock size={12} className="text-amber-400" />
                              <span>Requires Password</span>
                            </span>
                          </div>
                        ) : (
                          <div className="inline-flex items-center gap-2">
                            {hasQp && paper.msUrl ? (
                              <button
                                onClick={() => onOpenSplitView(paperTitle, paper.qpUrl, paper.msUrl)}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0A1020] hover:bg-[#4A7BF7]/20 text-[#E8ECF4] font-medium border border-[#6382BF]/30 transition-all duration-300 active:scale-95 shadow-sm"
                                title="Open Question Paper and Mark Scheme side-by-side in Split View"
                              >
                                <Columns size={13} className="text-[#4A7BF7]" />
                                <span>Split View</span>
                              </button>
                            ) : null}

                            {/* Direct QP & MS Buttons */}
                            <div className="flex items-center border border-[#6382BF]/30 rounded-lg overflow-hidden bg-[#0A1020] shadow-sm">
                              {hasQp ? (
                                <button
                                  onClick={() => onOpenSingleDoc(`${paperTitle} — Question Paper`, paper.qpUrl)}
                                  className="px-2.5 py-1 text-[11px] text-[#7B8FAD] hover:text-[#E8ECF4] hover:bg-[#1A2540] transition-colors border-r border-[#6382BF]/20 flex items-center gap-1 active:scale-95"
                                  title="View Question Paper PDF"
                                >
                                  <FileText size={11} className="text-[#4A7BF7]" />
                                  <span>QP</span>
                                </button>
                              ) : null}

                              {paper.msUrl ? (
                                <button
                                  onClick={() => onOpenSingleDoc(`${paperTitle} — Mark Scheme`, paper.msUrl)}
                                  className="px-2.5 py-1 text-[11px] text-[#7B8FAD] hover:text-[#E8ECF4] hover:bg-[#1A2540] transition-colors flex items-center gap-1 active:scale-95"
                                  title="View Mark Scheme PDF"
                                >
                                  <FileText size={11} className="text-[#7B8FAD]" />
                                  <span>MS</span>
                                </button>
                              ) : null}
                            </div>
                          </div>
                        )}
                      </td>

                      {/* Completion / Score Report Status */}
                      <td className="py-3.5 px-4 text-center">
                        {attempt ? (
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
                        ) : (
                          <button
                            onClick={() => onToggleCompleted(paper.id)}
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all duration-300 active:scale-95 ${
                              isDone
                                ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300 shadow-sm'
                                : 'bg-[#0A1020] border-[#6382BF]/30 text-[#7B8FAD] hover:text-[#E8ECF4] hover:border-[#6382BF]/60'
                            }`}
                            title={isDone ? 'Mark as incomplete' : 'Mark as completed'}
                          >
                            {isDone ? (
                              <>
                                <CheckCircle2 size={13} className="text-emerald-400" />
                                <span>Done</span>
                              </>
                            ) : (
                              <>
                                <Check size={13} className="opacity-40" />
                                <span>Mark Done</span>
                              </>
                            )}
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      ) : (
        /* Cards: View by Mock Set Series */
        <div className="space-y-6">
          {filteredMockSets.map((group) => (
            <div
              key={group.id}
              className={`p-5 rounded-2xl bg-[#1A2540] border shadow-md space-y-4 ${
                group.isLocked ? 'border-amber-500/30' : 'border-[#6382BF]/25'
              }`}
            >
              <div className="flex items-center justify-between border-b border-[#6382BF]/20 pb-3">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`p-2 rounded-xl bg-[#0A1020] border shadow-sm ${
                      group.isLocked ? 'border-amber-500/30 text-amber-400' : 'border-[#6382BF]/30 text-[#4A7BF7]'
                    }`}
                  >
                    {group.isLocked ? <Lock size={16} /> : <Layers size={16} />}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-[#E8ECF4]">
                        {group.name}
                      </h3>
                      {group.year && (
                        <span className="text-[11px] px-2 py-0.5 rounded bg-[#0A1020] border border-[#6382BF]/30 text-[#7B8FAD] font-medium font-sans">
                          {group.year}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#7B8FAD]">{group.label}</p>
                  </div>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-lg bg-[#0A1020] border border-[#6382BF]/30 text-[#7B8FAD] font-semibold">
                  {group.papers.length} Papers
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {group.papers.map(({ paper, moduleTitle, moduleCode, moduleId }) => {
                  const attempt = attemptsMap[paper.id];
                  const isDone = !!completedMap[paper.id] || !!attempt;
                  const paperTitle = `${group.name} · ${moduleTitle} (${moduleCode})`;
                  const hasQp = !!paper.qpUrl;
                  const isLocked = !!paper.isLocked;

                  return (
                    <div
                      key={paper.id}
                      className="p-3.5 rounded-xl bg-[#0A1020]/70 border border-[#6382BF]/20 hover:border-[#6382BF]/40 transition-colors flex items-center justify-between gap-3 shadow-sm"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-xs text-[#E8ECF4] truncate">
                            {moduleTitle}
                          </span>
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#1A2540] border border-[#6382BF]/30 text-[#4A7BF7] font-semibold">
                            {moduleCode}
                          </span>
                        </div>
                        <div className="text-[11px] text-[#7B8FAD] truncate mt-0.5">
                          {paper.paperNumber}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {isLocked ? (
                          <span className="text-[10px] px-2 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 font-medium">
                            Locked
                          </span>
                        ) : (
                          <>
                            {/* Practice Mode Button */}
                            <button
                              onClick={() => {
                                const mod =
                                  MOCK_MODULES_DATA.find((m) => m.id === moduleId) || activeModule;
                                onOpenPractice(paper, mod);
                              }}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#4A7BF7]/15 hover:bg-[#4A7BF7]/30 text-[#E8ECF4] text-xs font-semibold border border-[#4A7BF7]/40 transition-all duration-300 active:scale-95 shadow-sm"
                              title="Practice this paper under exam conditions with timer and self-marking"
                            >
                              <Play size={11} className="text-[#4A7BF7]" />
                              <span>Practice</span>
                            </button>

                            {hasQp && paper.msUrl && (
                              <button
                                onClick={() => onOpenSplitView(paperTitle, paper.qpUrl, paper.msUrl)}
                                className="p-1.5 rounded-lg bg-[#1A2540] hover:bg-[#4A7BF7]/20 text-[#E8ECF4] border border-[#6382BF]/30 transition-all duration-300 active:scale-95"
                                title="Open Split View"
                              >
                                <Columns size={13} className="text-[#4A7BF7]" />
                              </button>
                            )}

                            <div className="flex items-center border border-[#6382BF]/30 rounded-lg overflow-hidden bg-[#1A2540]">
                              {hasQp && (
                                <button
                                  onClick={() => onOpenSingleDoc(`${paperTitle} — QP`, paper.qpUrl)}
                                  className="px-2 py-1 text-[11px] text-[#7B8FAD] hover:text-[#E8ECF4] hover:bg-[#0A1020] transition-colors border-r border-[#6382BF]/20 flex items-center gap-1"
                                  title="View Question Paper"
                                >
                                  <FileText size={10} className="text-[#4A7BF7]" />
                                  <span>QP</span>
                                </button>
                              )}

                              {paper.msUrl && (
                                <button
                                  onClick={() => onOpenSingleDoc(`${paperTitle} — MS`, paper.msUrl)}
                                  className="px-2 py-1 text-[11px] text-[#7B8FAD] hover:text-[#E8ECF4] hover:bg-[#0A1020] transition-colors flex items-center gap-1"
                                  title="View Mark Scheme"
                                >
                                  <FileText size={10} className="text-[#7B8FAD]" />
                                  <span>MS</span>
                                </button>
                              )}
                            </div>
                          </>
                        )}

                        {attempt ? (
                          <button
                            onClick={() => setSelectedAttempt(attempt)}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-[#E8ECF4] border border-emerald-500/35 text-xs font-semibold transition-all duration-300 active:scale-95 shadow-sm"
                            title="Click to view detailed interactive Score Report"
                          >
                            <CheckCircle2 size={12} className="text-emerald-400" />
                            <span className="tabular-nums font-bold">{attempt.achievedScore}/{attempt.maxScore}</span>
                            <span className="text-emerald-400 font-bold">({attempt.predictedGrade || `${attempt.percentage}%`})</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => onToggleCompleted(paper.id)}
                            className={`p-1.5 rounded-lg border transition-all duration-300 active:scale-95 ${
                              isDone
                                ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                                : 'bg-[#1A2540] border-[#6382BF]/30 text-[#7B8FAD] hover:text-[#E8ECF4]'
                            }`}
                            title={isDone ? 'Completed' : 'Mark as completed'}
                          >
                            <Check size={13} />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  </AnimatePresence>

      {/* Info footer for students */}
      <div className="p-3.5 rounded-xl bg-[#1A2540]/60 border border-[#6382BF]/20 flex items-center gap-2.5 text-xs text-[#7B8FAD]">
        <Info size={15} className="text-[#4A7BF7] shrink-0" />
        <span>Edexcel 9MA0 & 9FM0 mock and practice papers.</span>
      </div>

      {/* Interactive Score Report Modal */}
      <AnimatePresence>
        {selectedAttempt && (
          <motion.div
            variants={overlayFadeVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="fixed inset-0 z-50 bg-[#0F1729]"
          >
            <ScoreReportModal
              attempt={selectedAttempt}
              onClose={() => setSelectedAttempt(null)}
              onRetake={() => {
                const allPapers = MOCK_MODULES_DATA.flatMap((m) =>
                  m.papers.map((p) => ({ paper: p, module: m }))
                );
                const matched = allPapers.find((item) => item.paper.id === selectedAttempt.paperId);
                setSelectedAttempt(null);
                if (matched) {
                  onOpenPractice(matched.paper, matched.module);
                }
              }}
              onReview={(qIdx) => {
                const allPapers = MOCK_MODULES_DATA.flatMap((m) =>
                  m.papers.map((p) => ({ paper: p, module: m }))
                );
                const matched = allPapers.find((item) => item.paper.id === selectedAttempt.paperId);
                setSelectedAttempt(null);
                if (matched) {
                  onOpenPractice(matched.paper, matched.module, true, qIdx || 0, selectedAttempt);
                }
              }}
              onDelete={() => {
                deleteExamAttempt(selectedAttempt.id);
                setSelectedAttempt(null);
              }}
              erUrl={
                MOCK_MODULES_DATA.flatMap((m) => m.papers).find(
                  (p) => p.id === selectedAttempt.paperId
                )?.erUrl
              }
              onOpenSingleDoc={onOpenSingleDoc}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
