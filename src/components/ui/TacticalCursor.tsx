import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const TacticalCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  
  // Track mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Add smooth physics (spring) to the movement
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX - 16); // Center the 32px cursor
      mouseY.set(e.clientY - 16);
    };

    // Detect if hovering over clickable elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button') || target.closest('a')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <motion.div
      style={{
        translateX: cursorX,
        translateY: cursorY,
      }}
      className="fixed top-0 left-0 z-[9999] pointer-events-none hidden md:block" // Hidden on mobile
    >
      {/* 1. THE CENTER DOT (Always visible) */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full transition-all duration-300 ${isHovering ? 'scale-0' : 'scale-100'}`} />

      {/* 2. THE OUTER RING (Expands on Hover) */}
      <motion.div 
        animate={{ 
          scale: isHovering ? 2.5 : 1,
          opacity: isHovering ? 1 : 0.5,
          borderColor: isHovering ? 'rgb(168, 85, 247)' : 'rgba(255, 255, 255, 0.3)' // Turns purple on hover
        }}
        className="w-8 h-8 border border-white/30 rounded-full flex items-center justify-center transition-colors duration-200"
      >
        {/* Crosshair lines that appear only when hovering */}
        {isHovering && (
          <>
            <div className="absolute top-0 bottom-0 w-[1px] bg-purple-500/50" />
            <div className="absolute left-0 right-0 h-[1px] bg-purple-500/50" />
          </>
        )}
      </motion.div>
    </motion.div>
  );
};