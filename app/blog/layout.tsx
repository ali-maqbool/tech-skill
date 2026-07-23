import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site-seo";

export const metadata: Metadata = {
  title: "Blog | Tech Skill",
  description: "Practical digital skills, career guidance, and insights from Tech Skill in Islamabad.",
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/blog`,
    title: "Blog | Tech Skill",
    description: "Practical digital skills, career guidance, and insights from Tech Skill in Islamabad.",
    images: [{ url: "/logo.png", alt: "Tech Skill Blog" }],
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
