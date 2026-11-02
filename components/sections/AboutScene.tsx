"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { profile } from "@/data/profile";
import TiltSpotlightCard from "@/components/interactions/TiltSpotlightCard";
import MagneticButton from "@/components/interactions/MagneticButton";
import CyberText from "@/components/interactions/CyberText";

gsap.registerPlugin(ScrollTrigger);

export default function AboutScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      ".about-card-animate",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      }
    );
  }, []);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative min-h-[85vh] w-full flex flex-col items-center justify-center py-24 overflow-hidden border-t border-white/[0.08] bg-[#06080E] perspective-3d"
    >
      {/* Systems Laboratory Backdrop */}
      <div
        className="absolute inset-0 z-0 opacity-30 bg-cinematic pointer-events-none"
        style={{
          backgroundImage: "url('/images/about_bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
        }}
      />
      {/* Dynamic Forge Circuit Traces & Ambient Glow */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,94,30,0.16)_0%,transparent_50%)] pointer-events-none cyber-glow-pulse" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_80%_70%,rgba(245,158,11,0.14)_0%,transparent_50%)] pointer-events-none cyber-glow-pulse" />
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#ff5e1e0a_1px,transparent_1px),linear-gradient(to_bottom,#ff5e1e0a_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
      {/* Soft Cinematic Vignette */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,rgba(6,8,14,0.3)_0%,rgba(6,8,14,0.85)_60%,#06080E_95%)] pointer-events-none" />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#06080E]/60 via-transparent to-[#06080E] pointer-events-none" />

      <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 relative z-10 flex flex-col items-center preserve-3d">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="font-mono text-xs tracking-[0.25em] text-[#FF5E1E] uppercase mb-3 bg-[#0B101D]/90 px-4 py-1.5 rounded-full border border-[#FF5E1E]/40 backdrop-blur-md font-bold shadow-[0_0_20px_rgba(255,94,30,0.25)]">
            <CyberText text="ENGINEERING IDENTITY // BACKGROUND & PHILOSOPHY" speed={22} />
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
            Curious by Nature. <span className="text-[#FF5E1E] drop-shadow-[0_0_25px_rgba(255,94,30,0.5)]">Obsessed with Systems.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch w-full">
          {/* Left Profile & Education Card with 3D Tilt */}
          <div className="about-card-animate lg:col-span-5 flex flex-col">
            <TiltSpotlightCard
              className="h-full bg-[#0B101D]/90 border border-white/15 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl backdrop-blur-2xl"
              glowColor="rgba(255, 94, 30, 0.25)"
              maxTilt={5}
            >
              <div>
                {/* Executive Candidate Header */}
                <div className="flex flex-col gap-1 mb-6 pb-6 border-b border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF5E1E]/15 border border-[#FF5E1E]/40 text-[#FF5E1E] font-mono text-[0.68rem] font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF5E1E] animate-ping" />
                      ECE • CLASS OF 2027
                    </span>
                    <span className="font-mono text-xs text-[#94a3b8]">{profile.location}</span>
                  </div>

                  <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
                    {profile.name}
                  </h3>
                  <p className="font-mono text-xs text-[#FF5E1E] font-medium tracking-wide mt-0.5">
                    VLSI Design • Embedded Firmware • Systems Architecture
                  </p>
                  <p className="font-mono text-[0.72rem] text-[#F59E0B] mt-2 font-semibold flex items-center gap-1.5">
                    <span>📻</span>
                    <span>Licensed HAM Radio Operator (Vishnu Space Applications Center)</span>
                  </p>
                </div>

                {/* Undergraduate Education Box */}
                <div className="p-4 rounded-xl bg-black/50 border border-white/15 mb-4 shadow-inner">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[0.68rem] text-[#FF5E1E] tracking-wider uppercase font-bold">
                      UNDERGRADUATE (ECE)
                    </span>
                    <span className="font-mono text-[0.68rem] text-[#94a3b8]">
                      {profile.education.period}
                    </span>
                  </div>
                  <h4 className="font-display text-base font-bold text-white mb-1">
                    {profile.education.degree}
                  </h4>
                  <p className="font-body text-xs sm:text-sm text-[#cbd5e1] mb-3">
                    {profile.education.institution}
                  </p>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#FF5E1E]/15 border border-[#FF5E1E]/40 shadow-sm">
                    <span className="font-display font-black text-lg text-[#FF5E1E]">
                      {profile.education.cgpa}
                    </span>
                    <span className="font-mono text-[0.65rem] text-white uppercase font-semibold">
                      CGPA / 10.0 (Top Tier Academic Rank)
                    </span>
                  </div>
                </div>

                {/* Intermediate Box */}
                <div className="p-3.5 rounded-xl bg-black/50 border border-white/15 shadow-inner">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[0.68rem] text-[#F59E0B] tracking-wider uppercase font-bold">
                      INTERMEDIATE (MPC)
                    </span>
                    <span className="font-mono text-[0.68rem] text-[#94a3b8]">
                      {profile.intermediate.period}
                    </span>
                  </div>
                  <p className="font-body text-xs text-white font-medium">
                    {profile.intermediate.institution}
                  </p>
                  <p className="font-mono text-[0.68rem] text-[#38BDF8] mt-1 font-semibold">
                    Score: {profile.intermediate.marks} Marks (97.1%)
                  </p>
                </div>
              </div>

              {/* Direct Recruiter Contact Bar */}
              <div className="pt-6 border-t border-white/10 mt-6 flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#94a3b8]">Direct Email:</span>
                  <a
                    href={`mailto:${profile.email}`}
                    className="text-[#FF5E1E] hover:underline font-semibold"
                  >
                    {profile.email}
                  </a>
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#94a3b8]">Direct Phone:</span>
                  <a
                    href={`tel:${profile.phone}`}
                    className="text-[#cbd5e1] hover:text-white font-semibold"
                  >
                    {profile.phone}
                  </a>
                </div>
              </div>
            </TiltSpotlightCard>
          </div>

          {/* Right Core Methodology & Domains with 3D Tilt */}
          <div className="about-card-animate lg:col-span-7 flex flex-col">
            <TiltSpotlightCard
              className="h-full bg-[#0B101D]/90 border border-white/15 rounded-2xl p-6 sm:p-10 flex flex-col justify-between backdrop-blur-2xl shadow-2xl"
              glowColor="rgba(245, 158, 11, 0.25)"
              maxTilt={5}
            >
              <div>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-white mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                  Bridging Software Abstractions &amp; Physical Realities
                </h3>
                <p className="font-body text-[#e2e8f0] text-sm sm:text-base leading-relaxed mb-6 font-light">
                  Most engineers specialize either purely in high-level software or exclusively in physical hardware. My core advantage is understanding the complete journey: from high-level algorithms down to gate-level synthesis, clock tree synthesis (CTS), and tapeout sign-off on open-source silicon PDKs.
                </p>
                <p className="font-body text-[#cbd5e1] text-sm sm:text-base leading-relaxed mb-8 font-light">
                  Whether formulating low-power Safe ALU circuits reducing power by 25%, decoding real-time Morse code with FreeRTOS queues on bare-metal ESP32, or engineering full-stack Angular/ASP.NET hospital emergency routing platforms — I engineer robust, performant systems.
                </p>

                {/* Core Domains */}
                <div className="mb-6">
                  <span className="font-mono text-[0.68rem] tracking-wider text-[#94a3b8] uppercase block mb-3 font-semibold">
                    PRIMARY SPECIALIZATIONS
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {profile.domains.map((domain) => (
                      <span
                        key={domain}
                        className="px-4 py-2 rounded-xl bg-black/60 border border-white/15 font-mono text-xs text-white hover:border-[#FF5E1E] hover:text-[#FF5E1E] transition-colors shadow-sm font-semibold"
                      >
                        {domain}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick action strip */}
              <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF5E1E] animate-pulse" />
                  <span className="font-mono text-xs text-white font-medium">Status: Open to 2027 Internships &amp; Full-Time Roles</span>
                </div>
                <MagneticButton
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2 rounded-xl bg-[#FF5E1E]/15 hover:bg-[#FF5E1E] text-white border border-[#FF5E1E]/40 font-mono text-xs font-bold tracking-wider uppercase transition-all shadow-[0_0_15px_rgba(255,94,30,0.3)]"
                >
                  <span className="flex items-center gap-1.5">
                    <span>Connect on LinkedIn</span>
                    <span>↗</span>
                  </span>
                </MagneticButton>
              </div>
            </TiltSpotlightCard>
          </div>
        </div>
      </div>
    </section>
  );
}
