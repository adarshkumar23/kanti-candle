"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Menu, X, Search } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { totalItems, setIsCartOpen } = useCart();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // Close search on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
        setSearchQuery("");
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Focus input when search opens
  useEffect(() => {
    if (isSearchOpen) searchInputRef.current?.focus();
  }, [isSearchOpen]);

  const filteredProducts = searchQuery.length > 1
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.scentNotes.some((n) => n.toLowerCase().includes(searchQuery.toLowerCase())) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  return (
    <>
      <header id="navbar" className="fixed top-0 w-full z-50 glass transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={toggleMobileMenu} className="text-[var(--color-gold-mid)] hover:text-[var(--color-gold)] transition-colors lg:hidden">
            <Menu className="w-6 h-6" />
          </button>

          <Link href="/" className="hover:opacity-90 transition-opacity">
            <Image src="/kanti-logo.svg" alt="Kanti Candles" width={130} height={74} priority />
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
            <Link href="/contact" className="nav-btn font-sans text-[10px] uppercase tracking-[0.22em] text-[var(--color-gold-mid)]/70 hover:text-[var(--color-gold)] transition-colors">
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            {/* Search */}
            <div ref={searchRef} className="relative">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-[var(--color-gold-mid)] hover:text-[var(--color-gold)] transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>
              {isSearchOpen && (
                <div className="absolute top-10 right-0 w-72 bg-[var(--color-bg-deep)] border border-[var(--color-border)]/30 rounded-sm shadow-2xl animate-[fadeUp_0.2s_ease]">
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search candles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent px-4 py-3 font-sans text-sm text-[var(--color-muted)] placeholder:text-[var(--color-faint)]/50 focus:outline-none border-b border-[var(--color-border)]/20"
                  />
                  {filteredProducts.length > 0 && (
                    <div className="py-2">
                      {filteredProducts.map((p) => (
                        <Link
                          key={p.slug}
                          href={`/shop/${p.slug}`}
                          onClick={() => { setIsSearchOpen(false); setSearchQuery(""); }}
                          className="flex items-center gap-3 px-4 py-2.5 hover:bg-[var(--color-bg-card)] transition-colors"
                        >
                          <img src={p.imageUrl} alt={p.name} className="w-10 h-10 rounded-sm object-cover" />
                          <div>
                            <p className="font-sans text-sm text-[var(--color-muted)]">{p.name}</p>
                            <p className="font-sans text-[10px] text-[var(--color-faint)]">{p.scentNotes.join(" · ")}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                  {searchQuery.length > 1 && filteredProducts.length === 0 && (
                    <p className="px-4 py-3 font-sans text-sm text-[var(--color-faint)]/60">No results found</p>
                  )}
                </div>
              )}
            </div>

            {/* Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative text-[var(--color-gold-mid)] hover:text-[var(--color-gold)] transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[var(--color-gold)] text-[var(--color-bg-deep)] text-[8px] font-bold flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`mob-menu fixed inset-y-0 left-0 z-[60] w-72 bg-[var(--color-bg-deep)] flex flex-col p-8 gap-6 ${isMobileMenuOpen ? "open" : ""}`} id="mob-menu">
        <button onClick={toggleMobileMenu} className="self-end text-[var(--color-faint)] hover:text-[var(--color-gold)] mb-4">
          <X className="w-6 h-6" />
        </button>
        <div className="mb-4">
          <Image src="/kanti-logo.svg" alt="Kanti Candles" width={140} height={80} />
        </div>
        <Link href="/" onClick={toggleMobileMenu} className="text-left font-sans text-xs uppercase tracking-widest text-[var(--color-muted)] hover:text-[var(--color-gold)] py-3 border-b border-[var(--color-border)]/30">Home</Link>
        <Link href="/shop" onClick={toggleMobileMenu} className="text-left font-sans text-xs uppercase tracking-widest text-[var(--color-muted)] hover:text-[var(--color-gold)] py-3 border-b border-[var(--color-border)]/30">Shop</Link>
        <Link href="/customize" onClick={toggleMobileMenu} className="text-left font-sans text-xs uppercase tracking-widest text-[var(--color-gold)] py-3 border-b border-[var(--color-border)]/30 flex items-center gap-2"><span>✦</span> Customize</Link>
        <Link href="/about" onClick={toggleMobileMenu} className="text-left font-sans text-xs uppercase tracking-widest text-[var(--color-muted)] hover:text-[var(--color-gold)] py-3 border-b border-[var(--color-border)]/30">About</Link>
        <Link href="/contact" onClick={toggleMobileMenu} className="text-left font-sans text-xs uppercase tracking-widest text-[var(--color-muted)] hover:text-[var(--color-gold)] py-3">Contact</Link>
      </div>

      <div id="mob-overlay" className={`${isMobileMenuOpen ? "fixed" : "hidden"} inset-0 z-50 bg-black/50`} onClick={toggleMobileMenu}></div>
    </>
  );
}
