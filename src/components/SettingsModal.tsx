import React, { useState, useEffect, useId } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Settings as SettingsIcon,
  Volume2,
  VolumeX,
  User as UserIcon,
  Cloud,
  RefreshCw,
  Trash2,
  Check,
  Target,
  Clock,
  ArrowUpToLine,
  ShieldAlert,
  FileText,
  Sparkles,
  Download,
  Home,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import {
  getSettings,
  saveSettings,
  DefaultLandingTab,
  PracticeTimingDefault,
  PdfFitDefault,
  MotionMode,
} from '../utils/settings';
import { playExamChime } from '../utils/audio';
import { getExamAttempts, clearLocalAttempts } from '../utils/attempts';
import { getAllLocalDrafts, clearExamDraft } from '../utils/progressSync';
import {
  overlayFadeVariants,
  modalPanelVariants,
  contentFadeVariants,
  PILL_SPRING,
} from '../utils/motion';

interface SettingsModalProps {
  onClose: () => void;
  onOpenAuth: (mode?: 'signin' | 'signup') => void;
}

type SettingsTab = 'goals' | 'practice' | 'data';

const GRADE_OPTIONS = ['A*', 'A', 'B', 'C'] as const;

const ToggleSwitch: React.FC<{
  checked: boolean;
  onToggle: () => void;
  ariaLabel: string;
}> = ({ checked, onToggle, ariaLabel }) => (
  <button
    type="button"
    onClick={onToggle}
    role="switch"
    aria-checked={checked}
    aria-label={ariaLabel}
    className={`w-10 h-5.5 rounded-full p-0.5 transition-colors flex items-center shrink-0 ${
      checked ? 'bg-[#4A7BF7]' : 'bg-[#1A2540] border border-[#6382BF]/35'
    }`}
  >
    <span
      className={`w-4 h-4 rounded-full bg-white shadow transition-transform ${
        checked ? 'translate-x-[18px]' : 'translate-x-0'
      }`}
    />
  </button>
);

