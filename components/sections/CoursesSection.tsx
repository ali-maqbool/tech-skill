"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
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
}

export default function CoursesSection({ courses, onRegisterClick }: CoursesSectionProps) {
  const prefersReduced = useReducedMotion();

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

        {/* Section header — unchanged */}
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
            style={{ color: "var(--color-text-muted)", fontSize: "1rem", lineHeight: 1.65, maxWidth: "520px", margin: "0 auto" }}
          >
            Choose from our industry-leading courses. Click any card to explore, then hit Register.
          </motion.p>
        </motion.div>

      </div>

      {/*
        Carousel — sits edge-to-edge below the header.
        Height drives the visual space; the diagonal stack needs room to breathe.
        On mobile we reduce the height and card size via CSS.
      */}
      <motion.div
        initial={prefersReduced ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="courses-carousel-wrapper"
        style={{ width: "100%", height: "640px", position: "relative" }}
      >
        <CourseCarousel
          courses={courses}
          onRegisterClick={onRegisterClick}
          defaultActiveIndex={2}
          loop
          showControls
          showDots
        />
      </motion.div>

    </section>
  );
}
