import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Palette, Shield, Rocket } from 'lucide-react';

const projects = [
  {
    id: 'unfold-bharat',
    title: 'Unfold Bharat',
    subtitle: 'Discover the unseen. Local tourism, reimagined.',
    icon: MapPin,
    gradient: 'from-emerald-500/10 to-teal-500/10',
    size: 'large',
  },
  {
    id: 'stylemate',
    title: 'StyleMate',
    subtitle: 'AI that knows your style better than you do.',
    icon: Palette,
    gradient: 'from-purple-500/10 to-pink-500/10',
    size: 'medium',
  },
  {
    id: 'lan-chat',
    title: 'LAN Chat',
    subtitle: 'Defense-grade communication. Zero internet required.',
    icon: Shield,
    gradient: 'from-blue-500/10 to-cyan-500/10',
    size: 'medium',
  },
  {
    id: 'space-explorer',
    title: 'Space Explorer',
    subtitle: 'NASA Data. Gamified.',
    icon: Rocket,
    gradient: 'from-orange-500/10 to-red-500/10',
    size: 'medium',
  },
];

const BentoCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const Icon = project.icon;
  const isLarge = project.size === 'large';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1]
      }}
      className={`
        bento-card p-8 md:p-12 cursor-pointer group
        ${isLarge ? 'md:col-span-2 md:row-span-2' : ''}
      `}
    >
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between min-h-[200px] md:min-h-[250px]">
        <div>
          {/* Icon */}
          <motion.div 
            className="mb-6"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            <Icon 
              size={isLarge ? 48 : 36} 
              className="text-muted-foreground group-hover:text-foreground transition-colors duration-500" 
              strokeWidth={1.5}
            />
          </motion.div>

          {/* Title */}
          <h3 className={`
            font-semibold text-foreground mb-3 tracking-tight
            ${isLarge ? 'text-3xl md:text-4xl lg:text-5xl' : 'text-xl md:text-2xl'}
          `}>
            {project.title}
          </h3>
        </div>

        {/* Subtitle */}
        <p className={`
          text-muted-foreground group-hover:text-foreground/80 transition-colors duration-500
          ${isLarge ? 'text-lg md:text-xl' : 'text-base'}
        `}>
          {project.subtitle}
        </p>
      </div>

      {/* Hover line accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
    </motion.div>
  );
};

export const BentoSection = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="ecosystem" className="section-padding bg-background">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20 md:mb-32"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-foreground mb-6">
            The Ecosystem
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Projects built with precision and purpose.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <BentoCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
