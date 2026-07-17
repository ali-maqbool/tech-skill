"use client";

import { useEffect, useState } from "react";
import { COURSES } from "@/data/courses";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import CoursesSection from "@/components/sections/CoursesSection";
import TeamSection from "@/components/sections/TeamSection";
import StudentShowcase from "@/components/ui/StudentShowcase";
import RegistrationModal from "@/components/ui/RegistrationModal";
import Preloader from "@/components/ui/Preloader";
import ContactSection from "@/components/sections/ContactSection";

export default function HomePageClient() {
  const [modalOpen, setModalOpen] = useState(false);
  const [preselectedCourse, setPreselectedCourse] = useState<string | undefined>();
  const [enrollmentCounts, setEnrollmentCounts] = useState<Record<string, number>>(
    () => Object.fromEntries(COURSES.map((course) => [course.id, course.students ?? 0]))
  );

  useEffect(() => {
    const saved = window.localStorage.getItem("tech-skill-course-enrollments");
    if (!saved) return;
    try {
      const parsed = JSON.parse(saved) as Record<string, number>;
      setEnrollmentCounts((current) => ({ ...current, ...parsed }));
    } catch {
      // Keep the course defaults when local storage contains malformed data.
    }
  }, []);

  function openModal(courseId?: string) {
    setPreselectedCourse(courseId);
    setModalOpen(true);
  }

  function handleRegistrationSuccess(courseId: string) {
    setEnrollmentCounts((current) => {
      const next = { ...current, [courseId]: (current[courseId] ?? 0) + 1 };
      window.localStorage.setItem("tech-skill-course-enrollments", JSON.stringify(next));
      return next;
    });
  }

  return (
    <>
      <Preloader />
      <Navbar onRegisterClick={() => openModal()} />
      <main>
        <HeroSection onRegisterClick={() => openModal()} />
        <CoursesSection courses={COURSES} onRegisterClick={openModal} enrollmentCounts={enrollmentCounts} />
        <TeamSection />
        <StudentShowcase />
        <ContactSection />
      </main>
      <Footer />
      <RegistrationModal
        isOpen={modalOpen}
        initialCourseId={preselectedCourse}
        courses={COURSES}
        onClose={() => setModalOpen(false)}
        onRegistrationSuccess={handleRegistrationSuccess}
      />
    </>
  );
}
