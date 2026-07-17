import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tech Skill — Professional Skills for a Digital World",
  description:
    "Learn Graphic Design, Web Development, Digital Marketing, Freelancing, and Video Editing at Tech Skill institute. Enroll today.",
  keywords: [
    "tech skill",
    "graphic design",
    "web development",
    "digital marketing",
    "freelancing",
    "Pakistan",
  ],
};

// ── This is what actually injects the <meta name="viewport"> tag. ──────────
// Without width:"device-width" + initialScale:1, mobile browsers render
// the page at ~980px wide and scale it down — causing the "desktop on mobile" look.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#f8faff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
        style={{ backgroundColor: "var(--color-background)" }}
      >
        {children}
      </body>
    </html>
  );
}
