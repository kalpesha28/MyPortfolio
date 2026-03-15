import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from 'framer-motion';
import { Github, ExternalLink, Lock, Terminal, Database, Smartphone, Globe, Play } from 'lucide-react';

// ─── FONT INJECT ─────────────────────────────────────────────────────────────
const FontLoader: React.FC = () => {
  useEffect(() => {
    const id = 'projects-fonts';
    if (document.getElementById(id)) return;
    const l = document.createElement('link');
    l.id = id; l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Share+Tech+Mono&family=Barlow+Condensed:ital,wght@0,300;0,700;0,900;1,700&display=swap';
    document.head.appendChild(l);
  }, []);
  return null;
};

// ─── PROJECT DATA ─────────────────────────────────────────────────────────────
const projects = [
  {
    id: '01',
    title: 'GhostLAN',
    subtitle: 'Protocol',
    type: 'DEFENSE // INTERNAL',
    icon: <Lock size={16} />,
    status: 'CLASSIFIED',
    client: 'Hindustan Aeronautics Ltd.',
    year: '2024',
    description: 'A zero-internet, LAN-only encrypted bot system engineered at HAL for transmitting classified internal documents. Built on raw socket programming with layered cryptographic handshakes — no cloud, no exposure, no trace.',
    tech: ['Java', 'Socket Programming', 'AES Cryptography', 'LAN Architecture'],
    githubUrl: 'https://github.com/kalpesha28/GhostLAN-Messenger',
    demoUrl: null, // Will trigger "WATCH DEMO"
    accent: '#00f3ff', // Electric Cyan
    accentDim: 'rgba(0,243,255,0.12)',
    image: '/GhostLAN.mp4',
  },
  {
    id: '02',
    title: 'StyleMate',
    subtitle: 'AI',
    type: 'MOBILE // ALGORITHMIC',
    icon: <Smartphone size={16} />,
    status: 'DEPLOYED',
    client: 'Personal Project',
    year: '2024',
    description: 'Android app that reads body type + event context and generates tailored outfit combinations algorithmically. A wardrobe intelligence engine disguised as a lifestyle app.',
    tech: ['Android', 'Java', 'Kotlin', 'Recommendation Engine'],
    githubUrl: 'https://github.com/Kalpesha/StyleMate',
    demoUrl: 'https://play.google.com/store',
    accent: '#a855f7', // Aurora Purple
    accentDim: 'rgba(168,85,247,0.12)',
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80',
  },
  {
    id: '03',
    title: 'CultureConnect',
    subtitle: 'Heritage OS',
    type: 'FULL-STACK // DBMS',
    icon: <Database size={16} />,
    status: 'LIVE',
    client: 'Academic Build',
    year: '2023',
    description: 'A relational database-backed heritage explorer system. Structures, queries, and serves vast local cultural and historical data across a full-stack web interface. Schema-first architecture.',
    tech: ['PostgreSQL', 'React', 'Node.js', 'Relational Modeling'],
    githubUrl: 'https://github.com/kalpesha28/CultureConnect',
    demoUrl: null, // 👈 CHANGE THIS TO NULL
    accent: '#3b82f6', 
    accentDim: 'rgba(59,130,246,0.12)',
    image: '/cultureconnect.mp4', // Your video will now open when they click "Watch Demo"
  },
  {
    id: '04',
    title: 'NASA Space Challenge App',
    subtitle: 'Space Viz',
    type: 'HACKATHON // API',
    icon: <Globe size={16} />,
    status: 'AWARDED',
    client: 'NASA Space Apps Challenge',
    year: '2023',
    description: 'Gamified deep-space data visualization platform built in 48hrs at NASA Space Apps with a 4-person squad. Pulls live NASA API feeds and renders orbital data as interactive 3D experiences.',
    tech: ['React', 'NASA Open APIs', 'Three.js', 'Data Viz'],
    githubUrl: 'https://github.com/kalpesha28/Nasa-Space-Challenge-App-2025-Space-Explorers',
    demoUrl: 'https://nasa-space-challenge-app-2025-space-explorers-q10cwuc5l.vercel.app',
    accent: '#6366f1', // Deep Indigo
    accentDim: 'rgba(99,102,241,0.12)',
    image: '/Nasa_space_challenge_app.mp4',
  },
];

