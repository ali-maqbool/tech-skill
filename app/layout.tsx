import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site-seo";

const inter = localFont({ src: "./fonts/GeistVF.woff", variable: "--font-sans", display: "swap" });
const spaceGrotesk = localFont({ src: "./fonts/GeistVF.woff", variable: "--font-display", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Tech Skill | Technical Courses in Islamabad", template: "%s | Tech Skill" },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: "Tech Skill" }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "Education",
  classification: "Technical and digital skills education",
  referrer: "origin-when-cross-origin",
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_PK",
    title: "Tech Skill | Technical Courses in Islamabad",
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    images: [{ url: "/logo.png", width: 1200, height: 630, alt: "Tech Skill technical courses in Islamabad" }],
  },
  twitter: { card: "summary_large_image", title: "Tech Skill | Technical Courses in Islamabad", description: SITE_DESCRIPTION, images: ["/logo.png"] },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#f8faff",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-PK">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-C9R055LK8D"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-C9R055LK8D');
          `}
        </Script>
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} antialiased`} style={{ backgroundColor: "var(--color-background)" }}>
        {children}
      </body>
    </html>
  );
}
