"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { X, Plus, Minus, ShoppingBag, Tag, Loader2, Check } from "lucide-react";
import Link from "next/link";

export default function CartDrawer() {
  const { items, isCartOpen, setIsCartOpen, removeItem, updateQuantity, totalPrice, totalItems, discount, setDiscount, discountedTotal } = useCart();
  const { addToast } = useToast();

  const [couponCode, setCouponCode] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponError, setCouponError] = useState("");

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    setCouponLoading(true);
    setCouponError("");

    try {
      const res = await fetch("/api/discounts/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: couponCode, cartTotal: totalPrice }),
      });

      const data = await res.json();

      if (!res.ok) {
        setCouponError(data.error || "Invalid code");
        setCouponLoading(false);
        return;
      }

      setDiscount(data.discount);
      setCouponCode("");
      addToast(`Discount "${data.discount.code}" applied!`, "success");
    } catch {
      setCouponError("Failed to validate code");
    }
    setCouponLoading(false);
  };

  const handleRemoveCoupon = () => {
    setDiscount(null);
    setCouponCode("");
    setCouponError("");
    addToast("Discount removed", "info");
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[70] bg-black/60 transition-opacity duration-300 ${isCartOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-[80] h-full w-full max-w-md bg-[var(--color-bg-deep)] border-l border-[var(--color-border)]/20 flex flex-col transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-7 py-6 border-b border-[var(--color-border)]/20">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5 text-[var(--color-gold)]" />
            <h2 className="font-display text-2xl text-[var(--color-gold)]">Your Cart</h2>
            <span className="text-[var(--color-faint)] font-sans text-xs">({totalItems})</span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="text-[var(--color-faint)] hover:text-[var(--color-gold)] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-7 py-6 space-y-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-5 text-center">
              <ShoppingBag className="w-12 h-12 text-[var(--color-faint)]/30" />
              <p className="font-display text-2xl text-[var(--color-faint)]">Your cart is empty</p>
              <p className="font-sans text-sm text-[var(--color-faint)]/60">Discover our handcrafted candles and find your perfect scent.</p>
              <Link
                href="/shop"
                onClick={() => setIsCartOpen(false)}
                className="btn-outline px-8 py-3 font-sans text-[10px] uppercase tracking-[0.22em] font-semibold rounded-sm"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div key={`${item.slug}-${item.size}`} className="flex gap-4 pb-6 border-b border-[var(--color-border)]/15">
                <div className="w-20 h-20 rounded-sm overflow-hidden bg-[var(--color-bg-card)] shrink-0">
                  <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-display text-lg text-[var(--color-cream)] leading-tight">{item.name}</h4>
                      <p className="font-sans text-[10px] uppercase tracking-widest text-[var(--color-faint)] mt-1">{item.size}</p>
                    </div>
                    <button
                      onClick={() => removeItem(item.slug, item.size)}
                      className="text-[var(--color-faint)]/50 hover:text-red-400 transition-colors ml-2"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-[var(--color-border)]/30 rounded-sm">
                      <button
                        onClick={() => updateQuantity(item.slug, item.size, item.quantity - 1)}
                        className="px-2.5 py-1.5 text-[var(--color-faint)] hover:text-[var(--color-gold)] transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-3 py-1.5 font-sans text-sm text-[var(--color-muted)] border-x border-[var(--color-border)]/30 min-w-[32px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.slug, item.size, item.quantity + 1)}
                        className="px-2.5 py-1.5 text-[var(--color-faint)] hover:text-[var(--color-gold)] transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <span className="font-sans text-[var(--color-gold-mid)] font-semibold tracking-wider">
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-[var(--color-border)]/20 px-7 py-6 space-y-4">
            {/* Discount Code Section */}
            {discount ? (
              <div className="flex items-center justify-between bg-[var(--color-gold)]/5 border border-[var(--color-gold)]/20 rounded-sm px-4 py-3">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-400" />
                  <div>
                    <span className="font-sans text-[10px] uppercase tracking-widest text-[var(--color-gold)] font-semibold">{discount.code}</span>
                    <p className="font-sans text-[9px] text-[var(--color-faint)]">
                      {discount.type === "percentage" ? `${discount.value}% off` : `₹${discount.value} off`}
                      {" "}· Saving ₹{discount.discountAmount.toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
                <button onClick={handleRemoveCoupon} className="text-[var(--color-faint)]/50 hover:text-red-400 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div>
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[var(--color-faint)]/40" />
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => { setCouponCode(e.target.value.toUpperCase()); setCouponError(""); }}
                      onKeyDown={(e) => e.key === "Enter" && handleApplyCoupon()}
                      placeholder="Discount code"
                      className="w-full bg-[var(--color-bg-low)] border border-[var(--color-border)]/30 focus:border-[var(--color-gold)] focus:outline-none rounded-sm pl-9 pr-4 py-2.5 text-[var(--color-muted)] placeholder:text-[var(--color-faint)]/40 font-sans text-[11px] uppercase tracking-widest"
                    />
                  </div>
                  <button
                    onClick={handleApplyCoupon}
                    disabled={couponLoading || !couponCode.trim()}
                    className="btn-outline px-4 py-2.5 font-sans text-[10px] uppercase tracking-widest font-semibold rounded-sm shrink-0 disabled:opacity-40"
                  >
                    {couponLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Apply"}
                  </button>
                </div>
                {couponError && (
                  <p className="font-sans text-[10px] text-red-400 mt-1.5">{couponError}</p>
                )}
              </div>
            )}

            {/* Pricing */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between items-center">
                <span className="font-sans text-[10px] uppercase tracking-widest text-[var(--color-faint)]">Subtotal</span>
                <span className={`font-sans text-sm ${discount ? "text-[var(--color-faint)] line-through" : "text-[var(--color-muted)]"}`}>
                  ₹{totalPrice.toLocaleString("en-IN")}
                </span>
              </div>
              {discount && (
                <div className="flex justify-between items-center">
                  <span className="font-sans text-[10px] uppercase tracking-widest text-green-400">Discount</span>
                  <span className="font-sans text-sm text-green-400">
                    -₹{discount.discountAmount.toLocaleString("en-IN")}
                  </span>
                </div>
              )}
              <div className="flex justify-between items-center pt-2 border-t border-[var(--color-border)]/15">
                <span className="font-sans text-[10px] uppercase tracking-widest text-[var(--color-muted)] font-semibold">Total</span>
                <span className="font-display text-2xl text-[var(--color-gold)]">
                  ₹{discountedTotal.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            <p className="font-sans text-[10px] text-[var(--color-faint)]/60 text-center">
              Free shipping on orders above ₹2,000
            </p>
            <Link
              href="/checkout"
              onClick={() => setIsCartOpen(false)}
              className="btn-gold w-full py-4 font-sans text-xs uppercase tracking-[0.22em] font-semibold rounded-sm text-center block"
            >
              Proceed to Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
