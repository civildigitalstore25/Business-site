import { ROUTES } from "./routes";

export const FOOTER = {
  copyright: "Tomscope. All rights reserved.",
  sections: {
    contact: "Contact",
    follow: "Follow Us",
  },
} as const;

export const SOCIAL_LINKS = [
  { id: "facebook", label: "Facebook", href: "https://www.facebook.com/tommscope" },
  { id: "instagram", label: "Instagram", href: "https://www.instagram.com/tom_scope/" },
  { id: "youtube", label: "YouTube", href: "https://www.youtube.com/c/TomScope" },
  { id: "justdial", label: "Justdial", href: "https://www.justdial.com/Thanjavur/Tom-Scope-Vadakkumangudi/9999P4362-4362-240127124430-T2K7_BZDET" },
  { id: "google", label: "Google", href: "https://share.google/lt3nJXixixUTygdTU" },
] as const;

export const FOOTER_SERVICES = [
  { label: "IT & Consulting", href: "/services#it-consulting" },
  { label: "Website Development", href: "/services#website-development" },
  { label: "Mobile App Development", href: "/services#mobile-app-development" },
  { label: "Hosting", href: "/services#hosting" },
  { label: "SEO Optimization", href: "/services#seo-optimization" },
  { label: "DevOps", href: "/services#devops" },
  { label: "WhatsApp API", href: "/services#whatsapp-api" },
  { label: "Email Notification", href: "/services#email-notification" },
  { label: "Mobile OTP", href: "/services#mobile-otp" },
] as const;

export const FOOTER_EXPLORE = [
  { label: "Home", href: ROUTES.home },
  { label: "Our Work", href: ROUTES.projects },
  { label: "Client Reviews", href: ROUTES.reviews },
  { label: "How We Code", href: ROUTES.principles },
  { label: "Tech Stack", href: ROUTES.techStack },
  { label: "FAQ", href: ROUTES.faq },
  { label: "Blog", href: ROUTES.blog },
  { label: "Book Consultation", href: ROUTES.consultation },
] as const;

export const FOOTER_COMPANY = [
  { label: "About Us", href: ROUTES.about },
  { label: "Featured Projects", href: ROUTES.projects },
  { label: "All Services", href: ROUTES.services },
  { label: "Contact", href: ROUTES.consultation },
] as const;

/** Compact links shown on mobile — no long scroll list */
export const FOOTER_MOBILE_QUICK = [
  { label: "Services", href: ROUTES.services },
  { label: "About", href: ROUTES.about },
  { label: "Blog", href: ROUTES.blog },
  { label: "FAQ", href: ROUTES.faq },
  { label: "Our Work", href: ROUTES.projects },
  { label: "Contact", href: ROUTES.consultation },
] as const;
