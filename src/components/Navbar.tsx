"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";

const desktopLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/customize", label: "Customize" },
];

const mobileMenuLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/customize", label: "Customize" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { totalItems, setIsCartOpen } = useCart();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      {/* ── Top Fixed Header ─────────────────────────────────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-16 flex items-center transition-all duration-[700ms] ${
          scrolled
            ? "backdrop-blur-md bg-[#131313]/90 shadow-[0px_4px_20px_rgba(0,0,0,0.4)]"
            : "bg-[#131313]"
        } border-b border-[#4d4637]/20`}
      >
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">

          {/* LEFT — hamburger (mobile) or nav links (desktop) */}
          <div className="flex items-center gap-6">
            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden flex flex-col gap-[5px] w-6 h-6 justify-center"
              aria-label="Open menu"
            >
              <span className="block w-full h-[1px] bg-[#cac5be]" />
              <span className="block w-4 h-[1px] bg-[#cac5be]" />
              <span className="block w-full h-[1px] bg-[#cac5be]" />
            </button>

            {/* Desktop nav links */}
            <nav className="hidden md:flex items-center gap-8">
              {desktopLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`text-[10px] uppercase tracking-[0.2em] transition-colors duration-300 ${
                    isActive(href)
                      ? "text-[#e6c364]"
                      : "text-[#cac5be] hover:text-[#e6c364]"
                  }`}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* CENTER — Wordmark */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2 hover:opacity-80 transition-opacity duration-300 text-center leading-none">
            <div className="text-[18px] font-light tracking-[0.35em] text-[#e6c364] uppercase" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              KANTI
            </div>
            <div className="text-[7px] tracking-[0.4em] text-[#6e6754] uppercase text-center mt-[1px]">
              candles
            </div>
          </Link>

          {/* RIGHT — search + cart */}
          <div className="flex items-center gap-4">
            <button
              className="text-[#cac5be] hover:text-[#e6c364] transition-colors duration-300"
              aria-label="Search"
            >
              <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>search</span>
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative text-[#cac5be] hover:text-[#e6c364] transition-colors duration-300"
              aria-label="Open cart"
            >
              <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>shopping_bag</span>
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#e6c364] text-[#1c1a0d] text-[8px] font-bold flex items-center justify-center">
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Full-Screen Menu ──────────────────────────── */}
      <div
        className={`fixed inset-0 z-[70] bg-[#0d0d0d]/95 backdrop-blur-xl flex flex-col transition-all duration-[700ms] ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Close button */}
        <div className="flex justify-between items-center px-6 py-5 border-b border-[#4d4637]/20">
          <div className="text-center leading-none">
            <div className="text-[18px] font-light tracking-[0.35em] text-[#e6c364] uppercase" style={{ fontFamily: "'Cormorant Garamond', serif" }}>KANTI</div>
            <div className="text-[7px] tracking-[0.4em] text-[#6e6754] uppercase mt-[1px]">candles</div>
          </div>
          <button
            onClick={() => setMenuOpen(false)}
            className="text-[#6e6754] hover:text-[#e6c364] transition-colors duration-300"
            aria-label="Close menu"
          >
            <span className="material-symbols-outlined" style={{ fontSize: "24px" }}>close</span>
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col px-8 pt-8 gap-0">
          {mobileMenuLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`serif-italic text-2xl py-4 border-b border-[#4d4637]/20 transition-colors duration-300 ${
                isActive(href) ? "text-[#e6c364]" : "text-[#e5e2e1] hover:text-[#e6c364]"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>

      {/* ── Mobile Bottom Nav (hidden on md+) ───────────────── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 h-20 bg-[#131313]/90 backdrop-blur-md border-t border-[#4d4637]/20 shadow-[0px_-10px_30px_rgba(0,0,0,0.5)] bottom-nav-safe flex items-center justify-around px-2">
        {[
          { href: "/", icon: "home", label: "Home" },
          { href: "/shop", icon: "shopping_bag", label: "Shop" },
          { href: "/quiz", icon: "psychology_alt", label: "Scent" },
          { href: "/about", icon: "person", label: "Profile" },
        ].map(({ href, icon, label }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center gap-1 px-3 transition-colors duration-300 ${
                active
                  ? "text-[#e6c364] drop-shadow-[0_0_8px_rgba(230,195,100,0.4)]"
                  : "text-[#6e6754]"
              }`}
            >
              <span className="material-symbols-outlined" style={{ fontSize: "22px" }}>{icon}</span>
              <span className="text-[9px] uppercase tracking-[0.15em]">{label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
