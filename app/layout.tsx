import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "Shaik Imaduddin — Software Engineer · Builder · Tech Lead",
  description: "Editorial personal portfolio and motion archive of Shaik Imaduddin. Software Engineer, Builder, and Tech Lead.",
  keywords: ["Shaik Imaduddin", "Imad", "Software Engineer", "Builder", "Tech Lead", "Portfolio", "Minimalist"],
  authors: [{ name: "Shaik Imaduddin" }],
  openGraph: {
    title: "Shaik Imaduddin — Software Engineer · Builder · Tech Lead",
    description: "Editorial personal portfolio and motion archive of Shaik Imaduddin.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#F7F5F0] text-[#0A0A0A]`}
    >
      <body className="min-h-screen bg-[#F7F5F0] text-[#0A0A0A] selection:bg-[#0A0A0A] selection:text-[#F7F5F0]">
        {children}
      </body>
    </html>
  );
}
