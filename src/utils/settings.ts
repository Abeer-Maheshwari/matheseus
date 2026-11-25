export interface UserSettings {
  soundEffectsEnabled: boolean;
}

const SETTINGS_KEY = 'matheseus_settings';

const DEFAULT_SETTINGS: UserSettings = {
  soundEffectsEnabled: true,
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
