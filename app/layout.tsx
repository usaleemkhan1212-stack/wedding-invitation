import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Great_Vibes, Noto_Nastaliq_Urdu } from "next/font/google";
import { wedding } from "@/config/wedding";
import "./globals.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-serif",
});

const script = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-script",
});

const nastaliq = Noto_Nastaliq_Urdu({
  subsets: ["arabic"],
  weight: ["400", "600", "700"],
  display: "swap",
  variable: "--font-nastaliq",
  fallback: ["Jameel Noori Nastaleeq", "Urdu Typesetting", "Noto Naskh Arabic", "serif"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: wedding.meta.title,
  description: wedding.meta.description,
  openGraph: {
    title: wedding.meta.title,
    description: wedding.meta.description,
    locale: "en_PK",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: wedding.meta.title,
    description: wedding.meta.description,
  },
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#2F1B4C",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" className={`${serif.variable} ${script.variable} ${nastaliq.variable}`}>
      <body className="font-serif">
        <noscript>
          {/* Without JavaScript, skip the opening screen and show everything. */}
          <style>{`.opening-gate{display:none!important}.reveal{opacity:1!important;transform:none!important}html{overflow:auto!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
