import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Binary, Code2, Cpu, Database, Shield, Rocket, Globe2, Award } from 'lucide-react';

const row1 = [
  { name: 'JAVA', icon: <Code2 size={24} />, color: '#f8981d' },
  { name: 'REACT', icon: <Code2 size={24} />, color: '#61dafb' },
  { name: 'NODE.JS', icon: <Code2 size={24} />, color: '#68a063' },
  { name: 'C++', icon: <Binary size={24} />, color: '#00f3ff' },
  { name: 'PYTHON', icon: <Code2 size={24} />, color: '#ff003c' },
  { name: 'EXPRESS.JS', icon: <Cpu size={24} />, color: '#a855f7' },
];

const row2 = [
  { name: 'HTML', icon: <Rocket size={24} />, color: '#22d3ee' },
  { name: 'CSS', icon: <Shield size={24} />, color: '#dc2626' },
  { name: 'GERMAN (A2)', icon: <Globe2 size={24} />, color: '#ffffff' },
  { name: 'GIT / GITHUB', icon: <Code2 size={24} />, color: '#71717a' },
  { name: 'PHP', icon: <Award size={24} />, color: '#fbbf24' },
  { name: 'SQL / ORACLE', icon: <Database size={24} />, color: '#7c3aed' },
];

const MarqueeRow = ({ items, direction = 1, speed = 18 }) => (
  <motion.div 
    className="flex overflow-hidden py-8 select-none cursor-pointer"
    // The "Whole Line" vertical movement on hover
    whileHover={{ 
      y: [0, -15, 15, 0],
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
    }}
  >
    <motion.div 
      className="flex gap-8 whitespace-nowrap min-w-full"
      animate={{ x: direction === 1 ? [0, -1000] : [-1000, 0] }}
      transition={{ x: { repeat: Infinity, repeatType: "loop", duration: speed, ease: "linear" } }}
    >
      {[...items, ...items, ...items].map((skill, i) => (
        <div key={i} className="group relative flex-shrink-0">
          <div className="flex items-center gap-6 px-10 py-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl transition-all group-hover:border-white/30 group-hover:bg-white/[0.08]">
            <div style={{ color: skill.color }} className="group-hover:scale-125 transition-transform duration-500">
              {skill.icon}
            </div>
            <span className="font-mono text-xl font-black text-zinc-400 tracking-[0.2em] uppercase group-hover:text-white transition-colors leading-none">
              {skill.name}
            </span>
          </div>
          {/* Neon Glow Aura */}
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-30 blur-2xl transition-opacity -z-10" 
               style={{ backgroundColor: skill.color }} />
        </div>
      ))}
    </motion.div>
  </motion.div>
);

export const SkillsSection = () => {
  return (
    <section id="arsenal" className="relative bg-[#020205] py-40 overflow-hidden flex flex-col items-center justify-center">
      
      {/* ── SECTION HEADER ── */}
      <div className="container mx-auto px-6 relative z-10 text-center mb-24">
        <span className="text-xs font-mono text-purple-500 tracking-[0.6em] uppercase mb-6 block italic">
          THE ARSENAL // LOADOUT_v3.0
        </span>
        <h2 className="text-6xl md:text-8xl font-black text-white italic tracking-tighter uppercase leading-none">
          TECHNICAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">MASTERY</span>
        </h2>
      </div>

      {/* ── DUAL-ROW INTERACTIVE MARQUEE ── */}
      <div className="w-full space-y-4 relative">
        <div className="absolute left-0 top-0 bottom-0 w-48 bg-gradient-to-r from-[#020205] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-48 bg-gradient-to-l from-[#020205] to-transparent z-10" />
        
        {/* Row 1: Core Engineering Languages */}
        <MarqueeRow items={row1} direction={1} speed={18} />
        
        {/* Row 2: Specialized Skills & Academic Proof */}
        <MarqueeRow items={row2} direction={-1} speed={20} />
      </div>

      {/* ── SYSTEM HUD FOOTER ── */}
      <div className="container mx-auto px-6 mt-24 flex flex-wrap justify-between items-center opacity-30 border-t border-white/5 pt-10">
        <div className="flex items-center gap-10">
          <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
             SYS_STATUS: NOMINAL
          </div>
          <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
             RANK: ACM-W CHAIR
          </div>
        </div>
        <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest italic">
           NASHIK_HUB // {new Date().getFullYear()}
        </div>
      </div>

    </section>
  );
};