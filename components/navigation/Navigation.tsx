"use client";
import { useEffect, useState } from "react";
import { profile } from "@/data/profile";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Silicon Flow", href: "#engineering-core" },
  { label: "RISC-V", href: "#riscv" },
  { label: "Projects", href: "#projects" },
  { label: "Gallery", href: "#gallery" },
  { label: "Research", href: "#research" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Honors", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resumeDropdown, setResumeDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Scroll spy
      const sections = ["hero", "about", "engineering-core", "riscv", "projects", "gallery", "research", "skills", "experience", "achievements", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id.replace("#", ""));
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full flex justify-center ${
          scrolled
            ? "py-3 bg-[#05070D]/90 backdrop-blur-md border-b border-white/[0.08] shadow-2xl"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 flex items-center justify-between">
          {/* Brand Logo & Status: Icon smoothly reveals on hover */}
          <button
            onClick={() => scrollTo("hero")}
            className="flex items-center group text-left cursor-pointer"
          >
            {/* Circular profile avatar reveals on mouse hover with smooth transition */}
            <div className="w-0 opacity-0 -translate-x-2 scale-75 group-hover:w-10 group-hover:opacity-100 group-hover:translate-x-0 group-hover:scale-100 group-hover:mr-3 transition-all duration-300 ease-out flex-shrink-0 overflow-hidden">
              <div className="w-10 h-10 rounded-full border-2 border-[#FF5E1E] overflow-hidden shadow-[0_0_16px_rgba(255,94,30,0.6)] bg-[#06080E]">
                <img
                  src={profile.profileImage}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-sm tracking-tight text-[#f8fafc] group-hover:text-[#FF5E1E] transition-colors flex items-center gap-1.5">
                <span className="text-[#FF5E1E] font-mono text-xs opacity-75 group-hover:opacity-100 transition-opacity">⚡</span>
                PURUSHOTHAM
              </span>
              <span className="flex items-center gap-1.5 font-mono text-[0.62rem] text-[#FF5E1E] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF5E1E] animate-ping" />
                ECE • RTL-to-GDSII • Embedded • Full-Stack (.NET/Angular/React)
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#0B101D]/85 border border-white/[0.08] rounded-full px-4 py-1.5 backdrop-blur-md">
            {NAV_LINKS.map((link) => {
              const id = link.href.replace("#", "");
              const isActive = activeSection === id;
              return (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className={`font-heading text-xs font-semibold tracking-wider px-3.5 py-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "text-white bg-[#FF5E1E] shadow-[0_0_15px_rgba(255,94,30,0.5)] font-bold"
                      : "text-[#94A3B8] hover:text-white hover:bg-white/[0.06]"
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Action Buttons (Right) */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Resume Dropdown */}
            <div className="relative">
              <button
                onClick={() => setResumeDropdown(!resumeDropdown)}
                className="font-heading text-xs font-bold tracking-wider uppercase px-4 py-1.5 rounded-full border border-[#FF5E1E]/60 text-white bg-[#FF5E1E]/15 hover:bg-[#FF5E1E] hover:text-white transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(255,94,30,0.3)] cursor-pointer"
              >
                <span>Resumes</span>
                <span className="text-[0.65rem]">▾</span>
              </button>

              {resumeDropdown && (
                <div
                  className="absolute right-0 mt-2 w-52 bg-[#0B101D] border border-white/[0.12] rounded-xl shadow-2xl py-1.5 z-50 flex flex-col backdrop-blur-xl"
                  onMouseLeave={() => setResumeDropdown(false)}
                >
                  <a
                    href="/resumes/vlsi_resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-heading text-xs font-semibold text-[#f8fafc] hover:text-[#FF5E1E] hover:bg-white/[0.06] px-4 py-2.5 transition-colors flex items-center justify-between"
                  >
                    <span>VLSI Design CV</span>
                    <span className="text-[0.65rem] text-[#94A3B8]">PDF ↗</span>
                  </a>
                  <a
                    href="/resumes/embedded_resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-heading text-xs font-semibold text-[#f8fafc] hover:text-[#FF5E1E] hover:bg-white/[0.06] px-4 py-2.5 transition-colors flex items-center justify-between"
                  >
                    <span>Embedded CV</span>
                    <span className="text-[0.65rem] text-[#94A3B8]">PDF ↗</span>
                  </a>
                  <a
                    href="/resumes/Software_Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-heading text-xs font-semibold text-[#f8fafc] hover:text-[#FF5E1E] hover:bg-white/[0.06] px-4 py-2.5 transition-colors flex items-center justify-between"
                  >
                    <span>Software CV</span>
                    <span className="text-[0.65rem] text-[#94A3B8]">PDF ↗</span>
                  </a>
                </div>
              )}
            </div>

            {/* GitHub */}
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="p-2 rounded-md border border-white/[0.08] text-[#94a3b8] hover:text-white hover:border-white/20 transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="p-2 rounded-md border border-white/[0.08] text-[#94a3b8] hover:text-[#00e5ff] hover:border-[#00e5ff]/40 transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c-.95 0-1.72-.77-1.72-1.72s.77-1.72 1.72-1.72 1.72.77 1.72 1.72-.77 1.72-1.72 1.72m1.4 9.74v-8.37H5.06v8.37h2.8z" />
              </svg>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#94a3b8] hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#080d18] border-b border-white/[0.08] px-6 py-4 flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="font-mono text-xs tracking-wider text-left py-2 text-[#94a3b8] hover:text-[#00e5ff]"
              >
                {link.label}
              </button>
            ))}
            <div className="pt-3 border-t border-white/[0.08] flex flex-wrap gap-2">
              <a
                href="/resumes/vlsi_resume.pdf"
                target="_blank"
                className="font-mono text-[0.65rem] px-3 py-1.5 rounded border border-[#00e5ff]/40 text-[#00e5ff]"
              >
                VLSI Resume ↗
              </a>
              <a
                href="/resumes/embedded_resume.pdf"
                target="_blank"
                className="font-mono text-[0.65rem] px-3 py-1.5 rounded border border-[#0891b2]/40 text-[#0891b2]"
              >
                Embedded Resume ↗
              </a>
              <a
                href="/resumes/Software_Resume.pdf"
                target="_blank"
                className="font-mono text-[0.65rem] px-3 py-1.5 rounded border border-[#16a34a]/40 text-[#16a34a]"
              >
                Software Resume ↗
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
