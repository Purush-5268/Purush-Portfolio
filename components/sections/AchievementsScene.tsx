"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { achievements } from "@/data/achievements";

gsap.registerPlugin(ScrollTrigger);

export default function AchievementsScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      ".award-card",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      }
    );
  }, []);

  const awards = achievements.filter((a) => a.category !== "certification");
  const certs = achievements.filter((a) => a.category === "certification");

  return (
    <section
      id="achievements"
      ref={containerRef}
      className="relative min-h-[90vh] py-24 border-t border-white/[0.08] bg-[#05070D] overflow-hidden w-full flex flex-col items-center perspective-3d"
    >
      {/* Innovation Awards & Honors Gallery Backdrop */}
      <div
        className="absolute inset-0 z-0 opacity-40 bg-cinematic pointer-events-none"
        style={{
          backgroundImage: "url('/images/achievements_bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center 45%",
        }}
      />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_30%_35%,rgba(245,158,11,0.16)_0%,transparent_50%)] pointer-events-none cyber-glow-pulse" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_70%_65%,rgba(0,229,255,0.16)_0%,transparent_50%)] pointer-events-none cyber-glow-pulse" />
      {/* Soft Vignette Overlay */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,rgba(5,7,13,0.35)_0%,rgba(5,7,13,0.85)_55%,#05070D_95%)] pointer-events-none" />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#05070D] via-transparent to-[#05070D] pointer-events-none" />

      <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 relative z-10 flex flex-col items-center preserve-3d">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="font-mono text-xs tracking-[0.25em] text-[#f59e0b] uppercase mb-3 bg-[#05070D]/85 px-4 py-1.5 rounded-full border border-[#f59e0b]/40 backdrop-blur-md font-semibold">
            HONORS & CREDENTIALS
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            Recognitions & <span className="text-[#f59e0b]">Milestones.</span>
          </h2>
          <p className="font-body text-[#e2e8f0] max-w-xl text-sm sm:text-base mt-4 font-normal drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            National hackathon championships, academic ranks, cash prize awards, and official engineering credentials.
          </p>
        </div>

        {/* Major Awards Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {awards.map((award) => (
            <div
              key={award.id}
              className="award-card p-6 sm:p-7 rounded-2xl bg-[#060a14]/85 border border-white/15 hover:border-[#f59e0b]/50 backdrop-blur-xl shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="font-display font-extrabold text-xl sm:text-2xl"
                    style={{ color: award.accentColor }}
                  >
                    {award.metric || award.title}
                  </span>
                  <span className="font-mono text-xs text-[#cbd5e1] bg-black/40 px-2.5 py-1 rounded border border-white/10">
                    {award.year}
                  </span>
                </div>

                <h3 className="font-display font-bold text-lg text-white mb-1">
                  {award.title}
                </h3>
                <h4 className="font-mono text-xs text-[#00e5ff] mb-3">
                  {award.subtitle}
                </h4>

                <p className="font-body text-xs sm:text-sm text-[#cbd5e1] leading-relaxed font-light">
                  {award.description}
                </p>
              </div>

              {award.link && (
                <div className="pt-4 border-t border-white/10 mt-5">
                  <a
                    href={award.link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-[#00e5ff] hover:text-white transition-colors flex items-center gap-1.5 font-semibold"
                  >
                    <span>{award.link.label}</span>
                    <span>↗</span>
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Verified Certifications Showcase */}
        <div className="w-full bg-[#060a14]/90 border border-white/15 rounded-2xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-white/10">
            <div>
              <h3 className="font-display font-bold text-2xl text-white">
                Industry Certifications
              </h3>
              <p className="font-body text-xs sm:text-sm text-[#cbd5e1] mt-1 font-light">
                All credentials verified through official examination bodies with public verification links.
              </p>
            </div>
            <span className="font-mono text-xs text-[#14b8a6] bg-[#14b8a6]/10 px-3 py-1.5 rounded-full border border-[#14b8a6]/30 font-semibold">
              4 Verifiable Certifications
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {certs.map((cert) => (
              <a
                key={cert.id}
                href={cert.link?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col justify-between p-5 bg-black/40 hover:bg-black/60 border border-white/10 hover:border-[#00e5ff]/50 rounded-xl transition-all group shadow-sm hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="font-mono text-[0.68rem] tracking-wider uppercase font-bold px-2 py-0.5 rounded bg-white/[0.05]"
                      style={{ color: cert.accentColor }}
                    >
                      {cert.metric || "CERTIFIED"}
                    </span>
                    <span className="text-[#94a3b8] group-hover:text-[#00e5ff] text-sm transition-colors">
                      ↗
                    </span>
                  </div>
                  <h4 className="font-display font-bold text-base text-white group-hover:text-[#00e5ff] transition-colors leading-snug">
                    {cert.title}
                  </h4>
                  <p className="font-mono text-xs text-[#94a3b8] mt-1.5">
                    {cert.subtitle}
                  </p>
                </div>
                <div className="pt-4 border-t border-white/[0.06] mt-4 flex items-center justify-between">
                  <span className="font-mono text-[0.65rem] text-[#00e5ff] uppercase tracking-wider font-semibold">
                    Verify Credential
                  </span>
                  <span className="font-mono text-[0.65rem] text-[#64748b]">
                    {cert.year}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
