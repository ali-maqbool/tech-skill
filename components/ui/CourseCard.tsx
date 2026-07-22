"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Star, Clock, CalendarClock, Rocket, Award, Briefcase, GraduationCap, Target, Flame } from "lucide-react";
import { Course, CourseFeature } from "@/data/courses";
import { cardHover } from "@/components/animations/motionVariants";

const cardHoverVariants = cardHover as unknown as Variants;

interface CourseCardProps {
  course: Course;
  onRegisterClick: (courseId: string) => void;
  variants?: Variants;
}

function getCourseIcon(id: string): string {
  switch (id) {
    case "typing":            return "⌨️";
    case "ms-office":         return "📊";
    case "graphic-design":    return "🎨";
    case "web-development":   return "💻";
    case "digital-marketing": return "📣";
    case "freelancing":       return "💼";
    case "video-editing":     return "🎬";
    default:                  return "📚";
  }
}

const FEATURE_ICON_MAP: Record<string, React.ElementType> = {
  Rocket, Award, Briefcase, GraduationCap, Target,
};

const FEATURE_COLORS = [
  { bg: "rgba(0, 170, 255, 0.12)", fg: "#0077cc" },
  { bg: "rgba(16, 185, 129, 0.12)", fg: "#059669" },
  { bg: "rgba(139, 92, 246, 0.12)", fg: "#7c3aed" },
  { bg: "rgba(245, 158, 11, 0.12)", fg: "#d97706" },
];

function StandaloneFeatureRow({ feature, index }: { feature: CourseFeature; index: number }) {
  const IconComp = FEATURE_ICON_MAP[feature.icon] ?? Rocket;
  const color = FEATURE_COLORS[index % FEATURE_COLORS.length];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
      <span style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        width: "1.6rem", height: "1.6rem", borderRadius: "6px",
        backgroundColor: color.bg, color: color.fg, flexShrink: 0,
      }}>
        <IconComp width={14} height={14} />
      </span>
      <span style={{ fontSize: "0.8rem", color: "var(--color-text)", fontWeight: 500, lineHeight: 1.3 }}>
        {feature.label}
      </span>
    </div>
  );
}

export default function CourseCard({
  course,
  onRegisterClick,
  variants,
}: CourseCardProps) {
  const icon = getCourseIcon(course.id);
  const duration = course.Durtion ?? course.duration ?? "";
  const primaryTiming = course.timings[0] ?? "";
  const studentCount = course.students ?? 0;
  const showBadge = Boolean(course.isPopular || course.isFeatured);
  const badgeText = course.isPopular ? "Popular" : course.isFeatured ? "Featured" : "";

  return (
    <motion.article
      className="course-card glass-card"
      aria-label={`${course.name} course`}
      variants={variants ?? cardHoverVariants}
      initial="rest"
      whileHover="hover"
      style={{
        backgroundColor: "var(--color-surface)",
        borderTop: "3px solid rgba(0, 170, 255, 0.6)",
        borderRadius: "12px",
        padding: "1.75rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        height: "100%",
        position: "relative",
      }}
    >
      {/* Top row: Icon tile + Badge */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
        <div
          aria-hidden="true"
          style={{
            width: "3rem",
            height: "3rem",
            borderRadius: "10px",
            backgroundColor: "rgba(0, 170, 255, 0.08)",
            border: "1px solid rgba(0, 170, 255, 0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.5rem",
            lineHeight: 1,
            userSelect: "none",
            flexShrink: 0,
          }}
        >
          {icon}
        </div>
        {showBadge && (
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "0.2rem",
            backgroundColor: "rgba(245, 158, 11, 0.12)", color: "#d97706",
            border: "1px solid rgba(245, 158, 11, 0.25)", borderRadius: "999px",
            padding: "0.15rem 0.6rem", fontSize: "0.65rem",
            fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em",
          }}>
            <Flame width={11} height={11} />
            {badgeText}
          </span>
        )}
      </div>

      {/* Course name */}
      <h3
        style={{
          fontFamily: "var(--font-display, inherit)",
          fontSize: "1.35rem",
          fontWeight: 700,
          color: "#233066",
          margin: 0,
          lineHeight: 1.25,
        }}
      >
        {course.name}
      </h3>

      {/* Rating row */}
      {course.rating != null && (
        <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
          <Star width={14} height={14} style={{ color: "#f59e0b", fill: "#f59e0b" }} />
          <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#233066" }}>
            {course.rating}
          </span>
          <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", fontWeight: 500 }}>
            ({studentCount.toLocaleString()}+ Students)
          </span>
        </div>
      )}

      {/* Description */}
      <p
        style={{
          color: "var(--color-text-muted)",
          fontSize: "0.9rem",
          lineHeight: 1.55,
          margin: 0,
          overflow: "hidden",
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
        }}
      >
        {course.shortDescription ?? course.description}
      </p>

      {/* Divider */}
      <hr style={{ border: "none", borderTop: "1px solid rgba(0, 119, 204, 0.1)", margin: "0.2rem 0" }} />

      {/* Feature checklist */}
      {course.features && course.features.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {course.features.map((feat, i) => (
            <StandaloneFeatureRow key={feat.label} feature={feat} index={i} />
          ))}
        </div>
      )}

      {/* Details row — timing + duration chips */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.4rem",
          marginTop: "0.25rem",
        }}
      >
        {duration && (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.3rem",
              backgroundColor: "rgba(0, 170, 255, 0.1)",
              color: "var(--color-primary)",
              border: "1px solid rgba(0, 170, 255, 0.22)",
              borderRadius: "999px",
              padding: "0.2rem 0.6rem",
              fontSize: "0.72rem",
              fontWeight: 500,
              whiteSpace: "nowrap",
            }}
          >
            <Clock width={12} height={12} />
            {duration}
          </span>
        )}
        {(course.flexible || primaryTiming) && (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.3rem",
              backgroundColor: "rgba(16, 185, 129, 0.1)",
              color: "#059669",
              border: "1px solid rgba(16, 185, 129, 0.22)",
              borderRadius: "999px",
              padding: "0.2rem 0.6rem",
              fontSize: "0.72rem",
              fontWeight: 500,
              whiteSpace: "nowrap",
            }}
          >
            <CalendarClock width={12} height={12} />
            {course.flexible ?? primaryTiming}
          </span>
        )}
      </div>

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
