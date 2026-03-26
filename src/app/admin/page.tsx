"use client";

import { useState, useEffect, useRef } from "react";
import { UploadCloud, Loader2, X, CheckCircle, AlertCircle } from "lucide-react";

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "";
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "kanti_gallery";

export default function AdminDashboard() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [loadingGallery, setLoadingGallery] = useState(true);
  const [toast, setToast] = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/gallery")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setUploadedImages(data.map((img: any) => img.url));
      })
      .catch(console.error)
      .finally(() => setLoadingGallery(false));
  }, []);

  const showToast = (type: "success" | "error", msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 4000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.size > 8 * 1024 * 1024) {
      showToast("error", "File too large. Maximum size is 8 MB.");
      return;
    }
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleUpload = async () => {
    if (!file) return;

    if (!CLOUD_NAME) {
      showToast("error", "NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is not set in environment variables.");
      return;
    }

    setUploading(true);
    setProgress(0);

    try {
      // Upload directly to Cloudinary (no backend token required)
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);
      formData.append("folder", "kanti-gallery");

      const xhr = new XMLHttpRequest();
      xhr.open("POST", `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`);

      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) setProgress(Math.round((e.loaded / e.total) * 90));
      };

      const result: any = await new Promise((resolve, reject) => {
        xhr.onload = () => {
          if (xhr.status === 200) resolve(JSON.parse(xhr.responseText));
          else reject(new Error(JSON.parse(xhr.responseText).error?.message || "Upload failed"));
        };
        xhr.onerror = () => reject(new Error("Network error"));
        xhr.send(formData);
      });

      setProgress(95);

      // Save URL to our DB
      await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: result.secure_url }),
      });

      setProgress(100);
      setUploadedImages((prev) => [result.secure_url, ...prev]);
      setFile(null);
      setPreview(null);
      if (inputRef.current) inputRef.current.value = "";
      showToast("success", "Image uploaded successfully!");
    } catch (err: any) {
      showToast("error", err.message || "Upload failed. Please try again.");
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  const handleRemove = async (url: string) => {
    setUploadedImages((prev) => prev.filter((u) => u !== url));
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-sm border shadow-xl animate-[fadeUp_0.3s_ease] ${
            toast.type === "success"
              ? "bg-[var(--color-bg-low)] border-green-500/30 text-green-400"
              : "bg-[var(--color-bg-low)] border-red-500/30 text-red-400"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircle className="w-4 h-4 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0" />
          )}
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
          {uploadedImages.length} image{uploadedImages.length !== 1 ? "s" : ""}
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
          {preview ? (
            <img src={preview} alt="Preview" className="max-h-40 rounded-sm object-contain mb-4" />
          ) : (
            <UploadCloud className="w-10 h-10 text-[var(--color-faint)]/50 mb-4" />
          )}
          {file ? (
            <p className="font-sans text-[var(--color-gold)] text-sm truncate max-w-xs">{file.name}</p>
          ) : (
            <>
              <p className="font-display text-2xl text-[var(--color-muted)] mb-2">Drag & Drop or Click to Browse</p>
              <p className="font-sans text-xs text-[var(--color-faint)]">JPG · PNG · WEBP · up to 8 MB</p>
            </>
          )}
        </label>

        {/* Progress bar */}
        {uploading && (
          <div className="mt-4 h-1 bg-[var(--color-bg-card)] rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--color-gold-mid)] transition-all duration-300 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        <div className="mt-6 flex items-center justify-between gap-4">
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
            className={`ml-auto flex items-center gap-2 px-8 py-3 font-sans text-xs uppercase tracking-widest rounded-sm font-semibold transition-all ${
              !file || uploading
                ? "bg-[var(--color-bg-card)] text-[var(--color-faint)] cursor-not-allowed"
                : "btn-gold"
            }`}
          >
            {uploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Uploading {progress > 0 ? `${progress}%` : "..."}
              </>
            ) : (
              <>
                <UploadCloud className="w-4 h-4" />
                Upload Image
              </>
            )}
          </button>
        </div>
      </div>

      {/* Gallery grid */}
      <div>
        <h2 className="font-sans text-[10px] uppercase tracking-[0.25em] text-[var(--color-gold-mid)] mb-6">
          Uploaded Images
        </h2>

        {loadingGallery ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-[var(--color-faint)]/40 animate-spin" />
          </div>
        ) : uploadedImages.length === 0 ? (
          <div className="border border-dashed border-[var(--color-border)]/30 rounded-sm py-20 flex flex-col items-center justify-center text-center">
            <p className="font-display text-2xl text-[var(--color-muted)] mb-2">Gallery is empty</p>
            <p className="font-sans text-xs text-[var(--color-faint)]">Upload your first image above.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {uploadedImages.map((src, i) => (
              <div key={i} className="aspect-square rounded-sm overflow-hidden border border-[var(--color-border)]/20 relative group">
                <img src={src} alt="Gallery" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3">
                  <button
                    onClick={() => navigator.clipboard.writeText(src)}
                    className="text-[var(--color-gold)] border border-[var(--color-gold)]/40 px-4 py-2 font-sans text-[9px] uppercase tracking-widest rounded-sm hover:bg-[var(--color-gold)]/10 transition-colors"
                  >
                    Copy URL
                  </button>
                  <button
                    onClick={() => handleRemove(src)}
                    className="text-red-400 border border-red-400/30 px-4 py-2 font-sans text-[9px] uppercase tracking-widest rounded-sm hover:bg-red-400/10 transition-colors"
                  >
                    Remove
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
