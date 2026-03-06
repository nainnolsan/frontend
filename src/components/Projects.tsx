import { useState } from 'react';
import './Projects.css';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  icon: string;
  gradient: string;
  status: 'Completed' | 'In Progress' | 'Planned';
}

const Projects = () => {
  const [filter, setFilter] = useState<string>('All');

  const projects: Project[] = [
    {
      id: 1,
      title: "E-Commerce App",
      description: "A complete e-commerce platform with shopping cart, secure payments, and admin dashboard.",
      technologies: ["React", "Node.js", "MongoDB"],
      icon: "🛒",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      status: "Completed"
    },
    {
      id: 2,
      title: "Task Manager",
      description: "Task management application with real-time collaboration features and cloud synchronization.",
      technologies: ["Vue.js", "Firebase", "Tailwind"],
      icon: "📱",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      status: "In Progress"
    },
    {
      id: 3,
      title: "Portfolio Website",
      description: "Modern and responsive portfolio website with smooth animations and minimalist design.",
      technologies: ["HTML", "CSS", "JavaScript"],
      icon: "✏️",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      status: "Completed"
    },
    {
      id: 4,
      title: "Analytics Dashboard",
      description: "Analytics panel with interactive visualizations and real-time reports for decision making.",
      technologies: ["Angular", "D3.js", "Python"],
      icon: "📊",
      gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      status: "In Progress"
    },
    {
      id: 5,
      title: "Gaming Platform",
      description: "Multiplayer gaming platform with live chat, rankings, and achievement system.",
      technologies: ["WebSocket", "Express", "Redis"],
      icon: "🎮",
      gradient: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
      status: "Planned"
    },
    {
      id: 6,
      title: "Health Tracker",
      description: "Health tracking application with wearable integration and personalized recommendations.",
      technologies: ["React Native", "GraphQL", "AWS"],
      icon: "🏥",
      gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      status: "Planned"
    }
  ];

  const categories = ['All', 'Completed', 'In Progress', 'Planned'];

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(project => project.status === filter);

  const getStatusClass = (status: string) => {
    switch(status) {
      case 'Completed': return 'status-completed';
      case 'In Progress': return 'status-progress';
      case 'Planned': return 'status-planned';
      default: return '';
    }
  };

  return (
    <section id="projects" className="projects">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Latest Projects</h2>
          <a href="#" className="view-all">View All →</a>
        </div>

        <div className="projects-filters">
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-btn ${filter === category ? 'active' : ''}`}
              onClick={() => setFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>
        
        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-image">
                <div 
                  className="project-placeholder" 
                  style={{ background: project.gradient }}
                >
                  <span className="project-icon">{project.icon}</span>
                </div>
              </div>
              <div className="project-content">
                <div className="project-header">
                  <div className="project-number">
                    {project.id.toString().padStart(2, '0')}
                  </div>
                  <span className={`project-status ${getStatusClass(project.status)}`}>
                    {project.status}
                  </span>
                </div>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tags">
                  {project.technologies.map((tech, idx) => (
                    <span key={idx} className="project-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="no-projects">
            <p>No projects found in this category</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
