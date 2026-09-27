"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { HERO_CAROUSEL } from "@/lib/constants";
import { ANIMATION_EASE } from "@/lib/constants/animations";
import { cn } from "@/lib/utils";
import { HeroBannerSlide } from "@/components/home/HeroBannerSlide";
import type { HeroBannerCarouselProps } from "@/types";
import "./hero-carousel.css";

function relativeOffset(index: number, active: number, total: number) {
  let offset = index - active;
  if (offset > total / 2) offset -= total;
  if (offset < -total / 2) offset += total;
  return offset;
}

export function HeroBannerCarousel({ banners }: HeroBannerCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [wide, setWide] = useState(false);
  const [reduced, setReduced] = useState(false);
  const total = banners.length;

  useEffect(() => {
    const widthQuery = window.matchMedia("(min-width: 640px)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setWide(widthQuery.matches);
      setReduced(motionQuery.matches);
    };
    sync();
    widthQuery.addEventListener("change", sync);
    motionQuery.addEventListener("change", sync);
    return () => {
      widthQuery.removeEventListener("change", sync);
      motionQuery.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    if (reduced || paused) return;
    const id = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % total);
    }, HERO_CAROUSEL.intervalMs);
    return () => window.clearInterval(id);
  }, [paused, reduced, total]);

  const go = (direction: number) => {
    setActiveIndex((current) => (current + direction + total) % total);
  };

  return (
    <section
      className="relative overflow-hidden bg-navy"
      aria-roledescription="carousel"
      aria-label={HERO_CAROUSEL.label}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        const next = event.relatedTarget;
        if (next instanceof Node && event.currentTarget.contains(next)) return;
        setPaused(false);
      }}
    >
      <div className="hero-orbit hero-orbit-lg" aria-hidden />
      <div className="hero-orbit hero-orbit-sm" aria-hidden />
      <div className="hero-stage relative h-72 sm:h-96 lg:h-[32rem]">
        {banners.map((banner, index) => {
          const offset = relativeOffset(index, activeIndex, total);
          const distance = Math.abs(offset);
          return (
            <motion.div
              key={banner.id}
              className="hero-slide absolute top-[7%] bottom-4 left-[7%] right-[7%] cursor-pointer overflow-hidden rounded-2xl shadow-2xl sm:left-[18%] sm:right-[18%]"
              aria-hidden={distance > 1}
              animate={{
                x: `${offset * (wide ? 68 : 86)}%`,
                rotateY: reduced ? 0 : offset * (wide ? -38 : -16),
                scale: distance === 0 ? 1 : wide ? 0.84 : 0.92,
                opacity: distance > 1 ? 0 : distance === 0 ? 1 : 0.72,
                zIndex: 10 - distance,
              }}
              transition={{ duration: reduced ? 0 : 0.65, ease: ANIMATION_EASE.smooth }}
              onClick={() => setActiveIndex(index)}
            >
              <HeroBannerSlide banner={banner} active={offset === 0} priority={index === 0} />
            </motion.div>
          );
        })}
      </div>
      <div className="relative z-20 flex items-center justify-center gap-3 pb-5">
        <button type="button" className="hero-carousel-btn" aria-label={HERO_CAROUSEL.previousLabel} onClick={() => go(-1)}>
          <ChevronLeft size={18} />
        </button>
        <div className="flex items-center gap-2">
          {banners.map((banner, index) => (
            <button
              key={banner.id}
              type="button"
              aria-label={`${HERO_CAROUSEL.slideLabel} ${index + 1}`}
              aria-current={index === activeIndex ? "true" : undefined}
              className={cn("hero-carousel-dot", index === activeIndex && "hero-carousel-dot-active")}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
        <button type="button" className="hero-carousel-btn" aria-label={HERO_CAROUSEL.nextLabel} onClick={() => go(1)}>
          <ChevronRight size={18} />
        </button>
      </div>
    </section>
  );
}
