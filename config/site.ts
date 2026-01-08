import type { Metadata, Viewport } from "next";

// Setup Base URL
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://singabyte.sg";

// Site Config Data (Umum)
export const siteConfig = {
  name: "Singabyte.",
  description: "Singabyte. is a premier software development agency specializing in AI, Blockchain, Fintech, and Enterprise solutions.",
  url: SITE_URL,
  ogImage: `${SITE_URL}/images/og-singabyte.png`,
  links: {
    linkedin: "https://www.linkedin.com/company/singabyte",
  },
};

// Export Viewport Configuration
export const siteViewport: Viewport = {
  themeColor: "#0040FF",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

// Export Metadata Configuration
export const siteMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Singabyte. | Delivering Impact Through Technology",
    template: "%s | Singabyte.",
  },

  description: siteConfig.description,

  applicationName: "Singabyte.",

  keywords: [
    "Software Development",
    "Web Development",
    "Mobile App Development",
    "Artificial Intelligence",
    "Blockchain Technology",
    "Enterprise Solutions",
    "React Native",
    "Next.js",
    "Fintech",
    "Singapore Tech Agency",
    "Digital Transformation",
  ],

  authors: [{ name: "Singabyte. Team", url: SITE_URL }],
  creator: "Singabyte.",
  publisher: "Singabyte.",

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#0040FF",
      },
    ],
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Singabyte.",
    title: "Singabyte. | Delivering Impact Through Technology",
    description:
      "Transforming businesses with cutting-edge software solutions. We specialize in Web3, AI, Fintech, and Enterprise Systems.",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Singabyte - Delivering Impact Through Technology",
        type: "image/jpeg",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Singabyte. | Delivering Impact Through Technology",
    description:
      "Premier software development agency specializing in AI, Blockchain, and Enterprise solutions.",
    images: [siteConfig.ogImage],
    creator: "@singabyte_sg",
    site: "@singabyte_sg",
  },

  verification: {
    google: "google-site-verification-code", 
    yandex: "yandex-verification-code",
  },

  alternates: {
    canonical: SITE_URL,
    languages: {
      "en-US": `${SITE_URL}/en-US`,
      "id-ID": `${SITE_URL}/id-ID`,
    },
  },

  category: "technology",
};