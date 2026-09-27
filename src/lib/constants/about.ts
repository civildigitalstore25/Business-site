import { COMPANY, CODING_PRINCIPLES } from "./site";

export const ABOUT_HERO = {
  eyebrow: "About Tomscope",
  headline: "A Development Team Focused on Quality and Delivery.",
  subheadline:
    "We are an IT consulting and software development team helping businesses build websites, mobile apps, and integrations with practical technology choices and agile delivery.",
} as const;

export const ABOUT_STATS = [
  { value: "8+", label: "Projects Delivered" },
  { value: "2+", label: "Years Experience" },
  { value: "15+", label: "Technologies" },
  { value: "3", label: "Certifications" },
] as const;

export const ABOUT_VISION = COMPANY.vision;
export const ABOUT_MISSION = COMPANY.mission;

export const ABOUT_VALUES = [
  {
    title: "Agile Delivery",
    description:
      "We work in sprints with regular demos and feedback so you see progress early and can adjust direction quickly.",
  },
  {
    title: "Clean Code Standards",
    description:
      "DRY principle, UNDOAT principle, files under 250 lines, global constants, and reusable components guide every project.",
  },
  {
    title: "Right Technology Choices",
    description:
      "We use the stacks we know best — React, Next.js, Node.js, Flutter, and more — chosen to fit your project, not hype.",
  },
  {
    title: "End-to-End Support",
    description:
      "From consulting and development to hosting, SEO, DevOps, and integrations, we stay with you through launch and beyond.",
  },
] as const;

export const ABOUT_EXPERTISE = [
  "IT & Consulting",
  "Website Development",
  "Mobile App Development",
  "Hosting (Hostinger, GoDaddy, AWS)",
  "SEO Optimization",
  "DevOps & CI/CD",
  "WhatsApp, Email & OTP Integrations",
] as const;

export { CODING_PRINCIPLES };
