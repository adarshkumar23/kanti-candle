import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping & Returns | KANTI CANDLE",
  description: "Delivery timelines, shipping charges, and return policy for Kanti Candle orders.",
};

export default function Shipping() {
  return (
    <div className="pt-24 min-h-screen">
      <div className="px-6 md:px-12 lg:px-24 py-16 border-b border-[var(--color-border)]/20">
        <p className="font-sans text-[10px] uppercase tracking-[0.35em] text-[var(--color-gold-mid)] mb-3">Policies</p>
        <h1 className="font-display text-6xl md:text-7xl font-light">Shipping & Returns</h1>
        <p className="font-sans text-[var(--color-faint)] text-sm mt-3">Everything you need to know about delivery and returns</p>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-16 space-y-10">
        <section className="space-y-4">
          <h2 className="font-display text-2xl text-[var(--color-gold)]">Shipping</h2>
          <div className="bg-[var(--color-bg-low)] p-6 rounded-sm border border-[var(--color-border)]/20 space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-[var(--color-border)]/15">
              <span className="font-sans text-sm text-[var(--color-muted)]">Standard Delivery</span>
              <span className="font-sans text-sm text-[var(--color-gold-mid)] font-semibold">5–7 Business Days</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-[var(--color-border)]/15">
              <span className="font-sans text-sm text-[var(--color-muted)]">Express Delivery</span>
              <span className="font-sans text-sm text-[var(--color-gold-mid)] font-semibold">2–3 Business Days</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-sans text-sm text-[var(--color-muted)]">Free Shipping</span>
              <span className="font-sans text-sm text-[var(--color-gold-mid)] font-semibold">Orders above ₹2,000</span>
            </div>
          </div>
          <p className="font-sans text-sm text-[var(--color-muted)] leading-relaxed">
            We ship across India. Standard shipping costs ₹150 for orders below ₹2,000. Express shipping is available at ₹300 regardless of order value. All orders are carefully packaged in our signature boxes to ensure your candles arrive in perfect condition.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-display text-2xl text-[var(--color-gold)]">Order Tracking</h2>
          <p className="font-sans text-sm text-[var(--color-muted)] leading-relaxed">
            Once your order ships, you will receive a tracking number via email. You can track your shipment through our courier partner&apos;s website. If you have questions about your delivery, contact us at hello@kanticandle.com.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-display text-2xl text-[var(--color-gold)]">Returns</h2>
          <p className="font-sans text-sm text-[var(--color-muted)] leading-relaxed">
            We accept returns within 7 days of delivery for unused, unopened candles in their original packaging. To initiate a return, email us with your order number and reason for return. Return shipping costs are borne by the customer unless the product is defective.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-display text-2xl text-[var(--color-gold)]">Refunds</h2>
          <p className="font-sans text-sm text-[var(--color-muted)] leading-relaxed">
            Refunds are processed within 5–7 business days after we receive and inspect the returned item. The refund will be credited to your original payment method. Custom and AI-designed candles are non-refundable as they are made to order.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-display text-2xl text-[var(--color-gold)]">Damaged Items</h2>
          <p className="font-sans text-sm text-[var(--color-muted)] leading-relaxed">
            If your candle arrives damaged, please contact us within 48 hours of delivery with photos of the damage. We will arrange a free replacement or full refund at no cost to you.
          </p>
        </section>
      </div>
    </div>
  );
}
