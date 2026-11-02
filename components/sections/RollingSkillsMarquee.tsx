"use client";
import React, { useState } from "react";

interface SkillItem {
  name: string;
  category: "RTL to GDSII" | "Embedded Systems" | "Full-Stack Software" | "IoT & Sensors";
  level: "Expert" | "Proficient";
  color: string;
  iconSvg: React.ReactNode;
}

// ============================================================
// ROW 1: SILICON ARCHITECTURE, ASIC FLOW & EMBEDDED FIRMWARE (14 Master Skills)
// ============================================================
const ROW_1_HARDWARE: SkillItem[] = [
  {
    name: "SystemVerilog / Verilog HDL",
    category: "RTL to GDSII",
    level: "Expert",
    color: "#FF5E1E",
    iconSvg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M9 9h6v6H9z" />
        <path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3" />
      </svg>
    ),
  },
  {
    name: "32-Bit RISC-V (RV32I Core)",
    category: "RTL to GDSII",
    level: "Expert",
    color: "#FF5E1E",
    iconSvg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    name: "OpenLane ASIC Flow",
    category: "RTL to GDSII",
    level: "Proficient",
    color: "#F59E0B",
    iconSvg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
        <path d="M2 12h20" />
      </svg>
    ),
  },
  {
    name: "SkyWater 130nm CMOS PDK",
    category: "RTL to GDSII",
    level: "Expert",
    color: "#38BDF8",
    iconSvg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
        <line x1="12" y1="22" x2="12" y2="15.5" />
        <polyline points="22 8.5 12 15.5 2 8.5" />
      </svg>
    ),
  },
  {
    name: "Cadence Virtuoso",
    category: "RTL to GDSII",
    level: "Proficient",
    color: "#FF5E1E",
    iconSvg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      </svg>
    ),
  },
  {
    name: "Synopsys VCS / Design Compiler",
    category: "RTL to GDSII",
    level: "Proficient",
    color: "#F59E0B",
    iconSvg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
  },
  {
    name: "Magic VLSI & Netgen LVS",
    category: "RTL to GDSII",
    level: "Expert",
    color: "#38BDF8",
    iconSvg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
  {
    name: "UVM Verification Suite",
    category: "RTL to GDSII",
    level: "Proficient",
    color: "#FF5E1E",
    iconSvg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="m4.93 4.93 4.24 4.24" />
        <path d="m14.83 9.17 4.24-4.24" />
        <path d="m14.83 14.83 4.24 4.24" />
        <path d="m9.17 14.83-4.24 4.24" />
      </svg>
    ),
  },
  {
    name: "Static Timing Analysis (STA / CTS)",
    category: "RTL to GDSII",
    level: "Expert",
    color: "#F59E0B",
    iconSvg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    name: "Embedded C / C++",
    category: "Embedded Systems",
    level: "Expert",
    color: "#38BDF8",
    iconSvg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    name: "ESP32 (ESP-IDF Framework)",
    category: "Embedded Systems",
    level: "Expert",
    color: "#FF5E1E",
    iconSvg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="2" width="20" height="8" rx="2" />
        <rect x="2" y="14" width="20" height="8" rx="2" />
        <line x1="6" y1="6" x2="6.01" y2="6" />
        <line x1="6" y1="18" x2="6.01" y2="18" />
      </svg>
    ),
  },
  {
    name: "FreeRTOS Real-Time Kernel",
    category: "Embedded Systems",
    level: "Proficient",
    color: "#F59E0B",
    iconSvg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    name: "UART / I2C / SPI / GPIO",
    category: "Embedded Systems",
    level: "Expert",
    color: "#38BDF8",
    iconSvg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 14h6m-6 4h10M4 6h16M4 10h12" />
      </svg>
    ),
  },
  {
    name: "Hardware Debugging (JTAG / Logic Analyzer)",
    category: "Embedded Systems",
    level: "Expert",
    color: "#FF5E1E",
    iconSvg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
  },
];

