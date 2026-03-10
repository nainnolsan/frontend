import { useState, useEffect } from 'react';
import { useNavigation } from '../context/NavigationContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { setPage } = useNavigation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMenuOpen(false);
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-md border-b border-gray-200' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a 
            href="#home" 
            onClick={(e) => handleNavClick(e, '#home')}
            className="text-xl font-bold text-black hover:opacity-70 transition-opacity"
          >
            Nain.
          </a>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center space-x-1">
            {[
              { href: '#home', label: 'Home' },
              { href: '#about', label: 'About' },
              { href: '#projects', label: 'Projects' },
              { href: '#skills', label: 'Skills' },
              { href: '#contact', label: 'Contact' },
            ].map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="px-4 py-2 text-sm text-gray-700 hover:text-black transition-colors"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Auth Buttons (Desktop) */}
          <div className="hidden md:flex items-center space-x-3">
            <button
              onClick={() => setPage('login')}
              className="px-4 py-2 text-sm text-gray-700 hover:text-black transition-colors"
            >
              Sign in
            </button>
            <button
              onClick={() => setPage('signup')}
              className="px-4 py-2 text-sm bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
            >
              Sign up
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-black transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-200 ease-in-out ${
          isMenuOpen 
            ? 'max-h-96 border-b border-gray-200' 
            : 'max-h-0 overflow-hidden'
        }`}
      >
        <div className="bg-white px-6 py-4 space-y-1">
          {[
            { href: '#home', label: 'Home' },
            { href: '#about', label: 'About' },
            { href: '#projects', label: 'Projects' },
            { href: '#skills', label: 'Skills' },
            { href: '#contact', label: 'Contact' },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="block px-4 py-2.5 text-sm text-gray-700 hover:text-black hover:bg-gray-50 rounded-md transition-colors"
            >
              {item.label}
            </a>
          ))}
          <div className="pt-3 mt-3 border-t border-gray-200 space-y-2">
            <button
              onClick={() => {
                setPage('login');
                setIsMenuOpen(false);
              }}
              className="block w-full px-4 py-2.5 text-sm text-center text-gray-700 hover:text-black hover:bg-gray-50 rounded-md transition-colors"
            >
              Sign in
            </button>
            <button
              onClick={() => {
                setPage('signup');
                setIsMenuOpen(false);
              }}
              className="block w-full px-4 py-2.5 text-sm text-center bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
