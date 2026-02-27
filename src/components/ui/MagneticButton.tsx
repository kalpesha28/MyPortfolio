import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  glowing?: boolean;
}

export const MagneticButton = ({ 
  children, 
  onClick, 
  className = '',
  glowing = false 
}: MagneticButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const distanceX = (e.clientX - centerX) * 0.3;
    const distanceY = (e.clientY - centerY) * 0.3;
    
    setPosition({ x: distanceX, y: distanceY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={buttonRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15 }}
      className={`
        relative px-8 py-4 font-orbitron font-semibold text-sm uppercase tracking-wider
        bg-gradient-to-r from-primary/20 to-secondary/20
        border border-primary/50 rounded-lg
        transition-all duration-300
        hover:border-primary hover:shadow-[0_0_30px_hsl(180_100%_50%/0.5)]
        ${glowing ? 'animate-pulse-glow' : ''}
        ${className}
      `}
    >
      <span className="relative z-10 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        {children}
      </span>
      
      {/* Glow effect overlay */}
      <motion.div
        className="absolute inset-0 rounded-lg opacity-0 bg-cyber-gradient"
        whileHover={{ opacity: 0.2 }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
};
