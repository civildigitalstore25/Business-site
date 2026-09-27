export const HERO_CAROUSEL = {
  intervalMs: 3000,
  label: "Featured highlights",
  previousLabel: "Previous banner",
  nextLabel: "Next banner",
  slideLabel: "Show banner",
} as const;

/** Drop ChatGPT images here: public/hero/banner-1.jpg, banner-2.jpg, banner-3.jpg */
export const HERO_BANNERS = [
  {
    id: "consulting",
    src: "/hero/banner-1.png",
    alt: "Consultants reviewing a client project together in a sunlit office",
    title: "Consulting that starts with your goal",
    caption: "A clear plan for websites, apps, and the systems behind them.",
  },
  {
    id: "build",
    src: "/hero/banner-2.png",
    alt: "A developer building a website on a laptop in natural daylight",
    title: "Websites and apps built to last",
    caption: "Clean code, agile delivery, and technology we use every day.",
  },
  {
    id: "meeting",
    src: "/hero/banner-3.png",
    alt: "A client and consultant meeting over a laptop in a real office",
    title: "A conversation, then a build",
    caption: "Tell us what you need. We reply within one business day.",
  },
] as const;
