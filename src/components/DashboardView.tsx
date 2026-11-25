import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { ExamAttempt, ExamDraftItem } from '../types';
import { getExamAttempts, deleteExamAttempt } from '../utils/attempts';
import { getAllLocalDrafts, clearExamDraft } from '../utils/progressSync';
import { MODULES_DATA, PaperEntry, ModuleSection } from '../data/papersData';
import { MOCK_MODULES_DATA } from '../data/mockSetsData';
import { getInteractivePaper } from '../data/interactiveQuestions';
import { ScoreReportModal } from './ScoreReportModal';
import { contentFadeVariants, overlayFadeVariants, PILL_SPRING, EASE_SMOOTH } from '../utils/motion';
import {
  User as UserIcon,
  Award,
  CheckCircle2,
  Clock,
  TrendingUp,
  Play,
  Trash2,
  ChevronRight,
  Cloud,
  LogIn,
  RefreshCw,
  BookOpen,
} from 'lucide-react';

interface DashboardViewProps {
  completedMap: Record<string, boolean>;
  onOpenAuth: (initialView?: 'signin' | 'signup') => void;
  onNavigateModule: (subject: 'maths' | 'further-maths' | 'more-papers' | 'mock-sets', moduleId?: string) => void;
  onLaunchPaper: (
    paper: PaperEntry,
    module: ModuleSection,
    initialReviewMode?: boolean,
    initialQIndex?: number,
    initialAttempt?: ExamAttempt
  ) => void;
  onOpenSingleDoc: (title: string, url: string) => void;
}

const GRADE_OPTIONS = ['A*', 'A', 'B', 'C', 'D', 'E'];

const calcGrade = (pct: number, isFM: boolean): string => {
  if (isFM) {
    if (pct >= 80) return 'A*';
    if (pct >= 68) return 'A';
    if (pct >= 56) return 'B';
    if (pct >= 45) return 'C';
    if (pct >= 35) return 'D';
    if (pct >= 25) return 'E';
    return 'U';
  }
  if (pct >= 76) return 'A*';
  if (pct >= 65) return 'A';
  if (pct >= 54) return 'B';
  if (pct >= 44) return 'C';
  if (pct >= 34) return 'D';
  if (pct >= 24) return 'E';
  return 'U';
};

