import type { Metadata } from "next";
import { ArrowRight, Sparkles } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BlogIndexClient from "@/components/blog/BlogIndexClient";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = { title: "Blog | Tech Skill", description: "Practical digital skills, career guidance, and insights from Tech Skill." };

export default function BlogPage() {
  const posts = getAllPosts();
  return <><Navbar /><main id="blog"><section className="blog-hero"><div className="blog-mesh" aria-hidden="true" /><div className="blog-hero-inner"><span className="blog-eyebrow"><Sparkles size={14} /> The Tech Skill Journal</span><h1>Ideas that move your work forward.</h1><p>Practical guidance for learning digital skills, building proof, and finding your next opportunity.</p><a href="#articles" className="btn-primary inline-flex items-center gap-2">Browse articles <ArrowRight size={18} /></a></div></section><section id="articles" className="blog-index-section"><div className="blog-section-heading"><div><p className="blog-eyebrow plain">Fresh from the studio</p><h2>Learn something useful today.</h2></div><span>{posts.length} {posts.length === 1 ? "article" : "articles"}</span></div><BlogIndexClient posts={posts} /></section></main><Footer /></>;
}
