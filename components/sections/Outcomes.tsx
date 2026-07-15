"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { fadeInUp, viewportOnce } from "@/components/animations/motionVariants";

/* ── Pillar 1 — Client projects pulse dot ──────────────────── */
function PulseDot() {
  return (
    <span style={{ position: "relative", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
      <span style={{
        position: "relative", width: "10px", height: "10px",
        borderRadius: "50%", backgroundColor: "#00aaff", display: "inline-block",
      }}>
        <span style={{
          position: "absolute", inset: 0, borderRadius: "50%", backgroundColor: "#00aaff",
          animation: "pulse-glow 1.8s ease-in-out infinite",
        }} />
      </span>
      <span style={{ color: "var(--color-primary)", fontWeight: 700, fontSize: "1.5rem", fontFamily: "var(--font-display)" }}>
        120+
      </span>
      <span style={{ color: "var(--color-text-muted)", fontSize: "0.85rem" }}>client projects delivered</span>
    </span>
  );
}

/* ── Pillar 2 — Stamp-in badge ─────────────────────────────── */
function StampBadge() {
  return (
    <motion.div
      initial={{ scale: 0.6, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.2 }}
      style={{
        display: "inline-flex", alignItems: "center", gap: "0.5rem",
        backgroundColor: "rgba(0,170,255,0.12)",
        border: "2px solid rgba(0,170,255,0.5)",
        borderRadius: "999px",
        padding: "0.4rem 1rem",
        color: "var(--color-primary)",
        fontWeight: 700,
        fontSize: "0.85rem",
      }}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width={16} height={16} aria-hidden="true">
        <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      Job Offer at Graduation
    </motion.div>
  );
}

/* ── Pillar 3 — Portfolio fan ──────────────────────────────── */
const PORTFOLIO_COLORS = ["#1f3d4d", "#162d3a", "#0d2030", "#1a3340"];
const PORTFOLIO_LABELS = ["Brand Identity", "Web App", "Ad Campaign", "Edit Reel"];

function PortfolioFan() {
  const [hovered, setHovered] = useState(false);
  const angles = hovered ? [-18, -6, 6, 18] : [-6, -2, 2, 6];

  return (
    <div
      style={{ position: "relative", height: "90px", display: "flex", justifyContent: "center", cursor: "pointer" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {PORTFOLIO_COLORS.map((bg, i) => (
        <motion.div
          key={i}
          animate={{ rotate: angles[i], x: i * 2 - 3 }}
          transition={{ type: "spring", stiffness: 200, damping: 18 }}
          style={{
            position: "absolute", bottom: 0,
            width: "64px", height: "80px",
            backgroundColor: bg,
            border: "1px solid rgba(0,170,255,0.3)",
            borderRadius: "6px",
            display: "flex", alignItems: "flex-end", justifyContent: "center",
            paddingBottom: "6px",
            transformOrigin: "bottom center",
            boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
          }}
        >
          <span style={{ fontSize: "0.55rem", color: "var(--color-text-muted)", textAlign: "center", lineHeight: 1.2 }}>
            {PORTFOLIO_LABELS[i]}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

/* ── Pillar data ────────────────────────────────────────────── */
const PILLARS = [
  {
    key: "clients",
    heading: "Work on real, paying client projects",
    description: "Every cohort delivers live work for paying clients, supervised by mentors. Real stakes and real users before graduation — not toy assignments.",
    accent: <PulseDot />,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} width={32} height={32} aria-hidden="true">
        <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    key: "offer",
    heading: "Top 10% of each cohort get a job offer",
    description: "We put a concrete bar on it. The top performers in every cohort receive a direct job offer at graduation — no vague promises.",
    accent: <StampBadge />,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} width={32} height={32} aria-hidden="true">
        <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    key: "portfolio",
    heading: "Graduate with a portfolio, not just a certificate",
    description: "Every project you build during the course becomes a portfolio piece — functioning work you can show employers directly. Hover to see.",
    accent: <PortfolioFan />,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} width={32} height={32} aria-hidden="true">
        <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function Outcomes() {
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="outcomes"
      aria-labelledby="outcomes-heading"
      style={{ backgroundColor: "var(--color-background)", padding: "5rem 0" }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>

        {/* Header */}
        <motion.div
          variants={prefersReduced ? undefined : { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
          initial={prefersReduced ? undefined : "hidden"}
          whileInView={prefersReduced ? undefined : "visible"}
          viewport={viewportOnce}
          style={{ textAlign: "center", marginBottom: "4rem" }}
        >
          <motion.p
            variants={prefersReduced ? undefined : fadeInUp}
            style={{ color: "var(--color-primary)", fontWeight: 600, fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.75rem" }}
          >
            What You Get Out
          </motion.p>
          <motion.h2
            id="outcomes-heading"
            variants={prefersReduced ? undefined : fadeInUp}
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 700, color: "var(--color-text)", lineHeight: 1.15, margin: "0 0 1rem" }}
          >
            Real Skills. Real Work. Real Career.
          </motion.h2>
          <motion.p
            variants={prefersReduced ? undefined : fadeInUp}
            style={{ color: "var(--color-text-muted)", fontSize: "1rem", lineHeight: 1.65, maxWidth: "520px", margin: "0 auto" }}
          >
            Every program is designed around one outcome: you leave with something concrete employers actually care about.
          </motion.p>
        </motion.div>

        {/* Pillar cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "1.5rem" }}>
          {PILLARS.map((pillar, i) => (
            <motion.div
              key={pillar.key}
              variants={prefersReduced ? undefined : {
                hidden: { opacity: 0, y: 32 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.55, delay: i * 0.1, ease: "easeOut" } },
              }}
              initial={prefersReduced ? undefined : "hidden"}
              whileInView={prefersReduced ? undefined : "visible"}
              viewport={viewportOnce}
              style={{
                backgroundColor: "var(--color-surface)",
                border: "1px solid rgba(0,170,255,0.15)",
                borderRadius: "16px",
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
                transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(0,170,255,0.5)";
                el.style.boxShadow = "0 8px 32px rgba(0,170,255,0.12)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(0,170,255,0.15)";
                el.style.boxShadow = "none";
              }}
            >
              <div style={{ color: "var(--color-primary)" }}>{pillar.icon}</div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 700, color: "#fff", lineHeight: 1.3, margin: 0 }}>
                {pillar.heading}
              </h3>
              <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem", lineHeight: 1.65, margin: 0, flexGrow: 1 }}>
                {pillar.description}
              </p>
              <div style={{ marginTop: "auto" }}>{pillar.accent}</div>
            </motion.div>
          ))}
        </div>

        {/* Bridge line */}
        <motion.p
          variants={prefersReduced ? undefined : fadeInUp}
          initial={prefersReduced ? undefined : "hidden"}
          whileInView={prefersReduced ? undefined : "visible"}
          viewport={viewportOnce}
          style={{ textAlign: "center", marginTop: "3rem", color: "var(--color-text-muted)", fontSize: "0.95rem" }}
        >
          See what that looks like for real graduates below. →
        </motion.p>

      </div>
    </section>
  );
}
