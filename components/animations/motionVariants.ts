/**
 * Shared Framer Motion variant definitions for the Tech Skill landing page.
 *
 * Usage:
 *   import { fadeInUp, staggerContainer } from "@/components/animations/motionVariants";
 *
 *   <motion.div variants={staggerContainer} initial="hidden" animate="visible">
 *     <motion.h1 variants={fadeInUp}>Hello</motion.h1>
 *   </motion.div>
 *
 * All variants use the "hidden" / "visible" naming convention so they compose
 * naturally with stagger containers.
 */

import type { Variants } from "framer-motion";

// ---------------------------------------------------------------------------
// Directional fade-in variants
// ---------------------------------------------------------------------------

/** Fade in while sliding up from below — used for section headings, cards, content blocks. */
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

/** Fade in while sliding down from above. */
export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

/** Fade in from left — for text content in hero/about. */
export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

/** Fade in from right — for image/canvas content in hero. */
export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// ---------------------------------------------------------------------------
// Scale variant
// ---------------------------------------------------------------------------

/** Scale up on enter — for cards and CTA buttons. */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

// ---------------------------------------------------------------------------
// Stagger container variants
// ---------------------------------------------------------------------------

/** Stagger container — wraps lists of staggered children. */
export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

/** Fast stagger for compact lists. */
export const staggerFast: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

// ---------------------------------------------------------------------------
// Viewport config
// ---------------------------------------------------------------------------

/** Viewport config — used with whileInView. */
export const viewportOnce = { once: true, margin: "-100px" };

// ---------------------------------------------------------------------------
// Helper type
// ---------------------------------------------------------------------------

/** Represents the shape of a hidden/visible motion variant object. */
export type MotionVariant = Variants;

// ---------------------------------------------------------------------------
// Hover variant (bonus — for interactive card lift effect)
// ---------------------------------------------------------------------------

/**
 * Subtle lift-and-shadow effect for interactive cards.
 *
 * Use as a `whileHover` prop value (not inside a stagger container):
 *   <motion.article whileHover="hover" variants={cardHover}>
 */
export const cardHover: Variants = {
  rest: {
    y: 0,
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.25)",
    transition: { duration: 0.2, ease: "easeOut" },
  },
  hover: {
    y: -4,
    boxShadow: "0 12px 32px rgba(0, 170, 255, 0.25)",
    transition: { duration: 0.2, ease: "easeOut" },
  },
};
