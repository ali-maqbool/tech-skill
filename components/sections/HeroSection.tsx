"use client";

import { useState, useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/components/animations/motionVariants";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollToPlugin);
}

// ---------------------------------------------------------------------------
// Optional Three.js canvas — loaded only when NEXT_PUBLIC_ENABLE_THREEJS=true
// ---------------------------------------------------------------------------
import dynamic from "next/dynamic";

const HeroCanvas = dynamic(() => import("@/components/three/HeroCanvas"), {
  ssr: false,
  loading: () => null,
});

const enableThreeJS = process.env.NEXT_PUBLIC_ENABLE_THREEJS === "true";

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------
interface HeroSectionProps {
  onRegisterClick: () => void;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function HeroSection({ onRegisterClick }: HeroSectionProps) {
  const prefersReduced = useReducedMotion();

  // Guard against SSR rendering opacity:0 permanently.
  // Until the component mounts on the client, render content fully visible
  // (no animation). Once mounted, Framer Motion takes over.
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => { setIsMounted(true); }, []);

  // When the user prefers reduced motion, skip stagger/entrance animations
  const containerVariants = prefersReduced ? undefined : staggerContainer;
  const itemVariants = prefersReduced ? undefined : fadeInUp;

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="hero-section relative min-h-screen overflow-hidden flex items-center justify-center"
      style={{ backgroundColor: "#f4f9ffff" }}
    >
      {/* ------------------------------------------------------------------ */}
      {/* Animated CSS background layer                                        */}
      {/* ------------------------------------------------------------------ */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none select-none">

        {/* Dot / grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #00aaff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Large cyan orb — top-left */}
        <div
          className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full animate-float"
          style={{
            background:
              "radial-gradient(circle at center, rgba(0,170,255,0.25) 0%, rgba(0,204,255,0.08) 60%, transparent 80%)",
            filter: "blur(48px)",
            willChange: "transform",
          }}
        />

        {/* Medium teal orb — bottom-right */}
        <div
          className="absolute -bottom-24 -right-24 w-[420px] h-[420px] rounded-full animate-pulse-glow animation-delay-2000"
          style={{
            background:
              "radial-gradient(circle at center, rgba(0,204,255,0.2) 0%, rgba(0,170,255,0.06) 60%, transparent 80%)",
            filter: "blur(56px)",
            willChange: "transform, opacity",
          }}
        />

        {/* Small accent orb — center-right */}
        <div
          className="absolute top-1/3 right-1/4 w-[260px] h-[260px] rounded-full animate-drift animation-delay-1000"
          style={{
            background:
              "radial-gradient(circle at center, rgba(0,170,255,0.18) 0%, transparent 70%)",
            filter: "blur(36px)",
            willChange: "transform",
          }}
        />

        {/* Diagonal geometric shape — top-right */}
        <div
          className="absolute top-0 right-0 w-[380px] h-[380px] animate-rotate-slow opacity-[0.12]"
          style={{
            background:
              "linear-gradient(135deg, rgba(0,170,255,0.3) 0%, rgba(0,204,255,0.1) 50%, transparent 100%)",
            clipPath: "polygon(100% 0%, 0% 0%, 100% 100%)",
          }}
        />

        {/* Diagonal geometric shape — bottom-left */}
        <div
          className="absolute bottom-0 left-0 w-[320px] h-[320px] animate-drift animation-delay-3000 opacity-[0.1]"
          style={{
            background:
              "linear-gradient(45deg, rgba(0,204,255,0.25) 0%, transparent 70%)",
            clipPath: "polygon(0% 100%, 0% 0%, 100% 100%)",
          }}
        />

        {/* Thin skewed accent stripe */}
        <div
          className="absolute top-1/2 left-0 right-0 h-px opacity-[0.08]"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(0,170,255,0.6) 40%, rgba(0,204,255,0.6) 60%, transparent 100%)",
            transform: "skewY(-3deg)",
          }}
        />
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Optional Three.js canvas background                                  */}
      {/* ------------------------------------------------------------------ */}
      {enableThreeJS && (
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <HeroCanvas />
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* Hero content                                                         */}
      {/* ------------------------------------------------------------------ */}
      <motion.div
        variants={containerVariants}
        initial={isMounted && containerVariants ? "hidden" : false}
        animate="visible"
        className="hero-content relative z-10 flex flex-col items-center text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto py-24"
      >
        {/* Badge */}
        <motion.div variants={itemVariants}>
          <span
            className="hero-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold border mb-3"
            style={{
              color: "#005fa3",
              borderColor: "rgba(0, 95, 163, 0.52)",
              backgroundColor: "rgba(0, 119, 204, 0.18)",
            }}
          >
             Pakistan&apos;s #1 Tech Institute
          </span>
        </motion.div>

        {/* H1 heading — blue line + white line, each stays on exactly one line */}
        <motion.h1
          id="hero-heading"
          variants={itemVariants}
          className="font-extrabold leading-tight mb-6 w-full"
          style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.2rem, 6vw, 5rem)" }}
        >
            <span
            className="block whitespace-nowrap"
            style={{
              background: "linear-gradient(90deg, #00aaff 0%, #00ccff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Master Digital Skills
          </span>
          <span className="block whitespace-nowrap" style={{ color: "var(--color-text, #ffffff)" }}>
            Shape Your Future
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          variants={itemVariants}
          className="text-xl sm:text-2xl max-w-2xl mb-10 leading-relaxed"
          style={{ color: "rgba(46, 99, 122, 0.85)" }}
        >
          Join students in Islamabad learning Graphic Design, Web Development,
          Digital Marketing, Freelancing, Video Editing, and other practical technical skills.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          variants={itemVariants}
          className="hero-actions flex flex-wrap items-center justify-center gap-4 mb-14"
        >
          <button
            type="button"
            onClick={onRegisterClick}
            className="btn-primary"
          >
            Register Now
          </button>
          <a href="#courses" className="btn-outline">
            Explore Courses
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-0"
          role="list"
          aria-label="Key statistics"
        >
          {[
            { value: "12+", label: "Courses" },
            { value: "1143+", label: "Students" },
            { value: "100%", label: "Practical" },
          ].map((stat, index) => (
            <div
              key={stat.label}
              role="listitem"
              className="flex items-center"
            >
              <div className="flex flex-col items-center px-6 sm:px-10 py-3">
                <span
                  className="text-2xl sm:text-3xl font-extrabold"
                  style={{
                    background:
                      "linear-gradient(90deg, #00aaff 0%, #00ccff 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {stat.value}
                </span>
                <span
                  className="text-sm font-medium mt-0.5"
                  style={{ color: "rgba(160,188,200,0.85)" }}
                >
                  {stat.label}
                </span>
              </div>
              {/* Vertical divider — hidden after last item */}
              {index < 2 && (
                <div
                  className="h-10 w-px self-center"
                  style={{ backgroundColor: "rgba(0,170,255,0.25)" }}
                  aria-hidden="true"
                />
              )}
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* ------------------------------------------------------------------ */}
      {/* Scroll indicator — bouncing chevron pointing down                   */}
      {/* ------------------------------------------------------------------ */}
      {!prefersReduced && (
        <button
          type="button"
          aria-label="Scroll to courses"
          onClick={() => {
            const el = document.getElementById("courses");
            if (!el) return;
            gsap.to(window, {
              duration: 0.8,
              scrollTo: { y: el, offsetY: 64 },
              ease: "power2.inOut",
            });
          }}
          className="hero-scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 animate-float flex flex-col items-center gap-1 cursor-pointer border-0 bg-transparent p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00aaff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d2035] rounded-full"
          style={{ minHeight: "unset", minWidth: "unset" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            style={{ color: "rgba(0,170,255,0.7)" }}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      )}
    </section>
  );
}
