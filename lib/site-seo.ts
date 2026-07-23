import { COURSES } from "@/data/courses";
import { SOCIAL_LINKS } from "@/data/contacts";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.techskill.pk").replace(/\/$/, "");
export const SITE_NAME = "Tech Skill";
export const SITE_DESCRIPTION =
  "Tech Skill offers practical technical courses in Islamabad, including graphic design, web development, digital marketing, video editing, freelancing, MS Office, Shopify, and Amazon training.";

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;

export const organizationSchema = {
  "@type": ["EducationalOrganization", "LocalBusiness"],
  "@id": ORGANIZATION_ID,
  name: SITE_NAME,
  alternateName: "Tech Skill Institute Islamabad",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  image: `${SITE_URL}/logo.png`,
  telephone: "+92-321-5544687",
  priceRange: "$$",
  description: SITE_DESCRIPTION,
  address: {
    "@type": "PostalAddress",
    streetAddress: "G-10 Markaz",
    addressLocality: "Islamabad",
    addressRegion: "Islamabad Capital Territory",
    postalCode: "44000", // TODO: confirm exact postal code for G-10 Markaz
    addressCountry: "PK",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 33.6844, // TODO: confirm exact latitude for Tech Skill G-10 Markaz
    longitude: 73.0479, // TODO: confirm exact longitude for Tech Skill G-10 Markaz
  },
  areaServed: [
    { "@type": "City", name: "Islamabad" },
    { "@type": "Country", name: "Pakistan" },
  ],
  openingHoursSpecification: [{
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "10:00",
    closes: "22:00",
  }],
  sameAs: SOCIAL_LINKS.filter((link) => link.url.startsWith("http") && !link.url.includes("wa.me")).map((link) => link.url),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Technical courses in Islamabad",
    itemListElement: COURSES.map((course) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Course",
        name: course.name,
        description: course.description,
        provider: { "@id": ORGANIZATION_ID },
        educationalLevel: "Beginner to intermediate",
        timeRequired: course.Durtion,
        courseMode: "In-person",
        location: { "@type": "Place", name: "G-10 Markaz, Islamabad" },
      },
    })),
  },
};

export const homeSchema = {
  "@context": "https://schema.org",
  "@graph": [
    organizationSchema,
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      publisher: { "@id": ORGANIZATION_ID },
      inLanguage: "en-PK",
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: "Tech Skill | Technical Courses in Islamabad",
      description: SITE_DESCRIPTION,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": ORGANIZATION_ID },
      inLanguage: "en-PK",
    },
    {
      "@type": "ItemList",
      name: "Technical courses offered by Tech Skill in Islamabad",
      itemListElement: COURSES.map((course, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Course",
          name: course.name,
          description: course.description,
          provider: { "@id": ORGANIZATION_ID },
          url: `${SITE_URL}/#courses`,
        },
      })),
    },
  ],
};
