export type DefaultLandingTab = 'dashboard' | 'maths' | 'topics';
export type PracticeTimingDefault = 'timed' | 'untimed';
export type PdfFitDefault = 'FitH' | 'Fit';
export type MotionMode = 'user' | 'always' | 'never';

export interface UserSettings {
  soundEffectsEnabled: boolean;
  defaultLandingTab: DefaultLandingTab;
  defaultTimingMode: PracticeTimingDefault;
  autoScrollNextQuestion: boolean;
  confirmBeforeExit: boolean;
  defaultPdfFit: PdfFitDefault;
  reducedMotion: MotionMode;
}

const SETTINGS_KEY = 'matheseus_settings';

const DEFAULT_SETTINGS: UserSettings = {
  soundEffectsEnabled: true,
  defaultLandingTab: 'dashboard',
  defaultTimingMode: 'timed',
  autoScrollNextQuestion: true,
  confirmBeforeExit: true,
  defaultPdfFit: 'FitH',
  reducedMotion: 'user',
};

export function getSettings(): UserSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    const parsed = JSON.parse(raw) as Partial<UserSettings>;
    return {
      soundEffectsEnabled:
        typeof parsed.soundEffectsEnabled === 'boolean'
          ? parsed.soundEffectsEnabled
          : DEFAULT_SETTINGS.soundEffectsEnabled,
      defaultLandingTab:
        parsed.defaultLandingTab === 'maths' ||
        parsed.defaultLandingTab === 'topics' ||
        parsed.defaultLandingTab === 'dashboard'
          ? parsed.defaultLandingTab
          : DEFAULT_SETTINGS.defaultLandingTab,
      defaultTimingMode:
        parsed.defaultTimingMode === 'untimed' || parsed.defaultTimingMode === 'timed'
          ? parsed.defaultTimingMode
          : DEFAULT_SETTINGS.defaultTimingMode,
      autoScrollNextQuestion:
        typeof parsed.autoScrollNextQuestion === 'boolean'
          ? parsed.autoScrollNextQuestion
          : DEFAULT_SETTINGS.autoScrollNextQuestion,
      confirmBeforeExit:
        typeof parsed.confirmBeforeExit === 'boolean'
          ? parsed.confirmBeforeExit
          : DEFAULT_SETTINGS.confirmBeforeExit,
      defaultPdfFit:
        parsed.defaultPdfFit === 'Fit' || parsed.defaultPdfFit === 'FitH'
          ? parsed.defaultPdfFit
          : DEFAULT_SETTINGS.defaultPdfFit,
      reducedMotion:
        parsed.reducedMotion === 'always' ||
        parsed.reducedMotion === 'never' ||
        parsed.reducedMotion === 'user'
          ? parsed.reducedMotion
          : DEFAULT_SETTINGS.reducedMotion,
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(patch: Partial<UserSettings>): UserSettings {
  const next = { ...getSettings(), ...patch };
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(next));
    window.dispatchEvent(new CustomEvent('matheseus_settings_updated', { detail: next }));
  } catch (e) {
    console.warn('Failed to save settings', e);
  }
  return next;
}
