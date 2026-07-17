# Blog setup notes

## Publish a post without code

1. Copy `content/blog/_template.mdx` and give the copy a simple filename such as `how-to-build-a-portfolio.mdx`.
2. Fill in the frontmatter values at the top: `title`, `excerpt`, `coverImage`, `coverAlt`, `date`, `author`, and `tags`.
3. Put the matching image in `public/blog-images/` and set `coverImage` to `/blog-images/your-file.jpg`. The sample post uses `/logo.png` so the project works immediately.
4. Write the article below the closing `---`. Use `##` and `###` headings, normal paragraphs, `>` quotes, `-` lists, links, and fenced code blocks.
5. Save and deploy. The filename becomes the URL slug automatically.

## What is automatic

- Posts are read from `content/blog/`, sorted newest-first, and excluded when the filename is `_template.mdx`.
- Slugs, reading time, tags, table of contents, related articles, dynamic metadata, Open Graph/Twitter metadata, BlogPosting JSON-LD, sitemap entries, and robots rules are generated automatically.
- The Blog index includes search, tag filtering, responsive cards, featured/latest treatment, and load-more pagination.

## Assumptions

- The existing site did not include an MDX or shadcn component system, so the loader is a lightweight local Markdown subset and the blog UI uses the existing CSS variables, button classes, Framer Motion, and GSAP already installed in the project.
- `NEXT_PUBLIC_SITE_URL` should be set in deployment environment variables for production canonical URLs and social metadata. It falls back to `http://localhost:3000` locally.
- The existing `html { scroll-behavior: smooth; }` provides site-wide smooth scrolling, so Lenis was not added as a second scroll engine.
- Blog images are expected to be local files under `public/` for reliable builds and Core Web Vitals.

## Dependencies

No new package was installed. The feature reuses Next.js, Next Image, Tailwind, Framer Motion, GSAP/ScrollTrigger, and the existing brand tokens.
