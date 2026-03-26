"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // Reveal animation logic
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="page active" id="page-home">
      {/* HERO */}
      <section className="relative h-screen w-full flex items-end justify-start overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKfh5G09V5s_veL5tO4Kb9QWyv7h5fm79XLAwMPQ0rJxkTdG8fNzV4Jy_lr4jfN8SHlC8eqcu055ZVwf_DsaWdy-5LoIFzHOHJ2J2ii1cO31R_ntGHOsQnKBVaFPRkwePl_XSs_mAwx4wcF9QayPwqUrPMKj7yJiVBZdJ-APCIRbsypNxnw9GMxonXmvJc7uv5GxcxDC5JSdCAkDOLToCtKCVgkOQnpFtxL2G6cTDkhcd90yujwxbTh5uDrbaLUpwDQpQdy2fkbAU"
            alt="Hero candle"
            className="w-full h-full object-cover brightness-[0.38]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-bg)]/80 via-[var(--color-bg)]/30 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] via-transparent to-transparent"></div>
        </div>
        <div className="relative z-10 px-8 md:px-16 lg:px-24 pb-24 max-w-3xl">
          <p className="font-accent italic text-[var(--color-gold)] text-lg tracking-widest mb-5 opacity-90">An olfactory awakening</p>
          <h1 className="font-display text-7xl md:text-8xl lg:text-[7rem] font-light leading-[0.92] tracking-tight mb-8">
            Born from<br /><span className="italic text-[var(--color-gold-mid)]">Light.</span>
          </h1>
          <p className="font-sans text-[var(--color-muted)] font-light text-lg mb-10 leading-relaxed max-w-lg">
            Hand-poured in small batches, Kanti candles transform your space into a sanctuary of stillness and soul. Experience affordable luxury with every burn.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/shop" className="btn-gold px-10 py-4 font-sans text-xs uppercase tracking-[0.22em] font-semibold rounded-sm">Explore Collection</Link>
            <Link href="/customize" className="btn-outline px-10 py-4 font-sans text-xs uppercase tracking-[0.22em] font-semibold rounded-sm flex items-center gap-2">
              <span className="text-[var(--color-gold)]">✦</span> Create Yours
            </Link>
          </div>
        </div>
        <div className="absolute bottom-8 right-8 z-10 flex flex-col items-center gap-2 opacity-40">
          <span className="font-sans text-[9px] uppercase tracking-[0.3em] text-[var(--color-muted)] rotate-90 mb-3">Scroll</span>
          <div className="w-px h-12 bg-[var(--color-gold-mid)]/50"></div>
        </div>
      </section>

      {/* MARQUEE STRIP */}
      <div className="py-8 border-y border-[var(--color-border)]/20 bg-[var(--color-bg-deep)] overflow-hidden">
        <div className="marquee-inner flex gap-14 shrink-0">
          <span className="flex items-center gap-14 shrink-0">
            <span className="font-display text-xl uppercase tracking-[0.4em] text-[var(--color-gold)]">Hand-Poured</span><span className="text-[var(--color-gold-dim)] text-lg">◆</span>
            <span className="font-display text-xl uppercase tracking-[0.4em] text-[var(--color-gold)]">Natural Wax</span><span className="text-[var(--color-gold-dim)] text-lg">◆</span>
            <span className="font-display text-xl uppercase tracking-[0.4em] text-[var(--color-gold)]">Premium Fragrance</span><span className="text-[var(--color-gold-dim)] text-lg">◆</span>
            <span className="font-display text-xl uppercase tracking-[0.4em] text-[var(--color-gold)]">Made in India</span><span className="text-[var(--color-gold-dim)] text-lg">◆</span>
            <span className="font-display text-xl uppercase tracking-[0.4em] text-[var(--color-gold)]">Kanti Candle</span><span className="text-[var(--color-gold-dim)] text-lg">◆</span>
          </span>
          <span className="flex items-center gap-14 shrink-0" aria-hidden="true">
            <span className="font-display text-xl uppercase tracking-[0.4em] text-[var(--color-gold)]">Hand-Poured</span><span className="text-[var(--color-gold-dim)] text-lg">◆</span>
            <span className="font-display text-xl uppercase tracking-[0.4em] text-[var(--color-gold)]">Natural Wax</span><span className="text-[var(--color-gold-dim)] text-lg">◆</span>
            <span className="font-display text-xl uppercase tracking-[0.4em] text-[var(--color-gold)]">Premium Fragrance</span><span className="text-[var(--color-gold-dim)] text-lg">◆</span>
            <span className="font-display text-xl uppercase tracking-[0.4em] text-[var(--color-gold)]">Made in India</span><span className="text-[var(--color-gold-dim)] text-lg">◆</span>
            <span className="font-display text-xl uppercase tracking-[0.4em] text-[var(--color-gold)]">Kanti Candle</span><span className="text-[var(--color-gold-dim)] text-lg">◆</span>
          </span>
        </div>
      </div>

      {/* COLLECTIONS */}
      <section className="py-28 px-6 md:px-12 lg:px-24 reveal">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
            <div>
              <p className="font-sans text-[10px] uppercase tracking-[0.35em] text-[var(--color-gold-mid)] mb-3">Curated for You</p>
              <h2 className="font-display text-5xl md:text-6xl font-light">Our Collections</h2>
            </div>
            <Link href="/shop" className="font-sans text-[10px] uppercase tracking-widest text-[var(--color-gold)] border-b border-[var(--color-gold)]/25 pb-1 hover:border-[var(--color-gold)] transition-colors shrink-0">View All Candles →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
            <div className="group cursor-pointer">
              <div className="aspect-[3/4] overflow-hidden rounded-sm mb-7 bg-[var(--color-bg-card)]">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2rT8N_NvldqwycFoszsg-nm_6sTI2iQgdxdPvncsUPzgPi3hVJ_Te4fVtKAEDqHm5GgywmB7jJ1GkMANQlgpOUN36gsFL53m4VIUbGt86FQhV14fP1vXTjZC8tuuG2LqYicrCz8CN9JiQ-DmUe2EFFbroqkJmenzR55L9Mseot0VRHODYZl_z324anFMzyX19NMPKnXsEVGL-k8ctYNZxZHAek7bempXIpktRpaHxs2QSK9OqHsycO6NJYZ2pKPZwTySUtZmJOgU" alt="The Noir" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <p className="font-sans text-[9px] uppercase tracking-[0.3em] text-[var(--color-gold)]/50 mb-2 font-semibold">Midnight Series</p>
              <h3 className="font-display text-3xl mb-2 group-hover:text-[var(--color-gold)] transition-colors">The Noir</h3>
              <p className="font-sans text-[var(--color-faint)] text-sm leading-relaxed">Sandalwood · Oud · Black Pepper</p>
            </div>
            <div className="group cursor-pointer md:mt-20">
              <div className="aspect-[3/4] overflow-hidden rounded-sm mb-7 bg-[var(--color-bg-card)]">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIU5Eg2NSv631pzvRORhVyokxf3fD_BRVFvg3rcts3jPG4nFwa35B4feueu7KeoSdVFNWaUo98_CWeXuzAdT6arMiJXELqLYZMqH1YqJFzIZtUZxLLECf-a8My6VduD9jO3v5HPctsjTLcQn9Wne5ptMTpbwlSzhxZ3ThL8C--DChbIib750orRHq79X3bKUjM4S-yK7LaUqqayzewPPXvjckDLLX9h5VvKuqX6T1_v4JZkBd7h7eOf3WF3Z6lo5JdllVowVZ9Ywo" alt="Ethereal Bloom" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <p className="font-sans text-[9px] uppercase tracking-[0.3em] text-[var(--color-gold)]/50 mb-2 font-semibold">Dawn Series</p>
              <h3 className="font-display text-3xl mb-2 group-hover:text-[var(--color-gold)] transition-colors">Ethereal Bloom</h3>
              <p className="font-sans text-[var(--color-faint)] text-sm leading-relaxed">Jasmine · Neroli · White Musk</p>
            </div>
            <div className="group cursor-pointer">
              <div className="aspect-[3/4] overflow-hidden rounded-sm mb-7 bg-[var(--color-bg-card)]">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBd2KgF5uAG21Af-sdWNCvdkpW0GlO6ZhuGmhIIgqzmGbTRyl0TjYBkaMdx33QhvRupj1BSa2iDS9ZGpvi1gEkelz8gecogm29PTV1rZW7UGhQQLsB16pdKR_tBQ6FqjwQ8gY6C3q7OyzIlXnK4zlMoiPacevJ40w4EyhSU80KgUzyPmvUefudKcOrsdMjgXcGDgtqkiDUYb_8GUktpz3ujEFoCBF39AtucqQCYKbcWWxtF8XQTai1Oa4w-6QO8vLuENGNCBvM_HxQ" alt="Terra Spirit" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <p className="font-sans text-[9px] uppercase tracking-[0.3em] text-[var(--color-gold)]/50 mb-2 font-semibold">Earth Series</p>
              <h3 className="font-display text-3xl mb-2 group-hover:text-[var(--color-gold)] transition-colors">Terra Spirit</h3>
              <p className="font-sans text-[var(--color-faint)] text-sm leading-relaxed">Vetiver · Cedar · Moss</p>
            </div>
          </div>
        </div>
      </section>

      {/* STORY AND TEASER SECTIONS */}
      <section className="flex flex-col md:flex-row min-h-[580px] reveal">
        <div className="w-full md:w-1/2 overflow-hidden">
          <img src="https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80" alt="Artisan" className="w-full h-full object-cover" style={{ minHeight: "400px" }} />
        </div>
        <div className="w-full md:w-1/2 bg-[var(--color-bg-low)] flex flex-col justify-center p-10 lg:p-20 gap-7">
          <span className="font-accent italic text-[var(--color-gold)] text-xl">The Artisan's Touch</span>
          <h2 className="font-display text-5xl md:text-6xl leading-tight font-light">Every light<br />has a story<br />to tell.</h2>
          <p className="font-sans text-[var(--color-muted)] font-light leading-relaxed max-w-md">
            Founded in the heart of India, Kanti is a labor of love. We believe that a candle is more than just light — it&apos;s an invitation to slow down, breathe, and reconnect with your senses.
          </p>
          <Link href="/about" className="btn-gold w-fit px-8 py-4 font-sans text-xs uppercase tracking-[0.22em] font-semibold rounded-sm">Meet Kanti</Link>
        </div>
      </section>

      {/* CUSTOMIZE TEASER */}
      <section className="relative py-32 px-6 overflow-hidden bg-[var(--color-bg-deep)] text-center reveal">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 60%, rgba(198,150,63,.12) 0%, transparent 70%)" }}></div>
        <div className="relative z-10 max-w-3xl mx-auto space-y-8">
          <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-[var(--color-gold-mid)]">The Kanti Studio - AI Enhanced</span>
          <h2 className="font-display text-6xl md:text-7xl italic font-light">Make It Yours</h2>
          <p className="font-sans text-[var(--color-muted)] font-light text-lg leading-relaxed max-w-xl mx-auto">
            Design a candle that tells your story — craft your scent, choose your jar, and let our AI generate the perfect label just for you.
          </p>
          <Link href="/customize" className="btn-outline px-14 py-5 font-sans text-xs uppercase tracking-[0.3em] font-semibold rounded-sm flex items-center justify-center gap-3 mx-auto w-fit">
            <span className="text-[var(--color-gold)] text-base">✦</span> Start Customizing
          </Link>
        </div>
      </section>

      {/* EMAIL SIGNUP */}
      <section className="py-24 px-6 md:px-12 lg:px-24 reveal">
        <div className="max-w-5xl mx-auto bg-[var(--color-cream)] p-12 md:p-20 rounded-sm relative overflow-hidden text-center" style={{ border: "4px solid rgba(198,150,63,.2)" }}>
          <div className="absolute top-0 right-0 w-56 h-56 rounded-full -translate-y-1/2 translate-x-1/2" style={{ background: "rgba(198,150,63,.06)" }}></div>
          <div className="relative z-10 space-y-7">
            <span className="font-accent italic text-[var(--color-gold-mid)] text-xl">Private Access</span>
            <h2 className="font-display text-5xl md:text-6xl text-[var(--color-bg)] font-light">Join the Inner Circle</h2>
            <p className="font-sans text-[var(--color-bg)]/60 font-light max-w-md mx-auto leading-relaxed">
              Be the first to experience limited seasonal drops and exclusive fragrance workshops.
            </p>
            <div className="max-w-md mx-auto flex flex-col md:flex-row gap-4">
              <input type="email" placeholder="Your email address" className="flex-grow bg-transparent border-b-2 border-[var(--color-bg)]/20 focus:border-[var(--color-gold-mid)] focus:outline-none text-[var(--color-bg)] placeholder:text-[var(--color-bg)]/40 font-light py-3 text-sm" />
              <button className="bg-[var(--color-bg)] text-[var(--color-gold)] px-8 py-3 font-sans text-xs uppercase tracking-widest font-semibold rounded-sm hover:bg-[var(--color-bg-high)] transition-colors">Subscribe</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
