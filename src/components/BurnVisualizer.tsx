"use client";
import { useState } from "react";

interface BurnVisualizerProps {
  burnTime: string; // e.g. "80–100 hours"
  size?: "sm" | "md";
}

export default function BurnVisualizer({ burnTime, size = "md" }: BurnVisualizerProps) {
  const hours = parseInt(burnTime) || 90;
  const [hovered, setHovered] = useState(false);
  const pct = Math.min(hours / 120, 1);
  const waxH = 70 * pct;
  const waxY = 90 - waxH;

  return (
    <div
      className="flex flex-col items-center gap-2 cursor-pointer group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <svg viewBox="0 0 60 120" className={size === "sm" ? "w-8 h-16" : "w-12 h-24"}>
        {/* Wick */}
        <line x1="30" y1="10" x2="30" y2="18" stroke="#8B7355" strokeWidth="1.5" strokeLinecap="round" />
        {/* Flame */}
        <g className="flame">
          <ellipse cx="30" cy="8" rx="4" ry="6" fill="url(#flameGrad)" opacity="0.9" />
          <ellipse cx="30" cy="9" rx="2" ry="3.5" fill="#FFF0A0" opacity="0.8" />
        </g>
        {/* Candle body */}
        <rect x="14" y="18" width="32" height="85" rx="2" fill="#1a1a1a" stroke="rgba(201,168,76,0.2)" strokeWidth="0.5" />
        {/* Wax level */}
        <rect x="14" y={waxY} width="32" height={waxH} rx="1" fill="url(#waxGrad)" />
        {/* Top wax pool */}
        <ellipse cx="30" cy="18" rx="16" ry="3" fill="#2a2010" />
        <defs>
          <linearGradient id="flameGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFE566" />
            <stop offset="60%" stopColor="#FF8C00" />
            <stop offset="100%" stopColor="#FF4500" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id="waxGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#8B6914" stopOpacity="0.3" />
          </linearGradient>
        </defs>
      </svg>
      <p className="font-sans text-[9px] tracking-widest uppercase text-[var(--color-faint)] group-hover:text-[var(--color-gold)] transition-colors">
        {burnTime}
      </p>
    </div>
  );
}
