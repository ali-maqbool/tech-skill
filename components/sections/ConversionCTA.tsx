"use client";

import { motion, useReducedMotion } from "framer-motion";

interface ConversionCTAProps {
  onRegisterClick: () => void;
}

export default function ConversionCTA({ onRegisterClick }: ConversionCTAProps) {
  const prefersReduced = useReducedMotion();

  return (
    <section aria-labelledby="conversion-cta-heading" className="relative overflow-hidden px-5 py-16 sm:py-20" style={{ background: "linear-gradient(135deg, #005fa3 0%, #0077cc 48%, #00aaff 100%)" }}>
      <div aria-hidden="true" className="absolute inset-0 opacity-40" style={{ backgroundImage: "radial-gradient(circle at 15% 20%, rgba(255,255,255,0.28) 0 2px, transparent 3px)", backgroundSize: "28px 28px" }} />
      <motion.div initial={prefersReduced ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.45 }} transition={{ duration: 0.55 }} className="relative mx-auto max-w-3xl text-center">
        <p className="mb-3 text-xs font-bold tracking-[0.22em] text-cyan-100">YOUR NEXT CHAPTER STARTS HERE</p>
        <h2 id="conversion-cta-heading" className="mx-auto max-w-2xl text-3xl font-bold leading-tight text-white sm:text-5xl" style={{ fontFamily: "var(--font-display)" }}>Ready to turn ambition into a real skill?</h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-blue-50 sm:text-lg">Get practical training, a portfolio you can show, and a clear path toward paid work.</p>
        <button type="button" onClick={onRegisterClick} className="mt-8 rounded-xl bg-white px-6 py-3 font-bold text-[#0065aa] shadow-xl transition hover:-translate-y-1 hover:shadow-2xl">Reserve Your Free Counselling Call</button>
      </motion.div>
    </section>
  );
}
