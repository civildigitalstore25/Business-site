import fs from "node:fs";
import path from "node:path";
import { HERO_BANNERS } from "@/lib/constants/hero-banners";
import type { HeroBanner } from "@/types";

export function getHeroBanners(): HeroBanner[] {
  return HERO_BANNERS.map((banner) => {
    const relative = banner.src.replace(/^\//, "");
    return {
      ...banner,
      ready: fs.existsSync(path.join(process.cwd(), "public", relative)),
    };
  });
}
