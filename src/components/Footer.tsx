import Link from "next/link";
import Image from "next/image";
import { MessageCircle, Mail } from "lucide-react";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" strokeWidth="0" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[var(--color-bg-deep)] border-t border-[var(--color-border)]/10 px-8 md:px-16 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <div className="mx-auto w-fit">
            <Image src="/kanti-logo.svg" alt="Kanti Candles" width={160} height={90} />
          </div>
          <p className="font-sans text-[9px] uppercase tracking-[0.3em] text-[var(--color-faint)]/40 mt-3">Hand-poured with love in India</p>
          {/* Social Icons */}
          <div className="flex justify-center gap-4 mt-6">
            <a href="https://www.instagram.com/kanticandles/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-[var(--color-border)]/25 flex items-center justify-center hover:border-[var(--color-gold)]/50 hover:bg-[var(--color-gold)]/5 transition-all group">
              <InstagramIcon className="w-4 h-4 text-[var(--color-faint)]/50 group-hover:text-[var(--color-gold)] transition-colors" />
            </a>
            <a href="https://wa.me/+919999999999?text=Hi%20Kanti%20Candle!" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-[var(--color-border)]/25 flex items-center justify-center hover:border-[var(--color-gold)]/50 hover:bg-[var(--color-gold)]/5 transition-all group">
              <MessageCircle className="w-4 h-4 text-[var(--color-faint)]/50 group-hover:text-[var(--color-gold)] transition-colors" />
            </a>
            <a href="mailto:kanticandle@gmail.com" className="w-10 h-10 rounded-full border border-[var(--color-border)]/25 flex items-center justify-center hover:border-[var(--color-gold)]/50 hover:bg-[var(--color-gold)]/5 transition-all group">
              <Mail className="w-4 h-4 text-[var(--color-faint)]/50 group-hover:text-[var(--color-gold)] transition-colors" />
            </a>
          </div>
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

        <div className="border-t border-[var(--color-border)]/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-sans text-[9px] tracking-widest uppercase text-[var(--color-faint)]/30">&copy; 2026 Kanti Candle. All rights reserved.</p>
          <p className="font-sans text-[9px] tracking-widest uppercase text-[var(--color-faint)]/30">Sector 92, Gurgaon, Haryana, India</p>
        </div>
      </div>
    </footer>
  );
}
