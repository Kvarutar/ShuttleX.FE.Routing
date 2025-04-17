import { useEffect, useState } from 'react';

import { ThemeContext, ThemeModes } from './context';

const ThemeProvider = ({ children }: { children: React.ReactNode }): React.ReactNode => {
  const [themeMode, setThemeMode] = useState<ThemeModes>(ThemeModes.Light);

  useEffect(() => {
    document.getElementById(`${themeMode}-theme`)?.setAttribute('media', 'all');
    document.getElementById(`${themeMode}-theme`)?.removeAttribute('disabled');

    for (const mode of Object.values(ThemeModes)) {
      if (mode !== themeMode) {
        document.getElementById(`${mode}-theme`)?.setAttribute('media', 'not all');
        document.getElementById(`${mode}-theme`)?.setAttribute('disabled', '');
      }
    }
  }, [themeMode]);

  return <ThemeContext.Provider value={{ themeMode, setThemeMode }}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
