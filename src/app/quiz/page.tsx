"use client";

import { useState } from "react";
import Link from "next/link";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";

interface Question {
  id: number;
  text: string;
  options: { label: string; icon: string; sub: string; gradient: string }[];
}

const questions: Question[] = [
  {
    id: 1,
    text: "What time of day do you most treasure?",
    options: [
      { label: "Golden Hour", icon: "wb_sunny", sub: "Warm, amber light", gradient: "radial-gradient(ellipse at center, rgba(201,140,50,0.5) 0%, rgba(30,15,5,0.95) 100%)" },
      { label: "Deep Midnight", icon: "nightlight", sub: "Dark, quiet, still", gradient: "radial-gradient(ellipse at center, rgba(30,20,60,0.7) 0%, rgba(5,5,15,0.98) 100%)" },
      { label: "Early Morning", icon: "wb_twilight", sub: "Fresh, possibility", gradient: "radial-gradient(ellipse at center, rgba(60,90,100,0.5) 0%, rgba(10,15,20,0.95) 100%)" },
      { label: "Blue Hour", icon: "nights_stay", sub: "Dusk, between worlds", gradient: "radial-gradient(ellipse at center, rgba(30,50,90,0.6) 0%, rgba(5,10,20,0.98) 100%)" },
    ],
  },
  {
    id: 2,
    text: "Which environment calms you most during the quiet hours?",
    options: [
      { label: "Damp Forest", icon: "forest", sub: "Moss, earth, rain", gradient: "radial-gradient(ellipse at center, rgba(20,60,30,0.6) 0%, rgba(5,15,8,0.98) 100%)" },
      { label: "Private Study", icon: "menu_book", sub: "Wood, leather, ink", gradient: "radial-gradient(ellipse at center, rgba(80,50,20,0.5) 0%, rgba(15,10,5,0.98) 100%)" },
      { label: "Midnight Coast", icon: "water", sub: "Salt air, driftwood", gradient: "radial-gradient(ellipse at center, rgba(20,50,80,0.6) 0%, rgba(5,10,20,0.98) 100%)" },
      { label: "Night Garden", icon: "local_florist", sub: "Blooms after dark", gradient: "radial-gradient(ellipse at center, rgba(80,20,60,0.5) 0%, rgba(15,5,12,0.98) 100%)" },
    ],
  },
  {
    id: 3,
    text: "Choose your mood tonight:",
    options: [
      { label: "Contemplative", icon: "psychology", sub: "Thoughtful, deep", gradient: "radial-gradient(ellipse at center, rgba(40,40,80,0.6) 0%, rgba(8,8,20,0.98) 100%)" },
      { label: "Romantic", icon: "favorite", sub: "Warm, intimate", gradient: "radial-gradient(ellipse at center, rgba(120,20,50,0.6) 0%, rgba(20,5,10,0.98) 100%)" },
      { label: "Energised", icon: "bolt", sub: "Alert, alive", gradient: "radial-gradient(ellipse at center, rgba(100,80,10,0.6) 0%, rgba(20,15,5,0.98) 100%)" },
      { label: "Serene", icon: "self_improvement", sub: "Still, at peace", gradient: "radial-gradient(ellipse at center, rgba(20,70,70,0.5) 0%, rgba(5,15,15,0.98) 100%)" },
    ],
  },
  {
    id: 4,
    text: "What's the occasion?",
    options: [
      { label: "Daily Ritual", icon: "routine", sub: "Every morning, every night", gradient: "radial-gradient(ellipse at center, rgba(60,50,30,0.5) 0%, rgba(12,10,6,0.98) 100%)" },
      { label: "Special Evening", icon: "celebration", sub: "A moment to remember", gradient: "radial-gradient(ellipse at center, rgba(130,90,20,0.5) 0%, rgba(20,14,4,0.98) 100%)" },
      { label: "Work Focus", icon: "work", sub: "Flow state, clarity", gradient: "radial-gradient(ellipse at center, rgba(30,60,80,0.5) 0%, rgba(6,12,16,0.98) 100%)" },
      { label: "Gifting", icon: "redeem", sub: "For someone special", gradient: "radial-gradient(ellipse at center, rgba(100,30,80,0.5) 0%, rgba(16,6,13,0.98) 100%)" },
    ],
  },
  {
    id: 5,
    text: "Your preferred scent family:",
    options: [
      { label: "Woody & Earthy", icon: "park", sub: "Vetiver, cedar, moss", gradient: "radial-gradient(ellipse at center, rgba(40,60,20,0.6) 0%, rgba(8,12,4,0.98) 100%)" },
      { label: "Floral & Powdery", icon: "local_florist", sub: "Rose, jasmine, musk", gradient: "radial-gradient(ellipse at center, rgba(100,30,70,0.5) 0%, rgba(16,5,11,0.98) 100%)" },
      { label: "Citrus & Fresh", icon: "lemon", sub: "Bergamot, yuzu, sea", gradient: "radial-gradient(ellipse at center, rgba(80,100,20,0.5) 0%, rgba(13,16,4,0.98) 100%)" },
      { label: "Spiced & Warm", icon: "whatshot", sub: "Amber, oud, saffron", gradient: "radial-gradient(ellipse at center, rgba(140,60,20,0.5) 0%, rgba(20,9,4,0.98) 100%)" },
    ],
  },
];

