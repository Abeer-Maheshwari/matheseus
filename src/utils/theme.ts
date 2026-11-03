export type ThemeId = 'midnight';
export type FontId = 'space';

export const applyTheme = (themeId: ThemeId = 'midnight') => {
  try {
    localStorage.setItem('matheseus_theme', themeId);
    document.documentElement.setAttribute('data-theme', themeId);
  } catch (e) {
    console.warn('Failed to save theme', e);
  }
};

export const applyFont = (fontId: FontId = 'space') => {
  try {
    localStorage.setItem('matheseus_font', fontId);
    document.documentElement.setAttribute('data-font', fontId);
  } catch (e) {
    console.warn('Failed to save font', e);
  }
};
