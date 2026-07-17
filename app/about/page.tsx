"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LearningPath from "@/components/sections/LearningPath";
import Outcomes from "@/components/sections/Outcomes";
import SuccessStories from "@/components/sections/SuccessStories";

const HeroCanvas = dynamic(() => import("@/components/three/HeroCanvas"), { ssr: false });

const principles = [
  ["Learn by making", "Every concept becomes a practical project, not a forgotten slide deck."],
  ["Build visible proof", "Graduate with work you can show to clients, recruiters, and collaborators."],
  ["Move toward income", "Learn the professional habits behind freelancing, interviews, and real client work."],
];

export default function AboutPage() {
  const prefersReduced = useReducedMotion();

  return (
    <>
      <Navbar />
      <main>
        <section className="relative isolate overflow-hidden px-5 pb-20 pt-20 sm:px-8 sm:pb-28 sm:pt-28" style={{ backgroundColor: "var(--color-background)" }}>
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-40"><HeroCanvas /></div>
          <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(circle at 50% 0%, rgba(0,170,255,0.2), transparent 42%), linear-gradient(180deg, transparent, var(--color-background))" }} />
          <motion.div initial={prefersReduced ? false : { opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }} className="relative mx-auto max-w-5xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold tracking-[0.16em]" style={{ color: "#0065aa", borderColor: "rgba(0,119,204,0.28)", background: "rgba(0,119,204,0.11)" }}><Sparkles size={14} /> THE TECH SKILL DIFFERENCE</span>
            <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-bold leading-[1.04] sm:text-6xl lg:text-7xl" style={{ color: "var(--color-text)", fontFamily: "var(--font-display)" }}>We turn curiosity into work you can be proud to show.</h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed sm:text-lg" style={{ color: "var(--color-text-muted)" }}>Tech Skill is built for people who do not just want another certificate. We teach practical digital skills, help you create proof of your ability, and make the next professional step feel achievable.</p>
            <a href="/#courses" className="btn-primary mt-8 inline-flex items-center gap-2">Explore courses <ArrowRight size={18} /></a>
          </motion.div>
        </section>

        <section className="px-5 py-16 sm:px-8 sm:py-24" style={{ backgroundColor: "var(--color-surface)" }}>
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
            <div>
              <p className="text-xs font-bold tracking-[0.18em]" style={{ color: "var(--color-primary)" }}>OUR POINT OF VIEW</p>
              <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-5xl" style={{ color: "var(--color-text)", fontFamily: "var(--font-display)" }}>A more useful kind of education.</h2>
              <p className="mt-5 max-w-xl leading-relaxed" style={{ color: "var(--color-text-muted)" }}>The gap between learning and earning is rarely motivation. It is usually a lack of guided practice, useful feedback, and a portfolio that speaks for itself. Our programs are designed to close that gap.</p>
              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                {[['12+', 'Industry tracks'], ['1,100+', 'Learners served'], ['100%', 'Practical focus']].map(([value, label]) => <div key={label} className="rounded-2xl p-4" style={{ background: "rgba(0,170,255,0.07)", border: "1px solid rgba(0,119,204,0.15)" }}><strong className="block text-2xl" style={{ color: "var(--color-primary)", fontFamily: "var(--font-display)" }}>{value}</strong><span className="text-sm" style={{ color: "var(--color-text-muted)" }}>{label}</span></div>)}
              </div>
            </div>
            <div className="relative grid gap-4 sm:grid-cols-2">
              <div aria-hidden="true" className="absolute -inset-5 -z-10 rounded-[2rem] blur-2xl" style={{ background: "rgba(0,170,255,0.13)" }} />
              <div className="rounded-[1.75rem] p-6 sm:translate-y-8" style={{ background: "linear-gradient(145deg, #006bb6, #009fe3)", color: "white" }}><p className="text-sm font-bold tracking-[0.13em] text-cyan-100">THE OUTCOME</p><p className="mt-5 text-2xl font-bold leading-tight" style={{ fontFamily: "var(--font-display)" }}>Useful skills, visible work, and more confidence in your next move.</p></div>
              <div className="rounded-[1.75rem] p-6 shadow-lg" style={{ backgroundColor: "var(--color-background)", border: "1px solid rgba(0,119,204,0.15)" }}><div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-100 text-[#0077cc]"><CheckCircle2 /></div><p className="mt-8 text-xl font-bold" style={{ color: "var(--color-text)", fontFamily: "var(--font-display)" }}>Mentor-led practice</p><p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>Small steps, clear feedback, and skills that compound.</p></div>
            </div>
          </div>
        </section>

        <section className="px-5 py-16 sm:px-8 sm:py-24" style={{ backgroundColor: "var(--color-background)" }}>
          <div className="mx-auto max-w-6xl"><p className="text-center text-xs font-bold tracking-[0.18em]" style={{ color: "var(--color-primary)" }}>HOW WE WORK</p><h2 className="mx-auto mt-3 max-w-2xl text-center text-3xl font-bold sm:text-5xl" style={{ color: "var(--color-text)", fontFamily: "var(--font-display)" }}>A training system built around momentum.</h2>
            <div className="mt-12 grid gap-4 md:grid-cols-3">{principles.map(([title, description], index) => <motion.article key={title} initial={prefersReduced ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ delay: index * 0.12, duration: 0.45 }} className="rounded-3xl p-6 sm:p-8" style={{ backgroundColor: "var(--color-surface)", border: "1px solid rgba(0,119,204,0.14)", boxShadow: "0 12px 35px rgba(0,85,160,0.06)" }}><span className="text-sm font-bold" style={{ color: "var(--color-primary)" }}>0{index + 1}</span><h3 className="mt-7 text-xl font-bold" style={{ color: "var(--color-text)", fontFamily: "var(--font-display)" }}>{title}</h3><p className="mt-3 leading-relaxed" style={{ color: "var(--color-text-muted)" }}>{description}</p></motion.article>)}</div>
          </div>
        </section>

        <LearningPath />
        <Outcomes />
        <SuccessStories />
      </main>
      <Footer />
    </>
  );
}