// ─── STATUS PILL ─────────────────────────────────────────────────────────────
const StatusPill: React.FC<{ status: string; accent: string }> = ({ status, accent }) => {
  const colors: Record<string, string> = {
    CLASSIFIED: '#00f3ff', DEPLOYED: '#a855f7', LIVE: '#3b82f6', AWARDED: '#6366f1',
  };
  const c = colors[status] || accent;
  return (
    <div className="flex items-center gap-2 px-3 py-1" style={{ border: `1px solid ${c}44`, background: `${c}0f` }}>
      <motion.div className="w-[5px] h-[5px] rounded-full" style={{ background: c, boxShadow: `0 0 6px ${c}` }}
        animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.1, repeat: Infinity }} />
      <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 9, color: c, letterSpacing: '0.22em' }}>{status}</span>
    </div>
  );
};

// ─── CORNER TICK ─────────────────────────────────────────────────────────────
const CornerTick: React.FC<{ pos: string; color: string; flipX?: boolean; flipY?: boolean }> = ({ pos, color, flipX, flipY }) => (
  <div className={`absolute ${pos} w-4 h-4 pointer-events-none`} style={{ transform: `scale(${flipX ? -1 : 1},${flipY ? -1 : 1})` }}>
    <div className="absolute top-0 left-0 w-full h-[1px]" style={{ background: color }} />
    <div className="absolute top-0 left-0 w-[1px] h-full" style={{ background: color }} />
  </div>
);

// ─── SCAN LINE ────────────────────────────────────────────────────────────────
const CardScanLine: React.FC<{ accent: string }> = ({ accent }) => (
  <motion.div
    className="absolute inset-x-0 h-[2px] z-20 pointer-events-none"
    style={{ background: `linear-gradient(90deg, transparent, ${accent}80, ${accent}, ${accent}80, transparent)` }}
    animate={{ y: ['-4px', '540px'] }}
    transition={{ duration: 3.5, ease: 'linear', repeat: Infinity, repeatDelay: 2 }}
  />
);

// ─── PROJECT NUMBER LARGE ─────────────────────────────────────────────────────
const BigNumber: React.FC<{ id: string; accent: string }> = ({ id, accent }) => (
  <div
    className="absolute -left-4 -top-8 select-none pointer-events-none z-0 leading-none"
    style={{
      fontFamily: "'Bebas Neue', sans-serif",
      fontSize: 'clamp(120px, 14vw, 180px)',
      color: 'transparent',
      WebkitTextStroke: `1px ${accent}22`,
      letterSpacing: '-0.02em',
    }}
  >
    {id}
  </div>
);

// ─── TECH TAG ─────────────────────────────────────────────────────────────────
const TechTag: React.FC<{ label: string; accent: string; i: number }> = ({ label, accent, i }) => (
  <motion.span
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.05 * i, duration: 0.4 }}
    className="px-2 py-[3px]"
    style={{
      fontFamily: "'Share Tech Mono', monospace",
      fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase',
      color: '#71717a',
      border: '1px solid rgba(255,255,255,0.07)',
      background: 'rgba(255,255,255,0.02)',
    }}
  >
    {label}
  </motion.span>
);

