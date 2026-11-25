import { supabase } from '../lib/supabase';
import { ExamAttempt, ExamDraftData, ExamDraftItem } from '../types';

export const ATTEMPTS_STORAGE_KEY = 'matheseus_exam_attempts';
export const DONE_STORAGE_KEY = 'matheseus_done';
export const DRAFT_PREFIX = 'matheseus_draft_';

let activeSyncUserId: string | null = null;
const draftTimers = new Map<string, number>();

export const setActiveSyncUserId = (userId: string | null) => {
  activeSyncUserId = userId;
};

export const getActiveSyncUserId = () => activeSyncUserId;

export const readLocalAttempts = (): ExamAttempt[] => {
  try {
    const raw = localStorage.getItem(ATTEMPTS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const readLocalDoneMap = (): Record<string, boolean> => {
  try {
    const raw = localStorage.getItem(DONE_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

export const writeLocalDoneMap = (doneMap: Record<string, boolean>) => {
  try {
    localStorage.setItem(DONE_STORAGE_KEY, JSON.stringify(doneMap));
    window.dispatchEvent(new CustomEvent('matheseus_done_updated', { detail: doneMap }));
  } catch (e) {
    console.warn('Failed to save completed map to localStorage', e);
  }
};

export const getAllLocalDrafts = (): ExamDraftItem[] => {
  const drafts: ExamDraftItem[] = [];
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(DRAFT_PREFIX)) {
        const paperId = k.slice(DRAFT_PREFIX.length);
        const raw = localStorage.getItem(k);
        if (!raw) continue;
        const parsed = JSON.parse(raw) as ExamDraftData;
        if (parsed && typeof parsed.currentIndex === 'number') {
          drafts.push({ paperId, ...parsed });
        }
      }
    }
    drafts.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
  } catch {
    // ignore storage errors
  }
  return drafts;
};

const toCloudAttemptRow = (userId: string, a: ExamAttempt) => ({
  id: a.id,
  user_id: userId,
  paper_id: a.paperId,
  paper_code: a.paperCode || null,
  paper_title: a.paperTitle || null,
  achieved_score: a.achievedScore,
  max_score: a.maxScore,
  percentage: a.percentage,
  predicted_grade: a.predictedGrade,
  timing_mode: a.timingMode || 'timed',
  time_spent_seconds: a.timeSpentSeconds ?? 0,
  question_scores: a.questionScores || {},
  subpart_scores: a.subpartScores || {},
  completed_at: a.completedAt,
});

const fromCloudAttemptRow = (r: any): ExamAttempt => ({
  id: String(r.id),
  paperId: String(r.paper_id),
  paperCode: r.paper_code || undefined,
  paperTitle: r.paper_title || undefined,
  completedAt: String(r.completed_at),
  achievedScore: Number(r.achieved_score || 0),
  maxScore: Number(r.max_score || 0),
  percentage: Number(r.percentage || 0),
  predictedGrade: String(r.predicted_grade || 'U'),
  timingMode: r.timing_mode === 'untimed' ? 'untimed' : 'timed',
  timeSpentSeconds: r.time_spent_seconds !== null && r.time_spent_seconds !== undefined ? Number(r.time_spent_seconds) : undefined,
  questionScores: r.question_scores || {},
  subpartScores: r.subpart_scores || {},
});

export const persistAttemptToCloud = async (attempt: ExamAttempt) => {
  if (!supabase || !activeSyncUserId) return;
  try {
    await supabase.from('exam_attempts').upsert(toCloudAttemptRow(activeSyncUserId, attempt), {
      onConflict: 'id',
    });
    await supabase.from('paper_status').upsert(
      {
        user_id: activeSyncUserId,
        paper_id: attempt.paperId,
        completed: true,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id,paper_id' }
    );
  } catch (e) {
    console.warn('Cloud attempt sync failed', e);
  }
};

export const deleteAttemptFromCloud = async (idOrPaperId: string) => {
  if (!supabase || !activeSyncUserId) return;
  try {
    await supabase
      .from('exam_attempts')
      .delete()
      .eq('user_id', activeSyncUserId)
      .or(`id.eq.${idOrPaperId},paper_id.eq.${idOrPaperId}`);
  } catch (e) {
    console.warn('Cloud attempt delete failed', e);
  }
};

export const persistPaperStatusToCloud = async (paperId: string, completed: boolean) => {
  if (!supabase || !activeSyncUserId) return;
  try {
    await supabase.from('paper_status').upsert(
      {
        user_id: activeSyncUserId,
        paper_id: paperId,
        completed,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id,paper_id' }
    );
  } catch (e) {
    console.warn('Cloud paper status sync failed', e);
  }
};

export const saveExamDraft = (paperId: string, draft: ExamDraftData) => {
  try {
    localStorage.setItem(`${DRAFT_PREFIX}${paperId}`, JSON.stringify(draft));
  } catch {
    // ignore storage quota errors
  }

  if (!supabase || !activeSyncUserId) return;
  const userId = activeSyncUserId;
  const existingTimer = draftTimers.get(paperId);
  if (existingTimer) window.clearTimeout(existingTimer);

  const timer = window.setTimeout(async () => {
    draftTimers.delete(paperId);
    if (!supabase || activeSyncUserId !== userId) return;
    try {
      await supabase.from('exam_drafts').upsert(
        {
          user_id: userId,
          paper_id: paperId,
          current_index: draft.currentIndex,
          scores: draft.scores || {},
          subpart_scores: draft.subpartScores || {},
          flagged: draft.flagged || {},
          seconds_remaining: draft.secondsRemaining,
          time_spent: draft.timeSpent,
          timing_mode: draft.timingMode,
          updated_at: new Date(draft.timestamp || Date.now()).toISOString(),
        },
        { onConflict: 'user_id,paper_id' }
      );
    } catch (e) {
      console.warn('Cloud draft sync failed', e);
    }
  }, 1500);

  draftTimers.set(paperId, timer);
};

export const clearExamDraft = (paperId: string) => {
  try {
    localStorage.removeItem(`${DRAFT_PREFIX}${paperId}`);
  } catch {}
  const existingTimer = draftTimers.get(paperId);
  if (existingTimer) {
    window.clearTimeout(existingTimer);
    draftTimers.delete(paperId);
  }
  if (!supabase || !activeSyncUserId) return;
  supabase
    .from('exam_drafts')
    .delete()
    .eq('user_id', activeSyncUserId)
    .eq('paper_id', paperId)
    .then(({ error }) => {
      if (error) console.warn('Cloud draft delete failed', error.message);
    });
};

/**
 * Bidirectional merge between guest localStorage progress and authenticated Supabase tables.
 * Preserves local attempts/done flags/drafts done before signing in without data loss.
 */
export const syncUserProgressOnLogin = async (userId: string) => {
  if (!supabase) return;
  setActiveSyncUserId(userId);

  try {
    const [attRes, statusRes, draftsRes] = await Promise.all([
      supabase
        .from('exam_attempts')
        .select('*')
        .eq('user_id', userId)
        .order('completed_at', { ascending: false }),
      supabase.from('paper_status').select('*').eq('user_id', userId),
      supabase.from('exam_drafts').select('*').eq('user_id', userId),
    ]);

    // 1. Merge exam attempts (union by id)
    const localAttempts = readLocalAttempts();
    const cloudAttempts = (attRes.data || []).map(fromCloudAttemptRow);
    const cloudById = new Map(cloudAttempts.map((a) => [a.id, a]));
    const localOnlyAttempts = localAttempts.filter((a) => !cloudById.has(a.id));

    if (localOnlyAttempts.length > 0) {
      await supabase
        .from('exam_attempts')
        .upsert(localOnlyAttempts.map((a) => toCloudAttemptRow(userId, a)), {
          onConflict: 'id',
        });
    }

    const mergedMap = new Map<string, ExamAttempt>();
    for (const a of [...localOnlyAttempts, ...cloudAttempts]) {
      mergedMap.set(a.id, a);
    }
    const mergedAttempts = Array.from(mergedMap.values()).sort(
      (a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
    );
    localStorage.setItem(ATTEMPTS_STORAGE_KEY, JSON.stringify(mergedAttempts));

    // 2. Merge completed paper flags (OR merge)
    const localDone = readLocalDoneMap();
    const cloudDoneMap: Record<string, boolean> = {};
    for (const row of statusRes.data || []) {
      cloudDoneMap[row.paper_id] = !!row.completed;
    }

    const mergedDone: Record<string, boolean> = { ...cloudDoneMap };
    const statusToUpload: Array<{ user_id: string; paper_id: string; completed: boolean; updated_at: string }> = [];

    for (const [paperId, doneVal] of Object.entries(localDone)) {
      if (doneVal && !cloudDoneMap[paperId]) {
        mergedDone[paperId] = true;
        statusToUpload.push({
          user_id: userId,
          paper_id: paperId,
          completed: true,
          updated_at: new Date().toISOString(),
        });
      }
    }
    for (const a of mergedAttempts) {
      if (!mergedDone[a.paperId]) {
        mergedDone[a.paperId] = true;
        if (!cloudDoneMap[a.paperId]) {
          statusToUpload.push({
            user_id: userId,
            paper_id: a.paperId,
            completed: true,
            updated_at: new Date().toISOString(),
          });
        }
      }
    }

    if (statusToUpload.length > 0) {
      await supabase.from('paper_status').upsert(statusToUpload, {
        onConflict: 'user_id,paper_id',
      });
    }
    writeLocalDoneMap(mergedDone);

    // 3. Merge drafts (latest timestamp wins per paper)
    const localDrafts = getAllLocalDrafts();
    const localDraftMap = new Map(localDrafts.map((d) => [d.paperId, d]));
    const cloudDraftMap = new Map<string, ExamDraftItem>();
    for (const r of draftsRes.data || []) {
      cloudDraftMap.set(r.paper_id, {
        paperId: r.paper_id,
        currentIndex: Number(r.current_index || 0),
        scores: r.scores || {},
        subpartScores: r.subpart_scores || {},
        flagged: r.flagged || {},
        secondsRemaining: Number(r.seconds_remaining || 0),
        timeSpent: Number(r.time_spent || 0),
        timingMode: r.timing_mode === 'untimed' ? 'untimed' : 'timed',
        timestamp: new Date(r.updated_at || Date.now()).getTime(),
      });
    }

    const draftsToUpload: any[] = [];
    for (const [pid, ld] of localDraftMap.entries()) {
      const cd = cloudDraftMap.get(pid);
      if (!cd || (ld.timestamp || 0) > (cd.timestamp || 0)) {
        draftsToUpload.push({
          user_id: userId,
          paper_id: pid,
          current_index: ld.currentIndex,
          scores: ld.scores || {},
          subpart_scores: ld.subpartScores || {},
          flagged: ld.flagged || {},
          seconds_remaining: ld.secondsRemaining,
          time_spent: ld.timeSpent,
          timing_mode: ld.timingMode,
          updated_at: new Date(ld.timestamp || Date.now()).toISOString(),
        });
      }
    }
    if (draftsToUpload.length > 0) {
      await supabase.from('exam_drafts').upsert(draftsToUpload, {
        onConflict: 'user_id,paper_id',
      });
    }
    for (const [pid, cd] of cloudDraftMap.entries()) {
      const ld = localDraftMap.get(pid);
      if (!ld || cd.timestamp > (ld.timestamp || 0)) {
        const { paperId: _omit, ...draftBody } = cd;
        localStorage.setItem(`${DRAFT_PREFIX}${pid}`, JSON.stringify(draftBody));
      }
    }

    window.dispatchEvent(new CustomEvent('matheseus_attempts_updated'));
    window.dispatchEvent(new CustomEvent('matheseus_sync_updated'));
  } catch (e) {
    console.warn('Progress sync failed', e);
  }
};
