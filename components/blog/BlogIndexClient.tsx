"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { Search, ArrowRight } from "lucide-react";
import type { BlogPost } from "@/lib/blog";

function PostCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  return <motion.article whileHover={{ y: -6 }} transition={{ duration: 0.2 }} className={featured ? "blog-card blog-card-featured" : "blog-card"}>
    <Link href={`/blog/${post.slug}`} className="block h-full"><div className="blog-card-image"><Image src={post.coverImage} alt={post.coverAlt ?? post.title} fill sizes={featured ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"} /></div><div className="blog-card-content"><div className="blog-tag-row">{post.tags.slice(0, 2).map((tag) => <span className="blog-tag" key={tag}>{tag}</span>)}</div><h2>{post.title}</h2><p>{post.excerpt}</p><div className="blog-card-meta"><time dateTime={post.date}>{new Date(`${post.date}T12:00:00`).toLocaleDateString("en-PK", { month: "short", day: "numeric", year: "numeric" })}</time><span>{post.readingTime}</span><ArrowRight size={16} aria-hidden="true" /></div></div></Link>
  </motion.article>;
}

export default function BlogIndexClient({ posts }: { posts: BlogPost[] }) {
  const prefersReduced = useReducedMotion(); const [query, setQuery] = useState(""); const [tag, setTag] = useState("all"); const [visible, setVisible] = useState(6);
  const tags = Array.from(new Set(posts.flatMap((post) => post.tags))).sort();
  const filtered = posts.filter((post) => (tag === "all" || post.tags.includes(tag)) && `${post.title} ${post.excerpt}`.toLowerCase().includes(query.toLowerCase()));
  return <>
    <div className="blog-filters"><label className="blog-search"><Search size={18} aria-hidden="true" /><span className="sr-only">Search articles</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search practical insights" /></label><div className="blog-filter-tags"><button className={tag === "all" ? "active" : ""} onClick={() => setTag("all")}>All</button>{tags.map((item) => <button className={tag === item ? "active" : ""} key={item} onClick={() => setTag(item)}>{item}</button>)}</div></div>
    {filtered.length ? <div className="blog-grid">{filtered.slice(0, visible).map((post, index) => <motion.div key={post.slug} initial={prefersReduced ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ delay: index * 0.05 }}><PostCard post={post} featured={index === 0 && !query && tag === "all"} /></motion.div>)}</div> : <div className="blog-empty"><h2>No articles found</h2><p>Try another search or browse all insights.</p></div>}
    {visible < filtered.length && <button className="btn-outline blog-load-more" onClick={() => setVisible((value) => value + 6)}>Load more articles</button>}
  </>;
}
