"use client";

import { useState, useId } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { viewportOnce } from "@/components/animations/motionVariants";
import { CONTACT_INFO, SOCIAL_LINKS } from "@/data/contacts";
import { COURSES } from "@/data/courses";

/* ── SVG icons ──────────────────────────────────────────────── */
function PhoneIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} width={20} height={20} aria-hidden="true"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
function WhatsAppIcon() {
  return <svg viewBox="0 0 24 24" fill="currentColor" width={20} height={20} aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.138.563 4.14 1.534 5.876L0 24l6.304-1.513A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.896 0-3.67-.5-5.207-1.378l-.374-.22-3.743.898.934-3.638-.243-.386A9.944 9.944 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>;
}
function EmailIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} width={20} height={20} aria-hidden="true"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
function MapPinIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} width={20} height={20} aria-hidden="true"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeLinecap="round" strokeLinejoin="round" /><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
function CheckCircleIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width={16} height={16} aria-hidden="true"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

/* ── Floating-label input ───────────────────────────────────── */
function FloatInput({
  id, label, type = "text", value, onChange, required, as,
}: {
  id: string; label: string; type?: string;
  value: string; onChange: (v: string) => void;
  required?: boolean; as?: "textarea" | "select";
}) {
  const filled = value.length > 0;
  const base: React.CSSProperties = {
    width: "100%",
    background: "rgba(0,170,255,0.05)",
    border: "1px solid rgba(0,170,255,0.2)",
    borderRadius: "8px",
    padding: as === "textarea" ? "1.5rem 0.875rem 0.625rem" : "1.5rem 0.875rem 0.5rem",
    color: "#fff",
    fontSize: "0.9375rem",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
    resize: as === "textarea" ? "vertical" : undefined,
    minHeight: as === "textarea" ? "100px" : undefined,
  };

  const labelStyle: React.CSSProperties = {
    position: "absolute",
    left: "0.875rem",
    top: filled ? "0.45rem" : "50%",
    transform: filled ? "none" : "translateY(-50%)",
    fontSize: filled ? "0.7rem" : "0.9375rem",
    color: "var(--color-text-muted)",
    pointerEvents: "none",
    transition: "all 0.18s ease",
    lineHeight: 1,
  };

  const handleFocus = (e: React.FocusEvent<HTMLElement>) => {
    (e.currentTarget as HTMLElement).style.borderColor = "#00aaff";
    (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 3px rgba(0,170,255,0.15)";
    const lbl = e.currentTarget.parentElement?.querySelector("label") as HTMLElement;
    if (lbl) { lbl.style.top = "0.45rem"; lbl.style.fontSize = "0.7rem"; lbl.style.transform = "none"; }
  };
  const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
    (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,170,255,0.2)";
    (e.currentTarget as HTMLElement).style.boxShadow = "none";
    if (!filled) {
      const lbl = e.currentTarget.parentElement?.querySelector("label") as HTMLElement;
      if (lbl) { lbl.style.top = "50%"; lbl.style.fontSize = "0.9375rem"; lbl.style.transform = "translateY(-50%)"; }
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <label htmlFor={id} style={labelStyle}>{label}</label>
      {as === "textarea" ? (
        <textarea
          id={id} required={required} value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={handleFocus} onBlur={handleBlur}
          style={base}
        />
      ) : as === "select" ? (
        <select
          id={id} required={required} value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={handleFocus} onBlur={handleBlur}
          style={{ ...base, paddingTop: "1.25rem" }}
        >
          <option value="" />
          {COURSES.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
        </select>
      ) : (
        <input
          id={id} type={type} required={required} value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={handleFocus} onBlur={handleBlur}
          style={base}
        />
      )}
    </div>
  );
}

/* ── Quick-contact channel ──────────────────────────────────── */
function Channel({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href: string }) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      style={{
        display: "flex", alignItems: "center", gap: "0.875rem",
        padding: "0.875rem 1rem",
        backgroundColor: "rgba(0,170,255,0.05)",
        border: "1px solid rgba(0,170,255,0.15)",
        borderRadius: "10px",
        textDecoration: "none",
        transition: "border-color 0.2s, background 0.2s",
        color: "inherit",
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(0,170,255,0.5)"; (e.currentTarget as HTMLAnchorElement).style.background = "rgba(0,170,255,0.1)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(0,170,255,0.15)"; (e.currentTarget as HTMLAnchorElement).style.background = "rgba(0,170,255,0.05)"; }}
    >
      <span style={{ color: "var(--color-primary)", flexShrink: 0 }}>{icon}</span>
      <div>
        <p style={{ margin: 0, fontSize: "0.7rem", color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</p>
        <p style={{ margin: 0, fontSize: "0.9rem", color: "#006699", fontWeight: 600 }}>{value}</p>
      </div>
    </a>
  );
}

/* ── Trust chip ─────────────────────────────────────────────── */
function TrustChip({ text }: { text: string }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: "0.35rem",
      backgroundColor: "rgba(0,170,255,0.08)",
      border: "1px solid rgba(0,170,255,0.2)",
      borderRadius: "999px",
      padding: "0.3rem 0.75rem",
      fontSize: "0.78rem",
      color: "var(--color-text-muted)",
    }}>
      <span style={{ color: "var(--color-primary)" }}><CheckCircleIcon /></span>
      {text}
    </span>
  );
}

/* ── Main component ─────────────────────────────────────────── */
export default function ContactSection() {
  const prefersReduced = useReducedMotion();
  const uid = useId();

  const [form, setForm] = useState({ name: "", email: "", phone: "", course: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const set = (k: keyof typeof form) => (v: string) => setForm(f => ({ ...f, [k]: v }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    // EmailJS or direct submit — placeholder; swap in real credentials
    await new Promise(r => setTimeout(r, 1200));
    setStatus("success");
  }

  const revealVariant = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      style={{ backgroundColor: "var(--color-background)", padding: "5rem 0", position: "relative", overflow: "hidden" }}
    >
      {/* Ambient blob background */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: "-10%", left: "-5%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle,rgba(0,170,255,0.07) 0%,transparent 70%)", filter: "blur(60px)", animation: "drift 18s ease-in-out infinite" }} />
        <div style={{ position: "absolute", bottom: "-10%", right: "-5%", width: "420px", height: "420px", borderRadius: "50%", background: "radial-gradient(circle,rgba(0,204,255,0.07) 0%,transparent 70%)", filter: "blur(60px)", animation: "drift 22s ease-in-out infinite reverse" }} />
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem", position: "relative" }}>

        {/* Section header */}
        <motion.div
          variants={prefersReduced ? undefined : { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
          initial={prefersReduced ? undefined : "hidden"}
          whileInView={prefersReduced ? undefined : "visible"}
          viewport={viewportOnce}
          style={{ textAlign: "center", marginBottom: "3.5rem" }}
        >
          <motion.p variants={prefersReduced ? undefined : revealVariant}
            style={{ color: "var(--color-primary)", fontWeight: 600, fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
            Get in Touch
          </motion.p>
          <motion.h2 id="contact-heading" variants={prefersReduced ? undefined : revealVariant}
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 700, color: "#3e6aa8ff", lineHeight: 1.15, margin: "0 0 1rem" }}>
            Let&apos;s Talk About Your Future
          </motion.h2>
          <motion.p variants={prefersReduced ? undefined : revealVariant}
            style={{ color: "var(--color-text-muted)", fontSize: "1rem", lineHeight: 1.65, maxWidth: "500px", margin: "0 auto" }}>
            We respond within 24 hours. No obligation — just a conversation about your goals.
          </motion.p>
        </motion.div>

        {/* Two-column layout */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "2.5rem", alignItems: "start" }}>

          {/* LEFT — form */}
          <motion.div
            variants={prefersReduced ? undefined : { hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } } }}
            initial={prefersReduced ? undefined : "hidden"}
            whileInView={prefersReduced ? undefined : "visible"}
            viewport={viewportOnce}
          >
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem", padding: "3rem 1rem", textAlign: "center" }}
                >
                  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" aria-hidden="true">
                    <circle cx="32" cy="32" r="30" stroke="rgba(0,170,255,0.3)" strokeWidth="2" />
                    <motion.path
                      d="M18 33 L28 43 L46 22"
                      fill="none"
                      stroke="#00aaff"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: 0.15 }}
                    />
                  </svg>
                  <h3 style={{ color: "#fff", fontFamily: "var(--font-display)", fontSize: "1.4rem", margin: 0 }}>Message Sent!</h3>
                  <p style={{ color: "var(--color-text-muted)", margin: 0 }}>Thanks — we&apos;ll reach out within 24 hours.</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={handleSubmit}
                  style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}
                >
                  <FloatInput id={`${uid}-name`} label="Your Name" value={form.name} onChange={set("name")} required />
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <FloatInput id={`${uid}-email`} label="Email" type="email" value={form.email} onChange={set("email")} required />
                    <FloatInput id={`${uid}-phone`} label="Phone" type="tel" value={form.phone} onChange={set("phone")} />
                  </div>
                  <FloatInput id={`${uid}-course`} label="Course Interested In" as="select" value={form.course} onChange={set("course")} />
                  <FloatInput id={`${uid}-msg`} label="Message (optional)" as="textarea" value={form.message} onChange={set("message")} />

                  {/* CTA button */}
                  <div style={{ position: "relative" }}>
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      style={{
                        width: "100%",
                        padding: "0.875rem 2rem",
                        background: "var(--color-primary)",
                        color: "#fff",
                        fontWeight: 700,
                        fontSize: "1rem",
                        border: "none",
                        borderRadius: "8px",
                        cursor: status === "submitting" ? "not-allowed" : "pointer",
                        opacity: status === "submitting" ? 0.8 : 1,
                        transition: "background 0.2s, transform 0.15s, box-shadow 0.2s",
                        position: "relative",
                        overflow: "hidden",
                      }}
                      onMouseEnter={(e) => { if (status !== "submitting") { (e.currentTarget as HTMLButtonElement).style.background = "var(--color-accent)"; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 24px rgba(0,170,255,0.4)"; } }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "var(--color-primary)"; (e.currentTarget as HTMLButtonElement).style.transform = "none"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "none"; }}
                    >
                      {status === "submitting" ? "Sending…" : "Book a Free Counselling Call"}
                    </button>
                  </div>

                  {/* Trust chips */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "0.25rem" }}>
                    {["Response within 24 hours", "No obligation", "Free guidance"].map(t => <TrustChip key={t} text={t} />)}
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* RIGHT — quick-contact */}
          <motion.div
            variants={prefersReduced ? undefined : { hidden: { opacity: 0, x: 30 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.1 } } }}
            initial={prefersReduced ? undefined : "hidden"}
            whileInView={prefersReduced ? undefined : "visible"}
            viewport={viewportOnce}
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <p style={{ color: "var(--color-text-muted)", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>
              Prefer to reach out directly?
            </p>

            <Channel icon={<PhoneIcon />} label="Call Us" value={CONTACT_INFO.phone} href={`tel:${CONTACT_INFO.phone.replace(/\s/g,"")}`} />
            <Channel icon={<WhatsAppIcon />} label="WhatsApp" value="Chat Now" href={SOCIAL_LINKS.find(s=>s.icon==="whatsapp")?.url ?? "#"} />
            <Channel icon={<EmailIcon />} label="Email" value="info@techskill.pk" href="mailto:info@techskill.pk" />
            <Channel icon={<MapPinIcon />} label="Visit Us" value="G-10 Markaz, Islamabad, Pakistan" href="#" />

            <div style={{ marginTop: "1rem", padding: "1.25rem", backgroundColor: "rgba(0,170,255,0.06)", border: "1px solid rgba(0,170,255,0.15)", borderRadius: "10px" }}>
              <p style={{ color: "var(--color-text-muted)", fontSize: "0.8rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 0.5rem" }}>Office Hours</p>
              <p style={{ color: "#103b76ff", fontSize: "0.9rem", margin: 0 }}>Monday – Saturday: 10:00 AM – 10:00 PM</p>
              <p style={{ color: "var(--color-text-muted)", fontSize: "0.8rem", margin: "0.25rem 0 0" }}>Sunday: Closed</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
