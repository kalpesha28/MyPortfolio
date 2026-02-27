import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, BookOpen, Rocket, Terminal, Award } from 'lucide-react';

const missionDimensions = [
  {
    id: "leadership",
    title: "THE CATALYST",
    subtitle: "ACM-W Chairperson & Community Leader",
    icon: <Users className="w-6 h-6" />,
    description: "Architecting the technical culture of my institution. As ACM-W Chairperson, I orchestrate national-level events like GenAIthons and manage cross-functional teams to bridge the gap between student innovation and professional execution.",
    metrics: [
      // { label: "ROLE", val: "ACM-W" },
      // { label: "SCALE", val: "NATL" },
      // { label: "IMPACT", val: "200+" },
    ],
    highlights: [
      "ACM-W Chairperson",
      "GenAIthon National Lead",
      "Ideathon Event Head",
      "M-Tech Tech Coordinator",
      "Cultural Event Manager",
      "Institutional Debate Prize",
    ],
    glow: "rgba(0, 243, 255, 0.4)",
    accent: "#00f3ff",
  },
  {
    id: "academic",
    title: "THE ARCHITECT",
    subtitle: "Academic Excellence & Skill Mastery",
    icon: <BookOpen className="w-6 h-6" />,
    description: "Precision in academics and relentless skill acquisition. A perfect 10.0 SGPA in Semester 1 is proof of the high standard I hold while simultaneously mastering full-stack architectures and emerging technologies.",
    metrics: [
      // { label: "SGPA", val: "10.0" },
      // { label: "SEM", val: "01" },
      // { label: "RANK", val: "TOP" },
    ],
    highlights: [
      "Perfect 10.0 SGPA",
      "Java & Python Expert",
      "MERN Stack Specialist",
      "SQL & DBMS Architect",
      "Machine Learning Focus",
      "Network Security Analyst",
    ],
    glow: "rgba(255, 0, 60, 0.4)",
    accent: "#ff003c",
  },
  {
    id: "deployment",
    title: "THE OPERATOR",
    subtitle: "Real-World Deployments & Live Builds",
    icon: <Rocket className="w-6 h-6" />,
    description: "Translating complex theory into mission-critical deployments. From architecting secure LAN bots at HAL to engineering deep-space data visualizations for the NASA Space Apps Challenge.",
    metrics: [
      // { label: "CLIENT", val: "HAL" },
      // { label: "HACK", val: "NASA" },
      // { label: "SPRINT", val: "48HR" },
    ],
    highlights: [
      "HAL Defense Internship",
      "GhostLAN Secure Protocol",
      "NASA Space Apps Squad",
      "StyleMate ML Engine",
      "CultureConnect DB",
      "Android App Builds",
    ],
    glow: "rgba(168, 85, 247, 0.4)",
    accent: "#a855f7",
  },
];

