"use client";
import React, { useEffect, useState } from "react";
import { toggleAudio, isAudioEnabled, playClickSound, playHoverSound } from "@/lib/soundEffects";

const SCENES = [
  { id: "hero", label: "Orbital Silicon", tag: "Overview" },
  { id: "about", label: "About & Philosophy", tag: "Identity" },
  { id: "engineering-core", label: "Silicon Flow Simulator", tag: "RTL to GDSII" },
  { id: "riscv", label: "RISC-V 32-bit Core", tag: "Sky130 Tapeout" },
  { id: "projects", label: "Systems Projects", tag: "9 Builds" },
  { id: "gallery", label: "Visual Expeditions", tag: "Field Archive" },
  { id: "research", label: "BCI Signal Processing", tag: "IIT Bhubaneswar" },
  { id: "skills", label: "Technical Skills", tag: "Core Stack" },
  { id: "experience", label: "Trajectory & Experience", tag: "Industry" },
  { id: "achievements", label: "Honors & Milestones", tag: "Awards" },
  { id: "contact", label: "Transmission & Signal", tag: "Contact" },
];

export default function CyberHUD() {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [activeScene, setActiveScene] = useState("hero");
  const [soundOn, setSoundOn] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    setSoundOn(isAudioEnabled());

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollPercent(Math.min(100, Math.max(0, Math.round(progress))));
      setShowScrollTop(window.scrollY > 400);

      // Find active scene
      const scrollPos = window.scrollY + window.innerHeight * 0.35;
      for (const scene of SCENES) {
        const el = document.getElementById(scene.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveScene(scene.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleToggleSound = () => {
    const next = toggleAudio();
    setSoundOn(next);
  };

  const scrollToScene = (id: string) => {
    playClickSound();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    playClickSound();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentSceneObj = SCENES.find((s) => s.id === activeScene) || SCENES[0];

  return (
    <>
      {/* 1. Sleek Navigation Rail Dots along Right Viewport Edge (Desktop) */}
      <aside
        aria-label="Scene Quick Navigation Rail"
        className="fixed right-3.5 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-end gap-2.5 select-none pointer-events-auto"
      >
        {SCENES.map((scene) => {
          const isActive = activeScene === scene.id;
          return (
            <button
              key={scene.id}
              onClick={() => scrollToScene(scene.id)}
              onMouseEnter={playHoverSound}
              className="group flex items-center gap-2 cursor-pointer py-0.5 focus:outline-none"
              title={scene.label}
            >
              {/* Tooltip on hover */}
              <span className="font-display font-medium text-[0.72rem] text-white/90 tracking-wide opacity-0 group-hover:opacity-100 transition-all duration-200 bg-[#060a14]/95 px-2.5 py-1 rounded-lg border border-white/15 backdrop-blur-md shadow-2xl pointer-events-none translate-x-2 group-hover:translate-x-0 whitespace-nowrap">
                {scene.label}
              </span>

              {/* Minimal Clean Dot */}
              <span
                className={`transition-all duration-300 rounded-full ${
                  isActive
                    ? "w-2.5 h-2.5 bg-[#FF5E1E] shadow-[0_0_12px_rgba(255,94,30,0.9)] scale-125"
                    : "w-1.5 h-1.5 bg-white/25 group-hover:bg-[#FF5E1E] group-hover:scale-125"
                }`}
              />
            </button>
          );
        })}
      </aside>

      {/* 2. Redesigned Master HUD Capsule docked at Bottom Right (Desktop & Mobile) */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center select-none pointer-events-auto">
        <div className="px-4 py-2 rounded-full bg-[#0B101D]/90 border border-white/20 backdrop-blur-2xl shadow-[0_12px_40px_rgba(0,0,0,0.8)] hover:border-[#FF5E1E]/50 transition-all duration-300 flex items-center gap-3.5">
          {/* SFX Audio Synthesizer Toggle */}
          <button
            onClick={handleToggleSound}
            onMouseEnter={playHoverSound}
            className="flex items-center gap-2 group cursor-pointer focus:outline-none"
            title={soundOn ? "Mute Sound Effects" : "Enable Sound Effects"}
          >
            <div className="flex items-end gap-[3px] h-3.5">
              <span
                className={`w-0.5 rounded-full transition-all duration-300 ${
                  soundOn ? "h-3.5 bg-[#FF5E1E] animate-pulse" : "h-1 bg-white/40"
                }`}
              />
              <span
                className={`w-0.5 rounded-full transition-all duration-300 ${
                  soundOn ? "h-2 bg-[#F59E0B] animate-bounce" : "h-1 bg-white/40"
                }`}
              />
              <span
                className={`w-0.5 rounded-full transition-all duration-300 ${
                  soundOn ? "h-3 bg-[#FF5E1E] animate-pulse" : "h-1 bg-white/40"
                }`}
              />
            </div>
            <span className="font-heading text-xs font-bold text-white group-hover:text-[#FF5E1E] transition-colors">
              {soundOn ? "SFX ON" : "SFX OFF"}
            </span>
          </button>

          {/* Divider */}
          <span className="w-px h-3.5 bg-white/20" />

          {/* Active Section Label with Live Indicator */}
          <div className="hidden sm:flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5E1E] animate-ping" />
            <span className="font-heading font-bold text-xs text-white tracking-tight max-w-[180px] truncate">
              {currentSceneObj.label}
            </span>
          </div>

          {/* Divider (Desktop) */}
          <span className="hidden sm:block w-px h-3.5 bg-white/20" />

          {/* Progress Percent */}
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-xs font-bold text-[#FF5E1E] tracking-tight">
              {String(scrollPercent).padStart(2, "0")}%
            </span>
          </div>

          {/* Scroll to Top */}
          {showScrollTop && (
            <>
              <span className="w-px h-3.5 bg-white/20" />
              <button
                onClick={scrollToTop}
                onMouseEnter={playHoverSound}
                className="w-6 h-6 rounded-full bg-[#FF5E1E]/20 hover:bg-[#FF5E1E] text-[#FF5E1E] hover:text-white flex items-center justify-center transition-all duration-200 text-xs font-bold cursor-pointer"
                title="Scroll to Top"
              >
                ↑
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
