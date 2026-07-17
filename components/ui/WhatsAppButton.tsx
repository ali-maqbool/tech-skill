"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SOCIAL_LINKS } from "@/data/contacts";

const WHATSAPP_URL = SOCIAL_LINKS.find((s) => s.icon === "whatsapp")?.url ?? "https://wa.me/923215544687";

// Tooltip fades in after 3 s and stays until the user hovers or clicks
const TOOLTIP_DELAY = 3000;

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [hovered, setHovered] = useState(false);

  // Show tooltip automatically after a short delay on first load
  useEffect(() => {
    const t = setTimeout(() => setShowTooltip(true), TOOLTIP_DELAY);
    return () => clearTimeout(t);
  }, []);

  // Hide tooltip once the user interacts
  const handleClick = () => setShowTooltip(false);

  return (
    <div
      style={{
        position: "fixed",
        bottom: "1.5rem",
        right: "1.5rem",
        zIndex: 9998,
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        pointerEvents: "none", // container is click-through; children re-enable
      }}
    >
      {/* Tooltip */}
      <AnimatePresence>
        {(showTooltip || hovered) && (
          <motion.div
            key="tooltip"
            initial={{ opacity: 0, x: 12, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 8, scale: 0.95 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            style={{
              pointerEvents: "none",
              background: "#ffffff",
              border: "1px solid rgba(0,0,0,0.08)",
              borderRadius: "10px",
              padding: "0.5rem 0.875rem",
              boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
              whiteSpace: "nowrap",
              fontSize: "0.875rem",
              fontWeight: 600,
              color: "#075E54",
              lineHeight: 1.3,
            }}
          >
            Chat with us on WhatsApp
            {/* Tail */}
            <span
              style={{
                position: "absolute",
                right: "-6px",
                top: "50%",
                transform: "translateY(-50%)",
                width: 0,
                height: 0,
                borderTop: "6px solid transparent",
                borderBottom: "6px solid transparent",
                borderLeft: "6px solid #ffffff",
                filter: "drop-shadow(1px 0 0 rgba(0,0,0,0.06))",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main button */}
      <motion.a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Tech Skill on WhatsApp"
        onClick={handleClick}
        onMouseEnter={() => { setHovered(true); setShowTooltip(false); }}
        onMouseLeave={() => setHovered(false)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1 }}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.93 }}
        style={{
          pointerEvents: "auto",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "58px",
          height: "58px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
          boxShadow: "0 6px 24px rgba(37,211,102,0.45), 0 2px 8px rgba(0,0,0,0.12)",
          textDecoration: "none",
          cursor: "pointer",
          flexShrink: 0,
        }}
      >
        {/* Pulse ring */}
        <span
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: "2px solid rgba(37,211,102,0.6)",
            animation: "wa-pulse 2s ease-out infinite",
          }}
          aria-hidden="true"
        />

        {/* WhatsApp SVG icon */}
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          aria-hidden="true"
        >
          <circle cx="16" cy="16" r="16" fill="transparent" />
          <path
            d="M16 4C9.373 4 4 9.373 4 16c0 2.167.558 4.2 1.535 5.97L4 28l6.21-1.516A11.955 11.955 0 0 0 16 28c6.627 0 12-5.373 12-12S22.627 4 16 4Z"
            fill="white"
            fillOpacity="0.15"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M22.46 9.54A8.9 8.9 0 0 0 16 7C11.03 7 7 11.03 7 16a8.96 8.96 0 0 0 1.3 4.68L7 25l4.46-1.28A8.96 8.96 0 0 0 16 25c4.97 0 9-4.03 9-9a8.9 8.9 0 0 0-2.54-6.46ZM16 23.5a7.47 7.47 0 0 1-3.8-1.03l-.27-.16-2.8.8.8-2.73-.18-.28A7.47 7.47 0 0 1 8.5 16c0-4.14 3.36-7.5 7.5-7.5 2 0 3.88.78 5.3 2.2A7.46 7.46 0 0 1 23.5 16c0 4.14-3.36 7.5-7.5 7.5Zm4.12-5.63c-.23-.11-1.34-.66-1.55-.73-.2-.08-.35-.11-.5.11-.15.22-.58.73-.71.88-.13.15-.26.17-.49.06-.22-.11-.95-.35-1.8-1.12-.67-.6-1.12-1.33-1.25-1.56-.13-.22-.01-.34.1-.45.1-.1.22-.26.33-.39.11-.13.15-.22.22-.37.08-.15.04-.28-.02-.39-.06-.11-.5-1.2-.68-1.64-.18-.43-.36-.37-.5-.38h-.42c-.15 0-.39.06-.59.28-.2.22-.78.76-.78 1.86s.8 2.16.91 2.31c.11.15 1.57 2.4 3.8 3.37.53.23.94.37 1.26.47.53.17 1.01.14 1.39.09.42-.06 1.3-.53 1.48-1.04.18-.51.18-.95.13-1.04-.05-.09-.2-.15-.42-.26Z"
            fill="white"
          />
        </svg>
      </motion.a>

      {/* Pulse keyframe injected inline */}
      <style>{`
        @keyframes wa-pulse {
          0%   { transform: scale(1);   opacity: 0.8; }
          70%  { transform: scale(1.45); opacity: 0; }
          100% { transform: scale(1.45); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