export const SpecsSection = () => {
  const [active, setActive] = useState("leadership");

  return (
    <section id="specs" className="relative min-h-screen bg-[#020205] py-24 px-6 lg:px-20 flex flex-col justify-center overflow-hidden font-sans">
      
      {/* ── BACKGROUND GRID ── */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `linear-gradient(#ffffff 0.5px, transparent 0.5px), linear-gradient(90deg, #ffffff 0.5px, transparent 0.5px)`, backgroundSize: "40px 40px" }} />

      {/* ── HEADER ── */}
      <div className="relative z-10 mb-16 max-w-4xl">
        <div className="flex items-center gap-3 mb-6">
          <Terminal size={14} className="text-cyan-500" />
          <span className="text-[10px] font-mono text-cyan-500 tracking-[0.6em] uppercase">Core_Profile // Authorization_Verified</span>
        </div>
        <h2 className="text-7xl md:text-9xl font-black text-white italic tracking-tighter uppercase leading-[0.8] mix-blend-difference select-none">
          TRIPLE <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-500 to-zinc-800">PILLARS.</span>
        </h2>
      </div>

      {/* ── PANELS ── */}
      <div className="relative z-10 flex flex-col md:flex-row gap-6 h-[620px]">
        {missionDimensions.map((mod) => {
          const isActive = active === mod.id;

          return (
            <motion.div
              key={mod.id}
              onHoverStart={() => setActive(mod.id)}
              onClick={() => setActive(mod.id)}
              layout
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
              className={`relative h-full rounded-[2.5rem] overflow-hidden cursor-crosshair border transition-all duration-700 ${isActive ? "flex-[4] border-white/20 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)]" : "flex-[0.8] border-white/5 bg-white/[0.02] backdrop-blur-3xl"}`}
              style={{ boxShadow: isActive ? `0 40px 100px -20px ${mod.glow}` : "none" }}
            >
              <div className={`absolute inset-0 transition-opacity duration-1000 ${isActive ? "opacity-20" : "opacity-0"}`} style={{ background: `radial-gradient(circle at top left, ${mod.accent}, transparent 70%)` }} />

              <div className="relative z-10 h-full flex flex-col p-10 bg-[#020205]/40 backdrop-blur-2xl">
                
                {/* Meta Row */}
                <div className="flex justify-between items-start mb-8">
                  <div className={`text-[12px] font-mono font-bold tracking-widest ${isActive ? "text-white" : "text-zinc-800"}`}>0{missionDimensions.indexOf(mod) + 1}</div>
                  {isActive && (
                    <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex items-center gap-2 px-4 py-1 rounded-full bg-white/5 border border-white/10">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-[9px] font-mono text-white tracking-[0.2em] uppercase italic">Module_Live</span>
                    </motion.div>
                  )}
                </div>

                {/* Header Section */}
                <div className="flex items-center gap-6 mb-8">
                  <div className={`p-4 rounded-3xl transition-all duration-700 ${isActive ? "bg-white text-black scale-110 -rotate-2" : "bg-zinc-900 text-zinc-700 grayscale"}`}>{mod.icon}</div>
                  {isActive && (
                    <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
                      <h3 className="text-4xl font-black text-white italic uppercase leading-none tracking-tighter">{mod.title}</h3>
                      <p className="text-[11px] font-mono text-zinc-500 tracking-[0.4em] uppercase mt-2">{mod.subtitle}</p>
                    </motion.div>
                  )}
                </div>

                {/* Body Content */}
                <AnimatePresence mode="wait">
                  {isActive ? (
                    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="flex-1 flex flex-col h-full">
                      
                      {/* Description */}
                      <p className="text-zinc-400 text-sm leading-relaxed max-w-2xl font-light italic border-l-2 border-white/10 pl-6 mb-8">"{mod.description}"</p>

                      {/* --- HIGHLIGHTS GRID (Uniform in all cards) --- */}
                      <div className="grid grid-cols-2 gap-x-4 gap-y-3 mb-auto">
                        {mod.highlights.map((h, i) => (
                          <div key={i} className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white/5 border border-white/5">
                            <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: mod.accent }} />
                            <span className="text-zinc-400 font-mono text-[9px] uppercase tracking-widest truncate">{h}</span>
                          </div>
                        ))}
                      </div>

                      {/* --- TACTICAL METRICS (Anchored to bottom) --- */}
                      <div className="grid grid-cols-3 gap-6 pt-8 mt-6 border-t border-white/10">
                        {mod.metrics.map((m, i) => (
                          <div key={i} className="flex flex-col">
                            <div className="text-[9px] font-mono text-zinc-600 mb-2 uppercase tracking-[0.4em]">{m.label}</div>
                            <div className="text-3xl font-black text-white italic tracking-tighter">{m.val}</div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    <div className="flex-1 flex items-center justify-center">
                      <p className="-rotate-90 text-2xl font-black text-zinc-900 tracking-[0.5em] whitespace-nowrap uppercase italic">{mod.title}</p>
                    </div>
                  )}
                </AnimatePresence>
              </div>

              {/* Watermark letter */}
              <div className={`absolute -bottom-24 -right-24 text-[400px] font-black italic select-none transition-all duration-1000 ${isActive ? "opacity-5 text-white blur-0" : "opacity-0 blur-3xl"}`}>{mod.id[0].toUpperCase()}</div>
            </motion.div>
          );
        })}
      </div>

      {/* ── HUD FOOTER ── */}
      <div className="relative z-10 mt-16 flex items-center justify-between border-t border-white/5 pt-10">
        <div className="flex items-center gap-12">
          <div className="flex items-center gap-3">
            <Terminal size={14} className="text-cyan-500" />
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.4em]">KALPESHA_SYS_v2.6</span>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <Award size={14} className="text-yellow-500" />
            <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.4em]">RANK: ACM-W CHAIR</span>
          </div>
        </div>
        <div className="text-[10px] font-mono text-zinc-800 uppercase tracking-[0.5em]">Auth: {new Date().getFullYear()} // NASHIK_HUB</div>
      </div>
    </section>
  );
};