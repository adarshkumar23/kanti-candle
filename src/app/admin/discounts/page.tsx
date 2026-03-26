"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Tag, X, Loader2, ToggleLeft, ToggleRight } from "lucide-react";

interface Discount {
  id: string;
  code: string;
  description: string | null;
  type: string;
  value: number;
  minOrder: number;
  maxUses: number;
  usedCount: number;
  isActive: boolean;
  appliesToAll: boolean;
  categories: string | null;
  expiresAt: string | null;
  createdAt: string;
}

const CATEGORIES = ["Floral", "Woody", "Oriental", "Citrus", "Earthy"];

export default function AdminDiscounts() {
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    code: "",
    description: "",
    type: "percentage" as "percentage" | "fixed",
    value: "",
    minOrder: "",
    maxUses: "",
    appliesToAll: true,
    categories: [] as string[],
    expiresAt: "",
  });

  const fetchDiscounts = async () => {
    try {
      const res = await fetch("/api/discounts");
      const data = await res.json();
      if (Array.isArray(data)) setDiscounts(data);
    } catch {}
    setLoading(false);
  };

  useEffect(() => { fetchDiscounts(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.code || !form.value) {
      alert("Code and value are required");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/discounts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          categories: form.appliesToAll ? null : form.categories.join(","),
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error);
      }

      setForm({ code: "", description: "", type: "percentage", value: "", minOrder: "", maxUses: "", appliesToAll: true, categories: [], expiresAt: "" });
      setShowForm(false);
      fetchDiscounts();
    } catch (err: any) {
      alert(err.message || "Failed to create discount");
    }
    setSubmitting(false);
  };

  const handleToggle = async (id: string, currentState: boolean) => {
    try {
      await fetch("/api/discounts", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isActive: !currentState }),
      });
      setDiscounts(discounts.map((d) => d.id === id ? { ...d, isActive: !currentState } : d));
    } catch {}
  };

  const handleDelete = async (id: string, code: string) => {
    if (!confirm(`Delete discount "${code}"? This cannot be undone.`)) return;
    try {
      await fetch(`/api/discounts?id=${id}`, { method: "DELETE" });
      setDiscounts(discounts.filter((d) => d.id !== id));
    } catch {}
  };

  const toggleCategory = (cat: string) => {
    setForm((prev) => ({
      ...prev,
      categories: prev.categories.includes(cat)
        ? prev.categories.filter((c) => c !== cat)
        : [...prev.categories, cat],
    }));
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl md:text-4xl text-[var(--color-gold)] mb-1">Discounts</h1>
          <p className="font-sans text-[10px] uppercase tracking-widest text-[var(--color-faint)]">
            Manage coupon codes & promotions — {discounts.length} discount{discounts.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-gold px-6 py-3 font-sans text-[10px] uppercase tracking-widest font-semibold rounded-sm flex items-center gap-2"
        >
          {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showForm ? "Cancel" : "Create Discount"}
        </button>
      </div>

      {/* Create Form */}
      {showForm && (
        <div className="bg-[var(--color-bg-low)] border border-[var(--color-border)]/20 rounded-sm p-6 md:p-8 mb-8 animate-[fadeUp_0.3s_ease]">
          <h2 className="font-display text-2xl text-[var(--color-gold)] mb-6">New Discount Code</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Code */}
              <div>
                <label className="font-sans text-[9px] uppercase tracking-[0.25em] text-[var(--color-faint)] block mb-2">Discount Code *</label>
                <input
                  type="text"
                  value={form.code}
                  onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase().replace(/\s/g, "") })}
                  className="w-full bg-[var(--color-bg-deep)] border border-[var(--color-border)]/30 focus:border-[var(--color-gold)] focus:outline-none rounded-sm px-4 py-3 text-[var(--color-muted)] font-sans text-sm uppercase tracking-widest"
                  placeholder="KANTI20"
                  maxLength={20}
                />
              </div>

              {/* Description */}
              <div>
                <label className="font-sans text-[9px] uppercase tracking-[0.25em] text-[var(--color-faint)] block mb-2">Description</label>
                <input
                  type="text"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full bg-[var(--color-bg-deep)] border border-[var(--color-border)]/30 focus:border-[var(--color-gold)] focus:outline-none rounded-sm px-4 py-3 text-[var(--color-muted)] font-sans text-sm"
                  placeholder="e.g. 20% off for new customers"
                />
              </div>

              {/* Type */}
              <div>
                <label className="font-sans text-[9px] uppercase tracking-[0.25em] text-[var(--color-faint)] block mb-2">Discount Type</label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, type: "percentage" })}
                    className={`flex-1 py-3 px-4 rounded-sm border font-sans text-[10px] uppercase tracking-widest transition-all ${
                      form.type === "percentage"
                        ? "border-[var(--color-gold-mid)] text-[var(--color-gold)] bg-[var(--color-bg-high)]"
                        : "border-[var(--color-border)]/30 text-[var(--color-faint)] bg-[var(--color-bg-card)]"
                    }`}
                  >
                    % Percentage
                  </button>
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, type: "fixed" })}
                    className={`flex-1 py-3 px-4 rounded-sm border font-sans text-[10px] uppercase tracking-widest transition-all ${
                      form.type === "fixed"
                        ? "border-[var(--color-gold-mid)] text-[var(--color-gold)] bg-[var(--color-bg-high)]"
                        : "border-[var(--color-border)]/30 text-[var(--color-faint)] bg-[var(--color-bg-card)]"
                    }`}
                  >
                    ₹ Fixed Amount
                  </button>
                </div>
              </div>

              {/* Value */}
              <div>
                <label className="font-sans text-[9px] uppercase tracking-[0.25em] text-[var(--color-faint)] block mb-2">
                  {form.type === "percentage" ? "Percentage Off *" : "Amount Off (INR) *"}
                </label>
                <input
                  type="number"
                  value={form.value}
                  onChange={(e) => setForm({ ...form, value: e.target.value })}
                  className="w-full bg-[var(--color-bg-deep)] border border-[var(--color-border)]/30 focus:border-[var(--color-gold)] focus:outline-none rounded-sm px-4 py-3 text-[var(--color-muted)] font-sans text-sm"
                  placeholder={form.type === "percentage" ? "20" : "500"}
                  min="0"
                  max={form.type === "percentage" ? "100" : undefined}
                />
              </div>

              {/* Min Order */}
              <div>
                <label className="font-sans text-[9px] uppercase tracking-[0.25em] text-[var(--color-faint)] block mb-2">Minimum Order (INR)</label>
                <input
                  type="number"
                  value={form.minOrder}
                  onChange={(e) => setForm({ ...form, minOrder: e.target.value })}
                  className="w-full bg-[var(--color-bg-deep)] border border-[var(--color-border)]/30 focus:border-[var(--color-gold)] focus:outline-none rounded-sm px-4 py-3 text-[var(--color-muted)] font-sans text-sm"
                  placeholder="0 (no minimum)"
                  min="0"
                />
              </div>

              {/* Max Uses */}
              <div>
                <label className="font-sans text-[9px] uppercase tracking-[0.25em] text-[var(--color-faint)] block mb-2">Max Uses</label>
                <input
                  type="number"
                  value={form.maxUses}
                  onChange={(e) => setForm({ ...form, maxUses: e.target.value })}
                  className="w-full bg-[var(--color-bg-deep)] border border-[var(--color-border)]/30 focus:border-[var(--color-gold)] focus:outline-none rounded-sm px-4 py-3 text-[var(--color-muted)] font-sans text-sm"
                  placeholder="0 (unlimited)"
                  min="0"
                />
              </div>

              {/* Expires */}
              <div>
                <label className="font-sans text-[9px] uppercase tracking-[0.25em] text-[var(--color-faint)] block mb-2">Expiry Date</label>
                <input
                  type="datetime-local"
                  value={form.expiresAt}
                  onChange={(e) => setForm({ ...form, expiresAt: e.target.value })}
                  className="w-full bg-[var(--color-bg-deep)] border border-[var(--color-border)]/30 focus:border-[var(--color-gold)] focus:outline-none rounded-sm px-4 py-3 text-[var(--color-muted)] font-sans text-sm cursor-pointer"
                />
              </div>
            </div>

            {/* Category Targeting */}
            <div>
              <label className="font-sans text-[9px] uppercase tracking-[0.25em] text-[var(--color-faint)] block mb-3">Applies To</label>
              <div className="flex gap-3 mb-3">
                <button
                  type="button"
                  onClick={() => setForm({ ...form, appliesToAll: true, categories: [] })}
                  className={`py-2 px-5 rounded-sm border font-sans text-[10px] uppercase tracking-widest transition-all ${
                    form.appliesToAll
                      ? "border-[var(--color-gold-mid)] text-[var(--color-gold)] bg-[var(--color-bg-high)]"
                      : "border-[var(--color-border)]/30 text-[var(--color-faint)] bg-[var(--color-bg-card)]"
                  }`}
                >
                  All Products
                </button>
                <button
                  type="button"
                  onClick={() => setForm({ ...form, appliesToAll: false })}
                  className={`py-2 px-5 rounded-sm border font-sans text-[10px] uppercase tracking-widest transition-all ${
                    !form.appliesToAll
                      ? "border-[var(--color-gold-mid)] text-[var(--color-gold)] bg-[var(--color-bg-high)]"
                      : "border-[var(--color-border)]/30 text-[var(--color-faint)] bg-[var(--color-bg-card)]"
                  }`}
                >
                  Specific Categories
                </button>
              </div>
              {!form.appliesToAll && (
                <div className="flex flex-wrap gap-2 animate-[fadeUp_0.2s_ease]">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => toggleCategory(cat)}
                      className={`py-2 px-4 rounded-sm border font-sans text-[10px] uppercase tracking-widest transition-all ${
                        form.categories.includes(cat)
                          ? "border-[var(--color-gold-mid)] text-[var(--color-gold)] bg-[var(--color-gold)]/10"
                          : "border-[var(--color-border)]/30 text-[var(--color-faint)]"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn-gold px-10 py-4 font-sans text-xs uppercase tracking-[0.22em] font-semibold rounded-sm flex items-center gap-2 disabled:opacity-50"
            >
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Tag className="w-4 h-4" />}
              {submitting ? "Creating..." : "Create Discount"}
            </button>
          </form>
        </div>
      )}

      {/* Discounts List */}
      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="skeleton h-24 rounded-sm"></div>
          ))}
        </div>
      ) : discounts.length === 0 ? (
        <div className="text-center py-20 bg-[var(--color-bg-low)] rounded-sm border border-[var(--color-border)]/15">
          <Tag className="w-12 h-12 text-[var(--color-faint)]/30 mx-auto mb-4" />
          <p className="font-display text-2xl text-[var(--color-faint)] mb-2">No discounts yet</p>
          <p className="font-sans text-sm text-[var(--color-faint)]/60">Create your first coupon code</p>
        </div>
      ) : (
        <div className="space-y-3">
          {discounts.map((d) => (
            <div
              key={d.id}
              className={`bg-[var(--color-bg-low)] rounded-sm border border-[var(--color-border)]/15 p-5 transition-opacity ${!d.isActive ? "opacity-50" : ""}`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-sm bg-[var(--color-gold)]/10 flex items-center justify-center shrink-0">
                    <Tag className="w-5 h-5 text-[var(--color-gold)]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-sans text-sm text-[var(--color-cream)] font-semibold tracking-wider">{d.code}</span>
                      <span className={`px-2 py-0.5 text-[8px] font-bold uppercase tracking-widest rounded-full ${
                        d.isActive ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"
                      }`}>
                        {d.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>
                    <p className="font-sans text-[10px] text-[var(--color-faint)] mb-1">
                      {d.description || (d.type === "percentage" ? `${d.value}% off` : `₹${d.value} off`)}
                      {d.minOrder > 0 && ` · Min order ₹${d.minOrder.toLocaleString("en-IN")}`}
                      {!d.appliesToAll && d.categories && ` · ${d.categories}`}
                    </p>
                    <div className="flex gap-4 font-sans text-[9px] uppercase tracking-widest text-[var(--color-faint)]/60">
                      <span>
                        {d.type === "percentage" ? `${d.value}%` : `₹${d.value}`} off
                      </span>
                      <span>
                        Used: {d.usedCount}{d.maxUses > 0 ? `/${d.maxUses}` : ""}
                      </span>
                      {d.expiresAt && (
                        <span>
                          Expires: {new Date(d.expiresAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleToggle(d.id, d.isActive)}
                    className="text-[var(--color-faint)] hover:text-[var(--color-gold)] transition-colors p-2"
                    title={d.isActive ? "Deactivate" : "Activate"}
                  >
                    {d.isActive ? <ToggleRight className="w-6 h-6 text-green-400" /> : <ToggleLeft className="w-6 h-6" />}
                  </button>
                  <button
                    onClick={() => handleDelete(d.id, d.code)}
                    className="text-[var(--color-faint)]/50 hover:text-red-400 transition-colors p-2"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
