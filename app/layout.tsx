import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
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

export const viewport = {
  themeColor: "#1a3340",
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
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
        style={{ backgroundColor: "var(--color-background)" }}
      >
        {children}
      </body>
    </html>
  );
}
