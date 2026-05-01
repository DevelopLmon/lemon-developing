import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import LoadingScreen from "@/components/ui/LoadingScreen";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const siteUrl = "https://coresites-studio.de";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "CoreSites-Studio | Webdesign & Webentwicklung",
    template: "%s | CoreSites-Studio",
  },
  description:
    "Professionelles Webdesign & Webentwicklung für Unternehmen. Moderne, schnelle Websites mit Next.js — inkl. SEO, UI/UX-Design und Support. Jetzt Angebot anfragen.",
  keywords: [
    // Service-Keywords
    "Webdesign",
    "Webentwicklung",
    "Website erstellen lassen",
    "Homepage erstellen lassen",
    "Webseite erstellen lassen",
    "professionelle Website",
    "Website für Unternehmen",
    "moderne Website",
    "responsive Webdesign",
    // Technologie
    "Next.js Agentur",
    "React Entwicklung",
    "TypeScript Webentwicklung",
    "Headless CMS",
    // SEO
    "SEO Agentur",
    "Suchmaschinenoptimierung",
    "Google Ranking verbessern",
    "Core Web Vitals",
    "technisches SEO",
    // Design
    "UI UX Design",
    "Webdesign Agentur",
    "Figma Design",
    // Lokal
    "Webdesign Zeven",
    "Webdesign Niedersachsen",
    "Webdesign Hamburg",
    "Webdesign Bremen",
    "Webdesign Norddeutschland",
    "Webdesign Deutschland",
    // Long-tail
    "günstige professionelle Website",
    "Website für kleine Unternehmen",
    "schnelle Website",
    "Freelancer Webdesign",
    "CoreSites Studio",
    "CoreSites-Studio",
  ],
  authors: [{ name: "CoreSites-Studio", url: siteUrl }],
  creator: "CoreSites-Studio",
  publisher: "CoreSites-Studio",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: siteUrl,
    siteName: "CoreSites-Studio",
    title: "CoreSites-Studio | Professionelles Webdesign & Webentwicklung",
    description:
      "Moderne, schnelle Websites für Unternehmen. Webdesign, Next.js-Entwicklung und SEO aus einer Hand — mit persönlichem Support.",
  },
  twitter: {
    card: "summary_large_image",
    title: "CoreSites-Studio | Webdesign & Webentwicklung",
    description:
      "Professionelles Webdesign & Webentwicklung. Moderne Websites mit Next.js, SEO und UI/UX-Design.",
    creator: "@coresites",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className="scroll-smooth">
      <body
        className={`${spaceGrotesk.variable} ${dmSans.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <LoadingScreen />
        {children}
      </body>
    </html>
  );
}
