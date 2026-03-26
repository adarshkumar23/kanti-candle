"use client";

import { useState } from "react";
import { UploadCloud } from "lucide-react";

export default function AdminDashboard() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([
    "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&q=80",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBKfh5G09V5s_veL5tO4Kb9QWyv7h5fm79XLAwMPQ0rJxkTdG8fNzV4Jy_lr4jfN8SHlC8eqcu055ZVwf_DsaWdy-5LoIFzHOHJ2J2ii1cO31R_ntGHOsQnKBVaFPRkwePl_XSs_mAwx4wcF9QayPwqUrPMKj7yJiVBZdJ-APCIRbsypNxnw9GMxonXmvJc7uv5GxcxDC5JSdCAkDOLToCtKCVgkOQnpFtxL2G6cTDkhcd90yujwxbTh5uDrbaLUpwDQpQdy2fkbAU",
  ]);

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    try {
      const response = await fetch(`/api/upload?filename=${encodeURIComponent(file.name)}`, {
        method: "POST",
        body: file,
      });
      const blob = await response.json();
      
      if (blob.url) {
        setUploadedImages([blob.url, ...uploadedImages]);
        setFile(null);
        alert("✦ Picture securely uploaded to Vercel Blob!");
      } else {
        alert("Upload failed.");
      }
    } catch (e) {
      console.error(e);
      alert("Network error uploading image.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-[fadeUp_0.4s_ease]">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-[var(--color-border)]/20 pb-5 gap-2">
        <div>
          <h1 className="font-display text-3xl md:text-4xl text-[var(--color-gold)]">Gallery Hub</h1>
          <p className="font-sans text-[var(--color-faint)] text-xs md:text-sm tracking-widest uppercase mt-2">Manage product and lifestyle pictures</p>
        </div>
      </div>

      <div className="bg-[var(--color-bg-low)] border border-[var(--color-border)]/20 rounded-sm p-4 md:p-8">
        <h2 className="font-sans text-[10px] uppercase tracking-[0.25em] text-[var(--color-gold-mid)] mb-4 md:mb-6">Upload New Picture</h2>
        <div className="border-2 border-dashed border-[var(--color-border)]/40 hover:border-[var(--color-gold-mid)]/50 transition-colors rounded-sm p-6 md:p-12 flex flex-col items-center justify-center text-center cursor-pointer relative overflow-hidden">
          <input 
            type="file" 
            accept="image/*" 
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
          <UploadCloud className="w-8 h-8 md:w-10 md:h-10 text-[var(--color-faint)] mb-4" />
          {file ? (
            <p className="font-sans text-[var(--color-gold)] text-sm md:text-lg w-full truncate px-4">{file.name}</p>
          ) : (
            <>
              <p className="font-display text-xl md:text-2xl text-[var(--color-muted)] mb-2 px-2">Drag & Drop or Tap to Browse</p>
              <p className="font-sans text-[10px] md:text-xs text-[var(--color-faint)]">Supports JPG, PNG, WEBP max 5MB</p>
            </>
          )}
        </div>
        <div className="mt-6 flex justify-end">
          <button 
            onClick={handleUpload}
            disabled={!file || uploading}
            className={`w-full md:w-auto px-8 py-4 md:py-3 font-sans text-[10px] md:text-xs uppercase tracking-widest rounded-sm font-semibold transition-all ${(!file || uploading) ? "bg-[var(--color-bg-card)] text-[var(--color-faint)] cursor-not-allowed" : "bg-[var(--color-gold-mid)] hover:bg-[var(--color-gold)] text-black shadow-[0_0_15px_rgba(243,190,99,0.2)]"}`}
          >
            {uploading ? "Uploading Securely..." : "Upload to Cloud"}
          </button>
        </div>
      </div>

      <div>
        <h2 className="font-sans text-[10px] uppercase tracking-[0.25em] text-[var(--color-gold-mid)] mb-6">Recent Uploads</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {uploadedImages.map((src, i) => (
            <div key={i} className="aspect-square rounded-sm overflow-hidden border border-[var(--color-border)]/20 relative group">
              <img src={src} alt="Uploaded" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button className="text-[var(--color-gold)] border border-[var(--color-gold)] px-4 py-2 font-sans text-[9px] uppercase tracking-widest rounded-sm hover:bg-[var(--color-gold)]/10">Use in Shop</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