export const SettingsModal: React.FC<SettingsModalProps> = ({
  onClose,
  onOpenAuth,
}) => {
  const uniqueId = useId();
  const { user, profile, syncStatus, updateProfile, refreshSync } = useAuth();
  const [activeTab, setActiveTab] = useState<SettingsTab>('goals');

  // Local settings state
  const [settings, setSettings] = useState(() => getSettings());

  // Account & Study Goal state
  const [displayName, setDisplayName] = useState(profile?.displayName || '');
  const [qualFocus, setQualFocus] = useState<'both' | 'maths' | 'further-maths'>(
    profile?.qualificationFocus || 'both'
  );
  const [targetMaths, setTargetMaths] = useState(profile?.targetGradeMaths || 'A*');
  const [targetFm, setTargetFm] = useState(profile?.targetGradeFm || 'A*');
  const [weeklyGoalPapers, setWeeklyGoalPapers] = useState<number>(profile?.weeklyGoalPapers || 2);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savedNotice, setSavedNotice] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [goalsDirty, setGoalsDirty] = useState(false);

  // Local data state
  const [draftCount, setDraftCount] = useState<number>(() => getAllLocalDrafts().length);
  const [attemptCount, setAttemptCount] = useState<number>(() => getExamAttempts().length);
  const [confirmClearDrafts, setConfirmClearDrafts] = useState(false);
  const [confirmClearAttempts, setConfirmClearAttempts] = useState(false);

  // Only populate form fields from profile if the user does not have unsaved edits
  useEffect(() => {
    if (profile && !goalsDirty) {
      setDisplayName(profile.displayName);
      setQualFocus(profile.qualificationFocus);
      setTargetMaths(profile.targetGradeMaths);
      setTargetFm(profile.targetGradeFm);
      setWeeklyGoalPapers(profile.weeklyGoalPapers || 2);
    }
  }, [profile, goalsDirty]);

  const updateLocalSetting = <K extends keyof typeof settings>(
    key: K,
    value: (typeof settings)[K]
  ) => {
    const next = saveSettings({ [key]: value });
    setSettings(next);
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSavingProfile(true);
    setSaveError(null);
    const res = await updateProfile({
      displayName: displayName.trim() || profile?.displayName || 'Student',
      qualificationFocus: qualFocus,
      targetGradeMaths: targetMaths,
      targetGradeFm: targetFm,
      weeklyGoalPapers: Math.min(10, Math.max(1, weeklyGoalPapers)),
    });
    setSavingProfile(false);
    if (res?.error) {
      setSaveError(res.error);
      return;
    }
    setGoalsDirty(false);
    setSavedNotice(true);
    window.setTimeout(() => setSavedNotice(false), 2200);
  };

  const handleExportAttempts = (format: 'json' | 'csv') => {
    const attempts = getExamAttempts();
    if (attempts.length === 0) return;

    let content = '';
    let mime = 'application/json';
    let ext = 'json';

    if (format === 'json') {
      content = JSON.stringify(attempts, null, 2);
    } else {
      const headers = ['id', 'paperCode', 'paperTitle', 'achievedScore', 'maxScore', 'percentage', 'predictedGrade', 'timingMode', 'timeSpentSeconds', 'completedAt'];
      const escapeCsv = (val: unknown) => `"${String(val ?? '').replace(/"/g, '""')}"`;
      const rows = attempts.map((a) =>
        [
          a.id,
          a.paperCode,
          a.paperTitle,
          a.achievedScore,
          a.maxScore,
          a.percentage,
          a.predictedGrade,
          a.timingMode ?? '',
          a.timeSpentSeconds ?? '',
          a.completedAt,
        ]
          .map(escapeCsv)
          .join(',')
      );
      content = [headers.join(','), ...rows].join('\n');
      mime = 'text/csv;charset=utf-8';
      ext = 'csv';
    }

    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `matheseus-attempts-${new Date().toISOString().slice(0, 10)}.${ext}`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const handleClearDrafts = () => {
    const drafts = getAllLocalDrafts();
    for (const d of drafts) {
      clearExamDraft(d.paperId);
    }
    setDraftCount(0);
    setConfirmClearDrafts(false);
  };

  const handleClearAttempts = () => {
    clearLocalAttempts();
    setAttemptCount(0);
    setConfirmClearAttempts(false);
  };

  return (
    <motion.div
      variants={overlayFadeVariants}
      initial="enter"
      animate="center"
      exit="exit"
      onClick={onClose}
      className="fixed inset-0 z-50 bg-[#0A1020]/85 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <motion.div
        variants={modalPanelVariants}
        initial="enter"
        animate="center"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl rounded-2xl bg-[#1A2540] border border-[#6382BF]/35 shadow-2xl overflow-hidden text-[#E8ECF4] font-sans flex flex-col max-h-[88vh]"
      >
        {/* Header */}
        <div className="px-6 py-4 bg-[#0A1020]/60 border-b border-[#6382BF]/25 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#4A7BF7]/15 border border-[#4A7BF7]/35 flex items-center justify-center text-[#4A7BF7]">
              <SettingsIcon size={16} />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#E8ECF4]">Settings</h2>
              <p className="text-[11px] text-[#7B8FAD]">Study goals, practice behaviour, viewers &amp; data</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#7B8FAD] hover:text-[#E8ECF4] hover:bg-[#1A2540] transition-colors"
            title="Close settings"
          >
            <X size={16} />
          </button>
        </div>

        {/* Category Tabs */}
        <div className="px-6 py-3 bg-[#0A1020]/40 border-b border-[#6382BF]/20 shrink-0">
          <div className="grid grid-cols-3 gap-1 p-1 rounded-xl bg-[#0A1020] border border-[#6382BF]/25 text-xs font-semibold">
            {([
              ['goals', 'Goals & Navigation'],
              ['practice', 'Practice & Viewers'],
              ['data', 'Backups & Data'],
            ] as const).map(([tabKey, label]) => {
              const isSelected = activeTab === tabKey;
              return (
                <button
                  key={tabKey}
                  type="button"
                  onClick={() => setActiveTab(tabKey)}
                  className={`relative py-1.5 px-2 rounded-lg transition-colors whitespace-nowrap ${
                    isSelected ? 'text-white' : 'text-[#7B8FAD] hover:text-[#E8ECF4]'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId={`settings-tab-pill-${uniqueId}`}
                      transition={PILL_SPRING}
                      className="absolute inset-0 bg-[#4A7BF7] rounded-lg shadow-sm"
                    />
                  )}
                  <span className="relative z-10">{label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Panels */}
        <div className="p-6 overflow-y-auto text-xs flex-1">
          <AnimatePresence mode="wait" initial={false}>
            {activeTab === 'goals' && (
              <motion.div
                key="goals"
                variants={contentFadeVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="space-y-5"
              >
                {/* Default Landing Tab */}
                <div className="rounded-xl bg-[#0A1020] border border-[#6382BF]/25 p-4 space-y-2.5">
                  <div className="flex items-center gap-2 font-semibold text-[#E8ECF4]">
                    <Home size={14} className="text-[#4A7BF7]" />
                    <span>Default Starting Tab (When Signed In)</span>
                  </div>
                  <p className="text-[11px] text-[#7B8FAD]">
                    Choose which screen opens automatically when you load matheseus signed in.
                  </p>
                  <div className="grid grid-cols-3 gap-1.5 pt-0.5">
                    {([
                      ['dashboard', 'Dashboard'],
                      ['maths', 'Past Papers'],
                      ['topics', 'By Topic'],
                    ] as [DefaultLandingTab, string][]).map(([val, label]) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => updateLocalSetting('defaultLandingTab', val)}
                        className={`py-1.5 rounded-lg text-[11px] font-semibold border transition-colors ${
                          settings.defaultLandingTab === val
                            ? 'bg-[#4A7BF7] text-white border-[#4A7BF7]'
                            : 'bg-[#1A2540] text-[#7B8FAD] border-[#6382BF]/30 hover:text-[#E8ECF4]'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Account & Study Goals */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#7B8FAD]">
                      Account &amp; Target Grades
                    </span>
                    {user && (
                      <span className="inline-flex items-center gap-1 text-[11px] text-emerald-300">
                        <Cloud size={12} />
                        {syncStatus === 'syncing' ? 'Syncing...' : 'Synced'}
                      </span>
                    )}
                  </div>

                  {user ? (
                    <form
                      onSubmit={handleSaveProfile}
                      className="rounded-xl bg-[#0A1020] border border-[#6382BF]/25 p-4 space-y-3.5"
                    >
                      <div className="space-y-1">
                        <label className="text-[11px] font-medium text-[#7B8FAD]">Display Name</label>
                        <input
                          type="text"
                          value={displayName}
                          onChange={(e) => {
                            setDisplayName(e.target.value);
                            setGoalsDirty(true);
                            setSavedNotice(false);
                          }}
                          placeholder="Your name"
                          className="w-full px-3 py-2 rounded-lg bg-[#1A2540] border border-[#6382BF]/30 text-xs text-[#E8ECF4] focus:outline-none focus:border-[#4A7BF7]"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-medium text-[#7B8FAD]">Focus Subjects</label>
                        <div className="grid grid-cols-3 gap-1.5">
                          {([
                            ['both', 'Both'],
                            ['maths', 'Maths'],
                            ['further-maths', 'Further Maths'],
                          ] as const).map(([val, label]) => (
                            <button
                              key={val}
                              type="button"
                              onClick={() => {
                                setQualFocus(val);
                                setGoalsDirty(true);
                                setSavedNotice(false);
                              }}
                              className={`py-1.5 rounded-lg text-[11px] font-semibold border transition-colors ${
                                qualFocus === val
                                  ? 'bg-[#4A7BF7] text-white border-[#4A7BF7]'
                                  : 'bg-[#1A2540] text-[#7B8FAD] border-[#6382BF]/30 hover:text-[#E8ECF4]'
                              }`}
                            >
                              {label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[11px] font-medium text-[#7B8FAD] flex items-center gap-1">
                            <Target size={11} className="text-[#4A7BF7]" />
                            <span>Maths Target</span>
                          </label>
                          <select
                            value={targetMaths}
                            onChange={(e) => {
                              setTargetMaths(e.target.value);
                              setGoalsDirty(true);
                              setSavedNotice(false);
                            }}
                            className="w-full px-3 py-2 rounded-lg bg-[#1A2540] border border-[#6382BF]/30 text-xs text-[#E8ECF4] focus:outline-none focus:border-[#4A7BF7]"
                          >
                            {GRADE_OPTIONS.map((g) => (
                              <option key={g} value={g}>{g}</option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[11px] font-medium text-[#7B8FAD] flex items-center gap-1">
                            <Target size={11} className="text-[#4A7BF7]" />
                            <span>Further Maths Target</span>
                          </label>
                          <select
                            value={targetFm}
                            onChange={(e) => {
                              setTargetFm(e.target.value);
                              setGoalsDirty(true);
                              setSavedNotice(false);
                            }}
                            className="w-full px-3 py-2 rounded-lg bg-[#1A2540] border border-[#6382BF]/30 text-xs text-[#E8ECF4] focus:outline-none focus:border-[#4A7BF7]"
                          >
                            {GRADE_OPTIONS.map((g) => (
                              <option key={g} value={g}>{g}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Weekly Paper Goal */}
                      <div className="space-y-1.5 pt-1">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-medium text-[#7B8FAD]">Weekly Paper Goal</span>
                          <span className="font-bold text-[#4A7BF7]">
                            {weeklyGoalPapers} {weeklyGoalPapers === 1 ? 'paper' : 'papers'} / week
                          </span>
                        </div>
                        <input
                          type="range"
                          min={1}
                          max={10}
                          value={weeklyGoalPapers}
                          onChange={(e) => {
                            setWeeklyGoalPapers(Number(e.target.value));
                            setGoalsDirty(true);
                            setSavedNotice(false);
                          }}
                          className="w-full accent-[#4A7BF7] cursor-pointer"
                        />
                      </div>

                      {saveError && (
                        <div className="text-[11px] text-rose-300 bg-rose-500/10 border border-rose-500/30 rounded-lg px-3 py-1.5">
                          {saveError}
                        </div>
                      )}

                      <div className="flex items-center justify-between gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => void refreshSync()}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1A2540] border border-[#6382BF]/30 hover:border-[#4A7BF7]/50 text-[#E8ECF4] font-medium transition-colors"
                        >
                          <RefreshCw size={12} className={syncStatus === 'syncing' ? 'animate-spin' : ''} />
                          <span>Sync Now</span>
                        </button>

                        <button
                          type="submit"
                          disabled={savingProfile}
                          className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg font-semibold transition-colors disabled:opacity-60 border ${
                            savedNotice
                              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/35'
                              : 'bg-[#4A7BF7] hover:bg-[#3D6CE0] text-white border-[#4A7BF7]'
                          }`}
                        >
                          {savedNotice ? (
                            <>
                              <Check size={13} />
                              <span>Saved</span>
                            </>
                          ) : (
                            <span>{savingProfile ? 'Saving...' : goalsDirty ? 'Save Goals*' : 'Save Goals'}</span>
                          )}
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="rounded-xl bg-[#0A1020] border border-[#6382BF]/25 p-4 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#1A2540] border border-[#6382BF]/25 flex items-center justify-center text-[#4A7BF7] shrink-0">
                          <UserIcon size={15} />
                        </div>
                        <div>
                          <div className="font-semibold text-[#E8ECF4]">Not signed in</div>
                          <div className="text-[11px] text-[#7B8FAD]">
                            Sign in to set Maths/FM grade targets, weekly paper goals, and sync progress.
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onOpenAuth('signin');
                        }}
                        className="px-3.5 py-1.5 rounded-lg bg-[#4A7BF7] hover:bg-[#3D6CE0] text-white font-semibold shrink-0 transition-colors"
                      >
                        Sign In
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === 'practice' && (
              <motion.div
                key="practice"
                variants={contentFadeVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="space-y-4"
              >
                {/* Default Practice Timing */}
                <div className="rounded-xl bg-[#0A1020] border border-[#6382BF]/25 p-4 space-y-2.5">
                  <div className="flex items-center gap-2 font-semibold text-[#E8ECF4]">
                    <Clock size={14} className="text-[#4A7BF7]" />
                    <span>Default Practice Mode Timing</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {([
                      ['timed', 'Timed Exam Mode'],
                      ['untimed', 'Untimed Practice'],
                    ] as [PracticeTimingDefault, string][]).map(([val, label]) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => updateLocalSetting('defaultTimingMode', val)}
                        className={`py-2 rounded-lg text-[11px] font-semibold border transition-colors ${
                          settings.defaultTimingMode === val
                            ? 'bg-[#4A7BF7] text-white border-[#4A7BF7]'
                            : 'bg-[#1A2540] text-[#7B8FAD] border-[#6382BF]/30 hover:text-[#E8ECF4]'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Audio Chime */}
                <div className="rounded-xl bg-[#0A1020] border border-[#6382BF]/25 p-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-[#1A2540] border border-[#6382BF]/25 flex items-center justify-center text-[#4A7BF7] shrink-0">
                      {settings.soundEffectsEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
                    </div>
                    <div>
                      <div className="font-semibold text-[#E8ECF4]">Exam Timer Sound Chime</div>
                      <div className="text-[11px] text-[#7B8FAD]">
                        Play an audio alert when the countdown expires
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => playExamChime(true)}
                      className="px-2.5 py-1.5 rounded-lg bg-[#1A2540] border border-[#6382BF]/30 hover:border-[#4A7BF7]/50 text-[11px] text-[#7B8FAD] hover:text-[#E8ECF4] transition-colors"
                    >
                      Test
                    </button>
                    <ToggleSwitch
                      checked={settings.soundEffectsEnabled}
                      onToggle={() => updateLocalSetting('soundEffectsEnabled', !settings.soundEffectsEnabled)}
                      ariaLabel="Toggle exam timer sound chime"
                    />
                  </div>
                </div>

                {/* Auto-scroll Next Question */}
                <div className="rounded-xl bg-[#0A1020] border border-[#6382BF]/25 p-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-[#1A2540] border border-[#6382BF]/25 flex items-center justify-center text-[#4A7BF7] shrink-0">
                      <ArrowUpToLine size={15} />
                    </div>
                    <div>
                      <div className="font-semibold text-[#E8ECF4]">Auto-Scroll to Top on Next Question</div>
                      <div className="text-[11px] text-[#7B8FAD]">
                        Resets scroll position cleanly when switching questions
                      </div>
                    </div>
                  </div>
                  <ToggleSwitch
                    checked={settings.autoScrollNextQuestion}
                    onToggle={() => updateLocalSetting('autoScrollNextQuestion', !settings.autoScrollNextQuestion)}
                    ariaLabel="Toggle auto-scroll on question change"
                  />
                </div>

                {/* Confirm Before Exiting Unfinished Practice */}
                <div className="rounded-xl bg-[#0A1020] border border-[#6382BF]/25 p-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-[#1A2540] border border-[#6382BF]/25 flex items-center justify-center text-[#4A7BF7] shrink-0">
                      <ShieldAlert size={15} />
                    </div>
                    <div>
                      <div className="font-semibold text-[#E8ECF4]">Confirm Before Leaving Active Paper</div>
                      <div className="text-[11px] text-[#7B8FAD]">
                        Prompt before closing Practice Mode when marks are recorded
                      </div>
                    </div>
                  </div>
                  <ToggleSwitch
                    checked={settings.confirmBeforeExit}
                    onToggle={() => updateLocalSetting('confirmBeforeExit', !settings.confirmBeforeExit)}
                    ariaLabel="Toggle confirmation before closing unfinished practice"
                  />
                </div>

                {/* PDF Fit & Motion Preference */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="rounded-xl bg-[#0A1020] border border-[#6382BF]/25 p-4 space-y-2.5">
                    <div className="flex items-center gap-2 font-semibold text-[#E8ECF4]">
                      <FileText size={14} className="text-[#4A7BF7]" />
                      <span>Default PDF Zoom</span>
                    </div>
                    <div className="grid grid-cols-2 gap-1.5">
                      {([
                        ['FitH', 'Fit Width'],
                        ['Fit', 'Fit Page'],
                      ] as [PdfFitDefault, string][]).map(([val, label]) => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => updateLocalSetting('defaultPdfFit', val)}
                          className={`py-1.5 rounded-lg text-[11px] font-semibold border transition-colors ${
                            settings.defaultPdfFit === val
                              ? 'bg-[#4A7BF7] text-white border-[#4A7BF7]'
                              : 'bg-[#1A2540] text-[#7B8FAD] border-[#6382BF]/30 hover:text-[#E8ECF4]'
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-xl bg-[#0A1020] border border-[#6382BF]/25 p-4 space-y-2.5">
                    <div className="flex items-center gap-2 font-semibold text-[#E8ECF4]">
                      <Sparkles size={14} className="text-[#4A7BF7]" />
                      <span>Animations &amp; Motion</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      {([
                        ['user', 'System'],
                        ['never', 'Full'],
                        ['always', 'Reduced'],
                      ] as [MotionMode, string][]).map(([val, label]) => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => updateLocalSetting('reducedMotion', val)}
                          className={`py-1.5 rounded-lg text-[11px] font-semibold border transition-colors ${
                            settings.reducedMotion === val
                              ? 'bg-[#4A7BF7] text-white border-[#4A7BF7]'
                              : 'bg-[#1A2540] text-[#7B8FAD] border-[#6382BF]/30 hover:text-[#E8ECF4]'
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'data' && (
              <motion.div
                key="data"
                variants={contentFadeVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="space-y-4"
              >
                {/* Export Attempt History */}
                <div className="rounded-xl bg-[#0A1020] border border-[#6382BF]/25 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="font-semibold text-[#E8ECF4]">
                      Export Attempt History ({attemptCount})
                    </div>
                    <div className="text-[11px] text-[#7B8FAD]">
                      Download a local backup of your recorded paper scores and timings.
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      disabled={attemptCount === 0}
                      onClick={() => handleExportAttempts('csv')}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1A2540] border border-[#6382BF]/30 hover:border-[#4A7BF7]/60 text-[#E8ECF4] font-semibold disabled:opacity-40 transition-colors"
                    >
                      <Download size={12} className="text-[#4A7BF7]" />
                      <span>CSV</span>
                    </button>
                    <button
                      type="button"
                      disabled={attemptCount === 0}
                      onClick={() => handleExportAttempts('json')}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1A2540] border border-[#6382BF]/30 hover:border-[#4A7BF7]/60 text-[#E8ECF4] font-semibold disabled:opacity-40 transition-colors"
                    >
                      <Download size={12} className="text-[#4A7BF7]" />
                      <span>JSON</span>
                    </button>
                  </div>
                </div>

                {/* Clear In-Progress Drafts */}
                <div className="rounded-xl bg-[#0A1020] border border-[#6382BF]/25 p-4 flex items-center justify-between gap-4">
                  <div>
                    <div className="font-semibold text-[#E8ECF4]">
                      In-Progress Drafts ({draftCount})
                    </div>
                    <div className="text-[11px] text-[#7B8FAD]">
                      Clears unfinished question scores saved locally in this browser.
                    </div>
                  </div>
                  {draftCount === 0 ? (
                    <span className="text-[11px] text-[#7B8FAD] shrink-0">None</span>
                  ) : confirmClearDrafts ? (
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={handleClearDrafts}
                        className="px-2.5 py-1 rounded-lg bg-rose-500/20 border border-rose-500/40 text-rose-200 font-semibold hover:bg-rose-500/30"
                      >
                        Confirm
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmClearDrafts(false)}
                        className="px-2.5 py-1 rounded-lg bg-[#1A2540] border border-[#6382BF]/30 text-[#7B8FAD] hover:text-[#E8ECF4]"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setConfirmClearDrafts(true)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1A2540] border border-[#6382BF]/30 hover:border-rose-400/50 text-[#7B8FAD] hover:text-rose-200 font-medium shrink-0 transition-colors"
                    >
                      <Trash2 size={12} />
                      <span>Clear Drafts</span>
                    </button>
                  )}
                </div>

                {/* Clear Local History */}
                <div className="rounded-xl bg-[#0A1020] border border-[#6382BF]/25 p-4 flex items-center justify-between gap-4">
                  <div>
                    <div className="font-semibold text-[#E8ECF4]">
                      Local Attempt History ({attemptCount})
                    </div>
                    <div className="text-[11px] text-[#7B8FAD]">
                      Clears attempts stored in this browser (does not delete cloud records).
                    </div>
                  </div>
                  {attemptCount === 0 ? (
                    <span className="text-[11px] text-[#7B8FAD] shrink-0">Empty</span>
                  ) : confirmClearAttempts ? (
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={handleClearAttempts}
                        className="px-2.5 py-1 rounded-lg bg-rose-500/20 border border-rose-500/40 text-rose-200 font-semibold hover:bg-rose-500/30"
                      >
                        Confirm
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmClearAttempts(false)}
                        className="px-2.5 py-1 rounded-lg bg-[#1A2540] border border-[#6382BF]/30 text-[#7B8FAD] hover:text-[#E8ECF4]"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setConfirmClearAttempts(true)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1A2540] border border-[#6382BF]/30 hover:border-rose-400/50 text-[#7B8FAD] hover:text-rose-200 font-medium shrink-0 transition-colors"
                    >
                      <Trash2 size={12} />
                      <span>Clear Local History</span>
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};
