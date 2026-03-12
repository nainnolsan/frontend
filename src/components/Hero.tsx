import { 
  SiTypescript, 
  SiPython, 
  SiReact, 
  SiFastapi, 
  SiNextdotjs, 
  SiTailwindcss,
  SiGit,
  SiPostgresql,
  SiPrisma,
  SiMongodb,
  SiGooglecloud
} from 'react-icons/si';
import { BsClaude } from 'react-icons/bs';
import type { IconType } from 'react-icons';

const Hero = () => {
  const technologies: { name: string; Icon: IconType; color: string }[] = [
    { name: 'TypeScript', Icon: SiTypescript, color: 'group-hover:text-[#3178C6]' },
    { name: 'Python', Icon: SiPython, color: 'group-hover:text-[#3776AB]' },
    { name: 'React', Icon: SiReact, color: 'group-hover:text-[#61DAFB]' },
    { name: 'FastAPI', Icon: SiFastapi, color: 'group-hover:text-[#009688]' },
    { name: 'Next.js', Icon: SiNextdotjs, color: 'group-hover:text-gray-900 dark:group-hover:text-white' },
    { name: 'Tailwind', Icon: SiTailwindcss, color: 'group-hover:text-[#06B6D4]' },
    { name: 'Git', Icon: SiGit, color: 'group-hover:text-[#F05032]' },
    { name: 'Postgres', Icon: SiPostgresql, color: 'group-hover:text-[#4169E1]' },
    { name: 'Prisma', Icon: SiPrisma, color: 'group-hover:text-gray-900 dark:group-hover:text-white' },
    { name: 'MongoDB', Icon: SiMongodb, color: 'group-hover:text-[#47A248]' },
    { name: 'GCP', Icon: SiGooglecloud, color: 'group-hover:text-[#4285F4]' },
    { name: 'Claude', Icon: BsClaude, color: 'group-hover:text-[#D97757]' },
  ];

  return (
    <div className="py-8">
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Columna Izquierda - Perfil */}
        <div className="flex flex-col lg:flex-row gap-6 items-center lg:items-center justify-center lg:justify-start">
          
          {/* Imagen circular */}
          <img 
            src="/Perfil_2-removebg-preview.png" 
            alt="Nain Nolasco" 
            className="w-32 h-32 object-cover rounded-full grayscale flex-shrink-0"
          />

          {/* Contenido a la derecha de la imagen */}
          <div className="flex flex-col justify-center items-center lg:items-start space-y-3">
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-gray-300 dark:border-gray-700 rounded-full text-xs w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black dark:bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-black dark:bg-white"></span>
              </span>
              Available for work
            </div>

            {/* Nombre */}
            <h1 className="text-3xl md:text-4xl font-bold text-black dark:text-white text-center lg:text-left">
              Nain Nolasco
            </h1>
            
            {/* Descripción */}
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center lg:text-left">
              Full Stack Developer
            </p>

            {/* Redes sociales */}
            <div className="flex gap-3 pt-2">
            <a 
              href="https://github.com/yourusername" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
            >
              <svg className="w-4 h-4 text-black dark:text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a 
              href="https://linkedin.com/in/yourusername" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
            >
              <svg className="w-4 h-4 text-black dark:text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a 
              href="https://twitter.com/yourusername" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
            >
              <svg className="w-4 h-4 text-black dark:text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>
          </div>
        </div>

        {/* Columna Derecha - Tech Stack */}
        <div className="flex flex-col justify-center">
          
          {/* Header */}
          <div className="mb-6 text-center lg:text-left">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">TECH STACK</p>
            <h2 className="text-2xl font-bold text-black dark:text-white">
              My Technologies
            </h2>
          </div>

          {/* Tech grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {technologies.map((tech) => {
              const Icon = tech.Icon;
              return (
                <div
                  key={tech.name}
                  className="group flex flex-col items-center justify-center gap-2 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-all"
                >
                  {/* Icono */}
                  <Icon className={`w-8 h-8 text-gray-700 dark:text-white transition-colors ${tech.color}`} />
                  {/* Nombre */}
                  <p className="text-[10px] font-medium text-gray-700 dark:text-gray-300 text-center">
                    {tech.name}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

      </div>

    </div>
  );
};

export default Hero;
