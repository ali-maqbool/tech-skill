import { useRef, useEffect } from "react";

export function useFocusTrap(
  isActive: boolean,
  onEscape?: () => void
): React.RefObject<HTMLDivElement> {
  const containerRef = useRef<HTMLDivElement>(null);

  // Tab key focus trap: cycle focus within the container
  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const focusable = containerRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    first?.focus();

    const handler = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isActive]);

  // Escape key handler: calls onEscape when the trap is active
  useEffect(() => {
    if (!isActive || !onEscape) return;

    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onEscape();
      }
    };

    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isActive, onEscape]);

  return containerRef;
}
