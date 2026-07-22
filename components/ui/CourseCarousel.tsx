"use client";

import * as React from "react";
import { motion, type Transition, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Clock, CalendarClock, Rocket, Award, Briefcase, GraduationCap, Target, Flame } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Course, CourseFeature } from "@/data/courses";

// ── Icon map ──────────────────────────────────────────────────────────────────
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

// ── Feature Icon Map + Rotating Colors ────────────────────────────────────────
const FEATURE_ICON_MAP: Record<string, React.ElementType> = {
  Rocket, Award, Briefcase, GraduationCap, Target,
};

const FEATURE_COLORS = [
  { bg: "rgba(0, 170, 255, 0.12)", fg: "#0077cc" },     // blue
  { bg: "rgba(16, 185, 129, 0.12)", fg: "#059669" },     // emerald
  { bg: "rgba(139, 92, 246, 0.12)", fg: "#7c3aed" },     // violet
  { bg: "rgba(245, 158, 11, 0.12)", fg: "#d97706" },     // amber
];

function FeatureRow({ feature, index }: { feature: CourseFeature; index: number }) {
  const IconComp = FEATURE_ICON_MAP[feature.icon] ?? Rocket;
  const color = FEATURE_COLORS[index % FEATURE_COLORS.length];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <span style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        width: "1.45rem", height: "1.45rem", borderRadius: "6px",
        backgroundColor: color.bg, color: color.fg, flexShrink: 0,
      }}>
        <IconComp width={13} height={13} />
      </span>
      <span style={{ fontSize: "0.7rem", color: "var(--color-text)", fontWeight: 500, lineHeight: 1.3 }}>
        {feature.label}
      </span>
    </div>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────
const clamp = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), hi);

const SPRING: Transition = { type: "spring", bounce: 0.16, duration: 0.85 };

// ── Responsive geometry hook ──────────────────────────────────────────────────
function useCarouselGeometry(width: number) {
  if (width < 360) {
    return { width, slideSize: Math.max(244, width - 48), rotationStep: 6, arcRadius: 10, inactiveScale: 0.68, topPct: "1%" };
  }
  if (width < 480) {
    return { width, slideSize: Math.max(244, width - 48), rotationStep: 14, arcRadius: 26, inactiveScale: 0.68, topPct: "1%" };
  }
  if (width < 768) {
    return { width, slideSize: Math.min(300, width - 56), rotationStep: 16, arcRadius: 32, inactiveScale: 0.66, topPct: "2%" };
  }
  if (width < 1024) {
    return { width, slideSize: 300, rotationStep: 18, arcRadius: 40, inactiveScale: 0.64, topPct: "4%" };
  }
  return { width, slideSize: 370, rotationStep: 20, arcRadius: 50, inactiveScale: 0.62, topPct: "3%" };
}

// ── Props ──────────────────────────────────────────────────────────────────────
interface CourseCarouselProps {
  courses: Course[];
  onRegisterClick: (courseId: string) => void;
  activeIndex?: number;
  defaultActiveIndex?: number;
  onActiveIndexChange?: (i: number) => void;
  loop?: boolean;
  transition?: Transition;
  showControls?: boolean;
  showDots?: boolean;
  className?: string;
  enrollmentCounts?: Record<string, number>;
}

