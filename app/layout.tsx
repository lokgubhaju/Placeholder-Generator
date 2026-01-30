import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Placeholder Asset Generator",
    template: "%s | Placeholder Asset Generator",
  },
  description:
    "Generate custom placeholder images and videos for web development, design mockups, and testing. Free, fast, and runs entirely in your browser.",
  keywords: [
    "placeholder image",
    "placeholder video",
    "image generator",
    "video generator",
    "web development tools",
    "mockup generator",
    "dummy content",
    "developer tools",
    "frontend development",
  ],
  authors: [{ name: "Lok Gubhaju" }],
  creator: "Lok Gubhaju",
  publisher: "Placeholder Generator",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Placeholder Asset Generator",
    description: "Generate custom placeholder images and videos for web development instantly.",
    url: "https://placeholder-generator.com",
    images: [
      {
        url: "/placeholder_final_logo.png",
        width: 1200,
        height: 630,
        alt: "Placeholder Asset Generator Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Placeholder Asset Generator",
    description: "Generate custom placeholder images and videos for web development instantly.",
    images: ["/placeholder_final_logo.png"]
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
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <Analytics />
        <Navbar />
        <main className="grow bg-black">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
