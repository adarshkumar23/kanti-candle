import Link from "next/link";
import { Sparkles, Image as ImageIcon, ShoppingBag, Settings, LogOut } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // In a real app we'd use getServerSession and redirect to /admin/login if no user.
  // For the prototype we'll assume logged in.
  
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
          <Link href="/admin" className="flex items-center gap-2 md:gap-3 whitespace-nowrap px-4 py-3 rounded-sm bg-[var(--color-bg-card)] text-[var(--color-gold)] border border-[var(--color-gold-mid)]/30 font-sans text-[10px] md:text-xs uppercase tracking-widest shrink-0">
            <ImageIcon className="w-4 h-4" /> Gallery
          </Link>
          <Link href="/admin" className="flex items-center gap-2 md:gap-3 whitespace-nowrap px-4 py-3 rounded-sm hover:bg-[var(--color-bg-card)] text-[var(--color-faint)] hover:text-[var(--color-muted)] font-sans text-[10px] md:text-xs uppercase tracking-widest transition-colors shrink-0">
            <ShoppingBag className="w-4 h-4" /> Orders
          </Link>
          <Link href="/admin" className="flex items-center gap-2 md:gap-3 whitespace-nowrap px-4 py-3 rounded-sm hover:bg-[var(--color-bg-card)] text-[var(--color-faint)] hover:text-[var(--color-muted)] font-sans text-[10px] md:text-xs uppercase tracking-widest transition-colors shrink-0">
            <Sparkles className="w-4 h-4" /> AI Designs
          </Link>
          <Link href="/admin" className="flex items-center gap-2 md:gap-3 whitespace-nowrap px-4 py-3 rounded-sm hover:bg-[var(--color-bg-card)] text-[var(--color-faint)] hover:text-[var(--color-muted)] font-sans text-[10px] md:text-xs uppercase tracking-widest transition-colors shrink-0">
            <Settings className="w-4 h-4" /> Settings
          </Link>
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
