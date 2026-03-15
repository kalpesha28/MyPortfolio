import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Shield, Server, Lock, Cpu, CloudOff, Activity, TerminalSquare } from 'lucide-react';

// ─── DECRYPTING TEXT EFFECT ───
const DecryptText = ({ text, inView }: { text: string; inView: boolean }) => {
  const [display, setDisplay] = useState(text.replace(/[a-zA-Z]/g, '█'));
  
  useEffect(() => {
    if (!inView) return;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';
    let iterations = 0;
    const interval = setInterval(() => {
      setDisplay(text.split('').map((letter, index) => {
        if (index < iterations) return text[index];
        return chars[Math.floor(Math.random() * chars.length)];
      }).join(''));
      if (iterations >= text.length) clearInterval(interval);
      iterations += 1 / 3; 
    }, 30);
    return () => clearInterval(interval);
  }, [text, inView]);

  return <span>{display}</span>;
};

// ─── CLEAN NETWORK VISUALIZER ───
const GhostLanVisualizer = () => {
  return (
    <div className="relative w-full aspect-square max-w-[500px] mx-auto group mt-8 lg:mt-0 shadow-[0_0_80px_rgba(0,243,255,0.05)] rounded-2xl">
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#03040a] to-[#0a0f1a] border border-white/10 overflow-hidden">
        
        {/* Tactical Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,243,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,243,255,0.05)_1px,transparent_1px)] bg-[size:30px_30px]" />
        
        {/* SVG Network Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ filter: 'drop-shadow(0 0 8px rgba(0,243,255,0.5))' }}>
          {/* Secure Triangle */}
          <motion.polygon 
            points="100,350 250,150 400,350" fill="none" stroke="#00f3ff" strokeWidth="2" strokeDasharray="10 10"
            animate={{ strokeDashoffset: [0, -100] }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="opacity-50"
          />
          {/* Blocked Connection */}
          <line x1="250" y1="150" x2="400" y2="80" stroke="#ff003c" strokeWidth="2" strokeDasharray="4 4" className="opacity-40" />
        </svg>

        {/* ── SECURE NODES ── */}
        <div className="absolute bottom-[20%] left-[15%] flex flex-col items-center">
          <div className="relative w-12 h-12 rounded-lg border border-[#00f3ff] bg-[#00f3ff]/10 flex items-center justify-center backdrop-blur-md z-10">
            <TerminalSquare size={20} className="text-[#00f3ff]" />
            <motion.div className="absolute inset-0 rounded-lg border border-[#00f3ff]" animate={{ scale: [1, 1.4], opacity: [0.8, 0] }} transition={{ duration: 2, repeat: Infinity }} />
          </div>
          <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 10, color: '#00f3ff', marginTop: 8 }}>TERM_01</span>
        </div>

        <div className="absolute bottom-[20%] right-[15%] flex flex-col items-center">
          <div className="relative w-12 h-12 rounded-lg border border-[#00f3ff] bg-[#00f3ff]/10 flex items-center justify-center backdrop-blur-md z-10">
            <Server size={20} className="text-[#00f3ff]" />
          </div>
          <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 10, color: '#00f3ff', marginTop: 8 }}>DB_SECURE</span>
        </div>

        <div className="absolute top-[25%] left-1/2 -translate-x-1/2 flex flex-col items-center">
          <div className="relative w-16 h-16 rounded-xl border-2 border-[#a855f7] bg-[#a855f7]/20 flex items-center justify-center backdrop-blur-md z-10 shadow-[0_0_30px_rgba(168,85,247,0.4)]">
            <Activity size={28} className="text-[#a855f7]" />
          </div>
          <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 12, color: '#a855f7', marginTop: 8, fontWeight: 'bold' }}>GHOSTLAN_CORE</span>
        </div>

        <div className="absolute top-[10%] right-[10%] flex flex-col items-center opacity-50">
          <div className="relative w-10 h-10 rounded-full border border-[#ff003c] bg-[#ff003c]/10 flex items-center justify-center backdrop-blur-md z-10">
            <CloudOff size={16} className="text-[#ff003c]" />
          </div>
          <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 9, color: '#ff003c', marginTop: 8 }}>EXT_CLOUD</span>
        </div>

        {/* Firewall Barrier */}
        <div className="absolute top-[18%] right-[25%] -rotate-45 flex items-center justify-center">
          <Shield size={24} className="text-[#ff003c] absolute z-20" />
          <motion.div className="w-12 h-[2px] bg-[#ff003c]" animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 0.5, repeat: Infinity }} />
        </div>

        {/* HUD Elements */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#00f3ff] animate-pulse" />
          <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 10, color: '#00f3ff', letterSpacing: '0.1em' }}>AIR-GAPPED : TRUE</span>
        </div>
        
        {/* Animated Data Packets (Glowing Orbs moving along the SVG path) */}
        <motion.div className="absolute w-2 h-2 rounded-full bg-[#fff] shadow-[0_0_10px_#fff] z-20" animate={{ x: [100, 250, 400, 100], y: [350, 150, 350, 350] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} />
        <motion.div className="absolute w-2 h-2 rounded-full bg-[#fff] shadow-[0_0_10px_#fff] z-20" animate={{ x: [400, 250, 100, 400], y: [350, 150, 350, 350] }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} />
      </div>
    </div>
  );
};

