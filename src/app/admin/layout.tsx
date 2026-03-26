import Link from "next/link";
import { Sparkles, Image as ImageIcon, ShoppingBag, Settings, LogOut } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // In a real app we'd use getServerSession and redirect to /admin/login if no user.
  // For the prototype we'll assume logged in.
  
  return (
    <div className="min-h-screen bg-[var(--color-bg-deep)] text-[var(--color-muted)] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[var(--color-bg-low)] border-r border-[var(--color-border)]/20 p-6 flex flex-col">
        <Link href="/admin" className="font-news text-2xl tracking-[0.3em] text-[var(--color-gold-mid)] mb-12 block">
          KANTI <span className="text-xs tracking-widest text-[var(--color-faint)] block mt-1">Studio Admin</span>
        </Link>
        <nav className="flex-1 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-sm bg-[var(--color-bg-card)] text-[var(--color-gold)] border border-[var(--color-gold-mid)]/30 font-sans text-xs uppercase tracking-widest">
            <ImageIcon className="w-4 h-4" /> Gallery Uploads
          </Link>
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-sm hover:bg-[var(--color-bg-card)] text-[var(--color-faint)] hover:text-[var(--color-muted)] font-sans text-xs uppercase tracking-widest transition-colors">
            <ShoppingBag className="w-4 h-4" /> Orders
          </Link>
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-sm hover:bg-[var(--color-bg-card)] text-[var(--color-faint)] hover:text-[var(--color-muted)] font-sans text-xs uppercase tracking-widest transition-colors">
            <Sparkles className="w-4 h-4" /> AI Designs
          </Link>
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-sm hover:bg-[var(--color-bg-card)] text-[var(--color-faint)] hover:text-[var(--color-muted)] font-sans text-xs uppercase tracking-widest transition-colors">
            <Settings className="w-4 h-4" /> Settings
          </Link>
        </nav>
        <button className="flex items-center gap-3 px-4 py-3 text-[var(--color-faint)] hover:text-[var(--color-gold)] font-sans text-xs uppercase tracking-widest transition-colors">
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        {children}
      </main>
    </div>
  );
}
