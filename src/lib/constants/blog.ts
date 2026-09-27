export const BLOG_POSTS = [
  {
    slug: "why-nextjs-for-business-websites",
    title: "Why Next.js Is a Smart Choice for Business Websites",
    excerpt:
      "Faster load times, better SEO, and a modern developer experience — here's why we often recommend Next.js for company sites.",
    category: "Web Development",
    date: "2026-03-15",
    readTime: "4 min read",
    content: `Next.js combines React with server-side rendering and static generation, which helps business websites rank better and load faster.

For Tomscope clients, this means marketing pages that score well on Core Web Vitals, blog content that is indexable on day one, and a codebase that scales when you add dashboards or customer portals later.

We pair Next.js with TypeScript and Tailwind CSS to keep projects maintainable — following our DRY and reusable-component standards so your site stays easy to update.`,
  },
  {
    slug: "whatsapp-api-for-customer-updates",
    title: "Using WhatsApp API for Customer Order Updates",
    excerpt:
      "Automated WhatsApp messages can improve delivery rates and reduce support calls. Here's how we implement it.",
    category: "Integrations",
    date: "2026-02-28",
    readTime: "5 min read",
    content: `WhatsApp Business API lets you send order confirmations, shipping alerts, and OTP codes through a channel customers already use daily.

Our integration approach covers webhook handling, template approval, rate limiting, and secure storage of customer phone numbers. We connect the API to your existing backend — whether Node.js, Python, or Java.

Projects like SoftzCart benefit from timely notifications without building a separate mobile app just for alerts.`,
  },
  {
    slug: "devops-basics-for-small-teams",
    title: "DevOps Basics Every Small Team Should Adopt",
    excerpt:
      "GitHub Actions, automated tests, and SonarQube — practical DevOps steps that prevent production surprises.",
    category: "DevOps",
    date: "2026-01-20",
    readTime: "6 min read",
    content: `You do not need a large platform team to benefit from DevOps. Start with a CI pipeline that runs on every pull request, add SonarQube for code quality gates, and deploy to Hostinger, GoDaddy, or AWS with a repeatable script.

We help teams set up Jenkins or GitHub Actions pipelines, environment secrets, and staging environments so releases become routine instead of stressful.

PostHog analytics can be added to track errors and user flows after deployment — closing the loop between shipping and learning.`,
  },
] as const;

export type BlogPost = (typeof BLOG_POSTS)[number];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
