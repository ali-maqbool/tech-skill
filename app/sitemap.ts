import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { SITE_URL } from "@/lib/site-seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/contact", "/blog"];
  return [
    ...routes.map((route) => ({ url: `${SITE_URL}${route}`, lastModified: new Date(), changeFrequency: route === "" ? "weekly" as const : "monthly" as const, priority: route === "" ? 1 : 0.7 })),
    ...getAllPosts().map((post) => ({ url: `${SITE_URL}/blog/${post.slug}`, lastModified: new Date(post.date), changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
