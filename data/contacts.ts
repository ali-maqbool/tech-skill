export interface SocialLink {
  platform: string; // e.g. "WhatsApp"
  url: string;
  icon: string; // Icon key
}

export const CONTACT_INFO = {
  phone: "0321 5544687",
  instituteName: "Tech Skill",
};

export const SOCIAL_LINKS: SocialLink[] = [
  { platform: "WhatsApp", url: "https://wa.me/923215544687", icon: "whatsapp" },
  { platform: "Facebook", url: "#", icon: "facebook" },
  { platform: "Instagram", url: "https://instagram.com/tech.skilll", icon: "instagram" },
];
