import React from "react";
import { render, fireEvent } from "@testing-library/react";
import * as fc from "fast-check";
import RegistrationModal from "@/components/ui/RegistrationModal";
import { COURSES } from "@/data/courses";

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
                "layout",
              ].includes(k)
          )
        );
        return React.createElement(tag, { ...safe, ref }, children);
      }
    );
  return {
    motion: { div: stub("div") },
    AnimatePresence: ({ children }: { children: unknown }) => children,
    useReducedMotion: () => true,
  };
});
jest.mock("@/hooks/useFocusTrap", () => ({
  useFocusTrap: () => ({ current: null }),
}));
jest.mock("@/lib/emailjs", () => ({
  sendRegistration: jest.fn().mockResolvedValue(undefined),
}));

/**
 * Property 4: Dynamic Fee Reflects Selected Course
 *
 * Validates: Requirements 4.2
 */
describe("Property 4: Dynamic Fee Reflects Selected Course", () => {
  it("displays the correct fee for each selected course", () => {
    fc.assert(
      fc.property(fc.constantFrom(...COURSES), (course) => {
        const { unmount } = render(
          <RegistrationModal isOpen={true} courses={COURSES} onClose={jest.fn()} />
        );
        const select = document.getElementById("course") as HTMLSelectElement;
        fireEvent.change(select, { target: { value: course.id } });
        const feeText = `PKR ${course.fee.toLocaleString()}`;
        const found = document.body.textContent?.includes(feeText) ?? false;
        unmount();
        return found;
      }),
      { numRuns: COURSES.length }
    );
  });
});
