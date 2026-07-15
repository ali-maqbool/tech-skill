"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeInUp, viewportOnce } from "@/components/animations/motionVariants";

/* ── Story data ─────────────────────────────────────────────── */
const FEATURED = {
  name: "Ahmed Raza",
  course: "Web Development",
  quote: "Before Tech Skill I had zero coding knowledge. Six months later I was building full-stack apps for clients and got hired as a junior developer at a Lahore-based agency. The real-project model changed everything.",
  outcome: "→ Junior Developer at CodeForge Lahore",
  initials: "AR",
};

const STORIES = [
  {
    name: "Sana Malik",
    course: "Graphic Design",
    quote: "I graduated with a portfolio of 12 real brand identities. My first freelance client found me through Behance two weeks after graduation.",
    outcome: "→ Freelance Brand Designer",
    initials: "SM",
  },
  {
    name: "Usman Tariq",
    course: "Digital Marketing",
    quote: "The live campaign projects were the difference. I ran actual Google Ads budgets during the course, which gave me the confidence to pitch clients immediately.",
    outcome: "→ Marketing Lead at StartHub PK",
    initials: "UT",
  },
  {
    name: "Zara Hussain",
    course: "Video Editing",
    quote: "Within three months of finishing I had three recurring clients. The portfolio from the course did 90% of the selling.",
    outcome: "→ Content Creator & Freelance Editor",
    initials: "ZH",
  },
  {
    name: "Bilal Sheikh",
    course: "Freelancing",
    quote: "I hit my first $500 month on Upwork within 60 days of finishing. The proposal-writing and profile optimization modules were worth the entire fee.",
    outcome: "→ Top-Rated Upwork Freelancer",
    initials: "BS",
  },
];

/* ── Avatar placeholder ─────────────────────────────────────── */
function Avatar({ initials, size = 56 }: { initials: string; size?: number }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      backgroundColor: "rgba(0,170,255,0.15)",
      border: "2px solid rgba(0,170,255,0.35)",
      display: "flex", alignItems: "center", justifyContent: "center",
      color: "var(--color-primary)", fontWeight: 700,
      fontSize: size > 50 ? "1.1rem" : "0.875rem",
      flexShrink: 0,
    }}>
      {initials}
    </div>
  );
}

/* ── Quote glyph ────────────────────────────────────────────── */
function QuoteMark() {
  return (
    <span aria-hidden="true" style={{ fontSize: "3rem", lineHeight: 1, color: "rgba(0,170,255,0.2)", fontFamily: "Georgia,serif", userSelect: "none" }}>
      &ldquo;
    </span>
  );
}

/* ── Outcome pill ───────────────────────────────────────────── */
function OutcomePill({ text }: { text: string }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center",
      backgroundColor: "rgba(0,170,255,0.1)",
      border: "1px solid rgba(0,170,255,0.3)",
      borderRadius: "999px",
      padding: "0.25rem 0.75rem",
      fontSize: "0.78rem",
      fontWeight: 600,
      color: "var(--color-primary)",
      marginTop: "0.75rem",
    }}>
      {text}
    </span>
  );
}

const CARD_STYLE: React.CSSProperties = {
  backgroundColor: "var(--color-surface)",
  border: "1px solid rgba(255,255,255,0.07)",
  borderRadius: "14px",
  padding: "2rem",
  display: "flex",
  flexDirection: "column",
  gap: "0.75rem",
  transition: "border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease",
};

