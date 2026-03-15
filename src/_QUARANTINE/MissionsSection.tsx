import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '../ui/GlassCard';
import { MapPin, Sparkles, Rocket, Database, Shield, X, ExternalLink, Github } from 'lucide-react';

interface Project {
  id: string;
  codename: string;
  title: string;
  description: string;
  details: string;
  tech: string[];
  icon: React.ReactNode;
  status: string;
  theme: string;
}

const projects: Project[] = [
  {
    id: 'unfold-bharat',
    codename: 'OPERATION: UNFOLD',
    title: 'Unfold Bharat',
    description: 'Tourism platform for hidden Indian locations',
    details: 'A comprehensive tourism discovery platform that unveils the unexplored gems of India. Features interactive maps, local guides integration, and personalized itinerary generation.',
    tech: ['React', 'Node.js', 'MongoDB', 'Maps API'],
    icon: <MapPin className="w-8 h-8" />,
    status: 'COMPLETED',
    theme: 'from-emerald-500 to-teal-500',
  },
  {
    id: 'stylemate',
    codename: 'OPERATION: STYLE',
    title: 'StyleMate',
    description: 'Fashion assistant using body measurements & color theory',
    details: 'AI-powered fashion recommendation system that analyzes body measurements, skin tone, and personal preferences to suggest optimal outfit combinations using advanced color theory algorithms.',
    tech: ['Python', 'TensorFlow', 'React', 'Computer Vision'],
    icon: <Sparkles className="w-8 h-8" />,
    status: 'ACTIVE',
    theme: 'from-pink-500 to-purple-500',
  },
  {
    id: 'space-explorer',
    codename: 'OPERATION: COSMOS',
    title: 'Space Explorer',
    description: 'NASA data visualization & gamification',
    details: 'Interactive space exploration platform that transforms NASA\'s astronomical data into engaging visualizations and gamified learning experiences. Users can explore galaxies, track celestial events, and complete space missions.',
    tech: ['Three.js', 'NASA API', 'WebGL', 'Node.js'],
    icon: <Rocket className="w-8 h-8" />,
    status: 'COMPLETED',
    theme: 'from-blue-500 to-indigo-500',
  },
  {
    id: 'culture-connect',
    codename: 'OPERATION: HERITAGE',
    title: 'CultureConnect',
    description: 'DBMS heritage explorer',
    details: 'A robust database management system designed to catalog, preserve, and explore cultural heritage sites across India. Features advanced querying, relationship mapping, and multimedia documentation.',
    tech: ['SQL', 'Python', 'Flask', 'PostgreSQL'],
    icon: <Database className="w-8 h-8" />,
    status: 'COMPLETED',
    theme: 'from-amber-500 to-orange-500',
  },
  {
    id: 'lan-chat',
    codename: 'OPERATION: CIPHER',
    title: 'LAN Chat App',
    description: 'Privacy-focused secure communication for defense contexts',
    details: 'End-to-end encrypted local area network communication system built for defense applications. Features military-grade encryption, message self-destruction, and zero external dependencies.',
    tech: ['C++', 'Socket Programming', 'AES-256', 'Qt'],
    icon: <Shield className="w-8 h-8" />,
    status: 'CLASSIFIED',
    theme: 'from-red-500 to-rose-500',
  },
];

export const MissionsSection = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="missions" className="relative min-h-screen py-32">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="font-mono text-sm text-secondary uppercase tracking-widest mb-4 block">
            // Project Archives
          </span>
          <h2 className="text-4xl md:text-6xl font-orbitron font-bold mb-4">
            Mission <span className="neon-text-purple">Log</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Classified project files from various operations across multiple domains
          </p>
        </motion.div>

        {/* Project cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setSelectedProject(project)}
              className="cursor-pointer group"
            >
              <div className="glass-panel p-6 h-full relative overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_30px_hsl(180_100%_50%/0.2)]">
                {/* Status badge */}
                <div className="absolute top-4 right-4">
                  <span className={`
                    px-2 py-1 text-xs font-mono rounded
                    ${project.status === 'CLASSIFIED' 
                      ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                      : project.status === 'ACTIVE'
                        ? 'bg-primary/20 text-primary border border-primary/30'
                        : 'bg-secondary/20 text-secondary border border-secondary/30'
                    }
                  `}>
                    {project.status}
                  </span>
                </div>

                {/* Icon */}
                <div className={`
                  w-16 h-16 rounded-lg mb-4
                  bg-gradient-to-br ${project.theme}
                  flex items-center justify-center
                  group-hover:scale-110 transition-transform duration-300
                `}>
                  <div className="text-white">
                    {project.icon}
                  </div>
                </div>

                {/* Content */}
                <p className="text-xs font-mono text-primary/70 mb-2">
                  {project.codename}
                </p>
                <h3 className="text-xl font-orbitron font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {project.description}
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs font-mono bg-muted/50 rounded text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="px-2 py-1 text-xs font-mono text-primary">
                      +{project.tech.length - 3}
                    </span>
                  )}
                </div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-background/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-panel p-8 max-w-2xl w-full relative"
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <X size={24} />
              </button>

              {/* Header */}
              <div className="flex items-start gap-6 mb-6">
                <div className={`
                  w-20 h-20 rounded-xl flex-shrink-0
                  bg-gradient-to-br ${selectedProject.theme}
                  flex items-center justify-center
                `}>
                  <div className="text-white">
                    {selectedProject.icon}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-mono text-primary mb-1">
                    {selectedProject.codename}
                  </p>
                  <h3 className="text-2xl font-orbitron font-bold mb-1">
                    {selectedProject.title}
                  </h3>
                  <span className={`
                    px-2 py-1 text-xs font-mono rounded
                    ${selectedProject.status === 'CLASSIFIED' 
                      ? 'bg-red-500/20 text-red-400' 
                      : selectedProject.status === 'ACTIVE'
                        ? 'bg-primary/20 text-primary'
                        : 'bg-secondary/20 text-secondary'
                    }
                  `}>
                    {selectedProject.status}
                  </span>
                </div>
              </div>

              {/* Details */}
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {selectedProject.details}
              </p>

              {/* Tech stack */}
              <div className="mb-6">
                <p className="text-xs font-mono text-primary mb-3">TECH_STACK:</p>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 text-sm font-mono bg-muted/50 rounded-full border border-border"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <button className="flex items-center gap-2 px-4 py-2 bg-primary/20 border border-primary/50 rounded-lg text-primary hover:bg-primary/30 transition-colors font-mono text-sm">
                  <ExternalLink size={16} />
                  View Demo
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-muted/50 border border-border rounded-lg text-muted-foreground hover:text-foreground transition-colors font-mono text-sm">
                  <Github size={16} />
                  Source Code
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
