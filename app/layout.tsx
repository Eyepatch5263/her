import type { Metadata } from "next";
import { Inria_Serif, Inria_Sans, Caveat } from "next/font/google";
import "./globals.css";

const inriaSerif = Inria_Serif({
  variable: "--font-inria-serif",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  style: ["normal", "italic"],
});

const inriaSans = Inria_Sans({
  variable: "--font-inria-sans",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  style: ["normal", "italic"],
});

const caveat = Caveat({
  variable: "--font-handwriting",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "For Dee — A Digital Love Space",
  description: "A minimal, dark & romantic digital love space dedicated to her.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inriaSerif.variable} ${inriaSans.variable} ${caveat.variable} dark`}
    >
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <link rel="preload" href="/her.mpeg" as="audio" />
      </head>
      <body className="min-h-screen bg-[#050505] text-[#f5f5f5] font-sans antialiased selection:bg-[#ff2b42]/30 selection:text-[#ff2b42]">
        {children}
      </body>
    </html>
  );
}
