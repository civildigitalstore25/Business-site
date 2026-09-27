export const SITE = {
  name: "Tomscope",
  tagline: "IT Consulting & Software Development",
  title: "Tomscope | IT Consulting, Web & Mobile Development",
  description:
    "Tomscope delivers IT consulting, website and mobile app development, hosting, SEO, DevOps, and API integrations — built with agile practices and clean, maintainable code.",
  url: "https://tomscope.com",
  metadataBase: "https://tomscope.com",
  locale: "en_US",
} as const;

export const CONTACT = {
  email: "info@tomscope.com",
  phone: "+91 78716 94931",
  address: "Vadakkumangudi, Thanjavur, Tamil Nadu, India",
} as const;

export const COMPANY = {
  vision:
    "To empower businesses with reliable, scalable software that simplifies operations and accelerates growth.",
  mission:
    "We deliver end-to-end IT solutions — from consulting and development to hosting and integrations — using agile delivery, reusable components, and technologies our team uses every day.",
} as const;

export const CODING_PRINCIPLES = [
  "DRY principle — don't repeat yourself",
  "UNDOAT principle — keep solutions simple and purposeful",
  "Files under 250 lines for maintainability",
  "Global constants and shared configuration files",
  "Reusable components across the codebase",
  "Agile methodology with iterative delivery",
] as const;
