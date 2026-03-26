"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Package, Upload, X, Loader2 } from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string | null;
  category: string;
  stock: number;
  createdAt: string;
}

const CATEGORIES = ["Signature", "Floral", "Woody", "Oriental", "Citrus", "Earthy", "Limited Edition"];

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
    category: "Signature",
    stock: "100",
  });

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      if (Array.isArray(data)) setProducts(data);
    } catch {}
    setLoading(false);
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const res = await fetch(`/api/upload?filename=${encodeURIComponent(file.name)}`, {
        method: "POST",
        body: file,
      });
      const data = await res.json();
      if (data.url) {
        setForm({ ...form, imageUrl: data.url });
      }
    } catch {
      alert("Upload failed. Please try again.");
    }
    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.description || !form.price) {
      alert("Please fill in all required fields");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error);
      }

      setForm({ name: "", description: "", price: "", imageUrl: "", category: "Signature", stock: "100" });
      setShowForm(false);
      fetchProducts();
    } catch (err: any) {
      alert(err.message || "Failed to create product");
    }
    setSubmitting(false);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    try {
      await fetch(`/api/products?id=${id}`, { method: "DELETE" });
      setProducts(products.filter((p) => p.id !== id));
    } catch {}
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl md:text-4xl text-[var(--color-gold)] mb-1">Products</h1>
          <p className="font-sans text-[10px] uppercase tracking-widest text-[var(--color-faint)]">
            Manage your candle catalog — {products.length} product{products.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-gold px-6 py-3 font-sans text-[10px] uppercase tracking-widest font-semibold rounded-sm flex items-center gap-2"
        >
          {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showForm ? "Cancel" : "Add Product"}
        </button>
      </div>

      {/* Add Product Form */}
      {showForm && (
        <div className="bg-[var(--color-bg-low)] border border-[var(--color-border)]/20 rounded-sm p-6 md:p-8 mb-8 animate-[fadeUp_0.3s_ease]">
          <h2 className="font-display text-2xl text-[var(--color-gold)] mb-6">New Product</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="font-sans text-[9px] uppercase tracking-[0.25em] text-[var(--color-faint)] block mb-2">Product Name *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-[var(--color-bg-deep)] border border-[var(--color-border)]/30 focus:border-[var(--color-gold)] focus:outline-none rounded-sm px-4 py-3 text-[var(--color-muted)] font-sans text-sm"
                  placeholder="e.g. Midnight Rose"
                />
              </div>

              {/* Category */}
              <div>
                <label className="font-sans text-[9px] uppercase tracking-[0.25em] text-[var(--color-faint)] block mb-2">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full bg-[var(--color-bg-deep)] border border-[var(--color-border)]/30 focus:border-[var(--color-gold)] focus:outline-none rounded-sm px-4 py-3 text-[var(--color-muted)] font-sans text-sm cursor-pointer"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Price */}
              <div>
                <label className="font-sans text-[9px] uppercase tracking-[0.25em] text-[var(--color-faint)] block mb-2">Price (INR) *</label>
                <input
                  type="number"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  className="w-full bg-[var(--color-bg-deep)] border border-[var(--color-border)]/30 focus:border-[var(--color-gold)] focus:outline-none rounded-sm px-4 py-3 text-[var(--color-muted)] font-sans text-sm"
                  placeholder="2400"
                  min="0"
                />
              </div>

              {/* Stock */}
              <div>
                <label className="font-sans text-[9px] uppercase tracking-[0.25em] text-[var(--color-faint)] block mb-2">Stock Quantity</label>
                <input
                  type="number"
                  value={form.stock}
                  onChange={(e) => setForm({ ...form, stock: e.target.value })}
                  className="w-full bg-[var(--color-bg-deep)] border border-[var(--color-border)]/30 focus:border-[var(--color-gold)] focus:outline-none rounded-sm px-4 py-3 text-[var(--color-muted)] font-sans text-sm"
                  placeholder="100"
                  min="0"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="font-sans text-[9px] uppercase tracking-[0.25em] text-[var(--color-faint)] block mb-2">Description *</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={3}
                className="w-full bg-[var(--color-bg-deep)] border border-[var(--color-border)]/30 focus:border-[var(--color-gold)] focus:outline-none rounded-sm px-4 py-3 text-[var(--color-muted)] font-sans text-sm resize-none"
                placeholder="Describe the candle — scent notes, mood, occasion..."
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="font-sans text-[9px] uppercase tracking-[0.25em] text-[var(--color-faint)] block mb-2">Product Image</label>
              <div className="flex gap-4 items-start">
                <div className="flex-1">
                  <input
                    type="text"
                    value={form.imageUrl}
                    onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                    className="w-full bg-[var(--color-bg-deep)] border border-[var(--color-border)]/30 focus:border-[var(--color-gold)] focus:outline-none rounded-sm px-4 py-3 text-[var(--color-muted)] font-sans text-sm"
                    placeholder="Image URL or upload below"
                  />
                </div>
                <label className="btn-outline px-4 py-3 font-sans text-[10px] uppercase tracking-widest font-semibold rounded-sm flex items-center gap-2 cursor-pointer shrink-0">
                  {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                  Upload
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
              </div>
              {form.imageUrl && (
                <div className="mt-3 w-24 h-24 rounded-sm overflow-hidden bg-[var(--color-bg-card)]">
                  <img src={form.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn-gold px-10 py-4 font-sans text-xs uppercase tracking-[0.22em] font-semibold rounded-sm flex items-center gap-2 disabled:opacity-50"
            >
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
              {submitting ? "Creating..." : "Create Product"}
            </button>
          </form>
        </div>
      )}

      {/* Products Table */}
      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="skeleton h-20 rounded-sm"></div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 bg-[var(--color-bg-low)] rounded-sm border border-[var(--color-border)]/15">
          <Package className="w-12 h-12 text-[var(--color-faint)]/30 mx-auto mb-4" />
          <p className="font-display text-2xl text-[var(--color-faint)] mb-2">No products yet</p>
          <p className="font-sans text-sm text-[var(--color-faint)]/60">Add your first candle to the catalog</p>
        </div>
      ) : (
        <div className="bg-[var(--color-bg-low)] rounded-sm border border-[var(--color-border)]/15 overflow-hidden">
          {/* Table Header */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 border-b border-[var(--color-border)]/15 bg-[var(--color-bg-card)]">
            <span className="col-span-1 font-sans text-[9px] uppercase tracking-widest text-[var(--color-faint)]">Image</span>
            <span className="col-span-3 font-sans text-[9px] uppercase tracking-widest text-[var(--color-faint)]">Name</span>
            <span className="col-span-2 font-sans text-[9px] uppercase tracking-widest text-[var(--color-faint)]">Category</span>
            <span className="col-span-2 font-sans text-[9px] uppercase tracking-widest text-[var(--color-faint)]">Price</span>
            <span className="col-span-2 font-sans text-[9px] uppercase tracking-widest text-[var(--color-faint)]">Stock</span>
            <span className="col-span-2 font-sans text-[9px] uppercase tracking-widest text-[var(--color-faint)]">Actions</span>
          </div>

          {/* Rows */}
          {products.map((p) => (
            <div key={p.id} className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-[var(--color-border)]/10 items-center hover:bg-[var(--color-bg-card)]/50 transition-colors">
              <div className="col-span-4 md:col-span-1">
                <div className="w-12 h-12 rounded-sm overflow-hidden bg-[var(--color-bg-card)]">
                  {p.imageUrl ? (
                    <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="w-5 h-5 text-[var(--color-faint)]/30" />
                    </div>
                  )}
                </div>
              </div>
              <div className="col-span-8 md:col-span-3">
                <p className="font-sans text-sm text-[var(--color-muted)] font-medium">{p.name}</p>
                <p className="font-sans text-[10px] text-[var(--color-faint)] truncate mt-0.5">{p.description}</p>
              </div>
              <div className="hidden md:block col-span-2">
                <span className="font-sans text-[10px] uppercase tracking-widest text-[var(--color-faint)] bg-[var(--color-bg-card)] px-2 py-1 rounded-sm">
                  {p.category}
                </span>
              </div>
              <div className="hidden md:block col-span-2">
                <span className="font-sans text-sm text-[var(--color-gold-mid)] font-semibold">
                  ₹{p.price.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="hidden md:block col-span-2">
                <span className={`font-sans text-sm ${p.stock > 10 ? "text-green-400" : p.stock > 0 ? "text-orange-400" : "text-red-400"}`}>
                  {p.stock} units
                </span>
              </div>
              <div className="col-span-12 md:col-span-2 flex gap-2">
                <button
                  onClick={() => handleDelete(p.id, p.name)}
                  className="text-[var(--color-faint)]/50 hover:text-red-400 transition-colors p-2"
                  title="Delete product"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
