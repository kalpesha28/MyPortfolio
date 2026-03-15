import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
}

export const GlassCard = ({ 
  children, 
  className = '', 
  hover = true,
  delay = 0 
}: GlassCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay }}
      whileHover={hover ? { 
        scale: 1.02, 
        boxShadow: '0 0 40px hsl(180 100% 50% / 0.2)' 
      } : undefined}
      className={`
        glass-panel p-6
        transition-all duration-300
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
};
