import { render, screen } from "@testing-library/react";
import ContactSection from "@/components/sections/ContactSection";

// Mock framer-motion to avoid issues in jsdom
jest.mock("framer-motion", () => ({
  ...jest.requireActual("framer-motion"),
  useReducedMotion: () => true,
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div {...props}>{children}</div>,
    a: ({ children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => <a {...props}>{children}</a>,
    p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => <p {...props}>{children}</p>,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe("ContactSection", () => {
  it("renders a clickable phone link with tel: href", () => {
    render(<ContactSection />);
    const link = screen.getByRole("link", { name: /0321 5544687/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "tel:03215544687");
  });

  it("renders the institute name Tech Skill", () => {
    render(<ContactSection />);
    expect(screen.getByText(/Tech Skill/i)).toBeInTheDocument();
  });
});
