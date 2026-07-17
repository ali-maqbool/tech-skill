import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site-seo";
import JsonLd from "@/components/seo/JsonLd";
import { organizationSchema } from "@/lib/site-seo";

export const metadata: Metadata = {
  title: "Contact Tech Skill | Courses in Islamabad",
  description: "Contact Tech Skill in G-10 Markaz, Islamabad for course guidance, admissions, and practical training in graphic design, web development, digital marketing, and more.",
  keywords: ["Tech Skill contact", "technical courses near me", "courses in G-10 Islamabad", "graphic design course near me"],
  alternates: { canonical: `${SITE_URL}/contact` },
  openGraph: { type: "website", url: `${SITE_URL}/contact`, title: "Contact Tech Skill | Courses in Islamabad", description: "Speak with Tech Skill about practical technical courses and admissions in Islamabad.", images: [{ url: "/logo.png", alt: "Contact Tech Skill Islamabad" }] },
};

export default function ContactLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <>{children}<JsonLd data={{ "@context": "https://schema.org", ...organizationSchema }} /></>;
}
