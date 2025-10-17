import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { Briefcase, BookOpen, Award, MapPin, Calendar, Code, Laptop, Building, CheckCircle, FileText, ExternalLink, X } from 'lucide-react';

interface EducationCardProps {
  degree: string;
  year: string;
  field: string;
  university: string;
  location: string;
  delay?: number;
  isLast?: boolean;
}

interface CertificateCardProps {
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  credentialUrl?: string;
  imageUrl?: string;
  skills: string[];
  delay?: number;
}

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  issuer: string;
  imageUrl?: string;
}

interface ExperienceCardProps {
  role: string;
  company: string;
  type: 'internship' | 'job' | 'freelance';
  duration: string;
  location: string;
  tasks: string[];
  skills: string[];
  delay?: number;
  isLast?: boolean;
}

const EducationCard: React.FC<EducationCardProps> = ({ degree, year, field, university, location, delay = 0, isLast = false }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div className="relative">
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-8 top-14 h-full w-0.5 bg-gradient-to-b from-blue-400 to-teal-400 dark:from-blue-600 dark:to-teal-600"></div>
      )}
      
      {/* Timeline dot */}
      <div className="absolute left-7 top-6 h-3 w-3 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 dark:from-blue-400 dark:to-teal-400 border-2 border-white dark:border-slate-900 z-10"></div>
      
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.6, delay }}
        className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg mb-12 ml-12 relative border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-shadow duration-300"
      >
      <div className="flex items-start">
        <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg mr-4 flex-shrink-0">
          {degree === 'DUT' ? (
            <BookOpen className="text-blue-600 dark:text-blue-300" size={24} />
          ) : (
            <Award className="text-blue-600 dark:text-blue-300" size={24} />
          )}
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{degree}</h3>
          <p className="text-slate-600 dark:text-slate-300 font-medium mb-2">{field}</p>
          
          <div className="flex flex-wrap gap-4 text-sm text-slate-500 dark:text-slate-400 mb-3">
            <div className="flex items-center">
              <Calendar className="mr-1" size={14} />
              <span>{year}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="mr-1" size={14} />
              <span>{university}</span>
            </div>
            <div className="flex items-center">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span>{location}</span>
            </div>
          </div>
          
          <div className="w-full h-1 bg-gradient-to-r from-blue-500 to-teal-400 rounded-full my-3"></div>
          
          <div className="flex flex-wrap gap-2">
            {degree === 'DUT' && (
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 text-xs font-medium rounded-full">
                Computer Science
              </span>
            )}
            {degree === 'Bachelor' && (
              <span className="px-3 py-1 bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 text-xs font-medium rounded-full">
                Software Engineering
              </span>
            )}
            {degree === 'Master' && (
              <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200 text-xs font-medium rounded-full">
                Advanced Technologies
              </span>
            )}
          </div>
        </div>
      </div>
      </motion.div>
    </div>
  );
};

const CertificateModal: React.FC<CertificateModalProps> = ({ isOpen, onClose, title, issuer, imageUrl }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75">
      <div className="relative bg-white dark:bg-slate-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
        <div className="sticky top-0 z-10 bg-white dark:bg-slate-800 p-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">{title}</h3>
            <p className="text-slate-600 dark:text-slate-300">{issuer}</p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6">
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt={`${title} certificate`} 
              className="w-full h-auto rounded-lg shadow-lg border border-slate-200 dark:border-slate-700"
            />
          ) : (
            <div className="flex items-center justify-center h-64 bg-slate-100 dark:bg-slate-700 rounded-lg">
              <p className="text-slate-500 dark:text-slate-400">Certificate image not available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const CertificateCard: React.FC<CertificateCardProps> = ({
  title,
  issuer,
  date,
  credentialId,
  imageUrl,
  skills,
  delay = 0
}) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const handleViewCredential = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  return (
    <>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay }}
        className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
        onClick={handleViewCredential}
      >
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{title}</h3>
              <p className="text-slate-600 dark:text-slate-300 mb-2">{issuer}</p>
              {credentialId && (
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Credential ID: {credentialId}</p>
              )}
            </div>
            <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              <FileText className="text-blue-600 dark:text-blue-400" size={24} />
            </div>
          </div>
          
          <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-4">
            <Calendar size={14} className="mr-1" />
            <span>Issued {date}</span>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {skills.map((skill, index) => (
              <span key={index} className="px-3 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-700/50 text-slate-700 dark:text-slate-300 rounded-full">
                {skill}
              </span>
            ))}
          </div>
          
          <div className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
            View Certificate <ExternalLink size={14} className="ml-1" />
          </div>
        </div>
      </motion.div>

      <CertificateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={title}
        issuer={issuer}
        imageUrl={imageUrl}
      />
    </>
  );
};

