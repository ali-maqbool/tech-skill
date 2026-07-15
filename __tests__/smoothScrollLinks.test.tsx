/**
 * Smooth-Scroll Internal Nav Links Tests — Task 13.4
 *
 * Property 10: Every internal navigation link (href starting with "#") must
 * point to a fragment that corresponds to an existing id in the rendered DOM.
 *
 * Validates: Requirements 13.4
 */

import React from "react";
import { render } from "@testing-library/react";
import HomePage from "@/app/page";

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

// ─── Tests ────────────────────────────────────────────────────────────────────

describe("Internal Nav Links — Property 10: Smooth Scroll Targets Exist", () => {
  it("every <a href='#...'> fragment resolves to an existing DOM element", () => {
    // Render into a container so all queries are scoped to this render only
    const { container } = render(<HomePage />);

    const allAnchors = Array.from(
      container.querySelectorAll<HTMLAnchorElement>("a[href]")
    );
    // Include only links whose href starts with "#" AND have a non-empty fragment.
    // href="#" (bare hash / placeholder social links) are intentionally excluded
    // because they are not scroll-target links.
    const internalLinks = allAnchors.filter((a) => {
      const href = a.getAttribute("href") ?? "";
      return href.startsWith("#") && href.length > 1;
    });

    // There must be at least one substantive internal link for the test to mean something
    expect(internalLinks.length).toBeGreaterThan(0);

    internalLinks.forEach((link) => {
      const href = link.getAttribute("href")!;
      const fragmentId = href.slice(1); // strip leading "#"
      // Search within the same container so we don't cross render boundaries
      const target = container.querySelector(`#${fragmentId}`);
      expect(target).not.toBeNull();
    });
  });

  it("nav links point to #hero, #courses, #about, and #contact sections", () => {
    const { container } = render(<HomePage />);

    const expectedIds = ["hero", "courses", "about", "contact"];

    expectedIds.forEach((id) => {
      // Each expected section id must exist in the rendered container
      expect(container.querySelector(`#${id}`)).not.toBeNull();

      // At least one anchor must link to it
      const matching = container.querySelector<HTMLAnchorElement>(
        `a[href="#${id}"]`
      );
      expect(matching).not.toBeNull();
    });
  });
});
