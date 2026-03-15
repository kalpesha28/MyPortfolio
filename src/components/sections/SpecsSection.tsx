import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, BookOpen, Rocket, Terminal, Award } from 'lucide-react';

// ─── FONT INJECT ─────────────────────────────────────────────────────────────
const FontLoader: React.FC = () => {
  useEffect(() => {
    const id = 'specs-fonts';
    if (document.getElementById(id)) return;
    const l = document.createElement('link');
    l.id = id; l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Share+Tech+Mono&family=Barlow+Condensed:ital,wght@0,300;0,700;0,900;1,700&display=swap';
    document.head.appendChild(l);
  }, []);
  return null;
};

const missionDimensions = [
  {
    id: "leadership",
    title: "THE LEADER",
    subtitle: "ACM-W CHAIRPERSON & COMMUNITY BUILDER",
    icon: <Users className="w-6 h-6" />,
    description: "I don't just attend events — I build them. As ACM-W Chairperson, I've led national-level events, managed cross-functional teams, and created spaces where students actually grow.",
    metrics: [
      { label: "ROLE", val: "ACM-W" },
      { label: "SCALE", val: "NATL" },
      { label: "IMPACT", val: "7+" },
    ],
    highlights: [
      "ACM-W Chairperson",
      "GenAIthon National Lead",
      "Ideathon Event Head",
      "M-Tech Tech Coordinator",
      "Cultural Event Manager",
      "Institutional Debate Prize",
    ],
    glow: "rgba(0, 243, 255, 0.4)", // Electric Cyan
    accent: "#00f3ff",
  },
  {
    id: "academic",
    title: "THE DEVELOPER",
    subtitle: "ACADEMIC EXCELLENCE & SKILL MASTERY",
    icon: <BookOpen className="w-6 h-6" />,
    description: "Precision in academics and relentless skill acquisition. A perfect 10.0 SGPA in Semester 1 is proof of the high standard I hold while simultaneously mastering full-stack architectures and emerging technologies.",
    metrics: [
      { label: "SGPA", val: "10.0" },
      { label: "SEM", val: "06" },
      { label: "RANK", val: "TOP" },
    ],
    highlights: [
      "Perfect 10.0 SGPA",
      "Java & Python Expert",
      "MERN Stack Specialist",
      "SQL & DBMS Architect",
      "Machine Learning Focus",
      "Network Security Analyst",
    ],
    glow: "rgba(168, 85, 247, 0.4)", // Aurora Purple
    accent: "#a855f7",
  },
  {
    id: "deployment",
    title: "THE EXPLORER",
    subtitle: "CURIOUS MIND · ALWAYS EXPLORING",
    icon: <Rocket className="w-6 h-6" />,
    description: "I don't like staying in one lane. Whether it's picking up UI/UX, improving how I communicate, or jumping into a hackathon I've never tried before — I'm most alive when I'm figuring something new out.",
    metrics: [
      { label: "MINDSET", val: "GROWTH" },
      { label: "RANGE", val: "MULTI-DOMAIN" },
      { label: "MODE", val: "ALWAYS ON" },
    ],
    highlights: [
      "UI/UX DESIGN INTEREST",
      "PUBLIC SPEAKING & COMMUNICATION",
      "NASA Space Apps Squad",
      "StyleMate ML Engine",
      "EXPLORING NEW TECH STACKS",
      "CROSS-DOMAIN THINKER",
    ],
    glow: "rgba(59, 130, 246, 0.4)", // Neon Blue
    accent: "#3b82f6",
  },
];

