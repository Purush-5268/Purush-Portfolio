"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experiences } from "@/data/experience";
import TiltSpotlightCard from "@/components/interactions/TiltSpotlightCard";

gsap.registerPlugin(ScrollTrigger);

export default function ExperienceScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      ".experience-card",
      { opacity: 0, y: 25 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.7,
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
      id="experience"
      ref={containerRef}
      className="relative min-h-screen py-24 border-t border-white/[0.08] bg-[#06080E] overflow-hidden w-full flex flex-col items-center perspective-3d"
    >
      {/* Semiconductor Cleanroom Fab Corridor Backdrop */}
      <div
        className="absolute inset-0 z-0 opacity-30 bg-cinematic pointer-events-none"
        style={{
          backgroundImage: "url('/images/experience_bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center 50%",
        }}
      />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,94,30,0.16)_0%,transparent_50%)] pointer-events-none cyber-glow-pulse" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_70%_60%,rgba(245,158,11,0.14)_0%,transparent_50%)] pointer-events-none cyber-glow-pulse" />
      {/* Soft Vignette Overlay */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,rgba(6,8,14,0.35)_0%,rgba(6,8,14,0.85)_55%,#06080E_95%)] pointer-events-none" />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#06080E] via-transparent to-[#06080E] pointer-events-none" />

      <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 relative z-10 flex flex-col items-center preserve-3d">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="font-mono text-xs tracking-[0.25em] text-[#FF5E1E] uppercase mb-3 bg-[#0B101D]/90 px-4 py-1.5 rounded-full border border-[#FF5E1E]/40 backdrop-blur-md font-bold shadow-[0_0_20px_rgba(255,94,30,0.25)]">
            PROFESSIONAL TIMELINE
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            Experience &amp; <span className="text-[#FF5E1E]">Industrial Training.</span>
          </h2>
          <p className="font-body text-[#e2e8f0] max-w-xl text-sm sm:text-base mt-4 font-normal drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Proven track record across leading semiconductor corporations, DRDO/ISRO foundries, and prestigious research laboratories.
          </p>
        </div>

        {/* Timeline Stack */}
        <div className="w-full max-w-6xl mx-auto relative pl-4 sm:pl-8 border-l-2 border-[#FF5E1E]/30 space-y-8">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="experience-card relative"
            >
              {/* Timeline Bullet */}
              <div
                className="absolute -left-[25px] sm:-left-[41px] top-7 w-4 h-4 rounded-full border-2 border-white/30 bg-[#06080E] shadow-[0_0_12px_rgba(255,94,30,0.6)] flex items-center justify-center z-20"
                style={{ borderColor: exp.accentColor }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: exp.accentColor }}
                />
              </div>

              <TiltSpotlightCard
                className="bg-[#0B101D]/90 border border-white/15 hover:border-[#FF5E1E]/60 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl transition-all duration-300"
                glowColor={exp.accentColor ? `${exp.accentColor}30` : "rgba(255, 94, 30, 0.25)"}
                maxTilt={4}
              >
                {/* Card Header: Role & Period */}
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="font-mono text-[0.65rem] tracking-wider uppercase px-2.5 py-0.5 rounded font-bold border"
                        style={{
                          borderColor: `${exp.accentColor}40`,
                          color: exp.accentColor,
                          backgroundColor: `${exp.accentColor}15`,
                        }}
                      >
                        {exp.type}
                      </span>
                      <span className="font-mono text-xs text-[#94a3b8]">
                        {exp.location}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                      {exp.role}
                    </h3>
                    <h4 className="font-display font-semibold text-base text-[#FF5E1E] mt-0.5">
                      {exp.company}
                    </h4>
                  </div>

                  <div className="flex flex-col items-start sm:items-end gap-2">
                    <span className="font-mono text-xs text-white bg-black/50 px-3 py-1 rounded-md border border-white/10 font-medium">
                      {exp.period}
                    </span>
                    {exp.link && (
                      <a
                        href={exp.link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-[0.68rem] tracking-wider text-white hover:text-white bg-[#FF5E1E]/20 hover:bg-[#FF5E1E] border border-[#FF5E1E]/40 rounded px-2.5 py-1 transition-all flex items-center gap-1 font-semibold shadow-sm"
                      >
                        <span>{exp.link.label}</span>
                        <span>↗</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Bullet Points */}
                <ul className="space-y-2 mt-4 text-[#cbd5e1] font-body text-xs sm:text-sm leading-relaxed list-disc list-inside font-light">
                  {exp.bullets.map((bullet, idx) => (
                    <li key={idx} className="marker:text-[#FF5E1E]">
                      {bullet}
                    </li>
                  ))}
                </ul>
              </TiltSpotlightCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
