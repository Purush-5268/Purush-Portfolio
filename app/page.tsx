"use client";
import React, { useState } from "react";
import { useLenis } from "@/hooks/useLenis";
import { useCursor } from "@/hooks/useCursor";
import Navigation from "@/components/navigation/Navigation";
import CyberHUD from "@/components/navigation/CyberHUD";
import GlobalParticleField from "@/components/canvas/GlobalParticleField";
import Super3DIntro from "@/components/canvas/Super3DIntro";
import HeroScene from "@/components/sections/HeroScene";
import AboutScene from "@/components/sections/AboutScene";
import RollingSkillsMarquee from "@/components/sections/RollingSkillsMarquee";
import EngineeringCoreScene from "@/components/sections/EngineeringCoreScene";
import RISCVScene from "@/components/sections/RISCVScene";
import ProjectsScene from "@/components/sections/ProjectsScene";
import GalleryScene from "@/components/sections/GalleryScene";
import ResearchScene from "@/components/sections/ResearchScene";
import SkillsScene from "@/components/sections/SkillsScene";
import ExperienceScene from "@/components/sections/ExperienceScene";
import AchievementsScene from "@/components/sections/AchievementsScene";
import ContactScene from "@/components/sections/ContactScene";
import ProfileAvatar from "@/components/ui/ProfileAvatar";

export default function Home() {
  const [hasEntered, setHasEntered] = useState(false);
  const [justEntered, setJustEntered] = useState(false);
  useCursor();
  useLenis();

  const handleEnter = () => {
    setHasEntered(true);
    setJustEntered(true);
    setTimeout(() => {
      setJustEntered(false);
    }, 900);
  };

  return (
    <main className="relative bg-[#06080E] min-h-screen text-[#F8FAFC] overflow-x-hidden selection:bg-[#FF5E1E] selection:text-white w-full flex flex-col items-center">
      {/* 1. Super Duper 3D Opening Effect */}
      {!hasEntered && (
        <Super3DIntro onEnter={handleEnter} />
      )}

      {/* Post-Warp Relativistic Shockwave Dissipation */}
      {justEntered && (
        <div className="fixed inset-0 z-40 bg-gradient-to-r from-[#FF5E1E]/40 via-white/50 to-[#F59E0B]/40 pointer-events-none animate-warp-dissipate" />
      )}

      {/* 2. Global Living Silicon Particle Field & Click Ripple Canvas */}
      <GlobalParticleField />

      {/* 3. Navigation Header & Floating Audio/Telemetry Rail */}
      <Navigation />
      <CyberHUD />

      {/* 4. Floating Quick Scroll Avatar */}
      <ProfileAvatar />
      
      {/* 5. Main Portfolio Scenes Pipeline */}
      <div className="portfolio-content w-full flex flex-col items-center relative z-10">
        <HeroScene />
        <AboutScene />
        <RollingSkillsMarquee />
        <EngineeringCoreScene />
        <RISCVScene />
        <ProjectsScene />
        <GalleryScene />
        <ResearchScene />
        <SkillsScene />
        <ExperienceScene />
        <AchievementsScene />
        <ContactScene />
      </div>
    </main>
  );
}
