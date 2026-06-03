/**
 * Design system constants — mirrors src/styles/tokens.css and DESIGN.md
 */
export const design = {
  colors: {
    light: {
      bgPrimary: '#ffffff',
      bgSecondary: '#f5f5f7',
      textPrimary: '#1d1d1f',
      textSecondary: '#6e6e73',
      accent: '#0071e3',
      cta: '#1d1d1f',
    },
    dark: {
      bgPrimary: '#000000',
      bgSecondary: '#1c1c1e',
      textPrimary: '#f5f5f7',
      textSecondary: '#a1a1a6',
      accent: '#2997ff',
      cta: '#f5f5f7',
    },
  },
  typography: {
    fontFamily: 'Inter Variable, Inter, system-ui, sans-serif',
    readingWidth: '42rem',
    contentWidth: '72rem',
  },
  spacing: {
    sectionY: { mobile: '4rem', desktop: '6rem' },
    cardPadding: '2rem',
  },
  radius: {
    button: '9999px',
    card: '18px',
    input: '8px',
  },
  motion: {
    themeStorageKey: 'fth-theme',
    easeStandard: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
    durationNormal: 250,
  },
} as const;
