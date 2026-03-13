import type { IconType } from 'react-icons';
import {
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

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  featured?: boolean;
}

const ProjectCard = ({ title, description, tags, featured }: ProjectCardProps) => {
  const techIcons: Record<string, { Icon: IconType; color: string }> = {
    React: { Icon: SiReact, color: 'hover:text-[#61DAFB]' },
    'Node.js': { Icon: SiNodedotjs, color: 'hover:text-[#5FA04E]' },
    PostgreSQL: { Icon: SiPostgresql, color: 'hover:text-[#4169E1]' },
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
          {tags.slice(0, 3).map((tag) => {
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
      </div>

    </div>
  );
};

export default ProjectCard;
