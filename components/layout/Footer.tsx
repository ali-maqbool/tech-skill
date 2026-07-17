"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { CONTACT_INFO, SOCIAL_LINKS } from "@/data/contacts";

/* ── Framer Motion variants ───────────────────────────────── */
const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/* ── SVG icon components ──────────────────────────────────── */
function WhatsAppIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      width="20"
      height="20"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.138.563 4.14 1.534 5.876L0 24l6.304-1.513A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.896 0-3.67-.5-5.207-1.378l-.374-.22-3.743.898.934-3.638-.243-.386A9.944 9.944 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      width="20"
      height="20"
      aria-hidden="true"
    >
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.413c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      width="20"
      height="20"
      aria-hidden="true"
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

const ICON_MAP: Record<string, React.ReactNode> = {
  whatsapp: <WhatsAppIcon />,
  facebook: <FacebookIcon />,
  instagram: <InstagramIcon />,
};

const QUICK_LINKS = [
  { label: "Courses", href: "/#courses" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/* ── Footer component ─────────────────────────────────────── */
export default function Footer() {
  const prefersReduced = useReducedMotion();

  const phoneHref = `tel:${CONTACT_INFO.phone.replace(/\s/g, "")}`;

  return (
    <footer
      
      style={{ borderTop: "3px solid #00aaff", backgroundColor:"#dfefff8d" }}
      aria-label="Site footer"
    >
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Three-column grid — each column animates in with stagger */}
        <motion.div
          variants={prefersReduced ? undefined : staggerContainer}
          initial={prefersReduced ? undefined : "hidden"}
          whileInView={prefersReduced ? undefined : "visible"}
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
        >
          {/* ── Column 1: Brand ─────────────────────────────── */}
          <motion.div
            variants={prefersReduced ? undefined : fadeInUp}
            className="flex flex-col gap-3"
          >
            {/* Logo — inverted to white for clean visibility on dark background */}
            <a href="/" aria-label={`${CONTACT_INFO.instituteName} — back to top`}>
              <Image
                src="/logo.png"
                alt={`${CONTACT_INFO.instituteName} logo`}
                width={130}
                height={44}
                style={{
                  height: "36px",
                  width: "auto",
                  objectFit: "contain",
                  display: "block",
                 
                }}
              />
            </a>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--color-text-muted)" }}
            >
              Empowering Skills for a Digital Future
            </p>
            <a
              href={phoneHref}
              className="text-sm font-medium transition-colors duration-200 w-fit"
              style={{ color: "var(--color-primary)" }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color =
                  "var(--color-accent)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color =
                  "var(--color-primary)")
              }
            >
              {CONTACT_INFO.phone}
            </a>
          </motion.div>

          {/* ── Column 2: Quick Links ────────────────────────── */}
          <motion.div
            variants={prefersReduced ? undefined : fadeInUp}
            className="flex flex-col gap-3"
          >
            <h3
              className="text-sm font-semibold uppercase tracking-widest"
              style={{ color: "var(--color-text-muted)" }}
            >
              Quick Links
            </h3>
            <nav aria-label="Footer navigation">
              <ul className="flex flex-col gap-2 list-none m-0 p-0">
                {QUICK_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm transition-colors duration-200"
                      style={{ color: "var(--color-text)" }}
                      onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLAnchorElement).style.color =
                          "var(--color-primary)")
                      }
                      onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLAnchorElement).style.color =
                          "var(--color-text)")
                      }
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>

          {/* ── Column 3: Social Links ───────────────────────── */}
          <motion.div
            variants={prefersReduced ? undefined : fadeInUp}
            className="flex flex-col gap-3"
          >
            <h3
              className="text-sm font-semibold uppercase tracking-widest"
              style={{ color: "var(--color-text-muted)" }}
            >
              Follow Us
            </h3>
            <div className="flex gap-4">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit our ${social.platform} page`}
                  className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200"
                  style={{
                    color: "var(--color-text-muted)",
                    border: "1px solid rgba(160, 188, 200, 0.35)",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.color = "var(--color-primary)";
                    el.style.borderColor = "var(--color-primary)";
                    el.style.backgroundColor = "rgba(0,170,255,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.color = "var(--color-text-muted)";
                    el.style.borderColor = "rgba(160, 188, 200, 0.35)";
                    el.style.backgroundColor = "transparent";
                  }}
                >
                  {ICON_MAP[social.icon] ?? (
                    <span className="text-xs font-bold">
                      {social.platform[0]}
                    </span>
                  )}
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* ── Bottom bar ───────────────────────────────────── */}
        <div
          className="mt-10 pt-6"
          style={{ borderTop: "1px solid rgba(160, 188, 200, 0.15)" }}
        >
          <p
            className="text-center text-xs"
            style={{ color: "var(--color-text-muted)" }}
          >
            © 2025 {CONTACT_INFO.instituteName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
