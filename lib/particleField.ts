"use client";
import { useEffect, useRef, useCallback } from "react";

// Particle field shader — runs on 2D canvas for performance
// Used by Hero scene and blends into other scenes

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  size: number;
  hue: number; // 180-280 = cyan to violet range
  twinkle: number;
  twinkleSpeed: number;
}

interface ParticleFieldOptions {
  count?: number;
  mode?: "stars" | "ocean" | "signals" | "nebula";
  mouseInfluence?: boolean;
}

export function createParticleField(
  canvas: HTMLCanvasElement,
  options: ParticleFieldOptions = {}
) {
  const {
    count = 200,
    mode = "stars",
    mouseInfluence = true,
  } = options;

  const ctx = canvas.getContext("2d")!;
  let width = canvas.width;
  let height = canvas.height;
  let mouseX = width / 2;
  let mouseY = height / 2;
  let animId = 0;

  const particles: Particle[] = [];

  function initParticles() {
    particles.length = 0;
    for (let i = 0; i < count; i++) {
      const hue =
        mode === "stars"
          ? 200 + Math.random() * 60
          : mode === "ocean"
          ? 180 + Math.random() * 30
          : mode === "signals"
          ? 220 + Math.random() * 60
          : 200 + Math.random() * 80;

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (mode === "ocean" ? 0.5 : 0.2),
        vy:
          mode === "ocean"
            ? -Math.random() * 0.8 - 0.2
            : (Math.random() - 0.5) * 0.2,
        alpha: Math.random() * 0.6 + 0.1,
        size: Math.random() * 1.8 + 0.3,
        hue,
        twinkle: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
      });
    }
  }

  initParticles();

  function draw(time: number) {
    // Trail effect — semi-transparent clear
    ctx.fillStyle =
      mode === "ocean"
        ? "rgba(4, 8, 20, 0.12)"
        : "rgba(2, 4, 8, 0.08)";
    ctx.fillRect(0, 0, width, height);

    particles.forEach((p) => {
      // Twinkle
      p.twinkle += p.twinkleSpeed;
      const twinkleFactor = 0.5 + 0.5 * Math.sin(p.twinkle);

      // Mouse influence
      if (mouseInfluence) {
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          const force = (150 - dist) / 150;
          p.vx -= (dx / dist) * force * 0.015;
          p.vy -= (dy / dist) * force * 0.015;
        }
      }

      // Apply friction
      p.vx *= 0.99;
      p.vy *= 0.99;

      // Move
      p.x += p.vx;
      p.y += p.vy;

      // Wrap
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) {
        p.y = mode === "ocean" ? height : 0;
      }

      const finalAlpha = p.alpha * twinkleFactor;

      // Draw particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

      if (mode === "signals") {
        // Signals get a trailing line
        ctx.fillStyle = `hsla(${p.hue}, 80%, 70%, ${finalAlpha})`;
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x - p.vx * 20, p.y - p.vy * 20);
        ctx.strokeStyle = `hsla(${p.hue}, 80%, 70%, ${finalAlpha * 0.3})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      } else {
        // Glow effect for larger particles
        if (p.size > 1.2) {
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
          grad.addColorStop(0, `hsla(${p.hue}, 80%, 80%, ${finalAlpha})`);
          grad.addColorStop(1, `hsla(${p.hue}, 80%, 80%, 0)`);
          ctx.fillStyle = grad;
          ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = `hsla(${p.hue}, 80%, 80%, ${finalAlpha})`;
          ctx.fill();
        }
      }
    });

    animId = requestAnimationFrame(draw);
  }

  animId = requestAnimationFrame(draw);

  const onMouseMove = (e: MouseEvent) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  };

  const onResize = () => {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
    initParticles();
  };

  if (mouseInfluence) {
    window.addEventListener("mousemove", onMouseMove);
  }
  window.addEventListener("resize", onResize);

  return {
    destroy() {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
    },
    setMode(newMode: ParticleFieldOptions["mode"]) {
      // Could smoothly transition — for now just reinit
      options.mode = newMode;
    },
  };
}
