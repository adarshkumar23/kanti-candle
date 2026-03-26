"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ShoppingBag, Menu, X, Search } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/customize", label: "Customize", icon: "✦" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { totalItems, setIsCartOpen } = useCart();
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // Scroll shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

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
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "glass shadow-[0_1px_30px_rgba(0,0,0,0.4)]"
            : "bg-[var(--color-bg-deep)]/80 backdrop-blur-md"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-[var(--color-gold-mid)] hover:text-[var(--color-gold)] transition-colors lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo */}
          <Link href="/" className="hover:opacity-85 transition-opacity">
            <Image src="/kanti-logo.svg" alt="Kanti Candles" width={72} height={40} priority />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map(({ href, label, icon }) => (
              <Link
                key={href}
                href={href}
                className={`relative font-sans text-[10px] uppercase tracking-[0.22em] transition-colors group ${
                  isActive(href)
                    ? "text-[var(--color-gold)]"
                    : "text-[var(--color-gold-mid)]/60 hover:text-[var(--color-gold)]"
                }`}
              >
                {icon && <span className="mr-1.5 text-[var(--color-gold)]">{icon}</span>}
                {label}
                {/* Active underline */}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-[var(--color-gold)] transition-all duration-300 ${
                    isActive(href) ? "w-full opacity-50" : "w-0 group-hover:w-full opacity-30"
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <div ref={searchRef} className="relative">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-[var(--color-gold-mid)] hover:text-[var(--color-gold)] transition-colors"
                aria-label="Search"
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
                          <img src={p.imageUrl} alt={p.name} className="w-10 h-10 rounded-sm object-cover shrink-0" />
                          <div className="min-w-0">
                            <p className="font-sans text-sm text-[var(--color-muted)] truncate">{p.name}</p>
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
              aria-label="Open cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[var(--color-gold)] text-[var(--color-bg-deep)] text-[8px] font-bold flex items-center justify-center">
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-black/60 transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile menu drawer */}
      <div
        className={`fixed inset-y-0 left-0 z-[70] w-72 bg-[var(--color-bg-deep)] flex flex-col p-8 gap-1 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between mb-8">
          <Image src="/kanti-logo.svg" alt="Kanti Candles" width={80} height={45} />
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-[var(--color-faint)] hover:text-[var(--color-gold)] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {navLinks.map(({ href, label, icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-2 font-sans text-xs uppercase tracking-widest py-4 border-b border-[var(--color-border)]/20 transition-colors ${
              isActive(href)
                ? "text-[var(--color-gold)]"
                : "text-[var(--color-muted)] hover:text-[var(--color-gold)]"
            }`}
          >
            {icon && <span className="text-[var(--color-gold)]">{icon}</span>}
            {label}
            {isActive(href) && (
              <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[var(--color-gold)]" />
            )}
          </Link>
        ))}
      </div>
    </>
  );
}