// ─── MAIN SECTION ───
export const ExperienceSection = () => {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, margin: "-10%" });

  return (
    <section id="experience" ref={containerRef} className="relative py-32 px-6 lg:px-20 overflow-hidden" style={{ background: '#03040a' }}>
      
      {/* Subtle Scanlines Background */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.05]" style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #fff 2px, #fff 4px)' }} />

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* ── HEADER ── */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="mb-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-[1px] w-12 bg-gradient-to-r from-[#a855f7] to-transparent" />
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 13, color: '#a855f7', letterSpacing: '0.4em', textTransform: 'uppercase' }}>
              04 // Operations Log
            </span>
          </div>
          <h2 className="leading-[0.9]" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(60px, 9vw, 130px)', letterSpacing: '0.02em', color: '#fff' }}>
            PROFESSIONAL <br />
            <span style={{ backgroundImage: 'linear-gradient(90deg, #00f3ff, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>EXPERIENCE.</span>
          </h2>
        </motion.div>

        {/* ── CONTENT GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-center">
          
          {/* LEFT: MISSION BRIEFING */}
          <motion.div initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }} className="space-y-8 relative">
            
            <div className="absolute -top-10 -right-10 border-4 border-[#ff003c]/10 text-[#ff003c]/10 rounded-lg px-4 py-2 rotate-12 select-none pointer-events-none hidden md:block" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 40, letterSpacing: '0.1em' }}>
              TOP SECRET
            </div>

            {/* Title Block */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded border border-[#00f3ff]/30 bg-[#00f3ff]/5" style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 12, color: '#00f3ff', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                <Shield size={14} /> Global Aerospace & Defense
              </div>
              <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(36px, 4vw, 54px)', fontWeight: 900, color: '#fff', lineHeight: 1.1 }}>
                <DecryptText text="Hindustan Aeronautics Limited" inView={inView} />
              </h3>
              <div className="mt-2" style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 18, color: '#a855f7', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                IT Engineering Intern
              </div>
            </div>

            {/* Mission Description */}
            <div className="space-y-5" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 20, fontWeight: 300, color: '#d4d4d8', lineHeight: 1.6 }}>
              <p>
                Interned at the IT Department of <span className="text-white font-bold">HAL's</span>— Nashik Division — one of India's most iconic aerospace and defense manufacturers, where I got to work on real infrastructure used within a secure facility.

              </p>
              <p>
                My core project was building <span className="text-[#00f3ff] font-bold tracking-wider"><DecryptText text="GHOSTLAN" inView={inView} /></span>: — a zero-internet, air-gapped LAN communication system designed for secure internal use. I built the backend server logic in Java, developed the interface using React & Node.js, and implemented AES encryption to keep all data transfers completely contained within the local network — no cloud, no exposure.
              </p>
            </div>

            {/* Tech Stack Modules */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-white/10">
              {[
                { icon: <Server size={24} />, title: "Socket Prog.", sub: "Raw Transmission" },
                { icon: <Lock size={24} />, title: "AES Crypto", sub: "Layered Handshakes" },
                { icon: <Cpu size={24} />, title: "Java Core", sub: "Backend Protocol" },
                { icon: <CloudOff size={24} />, title: "Air-Gapped", sub: "Zero Cloud Exposure" },
              ].map((tech, i) => (
                <div key={i} className="flex items-start gap-4 p-5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[#a855f7]/40 hover:bg-[#a855f7]/5 transition-all duration-300">
                  <div className="text-[#00f3ff] mt-1">{tech.icon}</div>
                  <div>
                    <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, color: '#fff', letterSpacing: '0.05em' }}>{tech.title}</div>
                    <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 11, color: '#a1a1aa', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 3 }}>{tech.sub}</div>
                  </div>
                </div>
              ))}
            </div>

          </motion.div>

          {/* RIGHT: CLEAN NETWORK VISUALIZER */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 1, delay: 0.4 }} className="relative flex items-center justify-center lg:justify-end">
            <GhostLanVisualizer />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;