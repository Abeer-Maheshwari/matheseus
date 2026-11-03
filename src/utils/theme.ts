export type ThemeId = 'espresso' | 'academic' | 'botanical' | 'swiss';

export interface ThemeOption {
  id: ThemeId;
  name: string;
  subtitle: string;
  previewBg: string;
  previewAccent: string;
}

export const THEMES: ThemeOption[] = [
  {
    id: 'academic',
    name: 'Academic Press',
    subtitle: 'Warm Paper & Oxford Navy',
    previewBg: '#F9F8F5',
    previewAccent: '#1A365D',
  },
  {
    id: 'botanical',
    name: 'Botanical',
    subtitle: 'Stone Linen & Deep Spruce',
    previewBg: '#F4F5F1',
    previewAccent: '#234739',
  },
  {
    id: 'swiss',
    name: 'Swiss',
    subtitle: 'Monochrome & Crimson',
    previewBg: '#FAFAFA',
    previewAccent: '#111111',
  },
  {
    id: 'espresso',
    name: 'Espresso',
    subtitle: 'Warm Stone Dark Mode',
    previewBg: '#2C2620',
    previewAccent: '#865D36',
  },
];

export const getStoredTheme = (): ThemeId => {
  try {
    const saved = localStorage.getItem('matheseus_theme') as ThemeId;
    if (saved && THEMES.some((t) => t.id === saved)) {
      return saved;
    }
  } catch {}
  return 'academic'; // default clean editorial academic theme!
};

export const applyTheme = (themeId: ThemeId) => {
  try {
    localStorage.setItem('matheseus_theme', themeId);
    document.documentElement.setAttribute('data-theme', themeId);
  } catch (e) {
    console.warn('Failed to save theme', e);
  }
};
