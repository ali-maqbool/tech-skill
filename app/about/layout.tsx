import type { Metadata } from "next";
import { SITE_DESCRIPTION, SITE_URL } from "@/lib/site-seo";
import JsonLd from "@/components/seo/JsonLd";
import { organizationSchema } from "@/lib/site-seo";

export const metadata: Metadata = {
  title: "About Tech Skill | Practical Skills Institute in Islamabad",
  description: `Learn how Tech Skill helps students in Islamabad build practical digital skills, portfolios, and career confidence. ${SITE_DESCRIPTION}`,
  keywords: ["about Tech Skill", "skills institute Islamabad", "digital skills training Islamabad", "career courses Islamabad"],
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: { type: "website", url: `${SITE_URL}/about`, title: "About Tech Skill | Practical Skills Institute in Islamabad", description: "Meet Tech Skill, an Islamabad-focused institute for practical digital and technical education.", images: [{ url: "/logo.png", alt: "Tech Skill Institute Islamabad" }] },
};

export default function AboutLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <>{children}<JsonLd data={{ "@context": "https://schema.org", ...organizationSchema }} /></>;
}