// ─── CARD ─────────────────────────────────────────────────────────────────────
const ProjectCard: React.FC<{
  project: typeof projects[0]; i: number;
  scrollProgress: any; range: [number, number]; targetScale: number;
}> = ({ project, i, scrollProgress, range, targetScale }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { once: false, margin: '-20%' });

  const { scrollYProgress: innerProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'start start'],
  });
  const imageScale = useTransform(innerProgress, [0, 1], [1.3, 1]);
  const scale = useTransform(scrollProgress, range, [1, targetScale]);

  const mx = useMotionValue(0), my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 100, damping: 20 });
  const smy = useSpring(my, { stiffness: 100, damping: 20 });
  const rotX = useTransform(smy, [-0.5, 0.5], ['4deg', '-4deg']);
  const rotY = useTransform(smx, [-0.5, 0.5], ['-14deg', '14deg']);

  const handleMove = (e: React.MouseEvent) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const handleLeave = () => { mx.set(0); my.set(0); };

  const { accent, accentDim } = project;

  return (
    <div ref={cardRef} className="h-screen flex items-center justify-center sticky top-0">
      <motion.div
        style={{ scale, rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d', top: `calc(8vh + ${i * 30}px)` }}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="relative w-full max-w-[1040px] origin-top"
      >
        <BigNumber id={project.id} accent={accent} />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex flex-col lg:flex-row overflow-hidden"
          style={{
            background: 'rgba(6,7,14,0.97)',
            border: `1px solid rgba(255,255,255,0.08)`,
            boxShadow: `0 40px 100px rgba(0,0,0,0.8), 0 0 0 1px ${accent}11 inset`,
            backdropFilter: 'blur(20px)',
          }}
        >
          <div className="absolute top-0 left-0 right-0 h-[2px] z-30" style={{ background: `linear-gradient(90deg, ${accent}, ${accent}44, transparent)` }} />

          <div className="relative w-full lg:w-[420px] flex-shrink-0 flex flex-col justify-between p-8 z-10"
            style={{ borderRight: '1px solid rgba(255,255,255,0.06)' }}>

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2" style={{ color: accent }}>
                  {project.icon}
                  <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 9, color: accent, letterSpacing: '0.25em', textTransform: 'uppercase' }}>
                    {project.type}
                  </span>
                </div>
                <StatusPill status={project.status} accent={accent} />
              </div>

              <div className="relative mb-1">
                <h3 className="leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(44px, 5vw, 60px)', color: '#fff', letterSpacing: '0.03em' }}>
                  {project.title}
                </h3>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 300, fontSize: 16, color: accent, letterSpacing: '0.1em', marginTop: 2 }}>
                  {project.subtitle}
                </div>
                <motion.div className="h-[2px] mt-3" style={{ background: `linear-gradient(90deg, ${accent}, ${accent}22, transparent)` }} initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : { scaleX: 0 }} transition={{ duration: 0.7, ease: 'easeOut', delay: 0.3 }} />
              </div>

              <div className="flex items-center gap-4 mt-4 mb-5">
                <div>
                  <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 8, color: '#3f3f46', letterSpacing: '0.2em', textTransform: 'uppercase' }}>CLIENT</div>
                  <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 10, color: '#71717a', letterSpacing: '0.1em' }}>{project.client}</div>
                </div>
                <div className="w-[1px] h-8" style={{ background: 'rgba(255,255,255,0.08)' }} />
                <div>
                  <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 8, color: '#3f3f46', letterSpacing: '0.2em', textTransform: 'uppercase' }}>YEAR</div>
                  <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 10, color: '#71717a', letterSpacing: '0.1em' }}>{project.year}</div>
                </div>
              </div>

              <p className="mb-6" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 300, fontSize: 15.5, color: '#a1a1aa', lineHeight: 1.65 }}>
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tech.map((t, idx) => <TechTag key={idx} label={t} accent={accent} i={idx} />)}
              </div>
            </div>

            <div className="flex gap-3 mt-8 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noreferrer" className="group flex items-center gap-2 px-4 py-2 transition-all duration-300" style={{ background: '#fff', color: '#000' }}>
                  <Github size={13} />
                  <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 10, letterSpacing: '0.1em', fontWeight: 700 }}>SOURCE</span>
                </a>
              )}
              
              {/* SMART BUTTON LOGIC: Switches between Live URL and Video Demo */}
              <a 
                href={project.demoUrl || project.image} 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center gap-2 px-4 py-2 transition-all duration-300 hover:bg-white/5" 
                style={{ border: `1px solid ${accent}55`, color: accent }}
              >
                {project.demoUrl ? <ExternalLink size={13} /> : <Play size={13} />}
                <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 10, letterSpacing: '0.1em' }}>
                  {project.demoUrl ? 'LIVE DEPLOY' : 'WATCH DEMO'}
                </span>
              </a>

            </div>
          </div>

          <div className="relative flex-1 h-[280px] lg:h-auto overflow-hidden bg-black">
            <CardScanLine accent={accent} />
            <CornerTick pos="top-3 left-3" color={`${accent}88`} />
            <CornerTick pos="top-3 right-3" color={`${accent}88`} flipX />
            <CornerTick pos="bottom-3 left-3" color={`${accent}44`} flipY />
            <CornerTick pos="bottom-3 right-3" color={`${accent}44`} flipX flipY />

            <motion.div style={{ scale: imageScale }} className="w-full h-full">
              {project.image.endsWith('.mp4') ? (
                <video
                  src={project.image}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                  style={{ filter: 'contrast(1.1) saturate(0.6) brightness(0.85)' }}
                />
              ) : (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  style={{ filter: 'contrast(1.1) saturate(0.6) brightness(0.85)' }}
                />
              )}
            </motion.div>

            <div className="absolute top-4 right-4 z-20 flex items-center gap-2 px-3 py-1 backdrop-blur-sm" style={{ background: 'rgba(0,0,0,0.65)', border: `1px solid ${accent}44` }}>
              <motion.div className="w-[5px] h-[5px] rounded-full" style={{ background: accent }} animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 0.9, repeat: Infinity }} />
              <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 8, color: accent, letterSpacing: '0.2em' }}>FEED // ACTIVE</span>
            </div>
            <div className="absolute bottom-4 left-4 z-20 select-none pointer-events-none" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 80, color: `${accent}18`, lineHeight: 1, letterSpacing: '-0.02em' }}>
              {project.id}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

