"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getProductBySlug, products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { useRevealAnimation } from "@/hooks/useRevealAnimation";
import { ChevronRight, Minus, Plus, Tag, Copy } from "lucide-react";

interface ActiveDiscount {
  id: string;
  code: string;
  description: string | null;
  type: string;
  value: number;
  minOrder: number;
  appliesToAll: boolean;
  categories: string | null;
  expiresAt: string | null;
}

export default function ProductDetail() {
  const params = useParams();
  const slug = params.slug as string;
  const product = getProductBySlug(slug);

  const [selectedSize, setSelectedSize] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState<string | null>("about");
  const [activeDiscounts, setActiveDiscounts] = useState<ActiveDiscount[]>([]);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const { addItem, setIsCartOpen } = useCart();
  const { addToast } = useToast();
  useRevealAnimation();

  // Fetch active discounts
  useEffect(() => {
    fetch("/api/discounts/active")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          // Filter discounts applicable to this product's category
          const applicable = data.filter((d: ActiveDiscount) => {
            if (d.appliesToAll) return true;
            if (d.categories && product) {
              const cats = d.categories.toLowerCase().split(",").map((c: string) => c.trim());
              return cats.includes(product.category.toLowerCase());
            }
            return false;
          });
          setActiveDiscounts(applicable);
        }
      })
      .catch(() => {});
  }, [product]);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    addToast(`Code "${code}" copied to clipboard!`, "success");
    setTimeout(() => setCopiedCode(null), 2000);
  };

  if (!product) {
    return (
      <div className="pt-24 min-h-screen flex flex-col items-center justify-center gap-6">
        <h1 className="font-display text-5xl text-[var(--color-faint)]">Product not found</h1>
        <Link href="/shop" className="btn-gold px-8 py-3 font-sans text-xs uppercase tracking-[0.22em] font-semibold rounded-sm">
          Back to Shop
        </Link>
      </div>
    );
  }

  const size = product.sizes[selectedSize];

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        slug: product.slug,
        name: product.name,
        size: size.weight,
        price: size.price,
        imageUrl: product.imageUrl,
      });
    }
    addToast(`${product.name} (${size.weight}) added to cart`);
    setIsCartOpen(true);
    setQuantity(1);
  };

  const related = products.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 3);

  return (
    <div className="pt-24 min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-6">
        <nav className="flex items-center gap-2 font-sans text-[10px] uppercase tracking-widest text-[var(--color-faint)]">
          <Link href="/" className="hover:text-[var(--color-gold)] transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/shop" className="hover:text-[var(--color-gold)] transition-colors">Shop</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[var(--color-gold-mid)]">{product.name}</span>
        </nav>
      </div>

      {/* Product Hero */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Image */}
          <div className="reveal">
            <div className="aspect-square overflow-hidden rounded-sm bg-[var(--color-bg-card)] group">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Details */}
          <div className="reveal" style={{ transitionDelay: "150ms" }}>
            <p className="font-sans text-[10px] uppercase tracking-[0.35em] text-[var(--color-gold-mid)] mb-3">{product.series}</p>
            <h1 className="font-display text-5xl md:text-6xl font-light mb-4">{product.name}</h1>
            {product.badge && (
              <span className={`inline-block px-3 py-1 text-[9px] font-bold tracking-[0.2em] uppercase rounded-full mb-6 ${
                product.badge === "Bestseller"
                  ? "bg-[var(--color-gold-mid)] text-[var(--color-bg-deep)]"
                  : product.badge === "New"
                  ? "bg-[var(--color-gold)] text-[var(--color-bg-deep)]"
                  : "bg-[var(--color-cream)] text-[var(--color-bg-deep)]"
              }`}>
                {product.badge}
              </span>
            )}
            <p className="font-sans text-[var(--color-faint)] text-sm tracking-wider mb-6">{product.scentNotes.join(" · ")}</p>

            {/* Price */}
            <div className="mb-8">
              <p className="font-display text-4xl text-[var(--color-gold)]">₹{size.price.toLocaleString("en-IN")}</p>
              <p className="font-sans text-[10px] text-[var(--color-faint)] mt-1 uppercase tracking-wider">{size.burnTime} burn time</p>
            </div>

            {/* Size Picker */}
            <div className="mb-8">
              <p className="font-sans text-[9px] uppercase tracking-[0.25em] text-[var(--color-faint)] mb-4">Select Size</p>
              <div className="flex gap-3">
                {product.sizes.map((s, i) => (
                  <button
                    key={s.weight}
                    onClick={() => setSelectedSize(i)}
                    className={`font-sans text-[10px] py-3 px-6 rounded-sm border transition-all ${
                      selectedSize === i
                        ? "border-[var(--color-gold-mid)] text-[var(--color-gold)] bg-[var(--color-bg-high)]"
                        : "border-[var(--color-border)]/30 text-[var(--color-faint)] bg-[var(--color-bg-card)] hover:border-[var(--color-gold-dim)]"
                    }`}
                  >
                    <span className="block font-semibold">{s.weight}</span>
                    <span className="block text-[9px] mt-0.5 opacity-70">{s.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <p className="font-sans text-[9px] uppercase tracking-[0.25em] text-[var(--color-faint)] mb-4">Quantity</p>
              <div className="flex items-center border border-[var(--color-border)]/30 rounded-sm w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 text-[var(--color-faint)] hover:text-[var(--color-gold)] transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-6 py-3 font-sans text-sm text-[var(--color-muted)] border-x border-[var(--color-border)]/30 min-w-[48px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 text-[var(--color-faint)] hover:text-[var(--color-gold)] transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className="btn-gold w-full py-4 font-sans text-xs uppercase tracking-[0.22em] font-semibold rounded-sm mb-6"
            >
              Add to Cart — ₹{(size.price * quantity).toLocaleString("en-IN")}
            </button>

            {/* Discount Offers */}
            {activeDiscounts.length > 0 && (
              <div className="mb-10 space-y-3">
                <p className="font-sans text-[9px] uppercase tracking-[0.25em] text-[var(--color-gold-mid)] flex items-center gap-2">
                  <Tag className="w-3.5 h-3.5" /> Available Offers
                </p>
                {activeDiscounts.map((d) => (
                  <div
                    key={d.id}
                    className="flex items-center justify-between bg-[var(--color-gold)]/[0.04] border border-[var(--color-gold)]/15 rounded-sm px-4 py-3"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-sans text-sm text-[var(--color-muted)]">
                        {d.description || (d.type === "percentage" ? `${d.value}% off` : `₹${d.value} off`)}
                      </p>
                      <p className="font-sans text-[10px] text-[var(--color-faint)] mt-0.5">
                        Use code{" "}
                        <span className="text-[var(--color-gold)] font-semibold tracking-wider">{d.code}</span>
                        {d.minOrder > 0 && ` · Min. order ₹${d.minOrder.toLocaleString("en-IN")}`}
                        {d.expiresAt && ` · Expires ${new Date(d.expiresAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}`}
                      </p>
                    </div>
                    <button
                      onClick={() => handleCopyCode(d.code)}
                      className="flex items-center gap-1.5 px-3 py-1.5 border border-[var(--color-gold)]/30 rounded-sm font-sans text-[9px] uppercase tracking-widest text-[var(--color-gold)] hover:bg-[var(--color-gold)]/10 transition-colors shrink-0 ml-3"
                    >
                      <Copy className="w-3 h-3" />
                      {copiedCode === d.code ? "Copied!" : "Copy"}
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Accordions */}
            <div className="border-t border-[var(--color-border)]/20 space-y-0">
              {[
                { id: "about", title: "About This Candle", content: product.description },
                { id: "notes", title: "Scent Notes", content: product.scentNotes.map((n, i) => `${i === 0 ? "Top" : i === 1 ? "Heart" : "Base"}: ${n}`).join("\n") },
                {
                  id: "care",
                  title: "Burn Instructions",
                  content: "Trim the wick to 5mm before each use. Allow the wax to melt to the edges on the first burn. Never burn for more than 4 hours at a time. Keep away from drafts and flammable objects. Discontinue use when 10mm of wax remains.",
                },
              ].map((section) => (
                <div key={section.id} className="border-b border-[var(--color-border)]/20">
                  <button
                    onClick={() => setActiveAccordion(activeAccordion === section.id ? null : section.id)}
                    className="w-full flex justify-between items-center py-5"
                  >
                    <span className="font-sans text-[10px] uppercase tracking-widest text-[var(--color-muted)]">{section.title}</span>
                    <ChevronRight
                      className={`w-4 h-4 text-[var(--color-faint)] transition-transform duration-300 ${
                        activeAccordion === section.id ? "rotate-90" : ""
                      }`}
                    />
                  </button>
                  <div className={`overflow-hidden transition-all duration-400 ${activeAccordion === section.id ? "max-h-48 pb-5" : "max-h-0"}`}>
                    <p className="font-sans text-sm text-[var(--color-faint)] leading-relaxed whitespace-pre-line">{section.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="py-20 bg-[var(--color-bg-deep)] reveal">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
            <div className="flex justify-between items-end mb-12">
              <div>
                <p className="font-sans text-[10px] uppercase tracking-[0.35em] text-[var(--color-gold-mid)] mb-3">More to Discover</p>
                <h2 className="font-display text-4xl font-light">You May Also Like</h2>
              </div>
              <Link href="/shop" className="font-sans text-[10px] uppercase tracking-widest text-[var(--color-gold)] border-b border-[var(--color-gold)]/25 pb-1 hover:border-[var(--color-gold)] transition-colors">
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {related.map((p) => (
                <Link key={p.slug} href={`/shop/${p.slug}`} className="group">
                  <div className="aspect-square overflow-hidden rounded-sm mb-5 bg-[var(--color-bg-card)]">
                    <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <p className="font-sans text-[9px] text-[var(--color-gold)]/50 uppercase tracking-[0.25em] mb-1">{p.series}</p>
                  <h3 className="font-display text-xl mb-1 group-hover:text-[var(--color-gold)] transition-colors">{p.name}</h3>
                  <span className="font-sans text-[var(--color-gold-mid)] text-sm font-semibold">From ₹{p.sizes[0].price.toLocaleString("en-IN")}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
