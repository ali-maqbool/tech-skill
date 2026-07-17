"use client";

import { FormEvent, useState } from "react";
import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2, Mail, MapPin, Phone } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { sendContactMessage } from "@/lib/emailjs";
import { CONTACT_INFO } from "@/data/contacts";
import { COURSES } from "@/data/courses";

const HeroCanvas = dynamic(() => import("@/components/three/HeroCanvas"), { ssr: false });

const initialForm = { name: "", email: "", phone: "", course: "", message: "" };

export default function ContactPage() {
  const prefersReduced = useReducedMotion();
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending"); setError("");
    try {
      await sendContactMessage(form);
      setStatus("success"); setForm(initialForm);
    } catch (cause) {
      setStatus("error");
      setError(cause instanceof Error ? cause.message : "We could not send your message. Please try again.");
    }
  }

  const inputClass = "w-full rounded-xl border bg-white/80 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#0077cc] focus:ring-4 focus:ring-[#00aaff]/15";
  const inputStyle = { borderColor: "rgba(0,119,204,0.18)", color: "var(--color-text)" };

  return <><Navbar /><main>
    <section className="relative isolate overflow-hidden px-5 pb-16 pt-20 sm:px-8 sm:pb-20 sm:pt-28" style={{ backgroundColor: "var(--color-background)" }}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-35"><HeroCanvas /></div>
      <div aria-hidden="true" className="absolute inset-0" style={{ background: "radial-gradient(circle at 50% 0%, rgba(0,170,255,0.18), transparent 44%)" }} />
      <motion.div initial={prefersReduced ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="relative mx-auto max-w-3xl text-center">
        <p className="text-xs font-bold tracking-[0.18em]" style={{ color: "var(--color-primary)" }}>TALK TO A REAL PERSON</p>
        <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-6xl" style={{ color: "var(--color-text)", fontFamily: "var(--font-display)" }}>Let&apos;s make your next move clearer.</h1>
        <p className="mx-auto mt-5 max-w-xl leading-relaxed" style={{ color: "var(--color-text-muted)" }}>Tell us where you want to go. We&apos;ll help you choose a course and map the right first step—no pressure, no obligation.</p>
      </motion.div>
    </section>

    <section className="px-5 pb-16 sm:px-8 sm:pb-24" style={{ backgroundColor: "var(--color-background)" }}>
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[.85fr_1.15fr]">
        <aside className="rounded-3xl p-6 sm:p-8" style={{ background: "linear-gradient(145deg, #005fa3, #008bd2)", color: "white" }}>
          <p className="text-xs font-bold tracking-[0.18em] text-cyan-100">DIRECT SUPPORT</p>
          <h2 className="mt-4 text-3xl font-bold leading-tight" style={{ fontFamily: "var(--font-display)" }}>Your questions deserve a human answer.</h2>
          <div className="mt-8 space-y-4">
            <a className="flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 p-4 transition hover:bg-white/20" href={`tel:${CONTACT_INFO.phone.replace(/\s/g, "")}`}><Phone size={19} /><span><small className="block text-cyan-100">Call us</small><strong>{CONTACT_INFO.phone}</strong></span></a>
            <a className="flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 p-4 transition hover:bg-white/20" href="mailto:info@techskill.pk"><Mail size={19} /><span><small className="block text-cyan-100">Email us</small><strong>info@techskill.pk</strong></span></a>
            <div className="flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 p-4"><MapPin size={19} /><span><small className="block text-cyan-100">Visit us</small><strong>G-10 Markaz, Islamabad</strong></span></div>
          </div>
          <div className="mt-8 border-t border-white/20 pt-6 text-sm text-cyan-50">Monday–Saturday · 10:00 AM–10:00 PM<br />We usually reply within one working day.</div>
        </aside>

        <div className="rounded-3xl p-6 shadow-xl sm:p-8" style={{ backgroundColor: "var(--color-surface)", border: "1px solid rgba(0,119,204,0.14)", boxShadow: "0 18px 55px rgba(0,85,160,0.1)" }}>
          {status === "success" ? <div className="flex min-h-[390px] flex-col items-center justify-center text-center"><span className="flex h-16 w-16 items-center justify-center rounded-full bg-cyan-100 text-[#0077cc]"><CheckCircle2 size={34} /></span><h2 className="mt-6 text-3xl font-bold" style={{ color: "var(--color-text)", fontFamily: "var(--font-display)" }}>Message received.</h2><p className="mt-3 max-w-sm" style={{ color: "var(--color-text-muted)" }}>Thank you. Our team will get back to you shortly.</p><button className="btn-outline mt-7" onClick={() => setStatus("idle")}>Send another message</button></div> : <form onSubmit={submit} className="space-y-5"><div><p className="text-xs font-bold tracking-[0.18em]" style={{ color: "var(--color-primary)" }}>FREE COUNSELLING</p><h2 className="mt-2 text-3xl font-bold" style={{ color: "var(--color-text)", fontFamily: "var(--font-display)" }}>Tell us a little about yourself.</h2></div>
            <div className="grid gap-5 sm:grid-cols-2"><label className="text-sm font-semibold" style={{ color: "var(--color-text)" }}>Your name<input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={`${inputClass} mt-2`} style={inputStyle} placeholder="Your full name" /></label><label className="text-sm font-semibold" style={{ color: "var(--color-text)" }}>Email address<input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={`${inputClass} mt-2`} style={inputStyle} placeholder="you@example.com" /></label></div>
            <div className="grid gap-5 sm:grid-cols-2"><label className="text-sm font-semibold" style={{ color: "var(--color-text)" }}>Phone <span className="font-normal">(optional)</span><input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={`${inputClass} mt-2`} style={inputStyle} placeholder="03xx xxx xxxx" /></label><label className="text-sm font-semibold" style={{ color: "var(--color-text)" }}>Course <span className="font-normal">(optional)</span><select value={form.course} onChange={(e) => setForm({ ...form, course: e.target.value })} className={`${inputClass} mt-2`} style={inputStyle}><option value="">I need guidance</option>{COURSES.map((course) => <option key={course.id} value={course.name}>{course.name}</option>)}</select></label></div>
            <label className="block text-sm font-semibold" style={{ color: "var(--color-text)" }}>What would you like to achieve?<textarea required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={`${inputClass} mt-2 min-h-32 resize-y`} style={inputStyle} placeholder="Tell us your goal or ask a question." /></label>
            {status === "error" && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
            <button disabled={status === "sending"} className="btn-primary flex w-full items-center justify-center gap-2 disabled:opacity-70">{status === "sending" ? "Sending…" : <>Send message <ArrowRight size={18} /></>}</button><p className="text-center text-xs" style={{ color: "var(--color-text-muted)" }}>Your details are used only to respond to your enquiry.</p>
          </form>}
        </div>
      </div>
    </section>
  </main><Footer /></>;
}
