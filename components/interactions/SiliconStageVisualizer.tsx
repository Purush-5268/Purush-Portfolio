"use client";
import React, { useEffect, useState } from "react";

interface SiliconStageVisualizerProps {
  stageId: string;
  stageColor: string;
}

export default function SiliconStageVisualizer({
  stageId,
  stageColor,
}: SiliconStageVisualizerProps) {
  const [pulseTick, setPulseTick] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPulseTick((prev) => (prev + 1) % 1000);
    }, 800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[380px] sm:h-[440px] overflow-hidden bg-[#040711] flex flex-col justify-between p-4 sm:p-5 select-none">
      {/* Background Micro-Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00e5ff08_1px,transparent_1px),linear-gradient(to_bottom,#00e5ff08_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] pointer-events-none" />

      {/* Top Telemetry Header */}
      <div className="relative z-10 flex items-center justify-between text-[0.68rem] font-mono font-bold bg-[#070d1a]/90 px-3.5 py-1.5 rounded-lg border border-white/10 backdrop-blur-md shadow-lg">
        <span className="flex items-center gap-2" style={{ color: stageColor }}>
          <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: stageColor }} />
          <span>STAGE: {stageId.toUpperCase()} ARCHITECTURE VIEW</span>
        </span>
        <span className="text-[#94a3b8] flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#14b8a6]" />
          <span>SIMULATION: ACTIVE</span>
        </span>
      </div>

      {/* MAIN DYNAMIC STAGE VISUALIZATION */}
      <div className="relative z-10 flex-1 my-3 flex items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-black/60 p-3 shadow-inner">
        
        {/* STAGE 1: RTL ARCHITECTURE & LOGIC DESIGN */}
        {stageId === "rtl" && (
          <div className="w-full h-full flex flex-col justify-between py-1">
            {/* Top Block Schematic */}
            <div className="grid grid-cols-3 gap-3 h-[60%]">
              {/* FSM Controller Block */}
              <div className="p-3 rounded-xl bg-[#0b1224] border border-[#a855f7]/50 flex flex-col justify-between shadow-[0_0_20px_rgba(168,85,247,0.15)]">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[0.62rem] font-bold text-[#a855f7]">FSM CONTROLLER</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#a855f7] animate-pulse" />
                </div>
                <div className="space-y-1 font-mono text-[0.58rem]">
                  <div className={`px-2 py-0.5 rounded transition-all ${pulseTick % 4 === 0 ? "bg-[#a855f7] text-white font-bold" : "text-[#64748b]"}`}>
                    ● STATE_IDLE
                  </div>
                  <div className={`px-2 py-0.5 rounded transition-all ${pulseTick % 4 === 1 ? "bg-[#a855f7] text-white font-bold" : "text-[#64748b]"}`}>
                    ● STATE_FETCH
                  </div>
                  <div className={`px-2 py-0.5 rounded transition-all ${pulseTick % 4 === 2 ? "bg-[#a855f7] text-white font-bold" : "text-[#64748b]"}`}>
                    ● STATE_DECODE
                  </div>
                  <div className={`px-2 py-0.5 rounded transition-all ${pulseTick % 4 === 3 ? "bg-[#a855f7] text-white font-bold" : "text-[#64748b]"}`}>
                    ● STATE_EXEC
                  </div>
                </div>
              </div>

              {/* Central Datapath & ALU Registers */}
              <div className="p-3 rounded-xl bg-[#0b1224] border border-[#00e5ff]/50 flex flex-col justify-between shadow-[0_0_20px_rgba(0,229,255,0.15)] relative overflow-hidden">
                {/* Traveling Signal Pulse */}
                <div className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-[#00e5ff] to-transparent animate-[pulse_1.5s_infinite]" />
                
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[0.62rem] font-bold text-[#00e5ff]">32-BIT DATAPATH</span>
                  <span className="font-mono text-[0.55rem] text-[#14b8a6]">CDC SYNC</span>
                </div>

                <div className="space-y-1.5 font-mono text-[0.6rem] text-white">
                  <div className="flex justify-between bg-black/50 px-2 py-1 rounded border border-white/5">
                    <span className="text-[#94a3b8]">PC:</span>
                    <span className="text-[#00e5ff]">0x004000{(pulseTick * 4).toString(16).padStart(2, "0")}</span>
                  </div>
                  <div className="flex justify-between bg-black/50 px-2 py-1 rounded border border-white/5">
                    <span className="text-[#94a3b8]">OP:</span>
                    <span className="text-[#a855f7]">0x00A00293</span>
                  </div>
                  <div className="flex justify-between bg-black/50 px-2 py-1 rounded border border-white/5">
                    <span className="text-[#94a3b8]">ALU:</span>
                    <span className="text-[#14b8a6]">ADD (x5, x0, 42)</span>
                  </div>
                </div>
              </div>

              {/* 32-Entry Register File */}
              <div className="p-3 rounded-xl bg-[#0b1224] border border-[#3b82f6]/50 flex flex-col justify-between shadow-[0_0_20px_rgba(59,130,246,0.15)]">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[0.62rem] font-bold text-[#3b82f6]">REGISTER ARRAY</span>
                  <span className="font-mono text-[0.55rem] text-[#3b82f6]">32 x 32-bit</span>
                </div>
                <div className="grid grid-cols-2 gap-1 font-mono text-[0.55rem]">
                  <div className="bg-black/60 px-1.5 py-0.5 rounded text-[#94a3b8]">x0: 0x00000000</div>
                  <div className="bg-black/60 px-1.5 py-0.5 rounded text-[#00e5ff]">x1: 0x00400004</div>
                  <div className="bg-black/60 px-1.5 py-0.5 rounded text-[#a855f7]">x5: 0x0000002A</div>
                  <div className="bg-black/60 px-1.5 py-0.5 rounded text-[#14b8a6]">x8: 0x000000D0</div>
                </div>
              </div>
            </div>

            {/* Bottom RTL Verilog Code Preview */}
            <div className="h-[36%] p-2.5 rounded-lg bg-black/80 border border-white/10 font-mono text-[0.6rem] text-[#cbd5e1] overflow-hidden flex flex-col justify-center">
              <div className="text-[#a855f7] font-semibold mb-0.5">// Synthesizable RTL Module Definition</div>
              <div className="text-[#00e5ff]">always_ff @(posedge clk or negedge rst_n) begin</div>
              <div className="pl-3 text-[#e2e8f0]">if (!rst_n) pc_reg &lt;= 32&apos;h0040_0000; else pc_reg &lt;= next_pc;</div>
              <div className="text-[#00e5ff]">end</div>
            </div>
          </div>
        )}

        {/* STAGE 2: FUNCTIONAL VERIFICATION & UVM */}
        {stageId === "verification" && (
          <div className="w-full h-full flex flex-col justify-between py-1">
            {/* UVM Hierarchy Pipeline */}
            <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-[#090e1f] border border-[#3b82f6]/40">
              {["SEQUENCER", "DRIVER", "DUT CORE", "MONITOR", "SCOREBOARD"].map((node, i) => (
                <React.Fragment key={node}>
                  <div className="px-2 py-1.5 rounded-lg bg-black/70 border border-white/15 text-center flex-1">
                    <span className="font-mono text-[0.55rem] font-bold text-white block">{node}</span>
                    <span className="font-mono text-[0.5rem] text-[#3b82f6]">{i === 2 ? "SKY130" : "UVM_OBJ"}</span>
                  </div>
                  {i < 4 && (
                    <span className="text-[#00e5ff] font-bold text-xs animate-pulse">➔</span>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Live Randomized Test Vectors & Assertions */}
            <div className="grid grid-cols-2 gap-3 my-2">
              <div className="p-3 rounded-xl bg-black/70 border border-white/10 font-mono text-[0.6rem]">
                <div className="text-[#3b82f6] font-bold mb-1.5 flex items-center justify-between">
                  <span>ASSERTION CHECKS</span>
                  <span className="text-[#14b8a6]">ZERO FAILURES</span>
                </div>
                <div className="space-y-1 text-[0.58rem]">
                  <div className="flex justify-between text-[#14b8a6]">
                    <span>ASSERT_PC_ALIGNED:</span>
                    <span>PASS [✓]</span>
                  </div>
                  <div className="flex justify-between text-[#14b8a6]">
                    <span>ASSERT_REG_WRITE_STROBE:</span>
                    <span>PASS [✓]</span>
                  </div>
                  <div className="flex justify-between text-[#14b8a6]">
                    <span>ASSERT_CDC_NO_METASTABLE:</span>
                    <span>PASS [✓]</span>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-black/70 border border-white/10 font-mono text-[0.6rem]">
                <div className="text-[#00e5ff] font-bold mb-1.5 flex items-center justify-between">
                  <span>COVERAGE CLOSURE</span>
                  <span className="text-[#00e5ff]">100.0%</span>
                </div>
                <div className="space-y-1.5 text-[0.58rem]">
                  <div>
                    <div className="flex justify-between text-[#94a3b8] mb-0.5">
                      <span>Instruction Bins:</span>
                      <span className="text-white font-bold">47 / 47 Covered</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#3b82f6] to-[#00e5ff] w-full" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[#94a3b8] mb-0.5">
                      <span>FSM Branch Coverage:</span>
                      <span className="text-white font-bold">100% Closed</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#14b8a6] to-[#00e5ff] w-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-2 rounded-lg bg-[#14b8a6]/10 border border-[#14b8a6]/30 flex items-center justify-between text-xs font-mono text-[#14b8a6]">
              <span>✓ 10,000+ Random Test Vectors Verified</span>
              <span className="font-bold">SIGN-OFF READY</span>
            </div>
          </div>
        )}

        {/* STAGE 3: LOGIC SYNTHESIS & GATE MAPPING */}
        {stageId === "synthesis" && (
          <div className="w-full h-full flex flex-col justify-between py-1">
            {/* Logic Gate Network Schematic */}
            <div className="relative w-full h-[62%] rounded-xl bg-black/80 border border-[#06b6d4]/40 p-3 overflow-hidden flex flex-col justify-between">
              <div className="flex items-center justify-between font-mono text-[0.62rem] text-[#06b6d4]">
                <span>SKYWATER 130nm STANDARD CELL TOPOLOGY</span>
                <span>YOSYS / DESIGN COMPILER</span>
              </div>

              {/* Gate Array */}
              <div className="grid grid-cols-4 gap-2 my-2">
                {[
                  { name: "NAND2_X1", delay: "0.04ns", val: "1 ➔ 0" },
                  { name: "NOR2_X1", delay: "0.05ns", val: "0 ➔ 1" },
                  { name: "MUX2_X1", delay: "0.08ns", val: "SEL_A" },
                  { name: "DFF_X1", delay: "0.12ns", val: "Q_REG" },
                ].map((gate) => (
                  <div key={gate.name} className="p-2 rounded-lg bg-[#071324] border border-[#06b6d4]/30 text-center">
                    <span className="font-mono text-[0.6rem] text-white font-bold block">{gate.name}</span>
                    <span className="font-mono text-[0.52rem] text-[#06b6d4] block mt-0.5">{gate.delay}</span>
                    <span className="font-mono text-[0.55rem] text-[#14b8a6] font-semibold mt-1 block">{gate.val}</span>
                  </div>
                ))}
              </div>

              {/* Animated Logic Bus */}
              <div className="flex items-center justify-between text-[0.58rem] font-mono text-[#cbd5e1] pt-1.5 border-t border-white/10">
                <span>GATE COUNT: 1,420 CELLS</span>
                <span className="text-[#00e5ff] font-bold">TOTAL AREA: 1321.32 µm²</span>
              </div>
            </div>

            {/* Timing & Slack Telemetry */}
            <div className="grid grid-cols-3 gap-2 mt-2">
              <div className="p-2 rounded-lg bg-black/60 border border-white/10 text-center font-mono">
                <span className="text-[0.55rem] text-[#94a3b8] block">Setup Slack</span>
                <span className="text-xs font-bold text-[#14b8a6]">+0.42 ns (MET)</span>
              </div>
              <div className="p-2 rounded-lg bg-black/60 border border-white/10 text-center font-mono">
                <span className="text-[0.55rem] text-[#94a3b8] block">Hold Slack</span>
                <span className="text-xs font-bold text-[#14b8a6]">+0.18 ns (MET)</span>
              </div>
              <div className="p-2 rounded-lg bg-black/60 border border-white/10 text-center font-mono">
                <span className="text-[0.55rem] text-[#94a3b8] block">Dynamic Power</span>
                <span className="text-xs font-bold text-[#00e5ff]">1.84 mW</span>
              </div>
            </div>
          </div>
        )}

        {/* STAGE 4: FLOORPLANNING & POWER GRID (PDN) */}
        {stageId === "floorplan" && (
          <div className="w-full h-full flex flex-col justify-between py-1">
            {/* Silicon Die Floorplan Visualization */}
            <div className="relative w-full h-[70%] rounded-xl bg-[#030610] border-2 border-[#14b8a6] p-3 flex flex-col justify-between overflow-hidden shadow-[0_0_25px_rgba(20,184,166,0.2)]">
              {/* Outer I/O Pad Ring */}
              <div className="absolute inset-1 border border-dashed border-[#14b8a6]/40 pointer-events-none" />
              
              {/* Power Grid Metal Straps (M4 Horizontal & M5 Vertical) */}
              <div className="absolute inset-3 grid grid-cols-6 grid-rows-4 pointer-events-none opacity-40">
                {Array.from({ length: 24 }).map((_, i) => (
                  <div key={i} className="border border-[#14b8a6]/30" />
                ))}
              </div>

              {/* Top HUD */}
              <div className="flex items-center justify-between font-mono text-[0.62rem] text-[#14b8a6] z-10">
                <span>DIE BOUNDARY: 100 µm × 100 µm</span>
                <span className="text-white">PDN: M4/M5 MESH</span>
              </div>

              {/* Core Macro Clusters */}
              <div className="grid grid-cols-2 gap-3 z-10 my-auto">
                <div className="p-3 rounded-lg bg-[#071724]/90 border border-[#14b8a6]/50 text-center">
                  <span className="font-mono text-[0.62rem] font-bold text-white block">CORE LOGIC MACRO</span>
                  <span className="font-mono text-[0.55rem] text-[#14b8a6]">UTIL: 55.2% (TARGET MET)</span>
                </div>
                <div className="p-3 rounded-lg bg-[#071724]/90 border border-[#00e5ff]/50 text-center">
                  <span className="font-mono text-[0.62rem] font-bold text-white block">SRAM DATA CACHE</span>
                  <span className="font-mono text-[0.55rem] text-[#00e5ff]">MACRO PLACED & HALOED</span>
                </div>
              </div>

              {/* Bottom Telemetry */}
              <div className="flex items-center justify-between font-mono text-[0.58rem] text-[#cbd5e1] z-10 pt-1 border-t border-[#14b8a6]/30">
                <span>MAX IR-DROP: 12.4 mV (&lt; 2%)</span>
                <span className="text-[#14b8a6] font-bold">POWER NETWORK ROBUST</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-[#94a3b8] px-1">
              <span>Standard Cell Placement Rows: 84</span>
              <span className="text-[#14b8a6] font-bold">Congestion Free</span>
            </div>
          </div>
        )}

        {/* STAGE 5: CLOCK TREE SYNTHESIS & ROUTING */}
        {stageId === "cts-route" && (
          <div className="w-full h-full flex flex-col justify-between py-1">
            {/* H-Tree Balanced Clock Network Schematic */}
            <div className="relative w-full h-[72%] rounded-xl bg-black/90 border border-[#00e5ff]/50 p-3 flex flex-col justify-between overflow-hidden shadow-[0_0_30px_rgba(0,229,255,0.2)]">
              {/* Animated H-Tree Canvas Simulation */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-80">
                <svg className="w-full h-full p-4" viewBox="0 0 400 200">
                  {/* Root Clock Buffer */}
                  <circle cx="200" cy="100" r="6" fill="#00e5ff" className="animate-ping" />
                  <circle cx="200" cy="100" r="4" fill="#ffffff" />
                  
                  {/* Central H Trunk */}
                  <line x1="200" y1="50" x2="200" y2="150" stroke="#00e5ff" strokeWidth="2.5" />
                  
                  {/* Horizontal Branching */}
                  <line x1="100" y1="50" x2="300" y2="50" stroke="#00e5ff" strokeWidth="2" />
                  <line x1="100" y1="150" x2="300" y2="150" stroke="#00e5ff" strokeWidth="2" />
                  
                  {/* Vertical Leaf Taps */}
                  <line x1="100" y1="25" x2="100" y2="75" stroke="#a855f7" strokeWidth="1.5" />
                  <line x1="300" y1="25" x2="300" y2="75" stroke="#a855f7" strokeWidth="1.5" />
                  <line x1="100" y1="125" x2="100" y2="175" stroke="#a855f7" strokeWidth="1.5" />
                  <line x1="300" y1="125" x2="300" y2="175" stroke="#a855f7" strokeWidth="1.5" />

                  {/* Leaf Registers */}
                  {[
                    [100, 25], [100, 75], [300, 25], [300, 75],
                    [100, 125], [100, 175], [300, 125], [300, 175],
                  ].map(([cx, cy], idx) => (
                    <circle key={idx} cx={cx} cy={cy} r="3" fill="#14b8a6" />
                  ))}
                </svg>
              </div>

              <div className="flex items-center justify-between font-mono text-[0.62rem] text-[#00e5ff] z-10">
                <span>H-TREE CLOCK NETWORK SYNTHESIS</span>
                <span>TRITONROUTE ENGINE</span>
              </div>

              <div className="flex items-center justify-between font-mono text-[0.58rem] text-[#e2e8f0] z-10 pt-1 border-t border-white/10">
                <span>GLOBAL SKEW: 12 ps (OPTIMAL)</span>
                <span className="text-[#14b8a6] font-bold">ZERO ANTENNA VIOLATIONS</span>
                <span>LATENCY: 1.15 ns</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center font-mono text-[0.6rem]">
              <div className="p-1.5 rounded bg-black/60 border border-white/10 text-[#00e5ff]">Metal Layers: M1-M5</div>
              <div className="p-1.5 rounded bg-black/60 border border-white/10 text-[#14b8a6]">DRC Clean Route</div>
              <div className="p-1.5 rounded bg-black/60 border border-white/10 text-[#a855f7]">Clock Slack: +0.48ns</div>
            </div>
          </div>
        )}

        {/* STAGE 6: PHYSICAL SIGN-OFF & GDSII STREAM */}
        {stageId === "signoff" && (
          <div className="w-full h-full flex flex-col justify-between py-1">
            {/* Real Silicon Die Micrograph with Active Laser Scanner */}
            <div className="relative w-full h-[72%] rounded-xl overflow-hidden bg-black/90 border-2 border-[#ec4899] shadow-[0_0_35px_rgba(236,72,153,0.3)] flex items-center justify-center">
              <img
                src="/images/chip_bg.jpg"
                alt="Sky130 GDSII Physical Tapeout"
                className="w-full h-full object-cover scale-110 opacity-80"
              />
              
              {/* Active Sweeping Laser Verification Beam */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#ec4899]/30 to-transparent animate-[pulse_2s_infinite] pointer-events-none" />

              {/* Center Sign-Off Stamp */}
              <div className="absolute p-3 rounded-xl bg-black/85 border border-white/20 backdrop-blur-xl flex flex-col items-center shadow-2xl">
                <span className="font-display font-black text-sm text-white tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#14b8a6]" />
                  FOUNDRY TAPEOUT SIGN-OFF
                </span>
                <span className="font-mono text-[0.65rem] text-[#ec4899] font-bold mt-0.5">
                  SKY130_RISCV_CORE.gds (3.4 MB)
                </span>
                <span className="font-mono text-[0.55rem] text-[#14b8a6] mt-1 font-semibold">
                  100% MAGIC DRC & NETGEN LVS VERIFIED
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center font-mono text-[0.6rem]">
              <div className="p-1.5 rounded bg-[#14b8a6]/15 border border-[#14b8a6]/40 text-[#14b8a6] font-bold">DRC: 0 ERRORS</div>
              <div className="p-1.5 rounded bg-[#00e5ff]/15 border border-[#00e5ff]/40 text-[#00e5ff] font-bold">LVS: MATCHED</div>
              <div className="p-1.5 rounded bg-[#ec4899]/15 border border-[#ec4899]/40 text-[#ec4899] font-bold">GDSII STREAMED</div>
            </div>
          </div>
        )}

      </div>

      {/* Bottom Telemetry Bar */}
      <div className="relative z-10 flex items-center justify-between text-[0.62rem] font-mono text-white/80 bg-[#070d1a]/90 px-3.5 py-1.5 rounded-lg border border-white/10 backdrop-blur-md">
        <span>DIE AREA: 1321.32 µm²</span>
        <span className="text-[#00e5ff]">SKYWATER 130nm CMOS</span>
        <span className="text-[#14b8a6]">100% DRC / LVS CLEAN</span>
      </div>
    </div>
  );
}
