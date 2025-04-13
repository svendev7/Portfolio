import React from 'react';
import { useLanguage } from '@/lib/contexts/LanguageContext';

const ProjectCard: React.FC<{ project: any }> = ({ project }) => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
        {project.title}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        {t.projects.descriptions[project.id]}
      </p>
    </div>
  );
};

export default ProjectCard; 