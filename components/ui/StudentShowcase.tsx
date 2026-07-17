"use client";

import Image from "next/image";
import { Marquee } from "@/components/ui/marquee";
import { students, type Student } from "@/data/students";

// ── Card — pixel-identical to spec, colours mapped to site palette ────────────
function StudentCard({ member }: { member: Student }) {
  return (
    <div className="student-showcase-card group flex w-44 shrink-0 flex-col sm:w-52">
      <div
        className="student-showcase-image relative w-full overflow-hidden rounded-2xl"
        style={{ height: "22rem", backgroundColor: "var(--color-surface-alt, #eef4ff)" }}
      >
        <Image
          alt={member.name}
          className="h-full w-full object-cover grayscale transition-all duration-300 hover:grayscale-0"
          fill
          src={member.image}
          sizes="224px"
        />
        {/* Name / role overlay */}
        <div
          className="absolute bottom-0 w-full rounded-lg p-2"
          style={{ backgroundColor: "rgba(238,244,255,0.88)" }}
        >
          <h3
            className="font-semibold text-sm"
            style={{ color: "var(--color-text)" }}
          >
            {member.name}
          </h3>
          <p
            className="text-xs"
            style={{ color: "var(--color-text-muted)" }}
          >
            {member.role}
          </p>
          <p className="mt-2 text-xs leading-relaxed" style={{ color: "#315b7a" }}>
            “{member.review}”
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function StudentShowcase() {
  return (
    <section
      className="student-showcase relative w-full overflow-hidden py-12 md:py-20"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      {/* Background squiggle artwork — colour-mapped to site palette */}
      <div aria-hidden="true">
        <svg
          className="absolute right-0 bottom-0 pointer-events-none"
          fill="none"
          height="154"
          viewBox="0 0 460 154"
          width="460"
          xmlns="http://www.w3.org/2000/svg"
          style={{ color: "rgba(0,119,204,0.08)" }}
        >
          <g clipPath="url(#clip0_494_1104)">
            <path
              d="M-87.463 458.432C-102.118 348.092 -77.3418 238.841 -15.0744 188.274C57.4129 129.408 180.708 150.071 351.748 341.128C278.246 -374.233 633.954 380.602 548.123 42.7707"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="40"
            />
          </g>
          <defs>
            <clipPath id="clip0_494_1104">
              <rect fill="white" height="154" width="460" />
            </clipPath>
          </defs>
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* ── Section heading ─────────────────────────────────── */}
        <div className="student-showcase-header mx-auto mb-14 flex max-w-5xl flex-col items-center px-6 text-center lg:px-0">
          {/* Icon badge */}
          <div
            className="student-showcase-icon mb-6 flex h-12 w-12 items-center justify-center rounded-xl text-white"
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M16.051 12.616a1 1 0 0 1 1.909.024l.737 1.452a1 1 0 0 0 .737.535l1.634.256a1 1 0 0 1 .588 1.806l-1.172 1.168a1 1 0 0 0-.282.866l.259 1.613a1 1 0 0 1-1.541 1.134l-1.465-.75a1 1 0 0 0-.912 0l-1.465.75a1 1 0 0 1-1.539-1.133l.258-1.613a1 1 0 0 0-.282-.866l-1.156-1.153a1 1 0 0 1 .572-1.822l1.633-.256a1 1 0 0 0 .737-.535z" />
              <path d="M8 15H7a4 4 0 0 0-4 4v2" />
              <circle cx="10" cy="7" r="4" />
            </svg>
          </div>

          {/* Heading with squiggle decoration */}
          <h2
            className="student-showcase-heading relative mb-4 font-bold text-4xl tracking-tight sm:text-5xl"
            style={{
              color: "var(--color-text)",
              fontFamily: "var(--font-display)",
            }}
          >
            Our Successful Students
            <svg
              aria-hidden="true"
              className="absolute -top-2 -right-8 -z-10 w-24"
              fill="currentColor"
              height="86"
              viewBox="0 0 108 86"
              width="108"
              xmlns="http://www.w3.org/2000/svg"
              style={{ color: "rgba(0,119,204,0.15)" }}
            >
              <path
                d="M38.8484 16.236L15 43.5793L78.2688 15L18.1218 71L93 34.1172L70.2047 65.2739"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="28"
              />
            </svg>
          </h2>

          <p
            className="student-showcase-description max-w-2xl text-base leading-relaxed"
            style={{ color: "var(--color-text-muted)" }}
          >
            Every student below graduated with a real portfolio and real skills.
            These are the outcomes from people who committed to the programme.
          </p>
        </div>

        {/* ── Row 1 — scrolls right to left ───────────────────── */}
        <div className="relative w-full">
          <div
            className="pointer-events-none absolute top-0 left-0 z-10 h-full w-32"
            style={{
              background:
                "linear-gradient(to right, var(--color-background), transparent)",
            }}
          />
          <div
            className="pointer-events-none absolute top-0 right-0 z-10 h-full w-32"
            style={{
              background:
                "linear-gradient(to left, var(--color-background), transparent)",
            }}
          />
          <Marquee className="student-marquee [--gap:1.5rem]" pauseOnHover repeat={4}>
            {students.map((member) => (
              <StudentCard key={member.name} member={member} />
            ))}
          </Marquee>
        </div>

        {/* ── Row 2 — scrolls left to right (reverse) ─────────── */}
        <div className="hidden student-showcase-row-2 relative mt-6 w-full" aria-hidden="true">
          <div
            className="pointer-events-none absolute top-0 left-0 z-10 h-full w-32"
            style={{
              background:
                "linear-gradient(to right, var(--color-background), transparent)",
            }}
          />
          <div
            className="pointer-events-none absolute top-0 right-0 z-10 h-full w-32"
            style={{
              background:
                "linear-gradient(to left, var(--color-background), transparent)",
            }}
          />
          <Marquee className="student-marquee [--gap:1.5rem]" pauseOnHover reverse>
            {students.map((member) => (
              <StudentCard key={member.name} member={member} />
            ))}
          </Marquee>
        </div>

        {/* ── Testimonial block ────────────────────────────────── */}
        <div className="mx-auto mt-16 max-w-3xl px-6 text-center lg:px-0">
          <p
            className="mb-8 font-medium text-lg leading-relaxed md:text-xl"
            style={{ color: "var(--color-text)" }}
          >
            &ldquo;The practical, project-based approach at Tech Skill gave me
            real client work before I even graduated. Within two months I had
            landed my first full-time role — something I genuinely didn&apos;t
            think was possible this fast.&rdquo;
          </p>

          <div className="flex flex-col items-center gap-3">
            {/* Testimonial photo */}
            <div
              className="relative h-14 w-14 overflow-hidden rounded-full"
              style={{ border: "2px solid rgba(0,119,204,0.3)" }}
            >
              <Image
                alt="Ahmed Raza"
                className="h-full w-full object-cover"
                fill
                src="https://ui-avatars.com/api/?name=Ahmed+Raza&background=0077cc&color=fff&size=200&bold=true"
                sizes="56px"
              />
            </div>

            <div className="text-center">
              <p
                className="font-semibold"
                style={{ color: "var(--color-text)" }}
              >
                Ahmed Raza
              </p>
              <p
                className="text-sm"
                style={{ color: "var(--color-text-muted)" }}
              >
                Junior Developer · Web Development Graduate
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
