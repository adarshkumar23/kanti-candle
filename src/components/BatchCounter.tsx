"use client";

interface BatchCounterProps {
  batchSize?: number;
  pouredDate?: string;
  remaining?: number;
}

export default function BatchCounter({ batchSize = 24, pouredDate = "March 18, 2026", remaining }: BatchCounterProps) {
  const left = remaining ?? Math.floor(batchSize * 0.4);
  const isLow = left <= 8;

  return (
    <div className={`flex items-center gap-3 py-2.5 px-4 rounded-sm border ${isLow ? "border-orange-500/30 bg-orange-500/5" : "border-[rgba(201,168,76,0.2)] bg-[rgba(201,168,76,0.04)]"}`}>
      <div className="relative w-2 h-2 shrink-0">
        <div className={`absolute inset-0 rounded-full ${isLow ? "bg-orange-400" : "bg-[var(--color-gold)]"} animate-ping opacity-75`} />
        <div className={`relative w-2 h-2 rounded-full ${isLow ? "bg-orange-400" : "bg-[var(--color-gold)]"}`} />
      </div>
      <div>
        <p className={`font-sans text-[10px] font-semibold uppercase tracking-widest ${isLow ? "text-orange-400" : "text-[var(--color-gold)]"}`}>
          {isLow ? `Only ${left} left` : `${left} of ${batchSize} remaining`}
        </p>
        <p className="font-sans text-[9px] text-[var(--color-faint)]">Batch poured {pouredDate} · Hand-crafted in small batches</p>
      </div>
    </div>
  );
}
