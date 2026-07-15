"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Letter bounce animation —————————————————————————————————
// Each letter drops in from above with a playful overshoot spring,
// staggered so "Tech Skill" assembles letter-by-letter.
// The dot of the "i" in "Skill" gets special treatment: it starts
// far above, bounces in last with extra spring energy.

const WORD1 = ["T", "e", "c", "h"];
const WORD2 = ["S", "k", "i", "l", "l"];
const DOT_INDEX = 2; // index of "i" in WORD2

const SPRING_BASE = { type: "spring" as const, stiffness: 400, damping: 18 };
const SPRING_DOT  = { type: "spring" as const, stiffness: 500, damping: 10 };  // bouncier

function BounceLetter({
  char,
  delay,
  isDot,
  color,
}: {
  char: string;
  delay: number;
  isDot?: boolean;
  color: string;
}) {
  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      {/* The letter body */}
      <motion.span
        initial={{ y: isDot ? -80 : -60, opacity: 0, scale: 0.6 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ ...(isDot ? SPRING_DOT : SPRING_BASE), delay }}
        style={{
          display: "inline-block",
          color,
          fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)",
          fontWeight: 800,
          fontSize: "clamp(3rem, 8vw, 5.5rem)",
          lineHeight: 1,
          letterSpacing: "-0.02em",
        }}
      >
        {char}
      </motion.span>

      {/* Extra floating dot that shoots down separately for "i" */}
      {isDot && (
        <motion.span
          aria-hidden="true"
          initial={{ y: -120, opacity: 0, scale: 0.4 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ ...SPRING_DOT, delay: delay + 0.08, stiffness: 600, damping: 8 }}
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            backgroundColor: "#00aaff",
            pointerEvents: "none",
          }}
        />
      )}
    </span>
  );
}

export default function Preloader() {
  const [done, setDone] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Wait for the page's largest contentful paint estimate (~1.8s)
    // then trigger the exit animation
    const timer = setTimeout(() => setDone(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (done) {
      // Give exit animation time to play before unmounting
      const t = setTimeout(() => setVisible(false), 700);
      return () => clearTimeout(t);
    }
  }, [done]);

  // Total letter count for delay calculation
  // Word1 letters: 0..3, space, Word2 letters: 4..8
  function delayFor(globalIdx: number) {
    return globalIdx * 0.07 + 0.1;
  }

  if (!visible) return null;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            backgroundColor: "#1a3340",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1.5rem",
          }}
        >
          {/* Animated dot grid background */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: "radial-gradient(circle, rgba(0,170,255,0.08) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
              pointerEvents: "none",
            }}
          />

          {/* Cyan glow orb */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "30%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              width: "400px",
              height: "400px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(0,170,255,0.18) 0%, transparent 70%)",
              filter: "blur(48px)",
              animation: "pulse-glow 2s ease-in-out infinite",
            }}
          />

          {/* "Tech Skill" letter-by-letter bounce */}
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "0",
              position: "relative",
              zIndex: 1,
            }}
            aria-label="Tech Skill"
          >
            {/* "Tech" — white */}
            {WORD1.map((char, i) => (
              <BounceLetter
                key={`w1-${i}`}
                char={char}
                delay={delayFor(i)}
                color="#ffffff"
              />
            ))}

            {/* Space */}
            <span style={{ display: "inline-block", width: "0.45em" }} aria-hidden="true" />

            {/* "Skill" — cyan, with special dot on "i" */}
            {WORD2.map((char, i) => (
              <BounceLetter
                key={`w2-${i}`}
                char={char}
                delay={delayFor(WORD1.length + i + 1)}
                isDot={i === DOT_INDEX}
                color="#00aaff"
              />
            ))}
          </div>

        

          {/* Loading bar */}
          <motion.div
            style={{
              position: "relative",
              zIndex: 1,
              width: "160px",
              height: "2px",
              backgroundColor: "rgba(0,170,255,0.2)",
              borderRadius: "1px",
              overflow: "hidden",
              marginTop: "0.5rem",
            }}
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
              style={{
                position: "absolute",
                inset: 0,
                backgroundColor: "#00aaff",
                borderRadius: "1px",
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
