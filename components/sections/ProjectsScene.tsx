"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects, Project } from "@/data/projects";
import TiltSpotlightCard from "@/components/interactions/TiltSpotlightCard";

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = ["ALL", "VLSI", "Embedded", "Software", "IoT"] as const;

export default function ProjectsScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    gsap.fromTo(
      ".project-card-item",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
      }
    );
  }, [activeCategory]);

  const filteredProjects = activeCategory === "ALL"
    ? projects
    : projects.filter((p) => p.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative min-h-screen py-24 border-t border-white/[0.08] bg-[#06080E] overflow-hidden w-full flex flex-col items-center perspective-3d"
    >
      {/* Hardware Engineering Workbench Backdrop */}
      <div
        className="absolute inset-0 z-0 opacity-30 bg-cinematic pointer-events-none"
        style={{
          backgroundImage: "url('/images/projects_bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
        }}
      />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_20%_40%,rgba(255,94,30,0.16)_0%,transparent_50%)] pointer-events-none cyber-glow-pulse" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_80%_60%,rgba(245,158,11,0.14)_0%,transparent_50%)] pointer-events-none cyber-glow-pulse" />
      {/* Soft Vignette Overlay */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,rgba(6,8,14,0.35)_0%,rgba(6,8,14,0.85)_55%,#06080E_95%)] pointer-events-none" />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#06080E] via-transparent to-[#06080E] pointer-events-none" />

      <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 relative z-10 flex flex-col items-center preserve-3d">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <span className="font-mono text-xs tracking-[0.25em] text-[#FF5E1E] uppercase mb-3 bg-[#0B101D]/90 px-4 py-1.5 rounded-full border border-[#FF5E1E]/40 backdrop-blur-md font-bold shadow-[0_0_20px_rgba(255,94,30,0.25)]">
            ENGINEERING PORTFOLIO
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            Featured Systems &amp; <span className="text-[#FF5E1E]">Projects.</span>
          </h2>
          <p className="font-body text-[#e2e8f0] max-w-xl text-sm sm:text-base mt-4 font-normal drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            9 end-to-end projects spanning silicon RTL-to-GDSII, embedded firmware, IoT architectures, and full-stack software.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
          {CATEGORIES.map((cat) => {
            const count = cat === "ALL" ? projects.length : projects.filter((p) => p.category.toLowerCase() === cat.toLowerCase()).length;
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-mono text-xs tracking-wider px-4 py-2 rounded-xl transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? "bg-[#FF5E1E] text-white font-black shadow-[0_0_20px_rgba(255,94,30,0.6)] scale-105"
                    : "bg-[#0B101D]/85 text-[#cbd5e1] hover:text-white border border-white/15 hover:border-[#FF5E1E]/50 backdrop-blur-md"
                }`}
              >
                <span>{cat === "ALL" ? "All Projects" : cat}</span>
                <span className={`text-[0.65rem] px-1.5 py-0.2 rounded-full ${isSelected ? "bg-white/25 text-white" : "bg-white/10 text-white/80"}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Project Cards Grid with 3D Tilt & Cursor Spotlight */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="project-card-item cursor-pointer"
            >
              <TiltSpotlightCard
                className="h-full flex flex-col justify-between rounded-2xl bg-[#0B101D]/90 border border-white/15 hover:border-[#FF5E1E]/60 p-6 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,94,30,0.25)] group backdrop-blur-2xl"
                glowColor={project.accentColor ? `${project.accentColor}30` : "rgba(255, 94, 30, 0.25)"}
                maxTilt={6}
              >
                <div>
                  {/* Card Top: Category & Metrics */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="font-mono text-[0.68rem] tracking-wider uppercase px-3 py-1 rounded-md bg-black/40 border font-bold"
                      style={{
                        borderColor: `${project.accentColor || "#FF5E1E"}50`,
                        color: project.accentColor || "#FF5E1E",
                      }}
                    >
                      {project.category}
                    </span>
                    {project.metrics && project.metrics[0] && (
                      <span className="font-mono text-[0.68rem] text-[#FF5E1E] bg-[#FF5E1E]/15 border border-[#FF5E1E]/30 px-2.5 py-0.5 rounded font-semibold">
                        {project.metrics[0].value}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3
                    onClick={() => setSelectedProject(project)}
                    className="font-display font-bold text-lg sm:text-xl text-white group-hover:text-[#FF5E1E] transition-colors cursor-pointer mb-2.5 line-clamp-1"
                  >
                    {project.title}
                  </h3>

                  {/* Summary */}
                  <p className="font-body text-xs sm:text-sm text-[#cbd5e1] leading-relaxed mb-5 line-clamp-3 font-light">
                    {project.summary}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-[0.65rem] text-[#cbd5e1] bg-black/40 px-2.5 py-1 rounded border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="font-mono text-[0.65rem] text-[#94a3b8] px-1 py-1">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Footer: Action Links & Details */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="font-mono text-[0.7rem] tracking-wider text-[#cbd5e1] hover:text-white uppercase transition-colors font-medium cursor-pointer"
                  >
                    Deep Dive ▾
                  </button>

                  <div className="flex items-center gap-2">
                    {project.links && project.links.length > 0 && (
                      <a
                        href={project.links[0].url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-[0.68rem] tracking-wider text-white hover:text-white bg-[#FF5E1E]/20 hover:bg-[#FF5E1E] border border-[#FF5E1E]/40 rounded-lg px-3 py-1.5 transition-all flex items-center gap-1 font-semibold shadow-sm"
                      >
                        <span>{project.links[0].label}</span>
                        <span>↗</span>
                      </a>
                    )}
                  </div>
                </div>
              </TiltSpotlightCard>
            </div>
          ))}
        </div>
      </div>

      {/* Case Study Modal Overlay */}
      {selectedProject && (
        <ProjectOverlay
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}

function ProjectOverlay({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#06080E]/90 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#0B101D] border border-white/20 rounded-2xl p-6 sm:p-10 shadow-2xl backdrop-blur-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 font-mono text-xs tracking-widest text-[#94a3b8] hover:text-white px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/30 transition-colors cursor-pointer"
        >
          ESC [CLOSE]
        </button>

        {/* Category & Title */}
        <span
          className="font-mono text-xs tracking-widest uppercase mb-2 block font-bold"
          style={{ color: project.accentColor || "#FF5E1E" }}
        >
          {project.category} SPECIFICATION
        </span>
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white mb-6 pr-20 drop-shadow-sm">
          {project.title}
        </h2>

        {/* Metrics Grid */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8 p-4 rounded-xl bg-black/40 border border-white/10">
            {project.metrics.map((m) => (
              <div key={m.label}>
                <div
                  className="font-display font-black text-xl sm:text-2xl"
                  style={{ color: project.accentColor || "#FF5E1E" }}
                >
                  {m.value}
                </div>
                <div className="font-mono text-[0.68rem] text-white uppercase mt-0.5 font-medium">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Content Sections */}
        <div className="flex flex-col gap-6 text-sm text-[#cbd5e1] leading-relaxed">
          <div>
            <h4 className="font-mono text-xs tracking-wider text-white uppercase mb-2 font-bold">
              The Engineering Challenge
            </h4>
            <p className="font-body text-[#e2e8f0]">{project.problem}</p>
          </div>

          <div>
            <h4 className="font-mono text-xs tracking-wider text-white uppercase mb-2 font-bold">
              Architecture &amp; Approach
            </h4>
            <p className="font-body text-[#e2e8f0] mb-2">{project.approach}</p>
            <p className="font-body text-[#cbd5e1]">{project.architecture}</p>
          </div>

          <div>
            <h4 className="font-mono text-xs tracking-wider text-white uppercase mb-2 font-bold">
              Implementation Details
            </h4>
            <p className="font-body text-[#e2e8f0]">{project.implementation}</p>
          </div>

          <div>
            <h4 className="font-mono text-xs tracking-wider text-[#FF5E1E] uppercase mb-2 font-bold">
              Verified Result
            </h4>
            <p className="font-body text-white font-medium">{project.result}</p>
          </div>

          {/* Technologies */}
          <div>
            <h4 className="font-mono text-xs tracking-wider text-white uppercase mb-2 font-bold">
              Technologies Used
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((t) => (
                <span
                  key={t}
                  className="font-mono text-xs text-white bg-black/50 border border-white/15 px-3 py-1 rounded"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links */}
          {project.links && project.links.length > 0 && (
            <div className="pt-6 border-t border-white/15 flex flex-wrap gap-3">
              {project.links.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF5E1E] to-[#F59E0B] text-white font-mono text-xs font-bold tracking-wider uppercase hover:shadow-[0_0_20px_rgba(255,94,30,0.6)] transition-all flex items-center gap-2"
                >
                  <span>{link.label}</span>
                  <span>↗</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
