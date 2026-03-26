"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, Loader2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";

export default function Customize() {
  const { addItem, setIsCartOpen } = useCart();
  const { addToast } = useToast();
  const [mode, setMode] = useState<"manual" | "ai">("manual");
  const [step, setStep] = useState(1);

  // Manual State
  const [scent, setScent] = useState("Jasmine Noir");
  const [jar, setJar] = useState("Round Classic");
  const [size, setSize] = useState("100g");
  const [color, setColor] = useState({ hex: "#F7F0E3", name: "Ivory" });
  const [wick, setWick] = useState("Cotton");
  const [labelStyle, setLabelStyle] = useState("Ornate");
  const [labelColor, setLabelColor] = useState("Cream");
  const [labelName, setLabelName] = useState("");

  // AI State
  const [aiPrompt, setAiPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImg, setGeneratedImg] = useState<string | null>(null);

  // Derived Price
  const basePrice = 1800;
  const sizeAdd = size === "200g" ? 400 : size === "400g" ? 900 : 0;
  const wickAdd = wick === "Wood" ? 200 : 0;
  const totalPrice = mode === "manual" ? basePrice + sizeAdd + wickAdd : 3200; // Flat 3200 premium for AI candle

  const handleGenerateAI = async () => {
    if (!aiPrompt) return;
    setIsGenerating(true);
    
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: aiPrompt })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        setIsGenerating(false);
        throw new Error(data.error || "Failed to generate image");
      }
      
      // The browser will now fetch the URL. The isGenerating spinner remains TRUE 
      // until the <img onLoad> sequence fires.
      setGeneratedImg(data.imageUrl);
    } catch (error: any) {
      console.error(error);
      alert(error.message);
      setIsGenerating(false);
    }
  };

  const handleAddToCart = () => {
    const name = mode === "manual" ? (labelName || scent) : "AI Custom Candle";
    addItem({
      slug: `custom-${Date.now()}`,
      name,
      size: mode === "manual" ? size : "Custom",
      price: totalPrice,
      imageUrl: mode === "ai" && generatedImg ? generatedImg : "https://images.unsplash.com/photo-1602523961358-f9f03dd557db?w=200&q=60",
    });
    addToast(`${name} added to cart`);
    setIsCartOpen(true);
  };

  return (
    <div className="pt-20 min-h-screen bg-[var(--color-bg)]">
      {/* Studio Header */}
      <div className="bg-[var(--color-bg-deep)] border-b border-[var(--color-border)]/20 px-6 md:px-12 py-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-[var(--color-gold-mid)]">The Kanti Studio</span>
            <h1 className="font-display text-5xl md:text-6xl italic text-[var(--color-gold)] mt-2 leading-tight">Create Your Kanti</h1>
            <p className="font-sans text-[var(--color-faint)] text-sm mt-2 uppercase tracking-widest">A candle as unique as you are</p>
          </div>
          
          {/* Mode Switcher */}
          <div className="flex bg-[var(--color-bg-low)] p-1 rounded-sm border border-[var(--color-border)]/30 w-fit">
            <button 
              onClick={() => setMode("manual")}
              className={`px-6 py-2.5 font-sans text-[10px] uppercase tracking-widest transition-colors ${mode === "manual" ? "bg-[var(--color-bg-card)] text-[var(--color-gold)] border border-[var(--color-gold-mid)]/40 rounded-sm" : "text-[var(--color-faint)] hover:text-[var(--color-muted)]"}`}
            >
              Manual Studio
            </button>
            <button 
              onClick={() => setMode("ai")}
              className={`px-6 py-2.5 font-sans text-[10px] uppercase tracking-widest flex items-center gap-2 transition-colors ${mode === "ai" ? "bg-[var(--color-bg-card)] text-[var(--color-gold)] border border-[var(--color-gold-mid)]/40 rounded-sm" : "text-[var(--color-faint)] hover:text-[var(--color-muted)]"}`}
            >
              <Sparkles className="w-3 h-3" /> AI Builder
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Side: Controls */}
        <div className="lg:col-span-7 space-y-4">
          
          {mode === "manual" ? (
            <>
              {/* STEP 1: SCENT */}
              <div className={`bg-[var(--color-bg-low)] rounded-sm overflow-hidden border border-[var(--color-border)]/20 ${step !== 1 && "opacity-60"}`}>
                <button onClick={() => setStep(1)} className="w-full flex items-center justify-between px-7 py-5">
                  <div className="flex items-baseline gap-4">
                    <span className="font-display text-4xl italic text-[var(--color-gold)]/20">01</span>
                    <h2 className={`font-display text-2xl ${step === 1 ? "text-[var(--color-gold)]" : "text-[var(--color-muted)]"}`}>Choose Your Scent</h2>
                  </div>
                </button>
                {step === 1 && (
                  <div className="px-7 pb-8 animate-[fadeUp_0.4s_ease]">
                    <div className="bg-[var(--color-bg-deep)] p-6 rounded-sm border-l-2 border-[var(--color-gold)]/20 mb-6">
                      <p className="font-sans text-[9px] uppercase tracking-widest text-[var(--color-faint)] mb-5">Select a Scent</p>
                      <div className="space-y-4">
                        {["Rose Oud", "Jasmine Noir", "Vetiver Earth"].map((sName) => (
                          <div key={sName} onClick={() => setScent(sName)} className="flex justify-between items-center cursor-pointer pb-4 border-b border-[var(--color-border)]/30 group">
                            <h4 className={`font-display text-xl transition-colors ${scent === sName ? "text-[var(--color-gold)]" : "text-gray-300 group-hover:text-[var(--color-gold)]"}`}>{sName}</h4>
                            <span className={`text-lg transition-colors ${scent === sName ? "text-[var(--color-gold)]" : "text-[var(--color-faint)]"}`}>{scent === sName ? "●" : "○"}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <button onClick={() => setStep(2)} className="btn-gold px-10 py-3 font-sans text-[10px] uppercase tracking-widest font-semibold rounded-sm">Next: Design</button>
                  </div>
                )}
              </div>

              {/* STEP 2: DESIGN */}
              <div className={`bg-[var(--color-bg-low)] rounded-sm overflow-hidden border border-[var(--color-border)]/20 ${step !== 2 && "opacity-60"}`}>
                <button onClick={() => setStep(2)} className="w-full flex items-center justify-between px-7 py-5">
                  <div className="flex items-baseline gap-4">
                    <span className="font-display text-4xl italic text-[var(--color-gold)]/20">02</span>
                    <h2 className={`font-display text-2xl ${step === 2 ? "text-[var(--color-gold)]" : "text-[var(--color-muted)]"}`}>Design Your Candle</h2>
                  </div>
                </button>
                {step === 2 && (
                  <div className="px-7 pb-8 animate-[fadeUp_0.4s_ease]">
                    <p className="font-sans text-[9px] uppercase tracking-widest text-[var(--color-faint)] mb-4">Wax Color</p>
                    <div className="flex flex-wrap gap-3 mb-8">
                      {[ 
                        { hex: "#F7F0E3", name: "Ivory" },
                        { hex: "#F4C2C2", name: "Blush Rose" },
                        { hex: "#1A1A1A", name: "Midnight Black" },
                        { hex: "#8FBC8F", name: "Sage Green" }
                      ].map((c) => (
                        <div 
                          key={c.name} 
                          onClick={() => setColor(c)} 
                          className={`w-9 h-9 rounded-full cursor-pointer border-2 transition-all ${color.name === c.name ? "border-[var(--color-gold)] scale-110 shadow-[0_0_10px_rgba(243,190,99,0.4)]" : "border-transparent"}`}
                          style={{ background: c.hex }} title={c.name}
                        />
                      ))}
                    </div>

                    <p className="font-sans text-[9px] uppercase tracking-widest text-[var(--color-faint)] mb-4">Size</p>
                    <div className="flex gap-3 mb-8">
                      {["100g", "200g", "400g"].map(s => (
                        <button key={s} onClick={() => setSize(s)} className={`font-sans text-[10px] py-2 px-5 rounded-sm border transition-all ${size === s ? "border-[var(--color-gold-mid)] text-[var(--color-gold)] bg-[var(--color-bg-high)]" : "border-[var(--color-border)]/30 text-[var(--color-faint)] bg-[var(--color-bg-card)]"}`}>{s}</button>
                      ))}
                    </div>
                    <button onClick={() => setStep(3)} className="btn-gold px-10 py-3 font-sans text-[10px] uppercase tracking-widest font-semibold rounded-sm">Next: Label</button>
                  </div>
                )}
              </div>

              {/* STEP 3: LABEL */}
              <div className={`bg-[var(--color-bg-low)] rounded-sm overflow-hidden border border-[var(--color-border)]/20 ${step !== 3 && "opacity-60"}`}>
                <button onClick={() => setStep(3)} className="w-full flex items-center justify-between px-7 py-5">
                  <div className="flex items-baseline gap-4">
                    <span className="font-display text-4xl italic text-[var(--color-gold)]/20">03</span>
                    <h2 className={`font-display text-2xl ${step === 3 ? "text-[var(--color-gold)]" : "text-[var(--color-muted)]"}`}>Personalize Label</h2>
                  </div>
                </button>
                {step === 3 && (
                  <div className="px-7 pb-8 animate-[fadeUp_0.4s_ease]">
                    <div className="space-y-6 mb-8">
                      <div>
                        <label className="font-sans text-[9px] uppercase tracking-[0.25em] text-[var(--color-faint)] block mb-2">Candle Name</label>
                        <input 
                          type="text" placeholder="e.g. Serenity"
                          value={labelName} onChange={(e) => setLabelName(e.target.value)}
                          className="w-full bg-transparent border-b border-[var(--color-border)]/40 focus:border-[var(--color-gold)] focus:outline-none text-[var(--color-muted)] placeholder:text-[var(--color-faint)]/40 font-sans text-sm py-3"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            /* AI BUILDER TAB */
            <div className="bg-[var(--color-bg-low)] rounded-sm border border-[var(--color-gold)]/30 p-8">
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="w-6 h-6 text-[var(--color-gold)]" />
                <h2 className="font-display text-3xl text-[var(--color-gold)]">AI Studio</h2>
              </div>
              <p className="font-sans text-[var(--color-muted)] text-sm leading-relaxed mb-6">
                Tell us your vision. Describe the vessel, the feeling, the aesthetic, or the mood. Our AI will digitally craft the candle of your dreams, which our artisans will physically bring to life.
              </p>
              
              <div className="space-y-4">
                <label className="font-sans text-[9px] uppercase tracking-[0.25em] text-[var(--color-faint)]">Your Vision (Prompt)</label>
                <textarea 
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  placeholder="A frosted glass jar with deep violet wax, smelling like a rainy Parisian night, cinematic lighting..." 
                  className="w-full h-32 bg-[var(--color-bg-deep)] border border-[var(--color-border)]/40 focus:border-[var(--color-gold)] focus:outline-none focus:ring-1 focus:ring-[var(--color-gold)]/50 rounded-sm p-4 text-[var(--color-muted)] font-sans text-sm resize-none"
                />
              </div>

              <button 
                onClick={handleGenerateAI}
                disabled={isGenerating || !aiPrompt}
                className={`mt-6 w-full py-4 font-sans text-xs uppercase tracking-[0.22em] font-semibold rounded-sm flex justify-center items-center gap-2 transition-all ${isGenerating ? "bg-[var(--color-gold-dim)] text-black cursor-not-allowed" : !aiPrompt ? "bg-[var(--color-bg-card)] text-[var(--color-faint)] border border-[var(--color-border)]" : "btn-gold border-none"}`}
              >
                {isGenerating ? <><Loader2 className="w-4 h-4 animate-spin" /> Crafting Vision...</> : "Generate Design"}
              </button>

              <div className="mt-6 border-t border-[var(--color-border)]/20 pt-6">
                <p className="font-sans text-[10px] text-[var(--color-faint)] text-center leading-relaxed">
                  Generated custom candles carry a premium <strong>₹3,200</strong> bespoke price.<br/>This includes a unique glass casting and master perfumer matching.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Right Side: Preview & Checkout */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 h-fit">
          <div className="bg-[var(--color-bg-low)] rounded-sm p-7 space-y-6 border border-[var(--color-border)]/15">
            <p className="font-sans text-[9px] uppercase tracking-[0.35em] text-[var(--color-faint)] text-center">
              {mode === "ai" ? "AI Concept Preview" : "Live Preview"}
            </p>

            {/* PREVIEW TENT */}
            <div className="flex justify-center py-4 min-h-[280px] items-center">
              {mode === "ai" ? (
                generatedImg ? (
                  <div className="relative w-[200px] h-[280px]">
                    <img 
                      src={generatedImg} 
                      alt="AI Generated Candle" 
                      className={`w-full h-full object-cover rounded-sm shadow-2xl border border-[var(--color-gold)]/20 transition-opacity duration-1000 ${isGenerating ? 'opacity-0' : 'opacity-100'}`}
                      onLoad={() => setIsGenerating(false)}
                      onError={() => { setIsGenerating(false); alert("Image failed to load from AI provider."); }}
                    />
                    {isGenerating && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Loader2 className="w-8 h-8 animate-spin text-[var(--color-gold)]" />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="w-[200px] h-[280px] border border-dashed border-[var(--color-border)]/50 rounded-sm flex flex-col items-center justify-center gap-3 text-[var(--color-faint)]">
                    {isGenerating ? <Loader2 className="w-8 h-8 animate-spin" /> : <Sparkles className="w-8 h-8 opacity-40" />}
                    <span className="font-sans text-[9px] uppercase tracking-widest text-center px-4">
                      {isGenerating ? "Crafting..." : "Awaiting Prompt"}
                    </span>
                  </div>
                )
              ) : (
                <svg viewBox="0 0 200 280" width="200" height="280" className="animate-[fadeUp_0.8s_ease]">
                  <rect x="50" y="90" width="100" height="150" rx="10" fill={color.hex} stroke="#C6963F" strokeWidth="1.5" className="transition-all duration-500"/>
                  <rect x="60" y="75" width="80" height="18" rx="4" fill={color.hex === "#1A1A1A" ? "#2a2a2a" : "#E8DDD0"} stroke="#C6963F" strokeWidth="1" className="transition-all duration-500"/>
                  <rect x="55" y="67" width="90" height="12" rx="3" fill="#C6963F" stroke="#9A7028" strokeWidth="1"/>
                  <rect x="60" y="120" width="80" height="90" rx="3" fill={color.hex} stroke="#C6963F" strokeWidth="0.8" opacity="0.9"/>
                  <line x1="65" y1="132" x2="135" y2="132" stroke="#C6963F" strokeWidth="0.5" opacity="0.6"/>
                  <line x1="65" y1="198" x2="135" y2="198" stroke="#C6963F" strokeWidth="0.5" opacity="0.6"/>
                  <text x="100" y="160" textAnchor="middle" fontFamily="'Cormorant Garamond', serif" fontSize="10" fill={color.hex === "#1A1A1A" ? "#F7F0E3" : "#422c00"} fontStyle="italic">
                    {labelName || scent}
                  </text>
                  <text x="100" y="176" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="7" fill={color.hex === "#1A1A1A" ? "#F3BE63" : "#9A7028"} letterSpacing="2">KANTI</text>
                  <ellipse cx="100" cy="90" rx="50" ry="10" fill={color.hex === "#1A1A1A" ? "#2a2a2a" : "#E8DDD0"} stroke="#C6963F" strokeWidth="0.8"/>
                  <line x1="100" y1="90" x2="100" y2="68" stroke="#6B5237" strokeWidth="1.5" strokeLinecap="round"/>
                  <g style={{ animation: "flicker 1.8s ease-in-out infinite" }}>
                    <ellipse cx="100" cy="56" rx="6" ry="9" fill="#F3BE63" opacity="0.9"/>
                    <ellipse cx="100" cy="54" rx="3.5" ry="5.5" fill="#F97316" opacity="0.8"/>
                    <ellipse cx="100" cy="53" rx="2" ry="3" fill="#FFF7ED" opacity="0.6"/>
                    <ellipse cx="100" cy="60" rx="14" ry="10" fill="#F3BE63" opacity="0.12"/>
                  </g>
                </svg>
              )}
            </div>

            {/* Price & Checkout */}
            <div className="border-t border-[var(--color-border)]/25 pt-5 flex justify-between items-end">
              <div>
                <p className="font-sans text-[9px] uppercase tracking-widest text-[var(--color-faint)] mb-1">Total</p>
                <p className="font-display text-3xl text-[var(--color-gold)]">₹{totalPrice.toLocaleString("en-IN")}</p>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="btn-gold w-full py-4 font-sans text-xs uppercase tracking-[0.22em] font-semibold rounded-sm"
            >
              Add to Cart
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