const Certificates = () => {
  const { t } = useLanguage();
  const [showAll, setShowAll] = React.useState(false);
  
  const certificates = [
    {
      title: "Full Stack Web Development",
      issuer: "Coursera",
      date: "May 2024",
      credentialId: "ABCD1234",
      credentialUrl: "#",
      imageUrl: "https://via.placeholder.com/800x600/3b82f6/ffffff?text=Full+Stack+Certificate",
      skills: ["React", "Node.js", "MongoDB", "Express"]
    },
    {
      title: "Machine Learning Specialization",
      issuer: "DeepLearning.AI",
      date: "March 2024",
      credentialId: "EFGH5678",
      credentialUrl: "#",
      imageUrl: "https://via.placeholder.com/800x600/10b981/ffffff?text=ML+Specialization",
      skills: ["Machine Learning", "Python", "TensorFlow"]
    },
    {
      title: "Cloud Architecture",
      issuer: "Google Cloud",
      date: "January 2024",
      credentialId: "IJKL9012",
      credentialUrl: "#",
      imageUrl: "https://via.placeholder.com/800x600/8b5cf6/ffffff?text=Cloud+Architecture",
      skills: ["GCP", "Cloud", "Kubernetes", "Docker"]
    },
    {
      title: "Advanced React",
      issuer: "Frontend Masters",
      date: "November 2023",
      credentialId: "MNOP3456",
      credentialUrl: "#",
      imageUrl: "https://via.placeholder.com/800x600/3b82f6/ffffff?text=React+Certificate",
      skills: ["React", "Hooks", "Performance"]
    },
    {
      title: "DevOps Fundamentals",
      issuer: "Udemy",
      date: "September 2023",
      credentialId: "QRST7890",
      credentialUrl: "#",
      imageUrl: "https://via.placeholder.com/800x600/ec4899/ffffff?text=DevOps+Certificate",
      skills: ["Docker", "CI/CD", "AWS"]
    },
    {
      title: "Data Structures & Algorithms",
      issuer: "LeetCode",
      date: "July 2023",
      credentialUrl: "#",
      imageUrl: "https://via.placeholder.com/800x600/06b6d4/ffffff?text=DSA+Certificate",
      skills: ["Algorithms", "Data Structures"]
    }
  ];
  
  const visibleCertificates = showAll ? certificates : certificates.slice(0, 4);
  
  return (
    <section id="certificates" className="py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
            {t.certificates.title}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            {t.certificates.subtitle}
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleCertificates.map((cert, index) => (
            <CertificateCard
              key={index}
              title={cert.title}
              issuer={cert.issuer}
              date={cert.date}
              credentialId={cert.credentialId}
              imageUrl={cert.imageUrl}
              skills={cert.skills}
              delay={index * 0.1}
            />
          ))}
        </div>
        
        {!showAll && certificates.length > 4 && (
          <div className="text-center mt-10">
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-slate-800 transition-all duration-300"
            >
              {t.certificates.viewAll}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

const Experience = () => {
  const { t } = useLanguage();
  const experienceRef = useRef(null);
  useInView(experienceRef, { once: true, amount: 0.1 });

  return (
    <section id="experience" className="py-20 bg-slate-50 dark:bg-slate-800/50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
            {t.experience.title}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            {t.experience.subtitle}
          </p>
        </motion.div>

        <div ref={experienceRef} className="max-w-4xl mx-auto relative">
          <div className="space-y-8">
            <ExperienceCard
              role={t.experience.exp1}
              company="Zoom In Media"
              type="internship"
              duration="2023 - 2024"
              location="Kénitra, Morocco"
              tasks={[
                t.experience.exp1Details,
                "Collaborated with the development team to implement new features",
                "Participated in code reviews and team meetings"
              ]}
              skills={["Laravel", "Bootstrap", "Livewire", "PHP", "MySQL"]}
              delay={0.2}
            />
            
            <ExperienceCard
              role={t.experience.exp2}
              company="Municipality of Kénitra"
              type="internship"
              duration="2022 - 2023"
              location="Kénitra, Morocco"
              tasks={[
                t.experience.exp2Details,
                "Implemented user authentication and authorization",
                "Optimized database queries for better performance"
              ]}
              skills={["PHP", "Bootstrap", "MySQL", "JavaScript", "jQuery"]}
              delay={0.4}
              isLast={true}
            />
            
            <ExperienceCard
              role="Web Developer"
              company="Freelance"
              type="freelance"
              duration="2020 - 2022"
              location="Remote"
              tasks={[
                "Designed and developed custom websites for small businesses",
                "Improved website performance and SEO for better search rankings",
                "Provided ongoing maintenance and support for client websites"
              ]}
              skills={["HTML/CSS", "JavaScript", "WordPress", "SEO", "UI/UX"]}
              delay={0.6}
              isLast={true}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  role,
  company,
  type,
  duration,
  location,
  tasks,
  skills,
  delay = 0,
  isLast = false
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const typeColors = {
    job: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
    internship: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
    freelance: 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300'
  };

  const typeIcons = {
    job: <Briefcase size={16} className="mr-1" />,
    internship: <Laptop size={16} className="mr-1" />,
    freelance: <Code size={16} className="mr-1" />
  };

  return (
    <div className="relative">
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-8 top-14 h-full w-0.5 bg-gradient-to-b from-teal-400 to-blue-400 dark:from-teal-600 dark:to-blue-600"></div>
      )}
      
      {/* Timeline dot */}
      <div className="absolute left-7 top-6 h-3 w-3 rounded-full bg-gradient-to-r from-teal-500 to-blue-500 dark:from-teal-400 dark:to-blue-400 border-2 border-white dark:border-slate-800 z-10"></div>
      
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.6, delay }}
        className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg mb-12 ml-12 relative border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-shadow duration-300"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">{role}</h3>
            <div className="flex items-center text-slate-600 dark:text-slate-300 mt-1">
              <Building size={16} className="mr-1" />
              <span>{company}</span>
              <span className="mx-2">•</span>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${typeColors[type]}`}>
                {typeIcons[type]}
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </span>
            </div>
          </div>
          <div className="mt-2 sm:mt-0 text-sm text-slate-500 dark:text-slate-400">
            <div className="flex items-center">
              <Calendar size={14} className="mr-1" />
              <span>{duration}</span>
              <span className="mx-2">•</span>
              <MapPin size={14} className="mr-1" />
              <span>{location}</span>
            </div>
          </div>
        </div>
        
        <div className="mb-4">
          <h4 className="font-medium text-slate-800 dark:text-slate-200 mb-2">Key Responsibilities:</h4>
          <ul className="space-y-2">
            {tasks.map((task, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle size={16} className="text-teal-500 mt-1 mr-2 flex-shrink-0" />
                <span className="text-slate-600 dark:text-slate-400">{task}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-slate-200 dark:border-slate-700">
          {skills.map((skill, index) => (
            <span key={index} className="px-3 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-700/50 text-slate-700 dark:text-slate-300 rounded-full">
              {skill}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

const About = () => {
  const { t } = useLanguage();
  const educationRef = useRef(null);
  useInView(educationRef, { once: true, amount: 0.1 });

  return (
    <div className="bg-slate-50 dark:bg-slate-900">
      {/* Education Section */}
      <section id="education" className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
              {t.education.title}
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              {t.education.subtitle}
            </p>
          </motion.div>

          <div ref={educationRef} className="max-w-4xl mx-auto relative">
            <div className="space-y-8">
              <EducationCard
                degree={t.education.masters.split(' in ')[0]}
                year="2024 - 2026"
                field={t.education.masters.split(' in ')[1] || t.education.masters}
                university={t.education.mastersDesc.split(', ')[0]}
                location={t.education.mastersDesc.split(', ').slice(1).join(', ')}
                delay={0.2}
              />
              
              <EducationCard
                degree={t.education.bachelors.split(' in ')[0]}
                year="2023 - 2024"
                field={t.education.bachelors.split(' in ')[1] || t.education.bachelors}
                university={t.education.bachelorsDesc.split(', ')[0]}
                location={t.education.bachelorsDesc.split(', ').slice(1).join(', ')}
                delay={0.4}
              />
              
              <EducationCard
                degree={t.education.diploma}
                year="2021 - 2023"
                field=""
                university={t.education.diplomaDesc.split(', ')[0]}
                location={t.education.diplomaDesc.split(', ').slice(1).join(', ')}
                delay={0.6}
                isLast={true}
              />
            </div>
          </div>
        </div>
      </section>

      <Experience />
      <Certificates />
    </div>
  );
};

export default About;
