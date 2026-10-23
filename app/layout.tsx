import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import CustomCursor from "@/components/cursor";
import FloatingWhatsApp from "@/components/whatsapp";
/* =========================================================
   FONTS
========================================================= */

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

/* =========================================================
   WEBSITE CONFIGURATION
========================================================= */

const SITE_URL = "https://aakashcreative.vercel.app";

const SITE_NAME = "Aakash Creative Studio";

const SITE_TITLE =
  "Aakash Creative Studio | UGC Ads, VSL & AI Video Editing";

const SITE_DESCRIPTION =
  "Aakash Creative Studio helps DTC and eCommerce brands create high-converting UGC ads, Meta ads, VSLs, AI Pixar-style videos, claymation ads, and scroll-stopping social content. 2+ years of experience and 1000+ projects delivered.";

const SITE_LOGO = `${SITE_URL}/LOGO.jpg`;

const EMAIL = "aakashhanif.gsc@gmail.com";

const WHATSAPP = "https://wa.me/923335673693";

/* =========================================================
   SEO METADATA
========================================================= */

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  applicationName: SITE_NAME,

  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },

  description: SITE_DESCRIPTION,

  keywords: [
    "Aakash Creative Studio",
    "Aakash Creative Studio",
    "Aakash Hanif",
    "Aakash Edits Lab",
    "Professional Video Editor",
    "Video Editing Agency",
    "Creative Video Production Studio",
    "UGC Video Editor",
    "UGC Ads Editing",
    "AI UGC Ads",
    "UGC Video Editing Services",
    "Meta Ads Video Editor",
    "Facebook Ads Video Editing",
    "Instagram Ads Video Editing",
    "TikTok Ads Video Editing",
    "High Converting Video Ads",
    "Direct Response Video Editing",
    "VSL Video Editor",
    "Video Sales Letter Editing",
    "DTC Video Editing",
    "DTC eCommerce Video Ads",
    "eCommerce Video Editor",
    "Performance Creative Agency",
    "AI Video Editing",
    "AI Pixar Style Animation",
    "AI Pixar Cartoon Ads",
    "AI Claymation Ads",
    "Claymation Advertisements",
    "Scroll Stopping Video Ads",
    "Social Media Video Editing",
    "Product Advertisement Editing",
    "Higgsfield AI Video Editing",
    "Adobe Premiere Pro Editor",
    "Adobe After Effects Editor",
    "Creative Advertising Studio",
  ],

  authors: [
    {
      name: "Aakash Creative Studio",
      url: SITE_URL,
    },
  ],

  creator: "Aakash Hanif",

  publisher: SITE_NAME,

  category: "Video Editing & Creative Production",

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",

    locale: "en_US",

    url: SITE_URL,

    siteName: SITE_NAME,

    title: SITE_TITLE,

    description: SITE_DESCRIPTION,

    images: [
      {
        url: SITE_LOGO,
        width: 1200,
        height: 630,
        alt: "Aakash Creative Studio - Video Editing and Creative Production",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    site: "@aakashhanif_",

    creator: "@aakashhanif_",

    title: SITE_TITLE,

    description: SITE_DESCRIPTION,

    images: [SITE_LOGO],
  },

  icons: {
    icon: [
      {
        url: "/LOGO.jpg",
        type: "image/webp",
      },
    ],

    shortcut: "/LOGO.jpg",

    apple: "/LOGO.jpg",
  },

  appleWebApp: {
    capable: true,
    title: SITE_NAME,
    statusBarStyle: "black-translucent",
  },

  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },

  referrer: "strict-origin-when-cross-origin",
};

/* =========================================================
   VIEWPORT CONFIGURATION
========================================================= */

export const viewport: Viewport = {
  width: "device-width",

  initialScale: 1,

  themeColor: [
    {
      media: "(prefers-color-scheme: light)",
      color: "#ffffff",
    },
    {
      media: "(prefers-color-scheme: dark)",
      color: "#080808",
    },
  ],

  colorScheme: "dark light",
};

/* =========================================================
   STRUCTURED DATA - ORGANIZATION
========================================================= */

const organizationSchema = {
  "@context": "https://schema.org",

  "@type": "Organization",

  "@id": `${SITE_URL}/#organization`,

  name: SITE_NAME,

  alternateName: [
    "Aakash Edits Lab",
    "Aakash Creative",
  ],

  url: SITE_URL,

  logo: {
    "@type": "ImageObject",
    url: SITE_LOGO,
  },

  image: SITE_LOGO,

  description: SITE_DESCRIPTION,

  email: EMAIL,

  telephone: "+923335673693",

  sameAs: [
    "https://www.instagram.com/aakashcreativestudio",
    "https://www.linkedin.com/in/aakash-hanif-7a7a53289",
    "https://x.com/aakashhanif_",
  ],

  contactPoint: {
    "@type": "ContactPoint",

    contactType: "customer support",

    email: EMAIL,

    telephone: "+923335673693",

    availableLanguage: ["English"],

    url: WHATSAPP,
  },
};

