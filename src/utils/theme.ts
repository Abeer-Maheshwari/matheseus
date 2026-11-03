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

/* ========================================================
   Font Options
   ======================================================== */
export type FontId = 'libre' | 'garamond' | 'technical' | 'editorial';

export interface FontOption {
  id: FontId;
  name: string;
  subtitle: string;
  sample: string;
}

export const FONTS: FontOption[] = [
  {
    id: 'libre',
    name: 'Libre Classic',
    subtitle: 'Baskerville + Franklin',
    sample: 'Ag',
  },
  {
    id: 'garamond',
    name: 'Academic Garamond',
    subtitle: 'EB Garamond + Newsreader',
    sample: 'Ag',
  },
  {
    id: 'technical',
    name: 'Swiss Technical',
    subtitle: 'Work Sans + Public Sans',
    sample: 'Ag',
  },
  {
    id: 'editorial',
    name: 'Literary Editorial',
    subtitle: 'Literata + Franklin',
    sample: 'Ag',
  },
];

export const getStoredFont = (): FontId => {
  try {
    const saved = localStorage.getItem('matheseus_font') as FontId;
    if (saved && FONTS.some((f) => f.id === saved)) {
      return saved;
    }
  } catch {}
  return 'libre';
};

export const applyFont = (fontId: FontId) => {
  try {
    localStorage.setItem('matheseus_font', fontId);
    document.documentElement.setAttribute('data-font', fontId);
  } catch (e) {
    console.warn('Failed to save font', e);
  }
};

