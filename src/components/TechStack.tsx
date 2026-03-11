const TechStack = () => {
  const technologies = [
    { name: 'React', icon: '⚛️', color: 'from-cyan-400 to-blue-500' },
    { name: 'TypeScript', icon: 'TS', color: 'from-blue-500 to-blue-600' },
    { name: 'Node.js', icon: '⬢', color: 'from-green-500 to-green-600' },
    { name: 'PostgreSQL', icon: '🐘', color: 'from-blue-600 to-indigo-600' },
    { name: 'GraphQL', icon: '◆', color: 'from-pink-500 to-purple-500' },
    { name: 'Tailwind', icon: '🎨', color: 'from-cyan-400 to-blue-400' },
  ];

  return (
    <div className="h-full p-8 bg-white dark:bg-black border-2 border-gray-200 dark:border-gray-800 rounded-2xl flex flex-col">
      
      {/* Header */}
      <div className="mb-6">
        <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">TECH STACK</p>
        <h2 className="text-2xl font-bold text-black dark:text-white">
          My Technologies
        </h2>
      </div>

      {/* Tech grid */}
      <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-4">
        {technologies.map((tech) => (
          <div
            key={tech.name}
            className="group flex flex-col items-center justify-center gap-2 p-4 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl hover:border-gray-400 dark:hover:border-gray-600 transition-all"
          >
            {/* Icono */}
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${tech.color} flex items-center justify-center text-white font-bold text-sm shadow-md`}>
              {tech.icon}
            </div>
            {/* Nombre */}
            <p className="text-xs font-medium text-black dark:text-white text-center">
              {tech.name}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default TechStack;
