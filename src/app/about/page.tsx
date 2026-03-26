"use client";

import Link from "next/link";
import { useRevealAnimation } from "@/hooks/useRevealAnimation";

export default function About() {
  useRevealAnimation();

  return (
    <div className="pt-[72px]">
      {/* About Hero */}
      <section className="relative h-[65vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=1200&q=80"
            alt="About hero"
            className="w-full h-full object-cover brightness-[0.35]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-bg)] via-[var(--color-bg)]/60 to-transparent"></div>
        </div>
        <div className="relative z-10 px-8 md:px-16 lg:px-24 max-w-2xl">
          <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-[var(--color-gold-mid)] mb-4">Our Story</p>
          <h1 className="font-display text-6xl md:text-7xl font-light leading-tight mb-6">
            We are<br /><span className="italic text-[var(--color-gold)]">Kanti.</span>
          </h1>
          <p className="font-sans text-[var(--color-muted)] font-light text-lg leading-relaxed">
            Every flame we pour carries intention. We craft premium candles that transform any space into a sanctuary of elegance.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center reveal">
            <div className="space-y-6">
              <p className="font-sans text-[10px] uppercase tracking-[0.35em] text-[var(--color-gold-mid)]">The Beginning</p>
              <h2 className="font-display text-5xl font-light leading-tight">Born from a belief that light can heal.</h2>
            </div>
            <div className="space-y-5 font-sans text-[var(--color-muted)] font-light leading-relaxed">
              <p>Founded in the heart of India, Kanti began as a small kitchen experiment — melting wax, blending fragrances, and wondering if a candle could hold the warmth of a memory.</p>
              <p>Today, each candle is still poured by hand in small batches, infused with premium botanical fragrances, and wrapped with care before it reaches you.</p>
              <blockquote className="border-l-2 border-[var(--color-gold)]/30 pl-6 py-1">
                <p className="font-accent italic text-[var(--color-gold)] text-xl leading-snug">&quot;A candle is not just wax — it is a ritual.&quot;</p>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-[var(--color-bg-deep)] reveal">
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="text-center mb-16">
            <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-[var(--color-gold-mid)] mb-3">Craft & Care</p>
            <h2 className="font-display text-5xl font-light">Our Process</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1">
            <div className="relative bg-[var(--color-bg-low)] p-8 text-center">
              <div className="font-display text-6xl italic text-[var(--color-gold)]/15 mb-4">01</div>
              <h3 className="font-display text-2xl mb-3 text-[var(--color-gold)]">Source</h3>
              <p className="font-sans text-[var(--color-faint)] text-sm leading-relaxed">We travel across India to source the finest natural waxes, wicks, and fragrance compounds.</p>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 bg-[var(--color-border)]/30 hidden lg:block"></div>
            </div>
            <div className="relative bg-[var(--color-bg-low)] p-8 text-center border-t border-[var(--color-border)]/15 lg:border-t-0">
              <div className="font-display text-6xl italic text-[var(--color-gold)]/15 mb-4">02</div>
              <h3 className="font-display text-2xl mb-3 text-[var(--color-gold)]">Blend</h3>
              <p className="font-sans text-[var(--color-faint)] text-sm leading-relaxed">Our master perfumer crafts each fragrance formula in-house — balanced, complex, and long-lasting.</p>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 bg-[var(--color-border)]/30 hidden lg:block"></div>
            </div>
            <div className="relative bg-[var(--color-bg-low)] p-8 text-center border-t border-[var(--color-border)]/15 lg:border-t-0">
              <div className="font-display text-6xl italic text-[var(--color-gold)]/15 mb-4">03</div>
              <h3 className="font-display text-2xl mb-3 text-[var(--color-gold)]">Pour</h3>
              <p className="font-sans text-[var(--color-faint)] text-sm leading-relaxed">Every candle is hand-poured in small batches, cooled slowly, and quality-tested for an even burn.</p>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 bg-[var(--color-border)]/30 hidden lg:block"></div>
            </div>
            <div className="bg-[var(--color-bg-low)] p-8 text-center border-t border-[var(--color-border)]/15 lg:border-t-0">
              <div className="font-display text-6xl italic text-[var(--color-gold)]/15 mb-4">04</div>
              <h3 className="font-display text-2xl mb-3 text-[var(--color-gold)]">Deliver</h3>
              <p className="font-sans text-[var(--color-faint)] text-sm leading-relaxed">Wrapped in our signature packaging, every order is shipped with luxury precision.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-[var(--color-bg-deep)] py-24 px-6 text-center reveal">
        <div className="space-y-8 max-w-xl mx-auto">
          <h2 className="font-display text-5xl italic font-light">Experience Kanti</h2>
          <p className="font-sans text-[var(--color-faint)] font-light">Discover our full collection or create something entirely your own.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/shop" className="btn-gold px-10 py-4 font-sans text-xs uppercase tracking-[0.22em] font-semibold rounded-sm">Shop Now</Link>
            <Link href="/customize" className="btn-outline px-10 py-4 font-sans text-xs uppercase tracking-[0.22em] font-semibold rounded-sm flex items-center gap-2">
              <span className="text-[var(--color-gold)]">✦</span> Create Your Candle
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
