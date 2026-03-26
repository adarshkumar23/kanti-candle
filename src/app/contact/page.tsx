"use client";

import { useState } from "react";
import { MapPin, Mail, Clock, MessageCircle } from "lucide-react";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" strokeWidth="0" />
    </svg>
  );
}
import { useToast } from "@/context/ToastContext";
import { useRevealAnimation } from "@/hooks/useRevealAnimation";

export default function Contact() {
  const { addToast } = useToast();
  useRevealAnimation();

  const [form, setForm] = useState({ name: "", email: "", subject: "General", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      addToast("Please fill in all required fields", "error");
      return;
    }
    setSubmitted(true);
    addToast("Message sent! We'll respond within 24 hours.", "success");
    setForm({ name: "", email: "", subject: "General", message: "" });
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="pt-[72px]">
      {/* Hero */}
      <section className="relative h-[45vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-[var(--color-bg-deep)]">
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 80%, rgba(198,150,63,.08) 0%, transparent 70%)" }}></div>
        </div>
        <div className="relative z-10 px-8 md:px-16 lg:px-24 max-w-2xl">
          <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-[var(--color-gold-mid)] mb-4">Get in Touch</p>
          <h1 className="font-display text-6xl md:text-7xl font-light leading-tight mb-6">
            We&apos;d love to<br /><span className="italic text-[var(--color-gold)]">hear from you.</span>
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Form */}
          <div className="lg:col-span-3 reveal">
            <h2 className="font-display text-3xl mb-8 text-[var(--color-gold)]">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="font-sans text-[9px] uppercase tracking-[0.25em] text-[var(--color-faint)] block mb-2">Name *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-transparent border-b border-[var(--color-border)]/40 focus:border-[var(--color-gold)] focus:outline-none text-[var(--color-muted)] font-sans text-sm py-3"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="font-sans text-[9px] uppercase tracking-[0.25em] text-[var(--color-faint)] block mb-2">Email *</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-transparent border-b border-[var(--color-border)]/40 focus:border-[var(--color-gold)] focus:outline-none text-[var(--color-muted)] font-sans text-sm py-3"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <div>
                <label className="font-sans text-[9px] uppercase tracking-[0.25em] text-[var(--color-faint)] block mb-2">Subject</label>
                <select
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full bg-transparent border-b border-[var(--color-border)]/40 focus:border-[var(--color-gold)] focus:outline-none text-[var(--color-muted)] font-sans text-sm py-3 cursor-pointer"
                >
                  <option value="General">General Inquiry</option>
                  <option value="Order">Order Support</option>
                  <option value="Wholesale">Wholesale</option>
                  <option value="Custom">Custom Candle Request</option>
                  <option value="Feedback">Feedback</option>
                </select>
              </div>
              <div>
                <label className="font-sans text-[9px] uppercase tracking-[0.25em] text-[var(--color-faint)] block mb-2">Message *</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={5}
                  className="w-full bg-[var(--color-bg-low)] border border-[var(--color-border)]/30 focus:border-[var(--color-gold)] focus:outline-none rounded-sm p-4 text-[var(--color-muted)] font-sans text-sm resize-none"
                  placeholder="Tell us what's on your mind..."
                />
              </div>
              <button
                type="submit"
                disabled={submitted}
                className="btn-gold px-10 py-4 font-sans text-xs uppercase tracking-[0.22em] font-semibold rounded-sm disabled:opacity-50"
              >
                {submitted ? "Message Sent!" : "Send Message"}
              </button>
            </form>
          </div>

          {/* Info */}
          <div className="lg:col-span-2 reveal" style={{ transitionDelay: "150ms" }}>
            <h2 className="font-display text-3xl mb-8 text-[var(--color-gold)]">Visit Us</h2>
            <div className="space-y-8">
              <div className="flex gap-4">
                <MapPin className="w-5 h-5 text-[var(--color-gold-mid)] shrink-0 mt-1" />
                <div>
                  <p className="font-sans text-sm text-[var(--color-muted)] font-medium">Studio Address</p>
                  <p className="font-sans text-sm text-[var(--color-faint)] leading-relaxed mt-1">
                    Kanti Candle Studio<br />
                    Sector 92, Gurgaon<br />
                    Haryana, India
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Mail className="w-5 h-5 text-[var(--color-gold-mid)] shrink-0 mt-1" />
                <div>
                  <p className="font-sans text-sm text-[var(--color-muted)] font-medium">Email</p>
                  <p className="font-sans text-sm text-[var(--color-faint)] mt-1">kanticandle@gmail.com</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Clock className="w-5 h-5 text-[var(--color-gold-mid)] shrink-0 mt-1" />
                <div>
                  <p className="font-sans text-sm text-[var(--color-muted)] font-medium">Hours</p>
                  <p className="font-sans text-sm text-[var(--color-faint)] leading-relaxed mt-1">
                    Open all 7 days<br />
                    10:00 AM – 8:00 PM
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-10 space-y-4">
              <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-[var(--color-gold)] font-semibold">Follow Us</p>
              <div className="flex gap-4">
                <a
                  href="https://www.instagram.com/kanticandles/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-5 py-3 bg-[var(--color-bg-low)] border border-[var(--color-border)]/20 rounded-sm hover:border-[var(--color-gold)]/40 hover:bg-[var(--color-gold)]/5 transition-all group"
                >
                  <InstagramIcon className="w-5 h-5 text-[var(--color-gold-mid)] group-hover:text-[var(--color-gold)] transition-colors" />
                  <span className="font-sans text-[10px] uppercase tracking-widest text-[var(--color-muted)] group-hover:text-[var(--color-gold)] transition-colors">Instagram</span>
                </a>
                <a
                  href="https://wa.me/?text=Hi%20Kanti%20Candle!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-5 py-3 bg-[var(--color-bg-low)] border border-[var(--color-border)]/20 rounded-sm hover:border-[var(--color-gold)]/40 hover:bg-[var(--color-gold)]/5 transition-all group"
                >
                  <MessageCircle className="w-5 h-5 text-[var(--color-gold-mid)] group-hover:text-[var(--color-gold)] transition-colors" />
                  <span className="font-sans text-[10px] uppercase tracking-widest text-[var(--color-muted)] group-hover:text-[var(--color-gold)] transition-colors">WhatsApp</span>
                </a>
              </div>
            </div>

            <div className="mt-10 p-6 bg-[var(--color-bg-low)] rounded-sm border border-[var(--color-border)]/20">
              <p className="font-sans text-[10px] uppercase tracking-widest text-[var(--color-gold-mid)] mb-3">Wholesale Inquiries</p>
              <p className="font-sans text-sm text-[var(--color-faint)] leading-relaxed">
                Interested in carrying Kanti candles? We partner with boutiques, hotels, and wellness spaces. Reach out with subject &ldquo;Wholesale&rdquo; for our catalogue and pricing.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
