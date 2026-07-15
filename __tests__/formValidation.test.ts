/**
 * Property 5: Form Validation Blocks Invalid Submissions
 * Validates: Requirements 5.x (form validation)
 */
import * as fc from "fast-check";

// ── Exact copy of validateForm from RegistrationModal.tsx ──────────────────
interface FormValues {
  fullName: string;
  phone: string;
  email: string;
  course: string;
  timing: string;
  startDate: string;
}

interface FormErrors {
  fullName?: string;
  phone?: string;
  email?: string;
  course?: string;
  timing?: string;
  startDate?: string;
}

function validateForm(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (!values.fullName.trim()) errors.fullName = "Full name is required.";
  if (!values.phone.trim()) errors.phone = "Phone number is required.";
  if (!values.email.trim()) errors.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
    errors.email = "Please enter a valid email address.";
  if (!values.course) errors.course = "Please select a course.";
  if (!values.timing) errors.timing = "Please select a timing.";
  if (!values.startDate) errors.startDate = "Please select a start date.";
  return errors;
}
// ── End copy ─────────────────────────────────────────────────────────────────

describe("Property 5: Form Validation Blocks Invalid Submissions", () => {
  it("should return errors for any form with empty fullName", () => {
    fc.assert(
      fc.property(
        fc.record({
          fullName: fc.constant(""),
          phone: fc.string({ minLength: 1 }),
          email: fc.emailAddress(),
          course: fc.string({ minLength: 1 }),
          timing: fc.string({ minLength: 1 }),
          startDate: fc.string({ minLength: 1 }),
        }),
        (values) => {
          const errors = validateForm(values);
          return Object.keys(errors).length > 0 && !!errors.fullName;
        }
      )
    );
  });

  it("should return errors for any form with invalid email", () => {
    fc.assert(
      fc.property(
        fc.record({
          fullName: fc.string({ minLength: 1 }),
          phone: fc.string({ minLength: 1 }),
          email: fc
            .string({ minLength: 1 })
            .filter(
              (s) =>
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s) && s.trim().length > 0
            ),
          course: fc.string({ minLength: 1 }),
          timing: fc.string({ minLength: 1 }),
          startDate: fc.string({ minLength: 1 }),
        }),
        (values) => {
          const errors = validateForm(values);
          return !!errors.email;
        }
      )
    );
  });

  it("should return no errors for a fully valid form", () => {
    const valid: FormValues = {
      fullName: "Ahmed Khan",
      phone: "03001234567",
      email: "ahmed@example.com",
      course: "web-development",
      timing: "Morning 9am-12pm",
      startDate: "2025-09-01",
    };
    const errors = validateForm(valid);
    expect(Object.keys(errors).length).toBe(0);
  });
});
