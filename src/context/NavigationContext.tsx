import { createContext, useContext, useState, ReactNode } from 'react';

type Page = 'home' | 'login' | 'signup';

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

export const NavigationProvider = ({ children }: NavigationProviderProps) => {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const setPage = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <NavigationContext.Provider value={{ currentPage, setPage }}>
      {children}
    </NavigationContext.Provider>
  );
};
