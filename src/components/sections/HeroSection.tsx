import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';

// ─── TYPES ───────────────────────────────────────────────────────────────────
interface Particle {
  x: number; y: number; vx: number; vy: number;
  size: number;
}
interface Orb { x: number; y: number; r: number; color: string; speed: number; angle: number; }

// ─── DYNAMIC NETWORK BACKGROUND ──────────────────────────────────────────────
const NetworkCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    let raf: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Glowing Aurora Orbs
    const orbs: Orb[] = [
      { x: 0.3, y: 0.4, r: 0.35, color: 'rgba(109,40,217,.12)', speed: 0.0002, angle: 0 },
      { x: 0.7, y: 0.6, r: 0.30, color: 'rgba(0,243,255,.08)',   speed: 0.0003, angle: 2.1 },
      { x: 0.5, y: 0.8, r: 0.25, color: 'rgba(255,0,60,.05)',    speed: 0.0004, angle: 4.3 },
    ];

    // Network Nodes
    const particles: Particle[] = Array.from({ length: 80 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 1,
    }));

    const draw = () => {
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      // Draw Aurora
      orbs.forEach(o => {
        o.angle += o.speed;
        const x = (o.x + Math.cos(o.angle) * 0.1) * W;
        const y = (o.y + Math.sin(o.angle) * 0.1) * H;
        const g = ctx.createRadialGradient(x, y, 0, x, y, o.r * W);
        g.addColorStop(0, o.color);
        g.addColorStop(1, 'transparent');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.ellipse(x, y, o.r * W, o.r * 0.65 * H, 0, 0, Math.PI * 2);
        ctx.fill();
      });

      // Update and Draw Network Nodes
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around screen
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;

        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw Connecting Lines
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 243, 255, ${0.2 * (1 - dist / 150)})`;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />;
};

// ─── GLITCH NAME ─────────────────────────────────────────────────────────────
const GlitchName: React.FC = () => {
  const [glitch, setGlitch] = useState<{ rClip: string; cClip: string; rX: number; cX: number } | null>(null);

  useEffect(() => {
    const schedule = () => {
      const delay = 1800 + Math.random() * 3500;
      setTimeout(() => {
        const r1 = Math.random() * 40, r2 = Math.random() * 40;
        const c1 = Math.random() * 40 + 10, c2 = Math.random() * 30;
        const rX = (Math.random() - 0.5) * 12, cX = (Math.random() - 0.5) * 9;
        setGlitch({ rClip: `inset(${r1}% 0 ${r2}% 0)`, cClip: `inset(${c1}% 0 ${c2}% 0)`, rX, cX });
        setTimeout(() => setGlitch(null), 110);
        setTimeout(() => {
          setGlitch({ rClip: `inset(${60 - r1}% 0 ${50 - r2}% 0)`, cClip: `inset(${c2}% 0 ${c1}% 0)`, rX: -rX * 0.6, cX: -cX * 0.6 });
          setTimeout(() => { setGlitch(null); schedule(); }, 80);
        }, 160);
      }, delay);
    };
    schedule();
  }, []);

  // Shared gradient for both names
  const gradientStyle = {
    backgroundImage: 'linear-gradient(170deg, #ffffff 0%, #b0b0ba 40%, #383848 100%)',
    filter: 'drop-shadow(0 0 55px rgba(255,255,255,0.07))',
  };

  // The actual text layout
  const NameText = () => (
    <div className="flex flex-col items-center justify-center pointer-events-none">
      <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(72px, 15vw, 190px)', lineHeight: 0.8, letterSpacing: '0.02em', userSelect: 'none' }}>
        KALPESHA
      </span>
      <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(24px, 5vw, 60px)', lineHeight: 0.9, letterSpacing: '0.4em', userSelect: 'none', marginTop: '1vw', marginLeft: '0.4em' }}>
        SANER
      </span>
    </div>
  );

  return (
    <div className="relative flex flex-col items-center">
      
      {/* Main Base Text */}
      <div className="text-transparent bg-clip-text" style={gradientStyle}>
        <NameText />
      </div>

      {/* Glitch Red Layer */}
      {glitch && (
        <div
          className="absolute inset-0 text-[#ff003c]"
          style={{ mixBlendMode: 'screen', clipPath: glitch.rClip, transform: `translate(${glitch.rX}px, 0)` }}
        >
          <NameText />
        </div>
      )}

      {/* Glitch Cyan Layer */}
      {glitch && (
        <div
          className="absolute inset-0 text-[#00f3ff]"
          style={{ mixBlendMode: 'screen', clipPath: glitch.cClip, transform: `translate(${glitch.cX}px, 0)` }}
        >
          <NameText />
        </div>
      )}
    </div>
  );
};

// ─── STATUS BADGE ────────────────────────────────────────────────────────────
const StatusBadge: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, y: -16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, ease: 'easeOut' }}
    className="relative mb-8 overflow-hidden flex items-center gap-3 px-5 py-[7px] rounded-full"
    style={{ border: '1px solid rgba(0,243,255,0.3)', background: 'rgba(0,243,255,0.05)' }}
  >
    <motion.div
      className="w-[6px] h-[6px] rounded-full bg-cyan-400 flex-shrink-0"
      style={{ boxShadow: '0 0 10px #00f3ff' }}
      animate={{ opacity: [1, 0.4, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#00f3ff' }}>
      Portfolio Online
    </span>
  </motion.div>
);

// ─── MAIN EXPORT ─────────────────────────────────────────────────────────────
export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 0);
  const mouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 0);
  const smoothX = useSpring(mouseX, { stiffness: 60, damping: 22 });
  const smoothY = useSpring(mouseY, { stiffness: 60, damping: 22 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  }, [mouseX, mouseY]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const scale   = useTransform(scrollYProgress, [0, 0.5], [1, 20]);
  const opacity = useTransform(scrollYProgress, [0, 0.38], [1, 0]);
  const nameY   = useTransform(scrollYProgress, [0, 0.3], [0, -45]);

  useEffect(() => {
    const id = 'kalpesha-fonts';
    if (document.getElementById(id)) return;
    const link = document.createElement('link');
    link.id = id; link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Share+Tech+Mono&family=Barlow+Condensed:wght@300;700;900&display=swap';
    document.head.appendChild(link);
  }, []);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative h-[250vh] overflow-hidden"
      style={{ background: '#03040a' }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

        {/* ── BACKGROUND ANIMATION ── */}
        <NetworkCanvas />

        {/* ── GRID FLOOR ── */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[40%] pointer-events-none z-[2] opacity-[0.1]"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,243,255,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(0,243,255,0.9) 1px, transparent 1px)',
            backgroundSize: '80px 40px',
            transform: 'perspective(500px) rotateX(60deg)',
            transformOrigin: 'bottom center',
          }}
        />

        {/* ── NOISE OVERLAY ── */}
        <div
          className="absolute inset-0 z-[8] pointer-events-none opacity-[0.035] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: '128px',
          }}
        />

        {/* ── MAIN ZOOM CONTENT ── */}
        <motion.div
          style={{ scale, opacity, y: nameY }}
          className="relative z-20 flex flex-col items-center justify-center"
        >
          <StatusBadge />

          <motion.div
            initial={{ opacity: 0, y: 28, clipPath: 'inset(100% 0 0 0)' }}
            animate={{ opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <GlitchName />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
            className="mt-6 flex items-center gap-0"
          >
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-cyan-500" />
            <div
              className="px-6 py-[6px] rounded-sm"
              style={{
                background: 'rgba(0, 243, 255, 0.08)',
                borderTop: '1px solid rgba(0, 243, 255, 0.3)',
                borderBottom: '1px solid rgba(0, 243, 255, 0.3)',
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 14, fontWeight: 700,
                letterSpacing: '0.25em', color: '#fff', textTransform: 'uppercase',
              }}
            >
              Software Engineering • Machine Learning • Full Stack
            </div>
            <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-cyan-500" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="mt-20 flex flex-col items-center gap-3"
          >
            <motion.span
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 10, letterSpacing: '0.3em', color: '#71717a', textTransform: 'uppercase' }}
            >
              Scroll to Explore
            </motion.span>
            <div className="w-6 h-[40px] border border-white/20 rounded-full flex justify-center pt-[6px]">
              <motion.div
                className="w-[4px] h-[4px] rounded-full bg-cyan-400"
                animate={{ y: [0, 20, 0], opacity: [1, 0, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* ── MOUSE SPOTLIGHT ── */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-50 mix-blend-screen"
          style={{
            background: useTransform(
              [smoothX, smoothY],
              ([x, y]: number[]) =>
                `radial-gradient(600px circle at ${x}px ${y}px, rgba(0,243,255,0.08), transparent 40%)`
            ),
          }}
        />

        {/* ── VIGNETTE ── */}
        <div
          className="absolute inset-0 pointer-events-none z-[55]"
          style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(3,4,10,0.95) 100%)' }}
        />

      </div>
    </section>
  );
};

export default HeroSection;