export default function SuccessStories() {
  const prefersReduced = useReducedMotion();

  const staggerDelay = (i: number) => (prefersReduced ? 0 : i * 0.08);

  const hoverIn = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget as HTMLDivElement;
    el.style.borderColor = "rgba(0, 170, 255, 0.57)";
    el.style.transform = "translateY(-4px)";
    el.style.boxShadow = "0 12px 32px rgba(0,0,0,0.35)";
  };
  const hoverOut = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget as HTMLDivElement;
    el.style.borderColor = "rgba(177, 235, 255, 0.86)";
    el.style.transform = "translateY(0)";
    el.style.boxShadow = "none";
  };

  return (
    <section
      id="success-stories"
      aria-labelledby="success-heading"
      style={{ backgroundColor: "var(--color-surface)", padding: "5rem 0" }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>

        {/* Header */}
        <motion.div
          variants={prefersReduced ? undefined : { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
          initial={prefersReduced ? undefined : "hidden"}
          whileInView={prefersReduced ? undefined : "visible"}
          viewport={viewportOnce}
          style={{ textAlign: "center", marginBottom: "3.5rem" }}
        >
          <motion.p
            variants={prefersReduced ? undefined : fadeInUp}
            style={{ color: "#284a7bff", fontWeight: 600, fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.75rem" }}
          >
            Student Success Stories
          </motion.p>
          <motion.h2
            id="success-heading"
            variants={prefersReduced ? undefined : fadeInUp}
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 700, color: "#478ef1ff", lineHeight: 1.15, margin: "0 0 1rem" }}
          >
            Real Graduates. Real Results.
          </motion.h2>
          <motion.p
            variants={prefersReduced ? undefined : fadeInUp}
            style={{ color: "var(--color-text-muted)", fontSize: "1rem", lineHeight: 1.65, maxWidth: "520px", margin: "0 auto" }}
          >
            These are the outcomes from students who committed to the process.
          </motion.p>
        </motion.div>

        {/* Bento grid — featured + supporting */}
        {/* Desktop: featured left (spans 2 rows), 2×2 grid right */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gridTemplateRows: "auto auto",
          gap: "1.25rem",
        }}
          className="success-grid"
        >
          {/* Featured story */}
          <motion.div
            variants={prefersReduced ? undefined : { hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } }}
            initial={prefersReduced ? undefined : "hidden"}
            whileInView={prefersReduced ? undefined : "visible"}
            viewport={viewportOnce}
            onMouseEnter={hoverIn}
            onMouseLeave={hoverOut}
            style={{
              ...CARD_STYLE,
              gridColumn: "1 / 2",
              gridRow: "1 / 3",
              background: "linear-gradient(145deg, rgba(31,61,77,1) 0%, rgba(22,45,58,1) 100%)",
              border: "1px solid rgba(0,170,255,0.2)",
              padding: "2.5rem",
            }}
          >
            <QuoteMark />
            <p style={{ color: "#fff", fontSize: "1.05rem", lineHeight: 1.7, fontStyle: "italic", flexGrow: 1 }}>
              {FEATURED.quote}
            </p>
            <OutcomePill text={FEATURED.outcome} />
            <div style={{ display: "flex", alignItems: "center", gap: "0.875rem", marginTop: "0.5rem" }}>
              <Avatar initials={FEATURED.initials} size={52} />
              <div>
                <p style={{ color: "#fff", fontWeight: 700, margin: 0, fontSize: "0.95rem" }}>{FEATURED.name}</p>
                <p style={{ color: "var(--color-text-muted)", margin: 0, fontSize: "0.8rem" }}>{FEATURED.course}</p>
              </div>
            </div>
          </motion.div>

          {/* Supporting cards — 2×2 on right */}
          {STORIES.map((story, i) => (
            <motion.div
              key={story.name}
              variants={prefersReduced ? undefined : {
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: staggerDelay(i + 1), ease: "easeOut" } },
              }}
              initial={prefersReduced ? undefined : "hidden"}
              whileInView={prefersReduced ? undefined : "visible"}
              viewport={viewportOnce}
              onMouseEnter={hoverIn}
              onMouseLeave={hoverOut}
              style={CARD_STYLE}
            >
              <QuoteMark />
              <p style={{ color: "var(--color-text-muted)", fontSize: "0.875rem", lineHeight: 1.65, flexGrow: 1 }}>
                {story.quote}
              </p>
              <OutcomePill text={story.outcome} />
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginTop: "0.25rem" }}>
                <Avatar initials={story.initials} size={40} />
                <div>
                  <p style={{ color: "#fff", fontWeight: 700, margin: 0, fontSize: "0.875rem" }}>{story.name}</p>
                  <p style={{ color: "var(--color-text-muted)", margin: 0, fontSize: "0.75rem" }}>{story.course}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

    </section>
  );
}
