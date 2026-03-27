"use client";

import { useState, useEffect, useRef } from "react";
import { UploadCloud, Loader2, X, CheckCircle, AlertCircle, Trash2 } from "lucide-react";

interface GalleryImage { id: string; url: string; createdAt: string; }

export default function AdminDashboard() {
  const [file, setFile]       = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [images, setImages]   = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast]     = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /* ── load gallery from DB on mount ── */
  const loadGallery = async () => {
    try {
      const res  = await fetch("/api/gallery");
      const data = await res.json();
      if (Array.isArray(data)) setImages(data);
      else showToast("error", data.error || "Could not load gallery");
    } catch {
      showToast("error", "Network error loading gallery");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadGallery(); }, []);

  const showToast = (type: "success" | "error", msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 4500);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.size > 8 * 1024 * 1024) { showToast("error", "File too large — max 8 MB"); return; }
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    try {
      /* step 1 — upload to Cloudinary */
      const upRes  = await fetch(`/api/upload?filename=${encodeURIComponent(file.name)}`, {
        method: "POST",
        body: file,
      });
      const upData = await upRes.json();

      if (!upData.url) {
        showToast("error", upData.error || "Upload failed");
        return;
      }

      /* step 2 — persist URL to database */
      const dbRes  = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: upData.url }),
      });
      const dbData = await dbRes.json();

      if (!dbRes.ok) {
        showToast("error", `Saved to cloud but DB failed: ${dbData.error}`);
        return;
      }

      /* success — prepend to list */
      setImages((prev) => [dbData, ...prev]);
      setFile(null);
      setPreview(null);
      if (inputRef.current) inputRef.current.value = "";
      showToast("success", "Image uploaded & saved!");

    } catch {
      showToast("error", "Network error — please try again");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this image from the gallery?")) return;
    try {
      await fetch(`/api/gallery?id=${id}`, { method: "DELETE" });
      setImages((prev) => prev.filter((img) => img.id !== id));
    } catch {
      showToast("error", "Could not delete image");
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10">

      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-sm border shadow-xl
          ${toast.type === "success"
            ? "bg-[var(--color-bg-low)] border-green-500/30 text-green-400"
            : "bg-[var(--color-bg-low)] border-red-500/30 text-red-400"}`}>
          {toast.type === "success"
            ? <CheckCircle className="w-4 h-4 shrink-0" />
            : <AlertCircle className="w-4 h-4 shrink-0" />}
          <p className="font-sans text-sm">{toast.msg}</p>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-[var(--color-border)]/20 pb-5 gap-2">
        <div>
          <h1 className="font-display text-3xl md:text-4xl text-[var(--color-gold)]">Gallery Hub</h1>
          <p className="font-sans text-[var(--color-faint)] text-xs tracking-widest uppercase mt-2">
            Manage product and lifestyle pictures
          </p>
        </div>
        <span className="font-sans text-[10px] text-[var(--color-faint)] bg-[var(--color-bg-card)] px-3 py-1.5 rounded-sm border border-[var(--color-border)]/20">
          {images.length} image{images.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Upload zone */}
      <div className="bg-[var(--color-bg-low)] border border-[var(--color-border)]/20 rounded-sm p-4 md:p-8">
        <h2 className="font-sans text-[10px] uppercase tracking-[0.25em] text-[var(--color-gold-mid)] mb-6">
          Upload New Picture
        </h2>

        <label className="block border-2 border-dashed border-[var(--color-border)]/40 hover:border-[var(--color-gold-mid)]/50 transition-colors rounded-sm p-8 md:p-12 flex flex-col items-center justify-center text-center cursor-pointer relative">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={handleFileChange}
            disabled={uploading}
          />
          {preview
            ? <img src={preview} alt="Preview" className="max-h-40 rounded-sm object-contain mb-4" />
            : <UploadCloud className="w-10 h-10 text-[var(--color-faint)]/50 mb-4" />}
          {file
            ? <p className="font-sans text-[var(--color-gold)] text-sm truncate max-w-xs">{file.name}</p>
            : <>
                <p className="font-display text-2xl text-[var(--color-muted)] mb-2">Drag & Drop or Click</p>
                <p className="font-sans text-xs text-[var(--color-faint)]">JPG · PNG · WEBP · up to 8 MB</p>
              </>}
        </label>

        <div className="mt-6 flex items-center justify-end gap-4">
          {file && !uploading && (
            <button
              onClick={() => { setFile(null); setPreview(null); if (inputRef.current) inputRef.current.value = ""; }}
              className="flex items-center gap-2 font-sans text-[10px] uppercase tracking-widest text-[var(--color-faint)] hover:text-red-400 transition-colors"
            >
              <X className="w-3.5 h-3.5" /> Clear
            </button>
          )}
          <button
            onClick={handleUpload}
            disabled={!file || uploading}
            className={`flex items-center gap-2 px-8 py-3 font-sans text-xs uppercase tracking-widest rounded-sm font-semibold transition-all
              ${!file || uploading
                ? "bg-[var(--color-bg-card)] text-[var(--color-faint)] cursor-not-allowed"
                : "btn-gold"}`}
          >
            {uploading
              ? <><Loader2 className="w-4 h-4 animate-spin" /> Uploading...</>
              : <><UploadCloud className="w-4 h-4" /> Upload Image</>}
          </button>
        </div>
      </div>

      {/* Gallery grid */}
      <div>
        <h2 className="font-sans text-[10px] uppercase tracking-[0.25em] text-[var(--color-gold-mid)] mb-6">
          Uploaded Images
        </h2>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-[var(--color-faint)]/40 animate-spin" />
          </div>
        ) : images.length === 0 ? (
          <div className="border border-dashed border-[var(--color-border)]/30 rounded-sm py-20 flex flex-col items-center justify-center text-center">
            <p className="font-display text-2xl text-[var(--color-muted)] mb-2">Gallery is empty</p>
            <p className="font-sans text-xs text-[var(--color-faint)]">Upload your first image above.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((img) => (
              <div key={img.id} className="aspect-square rounded-sm overflow-hidden border border-[var(--color-border)]/20 relative group">
                <img src={img.url} alt="Gallery" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3 p-3">
                  <button
                    onClick={() => navigator.clipboard.writeText(img.url)}
                    className="w-full text-[var(--color-gold)] border border-[var(--color-gold)]/40 px-3 py-2 font-sans text-[9px] uppercase tracking-widest rounded-sm hover:bg-[var(--color-gold)]/10 transition-colors"
                  >
                    Copy URL
                  </button>
                  <button
                    onClick={() => handleDelete(img.id)}
                    className="w-full flex items-center justify-center gap-1.5 text-red-400 border border-red-400/30 px-3 py-2 font-sans text-[9px] uppercase tracking-widest rounded-sm hover:bg-red-400/10 transition-colors"
                  >
                    <Trash2 className="w-3 h-3" /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
