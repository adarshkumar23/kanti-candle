"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Star, Sparkles, Gift } from "lucide-react";
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
    quote: "The Luxury Amber fills our entire living room. I've never experienced a candle that transports you so completely.",
    author: "Priya M.", location: "New Delhi",
    gradient: "from-[#2d0a1e] via-[#1a0810] to-[#0d0d0d]",
  },
  {
    quote: "Every batch is handcrafted and you can tell. The burn is clean, the throw is incredible. Worth every rupee.",
    author: "Arjun K.", location: "Mumbai",
    gradient: "from-[#0a1a2d] via-[#08101a] to-[#0d0d0d]",
  },
  {
    quote: "I gifted Golden Saffron to my mother-in-law. She called it 'the best candle she's ever had'. Kanti is special.",
    author: "Sneha R.", location: "Bangalore",
    gradient: "from-[#1a1408] via-[#120e06] to-[#0d0d0d]",
  },
];

const MOOD_BOARDS = [
  { mood: "Cozy", icon: "🛋️", desc: "Sandalwood · Warm Vanilla · Cedar", product: "sacred-sandalwood", candle: "Sacred Sandalwood", playlist: "Lo-fi Rainy Day" },
  { mood: "Romantic", icon: "🌹", desc: "Rose · Jasmine · Tuberose", product: "temple-bloom", candle: "Temple Bloom", playlist: "Slow Jazz Evenings" },
  { mood: "Focused", icon: "📿", desc: "Citrus · Bergamot · Lemongrass", product: "citrus-dawn", candle: "Citrus Dawn", playlist: "Deep Focus Beats" },
  { mood: "Festive", icon: "✨", desc: "Saffron · Amber · Rose", product: "golden-saffron", candle: "Golden Saffron", playlist: "Bollywood Classics" },
];