/* =========================================================
   STRUCTURED DATA - WEBSITE
========================================================= */

const websiteSchema = {
  "@context": "https://schema.org",

  "@type": "WebSite",

  "@id": `${SITE_URL}/#website`,

  name: SITE_NAME,

  url: SITE_URL,

  description: SITE_DESCRIPTION,

  publisher: {
    "@id": `${SITE_URL}/#organization`,
  },

  inLanguage: "en",
};

/* =========================================================
   STRUCTURED DATA - PROFESSIONAL SERVICES
========================================================= */

const serviceSchema = {
  "@context": "https://schema.org",

  "@type": "ProfessionalService",

  "@id": `${SITE_URL}/#professional-service`,

  name: SITE_NAME,

  url: SITE_URL,

  image: SITE_LOGO,

  description:
    "Professional video editing and creative production services for DTC brands, eCommerce businesses, and performance marketing teams.",

  email: EMAIL,

  telephone: "+923335673693",

  priceRange: "$$",

  hasOfferCatalog: {
    "@type": "OfferCatalog",

    name: "Creative Video Editing Services",

    itemListElement: [
      {
        "@type": "OfferCatalog",
        name: "Meta Ads Video Editing",
        description:
          "Performance-focused Facebook and Instagram video advertisements.",
      },
      {
        "@type": "OfferCatalog",
        name: "UGC Video Editing",
        description:
          "Scroll-stopping user-generated content and authentic product advertisements.",
      },
      {
        "@type": "OfferCatalog",
        name: "AI UGC Video Ads",
        description:
          "AI-assisted UGC advertisements for eCommerce and DTC brands.",
      },
      {
        "@type": "OfferCatalog",
        name: "VSL Video Editing",
        description:
          "Persuasive video sales letters designed to communicate product value.",
      },
      {
        "@type": "OfferCatalog",
        name: "AI Pixar-Style Video Ads",
        description:
          "Creative AI-generated cartoon-style advertisements and animated content.",
      },
      {
        "@type": "OfferCatalog",
        name: "AI Claymation Advertisements",
        description:
          "Creative claymation-style AI video advertisements.",
      },
      {
        "@type": "OfferCatalog",
        name: "Social Media Video Editing",
        description:
          "Professional short-form content for Instagram, TikTok, YouTube, and social platforms.",
      },
    ],
  },

  provider: {
    "@id": `${SITE_URL}/#organization`,
  },
};

/* =========================================================
   STRUCTURED DATA - PERSON
========================================================= */

const personSchema = {
  "@context": "https://schema.org",

  "@type": "Person",

  "@id": `${SITE_URL}/#founder`,

  name: "Aakash Hanif",

  jobTitle: "Video Editor & Creative Production Specialist",

  description:
    "Video editing specialist focused on UGC advertisements, VSLs, Meta ads, AI-generated video creatives, and DTC eCommerce content.",

  worksFor: {
    "@id": `${SITE_URL}/#organization`,
  },

  url: SITE_URL,

  sameAs: [
    "https://www.instagram.com/aakashcreativestudio",
    "https://www.linkedin.com/in/aakash-hanif-7a7a53289",
    "https://x.com/aakashhanif_",
  ],
};

/* =========================================================
   JSON-LD STRUCTURED DATA
========================================================= */

const jsonLd = {
  "@context": "https://schema.org",

  "@graph": [
    {
      ...organizationSchema,
      "@context": undefined,
    },
    {
      ...websiteSchema,
      "@context": undefined,
    },
    {
      ...serviceSchema,
      "@context": undefined,
    },
    {
      ...personSchema,
      "@context": undefined,
    },
  ],
};

const safeJsonLd = JSON.stringify(jsonLd).replace(/</g, "\\u003c");

/* =========================================================
   ROOT LAYOUT
========================================================= */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >


      <body
        className="
          min-h-screen
          flex
          flex-col
          bg-[#080808]
          text-white
          font-sans
          antialiased
        "
      >
        <Script
          id="aakash-structured-data"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: safeJsonLd,
          }}
        />
  {/* Floating WhatsApp Button */}
        <FloatingWhatsApp />

        {/* Custom Cursor */}
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}