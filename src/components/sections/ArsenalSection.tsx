import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code2, Terminal, Cpu, Binary, Database, Globe2 } from 'lucide-react';

// --- PERSONALIZED TOOLKIT DATA ---
const skillGroups = [
  {
    category: "Languages",
    icon: <Binary className="w-5 h-5 text-cyan-400" />,
    skills: [
      { name: 'C / C++', level: 'Advanced', detail: 'System Logic' },
      { name: 'Python', level: 'Advanced', detail: 'ML & Automation' },
      { name: 'JavaScript', level: 'Intermediate', detail: 'Dynamic Web' },
      { name: 'German', level: 'A2 Level', detail: 'International' }
    ]
  },
  {
    category: "Development Stack",
    icon: <Code2 className="w-5 h-5 text-red-500" />,
    skills: [
      { name: 'React / Node.js', level: 'Full-Stack', detail: 'Web Ecosystems' },
      { name: 'Android Studio', level: 'App Dev', detail: 'Mobile Builds' },
      { name: 'SQL / DBMS', level: 'Architect', detail: 'Relational Data' },
      { name: 'HTML / CSS', level: 'Advanced', detail: 'Modern UI' }
    ]
  },
  {
    category: "Specialized Intel",
    icon: <Cpu className="w-5 h-5 text-purple-500" />,
    skills: [
      { name: 'Machine Learning', level: 'Predictive', detail: 'Scikit-Learn' },
      { name: 'Network Sec', level: 'HAL Grade', detail: 'LAN Protocols' },
      { name: 'Data Viz', level: 'NASA Sprint', detail: '3D/WebGL' },
      { name: 'GitHub', level: 'Collaborative', detail: 'Version Control' }
    ]
  }
];

export const ArsenalSection = () => {
  return (
    <section id="arsenal" className="relative min-h-screen bg-[#03040a] py-32 px-6 overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: '32px 32px' }} />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center md:items-start mb-24">
          <div className="flex items-center gap-3 mb-4">
            <Terminal size={14} className="text-cyan-500" />
            <span className="text-[10px] font-mono text-cyan-500 tracking-[0.6em] uppercase">Tech_Stack // Initialized</span>
          </div>
          <h2 className="text-6xl md:text-8xl font-black text-white italic tracking-tighter uppercase leading-none">
            CORE <span className="text-zinc-800">ARSENAL.</span>
          </h2>
        </div>

        {/* ── SKILLS GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {skillGroups.map((group, gIdx) => (
            <motion.div 
              key={group.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: gIdx * 0.1 }}
              viewport={{ once: true }}
              className="relative p-8 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-3xl group hover:border-white/10 transition-colors"
            >
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-10 border-b border-white/5 pb-6">
                <div className="p-3 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors">
                  {group.icon}
                </div>
                <h3 className="text-xl font-black text-white italic tracking-widest uppercase">{group.category}</h3>
              </div>

              {/* Skill Items */}
              <div className="space-y-6">
                {group.skills.map((skill, sIdx) => (
                  <div key={skill.name} className="relative group/item">
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-sm font-mono text-zinc-400 uppercase tracking-widest group-hover/item:text-white transition-colors">
                        {skill.name}
                      </span>
                      <span className="text-[9px] font-mono text-cyan-500 uppercase tracking-tighter opacity-0 group-hover/item:opacity-100 transition-opacity">
                        {skill.level}
                      </span>
                    </div>
                    
                    {/* Visual Progress/Level Bar */}
                    <div className="h-[2px] w-full bg-white/5 relative overflow-hidden">
                      <motion.div 
                        initial={{ x: "-100%" }}
                        whileInView={{ x: "0%" }}
                        transition={{ duration: 1, delay: sIdx * 0.05 }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"
                      />
                    </div>
                    
                    <p className="text-[9px] font-mono text-zinc-600 mt-2 uppercase tracking-[0.2em]">
                      Sub_Process: {skill.detail}
                    </p>
                  </div>
                ))}
              </div>

              {/* Background ID Number */}
              <div className="absolute -bottom-6 -right-4 text-9xl font-black text-white/[0.02] italic select-none pointer-events-none">
                0{gIdx + 1}
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── FOOTER STATS ── */}
        <div className="mt-20 pt-10 border-t border-white/5 flex flex-wrap justify-between items-center gap-8">
          <div className="flex items-center gap-6">
            <div className="flex flex-col">
              <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">Global_Index</span>
              <span className="text-xl font-bold text-white italic tracking-tighter">12+ TECHNOLOGIES</span>
            </div>
            <div className="w-[1px] h-10 bg-white/5" />
            <div className="flex flex-col">
              <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">Academic_Status</span>
              <span className="text-xl font-bold text-white italic tracking-tighter">10.0 SGPA</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="flex gap-1">
               {[...Array(3)].map((_, i) => (
                 <motion.div 
                   key={i}
                   animate={{ opacity: [1, 0.2, 1] }}
                   transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
                   className="w-1.5 h-1.5 bg-cyan-500 rounded-full" 
                 />
               ))}
             </div>
             <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-[0.3em]">System_Integrity: 100%</span>
          </div>
        </div>

      </div>
    </section>
  );
};