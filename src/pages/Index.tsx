import React, { useState } from 'react';

// --- COMPONENT IMPORTS ---
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection'; // <--- NEW IMPORT
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { SpecsSection } from '@/components/sections/SpecsSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { ContactSection } from '@/components/sections/ContactSection';

// --- UI IMPORTS ---
import { FloatingDock } from '@/components/ui/FloatingDock';
import { TacticalCursor } from '@/components/ui/TacticalCursor';
import { Preloader } from '@/components/ui/Preloader';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`bg-[#050505] min-h-screen text-white selection:bg-purple-500/30 ${isLoading ? 'cursor-wait' : 'cursor-none'}`}>
      
      {isLoading && (
        <Preloader onComplete={() => setIsLoading(false)} />
      )}

      {!isLoading && (
        <div className="animate-in fade-in duration-1000">
          <TacticalCursor />
          <FloatingDock />

          <div id="hero"><HeroSection /></div>

          {/* NEW SECTION: ABOUT (Identity Layer) */}
          <div id="about"><AboutSection /></div>
          
          <div id="projects"><ProjectsSection /></div>
          <div id="specs"><SpecsSection /></div> 
          <div id="skills"><SkillsSection /></div>
          <div id="contact"><ContactSection /></div>
        </div>
      )}
      
    </div>
  );
};

export default Index;