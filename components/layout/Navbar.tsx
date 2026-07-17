"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CONTACT_INFO } from "@/data/contacts";

interface NavbarProps {
  onRegisterClick?: () => void;
}

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/#courses" },
  { label: "Outcomes", href: "/#outcomes" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar({ onRegisterClick }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const prefersReduced = useReducedMotion();

  // ── Active section detection ──────────────────────────────────────────────
  // Strategy: on every scroll event, find which section's top edge is closest
  // to (but still below) the navbar bottom (64px). This is immune to the
  // IntersectionObserver "fires from below" false-positive bug.
  useEffect(() => {
    const NAVBAR_HEIGHT = 68; // px — slight buffer above the 64px navbar
    const ALL_SECTIONS = [
      "courses",
      "outcomes",
    ];

    function updateActive() {
      const scrollY = window.scrollY;

      // If near the very top of the page → no active section
      if (scrollY < 80) {
        setActiveSection("");
        return;
      }

      // Find the last section whose top is at or above the current scroll + navbar
      let current = "";
      for (const id of ALL_SECTIONS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + scrollY;
        if (top - NAVBAR_HEIGHT <= scrollY) {
          current = id;
        }
      }
      setActiveSection(current);
    }

    // Run once on mount and on every scroll
    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    return () => window.removeEventListener("scroll", updateActive);
  }, []);


  return (
    <motion.header
      initial={prefersReduced ? false : { y: -80, opacity: 0 }}
      animate={prefersReduced ? {} : { y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 w-full backdrop-blur-md shadow-sm"
      style={{ backgroundColor: "#eaf6ffa9" }}
    >
      <nav
        aria-label="Main navigation"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16"
      >
        {/* Logo image */}
        <a
          href="/"
          className="flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00aaff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1e2d3d] rounded"
          aria-label={`${CONTACT_INFO.instituteName} — go to top`}
          onClick={() => setMenuOpen(false)}
        >
          <Image
            src="/logo.png"
            alt={`${CONTACT_INFO.instituteName} logo`}
            width={140}
            height={48}
            priority
            style={{
              height: "38px",
              width: "auto",
              objectFit: "contain",
              display: "block",
            }}
          />
        </a>

        {/* Desktop nav — visible at lg and above */}
        <div className="hidden lg:flex items-center gap-6">
          <ul
            className="flex items-center gap-1 list-none m-0 p-0"
            role="list"
          >
            {NAV_LINKS.map((link) => {
              const sectionId = link.href.replace("/#", "");
              const isActive = activeSection === sectionId;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="nav-pill-link relative flex items-center px-3 py-1.5 text-sm font-semibold rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007acc] focus-visible:ring-offset-2 focus-visible:ring-offset-[#eaf6ff]"
                    style={{
                      color: isActive ? "#005fa3" : "#0d2f45",
                      backgroundColor: isActive ? "rgba(0,122,204,0.12)" : "transparent",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "rgba(0,122,204,0.09)";
                        (e.currentTarget as HTMLAnchorElement).style.color = "#005fa3";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "transparent";
                        (e.currentTarget as HTMLAnchorElement).style.color = "#0d2f45";
                      }
                    }}
                  >
                    {link.label}
                    {/* Active indicator dot */}
                    {isActive && (
                      <span
                        style={{
                          position: "absolute",
                          bottom: "2px",
                          left: "50%",
                          transform: "translateX(-50%)",
                          width: "4px",
                          height: "4px",
                          borderRadius: "50%",
                          backgroundColor: "#007acc",
                        }}
                        aria-hidden="true"
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* CTA Button */}
          <button
            type="button"
            onClick={onRegisterClick ?? (() => { window.location.href = "/#courses"; })}
            className="btn-primary text-sm"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Register Now
          </button>
        </div>

        {/* Hamburger button — visible below lg */}
        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="lg:hidden flex flex-col justify-center items-center w-11 h-11 gap-[5px] rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00aaff] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
        >
          <span
            className={`block h-[2px] rounded-full bg-[#1a3340] transition-all duration-300 origin-center ${
              menuOpen ? "w-6 translate-y-[7px] rotate-45" : "w-6"
            }`}
            aria-hidden="true"
          />
          <span
            className={`block h-[2px] rounded-full bg-[#1a3340] transition-all duration-300 ${
              menuOpen ? "w-0 opacity-0" : "w-6 opacity-100"
            }`}
            aria-hidden="true"
          />
          <span
            className={`block h-[2px] rounded-full bg-[#1a3340] transition-all duration-300 origin-center ${
              menuOpen ? "w-6 -translate-y-[7px] -rotate-45" : "w-6"
            }`}
            aria-hidden="true"
          />
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence initial={false}>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            key="mobile-drawer"
            initial={prefersReduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={
              prefersReduced ? { opacity: 1 } : { height: "auto", opacity: 1 }
            }
            exit={prefersReduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            className="lg:hidden overflow-hidden border-t border-[#b8dff5]/60 backdrop-blur-md"
            style={{ backgroundColor: "#eaf6ff" }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col gap-1">
              <ul className="list-none m-0 p-0 flex flex-col gap-1" role="list">
                {NAV_LINKS.map((link) => {
                  const sectionId = link.href.replace("/#", "");
                  const isActive = activeSection === sectionId;
                  return (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        onClick={() => setMenuOpen(false)}
                        className="block w-full py-3 px-2 text-base font-medium hover:bg-[#1a3340]/5 rounded-lg transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00aaff] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                        style={{ color: isActive ? "#007acc" : "#0d2f45" }}
                      >
                        {link.label}
                      </a>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-3 pt-3 border-t border-[#1a3340]/10">
                <button
                  type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      if (onRegisterClick) onRegisterClick();
                      else window.location.href = "/#courses";
                    }}
                  className="btn-primary w-full text-sm"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Register Now
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
