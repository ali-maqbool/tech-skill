export interface CourseFeature {
  label: string;
  icon: string; // lucide-react icon name: "Rocket" | "Award" | "Briefcase" | "GraduationCap" | "Target"
}

export interface Course {
  id: string;
  name: string;
  timings: string[];       // e.g. ["Flexible", "Morning 9am-12pm"]
  Durtion: string;         // e.g. "20 Days" — shown in duration pill
  duration?: string;
  description: string;     // fallback if shortDescription missing
  shortDescription?: string; // shown on the card (preferred over description)
  icon?: string;
  students?: number;       // e.g. 186 — shown as "186+ Students"
  rating?: number;         // e.g. 4.6 — shown with star icon
  reviewCount?: number;
  isPopular?: boolean;     // shows amber "POPULAR" badge with Flame icon
  isFeatured?: boolean;    // shows amber "FEATURED" badge with Flame icon
  features?: CourseFeature[]; // 4 feature rows with colored icons
  flexible?: string;       // e.g. "Flexible Timing" — shown in green pill
  fee?: number;
  nextStartDate?: string;
}

export const COURSES: Course[] = [
  {
    id: "typing",
    name: "Professional Typing",
    timings: ["Flexible"],
    Durtion: "20 Days",
    description: "Type as a professional typist with the speed over 45WPM.",
    shortDescription: "Master speed typing over 45+ WPM with touch-typing techniques, accuracy drills, and document formatting.",
    students: 186,
    rating: 4.7,
    reviewCount: 186,
    flexible: "Flexible Timing",
    features: [
      { label: "Live Typing Drills", icon: "Rocket" },
      { label: "Speed Certificate", icon: "Award" },
      { label: "Data Entry Support", icon: "Briefcase" },
      { label: "Expert Instructors", icon: "GraduationCap" },
    ],
  },
  {
    id: "ms-office",
    name: "MS Office Suite",
    timings: ["Flexible"],
    Durtion: "30 Days",
    description: "Master Word, Excel, PowerPoint, and Inpage for office automation.",
    shortDescription: "Master Word, Excel formulas, PowerPoint presentations, and InPage for professional office automation.",
    students: 214,
    rating: 4.8,
    reviewCount: 214,
    flexible: "Flexible Timing",
    features: [
      { label: "Practical Projects", icon: "Rocket" },
      { label: "Course Certificate", icon: "Award" },
      { label: "Job Placement Support", icon: "Briefcase" },
      { label: "Experienced Instructors", icon: "GraduationCap" },
    ],
  },
  {
    id: "graphic-design",
    name: "Graphic Design",
    timings: ["Flexible"],
    Durtion: "60 Days",
    description: "Master visual communication using industry-standard tools.",
    shortDescription: "Create stunning visuals with Photoshop, Illustrator & Canva for branding, social media, and print.",
    students: 268,
    rating: 4.9,
    reviewCount: 268,
    isPopular: true,
    flexible: "Flexible Timing",
    features: [
      { label: "Live Projects", icon: "Rocket" },
      { label: "Certificate", icon: "Award" },
      { label: "Job & Freelancing Support", icon: "Briefcase" },
      { label: "Experienced Instructors", icon: "GraduationCap" },
    ],
  },
  {
    id: "digital-marketing",
    name: "Digital Marketing",
    timings: ["Flexible"],
    Durtion: "45 Days",
    description: "Learn SEO, social media marketing, paid ads, and analytics to grow businesses online.",
    shortDescription: "Run high-ROI ad campaigns, master SEO, and scale brand presence across Meta, Google & TikTok.",
    students: 192,
    rating: 4.8,
    reviewCount: 192,
    isPopular: true,
    flexible: "Flexible Timing",
    features: [
      { label: "Real Ad Campaigns", icon: "Rocket" },
      { label: "Industry Certificate", icon: "Award" },
      { label: "Agency & Freelance Guidance", icon: "Briefcase" },
      { label: "Certified Marketers", icon: "GraduationCap" },
    ],
  },
  {
    id: "video-editing",
    name: "Video Editing",
    timings: ["Flexible"],
    Durtion: "60 Days",
    description: "Edit professional videos using Premiere Pro and After Effects for social media and brand content.",
    shortDescription: "Craft cinematic edits, reels, motion graphics, and audio mixing with Premiere Pro & After Effects.",
    students: 174,
    rating: 4.7,
    reviewCount: 174,
    flexible: "Flexible Timing",
    features: [
      { label: "Portfolio Creation", icon: "Rocket" },
      { label: "Editing Certificate", icon: "Award" },
      { label: "YouTube & Reels Monetization", icon: "Briefcase" },
      { label: "Pro Video Editors", icon: "GraduationCap" },
    ],
  },
  {
    id: "web-development",
    name: "Web Development",
    timings: ["Flexible", "Morning 9am-12pm"],
    Durtion: "90 Days",
    description: "Build modern, responsive websites using HTML, CSS, JavaScript, and React.",
    shortDescription: "Build interactive, high-performance web applications using HTML5, CSS3, JavaScript & React.",
    students: 241,
    rating: 4.9,
    reviewCount: 241,
    isPopular: true,
    flexible: "Flexible Timing",
    features: [
      { label: "Full-Stack Projects", icon: "Rocket" },
      { label: "Developer Certificate", icon: "Award" },
      { label: "Career & Internship Support", icon: "Briefcase" },
      { label: "Senior Web Engineers", icon: "GraduationCap" },
    ],
  },
  {
    id: "freelancing",
    name: "Freelancing Mastery",
    timings: ["Flexible"],
    Durtion: "45 Days",
    description: "Learn how to find clients, build a profile, and earn online through platforms like Upwork and Fiverr.",
    shortDescription: "Land high-paying international clients on Upwork, Fiverr & LinkedIn with winning proposals.",
    students: 228,
    rating: 4.9,
    reviewCount: 228,
    flexible: "Flexible Timing",
    features: [
      { label: "Profile Setup & Audit", icon: "Rocket" },
      { label: "Top Rated Badge Strategy", icon: "Award" },
      { label: "Client Management Skills", icon: "Briefcase" },
      { label: "Top-Rated Mentors", icon: "GraduationCap" },
    ],
  },
  {
    id: "Shopify",
    name: "Shopify E-Commerce",
    timings: ["Flexible"],
    Durtion: "60 Days",
    description: "Learn from product hunting to finding supplier, to make your successful shopify brand.",
    shortDescription: "Build automated dropshipping & private label e-commerce stores from product hunting to marketing.",
    students: 119,
    rating: 4.6,
    reviewCount: 119,
    flexible: "Flexible Timing",
    features: [
      { label: "Store Setup & Launch", icon: "Rocket" },
      { label: "E-Commerce Certificate", icon: "Award" },
      { label: "Supplier Sourcing Guide", icon: "Briefcase" },
      { label: "E-Com Store Owners", icon: "GraduationCap" },
    ],
  },
  {
    id: "Amazon",
    name: "Amazon FBA",
    timings: ["Flexible"],
    Durtion: "60 Days",
    description: "Learn how to launch, scale, and succeed as an Amazon seller.",
    shortDescription: "Launch & scale Amazon VA, Private Label, or Wholesale businesses with product research tools.",
    students: 121,
    rating: 4.6,
    reviewCount: 121,
    flexible: "Flexible Timing",
    features: [
      { label: "Product Research Drills", icon: "Rocket" },
      { label: "Amazon Specialist Certificate", icon: "Award" },
      { label: "VA Client Acquisition", icon: "Briefcase" },
      { label: "Amazon FBA Experts", icon: "GraduationCap" },
    ],
  },
];
