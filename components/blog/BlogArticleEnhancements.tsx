"use client";

import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Share2 } from "lucide-react";

export default function BlogArticleEnhancements({ headings }: { headings: Array<{ id: string; text: string; level: 2 | 3 }> }) {
  const [progress, setProgress] = useState(0); const [activeId, setActiveId] = useState("");
  useEffect(() => {
    const update = () => { const max = document.documentElement.scrollHeight - window.innerHeight; setProgress(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0); };
    window.addEventListener("scroll", update, { passive: true }); update();
    gsap.registerPlugin(ScrollTrigger);
    const reveals = gsap.utils.toArray<HTMLElement>(".blog-reveal");
    const triggers = reveals.map((element) => gsap.fromTo(element, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.55, ease: "power2.out", scrollTrigger: { trigger: element, start: "top 88%", once: true } }));
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) setActiveId(entry.target.id); }), { rootMargin: "-20% 0px -65%" });
    headings.forEach((heading) => { const element = document.getElementById(heading.id); if (element) observer.observe(element); });
    return () => { window.removeEventListener("scroll", update); observer.disconnect(); triggers.forEach((trigger) => trigger.scrollTrigger?.kill()); };
  }, [headings]);
  const share = () => { if (typeof navigator !== "undefined" && navigator.share) navigator.share({ title: document.title, url: window.location.href }).catch(() => undefined); else if (typeof navigator !== "undefined") navigator.clipboard?.writeText(window.location.href); };
  return <><div className="blog-progress" style={{ transform: `scaleX(${progress / 100})` }} aria-hidden="true" /><aside className="blog-toc"><div className="blog-toc-heading">On this page</div>{headings.map((heading) => <a className={activeId === heading.id ? "active" : ""} href={`#${heading.id}`} key={heading.id}>{heading.text}</a>)}</aside><button type="button" className="blog-share" onClick={share} aria-label="Share this article"><Share2 size={17} /><span>Share</span></button></>;
}
