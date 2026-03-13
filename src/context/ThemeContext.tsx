import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [userPreference, setUserPreference] = useState<boolean>(false);
  const [theme, setTheme] = useState<Theme>(() => {
    // Inicializar desde localStorage o sistema
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme') as Theme | null;
      const hasPreference = localStorage.getItem('hasUserPreference') === 'true';
      if (saved && hasPreference) {
        return saved;
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    // Solo guardar si el usuario ha elegido manualmente
    if (userPreference) {
      localStorage.setItem('theme', theme);
      localStorage.setItem('hasUserPreference', 'true');
    }
  }, [theme, userPreference]);

  // Escuchar cambios del tema del sistema en tiempo real
  useEffect(() => {
    const hasPreference = localStorage.getItem('hasUserPreference') === 'true';
    setUserPreference(hasPreference);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      // Leer siempre desde localStorage para evitar closure stale
      const userHasChosen = localStorage.getItem('hasUserPreference') === 'true';
      if (!userHasChosen) {
        setTheme('matches' in e && e.matches ? 'dark' : 'light');
      }
    };

    // Fallback para iOS Safari < 14 que no soporta addEventListener en MediaQueryList
    try {
      mediaQuery.addEventListener('change', handleChange as (e: MediaQueryListEvent) => void);
    } catch {
      // deprecated API, necesario para Safari < 14
      mediaQuery.addListener(handleChange);
    }

    return () => {
      try {
        mediaQuery.removeEventListener('change', handleChange as (e: MediaQueryListEvent) => void);
      } catch {
        // deprecated API
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  const toggleTheme = () => {
    setUserPreference(true);
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
