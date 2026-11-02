"use client";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface RiscvPipeline3DProps {
  activeStageId: string;
  clockCycle: number;
}

export default function RiscvPipeline3D({
  activeStageId,
  clockCycle,
}: RiscvPipeline3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const stageMeshesRef = useRef<THREE.Group[]>([]);
  const packetRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 400;
    let height = container.clientHeight || 340;

    const scene = new THREE.Scene();
    
    // Position camera to view the raised pipeline stages with balanced framing
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 2.6, 16.5);
    camera.lookAt(0, 0.65, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Main 3D Pipeline Group - Elevated UP so it's centered and clearly visible
    const pipelineGroup = new THREE.Group();
    pipelineGroup.position.set(0, 0.85, 0);
    pipelineGroup.rotation.x = 0.28;
    pipelineGroup.rotation.y = -0.15;
    scene.add(pipelineGroup);

    // 5 RV32I Core Pipeline Stages (Forge Orange, Silicon Amber, Precision Blue)
    const stages = [
      { id: "IF", label: "FETCH", color: 0xff5e1e, x: -6.8 },
      { id: "ID", label: "DECODE", color: 0xf59e0b, x: -3.4 },
      { id: "EX", label: "EXECUTE", color: 0xff5e1e, x: 0.0 },
      { id: "MEM", label: "MEMORY", color: 0x38bdf8, x: 3.4 },
      { id: "WB", label: "WRITEBACK", color: 0xf59e0b, x: 6.8 },
    ];

    const stageBoxes: THREE.Group[] = [];
    const boxGeo = new THREE.BoxGeometry(2.35, 2.75, 2.35);

    stages.forEach((st) => {
      const group = new THREE.Group();
      group.position.x = st.x;

      // Base Stage Module Housing (Semi-metallic obsidian)
      const mat = new THREE.MeshStandardMaterial({
        color: 0x0a101f,
        roughness: 0.25,
        metalness: 0.85,
        emissive: st.color,
        emissiveIntensity: 0.25,
      });
      const mesh = new THREE.Mesh(boxGeo, mat);
      group.add(mesh);

      // Glowing Wireframe Edges
      const wire = new THREE.LineSegments(
        new THREE.EdgesGeometry(boxGeo),
        new THREE.LineBasicMaterial({ color: st.color, linewidth: 2 })
      );
      group.add(wire);

      // Top Stage Silicon Pad (Gold/Amber accent)
      const topPadGeo = new THREE.BoxGeometry(1.6, 0.05, 1.6);
      const topPadMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b });
      const topPad = new THREE.Mesh(topPadGeo, topPadMat);
      topPad.position.y = 1.4;
      group.add(topPad);

      pipelineGroup.add(group);
      stageBoxes.push(group);
    });

    stageMeshesRef.current = stageBoxes;

    // Glowing Optical Datapath Bus Conduit underneath
    const busGeo = new THREE.BoxGeometry(16.5, 0.18, 1.2);
    const busMat = new THREE.MeshBasicMaterial({
      color: 0xff5e1e,
      transparent: true,
      opacity: 0.45,
    });
    const bus = new THREE.Mesh(busGeo, busMat);
    bus.position.y = -1.55;
    pipelineGroup.add(bus);

    // Dynamic Traveling Instruction Quantum Packet
    const packetGeo = new THREE.SphereGeometry(0.38, 16, 16);
    const packetMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
    });
    const packet = new THREE.Mesh(packetGeo, packetMat);
    packet.position.y = 0.3;
    pipelineGroup.add(packet);
    packetRef.current = packet;

    // Forge Orange Key Light
    const pointLight = new THREE.PointLight(0xff5e1e, 5.5, 35);
    pointLight.position.set(0, 8, 9);
    scene.add(pointLight);

    // Precision Blue Backlight / Rim
    const rimPointLight = new THREE.PointLight(0x38bdf8, 4.5, 30);
    rimPointLight.position.set(-8, -3, -5);
    scene.add(rimPointLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    // Mouse Tracking Parallax
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
      height = container.clientHeight || 340;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", onResize);

    // Animation Loop
    let animId = 0;
    let packetX = -6.8;

    const render = (time: number) => {
      animId = requestAnimationFrame(render);
      const t = time * 0.001;

      // Smooth mouse parallax
      pipelineGroup.rotation.y += (-0.15 + mouseX * 0.5 - pipelineGroup.rotation.y) * 0.05;
      pipelineGroup.rotation.x += (0.28 + mouseY * 0.4 - pipelineGroup.rotation.x) * 0.05;

      // Gentle floating levitation centered comfortably UP in frame
      pipelineGroup.position.y = 0.85 + Math.sin(t * 1.5) * 0.18;

      // Pulse traveling instruction packet across bus
      packetX += 0.095;
      if (packetX > 6.8) packetX = -6.8;
      packet.position.x = packetX;
      packet.position.y = 0.3 + Math.sin(t * 8) * 0.18;

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
      boxGeo.dispose();
      busGeo.dispose();
      busMat.dispose();
      packetGeo.dispose();
      packetMat.dispose();
      renderer.dispose();
    };
  }, []);

  // Update active stage elevation on stage selection or clock cycle
  useEffect(() => {
    const stageIds = ["IF", "ID", "EX", "MEM", "WB"];
    const activeIdx = stageIds.indexOf(activeStageId);

    stageMeshesRef.current.forEach((group, index) => {
      const isCurrent = index === activeIdx;
      group.position.y = isCurrent ? 0.65 : 0;
      group.scale.setScalar(isCurrent ? 1.09 : 1.0);

      const mesh = group.children[0] as THREE.Mesh;
      const mat = mesh.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = isCurrent ? 0.75 : 0.18;
    });
  }, [activeStageId, clockCycle]);

  return (
    <div className="relative w-full h-[290px] sm:h-[350px] flex items-center justify-center select-none overflow-hidden rounded-2xl bg-[#030712]/90 border border-white/10 shadow-2xl mb-6">
      {/* 3D WebGL Canvas */}
      <div ref={mountRef} className="w-full h-full" />

      {/* Floating 3D Telemetry Overlay */}
      <div className="absolute top-3 left-3 bg-[#0B101D]/90 border border-white/15 px-3 py-1.5 rounded-lg backdrop-blur-md pointer-events-none shadow-md">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#FF5E1E] animate-ping" />
          <span className="font-mono text-[0.62rem] font-bold text-[#FF5E1E] uppercase tracking-wider">
            3D RV32I PIPELINE MATRIX
          </span>
        </div>
      </div>
    </div>
  );
}