// ============================================================
// ROW 2: ENTERPRISE SOFTWARE, CLOUD & SENSOR SYSTEMS (12 Master Skills)
// ============================================================
const ROW_2_SOFTWARE: SkillItem[] = [
  {
    name: "C# / ASP.NET Core 8 Web API",
    category: "Full-Stack Software",
    level: "Proficient",
    color: "#38BDF8",
    iconSvg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    name: "Angular 17+ (TypeScript & RxJS)",
    category: "Full-Stack Software",
    level: "Proficient",
    color: "#FF5E1E",
    iconSvg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="12 2 2 5 3.5 17 12 22 20.5 17 22 5 12 2" />
        <path d="M12 6l5 11h-2.5l-1-2.5h-3L9.5 17H7l5-11z" />
      </svg>
    ),
  },
  {
    name: "React 18 & Next.js App Router",
    category: "Full-Stack Software",
    level: "Proficient",
    color: "#38BDF8",
    iconSvg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(30 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(-30 12 12)" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
  },
  {
    name: "Python & Django REST Framework",
    category: "Full-Stack Software",
    level: "Proficient",
    color: "#F59E0B",
    iconSvg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M16.5 9.4 7.55 4.24a1.8 1.8 0 0 0-2.5 1.48v12.56a1.8 1.8 0 0 0 2.5 1.48L16.5 14.6a1.8 1.8 0 0 0 0-3.2z" />
      </svg>
    ),
  },
  {
    name: "SignalR Real-Time WebSockets",
    category: "Full-Stack Software",
    level: "Proficient",
    color: "#FF5E1E",
    iconSvg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M5 12.55a11 11 0 0 1 14.08 0" />
        <path d="M1.42 9a16 16 0 0 1 21.16 0" />
        <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
        <circle cx="12" cy="20" r="1" />
      </svg>
    ),
  },
  {
    name: "PostgreSQL & Redis Cache",
    category: "Full-Stack Software",
    level: "Proficient",
    color: "#38BDF8",
    iconSvg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
  },
  {
    name: "IoT Gas Leakage & Sensors (MQ2)",
    category: "IoT & Sensors",
    level: "Expert",
    color: "#FF5E1E",
    iconSvg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    name: "DHT11 Environmental Sensing",
    category: "IoT & Sensors",
    level: "Expert",
    color: "#38BDF8",
    iconSvg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
      </svg>
    ),
  },
  {
    name: "WebRTC Ultra-Low Latency",
    category: "Full-Stack Software",
    level: "Proficient",
    color: "#F59E0B",
    iconSvg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="23 7 16 12 23 17 23 7" />
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
      </svg>
    ),
  },
  {
    name: "Docker Microservices & CI/CD",
    category: "Full-Stack Software",
    level: "Proficient",
    color: "#38BDF8",
    iconSvg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 3H8l-2 4h12l-2-4z" />
        <line x1="7" y1="12" x2="7.01" y2="12" />
        <line x1="12" y1="12" x2="12.01" y2="12" />
        <line x1="17" y1="12" x2="17.01" y2="12" />
      </svg>
    ),
  },
  {
    name: "Linux Kernel & Systems Dev",
    category: "Full-Stack Software",
    level: "Expert",
    color: "#FF5E1E",
    iconSvg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    name: "Git & Collaborative DevOps",
    category: "Full-Stack Software",
    level: "Expert",
    color: "#F59E0B",
    iconSvg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="18" cy="18" r="3" />
        <circle cx="6" cy="6" r="3" />
        <path d="M6 9a9 9 0 0 0 9 9" />
      </svg>
    ),
  },
];

