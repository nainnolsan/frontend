import type { IconType } from 'react-icons';
import {
  SiGraphql,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiSocketdotio,
  SiStripe,
  SiTypescript,
} from 'react-icons/si';
import { TbApi } from 'react-icons/tb';

const Projects = () => {
  const techIcons: Record<string, { Icon: IconType; color: string }> = {
    React: { Icon: SiReact, color: 'hover:text-[#61DAFB]' },
    'Node.js': { Icon: SiNodedotjs, color: 'hover:text-[#5FA04E]' },
    PostgreSQL: { Icon: SiPostgresql, color: 'hover:text-[#4169E1]' },
    Stripe: { Icon: SiStripe, color: 'hover:text-[#635BFF]' },
    GraphQL: { Icon: SiGraphql, color: 'hover:text-[#E10098]' },
    WebSocket: { Icon: SiSocketdotio, color: 'hover:text-gray-900 dark:hover:text-white' },
    TypeScript: { Icon: SiTypescript, color: 'hover:text-[#3178C6]' },
    APIs: { Icon: TbApi, color: 'hover:text-[#22C55E]' },
  };

  const projects = [
    {
      title: "E-commerce Platform",
      description: "Full-stack e-commerce solution with React, Node.js, and PostgreSQL. Features include user authentication, product management, and payment integration.",
      tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
      link: "#",
      featured: true
    },
    {
      title: "Task Management App",
      description: "Real-time collaborative task manager built with React and GraphQL. Supports team workspaces and live updates.",
      tags: ["React", "GraphQL", "WebSocket"],
      link: "#",
      featured: false
    },
    {
      title: "Weather Dashboard",
      description: "Beautiful weather application with location-based forecasts and interactive maps using modern APIs.",
      tags: ["TypeScript", "React", "APIs"],
      link: "#",
      featured: false
    },
  ];

  return (
    <section id="projects" className="py-20 px-6 bg-gray-50 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs text-gray-500 dark:text-gray-500 uppercase tracking-wide mb-3">PORTFOLIO</p>
          <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A selection of projects I've worked on, showcasing my skills and expertise
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <a
              key={index}
              href={project.link}
              className="group block"
            >
              <div className="h-full p-6 bg-white dark:bg-black border-2 border-gray-200 dark:border-gray-800 rounded-xl hover:border-gray-400 dark:hover:border-gray-600 transition-all hover:shadow-xl">
                
                {/* Featured badge */}
                {project.featured && (
                  <div className="inline-flex items-center gap-1 px-3 py-1 bg-black dark:bg-white text-white dark:text-black rounded-full text-xs font-medium mb-4">
                    ⭐ Featured
                  </div>
                )}

                {/* Title */}
                <h3 className="text-xl font-bold text-black dark:text-white mb-3 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Tech icons */}
                <div className="flex flex-wrap items-center gap-3">
                  {project.tags.map((tag) => {
                    const tech = techIcons[tag];

                    if (!tech) {
                      return null;
                    }

                    const Icon = tech.Icon;

                    return (
                      <span
                        key={tag}
                        title={tag}
                        aria-label={tag}
                        className={`text-lg text-gray-500 dark:text-gray-400 transition-colors ${tech.color}`}
                      >
                        <Icon />
                      </span>
                    );
                  })}
                </div>

                {/* Arrow indicator */}
                <div className="mt-4 flex items-center gap-2 text-sm font-medium text-black dark:text-white group-hover:gap-3 transition-all">
                  View Project
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>

              </div>
            </a>
          ))}
        </div>

        {/* Ver más */}
        <div className="text-center mt-12">
          <a
            href="#"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-black dark:border-white text-black dark:text-white rounded-lg hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors font-medium"
          >
            View All Projects
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
};

export default Projects;
