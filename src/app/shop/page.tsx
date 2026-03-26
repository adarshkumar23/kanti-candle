"use client";

import Link from "next/link";
import { useState } from "react";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";

const filterChips = [
  { key: "all", label: "All Scents" },
  { key: "woody", label: "Woody" },
  { key: "floral", label: "Floral" },
  { key: "citrus", label: "Citrus" },
  { key: "oriental", label: "Spicy" },
  { key: "earthy", label: "Earthy" },
];

type SortOption = "bestselling" | "price-asc" | "price-desc" | "newest";

export default function Shop() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortBy, setSortBy] = useState<SortOption>("bestselling");
  const { addItem, setIsCartOpen } = useCart();
  const { addToast } = useToast();

  const filtered = products
    .filter((p) => activeFilter === "all" || p.category === activeFilter)
    .sort((a, b) => {
      switch (sortBy) {
        case "price-asc": return a.sizes[0].price - b.sizes[0].price;
        case "price-desc": return b.sizes[0].price - a.sizes[0].price;
        case "newest": return (b.badge === "New" ? 1 : 0) - (a.badge === "New" ? 1 : 0);
        default: return (b.badge === "Bestseller" ? 1 : 0) - (a.badge === "Bestseller" ? 1 : 0);
      }
    });

  const handleQuickAdd = (e: React.MouseEvent, p: typeof products[0]) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultSize = p.sizes[1] || p.sizes[0];
    addItem({ slug: p.slug, name: p.name, size: defaultSize.weight, price: defaultSize.price, imageUrl: p.imageUrl });
    addToast(`${p.name} added to cart`);
    setIsCartOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#131313]">
      {/* Header */}
      <div className="pt-8 px-4 md:px-8 lg:px-16 mb-8">
        <h1
          className="text-4xl text-[#e5e2e1]"
          style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: "italic" }}
        >
          The Collection
        </h1>
        <p className="text-[10px] uppercase tracking-[0.2em] text-[#cac5be] mt-2">
          Hand-poured vessels of light &amp; shadow
        </p>
      </div>

      {/* Filter bar */}
      <div className="px-4 md:px-8 lg:px-16 mb-8">
        <div className="flex items-center gap-3 overflow-x-auto hide-scrollbar pb-2">
          {filterChips.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveFilter(key)}
              className={`shrink-0 px-4 py-2 text-[10px] uppercase tracking-[0.15em] rounded-sm transition-colors duration-300 ${
                activeFilter === key
                  ? "bg-[#c9a84c] text-[#1c1a0d]"
                  : "border border-[#4d4637]/30 text-[#cac5be] hover:border-[#c9a84c]/50 hover:text-[#e6c364]"
              }`}
            >
              {label}
            </button>
          ))}

          {/* Spacer + sort */}
          <div className="ml-auto shrink-0 flex items-center gap-2">
            <span className="text-[9px] uppercase tracking-widest text-[#6e6754]">
              {filtered.length} results
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-transparent font-sans text-[10px] uppercase tracking-[0.1em] text-[#cac5be] focus:outline-none cursor-pointer border border-[#4d4637]/30 px-2 py-1 rounded-sm"
            >
              <option value="bestselling" className="bg-[#131313]">Best Selling</option>
              <option value="price-asc" className="bg-[#131313]">Price: Low → High</option>
              <option value="price-desc" className="bg-[#131313]">Price: High → Low</option>
              <option value="newest" className="bg-[#131313]">Newest</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="px-4 md:px-8 lg:px-16 pb-16">
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((p, i) => {
            // Insert mid-grid banner after 4th product
            const showBanner = i === 4;
            return (
              <>
                {showBanner && (
                  <div
                    key={`banner-${i}`}
                    className="col-span-2 md:col-span-3 lg:col-span-4 bg-[#1c1c1c] border-l-2 border-[#c9a84c]/40 p-8"
                  >
                    <p
                      className="text-2xl text-[#e5e2e1]"
                      style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: "italic" }}
                    >
                      The Olfactory Compass
                    </p>
                    <p className="text-[10px] uppercase tracking-[0.15em] text-[#6e6754] mt-2 mb-6">
                      Not sure where to start? Let us guide you.
                    </p>
                    <Link
                      href="/quiz"
                      className="btn-gold inline-block px-8 py-3 text-[10px] uppercase tracking-[0.15em] rounded-sm"
                    >
                      Begin the Quiz
                    </Link>
                  </div>
                )}

                <Link
                  key={p.slug}
                  href={`/shop/${p.slug}`}
                  className={`group prod-card ${i % 2 === 1 ? "mt-8" : ""}`}
                >
                  {/* Image */}
                  <div className="prod-img-wrap rounded-sm relative">
                    <img src={p.imageUrl} alt={p.name} />
                    {/* Badge */}
                    {p.badge && (
                      <div className="absolute top-3 left-3 glass-note px-2 py-1 text-[8px] uppercase tracking-[0.15em] text-[#e6c364] rounded-sm">
                        {p.badge}
                      </div>
                    )}
                    {/* Quick add + button */}
                    <div className="quick-buy absolute bottom-3 right-3">
                      <button
                        onClick={(e) => handleQuickAdd(e, p)}
                        className="glass-note w-9 h-9 rounded-sm flex items-center justify-center text-[#e6c364] hover:bg-[#c9a84c]/20 transition-colors"
                        aria-label={`Add ${p.name} to cart`}
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>add</span>
                      </button>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="mt-3">
                    <p
                      className="text-base text-[#e5e2e1] group-hover:text-[#e6c364] transition-colors duration-300"
                      style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: "italic" }}
                    >
                      {p.name}
                    </p>
                    <p className="text-[10px] uppercase tracking-[0.1em] text-[#6e6754] mt-1">
                      {p.scentNotes.join(" · ")}
                    </p>
                    <p className="text-sm text-[#e6c364] mt-1.5">
                      From ₹{p.sizes[0].price.toLocaleString("en-IN")}
                    </p>
                  </div>
                </Link>
              </>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-24">
            <p
              className="text-3xl text-[#6e6754]"
              style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: "italic" }}
            >
              No candles found
            </p>
            <p className="text-[11px] uppercase tracking-[0.15em] text-[#6e6754]/60 mt-3">
              Try a different category
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
