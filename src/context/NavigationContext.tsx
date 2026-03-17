import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

type Page = 'home' | 'projects' | 'contact' | 'login' | 'signup';

interface NavigationContextType {
  currentPage: Page;
  setPage: (page: Page) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within NavigationProvider');
  }
  return context;
};

interface NavigationProviderProps {
  children: ReactNode;
}

const getInitialPage = (): Page => {
  const authMode = new URLSearchParams(window.location.search).get('auth');
  if (authMode === 'login' || authMode === 'signup') {
    return authMode;
  }
  return 'home';
};

export const NavigationProvider = ({ children }: NavigationProviderProps) => {
  const [currentPage, setCurrentPage] = useState<Page>(getInitialPage);

  const setPage = (page: Page) => {
    const cleanUrl = `${window.location.pathname}${window.location.hash}`;
    window.history.replaceState({}, '', cleanUrl);
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <NavigationContext.Provider value={{ currentPage, setPage }}>
      {children}
    </NavigationContext.Provider>
  );
};
