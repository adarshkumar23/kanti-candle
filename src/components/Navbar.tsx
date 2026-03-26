"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingBag, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0); // This should ideally be global state

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <>
      <header id="navbar" className="fixed top-0 w-full z-50 glass transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={toggleMobileMenu} className="text-[var(--color-gold-mid)] hover:text-[var(--color-gold)] transition-colors lg:hidden">
            <Menu className="w-6 h-6" />
          </button>

          <Link href="/" className="font-news text-2xl tracking-[0.35em] text-[var(--color-gold-mid)] hover:text-[var(--color-gold)] transition-colors font-light">
            KANTI
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            <Link href="/" className="nav-btn font-sans text-[10px] uppercase tracking-[0.22em] text-[var(--color-gold-mid)]/70 hover:text-[var(--color-gold)] transition-colors">
              Home
            </Link>
            <Link href="/shop" className="nav-btn font-sans text-[10px] uppercase tracking-[0.22em] text-[var(--color-gold-mid)]/70 hover:text-[var(--color-gold)] transition-colors">
              Shop
            </Link>
            <Link href="/customize" className="nav-btn font-sans text-[10px] uppercase tracking-[0.22em] text-[var(--color-gold-mid)]/70 hover:text-[var(--color-gold)] transition-colors flex items-center gap-1.5">
              <span className="text-[var(--color-gold)]">✦</span> Customize
            </Link>
            <Link href="/about" className="nav-btn font-sans text-[10px] uppercase tracking-[0.22em] text-[var(--color-gold-mid)]/70 hover:text-[var(--color-gold)] transition-colors">
              About
            </Link>
          </nav>

          <button className="relative text-[var(--color-gold-mid)] hover:text-[var(--color-gold)] transition-colors">
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[var(--color-gold)] text-[var(--color-bg-deep)] text-[8px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`mob-menu fixed inset-y-0 left-0 z-[60] w-72 bg-[var(--color-bg-deep)] flex flex-col p-8 gap-6 ${isMobileMenuOpen ? "open" : ""}`} id="mob-menu">
        <button onClick={toggleMobileMenu} className="self-end text-[var(--color-faint)] hover:text-[var(--color-gold)] mb-4">
          <X className="w-6 h-6" />
        </button>
        <div className="font-news text-3xl tracking-[0.3em] text-[var(--color-gold-mid)] mb-4">KANTI</div>
        <Link href="/" onClick={toggleMobileMenu} className="text-left font-sans text-xs uppercase tracking-widest text-[var(--color-muted)] hover:text-[var(--color-gold)] py-3 border-b border-[var(--color-border)]/30">Home</Link>
        <Link href="/shop" onClick={toggleMobileMenu} className="text-left font-sans text-xs uppercase tracking-widest text-[var(--color-muted)] hover:text-[var(--color-gold)] py-3 border-b border-[var(--color-border)]/30">Shop</Link>
        <Link href="/customize" onClick={toggleMobileMenu} className="text-left font-sans text-xs uppercase tracking-widest text-[var(--color-gold)] py-3 border-b border-[var(--color-border)]/30 flex items-center gap-2"><span>✦</span> Customize</Link>
        <Link href="/about" onClick={toggleMobileMenu} className="text-left font-sans text-xs uppercase tracking-widest text-[var(--color-muted)] hover:text-[var(--color-gold)] py-3">About</Link>
      </div>

      <div id="mob-overlay" className={`${isMobileMenuOpen ? "fixed" : "hidden"} inset-0 z-50 bg-black/50`} onClick={toggleMobileMenu}></div>
    </>
  );
}
