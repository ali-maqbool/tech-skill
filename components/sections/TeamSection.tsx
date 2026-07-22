"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Marquee } from "@/components/ui/marquee";
import { founder, teamMembers } from "@/data/teams";
import { fadeInUp, viewportOnce } from "@/components/animations/motionVariants";

// ─────────────────────────────────────────────────────────────────────────────
// Founder Stats Data
// Local array unique to the founder block
// ─────────────────────────────────────────────────────────────────────────────
const FOUNDER_STATS = [
  {
    icon: "/education.png",
    alt: "Years Experience",
    value: "5+",
    label: "Years Experience",
    subtext: "Digital Growth & EdTech",
  },
  {
    icon: "/team.png",
    alt: "Students Trained",
    value: "700+",
    label: "Students Trained",
    subtext: "Across Pakistan",
  },
  {
    icon: "/growth.png",
    alt: "Online Projects",
    value: "7+",
    label: "Online Projects",
    subtext: "Live Agency & EdTech",
  },
  {
    icon: "/trophy.png",
    alt: "Practical Training",
    value: "98.7%",
    label: "Practical Training",
    subtext: "Hands-on Learning",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// TeamSection
// Structure:
//   1. Section header (label + heading + subtitle)
//   2. Founder Spotlight  ← includes 4-column stats row beneath description
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

          {/* Text content & Stats row */}
          <div className="flex flex-col gap-1 text-center sm:text-left flex-1 w-full">
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

            {/* ── Founder Stats Row ──────────────────────────── */}
            <div
              className="mt-5 p-3.5 sm:p-4 rounded-xl w-full"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.36)",
                border: "1px solid rgba(0, 119, 204, 0.2)",
              }}
            >
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-4 gap-x-0">
                {FOUNDER_STATS.map((stat, i) => {
                  const borderClasses =
                    i === 0
                      ? "border-r border-b sm:border-b-0 border-[rgba(0,119,204,0.15)]"
                      : i === 1
                      ? "border-b sm:border-r sm:border-b-0 border-[rgba(0,119,204,0.15)]"
                      : i === 2
                      ? "border-r sm:border-r border-[rgba(0,119,204,0.15)]"
                      : "";

                  return (
                    <div
                      key={stat.label}
                      className={`flex flex-col items-center text-center px-2 py-1 ${borderClasses}`}
                    >
                      {/* Circular badge */}
                      <div
                        className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center mb-2 flex-shrink-0"
                        style={{ backgroundColor: "rgba(0, 170, 255, 0.12)" }}
                      >
                        <Image
                          src={stat.icon}
                          alt={stat.alt}
                          width={22}
                          height={22}
                          className="object-contain"
                        />
                      </div>

                      {/* Stat Value */}
                      <span
                        className="text-lg sm:text-xl font-extrabold leading-tight"
                        style={{ color: "var(--color-primary)" }}
                      >
                        {stat.value}
                      </span>

                      {/* Stat Label */}
                      <span
                        className="text-xs font-bold mt-0.5"
                        style={{ color: "var(--color-text)" }}
                      >
                        {stat.label}
                      </span>

                      {/* Subtext */}
                      <span
                        className="text-[11px] font-medium leading-tight mt-0.5"
                        style={{ color: "var(--color-text-muted)" }}
                      >
                        {stat.subtext}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── 3. Marquee slideshow ─────────────────────────────── */}
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
