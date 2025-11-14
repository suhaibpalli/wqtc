import type { Metadata } from "next";
import { Inter, Amiri } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnnouncementBar from "@/components/layout/AnnouncementBar";

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter",
  display: "swap",
});

const amiri = Amiri({ 
  weight: ['400', '700'],
  subsets: ["arabic"], 
  variable: "--font-amiri",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Word for Word Quran Translation | Learn Quran with Ustaad Imran Sait",
  description: "Learn the Qur'an translation using the Word for Word concept by Ustaad Imran Sait. Free online Quran classes in English, Urdu, and Tamil.",
  keywords: ["Quran translation", "word for word Quran", "learn Quran", "Imran Sait", "Quran classes", "Islamic education"],
  authors: [{ name: "WQTC" }],
  openGraph: {
    title: "Word for Word Quran Translation Classes",
    description: "Free Quran translation classes using innovative word-for-word learning method",
    url: "https://wordforwordquran.com",
    siteName: "WQTC",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${amiri.variable}`}>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {/* <AnnouncementBar /> */}
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
