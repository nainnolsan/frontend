import type { IconType } from 'react-icons';
import {
  SiDocker,
  SiGraphql,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiSocketdotio,
  SiStripe,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si';
import { TbApi } from 'react-icons/tb';
import { FiDatabase, FiExternalLink, FiFileText, FiKey, FiLock, FiServer } from 'react-icons/fi';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  featured?: boolean;
  docUrl?: string;
  projectUrl?: string;
}

const ProjectCard = ({ title, description, tags, featured, docUrl, projectUrl }: ProjectCardProps) => {
  const techIcons: Record<string, { Icon: IconType; color: string }> = {
    React: { Icon: SiReact, color: 'hover:text-[#61DAFB]' },
    'Node.js': { Icon: SiNodedotjs, color: 'hover:text-[#5FA04E]' },
    Express: { Icon: FiServer, color: 'hover:text-gray-900 dark:hover:text-white' },
    PostgreSQL: { Icon: SiPostgresql, color: 'hover:text-[#4169E1]' },
    TypeORM: { Icon: FiDatabase, color: 'hover:text-[#EF4444]' },
    JWT: { Icon: FiKey, color: 'hover:text-[#F59E0B]' },
    Bcrypt: { Icon: FiLock, color: 'hover:text-[#14B8A6]' },
    Docker: { Icon: SiDocker, color: 'hover:text-[#2496ED]' },
    Stripe: { Icon: SiStripe, color: 'hover:text-[#635BFF]' },
    GraphQL: { Icon: SiGraphql, color: 'hover:text-[#E10098]' },
    WebSocket: { Icon: SiSocketdotio, color: 'hover:text-gray-900 dark:hover:text-white' },
    TypeScript: { Icon: SiTypescript, color: 'hover:text-[#3178C6]' },
    Tailwind: { Icon: SiTailwindcss, color: 'hover:text-[#06B6D4]' },
    APIs: { Icon: TbApi, color: 'hover:text-[#22C55E]' },
  };

  return (
    <div className="h-full p-6 bg-white dark:bg-black border-2 border-gray-200 dark:border-gray-800 rounded-2xl hover:border-gray-400 dark:hover:border-gray-600 transition-all flex flex-col">
      
      {/* Featured badge */}
      {featured && (
        <div className="inline-flex items-center gap-1 px-2 py-1 bg-black dark:bg-white text-white dark:text-black rounded-full text-xs font-medium mb-3 self-start">
          Featured
        </div>
      )}

      {/* Content */}
      <div className="flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-black dark:text-white mb-2">
          {title}
        </h3>
        
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 flex-1">
          {description}
        </p>

        {/* Tech icons */}
        <div className="flex flex-wrap items-center gap-3">
          {tags.map((tag) => {
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

        {/* Actions */}
        {(docUrl || projectUrl) && (
          <div className="mt-5 flex items-center justify-end gap-3">
            {docUrl && (
              <a
                href={docUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-sm font-medium text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
              >
                Read
                <FiFileText className="w-4 h-4" />
              </a>
            )}
            {projectUrl && (
              <a
                href={projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-sm font-medium text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
              >
                View
                <FiExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        )}
      </div>

    </div>
  );
};

export default ProjectCard;
