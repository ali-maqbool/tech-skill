"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Marquee } from "@/components/ui/marquee";
import { founder, teamMembers } from "@/data/teams";
import { fadeInUp, viewportOnce } from "@/components/animations/motionVariants";

// ─────────────────────────────────────────────────────────────────────────────
// TeamSection
// Structure:
//   1. Section header (label + heading + subtitle)
//   2. Founder Spotlight  ← new block, above the slideshow
//   3. Marquee slideshow  ← preserved pixel-for-pixel; only data source changed
// ─────────────────────────────────────────────────────────────────────────────

export default function TeamSection() {
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="team"
      aria-labelledby="team-heading"
      className="team-section overflow-hidden"
      style={{
        backgroundColor: "var(--color-surface)",
        padding: "5rem 0",
        borderTop: "1px solid rgba(0,119,204,0.1)",
      }}
    >
      <div
        className="max-w-5xl mx-auto px-4 sm:px-6"
      >
        {/* ── 1. Section header ─────────────────────────────── */}
        <motion.div
          variants={prefersReduced ? undefined : { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
          initial={prefersReduced ? undefined : "hidden"}
          whileInView={prefersReduced ? undefined : "visible"}
          viewport={viewportOnce}
          className="team-header text-center mb-12"
        >
          <motion.p
            variants={prefersReduced ? undefined : fadeInUp}
            className="text-xs font-semibold uppercase tracking-[0.15em] mb-3"
            style={{ color: "var(--color-primary)" }}
          >
            The People Behind It
          </motion.p>

          <motion.h2
            id="team-heading"
            variants={prefersReduced ? undefined : fadeInUp}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4"
            style={{ color: "var(--color-text)", fontFamily: "var(--font-display)" }}
          >
            Meet Your Instructors
          </motion.h2>

          <motion.p
            variants={prefersReduced ? undefined : fadeInUp}
            className="text-base leading-relaxed max-w-xl mx-auto"
            style={{ color: "var(--color-text-muted)" }}
          >
            Experienced professionals who have done the work themselves — not just teachers, but practitioners.
          </motion.p>
        </motion.div>

        {/* ── 2. Founder Spotlight ──────────────────────────── */}
        {/* All content is pulled from data/teams.ts → founder.  */}
        {/* To update: edit that file only. No JSX changes needed. */}
        <motion.div
          variants={prefersReduced ? undefined : fadeInUp}
          initial={prefersReduced ? undefined : "hidden"}
          whileInView={prefersReduced ? undefined : "visible"}
          viewport={viewportOnce}
          className="team-founder flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 mb-14
                     rounded-2xl p-6 sm:p-8"
          style={{
            backgroundColor: "rgba(0,119,204,0.06)",
            border: "1px solid rgba(0, 119, 204, 0.55)",
          }}
        >
          {/* Photo — fixed frame so no layout shift while loading */}
          <div
            className="founder-photo-frame relative flex-shrink-0 rounded-2xl overflow-hidden w-[min(100%,220px)] h-[220px] sm:w-[300px] sm:h-[300px]"
          >
            <Image
              src={founder.image}
              alt={founder.name}
              fill
              className="object-cover founder-photo"
              sizes="160px"
              priority
            />
          </div>

          {/* Text */}
          <div className="flex flex-col gap-1 text-center sm:text-left">
            {/* Founder badge */}
            <span
              className="inline-flex self-center sm:self-start text-[10px] font-bold uppercase tracking-[0.18em] px-2.5 py-1 rounded-full mb-1"
              style={{
                color: "var(--color-primary)",
                backgroundColor: "rgba(0,119,204,0.1)",
                border: "1px solid rgba(0,119,204,0.25)",
              }}
            >
              Founder
            </span>

            <h3
              className="text-3xl font-bold sm:text-4xl"
              style={{ color: "var(--color-text)", fontFamily: "var(--font-display)" }}
            >
              {founder.name}
            </h3>

            <p
              className="text-sm font-medium uppercase tracking-widest mb-2"
              style={{ color: "var(--color-primary)" }}
            >
              {founder.role}
            </p>

            <p
              className="team-founder-bio text-sm leading-relaxed"
              style={{ color: "var(--color-text-muted)" }}
            >
              {founder.bio}
            </p>
          </div>
        </motion.div>
      </div>

      {/* ── 3. Marquee slideshow ─────────────────────────────── */}
      {/* PRESERVED EXACTLY — only data source changed from inline to import. */}
      {/* Do not modify class names, structure, or Marquee props below.        */}
      <div className="team-marquee relative w-full">
        {/* Left edge fade */}
        <div className="pointer-events-none absolute top-0 left-0 z-10 h-full w-32 bg-gradient-to-r from-white to-transparent dark:from-background" />
        {/* Right edge fade */}
        <div className="pointer-events-none absolute top-0 right-0 z-10 h-full w-32 bg-gradient-to-l from-white to-transparent dark:from-background" />

        <Marquee className="[--gap:1.5rem]" pauseOnHover>
          {teamMembers.map((member) => (
            <div
              className="team-marquee-card group flex w-64 shrink-0 flex-col"
              key={member.name}
            >
              <div className="relative h-[17rem] w-full overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-800">
                <Image
                  alt={member.name}
                  className="h-full w-full object-cover grayscale transition-all duration-300 hover:grayscale-0"
                  fill
                  src={member.image}
                  sizes="256px"
                />
                <div className="absolute bottom-0 w-full rounded-lg bg-neutral-100/85 p-2 dark:bg-neutral-800/80">
                  <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                    {member.name}
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {member.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
