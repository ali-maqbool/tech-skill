"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Course } from "@/data/courses";
import { cardHover } from "@/components/animations/motionVariants";

// Cast cardHover to Variants — the `ease` string values are runtime-valid
// but Framer Motion's TS types require the narrower `Easing` union.
const cardHoverVariants = cardHover as unknown as Variants;

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface CourseCardProps {
  course: Course;
  onRegisterClick: (courseId: string) => void;
  /** Accept external variants for stagger animation from a parent container */
  variants?: Variants;
}

// ---------------------------------------------------------------------------
// Icon mapping
// ---------------------------------------------------------------------------

function getCourseIcon(id: string): string {
  switch (id) {
    case "graphic-design":
      return "🎨";
    case "web-development":
      return "💻";
    case "digital-marketing":
      return "📣";
    case "freelancing":
      return "💼";
    case "video-editing":
      return "🎬";
    default:
      return "📚";
  }
}

// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function CourseCard({
  course,
  onRegisterClick,
  variants,
}: CourseCardProps) {
  const icon = getCourseIcon(course.id);
  const duration = course.Durtion ?? "";
  const primaryTiming = course.timings[0] ?? "";

  return (
    <motion.article
      className="course-card glass-card"
      aria-label={`${course.name} course`}
      variants={variants ?? cardHoverVariants}
      initial="rest"
      whileHover="hover"
      style={{
        backgroundColor: "var(--color-surface)",  /* solid fallback before glass effect */
        borderTop: "3px solid rgba(0, 170, 255, 0.6)",
        borderRadius: "12px",
        padding: "1.75rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        height: "100%",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Shimmer overlay on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100"
        style={{
          background: "linear-gradient(105deg, transparent 40%, rgba(0,170,255,0.08) 50%, transparent 60%)",
          animation: "shimmer 1.6s ease-in-out infinite",
        }}
      />
      {/* Icon area */}
      <div
        aria-hidden="true"
        style={{
          fontSize: "2.5rem",
          lineHeight: 1,
          userSelect: "none",
        }}
      >
        {icon}
      </div>

      {/* Course name */}
      <h3
        style={{
          fontFamily: "var(--font-display, inherit)",
          fontSize: "1.35rem",
          fontWeight: 700,
          color: "#233066ff",
          margin: 0,
          lineHeight: 1.25,
        }}
      >
        {course.name}
      </h3>

      {/* Description — clamped to 2 lines */}
      <p
        style={{
          color: "var(--color-text-muted)",
          fontSize: "0.9rem",
          lineHeight: 1.55,
          margin: 0,
          overflow: "hidden",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
        }}
      >
        {course.description}
      </p>

      {/* Details row — timing + start date chips */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem",
        }}
      >
        {/* Timing chip */}
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.3rem",
            backgroundColor: "rgba(0, 170, 255, 0.12)",
            color: "var(--color-primary)",
            border: "1px solid rgba(0, 170, 255, 0.25)",
            borderRadius: "999px",
            padding: "0.25rem 0.65rem",
            fontSize: "0.75rem",
            fontWeight: 500,
            whiteSpace: "nowrap",
          }}
        >
          <span aria-hidden="true">⏰</span>
          {primaryTiming}
        </span>

        {/* Start date chip */}
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.3rem",
            backgroundColor: "rgba(0, 170, 255, 0.12)",
            color: "var(--color-primary)",
            border: "1px solid rgba(0, 170, 255, 0.25)",
            borderRadius: "999px",
            padding: "0.25rem 0.65rem",
            fontSize: "0.75rem",
            fontWeight: 500,
            whiteSpace: "nowrap",
          }}
        >
          <span aria-hidden="true">⏱️</span>
          {duration}
        </span>
      </div>

      {/* Spacer pushes fee + button to the bottom */}
      <div style={{ flexGrow: 1 }} />



      {/* Register Now button */}
      <button
        type="button"
        className="btn-primary"
        style={{ width: "100%", minHeight: "44px" }}
        onClick={() => onRegisterClick(course.id)}
        aria-label={`Register for ${course.name}`}
      >
        Register Now
      </button>
    </motion.article>
  );
}
