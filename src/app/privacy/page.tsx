import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | KANTI CANDLE",
  description: "How Kanti Candle collects, uses, and protects your personal information.",
};

export default function Privacy() {
  return (
    <div className="pt-24 min-h-screen">
      <div className="px-6 md:px-12 lg:px-24 py-16 border-b border-[var(--color-border)]/20">
        <p className="font-sans text-[10px] uppercase tracking-[0.35em] text-[var(--color-gold-mid)] mb-3">Legal</p>
        <h1 className="font-display text-6xl md:text-7xl font-light">Privacy Policy</h1>
        <p className="font-sans text-[var(--color-faint)] text-sm mt-3">Last updated: March 2026</p>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-16 space-y-10">
        <section className="space-y-4">
          <h2 className="font-display text-2xl text-[var(--color-gold)]">Information We Collect</h2>
          <p className="font-sans text-sm text-[var(--color-muted)] leading-relaxed">
            When you visit kanticandle.com, we collect information you provide directly — such as your name, email address, shipping address, and payment details when placing an order. We also automatically collect certain technical data including your IP address, browser type, and browsing patterns through cookies.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-display text-2xl text-[var(--color-gold)]">How We Use Your Data</h2>
          <p className="font-sans text-sm text-[var(--color-muted)] leading-relaxed">
            Your information is used to process orders, communicate about your purchases, send promotional emails (with your consent), improve our website experience, and comply with legal obligations. We never sell your personal data to third parties.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-display text-2xl text-[var(--color-gold)]">Third-Party Services</h2>
          <p className="font-sans text-sm text-[var(--color-muted)] leading-relaxed">
            We use Razorpay for payment processing, Vercel for hosting, and Neon for database services. These services have their own privacy policies governing how they handle your data. Payment information is processed securely and never stored on our servers.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-display text-2xl text-[var(--color-gold)]">Cookies</h2>
          <p className="font-sans text-sm text-[var(--color-muted)] leading-relaxed">
            We use essential cookies to maintain your cart and session. Analytics cookies help us understand how visitors use our site. You can disable cookies in your browser settings, though this may affect your shopping experience.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-display text-2xl text-[var(--color-gold)]">Your Rights</h2>
          <p className="font-sans text-sm text-[var(--color-muted)] leading-relaxed">
            You have the right to access, correct, or delete your personal data. You may also opt out of marketing communications at any time. To exercise these rights, contact us at kanticandle@gmail.com.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-display text-2xl text-[var(--color-gold)]">Contact</h2>
          <p className="font-sans text-sm text-[var(--color-muted)] leading-relaxed">
            For privacy-related inquiries, email us at kanticandle@gmail.com or write to: Kanti Candle Studio, Sector 92, Gurgaon, Haryana, India.
          </p>
        </section>
      </div>
    </div>
  );
}
