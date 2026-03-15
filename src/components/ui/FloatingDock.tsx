import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Home, User, Target, Briefcase, Code2, Cpu, Mail, FileText } from 'lucide-react';

// --- ICON COMPONENT (With Magnification) ---
const DockIcon = ({ mouseX, icon: Icon, label, onClick }: any) => {
  const ref = useRef<HTMLDivElement>(null);

  // Calculate distance from mouse to this icon
  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Scale based on distance (closer = bigger)
  const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      onClick={onClick}
      className="aspect-square w-10 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center cursor-pointer hover:bg-white/20 relative group"
    >
      <Icon className="text-white w-5 h-5 group-hover:w-8 group-hover:h-8 transition-all duration-200" />
      
      {/* Tooltip Label */}
      <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/90 border border-white/10 rounded-md text-xs font-mono text-cyan-400 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        {label}
      </span>
    </motion.div>
  );
};

// --- MAIN DOCK COMPONENT ---
export const FloatingDock = () => {
  const mouseX = useMotionValue(Infinity);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div 
      // I bumped the z-index to z-[100] to ensure it always floats above your 3D cards
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] flex h-16 items-end gap-2 sm:gap-4 rounded-2xl bg-[#03040a]/80 border border-white/10 px-4 pb-3 backdrop-blur-xl shadow-[0_0_30px_rgba(0,243,255,0.1)]"
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
    >
      {/* All sections perfectly mapped to the exact IDs in your Index.tsx */}
      <DockIcon mouseX={mouseX} icon={Home} label="Home" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
      <DockIcon mouseX={mouseX} icon={User} label="Dossier" onClick={() => scrollToSection('about')} />
      <DockIcon mouseX={mouseX} icon={Briefcase} label="Timeline" onClick={() => scrollToSection('experience')} />
      <DockIcon mouseX={mouseX} icon={Code2} label="Deployments" onClick={() => scrollToSection('projects')} />
      <DockIcon mouseX={mouseX} icon={Target} label="Pillars" onClick={() => scrollToSection('specs')} />
      <DockIcon mouseX={mouseX} icon={Cpu} label="Arsenal" onClick={() => scrollToSection('skills')} />
      <DockIcon mouseX={mouseX} icon={Mail} label="Comms" onClick={() => scrollToSection('contact')} />
      
      {/* Divider */}
      <div className="h-10 w-px bg-white/10 mx-1" />
      
      {/* Resume Link */}
      <DockIcon mouseX={mouseX} icon={FileText} label="Resume" onClick={() => window.open('/resume.pdf', '_blank')} />
    </div>
  );
};