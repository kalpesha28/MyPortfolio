import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export const GlowingOrb = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <motion.div 
      ref={ref}
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      style={{ opacity, y }}
    >
      <motion.div 
        className="relative"
        style={{ scale }}
      >
        {/* Outer glow */}
        <div className="absolute -inset-32 rounded-full bg-gradient-to-r from-white/5 via-white/10 to-white/5 blur-3xl orb-glow" />
        
        {/* Middle glow */}
        <div className="absolute -inset-16 rounded-full bg-white/5 blur-2xl" />
        
        {/* Core orb */}
        <div className="relative w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64">
          {/* Glass sphere */}
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 40%, rgba(255,255,255,0.02) 60%, transparent 70%)',
            }}
          />
          
          {/* Inner highlight */}
          <div 
            className="absolute inset-4 rounded-full"
            style={{
              background: 'radial-gradient(ellipse at 25% 25%, rgba(255,255,255,0.15) 0%, transparent 50%)',
            }}
          />
          
          {/* Subtle ring */}
          <div className="absolute inset-0 rounded-full border border-white/10" />
          
          {/* Core glow */}
          <div 
            className="absolute inset-[30%] rounded-full blur-md orb-glow"
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 50%, transparent 70%)',
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};
