import fs from "node:fs";
import path from "node:path";

export interface BlogFrontmatter {
  title: string;
  excerpt: string;
  coverImage: string;
  coverAlt?: string;
  date: string;
  author: string;
  tags: string[];
}

export interface MarkdownBlock {
  type: "heading" | "paragraph" | "quote" | "list" | "code" | "image";
  level?: 2 | 3;
  id?: string;
  text?: string;
  items?: string[];
  language?: string;
  src?: string;
  alt?: string;
}

export interface BlogPost extends BlogFrontmatter {
  slug: string;
  readingTime: string;
  blocks: MarkdownBlock[];
  headings: Array<{ id: string; text: string; level: 2 | 3 }>;
}

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function parseValue(value: string): string | string[] {
  const clean = value.trim();
  if (clean.startsWith("[") && clean.endsWith("]")) {
    return clean.slice(1, -1).split(",").map((item) => item.trim().replace(/^['"]|['"]$/g, "")).filter(Boolean);
  }
  return clean.replace(/^['"]|['"]$/g, "");
}

function parseFile(raw: string, filename: string): BlogPost {
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
  if (!match) throw new Error(`Blog post ${filename} is missing frontmatter.`);
  const frontmatter = Object.fromEntries(match[1].split("\n").filter(Boolean).map((line) => {
    const index = line.indexOf(":");
    return [line.slice(0, index).trim(), parseValue(line.slice(index + 1))];
  })) as Partial<BlogFrontmatter>;
  const required = ["title", "excerpt", "coverImage", "date", "author", "tags"] as const;
  for (const key of required) if (!frontmatter[key]) throw new Error(`${filename} is missing frontmatter field: ${key}`);

  const blocks: MarkdownBlock[] = [];
  const headings: BlogPost["headings"] = [];
  const lines = match[2].replace(/\r/g, "").split("\n");
  let index = 0;
  while (index < lines.length) {
    const line = lines[index].trim();
    if (!line) { index += 1; continue; }
    const fence = line.match(/^```(\w*)$/);
    if (fence) {
      const code: string[] = []; index += 1;
      while (index < lines.length && !lines[index].trim().startsWith("```")) code.push(lines[index++]);
      index += 1; blocks.push({ type: "code", text: code.join("\n"), language: fence[1] || "text" }); continue;
    }
    const heading = line.match(/^(##|###)\s+(.+)$/);
    if (heading) {
      const level = heading[1].length as 2 | 3; const text = heading[2].trim(); const id = slugify(text);
      headings.push({ id, text, level }); blocks.push({ type: "heading", level, id, text }); index += 1; continue;
    }
    if (line.startsWith(">")) {
      const quote: string[] = []; while (index < lines.length && lines[index].trim().startsWith(">")) quote.push(lines[index++].trim().replace(/^>\s?/, ""));
      blocks.push({ type: "quote", text: quote.join(" ") }); continue;
    }
    if (line.match(/^[-*]\s+/)) {
      const items: string[] = []; while (index < lines.length && lines[index].trim().match(/^[-*]\s+/)) items.push(lines[index++].trim().replace(/^[-*]\s+/, ""));
      blocks.push({ type: "list", items }); continue;
    }
    const image = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (image) { blocks.push({ type: "image", alt: image[1], src: image[2] }); index += 1; continue; }
    const paragraph: string[] = [line]; index += 1;
    while (index < lines.length && lines[index].trim() && !/^(##|###)\s|^```|^>|^[-*]\s+|^!\[/.test(lines[index].trim())) paragraph.push(lines[index++].trim());
    blocks.push({ type: "paragraph", text: paragraph.join(" ") });
  }
  const words = match[2].match(/\S+/g)?.length ?? 0;
  return { ...frontmatter, tags: frontmatter.tags as string[], coverAlt: frontmatter.coverAlt || frontmatter.title, slug: slugify(path.basename(filename, ".mdx")), readingTime: `${Math.max(1, Math.ceil(words / 200))} min read`, blocks, headings } as BlogPost;
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs.readdirSync(BLOG_DIR).filter((file) => file.endsWith(".mdx") && file !== "_template.mdx").map((file) => parseFile(fs.readFileSync(path.join(BLOG_DIR, file), "utf8"), file)).sort((a, b) => b.date.localeCompare(a.date));
}

export function getPostBySlug(slug: string) { return getAllPosts().find((post) => post.slug === slug); }

export function getRelatedPosts(post: BlogPost, limit = 3) {
  const related = getAllPosts().filter((candidate) => candidate.slug !== post.slug).map((candidate) => ({ candidate, score: candidate.tags.filter((tag) => post.tags.includes(tag)).length })).sort((a, b) => b.score - a.score || b.candidate.date.localeCompare(a.candidate.date));
  return related.slice(0, limit).map(({ candidate }) => candidate);
}
