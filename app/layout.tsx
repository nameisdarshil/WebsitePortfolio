import type { Metadata } from "next";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Preloader } from "@/components/Preloader";
import { siteConfig, summary } from "@/content/site";
import "./globals.css";

export const metadata: Metadata = {
  title: { default:`${siteConfig.name} | ${siteConfig.title}`, template:`%s | ${siteConfig.name}` },
  description: summary,
  keywords: ["Darshil Shah","Frontend Developer","React","MERN Stack","AWS"],
  authors: [{ name: siteConfig.name }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=JetBrains+Mono:wght@300;400;500&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen body-root antialiased">
        <Preloader />
        <div className="grain" aria-hidden />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
