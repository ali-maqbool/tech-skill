"use client";
import { useState } from "react";
import { COURSES } from "@/data/courses";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import CoursesSection from "@/components/sections/CoursesSection";
import LearningPath from "@/components/sections/LearningPath";
import AboutSection from "@/components/sections/AboutSection";
import TeamSection from "@/components/sections/TeamSection";
import Outcomes from "@/components/sections/Outcomes";
import SuccessStories from "@/components/sections/SuccessStories";
import StudentShowcase from "@/components/ui/StudentShowcase";
import ContactSection from "@/components/sections/ContactSection";
import RegistrationModal from "@/components/ui/RegistrationModal";
import Preloader from "@/components/ui/Preloader";

export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [preselectedCourse, setPreselectedCourse] = useState<string | undefined>();

  function openModal(courseId?: string) {
    setPreselectedCourse(courseId);
    setModalOpen(true);
  }

  return (
    <>
      <Preloader />
      <Navbar onRegisterClick={() => openModal()} />
      <main>
        {/* 1 — Hero */}
        <HeroSection onRegisterClick={() => openModal()} />

        {/* 2 — Our Courses */}
        <CoursesSection courses={COURSES} onRegisterClick={openModal} />

        {/* 3 — How It Works / Learning Path */}
        <LearningPath />

        {/* 4 — Why Choose Us */}
        <AboutSection />

        {/* 5 — Meet the Team  (right after About, as requested) */}
        <TeamSection />

        {/* 6 — Outcomes */}
        <Outcomes />

        {/* 7 — Student Success Stories */}
        <SuccessStories />

        {/* 8 — Our Students (marquee showcase) */}
        <StudentShowcase />

        {/* 9 — Get in Touch */}
        <ContactSection />
      </main>
      <Footer />
      <RegistrationModal
        isOpen={modalOpen}
        initialCourseId={preselectedCourse}
        courses={COURSES}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
