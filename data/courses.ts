export interface Course {
  id: string;          
  name: string;          
  timings: string[];    
  Durtion: string;
  description: string;  
  icon?: string;        
}

export const COURSES: Course[] = [
   {
    id: "typing",
    name: "Professional typing",
    timings: ["Flexible"],
    Durtion: "20 Days",
    description:
      "Type as a professional typist with the speed over 45WPM",
  },
  {
    id: "ms-office",
    name: "MS Office",
    timings: ["Flexible"],
    Durtion: "30 Days",
    description:
      "Edit professional videos using Premiere Pro and After Effects for social media and brand content.",
  },
  {
    id: "graphic-design",
    name: "Graphic Design",
    timings: ["Flexible"],
    Durtion: "60 Days",
    description:
      "Master visual communication using industry-standard tools like Photoshop and Illustrator.",
  },
   {
    id: "digital-marketing",
    name: "Digital Marketing",
    timings: ["Flexible"],
    Durtion: "45 Days",
    description:
      "Learn SEO, social media marketing, paid ads, and analytics to grow businesses online.",
  },
  {
    id: "video-editing",
    name: "Video Editing",
    timings: ["Flexible"],
    Durtion: "60 Days",
    description:
      "Edit professional videos using Premiere Pro and After Effects for social media and brand content.",
  },
  {
    id: "web-development",
    name: "Web Development",
    timings: ["Flexible"],
    Durtion: "90 Days",
    description:
      "Build modern, responsive websites using HTML, CSS, JavaScript, and React.",
  },
 
  {
    id: "freelancing",
    name: "Freelancing",
    timings: ["Flexible"],
    Durtion: "45 Days",
    description:
      "Learn how to find clients, build a profile, and earn online through platforms like Upwork and Fiverr.",
  },
  {
    id: "Shopify",
    name: "Shopify",
    timings: ["Flexible"],
    Durtion: "60 Days",
    description:
      "Learn from product hunting to finding supplier, to make your sucessful shopify brand",
  },
  {
    id: "Amazon",
    name: "Amazon",
    timings: ["Flexible"],
    Durtion: "60 Days",
    description:
      "Learn how to launch, scale, and succeed as an Amazon seller.",
  },


];
