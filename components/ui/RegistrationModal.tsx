"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Course } from "@/data/courses";
import { FormValues, sendRegistration } from "@/lib/emailjs";
import { useFocusTrap } from "@/hooks/useFocusTrap";

// ─── Types ────────────────────────────────────────────────────────────────────

interface RegistrationModalProps {
  isOpen: boolean;
  initialCourseId?: string;
  courses: Course[];
  onClose: () => void;
}

interface FormErrors {
  fullName?: string;
  phone?: string;
  email?: string;
  course?: string;
  timing?: string;
  startDate?: string;
}

// ─── Validation ───────────────────────────────────────────────────────────────

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

// ─── Empty form state ─────────────────────────────────────────────────────────

const EMPTY_FORM: FormValues = {
  fullName: "",
  phone: "",
  email: "",
  course: "",
  timing: "",
  startDate: "",
};

// ─── Shared input style (applied inline for full control) ─────────────────────

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "rgba(0,170,255,0.06)",
  border: "1px solid rgba(0,170,255,0.2)",
  color: "#ffffff",
  borderRadius: "8px",
  padding: "0.625rem 0.875rem",
  fontSize: "0.9375rem",
  outline: "none",
  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function RegistrationModal({
  isOpen,
  initialCourseId,
  courses,
  onClose,
}: RegistrationModalProps) {
  const [formValues, setFormValues] = useState<FormValues>(EMPTY_FORM);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  // Focus trap — also handles Escape key via second arg
  const modalRef = useFocusTrap(isOpen, onClose);

  // Sync initialCourseId when modal opens / initialCourseId changes
  useEffect(() => {
    if (isOpen && initialCourseId) {
      setFormValues((prev) => ({
        ...prev,
        course: initialCourseId,
        timing: "", // reset timing when course changes externally
      }));
    }
  }, [isOpen, initialCourseId]);

  // Reset submitStatus each time the modal opens
  useEffect(() => {
    if (isOpen) {
      setSubmitStatus("idle");
    }
  }, [isOpen]);

  // Derived: selected course object
  const selectedCourse = courses.find((c) => c.id === formValues.course) ?? null;

  // ── Handlers ──────────────────────────────────────────────────────────────

  function handleFieldChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;

    if (name === "course") {
      // When course changes, reset timing
      setFormValues((prev) => ({ ...prev, course: value, timing: "" }));
    } else {
      setFormValues((prev) => ({ ...prev, [name]: value }));
    }

    // Clear the error for this field on change
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const errors = validateForm(formValues);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      await sendRegistration(formValues);
      setSubmitStatus("success");
      setFormValues(EMPTY_FORM);
      setFormErrors({});
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  }

  // ── Focus ring helper (applied via onFocus/onBlur) ────────────────────────

  function handleInputFocus(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) {
    e.currentTarget.style.borderColor = "#00aaff";
    e.currentTarget.style.boxShadow = "0 0 0 2px rgba(0,170,255,0.25)";
  }

  function handleInputBlur(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) {
    e.currentTarget.style.borderColor = "rgba(0,170,255,0.2)";
    e.currentTarget.style.boxShadow = "none";
  }

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <AnimatePresence>
      {isOpen && (
        /* ── Backdrop ── */
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            background: "rgba(0,0,0,0.75)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
        >
          {/* ── Modal card ── */}
          <motion.div
            key="modal"
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: "560px",
              maxHeight: "90vh",
              overflowY: "auto",
              background: "var(--color-surface)",
              borderRadius: "1rem",
              boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
              border: "1px solid rgba(0,170,255,0.25)",
            }}
          >
            {/* ── Header ── */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "1.25rem 1.5rem",
                borderBottom: "1px solid rgba(0,170,255,0.15)",
              }}
            >
              <h2
                id="modal-title"
                style={{
                  margin: 0,
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  color: "#ffffff",
                }}
              >
                Course Registration
              </h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close registration form"
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--color-text-muted)",
                  fontSize: "1.5rem",
                  lineHeight: 1,
                  cursor: "pointer",
                  padding: "0.25rem 0.5rem",
                  borderRadius: "4px",
                  transition: "color 0.2s ease",
                  minHeight: "44px",
                  minWidth: "44px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--color-text-muted)")
                }
              >
                ×
              </button>
            </div>

            {/* ── Body ── */}
            <div style={{ padding: "1.5rem" }}>
              {/* ── Status banners ── */}
              {submitStatus === "success" && (
                <div
                  role="status"
                  aria-live="polite"
                  style={{
                    marginBottom: "1.25rem",
                    padding: "0.875rem 1rem",
                    borderRadius: "8px",
                    background: "rgba(0,200,100,0.12)",
                    border: "1px solid rgba(0,200,100,0.4)",
                    color: "#4ade80",
                    fontSize: "0.9375rem",
                  }}
                >
                  ✅ Registration Submitted! We&apos;ll contact you shortly.
                </div>
              )}

              {submitStatus === "error" && (
                <div
                  role="alert"
                  aria-live="assertive"
                  style={{
                    marginBottom: "1.25rem",
                    padding: "0.875rem 1rem",
                    borderRadius: "8px",
                    background: "rgba(239,68,68,0.12)",
                    border: "1px solid rgba(239,68,68,0.4)",
                    color: "#f87171",
                    fontSize: "0.9375rem",
                  }}
                >
                  ❌ Submission failed. Please call us directly at{" "}
                  <a
                    href="tel:03215544687"
                    style={{ color: "#f87171", fontWeight: 600 }}
                  >
                    0321 5544687
                  </a>
                  .
                </div>
              )}

              {/* ── Form ── */}
              <form onSubmit={handleSubmit} noValidate>
                {/* 2-column grid on desktop, 1-column on mobile */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: "1rem",
                  }}
                >
                  {/* Full Name — full width */}
                  <div style={{ gridColumn: "1 / -1" }}>
                    <label
                      htmlFor="fullName"
                      style={{
                        display: "block",
                        marginBottom: "0.375rem",
                        fontSize: "0.875rem",
                        color: "var(--color-text-muted)",
                        fontWeight: 500,
                      }}
                    >
                      Full Name
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      autoComplete="name"
                      value={formValues.fullName}
                      onChange={handleFieldChange}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      style={inputStyle}
                      placeholder="e.g. Ahmed Khan"
                      aria-required="true"
                      aria-invalid={!!formErrors.fullName}
                      aria-describedby={
                        formErrors.fullName ? "error-fullName" : undefined
                      }
                    />
                    {formErrors.fullName && (
                      <span
                        id="error-fullName"
                        role="alert"
                        style={{
                          display: "block",
                          marginTop: "0.3rem",
                          fontSize: "0.8125rem",
                          color: "#f87171",
                        }}
                      >
                        {formErrors.fullName}
                      </span>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label
                      htmlFor="phone"
                      style={{
                        display: "block",
                        marginBottom: "0.375rem",
                        fontSize: "0.875rem",
                        color: "var(--color-text-muted)",
                        fontWeight: 500,
                      }}
                    >
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      value={formValues.phone}
                      onChange={handleFieldChange}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      style={inputStyle}
                      placeholder="e.g. 0321 5544687"
                      aria-required="true"
                      aria-invalid={!!formErrors.phone}
                      aria-describedby={
                        formErrors.phone ? "error-phone" : undefined
                      }
                    />
                    {formErrors.phone && (
                      <span
                        id="error-phone"
                        role="alert"
                        style={{
                          display: "block",
                          marginTop: "0.3rem",
                          fontSize: "0.8125rem",
                          color: "#f87171",
                        }}
                      >
                        {formErrors.phone}
                      </span>
                    )}
                  </div>

                  {/* Email Address */}
                  <div>
                    <label
                      htmlFor="email"
                      style={{
                        display: "block",
                        marginBottom: "0.375rem",
                        fontSize: "0.875rem",
                        color: "var(--color-text-muted)",
                        fontWeight: 500,
                      }}
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={formValues.email}
                      onChange={handleFieldChange}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      style={inputStyle}
                      placeholder="e.g. ahmed@example.com"
                      aria-required="true"
                      aria-invalid={!!formErrors.email}
                      aria-describedby={
                        formErrors.email ? "error-email" : undefined
                      }
                    />
                    {formErrors.email && (
                      <span
                        id="error-email"
                        role="alert"
                        style={{
                          display: "block",
                          marginTop: "0.3rem",
                          fontSize: "0.8125rem",
                          color: "#f87171",
                        }}
                      >
                        {formErrors.email}
                      </span>
                    )}
                  </div>

                  {/* Course Selection — full width */}
                  <div style={{ gridColumn: "1 / -1" }}>
                    <label
                      htmlFor="course"
                      style={{
                        display: "block",
                        marginBottom: "0.375rem",
                        fontSize: "0.875rem",
                        color: "var(--color-text-muted)",
                        fontWeight: 500,
                      }}
                    >
                      Course
                    </label>
                    <select
                      id="course"
                      name="course"
                      value={formValues.course}
                      onChange={handleFieldChange}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      style={inputStyle}
                      aria-required="true"
                      aria-invalid={!!formErrors.course}
                      aria-describedby={
                        formErrors.course ? "error-course" : undefined
                      }
                    >
                      <option value="" disabled>
                        — Select a course —
                      </option>
                      {courses.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                    {formErrors.course && (
                      <span
                        id="error-course"
                        role="alert"
                        style={{
                          display: "block",
                          marginTop: "0.3rem",
                          fontSize: "0.8125rem",
                          color: "#f87171",
                        }}
                      >
                        {formErrors.course}
                      </span>
                    )}

                    </div>

                  {/* Preferred Timing */}
                  <div>
                    <label
                      htmlFor="timing"
                      style={{
                        display: "block",
                        marginBottom: "0.375rem",
                        fontSize: "0.875rem",
                        color: "var(--color-text-muted)",
                        fontWeight: 500,
                      }}
                    >
                      Preferred Timing
                    </label>
                    <select
                      id="timing"
                      name="timing"
                      value={formValues.timing}
                      onChange={handleFieldChange}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      style={{
                        ...inputStyle,
                        opacity: !selectedCourse ? 0.5 : 1,
                        cursor: !selectedCourse ? "not-allowed" : "pointer",
                      }}
                      disabled={!selectedCourse}
                      aria-required="true"
                      aria-invalid={!!formErrors.timing}
                      aria-describedby={
                        formErrors.timing ? "error-timing" : undefined
                      }
                    >
                      <option value="" disabled>
                        — Select a timing —
                      </option>
                      {(selectedCourse?.timings ?? []).map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                    {formErrors.timing && (
                      <span
                        id="error-timing"
                        role="alert"
                        style={{
                          display: "block",
                          marginTop: "0.3rem",
                          fontSize: "0.8125rem",
                          color: "#f87171",
                        }}
                      >
                        {formErrors.timing}
                      </span>
                    )}
                  </div>

                  {/* Preferred Start Date */}
                  <div>
                    <label
                      htmlFor="startDate"
                      style={{
                        display: "block",
                        marginBottom: "0.375rem",
                        fontSize: "0.875rem",
                        color: "var(--color-text-muted)",
                        fontWeight: 500,
                      }}
                    >
                      Preferred Start Date
                    </label>
                    <input
                      id="startDate"
                      name="startDate"
                      type="date"
                      value={formValues.startDate}
                      onChange={handleFieldChange}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      style={{
                        ...inputStyle,
                        colorScheme: "dark",
                      }}
                      aria-required="true"
                      aria-invalid={!!formErrors.startDate}
                      aria-describedby={
                        formErrors.startDate ? "error-startDate" : undefined
                      }
                    />
                    {formErrors.startDate && (
                      <span
                        id="error-startDate"
                        role="alert"
                        style={{
                          display: "block",
                          marginTop: "0.3rem",
                          fontSize: "0.8125rem",
                          color: "#f87171",
                        }}
                      >
                        {formErrors.startDate}
                      </span>
                    )}
                  </div>
                </div>

                {/* ── Submit button ── */}
                <div style={{ marginTop: "1.5rem" }}>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary"
                    style={{
                      width: "100%",
                      opacity: isSubmitting ? 0.7 : 1,
                      cursor: isSubmitting ? "not-allowed" : "pointer",
                    }}
                  >
                    {isSubmitting ? "Submitting…" : "Submit Registration"}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
