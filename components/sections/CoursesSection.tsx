"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Course } from "@/data/courses";
import CourseCarousel from "@/components/ui/CourseCarousel";

// Header reveal variants — typed properly so Framer Motion TS is happy
const revealStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};
const revealChild: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

interface CoursesSectionProps {
  courses: Course[];
  onRegisterClick: (courseId: string) => void;
  enrollmentCounts?: Record<string, number>;
}

export default function CoursesSection({ courses, onRegisterClick, enrollmentCounts }: CoursesSectionProps) {
  const prefersReduced = useReducedMotion();
  const [activeCourse, setActiveCourse] = useState(0);
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const stickySteps = Math.min(3, courses.length);

  useEffect(() => {
    if (prefersReduced || stickySteps <= 1) return;

    let frame = 0;
    const updateFromScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const track = scrollTrackRef.current;
        if (!track) return;
        const availableScroll = Math.max(track.offsetHeight - window.innerHeight, 1);
        const travelled = Math.max(0, -track.getBoundingClientRect().top + 80);
        const progress = Math.min(0.999, travelled / availableScroll);
        const nextCourse = Math.min(stickySteps - 1, Math.floor(progress * stickySteps));
        setActiveCourse((current) => current === nextCourse ? current : nextCourse);
      });
    };

    updateFromScroll();
    window.addEventListener("scroll", updateFromScroll, { passive: true });
    window.addEventListener("resize", updateFromScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateFromScroll);
      window.removeEventListener("resize", updateFromScroll);
    };
  }, [prefersReduced, stickySteps]);

  return (
    <section
      id="courses"
      aria-labelledby="courses-heading"
      style={{
        backgroundColor: "var(--color-background)",
        backgroundImage: "linear-gradient(to bottom, rgba(0,170,255,0.06) 0px, transparent 80px)",
        paddingTop: "5rem",
        paddingBottom: "0",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>

        {/* Section header */}
        <motion.div
          variants={prefersReduced ? undefined : revealStagger}
          initial={prefersReduced ? undefined : "hidden"}
          whileInView={prefersReduced ? undefined : "visible"}
          viewport={{ once: true, amount: 0.5 }}
          style={{ textAlign: "center", marginBottom: "2.5rem" }}
        >
          <motion.p
            variants={prefersReduced ? undefined : revealChild}
            style={{ color: "var(--color-primary)", fontWeight: 600, fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.75rem" }}
          >
            OUR COURSES
          </motion.p>
          <motion.h2
            id="courses-heading"
            variants={prefersReduced ? undefined : revealChild}
            style={{ fontFamily: "var(--font-display,inherit)", fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 700, color: "#1d63a4ff", lineHeight: 1.15, margin: "0 0 1rem" }}
          >
            Learn. Build. Succeed.
          </motion.h2>
          <motion.p
            variants={prefersReduced ? undefined : revealChild}
            style={{ color: "var(--color-text-muted)", fontSize: "1rem", lineHeight: 1.65, maxWidth: "680px", margin: "0 auto" }}
          >
            Choose from our industry-leading courses. Click any card to explore, then hit Register.
          </motion.p>
        </motion.div>

      </div>

      {/*
        Scroll track — drives the sticky card-switching effect.
        Height = stickySteps × 50svh (compact — enough scroll distance
        to cycle 3 cards without creating a huge empty gap).
      */}
      <div
        ref={scrollTrackRef}
        className="courses-scroll-track"
        style={{ height: prefersReduced ? "auto" : `${Math.max(stickySteps, 1) * 50}svh` }}
      >
        <motion.div
          initial={prefersReduced ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className={`courses-carousel-wrapper ${prefersReduced ? "" : "courses-sticky-frame"}`}
        >
          <CourseCarousel
            courses={courses}
            onRegisterClick={onRegisterClick}
            enrollmentCounts={enrollmentCounts}
            activeIndex={activeCourse}
            onActiveIndexChange={setActiveCourse}
            defaultActiveIndex={0}
            loop={false}
            showControls
            showDots
          />
        </motion.div>
      </div>

    </section>
  );
}
