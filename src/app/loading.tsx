export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-6">
        <div className="relative w-12 h-12 mx-auto">
          <div className="absolute inset-0 rounded-full border-2 border-[var(--color-border)]/20"></div>
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[var(--color-gold)] animate-spin"></div>
        </div>
        <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-[var(--color-faint)]">Loading</p>
      </div>
    </div>
  );
}
