"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { HeroBannerSlideProps } from "@/types";

export function HeroBannerSlide({ banner, active, priority }: HeroBannerSlideProps) {
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);

  return (
    <div className="relative h-full w-full">
      <div className="hero-banner-fallback absolute inset-0" />
      {!failed && banner.ready && (
        <Image
          src={banner.src}
          alt={banner.alt}
          fill
          priority={priority}
          sizes="(max-width: 640px) 86vw, 64vw"
          className={cn("object-cover transition-opacity duration-500", ready ? "opacity-100" : "opacity-0")}
          onLoad={() => setReady(true)}
          onError={() => setFailed(true)}
        />
      )}
      {active && (
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-navy/80 via-navy/10 to-transparent">
          <div className="p-5 sm:p-8">
            <p className="text-lg sm:text-3xl font-bold text-white leading-tight">{banner.title}</p>
            <p className="mt-2 max-w-md text-sm text-slate-200">{banner.caption}</p>
          </div>
        </div>
      )}
    </div>
  );
}
