"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroSiliconCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth;
    let height = container.clientHeight;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 28);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 1. Soft Radial Glow Particle Texture
    const canvasPoint = document.createElement("canvas");
    canvasPoint.width = 32;
    canvasPoint.height = 32;
    const ctx = canvasPoint.getContext("2d");
    if (ctx) {
      const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, "rgba(255, 255, 255, 1)");
      grad.addColorStop(0.3, "rgba(255, 94, 30, 0.85)");
      grad.addColorStop(0.7, "rgba(245, 158, 11, 0.4)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 32, 32);
    }
    const pointTexture = new THREE.CanvasTexture(canvasPoint);

    // 2. Expansive 3D Ambient Silicon Quantum Lattice (1,000 floating energy nodes)
    const particleCount = 1000;
    const posArray = new Float32Array(particleCount * 3);
    const colorArray = new Float32Array(particleCount * 3);
    const initialY = new Float32Array(particleCount);
    const speeds = new Float32Array(particleCount);

    const orangeColor = new THREE.Color(0xff5e1e);
    const goldColor = new THREE.Color(0xf59e0b);
    const sapphireColor = new THREE.Color(0x38bdf8);

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      posArray[idx] = (Math.random() - 0.5) * 55;
      const y = (Math.random() - 0.5) * 35;
      posArray[idx + 1] = y;
      initialY[i] = y;
      posArray[idx + 2] = (Math.random() - 0.5) * 25;
      speeds[i] = 0.2 + Math.random() * 0.4;

      const factor = Math.random();
      const pColor = factor < 0.5
        ? orangeColor.clone().lerp(goldColor, factor * 2)
        : goldColor.clone().lerp(sapphireColor, (factor - 0.5) * 2);

      colorArray[idx] = pColor.r;
      colorArray[idx + 1] = pColor.g;
      colorArray[idx + 2] = pColor.b;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(posArray, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(colorArray, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.35,
      map: pointTexture,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particlesMesh = new THREE.Points(particleGeo, particleMat);
    scene.add(particlesMesh);

    // 3. Perspective Silicon Optical Floor Waveguides
    const gridGroup = new THREE.Group();
    gridGroup.position.set(0, -11, -4);
    gridGroup.rotation.x = Math.PI / 2.3;
    scene.add(gridGroup);

    const lineMatOrange = new THREE.LineBasicMaterial({
      color: 0xff5e1e,
      transparent: true,
      opacity: 0.16,
    });
    const lineMatAmber = new THREE.LineBasicMaterial({
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.12,
    });

    // Longitudinal grid lines
    const gridSpan = 60;
    const gridDepth = 40;
    for (let x = -gridSpan / 2; x <= gridSpan / 2; x += 3.5) {
      const points = [
        new THREE.Vector3(x, 0, -gridDepth / 2),
        new THREE.Vector3(x * 1.35, 0, gridDepth / 2),
      ];
      const geo = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(geo, Math.abs(x) % 7 === 0 ? lineMatOrange : lineMatAmber);
      gridGroup.add(line);
    }

    // Transverse wave pulses
    for (let z = -gridDepth / 2; z <= gridDepth / 2; z += 5) {
      const points = [
        new THREE.Vector3(-gridSpan / 2, 0, z),
        new THREE.Vector3(gridSpan / 2, 0, z),
      ];
      const geo = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(geo, lineMatOrange);
      gridGroup.add(line);
    }

    // 4. Mouse Interactive Parallax
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / width - 0.5;
      const y = (e.clientY - rect.top) / height - 0.5;
      targetX = x * 2.5;
      targetY = -y * 2.0;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // 5. Scroll Interaction
    let scrollY = 0;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // 6. Resize handling
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    // 7. Smooth Animation Loop
    let animId = 0;
    const startTime = performance.now();
    const posAttr = particleGeo.getAttribute("position") as THREE.BufferAttribute;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = (performance.now() - startTime) * 0.001;

      // Smooth camera parallax
      currentX += (targetX - currentX) * 0.04;
      currentY += (targetY - currentY) * 0.04;
      camera.position.x = currentX;
      camera.position.y = currentY - (scrollY * 0.006);

      // Subtle particle undulation
      const positions = posAttr.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const idx = i * 3;
        positions[idx + 1] = initialY[i] + Math.sin(elapsed * speeds[i] + positions[idx] * 0.1) * 0.8;
      }
      posAttr.needsUpdate = true;

      // Gentle grid pulse
      gridGroup.position.z = -4 + Math.sin(elapsed * 0.4) * 0.5;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      particleGeo.dispose();
      particleMat.dispose();
      pointTexture.dispose();
      lineMatOrange.dispose();
      lineMatAmber.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 z-0 pointer-events-none w-full h-full overflow-hidden opacity-85"
      style={{
        background: "transparent",
      }}
    />
  );
}
