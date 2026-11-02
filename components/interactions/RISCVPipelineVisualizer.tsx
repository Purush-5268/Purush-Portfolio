"use client";
import React, { useState } from "react";
import { playClickSound, playHoverSound } from "@/lib/soundEffects";

interface PipelineVisualizerProps {
  activeStageId: string;
  clockCycle: number;
  currentInst: { asm: string; type: string; desc: string };
  onStageSelect?: (stageId: string) => void;
}

export const STAGES_META = [
  { id: "IF", label: "FETCH", color: "#FF5E1E", bus: "PC ➔ I-CACHE" },
  { id: "ID", label: "DECODE", color: "#F59E0B", bus: "INST ➔ REG_FILE" },
  { id: "EX", label: "EXECUTE", color: "#FF5E1E", bus: "OP ➔ 32b ALU" },
  { id: "MEM", label: "MEMORY", color: "#38BDF8", bus: "ALU_OUT ➔ SRAM" },
  { id: "WB", label: "WRITEBACK", color: "#F59E0B", bus: "DATA ➔ REG[rd]" },
];

// 1. Five-Stage Animated Signal Conduit (Left Column)
export function RISCVPipelineConduit({
  activeStageId,
  clockCycle,
  onStageSelect,
}: {
  activeStageId: string;
  clockCycle: number;
  onStageSelect?: (id: string) => void;
}) {
  const currentPC = `0x004000${((clockCycle - 1) * 4).toString(16).padStart(2, "0").toUpperCase()}`;

  return (
    <div className="w-full rounded-2xl bg-[#0B101D] border border-white/15 p-4 sm:p-5 shadow-xl select-none mb-4">
      {/* Conduit Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-3.5 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5E1E] animate-ping" />
          <span className="font-heading font-black text-xs sm:text-sm text-white tracking-wider uppercase">
            LIVE DATAPATH // {activeStageId} STAGE ACTIVE
          </span>
        </div>
        <div className="px-3.5 py-1 rounded-full bg-[#FF5E1E]/15 border border-[#FF5E1E]/50 font-mono text-xs sm:text-sm text-white font-black shadow-[0_0_12px_rgba(255,94,30,0.4)]">
          PC: <span className="text-[#FF5E1E]">{currentPC}</span>
        </div>
      </div>

      {/* 5-Stage Conduit Track */}
      <div className="p-3 rounded-xl bg-black/75 border border-white/10 mb-3">
        <div className="flex items-center justify-between gap-1.5 sm:gap-2">
          {STAGES_META.map((st, idx) => {
            const isSelected = activeStageId === st.id;
            return (
              <React.Fragment key={st.id}>
                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    if (onStageSelect) onStageSelect(st.id);
                  }}
                  onMouseEnter={playHoverSound}
                  className={`flex-1 p-2 sm:p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#18233C] border-[#FF5E1E] shadow-[0_0_20px_rgba(255,94,30,0.7)] scale-105"
                      : "bg-[#06080E] border-white/10 opacity-75 hover:opacity-100 hover:border-white/30"
                  }`}
                >
                  <span
                    className="font-heading font-black text-sm sm:text-base block drop-shadow-sm"
                    style={{ color: st.color }}
                  >
                    {st.id}
                  </span>
                  <span className="font-mono text-[0.62rem] sm:text-xs text-white/90 block truncate mt-0.5 font-bold">
                    {st.label}
                  </span>
                </button>
                {idx < 4 && (
                  <div className="flex items-center justify-center text-[#FF5E1E] text-xs font-black animate-pulse">
                    ➔
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Dynamic Bus Output */}
        <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between font-mono text-xs sm:text-sm">
          <span className="text-[#94A3B8] font-medium">Active Signal Bus:</span>
          <span className="text-[#FF5E1E] font-extrabold tracking-wide">
            {STAGES_META.find((s) => s.id === activeStageId)?.bus}
          </span>
        </div>
      </div>
    </div>
  );
}

// 2. Active Stage Detailed Execution Schematic (Right Column)
export function RISCVStageDetail({
  activeStageId,
  clockCycle,
  currentInst,
}: {
  activeStageId: string;
  clockCycle: number;
  currentInst: { asm: string; type: string; desc: string };
}) {
  const currentPC = `0x004000${((clockCycle - 1) * 4).toString(16).padStart(2, "0").toUpperCase()}`;

  return (
    <div className="w-full rounded-2xl bg-[#0B101D] border border-white/15 p-5 shadow-xl select-none">
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
        <span className="font-heading font-black text-xs sm:text-sm text-white uppercase tracking-wider flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#FF5E1E] animate-ping" />
          STAGE EXECUTION SCHEMATIC // {activeStageId}
        </span>
        <span className="px-3 py-0.5 rounded-full bg-[#FF5E1E]/20 text-[#FF5E1E] border border-[#FF5E1E]/40 font-mono text-xs font-bold">
          CYCLE #{clockCycle}
        </span>
      </div>

      <div className="p-4 rounded-xl bg-black/60 border border-white/15 shadow-inner">
        {/* IF STAGE */}
        {activeStageId === "IF" && (
          <div className="space-y-3.5 font-mono">
            <div className="flex items-center justify-between text-xs sm:text-sm text-[#FF5E1E] font-bold">
              <span>[IF] INSTRUCTION FETCH ENGINE</span>
              <span className="text-white">4-BYTE ALIGNED</span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[#0D1528] border border-[#FF5E1E]/40">
                <span className="text-[#94A3B8] block text-[0.65rem] uppercase font-bold">PROGRAM COUNTER (PC)</span>
                <span className="text-white font-extrabold text-sm">{currentPC}</span>
                <span className="text-[#FF5E1E] block text-[0.65rem] mt-1 font-semibold">
                  +4 Adder: 0x004000{(parseInt(currentPC.slice(-2), 16) + 4).toString(16).padStart(2, "0").toUpperCase()}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-[#0D1528] border border-[#FF5E1E]/40">
                <span className="text-[#94A3B8] block text-[0.65rem] uppercase font-bold">INSTRUCTION I-CACHE</span>
                <span className="text-[#38BDF8] font-extrabold text-sm">0x00A00293</span>
                <span className="text-[#F59E0B] block text-[0.65rem] mt-1 font-semibold">Hit (Latency: 1 Cycle)</span>
              </div>
            </div>
            <div className="p-2.5 rounded-lg bg-black/70 text-xs text-white border border-white/10 flex items-center justify-between">
              <span>Pipeline Latch: <strong className="text-[#FF5E1E]">{currentInst.asm}</strong></span>
              <span className="text-white bg-[#FF5E1E] px-2 py-0.5 rounded font-bold text-[0.65rem]">LATCHED [✓]</span>
            </div>
          </div>
        )}

        {/* ID STAGE */}
        {activeStageId === "ID" && (
          <div className="space-y-3.5 font-mono">
            <div className="flex items-center justify-between text-xs sm:text-sm text-[#F59E0B] font-bold">
              <span>[ID] DECODER &amp; REGFILE READ</span>
              <span className="text-white">RV32I HARVARD</span>
            </div>
            <div className="grid grid-cols-3 gap-2.5 text-xs">
              <div className="p-2.5 rounded-xl bg-[#0D1528] border border-[#F59E0B]/40">
                <span className="text-[#94A3B8] block text-[0.62rem] uppercase font-bold">OPCODE [6:0]</span>
                <span className="text-white font-extrabold">0010011</span>
                <span className="text-[#F59E0B] block text-[0.6rem] mt-0.5">OP-IMM</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#0D1528] border border-[#F59E0B]/40">
                <span className="text-[#94A3B8] block text-[0.62rem] uppercase font-bold">SOURCE RS1</span>
                <span className="text-[#38BDF8] font-extrabold">x5 (Val: 42)</span>
                <span className="text-white/70 block text-[0.6rem] mt-0.5">Operand A</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#0D1528] border border-[#F59E0B]/40">
                <span className="text-[#94A3B8] block text-[0.62rem] uppercase font-bold">TARGET RD</span>
                <span className="text-[#FF5E1E] font-extrabold">x6 (Target)</span>
                <span className="text-white/70 block text-[0.6rem] mt-0.5">Dest Reg</span>
              </div>
            </div>
            <div className="p-2.5 rounded-lg bg-black/70 text-xs text-white border border-white/10 flex items-center justify-between">
              <span>Imm Gen: Sign-Extend(12b) ➔ 32&apos;d42</span>
              <span className="text-[#06080E] bg-[#F59E0B] px-2 py-0.5 rounded font-bold text-[0.65rem]">DECODED [✓]</span>
            </div>
          </div>
        )}

        {/* EX STAGE */}
        {activeStageId === "EX" && (
          <div className="space-y-3.5 font-mono">
            <div className="flex items-center justify-between text-xs sm:text-sm text-[#FF5E1E] font-bold">
              <span>[EX] 32-BIT ARITHMETIC LOGIC UNIT (ALU)</span>
              <span className="text-white">SINGLE-CYCLE EXEC</span>
            </div>
            <div className="grid grid-cols-3 gap-2.5 text-xs">
              <div className="p-2.5 rounded-xl bg-[#0D1528] border border-[#FF5E1E]/40">
                <span className="text-[#94A3B8] block text-[0.62rem] uppercase font-bold">OPERAND A</span>
                <span className="text-white font-extrabold text-sm">42</span>
                <span className="text-white/70 block text-[0.6rem] mt-0.5">From rs1</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#0D1528] border border-[#FF5E1E]/40">
                <span className="text-[#94A3B8] block text-[0.62rem] uppercase font-bold">OPERATION</span>
                <span className="text-[#FF5E1E] font-extrabold text-sm">ADD / SHIFT</span>
                <span className="text-white/70 block text-[0.6rem] mt-0.5">Core ALU</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#0D1528] border border-[#FF5E1E]/40">
                <span className="text-[#94A3B8] block text-[0.62rem] uppercase font-bold">ALU OUTPUT</span>
                <span className="text-[#F59E0B] font-extrabold text-sm">168</span>
                <span className="text-white/70 block text-[0.6rem] mt-0.5">Calculated</span>
              </div>
            </div>
            <div className="p-2.5 rounded-lg bg-black/70 text-xs text-white border border-white/10 flex items-center justify-between">
              <span>Flags: Zero=0 • Overflow=0 • Carry=0</span>
              <span className="text-white bg-[#FF5E1E] px-2 py-0.5 rounded font-bold text-[0.65rem]">TIMING MET [✓]</span>
            </div>
          </div>
        )}

        {/* MEM STAGE */}
        {activeStageId === "MEM" && (
          <div className="space-y-3.5 font-mono">
            <div className="flex items-center justify-between text-xs sm:text-sm text-[#38BDF8] font-bold">
              <span>[MEM] DATA SRAM MEMORY STAGE</span>
              <span className="text-white">BYTE ADDRESSABLE</span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[#0D1528] border border-[#38BDF8]/40">
                <span className="text-[#94A3B8] block text-[0.65rem] uppercase font-bold">EFFECTIVE ADDRESS</span>
                <span className="text-white font-extrabold text-sm">0x100000A8</span>
                <span className="text-[#38BDF8] block text-[0.65rem] mt-1 font-semibold">Word-Aligned (Offset: 0)</span>
              </div>
              <div className="p-3 rounded-xl bg-[#0D1528] border border-[#38BDF8]/40">
                <span className="text-[#94A3B8] block text-[0.65rem] uppercase font-bold">MEMORY BUS ACTION</span>
                <span className="text-[#FF5E1E] font-extrabold text-sm">MEM_READ_WORD</span>
                <span className="text-[#38BDF8] block text-[0.65rem] mt-1 font-semibold">Strobe: Active Low</span>
              </div>
            </div>
            <div className="p-2.5 rounded-lg bg-black/70 text-xs text-white border border-white/10 flex items-center justify-between">
              <span>Data Cache Status: HIT • 32-bit Word Latched</span>
              <span className="text-[#06080E] bg-[#38BDF8] px-2 py-0.5 rounded font-bold text-[0.65rem]">FORWARDED [✓]</span>
            </div>
          </div>
        )}

        {/* WB STAGE */}
        {activeStageId === "WB" && (
          <div className="space-y-3.5 font-mono">
            <div className="flex items-center justify-between text-xs sm:text-sm text-[#F59E0B] font-bold">
              <span>[WB] REGISTER WRITE-BACK ENGINE</span>
              <span className="text-white">COMMITTED TO CORE</span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[#0D1528] border border-[#F59E0B]/40">
                <span className="text-[#94A3B8] block text-[0.65rem] uppercase font-bold">DESTINATION REGISTER</span>
                <span className="text-white font-extrabold text-sm">x8 (s0/fp)</span>
                <span className="text-[#38BDF8] block text-[0.65rem] mt-1 font-semibold">Write Enable: Asserted</span>
              </div>
              <div className="p-3 rounded-xl bg-[#0D1528] border border-[#F59E0B]/40">
                <span className="text-[#94A3B8] block text-[0.65rem] uppercase font-bold">COMMITTED VALUE</span>
                <span className="text-[#F59E0B] font-extrabold text-sm">210 (0x000000D2)</span>
                <span className="text-[#FF5E1E] block text-[0.65rem] mt-1 font-semibold">Architectural State Updated</span>
              </div>
            </div>
            <div className="p-2.5 rounded-lg bg-[#FF5E1E]/20 text-xs text-white border border-[#FF5E1E]/50 flex items-center justify-between font-bold">
              <span>Instruction Execution Closed Successfully</span>
              <span className="text-white bg-[#FF5E1E] px-2 py-0.5 rounded text-[0.65rem]">CYCLE FINISHED [✓]</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// 3. Live 32-Bit Architectural Register File Bank (Right Column)
export function RISCVRegisterBank({
  clockCycle,
}: {
  clockCycle: number;
}) {
  const [selectedReg, setSelectedReg] = useState<string | null>(null);

  const regValues: Record<string, { hex: string; dec: string; desc: string }> = {
    x0: { hex: "0x00000000", dec: "0", desc: "Hardwired Zero (Constant 0 in RISC-V ISA)" },
    x1: { hex: "0x00400004", dec: "4194308", desc: "Return Address (ra) for function returns" },
    x5: { hex: clockCycle >= 1 ? "0x0000002A" : "0x00000000", dec: clockCycle >= 1 ? "42" : "0", desc: "Temporary Register t0 (Loaded with immediate 42)" },
    x6: { hex: clockCycle >= 2 ? "0x000000A8" : "0x00000000", dec: clockCycle >= 2 ? "168" : "0", desc: "Temporary Register t1 (Shifted address pointer 168)" },
    x7: { hex: clockCycle >= 3 ? "0x000000A8" : "0x00000000", dec: clockCycle >= 3 ? "168" : "0", desc: "Temporary Register t2 (Loaded memory operand 168)" },
    x8: { hex: clockCycle >= 4 ? "0x000000D2" : "0x00000000", dec: clockCycle >= 4 ? "210" : "0", desc: "Saved Register s0 / Frame Pointer (Sum result: 210)" },
  };

  return (
    <div className="w-full rounded-2xl bg-[#0B101D] border border-white/15 p-5 shadow-xl select-none">
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
        <div>
          <span className="font-heading font-black text-xs sm:text-sm text-white uppercase tracking-wider block">
            LIVE 32-BIT ARCHITECTURAL REGISTERS
          </span>
          <span className="font-mono text-[0.65rem] text-[#94A3B8]">
            Click Any Register to Inspect Bitfield Breakdown
          </span>
        </div>
        <span className="px-2.5 py-0.5 rounded-full bg-[#FF5E1E]/20 text-[#FF5E1E] border border-[#FF5E1E]/40 font-mono text-xs font-bold animate-pulse">
          LIVE
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 font-mono text-xs">
        {Object.entries(regValues).map(([reg, data]) => {
          const isRegSelected = selectedReg === reg;
          return (
            <button
              key={reg}
              type="button"
              onClick={() => {
                playClickSound();
                setSelectedReg(isRegSelected ? null : reg);
              }}
              onMouseEnter={playHoverSound}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                isRegSelected
                  ? "bg-[#18233C] border-[#FF5E1E] shadow-[0_0_18px_rgba(255,94,30,0.6)] scale-102"
                  : "bg-black/60 border-white/15 hover:border-[#FF5E1E]/50"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[#FF5E1E] font-black text-sm">{reg}</span>
                <span className="text-white font-extrabold text-xs">{data.hex}</span>
              </div>
              <span className="text-[#94A3B8] text-[0.7rem] block font-bold">
                Decimal: <span className="text-white">{data.dec}</span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Register Detail Drawer */}
      {selectedReg && regValues[selectedReg] && (
        <div className="mt-3.5 p-3 rounded-xl bg-[#18233C] border border-[#FF5E1E]/60 flex items-center justify-between text-xs font-mono animate-fadeIn">
          <div>
            <span className="text-[#FF5E1E] font-bold uppercase">{selectedReg} SPECIFICATION: </span>
            <span className="text-white font-medium">{regValues[selectedReg].desc}</span>
          </div>
          <button
            onClick={() => setSelectedReg(null)}
            className="text-white hover:text-[#FF5E1E] px-2.5 py-1 rounded text-xs border border-white/20 hover:border-[#FF5E1E] cursor-pointer font-bold ml-2"
          >
            CLOSE ✕
          </button>
        </div>
      )}
    </div>
  );
}

// Default export for backward compatibility
export default function RISCVPipelineVisualizer(props: PipelineVisualizerProps) {
  return (
    <div className="w-full flex flex-col gap-4">
      <RISCVPipelineConduit
        activeStageId={props.activeStageId}
        clockCycle={props.clockCycle}
        onStageSelect={props.onStageSelect}
      />
    </div>
  );
}
