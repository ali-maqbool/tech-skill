/**
 * Semantic Structure Tests — Task 14.4
 *
 * Verifies that HomePage renders the expected HTML landmark elements and that
 * every section's aria-labelledby attribute resolves to an existing element.
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import HomePage from "@/app/page";

// ─── Mocks ────────────────────────────────────────────────────────────────────

// Mock next/dynamic to return null stubs (HeroCanvas)
jest.mock("next/dynamic", () => () => () => null);

// Mock framer-motion completely
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
    AnimatePresence: ({
      children,
    }: {
      children: unknown;
    }) => children,
    useReducedMotion: () => true,
    useAnimation: () => ({ start: jest.fn() }),
  };
});

// Mock GSAP plugins
jest.mock("gsap", () => ({
  default: { registerPlugin: jest.fn(), to: jest.fn(), set: jest.fn() },
  gsap: { registerPlugin: jest.fn(), to: jest.fn(), set: jest.fn() },
}));
jest.mock("gsap/ScrollTrigger", () => ({
  ScrollTrigger: { getAll: () => [] },
}));
jest.mock("gsap/ScrollToPlugin", () => ({ ScrollToPlugin: {} }));

// ─── Browser API stubs (jsdom doesn't include these) ─────────────────────────

// IntersectionObserver — used by Navbar's active-section detection
beforeAll(() => {
  global.IntersectionObserver = class IntersectionObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof IntersectionObserver;
});

// ─── Tests ────────────────────────────────────────────────────────────────────

describe("HomePage — semantic HTML structure", () => {
  beforeEach(() => {
    render(<HomePage />);
  });

  it("renders a <header> element", () => {
    const header = document.querySelector("header");
    expect(header).toBeInTheDocument();
  });

  it("renders a <main> element", () => {
    const main = document.querySelector("main");
    expect(main).toBeInTheDocument();
  });

  it("renders a <nav> element", () => {
    const nav = document.querySelector("nav");
    expect(nav).toBeInTheDocument();
  });

  it("renders a <footer> element", () => {
    const footer = document.querySelector("footer");
    expect(footer).toBeInTheDocument();
  });

  it("renders at least 4 <section> elements", () => {
    const sections = document.querySelectorAll("section");
    expect(sections.length).toBeGreaterThanOrEqual(4);
  });

  it("each <section aria-labelledby> points to an existing element", () => {
    const sections = document.querySelectorAll("section[aria-labelledby]");
    // There must be at least one such section for this test to be meaningful
    expect(sections.length).toBeGreaterThan(0);

    sections.forEach((section) => {
      const labelId = section.getAttribute("aria-labelledby")!;
      const labelEl = document.getElementById(labelId);
      expect(labelEl).toBeInTheDocument();
    });
  });
});
