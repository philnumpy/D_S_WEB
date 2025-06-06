import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const ProjectCard = ({ project }) => {
  console.log(project.features);

  return (
    <Link 
      to={`/projects/${project.id}`}
      className="group block bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in"
    >
      <div className="aspect-video overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium">
            {project.category}
          </span>
          <ArrowRight className="w-4 h-4 text-gray-400 dark:text-gray-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-200" />
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors">
          {project.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {project.features.slice(0, 3).map((tech, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded text-xs"
            >
              {tech}
            </span>
          ))}
          {project.features.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded text-xs">
              +{project.features.length - 3} more
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
