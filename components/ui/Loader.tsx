"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STAGES = [
  { pct: 0, label: "SYSTEM INITIALIZATION" },
  { pct: 20, label: "LOADING ENVIRONMENT" },
  { pct: 40, label: "CALIBRATING PARTICLES" },
  { pct: 65, label: "COMPILING EXPERIENCE" },
  { pct: 85, label: "SYSTEM ONLINE" },
  { pct: 100, label: "ENTERING UNIVERSE" },
];

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [stageIndex, setStageIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  // Particle field in loader
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles: { x: number; y: number; vx: number; vy: number; alpha: number; size: number }[] = [];
    for (let i = 0; i < 120; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.5 + 0.1,
        size: Math.random() * 1.5 + 0.5,
      });
    }

    const draw = () => {
      ctx.fillStyle = "rgba(2, 4, 8, 0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 255, ${p.alpha})`;
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // Progress animation
  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.random() * 8 + 2;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setTimeout(() => {
          setVisible(false);
          setTimeout(onComplete, 600);
        }, 400);
      }
      setProgress(Math.min(100, current));

      const idx = STAGES.findIndex((s, i) =>
        i === STAGES.length - 1
          ? current >= s.pct
          : current >= s.pct && current < STAGES[i + 1].pct
      );
      if (idx >= 0) setStageIndex(idx);
    }, 120);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="loader-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ opacity: 0.6 }}
          />

          <div className="relative z-10 flex flex-col items-center gap-8">
            {/* Logo mark */}
            <div className="relative">
              <div
                className="w-16 h-16 border border-electric/30 rounded-full flex items-center justify-center"
                style={{
                  boxShadow: "0 0 20px rgba(0,212,255,0.2), 0 0 60px rgba(0,212,255,0.05)",
                }}
              >
                <div
                  className="w-2 h-2 rounded-full bg-electric"
                  style={{ boxShadow: "0 0 12px rgba(0,212,255,0.8)" }}
                />
              </div>
              <div
                className="absolute inset-0 border border-violet/20 rounded-full animate-spin-slow"
                style={{ animationDuration: "8s" }}
              />
            </div>

            {/* Terminal-style heading */}
            <div className="text-center">
              <p
                className="font-mono text-xs tracking-[0.3em] text-electric/60 mb-2"
                style={{ letterSpacing: "0.3em" }}
              >
                PURUSHOTHAM.OS
              </p>
              <AnimatePresence mode="wait">
                <motion.p
                  key={stageIndex}
                  className="font-mono text-[0.65rem] tracking-[0.2em] text-text-secondary"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  {STAGES[stageIndex]?.label}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Progress bar */}
            <div className="loader-progress-bar">
              <div
                className="loader-progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p
              className="font-mono text-[0.6rem] text-text-dim tracking-[0.2em]"
            >
              {Math.round(progress)}%
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
