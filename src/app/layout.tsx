import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/layout/Providers";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CursorSpotlight from "@/components/layout/CursorSpotlight";
import LoadingWrapper from "@/components/layout/LoadingWrapper";
import AnimatedBackground from "@/components/layout/AnimatedBackground";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'E-Cell GLA University | Entrepreneurship Cell Mathura',
  description: 'E-Cell GLAU is a student-run non-profit organization inspiring and guiding startups. Join 2500+ members fostering innovation.',
  keywords: 'e-cell, gla university, entrepreneurship, startups, mathura, innovation',
  metadataBase: new URL("https://ecell.gla.ac.in"),
  openGraph: {
    title: 'E-Cell GLA University',
    description: 'Where students don\'t just dream, they build.',
    url: 'https://ecell.gla.ac.in',
    siteName: 'E-Cell GLAU',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'E-Cell GLA University',
    description: 'Ideas. Actions. Results.',
    images: ['/twitter-image.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "E-Cell GLA University",
              "url": "https://ecell.gla.ac.in",
              "logo": "https://ecell.gla.ac.in/logo.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+91-8076527770",
                "email": "ecell@gla.ac.in"
              },
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "17km Stone, NH-19",
                "addressLocality": "Mathura",
                "postalCode": "281406",
                "addressCountry": "IN"
              }
            })
          }}
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <Providers>
          <LoadingWrapper>
            <div className="relative z-10 min-h-screen flex flex-col bg-transparent">
              <AnimatedBackground />
              <CursorSpotlight />
              <Navbar />
              <main id="main-content" className="flex-grow">{children}</main>
              <Footer />
            </div>
          </LoadingWrapper>
        </Providers>
      </body>
    </html>
  );
}
