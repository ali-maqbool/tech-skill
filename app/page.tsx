import type { Metadata } from "next";
import HomePageClient from "@/components/home/HomePageClient";
import JsonLd from "@/components/seo/JsonLd";
import { homeSchema, SITE_DESCRIPTION, SITE_URL } from "@/lib/site-seo";

export const metadata: Metadata = {
  title: "Tech Skill | Technical Courses in Islamabad",
  description: SITE_DESCRIPTION,
  keywords: [
    "tech skill",
    "technical courses Islamabad",
    "graphic designing near me",
    "graphic design course Islamabad",
    "IT courses Islamabad",
    "computer courses Islamabad",
    "digital marketing course Islamabad",
    "web development course Islamabad",
    "freelancing course Islamabad",
    "online earning islamabad, pakistan"
  ],
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Tech Skill | Skill Based Courses in Islamabad",
    description: SITE_DESCRIPTION,
    siteName: "Tech Skill",
    locale: "en_PK",
    images: [{ url: "/logo.png", width: 1200, height: 630, alt: "Tech Skill technical courses in Islamabad" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tech Skill | Technical Courses in Islamabad",
    description: SITE_DESCRIPTION,
    images: ["/logo.png"],
  },
};

export default function HomePage() {
  return <><JsonLd data={homeSchema} /><HomePageClient /></>;
}
