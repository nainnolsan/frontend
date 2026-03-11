const Hero = () => {
  const handleContactClick = () => {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-16 px-6">
      <div className="max-w-4xl w-full mx-auto">
        {/* Main Content */}
        <div className="text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-gray-200 dark:border-gray-800 rounded-full text-xs bg-white dark:bg-gray-900">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black dark:bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-black dark:bg-white"></span>
            </span>
            Available for work
          </div>

          {/* Main Title */}
          <div className="space-y-4">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-black dark:text-white leading-tight">
              Nain Nolasco
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Full Stack Developer crafting elegant solutions with modern technologies
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={handleContactClick}
              className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors font-medium text-sm w-full sm:w-auto"
            >
              Get in touch
            </button>
            <a
              href="#projects"
              className="px-6 py-3 border border-gray-300 dark:border-gray-700 text-black dark:text-white rounded-md hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors font-medium text-sm w-full sm:w-auto"
            >
              View my work
            </a>
          </div>

          {/* Tech Stack */}
          <div className="pt-12">
            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4">Tech Stack</p>
            <div className="flex flex-wrap justify-center gap-3">
              {['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'GraphQL', 'Tailwind'].map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-md text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-gray-400 dark:text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;
