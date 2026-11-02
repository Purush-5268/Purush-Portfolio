"use client";
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { playClickSound, playHoverSound, playClockPulse } from "@/lib/soundEffects";

export default function SiliconCore3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isHoveredState, setIsHoveredState] = useState(false);
  const [activeTelemetry, setActiveTelemetry] = useState<string>("RV32I Core");

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 400;
    let height = container.clientHeight || 400;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 4, 18);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // Main 3D Chip Group
    const chipGroup = new THREE.Group();
    chipGroup.rotation.x = 0.55;
    chipGroup.rotation.y = -0.45;
    scene.add(chipGroup);

    // 1. Package Substrate (Dark Matte PCB Carrier)
    const pcbGeo = new THREE.BoxGeometry(9.6, 0.5, 9.6);
    const pcbMat = new THREE.MeshStandardMaterial({
      color: 0x0a0f1d,
      roughness: 0.55,
      metalness: 0.35,
    });
    const pcb = new THREE.Mesh(pcbGeo, pcbMat);
    chipGroup.add(pcb);

    // 2. Copper / Rose-Gold Heat Spreader Ring (Forge Industrial Look)
    const spreaderGeo = new THREE.BoxGeometry(7.2, 0.32, 7.2);
    const spreaderMat = new THREE.MeshStandardMaterial({
      color: 0xc27a4e,
      roughness: 0.3,
      metalness: 0.88,
    });
    const spreader = new THREE.Mesh(spreaderGeo, spreaderMat);
    spreader.position.y = 0.28;
    chipGroup.add(spreader);

    // 3. Silicon Mirror Die in Center (Reflective Obsidian & Amber Glow)
    const dieGeo = new THREE.BoxGeometry(4.8, 0.3, 4.8);
    const dieMat = new THREE.MeshStandardMaterial({
      color: 0x06080e,
      roughness: 0.08,
      metalness: 0.98,
      emissive: 0xff5e1e,
      emissiveIntensity: 0.25,
    });
    const die = new THREE.Mesh(dieGeo, dieMat);
    die.position.y = 0.48;
    chipGroup.add(die);

    // 4. Amber & Gold Circuit Grid on Die
    const circuitGeo = new THREE.PlaneGeometry(4.6, 4.6, 8, 8);
    const circuitMat = new THREE.MeshBasicMaterial({
      color: 0xff7700,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });
    const circuit = new THREE.Mesh(circuitGeo, circuitMat);
    circuit.rotation.x = -Math.PI / 2;
    circuit.position.y = 0.64;
    chipGroup.add(circuit);

    // 5. Gold Edge Pins (36 Peripherals)
    const pinGroup = new THREE.Group();
    const pinGeo = new THREE.BoxGeometry(0.35, 0.25, 0.7);
    const pinMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.95,
      roughness: 0.2,
    });

    const pinOffsets = [-4.0, -3.0, -2.0, -1.0, 0, 1.0, 2.0, 3.0, 4.0];
    pinOffsets.forEach((val) => {
      const pinN = new THREE.Mesh(pinGeo, pinMat);
      pinN.position.set(val, 0.1, 4.85);
      pinGroup.add(pinN);

      const pinS = new THREE.Mesh(pinGeo, pinMat);
      pinS.position.set(val, 0.1, -4.85);
      pinGroup.add(pinS);

      const pinE = new THREE.Mesh(pinGeo, pinMat);
      pinE.rotation.y = Math.PI / 2;
      pinE.position.set(4.85, 0.1, val);
      pinGroup.add(pinE);

      const pinW = new THREE.Mesh(pinGeo, pinMat);
      pinW.rotation.y = Math.PI / 2;
      pinW.position.set(-4.85, 0.1, val);
      pinGroup.add(pinW);
    });
    chipGroup.add(pinGroup);

    // 6. Holographic Amber Gyro Rings
    const ring1Geo = new THREE.TorusGeometry(7.6, 0.05, 16, 80);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0xff5e1e,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 2;
    chipGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(8.4, 0.04, 16, 80);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 3;
    chipGroup.add(ring2);

    // 7. Ambient Floating Energy Sparkles (70 particles)
    const pCount = 70;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 15;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 8 + 1;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0xff7700,
      size: 0.28,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    const sparkles = new THREE.Points(pGeo, pMat);
    chipGroup.add(sparkles);

    // Dynamic Lighting
    const warmLight = new THREE.PointLight(0xff5e1e, 5, 35);
    warmLight.position.set(3, 8, 6);
    scene.add(warmLight);

    const rimLight = new THREE.PointLight(0x38bdf8, 3.5, 35);
    rimLight.position.set(-6, 6, -4);
    scene.add(rimLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    // State for Automatic Movement & Mouse Hover/Drag Integration
    let isHovered = false;
    let isDragging = false;
    let autoRotY = -0.45;
    let dragRotX = 0;
    let dragRotY = 0;
    let hoverTiltX = 0;
    let hoverTiltY = 0;

    let prevMouseX = 0;
    let prevMouseY = 0;

    // Mouse Enter / Leave
    const onMouseEnter = () => {
      isHovered = true;
      setIsHoveredState(true);
      playHoverSound();
    };

    const onMouseLeave = () => {
      isHovered = false;
      isDragging = false;
      setIsHoveredState(false);
      hoverTiltX = 0;
      hoverTiltY = 0;
    };

    // Mouse Move for Hover Access
    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const normX = (e.clientX - rect.left) / width - 0.5;
      const normY = (e.clientY - rect.top) / height - 0.5;

      if (isDragging) {
        const deltaX = e.clientX - prevMouseX;
        const deltaY = e.clientY - prevMouseY;
        dragRotY += deltaX * 0.01;
        dragRotX += deltaY * 0.01;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
      } else if (isHovered) {
        // Direct cursor access tilt: the chip faces the cursor
        hoverTiltY = normX * 1.2;
        hoverTiltX = normY * 0.9;
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
      playClickSound();
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    // Touch support for mobile/tablet
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        isDragging = true;
        isHovered = true;
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches.length > 0) {
        const deltaX = e.touches[0].clientX - prevMouseX;
        const deltaY = e.touches[0].clientY - prevMouseY;
        dragRotY += deltaX * 0.012;
        dragRotX += deltaY * 0.012;
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;
      }
    };

    const onTouchEnd = () => {
      isDragging = false;
      setTimeout(() => {
        isHovered = false;
      }, 1000);
    };

    container.addEventListener("mouseenter", onMouseEnter);
    container.addEventListener("mouseleave", onMouseLeave);
    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchmove", onTouchMove, { passive: true });
    container.addEventListener("touchend", onTouchEnd);

    const onResize = () => {
      if (!container) return;
      width = container.clientWidth || 400;
      height = container.clientHeight || 400;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", onResize);

    // Animation Loop: Constant Automatic Motion + Fluid Mouse Response
    let animId = 0;
    let currentX = 0.55;
    let currentY = -0.45;
    let currentScale = 1.0;

    const render = (time: number) => {
      animId = requestAnimationFrame(render);
      const t = time * 0.001;

      // 1. AUTOMATIC CONTINUOUS 3D MOTION
      // Chip orbits continuously on Y axis (slows down slightly when hovered for precision view)
      const autoSpeed = isHovered ? 0.006 : 0.015;
      autoRotY += autoSpeed;

      // Automatic gentle sinusoidal pitch on X axis
      const autoPitch = Math.sin(t * 0.9) * 0.18;

      // 2. INTEGRATE MOUSE HOVER ACCESS & DRAG
      const targetRotX = 0.55 + autoPitch + hoverTiltX + dragRotX;
      const targetRotY = autoRotY + hoverTiltY + dragRotY;

      // Smooth lerp for buttery organic response
      currentX += (targetRotX - currentX) * 0.07;
      currentY += (targetRotY - currentY) * 0.07;

      chipGroup.rotation.x = currentX;
      chipGroup.rotation.y = currentY;

      // Floating levitation along Y
      chipGroup.position.y = Math.sin(t * 1.6) * 0.35;

      // Subtle scale expansion on hover
      const targetScale = isHovered ? 1.05 : 1.0;
      currentScale += (targetScale - currentScale) * 0.08;
      chipGroup.scale.setScalar(currentScale);

      // Rotating holographic rings
      ring1.rotation.z = t * (isHovered ? 1.2 : 0.6);
      ring2.rotation.x = t * (isHovered ? 0.9 : 0.45);

      // Emissive die pulse
      dieMat.emissiveIntensity = isHovered ? 0.45 + Math.sin(t * 6) * 0.15 : 0.22 + Math.sin(t * 2) * 0.08;

      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener("mouseenter", onMouseEnter);
      container.removeEventListener("mouseleave", onMouseLeave);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);

      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("resize", onResize);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      pcbGeo.dispose();
      pcbMat.dispose();
      spreaderGeo.dispose();
      spreaderMat.dispose();
      dieGeo.dispose();
      dieMat.dispose();
      circuitGeo.dispose();
      circuitMat.dispose();
      pinGeo.dispose();
      pinMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      pGeo.dispose();
      pMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[400px] sm:h-[480px] flex items-center justify-center select-none cursor-grab active:cursor-grabbing group">
      {/* 3D WebGL Canvas */}
      <div ref={mountRef} className="w-full h-full" />

      {/* Top Left Status Badge */}
      <div className="absolute top-3 left-3 bg-[#0B101D]/90 border border-[#FF5E1E]/40 px-3.5 py-2 rounded-xl backdrop-blur-md pointer-events-none shadow-xl transition-all duration-300 group-hover:border-[#FF5E1E]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5E1E] animate-ping" />
          <span className="font-heading font-extrabold text-xs text-white uppercase tracking-wider">
            3D SILICON DIE SIMULATION
          </span>
        </div>
        <p className="font-mono text-[0.62rem] text-[#94A3B8] mt-0.5">
          {isHoveredState ? "⚡ HOVER CONTROL ACTIVE • DRAG TO ROTATE 360°" : "● AUTO-ORBITING • MOVE CURSOR TO INTERACT"}
        </p>
      </div>

      {/* Bottom Floating Telemetry Pills */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2 pointer-events-none">
        <div className="bg-[#0B101D]/95 border border-white/10 px-3.5 py-1.5 rounded-xl font-heading text-xs text-white/95 backdrop-blur-md shadow-xl flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF5E1E]" />
          <span><strong className="text-[#FF5E1E]">RV32I Core:</strong> 32-Bit In-Order Architecture</span>
        </div>
        <div className="bg-[#0B101D]/95 border border-white/10 px-3.5 py-1.5 rounded-xl font-heading text-xs text-white/95 backdrop-blur-md shadow-xl flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
          <span><strong className="text-[#F59E0B]">Sign-Off:</strong> 100% Clean SkyWater 130nm PDK</span>
        </div>
      </div>
    </div>
  );
}
