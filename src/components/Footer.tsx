"use client";

import Link from "next/link";
import { useState } from "react";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" strokeWidth="0" />
    </svg>
  );
}

const navCols = [
  {
    heading: "Shop",
    links: [
      { href: "/shop", label: "All Candles" },
      { href: "/shop?category=floral", label: "Floral" },
      { href: "/shop?category=woody", label: "Woody" },
      { href: "/shop?category=citrus", label: "Citrus" },
      { href: "/quiz", label: "Scent Quiz" },
    ],
  },
  {
    heading: "Kanti",
    links: [
      { href: "/about", label: "Our Story" },
      { href: "/customize", label: "Custom Studio" },
      { href: "/contact", label: "Contact Us" },
      { href: "/shipping", label: "Shipping & Returns" },
      { href: "/privacy", label: "Privacy Policy" },
    ],
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setSubmitted(true);
    setEmail("");
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <footer className="bg-[#0d0d0d] pt-16 pb-8 px-4 md:px-8 lg:px-16">
      <div className="max-w-5xl mx-auto">
        {/* Top row: logo + tagline + newsletter */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10 mb-12">
          {/* Brand */}
          <div className="shrink-0">
            <div className="leading-none mb-3">
              <div className="text-[20px] font-light tracking-[0.35em] text-[#e6c364] uppercase" style={{ fontFamily: "'Cormorant Garamond', serif" }}>KANTI</div>
              <div className="text-[7px] tracking-[0.4em] text-[#6e6754] uppercase mt-[2px]">candles</div>
            </div>
            <p className="text-[9px] uppercase tracking-[0.25em] text-[#6e6754]">
              Artisanal candles, hand-poured in Gurgaon
            </p>
            {/* Instagram */}
            <div className="mt-5">
              <a
                href="https://www.instagram.com/kanticandles/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#6e6754] hover:text-[#e6c364] transition-colors duration-300 group"
              >
                <InstagramIcon className="w-4 h-4" />
                <span className="text-[9px] uppercase tracking-[0.2em]">@kanticandles</span>
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div className="max-w-xs w-full">
            <p className="text-[9px] uppercase tracking-[0.25em] text-[#e6c364] mb-3">
              Join the Inner Circle
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="email"
                className="input-line w-full py-2 text-[11px]"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="submit"
                disabled={submitted}
                className="btn-gold py-2.5 text-[9px] uppercase tracking-[0.2em] rounded-sm disabled:opacity-50"
              >
                {submitted ? "Subscribed ✓" : "Subscribe for 10% Off"}
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="h-[1px] bg-[#1c1c1c] mb-10" />

        {/* Nav links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {navCols.map((col) => (
            <div key={col.heading} className="space-y-3">
              <p className="text-[9px] uppercase tracking-[0.25em] text-[#4d4637] font-medium">
                {col.heading}
              </p>
              {col.links.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="block text-[9px] uppercase tracking-[0.15em] text-[#6e6754] hover:text-[#e6c364] transition-colors duration-300"
                >
                  {label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-[1px] bg-[#1c1c1c] mb-6" />

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-[9px] uppercase tracking-widest text-[#4d4637]">
            © KANTI CANDLES MMXXVI
          </p>
          <p className="text-[9px] uppercase tracking-widest text-[#4d4637]">
            Sector 92, Gurgaon, Haryana
          </p>
        </div>
      </div>
    </footer>
  );
}
