"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Star, Sparkles, Gift, ChevronRight } from "lucide-react";
import { products } from "@/data/products";
import ScentQuiz from "@/components/ScentQuiz";
import GiftingStudio from "@/components/GiftingStudio";
import CountdownTimer from "@/components/CountdownTimer";
import BatchCounter from "@/components/BatchCounter";
import BurnVisualizer from "@/components/BurnVisualizer";
import ScentRadar from "@/components/ScentRadar";
import EmberParticles from "@/components/EmberParticles";

const FEATURED = products.slice(0, 6);

const TESTIMONIALS = [
  {
    quote: "The Midnight Rose fills our entire living room. I've never experienced a candle that transports you so completely.",
    author: "Priya M.",
    location: "New Delhi",
    gradient: "from-[#2d0a1e] via-[#1a0810] to-[#0d0d0d]",
  },
  {
    quote: "Every batch is handcrafted and you can tell. The burn is clean, the throw is incredible. Worth every rupee.",
    author: "Arjun K.",
    location: "Mumbai",
    gradient: "from-[#0a1a2d] via-[#08101a] to-[#0d0d0d]",
  },
  {
    quote: "I gifted Saffron & Oud to my mother-in-law. She called it 'the best candle she's ever had'. Kanti is special.",
    author: "Sneha R.",
    location: "Bangalore",
    gradient: "from-[#1a1408] via-[#120e06] to-[#0d0d0d]",
  },
];

const MOOD_BOARDS = [
  { mood: "Cozy",     icon: "🛋️", desc: "Sandalwood · Vanilla · Cedar",    product: "sacred-sandalwood", candle: "Sacred Sandalwood", playlist: "Lo-fi Rainy Day" },
  { mood: "Romantic", icon: "🌹", desc: "Rose · Jasmine · Tuberose",        product: "temple-bloom",      candle: "Temple Bloom",      playlist: "Slow Jazz Evenings" },
  { mood: "Focused",  icon: "📿", desc: "Citrus · Bergamot · Mint",         product: "citrus-dawn",       candle: "Citrus Dawn",        playlist: "Deep Focus Beats" },
  { mood: "Festive",  icon: "✨", desc: "Saffron · Amber · Cardamom",       product: "golden-saffron",    candle: "Golden Saffron",    playlist: "Bollywood Classics" },
];

