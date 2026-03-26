"use client";
import { useEffect, useRef } from "react";

export default function EmberParticles() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let active = true;

    function spawnEmber() {
      if (!active || !container) return;
      const ember = document.createElement("div");
      ember.className = "ember";
      const size = Math.random() * 4 + 2;
      const x = Math.random() * 100;
      ember.style.cssText = `
        width:${size}px; height:${size}px;
        left:${x}%;
        bottom:${10 + Math.random() * 20}%;
        --dur:${2 + Math.random() * 2}s;
        --dist:${60 + Math.random() * 80}px;
        --drift:${(Math.random() - 0.5) * 80}px;
      `;
      container.appendChild(ember);
      setTimeout(() => ember.remove(), 4500);
    }

    const interval = setInterval(spawnEmber, 350);
    return () => { active = false; clearInterval(interval); };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden />;
}
