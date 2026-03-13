import { useState } from 'react';
import { useNavigation } from '../context/NavigationContext';

const Navbar = () => {
  const { currentPage, setPage } = useNavigation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <nav className="sticky top-0 z-40 w-full bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto px-6 py-4 relative">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <button
            onClick={() => setPage('home')}
            className="text-xl font-bold text-black dark:text-white hover:opacity-70 transition-opacity"
          >
            Nain.
          </button>

          {/* Links - Desktop */}
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => setPage('projects')}
              className={`text-sm transition-colors ${
                currentPage === 'projects'
                  ? 'text-black dark:text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
              }`}
            >
              Projects
            </button>
            <a 
              href="#contact" 
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
            >
              Contact
            </a>
          </div>

          {/* Botones Sign in / Sign up - Desktop */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setPage('login')}
              className="px-4 py-2 text-sm text-black dark:text-white hover:opacity-70 transition-opacity"
            >
              Sign in
            </button>
            <button
              onClick={() => setPage('signup')}
              className="px-4 py-2 text-sm bg-black dark:bg-white text-white dark:text-black rounded-lg hover:opacity-80 transition-opacity"
            >
              Sign up
            </button>
          </div>

          {/* Botón Menú Hamburguesa - Mobile */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden relative z-50 p-2 bg-white/80 dark:bg-black/80 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6 text-gray-900 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-gray-900 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

        </div>

        {/* Overlay con blur para menú mobile */}
        {isMenuOpen && (
          <div 
            className="fixed inset-0 bg-white/30 dark:bg-black/40 backdrop-blur-2xl z-30"
            onClick={() => setIsMenuOpen(false)}
          />
        )}

        {/* Menú Mobile */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 md:hidden mt-0 bg-white/70 dark:bg-black/70 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 shadow-2xl z-40">
            <div className="px-6 py-4 space-y-3">
            <button
              onClick={() => {
                setPage('projects');
                setIsMenuOpen(false);
              }}
              className="block px-4 py-2 text-sm text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition-colors"
            >
              Projects
            </button>
            <a 
              href="#contact" 
              onClick={() => setIsMenuOpen(false)}
              className="block px-4 py-2 text-sm text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition-colors"
            >
              Contact
            </a>
            <div className="pt-2 border-t border-gray-200 dark:border-gray-800 space-y-2">
              <button
                onClick={() => {
                  setPage('login');
                  setIsMenuOpen(false);
                }}
                className="block w-full px-4 py-2 text-sm text-center text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition-colors"
              >
                Sign in
              </button>
              <button
                onClick={() => {
                  setPage('signup');
                  setIsMenuOpen(false);
                }}
                className="block w-full px-4 py-2 text-sm text-center bg-black dark:bg-white text-white dark:text-black rounded-lg hover:opacity-80 transition-opacity"
              >
                Sign up
              </button>
            </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
