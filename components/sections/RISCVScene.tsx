"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TiltSpotlightCard from "@/components/interactions/TiltSpotlightCard";
import MagneticButton from "@/components/interactions/MagneticButton";
import {
  playClockPulse,
  playClickSound,
  playHoverSound,
  playMechanicalSwitchSound,
  playDataPacketSound,
} from "@/lib/soundEffects";
import {
  RISCVPipelineConduit,
  RISCVStageDetail,
  RISCVRegisterBank,
  STAGES_META,
} from "@/components/interactions/RISCVPipelineVisualizer";
import RiscvPipeline3D from "@/components/canvas/RiscvPipeline3D";

gsap.registerPlugin(ScrollTrigger);

const INSTRUCTIONS = [
  { asm: "addi x5, x0, 42", type: "I-Type", desc: "Initialize x5 register with immediate 42" },
  { asm: "slli x6, x5, 2", type: "R-Type", desc: "Shift left logical x5 by 2 -> x6 = 168" },
  { asm: "lw x7, 0(x6)", type: "I-Type", desc: "Load 32-bit word from memory at addr x6" },
  { asm: "add x8, x7, x5", type: "R-Type", desc: "Add loaded word + 42 -> store in x8" },
  { asm: "sw x8, 4(x6)", type: "S-Type", desc: "Store calculated sum back to memory" },
];

