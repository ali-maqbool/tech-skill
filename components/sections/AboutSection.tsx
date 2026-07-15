"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  staggerContainer as staggerContainerBase,
  viewportOnce,
} from "@/components/animations/motionVariants";

/* ── Locally-typed motion variants (Framer Motion strict types) ── */
const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const staggerContainer: Variants = staggerContainerBase as Variants;

/* ── Stat card data ──────────────────────────────────────── */
interface Stat {
  value: string;
  label: string;
}

const STATS: Stat[] = [
  { value: "12+", label: "Courses Available" },
  { value: "1143+", label: "Students Enrolled" },
  { value: "100%", label: "Satisfaction Rate" },
  { value: "4+", label: "Years of Excellence" },
];

/* ── Key benefits ────────────────────────────────────────── */
const BENEFITS = [
  "Expert Instructors with Industry Experience",
  "Practical, Project-Based Learning",
  "Flexible Morning & Evening Batches",
  "Job Placement Assistance",
];

/* ── Local motion variants ───────────────────────────────── */
const benefitItem = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: "easeOut" as const },
  },
} satisfies Variants;

/* ── CheckIcon ───────────────────────────────────────────── */
function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      width="20"
      height="20"
      aria-hidden="true"
      className="flex-shrink-0 mt-0.5"
      style={{ color: "var(--color-primary)" }}
    >
      <path
        fillRule="evenodd"
        d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

/* ── AboutSection component ──────────────────────────────── */
export default function AboutSection() {
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative overflow-hidden py-20 lg:py-28"
      style={{ backgroundColor: "var(--color-surface)" }}
    >
      {/* Subtle gradient overlay for visual depth */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,170,255,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
        {/* Two-column grid — stacks on mobile, side-by-side on lg */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Left column: text content ──────────────────── */}
          <motion.div
            variants={prefersReduced ? undefined : fadeInLeft}
            initial={prefersReduced ? undefined : "hidden"}
            whileInView={prefersReduced ? undefined : "visible"}
            viewport={viewportOnce}
            className="flex flex-col gap-6"
          >
            {/* Section label */}
            <span
              className="text-xs font-bold tracking-[0.2em] uppercase"
              style={{ color: "var(--color-primary)" }}
            >
              Why Choose Us
            </span>

            {/* Heading */}
            <h2
              id="about-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight"
              style={{
                color: "var(--color-text)",
                fontFamily: "var(--font-display)",
              }}
            >
              Where Skills Meet{" "}
              <span style={{ color: "var(--color-primary)" }}>Opportunity</span>
            </h2>

            {/* Body paragraph */}
            <p
              className="text-base sm:text-lg leading-relaxed"
              style={{ color: "var(--color-text-muted)" }}
            >
              Tech Skill is Pakistan&apos;s premier skill-based learning center,
              dedicated to bridging the gap between education and employment.
              We offer industry-aligned programs taught by real professionals,
              ensuring every graduate is job-ready from day one. Our students
              gain hands-on experience that transforms potential into performance.
            </p>

            {/* Benefits list with stagger */}
            <motion.ul
              variants={prefersReduced ? undefined : staggerContainer}
              initial={prefersReduced ? undefined : "hidden"}
              whileInView={prefersReduced ? undefined : "visible"}
              viewport={viewportOnce}
              className="flex flex-col gap-3 list-none m-0 p-0"
              role="list"
            >
              {BENEFITS.map((benefit) => (
                <motion.li
                  key={benefit}
                  variants={prefersReduced ? undefined : benefitItem}
                  className="flex items-start gap-3"
                >
                  <CheckIcon />
                  <span
                    className="text-sm sm:text-base font-medium"
                    style={{ color: "var(--color-text)" }}
                  >
                    {benefit}
                  </span>
                </motion.li>
              ))}
            </motion.ul>

            {/* CTA */}
            <div className="mt-2">
              <a
                href="#courses"
                className="btn-primary inline-flex"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Explore Our Courses
              </a>
            </div>
          </motion.div>

          {/* ── Right column: stats 2×2 grid ───────────────── */}
          <motion.div
            variants={prefersReduced ? undefined : fadeInRight}
            initial={prefersReduced ? undefined : "hidden"}
            whileInView={prefersReduced ? undefined : "visible"}
            viewport={viewportOnce}
            className="grid grid-cols-2 gap-4 sm:gap-6"
          >
            {STATS.map((stat) => (
              <StatCard key={stat.label} stat={stat} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ── StatCard sub-component ──────────────────────────────── */
function StatCard({ stat }: { stat: Stat }) {
  return (
    <div
      className="group relative flex flex-col items-center justify-center gap-1 rounded-xl p-6 text-center transition-all duration-300"
      style={{
        backgroundColor: "#007bc2ff",
        border: "1px solid rgba(0, 170, 255, 0.2)",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.boxShadow = "0 0 28px rgba(0, 170, 255, 0.22)";
        el.style.borderColor = "rgba(0, 170, 255, 0.55)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.boxShadow = "none";
        el.style.borderColor = "rgba(0, 170, 255, 0.2)";
      }}
    >
      {/* Stat value (cyan) */}
      <span
        className="text-3xl sm:text-4xl font-extrabold leading-none"
        style={{ color: "#ffff", fontFamily: "var(--font-display)" }}
      >
        {stat.value}
      </span>

      {/* Label (white/muted) */}
      <span
        className="text-xs sm:text-sm font-medium mt-1"
        style={{ color: "#fff" }}
      >
        {stat.label}
      </span>
    </div>
  );
}
