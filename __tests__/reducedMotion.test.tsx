/**
 * Reduced-Motion Compliance Tests — Task 13.3
 *
 * Property 6: When `useReducedMotion` returns `true`, key animated components
 * (CoursesSection, HeroSection, AboutSection) must still render all their
 * content without errors.
 *
 * Validates: Requirements 13.3
 */

import React from "react";
import { render } from "@testing-library/react";
import { COURSES } from "@/data/courses";

// ─── Mocks ────────────────────────────────────────────────────────────────────

jest.mock("next/dynamic", () => () => () => null);

jest.mock("framer-motion", () => {
  const React = require("react");
  const createEl = (tag: string) =>
    React.forwardRef(
      (
        { children, ...props }: Record<string, unknown>,
        ref: unknown
      ) => {
        const safeProps = Object.fromEntries(
          Object.entries(props).filter(
            ([k]) =>
              ![
                "initial",
                "animate",
                "variants",
                "whileInView",
                "whileHover",
                "exit",
                "transition",
                "viewport",
                "layout",
              ].includes(k)
          )
        );
        return React.createElement(tag, { ...safeProps, ref }, children);
      }
    );
  return {
    motion: {
      header: createEl("header"),
      div: createEl("div"),
      p: createEl("p"),
      h2: createEl("h2"),
      h1: createEl("h1"),
      a: createEl("a"),
      ul: createEl("ul"),
      li: createEl("li"),
      footer: createEl("footer"),
      article: createEl("article"),
    },
    AnimatePresence: ({ children }: { children: unknown }) => children,
    // ← Key: always return true so every component takes the reduced-motion path
    useReducedMotion: () => true,
    useAnimation: () => ({ start: jest.fn() }),
  };
});

jest.mock("gsap", () => ({
  default: { registerPlugin: jest.fn(), to: jest.fn(), set: jest.fn() },
  gsap: { registerPlugin: jest.fn(), to: jest.fn(), set: jest.fn() },
}));
jest.mock("gsap/ScrollTrigger", () => ({
  ScrollTrigger: { getAll: () => [] },
}));
jest.mock("gsap/ScrollToPlugin", () => ({ ScrollToPlugin: {} }));

// ─── Browser API stubs ────────────────────────────────────────────────────────

beforeAll(() => {
  global.IntersectionObserver = class IntersectionObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof IntersectionObserver;
});

// ─── Imports (after mocks) ────────────────────────────────────────────────────

import HeroSection from "@/components/sections/HeroSection";
import CoursesSection from "@/components/sections/CoursesSection";
import AboutSection from "@/components/sections/AboutSection";

// ─── Tests ────────────────────────────────────────────────────────────────────

describe("Reduced-Motion Compliance — Property 6", () => {
  it("HeroSection renders all content when useReducedMotion returns true", () => {
    const { getByRole, getByText } = render(
      <HeroSection onRegisterClick={jest.fn()} />
    );

    // Heading must be present
    expect(getByRole("heading", { level: 1 })).toBeInTheDocument();
    // CTA button present
    expect(getByRole("button", { name: /register now/i })).toBeInTheDocument();
    // Stats list present
    expect(getByRole("list", { name: /key statistics/i })).toBeInTheDocument();
  });

  it("CoursesSection renders all courses when useReducedMotion returns true", () => {
    const { getAllByRole } = render(
      <CoursesSection courses={COURSES} onRegisterClick={jest.fn()} />
    );

    // Section heading is present
    const headings = getAllByRole("heading");
    expect(headings.length).toBeGreaterThan(0);

    // One article/card per course
    const cards = document.querySelectorAll(".course-card");
    expect(cards.length).toBe(COURSES.length);
  });

  it("AboutSection renders all benefits when useReducedMotion returns true", () => {
    const { getByRole, getByText } = render(<AboutSection />);

    // Section heading
    expect(getByRole("heading", { level: 2 })).toBeInTheDocument();
    // At least one benefit list item
    expect(getByRole("list")).toBeInTheDocument();
    // CTA link
    expect(getByText(/explore our courses/i)).toBeInTheDocument();
  });

  it("HeroSection does not render scroll-indicator button when reduced motion is true", () => {
    const { queryByRole } = render(
      <HeroSection onRegisterClick={jest.fn()} />
    );
    // The scroll-to-courses button is conditionally hidden when prefersReduced = true
    const scrollBtn = queryByRole("button", { name: /scroll to courses/i });
    expect(scrollBtn).not.toBeInTheDocument();
  });
});
