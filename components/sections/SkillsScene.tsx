"use client";
import { useState } from "react";
import { skillDomains } from "@/data/skills";

export default function SkillsScene() {
  const [selectedDomain, setSelectedDomain] = useState<string>("vlsi");

  const currentDomain = skillDomains.find((d) => d.id === selectedDomain) || skillDomains[0];

  return (
    <section
      id="skills"
      className="relative min-h-[85vh] py-24 border-t border-white/[0.08] bg-[#06080E] overflow-hidden w-full flex flex-col items-center perspective-3d"
    >
      {/* FPGA & Silicon Bus Matrix Backdrop */}
      <div
        className="absolute inset-0 z-0 opacity-30 bg-cinematic pointer-events-none"
        style={{
          backgroundImage: "url('/images/skills_bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center 50%",
        }}
      />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_25%_40%,rgba(255,94,30,0.16)_0%,transparent_50%)] pointer-events-none cyber-glow-pulse" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_75%_60%,rgba(245,158,11,0.14)_0%,transparent_50%)] pointer-events-none cyber-glow-pulse" />
      {/* Soft Vignette Overlay */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,rgba(6,8,14,0.35)_0%,rgba(6,8,14,0.85)_55%,#06080E_95%)] pointer-events-none" />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#06080E] via-transparent to-[#06080E] pointer-events-none" />

      <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 relative z-10 flex flex-col items-center preserve-3d">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <span className="font-mono text-xs tracking-[0.25em] text-[#FF5E1E] uppercase mb-3 bg-[#0B101D]/90 px-4 py-1.5 rounded-full border border-[#FF5E1E]/40 backdrop-blur-md font-bold shadow-[0_0_20px_rgba(255,94,30,0.25)]">
            TECHNICAL PROFICIENCY
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            Core Engineering &amp; <span className="text-[#FF5E1E]">Toolchain.</span>
          </h2>
          <p className="font-body text-[#e2e8f0] max-w-xl text-sm sm:text-base mt-4 font-normal drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Mastery across digital ASIC flows, bare-metal embedded firmware, real-time operating systems, and full-stack software.
          </p>
        </div>

        {/* Domain Selection Tabs */}
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-10">
          {skillDomains.map((domain) => {
            const isSelected = selectedDomain === domain.id;
            return (
              <button
                key={domain.id}
                onClick={() => setSelectedDomain(domain.id)}
                className={`p-4 rounded-xl border transition-all text-center flex flex-col items-center justify-center gap-1.5 backdrop-blur-xl cursor-pointer ${
                  isSelected
                    ? "bg-[#0B101D] shadow-[0_0_25px_rgba(255,94,30,0.3)] scale-[1.02]"
                    : "bg-[#06080E]/80 hover:bg-[#0B101D]/90 border-white/10 hover:border-white/30"
                }`}
                style={{
                  borderColor: isSelected ? domain.color : undefined,
                }}
              >
                <div
                  className="w-2.5 h-2.5 rounded-full mb-1"
                  style={{
                    backgroundColor: domain.color,
                    boxShadow: isSelected ? `0 0 10px ${domain.color}` : "none",
                  }}
                />
                <span
                  className="font-display font-bold text-sm tracking-wide text-white"
                >
                  {domain.name}
                </span>
                <span className="font-mono text-[0.62rem] text-[#94a3b8] uppercase font-medium">
                  {domain.skills.length} Tools &amp; Tech
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Domain Skills Showcase Box */}
        <div className="w-full bg-[#0B101D]/90 border border-white/15 rounded-2xl p-6 sm:p-10 shadow-2xl backdrop-blur-2xl">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-3">
                <span
                  className="w-3.5 h-3.5 rounded-md"
                  style={{ backgroundColor: currentDomain.color }}
                />
                <h3 className="font-display font-extrabold text-2xl text-white">
                  {currentDomain.name} Domain Stack
                </h3>
              </div>
              <p className="font-body text-xs sm:text-sm text-[#cbd5e1] mt-1 font-light">
                Classified by mastery level (Expert, Proficient, Familiar) with production verification.
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono font-semibold">
              <span className="flex items-center gap-1.5 text-white">
                <span className="w-2 h-2 rounded-full bg-[#FF5E1E]" /> Expert
              </span>
              <span className="flex items-center gap-1.5 text-[#cbd5e1]">
                <span className="w-2 h-2 rounded-full bg-[#F59E0B]" /> Proficient
              </span>
              <span className="flex items-center gap-1.5 text-[#94a3b8]">
                <span className="w-2 h-2 rounded-full bg-white/40" /> Familiar
              </span>
            </div>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
            {currentDomain.skills.map((skill) => {
              const isExpert = skill.level === "expert";
              const isProficient = skill.level === "proficient";

              return (
                <div
                  key={skill.id}
                  className="p-3.5 rounded-xl bg-black/40 border border-white/10 hover:border-white/30 transition-all flex flex-col justify-between group hover:bg-black/60 shadow-sm"
                >
                  <span className="font-display font-semibold text-sm sm:text-base text-white group-hover:text-[#FF5E1E] transition-colors">
                    {skill.name}
                  </span>
                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/[0.06]">
                    <span
                      className="font-mono text-[0.62rem] tracking-wider uppercase font-bold"
                      style={{
                        color: isExpert ? "#FF5E1E" : isProficient ? "#F59E0B" : "#94a3b8",
                      }}
                    >
                      {skill.level}
                    </span>
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{
                        backgroundColor: isExpert ? "#FF5E1E" : isProficient ? "#F59E0B" : "#64748b",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