// ─── SECTION HEADER ───────────────────────────────────────────────────────────
const SectionHeader: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="sticky top-0 z-40 pt-20 pb-8 px-6 max-w-6xl mx-auto"
      style={{ background: 'linear-gradient(180deg, #03040a 80%, transparent)' }}>

      {/* Eyebrow */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-4 mb-3"
      >
        <div className="h-[1px] w-10" style={{ background: 'linear-gradient(90deg, #00f3ff, transparent)' }} />
        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 10, color: '#00f3ff', letterSpacing: '0.35em', textTransform: 'uppercase' }}>
          03 // DEPLOYMENTS
        </span>
      </motion.div>

      {/* Main title row */}
      <div className="flex items-end justify-between flex-wrap gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative"
        >
          <h2
            className="text-transparent bg-clip-text leading-none"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(52px, 9vw, 100px)',
              letterSpacing: '0.02em',
              backgroundImage: 'linear-gradient(165deg, #ffffff 0%, #a0a0aa 50%, #383848 100%)',
              filter: 'drop-shadow(0 0 30px rgba(255,255,255,0.05))',
            }}
          >
            SELECTED
            <br />
            <span style={{
              backgroundImage: 'linear-gradient(90deg, #00f3ff 0%, #a855f7 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>WORKS.</span>
          </h2>
          {/* Blue underline */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
            className="absolute -bottom-2 left-0 h-[3px] w-2/3"
            style={{ background: 'linear-gradient(90deg, #3b82f6, rgba(59,130,246,0.3), transparent)', transformOrigin: 'left' }}
          />
        </motion.div>

        {/* Right counter */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-3 pb-2"
        >
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 48, color: '#fff', lineHeight: 1, letterSpacing: '0.05em' }}>
            {String(projects.length).padStart(2, '0')}
          </div>
          <div>
            <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 8, color: '#52525b', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Projects</div>
            <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 8, color: '#52525b', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Indexed</div>
          </div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="flex items-center gap-3 mt-5"
      >
        <motion.div className="flex gap-[3px]" animate={{ x: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
          {[0, 1, 2].map(i => (
            <div key={i} className="w-[6px] h-[1px]" style={{ background: `rgba(255,255,255,${0.15 + i * 0.15})` }} />
          ))}
        </motion.div>
        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 9, color: '#3f3f46', letterSpacing: '0.3em', textTransform: 'uppercase' }}>
          Scroll to deploy
        </span>
      </motion.div>

      {/* Bottom border line */}
      <div className="absolute bottom-0 left-6 right-6 h-[1px]" style={{ background: 'linear-gradient(90deg, rgba(0,243,255,0.2), transparent)' }} />
    </div>
  );
};

// ─── MAIN SECTION ─────────────────────────────────────────────────────────────
export const ProjectsSection: React.FC = () => {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: container, offset: ['start start', 'end end'] });

  return (
    <section ref={container} id="projects" className="relative" style={{ background: '#03040a' }}>
      <FontLoader />

      {/* BG effects */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Noise */}
        <div className="absolute inset-0 opacity-[0.025] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: '128px',
          }}
        />
        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,243,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,243,255,1) 1px, transparent 1px)',
            backgroundSize: '55px 55px',
            maskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%, black 20%, transparent 100%)',
          }}
        />
      </div>

      {/* Section header */}
      <SectionHeader />

      {/* Stacking cards */}
      <div className="flex flex-col mt-8 pb-32 px-4">
        {projects.map((project, i) => {
          const targetScale = 1 - (projects.length - 1 - i) * 0.038;
          return (
            <ProjectCard
              key={project.id}
              project={project}
              i={i}
              scrollProgress={scrollYProgress}
              range={[i / projects.length, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </div>
    </section>
  );
};

export default ProjectsSection;