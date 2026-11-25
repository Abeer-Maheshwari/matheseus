import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
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
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getSettings, saveSettings } from '../utils/settings';
import { playExamChime } from '../utils/audio';
import { getAllLocalDrafts, clearExamDraft } from '../utils/progressSync';
import { overlayFadeVariants, modalPanelVariants } from '../utils/motion';

interface SettingsModalProps {
  onClose: () => void;
  onOpenAuth: (mode?: 'signin' | 'signup') => void;
}

const GRADE_OPTIONS = ['A*', 'A', 'B', 'C'] as const;

export const SettingsModal: React.FC<SettingsModalProps> = ({
  onClose,
  onOpenAuth,
}) => {
  const { user, profile, syncStatus, updateProfile, refreshSync } = useAuth();
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => getSettings().soundEffectsEnabled);

  const [displayName, setDisplayName] = useState(profile?.displayName || '');
  const [qualFocus, setQualFocus] = useState<'both' | 'maths' | 'further-maths'>(
    profile?.qualificationFocus || 'both'
  );
  const [targetMaths, setTargetMaths] = useState(profile?.targetGradeMaths || 'A*');
  const [targetFm, setTargetFm] = useState(profile?.targetGradeFm || 'A*');
  const [savingProfile, setSavingProfile] = useState(false);
  const [savedNotice, setSavedNotice] = useState(false);
  const [confirmClearDrafts, setConfirmClearDrafts] = useState(false);
  const [draftCount, setDraftCount] = useState<number>(() => getAllLocalDrafts().length);

  useEffect(() => {
    if (profile) {
      setDisplayName(profile.displayName);
      setQualFocus(profile.qualificationFocus);
      setTargetMaths(profile.targetGradeMaths);
      setTargetFm(profile.targetGradeFm);
    }
  }, [profile]);

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    saveSettings({ soundEffectsEnabled: next });
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSavingProfile(true);
    await updateProfile({
      displayName: displayName.trim() || profile?.displayName || 'Student',
      qualificationFocus: qualFocus,
      targetGradeMaths: targetMaths,
      targetGradeFm: targetFm,
    });
    setSavingProfile(false);
    setSavedNotice(true);
    window.setTimeout(() => setSavedNotice(false), 2000);
  };

  const handleClearDrafts = () => {
    const drafts = getAllLocalDrafts();
    for (const d of drafts) {
      clearExamDraft(d.paperId);
    }
    setDraftCount(0);
    setConfirmClearDrafts(false);
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
        className="w-full max-w-lg rounded-2xl bg-[#1A2540] border border-[#6382BF]/35 shadow-2xl overflow-hidden text-[#E8ECF4] font-sans"
      >
        {/* Header */}
        <div className="px-6 py-4 bg-[#0A1020]/60 border-b border-[#6382BF]/25 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#4A7BF7]/15 border border-[#4A7BF7]/35 flex items-center justify-center text-[#4A7BF7]">
              <SettingsIcon size={16} />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#E8ECF4]">Settings</h2>
              <p className="text-[11px] text-[#7B8FAD]">Preferences, goals &amp; account sync</p>
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

        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto text-xs">
          {/* Practice & Audio Preferences */}
          <div className="space-y-3">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#7B8FAD]">
              Practice Preferences
            </div>
            <div className="rounded-xl bg-[#0A1020] border border-[#6382BF]/25 p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-[#1A2540] border border-[#6382BF]/25 flex items-center justify-center text-[#4A7BF7] shrink-0">
                  {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
                </div>
                <div>
                  <div className="font-semibold text-[#E8ECF4]">Exam Timer Sound Chime</div>
                  <div className="text-[11px] text-[#7B8FAD]">
                    Play an audio alert when the countdown timer finishes
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
                <button
                  type="button"
                  onClick={handleToggleSound}
                  role="switch"
                  aria-checked={soundEnabled}
                  className={`w-10 h-5.5 rounded-full p-0.5 transition-colors flex items-center ${
                    soundEnabled ? 'bg-[#4A7BF7]' : 'bg-[#1A2540] border border-[#6382BF]/35'
                  }`}
                >
                  <span
                    className={`w-4 h-4 rounded-full bg-white shadow transition-transform ${
                      soundEnabled ? 'translate-x-[18px]' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Account & Target Goals */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#7B8FAD]">
                Account &amp; Study Goals
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
                    onChange={(e) => setDisplayName(e.target.value)}
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
                        onClick={() => setQualFocus(val)}
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
                      onChange={(e) => setTargetMaths(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-[#1A2540] border border-[#6382BF]/30 text-xs text-[#E8ECF4] focus:outline-none focus:border-[#4A7BF7]"
                    >
                      {GRADE_OPTIONS.map((g) => (
                        <option key={g} value={g}>
                          {g}
                        </option>
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
                      onChange={(e) => setTargetFm(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-[#1A2540] border border-[#6382BF]/30 text-xs text-[#E8ECF4] focus:outline-none focus:border-[#4A7BF7]"
                    >
                      {GRADE_OPTIONS.map((g) => (
                        <option key={g} value={g}>
                          {g}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

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
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#4A7BF7] hover:bg-[#3D6CE0] text-white font-semibold transition-colors disabled:opacity-60"
                  >
                    {savedNotice ? (
                      <>
                        <Check size={13} />
                        <span>Saved</span>
                      </>
                    ) : (
                      <span>{savingProfile ? 'Saving...' : 'Save Changes'}</span>
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
                      Sign in to edit study goals and sync progress across devices.
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

          {/* Local Data */}
          <div className="space-y-3">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#7B8FAD]">
              Local Practice Drafts
            </div>
            <div className="rounded-xl bg-[#0A1020] border border-[#6382BF]/25 p-4 flex items-center justify-between gap-4">
              <div>
                <div className="font-semibold text-[#E8ECF4]">
                  In-progress drafts ({draftCount})
                </div>
                <div className="text-[11px] text-[#7B8FAD]">
                  Clears unfinished question scores stored locally in this browser.
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
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
