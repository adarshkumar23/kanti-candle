"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { ShoppingBag, Lock, Truck, ArrowLeft } from "lucide-react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function Checkout() {
  const { items, totalPrice, clearCart, discount, discountedTotal } = useCart();
  const { addToast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const shipping = discountedTotal >= 2000 ? 0 : 150;
  const grandTotal = discountedTotal + shipping;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim() || !form.email.includes("@")) errs.email = "Valid email is required";
    if (!form.phone.trim() || form.phone.length < 10) errs.phone = "Valid phone number is required";
    if (!form.address1.trim()) errs.address1 = "Address is required";
    if (!form.city.trim()) errs.city = "City is required";
    if (!form.state.trim()) errs.state = "State is required";
    if (!form.pincode.trim() || form.pincode.length < 6) errs.pincode = "Valid PIN code is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const loadRazorpay = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (window.Razorpay) { resolve(true); return; }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (!validate()) return;
    if (items.length === 0) {
      addToast("Your cart is empty", "error");
      return;
    }

    setIsProcessing(true);

    try {
      // Create Razorpay order
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: grandTotal,
          receipt: `order_${Date.now()}`,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create order");

      // Load Razorpay SDK
      const loaded = await loadRazorpay();
      if (!loaded) throw new Error("Payment gateway failed to load");

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.order.amount,
        currency: data.order.currency,
        name: "Kanti Candle",
        description: `Order of ${items.length} item(s)`,
        order_id: data.order.id,
        prefill: {
          name: form.name,
          email: form.email,
          contact: form.phone,
        },
        theme: { color: "#C6963F" },
        handler: async (response: any) => {
          // Save order to database
          try {
            await fetch("/api/orders", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                customerName: form.name,
                email: form.email,
                totalPrice: grandTotal,
                itemsData: JSON.stringify(
                  items.map((i) => ({ name: `${i.name} (${i.size})`, qty: i.quantity }))
                ),
                paymentId: response.razorpay_payment_id,
              }),
            });
          } catch {}

          clearCart();
          setOrderComplete(true);
          addToast("Payment successful! Your candles are on their way.", "success");
        },
        modal: {
          ondismiss: () => setIsProcessing(false),
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", () => {
        addToast("Payment failed. Please try again.", "error");
        setIsProcessing(false);
      });
      rzp.open();
    } catch (err: any) {
      addToast(err.message || "Something went wrong", "error");
      setIsProcessing(false);
    }
  };

  // Order Complete State
  if (orderComplete) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-lg space-y-8">
          <div className="w-20 h-20 rounded-full bg-[var(--color-gold)]/10 flex items-center justify-center mx-auto">
            <span className="text-[var(--color-gold)] text-3xl">✦</span>
          </div>
          <h1 className="font-display text-5xl font-light text-[var(--color-gold)]">Thank You!</h1>
          <p className="font-sans text-[var(--color-muted)] leading-relaxed">
            Your order has been placed successfully. We&apos;re handcrafting your candles with love and care. You&apos;ll receive a confirmation email shortly.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/shop" className="btn-gold px-10 py-4 font-sans text-xs uppercase tracking-[0.22em] font-semibold rounded-sm">Continue Shopping</Link>
            <Link href="/" className="btn-outline px-10 py-4 font-sans text-xs uppercase tracking-[0.22em] font-semibold rounded-sm">Return Home</Link>
          </div>
        </div>
      </div>
    );
  }

  // Empty Cart
  if (items.length === 0) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-lg space-y-8">
          <ShoppingBag className="w-16 h-16 text-[var(--color-faint)]/30 mx-auto" />
          <h1 className="font-display text-4xl text-[var(--color-faint)]">Your cart is empty</h1>
          <Link href="/shop" className="btn-gold px-10 py-4 font-sans text-xs uppercase tracking-[0.22em] font-semibold rounded-sm inline-block">Browse Shop</Link>
        </div>
      </div>
    );
  }

  const updateField = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
    if (errors[field]) setErrors({ ...errors, [field]: "" });
  };

  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-12">
        {/* Back Link */}
        <Link href="/shop" className="inline-flex items-center gap-2 font-sans text-[10px] uppercase tracking-widest text-[var(--color-faint)] hover:text-[var(--color-gold)] transition-colors mb-10">
          <ArrowLeft className="w-4 h-4" /> Continue Shopping
        </Link>

        <h1 className="font-display text-5xl md:text-6xl font-light mb-12">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Form */}
          <div className="lg:col-span-3 space-y-8">
            {/* Contact */}
            <div>
              <h2 className="font-display text-2xl text-[var(--color-gold)] mb-6">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField label="Full Name *" value={form.name} error={errors.name} onChange={(v) => updateField("name", v)} placeholder="Priya Sharma" />
                <InputField label="Email *" type="email" value={form.email} error={errors.email} onChange={(v) => updateField("email", v)} placeholder="priya@example.com" />
                <InputField label="Phone *" type="tel" value={form.phone} error={errors.phone} onChange={(v) => updateField("phone", v)} placeholder="+91 98765 43210" className="md:col-span-2" />
              </div>
            </div>

            {/* Shipping */}
            <div>
              <h2 className="font-display text-2xl text-[var(--color-gold)] mb-6">Shipping Address</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField label="Address Line 1 *" value={form.address1} error={errors.address1} onChange={(v) => updateField("address1", v)} placeholder="123 Main Street" className="md:col-span-2" />
                <InputField label="Address Line 2" value={form.address2} onChange={(v) => updateField("address2", v)} placeholder="Apartment, floor, etc." className="md:col-span-2" />
                <InputField label="City *" value={form.city} error={errors.city} onChange={(v) => updateField("city", v)} placeholder="Bangalore" />
                <InputField label="State *" value={form.state} error={errors.state} onChange={(v) => updateField("state", v)} placeholder="Karnataka" />
                <InputField label="PIN Code *" value={form.pincode} error={errors.pincode} onChange={(v) => updateField("pincode", v)} placeholder="560034" />
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2 lg:sticky lg:top-24 h-fit">
            <div className="bg-[var(--color-bg-low)] rounded-sm p-7 border border-[var(--color-border)]/15 space-y-6">
              <h2 className="font-display text-2xl text-[var(--color-gold)]">Order Summary</h2>

              <div className="space-y-4 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={`${item.slug}-${item.size}`} className="flex gap-4">
                    <div className="w-14 h-14 rounded-sm overflow-hidden bg-[var(--color-bg-card)] shrink-0">
                      <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-sans text-sm text-[var(--color-muted)] truncate">{item.name}</p>
                      <p className="font-sans text-[10px] text-[var(--color-faint)]">{item.size} × {item.quantity}</p>
                    </div>
                    <span className="font-sans text-sm text-[var(--color-gold-mid)] font-semibold shrink-0">
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-[var(--color-border)]/20 pt-4 space-y-3">
                <div className="flex justify-between">
                  <span className="font-sans text-sm text-[var(--color-faint)]">Subtotal</span>
                  <span className="font-sans text-sm text-[var(--color-muted)]">₹{totalPrice.toLocaleString("en-IN")}</span>
                </div>
                {discount && (
                  <div className="flex justify-between">
                    <span className="font-sans text-sm text-green-400 flex items-center gap-1.5">
                      Discount ({discount.code})
                    </span>
                    <span className="font-sans text-sm text-green-400">-₹{discount.discountAmount.toLocaleString("en-IN")}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="font-sans text-sm text-[var(--color-faint)]">Shipping</span>
                  <span className="font-sans text-sm text-[var(--color-muted)]">
                    {shipping === 0 ? "Free" : `₹${shipping}`}
                  </span>
                </div>
                <div className="flex justify-between pt-3 border-t border-[var(--color-border)]/20">
                  <span className="font-sans text-sm text-[var(--color-muted)] font-semibold">Total</span>
                  <span className="font-display text-2xl text-[var(--color-gold)]">₹{grandTotal.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="btn-gold w-full py-4 font-sans text-xs uppercase tracking-[0.22em] font-semibold rounded-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Lock className="w-3.5 h-3.5" />
                {isProcessing ? "Processing..." : `Pay ₹${grandTotal.toLocaleString("en-IN")}`}
              </button>

              <div className="flex items-center justify-center gap-4 text-[var(--color-faint)]/50">
                <Lock className="w-3 h-3" />
                <span className="font-sans text-[9px] uppercase tracking-widest">Secure Payment via Razorpay</span>
              </div>

              {shipping === 0 && (
                <div className="flex items-center justify-center gap-2 bg-[var(--color-gold)]/5 py-2 rounded-sm">
                  <Truck className="w-3.5 h-3.5 text-[var(--color-gold-mid)]" />
                  <span className="font-sans text-[10px] text-[var(--color-gold-mid)]">Free shipping on this order!</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InputField({
  label,
  value,
  error,
  onChange,
  placeholder,
  type = "text",
  className = "",
}: {
  label: string;
  value: string;
  error?: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="font-sans text-[9px] uppercase tracking-[0.25em] text-[var(--color-faint)] block mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full bg-transparent border-b ${
          error ? "border-red-400" : "border-[var(--color-border)]/40"
        } focus:border-[var(--color-gold)] focus:outline-none text-[var(--color-muted)] placeholder:text-[var(--color-faint)]/40 font-sans text-sm py-3`}
      />
      {error && <p className="font-sans text-[10px] text-red-400 mt-1">{error}</p>}
    </div>
  );
}
