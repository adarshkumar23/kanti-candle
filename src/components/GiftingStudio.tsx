"use client";
import { useState } from "react";
import { X, Gift, Download, Check } from "lucide-react";
import { products } from "@/data/products";

const WRAPPINGS = [
  { id: "classic", label: "Classic Black", color: "#0d0d0d", accent: "#C9A84C" },
  { id: "ivory",   label: "Ivory Linen",  color: "#F5EDD6", accent: "#8B6914" },
  { id: "blush",   label: "Rose Blush",   color: "#3d1a24", accent: "#D4A0B0" },
  { id: "forest",  label: "Forest Sage",  color: "#1a2d1a", accent: "#8DB88D" },
];

export default function GiftingStudio({ onClose }: { onClose: () => void }) {
  const [selectedProduct, setSelectedProduct] = useState(products[0].slug);
  const [wrapping, setWrapping] = useState(WRAPPINGS[0].id);
  const [recipientName, setRecipientName] = useState("");
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState(false);

  const product = products.find((p) => p.slug === selectedProduct) || products[0];
  const wrap = WRAPPINGS.find((w) => w.id === wrapping) || WRAPPINGS[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
      <div className="relative bg-[var(--color-bg-card)] border border-[rgba(201,168,76,0.2)] rounded-sm max-w-2xl w-full p-8 my-4 animate-[fadeUp_0.4s_cubic-bezier(0.22,1,0.36,1)_both]">
        <button onClick={onClose} className="absolute top-4 right-4 text-[var(--color-faint)] hover:text-[var(--color-gold)] transition-colors">
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <Gift className="w-5 h-5 text-[var(--color-gold)]" />
          <h2 className="font-display text-2xl text-[var(--color-cream)] italic">Gifting Studio</h2>
        </div>

        {!preview ? (
          <div className="space-y-6">
            {/* Candle Select */}
            <div>
              <label className="font-sans text-[9px] uppercase tracking-[0.25em] text-[var(--color-faint)] block mb-3">Choose a Candle</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto no-sb pr-1">
                {products.map((p) => (
                  <button
                    key={p.slug}
                    onClick={() => setSelectedProduct(p.slug)}
                    className={`p-3 rounded-sm border text-left transition-all ${selectedProduct === p.slug ? "border-[var(--color-gold)] bg-[rgba(201,168,76,0.08)]" : "border-[rgba(201,168,76,0.1)] hover:border-[rgba(201,168,76,0.3)]"}`}
                  >
                    <p className="font-sans text-xs text-[var(--color-muted)] leading-tight">{p.name}</p>
                    <p className="font-sans text-[10px] text-[var(--color-gold)] mt-0.5">₹{p.price.toLocaleString("en-IN")}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Wrapping */}
            <div>
              <label className="font-sans text-[9px] uppercase tracking-[0.25em] text-[var(--color-faint)] block mb-3">Gift Wrapping</label>
              <div className="flex gap-3">
                {WRAPPINGS.map((w) => (
                  <button
                    key={w.id}
                    onClick={() => setWrapping(w.id)}
                    className={`flex-1 p-3 rounded-sm border transition-all ${wrapping === w.id ? "border-[var(--color-gold)]" : "border-[rgba(201,168,76,0.1)]"}`}
                    style={{ backgroundColor: w.color + "66" }}
                  >
                    <div className="w-4 h-4 rounded-full mx-auto mb-1 border-2" style={{ backgroundColor: w.accent, borderColor: wrapping === w.id ? w.accent : "transparent" }} />
                    <p className="font-sans text-[9px] text-[var(--color-faint)] text-center leading-tight">{w.label}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Recipient */}
            <div>
              <label className="font-sans text-[9px] uppercase tracking-[0.25em] text-[var(--color-faint)] block mb-2">Recipient&apos;s Name</label>
              <input
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                placeholder="e.g. Priya"
                className="input-luxury w-full px-4 py-3 rounded-sm font-sans text-sm"
              />
            </div>

            {/* Message */}
            <div>
              <label className="font-sans text-[9px] uppercase tracking-[0.25em] text-[var(--color-faint)] block mb-2">Personal Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write something from the heart..."
                rows={3}
                className="input-luxury w-full px-4 py-3 rounded-sm font-sans text-sm resize-none"
                maxLength={200}
              />
              <p className="font-sans text-[9px] text-[var(--color-faint)] text-right mt-1">{message.length}/200</p>
            </div>

            <button
              onClick={() => setPreview(true)}
              className="btn-gold w-full py-4 rounded-sm flex items-center justify-center gap-2"
            >
              <Gift className="w-4 h-4" /> Preview Gift Card
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Gift Preview Card */}
            <div className="gift-preview rounded-sm p-8 text-center relative overflow-hidden" style={{ backgroundColor: wrap.color }}>
              <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9A84C' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
              <p className="font-sans text-[9px] uppercase tracking-[0.3em] mb-4" style={{ color: wrap.accent }}>Kanti Candles · A Gift For You</p>
              {recipientName && (
                <p className="font-display text-3xl italic mb-3" style={{ color: wrap.accent }}>For {recipientName},</p>
              )}
              <p className="font-display text-4xl mb-2" style={{ color: wrap.accent === "#C9A84C" ? "#F0D080" : wrap.accent }}>{product.name}</p>
              <p className="font-sans text-xs mb-6" style={{ color: wrap.accent, opacity: 0.7 }}>{product.scentNotes?.join(" · ")}</p>
              {message && (
                <p className="font-display text-lg italic leading-relaxed max-w-xs mx-auto" style={{ color: wrap.accent, opacity: 0.9 }}>&ldquo;{message}&rdquo;</p>
              )}
              <div className="mt-6 pt-6 border-t" style={{ borderColor: wrap.accent + "33" }}>
                <p className="font-sans text-[8px] uppercase tracking-[0.3em]" style={{ color: wrap.accent, opacity: 0.5 }}>Hand-poured with love · Gurgaon, India</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setPreview(false)} className="btn-outline flex-1 py-3.5 rounded-sm">Edit</button>
              <button
                onClick={() => window.print()}
                className="btn-gold flex-1 py-3.5 rounded-sm flex items-center justify-center gap-2"
              >
                <Download className="w-3.5 h-3.5" /> Save Card
              </button>
            </div>

            <div className="bg-[rgba(201,168,76,0.06)] border border-[rgba(201,168,76,0.15)] rounded-sm p-4 flex items-start gap-3">
              <Check className="w-4 h-4 text-[var(--color-gold)] shrink-0 mt-0.5" />
              <p className="font-sans text-xs text-[var(--color-faint)] leading-relaxed">
                Add a note in the order comment box during checkout and we&apos;ll handwrite this message and include it in your gift packaging.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
