import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

// Animated particle using CSS
const Particle = ({ index }: { index: number }) => {
  const style = useMemo(() => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    width: `${Math.random() * 4 + 2}px`,
    height: `${Math.random() * 4 + 2}px`,
    animationDelay: `${Math.random() * 5}s`,
    animationDuration: `${Math.random() * 10 + 15}s`,
  }), []);

  return (
    <div
      className="absolute rounded-full animate-float"
      style={{
        ...style,
        background: index % 3 === 0 
          ? 'hsl(180, 100%, 50%)' 
          : index % 3 === 1 
            ? 'hsl(270, 100%, 65%)' 
            : 'hsl(320, 100%, 60%)',
        opacity: Math.random() * 0.4 + 0.1,
        boxShadow: index % 5 === 0 ? '0 0 10px currentColor' : 'none',
      }}
    />
  );
};

// Holographic orb using CSS
const HolographicOrb = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      className="absolute right-[10%] top-1/2 -translate-y-1/2 hidden lg:block"
      animate={{
        x: mousePos.x,
        y: mousePos.y,
        rotateX: mousePos.y * 0.5,
        rotateY: mousePos.x * 0.5,
      }}
      transition={{ type: 'spring', stiffness: 50, damping: 20 }}
    >
      {/* Main orb */}
      <div className="relative w-64 h-64">
        {/* Inner glow */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-xl" />
        
        {/* Wireframe sphere effect */}
        <div 
          className="absolute inset-4 rounded-full border border-primary/30 animate-rotate-slow"
          style={{
            background: 'radial-gradient(circle at 30% 30%, hsl(180 100% 50% / 0.1), transparent 70%)',
          }}
        />
        
        {/* Second ring */}
        <div 
          className="absolute inset-8 rounded-full border border-secondary/40"
          style={{ animation: 'rotate-slow 25s linear infinite reverse' }}
        />
        
        {/* Orbiting ring 1 */}
        <div 
          className="absolute inset-0 rounded-full border-2 border-primary/40 animate-rotate-slow"
          style={{ transform: 'rotateX(70deg)' }}
        />
        
        {/* Orbiting ring 2 */}
        <div 
          className="absolute inset-2 rounded-full border border-secondary/30"
          style={{ 
            transform: 'rotateX(70deg) rotateY(30deg)',
            animation: 'rotate-slow 18s linear infinite reverse'
          }}
        />
        
        {/* Core glow */}
        <div className="absolute inset-[35%] rounded-full bg-gradient-to-br from-primary/40 to-secondary/40 blur-md animate-pulse-glow" />
      </div>
    </motion.div>
  );
};

export const Scene3D = () => {
  const particles = useMemo(() => 
    [...Array(60)].map((_, i) => <Particle key={i} index={i} />), 
  []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient background */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, hsl(220 20% 4%) 0%, hsl(220 25% 8%) 50%, hsl(220 20% 6%) 100%)',
        }}
      />
      
      {/* Animated gradient overlay */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(ellipse at 20% 20%, hsl(180 100% 50% / 0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, hsl(270 100% 65% / 0.15) 0%, transparent 50%)',
        }}
      />
      
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(hsl(180 100% 50% / 0.03) 1px, transparent 1px),
            linear-gradient(90deg, hsl(180 100% 50% / 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
      
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles}
      </div>
      
      {/* Holographic orb */}
      <HolographicOrb />
      
      {/* Scanlines overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(180 100% 50%) 2px, hsl(180 100% 50%) 4px)',
        }}
      />
      
      {/* Vignette effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, hsl(220 20% 4% / 0.4) 100%)',
        }}
      />
    </div>
  );
};
