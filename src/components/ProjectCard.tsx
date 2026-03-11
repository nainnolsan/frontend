interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  featured?: boolean;
}

const ProjectCard = ({ title, description, tags, featured }: ProjectCardProps) => {
  return (
    <div className="h-full p-6 bg-white dark:bg-black border-2 border-gray-200 dark:border-gray-800 rounded-2xl hover:border-gray-400 dark:hover:border-gray-600 transition-all flex flex-col">
      
      {/* Featured badge */}
      {featured && (
        <div className="inline-flex items-center gap-1 px-2 py-1 bg-black dark:bg-white text-white dark:text-black rounded-full text-xs font-medium mb-3 self-start">
          ⭐ Featured
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

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 rounded-md text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

    </div>
  );
};

export default ProjectCard;
