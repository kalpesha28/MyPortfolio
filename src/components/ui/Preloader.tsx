import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const bootLines = [
  "Initializing Kernel...",
  "Loading 3D Environment...",
  "Establishing Secure Connection...",
  "Bypassing Firewall...",
  "Access Granted."
];

export const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [lines, setLines] = useState<string[]>([]);
  
  useEffect(() => {
    // Reveal lines one by one
    let delay = 0;
    bootLines.forEach((line, index) => {
      delay += Math.random() * 300 + 100; // Random typing speed
      setTimeout(() => {
        setLines(prev => [...prev, line]);
        
        // If it's the last line, finish the loader
        if (index === bootLines.length - 1) {
          setTimeout(onComplete, 800); // Wait a bit after "Access Granted"
        }
      }, delay);
    });
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[99999] bg-black flex flex-col items-start justify-end p-10 font-mono text-sm md:text-base">
      
      {/* Matrix Rain Effect (Optional subtle background) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,1)_100%),url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`mb-2 ${
              line === "Access Granted." 
                ? "text-green-500 font-bold text-xl mt-4" // Highlight the final line
                : "text-zinc-500"
            }`}
          >
            <span className="mr-2 opacity-50">{`>`}</span>
            {line}
          </motion.div>
        ))}
        
        {/* Blinking Cursor at the bottom */}
        <motion.div 
          animate={{ opacity: [0, 1, 0] }} 
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="w-3 h-5 bg-purple-500 mt-2" 
        />
      </div>

      {/* Loading Bar */}
      <div className="absolute top-0 left-0 h-1 bg-purple-600 transition-all duration-300 ease-out" 
           style={{ width: `${(lines.length / bootLines.length) * 100}%` }} 
      />

    </div>
  );
};