export default function Home() {
  const [showQuiz, setShowQuiz] = useState(false);
  const [showGifting, setShowGifting] = useState(false);
  const [activeMood, setActiveMood] = useState<number | null>(null);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const revealRefs = useRef<(HTMLElement | null)[]>([]);

  // Reveal on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { (e.target as HTMLElement).classList.add("visible"); } }),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
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
      {showQuiz && <ScentQuiz onClose={() => setShowQuiz(false)} />}
      {showGifting && <GiftingStudio onClose={() => setShowGifting(false)} />}

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#060606] via-[#0d0905] to-[#0d0d0d]" />
        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(201,168,76,0.08),transparent)]" />
        {/* Ember particles */}
        <EmberParticles />

        {/* Vertical line */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-px h-72 bg-gradient-to-t from-[rgba(201,168,76,0.15)] to-transparent" />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="ornament-divider mb-8 opacity-50">
            <span>✦</span>
          </div>
          <p className="font-sans text-[9px] uppercase tracking-[0.4em] text-[var(--color-gold)] mb-6 animate-[fadeUp_0.6s_0.1s_both]">
            Hand-Poured in Gurgaon · Small Batch · Pure Soy
          </p>
          <h1 className="font-display text-[clamp(3.5rem,12vw,8rem)] leading-[0.9] text-[var(--color-cream)] mb-6 animate-[fadeUp_0.7s_0.2s_both]">
            Set the<br />
            <em className="text-gold-gradient not-italic">Mood.</em>
          </h1>
          <p className="font-sans text-base text-[var(--color-cream-dim)] max-w-lg mx-auto mb-10 leading-relaxed animate-[fadeUp_0.7s_0.35s_both]">
            Luxury soy candles crafted with rare fragrance oils —
            warm, long-lasting, made for the moments that matter most.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-[fadeUp_0.7s_0.45s_both]">
            <Link href="/shop" className="btn-gold px-10 py-4 rounded-sm inline-flex items-center gap-2">
              Explore Collection <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <button
              onClick={() => setShowQuiz(true)}
              className="btn-outline px-10 py-4 rounded-sm inline-flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5" /> Find My Scent
            </button>
          </div>
          <p className="font-sans text-[10px] text-[var(--color-faint)] mt-8 animate-[fadeUp_0.7s_0.55s_both]">
            Starting at ₹1,350 · Free shipping above ₹999 · 80–100 hr burn
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-[fadeUp_0.7s_0.7s_both]">
          <div className="w-px h-10 bg-gradient-to-b from-[rgba(201,168,76,0.5)] to-transparent animate-[pulse_2s_ease-in-out_infinite]" />
        </div>
      </section>

      {/* ── SEASONAL DROP BANNER ── */}
      <section ref={addRevealRef} className="reveal bg-[var(--color-bg-deep)] border-y border-[rgba(201,168,76,0.15)] py-12 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-sans text-[9px] uppercase tracking-[0.3em] text-[var(--color-gold)] mb-3">Limited Seasonal Drop</p>
          <h2 className="font-display text-3xl sm:text-4xl text-[var(--color-cream)] italic mb-2">Spring Equinox Collection</h2>
          <p className="font-sans text-sm text-[var(--color-faint)] mb-8">New batch drops on the 1st. Be the first to know.</p>
          <CountdownTimer />
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="bg-[rgba(201,168,76,0.06)] border-y border-[rgba(201,168,76,0.1)] py-3 overflow-hidden">
        <div className="marquee-track">
          {Array.from({ length: 4 }).flatMap((_, i) => [
            <span key={`a${i}`} className="font-sans text-[9px] uppercase tracking-[0.3em] text-[var(--color-gold)] mx-8">Free Shipping Above ₹999</span>,
            <span key={`b${i}`} className="text-[var(--color-gold)] mx-2 opacity-40">✦</span>,
            <span key={`c${i}`} className="font-sans text-[9px] uppercase tracking-[0.3em] text-[var(--color-gold)] mx-8">80–100 Hour Burn Time</span>,
            <span key={`d${i}`} className="text-[var(--color-gold)] mx-2 opacity-40">✦</span>,
            <span key={`e${i}`} className="font-sans text-[9px] uppercase tracking-[0.3em] text-[var(--color-gold)] mx-8">100% Pure Soy Wax</span>,
            <span key={`f${i}`} className="text-[var(--color-gold)] mx-2 opacity-40">✦</span>,
            <span key={`g${i}`} className="font-sans text-[9px] uppercase tracking-[0.3em] text-[var(--color-gold)] mx-8">Luxury Gift Packaging</span>,
            <span key={`h${i}`} className="text-[var(--color-gold)] mx-2 opacity-40">✦</span>,
          ])}
        </div>
      </div>

      {/* ── FEATURED PRODUCTS ── */}
      <section className="section px-6">
        <div className="container">
          <div ref={addRevealRef} className="reveal text-center mb-14">
            <p className="font-sans text-[9px] uppercase tracking-[0.3em] text-[var(--color-gold)] mb-3">The Collection</p>
            <h2 className="font-display text-4xl sm:text-5xl text-[var(--color-cream)] italic">Handcrafted Signatures</h2>
            <div className="ornament-divider mt-4 max-w-xs mx-auto"><span>✦</span></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURED.map((product, i) => (
              <div key={product.slug} ref={addRevealRef} className="reveal" style={{ transitionDelay: `${i * 80}ms` }}>
                <Link href={`/shop/${product.slug}`} className="block group relative card-hover bg-[var(--color-bg-card)] rounded-sm overflow-hidden">
                  {/* Image */}
                  <div className="aspect-[4/5] overflow-hidden bg-[var(--color-bg-deep)] relative">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-[400ms]" />
                    {/* Scent Radar on hover */}
                    {product.scentProfile && (
                      <div className="absolute top-4 right-4">
                        <ScentRadar profile={product.scentProfile} />
                      </div>
                    )}
                    {/* Quick add overlay */}
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                      <div className="btn-gold py-2.5 px-4 rounded-sm text-center font-sans text-[9px] uppercase tracking-widest">
                        View Details
                      </div>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-display text-xl text-[var(--color-cream)] leading-tight">{product.name}</h3>
                      <span className="font-sans text-sm font-semibold text-[var(--color-gold)]">₹{product.price.toLocaleString("en-IN")}</span>
                    </div>
                    <p className="font-sans text-[10px] text-[var(--color-faint)] uppercase tracking-widest mb-3">{product.category}</p>
                    {product.scentNotes && (
                      <p className="font-sans text-xs text-[var(--color-cream-dim)] leading-relaxed">{product.scentNotes.slice(0, 3).join(" · ")}</p>
                    )}
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-[rgba(201,168,76,0.08)]">
                      <BurnVisualizer burnTime={product.burnTime} size="sm" />
                      <span className="font-sans text-[9px] uppercase tracking-widest text-[var(--color-faint)]">{product.weight}</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <div ref={addRevealRef} className="reveal text-center mt-12">
            <Link href="/shop" className="btn-outline px-10 py-4 rounded-sm inline-flex items-center gap-2">
              View All Candles <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── SCENT QUIZ CTA ── */}
      <section ref={addRevealRef} className="reveal section-sm px-6 bg-[var(--color-bg-deep)]">
        <div className="container">
          <div className="border border-[rgba(201,168,76,0.2)] rounded-sm p-8 sm:p-12 text-center bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.05),transparent_70%)]">
            <Sparkles className="w-8 h-8 text-[var(--color-gold)] mx-auto mb-4" />
            <h2 className="font-display text-3xl sm:text-4xl text-[var(--color-cream)] italic mb-3">Not sure which scent?</h2>
            <p className="font-sans text-sm text-[var(--color-faint)] mb-8 max-w-md mx-auto leading-relaxed">
              Answer 3 quick questions and we&apos;ll recommend the perfect candle for your mood, occasion, and preferences.
            </p>
            <button onClick={() => setShowQuiz(true)} className="btn-gold px-10 py-4 rounded-sm inline-flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" /> Take the Scent Quiz
            </button>
          </div>
        </div>
      </section>

      {/* ── MOOD BOARD ── */}
      <section className="section px-6">
        <div className="container">
          <div ref={addRevealRef} className="reveal text-center mb-12">
            <p className="font-sans text-[9px] uppercase tracking-[0.3em] text-[var(--color-gold)] mb-3">Mood Pairing</p>
            <h2 className="font-display text-4xl sm:text-5xl text-[var(--color-cream)] italic">Set the Scene</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {MOOD_BOARDS.map((m, i) => (
              <button
                key={m.mood}
                ref={addRevealRef}
                onClick={() => setActiveMood(activeMood === i ? null : i)}
                className={`reveal text-left p-6 rounded-sm border transition-all duration-300 ${
                  activeMood === i
                    ? "border-[var(--color-gold)] bg-[rgba(201,168,76,0.08)]"
                    : "border-[rgba(201,168,76,0.12)] bg-[var(--color-bg-card)] hover:border-[rgba(201,168,76,0.3)]"
                }`}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <span className="text-3xl block mb-3">{m.icon}</span>
                <h3 className="font-display text-xl text-[var(--color-cream)] mb-2">{m.mood}</h3>
                <p className="font-sans text-[10px] text-[var(--color-faint)] leading-relaxed">{m.desc}</p>
                {activeMood === i && (
                  <div className="mt-4 pt-4 border-t border-[rgba(201,168,76,0.15)] animate-[fadeUp_0.3s_ease]">
                    <p className="font-sans text-[9px] uppercase tracking-widest text-[var(--color-gold)] mb-1">Recommended</p>
                    <Link href={`/shop/${m.product}`} className="font-display text-lg text-[var(--color-cream)] hover:text-[var(--color-gold)] transition-colors block">{m.candle}</Link>
                    <p className="font-sans text-[9px] text-[var(--color-faint)] mt-1">🎵 {m.playlist}</p>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── BRAND STORY ── */}
      <section ref={addRevealRef} className="reveal section px-6 bg-[var(--color-bg-deep)]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="font-sans text-[9px] uppercase tracking-[0.3em] text-[var(--color-gold)] mb-4">Our Story</p>
              <h2 className="font-display text-4xl sm:text-5xl text-[var(--color-cream)] italic leading-tight mb-6">
                Poured slowly.<br />Crafted with care.
              </h2>
              <p className="font-sans text-base text-[var(--color-cream-dim)] leading-8 mb-6">
                Kanti was born in a small Gurgaon studio, from the belief that fragrance should do more than smell good — it should slow you down, anchor you in the present, and remind you that the ordinary can be extraordinary.
              </p>
              <p className="font-sans text-base text-[var(--color-cream-dim)] leading-8 mb-8">
                Every candle is poured by hand in batches of 24. No machines. No shortcuts. Just rare fragrance oils, pure soy wax, and the kind of attention to detail that only comes from genuinely caring about what you make.
              </p>
              <div className="grid grid-cols-3 gap-6">
                {[["100%", "Pure Soy"], ["80–100hr", "Burn Time"], ["24", "Per Batch"]].map(([val, label]) => (
                  <div key={label}>
                    <div className="font-display text-3xl text-gold-gradient mb-1">{val}</div>
                    <div className="font-sans text-[9px] uppercase tracking-widest text-[var(--color-faint)]">{label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-sm overflow-hidden bg-[var(--color-bg-card)] glow-ring">
                <div className="w-full h-full bg-gradient-to-br from-[#1a1208] via-[#0d0905] to-[#0d0d0d] flex items-center justify-center">
                  <svg viewBox="0 0 200 220" className="w-32 h-36 opacity-60">
                    <rect x="80" y="40" width="40" height="130" rx="4" fill="url(#cGrad)" />
                    <ellipse cx="100" cy="40" rx="20" ry="6" fill="#1a1208" />
                    <line x1="100" y1="20" x2="100" y2="38" stroke="#8B7355" strokeWidth="2" />
                    <ellipse cx="100" cy="14" rx="8" ry="12" fill="url(#fGrad)" className="flame" />
                    <defs>
                      <linearGradient id="cGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#8B6914" stopOpacity="0.2" />
                      </linearGradient>
                      <linearGradient id="fGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#FFE566" />
                        <stop offset="100%" stopColor="#FF4500" stopOpacity="0.6" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-[var(--color-bg-card)] border border-[rgba(201,168,76,0.2)] rounded-sm p-5 glow-ring">
                <BatchCounter batchSize={24} pouredDate="March 20, 2026" remaining={9} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── GIFTING STUDIO ── */}
      <section ref={addRevealRef} className="reveal section-sm px-6">
        <div className="container">
          <div className="bg-[var(--color-bg-card)] border border-[rgba(201,168,76,0.15)] rounded-sm p-8 sm:p-12 flex flex-col sm:flex-row items-center gap-8">
            <div className="flex-1">
              <p className="font-sans text-[9px] uppercase tracking-[0.3em] text-[var(--color-gold)] mb-3">Gifting</p>
              <h2 className="font-display text-3xl sm:text-4xl text-[var(--color-cream)] italic mb-3">The perfect gift, personalised.</h2>
              <p className="font-sans text-sm text-[var(--color-faint)] leading-relaxed max-w-md">
                Choose a candle, write a message, pick your wrapping — and we&apos;ll generate a beautiful gift card to include in the package.
              </p>
            </div>
            <button
              onClick={() => setShowGifting(true)}
              className="btn-gold px-10 py-4 rounded-sm inline-flex items-center gap-2 shrink-0"
            >
              <Gift className="w-4 h-4" /> Open Gifting Studio
            </button>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="section px-6 bg-[var(--color-bg-deep)]">
        <div className="container">
          <div ref={addRevealRef} className="reveal text-center mb-12">
            <p className="font-sans text-[9px] uppercase tracking-[0.3em] text-[var(--color-gold)] mb-3">What People Say</p>
            <h2 className="font-display text-4xl sm:text-5xl text-[var(--color-cream)] italic">Stories of Light</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                ref={addRevealRef}
                className="reveal rounded-sm overflow-hidden border border-[rgba(201,168,76,0.12)]"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className={`bg-gradient-to-br ${t.gradient} p-8 h-full flex flex-col`}>
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 fill-[var(--color-gold)] text-[var(--color-gold)]" />
                    ))}
                  </div>
                  <p className="font-display text-lg italic text-[var(--color-cream)] leading-relaxed flex-1 mb-6">&ldquo;{t.quote}&rdquo;</p>
                  <div>
                    <p className="font-sans text-sm font-semibold text-[var(--color-gold)]">{t.author}</p>
                    <p className="font-sans text-[10px] uppercase tracking-widest text-[var(--color-faint)]">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section ref={addRevealRef} className="reveal section px-6">
        <div className="container max-w-2xl text-center">
          <div className="ornament-divider mb-8 opacity-40"><span>✦</span></div>
          <p className="font-sans text-[9px] uppercase tracking-[0.3em] text-[var(--color-gold)] mb-4">Stay in the Light</p>
          <h2 className="font-display text-4xl sm:text-5xl text-[var(--color-cream)] italic mb-4">
            10% off your first order.
          </h2>
          <p className="font-sans text-sm text-[var(--color-faint)] leading-relaxed mb-8">
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
                className="input-luxury flex-1 px-5 py-4 rounded-sm font-sans text-sm"
              />
              <button type="submit" className="btn-gold px-8 py-4 rounded-sm shrink-0">
                Claim 10% Off
              </button>
            </form>
          ) : (
            <div className="bg-[rgba(201,168,76,0.06)] border border-[rgba(201,168,76,0.2)] rounded-sm px-8 py-5 inline-block">
              <p className="font-display text-xl italic text-[var(--color-gold-light)]">Welcome to Kanti. ✦</p>
              <p className="font-sans text-xs text-[var(--color-faint)] mt-1">Your discount code is on its way.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
