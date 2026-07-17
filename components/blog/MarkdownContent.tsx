import Image from "next/image";
import type { MarkdownBlock } from "@/lib/blog";

function InlineText({ value }: { value: string }) {
  const parts = value.split(/(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g).filter(Boolean);
  return <>{parts.map((part, index) => {
    if (part.startsWith("**")) return <strong key={index}>{part.slice(2, -2)}</strong>;
    if (part.startsWith("`")) return <code key={index}>{part.slice(1, -1)}</code>;
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) return <a key={index} href={link[2]}>{link[1]}</a>;
    return <span key={index}>{part}</span>;
  })}</>;
}

export default function MarkdownContent({ blocks }: { blocks: MarkdownBlock[] }) {
  return <div className="blog-prose">{blocks.map((block, index) => {
    if (block.type === "heading") { const Heading = block.level === 2 ? "h2" : "h3"; return <Heading id={block.id} className="blog-reveal" key={index}><InlineText value={block.text ?? ""} /></Heading>; }
    if (block.type === "quote") return <blockquote className="blog-reveal" key={index}><InlineText value={block.text ?? ""} /></blockquote>;
    if (block.type === "list") return <ul className="blog-reveal" key={index}>{block.items?.map((item) => <li key={item}><InlineText value={item} /></li>)}</ul>;
    if (block.type === "code") return <pre className="blog-reveal" key={index}><code data-language={block.language}>{block.text}</code></pre>;
    if (block.type === "image") return <figure className="blog-reveal" key={index}><Image src={block.src ?? ""} alt={block.alt ?? ""} width={1200} height={700} sizes="(max-width: 768px) 100vw, 900px" /></figure>;
    return <p className="blog-reveal" key={index}><InlineText value={block.text ?? ""} /></p>;
  })}</div>;
}
