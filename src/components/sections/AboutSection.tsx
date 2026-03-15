import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useInView } from 'framer-motion';

// ─── FONT INJECT ─────────────────────────────────────────────────────────────
const FontLoader: React.FC = () => {
  useEffect(() => {
    const id = 'about-fonts';
    if (document.getElementById(id)) return;
    const l = document.createElement('link');
    l.id = id; l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Share+Tech+Mono&family=Barlow+Condensed:ital,wght@0,300;0,700;0,900;1,700&display=swap';
    document.head.appendChild(l);
  }, []);
  return null;
};

// ─── ANIMATED COUNTER ────────────────────────────────────────────────────────
const AnimCounter: React.FC<{ to: number; suffix?: string; duration?: number }> = ({ to, suffix = '', duration = 1400 }) => {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setVal(Math.round(ease * to));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, to, duration]);

  return <span ref={ref}>{val}{suffix}</span>;
};

// ─── SCAN LINE ────────────────────────────────────────────────────────────────
const ScanLine: React.FC = () => (
  <motion.div
    className="absolute inset-x-0 h-[1.5px] pointer-events-none z-20"
    style={{ background: 'linear-gradient(90deg,transparent,rgba(0,243,255,.35),transparent)' }}
    animate={{ y: ['-20px', '110%'] }}
    transition={{ duration: 5, ease: 'linear', repeat: Infinity, repeatDelay: 6 }}
  />
);

// ─── 3D ID CARD ───────────────────────────────────────────────────────────────
const IDCard: React.FC = () => {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 120, damping: 18 });
  const smy = useSpring(my, { stiffness: 120, damping: 18 });
  const rotX = useTransform(smy, [-0.5, 0.5], ['14deg', '-14deg']);
  const rotY = useTransform(smx, [-0.5, 0.5], ['-14deg', '14deg']);

  const handleMove = (e: React.MouseEvent) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top)  / r.height - 0.5);
  };
  const handleLeave = () => { mx.set(0); my.set(0); };

  return (
    <motion.div
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d', perspective: '900px' }}
      className="relative w-full max-w-[380px] mx-auto"
    >
      <motion.div
        className="absolute -inset-6 rounded-[32px] blur-[60px] opacity-40 pointer-events-none z-0"
        style={{
          background: useTransform([smx, smy], ([x, y]: number[]) =>
            `radial-gradient(circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, rgba(0,243,255,.5), rgba(109,40,217,.4) 60%, transparent)`
          ),
        }}
      />

      <div
        className="relative z-10 rounded-[20px] overflow-hidden group"
        style={{
          background: 'linear-gradient(145deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 30px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(0,243,255,0.08) inset',
          backdropFilter: 'blur(12px)',
        }}
      >
        <motion.div
          className="absolute inset-0 pointer-events-none z-10 opacity-0 group-hover:opacity-100"
          style={{
            background: useTransform([smx, smy], ([x, y]: number[]) =>
              `radial-gradient(circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, rgba(0,243,255,.12) 0%, rgba(139,92,246,.1) 40%, transparent 70%)`
            ),
          }}
        />

        <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #6d28d9, #00f3ff, #6d28d9)' }} />

        <div className="p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="text-[10px] tracking-[0.3em] uppercase mb-1" style={{ fontFamily: "'Share Tech Mono', monospace", color: 'rgba(0,243,255,0.6)' }}>
                IDENTIFICATION CARD
              </div>
              <div className="text-[10px] tracking-[0.2em] uppercase" style={{ fontFamily: "'Share Tech Mono', monospace", color: '#52525b' }}>
                COMP_ENG // LEADERSHIP
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] tracking-widest uppercase mb-1" style={{ fontFamily: "'Share Tech Mono', monospace", color: '#52525b' }}>RANK</div>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 26, color: '#fff', letterSpacing: '0.05em' }}>ACM CHAIR</div>
            </div>
          </div>

          <div
            className="relative w-full rounded-xl overflow-hidden mb-6"
            style={{ aspectRatio: '3/3.2', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <ScanLine />
            <img src="/public/memoji.png" alt="Kalpesha" className="w-full h-full object-cover" style={{ filter: 'contrast(1.05) saturate(0.9)' }} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
            
            <div className="absolute inset-0 pointer-events-none opacity-30" style={{ backgroundImage: 'linear-gradient(rgba(0,243,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0,243,255,0.15) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
            
            {[['top-2 left-2', ''], ['top-2 right-2', 'scaleX(-1)'], ['bottom-2 left-2', 'scaleY(-1)'], ['bottom-2 right-2', 'scale(-1,-1)']].map(([p, t], i) => (
              <div key={i} className={`absolute ${p} w-5 h-5 pointer-events-none`} style={{ transform: t }}>
                <div className="absolute top-0 left-0 w-full h-[1px] bg-cyan-400 opacity-70" />
                <div className="absolute top-0 left-0 w-[1px] h-full bg-cyan-400 opacity-70" />
              </div>
            ))}

            <div className="absolute bottom-0 left-0 right-0 px-4 py-3" style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.85))' }}>
              <div className="flex items-center gap-2">
                <motion.div className="w-[6px] h-[6px] rounded-full bg-[#00f3ff]" animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.1, repeat: Infinity }} style={{ boxShadow: '0 0 8px #00f3ff' }} />
                <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 10, color: '#00f3ff', letterSpacing: '0.2em' }}>ONLINE // ACTIVE</span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 44, color: '#fff', letterSpacing: '0.02em', lineHeight: 1 }}>
              KALPESHA
            </div>
            <div className="mt-1" style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 11, color: '#71717a', letterSpacing: '0.2em' }}>
              SOFTWARE ENGINEER &nbsp;<span style={{ color: '#3b82f6' }}>///</span>&nbsp; TECH LEAD
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex gap-[2px] h-6">
              {Array.from({ length: 32 }).map((_, i) => (
                <div key={i} className="bg-white rounded-[1px]" style={{ width: i % 3 === 0 ? 3 : 1, opacity: 0.15 + Math.random() * 0.45 }} />
              ))}
            </div>
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 8, color: '#3f3f46', letterSpacing: '0.15em' }}>
              K4LP3SH4-ACM-CE
            </span>
          </div>
        </div>
        
        <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #00f3ff, #3b82f6, #00f3ff)' }} />
      </div>
    </motion.div>
  );
};

