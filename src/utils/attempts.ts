import { ExamAttempt } from '../types';
import {
  ATTEMPTS_STORAGE_KEY,
  readLocalAttempts,
  readLocalDoneMap,
  writeLocalDoneMap,
  persistAttemptToCloud,
  deleteAttemptFromCloud,
} from './progressSync';

export const getExamAttempts = (): ExamAttempt[] => {
  return readLocalAttempts();
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

    const doneMap = readLocalDoneMap();
    doneMap[attempt.paperId] = true;
    writeLocalDoneMap(doneMap);

    void persistAttemptToCloud(attempt);

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
    void deleteAttemptFromCloud(idOrPaperId);
    window.dispatchEvent(new CustomEvent('matheseus_attempts_updated'));
    return updated;
  } catch (e) {
    console.warn('Failed to delete exam attempt', e);
    return [];
  }
};
