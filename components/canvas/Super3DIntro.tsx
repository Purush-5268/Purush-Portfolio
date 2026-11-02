"use client";
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { playHyperDriveBlastSound } from "@/lib/soundEffects";

interface Super3DIntroProps {
  onEnter: () => void;
}

// 1. Procedural 1024x1024 Silicon Die Micro-Architecture Texture
function createSiliconDieTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Obsidian Silicon Mirror Substrate
  ctx.fillStyle = "#070B14";
  ctx.fillRect(0, 0, 1024, 1024);

  // Precision Micro-Grid Lines
  ctx.strokeStyle = "rgba(255, 94, 30, 0.12)";
  ctx.lineWidth = 1;
  const step = 32;
  for (let x = 0; x <= 1024; x += step) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 1024);
    ctx.stroke();
  }
  for (let y = 0; y <= 1024; y += step) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(1024, y);
    ctx.stroke();
  }

  // Interconnect Bus Highways (Amber & Forge Orange)
  ctx.strokeStyle = "rgba(245, 158, 11, 0.35)";
  ctx.lineWidth = 2;
  for (let i = 160; i < 900; i += 140) {
    ctx.strokeRect(i, 160, 48, 704);
    ctx.strokeRect(160, i, 704, 48);
  }

  // Gold Bond Pads Along Edges
  ctx.fillStyle = "#F59E0B";
  const padSize = 14;
  const padSpacing = 32;
  for (let p = 64; p < 960; p += padSpacing) {
    ctx.fillRect(p, 28, padSize, padSize);
    ctx.fillRect(p, 982, padSize, padSize);
    ctx.fillRect(28, p, padSize, padSize);
    ctx.fillRect(982, p, padSize, padSize);
  }

  // Center Silicon Core Boundary
  ctx.fillStyle = "#0A1020";
  ctx.fillRect(280, 280, 464, 464);

  ctx.strokeStyle = "#FF5E1E";
  ctx.lineWidth = 3;
  ctx.strokeRect(280, 280, 464, 464);

  ctx.strokeStyle = "rgba(56, 189, 248, 0.6)";
  ctx.lineWidth = 1.5;
  ctx.strokeRect(300, 300, 424, 424);

  // Micro-Logic Gate Patterns
  ctx.fillStyle = "rgba(255, 94, 30, 0.3)";
  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 5; c++) {
      ctx.fillRect(330 + c * 80, 330 + r * 80, 44, 44);
    }
  }

  // Laser Etched Silicon Insignia
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "bold 26px monospace";
  ctx.textAlign = "center";
  ctx.fillText("PAIDIPILLI PURUSHOTHAM", 512, 485);

  ctx.fillStyle = "#FF5E1E";
  ctx.font = "bold 20px monospace";
  ctx.fillText("RV32I • 32-BIT HARVARD CORE", 512, 520);

  ctx.fillStyle = "#F59E0B";
  ctx.font = "bold 16px monospace";
  ctx.fillText("TOP 22 NATIONALLY IN INDIA", 512, 552);

  ctx.fillStyle = "rgba(56, 189, 248, 0.9)";
  ctx.font = "14px monospace";
  ctx.fillText("SKYWATER 130nm CMOS • 100MHz", 512, 582);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// 2. Soft Feathered Circular Glow Texture for Micro-Stardust
function createSoftGlowTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);

  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
  gradient.addColorStop(0.25, "rgba(255, 120, 30, 0.8)");
  gradient.addColorStop(0.65, "rgba(255, 94, 30, 0.2)");
  gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export default function Super3DIntro({ onEnter }: Super3DIntroProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("CALIBRATING SKYWATER 130NM PDK SUBSTRATE...");
  const [isWarping, setIsWarping] = useState(false);

  const warpTriggeredRef = useRef(false);
  const hasEnteredRef = useRef(false);

  const completeEntry = () => {
    if (hasEnteredRef.current) return;
    hasEnteredRef.current = true;
    onEnter();
  };

  const triggerBlastWarp = () => {
    if (warpTriggeredRef.current) return;
    warpTriggeredRef.current = true;
    setIsWarping(true);
    playHyperDriveBlastSound();
  };

  // 4.5-Second Majestic Cinematic Boot Sequence
  useEffect(() => {
    const stages = [
      { at: 25, text: "CALIBRATING SKYWATER 130NM PDK SUBSTRATE..." },
      { at: 50, text: "SYNTHESIZING 32-BIT RISC-V HARVARD CORE..." },
      { at: 75, text: "VERIFYING TOP 22 NATIONAL TAPEOUT TELEMETRY..." },
      { at: 90, text: "ROUTING CLOCK TREE (CTS) • 100% DRC / LVS CLEAN..." },
      { at: 100, text: "SYSTEM READY • ENGAGING SILICON CORE..." },
    ];

    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setProgress(100);
        setStatusText("SYSTEM SYNCHRONIZED • DETONATING WARP...");
        // Auto-blast after reaching 100%
        setTimeout(() => {
          triggerBlastWarp();
        }, 500);
      } else {
        setProgress(current);
        const matched = stages.find((s) => current <= s.at);
        if (matched) {
          setStatusText(matched.text);
        }
      }
    }, 42); // ~4.2 seconds total duration

    return () => clearInterval(interval);
  }, []);

  // Scroll / Wheel & Touch & Keyboard Detection: Scroll down instantly initiates the blast!
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 15 || e.deltaY < -15) {
        triggerBlastWarp();
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      const touchY = e.touches[0].clientY;
      if (Math.abs(touchStartY - touchY) > 20) {
        triggerBlastWarp();
      }
    };

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        completeEntry();
      } else if (e.code === "Space" || e.key === "Enter" || e.key === "ArrowDown") {
        triggerBlastWarp();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("keydown", handleKey);
    };
  }, []);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // Scene & Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030508, 0.015);

    const camera = new THREE.PerspectiveCamera(46, width / height, 0.1, 1500);
    camera.position.set(0, 0, 26);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // 1. Central Silicon Monolith Group
    const monolithGroup = new THREE.Group();
    scene.add(monolithGroup);

    // Matte Obsidian Carrier Base
    const baseGeo = new THREE.BoxGeometry(7.2, 7.2, 0.5);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x090e18,
      roughness: 0.35,
      metalness: 0.7,
    });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    monolithGroup.add(baseMesh);

    // Gold Trim Framing Bevel
    const goldFrameGeo = new THREE.BoxGeometry(7.35, 7.35, 0.15);
    const goldFrameMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.95,
      roughness: 0.18,
      emissive: 0xf59e0b,
      emissiveIntensity: 0.25,
    });
    const goldFrameMesh = new THREE.Mesh(goldFrameGeo, goldFrameMat);
    goldFrameMesh.position.z = -0.15;
    monolithGroup.add(goldFrameMesh);

    // Silicon Die Top Layer with Procedural Texture
    const dieTexture = createSiliconDieTexture();
    const dieGeo = new THREE.BoxGeometry(5.4, 5.4, 0.25);
    const dieMats = [
      new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.8, roughness: 0.3 }),
      new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.8, roughness: 0.3 }),
      new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.8, roughness: 0.3 }),
      new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.8, roughness: 0.3 }),
      new THREE.MeshStandardMaterial({
        map: dieTexture,
        roughness: 0.15,
        metalness: 0.88,
        emissive: 0xff5e1e,
        emissiveIntensity: 0.35,
      }),
      new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.8, roughness: 0.3 }),
    ];
    const dieMesh = new THREE.Mesh(dieGeo, dieMats);
    dieMesh.position.z = 0.35;
    monolithGroup.add(dieMesh);

    // Central Photonic Quantum Core (Glow Octahedron)
    const coreGeo = new THREE.OctahedronGeometry(0.75, 2);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0xff5e1e,
      wireframe: true,
      transparent: true,
      opacity: 0.85,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMesh.position.z = 0.6;
    monolithGroup.add(coreMesh);

    // 2. Dual Concentric Gyroscopic Laser Accelerator Rings
    // Ring 1: Forge Orange
    const ring1Geo = new THREE.TorusGeometry(5.8, 0.04, 16, 120);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0xff5e1e,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3.2;
    monolithGroup.add(ring1);

    // Ring 2: Silicon Amber (Counter-rotating)
    const ring2Geo = new THREE.TorusGeometry(7.2, 0.04, 16, 120);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 2.8;
    monolithGroup.add(ring2);

    // Orbiting Photon Nodes on Rings
    const nodeGeo = new THREE.SphereGeometry(0.12, 16, 16);
    const nodeMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      blending: THREE.AdditiveBlending,
    });
    const nodeA = new THREE.Mesh(nodeGeo, nodeMat);
    ring1.add(nodeA);
    const nodeB = new THREE.Mesh(nodeGeo, nodeMat);
    ring2.add(nodeB);

    // 3. Concentric 3D Shockwave Blast Rings (Hidden until blast)
    const shockwaveRings: THREE.Mesh[] = [];
    for (let s = 0; s < 4; s++) {
      const sGeo = new THREE.TorusGeometry(1.5 + s * 1.8, 0.08, 16, 80);
      const sMat = new THREE.MeshBasicMaterial({
        color: s % 2 === 0 ? 0xff5e1e : 0xf59e0b,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
      });
      const sMesh = new THREE.Mesh(sGeo, sMat);
      sMesh.scale.set(0.01, 0.01, 0.01);
      scene.add(sMesh);
      shockwaveRings.push(sMesh);
    }

    // 4. Subtle, Delicate Micro-Stardust (Soft round glowing photons, NO square pixels!)
    const particleCount = 380;
    const posArray = new Float32Array(particleCount * 3);
    const colorArray = new Float32Array(particleCount * 3);
    const pRadii = new Float32Array(particleCount);
    const pAngles = new Float32Array(particleCount);
    const pSpeeds = new Float32Array(particleCount);

    const softGlowTexture = createSoftGlowTexture();
    const cOrange = new THREE.Color(0xff5e1e);
    const cGold = new THREE.Color(0xf59e0b);

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      const radius = 2.5 + Math.random() * 12;
      const angle = Math.random() * Math.PI * 2;
      pRadii[i] = radius;
      pAngles[i] = angle;
      pSpeeds[i] = 0.004 + (1 / radius) * 0.025;

      posArray[idx] = Math.cos(angle) * radius;
      posArray[idx + 1] = (Math.random() - 0.5) * 5;
      posArray[idx + 2] = Math.sin(angle) * radius - 2;

      const col = Math.random() < 0.6 ? cOrange : cGold;
      colorArray[idx] = col.r;
      colorArray[idx + 1] = col.g;
      colorArray[idx + 2] = col.b;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(posArray, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(colorArray, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.28,
      map: softGlowTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Dynamic Lights
    const pointLight = new THREE.PointLight(0xff5e1e, 5, 40);
    pointLight.position.set(0, 2, 7);
    scene.add(pointLight);

    const rimLight = new THREE.PointLight(0x38bdf8, 4, 35);
    rimLight.position.set(-8, 6, -5);
    scene.add(rimLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    // Mouse Tracking Parallax
    let mouseX = 0;
    let mouseY = 0;
    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / width - 0.5) * 2;
      mouseY = -(e.clientY / height - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    // 60FPS Animation Loop
    let animId = 0;
    let warpAcceleration = 0;
    let warpStartTime = 0;

    const render = (time: number) => {
      animId = requestAnimationFrame(render);
      const t = time * 0.001;

      if (!warpTriggeredRef.current) {
        // Idle Elegant Orbit
        monolithGroup.rotation.y = t * 0.5 + mouseX * 0.25;
        monolithGroup.rotation.x = Math.sin(t * 0.4) * 0.12 + mouseY * 0.2;
        monolithGroup.rotation.z = Math.cos(t * 0.3) * 0.08;

        ring1.rotation.z = t * 1.2;
        ring2.rotation.x = -t * 0.9;
        coreMesh.rotation.y = t * 1.5;

        // Orbit nodes
        nodeA.position.set(Math.cos(t * 3) * 5.8, Math.sin(t * 3) * 5.8, 0);
        nodeB.position.set(Math.cos(-t * 2.5) * 7.2, Math.sin(-t * 2.5) * 7.2, 0);

        // Soft Stardust Drift
        const positions = particleGeo.attributes.position.array as Float32Array;
        for (let i = 0; i < particleCount; i++) {
          const idx = i * 3;
          pAngles[i] += pSpeeds[i];
          positions[idx] = Math.cos(pAngles[i]) * pRadii[i];
          positions[idx + 2] = Math.sin(pAngles[i]) * pRadii[i] - 2;
        }
        particleGeo.attributes.position.needsUpdate = true;

        camera.position.x += (mouseX * 1.8 - camera.position.x) * 0.04;
        camera.position.y += (mouseY * 1.2 - camera.position.y) * 0.04;
      } else {
        // THE HYPER-SPEED BLAST DETONATION (Majestic 1.0s Flight)
        if (warpStartTime === 0) warpStartTime = t;
        const warpDuration = t - warpStartTime;
        warpAcceleration += 0.075;

        // Camera Hyper-Dives Straight Through Silicon Die!
        camera.position.z -= Math.pow(warpAcceleration, 1.8) * 3.6;
        camera.fov = Math.min(128, 46 + warpAcceleration * 42);
        camera.updateProjectionMatrix();

        monolithGroup.rotation.z += warpAcceleration * 0.22;
        coreMesh.scale.multiplyScalar(1.06);

        // Concentric 3D Shockwave Rings Expand
        shockwaveRings.forEach((sRing, sIdx) => {
          const scale = 0.05 + warpAcceleration * (6 + sIdx * 3.5);
          sRing.scale.set(scale, scale, scale);
          (sRing.material as THREE.MeshBasicMaterial).opacity = Math.max(
            0,
            0.95 - warpDuration * 0.95
          );
        });

        // Dissolve into Hero Scene smoothly at peak velocity
        if (warpDuration > 0.95 || camera.position.z < -220) {
          cancelAnimationFrame(animId);
          completeEntry();
          return;
        }
      }

      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", handleResize);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      baseGeo.dispose();
      baseMat.dispose();
      goldFrameGeo.dispose();
      goldFrameMat.dispose();
      dieGeo.dispose();
      dieMats.forEach((m) => m.dispose());
      dieTexture.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
      shockwaveRings.forEach((sr) => {
        sr.geometry.dispose();
        (sr.material as THREE.Material).dispose();
      });
      particleGeo.dispose();
      particleMat.dispose();
      softGlowTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      onClick={triggerBlastWarp}
      className={`fixed inset-0 z-[9999] bg-[#030508] overflow-hidden select-none cursor-pointer transition-opacity duration-700 ${
        isWarping ? "pointer-events-none" : ""
      }`}
    >
      {/* 3D WebGL Canvas */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full" />

      {/* Relativistic Optical Flare Flash (Screen bloom on blast) */}
      <div
        className={`absolute inset-0 bg-gradient-to-r from-[#FF5E1E] via-white to-[#F59E0B] transition-opacity duration-400 pointer-events-none mix-blend-screen ${
          isWarping ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Top Header: Identity & Instant Skip */}
      <header className="absolute top-6 left-6 right-6 sm:top-8 sm:left-10 sm:right-10 z-20 flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5E1E] animate-ping" />
          <span className="font-heading font-black text-sm tracking-tight text-white uppercase drop-shadow-[0_0_12px_rgba(255,94,30,0.8)]">
            PAIDIPILLI PURUSHOTHAM
          </span>
          <span className="hidden sm:inline-block font-mono text-[0.62rem] text-[#FF5E1E] bg-[#FF5E1E]/15 border border-[#FF5E1E]/30 px-2 py-0.5 rounded font-bold">
            RTL-TO-GDSII • EMBEDDED • FULL-STACK (.NET/ANGULAR/REACT)
          </span>
          <span className="hidden sm:inline-block font-mono text-[0.62rem] text-[#FF5E1E] bg-[#FF5E1E]/15 border border-[#FF5E1E]/30 px-2 py-0.5 rounded font-bold">
            RTL-TO-GDSII • EMBEDDED • FULL-STACK (.NET/ANGULAR/REACT)
          </span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            completeEntry();
          }}
          className="font-heading text-xs font-bold tracking-wider text-white/70 hover:text-white transition-all uppercase border border-white/20 hover:border-[#FF5E1E] hover:bg-[#FF5E1E]/20 px-3.5 py-1.5 rounded-full backdrop-blur-md bg-black/40 cursor-pointer shadow-lg active:scale-95"
        >
          SKIP [ESC]
        </button>
      </header>

      {/* Center-Bottom Sleek Apple-Grade HUD */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 w-[92%] max-w-[520px] flex flex-col items-center text-center pointer-events-none">
        {/* Monospace Glowing Counter */}
        <div className="font-mono text-3xl sm:text-4xl font-extrabold text-white tracking-widest mb-2 drop-shadow-[0_0_20px_rgba(255,94,30,0.9)] flex items-center gap-1">
          <span className="text-[#FF5E1E]">0</span>
          <span>{progress < 10 ? `0${progress}` : progress}</span>
          <span className="text-xs text-[#FF5E1E] font-bold align-top ml-1">%</span>
        </div>

        {/* Laser Progress Bar */}
        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-3 border border-white/15 p-0.5">
          <div
            className="h-full bg-gradient-to-r from-[#FF5E1E] via-[#F59E0B] to-[#38BDF8] rounded-full transition-all duration-75 ease-out shadow-[0_0_16px_rgba(255,94,30,0.9)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Minimal High-Tech Telemetry */}
        <p className="font-mono text-[0.68rem] tracking-widest text-[#FF5E1E] uppercase font-bold drop-shadow-[0_0_10px_rgba(255,94,30,0.6)]">
          {statusText}
        </p>

        {/* Dynamic Scroll & Click Prompt */}
        <div className="mt-4 flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF5E1E] animate-ping" />
          <span className="font-mono text-[0.65rem] text-white/90 tracking-widest uppercase font-semibold">
            ✦ SCROLL DOWN OR CLICK TO DETONATE WARP ✦
          </span>
        </div>
      </div>
    </div>
  );
}
