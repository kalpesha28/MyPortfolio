import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Sparkles, Code2, Users, MapPin, Coffee } from 'lucide-react';

export const ContactSection = () => {
  return (
    <section id="contact" className="relative min-h-screen bg-[#020205] py-32 flex flex-col items-center justify-center overflow-hidden font-sans">
      
      {/* ── SOFT AMBIENT BACKGROUND ── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-purple-500/10 via-blue-500/5 to-transparent rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: '40px 40px' }} />

      <div className="container mx-auto px-6 relative z-10 max-w-5xl">
        
        {/* ── HEADER ── */}
        {/* ── HEADER ── */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Sparkles size={16} className="text-cyan-400" />
            <span className="text-xs font-mono text-cyan-400 tracking-[0.4em] uppercase">
              Let's Build Something
            </span>
          </div>
          <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-[0.9]">
            START A <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 italic">
              CONVERSATION.
            </span>
          </h2>
          <p className="mt-8 text-zinc-400 font-light text-lg max-w-xl mx-auto">
            Whether it's discussing full-stack architecture, machine learning innovations, or community tech events—my inbox is always open.
          </p>
        </motion.div>
        
        {/* ── THE INTERACTIVE GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-4xl mx-auto">
          
          {/* Main Direct Email Card (Spans 8 columns) */}
          <motion.a
            href="mailto:kshasaner2807@gmail.com" // ⚠️ INSERT YOUR ACTUAL EMAIL HERE
            whileHover={{ y: -5, scale: 1.02 }}
            className="md:col-span-8 group relative flex flex-col justify-between p-8 md:p-10 rounded-[2rem] bg-white/[0.02] border border-white/10 hover:border-blue-500/30 transition-all duration-500 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] group-hover:bg-blue-500/20 transition-colors duration-500" />
            
            <div className="relative z-10 flex justify-between items-start mb-12">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform duration-500">
                <Mail size={24} />
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] border border-white/5 text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Available for work
              </div>
            </div>

            <div className="relative z-10">
              <h3 className="text-3xl font-black text-white tracking-tight mb-2">kshasaner2807@gmail.com</h3>
              <p className="text-zinc-500 font-mono text-sm uppercase tracking-widest">Drop a message</p>
            </div>
          </motion.a>

          {/* Social / Network Cards (Span 4 columns each) */}
          <div className="md:col-span-4 flex flex-col gap-6">
            
            <motion.a 
              href="https://github.com/kalpesha28" target="_blank" rel="noreferrer"
              whileHover={{ y: -5 }}
              className="flex-1 group relative flex flex-col justify-center p-8 rounded-[2rem] bg-white/[0.02] border border-white/10 hover:border-white/30 transition-all duration-500"
            >
              <Github size={28} className="text-zinc-400 group-hover:text-white mb-4 transition-colors" />
              <div className="text-xl font-bold text-white tracking-tight">GitHub</div>
              <div className="text-xs font-mono text-zinc-500 mt-1">Explore my codebase</div>
            </motion.a>

            <motion.a 
              href="https://www.linkedin.com/in/kalpesha-saner-b29168297?utm_source=share_via&utm_content=profile&utm_medium=member_ios" target="_blank" rel="noreferrer"
              whileHover={{ y: -5 }}
              className="flex-1 group relative flex flex-col justify-center p-8 rounded-[2rem] bg-white/[0.02] border border-white/10 hover:border-[#0077b5]/50 transition-all duration-500"
            >
              <Linkedin size={28} className="text-zinc-400 group-hover:text-[#0077b5] mb-4 transition-colors" />
              <div className="text-xl font-bold text-white tracking-tight">LinkedIn</div>
              <div className="text-xs font-mono text-zinc-500 mt-1">Professional network</div>
            </motion.a>

          </div>
        </div>

        {/* ── PROFESSIONAL FOOTER OVERVIEW ── */}
        <div className="mt-24 pt-10 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-8">
          
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-zinc-500">
              <MapPin size={14} />
              <span className="text-[10px] font-mono uppercase tracking-widest">Location</span>
            </div>
            <span className="text-sm font-medium text-white">Nashik, India</span>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-zinc-500">
              <Code2 size={14} />
              <span className="text-[10px] font-mono uppercase tracking-widest">Current Focus</span>
            </div>
            <span className="text-sm font-medium text-white">Full-Stack & ML</span>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-zinc-500">
              <Users size={14} />
              <span className="text-[10px] font-mono uppercase tracking-widest">Community</span>
            </div>
            <span className="text-sm font-medium text-white">ACM-W Chairperson</span>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-zinc-500">
              <Coffee size={14} />
              <span className="text-[10px] font-mono uppercase tracking-widest">Education</span>
            </div>
            <span className="text-sm font-medium text-white">3rd Year CS</span>
          </div>

        </div>

      </div>
    </section>
  );
};