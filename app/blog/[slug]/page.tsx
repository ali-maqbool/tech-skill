import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MarkdownContent from "@/components/blog/MarkdownContent";
import BlogArticleEnhancements from "@/components/blog/BlogArticleEnhancements";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/blog";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://techskill.pk";
export function generateStaticParams() { return getAllPosts().map((post) => ({ slug: post.slug })); }
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPostBySlug(params.slug); if (!post) return { title: "Article not found | Tech Skill" };
  return { title: `${post.title} | Tech Skill`, description: post.excerpt, alternates: { canonical: `${SITE_URL}/blog/${post.slug}` }, openGraph: { type: "article", url: `${SITE_URL}/blog/${post.slug}`, title: post.title, description: post.excerpt, publishedTime: post.date, authors: [post.author], images: [{ url: post.coverImage, alt: post.coverAlt ?? post.title }] }, twitter: { card: "summary_large_image", title: post.title, description: post.excerpt, images: [post.coverImage] } };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug); if (!post) return <><Navbar /><main className="blog-empty-page"><h1>Article not found</h1><Link href="/blog" className="btn-primary">Back to blog</Link></main><Footer /></>;
  const related = getRelatedPosts(post); const schema = { "@context": "https://schema.org", "@type": "BlogPosting", headline: post.title, description: post.excerpt, image: `${SITE_URL}${post.coverImage}`, datePublished: post.date, author: { "@type": "Person", name: post.author }, mainEntityOfPage: `${SITE_URL}/blog/${post.slug}` }; const breadcrumb = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Blog", item: `${SITE_URL}/blog` }, { "@type": "ListItem", position: 2, name: post.title, item: `${SITE_URL}/blog/${post.slug}` }] };
  return <><Navbar /><main className="blog-post-page"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} /><BlogArticleEnhancements headings={post.headings} /><article><header className="blog-post-header"><Link href="/blog" className="blog-back-link"><ArrowLeft size={16} /> Back to all articles</Link><div className="blog-tag-row">{post.tags.map((tag) => <span className="blog-tag" key={tag}>{tag}</span>)}</div><h1>{post.title}</h1><p className="blog-post-excerpt">{post.excerpt}</p><div className="blog-post-meta"><span>By {post.author}</span><time dateTime={post.date}>{new Date(`${post.date}T12:00:00`).toLocaleDateString("en-PK", { month: "long", day: "numeric", year: "numeric" })}</time><span>{post.readingTime}</span></div></header><div className="blog-cover"><Image src={post.coverImage} alt={post.coverAlt ?? post.title} fill priority sizes="(max-width: 768px) 100vw, 1100px" /></div><div className="blog-post-layout"><MarkdownContent blocks={post.blocks} /></div></article><section className="blog-related"><div className="blog-section-heading"><div><p className="blog-eyebrow plain">Keep exploring</p><h2>Related articles</h2></div><Link href="/blog" className="blog-back-link">View all <ArrowRight size={16} /></Link></div><div className="blog-grid">{related.map((item) => <Link className="blog-card" href={`/blog/${item.slug}`} key={item.slug}><div className="blog-card-image"><Image src={item.coverImage} alt={item.coverAlt ?? item.title} fill sizes="(max-width: 768px) 100vw, 33vw" /></div><div className="blog-card-content"><div className="blog-tag-row">{item.tags.slice(0, 2).map((tag) => <span className="blog-tag" key={tag}>{tag}</span>)}</div><h2>{item.title}</h2><p>{item.excerpt}</p></div></Link>)}</div></section></main><Footer /></>;
}
