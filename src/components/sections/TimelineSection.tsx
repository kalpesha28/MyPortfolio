import React from 'react';
import { motion } from 'framer-motion';

const timelineData = [
  {
    year: "2026 (Current)",
    title: "Defense Research Intern",
    description: "Developing secure, LAN-based communication protocols for defense systems. Focus on privacy preservation and zero-trust architecture.",
    color: "text-emerald-400"
  },
  {
    year: "2025",
    title: "UPLINK 2026 Applicant",
    description: "Applying for advanced mentorship in Data Science and ML research.",
    color: "text-blue-400"
  },
  {
    year: "2023 - Present",
    title: "B.E. Computer Engineering",
    description: "3rd Year Student. Specialized in Machine Learning, System Design, and 3D Technologies.",
    color: "text-purple-400"
  },
  {
    year: "2025",
    title: "Project Unfold Bharat",
    description: "Launched a platform to promote hidden Indian heritage sites, integrating mapping APIs.",
    color: "text-orange-400"
  }
];

export const TimelineSection = () => {
  return (
    <section className="relative bg-black py-32 px-6 overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent" />

      <div className="max-w-4xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-20">
          Mission Log
        </h2>

        <div className="space-y-24">
          {timelineData.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`flex flex-col md:flex-row items-center gap-8 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              
              {/* DATE BUBBLE (Center) */}
              <div className="md:absolute left-1/2 -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-black border border-white/20 z-20 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              </div>

              {/* CONTENT CARD (Left or Right) */}
              <div className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:pr-12 text-center md:text-right" : "md:pl-12 text-center md:text-left"}`}>
                <span className={`block text-sm font-mono mb-2 ${item.color}`}>
                  {item.year}
                </span>
                <h3 className="text-2xl font-bold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-zinc-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
              
              {/* Empty Spacer for the other side */}
              <div className="hidden md:block w-1/2" />

            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};