export const SpecsSection = () => {
  const [active, setActive] = useState("leadership");

  return (
    <section id="specs" className="relative min-h-screen py-24 px-6 lg:px-20 flex flex-col justify-center overflow-hidden" style={{ background: '#03040a' }}>
      <FontLoader />

      {/* ── BACKGROUND EFFECTS (Synchronized with Hero) ── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 opacity-[0.025] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: '128px',
          }}
        />
        <div className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,243,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,243,255,1) 1px, transparent 1px)',
            backgroundSize: '55px 55px',
            maskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%, black 20%, transparent 100%)',
          }}
        />
      </div>

      {/* ── HEADER ── */}
      <div className="relative z-10 mb-16 max-w-4xl">
        <div className="flex items-center gap-3 mb-6">
          <Terminal size={14} style={{ color: '#00f3ff' }} />
          <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 10, color: '#00f3ff', letterSpacing: '0.6em', textTransform: 'uppercase' }}>
            Core_Profile // Authorization_Verified
          </span>
        </div>
        <h2 className="leading-[0.85] select-none"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(72px, 10vw, 140px)',
              letterSpacing: '0.02em',
              backgroundImage: 'linear-gradient(165deg, #ffffff 0%, #a0a0aa 50%, #383848 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 40px rgba(255,255,255,0.05))',
            }}>
          TRIPLE <br />
          <span style={{
              backgroundImage: 'linear-gradient(90deg, #00f3ff 0%, #a855f7 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>PILLARS.</span>
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

              <div className="relative z-10 h-full flex flex-col p-10 bg-[#03040a]/40 backdrop-blur-2xl">
                
                {/* Meta Row */}
                <div className="flex justify-between items-start mb-8">
                  <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 12, fontWeight: 'bold', letterSpacing: '0.2em', color: isActive ? '#ffffff' : '#52525b' }}>
                    0{missionDimensions.indexOf(mod) + 1}
                  </div>
                  {isActive && (
                    <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex items-center gap-2 px-4 py-1 rounded-full bg-white/5 border border-white/10">
                      <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#00f3ff', boxShadow: '0 0 8px #00f3ff' }} />
                      <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 9, color: '#fff', letterSpacing: '0.2em', textTransform: 'uppercase', fontStyle: 'italic' }}>Module_Live</span>
                    </motion.div>
                  )}
                </div>

                {/* Header Section */}
                <div className="flex items-center gap-6 mb-8">
                  <div className={`p-4 rounded-3xl transition-all duration-700 ${isActive ? "bg-white text-black scale-110 -rotate-2" : "bg-zinc-900 text-zinc-700 grayscale"}`}>{mod.icon}</div>
                  {isActive && (
                    <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
                      <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 44, color: '#fff', fontStyle: 'italic', lineHeight: 1, letterSpacing: '0.05em' }}>{mod.title}</h3>
                      <p style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 24, color: mod.accent, letterSpacing: '0.4em', textTransform: 'uppercase', marginTop: 8 }}>{mod.subtitle}</p>
                    </motion.div>
                  )}
                </div>

                {/* Body Content */}
                <AnimatePresence mode="wait">
                  {isActive ? (
                    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="flex-1 flex flex-col h-full">
                      
                      {/* Description */}
                      <p className="max-w-2xl pl-6 mb-8" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 20, color: '#a1a1aa', fontWeight: 300, fontStyle: 'italic', lineHeight: 1.6, borderLeft: '2px solid rgba(255,255,255,0.1)' }}>
                        "{mod.description}"
                      </p>

                      {/* --- HIGHLIGHTS GRID --- */}
                      <div className="grid grid-cols-2 gap-x-4 gap-y-3 mb-auto">
                        {mod.highlights.map((h, i) => (
                          <div key={i} className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white/5 border border-white/5">
                            <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: mod.accent, boxShadow: `0 0 8px ${mod.accent}` }} />
                            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 15, color: '#a1a1aa', letterSpacing: '0.15em', textTransform: 'uppercase' }} className="truncate">{h}</span>
                          </div>
                        ))}
                      </div>

                      {/* --- TACTICAL METRICS --- */}
                      <div className="grid grid-cols-3 gap-6 pt-8 mt-6 border-t border-white/10">
                        {mod.metrics.map((m, i) => (
                          <div key={i} className="flex flex-col">
                            <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 9, color: '#52525b', marginBottom: 8, letterSpacing: '0.4em', textTransform: 'uppercase' }}>{m.label}</div>
                            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 36, color: '#fff', fontStyle: 'italic', letterSpacing: '0.05em', lineHeight: 1 }}>{m.val}</div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    <div className="flex-1 flex items-center justify-center">
                      <p className="-rotate-90 select-none whitespace-nowrap" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, color: '#27272a', fontStyle: 'italic', letterSpacing: '0.5em' }}>{mod.title}</p>
                    </div>
                  )}
                </AnimatePresence>
              </div>

              {/* Watermark letter */}
              <div className={`absolute -bottom-24 -right-24 font-black italic select-none transition-all duration-1000 ${isActive ? "opacity-[0.03] text-white blur-0" : "opacity-0 blur-3xl"}`} style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 500, lineHeight: 1 }}>
                {mod.id[0].toUpperCase()}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ── HUD FOOTER ── */}
      <div className="relative z-10 mt-16 flex items-center justify-between border-t border-white/5 pt-10">
        <div className="flex items-center gap-12">
          <div className="flex items-center gap-3">
            <Terminal size={14} style={{ color: '#00f3ff' }} />
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 10, color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.4em' }}>KALPESHA_SYS_v2.6</span>
          </div>
          
        </div>
        <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 10, color: '#3f3f46', textTransform: 'uppercase', letterSpacing: '0.5em' }}>
          Auth: {new Date().getFullYear()} // NASHIK_HUB
        </div>
      </div>
    </section>
  );
};