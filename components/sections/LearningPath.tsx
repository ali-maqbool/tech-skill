"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { fadeInUp, viewportOnce } from "@/components/animations/motionVariants";

const STEPS = [
  {
    number: "01",
    title: "Enroll & Onboard",
    description: "Choose your course, complete enrollment, and get full access to our learning platform, materials, and your dedicated mentor.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} width={28} height={28} aria-hidden="true">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Learn — Live Sessions",
    description: "Attend live classes with expert instructors. Every module combines theory with hands-on exercises you complete right away.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} width={28} height={28} aria-hidden="true">
        <path d="M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Apply — Real Client Work",
    description: "Work on real client projects supervised by mentors. Real stakes, real users, real feedback — before you even graduate.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} width={28} height={28} aria-hidden="true">
        <path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Showcase — Build Portfolio",
    description: "Every project you complete becomes a portfolio piece. Graduate with a professional body of work employers can actually see.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} width={28} height={28} aria-hidden="true">
        <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: "05",
    title: "Get Hired",
    description: "Our placement team connects top performers with employer partners. Career guidance, CV review, and interview prep included.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} width={28} height={28} aria-hidden="true">
        <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function LearningPath() {
  const prefersReduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll-linked path draw — line draws as user scrolls through the section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 40%"],
  });
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="learning-path"
      ref={sectionRef}
      aria-labelledby="learning-path-heading"
      style={{ backgroundColor: "var(--color-surface)", padding: "5rem 0" }}
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
            How It Works
          </motion.p>
          <motion.h2
            id="learning-path-heading"
            variants={prefersReduced ? undefined : fadeInUp}
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 700, color: "var(--color-text)", lineHeight: 1.15, margin: "0 0 1rem" }}
          >
            Your Learning Journey
          </motion.h2>
          <motion.p
            variants={prefersReduced ? undefined : fadeInUp}
            style={{ color: "var(--color-text-muted)", fontSize: "1rem", lineHeight: 1.65, maxWidth: "520px", margin: "0 auto" }}
          >
            From your first class to landing a job — here is exactly what happens after you enroll.
          </motion.p>
        </motion.div>

        {/* Desktop timeline */}
        <div className="hidden lg:block" style={{ position: "relative" }}>
          {/* Scroll-linked draw line */}
          <div style={{ position: "absolute", top: "44px", left: "10%", right: "10%", height: "2px", overflow: "visible" }}>
            {/* Track line (dim) */}
            <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,170,255,0.15)", borderRadius: "1px" }} />
            {/* Animated fill line */}
            <svg
              style={{ position: "absolute", inset: 0, width: "100%", height: "2px", overflow: "visible" }}
              preserveAspectRatio="none"
            >
              <motion.line
                x1="0" y1="1" x2="100%" y2="1"
                stroke="#00aaff"
                strokeWidth="2"
                style={prefersReduced ? {} : { pathLength }}
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Steps row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: "1rem" }}>
            {STEPS.map((step, stepIdx) => (
              <motion.div
                key={step.number}
                variants={prefersReduced ? undefined : {
                  hidden: { opacity: 0, y: 32 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: stepIdx * 0.12, ease: "easeOut" } },
                }}
                initial={prefersReduced ? undefined : "hidden"}
                whileInView={prefersReduced ? undefined : "visible"}
                viewport={viewportOnce}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}
              >
                {/* Icon circle */}
                <div style={{
                  width: "88px", height: "88px", borderRadius: "50%",
                  backgroundColor: "var(--color-background)",
                  border: "2px solid rgba(0,170,255,0.4)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "var(--color-primary)",
                  marginBottom: "1.25rem",
                  position: "relative", zIndex: 1,
                  boxShadow: "0 0 0 6px var(--color-surface)",
                }}>
                  {step.icon}
                </div>
                <span style={{ color: "var(--color-primary)", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em", marginBottom: "0.35rem", whiteSpace: "nowrap" }}>
                  STEP {step.number}
                </span>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 700, color: "var(--color-text)", marginBottom: "0.6rem", lineHeight: 1.3 }}>
                  {step.title}
                </h3>
                <p style={{ color: "var(--color-text-muted)", fontSize: "0.85rem", lineHeight: 1.6, margin: 0 }}>
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile — vertical stack */}
        <div className="lg:hidden flex flex-col" style={{ gap: "0", position: "relative" }}>
          {/* Vertical track line */}
          <div style={{
            position: "absolute", left: "27px", top: "44px", bottom: "44px", width: "2px",
            backgroundColor: "rgba(0,170,255,0.15)",
          }} />

          {STEPS.map((step) => (
            <motion.div
              key={step.number}
              variants={prefersReduced ? undefined : fadeInUp}
              initial={prefersReduced ? undefined : "hidden"}
              whileInView={prefersReduced ? undefined : "visible"}
              viewport={viewportOnce}
              style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start", paddingBottom: "2.25rem", position: "relative" }}
            >
              {/* Icon circle */}
              <div style={{
                flexShrink: 0, width: "56px", height: "56px", borderRadius: "50%",
                backgroundColor: "var(--color-background)",
                border: "2px solid rgba(0,170,255,0.4)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "var(--color-primary)",
                position: "relative", zIndex: 1,
              }}>
                {step.icon}
              </div>
              <div>
                <span style={{ color: "var(--color-primary)", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", display: "block", marginBottom: "0.25rem" }}>
                  STEP {step.number}
                </span>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", fontWeight: 700, color: "var(--color-text)", marginBottom: "0.4rem" }}>
                  {step.title}
                </h3>
                <p style={{ color: "var(--color-text-muted)", fontSize: "0.875rem", lineHeight: 1.6, margin: 0 }}>
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
