import type { Metadata } from "next";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Preloader } from "@/components/Preloader";
import { siteConfig, summary } from "@/content/site";
import "./globals.css";

const siteUrl = "https://darshilshah.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteConfig.name} | ${siteConfig.title}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: summary,
  keywords: ["Darshil Shah","Frontend Developer","React","MERN Stack","AWS","Portfolio"],
  authors: [{ name: siteConfig.name, url: siteUrl }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: `${siteConfig.name} | ${siteConfig.title}`,
    description: summary,
    siteName: siteConfig.name,
    images: [{ url: "/assets/headshot.png", width: 800, height: 800, alt: siteConfig.name }],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=JetBrains+Mono:wght@300;400;500&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen font-sans antialiased body-root">
        <Preloader />
        <div className="grain" aria-hidden />
        <div className="scanlines" aria-hidden />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
