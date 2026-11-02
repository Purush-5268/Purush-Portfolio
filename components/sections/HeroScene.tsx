"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { profile } from "@/data/profile";
import HeroSiliconCanvas from "@/components/canvas/HeroSiliconCanvas";
import SiliconCore3D from "@/components/canvas/SiliconCore3D";
import TiltSpotlightCard from "@/components/interactions/TiltSpotlightCard";
import MagneticButton from "@/components/interactions/MagneticButton";
import { playClockPulse, playClickSound, playHoverSound } from "@/lib/soundEffects";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: "9.73", label: "B.Tech ECE CGPA", highlight: "Academic Top Tier", icon: "🎓", color: "#F59E0B" },
  { value: "Top 22", label: "National Tapeout Rank", highlight: "32-Bit RISC-V Sky130", icon: "⚡", color: "#FF5E1E" },
  { value: "₹30,000", label: "Cash Prize Won", highlight: "1st Runner-Up Spark Tank", icon: "🏆", color: "#F59E0B" },
  { value: "4 Tracks", label: "VLSI • Embedded • Software • IoT", highlight: "Full Spectrum Systems", icon: "🔬", color: "#38BDF8" },
];

export default function HeroScene() {
  const bgRef = useRef<HTMLDivElement>(null);
  const [rightViewMode, setRightViewMode] = useState<"3d" | "photo">("photo");

  useEffect(() => {
    if (bgRef.current) {
      gsap.to(bgRef.current, {
        y: "15%",
        ease: "none",
        scrollTrigger: {
          trigger: bgRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-[100vh] w-full flex flex-col items-center justify-center overflow-hidden pt-28 pb-20 px-4 sm:px-6 perspective-3d"
    >
      {/* 1. CINEMATIC SEMICONDUCTOR WAFER BACKDROP (Optimized GPU Layer) */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0 opacity-30 bg-cinematic pointer-events-none"
        style={{
          backgroundImage: "url('/images/hero_bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center 45%",
        }}
      />

      {/* 2. DYNAMIC LIVING FORGE GRID & WARM GLOWS */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#ff5e1e0d_1px,transparent_1px),linear-gradient(to_bottom,#ff5e1e0d_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_45%,#000_65%,transparent_100%)] pointer-events-none" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_70%_40%,rgba(255,94,30,0.16)_0%,transparent_50%)] pointer-events-none cyber-glow-pulse" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_30%_50%,rgba(56,189,248,0.14)_0%,transparent_50%)] pointer-events-none cyber-glow-pulse" />

      {/* 3. REAL-TIME 3D HOLOGRAPHIC QUANTUM LATTICE & OPTICAL WAVEGUIDES */}
      <HeroSiliconCanvas />

      {/* 4. ATMOSPHERIC VIGNETTE & LASER DEPTH */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,rgba(6,8,14,0.35)_0%,rgba(6,8,14,0.88)_65%,#06080E_98%)] pointer-events-none" />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#06080E]/60 via-transparent to-[#06080E] pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center max-w-[1500px] mx-auto w-full px-4 sm:px-8 pt-6 pb-12 preserve-3d">
        {/* Two-Column Grid: Left Content + Right 3D Interactive Simulation / Portrait */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full mb-12 sm:mb-16">
          
          {/* Left Column (7 cols): System Status, Identity, Headline, Bio Tilt Card, Magnetic CTAs */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left depth-front">
            {/* System Status Pill */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0B101D]/90 border border-[#FF5E1E]/50 text-white font-heading text-xs tracking-wider uppercase backdrop-blur-xl shadow-[0_0_24px_rgba(255,94,30,0.3)] mb-4"
            >
              <span className="w-2 h-2 rounded-full bg-[#FF5E1E] animate-ping" />
              <span>CANDIDATE STATUS: AVAILABLE • 2027 ROLES &amp; INTERNSHIPS</span>
            </motion.div>

            {/* Sub-Identity */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="flex items-center gap-2 font-mono text-xs text-[#94A3B8] tracking-widest uppercase font-semibold mb-4"
            >
              <span className="text-[#FF5E1E] font-bold">PAIDIPILLI PURUSHOTHAM</span>
              <span className="text-white/30">//</span>
              <span>ECE • RTL-TO-GDSII • EMBEDDED SYSTEMS • FULL-STACK (.NET • ANGULAR • REACT • DJANGO)</span>
            </motion.div>

            {/* Main Headline with realistic Plus Jakarta Sans typography */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl xl:text-8xl text-white tracking-tight leading-[1.0] mb-6 drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]"
            >
              From <span className="text-[#FF5E1E] drop-shadow-[0_0_35px_rgba(255,94,30,0.6)]">Silicon</span>
              <br />
              To <span className="text-[#38BDF8] drop-shadow-[0_0_35px_rgba(56,189,248,0.6)]">Software.</span>
            </motion.h1>

            {/* Subtitle Glass Card with 3D Tilt */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full max-w-2xl mb-8"
            >
              <TiltSpotlightCard
                className="p-5 sm:p-6 rounded-2xl bg-[#0B101D]/85 border border-white/10 backdrop-blur-xl shadow-2xl"
                glowColor="rgba(255, 94, 30, 0.22)"
                maxTilt={5}
              >
                <p className="font-body text-base sm:text-lg text-[#F8FAFC] leading-relaxed font-normal">
                  Electronics & Communication Engineering candidate at{" "}
                  <strong className="text-[#FF5E1E] font-bold">{profile.education.institution}</strong> ({profile.education.cgpaFull} CGPA).{" "}
                  32-Bit RISC-V tapeout finisher (Top 22 National Rank), embedded firmware architect, and high-performance systems engineer.
                </p>
              </TiltSpotlightCard>
            </motion.div>

            {/* Magnetic Action CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap gap-3.5 items-center justify-center lg:justify-start"
            >
              <MagneticButton
                onClick={() => {
                  playClockPulse();
                  document.getElementById("riscv")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-7 py-3.5 rounded-full bg-[#FF5E1E] text-white font-heading text-xs tracking-wider uppercase font-extrabold shadow-[0_0_30px_rgba(255,94,30,0.6)] hover:shadow-[0_0_45px_rgba(255,94,30,0.9)] hover:scale-105 active:scale-95"
              >
                <span className="flex items-center gap-2">
                  <span>Explore Flagship Tapeout</span>
                  <span className="animate-pulse">⚡</span>
                </span>
              </MagneticButton>

              <MagneticButton
                onClick={() => {
                  document.getElementById("engineering-core")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-6 py-3.5 rounded-full bg-[#0B101D]/90 hover:bg-[#111827] text-white border border-[#FF5E1E]/40 hover:border-[#FF5E1E] font-heading text-xs tracking-wider uppercase backdrop-blur-xl shadow-lg"
              >
                <span>3D ASIC Flow Simulator 🔬</span>
              </MagneticButton>

              <MagneticButton
                onClick={() => {
                  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-6 py-3.5 rounded-full bg-[#0B101D]/85 hover:bg-[#111827] text-white border border-white/15 hover:border-[#38BDF8] font-heading text-xs tracking-wider uppercase backdrop-blur-xl"
              >
                <span>Browse 9 Projects ↗</span>
              </MagneticButton>

              <MagneticButton
                href="/resumes/vlsi_resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-full bg-[#0B101D]/85 hover:bg-[#111827] text-[#F8FAFC] hover:text-[#FF5E1E] border border-white/15 hover:border-[#FF5E1E] font-heading text-xs tracking-wider uppercase backdrop-blur-xl flex items-center gap-2"
              >
                <span>Download CV (PDF)</span>
                <span>📄</span>
              </MagneticButton>
            </motion.div>
          </div>

          {/* Right Column (5 cols): 3D Silicon Simulation with Automatic Motion & Mouse Hover Access */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative py-6 lg:py-0 depth-pop">
            {/* View Mode Toggle Pill */}
            <div className="flex items-center gap-2 p-1 rounded-full bg-[#0B101D]/95 border border-white/15 backdrop-blur-xl mb-3 z-20 shadow-xl">
              <button
                onClick={() => {
                  playClickSound();
                  setRightViewMode("photo");
                }}
                onMouseEnter={playHoverSound}
                className={`px-4 py-1.5 rounded-full font-heading text-xs font-bold uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
                  rightViewMode === "photo"
                    ? "bg-[#FF5E1E] text-white shadow-[0_0_20px_rgba(255,94,30,0.7)]"
                    : "text-white/70 hover:text-white"
                }`}
              >
                <span>👤 CANDIDATE PROFILE</span>
              </button>
              <button
                onClick={() => {
                  playClickSound();
                  setRightViewMode("3d");
                }}
                onMouseEnter={playHoverSound}
                className={`px-4 py-1.5 rounded-full font-heading text-xs font-bold uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
                  rightViewMode === "3d"
                    ? "bg-[#FF5E1E] text-white shadow-[0_0_20px_rgba(255,94,30,0.7)]"
                    : "text-white/70 hover:text-white"
                }`}
              >
                <span>⚡ 3D SILICON DIE</span>
              </button>
            </div>

            {/* View Content: 3D Silicon Simulation or Candidate Portrait */}
            {rightViewMode === "3d" ? (
              <div className="w-full relative">
                <SiliconCore3D />
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="relative group cursor-pointer"
              >
                <div className="absolute -inset-8 rounded-full bg-[radial-gradient(circle,rgba(255,94,30,0.25)_0%,rgba(56,189,248,0.18)_45%,transparent_70%)] blur-2xl opacity-80 pointer-events-none" />

                <div className="relative p-[2.5px] rounded-full bg-gradient-to-br from-[#FF5E1E] via-white/30 to-[#38BDF8] shadow-[0_0_50px_rgba(255,94,30,0.35)]">
                  <div className="p-[3.5px] bg-[#06080E] rounded-full">
                    <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-[380px] lg:h-[380px] rounded-full overflow-hidden bg-[#06080E]">
                      <img
                        src={profile.profileImage}
                        alt={profile.name}
                        className="w-full h-full object-cover object-[center_18%] group-hover:scale-105 transition-transform duration-500 ease-out select-none"
                      />
                      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,transparent_62%,rgba(6,8,14,0.35)_100%)] pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-3 right-3 px-4 py-1.5 rounded-full bg-[#0B101D]/95 border border-[#FF5E1E]/60 text-white font-heading text-xs font-bold shadow-lg flex items-center gap-2 backdrop-blur-xl">
                  <span className="w-2 h-2 rounded-full bg-[#FF5E1E] animate-ping" />
                  <span>AVAILABLE • 2027 ROLES</span>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* 3D Tilt Stats Cards with Real-Time Spotlight Beam */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full depth-mid"
        >
          {STATS.map((stat) => (
            <TiltSpotlightCard
              key={stat.label}
              className="p-5 rounded-2xl bg-[#0B101D]/85 border border-white/10 backdrop-blur-xl shadow-2xl hover:border-[#FF5E1E]/60"
              glowColor="rgba(255, 94, 30, 0.28)"
              maxTilt={8}
            >
              <div className="flex flex-col items-center justify-center text-center">
                <span className="text-xl mb-1">{stat.icon}</span>
                <span
                  className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl mb-1 drop-shadow-[0_0_15px_rgba(255,94,30,0.4)]"
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </span>
                <span className="font-heading font-semibold text-xs text-white">
                  {stat.label}
                </span>
                <span className="font-mono text-[0.65rem] text-[#94A3B8] uppercase tracking-wider mt-0.5">
                  {stat.highlight}
                </span>
              </div>
            </TiltSpotlightCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
