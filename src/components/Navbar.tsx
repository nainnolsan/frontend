import { useNavigation } from '../context/NavigationContext';

const Navbar = () => {
  const { setPage } = useNavigation();
  
  return (
    <nav className="sticky top-0 z-40 w-full bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <a href="#" className="text-xl font-bold text-black dark:text-white hover:opacity-70 transition-opacity">
            Nain.
          </a>

          {/* Links - Centro */}
          <div className="flex items-center gap-6">
            <a 
              href="#projects" 
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
            >
              Projects
            </a>
            <a 
              href="#contact" 
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
            >
              Contact
            </a>
          </div>

          {/* Botones Sign in / Sign up */}
          <div className="flex items-center gap-3">
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

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