export const DashboardView: React.FC<DashboardViewProps> = ({
  completedMap,
  onOpenAuth,
  onNavigateModule,
  onLaunchPaper,
  onOpenSingleDoc,
}) => {
  const { user, profile, syncStatus, updateProfile, refreshSync } = useAuth();
  const [attempts, setAttempts] = useState<ExamAttempt[]>(() => getExamAttempts());
  const [drafts, setDrafts] = useState<ExamDraftItem[]>(() => getAllLocalDrafts());
  const [historyFilter, setHistoryFilter] = useState<'all' | 'maths' | 'further-maths' | 'mocks'>('all');
  const [selectedAttempt, setSelectedAttempt] = useState<ExamAttempt | null>(null);
  const [editingProfile, setEditingProfile] = useState(false);
  const [nameInput, setNameInput] = useState(profile?.displayName || '');
  const [targetMaths, setTargetMaths] = useState(profile?.targetGradeMaths || 'A*');
  const [targetFm, setTargetFm] = useState(profile?.targetGradeFm || 'A*');

  useEffect(() => {
    if (profile && !editingProfile) {
      setNameInput(profile.displayName);
      setTargetMaths(profile.targetGradeMaths);
      setTargetFm(profile.targetGradeFm);
    }
  }, [profile, editingProfile]);

  useEffect(() => {
    const reload = () => {
      setAttempts(getExamAttempts());
      setDrafts(getAllLocalDrafts());
    };
    window.addEventListener('matheseus_attempts_updated', reload);
    window.addEventListener('matheseus_sync_updated', reload);
    return () => {
      window.removeEventListener('matheseus_attempts_updated', reload);
      window.removeEventListener('matheseus_sync_updated', reload);
    };
  }, []);

  // Build quick lookup from paperId -> { paper, module, isMock }
  const paperLookup = useMemo(() => {
    const map = new Map<string, { paper: PaperEntry; module: ModuleSection; isMock: boolean }>();
    for (const m of MODULES_DATA) {
      for (const p of m.papers) map.set(p.id, { paper: p, module: m, isMock: false });
    }
    for (const m of MOCK_MODULES_DATA) {
      for (const p of m.papers) map.set(p.id, { paper: p, module: m, isMock: true });
    }
    return map;
  }, []);

  // Summary KPIs
  const totalArchiveCount = useMemo(() => {
    let count = 0;
    for (const m of MODULES_DATA) {
      if (m.subject === 'maths' || m.subject === 'further-maths') count += m.papers.length;
    }
    for (const m of MOCK_MODULES_DATA) count += m.papers.length;
    return count;
  }, []);

  const completedCount = useMemo(() => {
    const ids = new Set<string>();
    for (const [pid, done] of Object.entries(completedMap)) {
      if (done) ids.add(pid);
    }
    for (const a of attempts) ids.add(a.paperId);
    return ids.size;
  }, [completedMap, attempts]);

  const avgPercent = useMemo(() => {
    if (attempts.length === 0) return null;
    const sum = attempts.reduce((acc, a) => acc + (a.percentage || 0), 0);
    return Math.round(sum / attempts.length);
  }, [attempts]);

  const predictedGrades = useMemo(() => {
    const mathsAttempts = attempts.filter((a) => {
      const info = paperLookup.get(a.paperId);
      const code = (a.paperCode || info?.module.code || '').toUpperCase();
      return code.startsWith('9MA0') || code.startsWith('8MA0') || info?.module.subject === 'maths';
    });
    const fmAttempts = attempts.filter((a) => {
      const info = paperLookup.get(a.paperId);
      const code = (a.paperCode || info?.module.code || '').toUpperCase();
      return code.startsWith('9FM0') || code.startsWith('8FM0') || info?.module.subject === 'further-maths';
    });

    const mAvg = mathsAttempts.length
      ? Math.round(mathsAttempts.reduce((s, a) => s + a.percentage, 0) / mathsAttempts.length)
      : null;
    const fmAvg = fmAttempts.length
      ? Math.round(fmAttempts.reduce((s, a) => s + a.percentage, 0) / fmAttempts.length)
      : null;

    return {
      maths: mAvg !== null ? calcGrade(mAvg, false) : null,
      fm: fmAvg !== null ? calcGrade(fmAvg, true) : null,
    };
  }, [attempts, paperLookup]);

  const weeklyProgressCount = useMemo(() => {
    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const recentPapers = new Set<string>();
    for (const a of attempts) {
      const ts = new Date(a.completedAt).getTime();
      if (!Number.isNaN(ts) && ts >= sevenDaysAgo) {
        recentPapers.add(a.paperId);
      }
    }
    return recentPapers.size;
  }, [attempts]);

  const weeklyGoalTarget = profile?.weeklyGoalPapers || 2;

  const totalTimeFormatted = useMemo(() => {
    const secs = attempts.reduce((s, a) => s + (a.timeSpentSeconds || 0), 0);
    const hrs = Math.floor(secs / 3600);
    const mins = Math.floor((secs % 3600) / 60);
    if (secs === 0) return '0m';
    return hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`;
  }, [attempts]);

  // Module Coverage
  const moduleProgress = useMemo(() => {
    const groups: Array<{
      key: string;
      label: string;
      code: string;
      subject: 'maths' | 'further-maths' | 'mock-sets';
      moduleId?: string;
      total: number;
      done: number;
    }> = [
      { key: 'p1', label: 'Pure Mathematics 1', code: '9MA0/01', subject: 'maths', moduleId: 'p1', total: 0, done: 0 },
      { key: 'p2', label: 'Pure Mathematics 2', code: '9MA0/02', subject: 'maths', moduleId: 'p2', total: 0, done: 0 },
      { key: 'p3', label: 'Stats & Mechanics', code: '9MA0/03', subject: 'maths', moduleId: 'p3', total: 0, done: 0 },
      { key: 'cp1', label: 'Core Pure 1', code: '9FM0/01', subject: 'further-maths', moduleId: 'cp1', total: 0, done: 0 },
      { key: 'cp2', label: 'Core Pure 2', code: '9FM0/02', subject: 'further-maths', moduleId: 'cp2', total: 0, done: 0 },
      { key: 'fm-opt', label: 'Further Options', code: 'FP / FM / FS / D', subject: 'further-maths', moduleId: 'fp1', total: 0, done: 0 },
      { key: 'mocks', label: 'Mock Sets', code: 'Maths & FM', subject: 'mock-sets', total: 0, done: 0 },
    ];

    const byKey = Object.fromEntries(groups.map((g) => [g.key, g]));
    for (const m of MODULES_DATA) {
      if (m.subject !== 'maths' && m.subject !== 'further-maths') continue;
      const targetKey = m.id in byKey ? m.id : m.subject === 'further-maths' ? 'fm-opt' : null;
      if (!targetKey) continue;
      for (const p of m.papers) {
        byKey[targetKey].total += 1;
        if (completedMap[p.id] || attempts.some((a) => a.paperId === p.id)) {
          byKey[targetKey].done += 1;
        }
      }
    }
    for (const m of MOCK_MODULES_DATA) {
      for (const p of m.papers) {
        byKey.mocks.total += 1;
        if (completedMap[p.id] || attempts.some((a) => a.paperId === p.id)) {
          byKey.mocks.done += 1;
        }
      }
    }

    return groups;
  }, [completedMap, attempts]);

  // Topic Accuracy Breakdown aggregated from attempts -> questionScores
  const topicStats = useMemo(() => {
    const map = new Map<string, { achieved: number; possible: number; qCount: number }>();

    for (const a of attempts) {
      const qs = a.questionScores;
      if (!qs || Object.keys(qs).length === 0) continue;
      const info = paperLookup.get(a.paperId);
      const interactive = getInteractivePaper(
        a.paperId,
        a.paperTitle,
        a.paperCode || info?.module.code,
        info?.paper.year,
        info?.paper.season,
        info?.module.id,
        info?.module.subject
      );

      for (const q of interactive.questions) {
        const sc = qs[q.number];
        if (sc === undefined) continue;
        const topicName = (q.topic || 'General').trim();
        if (!topicName || topicName === 'Further Mathematics' || topicName === 'Mathematics') continue;
        const cur = map.get(topicName) || { achieved: 0, possible: 0, qCount: 0 };
        cur.achieved += sc;
        cur.possible += q.totalMarks;
        cur.qCount += 1;
        map.set(topicName, cur);
      }
    }

    return Array.from(map.entries())
      .map(([topic, s]) => ({
        topic,
        achieved: s.achieved,
        possible: s.possible,
        qCount: s.qCount,
        pct: s.possible > 0 ? Math.round((s.achieved / s.possible) * 100) : 0,
      }))
      .sort((a, b) => a.pct - b.pct || b.qCount - a.qCount);
  }, [attempts, paperLookup]);

  const filteredAttempts = useMemo(() => {
    return attempts.filter((a) => {
      if (historyFilter === 'all') return true;
      const info = paperLookup.get(a.paperId);
      if (historyFilter === 'mocks') return Boolean(info?.isMock || a.paperId.includes('mock') || a.paperId.startsWith('fm-sam') || a.paperId.startsWith('fm-specimen'));
      if (historyFilter === 'further-maths') {
        const code = (a.paperCode || info?.module.code || '').toUpperCase();
        return !info?.isMock && (info?.module.subject === 'further-maths' || code.includes('FM0'));
      }
      return !info?.isMock && info?.module.subject === 'maths';
    });
  }, [attempts, historyFilter, paperLookup]);

  const handleSaveProfile = async () => {
    await updateProfile({
      displayName: nameInput.trim() || 'Student',
      targetGradeMaths: targetMaths,
      targetGradeFm: targetFm,
    });
    setEditingProfile(false);
  };

  if (!user) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16">
        <div className="rounded-2xl bg-[#1A2540] border border-[#6382BF]/30 p-8 text-center space-y-5 shadow-xl">
          <div className="w-12 h-12 rounded-2xl bg-[#0A1020] border border-[#6382BF]/40 flex items-center justify-center text-[#4A7BF7] mx-auto">
            <UserIcon size={22} />
          </div>
          <div className="space-y-1.5">
            <h1 className="text-xl font-bold text-[#E8ECF4]">Sign in to view your Dashboard</h1>
            <p className="text-xs text-[#7B8FAD] leading-relaxed">
              Create an account or sign in to save scores, track topic accuracy, and sync papers across devices.
            </p>
          </div>
          <div className="flex items-center justify-center gap-3 pt-1">
            <button
              type="button"
              onClick={() => onOpenAuth('signin')}
              className="px-4 py-2 rounded-xl bg-[#0A1020] hover:bg-[#1A2540] border border-[#6382BF]/35 text-xs font-semibold text-[#E8ECF4]"
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => onOpenAuth('signup')}
              className="px-5 py-2 rounded-xl bg-[#4A7BF7] hover:bg-[#3D6CE0] text-white text-xs font-semibold flex items-center gap-1.5 shadow-md"
            >
              <LogIn size={13} />
              <span>Create Account</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Header + Account Card */}
      <div className="rounded-2xl bg-[#1A2540] border border-[#6382BF]/30 p-5 sm:p-6 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-[#0A1020] border border-[#6382BF]/40 flex items-center justify-center text-[#4A7BF7] shrink-0">
            <UserIcon size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-xl font-bold text-[#E8ECF4]">
                {`${profile?.displayName || user.email?.split('@')[0]}'s Dashboard`}
              </h1>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#4A7BF7]/15 text-[#4A7BF7] border border-[#4A7BF7]/30">
                <Cloud size={11} />
                <span>{syncStatus === 'syncing' ? 'Syncing...' : 'Synced'}</span>
              </span>
            </div>
            <p className="text-xs text-[#7B8FAD] mt-0.5">
              {`${user.email} · Targets: Maths ${profile?.targetGradeMaths || 'A*'} · FM ${profile?.targetGradeFm || 'A*'} · Weekly Goal: ${weeklyProgressCount}/${weeklyGoalTarget}`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 flex-wrap">
          {user ? (
            <>
              <button
                type="button"
                onClick={() => void refreshSync()}
                className="px-3 py-2 rounded-xl bg-[#0A1020] hover:bg-[#1A2540] border border-[#6382BF]/30 text-xs font-semibold text-[#7B8FAD] hover:text-[#E8ECF4] flex items-center gap-1.5"
                title="Sync now"
              >
                <RefreshCw size={13} className={syncStatus === 'syncing' ? 'animate-spin text-[#4A7BF7]' : ''} />
                <span>Sync</span>
              </button>
              <button
                type="button"
                onClick={() => setEditingProfile((prev) => !prev)}
                className="px-3.5 py-2 rounded-xl bg-[#0A1020] hover:bg-[#4A7BF7]/15 border border-[#6382BF]/35 text-xs font-semibold text-[#E8ECF4]"
              >
                {editingProfile ? 'Cancel' : 'Edit Targets'}
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => onOpenAuth('signin')}
                className="px-3.5 py-2 rounded-xl bg-[#0A1020] hover:bg-[#1A2540] border border-[#6382BF]/35 text-xs font-semibold text-[#E8ECF4]"
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => onOpenAuth('signup')}
                className="px-4 py-2 rounded-xl bg-[#4A7BF7] hover:bg-[#3D6CE0] text-white text-xs font-semibold flex items-center gap-1.5 shadow-md"
              >
                <LogIn size={13} />
                <span>Create Account</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Inline Profile & Target Editor */}
      <AnimatePresence initial={false}>
        {user && editingProfile && (
            <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: EASE_SMOOTH }}
            className="overflow-hidden"
          >
            <div className="rounded-2xl bg-[#1A2540] border border-[#4A7BF7]/40 p-5 grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-[#7B8FAD] block">Display Name</label>
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#0A1020] border border-[#6382BF]/30 text-xs text-[#E8ECF4] focus:outline-none focus:border-[#4A7BF7]"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-[#7B8FAD] block">Target Grade (Maths)</label>
                <select
                  value={targetMaths}
                  onChange={(e) => setTargetMaths(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#0A1020] border border-[#6382BF]/30 text-xs text-[#E8ECF4]"
                >
                  {GRADE_OPTIONS.map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-[#7B8FAD] block">Target Grade (Further)</label>
                <select
                  value={targetFm}
                  onChange={(e) => setTargetFm(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#0A1020] border border-[#6382BF]/30 text-xs text-[#E8ECF4]"
                >
                  {GRADE_OPTIONS.map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>
              <button
                type="button"
                onClick={() => void handleSaveProfile()}
                className="py-2 px-4 rounded-xl bg-[#4A7BF7] hover:bg-[#3D6CE0] text-white text-xs font-semibold"
              >
                Save Targets
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4 Summary KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 sm:p-5 rounded-2xl bg-[#1A2540] border border-[#6382BF]/25 shadow-lg space-y-1">
          <div className="flex items-center justify-between text-xs text-[#7B8FAD] font-semibold">
            <span>Completed</span>
            <CheckCircle2 size={15} className="text-[#4A7BF7]" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-[#E8ECF4] tabular-nums pt-1">
            {completedCount}
            <span className="text-xs font-normal text-[#7B8FAD]"> / {totalArchiveCount}</span>
          </div>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-[#1A2540] border border-[#6382BF]/25 shadow-lg space-y-1">
          <div className="flex items-center justify-between text-xs text-[#7B8FAD] font-semibold">
            <span>Average Score</span>
            <TrendingUp size={15} className="text-[#4A7BF7]" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-[#4A7BF7] tabular-nums pt-1">
            {avgPercent !== null ? `${avgPercent}%` : '—'}
          </div>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-[#1A2540] border border-[#6382BF]/25 shadow-lg space-y-1">
          <div className="flex items-center justify-between text-xs text-[#7B8FAD] font-semibold">
            <span>Predicted</span>
            <Award size={15} className="text-[#4A7BF7]" />
          </div>
          <div className="text-xl sm:text-2xl font-bold text-[#E8ECF4] pt-1 flex items-baseline gap-2.5 flex-wrap">
            <span>
              <span className="text-[11px] font-normal text-[#7B8FAD] mr-1">Maths</span>
              <span className="text-[#4A7BF7]">{predictedGrades.maths || '—'}</span>
            </span>
            <span className="text-[#6382BF]/40 text-sm">/</span>
            <span>
              <span className="text-[11px] font-normal text-[#7B8FAD] mr-1">FM</span>
              <span className="text-[#4A7BF7]">{predictedGrades.fm || '—'}</span>
            </span>
          </div>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-[#1A2540] border border-[#6382BF]/25 shadow-lg space-y-1">
          <div className="flex items-center justify-between text-xs text-[#7B8FAD] font-semibold">
            <span>Practice Time</span>
            <Clock size={15} className="text-[#4A7BF7]" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-[#E8ECF4] tabular-nums pt-1">
            {totalTimeFormatted}
          </div>
        </div>
      </div>

      {/* Continue In-Progress Drafts */}
      {drafts.length > 0 && (
        <div className="rounded-2xl bg-[#1A2540] border border-[#6382BF]/25 p-5 shadow-lg space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#E8ECF4]">In Progress</h2>
            <span className="text-xs text-[#7B8FAD]">{drafts.length} saved</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {drafts.map((d) => {
              const info = paperLookup.get(d.paperId);
              if (!info) return null;
              const minsLeft = Math.floor((d.secondsRemaining || 0) / 60);
              return (
                <div
                  key={d.paperId}
                  className="p-3.5 rounded-xl bg-[#0A1020] border border-[#6382BF]/30 flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-[#E8ECF4] truncate">
                      {info.paper.year} · {info.module.title} ({info.module.code})
                    </div>
                    <div className="text-[11px] text-[#7B8FAD] mt-0.5 tabular-nums">
                      Q{d.currentIndex + 1} · {d.timingMode === 'timed' ? `${minsLeft}m left` : 'Untimed'}
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        clearExamDraft(d.paperId);
                        setDrafts(getAllLocalDrafts());
                      }}
                      className="p-1.5 rounded-lg text-[#7B8FAD] hover:text-rose-400 hover:bg-[#1A2540]"
                      title="Discard draft"
                    >
                      <Trash2 size={13} />
                    </button>
                    <button
                      type="button"
                      onClick={() => onLaunchPaper(info.paper, info.module)}
                      className="px-3 py-1.5 rounded-lg bg-[#4A7BF7] hover:bg-[#3D6CE0] text-white text-xs font-semibold flex items-center gap-1"
                    >
                      <Play size={11} />
                      <span>Resume</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Module Coverage & Topic Accuracy Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Module Progress */}
        <div className="rounded-2xl bg-[#1A2540] border border-[#6382BF]/25 p-5 shadow-lg space-y-4">
          <div className="flex items-center justify-between border-b border-[#6382BF]/20 pb-3">
            <h2 className="text-sm font-bold text-[#E8ECF4]">Module Coverage</h2>
            <BookOpen size={15} className="text-[#4A7BF7]" />
          </div>
          <div className="space-y-3">
            {moduleProgress.map((m) => {
              const pct = m.total > 0 ? Math.round((m.done / m.total) * 100) : 0;
              return (
                <button
                  key={m.key}
                  type="button"
                  onClick={() => onNavigateModule(m.subject, m.moduleId)}
                  className="w-full text-left group space-y-1.5 p-2 -mx-2 rounded-xl hover:bg-[#0A1020]/70 transition-colors"
                >
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[#E8ECF4] group-hover:text-[#4A7BF7] transition-colors">
                        {m.label}
                      </span>
                      <span className="text-[11px] text-[#7B8FAD]">{m.code}</span>
                    </div>
                    <div className="flex items-center gap-1.5 tabular-nums text-[#7B8FAD]">
                      <span className="text-[#E8ECF4] font-semibold">{m.done}</span>
                      <span>/ {m.total}</span>
                      <ChevronRight size={13} className="opacity-50 group-hover:opacity-100" />
                    </div>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-[#0A1020] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[#4A7BF7] transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Topic Accuracy */}
        <div className="rounded-2xl bg-[#1A2540] border border-[#6382BF]/25 p-5 shadow-lg space-y-4">
          <div className="flex items-center justify-between border-b border-[#6382BF]/20 pb-3">
            <h2 className="text-sm font-bold text-[#E8ECF4]">Topic Accuracy</h2>
            <div className="flex items-center gap-2 text-[11px] text-[#7B8FAD]">
              <span className="inline-flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400" />&gt;80%</span>
              <span className="inline-flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400" />50–80%</span>
              <span className="inline-flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-400" />&lt;50%</span>
            </div>
          </div>

          {topicStats.length === 0 ? (
            <div className="py-10 text-center text-xs text-[#7B8FAD] space-y-2">
              <p>Complete questions in Practice Mode to see topic strengths here.</p>
            </div>
          ) : (
            <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1">
              {topicStats.map((t) => {
                const badgeClass =
                  t.pct > 80
                    ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/35'
                    : t.pct >= 50
                    ? 'bg-amber-500/15 text-amber-300 border-amber-500/35'
                    : 'bg-rose-500/15 text-rose-300 border-rose-500/35';
                return (
                  <div
                    key={t.topic}
                    className="p-2.5 rounded-xl bg-[#0A1020] border border-[#6382BF]/20 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="min-w-0">
                      <div className="font-medium text-[#E8ECF4] truncate">{t.topic}</div>
                      <div className="text-[11px] text-[#7B8FAD] tabular-nums">
                        {t.qCount} {t.qCount === 1 ? 'question' : 'questions'} · {t.achieved}/{t.possible} marks
                      </div>
                    </div>
                    <span className={`px-2.5 py-1 rounded-md border text-xs font-bold tabular-nums shrink-0 ${badgeClass}`}>
                      {t.pct}%
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Attempt History */}
      <div className="rounded-2xl bg-[#1A2540] border border-[#6382BF]/25 p-5 shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#6382BF]/20 pb-3">
          <h2 className="text-sm font-bold text-[#E8ECF4]">Attempt History</h2>
            <div className="flex items-center gap-1.5 text-xs">
              {([
                ['all', 'All'],
                ['maths', 'Maths'],
                ['further-maths', 'Further Maths'],
                ['mocks', 'Mocks'],
              ] as const).map(([val, label]) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setHistoryFilter(val)}
                  className={`relative px-3 py-1 rounded-lg font-medium border transition-colors ${
                    historyFilter === val
                      ? 'text-white border-[#4A7BF7]'
                      : 'bg-[#0A1020] text-[#7B8FAD] hover:text-[#E8ECF4] border-[#6382BF]/30'
                  }`}
                >
                  {historyFilter === val && (
                    <motion.div
                      layoutId="dashboard-history-pill"
                      transition={PILL_SPRING}
                      className="absolute inset-0 bg-[#4A7BF7] rounded-lg"
                    />
                  )}
                  <span className="relative z-10">{label}</span>
                </button>
              ))}
            </div>
        </div>

        <AnimatePresence mode="wait" initial={false}>
        {filteredAttempts.length === 0 ? (
          <motion.div
            key={`empty-${historyFilter}`}
            variants={contentFadeVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="py-10 text-center text-xs text-[#7B8FAD]"
          >
            No recorded attempts yet.
          </motion.div>
        ) : (
          <motion.div
            key={`list-${historyFilter}`}
            variants={contentFadeVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="border border-[#6382BF]/25 rounded-xl overflow-hidden bg-[#0A1020]"
          >
            <div className="divide-y divide-[#6382BF]/15">
              {filteredAttempts.map((a) => {
                const dateLabel = (() => {
                  try {
                    return new Date(a.completedAt).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    });
                  } catch {
                    return a.completedAt;
                  }
                })();
                return (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => setSelectedAttempt(a)}
                    className="w-full px-4 py-3 flex items-center justify-between text-left text-xs hover:bg-[#1A2540]/60 transition-colors gap-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="px-2 py-0.5 rounded bg-[#1A2540] border border-[#6382BF]/30 text-[#4A7BF7] font-semibold font-sans shrink-0">
                        {a.paperCode || 'Paper'}
                      </span>
                      <div className="min-w-0">
                        <div className="font-semibold text-[#E8ECF4] truncate">
                          {a.paperTitle || a.paperId}
                        </div>
                        <div className="text-[11px] text-[#7B8FAD]">{dateLabel}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 shrink-0 tabular-nums">
                      <span className="font-semibold text-[#E8ECF4]">
                        {a.achievedScore}/{a.maxScore}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-[#1A2540] border border-[#6382BF]/30 text-[#4A7BF7] font-bold">
                        {a.percentage}% · {a.predictedGrade}
                      </span>
                      <ChevronRight size={14} className="text-[#7B8FAD]" />
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
        </AnimatePresence>
      </div>

      {/* Inline Review Modal */}
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
                const info = paperLookup.get(selectedAttempt.paperId);
                setSelectedAttempt(null);
                if (info) onLaunchPaper(info.paper, info.module);
              }}
              onDelete={() => {
                deleteExamAttempt(selectedAttempt.id);
                setSelectedAttempt(null);
              }}
              erUrl={paperLookup.get(selectedAttempt.paperId)?.paper.erUrl}
              onOpenSingleDoc={onOpenSingleDoc}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
