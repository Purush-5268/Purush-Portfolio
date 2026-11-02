"use client";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface NeuralBrain3DProps {
  selectedBand: "alpha" | "beta" | "gamma" | "raw";
  filterEnabled: boolean;
}

export default function NeuralBrain3D({
  selectedBand,
  filterEnabled,
}: NeuralBrain3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 400;
    let height = container.clientHeight || 300;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 16);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const brainGroup = new THREE.Group();
    scene.add(brainGroup);

    // 1. Dual Hemispheric Neural Cortex Points (400 nodes)
    const nodeCount = 350;
    const posArray = new Float32Array(nodeCount * 3);
    const colorArray = new Float32Array(nodeCount * 3);

    const colorCyan = new THREE.Color(0x00e5ff);
    const colorPurple = new THREE.Color(0xa855f7);
    const colorEmerald = new THREE.Color(0x14b8a6);

    for (let i = 0; i < nodeCount; i++) {
      const idx = i * 3;
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 4.2 + (Math.random() - 0.5) * 0.8;

      // Hemispheric split
      const xOffset = i % 2 === 0 ? 0.6 : -0.6;
      posArray[idx] = r * Math.sin(phi) * Math.cos(theta) + xOffset;
      posArray[idx + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.85;
      posArray[idx + 2] = r * Math.cos(phi) * 1.15;

      const c = i % 3 === 0 ? colorCyan : i % 3 === 1 ? colorPurple : colorEmerald;
      colorArray[idx] = c.r;
      colorArray[idx + 1] = c.g;
      colorArray[idx + 2] = c.b;
    }

    const nodeGeo = new THREE.BufferGeometry();
    nodeGeo.setAttribute("position", new THREE.BufferAttribute(posArray, 3));
    nodeGeo.setAttribute("color", new THREE.BufferAttribute(colorArray, 3));

    const nodeMat = new THREE.PointsMaterial({
      size: 0.28,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const nodes = new THREE.Points(nodeGeo, nodeMat);
    brainGroup.add(nodes);

    // 2. Synaptic Neural Interconnect Lines
    const lineIndices: number[] = [];
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dx = posArray[i * 3] - posArray[j * 3];
        const dy = posArray[i * 3 + 1] - posArray[j * 3 + 1];
        const dz = posArray[i * 3 + 2] - posArray[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < 1.4) {
          lineIndices.push(i, j);
        }
      }
    }
    nodeGeo.setIndex(lineIndices);

    const lineMat = new THREE.LineBasicMaterial({
      color: 0x00e5ff,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending,
    });
    const lines = new THREE.LineSegments(nodeGeo, lineMat);
    brainGroup.add(lines);

    // 3. 10-20 EEG Electrode Ring Nodes (Floating cortex beacons)
    const electrodeGeo = new THREE.SphereGeometry(0.18, 16, 16);
    const electrodeMat = new THREE.MeshBasicMaterial({
      color: 0x00e5ff,
    });
    const electrodeGroup = new THREE.Group();

    const electrodeCoords = [
      [0, 3.8, 1.5], [2.2, 3.2, 1.2], [-2.2, 3.2, 1.2],
      [3.4, 1.2, 0.5], [-3.4, 1.2, 0.5], [0, 2.8, -2.5],
      [2.8, 1.8, -2.0], [-2.8, 1.8, -2.0]
    ];
    electrodeCoords.forEach(([x, y, z]) => {
      const el = new THREE.Mesh(electrodeGeo, electrodeMat);
      el.position.set(x, y, z);
      electrodeGroup.add(el);
    });
    brainGroup.add(electrodeGroup);

    // Lighting
    const pointLight = new THREE.PointLight(0x00e5ff, 4, 30);
    pointLight.position.set(0, 5, 8);
    scene.add(pointLight);

    // Mouse Tracking
    let mouseX = 0;
    let mouseY = 0;
    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = (e.clientX - rect.left) / width - 0.5;
      mouseY = (e.clientY - rect.top) / height - 0.5;
    };
    window.addEventListener("mousemove", onMouseMove);

    const onResize = () => {
      if (!container) return;
      width = container.clientWidth || 400;
      height = container.clientHeight || 300;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", onResize);

    // Animation Loop
    let animId = 0;
    const render = (time: number) => {
      animId = requestAnimationFrame(render);
      const t = time * 0.001;

      // Slow 3D spatial rotation + mouse tilt
      brainGroup.rotation.y = t * 0.35 + mouseX * 0.8;
      brainGroup.rotation.x = Math.sin(t * 0.3) * 0.15 + mouseY * 0.5;

      // Pulse electrodes
      const pulse = 1 + Math.sin(t * 6) * 0.15;
      electrodeGroup.scale.setScalar(pulse);

      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      nodeGeo.dispose();
      nodeMat.dispose();
      lineMat.dispose();
      electrodeGeo.dispose();
      electrodeMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[280px] sm:h-[340px] flex items-center justify-center select-none overflow-hidden rounded-2xl bg-[#030712]/90 border border-white/10 shadow-2xl mb-6">
      {/* 3D WebGL Canvas */}
      <div ref={mountRef} className="w-full h-full" />

      {/* Floating 3D Telemetry Overlay */}
      <div className="absolute top-3 left-3 bg-[#060a14]/90 border border-white/10 px-3 py-1.5 rounded-lg backdrop-blur-md pointer-events-none">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00e5ff] animate-ping" />
          <span className="font-mono text-[0.62rem] font-bold text-[#00e5ff] uppercase">
            3D HOLOGRAPHIC CORTEX // {selectedBand.toUpperCase()} BAND
          </span>
        </div>
      </div>
    </div>
  );
}

