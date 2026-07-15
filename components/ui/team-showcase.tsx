"use client";

import { useState } from "react";
import Image from "next/image";
import { FaLinkedinIn, FaTwitter, FaInstagram } from "react-icons/fa";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  /** URL to the member's photo.
   *  Default placeholder: https://ui-avatars.com/api/?name=First+Last&background=0077cc&color=fff&size=400
   *  Easy to swap: just replace `image` with a real URL when ready.
   */
  image: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
}

// ─── Team data — update names/roles/images when real photos are available ─────
const DEFAULT_MEMBERS: TeamMember[] = [
  {
    id: "1",
    name: "Ali Maqbool",
    role: "Director & Founder",
    image: "ali-maqbool.jpeg",
    social: { linkedin: "#", twitter: "#" },
  },
  {
    id: "2",
    name: "Sara Ahmed",
    role: "Head of Academics",
    image: "https://ui-avatars.com/api/?name=Sara+Ahmed&background=005fa3&color=fff&size=400&bold=true",
    social: { linkedin: "#", instagram: "#" },
  },
  {
    id: "3",
    name: "Bilal Raza",
    role: "Lead Instructor – Web Dev",
    image: "https://ui-avatars.com/api/?name=Bilal+Raza&background=0091e6&color=fff&size=400&bold=true",
    social: { linkedin: "#", twitter: "#" },
  },
  {
    id: "4",
    name: "Hina Malik",
    role: "Graphic Design Instructor",
    image: "https://ui-avatars.com/api/?name=Hina+Malik&background=0077cc&color=fff&size=400&bold=true",
    social: { linkedin: "#", instagram: "#" },
  },
  {
    id: "5",
    name: "Faisal Siddiqui",
    role: "Digital Marketing Lead",
    image: "https://ui-avatars.com/api/?name=Faisal+Siddiqui&background=005fa3&color=fff&size=400&bold=true",
    social: { linkedin: "#", twitter: "#" },
  },
  {
    id: "6",
    name: "Zara Noor",
    role: "Career Counsellor",
    image: "https://ui-avatars.com/api/?name=Zara+Noor&background=0091e6&color=fff&size=400&bold=true",
    social: { linkedin: "#", instagram: "#" },
  },
];

interface TeamShowcaseProps {
  members?: TeamMember[];
}

// ─── Main component ────────────────────────────────────────────────────────────

