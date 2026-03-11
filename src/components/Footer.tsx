const Footer = () => {
  return (
    <footer className="bg-black dark:bg-white text-white dark:text-black transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pb-8 border-b border-white/10 dark:border-black/10">
          <div className="text-center md:text-left">
            <div className="text-2xl font-bold mb-2">Nain.</div>
            <p className="text-white/70 dark:text-black/70">Creating amazing digital experiences</p>
          </div>
          <div className="flex gap-8">
            <a href="#" className="text-white dark:text-black hover:text-white/70 dark:hover:text-black/70 transition-colors font-medium">
              LinkedIn
            </a>
            <a href="#" className="text-white dark:text-black hover:text-white/70 dark:hover:text-black/70 transition-colors font-medium">
              GitHub
            </a>
            <a href="#" className="text-white dark:text-black hover:text-white/70 dark:hover:text-black/70 transition-colors font-medium">
              Twitter
            </a>
            <a href="#" className="text-white dark:text-black hover:text-white/70 dark:hover:text-black/70 transition-colors font-medium">
              Dribbble
            </a>
          </div>
        </div>
        <div className="pt-8 text-center">
          <p className="text-white/70 dark:text-black/70 text-sm">&copy; 2026 Nain Nolasco. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
