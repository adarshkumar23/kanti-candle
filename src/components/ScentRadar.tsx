"use client";

interface ScentProfile {
  top: number;
  heart: number;
  base: number;
  intensity: number;
  longevity: number;
}

const LABELS = ["Top", "Heart", "Base", "Intensity", "Longevity"];
const SIZE = 120;
const CENTER = SIZE / 2;
const RADIUS = 44;

function polarToXY(angle: number, r: number) {
  const rad = (angle - 90) * (Math.PI / 180);
  return { x: CENTER + r * Math.cos(rad), y: CENTER + r * Math.sin(rad) };
}

export default function ScentRadar({ profile }: { profile: ScentProfile }) {
  const values = [profile.top, profile.heart, profile.base, profile.intensity, profile.longevity];
  const angles = [0, 72, 144, 216, 288];

  const gridPoints = (r: number) =>
    angles.map((a) => { const p = polarToXY(a, r); return `${p.x},${p.y}`; }).join(" ");

  const dataPoints = angles
    .map((a, i) => { const r = (values[i] / 100) * RADIUS; const p = polarToXY(a, r); return `${p.x},${p.y}`; })
    .join(" ");

  return (
    <div className="scent-radar absolute bottom-full left-1/2 -translate-x-1/2 mb-3 bg-[#111] border border-[rgba(201,168,76,0.3)] rounded-sm p-3 w-36 z-20 shadow-xl">
      <p className="font-sans text-[8px] uppercase tracking-[0.2em] text-[var(--color-faint)] text-center mb-2">Scent Profile</p>
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="w-full">
        {[0.25, 0.5, 0.75, 1].map((f) => (
          <polygon key={f} points={gridPoints(RADIUS * f)} fill="none" stroke="rgba(201,168,76,0.15)" strokeWidth="0.5" />
        ))}
        {angles.map((a, i) => {
          const outer = polarToXY(a, RADIUS);
          return <line key={i} x1={CENTER} y1={CENTER} x2={outer.x} y2={outer.y} stroke="rgba(201,168,76,0.1)" strokeWidth="0.5" />;
        })}
        <polygon points={dataPoints} fill="rgba(201,168,76,0.15)" stroke="rgba(201,168,76,0.7)" strokeWidth="1.2" />
        {angles.map((a, i) => {
          const p = polarToXY(a, (values[i] / 100) * RADIUS);
          return <circle key={i} cx={p.x} cy={p.y} r="2" fill="var(--color-gold)" />;
        })}
        {angles.map((a, i) => {
          const lp = polarToXY(a, RADIUS + 10);
          return <text key={i} x={lp.x} y={lp.y} textAnchor="middle" dominantBaseline="middle" fontSize="7" fill="rgba(201,168,76,0.6)" fontFamily="DM Sans, sans-serif">{LABELS[i]}</text>;
        })}
      </svg>
    </div>
  );
}
