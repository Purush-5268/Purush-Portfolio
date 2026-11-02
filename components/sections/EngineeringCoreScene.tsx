"use client";
import React, { useState } from "react";
import TiltSpotlightCard from "@/components/interactions/TiltSpotlightCard";
import CyberText from "@/components/interactions/CyberText";
import { playFrequencySwitchSound, playPowerSubHum, playHoverSound, playClickSound } from "@/lib/soundEffects";
import SiliconStageVisualizer from "@/components/interactions/SiliconStageVisualizer";
import AsicWafer3D from "@/components/canvas/AsicWafer3D";

interface FlowStage {
  id: string;
  stepNumber: string;
  title: string;
  toolchain: string;
  color: string;
  description: string;
  deliverable: string;
  targetSiliconRegion: string;
  telemetryMetric: string;
}

const FLOW_STAGES: FlowStage[] = [
  {
    id: "rtl",
    stepNumber: "01",
    title: "RTL Architecture & Logic Design",
    toolchain: "SystemVerilog / Verilog HDL",
    color: "#FF5E1E",
    description: "Architecting synthesizable register-transfer level hardware descriptions with clean finite state machines (FSM), parameterizable datapath registers, and dual-clock domain crossing (CDC) safeguards.",
    deliverable: "Synthesizable .sv / .v Source Modules",
    targetSiliconRegion: "RTL LOGIC ARCHITECTURE // REGISTER ARRAY",
    telemetryMetric: "10,000+ Cycles Simulated",
  },
  {
    id: "verification",
    stepNumber: "02",
    title: "Functional Verification & UVM",
    toolchain: "Synopsys VCS / UVM / SystemVerilog OOP",
    color: "#F59E0B",
    description: "Developing comprehensive UVM environments (Drivers, Monitors, Scoreboards) with constrained randomization, functional coverage bins, and assertion-based protocol verification to guarantee zero data loss.",
    deliverable: "100% Code & Functional Coverage Sign-Off",
    targetSiliconRegion: "VERIFICATION HARNESS // COVERAGE BINS",
    telemetryMetric: "100% Coverage Closed",
  },
  {
    id: "synthesis",
    stepNumber: "03",
    title: "Logic Synthesis & Gate Mapping",
    toolchain: "Synopsys Design Compiler / Yosys",
    color: "#38BDF8",
    description: "Translating behavioural RTL constructs into mapped standard cell gates against the SkyWater 130nm library, resolving setup/hold timing constraints and minimizing gate switching power.",
    deliverable: "Gate-Level Structural Netlist (.v)",
    targetSiliconRegion: "STANDARD CELL MAPPING // LOGIC GATES",
    telemetryMetric: "Area: 1321.32 µm² Optimized",
  },
  {
    id: "floorplan",
    stepNumber: "04",
    title: "Floorplanning & Power Grid (PDN)",
    toolchain: "OpenLane / Cadence Innovus",
    color: "#FB923C",
    description: "Establishing die and core boundaries, I/O pad ring placements, macro cell clustering, and synthesizing multi-layer Power Distribution Networks on Metal layers 4 and 5 to prevent IR-drop.",
    deliverable: "DEF Floorplan Layout with Validated PDN",
    targetSiliconRegion: "DIE PERIMETER & POWER DISTRIBUTION (PDN)",
    telemetryMetric: "Core Utilization: 55% Target",
  },
  {
    id: "cts-route",
    stepNumber: "05",
    title: "Clock Tree Synthesis & Routing",
    toolchain: "TritonRoute / CTS Clock Engines",
    color: "#FF5E1E",
    description: "Building balanced H-tree clock distribution networks to minimize skew and latency jitter across registers, followed by multi-layer global and detailed metal routing without antenna violations.",
    deliverable: "Route-Clean DEF with Clock Tree Closure",
    targetSiliconRegion: "CLOCK DISTRIBUTION H-TREE & METAL TRACES",
    telemetryMetric: "Zero Skew • Optimal Slack",
  },
  {
    id: "signoff",
    stepNumber: "06",
    title: "Physical Sign-Off & GDSII Stream",
    toolchain: "Magic DRC / Netgen LVS / Sky130 PDK",
    color: "#F59E0B",
    description: "Executing full-chip Design Rule Checking (DRC) and Layout Versus Schematic (LVS) extraction against SPICE transistor subcircuits, verifying 100% cleanliness for foundry tapeout fabrication.",
    deliverable: "DRC/LVS-Clean GDSII Stream File",
    targetSiliconRegion: "FOUNDRY FABRICATION MASK (SKY130 PDK)",
    telemetryMetric: "100% DRC / LVS Clean • Tapeout",
  },
];