export default function TeamShowcase({ members = DEFAULT_MEMBERS }: TeamShowcaseProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Split into 3 staggered columns
  const col1 = members.filter((_, i) => i % 3 === 0);
  const col2 = members.filter((_, i) => i % 3 === 1);
  const col3 = members.filter((_, i) => i % 3 === 2);

  return (
    <div
      className="flex flex-col md:flex-row items-start gap-8 md:gap-10 lg:gap-14 select-none w-full max-w-5xl mx-auto"
      style={{ fontFamily: "var(--font-sans, inherit)" }}
    >
      {/* ── Left: staggered photo grid ── */}
      <div className="flex gap-2 md:gap-3 flex-shrink-0 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 justify-center md:justify-start">
        {/* Column 1 */}
        <div className="flex flex-col gap-2 md:gap-3">
          {col1.map((member) => (
            <PhotoCard
              key={member.id}
              member={member}
              className="w-[100px] h-[110px] sm:w-[120px] sm:h-[130px] md:w-[145px] md:h-[158px]"
              hoveredId={hoveredId}
              onHover={setHoveredId}
            />
          ))}
        </div>

        {/* Column 2 — offset down */}
        <div className="flex flex-col gap-2 md:gap-3 mt-[44px] sm:mt-[54px] md:mt-[64px]">
          {col2.map((member) => (
            <PhotoCard
              key={member.id}
              member={member}
              className="w-[110px] h-[120px] sm:w-[132px] sm:h-[142px] md:w-[160px] md:h-[172px]"
              hoveredId={hoveredId}
              onHover={setHoveredId}
            />
          ))}
        </div>

        {/* Column 3 — half offset */}
        <div className="flex flex-col gap-2 md:gap-3 mt-[20px] sm:mt-[24px] md:mt-[30px]">
          {col3.map((member) => (
            <PhotoCard
              key={member.id}
              member={member}
              className="w-[104px] h-[114px] sm:w-[125px] sm:h-[135px] md:w-[150px] md:h-[162px]"
              hoveredId={hoveredId}
              onHover={setHoveredId}
            />
          ))}
        </div>
      </div>

      {/* ── Right: name + role list ── */}
      <div className="flex flex-col sm:grid sm:grid-cols-2 md:flex md:flex-col gap-4 md:gap-5 flex-1 w-full pt-0 md:pt-2">
        {members.map((member) => (
          <MemberRow
            key={member.id}
            member={member}
            hoveredId={hoveredId}
            onHover={setHoveredId}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Photo card ────────────────────────────────────────────────────────────────

function PhotoCard({
  member,
  className,
  hoveredId,
  onHover,
}: {
  member: TeamMember;
  className: string;
  hoveredId: string | null;
  onHover: (id: string | null) => void;
}) {
  const isActive = hoveredId === member.id;
  const isDimmed = hoveredId !== null && !isActive;

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl cursor-pointer flex-shrink-0 transition-all duration-300",
        className,
        isDimmed ? "opacity-50 scale-[0.97]" : "opacity-100 scale-100"
      )}
      style={{
        border: isActive
          ? "2px solid rgba(0,119,204,0.6)"
          : "2px solid rgba(0,119,204,0.15)",
        boxShadow: isActive
          ? "0 8px 24px rgba(0,119,204,0.25)"
          : "0 2px 8px rgba(0,0,0,0.06)",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={() => onHover(member.id)}
      onMouseLeave={() => onHover(null)}
    >
      <Image
        src={member.image}
        alt={member.name}
        fill
        className="object-cover transition-all duration-500"
        sizes="(max-width: 480px) 100px, (max-width: 768px) 120px, 145px"
        style={{
          filter: isActive
            ? "grayscale(0) brightness(1.02)"
            : "grayscale(0.15) brightness(0.92)",
        }}
      />
    </div>
  );
}

// ─── Member name row ────────────────────────────────────────────────────────────

function MemberRow({
  member,
  hoveredId,
  onHover,
}: {
  member: TeamMember;
  hoveredId: string | null;
  onHover: (id: string | null) => void;
}) {
  const isActive = hoveredId === member.id;
  const isDimmed = hoveredId !== null && !isActive;

  const hasSocial =
    member.social?.twitter ??
    member.social?.linkedin ??
    member.social?.instagram;

  return (
    <div
      className={cn(
        "cursor-pointer transition-opacity duration-300",
        isDimmed ? "opacity-40" : "opacity-100"
      )}
      onMouseEnter={() => onHover(member.id)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Name + accent bar + social icons */}
      <div className="flex items-center gap-2.5">
        {/* Accent bar */}
        <span
          className="h-3 rounded-[5px] flex-shrink-0 transition-all duration-300"
          style={{
            width: isActive ? "20px" : "14px",
            backgroundColor: isActive
              ? "var(--color-primary)"
              : "rgba(0,119,204,0.25)",
          }}
        />

        {/* Name */}
        <span
          className="text-base md:text-[17px] font-semibold leading-none tracking-tight transition-colors duration-300"
          style={{
            color: isActive ? "var(--color-primary)" : "var(--color-text)",
            fontFamily: "var(--font-display, inherit)",
          }}
        >
          {member.name}
        </span>

        {/* Social icons — slide in on hover */}
        {hasSocial && (
          <div
            className={cn(
              "flex items-center gap-1.5 ml-0.5 transition-all duration-200",
              isActive
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-2 pointer-events-none"
            )}
          >
            {member.social?.twitter && (
              <a
                href={member.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1 rounded transition-all duration-150 hover:scale-110"
                style={{ color: "var(--color-text-muted)" }}
                title="X / Twitter"
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.color =
                    "var(--color-primary)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.color =
                    "var(--color-text-muted)")
                }
              >
                <FaTwitter size={10} />
              </a>
            )}
            {member.social?.linkedin && (
              <a
                href={member.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1 rounded transition-all duration-150 hover:scale-110"
                style={{ color: "var(--color-text-muted)" }}
                title="LinkedIn"
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.color =
                    "var(--color-primary)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.color =
                    "var(--color-text-muted)")
                }
              >
                <FaLinkedinIn size={10} />
              </a>
            )}
            {member.social?.instagram && (
              <a
                href={member.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1 rounded transition-all duration-150 hover:scale-110"
                style={{ color: "var(--color-text-muted)" }}
                title="Instagram"
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.color =
                    "var(--color-primary)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.color =
                    "var(--color-text-muted)")
                }
              >
                <FaInstagram size={10} />
              </a>
            )}
          </div>
        )}
      </div>

      {/* Role */}
      <p
        className="mt-1.5 pl-[27px] text-[9px] md:text-[10px] font-semibold uppercase tracking-[0.2em]"
        style={{ color: "var(--color-text-muted)" }}
      >
        {member.role}
      </p>
    </div>
  );
}
