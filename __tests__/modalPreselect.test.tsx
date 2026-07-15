import React from "react";
import { render, screen } from "@testing-library/react";
import * as fc from "fast-check";
import RegistrationModal from "@/components/ui/RegistrationModal";
import { COURSES } from "@/data/courses";

// Mock deps
jest.mock("framer-motion", () => {
  const React = require("react");
  const stub = (tag: string) => React.forwardRef(({ children, ...p }: Record<string,unknown>, ref: unknown) => {
    const safe = Object.fromEntries(Object.entries(p).filter(([k]) => !["initial","animate","variants","whileInView","whileHover","exit","transition","viewport","layout","key"].includes(k)));
    return React.createElement(tag, { ...safe, ref }, children);
  });
  return { motion: { div: stub("div"), article: stub("article") }, AnimatePresence: ({ children }: {children: unknown}) => children, useReducedMotion: ()=>true };
});
jest.mock("@/hooks/useFocusTrap", () => ({
  useFocusTrap: () => ({ current: null }),
}));
jest.mock("@/lib/emailjs", () => ({
  sendRegistration: jest.fn().mockResolvedValue(undefined),
}));

/**
 * **Validates: Requirements 10**
 * Property 3: Register Now Pre-Selects Correct Course
 */
describe("Property 3: Register Now Pre-Selects Correct Course", () => {
  it("pre-selects the correct course when initialCourseId is provided", () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...COURSES.map((c) => c.id)),
        (courseId) => {
          const { unmount } = render(
            <RegistrationModal
              isOpen={true}
              initialCourseId={courseId}
              courses={COURSES}
              onClose={jest.fn()}
            />
          );
          const select = document.getElementById("course") as HTMLSelectElement | null;
          const result = select?.value === courseId;
          unmount();
          return result ?? false;
        }
      ),
      { numRuns: 10 }
    );
  });
});