export default function Home() {
  const [showQuiz,    setShowQuiz]    = useState(false);
  const [showGifting, setShowGifting] = useState(false);
  const [activeMood,  setActiveMood]  = useState<number | null>(null);
  const [email,       setEmail]       = useState("");
  const [subscribed,  setSubscribed]  = useState(false);
  const revealRefs = useRef<(HTMLElement | null)[]>([]);

  /* Intersection-based reveal */
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) (e.target as HTMLElement).classList.add("visible"); }),
      { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
    );
    revealRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  function addRevealRef(el: HTMLElement | null) {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el);
  }

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  }

  return (
    <div className="bg-[var(--color-bg-main)]">
      {showQuiz    && <ScentQuiz     onClose={() => setShowQuiz(false)}    />}
      {showGifting && <GiftingStudio onClose={() => setShowGifting(false)} />}

      {/* ─────────────────────────────────────────
          HERO
      ───────────────────────────────────────── */}
      <section className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden pt-[72px]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#060606] via-[#0d0905] to-[#0d0d0d]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(201,168,76,0.09),transparent)]" />
        <EmberParticles />

        <div className="relative z-10 text-center px-5 w-full max-w-2xl mx-auto">
          {/* Eyebrow */}
          <p className="font-sans text-[8px] sm:text-[9px] uppercase tracking-[0.28em] sm:tracking-[0.4em] text-[var(--color-gold)] mb-5 animate-[fadeUp_0.6s_0.1s_both]">
            Hand-Poured in Gurgaon · Small Batch · Pure Soy
          </p>

          {/* Headline */}
          <h1
            className="font-display text-[var(--color-cream)] mb-5 animate-[fadeUp_0.7s_0.2s_both]"
            style={{ fontSize: "clamp(3rem, 14vw, 7.5rem)", lineHeight: 0.92 }}
          >
            Set the<br />
            <em className="text-gold-gradient not-italic">Mood.</em>
          </h1>

          {/* Sub */}
          <p className="font-sans text-sm sm:text-base text-[var(--color-cream-dim)] max-w-sm sm:max-w-lg mx-auto mb-8 leading-relaxed animate-[fadeUp_0.7s_0.35s_both]">
            Luxury soy candles crafted with rare fragrance oils —
            warm, long-lasting, made for moments that matter.
          </p>

          {/* CTAs — full-width on mobile */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center animate-[fadeUp_0.7s_0.45s_both] px-0 sm:px-6">
            <Link
              href="/shop"
              className="btn-gold w-full sm:w-auto px-8 py-4 rounded-sm inline-flex items-center justify-center gap-2 text-xs"
            >
              Explore Collection <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <button
              onClick={() => setShowQuiz(true)}
              className="btn-outline w-full sm:w-auto px-8 py-4 rounded-sm inline-flex items-center justify-center gap-2 text-xs"
            >
              <Sparkles className="w-3.5 h-3.5" /> Find My Scent
            </button>
          </div>

          {/* Trust bar */}
          <p className="font-sans text-[9px] text-[var(--color-faint)] mt-6 animate-[fadeUp_0.7s_0.55s_both]">
            From ₹1,350 &nbsp;·&nbsp; Free shipping ₹999+ &nbsp;·&nbsp; 80–100 hr burn
          </p>
        </div>

        {/* Scroll line */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-[fadeUp_0.7s_0.7s_both]">
          <div className="w-px h-8 sm:h-10 bg-gradient-to-b from-[rgba(201,168,76,0.5)] to-transparent animate-pulse" />
        </div>
      </section>

      {/* ─────────────────────────────────────────
          MARQUEE
      ───────────────────────────────────────── */}
      <div className="bg-[rgba(201,168,76,0.06)] border-y border-[rgba(201,168,76,0.1)] py-2.5 overflow-hidden">
        <div className="marquee-track">
          {Array.from({ length: 4 }).flatMap((_, i) => [
            <span key={`a${i}`} className="font-sans text-[8px] uppercase tracking-[0.28em] text-[var(--color-gold)] mx-6">Free Shipping ₹999+</span>,
            <span key={`b${i}`} className="text-[var(--color-gold)] mx-2 opacity-40">✦</span>,
            <span key={`c${i}`} className="font-sans text-[8px] uppercase tracking-[0.28em] text-[var(--color-gold)] mx-6">80–100 Hour Burn</span>,
            <span key={`d${i}`} className="text-[var(--color-gold)] mx-2 opacity-40">✦</span>,
            <span key={`e${i}`} className="font-sans text-[8px] uppercase tracking-[0.28em] text-[var(--color-gold)] mx-6">100% Pure Soy Wax</span>,
            <span key={`f${i}`} className="text-[var(--color-gold)] mx-2 opacity-40">✦</span>,
            <span key={`g${i}`} className="font-sans text-[8px] uppercase tracking-[0.28em] text-[var(--color-gold)] mx-6">Luxury Gift Packaging</span>,
            <span key={`h${i}`} className="text-[var(--color-gold)] mx-2 opacity-40">✦</span>,
          ])}
        </div>
      </div>

      {/* ─────────────────────────────────────────
          SEASONAL DROP BANNER
      ───────────────────────────────────────── */}
      <section ref={addRevealRef} className="reveal bg-[var(--color-bg-deep)] border-b border-[rgba(201,168,76,0.15)] py-10 sm:py-14 px-5">
        <div className="max-w-2xl mx-auto text-center">
          <p className="font-sans text-[8px] uppercase tracking-[0.3em] text-[var(--color-gold)] mb-2">Limited Seasonal Drop</p>
          <h2 className="font-display text-2xl sm:text-4xl text-[var(--color-cream)] italic mb-2">Spring Equinox Collection</h2>
          <p className="font-sans text-xs sm:text-sm text-[var(--color-faint)] mb-7">New batch drops on the 1st. Be the first to know.</p>
          <CountdownTimer />
        </div>
      </section>

      {/* ─────────────────────────────────────────
          FEATURED PRODUCTS
      ───────────────────────────────────────── */}
      <section className="py-14 sm:py-20 px-4 sm:px-6">
        <div className="container">
          <div ref={addRevealRef} className="reveal text-center mb-10 sm:mb-14">
            <p className="font-sans text-[8px] uppercase tracking-[0.3em] text-[var(--color-gold)] mb-3">The Collection</p>
            <h2 className="font-display text-3xl sm:text-5xl text-[var(--color-cream)] italic">Handcrafted Signatures</h2>
            <div className="ornament-divider mt-3 max-w-[200px] sm:max-w-xs mx-auto"><span>✦</span></div>
          </div>

          {/* 2-col on mobile, 3-col on desktop */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {FEATURED.map((product, i) => (
              <div key={product.slug} ref={addRevealRef} className="reveal" style={{ transitionDelay: `${i * 70}ms` }}>
                <Link href={`/shop/${product.slug}`} className="block group card-hover bg-[var(--color-bg-card)] rounded-sm overflow-hidden">
                  {/* Image */}
                  <div className="aspect-square sm:aspect-[4/5] overflow-hidden bg-[var(--color-bg-deep)] relative">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                    {/* Scent radar — desktop only */}
                    {product.scentProfile && (
                      <div className="hidden sm:block absolute top-3 right-3">
                        <ScentRadar profile={product.scentProfile} />
                      </div>
                    )}

                    {/* Category badge */}
                    <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
                      <span className="font-sans text-[7px] sm:text-[8px] uppercase tracking-widest text-[var(--color-gold)] bg-black/60 px-2 py-0.5 rounded-sm">
                        {product.category}
                      </span>
                    </div>

                    {/* Price on image — mobile only */}
                    <div className="absolute bottom-2 right-2 sm:hidden">
                      <span className="font-sans text-xs font-bold text-white bg-black/70 px-2 py-0.5 rounded-sm">
                        ₹{product.price.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="p-3 sm:p-5">
                    <div className="flex justify-between items-start gap-1">
                      <h3 className="font-display text-base sm:text-xl text-[var(--color-cream)] leading-tight">{product.name}</h3>
                      {/* Price — desktop only */}
                      <span className="hidden sm:block font-sans text-sm font-semibold text-[var(--color-gold)] shrink-0">
                        ₹{product.price.toLocaleString("en-IN")}
                      </span>
                    </div>

                    {/* Scent notes */}
                    {product.scentNotes && (
                      <p className="font-sans text-[9px] sm:text-xs text-[var(--color-faint)] mt-1 leading-relaxed line-clamp-1">
                        {product.scentNotes.slice(0, 3).join(" · ")}
                      </p>
                    )}

                    {/* Burn time — desktop only */}
                    <div className="hidden sm:flex items-center justify-between mt-4 pt-3 border-t border-[rgba(201,168,76,0.08)]">
                      <BurnVisualizer burnTime={product.burnTime} size="sm" />
                      <span className="font-sans text-[9px] uppercase tracking-widest text-[var(--color-faint)]">{product.weight}</span>
                    </div>

                    {/* Mobile tap hint */}
                    <div className="sm:hidden flex items-center gap-1 mt-2">
                      <span className="font-sans text-[8px] uppercase tracking-widest text-[var(--color-gold)] opacity-70">View</span>
                      <ChevronRight className="w-2.5 h-2.5 text-[var(--color-gold)] opacity-70" />
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <div ref={addRevealRef} className="reveal text-center mt-8 sm:mt-12">
            <Link href="/shop" className="btn-outline w-full sm:w-auto px-10 py-4 rounded-sm inline-flex items-center justify-center gap-2">
              View All Candles <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          SCENT QUIZ CTA
      ───────────────────────────────────────── */}
      <section ref={addRevealRef} className="reveal py-10 sm:py-14 px-4 sm:px-6 bg-[var(--color-bg-deep)]">
        <div className="container">
          <div className="border border-[rgba(201,168,76,0.2)] rounded-sm p-6 sm:p-12 text-center bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.05),transparent_70%)]">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[rgba(201,168,76,0.08)] border border-[rgba(201,168,76,0.2)] flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--color-gold)]" />
            </div>
            <h2 className="font-display text-2xl sm:text-4xl text-[var(--color-cream)] italic mb-3">
              Not sure which scent?
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[var(--color-faint)] mb-7 max-w-sm mx-auto leading-relaxed">
              Answer 3 quick questions and we&apos;ll recommend your perfect candle.
            </p>
            <button
              onClick={() => setShowQuiz(true)}
              className="btn-gold w-full sm:w-auto px-10 py-4 rounded-sm inline-flex items-center justify-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5" /> Take the Scent Quiz
            </button>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          MOOD BOARD — horizontal scroll on mobile
      ───────────────────────────────────────── */}
      <section className="py-14 sm:py-20 overflow-hidden">
        <div className="container px-4 sm:px-6">
          <div ref={addRevealRef} className="reveal text-center mb-8 sm:mb-12">
            <p className="font-sans text-[8px] uppercase tracking-[0.3em] text-[var(--color-gold)] mb-3">Mood Pairing</p>
            <h2 className="font-display text-3xl sm:text-5xl text-[var(--color-cream)] italic">Set the Scene</h2>
          </div>
        </div>

        {/* Scroll container — no horizontal padding on mobile so cards reach edge */}
        <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory no-sb px-4 sm:px-0 sm:grid sm:grid-cols-4 sm:gap-4 sm:max-w-[1200px] sm:mx-auto">
          {MOOD_BOARDS.map((m, i) => (
            <button
              key={m.mood}
              onClick={() => setActiveMood(activeMood === i ? null : i)}
              className={`snap-start shrink-0 w-[72vw] sm:w-auto text-left p-5 sm:p-6 rounded-sm border transition-all duration-300 ${
                activeMood === i
                  ? "border-[var(--color-gold)] bg-[rgba(201,168,76,0.08)]"
                  : "border-[rgba(201,168,76,0.12)] bg-[var(--color-bg-card)] hover:border-[rgba(201,168,76,0.3)]"
              }`}
            >
              <span className="text-2xl sm:text-3xl block mb-3">{m.icon}</span>
              <h3 className="font-display text-xl sm:text-2xl text-[var(--color-cream)] mb-1">{m.mood}</h3>
              <p className="font-sans text-[9px] sm:text-[10px] text-[var(--color-faint)] leading-relaxed">{m.desc}</p>
              {activeMood === i && (
                <div className="mt-4 pt-3 border-t border-[rgba(201,168,76,0.15)] animate-[fadeUp_0.3s_ease]">
                  <p className="font-sans text-[8px] uppercase tracking-widest text-[var(--color-gold)] mb-1">Recommended</p>
                  <Link
                    href={`/shop/${m.product}`}
                    className="font-display text-base sm:text-lg text-[var(--color-cream)] hover:text-[var(--color-gold)] transition-colors block"
                  >
                    {m.candle}
                  </Link>
                  <p className="font-sans text-[8px] text-[var(--color-faint)] mt-1">🎵 {m.playlist}</p>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Swipe hint — mobile only */}
        <p className="sm:hidden text-center font-sans text-[8px] uppercase tracking-[0.2em] text-[var(--color-faint)] mt-4">
          Swipe to explore →
        </p>
      </section>

      {/* ─────────────────────────────────────────
          BRAND STORY
      ───────────────────────────────────────── */}
      <section ref={addRevealRef} className="reveal py-14 sm:py-20 px-4 sm:px-6 bg-[var(--color-bg-deep)]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 items-center">
            <div>
              <p className="font-sans text-[8px] uppercase tracking-[0.3em] text-[var(--color-gold)] mb-4">Our Story</p>
              <h2 className="font-display text-3xl sm:text-5xl text-[var(--color-cream)] italic leading-tight mb-5">
                Poured slowly.<br />Crafted with care.
              </h2>
              <p className="font-sans text-sm sm:text-base text-[var(--color-cream-dim)] leading-7 sm:leading-8 mb-5">
                Kanti was born in a small Gurgaon studio, from the belief that fragrance should do more than smell good — it should slow you down, anchor you, and remind you that the ordinary can be extraordinary.
              </p>
              <p className="font-sans text-sm sm:text-base text-[var(--color-cream-dim)] leading-7 sm:leading-8 mb-8">
                Every candle is poured by hand in batches of 24. No machines. No shortcuts. Just rare fragrance oils, pure soy wax, and genuine care.
              </p>
              <div className="grid grid-cols-3 gap-4 sm:gap-6">
                {[["100%", "Pure Soy"], ["80–100hr", "Burn Time"], ["24", "Per Batch"]].map(([val, label]) => (
                  <div key={label}>
                    <div className="font-display text-2xl sm:text-3xl text-gold-gradient mb-1">{val}</div>
                    <div className="font-sans text-[8px] sm:text-[9px] uppercase tracking-widest text-[var(--color-faint)]">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {/* Candle visual */}
              <div className="aspect-square rounded-sm overflow-hidden bg-[var(--color-bg-card)] glow-ring">
                <div className="w-full h-full bg-gradient-to-br from-[#1a1208] via-[#0d0905] to-[#0d0d0d] flex items-center justify-center">
                  <svg viewBox="0 0 200 220" className="w-28 h-32 sm:w-32 sm:h-36 opacity-60">
                    <rect x="80" y="40" width="40" height="130" rx="4" fill="url(#cGrad2)" />
                    <ellipse cx="100" cy="40" rx="20" ry="6" fill="#1a1208" />
                    <line x1="100" y1="20" x2="100" y2="38" stroke="#8B7355" strokeWidth="2" />
                    <ellipse cx="100" cy="14" rx="8" ry="12" fill="url(#fGrad2)" className="flame" />
                    <defs>
                      <linearGradient id="cGrad2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#8B6914" stopOpacity="0.2" />
                      </linearGradient>
                      <linearGradient id="fGrad2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#FFE566" />
                        <stop offset="100%" stopColor="#FF4500" stopOpacity="0.6" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
              {/* BatchCounter — in-flow so no overflow clipping on mobile */}
              <BatchCounter batchSize={24} pouredDate="March 20, 2026" remaining={9} />
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          GIFTING STUDIO
      ───────────────────────────────────────── */}
      <section ref={addRevealRef} className="reveal py-10 sm:py-14 px-4 sm:px-6">
        <div className="container">
          <div className="bg-[var(--color-bg-card)] border border-[rgba(201,168,76,0.15)] rounded-sm p-6 sm:p-12 flex flex-col items-center text-center sm:flex-row sm:text-left gap-6 sm:gap-8">
            <div className="flex-1">
              <p className="font-sans text-[8px] uppercase tracking-[0.3em] text-[var(--color-gold)] mb-2">Gifting</p>
              <h2 className="font-display text-2xl sm:text-4xl text-[var(--color-cream)] italic mb-2">
                The perfect gift, personalised.
              </h2>
              <p className="font-sans text-xs sm:text-sm text-[var(--color-faint)] leading-relaxed max-w-sm mx-auto sm:mx-0">
                Pick a candle, write a message, choose your wrapping — get a beautiful gift card to include.
              </p>
            </div>
            <button
              onClick={() => setShowGifting(true)}
              className="btn-gold w-full sm:w-auto px-8 py-4 rounded-sm inline-flex items-center justify-center gap-2 shrink-0"
            >
              <Gift className="w-4 h-4" /> Open Gifting Studio
            </button>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          TESTIMONIALS — swipeable on mobile
      ───────────────────────────────────────── */}
      <section className="py-14 sm:py-20 bg-[var(--color-bg-deep)] overflow-hidden">
        <div className="container px-4 sm:px-6">
          <div ref={addRevealRef} className="reveal text-center mb-8 sm:mb-12">
            <p className="font-sans text-[8px] uppercase tracking-[0.3em] text-[var(--color-gold)] mb-3">What People Say</p>
            <h2 className="font-display text-3xl sm:text-5xl text-[var(--color-cream)] italic">Stories of Light</h2>
          </div>
        </div>

        {/* Mobile: horizontal snap scroll — Desktop: 3-col grid */}
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-sb px-4 sm:px-0 sm:grid sm:grid-cols-3 sm:gap-6 sm:max-w-[1200px] sm:mx-auto">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="snap-start shrink-0 w-[85vw] sm:w-auto rounded-sm overflow-hidden border border-[rgba(201,168,76,0.12)]"
            >
              <div className={`bg-gradient-to-br ${t.gradient} p-6 sm:p-8 h-full flex flex-col min-h-[220px] sm:min-h-0`}>
                <div className="flex gap-0.5 mb-3 sm:mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-[var(--color-gold)] text-[var(--color-gold)]" />
                  ))}
                </div>
                <p className="font-display text-base sm:text-lg italic text-[var(--color-cream)] leading-relaxed flex-1 mb-5">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <p className="font-sans text-sm font-semibold text-[var(--color-gold)]">{t.author}</p>
                  <p className="font-sans text-[9px] uppercase tracking-widest text-[var(--color-faint)]">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="sm:hidden text-center font-sans text-[8px] uppercase tracking-[0.2em] text-[var(--color-faint)] mt-4">
          Swipe to read more →
        </p>
      </section>

      {/* ─────────────────────────────────────────
          NEWSLETTER
      ───────────────────────────────────────── */}
      <section ref={addRevealRef} className="reveal py-14 sm:py-20 px-4 sm:px-6">
        <div className="container max-w-2xl text-center">
          <div className="ornament-divider mb-6 sm:mb-8 opacity-40 max-w-[200px] sm:max-w-full mx-auto"><span>✦</span></div>
          <p className="font-sans text-[8px] uppercase tracking-[0.3em] text-[var(--color-gold)] mb-3">Stay in the Light</p>
          <h2 className="font-display text-3xl sm:text-5xl text-[var(--color-cream)] italic mb-3">
            10% off your first order.
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[var(--color-faint)] leading-relaxed mb-7">
            Subscribe for early access to new drops, candle rituals, and a welcome discount.
          </p>
          {!subscribed ? (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="input-luxury flex-1 px-4 sm:px-5 py-4 rounded-sm font-sans text-sm"
              />
              <button type="submit" className="btn-gold w-full sm:w-auto px-7 py-4 rounded-sm shrink-0">
                Claim 10% Off
              </button>
            </form>
          ) : (
            <div className="bg-[rgba(201,168,76,0.06)] border border-[rgba(201,168,76,0.2)] rounded-sm px-6 sm:px-8 py-5 inline-block">
              <p className="font-display text-xl italic text-[var(--color-gold-light)]">Welcome to Kanti. ✦</p>
              <p className="font-sans text-xs text-[var(--color-faint)] mt-1">Your discount code is on its way.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