// ── Component ──────────────────────────────────────────────────────────────────
export function CourseCarousel({
  courses,
  onRegisterClick,
  activeIndex,
  defaultActiveIndex = 0,
  onActiveIndexChange,
  loop = true,
  transition = SPRING,
  showControls = true,
  className,
  enrollmentCounts,
}: CourseCarouselProps) {
  const prefersReduced = useReducedMotion();
  const carouselRef = React.useRef<HTMLDivElement>(null);

  const [containerWidth, setContainerWidth] = React.useState(0);
  const [isMounted, setIsMounted] = React.useState(false);
  const geo = useCarouselGeometry(containerWidth);
  const maxIndex = Math.max(0, courses.length - 1);

  const [uncontrolled, setUncontrolled] = React.useState(() =>
    clamp(defaultActiveIndex, 0, maxIndex)
  );
  const current = clamp(activeIndex ?? uncontrolled, 0, maxIndex);
  const safeScale = clamp(geo.inactiveScale, 0.35, 1);

  React.useEffect(() => {
    const element = carouselRef.current;
    if (!element) return;

    const updateWidth = () => {
      setContainerWidth(Math.max(1, element.clientWidth));
      setIsMounted(true);
    };
    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const selectSlide = React.useCallback(
    (next: number) => {
      if (!courses.length) return;
      const resolved = loop
        ? (next + courses.length) % courses.length
        : clamp(next, 0, maxIndex);
      if (activeIndex === undefined) setUncontrolled(resolved);
      onActiveIndexChange?.(resolved);
    },
    [activeIndex, courses.length, loop, maxIndex, onActiveIndexChange]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft")  { e.preventDefault(); selectSlide(current - 1); }
    if (e.key === "ArrowRight") { e.preventDefault(); selectSlide(current + 1); }
  };

  if (!courses.length) return null;

  const effectiveTx: Transition = prefersReduced ? { duration: 0 } : transition;

  if (!isMounted) {
    return (
      <div
        ref={carouselRef}
        className={cn("relative isolate h-full w-full", className)}
        style={{ overflow: "hidden" }}
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      ref={carouselRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Course carousel"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className={cn("relative isolate h-full w-full outline-none", className)}
      style={{ overflow: "hidden", touchAction: "pan-y" }}
    >
      <div
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0, bottom: 0,
          overflow: "hidden",
        }}
      >
        <motion.div
          style={{
            position: "absolute",
            left: 0,
            top: geo.topPct,
            display: "flex",
            width: "fit-content",
          }}
          animate={{ x: (geo.width / 2) - (current * geo.slideSize + geo.slideSize / 2) }}
          transition={effectiveTx}
        >
          {courses.map((course, index) => {
            const isActive = current === index;
            const distance = index - current;
            const icon     = getCourseIcon(course.id);
            const timing   = course.timings[0] ?? "";
            const duration = course.Durtion ?? course.duration ?? "";
            const studentCount = enrollmentCounts?.[course.id] ?? course.students ?? 0;
            const arcDistance = Math.min(Math.abs(distance), 4);
            const arcY = (1 - Math.cos(arcDistance * (Math.PI / 5))) * geo.arcRadius;

            const showBadge = Boolean(course.isPopular || course.isFeatured);
            const badgeText = course.isPopular ? "Popular" : course.isFeatured ? "Featured" : "";

            return (
              <motion.div
                key={course.id}
                className="flex shrink-0 flex-col items-center will-change-transform"
                style={{ width: geo.slideSize, padding: "0 6px" }}
                animate={{
                  rotate: distance * geo.rotationStep,
                  scale:  isActive ? 1 : safeScale,
                  y:      arcY,
                }}
                transition={effectiveTx}
              >
                {/* Card Button */}
                <button
                  type="button"
                  aria-label={isActive ? `${course.name} — selected` : `Show ${course.name}`}
                  aria-current={isActive ? "true" : undefined}
                  className="w-full cursor-pointer text-left rounded-2xl"
                  onClick={() => selectSlide(index)}
                  style={{ background: "none", border: "none", padding: 0 }}
                >
                  <div
                    className="course-card glass-card"
                    style={{
                      width: "100%",
                      borderRadius: "20px",
                      padding: "1.4rem 1.25rem 1.5rem",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.6rem",
                      backgroundColor: "var(--color-surface)",
                      borderTop: isActive
                        ? "3px solid rgba(0,170,255,0.85)"
                        : "3px solid rgba(0,170,255,0.3)",
                      boxShadow: isActive
                        ? "0 24px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,170,255,0.2)"
                        : "0 8px 24px rgba(0,0,0,0.35)",
                      transition: "border-color 0.3s, box-shadow 0.3s",
                      position: "relative",
                    }}
                  >
                    {isActive && (
                      <span aria-hidden="true" style={{
                        position: "absolute", inset: 0, pointerEvents: "none",
                        background: "linear-gradient(135deg,rgba(0,170,255,0.06) 0%,transparent 60%)",
                      }} />
                    )}

                    {/* Section 1: Icon Tile + Badge */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                      <div style={{
                        width: "2.6rem", height: "2.6rem", borderRadius: "10px",
                        backgroundColor: "rgba(0, 170, 255, 0.08)",
                        border: "1px solid rgba(0, 170, 255, 0.15)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "1.35rem", lineHeight: 1, userSelect: "none", flexShrink: 0,
                      }}>
                        {icon}
                      </div>
                      {showBadge && (
                        <span style={{
                          display: "inline-flex", alignItems: "center", gap: "0.2rem",
                          backgroundColor: "rgba(245, 158, 11, 0.12)", color: "#d97706",
                          border: "1px solid rgba(245, 158, 11, 0.25)", borderRadius: "999px",
                          padding: "0.15rem 0.5rem", fontSize: "0.6rem",
                          fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em",
                        }}>
                          <Flame width={10} height={10} />
                          {badgeText}
                        </span>
                      )}
                    </div>

                    {/* Section 2: Course Title */}
                    <h3 style={{
                      fontFamily: "var(--font-display,inherit)", fontSize: "1.05rem",
                      fontWeight: 700, color: "#233066", margin: 0, lineHeight: 1.2,
                    }}>
                      {course.name}
                    </h3>

                    {/* Section 3: Rating Row */}
                    {course.rating != null && (
                      <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                        <Star width={13} height={13} style={{ color: "#f59e0b", fill: "#f59e0b" }} />
                        <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#233066" }}>
                          {course.rating}
                        </span>
                        <span style={{ fontSize: "0.65rem", color: "var(--color-text-muted)", fontWeight: 500 }}>
                          ({studentCount.toLocaleString()}+ Students)
                        </span>
                      </div>
                    )}

                    {/* Section 4: Short Description */}
                    <p style={{
                      color: "var(--color-text-muted)", fontSize: "0.78rem", lineHeight: 1.5,
                      margin: 0, overflow: "hidden", display: "-webkit-box",
                      WebkitLineClamp: 3, WebkitBoxOrient: "vertical",
                    }}>
                      {course.shortDescription ?? course.description}
                    </p>

                    {/* Section 5: Divider */}
                    <hr style={{ border: "none", borderTop: "1px solid rgba(0, 119, 204, 0.1)", margin: "0.1rem 0" }} />

                    {/* Section 6: Feature Checklist */}
                    {course.features && course.features.length > 0 && (
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem", flexGrow: 1 }}>
                        {course.features.map((feat, i) => (
                          <FeatureRow key={feat.label} feature={feat} index={i} />
                        ))}
                      </div>
                    )}

                    {/* Section 7: Duration + Flexible Pills */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginTop: "auto" }}>
                      {duration && (
                        <span style={{
                          display: "inline-flex", alignItems: "center", gap: "0.25rem",
                          backgroundColor: "rgba(0, 170, 255, 0.1)", color: "var(--color-primary)",
                          border: "1px solid rgba(0, 170, 255, 0.22)", borderRadius: "999px",
                          padding: "0.18rem 0.55rem", fontSize: "0.62rem", fontWeight: 500,
                        }}>
                          <Clock width={11} height={11} /> {duration}
                        </span>
                      )}
                      {(course.flexible || timing) && (
                        <span style={{
                          display: "inline-flex", alignItems: "center", gap: "0.25rem",
                          backgroundColor: "rgba(16, 185, 129, 0.1)", color: "#059669",
                          border: "1px solid rgba(16, 185, 129, 0.22)", borderRadius: "999px",
                          padding: "0.18rem 0.55rem", fontSize: "0.62rem", fontWeight: 500,
                        }}>
                          <CalendarClock width={11} height={11} /> {course.flexible ?? timing}
                        </span>
                      )}
                    </div>
                  </div>
                </button>

                {/* Section I: CTA Button */}
                <AnimatePresence mode="wait" initial={false}>
                  {isActive && (
                    <motion.div
                      key={`cta-${course.id}`}
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.9 }}
                      transition={{ duration: 0.28, ease: "easeOut" }}
                      style={{
                        marginTop: "1.15rem",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <button
                        type="button"
                        className="btn-primary"
                        style={{
                          whiteSpace: "nowrap",
                          boxShadow: "0 8px 24px rgba(0,170,255,0.45)",
                          fontSize: "0.875rem",
                        }}
                        onClick={() => onRegisterClick(course.id)}
                        aria-label={`Register for ${course.name}`}
                      >
                        Register for {course.name}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Controls bar */}
      {showControls && (
        <>
          <button
            type="button"
            aria-label="Previous course"
            disabled={!loop && current === 0}
            onClick={() => selectSlide(current - 1)}
            style={{
              position: "absolute",
              left: "clamp(8px, 2vw, 24px)",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              width: "clamp(36px, 5vw, 48px)",
              height: "clamp(36px, 5vw, 48px)",
              borderRadius: "50%",
              border: "2px solid rgba(0,119,204,0.35)",
              backgroundColor: "rgba(255,255,255,0.92)",
              backdropFilter: "blur(8px)",
              color: "#0077cc",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 16px rgba(0,100,180,0.15)",
              transition: "background 0.18s, border-color 0.18s, box-shadow 0.18s, transform 0.18s",
            }}
            onMouseEnter={(e) => {
              const b = e.currentTarget as HTMLButtonElement;
              b.style.backgroundColor = "#0077cc";
              b.style.color = "#ffffff";
              b.style.borderColor = "#0077cc";
              b.style.boxShadow = "0 6px 24px rgba(0,119,204,0.35)";
              b.style.transform = "translateY(-50%) scale(1.08)";
            }}
            onMouseLeave={(e) => {
              const b = e.currentTarget as HTMLButtonElement;
              b.style.backgroundColor = "rgba(255,255,255,0.92)";
              b.style.color = "#0077cc";
              b.style.borderColor = "rgba(0,119,204,0.35)";
              b.style.boxShadow = "0 4px 16px rgba(0,100,180,0.15)";
              b.style.transform = "translateY(-50%) scale(1)";
            }}
          >
            <ChevronLeft style={{ width: "clamp(16px, 2.5vw, 22px)", height: "clamp(16px, 2.5vw, 22px)" }} />
          </button>

          <button
            type="button"
            aria-label="Next course"
            disabled={!loop && current === maxIndex}
            onClick={() => selectSlide(current + 1)}
            style={{
              position: "absolute",
              right: "clamp(8px, 2vw, 24px)",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              width: "clamp(36px, 5vw, 48px)",
              height: "clamp(36px, 5vw, 48px)",
              borderRadius: "50%",
              border: "2px solid rgba(0,119,204,0.35)",
              backgroundColor: "rgba(255,255,255,0.92)",
              backdropFilter: "blur(8px)",
              color: "#0077cc",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 16px rgba(0,100,180,0.15)",
              transition: "background 0.18s, border-color 0.18s, box-shadow 0.18s, transform 0.18s",
            }}
            onMouseEnter={(e) => {
              const b = e.currentTarget as HTMLButtonElement;
              b.style.backgroundColor = "#0077cc";
              b.style.color = "#ffffff";
              b.style.borderColor = "#0077cc";
              b.style.boxShadow = "0 6px 24px rgba(0,119,204,0.35)";
              b.style.transform = "translateY(-50%) scale(1.08)";
            }}
            onMouseLeave={(e) => {
              const b = e.currentTarget as HTMLButtonElement;
              b.style.backgroundColor = "rgba(255,255,255,0.92)";
              b.style.color = "#0077cc";
              b.style.borderColor = "rgba(0,119,204,0.35)";
              b.style.boxShadow = "0 4px 16px rgba(0,100,180,0.15)";
              b.style.transform = "translateY(-50%) scale(1)";
            }}
          >
            <ChevronRight style={{ width: "clamp(16px, 2.5vw, 22px)", height: "clamp(16px, 2.5vw, 22px)" }} />
          </button>
        </>
      )}
    </div>
  );
}

export default CourseCarousel;
