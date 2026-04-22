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

export const metadata: Metadata = {
  title: "CoreSites-Studio | Webdesign & Development",
  description:
    "Moderne Websites, die begeistern. Webdesign, Development und SEO aus einer Hand.",
  keywords: ["Webdesign", "Development", "Next.js", "SEO", "CoreSites-Studio"],
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