export default function EngineeringCoreScene() {
  const [activeStageId, setActiveStageId] = useState<string>("cts-route");
  const [visualMode, setVisualMode] = useState<"3d" | "schematic">("3d");

  const currentStage = FLOW_STAGES.find((s) => s.id === activeStageId) || FLOW_STAGES[4];

  return (
    <section 
      id="engineering-core"
      className="relative min-h-screen flex flex-col justify-center py-24 overflow-hidden border-t border-white/[0.08] bg-[#06080E] w-full perspective-3d"
    >
      {/* Optimized Cleanroom Fab Backdrop */}
      <div 
        className="absolute inset-0 z-0 opacity-30 bg-cinematic pointer-events-none"
        style={{
          backgroundImage: "url('/images/silicon_flow_bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center 55%",
        }}
      />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,94,30,0.16)_0%,transparent_50%)] pointer-events-none cyber-glow-pulse" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_70%_60%,rgba(245,158,11,0.14)_0%,transparent_50%)] pointer-events-none cyber-glow-pulse" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,rgba(6,8,14,0.35)_0%,rgba(6,8,14,0.85)_55%,#06080E_95%)] pointer-events-none" />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#06080E] via-transparent to-[#06080E] pointer-events-none" />

      <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 relative z-10 flex flex-col items-center preserve-3d">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14 depth-front">
          <span className="font-mono text-xs tracking-[0.25em] text-[#FF5E1E] uppercase mb-3 bg-[#0B101D]/90 px-4 py-1.5 rounded-full border border-[#FF5E1E]/40 backdrop-blur-md font-bold shadow-[0_0_20px_rgba(255,94,30,0.25)]">
            <CyberText text="ASIC DESIGN FLOW // ARCHITECTURE TO SILICON" speed={22} />
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
            From Logic <span className="text-[#FF5E1E] drop-shadow-[0_0_25px_rgba(255,94,30,0.5)]">to Silicon Sign-Off.</span>
          </h2>
          <p className="font-body text-[#e2e8f0] max-w-2xl text-sm sm:text-base mt-4 font-normal drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Bridging abstract software code with physical silicon realities. An authentic end-to-end ASIC physical design methodology validated DRC/LVS-clean for foundry tape-out.
          </p>
        </div>

        {/* 2-Column Real Silicon Visualizer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch w-full mb-12 depth-mid">
          
          {/* Left Column: Stage Detail & EDA Toolchain Box */}
          <div className="lg:col-span-6 flex flex-col">
            <TiltSpotlightCard
              className="h-full rounded-2xl bg-[#0B101D]/95 border border-white/20 p-6 sm:p-8 backdrop-blur-xl shadow-2xl flex flex-col justify-between"
              glowColor={`${currentStage.color}35`}
              maxTilt={4}
            >
              <div>
                {/* Stage Indicator Pill */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span 
                      className="px-3 py-1 rounded-full font-mono text-xs font-bold uppercase tracking-wider"
                      style={{ 
                        backgroundColor: `${currentStage.color}20`, 
                        color: currentStage.color, 
                        border: `1px solid ${currentStage.color}50` 
                      }}
                    >
                      STAGE {currentStage.stepNumber} // 06
                    </span>
                    <span className="font-mono text-xs text-[#94a3b8] uppercase">
                      ● {currentStage.id.toUpperCase()}
                    </span>
                  </div>

                  <span className="font-mono text-[0.65rem] text-[#64748b]">
                    SKY130 PDK VERIFIED
                  </span>
                </div>

                {/* Stage Title */}
                <h3 className="font-display font-black text-2xl sm:text-3xl text-white mb-4">
                  {currentStage.title}
                </h3>

                {/* Primary EDA Toolchain Box */}
                <div className="p-4 rounded-xl bg-black/60 border border-white/15 mb-4 shadow-inner">
                  <div className="font-mono text-[0.68rem] text-[#FF5E1E] uppercase font-bold tracking-wider mb-1">
                    PRIMARY EDA TOOLCHAIN &amp; STANDARD
                  </div>
                  <div className="font-heading text-sm sm:text-base text-white font-semibold">
                    {currentStage.toolchain}
                  </div>
                </div>

                {/* Description */}
                <p className="font-body text-sm sm:text-base text-[#cbd5e1] leading-relaxed mb-6 font-normal">
                  {currentStage.description}
                </p>
              </div>

              {/* Bottom Metrics Bar */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="font-mono text-[0.62rem] text-[#FF5E1E] uppercase font-bold block">
                    Verified Deliverable
                  </span>
                  <span className="font-heading text-xs text-white font-medium">
                    {currentStage.deliverable}
                  </span>
                </div>

                <div className="px-3.5 py-1.5 rounded-lg bg-[#FF5E1E]/15 border border-[#FF5E1E]/40 text-white font-mono text-xs font-bold shadow-[0_0_15px_rgba(255,94,30,0.25)]">
                  {currentStage.telemetryMetric}
                </div>
              </div>
            </TiltSpotlightCard>
          </div>

          {/* Right Column: Dynamic 3D Wafer Stack / Schematic Visualizer with Mode Switcher */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="flex items-center justify-between mb-3 px-1">
              <span className="font-mono text-xs text-[#94a3b8] uppercase tracking-wider font-semibold">
                ARCHITECTURAL TELEMETRY
              </span>
              <div className="flex items-center gap-2 p-1 rounded-full bg-[#0B101D]/90 border border-white/15 backdrop-blur-xl">
                <button
                  onClick={() => {
                    playClickSound();
                    setVisualMode("3d");
                  }}
                  onMouseEnter={playHoverSound}
                  className={`px-3 py-1 rounded-full font-heading text-xs font-bold uppercase transition-all cursor-pointer ${
                    visualMode === "3d"
                      ? "bg-[#FF5E1E] text-white shadow-[0_0_15px_rgba(255,94,30,0.6)]"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  ⚡ 3D WAFER STACK
                </button>
                <button
                  onClick={() => {
                    playClickSound();
                    setVisualMode("schematic");
                  }}
                  onMouseEnter={playHoverSound}
                  className={`px-3 py-1 rounded-full font-heading text-xs font-bold uppercase transition-all cursor-pointer ${
                    visualMode === "schematic"
                      ? "bg-[#F59E0B] text-[#06080E] font-bold shadow-[0_0_15px_rgba(245,158,11,0.6)]"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  📊 SCHEMATIC LOGIC
                </button>
              </div>
            </div>

            <TiltSpotlightCard
              className="h-full rounded-2xl bg-[#0B101D]/95 border border-white/20 backdrop-blur-xl shadow-2xl overflow-hidden relative flex flex-col justify-between"
              glowColor={`${currentStage.color}35`}
              maxTilt={4}
            >
              {visualMode === "3d" ? (
                <AsicWafer3D
                  activeStageId={currentStage.id}
                  stageColor={currentStage.color}
                />
              ) : (
                <SiliconStageVisualizer
                  stageId={currentStage.id}
                  stageColor={currentStage.color}
                />
              )}
            </TiltSpotlightCard>
          </div>
        </div>

        {/* 6 Interactive Flow Stepper Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 w-full depth-mid">
          {FLOW_STAGES.map((step) => {
            const isSelected = activeStageId === step.id;
            return (
              <button
                key={step.id}
                onClick={() => {
                  if (step.id === "floorplan") {
                    playPowerSubHum();
                  } else {
                    playFrequencySwitchSound();
                  }
                  setActiveStageId(step.id);
                }}
                onMouseEnter={playHoverSound}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer backdrop-blur-xl flex flex-col justify-between ${
                  isSelected
                    ? "bg-[#0B101D] shadow-[0_0_25px_rgba(255,94,30,0.3)] scale-[1.03]"
                    : "bg-[#06080E]/80 hover:bg-[#0B101D] border-white/10 hover:border-white/30"
                }`}
                style={{
                  borderColor: isSelected ? step.color : undefined,
                }}
              >
                <div className="flex items-center justify-between w-full mb-3">
                  <span 
                    className="font-mono text-xs font-black tracking-wider px-2 py-0.5 rounded"
                    style={{ 
                      backgroundColor: `${step.color}25`,
                      color: step.color 
                    }}
                  >
                    {step.stepNumber}
                  </span>
                  {isSelected && (
                    <span 
                      className="w-2 h-2 rounded-full animate-ping"
                      style={{ backgroundColor: step.color }}
                    />
                  )}
                </div>

                <div>
                  <span className="font-heading font-bold text-xs sm:text-sm text-white block mb-1">
                    {step.title}
                  </span>
                  <span className="font-mono text-[0.62rem] text-[#94a3b8] block truncate">
                    {step.toolchain}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
