import React from "react";
import { render } from "@testing-library/react";

// next/dynamic is hoisted — return a component that renders nothing
jest.mock("next/dynamic", () => () => () => null);

jest.mock("framer-motion", () => {
  const React = require("react");
  const stub = (tag: string) =>
    React.forwardRef(
      ({ children, ...p }: Record<string, unknown>, ref: unknown) => {
        const safe = Object.fromEntries(
          Object.entries(p).filter(
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
              ].includes(k)
          )
        );
        return React.createElement(tag, { ...safe, ref }, children);
      }
    );
  return {
    motion: { div: stub("div"), h1: stub("h1"), p: stub("p") },
    AnimatePresence: ({ c }: { c: unknown }) => c,
    useReducedMotion: () => true,
  };
});

jest.mock("gsap", () => ({
  default: { registerPlugin: jest.fn(), to: jest.fn() },
  gsap: { registerPlugin: jest.fn(), to: jest.fn() },
}));
jest.mock("gsap/ScrollToPlugin", () => ({ ScrollToPlugin: {} }));

import HeroSection from "@/components/sections/HeroSection";

describe("HeroSection Three.js fallback", () => {
  afterEach(() => {
    delete process.env.NEXT_PUBLIC_ENABLE_THREEJS;
  });

  it("renders the CSS background section element", () => {
    render(<HeroSection onRegisterClick={jest.fn()} />);
    const section = document.getElementById("hero");
    expect(section).toBeInTheDocument();
  });

  it("does not render the Three.js canvas when NEXT_PUBLIC_ENABLE_THREEJS is not set", () => {
    delete process.env.NEXT_PUBLIC_ENABLE_THREEJS;
    const { container } = render(<HeroSection onRegisterClick={jest.fn()} />);
    // HeroCanvas should not be mounted — look for canvas or the drei Canvas wrapper
    expect(container.querySelector("canvas")).toBeNull();
  });
});
