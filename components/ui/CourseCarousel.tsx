"use client";

import * as React from "react";
import { motion, type Transition, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Course } from "@/data/courses";

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

// ── Helpers ───────────────────────────────────────────────────────────────────
const clamp = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), hi);

const SPRING: Transition = { type: "spring", bounce: 0.16, duration: 0.85 };

// ── Responsive geometry hook ──────────────────────────────────────────────────
// Returns responsive geometry values. The vertical offset follows an arc
// instead of the old diagonal stack.
function useCarouselGeometry(width: number) {

  if (width < 360) {
    // Very small phones (< 360px): active card fills almost the full width
    return { width, slideSize: Math.max(1, width - 24), rotationStep: 6, arcRadius: 10, inactiveScale: 0.7, topPct: "3%" };
  }
  if (width < 480) {
    // Small phones: card is nearly full width, very gentle rotation
    return { width, slideSize: Math.max(1, width - 28), rotationStep: 8, arcRadius: 14, inactiveScale: 0.72, topPct: "4%" };
  }
  if (width < 768) {
    // Phones / small tablets
    return { width, slideSize: Math.min(320, width - 40), rotationStep: 12, arcRadius: 24, inactiveScale: 0.72, topPct: "5%" };
  }
  if (width < 1024) {
    // Tablets
    return { width, slideSize: 300, rotationStep: 18, arcRadius: 46, inactiveScale: 0.64, topPct: "9%" };
  }
  // Desktop
  return { width, slideSize: 300, rotationStep: 20, arcRadius: 58, inactiveScale: 0.62, topPct: "13%" };
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
  // showDots prop kept for API compatibility; dots removed in favour of arrow buttons
  showDots: _showDots = true, // eslint-disable-line @typescript-eslint/no-unused-vars
  className,
  enrollmentCounts,
}: CourseCarouselProps) {
  const prefersReduced = useReducedMotion();
  const carouselRef = React.useRef<HTMLDivElement>(null);

  // ── SSR-safe width measurement ────────────────────────────────────────────
  // Always initialise to 0 so SSR and first client render are identical.
  // The ResizeObserver sets the real width immediately after mount.
  // This prevents the hydration mismatch that caused "desktop layout on mobile reload".
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

  // ── While the real width hasn't been measured yet, render a transparent
  // placeholder div at full size. This ensures the carousel ref gets attached
  // and measured correctly before any geometry-dependent rendering happens.
  // This is what prevents the "desktop card on mobile reload" hydration bug.
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
      // Clip the side cards but allow the CTA + controls to show below
      style={{ overflow: "hidden", touchAction: "pan-y" }}
    >
      {/* ── Diagonal stack ─────────────────────────────────── */}
      {/*
        We do NOT overflow:hidden on this inner div so the active card's
        CTA button (which lives inside the slide) is never clipped.
        The outer container clips the sides only.
      */}
      <div
        style={{
          position: "absolute",
          // Leave room at the bottom for the controls bar (56px) + some padding
          top: 0, left: 0, right: 0, bottom: "60px",
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
            const duration = course.Durtion ?? "";
            const studentCount = enrollmentCounts?.[course.id] ?? course.students ?? 0;
            const arcDistance = Math.min(Math.abs(distance), 4);
            const arcY = (1 - Math.cos(arcDistance * (Math.PI / 5))) * geo.arcRadius;

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
                {/* ── The card itself ── */}
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
                      aspectRatio: "1 / 1.1",
                      borderRadius: "20px",
                      padding: "1.25rem",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.65rem",
                      backgroundColor: "var(--color-surface)",
                      borderTop: isActive
                        ? "3px solid rgba(0,170,255,0.85)"
                        : "3px solid rgba(0,170,255,0.3)",
                      boxShadow: isActive
                        ? "0 24px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,170,255,0.2)"
                        : "0 8px 24px rgba(0,0,0,0.35)",
                      transition: "border-color 0.3s, box-shadow 0.3s",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    {isActive && (
                      <span aria-hidden="true" style={{
                        position: "absolute", inset: 0, pointerEvents: "none",
                        background: "linear-gradient(135deg,rgba(0,170,255,0.06) 0%,transparent 60%)",
                      }} />
                    )}
                    <div style={{ fontSize: "2rem", lineHeight: 1, userSelect: "none" }} aria-hidden="true">
                      {icon}
                    </div>
                    <h3 style={{ fontFamily: "var(--font-display,inherit)", fontSize: "1.05rem", fontWeight: 700, color: "#395186ff", margin: 0, lineHeight: 1.2 }}>
                      {course.name}
                    </h3>
                    <div
                      className="course-student-count"
                      aria-label={`${studentCount.toLocaleString()} students enrolled in ${course.name}`}
                    >
                      <span className="course-student-count-icon" aria-hidden="true">👥</span>
                      <span><strong>{studentCount.toLocaleString()}</strong> students enrolled</span>
                    </div>
                    <p style={{ color: "var(--color-text-muted)", fontSize: "0.78rem", lineHeight: 1.5, margin: 0, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", flexGrow: 1 }}>
                      {course.description}
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                      {[`⏰ ${timing}`, `⏱️ ${duration}`].map(chip => (
                        <span key={chip} style={{ display: "inline-flex", alignItems: "center", backgroundColor: "rgba(0,170,255,0.1)", color: "var(--color-primary)", border: "1px solid rgba(0,170,255,0.22)", borderRadius: "999px", padding: "0.18rem 0.55rem", fontSize: "0.65rem", fontWeight: 500, whiteSpace: "nowrap" }}>
                          {chip}
                        </span>
                      ))}
                    </div>
                   
                  </div>
                </button>

                {/*
                  ── CTA button — lives INSIDE the slide, centred under the card ──
                  Visible only on the active slide. Because it's part of the same
                  flex column as the card, "text-align: center" on the parent
                  naturally centres it directly beneath the card with no extra math.
                */}
                <AnimatePresence mode="wait" initial={false}>
                  {isActive && (
                    <motion.div
                      key={`cta-${course.id}`}
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.9 }}
                      transition={{ duration: 0.28, ease: "easeOut" }}
                      style={{
                        marginTop: "1.75rem",
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

      {/* ── Controls bar ───────────────────────────────────── */}
      {showControls && (
        <>
          {/* ← Prev arrow — left side, vertically centred */}
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

          {/* → Next arrow — right side, vertically centred */}
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
