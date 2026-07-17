// ─────────────────────────────────────────────────────────────────────────────
// data/students.ts — Single source of truth for the student showcase.
//
// HOW TO MAINTAIN:
//   • To add a student   → append one object to the array below. Nothing else.
//   • To remove a student → delete their object. Nothing else.
//   • To update a photo  → change the `image` field. Nothing else.
//   The component file (StudentShowcase.tsx) is never edited for content changes.
// ─────────────────────────────────────────────────────────────────────────────

export interface Student {
  image: string;
  name: string;
  role: string;
  review: string;
}

// Replace placeholder URLs with real photos when available.
// ui-avatars.com generates initials-based images — swap `image` in place.
export const students: Student[] = [
  {
    image: "https://ui-avatars.com/api/?name=Ahmed+Raza&background=0077cc&color=fff&size=400&bold=true",
    name: "Ahmed Raza",
    role: "Junior Developer",
    review: "I gained the confidence to take on real client work.",
  },
  {
    image: "https://ui-avatars.com/api/?name=Sana+Malik&background=005fa3&color=fff&size=400&bold=true",
    name: "Sana Malik",
    role: "Freelance Designer",
    review: "My portfolio finally feels professional and useful.",
  },
  {
    image: "https://ui-avatars.com/api/?name=Usman+Tariq&background=0091e6&color=fff&size=400&bold=true",
    name: "Usman Tariq",
    role: "Digital Marketer",
    review: "The hands-on projects made every lesson click.",
  },
  {
    image: "https://ui-avatars.com/api/?name=Zara+Hussain&background=004d99&color=fff&size=400&bold=true",
    name: "Zara Hussain",
    role: "Video Editor",
    review: "I learned skills I could apply from day one.",
  },
  {
    image: "https://ui-avatars.com/api/?name=Bilal+Sheikh&background=0077cc&color=fff&size=400&bold=true",
    name: "Bilal Sheikh",
    role: "Upwork Freelancer",
    review: "The freelancing guidance gave me a clear start.",
  },
  {
    image: "/student1.png",
    name: "Hina Qureshi",
    role: "Brand Designer",
    review: "Mentor feedback helped me refine my creative work.",
  },
  {
    image: "/student2.png",
    name: "Saman Shahid",
    role: "Web Developer",
    review: "I graduated with projects I am proud to show.",
  },
  {
    image: "/student3.png",
    name: "Malaika Zafar",
    role: "Content Strategist",
    review: "The practical approach made learning feel purposeful.",
  },
  // Add new students below — no other file needs to change:
  // { image: "...", name: "New Student", role: "Role" },
];
