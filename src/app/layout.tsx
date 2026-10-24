import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SiteLoader from "@/components/SiteLoader";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mykyta Burenok | Frontend / Full-Stack Developer",
  description:
    "Berlin-based developer building responsive web applications with clear, intuitive interfaces and thoughtful functionality.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <SiteLoader />
      </body>
    </html>
  );
}