// Map scent family answers to product categories
const scentMap: Record<string, string> = {
  "Woody & Earthy": "woody",
  "Floral & Powdery": "floral",
  "Citrus & Fresh": "citrus",
  "Spiced & Warm": "oriental",
};

export default function QuizPage() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const { addItem, setIsCartOpen } = useCart();
  const { addToast } = useToast();

  const question = questions[currentQ];
  const progress = ((currentQ) / questions.length) * 100;

  const handleSelect = (optionLabel: string) => {
    setSelected(optionLabel);
  };

  const handleContinue = () => {
    if (!selected) return;
    const newAnswers = [...answers, selected];
    setAnswers(newAnswers);
    setSelected(null);

    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleBack = () => {
    if (currentQ > 0) {
      setCurrentQ(currentQ - 1);
      setAnswers(answers.slice(0, -1));
      setSelected(null);
    }
  };

  // Determine recommended product
  const getRecommendation = () => {
    const scentAnswer = answers[4] || "";
    const category = scentMap[scentAnswer] || "oriental";
    const match = products.find((p) => p.category === category && p.badge === "Bestseller")
      || products.find((p) => p.category === category)
      || products[0];
    return match;
  };

  const handleAddToCart = (p: typeof products[0]) => {
    const defaultSize = p.sizes[1] || p.sizes[0];
    addItem({ slug: p.slug, name: p.name, size: defaultSize.weight, price: defaultSize.price, imageUrl: p.imageUrl });
    addToast(`${p.name} added to cart`);
    setIsCartOpen(true);
  };

  if (showResult) {
    const rec = getRecommendation();
    return (
      <div className="min-h-screen bg-[#0d0d0d] flex flex-col items-center justify-center px-4 py-12">
        {/* Close */}
        <Link href="/shop" className="absolute top-20 right-4 text-[#6e6754] hover:text-[#e6c364] transition-colors">
          <span className="material-symbols-outlined" style={{ fontSize: "24px" }}>close</span>
        </Link>

        <p className="text-[10px] uppercase tracking-[0.3em] text-[#e6c364] mb-6">Your Essence</p>
        <p
          className="text-4xl md:text-5xl text-[#e5e2e1] text-center mb-2"
          style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: "italic" }}
        >
          We found your match.
        </p>
        <p className="text-[11px] uppercase tracking-[0.2em] text-[#6e6754] mb-10">
          Based on your answers
        </p>

        <div className="max-w-sm w-full">
          <div className="aspect-[4/5] overflow-hidden rounded-sm mb-6">
            <img src={rec.imageUrl} alt={rec.name} className="w-full h-full object-cover" />
          </div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#e6c364]">{rec.series}</p>
          <p
            className="text-3xl text-[#e5e2e1] mt-1"
            style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: "italic" }}
          >
            {rec.name}
          </p>
          <p className="text-[10px] uppercase tracking-[0.1em] text-[#6e6754] mt-2">
            {rec.scentNotes.join(" · ")}
          </p>
          <p className="text-2xl font-light text-[#e5e2e1] mt-3">
            From ₹{rec.sizes[0].price.toLocaleString("en-IN")}
          </p>
          <p className="text-sm text-[#cac5be]/70 mt-3 leading-relaxed">{rec.description}</p>

          <div className="flex flex-col gap-3 mt-8">
            <button
              onClick={() => handleAddToCart(rec)}
              className="btn-gold w-full h-14 text-[10px] uppercase tracking-[0.2em] rounded-sm"
            >
              Add to Cart — ₹{rec.sizes[0].price.toLocaleString("en-IN")}
            </button>
            <Link
              href={`/shop/${rec.slug}`}
              className="w-full h-12 border border-[#4d4637]/30 text-[#cac5be] text-[10px] uppercase tracking-[0.2em] rounded-sm flex items-center justify-center hover:border-[#c9a84c]/50 hover:text-[#e6c364] transition-colors duration-300"
            >
              View Details
            </Link>
            <button
              onClick={() => { setCurrentQ(0); setAnswers([]); setSelected(null); setShowResult(false); }}
              className="text-[9px] uppercase tracking-[0.15em] text-[#6e6754] hover:text-[#cac5be] transition-colors py-2"
            >
              Retake Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] flex flex-col px-4 py-6 md:py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 max-w-2xl mx-auto w-full">
        <Link href="/shop" className="text-[#6e6754] hover:text-[#e6c364] transition-colors">
          <span className="material-symbols-outlined" style={{ fontSize: "22px" }}>close</span>
        </Link>
        <p className="text-[9px] uppercase tracking-[0.2em] text-[#6e6754]">
          Question {String(currentQ + 1).padStart(2, "0")} of {String(questions.length).padStart(2, "0")}
        </p>
        <div className="w-6" />
      </div>

      {/* Progress bar */}
      <div className="max-w-2xl mx-auto w-full mb-8">
        <div className="h-[2px] bg-[#1c1c1c] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#e6c364] rounded-full transition-all duration-[700ms]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="max-w-2xl mx-auto w-full flex-1 flex flex-col">
        <p
          className="text-2xl md:text-3xl text-[#e5e2e1] mb-8 text-center"
          style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: "italic" }}
        >
          {question.text}
        </p>

        {/* Options grid */}
        <div className="grid grid-cols-2 gap-3 flex-1">
          {question.options.map((opt) => {
            const isSelected = selected === opt.label;
            return (
              <button
                key={opt.label}
                onClick={() => handleSelect(opt.label)}
                className={`relative aspect-[4/5] rounded-sm overflow-hidden flex flex-col items-center justify-center gap-2 p-4 transition-all duration-[700ms] ${
                  isSelected ? "ring-2 ring-[#e6c364]" : "ring-0 hover:ring-1 hover:ring-[#4d4637]"
                }`}
              >
                <div className="absolute inset-0" style={{ background: opt.gradient }} />
                {isSelected && (
                  <div className="absolute top-3 right-3 w-6 h-6 bg-[#e6c364] rounded-full flex items-center justify-center z-10">
                    <span className="material-symbols-outlined text-[#1c1a0d]" style={{ fontSize: "14px" }}>check</span>
                  </div>
                )}
                <div className="relative z-10 flex flex-col items-center gap-2">
                  <span className="material-symbols-outlined text-[#e6c364]" style={{ fontSize: "28px" }}>
                    {opt.icon}
                  </span>
                  <p
                    className="text-base text-[#e5e2e1]"
                    style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: "italic" }}
                  >
                    {opt.label}
                  </p>
                  <p className="text-[9px] uppercase tracking-[0.12em] text-[#cac5be]/60 text-center">
                    {opt.sub}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8 pt-4 border-t border-[#1c1c1c]">
          <button
            onClick={handleBack}
            className={`text-[9px] uppercase tracking-[0.2em] transition-colors duration-300 ${
              currentQ === 0 ? "text-[#4d4637]/30 pointer-events-none" : "text-[#6e6754] hover:text-[#cac5be]"
            }`}
          >
            ← Back
          </button>
          <button
            onClick={handleContinue}
            disabled={!selected}
            className="btn-gold px-10 py-3 text-[10px] uppercase tracking-[0.2em] rounded-sm disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {currentQ === questions.length - 1 ? "See My Match" : "Continue →"}
          </button>
        </div>
      </div>
    </div>
  );
}
