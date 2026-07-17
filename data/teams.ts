// ─────────────────────────────────────────────────────────────────────────────
// data/teams.ts — Single source of truth for all team content.
//
// HOW TO MAINTAIN:
//   • To add a team member  → append an object to teamMembers. Nothing else.
//   • To remove a member    → delete their object. Nothing else.
//   • To update the founder → edit the founder object below. Nothing else.
//   • Images: place photos in /public/images/team/ and update the `image` field.
//     Current placeholders use ui-avatars.com and can be swapped at any time.
// ─────────────────────────────────────────────────────────────────────────────

export interface Founder {
  image: string;
  name: string;
  role: string;
  /** 4 lines / ~3–4 sentences displayed in the founder spotlight block. */
  bio: string;
}

export interface TeamMember {
  image: string;
  name: string;
  role: string;
}

// ── Founder spotlight (rendered above the marquee slideshow) ──────────────────
export const founder: Founder = {
  image: "/ali.png",
  name: "Ali Maqbool",
  role: "Founder, Tech Skill · SEO, Fast Marketing Agency",
  bio: "Ali leads Tech Skill’s practical learning vision and brings hands-on digital growth experience from Fast Marketing Agency into every programme.",
  /*
    "Ali founded Tech Skill with a single conviction: that world-class digital skills should be within reach of every ambitious person in Pakistan. " +
    "With over a decade of industry experience across web development, digital marketing, and creative production, he built the curriculum from real-world practice — not textbooks. " +
    "He oversees every programme, ensuring graduates leave with portfolios employers actually care about. " +
    "His placement network has connected more than a thousand students to freelance clients and full-time roles since the institute opened.", */
};

// ── Team members (each becomes one card in the marquee slideshow) ─────────────
// Replace placeholder `image` URLs with real /public/images/team/ paths when photos are ready.
export const teamMembers: TeamMember[] = [
  {
    image: "/muneeb.png",
    name: "Muhammad Muneeb Aamir",
    role: "Web Developement Instructor",
  },
  {
    image: "/girl-1.png",
    name: "Sana Ahmed",
    role: "Graphic Design Instructor",
  },
  {
    image: "/fahad.png",
    name: "Fahad Maqbool",
    role: "Graphic Design Instructor",
  },
  {
    image: "/girl 6.png",
    name: "Muskan Manzoor",
    role: "Digital Marketing Lead",
  },
  {
    image: "/girl 8.png",
    name: "Zara Noor",
    role: "Career Counsellor",
  },
  {
    image: "/girl.png",
    name: "Nida Tehmeen",
    role: "Video Editing Instructor",
  },
  {
    image: "/girl 2.png",
    name: "Nadia Qureshi",
    role: "Freelancing Mentor",
  },
];