export default function RollingSkillsMarquee() {
  // Independent hover pause states for each row
  const [isRow1Paused, setIsRow1Paused] = useState(false);
  const [isRow2Paused, setIsRow2Paused] = useState(false);

  return (
    <section
      id="skills-marquee"
      className="relative w-full py-24 border-t border-b border-white/[0.08] bg-[#06080E] overflow-hidden flex flex-col items-center select-none"
    >
      {/* Background Subtle Gradient & Industrial Forge Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,94,30,0.08)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ff5e1e08_1px,transparent_1px),linear-gradient(to_bottom,#ff5e1e08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,#000_60%,transparent_100%)] pointer-events-none" />

      {/* Header Deck (Clean, confident, without any redundant text) */}
      <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 mb-12 flex flex-col items-center text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FF5E1E]/15 border border-[#FF5E1E]/40 mb-3 shadow-[0_0_20px_rgba(255,94,30,0.25)]">
          <span className="w-2 h-2 rounded-full bg-[#FF5E1E] animate-ping" />
          <span className="font-heading font-black text-xs text-white uppercase tracking-wider">
            TECHNICAL REPERTOIRE // SILICON TO FULL-STACK
          </span>
        </div>

        <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
          Engineering Arsenal —{" "}
          <span className="text-[#FF5E1E] drop-shadow-[0_0_25px_rgba(255,94,30,0.5)]">
            Silicon to Software.
          </span>
        </h2>

        <p className="font-body text-[#CBD5E1] max-w-2xl text-sm sm:text-base mt-3 font-normal drop-shadow-sm leading-relaxed">
          Transistor-level RTL-to-GDSII tapeouts and bare-metal embedded firmware to scalable enterprise .NET, Angular, React, and Django platforms.
        </p>
      </div>

      {/* ============================================================
          ROW 1: Hardware, Silicon Architecture & Firmware (Leftward Roll)
          ============================================================ */}
      <div
        className="marquee-track-row w-full overflow-hidden py-3 relative group"
        onMouseEnter={() => setIsRow1Paused(true)}
        onMouseLeave={() => setIsRow1Paused(false)}
      >
        {/* Soft Left & Right Fade Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-28 sm:w-48 bg-gradient-to-r from-[#06080E] via-[#06080E]/90 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-28 sm:w-48 bg-gradient-to-l from-[#06080E] via-[#06080E]/90 to-transparent z-10 pointer-events-none" />

        <div
          className="flex gap-4 sm:gap-5 w-max animate-marquee"
          style={{ animationPlayState: isRow1Paused ? "paused" : "running" }}
        >
          {[...ROW_1_HARDWARE, ...ROW_1_HARDWARE].map((skill, idx) => (
            <div
              key={`row1-${skill.name}-${idx}`}
              className="flex items-center gap-3.5 px-6 py-4 rounded-2xl bg-[#0B101D]/90 border border-white/15 hover:border-[#FF5E1E] hover:bg-[#121B30] transition-all duration-300 shadow-xl hover:shadow-[0_0_30px_rgba(255,94,30,0.4)] hover:scale-[1.04] cursor-pointer whitespace-nowrap backdrop-blur-md"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center p-2.5 border shrink-0 transition-transform duration-300 group-hover:scale-110"
                style={{
                  backgroundColor: `${skill.color}18`,
                  borderColor: `${skill.color}50`,
                  color: skill.color,
                }}
              >
                {skill.iconSvg}
              </div>

              <div className="flex flex-col text-left">
                <span className="font-display font-extrabold text-sm sm:text-base text-white tracking-tight">
                  {skill.name}
                </span>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="font-mono text-[0.62rem] text-[#94A3B8] uppercase font-semibold">
                    {skill.category}
                  </span>
                  <span
                    className="font-mono text-[0.6rem] font-black uppercase px-2 py-0.5 rounded shadow-sm"
                    style={{
                      backgroundColor: `${skill.color}25`,
                      color: skill.color,
                    }}
                  >
                    {skill.level}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ============================================================
          ROW 2: Full-Stack Enterprise Software & IoT Systems (Rightward Roll)
          ============================================================ */}
      <div
        className="marquee-track-row w-full overflow-hidden py-3 relative group mt-3"
        onMouseEnter={() => setIsRow2Paused(true)}
        onMouseLeave={() => setIsRow2Paused(false)}
      >
        {/* Soft Left & Right Fade Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-28 sm:w-48 bg-gradient-to-r from-[#06080E] via-[#06080E]/90 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-28 sm:w-48 bg-gradient-to-l from-[#06080E] via-[#06080E]/90 to-transparent z-10 pointer-events-none" />

        <div
          className="flex gap-4 sm:gap-5 w-max animate-marquee-reverse"
          style={{ animationPlayState: isRow2Paused ? "paused" : "running" }}
        >
          {[...ROW_2_SOFTWARE, ...ROW_2_SOFTWARE].map((skill, idx) => (
            <div
              key={`row2-${skill.name}-${idx}`}
              className="flex items-center gap-3.5 px-6 py-4 rounded-2xl bg-[#0B101D]/90 border border-white/15 hover:border-[#38BDF8] hover:bg-[#121B30] transition-all duration-300 shadow-xl hover:shadow-[0_0_30px_rgba(56,189,248,0.4)] hover:scale-[1.04] cursor-pointer whitespace-nowrap backdrop-blur-md"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center p-2.5 border shrink-0 transition-transform duration-300 group-hover:scale-110"
                style={{
                  backgroundColor: `${skill.color}18`,
                  borderColor: `${skill.color}50`,
                  color: skill.color,
                }}
              >
                {skill.iconSvg}
              </div>

              <div className="flex flex-col text-left">
                <span className="font-display font-extrabold text-sm sm:text-base text-white tracking-tight">
                  {skill.name}
                </span>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="font-mono text-[0.62rem] text-[#94A3B8] uppercase font-semibold">
                    {skill.category}
                  </span>
                  <span
                    className="font-mono text-[0.6rem] font-black uppercase px-2 py-0.5 rounded shadow-sm"
                    style={{
                      backgroundColor: `${skill.color}25`,
                      color: skill.color,
                    }}
                  >
                    {skill.level}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
