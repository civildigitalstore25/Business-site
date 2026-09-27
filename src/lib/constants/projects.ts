export interface ProjectItem {
  id: string;
  name: string;
  category: string;
  description: string;
  highlights: string[];
  image: string;
  imageAlt: string;
  projectUrl: string;
}

export const PROJECTS: ProjectItem[] = [
  {
    id: "softzcart",
    name: "SoftzCart",
    category: "Digital Software E-Commerce",
    description:
      "A full-featured digital software marketplace built by Tomscope — featuring brand categories (Autodesk, Adobe, Microsoft, Antivirus), instant license key distribution, shopping cart, checkout, and admin management workflows.",
    highlights: [
      "Brand-focused software catalog with search & filter",
      "Instant digital checkout & automated fulfillment",
      "Mobile-responsive e-commerce experience",
      "Integrated payment processing & order tracking",
    ],
    image: "/freelance/softzcart.png",
    imageAlt: "SoftzCart digital software e-commerce platform homepage screenshot",
    projectUrl: "https://softzcart.com",
  },
  {
    id: "civil-digital",
    name: "Civil Digital Store",
    category: "Engineering Software Store",
    description:
      "A specialized online store providing civil engineering software suites (Revit, AutoCAD, Lumion, Tekla), calculation spreadsheets, ebooks, and direct WhatsApp order support.",
    highlights: [
      "Curated civil & structural software catalog",
      "Digital distribution for engineering tools & ebooks",
      "One-click WhatsApp order placement integration",
      "Searchable product catalog with custom category filters",
    ],
    image: "/projects/civil.png",
    imageAlt: "Civil Digital Store civil engineering software store homepage screenshot",
    projectUrl: "https://civildigitalstore.com/",
  },
  {
    id: "gifwoods",
    name: "Gifwoods",
    category: "Artisanal Wooden Decor",
    description:
      "A modern e-commerce storefront showcasing handcrafted wooden home decor, nature-inspired wall clocks, plant holders, and custom corporate recognition trophies.",
    highlights: [
      "High-resolution product showcase & hero slider",
      "Corporate gifting request & award customization engine",
      "Seamless shopping cart & guest/user checkout",
      "Nature-inspired branding & responsive mobile layout",
    ],
    image: "/projects/gifwoods.png",
    imageAlt: "Gifwoods artisanal wooden decor homepage screenshot",
    projectUrl: "https://gifwoods.com/",
  },
  {
    id: "vsoil-mill",
    name: "VS Oil Mill",
    category: "Direct-to-Consumer Organic Brand",
    description:
      "An authentic e-commerce store for traditional Mara Chekku wood-pressed oils and A2 ghee, serving 12,000+ families with fresh direct-from-mill shipping across India.",
    highlights: [
      "FSSAI certified organic product catalog & ordering",
      "Pan-India express shipping & delivery calculation",
      "Direct WhatsApp order integration for instant reorders",
      "Trust badges, customer ratings & heritage storytelling",
    ],
    image: "/projects/vsoil.png",
    imageAlt: "VS Oil Mill traditional wood pressed oil homepage screenshot",
    projectUrl: "https://vsoilmill.com/",
  },
  {
    id: "aasina-curry-house",
    name: "Aasina Curry House",
    category: "Culinary & Dining Experience",
    description:
      "A heritage Malaysian restaurant website and digital dining platform featuring authentic menu showcases, location finder, signature dish spotlights, and customer inquiry workflows.",
    highlights: [
      "Heritage dining & interactive menu showcase",
      "Multi-location finder & direct contact integration",
      "Mobile-optimized responsive culinary interface",
      "Halal dining branding & signature dish spotlights",
    ],
    image: "/projects/aasinacurryhouse.png",
    imageAlt: "Aasina Curry House restaurant website homepage screenshot",
    projectUrl: "https://www.aasinacurryhouse.com/",
  },
];

export const FEATURED_PROJECT = PROJECTS[0];