export default function RISCVScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [clockCycle, setClockCycle] = useState(1);
  const [activeStageId, setActiveStageId] = useState<string>("EX");
  const [isAutoClock, setIsAutoClock] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      containerRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      }
    );
  }, []);

  // Auto clock cycle advancement
  useEffect(() => {
    if (!isAutoClock) return;
    const interval = setInterval(() => {
      setClockCycle((prev) => (prev >= 100 ? 1 : prev + 1));
      playDataPacketSound();
      playClockPulse();
    }, 1200);
    return () => clearInterval(interval);
  }, [isAutoClock]);

  const handleStepClock = () => {
    setClockCycle((prev) => (prev >= 100 ? 1 : prev + 1));
    playDataPacketSound();
    playClockPulse();
  };

  const currentInst = INSTRUCTIONS[(clockCycle - 1) % INSTRUCTIONS.length];

  return (
    <section
      id="riscv"
      ref={containerRef}
      className="relative min-h-screen py-24 border-t border-white/[0.08] overflow-hidden bg-[#06080E] w-full flex flex-col items-center perspective-3d"
    >
      {/* Sky130 Silicon Die Micrograph Backdrop */}
      <div
        className="absolute inset-0 z-0 opacity-30 bg-cinematic pointer-events-none"
        style={{
          backgroundImage: "url('/images/chip_bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_25%_40%,rgba(255,94,30,0.16)_0%,transparent_50%)] pointer-events-none cyber-glow-pulse" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_75%_60%,rgba(56,189,248,0.14)_0%,transparent_50%)] pointer-events-none cyber-glow-pulse" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,rgba(6,8,14,0.35)_0%,rgba(6,8,14,0.85)_50%,#06080E_95%)] pointer-events-none" />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#06080E] via-transparent to-[#06080E] pointer-events-none" />

      <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 relative z-10 flex flex-col items-center preserve-3d">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 depth-front">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FF5E1E]/15 border border-[#FF5E1E]/50 text-white font-mono text-xs uppercase mb-3 shadow-[0_0_20px_rgba(255,94,30,0.35)] font-bold">
            <span className="w-2 h-2 rounded-full bg-[#FF5E1E] animate-ping" />
            <span>FLAGSHIP SILICON TAPE-OUT • SKYWATER 130nm PDK</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
            32-Bit RISC-V <span className="text-[#FF5E1E] drop-shadow-[0_0_25px_rgba(255,94,30,0.5)]">Core Execution.</span>
          </h2>
          <p className="font-body text-[#F8FAFC] max-w-2xl text-sm sm:text-base mt-4 font-normal drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Full RTL-to-GDSII physical design flow for a 32-bit RISC-V pipelined core, validated 100% DRC/LVS-clean with optimal timing closure using the SkyWater 130nm PDK.
          </p>
        </div>

        {/* Symmetrical 2-Column Core Architecture Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch w-full depth-mid">
          
          {/* Left Column (6 cols): 3D Silicon Pipeline & Hardware Clock Deck */}
          <div className="lg:col-span-6 flex flex-col">
            <TiltSpotlightCard
              className="h-full bg-[#0B101D]/95 border border-white/15 rounded-2xl p-6 sm:p-7 backdrop-blur-xl shadow-2xl flex flex-col justify-between"
              glowColor="rgba(255, 94, 30, 0.28)"
              maxTilt={3}
            >
              <div>
                {/* Header Strip with CLICKABLE Metrics */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-5 pb-4 border-b border-white/10">
                  <div>
                    <span className="font-mono text-xs tracking-wider text-[#FF5E1E] uppercase font-bold flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#FF5E1E] animate-ping" />
                      LIVE HARDWARE PIPELINE SIMULATOR
                    </span>
                    <h3 className="font-display font-extrabold text-2xl text-white mt-1">
                      32-Bit RISC-V Core Layout
                    </h3>
                  </div>

                  {/* CLICKABLE TOP 22 BADGE */}
                  <a
                    href="https://github.com/Purush-5268/Paidipilli_Purushotham_RISC-V-SOC-VSD-Week_9"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={playClickSound}
                    onMouseEnter={playHoverSound}
                    title="Click to view National Tapeout Project on GitHub"
                    className="group flex flex-col items-end px-3.5 py-1.5 rounded-xl bg-[#FF5E1E]/20 hover:bg-[#FF5E1E] border border-[#FF5E1E]/50 text-white transition-all shadow-[0_0_20px_rgba(255,94,30,0.35)] hover:scale-105 cursor-pointer"
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="font-display font-black text-lg text-white">
                        TOP 22
                      </span>
                      <span className="text-xs transition-transform group-hover:translate-x-0.5">↗</span>
                    </div>
                    <span className="font-heading text-[0.62rem] text-[#F8FAFC]/90 uppercase font-bold">
                      Nationally in India
                    </span>
                  </a>
                </div>

                {/* REAL-TIME 3D PIPELINE MATRIX */}
                <RiscvPipeline3D
                  activeStageId={activeStageId}
                  clockCycle={clockCycle}
                />

                {/* CLICKABLE STAGE TABS */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="font-mono text-xs text-[#94A3B8] uppercase font-bold mr-1">
                    Select Stage:
                  </span>
                  {STAGES_META.map((st) => {
                    const isSelected = activeStageId === st.id;
                    return (
                      <button
                        key={st.id}
                        type="button"
                        onClick={() => {
                          playClickSound();
                          setActiveStageId(st.id);
                        }}
                        onMouseEnter={playHoverSound}
                        className={`px-3 py-1.5 rounded-lg font-heading text-xs font-bold uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
                          isSelected
                            ? "bg-[#FF5E1E] text-white shadow-[0_0_15px_rgba(255,94,30,0.6)]"
                            : "bg-[#06080E] text-white/70 hover:text-white border border-white/10 hover:border-white/30"
                        }`}
                      >
                        <span>{st.id} ({st.label})</span>
                      </button>
                    );
                  })}
                </div>

                {/* 5-Stage Animated Signal Conduit */}
                <RISCVPipelineConduit
                  activeStageId={activeStageId}
                  clockCycle={clockCycle}
                  onStageSelect={(id) => setActiveStageId(id)}
                />
              </div>

              {/* Hardware Clock Controller & Interactive Clickable Instructions */}
              <div className="pt-5 border-t border-white/10 flex flex-col gap-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <MagneticButton
                      onClick={handleStepClock}
                      className="px-6 py-3 rounded-full bg-[#FF5E1E] text-white font-heading font-black text-xs uppercase tracking-wider hover:bg-white hover:text-[#06080E] transition-all shadow-[0_0_25px_rgba(255,94,30,0.6)] cursor-pointer"
                    >
                      <span>STEP CLOCK TICK ⚡</span>
                    </MagneticButton>

                    <MagneticButton
                      onClick={() => {
                        playMechanicalSwitchSound();
                        setIsAutoClock(!isAutoClock);
                      }}
                      className={`px-5 py-3 rounded-full border font-heading text-xs uppercase tracking-wider transition-all cursor-pointer ${
                        isAutoClock
                          ? "bg-[#F59E0B] text-[#06080E] border-[#F59E0B] font-bold shadow-[0_0_20px_rgba(245,158,11,0.6)]"
                          : "bg-[#06080E] text-white border-white/20 hover:border-[#F59E0B]"
                      }`}
                    >
                      <span>{isAutoClock ? "PAUSE AUTO-CLOCK" : "AUTO-PULSE 1.2s"}</span>
                    </MagneticButton>
                  </div>

                  <div className="flex items-center gap-2 font-mono text-xs text-[#94a3b8]">
                    <span>CLK CYCLE:</span>
                    <span className="text-[#FF5E1E] font-extrabold text-sm">#{clockCycle}</span>
                  </div>
                </div>

                {/* CLICKABLE INSTRUCTION PROGRAM RUNNER */}
                <div className="p-3.5 rounded-xl bg-black/60 border border-white/10">
                  <span className="font-heading text-xs text-white uppercase font-bold block mb-2">
                    Click Any Instruction to Execute in Pipeline:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {INSTRUCTIONS.map((inst, idx) => {
                      const isInstActive = (clockCycle - 1) % INSTRUCTIONS.length === idx;
                      return (
                        <button
                          key={inst.asm}
                          type="button"
                          onClick={() => {
                            setClockCycle(idx + 1);
                            playDataPacketSound();
                            playClockPulse();
                          }}
                          onMouseEnter={playHoverSound}
                          className={`px-3 py-1.5 rounded-lg font-mono text-xs transition-all cursor-pointer ${
                            isInstActive
                              ? "bg-[#FF5E1E] text-white font-bold shadow-[0_0_15px_rgba(255,94,30,0.6)] scale-105"
                              : "bg-[#06080E] text-white/80 hover:text-white border border-white/10 hover:border-white/30"
                          }`}
                        >
                          <span>{inst.asm}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </TiltSpotlightCard>
          </div>

          {/* Right Column (6 cols): Specifications + Stage Details + Live Registers */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            
            {/* 1. Foundry Tapeout Specifications (Physical Design Sign-Off) */}
            <TiltSpotlightCard
              className="bg-[#0B101D]/95 border border-white/15 rounded-2xl p-6 sm:p-7 backdrop-blur-xl shadow-2xl"
              glowColor="rgba(245, 158, 11, 0.28)"
              maxTilt={3}
            >
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
                <span className="font-heading text-xs sm:text-sm text-[#FF5E1E] uppercase font-black tracking-wider">
                  FOUNDRY TAPEOUT SPECIFICATIONS
                </span>
                <span className="px-3 py-1 rounded-full bg-[#FF5E1E]/20 border border-[#FF5E1E]/50 text-white font-mono text-xs font-bold">
                  100% DRC / LVS PASS
                </span>
              </div>

              <div className="space-y-3 font-mono text-xs sm:text-sm">
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="font-heading text-xs sm:text-sm text-[#94a3b8] font-semibold">Process Design Kit</span>
                  <span className="font-mono text-white font-bold">SkyWater 130nm CMOS (Sky130)</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="font-heading text-xs sm:text-sm text-[#94a3b8] font-semibold">Instruction Architecture</span>
                  <span className="font-mono text-[#FF5E1E] font-bold">32-bit RISC-V (RV32I Harvard)</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="font-heading text-xs sm:text-sm text-[#94a3b8] font-semibold">RTL-to-GDSII Toolchain</span>
                  <span className="font-mono text-white font-bold">OpenLane / Magic / Netgen</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="font-heading text-xs sm:text-sm text-[#94a3b8] font-semibold">Pipeline Depth</span>
                  <span className="font-mono text-[#F59E0B] font-bold">5-Stage In-Order (IF/ID/EX/MEM/WB)</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="font-heading text-xs sm:text-sm text-[#94a3b8] font-semibold">Clock Tree Synthesis</span>
                  <span className="font-mono text-[#38BDF8] font-bold">Balanced CTS • Zero Slack Violations</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-heading text-xs sm:text-sm text-[#94a3b8] font-semibold">Clock Domain Frequency</span>
                  <span className="font-mono text-[#FF5E1E] font-bold">100.00 MHz Synced</span>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-white/10">
                <MagneticButton
                  href="https://github.com/Purush-5268/Paidipilli_Purushotham_RISC-V-SOC-VSD-Week_9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-full bg-[#FF5E1E] text-white font-heading font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,94,30,0.5)] hover:bg-white hover:text-[#06080E] transition-all cursor-pointer"
                >
                  <span>VIEW TAPE-OUT GITHUB REPOSITORY ↗</span>
                </MagneticButton>
              </div>
            </TiltSpotlightCard>

            {/* 2. Active Stage Execution Detail Schematic */}
            <RISCVStageDetail
              activeStageId={activeStageId}
              clockCycle={clockCycle}
              currentInst={currentInst}
            />

            {/* 3. Live 32-Bit Architectural Register File Bank */}
            <RISCVRegisterBank
              clockCycle={clockCycle}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
