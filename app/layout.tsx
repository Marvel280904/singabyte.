import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Funnel_Sans, Funnel_Display } from "next/font/google";
import Header from "@/components/layout/header";
import { siteMetadata, siteViewport } from "@/config/site";

// Setup Funnel Sans
const funnelSans = Funnel_Sans({
  variable: "--font-funnel-sans", 
  subsets: ["latin"],
  display: "swap",
});

// Setup Funnel Display
const funnelDisplay = Funnel_Display({
  variable: "--font-funnel-display",
  subsets: ["latin"],
  display: "swap",
});

// Viewport n Metadata from config/site
export const viewport: Viewport = siteViewport;
export const metadata: Metadata = siteMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`
          ${funnelSans.variable} 
          ${funnelDisplay.variable} 
          antialiased 
        `}>
      <body>
        <Header />
        
        {children}
      </body>
    </html>
  );
}
