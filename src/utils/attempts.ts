import { ExamAttempt } from '../types';

const ATTEMPTS_STORAGE_KEY = 'matheseus_exam_attempts';

export const getExamAttempts = (): ExamAttempt[] => {
  try {
    const raw = localStorage.getItem(ATTEMPTS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.warn('Failed to load exam attempts from localStorage', e);
    return [];
  }
};

export const getLatestAttemptForPaper = (paperId: string): ExamAttempt | undefined => {
  const attempts = getExamAttempts();
  return attempts.find((a) => a.paperId === paperId);
};

export const getAllLatestAttemptsMap = (): Record<string, ExamAttempt> => {
  const attempts = getExamAttempts();
  const map: Record<string, ExamAttempt> = {};
  for (const a of attempts) {
    if (!map[a.paperId]) {
      map[a.paperId] = a;
    }
  }
  return map;
};

export const saveExamAttempt = (attempt: ExamAttempt): ExamAttempt[] => {
  try {
    const existing = getExamAttempts();
    const updated = [attempt, ...existing.filter((a) => a.id !== attempt.id)];
    localStorage.setItem(ATTEMPTS_STORAGE_KEY, JSON.stringify(updated));

    // Also mark as done in matheseus_done for legacy status checks
    try {
      const doneRaw = localStorage.getItem('matheseus_done');
      const doneMap = doneRaw ? JSON.parse(doneRaw) : {};
      doneMap[attempt.paperId] = true;
      localStorage.setItem('matheseus_done', JSON.stringify(doneMap));
    } catch {}

    // Dispatch custom event so all components react immediately
    window.dispatchEvent(new CustomEvent('matheseus_attempts_updated'));
    return updated;
  } catch (e) {
    console.warn('Failed to save exam attempt', e);
    return [];
  }
};

export const deleteExamAttempt = (idOrPaperId: string): ExamAttempt[] => {
  try {
    const existing = getExamAttempts();
    const updated = existing.filter((a) => a.id !== idOrPaperId && a.paperId !== idOrPaperId);
    localStorage.setItem(ATTEMPTS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('matheseus_attempts_updated'));
    return updated;
  } catch (e) {
    console.warn('Failed to delete exam attempt', e);
    return [];
  }
};
