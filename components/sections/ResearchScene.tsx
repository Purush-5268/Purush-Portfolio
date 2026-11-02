"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TiltSpotlightCard from "@/components/interactions/TiltSpotlightCard";
import MagneticButton from "@/components/interactions/MagneticButton";
import CyberText from "@/components/interactions/CyberText";
import { playClickSound, playHoverSound, playFrequencySwitchSound, playLaserScanSound } from "@/lib/soundEffects";
import NeuralBrain3D from "@/components/canvas/NeuralBrain3D";

gsap.registerPlugin(ScrollTrigger);

type WaveBand = "alpha" | "beta" | "gamma" | "raw";

export default function ResearchScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedBand, setSelectedBand] = useState<WaveBand>("beta");
  const [filterEnabled, setFilterEnabled] = useState(true);

  // Real-time canvas EEG wave animation loop with Traveling Signal Beam
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId = 0;
    let offset = 0;
    let sweepPhase = 0;

    const render = () => {
      const parent = canvas.parentElement;
      const displayWidth = Math.max(parent?.clientWidth || canvas.clientWidth || 800, 320);
      const displayHeight = Math.max(parent?.clientHeight || 180, 140);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      const targetW = Math.floor(displayWidth * dpr);
      const targetH = Math.floor(displayHeight * dpr);

      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      // 1. Clear with deep oscilloscope background
      ctx.fillStyle = "#040711";
      ctx.fillRect(0, 0, displayWidth, displayHeight);

      // 2. Draw Scientific Reticle Grid (Orange accent)
      ctx.strokeStyle = "rgba(255, 94, 30, 0.08)";
      ctx.lineWidth = 1;
      const gridStepX = 45;
      const gridStepY = 32;

      for (let x = 0; x <= displayWidth; x += gridStepX) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, displayHeight);
        ctx.stroke();
      }
      for (let y = 0; y <= displayHeight; y += gridStepY) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(displayWidth, y);
        ctx.stroke();
      }

      // 3. Center line
      const centerY = displayHeight / 2;
      ctx.strokeStyle = "rgba(255, 94, 30, 0.2)";
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      ctx.lineTo(displayWidth, centerY);
      ctx.stroke();

      // Signal Frequency parameters
      const freq = selectedBand === "alpha" ? 0.024 : selectedBand === "beta" ? 0.052 : selectedBand === "gamma" ? 0.095 : 0.038;
      const amp = selectedBand === "alpha" ? 30 : selectedBand === "beta" ? 38 : selectedBand === "gamma" ? 18 : 46;

      const waveColor = filterEnabled ? "#FF5E1E" : "#F59E0B";
      const waveColorAlpha = filterEnabled ? "rgba(255, 94, 30, " : "rgba(245, 158, 11, ";

      // Precompute waveform points
      const points: { x: number; y: number }[] = [];
      for (let x = 0; x <= displayWidth; x += 2) {
        const t = x + offset;
        let y = centerY;

        y += Math.sin(t * freq) * amp;
        y += Math.cos(t * freq * 1.8 + 0.4) * (amp * 0.35);
        y += Math.sin(t * freq * 0.4) * (amp * 0.25);

        if (!filterEnabled || selectedBand === "raw") {
          y += (Math.sin(t * 0.45) + Math.cos(t * 0.85)) * 14;
          y += (Math.sin(t * 1.7) * 4);
        }

        points.push({ x, y });
      }

      // Draw Translucent Glowing Area Under Waveform
      if (points.length > 1) {
        const grad = ctx.createLinearGradient(0, centerY - amp, 0, centerY + amp);
        grad.addColorStop(0, `${waveColorAlpha}0.2)`);
        grad.addColorStop(0.5, `${waveColorAlpha}0.03)`);
        grad.addColorStop(1, `${waveColorAlpha}0.2)`);

        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.lineTo(displayWidth, centerY);
        ctx.lineTo(0, centerY);
        ctx.closePath();
        ctx.fillStyle = grad;
        ctx.fill();
      }

      // Draw Primary Glowing EEG Signal Waveform
      if (points.length > 1) {
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.strokeStyle = waveColor;
        ctx.lineWidth = 2.4;
        ctx.shadowColor = waveColor;
        ctx.shadowBlur = 10;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // Traveling Signal Beam & Pulse Head
      sweepPhase = (sweepPhase + 2.5) % displayWidth;
      const sweepX = sweepPhase;

      let sweepY = centerY;
      const sweepT = sweepX + offset;
      sweepY += Math.sin(sweepT * freq) * amp;
      sweepY += Math.cos(sweepT * freq * 1.8 + 0.4) * (amp * 0.35);

      ctx.beginPath();
      ctx.arc(sweepX, sweepY, 6, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.shadowColor = waveColor;
      ctx.shadowBlur = 18;
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.restore();

      offset += 2;
      animId = requestAnimationFrame(render);
    };

    render();

    const resizeObserver = new ResizeObserver(() => {});
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
    };
  }, [selectedBand, filterEnabled]);

  return (
    <section
      id="research"
      ref={containerRef}
      className="relative min-h-[90vh] w-full flex flex-col items-center justify-center py-24 overflow-hidden border-t border-white/[0.08] bg-[#06080E] perspective-3d"
    >
      {/* BCI Neuro-Engineering Laboratory Backdrop */}
      <div
        className="absolute inset-0 z-0 opacity-30 bg-cinematic pointer-events-none"
        style={{
          backgroundImage: "url('/images/bci_research_bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
        }}
      />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,94,30,0.16)_0%,transparent_50%)] pointer-events-none cyber-glow-pulse" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_70%_60%,rgba(245,158,11,0.14)_0%,transparent_50%)] pointer-events-none cyber-glow-pulse" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,rgba(6,8,14,0.3)_0%,rgba(6,8,14,0.85)_60%,#06080E_95%)] pointer-events-none" />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#06080E]/40 via-transparent to-[#06080E] pointer-events-none" />

      <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 relative z-10 flex flex-col items-center preserve-3d">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 depth-front">
          <span className="font-mono text-xs tracking-[0.25em] text-[#FF5E1E] uppercase mb-3 bg-[#0B101D]/90 px-4 py-1.5 rounded-full border border-[#FF5E1E]/40 backdrop-blur-md font-bold shadow-[0_0_20px_rgba(255,94,30,0.25)]">
            <CyberText text="COMPUTATIONAL NEUROSCIENCE // IIT BHUBANESWAR" speed={22} />
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
            IIT Bhubaneswar — <span className="text-[#FF5E1E] drop-shadow-[0_0_25px_rgba(255,94,30,0.5)]">BCI Signal Processing.</span>
          </h2>
          <p className="font-body text-[#e2e8f0] max-w-2xl text-sm sm:text-base mt-4 font-normal drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Summer Research Fellowship under Dr. Himanshu Padole (Dept. of ECE) selected from 1,000+ national applicants.
          </p>
        </div>

        {/* 3D HOLOGRAPHIC CORTEX SIMULATION */}
        <div className="w-full max-w-5xl depth-mid mb-6">
          <NeuralBrain3D
            selectedBand={selectedBand}
            filterEnabled={filterEnabled}
          />
        </div>

        {/* Real-Time Interactive EEG Oscilloscope Visualizer */}
        <div className="w-full max-w-5xl rounded-2xl border border-white/20 bg-[#0B101D]/90 p-4 sm:p-6 backdrop-blur-xl shadow-2xl mb-8 depth-mid">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5E1E] animate-ping" />
              <span className="font-mono text-xs text-white font-bold tracking-wider uppercase">
                REAL-TIME EEG CHANNEL TELEMETRY (CH4: C3/C4 SENSORIMOTOR CORTEX)
              </span>
            </div>

            {/* Band Selectors */}
            <div className="flex flex-wrap items-center gap-2">
              {(["alpha", "beta", "gamma", "raw"] as const).map((band) => (
                <button
                  key={band}
                  onClick={() => {
                    playFrequencySwitchSound();
                    setSelectedBand(band);
                  }}
                  onMouseEnter={playHoverSound}
                  className={`font-mono text-[0.65rem] tracking-wider uppercase px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                    selectedBand === band
                      ? "bg-[#FF5E1E] text-white font-black shadow-[0_0_12px_rgba(255,94,30,0.7)]"
                      : "bg-black/50 text-[#cbd5e1] hover:text-white border border-white/10"
                  }`}
                >
                  {band === "alpha" ? "Alpha (8-13 Hz)" : band === "beta" ? "Beta (13-30 Hz)" : band === "gamma" ? "Gamma (30+ Hz)" : "Raw Artifacts"}
                </button>
              ))}

              {/* Filter Toggle */}
              <button
                onClick={() => {
                  playLaserScanSound();
                  setFilterEnabled(!filterEnabled);
                }}
                className={`font-mono text-[0.65rem] tracking-wider uppercase px-2.5 py-1 rounded-md border transition-all cursor-pointer ${
                  filterEnabled
                    ? "bg-[#FF5E1E]/20 border-[#FF5E1E] text-[#FF5E1E] font-bold"
                    : "bg-[#f59e0b]/20 border-[#f59e0b] text-[#f59e0b]"
                }`}
              >
                {filterEnabled ? "✓ BUTTERWORTH ON" : "FILTER BYPASS"}
              </button>
            </div>
          </div>

          {/* Canvas Waveform */}
          <div className="relative w-full h-[180px] sm:h-[200px] rounded-xl overflow-hidden bg-black/75 border border-white/15 shadow-inner">
            <canvas ref={canvasRef} className="w-full h-full block" />
            
            {/* Top-left Telemetry HUD */}
            <div className="absolute top-2.5 left-3.5 flex items-center gap-3 font-mono text-[0.65rem] text-[#94a3b8] tracking-wider uppercase pointer-events-none">
              <span className="flex items-center gap-1.5 text-white font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF5E1E] animate-ping" />
                SWEEP: 25 mm/s
              </span>
              <span className="text-white/20">|</span>
              <span>SAMPLING: 250 HZ</span>
            </div>

            {/* Top-right Frequency Status */}
            <div className="absolute top-2.5 right-3.5 flex items-center gap-2 font-mono text-[0.65rem] pointer-events-none">
              <span className="px-2 py-0.5 rounded bg-black/60 border border-[#FF5E1E]/40 text-[#FF5E1E] font-bold">
                {selectedBand === "alpha" ? "ALPHA: 10.2 Hz" : selectedBand === "beta" ? "BETA: 21.4 Hz" : selectedBand === "gamma" ? "GAMMA: 38.6 Hz" : "RAW NOISE"}
              </span>
            </div>

            {/* Bottom-left Voltage Scale */}
            <div className="absolute bottom-2.5 left-3.5 font-mono text-[0.6rem] text-[#64748b] tracking-wider uppercase pointer-events-none">
              ±50 µV CALIBRATED SCALE • CH4: C3/C4 CORTEX
            </div>
          </div>
        </div>

        {/* Research Core Content Card with 3D Tilt */}
        <div className="max-w-5xl w-full depth-mid">
          <TiltSpotlightCard
            className="w-full bg-[#0B101D]/90 border border-white/15 rounded-2xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl"
            glowColor="rgba(255, 94, 30, 0.25)"
            maxTilt={4}
          >
            {/* Metric Tiles */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-center shadow-inner">
                <span className="font-display font-black text-3xl sm:text-4xl text-[#FF5E1E] drop-shadow-[0_0_12px_rgba(255,94,30,0.5)]">
                  +12%
                </span>
                <p className="font-heading text-xs text-white font-medium mt-1">Classification Gain</p>
                <p className="font-mono text-[0.62rem] text-[#94a3b8] uppercase mt-0.5">Over Baseline Models</p>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-center shadow-inner">
                <span className="font-display font-black text-3xl sm:text-4xl text-[#F59E0B] drop-shadow-[0_0_12px_rgba(245,158,11,0.5)]">
                  &gt;20 GB
                </span>
                <p className="font-heading text-xs text-white font-medium mt-1">Multi-Subject Data</p>
                <p className="font-mono text-[0.62rem] text-[#94a3b8] uppercase mt-0.5">4 Massive EEG Datasets</p>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-center shadow-inner">
                <span className="font-display font-black text-3xl sm:text-4xl text-[#38BDF8] drop-shadow-[0_0_12px_rgba(56,189,248,0.5)]">
                  EA Norm
                </span>
                <p className="font-heading text-xs text-white font-medium mt-1">Euclidean Alignment</p>
                <p className="font-mono text-[0.62rem] text-[#94a3b8] uppercase mt-0.5">Spatial Covariance Matrix</p>
              </div>
            </div>

            <p className="font-body text-[#cbd5e1] text-sm sm:text-base leading-relaxed mb-6 font-normal">
              Entrusted with full ownership of high-performance Brain-Computer Interface (BCI) signal processing pipelines. Tackled cross-subject signal variability using Euclidean Alignment (EA) to center covariance matrices in Riemannian manifolds before tangent space projection. Trained hybrid stacking ensembles (Support Vector Machines, Linear Discriminant Analysis, and Random Forests) to accurately decode motor imagery intentions from scalp potential signals.
            </p>

            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {["BCI", "EEG", "Butterworth", "Riemannian Tangent Space", "Ensemble Learning"].map((tag) => (
                  <span key={tag} className="font-mono text-[0.68rem] text-white bg-black/50 px-3 py-1 rounded border border-white/15">
                    {tag}
                  </span>
                ))}
              </div>

              <MagneticButton
                href="https://lnkd.in/p/g9ZF6yC7"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 rounded-xl bg-[#FF5E1E]/20 hover:bg-[#FF5E1E] text-white border border-[#FF5E1E]/50 font-heading text-xs font-bold tracking-wider uppercase transition-all shadow-[0_0_15px_rgba(255,94,30,0.3)]"
              >
                <span className="flex items-center gap-2">
                  <span>View Research Post &amp; Highlights</span>
                  <span>↗</span>
                </span>
              </MagneticButton>
            </div>
          </TiltSpotlightCard>
        </div>
      </div>
    </section>
  );
}
