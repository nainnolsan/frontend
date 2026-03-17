import { useEffect, useState } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { FiMaximize2, FiPaperclip, FiSearch, FiSend, FiX } from 'react-icons/fi';
import { BsStars } from 'react-icons/bs';

const Navbar = () => {
  const { currentPage, setPage } = useNavigation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [assistantPrompt, setAssistantPrompt] = useState('');

  useEffect(() => {
    const handleKeys = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setIsSearchOpen(true);
      }

      if (event.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeys);
    return () => window.removeEventListener('keydown', handleKeys);
  }, []);

  useEffect(() => {
    const applyDesktopOffset = () => {
      const shouldOffset = isAssistantOpen && window.innerWidth >= 1024;
      document.body.style.transition = 'padding-right 300ms ease';
      document.body.style.paddingRight = shouldOffset ? '360px' : '0px';
      document.documentElement.style.setProperty('--assistant-offset', shouldOffset ? '360px' : '0px');
    };

    applyDesktopOffset();
    window.addEventListener('resize', applyDesktopOffset);

    return () => {
      window.removeEventListener('resize', applyDesktopOffset);
      document.body.style.paddingRight = '0px';
      document.documentElement.style.setProperty('--assistant-offset', '0px');
    };
  }, [isAssistantOpen]);
  
  return (
    <>
    <nav className="sticky top-0 z-40 w-full bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto px-6 py-4 relative">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <button
            onClick={() => setPage('home')}
            className="hover:opacity-70 transition-opacity"
            aria-label="Go to home"
          >
            <img
              src="/Logo.svg"
              alt="Nain logo"
              className="h-8 w-auto brightness-0 dark:brightness-0 dark:invert"
            />
          </button>

          {/* Links - Desktop */}
          <div className="hidden md:flex items-center gap-6">
            {currentPage === 'projects' ? (
              <button
                onClick={() => setPage('home')}
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
              >
                Home
              </button>
            ) : (
              <button
                onClick={() => setPage('projects')}
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
              >
                Projects
              </button>
            )}
            <button
              onClick={() => setPage('contact')}
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
            >
              Contact
            </button>
          </div>

          {/* Search + Ask AI - Desktop */}
          <div className="hidden lg:flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="inline-flex items-center justify-between gap-3 px-4 py-2 rounded-xl border border-gray-300 dark:border-white/15 bg-white dark:bg-black text-left hover:bg-gray-50 dark:hover:bg-white/5 transition-colors min-w-[240px]"
            >
              <span className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-300 text-sm">
                <FiSearch className="w-4 h-4" />
                Search...
              </span>
              <kbd className="px-2 py-1 rounded-md border border-gray-300 dark:border-white/15 text-[11px] text-gray-500 dark:text-gray-400">Ctrl K</kbd>
            </button>

            <button
              type="button"
              onClick={() => setIsAssistantOpen((prev) => !prev)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-300 dark:border-white/15 bg-white dark:bg-black text-sm font-medium text-black dark:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
            >
              <BsStars className="w-4 h-4" />
              Ask AI
            </button>
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
            className="fixed inset-0 bg-black/20 dark:bg-black/50 z-30"
            onClick={() => setIsMenuOpen(false)}
          />
        )}

        {/* Menú Mobile */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 md:hidden mt-0 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 shadow-2xl z-40">
            <div className="px-6 py-4 space-y-3">
            {currentPage === 'projects' ? (
              <button
                onClick={() => {
                  setPage('home');
                  setIsMenuOpen(false);
                }}
                className="block px-4 py-2 text-sm text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition-colors"
              >
                Home
              </button>
            ) : (
              <button
                onClick={() => {
                  setPage('projects');
                  setIsMenuOpen(false);
                }}
                className="block px-4 py-2 text-sm text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition-colors"
              >
                Projects
              </button>
            )}
            <button
              onClick={() => {
                setPage('contact');
                setIsMenuOpen(false);
              }}
              className="block w-full px-4 py-2 text-sm text-left text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition-colors"
            >
              Contact
            </button>
            <button
              type="button"
              onClick={() => {
                setIsSearchOpen(true);
                setIsMenuOpen(false);
              }}
              className="block w-full px-4 py-2 text-sm text-left text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition-colors"
            >
              Search
            </button>
            <button
              type="button"
              onClick={() => {
                setIsAssistantOpen(true);
                setIsMenuOpen(false);
              }}
              className="block w-full px-4 py-2 text-sm text-left text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition-colors"
            >
              Ask AI
            </button>
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

    {isSearchOpen && (
      <div className="fixed inset-0 z-[70]">
        <button
          type="button"
          onClick={() => setIsSearchOpen(false)}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          aria-label="Close search"
        />
        <div className="relative z-10 w-full max-w-2xl mx-auto mt-24 px-4">
          <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0f0f11] shadow-2xl overflow-hidden">
            <div className="p-3 border-b border-gray-200 dark:border-white/10">
              <div className="flex items-center gap-3 rounded-xl border border-gray-300 dark:border-white/10 bg-gray-50 dark:bg-black px-3 py-3">
                <FiSearch className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search docs, projects, technologies..."
                  className="w-full bg-transparent text-base text-black dark:text-white placeholder:text-gray-500 focus:outline-none"
                  autoFocus
                />
                <kbd className="px-2 py-1 rounded-md border border-gray-300 dark:border-white/15 text-[11px] text-gray-500 dark:text-gray-400">ESC</kbd>
              </div>
            </div>

            <div className="p-3 space-y-2 max-h-[60vh] overflow-y-auto">
              <p className="px-2 text-xs uppercase tracking-[0.14em] text-gray-500">Quick Results</p>
              {[
                { title: 'Auth Service REST API', description: 'Authentication docs and API endpoints' },
                { title: 'Task Management App', description: 'Frontend app project details' },
                { title: 'Deployment Guide', description: 'How to deploy your services' },
                { title: 'Architecture', description: 'System design and component map' },
              ].map((item) => (
                <button
                  key={item.title}
                  type="button"
                  className="w-full text-left px-3 py-3 rounded-lg border border-transparent hover:border-gray-300 dark:hover:border-white/15 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                >
                  <p className="text-sm font-semibold text-black dark:text-white">{item.title}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{item.description}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    )}

    {isAssistantOpen && (
      <>
        <button
          type="button"
          onClick={() => setIsAssistantOpen(false)}
          className="fixed inset-0 z-[58] bg-black/40 lg:hidden"
          aria-label="Close assistant"
        />
        <aside className="fixed top-0 right-0 z-[60] h-screen w-full max-w-[360px] bg-white dark:bg-[#09090b] border-l border-gray-200 dark:border-white/10 shadow-2xl flex flex-col">
          <div className="px-4 py-4 border-b border-gray-200 dark:border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2 text-black dark:text-white font-semibold">
              <BsStars className="w-4 h-4" />
              Assistant
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                aria-label="Expand assistant"
                title="Expand"
              >
                <FiMaximize2 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsAssistantOpen(false)}
                className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                aria-label="Close assistant"
                title="Close"
              >
                <FiX className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex-1 p-5 text-center text-sm text-gray-500 dark:text-gray-400">
            Responses are generated using AI and may contain mistakes.
          </div>

          <div className="p-4 border-t border-gray-200 dark:border-white/10">
            <div className="rounded-2xl border border-gray-300 dark:border-white/10 bg-white dark:bg-black p-3">
              <input
                type="text"
                value={assistantPrompt}
                onChange={(e) => setAssistantPrompt(e.target.value)}
                placeholder="Ask a question..."
                className="w-full bg-transparent text-sm text-black dark:text-white placeholder:text-gray-500 focus:outline-none"
              />
              <div className="mt-3 flex items-center justify-between">
                <button
                  type="button"
                  className="p-1.5 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                  aria-label="Attach file"
                >
                  <FiPaperclip className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  className="p-1.5 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                  aria-label="Send"
                >
                  <FiSend className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </aside>
      </>
    )}
    </>
  );
};

export default Navbar;