// ─── TRAIT CARD ───────────────────────────────────────────────────────────────
const TraitCard: React.FC<{ icon: string; label: string; sub: string; accent: string; delay: number; }> = ({ icon, label, sub, accent, delay }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative p-6 cursor-default overflow-hidden flex flex-col justify-center min-h-[140px]" 
      style={{
        border: `1px solid ${hovered ? accent + '55' : 'rgba(255,255,255,0.07)'}`,
        background: hovered ? `${accent}08` : 'rgba(255,255,255,0.02)',
        transition: 'all .3s ease',
      }}
    >
      <motion.div className="absolute left-0 top-0 bottom-0 w-[3px]" animate={{ scaleY: hovered ? 1 : 0 }} transition={{ duration: 0.3 }} style={{ background: accent, transformOrigin: 'top' }} />
      <div className="text-3xl mb-3" style={{ color: accent }}>{icon}</div> 
      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 26, color: '#fff', letterSpacing: '0.05em', lineHeight: 1 }}>{label}</div> 
      <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 12, color: '#a1a1aa', letterSpacing: '0.15em', marginTop: 6, textTransform: 'uppercase' }}>{sub}</div> 
    </motion.div>
  );
};

// ─── STATUS ROW ───────────────────────────────────────────────────────────────
const StatusRow: React.FC<{ label: string; status: string; color: string; delay: number }> = ({ label, status, color, delay }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div 
      ref={ref} 
      initial={{ opacity: 0, x: -10 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay, duration: 0.5 }}
      className="flex items-center justify-between py-2" 
    >
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}` }} />
        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 12, color: '#d4d4d8', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          {label}
        </span>
      </div>
      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: color, letterSpacing: '0.05em' }}> 
        [{status}]
      </div>
    </motion.div>
  );
};

// ─── MAIN EXPORT ──────────────────────────────────────────────────────────────
export const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-10%' });

  return (
    <section ref={sectionRef} className="relative min-h-screen py-28 px-6 flex flex-col items-center justify-center overflow-hidden" style={{ background: '#03040a' }}>
      <FontLoader />

      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div className="absolute rounded-full blur-[120px]" style={{ width: 500, height: 500, top: '-10%', right: '-8%', background: 'rgba(109,40,217,0.09)' }} animate={{ scale: [1, 1.15, 1], x: [0, 20, 0] }} transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.div className="absolute rounded-full blur-[100px]" style={{ width: 400, height: 400, bottom: '-5%', left: '-5%', background: 'rgba(0,243,255,0.06)' }} animate={{ scale: [1, 1.2, 1], y: [0, -20, 0] }} transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }} />
        <div className="absolute inset-0 opacity-[0.045]" style={{ backgroundImage: 'linear-gradient(rgba(0,243,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,243,255,1) 1px, transparent 1px)', backgroundSize: '55px 55px', maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)' }} />
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: '128px' }} />
      </div>

      <motion.div initial={{ opacity: 0, y: -20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: 'easeOut' }} className="relative z-10 text-center mb-16 w-full max-w-7xl">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="h-[1px] w-16" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,243,255,0.6))' }} />
          <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 13, color: 'rgba(0,243,255,0.8)', letterSpacing: '0.35em', textTransform: 'uppercase' }}>02 // THE OPERATOR</span>
          <div className="h-[1px] w-16" style={{ background: 'linear-gradient(90deg, rgba(0,243,255,0.6), transparent)' }} />
        </div>
        <div className="relative inline-block">
          <h2 className="text-transparent bg-clip-text" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(52px, 9vw, 110px)', letterSpacing: '-0.01em', lineHeight: 0.92, backgroundImage: 'linear-gradient(165deg, #ffffff 0%, #a0a0aa 50%, #383848 100%)', filter: 'drop-shadow(0 0 40px rgba(255,255,255,0.05))' }}>DOSSIER</h2>
          <motion.div initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}} transition={{ delay: 0.6, duration: 0.7, ease: 'easeOut' }} className="absolute -bottom-1 left-0 right-0 h-[3px]" style={{ background: 'linear-gradient(90deg, #3b82f6, rgba(59,130,246,0.3), transparent)', transformOrigin: 'left' }} />
        </div>
      </motion.div>

      {/* ── MAIN CONTENT WRAPPER ── */}
      <div className="relative z-10 max-w-7xl w-full flex flex-col gap-16">
        
        {/* TOP ROW: ID Card + Bio (2 Columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-12 xl:gap-20 items-center">
          
          <motion.div initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}>
            <IDCard />
          </motion.div>

          <div className="space-y-10">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}>
              <h3 className="leading-[1.05] mb-8" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 900, color: '#fff' }}> 
                Building Software. <br />
                <span className="italic" style={{ background: 'linear-gradient(90deg, #00f3ff, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Leading Communities.</span> <br />
                Pushing <span style={{ color: '#3b82f6' }}>Boundaries.</span>
              </h3>
              
              <div className="space-y-6" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 300, fontSize: 25, color: '#d4d4d8', lineHeight: 1.6 }}>
                <p>
                  I'm a 3rd-year <span style={{ color: '#fff', fontWeight: 700 }}>Computer Engineering</span> student who loves being at the intersection of building things and bringing people together. As the <span style={{ color: '#00f3ff', fontWeight: 700 }}>ACM Chairperson</span> and an active member of the College Tech Team, I don't just write code; I help create the spaces where tech happens.
                                  </p>
                <p>
                  I've organized and led 7+ events — from national-level hackathons and ideathons to group discussions, debates, and technical workshops. I've also represented my college at national hackathons and the <span style={{ color: '#fff', fontWeight: 700 }}>ACM India Summit</span>. Whether I'm picking up a new stack, volunteering with NSS, or shipping a new project, what keeps me going is simple: <span style={{ color: '#fff', fontWeight: 700 }}>curiosity and the drive to just get things done.</span>    
                </p>
              </div>
            </motion.div>

            {/* SYSTEM CAPABILITIES (Moved inside the bio section to balance the ID Card height) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.5 }}
              className="space-y-4 py-8"
              style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 18, color: '#a1a1aa', letterSpacing: '0.25em', textTransform: 'uppercase' }}> 
                  SYSTEM CAPABILITIES
                </span>
                <div className="flex-1 h-[1px]" style={{ background: 'rgba(255,255,255,0.06)' }} />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                <StatusRow label="Full-Stack Dev" status="DEPLOYED" color="#00f3ff" delay={0.5} />
                <StatusRow label="Event Leadership" status="SCALING" color="#a855f7" delay={0.6} />
                <StatusRow label="Problem Solving" status="INTEGRATING" color="#3b82f6" delay={0.7} />
                <StatusRow label="Continuous Learning" status="ACTIVE" color="#6366f1" delay={0.8} />
              </div>
            </motion.div>
          </div>
        </div>

        {/* BOTTOM ROW: Metrics & Traits (Spans Full Width) */}
        <div className="flex flex-col gap-6 pt-4">
          
          {/* METRICS (Full Width Grid) */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: 'easeOut', delay: 0.6 }} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { val: 7, suf: '+', label: 'EVENTS ORGANIZED & LED' },
              { val: 5, suf: '+', label: 'PROJECTS BUILT' },
              { val: 3, suf: 'rd', label: 'YEAR COMP ENGINEERING' },
            ].map((m, i) => (
              <div key={i} className="flex flex-col items-center justify-center py-8 px-4" style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 64, color: '#fff', lineHeight: 1, letterSpacing: '0.04em' }}> 
                  <AnimCounter to={m.val} suffix={m.suf} />
                </div>
                <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 12, color: '#a1a1aa', letterSpacing: '0.2em', textAlign: 'center', marginTop: 8, textTransform: 'uppercase' }}>{m.label}</div>
              </div>
            ))}
          </motion.div>

          {/* TRAITS (Full Width 4-Column Grid) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <TraitCard icon="⌬" label="THE LEADER"     sub="ACM Chair · Tech Team"        accent="#00f3ff" delay={0.7} />
            <TraitCard icon="⌘" label="THE FULL STACK" sub="Java · React · Web Apps"          accent="#a855f7" delay={0.8} />
            <TraitCard icon="⊕" label="THE ML MIND"    sub="Machine Learning · Logic"     accent="#3b82f6" delay={0.9} />
            <TraitCard icon="◈" label="THE CREATOR"    sub="NSS · Cultural · Events"       accent="#6366f1" delay={1.0} />
          </div>
          
        </div>

      </div>
    </section>
  );
};

export default AboutSection;