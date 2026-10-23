import type { Metadata } from "next";
import { Sora, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { PdfModalProvider } from "@/context/PdfModalContext";
import PdfViewerModal from "@/components/PdfViewerModal";
import ChatbotWidget from "@/components/ChatbotWidget";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "IARC XII - Industrial Automation & Robotics Competition 2026",
  description:
    "Official website for IARC XII by Departemen Teknik Elektro Otomasi FV ITS. Engineering Systems That Moves the World.",
  icons: {
    icon: "/images/gear-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${sora.variable} ${plusJakartaSans.variable} scroll-smooth overflow-x-hidden`}
    >
      <body className="min-h-screen bg-navy-950 text-text-main antialiased selection:bg-gold-500/30 selection:text-gold-400 overflow-x-hidden font-sans">
        <LanguageProvider>
          <PdfModalProvider>
            {children}
            <PdfViewerModal />
            <ChatbotWidget />
          </PdfModalProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
