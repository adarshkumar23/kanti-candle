import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | KANTI CANDLE",
  description: "Terms and conditions for using the Kanti Candle website and purchasing our products.",
};

export default function Terms() {
  return (
    <div className="pt-24 min-h-screen">
      <div className="px-6 md:px-12 lg:px-24 py-16 border-b border-[var(--color-border)]/20">
        <p className="font-sans text-[10px] uppercase tracking-[0.35em] text-[var(--color-gold-mid)] mb-3">Legal</p>
        <h1 className="font-display text-6xl md:text-7xl font-light">Terms of Service</h1>
        <p className="font-sans text-[var(--color-faint)] text-sm mt-3">Last updated: March 2026</p>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-16 space-y-10">
        <section className="space-y-4">
          <h2 className="font-display text-2xl text-[var(--color-gold)]">Acceptance of Terms</h2>
          <p className="font-sans text-sm text-[var(--color-muted)] leading-relaxed">
            By accessing and using kanticandle.com, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website or purchase our products.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-display text-2xl text-[var(--color-gold)]">Products & Pricing</h2>
          <p className="font-sans text-sm text-[var(--color-muted)] leading-relaxed">
            All prices are listed in Indian Rupees (INR) and are inclusive of applicable taxes. We reserve the right to modify prices at any time without prior notice. Product images are representative; actual products may vary slightly in color and texture due to the handcrafted nature of our candles.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-display text-2xl text-[var(--color-gold)]">Orders & Payment</h2>
          <p className="font-sans text-sm text-[var(--color-muted)] leading-relaxed">
            Orders are confirmed upon successful payment through Razorpay. You will receive an email confirmation with your order details. We reserve the right to cancel orders due to stock limitations, pricing errors, or suspected fraudulent activity.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-display text-2xl text-[var(--color-gold)]">Custom Candles</h2>
          <p className="font-sans text-sm text-[var(--color-muted)] leading-relaxed">
            Custom and AI-designed candles are made to order and are non-returnable. Production takes 5–7 business days. Designs generated through our AI Studio remain the intellectual property of Kanti Candle but may be used by the customer for personal, non-commercial purposes.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-display text-2xl text-[var(--color-gold)]">Intellectual Property</h2>
          <p className="font-sans text-sm text-[var(--color-muted)] leading-relaxed">
            All content on this website — including text, images, logos, and design — is the property of Kanti Candle and is protected under Indian copyright law. Reproduction or distribution without written permission is prohibited.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-display text-2xl text-[var(--color-gold)]">Limitation of Liability</h2>
          <p className="font-sans text-sm text-[var(--color-muted)] leading-relaxed">
            Kanti Candle shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or website. Our total liability shall not exceed the amount paid for the product in question.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-display text-2xl text-[var(--color-gold)]">Governing Law</h2>
          <p className="font-sans text-sm text-[var(--color-muted)] leading-relaxed">
            These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts of Bangalore, Karnataka.
          </p>
        </section>
      </div>
    </div>
  );
}
