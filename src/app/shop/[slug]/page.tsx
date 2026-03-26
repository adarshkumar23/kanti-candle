"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { getProductBySlug } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";

export default function ProductDetail() {
  const params = useParams();
  const slug = params.slug as string;
  const product = getProductBySlug(slug);

  const [selectedSize, setSelectedSize] = useState(0);
  const [activeImage, setActiveImage] = useState(0);
  const { addItem, setIsCartOpen } = useCart();
  const { addToast } = useToast();

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-[#131313]">
        <p
          className="text-4xl text-[#6e6754]"
          style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: "italic" }}
        >
          Product not found
        </p>
        <Link
          href="/shop"
          className="btn-gold px-8 py-3 text-[10px] uppercase tracking-[0.2em] rounded-sm"
        >
          Back to Shop
        </Link>
      </div>
    );
  }

  const size = product.sizes[selectedSize];
  const galleryImages = product.images || [product.imageUrl];

  const handleAddToCart = () => {
    addItem({
      slug: product.slug,
      name: product.name,
      size: size.weight,
      price: size.price,
      imageUrl: product.imageUrl,
    });
    addToast(`${product.name} (${size.weight}) added to cart`);
    setIsCartOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#131313]">
      {/* ── Hero Image (full bleed, no top padding) ──────────── */}
      {/* We remove the pt-16 from this page's content by using negative margin */}
      <div className="w-full aspect-[4/5] md:aspect-[16/9] lg:aspect-[21/9] relative overflow-hidden -mt-16">
        <img
          src={galleryImages[activeImage]}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {/* Back button */}
        <Link
          href="/shop"
          className="absolute top-20 left-4 z-10 glass-note p-3 rounded-sm flex items-center justify-center text-[#e5e2e1] hover:text-[#e6c364] transition-colors"
          aria-label="Back to shop"
        >
          <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>arrow_back</span>
        </Link>
        {/* Bottom gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#131313] to-transparent" />
      </div>

      {/* ── Product Header ───────────────────────────────────── */}
      <div className="px-4 md:px-8 lg:px-16 py-8 -mt-8 relative bg-[#131313] rounded-t-xl">
        <p className="text-[10px] uppercase tracking-[0.2em] text-[#e6c364]">
          {product.series}
        </p>
        <h1
          className="text-4xl md:text-5xl text-[#e5e2e1] mt-2"
          style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: "italic" }}
        >
          {product.name}
        </h1>
        <p className="text-2xl font-light text-[#e5e2e1] mt-4">
          ₹{size.price.toLocaleString("en-IN")}
        </p>
        <p className="text-sm font-light text-[#e5e2e1]/70 mt-4 max-w-lg leading-relaxed">
          {product.description}
        </p>
      </div>

      {/* ── Scent Profile ─────────────────────────────────────── */}
      <div className="bg-[#1c1c1c] px-4 md:px-8 lg:px-16 py-8">
        <p className="text-[10px] uppercase tracking-[0.2em] text-[#6e6754] mb-4">
          Scent Profile
        </p>
        <div className="flex flex-wrap gap-2 mb-6">
          {product.scentNotes.map((note) => (
            <span
              key={note}
              className="glass-note px-4 py-2 rounded-sm text-[11px] text-[#c9a675] uppercase tracking-[0.1em]"
            >
              {note}
            </span>
          ))}
        </div>
        <p
          className="border-l border-[#c9a84c]/30 pl-4 text-sm text-[#cac5be]/80 leading-relaxed max-w-md"
          style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: "italic" }}
        >
          {product.description}
        </p>
      </div>

      {/* ── Size Picker ──────────────────────────────────────── */}
      <div className="px-4 md:px-8 lg:px-16 py-8">
        <p className="text-[9px] uppercase tracking-[0.2em] text-[#6e6754] mb-4">
          Select Size
        </p>
        <div className="flex gap-3 flex-wrap">
          {product.sizes.map((s, i) => (
            <button
              key={s.weight}
              onClick={() => setSelectedSize(i)}
              className={`px-5 py-3 text-[10px] uppercase tracking-[0.1em] rounded-sm border transition-colors duration-300 ${
                selectedSize === i
                  ? "border-[#c9a84c] text-[#e6c364] bg-[#2a2a2a]"
                  : "border-[#4d4637]/30 text-[#6e6754] hover:border-[#c9a84c]/40"
              }`}
            >
              <span className="block font-medium">{s.weight}</span>
              <span className="block text-[8px] opacity-70 mt-0.5">{s.burnTime}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Product Details ───────────────────────────────────── */}
      <div className="px-4 md:px-8 lg:px-16 py-8">
        <div className="space-y-5">
          {[
            { icon: "eco", label: "Pure Soy Wax", sub: "100% natural, clean-burning" },
            { icon: "schedule", label: "80–100 Hour Burn Time", sub: size.burnTime },
            { icon: "water_drop", label: "Hand-Poured, Batch Limited", sub: "Small-batch, Gurgaon studio" },
          ].map(({ icon, label, sub }) => (
            <div key={label} className="flex items-center gap-4">
              <div className="w-10 h-10 bg-[#1c1c1c] rounded-sm flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[#e6c364]" style={{ fontSize: "18px" }}>
                  {icon}
                </span>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.1em] text-[#e5e2e1]">{label}</p>
                <p className="text-[10px] text-[#6e6754] mt-0.5">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Image Gallery ─────────────────────────────────────── */}
      {galleryImages.length > 1 && (
        <div className="px-4 md:px-8 lg:px-16 py-6">
          <p className="text-[9px] uppercase tracking-[0.2em] text-[#6e6754] mb-4">Gallery</p>
          <div className="flex gap-3 overflow-x-auto hide-scrollbar">
            {galleryImages.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={`w-20 h-20 shrink-0 rounded-sm overflow-hidden border-2 transition-colors duration-300 ${
                  activeImage === i ? "border-[#e6c364]" : "border-transparent opacity-50 hover:opacity-80"
                }`}
              >
                <img src={img} alt={`${product.name} view ${i + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Reviews: Stories of Light ─────────────────────────── */}
      <div className="bg-[#1c1c1c] px-4 md:px-8 lg:px-16 py-12">
        <div className="flex items-center gap-3 mb-8">
          <div>
            <p className="text-3xl font-light text-[#e5e2e1]">4.9<span className="text-base text-[#6e6754]">/5</span></p>
            <div className="flex items-center gap-1 mt-1">
              {[1,2,3,4,5].map((s) => (
                <span key={s} className="material-symbols-outlined text-[#e6c364]" style={{ fontSize: "14px", fontVariationSettings: "'FILL' 1" }}>
                  star
                </span>
              ))}
            </div>
          </div>
          <p
            className="serif-italic text-2xl text-[#cac5be] ml-4"
            style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: "italic" }}
          >
            Stories of Light
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { quote: "This candle completely transformed my evening ritual. The scent fills the room within minutes and lingers beautifully.", name: "Priya S.", location: "Mumbai" },
            { quote: "Gifted the Noir to my partner and it was love at first whiff. Kanti understands fragrance on a soul level.", name: "Arjun M.", location: "Delhi" },
          ].map((r, i) => (
            <div key={i} className="bg-[#202020] p-6 rounded-sm relative">
              <span
                className="absolute top-4 left-4 text-5xl leading-none text-[#c9a84c]/20"
                style={{ fontFamily: '"Cormorant Garamond", serif' }}
              >
                "
              </span>
              <p
                className="text-sm text-[#cac5be] leading-relaxed pt-4"
                style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: "italic" }}
              >
                {r.quote}
              </p>
              <div className="mt-4">
                <p className="text-[11px] text-[#e5e2e1] uppercase tracking-[0.1em]">{r.name}</p>
                <p className="text-[9px] text-[#6e6754] tracking-wider">{r.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Fixed Action Bar ─────────────────────────────────── */}
      {/* Extra mb-20 on mobile clears the bottom nav */}
      <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 md:pb-6 mb-20 md:mb-0 bg-gradient-to-t from-[#131313] to-transparent pt-8 pointer-events-none">
        <button
          onClick={handleAddToCart}
          className="pointer-events-auto w-full h-14 bg-[#c9a84c] text-[#1c1a0d] text-[11px] uppercase tracking-[0.2em] rounded-sm font-medium hover:bg-[#e6c364] transition-colors duration-500 shadow-[0_4px_24px_rgba(201,168,76,0.3)]"
        >
          Add to Cart — ₹{size.price.toLocaleString("en-IN")}
        </button>
      </div>

      {/* Spacer so content isn't hidden under action bar */}
      <div className="h-28 md:h-20" />
    </div>
  );
}
