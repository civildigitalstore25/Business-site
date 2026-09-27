export const HOME_HERO = {
  eyebrow: "IT Consulting & Software Development",
  headline: "We Build Solutions.\nYou Grow Faster.",
  subheadline:
    "Tomscope provides IT consulting, website and mobile app development, hosting, SEO, DevOps, and API integrations — delivered with agile methodology and clean, maintainable code.",
  primaryCta: { label: "Book a Consultation", href: "/#consultation" },
  secondaryCta: { label: "View Our Services", href: "/services" },
} as const;

export const HOME_STATS = [
  { value: "8+", label: "Projects Delivered" },
  { value: "2+", label: "Years Experience" },
  { value: "15+", label: "Technologies" },
  { value: "3", label: "Certifications" },
] as const;

export const CONSULTATION_STEPS = ["About You", "Project Details", "Additional Info"] as const;

export const PROJECT_TYPES = [
  "IT & Consulting",
  "Website Development",
  "Mobile App Development",
  "Hosting",
  "SEO Optimization",
  "DevOps",
  "WhatsApp API Integration",
  "Email Notification",
  "Mobile OTP Integration",
  "Other",
] as const;
