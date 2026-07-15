import { COURSES, Course } from "@/data/courses";
import { CONTACT_INFO, SOCIAL_LINKS } from "@/data/contacts";

describe("Course data shape validation", () => {
  it("should have at least 5 courses", () => {
    expect(COURSES.length).toBeGreaterThanOrEqual(5);
  });

  it("should include all required courses", () => {
    const ids = COURSES.map((c) => c.id);
    expect(ids).toContain("graphic-design");
    expect(ids).toContain("web-development");
    expect(ids).toContain("digital-marketing");
    expect(ids).toContain("freelancing");
    expect(ids).toContain("video-editing");
  });

  it("every course should have all required fields with correct types", () => {
    COURSES.forEach((course) => {
      expect(typeof course.id).toBe("string");
      expect(course.id.length).toBeGreaterThan(0);
      expect(typeof course.name).toBe("string");
      expect(course.name.length).toBeGreaterThan(0);
      expect(typeof course.fee).toBe("number");
      expect(course.fee).toBeGreaterThan(0);
      expect(Array.isArray(course.timings)).toBe(true);
      expect(course.timings.length).toBeGreaterThan(0);
      expect(typeof course.nextStartDate).toBe("string");
      expect(course.nextStartDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(typeof course.description).toBe("string");
      expect(course.description.length).toBeGreaterThan(0);
    });
  });

  it("should have unique course IDs", () => {
    const ids = COURSES.map((c) => c.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });
});

describe("Contact info validation", () => {
  it("should have the correct phone number", () => {
    expect(CONTACT_INFO.phone).toBe("0321 5544687");
  });

  it("should have the correct institute name", () => {
    expect(CONTACT_INFO.instituteName).toBe("Tech Skill");
  });

  it("should have social links array", () => {
    expect(Array.isArray(SOCIAL_LINKS)).toBe(true);
    expect(SOCIAL_LINKS.length).toBeGreaterThan(0);
  });

  it("every social link should have platform, url, and icon", () => {
    SOCIAL_LINKS.forEach((link) => {
      expect(typeof link.platform).toBe("string");
      expect(typeof link.url).toBe("string");
      expect(typeof link.icon).toBe("string");
    });
  });
});
