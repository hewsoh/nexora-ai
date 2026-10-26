import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = {
  title: "NEXORA AI — Structured AI workflows",
  description:
    "Six AI studios for business, career, creating, fitness, gaming and everyday life. Finished documents, not conversations.",
  openGraph: {
    title: "NEXORA AI",
    description: "AI that finishes the job. Launch plans, resumes and interview prep in minutes.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU" className={inter.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
