"use client";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface AsicWafer3DProps {
  activeStageId: string;
  stageColor: string;
}

export default function AsicWafer3D({
  activeStageId,
  stageColor,
}: AsicWafer3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<THREE.Mesh[]>([]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 400;
    let height = container.clientHeight || 440;

    const scene = new THREE.Scene();
    
    // Balanced Perspective Camera positioned to view the full floating stack comfortably
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 3.8, 17.5);
    camera.lookAt(0, 0.8, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Main Wafer Group - Shifted UP to center perfectly in the viewport
    const waferGroup = new THREE.Group();
    waferGroup.position.set(0, 1.1, 0);
    waferGroup.rotation.x = 0.52;
    waferGroup.rotation.y = -0.48;
    scene.add(waferGroup);

    // 6 Stacked ASIC Silicon & Metal Layers (Centered at origin Y = 0)
    const layerDefs = [
      { name: "Substrate", color: 0x091224, wireColor: 0x64748b, height: 0.35 },
      { name: "Diffusion & Transistors", color: 0x0c1b36, wireColor: 0x38bdf8, height: 0.25 },
      { name: "Metal 1 Logic Routing", color: 0x10284c, wireColor: 0x60a5fa, height: 0.25 },
      { name: "Metal 2 Clock Tree", color: 0x143460, wireColor: 0xf59e0b, height: 0.25 },
      { name: "Metal 3 Power Grid (PDN)", color: 0x184278, wireColor: 0xff5e1e, height: 0.25 },
      { name: "Passivation & Bond Pads", color: 0x1f3458, wireColor: 0xfbbf24, height: 0.22 },
    ];

    const meshes: THREE.Mesh[] = [];
    const layerGeo = new THREE.BoxGeometry(8.2, 0.25, 8.2);

    layerDefs.forEach((def, i) => {
      const mat = new THREE.MeshStandardMaterial({
        color: def.color,
        roughness: 0.25,
        metalness: 0.85,
        transparent: true,
        opacity: 0.92,
      });
      const mesh = new THREE.Mesh(layerGeo, mat);

      // Symmetrically center layers around origin (i = 0..5 centered at 2.5)
      mesh.position.y = (i - 2.5) * 0.75;

      // Precision wireframe edge circuit highlights
      const wire = new THREE.LineSegments(
        new THREE.EdgesGeometry(layerGeo),
        new THREE.LineBasicMaterial({ color: def.wireColor, linewidth: 1.5 })
      );
      mesh.add(wire);

      waferGroup.add(mesh);
      meshes.push(mesh);
    });

    layersRef.current = meshes;

    // Glowing Conduit Pillars connecting the layers (Vertical Vias)
    const viaGroup = new THREE.Group();
    const viaGeo = new THREE.CylinderGeometry(0.08, 0.08, 4.8);
    const viaMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.75,
    });

    const viaPositions = [
      [-3.2, -3.2], [3.2, -3.2], [-3.2, 3.2], [3.2, 3.2],
      [-1.6, 0], [1.6, 0], [0, -1.6], [0, 1.6]
    ];
    viaPositions.forEach(([x, z]) => {
      const via = new THREE.Mesh(viaGeo, viaMat);
      via.position.set(x, 0, z);
      viaGroup.add(via);
    });
    waferGroup.add(viaGroup);

    // Dynamic Industrial Forge Lighting
    const orangePointLight = new THREE.PointLight(0xff5e1e, 4.5, 35);
    orangePointLight.position.set(5, 8, 7);
    scene.add(orangePointLight);

    const bluePointLight = new THREE.PointLight(0x38bdf8, 3.5, 30);
    bluePointLight.position.set(-6, -4, 5);
    scene.add(bluePointLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
    scene.add(ambientLight);

    // Mouse Parallax & Orbit
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
      height = container.clientHeight || 440;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", onResize);

    // Smooth Animation Loop
    let animId = 0;
    const render = (time: number) => {
      animId = requestAnimationFrame(render);
      const t = time * 0.001;

      // Smooth 3D tilt tracking with gentle mouse interaction
      waferGroup.rotation.y += (-0.48 + mouseX * 0.6 - waferGroup.rotation.y) * 0.05;
      waferGroup.rotation.x += (0.52 + mouseY * 0.5 - waferGroup.rotation.x) * 0.05;

      // Gentle floating levitation centered comfortably UP in frame
      waferGroup.position.y = 1.1 + Math.sin(t * 1.6) * 0.22;

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
      layerGeo.dispose();
      viaGeo.dispose();
      viaMat.dispose();
      renderer.dispose();
    };
  }, []);

  // Update layer separation dynamically on stage change
  useEffect(() => {
    if (!layersRef.current.length) return;

    // Expand layers based on active stage
    const spreadMultiplier =
      activeStageId === "floorplan" || activeStageId === "cts-route" ? 1.45 : 1.05;

    layersRef.current.forEach((mesh, index) => {
      // Symmetrically expand centered at 0
      const targetY = (index - 2.5) * (0.75 * spreadMultiplier);
      mesh.position.y = targetY;

      // Highlight active stage layer with emissive glow
      const mat = mesh.material as THREE.MeshStandardMaterial;
      if (
        (activeStageId === "rtl" && index === 1) ||
        (activeStageId === "synthesis" && index === 2) ||
        (activeStageId === "cts-route" && index === 3) ||
        (activeStageId === "floorplan" && index === 4) ||
        (activeStageId === "signoff" && index === 5)
      ) {
        mat.emissive = new THREE.Color(stageColor);
        mat.emissiveIntensity = 0.6;
      } else {
        mat.emissive = new THREE.Color(0x000000);
        mat.emissiveIntensity = 0;
      }
    });
  }, [activeStageId, stageColor]);

  return (
    <div className="relative w-full h-[420px] sm:h-[480px] flex items-center justify-center select-none overflow-hidden rounded-2xl bg-[#040814]/85 border border-white/10 shadow-2xl">
      {/* 3D WebGL Canvas */}
      <div ref={mountRef} className="w-full h-full" />

      {/* Layer Telemetry Indicator */}
      <div className="absolute bottom-3 left-3 bg-[#060a14]/90 border border-white/10 px-3.5 py-1.5 rounded-lg backdrop-blur-md pointer-events-none shadow-lg">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: stageColor }} />
          <span className="font-mono text-[0.62rem] font-bold text-white uppercase tracking-wider">
            3D MULTI-LAYER ASIC STACK
          </span>
        </div>
        <p className="font-mono text-[0.55rem] text-[#94a3b8] mt-0.5">
          METAL 1-3 // SUBSTRATE // VIAS // PASSIVATION
        </p>
      </div>
    </div>
  );
}
