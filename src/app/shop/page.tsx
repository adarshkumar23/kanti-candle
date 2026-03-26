"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { products, getAllCategories } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { useRevealAnimation } from "@/hooks/useRevealAnimation";
import { Tag, Sparkles } from "lucide-react";
import ScentRadar from "@/components/ScentRadar";
import BurnVisualizer from "@/components/BurnVisualizer";
import ScentQuiz from "@/components/ScentQuiz";

type SortOption = "bestselling" | "price-asc" | "price-desc" | "newest";

interface ActiveOffer {
  code: string;
  description: string | null;
  type: string;
  value: number;
  minOrder: number;
}

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState<SortOption>("bestselling");
  const [topOffer, setTopOffer] = useState<ActiveOffer | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const { addItem, setIsCartOpen } = useCart();
  const { addToast } = useToast();
  useRevealAnimation();

  // Fetch best active discount to show as banner
  useEffect(() => {
    fetch("/api/discounts/active")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setTopOffer(data[0]);
        }
      })
      .catch(() => {});
  }, []);

  const categories = getAllCategories();

  const filtered = products
    .filter((p) => activeCategory === "all" || p.category === activeCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.sizes[0].price - b.sizes[0].price;
        case "price-desc":
          return b.sizes[0].price - a.sizes[0].price;
        case "newest":
          return (b.badge === "New" ? 1 : 0) - (a.badge === "New" ? 1 : 0);
        case "bestselling":
        default:
          return (b.badge === "Bestseller" ? 1 : 0) - (a.badge === "Bestseller" ? 1 : 0);
      }
    });

  const handleQuickAdd = (p: typeof products[0]) => {
    const defaultSize = p.sizes[1] || p.sizes[0];
    addItem({
      slug: p.slug,
      name: p.name,
      size: defaultSize.weight,
      price: defaultSize.price,
      imageUrl: p.imageUrl,
    });
    addToast(`${p.name} added to cart`);
    setIsCartOpen(true);
  };

  return (
    <div className="pt-[72px] min-h-screen bg-[var(--color-bg-main)]">
      {showQuiz && <ScentQuiz onClose={() => setShowQuiz(false)} />}

      {/* Discount Banner */}
      {topOffer && (
        <div className="bg-[rgba(201,168,76,0.06)] border-b border-[rgba(201,168,76,0.15)] px-6 py-3 text-center">
          <p className="font-sans text-sm text-[var(--color-muted)] flex items-center justify-center gap-2">
            <Tag className="w-3.5 h-3.5 text-[var(--color-gold)]" />
            {topOffer.description || (topOffer.type === "percentage" ? `${topOffer.value}% off` : `₹${topOffer.value} off`)}{" "}
            — Use code{" "}
            <span className="text-[var(--color-gold)] font-semibold tracking-wider">{topOffer.code}</span>
            {topOffer.minOrder > 0 && (
              <span className="text-[var(--color-faint)] text-xs">
                (Min. ₹{topOffer.minOrder.toLocaleString("en-IN")})
              </span>
            )}
          </p>
        </div>
      )}

      {/* Header */}
      <div className="px-6 md:px-12 lg:px-24 py-16 border-b border-[rgba(201,168,76,0.12)]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="font-sans text-[9px] uppercase tracking-[0.3em] text-[var(--color-gold)] mb-3">Kanti Candles</p>
            <h1 className="font-display text-6xl md:text-7xl text-[var(--color-cream)] italic">Shop All</h1>
            <p className="font-sans text-[var(--color-faint)] text-sm mt-3">Handcrafted luxury candles — {filtered.length} products</p>
          </div>
          <button
            onClick={() => setShowQuiz(true)}
            className="btn-outline px-6 py-3.5 rounded-sm inline-flex items-center gap-2 shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5" /> Find My Scent
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="sticky top-[68px] z-40 glass border-b border-[rgba(201,168,76,0.1)]">
        <div className="max-w-7xl mx-auto px-6 py-4 overflow-x-auto no-sb flex items-center gap-8 whitespace-nowrap">
          <span className="font-sans text-[9px] uppercase tracking-widest text-[var(--color-faint)] shrink-0">Filter:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-sans text-[10px] uppercase tracking-widest transition-colors shrink-0 ${
                activeCategory === cat
                  ? "text-[var(--color-gold)] border-b border-[rgba(201,168,76,0.3)] pb-0.5"
                  : "text-[var(--color-muted)]/60 hover:text-[var(--color-gold)]"
              }`}
            >
              {cat === "all" ? "All" : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
          <div className="ml-auto flex items-center gap-2 shrink-0">
            <span className="font-sans text-[9px] uppercase tracking-widest text-[var(--color-faint)]">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-transparent font-sans text-[10px] uppercase tracking-widest text-[var(--color-muted)] focus:outline-none cursor-pointer"
            >
              <option value="bestselling">Best Selling</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => (
            <div
              key={p.slug}
              className="group reveal"
              style={{ transitionDelay: `${(i % 3) * 80}ms` }}
            >
              <Link href={`/shop/${p.slug}`} className="block card-hover bg-[var(--color-bg-card)] rounded-sm overflow-hidden">
                {/* Image */}
                <div className="aspect-[4/5] overflow-hidden bg-[var(--color-bg-deep)] relative">
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Badge */}
                  {p.badge && (
                    <div
                      className={`absolute top-4 left-4 px-3 py-1 text-[9px] font-bold tracking-[0.2em] uppercase rounded-full ${
                        p.badge === "Bestseller"
                          ? "bg-[var(--color-gold)] text-[var(--color-bg-deep)]"
                          : p.badge === "New"
                          ? "bg-[var(--color-gold-light)] text-[var(--color-bg-deep)]"
                          : "bg-[var(--color-cream)] text-[var(--color-bg-deep)]"
                      }`}
                    >
                      {p.badge}
                    </div>
                  )}
                  {/* Scent Radar */}
                  {p.scentProfile && (
                    <div className="absolute top-4 right-4">
                      <ScentRadar profile={p.scentProfile} />
                    </div>
                  )}
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-[400ms]" />
                  {/* Quick add */}
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleQuickAdd(p);
                      }}
                      className="btn-gold w-full py-2.5 rounded-sm font-sans text-[9px] uppercase tracking-widest"
                    >
                      Quick Add
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-display text-xl text-[var(--color-cream)] leading-tight group-hover:text-[var(--color-gold)] transition-colors">{p.name}</h3>
                    <span className="font-sans text-sm font-semibold text-[var(--color-gold)] shrink-0 ml-2">₹{p.price.toLocaleString("en-IN")}</span>
                  </div>
                  <p className="font-sans text-[9px] text-[var(--color-faint)] uppercase tracking-widest mb-3">{p.series}</p>
                  <p className="font-sans text-xs text-[var(--color-cream-dim)] leading-relaxed">{p.scentNotes.join(" · ")}</p>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-[rgba(201,168,76,0.08)]">
                    <BurnVisualizer burnTime={p.burnTime} size="sm" />
                    <span className="font-sans text-[9px] uppercase tracking-widest text-[var(--color-faint)]">{p.weight}</span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="font-display text-3xl text-[var(--color-faint)] italic">No candles found</p>
            <p className="font-sans text-sm text-[var(--color-faint)]/60 mt-3">Try a different category</p>
          </div>
        )}
      </div>
    </div>
  );
}
