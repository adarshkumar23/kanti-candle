"use client";

import Link from "next/link";
import { useState } from "react";
import { products } from "@/data/products";

const featuredProducts = products.slice(0, 2);

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setSubmitted(true);
    setEmail("");
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div>
      {/* ── SECTION 1: Hero ─────────────────────────────────── */}
      <section
        className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center text-center px-4"
        style={{
          background:
            "radial-gradient(ellipse at 50% 60%, rgba(201,168,76,0.08) 0%, transparent 70%), #131313",
        }}
      >
        {/* Subtle candle glow orb */}
        <div
          className="absolute pointer-events-none"
          style={{
            bottom: "20%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "320px",
            height: "320px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        <div className="relative z-10 flex flex-col items-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#cac5be] mb-6">
            Artisanal Candles
          </p>
          <h1
            className="serif-italic nocturnal-glow"
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontStyle: "italic",
              fontSize: "clamp(3.5rem, 10vw, 7rem)",
              fontWeight: 400,
              lineHeight: 1,
              color: "#e5e2e1",
            }}
          >
            Set the Mood.
          </h1>
          <p className="text-[11px] uppercase tracking-[0.25em] text-[#cac5be] mt-6 max-w-xs">
            Artisanal scents, hand-poured in Gurgaon
          </p>
          <p className="text-sm text-[#e6c364] mt-2">From ₹1,350</p>
          <Link
            href="/shop"
            className="btn-gold px-10 py-4 text-[10px] uppercase tracking-[0.2em] rounded-sm mt-8 inline-block"
          >
            Explore Collection
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="material-symbols-outlined text-[#cac5be] animate-bounce" style={{ fontSize: "18px" }}>
            keyboard_arrow_down
          </span>
        </div>
      </section>

      {/* ── SECTION 2: Marquee Strip ────────────────────────── */}
      <div className="bg-[#1c1c1c] py-3 overflow-hidden">
        <div className="marquee-track">
          {/* Duplicated for seamless loop */}
          {[0, 1].map((dupe) => (
            <span key={dupe} className="flex items-center shrink-0" aria-hidden={dupe === 1}>
              {[
                "Free Shipping Above ₹999",
                "80–100 Hour Burn",
                "Gift Packaging Available",
                "Hand-Poured in Gurgaon",
                "Premium Soy Wax",
              ].map((text, i) => (
                <span key={i} className="flex items-center">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#6e6754] px-4">
                    {text}
                  </span>
                  <span className="text-[#e6c364] text-xs">✦</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ── SECTION 3: Handcrafted Signatures ───────────────── */}
      <section className="bg-[#1c1c1c] py-24 px-4 md:px-8 lg:px-16">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h2
              className="serif-italic text-3xl"
              style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: "italic" }}
            >
              Handcrafted Signatures
            </h2>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#6e6754] mt-2">
              Each vessel tells a story
            </p>
          </div>

          {/* 2-col asymmetric product grid */}
          <div className="grid grid-cols-2 gap-4 md:gap-8">
            {featuredProducts.map((p, i) => (
              <Link
                key={p.slug}
                href={`/shop/${p.slug}`}
                className={`group relative card-hover ${i === 1 ? "mt-8" : ""}`}
              >
                <div className="aspect-[3/4] relative overflow-hidden rounded-sm bg-[#202020]">
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-[700ms] group-hover:scale-105"
                  />
                  {/* Glass chip at bottom */}
                  <div className="glass-note absolute bottom-3 left-3 right-3 rounded-sm px-3 py-2">
                    <p className="text-[9px] uppercase tracking-[0.15em] text-[#c9a675]">
                      {p.scentNotes.join(" · ")}
                    </p>
                  </div>
                </div>
                <div className="mt-3">
                  <p
                    className="serif-italic text-lg text-[#e5e2e1] group-hover:text-[#e6c364] transition-colors duration-300"
                    style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: "italic" }}
                  >
                    {p.name}
                  </p>
                  <p className="text-sm text-[#e6c364] mt-1">
                    From ₹{p.sizes[0].price.toLocaleString("en-IN")}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/shop"
              className="text-[10px] uppercase tracking-[0.2em] text-[#e6c364] border-b border-[#e6c364]/25 pb-1 hover:border-[#e6c364] transition-colors"
            >
              View All Candles →
            </Link>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: Mood Pairing ──────────────────────────── */}
      <section className="bg-[#131313] py-24 px-4 md:px-8 lg:px-16">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <h2
              className="serif-italic text-3xl"
              style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: "italic" }}
            >
              Mood Pairings
            </h2>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#6e6754] mt-2">
              Find your perfect match
            </p>
          </div>

          <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
            {/* Cozy */}
            <div className="group w-64 min-w-[256px] aspect-square relative overflow-hidden rounded-sm shrink-0 cursor-pointer">
              <div
                className="absolute inset-0 transition-transform duration-[700ms] group-hover:scale-110"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(201,100,50,0.5) 0%, rgba(30,15,5,0.9) 100%)",
                }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <span className="material-symbols-outlined text-[#e6c364]" style={{ fontSize: "36px" }}>
                  fireplace
                </span>
                <p
                  className="serif-italic text-2xl text-[#e5e2e1]"
                  style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: "italic" }}
                >
                  Cozy
                </p>
                <p className="text-[9px] uppercase tracking-[0.15em] text-[#cac5be]/60">
                  Warm & Inviting
                </p>
              </div>
            </div>

            {/* Romantic */}
            <div className="group w-64 min-w-[256px] aspect-square relative overflow-hidden rounded-sm shrink-0 cursor-pointer">
              <div
                className="absolute inset-0 transition-transform duration-[700ms] group-hover:scale-110"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(150,30,60,0.6) 0%, rgba(20,5,10,0.95) 100%)",
                }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <span className="material-symbols-outlined text-[#e6c364]" style={{ fontSize: "36px" }}>
                  favorite
                </span>
                <p
                  className="serif-italic text-2xl text-[#e5e2e1]"
                  style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: "italic" }}
                >
                  Romantic
                </p>
                <p className="text-[9px] uppercase tracking-[0.15em] text-[#cac5be]/60">
                  Deep & Sensual
                </p>
              </div>
            </div>

            {/* Focused */}
            <div className="group w-64 min-w-[256px] aspect-square relative overflow-hidden rounded-sm shrink-0 cursor-pointer">
              <div
                className="absolute inset-0 transition-transform duration-[700ms] group-hover:scale-110"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(40,70,90,0.6) 0%, rgba(5,10,15,0.95) 100%)",
                }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <span className="material-symbols-outlined text-[#e6c364]" style={{ fontSize: "36px" }}>
                  self_improvement
                </span>
                <p
                  className="serif-italic text-2xl text-[#e5e2e1]"
                  style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: "italic" }}
                >
                  Focused
                </p>
                <p className="text-[9px] uppercase tracking-[0.15em] text-[#cac5be]/60">
                  Clear & Grounded
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 5: Story ─────────────────────────────────── */}
      <section className="bg-[#0d0d0d] py-32 px-4 md:px-8 text-center">
        <div className="max-w-xl mx-auto">
          <p
            className="serif-italic text-2xl md:text-4xl text-[#e5e2e1] leading-snug"
            style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: "italic" }}
          >
            Born from a belief that every space deserves a soul.
          </p>
          <div className="w-12 h-[1px] bg-[#4d4637] mx-auto my-8" />
          <blockquote
            className="border-l border-[#c9a84c]/30 pl-6 text-left max-w-sm mx-auto"
          >
            <p
              className="serif-italic text-[#cac5be] text-base leading-relaxed"
              style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: "italic" }}
            >
              We hand-pour every candle in small batches in Gurgaon, obsessing over each note, each vessel, each flame. Because a candle isn&apos;t just wax — it&apos;s memory, atmosphere, intention.
            </p>
          </blockquote>
          <Link
            href="/about"
            className="mt-10 inline-block text-[10px] uppercase tracking-[0.2em] text-[#e6c364] border-b border-[#e6c364]/25 pb-1 hover:border-[#e6c364] transition-colors"
          >
            Our Story →
          </Link>
        </div>
      </section>

      {/* ── SECTION 6: Scent Quiz CTA ───────────────────────── */}
      <section className="px-4 md:px-6 my-24">
        <div className="max-w-5xl mx-auto bg-[#252525] p-8 md:p-12 rounded-sm text-center">
          <span className="material-symbols-outlined text-[#e6c364] mb-4 block" style={{ fontSize: "40px" }}>
            psychology_alt
          </span>
          <h2
            className="serif-italic text-3xl md:text-4xl text-[#e5e2e1]"
            style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: "italic" }}
          >
            Find Your Essence
          </h2>
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#6e6754] mt-3 mb-8 max-w-sm mx-auto">
            Answer five questions. Discover the candle that was made for you.
          </p>
          <Link
            href="/quiz"
            className="btn-gold inline-block w-full md:w-auto px-12 py-4 text-[10px] uppercase tracking-[0.2em] rounded-sm"
          >
            Begin the Scent Quiz
          </Link>
        </div>
      </section>

      {/* ── SECTION 7: Newsletter ───────────────────────────── */}
      <section className="bg-[#1c1c1c] py-24 px-4 md:px-8 text-center">
        <div className="max-w-sm mx-auto">
          <h2
            className="serif-italic text-3xl text-[#e5e2e1]"
            style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: "italic" }}
          >
            Join the Kanti
          </h2>
          <p className="text-[11px] text-[#6e6754] mt-4 mb-8 leading-relaxed">
            Be the first to know about new collections and exclusive offers. Claim 10% off your first order.
          </p>
          <form onSubmit={handleNewsletter} className="flex flex-col gap-4">
            <input
              type="email"
              className="input-line w-full py-3 text-sm"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              disabled={submitted}
              className="btn-gold w-full py-4 text-[10px] uppercase tracking-[0.2em] rounded-sm disabled:opacity-50"
            >
              {submitted ? "Check your inbox ✓" : "Claim 10% Off"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
