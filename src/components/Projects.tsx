import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { Project, projectsData } from '../data/projects';
import { ExternalLink, ArrowRight, X, Download, Code, ExternalLink as LinkIcon, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  if (!project) return null;

  const nextImage = () => {
    const images = project.images || [project.imageUrl || ''];
    setCurrentImageIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    const images = project.images || [project.imageUrl || ''];
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const images = project.images || [project.imageUrl || ''];
  const currentImage = images[currentImageIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80 backdrop-blur-sm">
      <div 
        ref={modalRef}
        className="relative bg-white dark:bg-slate-800 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{project.title}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            aria-label="Close modal"
          >
            <X size={24} className="text-slate-600 dark:text-slate-300" />
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="md:flex">
            {/* Left Column - Images */}
            <div className="md:w-1/2 p-6">
              <div className="relative aspect-video bg-slate-100 dark:bg-slate-700 rounded-xl overflow-hidden">
                <img
                  src={currentImage}
                  alt={`${project.title} screenshot ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
                
                {/* Navigation Arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        prevImage();
                      }}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        nextImage();
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                      aria-label="Next image"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </>
                )}
                
                {/* Image Indicators */}
                {images.length > 1 && (
                  <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentImageIndex
                            ? 'bg-blue-600 dark:bg-blue-500'
                            : 'bg-white/50 hover:bg-white/80'
                        }`}
                        aria-label={`View image ${index + 1} of ${images.length}`}
                      />
                    ))}
                  </div>
                )}
              </div>
              
              {/* Download Button */}
              {project.reportUrl && (
                <div className="mt-6">
                  <a
                    href={project.reportUrl}
                    download
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors w-full"
                  >
                    <Download size={18} />
                    Download Report
                  </a>
                </div>
              )}
            </div>
            
            {/* Right Column - Details */}
            <div className="md:w-1/2 p-6 border-t md:border-t-0 md:border-l border-slate-200 dark:border-slate-700">
              <div className="space-y-6">
                {/* Project Info */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Project Overview</h3>
                  <p className="text-slate-600 dark:text-slate-300">{project.detailedDescription}</p>
                </div>
                
                {/* Role & Duration */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Role</h4>
                    <p className="text-slate-900 dark:text-white">{project.role}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Duration</h4>
                    <p className="text-slate-900 dark:text-white">{project.duration}</p>
                  </div>
                </div>
                
                {/* Technologies */}
                <div>
                  <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-sm rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Frameworks */}
                {project.frameworks && project.frameworks.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Frameworks & Libraries</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.frameworks.map((framework, index) => (
                        <span key={index} className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 text-sm rounded-full">
                          {framework}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Tools */}
                {project.tools && project.tools.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Tools</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tools.map((tool, index) => (
                        <span key={index} className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 text-sm rounded-full">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Features */}
                {project.features && project.features.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Key Features</h4>
                    <ul className="space-y-2">
                      {project.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="text-green-500 mt-0.5 mr-2 flex-shrink-0" size={16} />
                          <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* Links */}
                <div className="grid grid-cols-2 gap-4 pt-4">
                  {project.sourceCodeUrl && (
                    <a
                      href={project.sourceCodeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-md hover:shadow-lg"
                    >
                      <Code size={18} className="flex-shrink-0" />
                      <span>View Source Code</span>
                    </a>
                  )}
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors shadow-md hover:shadow-lg"
                    >
                      <LinkIcon size={18} className="flex-shrink-0" />
                      <span>View Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const featuredProjects = projectsData.slice(0, 3);

  const openProjectModal = (project: Project) => {
    setSelectedProject(project);
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
  };

  return (
    <section id="projects" className="py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
            {t.projects.title}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              onClick={() => openProjectModal(project)}
              className="group relative bg-slate-50 dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

                {hoveredProject === project.id && project.videoUrl && (
                  <motion.video
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    src={project.videoUrl}
                    autoPlay
                    loop
                    muted
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech, techIdx) => (
                    <span
                      key={techIdx}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm rounded-full font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-3 py-1 bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400 text-sm rounded-full font-medium">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>

                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-600 dark:text-teal-500 font-semibold hover:gap-3 transition-all"
                  >
                    {t.projects.viewProject}
                    <ExternalLink size={18} />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <button
            onClick={() => navigate('/projects')}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-xl font-semibold hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            {t.projects.viewAll}
            <ArrowRight size={20} />
          </button>
        </motion.div>
      </div>
      
      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={closeProjectModal} 
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
