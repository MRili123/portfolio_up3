import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project, projectsData } from '../data/projects';
import { Search, ExternalLink, X, Download, ChevronLeft, ChevronRight, CheckCircle, Code } from 'lucide-react';

const AllProjects = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const filteredProjects = useMemo(() => {
    if (!searchQuery.trim()) return projectsData;
    
    const query = searchQuery.toLowerCase();
    return projectsData.filter(project => 
      project.title.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query) ||
      project.technologies.some(tech => tech.toLowerCase().includes(query)) ||
      (project.frameworks?.some(fw => fw.toLowerCase().includes(query))) ||
      (project.tools?.some(tool => tool.toLowerCase().includes(query)))
    );
  }, [searchQuery]);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  const nextImage = () => {
    if (!selectedProject) return;
    const images = selectedProject.images || [selectedProject.imageUrl || ''];
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    if (!selectedProject) return;
    const images = selectedProject.images || [selectedProject.imageUrl || ''];
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-24 pb-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-slate-900 dark:text-white">
            All Projects
          </h1>

          <div className="w-full max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Search projects by name, technology, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-6 py-4 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-slate-900 dark:text-white text-lg shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                  aria-label="Clear search"
                >
                  <X size={20} />
                </button>
              )}
            </div>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {filteredProjects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20"
            >
              <p className="text-xl text-slate-600 dark:text-slate-400">
                No projects found. Try a different search term.
              </p>
            </motion.div>
          ) : (
            <motion.div
              layout
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProjects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  onClick={() => handleProjectClick(project)}
                  className="group relative bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-xl font-bold text-white">{project.title}</h3>
                      <p className="text-slate-200 text-sm mt-1 line-clamp-2">{project.description}</p>
                    </div>

                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm text-slate-900 dark:text-white text-sm rounded-full font-medium">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 4).map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="text-xs text-slate-500">+{project.technologies.length - 4}</span>
                      )}
                    </div>

                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        View Project
                        <ExternalLink size={16} className="ml-1" />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80 backdrop-blur-sm">
              <div className="relative bg-white dark:bg-slate-800 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b border-slate-200 dark:border-slate-700">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{selectedProject.title}</h2>
                  <button
                    onClick={closeModal}
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
                          src={selectedProject.images?.[currentImageIndex] || selectedProject.imageUrl || ''}
                          alt={`${selectedProject.title} screenshot ${currentImageIndex + 1}`}
                          className="w-full h-full object-cover"
                        />
                        
                        {/* Navigation Arrows */}
                        {selectedProject.images && selectedProject.images.length > 1 && (
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
                      </div>
                      
                      {/* Download Button */}
                      {selectedProject.reportUrl && (
                        <div className="mt-6">
                          <a
                            href={selectedProject.reportUrl}
                            download
                            className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors w-full"
                            onClick={(e) => e.stopPropagation()}
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
                          <p className="text-slate-600 dark:text-slate-300">{selectedProject.detailedDescription}</p>
                        </div>
                        
                        {/* Role & Duration */}
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Role</h4>
                            <p className="text-slate-900 dark:text-white">{selectedProject.role || 'N/A'}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Duration</h4>
                            <p className="text-slate-900 dark:text-white">{selectedProject.duration || 'N/A'}</p>
                          </div>
                        </div>
                        
                        {/* Technologies */}
                        <div>
                          <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Technologies</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedProject.technologies.map((tech, index) => (
                              <span key={index} className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-sm rounded-full">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        {/* Frameworks */}
                        {selectedProject.frameworks?.length > 0 && (
                          <div>
                            <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Frameworks & Libraries</h4>
                            <div className="flex flex-wrap gap-2">
                              {selectedProject.frameworks.map((framework, index) => (
                                <span key={index} className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 text-sm rounded-full">
                                  {framework}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {/* Tools */}
                        {selectedProject.tools?.length > 0 && (
                          <div>
                            <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Tools</h4>
                            <div className="flex flex-wrap gap-2">
                              {selectedProject.tools.map((tool, index) => (
                                <span key={index} className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 text-sm rounded-full">
                                  {tool}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {/* Features */}
                        {selectedProject.features && selectedProject.features.length > 0 && (
                          <div>
                            <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Key Features</h4>
                            <ul className="space-y-2">
                              {selectedProject.features.map((feature, index) => (
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
                          {selectedProject.sourceCodeUrl && (
                            <a
                              href={selectedProject.sourceCodeUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-md hover:shadow-lg"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Code size={18} className="flex-shrink-0" />
                              <span>View Source Code</span>
                            </a>
                          )}
                          {selectedProject.demoUrl && (
                            <a
                              href={selectedProject.demoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors shadow-md hover:shadow-lg"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <ExternalLink size={18} className="flex-shrink-0" />
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
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AllProjects;
