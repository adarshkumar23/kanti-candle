"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, Image as ImageIcon, ShoppingBag, Settings, LogOut } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  const navItems = [
    { name: "Gallery", href: "/admin", icon: ImageIcon },
    { name: "Orders", href: "/admin/orders", icon: ShoppingBag },
    { name: "AI Designs", href: "/admin/designs", icon: Sparkles },
    { name: "Settings", href: "/admin", icon: Settings }, // Settings remains empty prototype
  ];
  
  return (
    <div className="min-h-[100dvh] bg-[var(--color-bg-deep)] text-[var(--color-muted)] flex flex-col md:flex-row">
      {/* Sidebar / Topbar */}
      <aside className="w-full md:w-64 bg-[var(--color-bg-low)] border-b md:border-r md:border-b-0 border-[var(--color-border)]/20 p-4 md:p-6 flex flex-col">
        <div className="flex justify-between items-center md:block mb-4 md:mb-12">
          <Link href="/admin" className="font-news text-xl md:text-2xl tracking-[0.3em] text-[var(--color-gold-mid)] block">
            KANTI <span className="text-[10px] md:text-xs tracking-widest text-[var(--color-faint)] block md:mt-1">Studio Admin</span>
          </Link>
          <button className="md:hidden flex items-center gap-2 px-3 py-2 text-[var(--color-faint)] font-sans text-[10px] uppercase tracking-widest transition-colors">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>

        <nav className="flex flex-row md:flex-col gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0 flex-1 w-full mask-linear-fade">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.name} href={item.href} className={`flex items-center gap-2 md:gap-3 whitespace-nowrap px-4 py-3 rounded-sm font-sans text-[10px] md:text-xs uppercase tracking-widest shrink-0 transition-colors ${isActive ? "bg-[var(--color-bg-card)] text-[var(--color-gold)] border border-[var(--color-gold-mid)]/30" : "hover:bg-[var(--color-bg-card)] text-[var(--color-faint)] hover:text-[var(--color-muted)]"}`}>
                <item.icon className="w-4 h-4" /> {item.name}
              </Link>
            )
          })}
        </nav>

        <button className="hidden md:flex items-center gap-3 px-4 py-3 text-[var(--color-faint)] hover:text-[var(--color-gold)] font-sans text-xs uppercase tracking-widest transition-colors mt-auto">
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 w-full p-4 sm:p-6 md:p-10 overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
