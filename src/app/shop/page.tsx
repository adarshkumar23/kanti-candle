"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { products, getAllCategories } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { useRevealAnimation } from "@/hooks/useRevealAnimation";
import { Tag } from "lucide-react";

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
  const { addItem, setIsCartOpen } = useCart();
  const { addToast } = useToast();
  useRevealAnimation();

  // Fetch best active discount to show as banner
  useEffect(() => {
    fetch("/api/discounts/active")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setTopOffer(data[0]); // highest value first (sorted by API)
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
    const defaultSize = p.sizes[1] || p.sizes[0]; // prefer medium
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
    <div className="pt-24 min-h-screen">
      {/* Discount Banner */}
      {topOffer && (
        <div className="bg-[var(--color-gold)]/[0.06] border-b border-[var(--color-gold)]/15 px-6 py-3 text-center">
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
      <div className="px-6 md:px-12 lg:px-24 py-16 border-b border-[var(--color-border)]/20">
        <p className="font-sans text-[10px] uppercase tracking-[0.35em] text-[var(--color-gold-mid)] mb-3">Kanti Candle</p>
        <h1 className="font-display text-6xl md:text-7xl font-light">Shop All</h1>
        <p className="font-sans text-[var(--color-faint)] text-sm mt-3">Handcrafted luxury candles — {filtered.length} products</p>
      </div>

      {/* Filter Bar */}
      <div className="sticky top-[68px] z-40 glass border-b border-[var(--color-border)]/15">
        <div className="max-w-7xl mx-auto px-6 py-4 overflow-x-auto no-sb flex items-center gap-8 whitespace-nowrap">
          <span className="font-sans text-[9px] uppercase tracking-widest text-[var(--color-faint)] shrink-0">Filter:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-sans text-[10px] uppercase tracking-widest transition-colors shrink-0 ${
                activeCategory === cat
                  ? "text-[var(--color-gold)] border-b border-[var(--color-gold)]/30 pb-0.5"
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
          {filtered.map((p, i) => (
            <div
              key={p.slug}
              className="prod-card group cursor-pointer reveal"
              style={{ transitionDelay: `${(i % 3) * 100}ms` }}
            >
              <Link href={`/shop/${p.slug}`}>
                <div className="prod-img-wrap rounded-sm mb-6 relative">
                  <img src={p.imageUrl} alt={p.name} />
                  {p.badge && (
                    <div
                      className={`absolute top-4 left-4 px-3 py-1 text-[9px] font-bold tracking-[0.2em] uppercase rounded-full ${
                        p.badge === "Bestseller"
                          ? "bg-[var(--color-gold-mid)] text-[var(--color-bg-deep)]"
                          : p.badge === "New"
                          ? "bg-[var(--color-gold)] text-[var(--color-bg-deep)]"
                          : "bg-[var(--color-cream)] text-[var(--color-bg-deep)]"
                      }`}
                    >
                      {p.badge}
                    </div>
                  )}
                  <div className="quick-buy absolute inset-0 bg-[var(--color-bg)]/50 flex items-center justify-center rounded-sm">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleQuickAdd(p);
                      }}
                      className="btn-gold px-7 py-3 text-[9px] font-bold uppercase tracking-widest rounded-full"
                    >
                      Quick Add
                    </button>
                  </div>
                </div>
              </Link>
              <Link href={`/shop/${p.slug}`}>
                <p className="font-sans text-[9px] text-[var(--color-gold)]/50 uppercase tracking-[0.25em] mb-1.5">{p.series}</p>
                <h3 className="font-display text-2xl mb-1.5 group-hover:text-[var(--color-gold)] transition-colors">{p.name}</h3>
                <p className="font-sans text-[var(--color-faint)] text-xs tracking-wider mb-3">{p.scentNotes.join(" · ")}</p>
                <div className="flex justify-between items-center">
                  <span className="font-sans text-[var(--color-gold-mid)] font-semibold tracking-wider">
                    From ₹{p.sizes[0].price.toLocaleString("en-IN")}
                  </span>
                  <span className="font-sans text-[var(--color-faint)] text-[9px] uppercase tracking-wider">{p.sizes[0].burnTime} burn</span>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="font-display text-3xl text-[var(--color-faint)]">No candles found</p>
            <p className="font-sans text-sm text-[var(--color-faint)]/60 mt-3">Try a different category</p>
          </div>
        )}
      </div>
    </div>
  );
}
