import { createContext, useContext } from 'react';

enum ThemeModes {
  Light = 'light',
  Dark = 'dark',
}

type ThemeContextType = {
  themeMode: ThemeModes;
  setThemeMode: (mode: ThemeModes) => void;
};

const useTheme = (): ThemeContextType => {
  const value = useContext(ThemeContext);
  if (!value) {
    throw new Error('useTheme must be wrapped in a <ThemeProvider />');
  }
  return value;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export { ThemeContext, ThemeModes, useTheme };
