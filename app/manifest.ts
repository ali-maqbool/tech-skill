import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Tech Skill | Technical Courses in Islamabad",
    short_name: "Tech Skill",
    description: "Practical technical and digital skills courses in Islamabad, Pakistan.",
    start_url: "/",
    display: "standalone",
    background_color: "#f8faff",
    theme_color: "#0077cc",
    icons: [{ src: "/logo.png", sizes: "any", type: "image/png" }],
  };
}
