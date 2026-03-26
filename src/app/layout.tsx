import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kanti Candles — Hand-Poured Luxury from Gurgaon",
  description: "Artisan soy candles hand-poured in Gurgaon. Warm, long-lasting, and made with intention. 80–100 hour burn time.",
  keywords: ["luxury candles", "soy candles", "hand-poured candles", "Gurgaon", "artisan candles", "Kanti"],
  openGraph: {
    title: "Kanti Candles",
    description: "Hand-poured luxury candles from Gurgaon, India",
    images: ["/og-image.jpg"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body style={{ fontFamily: 'var(--font-dm-sans, "DM Sans", system-ui, sans-serif)' }}>
        <Providers>
          <Navbar />
          <main className="page-enter">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
