"use client";
import { useState, useEffect } from "react";

// Next drop: first of next month
function getNextDrop() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth() + 1, 1, 10, 0, 0);
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    function tick() {
      const diff = getNextDrop().getTime() - Date.now();
      if (diff <= 0) { setTimeLeft({ d: 0, h: 0, m: 0, s: 0 }); return; }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft({ d, h, m, s });
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { label: "Days", value: timeLeft.d },
    { label: "Hours", value: timeLeft.h },
    { label: "Minutes", value: timeLeft.m },
    { label: "Seconds", value: timeLeft.s },
  ];

  return (
    <div className="flex items-center gap-4 sm:gap-6 justify-center">
      {units.map(({ label, value }, i) => (
        <div key={label} className="flex items-center gap-4 sm:gap-6">
          <div className="text-center">
            <div className="countdown-digit">{String(value).padStart(2, "0")}</div>
            <div className="font-sans text-[8px] uppercase tracking-[0.25em] text-[var(--color-faint)] mt-1">{label}</div>
          </div>
          {i < 3 && <span className="countdown-digit opacity-40 mb-3">:</span>}
        </div>
      ))}
    </div>
  );
}
