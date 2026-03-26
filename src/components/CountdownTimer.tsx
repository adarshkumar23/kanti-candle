"use client";
import { useState, useEffect } from "react";

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
      setTimeLeft({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { label: "Days",    value: timeLeft.d },
    { label: "Hours",   value: timeLeft.h },
    { label: "Mins",    value: timeLeft.m },
    { label: "Secs",    value: timeLeft.s },
  ];

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-5">
      {units.map(({ label, value }, i) => (
        <div key={label} className="flex items-center gap-2 sm:gap-5">
          <div className="text-center min-w-[3rem] sm:min-w-[4rem]">
            <div
              className="font-display leading-none text-[var(--color-gold-light)]"
              style={{
                fontSize: "clamp(1.75rem, 7vw, 3.2rem)",
                textShadow: "0 0 20px rgba(201,168,76,0.5)",
              }}
            >
              {String(value).padStart(2, "0")}
            </div>
            <div className="font-sans text-[7px] sm:text-[8px] uppercase tracking-[0.2em] text-[var(--color-faint)] mt-1">
              {label}
            </div>
          </div>
          {i < 3 && (
            <span
              className="font-display text-[var(--color-gold)] opacity-40 self-start mt-1"
              style={{ fontSize: "clamp(1.4rem, 5vw, 2.5rem)" }}
            >
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
