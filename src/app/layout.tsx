import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "Kanti Candle | Hand-Poured Luxury Candles from Gurgaon",
  description: "Hand-poured luxury candles made in small batches in Gurgaon, India. Premium fragrance oils, natural wax, gift-ready packaging. Shop from ₹1,350.",
  keywords: "luxury candles, hand poured candles, scented candles India, Gurgaon candles, natural wax candles",
  openGraph: {
    title: "Kanti Candle — Set the Mood",
    description: "Premium hand-poured candles from Gurgaon, India. Starting at ₹1,350.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body>
        <Providers>
          <Navbar />
          <main className="page-enter pt-16 pb-20 md:pb-0">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
