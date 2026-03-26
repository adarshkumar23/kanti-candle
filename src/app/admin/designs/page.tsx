"use client";

import { Sparkles } from "lucide-react";

export default function AdminDesigns() {
  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-[fadeUp_0.4s_ease]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-[var(--color-border)]/20 pb-5 gap-2">
        <div>
          <h1 className="font-display text-3xl md:text-4xl text-[var(--color-gold)]">AI Studio Designs</h1>
          <p className="font-sans text-[var(--color-faint)] text-xs md:text-sm tracking-widest uppercase mt-2">Monitor customer generation concepts</p>
        </div>
      </div>

      <div className="bg-[var(--color-bg-low)] border border-[var(--color-border)]/20 rounded-sm p-12 flex flex-col items-center justify-center text-center">
        <Sparkles className="w-12 h-12 text-[var(--color-faint)] mb-4 opacity-50" />
        <p className="font-display text-2xl text-[var(--color-muted)] mb-2">No blueprints generated</p>
        <p className="font-sans text-xs text-[var(--color-faint)]">Customer creations from the AI Customizer will sync here securely.</p>
      </div>
    </div>
  );
}
