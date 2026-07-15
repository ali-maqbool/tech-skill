import React from "react";
import { render, screen, within } from "@testing-library/react";
import * as fc from "fast-check";
import CoursesSection from "@/components/sections/CoursesSection";
import { Course } from "@/data/courses";

// Mock heavy deps
jest.mock("framer-motion", () => {
  const React = require("react");
  const stub = (tag: string) => React.forwardRef(({ children, ...p }: Record<string,unknown>, ref: unknown) => {
    const safe = Object.fromEntries(Object.entries(p).filter(([k]) => !["initial","animate","variants","whileInView","whileHover","exit","transition","viewport"].includes(k)));
    return React.createElement(tag, { ...safe, ref }, children);
  });
  return { motion: { div: stub("div"), p: stub("p"), h2: stub("h2"), article: stub("article") }, AnimatePresence: ({children}: {children:unknown})=>children, useReducedMotion: ()=>true };
});
jest.mock("gsap", () => ({ gsap: { registerPlugin: jest.fn(), fromTo: jest.fn(), set: jest.fn(), to: jest.fn() }, default: { registerPlugin: jest.fn(), set: jest.fn(), to: jest.fn() } }));
jest.mock("gsap/ScrollTrigger", () => ({ ScrollTrigger: { getAll: ()=>[] } }));

// Arbitrary course generator
const courseArb = fc.record<Course>({
  id: fc.string({ minLength: 1, maxLength: 20 }).filter(s => /^[a-z0-9-]+$/.test(s)),
  name: fc.string({ minLength: 2, maxLength: 50 }),
  fee: fc.integer({ min: 1000, max: 50000 }),
  timings: fc.array(fc.string({ minLength: 3, maxLength: 30 }), { minLength: 1, maxLength: 4 }),
  nextStartDate: fc.constantFrom("2025-09-01", "2025-10-01", "2026-01-01"),
  description: fc.string({ minLength: 10, maxLength: 200 }),
});

/**
 * **Validates: Requirements 7**
 * Property 2: Course Data Drives Rendered Cards
 */
describe("Property 2: Course Data Drives Rendered Cards", () => {
  it("renders one card per course in the courses array", () => {
    fc.assert(
      fc.property(
        fc.array(courseArb, { minLength: 1, maxLength: 8 }),
        (courses) => {
          const { unmount } = render(
            <CoursesSection courses={courses} onRegisterClick={jest.fn()} />
          );
          const cards = document.querySelectorAll(".course-card");
          const result = cards.length === courses.length;
          unmount();
          return result;
        }
      ),
      { numRuns: 20 }
    );
  });

  it("each card displays the course name", () => {
    fc.assert(
      fc.property(
        fc.array(courseArb, { minLength: 1, maxLength: 5 }),
        (courses) => {
          const { unmount } = render(
            <CoursesSection courses={courses} onRegisterClick={jest.fn()} />
          );
          const allText = document.body.textContent ?? "";
          const result = courses.every((c) => allText.includes(c.name));
          unmount();
          return result;
        }
      ),
      { numRuns: 20 }
    );
  });
});
