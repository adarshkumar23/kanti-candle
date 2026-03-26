import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(198,150,63,.06) 0%, transparent 70%)" }}></div>
      <div className="relative z-10 text-center max-w-lg space-y-8">
        <div className="font-display text-[8rem] leading-none text-[var(--color-gold)]/10 font-light">404</div>
        <div className="space-y-4 -mt-12">
          <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-[var(--color-gold-mid)]">Page Not Found</p>
          <h1 className="font-display text-5xl md:text-6xl font-light italic">Lost in the Light</h1>
          <p className="font-sans text-[var(--color-faint)] font-light leading-relaxed">
            The page you&apos;re looking for has drifted away. Let us guide you back to the warmth.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/" className="btn-gold px-10 py-4 font-sans text-xs uppercase tracking-[0.22em] font-semibold rounded-sm">Return Home</Link>
          <Link href="/shop" className="btn-outline px-10 py-4 font-sans text-xs uppercase tracking-[0.22em] font-semibold rounded-sm">Browse Shop</Link>
        </div>
      </div>
    </div>
  );
}
