/**
 * Alt Text Tests — Task 14.5
 *
 * Property 9: Non-decorative images must have non-empty alt text.
 * Images with alt="" or aria-hidden="true" are decorative and exempt.
 *
 * Since this site uses SVG icons and CSS backgrounds rather than raster images,
 * there should be zero un-decorated <img> elements in the rendered DOM.
 *
 * Validates: Requirements 14.5
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

describe("Alt Text — Property 9: Non-Decorative Images", () => {
  beforeEach(() => {
    render(<HomePage />);
  });

  it("every non-decorative <img> has a non-empty alt attribute", () => {
    const allImages = Array.from(document.querySelectorAll<HTMLImageElement>("img"));

    // Decorative images are those with alt="" or aria-hidden="true" — exempt
    const nonDecorativeImages = allImages.filter((img) => {
      const alt = img.getAttribute("alt");
      const ariaHidden = img.getAttribute("aria-hidden");
      return alt !== "" && ariaHidden !== "true";
    });

    nonDecorativeImages.forEach((img) => {
      const alt = img.getAttribute("alt");
      expect(alt).not.toBeNull();
      expect(alt!.trim().length).toBeGreaterThan(0);
    });
  });

  it("site uses no raster <img> elements — confirms icon/CSS-only visual approach", () => {
    const allImages = Array.from(document.querySelectorAll<HTMLImageElement>("img"));
    // This site uses inline SVGs and CSS backgrounds exclusively.
    // A zero-image count is the expected and correct outcome.
    expect(allImages.length).toBe(0);
  });
});
