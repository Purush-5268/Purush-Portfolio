"use client";
import React from "react";

interface CyberTextProps {
  text: string;
  className?: string;
  triggerOnHover?: boolean;
  speed?: number;
  initialDelay?: number;
}

export default function CyberText({
  text,
  className = "",
}: CyberTextProps) {
  return (
    <span className={`inline-block font-mono tracking-wider select-none ${className}`}>
      {text}
    </span>
  );
}
