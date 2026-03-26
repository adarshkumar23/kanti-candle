import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[var(--color-bg-deep)] border-t border-[var(--color-border)]/10 px-8 md:px-16 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="font-news text-4xl tracking-[0.35em] text-[var(--color-gold-mid)]">KANTI</div>
          <p className="font-sans text-[9px] uppercase tracking-[0.3em] text-[var(--color-faint)]/40 mt-3">Hand-poured with love in India</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          <div className="space-y-4">
            <h5 className="font-sans text-[10px] uppercase tracking-[0.25em] text-[var(--color-gold)] font-semibold">Shop</h5>
            <Link href="/shop" className="block font-sans text-[10px] uppercase tracking-widest text-[var(--color-faint)]/50 hover:text-[var(--color-gold)] transition-colors">All Candles</Link>
            <Link href="/shop?category=floral" className="block font-sans text-[10px] uppercase tracking-widest text-[var(--color-faint)]/50 hover:text-[var(--color-gold)] transition-colors">Floral</Link>
            <Link href="/shop?category=woody" className="block font-sans text-[10px] uppercase tracking-widest text-[var(--color-faint)]/50 hover:text-[var(--color-gold)] transition-colors">Woody</Link>
          </div>
          <div className="space-y-4">
            <h5 className="font-sans text-[10px] uppercase tracking-[0.25em] text-[var(--color-gold)] font-semibold">Experience</h5>
            <Link href="/customize" className="block font-sans text-[10px] uppercase tracking-widest text-[var(--color-faint)]/50 hover:text-[var(--color-gold)] transition-colors">✦ Custom Studio</Link>
            <Link href="/about" className="block font-sans text-[10px] uppercase tracking-widest text-[var(--color-faint)]/50 hover:text-[var(--color-gold)] transition-colors">Our Story</Link>
            <Link href="/contact" className="block font-sans text-[10px] uppercase tracking-widest text-[var(--color-faint)]/50 hover:text-[var(--color-gold)] transition-colors">Contact Us</Link>
          </div>
          <div className="space-y-4">
            <h5 className="font-sans text-[10px] uppercase tracking-[0.25em] text-[var(--color-gold)] font-semibold">Company</h5>
            <Link href="/about" className="block font-sans text-[10px] uppercase tracking-widest text-[var(--color-faint)]/50 hover:text-[var(--color-gold)] transition-colors">About Kanti</Link>
            <Link href="/about" className="block font-sans text-[10px] uppercase tracking-widest text-[var(--color-faint)]/50 hover:text-[var(--color-gold)] transition-colors">Sustainability</Link>
            <Link href="/contact" className="block font-sans text-[10px] uppercase tracking-widest text-[var(--color-faint)]/50 hover:text-[var(--color-gold)] transition-colors">Wholesale</Link>
          </div>
          <div className="space-y-4">
            <h5 className="font-sans text-[10px] uppercase tracking-[0.25em] text-[var(--color-gold)] font-semibold">Legal</h5>
            <Link href="/privacy" className="block font-sans text-[10px] uppercase tracking-widest text-[var(--color-faint)]/50 hover:text-[var(--color-gold)] transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="block font-sans text-[10px] uppercase tracking-widest text-[var(--color-faint)]/50 hover:text-[var(--color-gold)] transition-colors">Terms of Service</Link>
            <Link href="/shipping" className="block font-sans text-[10px] uppercase tracking-widest text-[var(--color-faint)]/50 hover:text-[var(--color-gold)] transition-colors">Shipping & Returns</Link>
          </div>
        </div>
        <div className="border-t border-[var(--color-border)]/10 pt-8 text-center">
          <p className="font-sans text-[9px] tracking-widest uppercase text-[var(--color-faint)]/30">© 2026 Kanti Candle. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
