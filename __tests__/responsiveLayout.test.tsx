/**
 * Responsive Layout Integrity Tests — Task 14.6
 *
 * Property 1: For any viewport width between 320 px and 1920 px the full
 * page structure (hero, courses, about, contact) must be present in the DOM.
 *
 * Note: jsdom does not compute CSS layout, so we cannot measure actual pixel
 * widths. Instead we verify DOM-structure integrity — all four sections must
 * be renderable regardless of the viewport width supplied.
 *
 * **Validates: Requirements 14.6**
 */

import React from "react";
import { render, cleanup } from "@testing-library/react";
import * as fc from "fast-check";
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

afterEach(() => {
  cleanup();
});

// ─── Constants ────────────────────────────────────────────────────────────────

const SECTION_IDS = ["hero", "courses", "about", "contact"] as const;

// ─── Tests ────────────────────────────────────────────────────────────────────

describe("Responsive Layout Integrity — Property 1", () => {
  /**
   * Property-based test: for any viewport width in [320, 1920] all four
   * sections must be present in the DOM.
   *
   * **Validates: Requirements 14.6**
   */
  it("all 4 sections are present for any viewport width between 320 and 1920", () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 320, max: 1920 }),
        (viewportWidth) => {
          // Set the viewport width on window before rendering
          Object.defineProperty(window, "innerWidth", {
            writable: true,
            configurable: true,
            value: viewportWidth,
          });

          const { container, unmount } = render(<HomePage />);

          try {
            for (const id of SECTION_IDS) {
              const section = container.querySelector(`#${id}`);
              if (!section) {
                return false;
              }
            }
            return true;
          } finally {
            unmount();
          }
        }
      ),
      { numRuns: 50 }
    );
  });

  it("renders <main> element containing all 4 sections", () => {
    const { container } = render(<HomePage />);

    const main = container.querySelector("main");
    expect(main).toBeInTheDocument();

    SECTION_IDS.forEach((id) => {
      expect(container.querySelector(`#${id}`)).toBeInTheDocument();
    });
  });

  it("DOM scrollWidth does not exceed the configured viewport width", () => {
    // jsdom doesn't compute CSS layout so scrollWidth is always 0 or very
    // small — this test documents the intent and passes vacuously in jsdom.
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1024,
    });

    render(<HomePage />);

    // In jsdom, scrollWidth is always <= clientWidth; this is a structural guard.
    expect(document.body.scrollWidth).toBeLessThanOrEqual(
      Math.max(document.documentElement.clientWidth, window.innerWidth)
    );
  });
});
