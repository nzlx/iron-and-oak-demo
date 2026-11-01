import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { contacts, hours, site } from "@/content";
import Providers from "@/components/Providers";
import "./globals.css";

const serif = localFont({
  src: [
    { path: "./fonts/dm-serif-display-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/dm-serif-display-latin-400-italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-dm-serif",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});

const sans = localFont({
  src: "./fonts/inter-latin-wght-normal.woff2",
  weight: "100 900",
  variable: "--font-inter",
  display: "swap",
});

const title = `${site.name} | Barbershop in Tampa, FL`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s | ${site.shortName}` },
  description: site.description,
  keywords: ["barbershop Tampa", "barber Tampa FL", "skin fade", "hot towel shave", "beard trim", "men's haircut Tampa"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: site.name,
    title,
    description: site.description,
  },
  twitter: { card: "summary_large_image", title, description: site.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0e0c0a",
  colorScheme: "dark",
};

const dayCodes = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BarberShop",
  name: site.name,
  description: site.description,
  url: site.url,
  telephone: contacts.phoneHref.replace("tel:", ""),
  priceRange: "$$",
  image: `${site.url}/images/hero-chair.jpg`,
  address: {
    "@type": "PostalAddress",
    streetAddress: contacts.address.street,
    addressLocality: contacts.address.city,
    addressRegion: contacts.address.state,
    postalCode: contacts.address.zip,
    addressCountry: "US",
  },
  openingHours: hours.filter((h) => h.open).map((h) => `${dayCodes[h.day]} ${h.open}-${h.close}`),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-brass focus:px-4 focus:py-2 focus:text-ink"
        >
          Skip to content
        </a>
        <Providers>{children}</Providers>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
