/**
 * Theme Switcher Utility
 * 
 * Available themes:
 * - ocean: Deep Blue & Amber (Default)
 * - forest: Green & Earth Tones
 * - sunset: Orange & Pink Gradients
 * - midnight: Dark-First Pure Black (OLED)
 * - corporate: Professional Grays & Navy
 */

export type ThemeName = 'ocean' | 'forest' | 'sunset' | 'midnight' | 'corporate';

export type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeConfig {
  theme: ThemeName;
  mode: ThemeMode;
}

const THEME_STORAGE_KEY = 'vormir-theme';
const MODE_STORAGE_KEY = 'vormir-theme-mode';

/**
 * Get the current system theme preference
 */
export function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/**
 * Get the stored theme preference
 */
export function getStoredTheme(): ThemeName {
  if (typeof window === 'undefined') return 'ocean';
  return (localStorage.getItem(THEME_STORAGE_KEY) as ThemeName) || 'ocean';
}

/**
 * Get the stored mode preference
 */
export function getStoredMode(): ThemeMode {
  if (typeof window === 'undefined') return 'system';
  return (localStorage.getItem(MODE_STORAGE_KEY) as ThemeMode) || 'system';
}

/**
 * Apply theme to document
 */
export function applyTheme(theme: ThemeName, mode: ThemeMode = 'system'): void {
  if (typeof window === 'undefined') return;

  const root = document.documentElement;
  
  // Set theme data attribute
  root.setAttribute('data-theme', theme);
  
  // Determine effective mode
  const effectiveMode = mode === 'system' ? getSystemTheme() : mode;
  
  // Apply dark class
  if (effectiveMode === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
  
  // Store preferences
  localStorage.setItem(THEME_STORAGE_KEY, theme);
  localStorage.setItem(MODE_STORAGE_KEY, mode);
}

/**
 * Set the theme
 */
export function setTheme(theme: ThemeName): void {
  const currentMode = getStoredMode();
  applyTheme(theme, currentMode);
}

/**
 * Set the mode (light/dark/system)
 */
export function setMode(mode: ThemeMode): void {
  const currentTheme = getStoredTheme();
  applyTheme(currentTheme, mode);
}

/**
 * Toggle between light and dark mode
 */
export function toggleMode(): void {
  const currentMode = getStoredMode();
  const effectiveMode = currentMode === 'system' ? getSystemTheme() : currentMode;
  const newMode = effectiveMode === 'dark' ? 'light' : 'dark';
  setMode(newMode);
}

/**
 * Get current theme configuration
 */
export function getThemeConfig(): ThemeConfig {
  return {
    theme: getStoredTheme(),
    mode: getStoredMode(),
  };
}

/**
 * Initialize theme on page load
 */
export function initTheme(): void {
  if (typeof window === 'undefined') return;

  const theme = getStoredTheme();
  const mode = getStoredMode();
  
  applyTheme(theme, mode);
  
  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    const currentMode = getStoredMode();
    if (currentMode === 'system') {
      const currentTheme = getStoredTheme();
      applyTheme(currentTheme, 'system');
    }
  });
}

// Auto-initialize if running in browser
if (typeof window !== 'undefined') {
  // Apply theme immediately to prevent flash
  const theme = getStoredTheme();
  const mode = getStoredMode();
  const effectiveMode = mode === 'system' ? getSystemTheme() : mode;
  
  document.documentElement.setAttribute('data-theme', theme);
  if (effectiveMode === 'dark') {
    document.documentElement.classList.add('dark');
  }
}
