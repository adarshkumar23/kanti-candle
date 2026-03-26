"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Shop() {
  const addToCart = () => {
    alert("Currently Out of Stock. Please check back later!");
  };

  useEffect(() => {
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
    <div className="pt-24 min-h-screen">
      {/* Header */}
      <div className="px-6 md:px-12 lg:px-24 py-16 border-b border-[var(--color-border)]/20">
        <p className="font-sans text-[10px] uppercase tracking-[0.35em] text-[var(--color-gold-mid)] mb-3">Kanti Candle</p>
        <h1 className="font-display text-6xl md:text-7xl font-light">Shop All</h1>
        <p className="font-sans text-[var(--color-faint)] text-sm mt-3">Handcrafted luxury candles — 24 products</p>
      </div>

      {/* Filter Bar */}
      <div className="sticky top-[68px] z-40 glass border-b border-[var(--color-border)]/15">
        <div className="max-w-7xl mx-auto px-6 py-4 overflow-x-auto no-sb flex items-center gap-8 whitespace-nowrap">
          <span className="font-sans text-[9px] uppercase tracking-widest text-[var(--color-faint)] shrink-0">Filter:</span>
          <button className="font-sans text-[10px] uppercase tracking-widest text-[var(--color-gold)] border-b border-[var(--color-gold)]/30 pb-0.5 shrink-0">All</button>
          <button className="font-sans text-[10px] uppercase tracking-widest text-[var(--color-muted)]/60 hover:text-[var(--color-gold)] transition-colors shrink-0">Floral</button>
          <button className="font-sans text-[10px] uppercase tracking-widest text-[var(--color-muted)]/60 hover:text-[var(--color-gold)] transition-colors shrink-0">Woody</button>
          <button className="font-sans text-[10px] uppercase tracking-widest text-[var(--color-muted)]/60 hover:text-[var(--color-gold)] transition-colors shrink-0">Oriental</button>
          <button className="font-sans text-[10px] uppercase tracking-widest text-[var(--color-muted)]/60 hover:text-[var(--color-gold)] transition-colors shrink-0">Citrus</button>
          <div className="h-4 w-px bg-[var(--color-border)]/40 shrink-0"></div>
          <button className="font-sans text-[10px] uppercase tracking-widest text-[var(--color-muted)]/60 hover:text-[var(--color-gold)] transition-colors shrink-0">Under ₹2,000</button>
          <button className="font-sans text-[10px] uppercase tracking-widest text-[var(--color-muted)]/60 hover:text-[var(--color-gold)] transition-colors shrink-0">₹2,000 – ₹3,000</button>
          <button className="font-sans text-[10px] uppercase tracking-widest text-[var(--color-muted)]/60 hover:text-[var(--color-gold)] transition-colors shrink-0">Bestsellers</button>
          <div className="ml-auto flex items-center gap-2 shrink-0">
            <span className="font-sans text-[9px] uppercase tracking-widest text-[var(--color-faint)]">Sort:</span>
            <select className="bg-transparent font-sans text-[10px] uppercase tracking-widest text-[var(--color-muted)] focus:outline-none cursor-pointer">
              <option>Best Selling</option>
              <option>Price: Low to High</option>
              <option>Newest</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">

          {/* Product 1 */}
          <div className="prod-card group cursor-pointer reveal">
            <div className="prod-img-wrap rounded-sm mb-6 relative">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCZ8uEKjqePVk15g-8h40CLySWAgVkEqSByQQzERKpIBL3cBnaeOwwIMf--tDt3xz6UFIc-OyyCk8plIQ8D5gWuO28leaUybiDgDpAXYfzqenABQpzAY9hVUfEGb7oBWK-TiluYCO3aZRB5DSGQTfQRMnRCocOjJi5BkAZC_KAjhU0HnXk-szCLIXKgqUFpGpPjjvdA" alt="Luxury Amber Candle" />
              <div className="absolute top-4 left-4 bg-[var(--color-gold-mid)] text-[var(--color-bg-deep)] px-3 py-1 text-[9px] font-bold tracking-[0.2em] uppercase rounded-full">Bestseller</div>
              <div className="quick-buy absolute inset-0 bg-[var(--color-bg)]/50 flex items-center justify-center rounded-sm">
                <button disabled className="bg-[var(--color-bg-card)] cursor-not-allowed text-[var(--color-faint)] px-7 py-3 text-[9px] font-bold uppercase tracking-widest rounded-full opacity-60">Out of Stock</button>
              </div>
            </div>
            <p className="font-sans text-[9px] text-[var(--color-gold)]/50 uppercase tracking-[0.25em] mb-1.5">Oriental Series</p>
            <h3 className="font-display text-2xl mb-1.5 group-hover:text-[var(--color-gold)] transition-colors">Luxury Amber</h3>
            <p className="font-sans text-[var(--color-faint)] text-xs tracking-wider mb-3">Amber · Oud · Cedarwood</p>
            <div className="flex justify-between items-center">
              <span className="font-sans text-[var(--color-gold-mid)] font-semibold tracking-wider">₹2,400</span>
              <span className="font-sans text-[var(--color-faint)] text-[9px] uppercase tracking-wider">45–55 hrs burn</span>
            </div>
          </div>

          {/* Product 2 */}
          <div className="prod-card group cursor-pointer reveal" style={{ transitionDelay: "100ms" }}>
            <div className="prod-img-wrap rounded-sm mb-6 relative">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzvJ73WuY64668n7wCYJHK3dEqiuFnaI9W_O7S6eSiQXZ_G97Zgbo9g5VAYqL4NUzdKcHzNpIF3Q44OG6bVX_YbHBdLlioLrjpAZPhJV3t7Q2iGB7aIyUkrpbqpcr4dA" alt="Sacred Sandalwood" />
              <div className="absolute top-4 left-4 bg-[var(--color-gold)] text-[var(--color-bg-deep)] px-3 py-1 text-[9px] font-bold tracking-[0.2em] uppercase rounded-full">New</div>
              <div className="quick-buy absolute inset-0 bg-[var(--color-bg)]/50 flex items-center justify-center rounded-sm">
                <button disabled className="bg-[var(--color-bg-card)] cursor-not-allowed text-[var(--color-faint)] px-7 py-3 text-[9px] font-bold uppercase tracking-widest rounded-full opacity-60">Out of Stock</button>
              </div>
            </div>
            <p className="font-sans text-[9px] text-[var(--color-gold)]/50 uppercase tracking-[0.25em] mb-1.5">Earthy Series</p>
            <h3 className="font-display text-2xl mb-1.5 group-hover:text-[var(--color-gold)] transition-colors">Sacred Sandalwood</h3>
            <p className="font-sans text-[var(--color-faint)] text-xs tracking-wider mb-3">Sandalwood · Musk · Vanilla</p>
            <div className="flex justify-between items-center">
              <span className="font-sans text-[var(--color-gold-mid)] font-semibold tracking-wider">₹1,850</span>
              <span className="font-sans text-[var(--color-faint)] text-[9px] uppercase tracking-wider">40–50 hrs burn</span>
            </div>
          </div>

          {/* Product 3 */}
          <div className="prod-card group cursor-pointer reveal" style={{ transitionDelay: "200ms" }}>
            <div className="prod-img-wrap rounded-sm mb-6 relative">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCV5m1YSJ6tgeGf79eOKWZAG4COFw3XJQSdHsZoQOXps3EM77zdD2H0VLT4v7nN2yOh6TGaQEIBhB2ugIPUaG0k9G6C5FZ8nbAELpzbdTKj4BV9mWXyPRaVIeLJQvLe2ZHeXR-wDz_lXoCQD84YOlLFybBmIBDFBBfIh_6R" alt="Temple Bloom" />
              <div className="quick-buy absolute inset-0 bg-[var(--color-bg)]/50 flex items-center justify-center rounded-sm">
                <button disabled className="bg-[var(--color-bg-card)] cursor-not-allowed text-[var(--color-faint)] px-7 py-3 text-[9px] font-bold uppercase tracking-widest rounded-full opacity-60">Out of Stock</button>
              </div>
            </div>
            <p className="font-sans text-[9px] text-[var(--color-gold)]/50 uppercase tracking-[0.25em] mb-1.5">Floral Series</p>
            <h3 className="font-display text-2xl mb-1.5 group-hover:text-[var(--color-gold)] transition-colors">Temple Bloom</h3>
            <p className="font-sans text-[var(--color-faint)] text-xs tracking-wider mb-3">Jasmine · Tuberose · Incense</p>
            <div className="flex justify-between items-center">
              <span className="font-sans text-[var(--color-gold-mid)] font-semibold tracking-wider">₹1,750</span>
              <span className="font-sans text-[var(--color-faint)] text-[9px] uppercase tracking-wider">38–45 hrs burn</span>
            </div>
          </div>

        </div>

        {/* Load More */}
        <div className="text-center mt-16 reveal">
          <button className="btn-outline px-12 py-4 font-sans text-xs uppercase tracking-[0.22em] font-semibold rounded-sm">Load More</button>
        </div>
      </div>
    </div>
  );
}
