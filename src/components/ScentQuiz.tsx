"use client";
import { useState } from "react";
import { X, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

const QUESTIONS = [
  {
    q: "What's your mood right now?",
    options: [
      { label: "Cozy & relaxed", emoji: "🕯️", value: "cozy" },
      { label: "Romantic & sensual", emoji: "🌹", value: "romantic" },
      { label: "Focused & clear", emoji: "✨", value: "focused" },
      { label: "Festive & joyful", emoji: "🎉", value: "festive" },
    ],
  },
  {
    q: "What occasion is it for?",
    options: [
      { label: "Every day at home", emoji: "🏠", value: "home" },
      { label: "A special gift", emoji: "🎁", value: "gift" },
      { label: "A dinner or gathering", emoji: "🍷", value: "dinner" },
      { label: "Self-care ritual", emoji: "🛁", value: "selfcare" },
    ],
  },
  {
    q: "Which scent world calls to you?",
    options: [
      { label: "Florals & blooms", emoji: "🌸", value: "floral" },
      { label: "Deep woods & musk", emoji: "🌲", value: "woody" },
      { label: "Citrus & herbs", emoji: "🍋", value: "citrus" },
      { label: "Warm spice & amber", emoji: "🌿", value: "oriental" },
    ],
  },
];

const RECOMMENDATIONS: Record<string, { slug: string; name: string; reason: string }> = {
  default: { slug: "luxury-amber", name: "Luxury Amber", reason: "A timeless favourite that suits any mood." },
  "cozy-home-woody":  { slug: "smoky-vetiver", name: "Smoky Vetiver", reason: "Warm vetiver grounds you in comfort." },
  "romantic-gift-floral": { slug: "temple-bloom", name: "Temple Bloom", reason: "Deep jasmine blooms for moments that matter." },
  "focused-selfcare-citrus": { slug: "citrus-dawn", name: "Citrus Dawn", reason: "Clean citrus sharpens focus and clears the mind." },
  "festive-dinner-oriental": { slug: "golden-saffron", name: "Golden Saffron", reason: "Rich saffron and amber create a celebratory warmth." },
  "cozy-home-floral": { slug: "wild-lavender", name: "Wild Lavender", reason: "Calming lavender for a peaceful home sanctuary." },
  "cozy-selfcare-oriental": { slug: "spiced-chai", name: "Spiced Chai", reason: "Warm chai spice wraps you in comfort." },
  "romantic-dinner-floral": { slug: "ethereal-bloom", name: "Ethereal Bloom", reason: "Delicate florals set the perfect romantic mood." },
  "focused-home-woody": { slug: "terra-spirit", name: "Terra Spirit", reason: "Earthy vetiver and moss keep you grounded and clear." },
  "festive-gift-oriental": { slug: "luxury-amber", name: "Luxury Amber", reason: "Opulent amber makes every gift unforgettable." },
};

function getRecommendation(answers: string[]) {
  const key = answers.join("-");
  return RECOMMENDATIONS[key] || RECOMMENDATIONS["default"];
}

export default function ScentQuiz({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);

  const isDone = step >= QUESTIONS.length;
  const rec = isDone ? getRecommendation(answers) : null;

  function choose(value: string) {
    setSelected(value);
    setTimeout(() => {
      const next = [...answers, value];
      setAnswers(next);
      setSelected(null);
      setStep((s) => s + 1);
    }, 300);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative bg-[var(--color-bg-card)] border border-[rgba(201,168,76,0.2)] rounded-sm max-w-lg w-full p-8 animate-[fadeUp_0.4s_cubic-bezier(0.22,1,0.36,1)_both]">
        <button onClick={onClose} className="absolute top-4 right-4 text-[var(--color-faint)] hover:text-[var(--color-gold)] transition-colors">
          <X className="w-5 h-5" />
        </button>

        {!isDone ? (
          <>
            <div className="flex gap-1 mb-6">
              {QUESTIONS.map((_, i) => (
                <div key={i} className={`h-0.5 flex-1 rounded-full transition-colors duration-500 ${i <= step ? "bg-[var(--color-gold)]" : "bg-[rgba(201,168,76,0.15)]"}`} />
              ))}
            </div>
            <p className="font-sans text-[9px] uppercase tracking-[0.25em] text-[var(--color-faint)] mb-2">Question {step + 1} of {QUESTIONS.length}</p>
            <h2 className="font-display text-2xl text-[var(--color-cream)] mb-6 italic">{QUESTIONS[step].q}</h2>
            <div className="grid grid-cols-2 gap-3">
              {QUESTIONS[step].options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => choose(opt.value)}
                  className={`quiz-option rounded-sm p-4 text-left ${selected === opt.value ? "selected" : ""}`}
                >
                  <span className="text-2xl block mb-2">{opt.emoji}</span>
                  <span className="font-sans text-sm text-[var(--color-muted)]">{opt.label}</span>
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-[rgba(201,168,76,0.1)] border border-[rgba(201,168,76,0.3)] flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-7 h-7 text-[var(--color-gold)]" />
            </div>
            <p className="font-sans text-[9px] uppercase tracking-[0.25em] text-[var(--color-faint)] mb-2">Your perfect match</p>
            <h2 className="font-display text-3xl text-[var(--color-gold-light)] italic mb-3">{rec?.name}</h2>
            <p className="font-sans text-sm text-[var(--color-muted)] mb-8 max-w-xs mx-auto leading-relaxed">{rec?.reason}</p>
            <div className="flex gap-3 justify-center">
              <Link
                href={`/shop/${rec?.slug}`}
                onClick={onClose}
                className="btn-gold px-8 py-3.5 rounded-sm inline-flex items-center gap-2"
              >
                View Candle <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <button
                onClick={() => { setStep(0); setAnswers([]); setSelected(null); }}
                className="btn-outline px-6 py-3.5 rounded-sm"
              >
                Retake
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
