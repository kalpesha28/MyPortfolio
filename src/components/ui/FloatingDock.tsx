import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Home, User, Code2, Briefcase, Mail, FileText } from 'lucide-react';

// --- ICON COMPONENT (With Maginification) ---
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
      <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-black border border-white/10 rounded-md text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
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
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div 
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex h-16 items-end gap-4 rounded-2xl bg-black/50 border border-white/10 px-4 pb-3 backdrop-blur-xl"
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
    >
      <DockIcon mouseX={mouseX} icon={Home} label="Home" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
      <DockIcon mouseX={mouseX} icon={Briefcase} label="Projects" onClick={() => scrollToSection('projects')} />
      <DockIcon mouseX={mouseX} icon={Code2} label="Skills" onClick={() => scrollToSection('skills')} />
      <DockIcon mouseX={mouseX} icon={User} label="Experience" onClick={() => scrollToSection('timeline')} />
      <DockIcon mouseX={mouseX} icon={Mail} label="Contact" onClick={() => scrollToSection('contact')} />
      
      {/* Divider */}
      <div className="h-10 w-px bg-white/10 mx-1" />
      
      <DockIcon mouseX={mouseX} icon={FileText} label="Resume" onClick={() => window.open('/resume.pdf', '_blank')} />
    </div>
  );
};