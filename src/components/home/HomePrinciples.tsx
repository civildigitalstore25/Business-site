"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { DEVELOPMENT_PRINCIPLES, ROUTES } from "@/lib/constants";
import type { DevelopmentPrinciple } from "@/lib/constants/principles";
import { MotionSection } from "@/components/common/MotionSection";

const ROTATE_MS = 2000;

export function HomePrinciples() {
  const [activeId, setActiveId] = useState<DevelopmentPrinciple["id"]>(DEVELOPMENT_PRINCIPLES[0].id);
  const [paused, setPaused] = useState(false);
  const active = DEVELOPMENT_PRINCIPLES.find((p) => p.id === activeId) ?? DEVELOPMENT_PRINCIPLES[0];

  const goToNext = useCallback(() => {
    setActiveId((current) => {
      const idx = DEVELOPMENT_PRINCIPLES.findIndex((p) => p.id === current);
      const next = (idx + 1) % DEVELOPMENT_PRINCIPLES.length;
      return DEVELOPMENT_PRINCIPLES[next].id;
    });
  }, []);

  useEffect(() => {
    if (paused) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const interval = setInterval(goToNext, ROTATE_MS);
    return () => clearInterval(interval);
  }, [paused, goToNext]);

  const selectPrinciple = (id: DevelopmentPrinciple["id"]) => {
    setActiveId(id);
  };

  return (
    <section className="scroll-mt-24 bg-navy text-white py-12 sm:py-16" id="principles">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-w-0">
        <MotionSection className="max-w-2xl mb-10">
          <p className="text-sky text-[10px] font-bold uppercase tracking-widest mb-2">How We Code</p>
          <h2 className="text-2xl sm:text-3xl font-bold leading-tight">
            Development Principles You Can Trust
          </h2>
          <p className="mt-3 text-sm text-slate-400 leading-relaxed">
            Every principle maps to a real outcome for your project — they rotate automatically, or select one to explore.
          </p>
        </MotionSection>

        <div
          className="grid lg:grid-cols-5 gap-4 sm:gap-6 min-w-0"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node)) setPaused(false);
          }}
        >
          <div className="lg:col-span-2 flex lg:grid lg:grid-cols-2 gap-2 min-w-0 overflow-x-auto scrollbar-hide lg:overflow-visible snap-x snap-mandatory -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 pb-1 lg:pb-0">
            {DEVELOPMENT_PRINCIPLES.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => selectPrinciple(p.id)}
                className={cn(
                  "text-left rounded-lg border px-3 py-2.5 sm:py-3 transition-all duration-200 min-w-0",
                  "shrink-0 w-[132px] sm:w-auto snap-start lg:shrink lg:w-auto lg:snap-align-none",
                  activeId === p.id
                    ? "border-sky bg-sky/15 shadow-[0_0_20px_rgba(2,132,199,0.25)]"
                    : "border-slate-700 bg-white/5 hover:border-slate-500 hover:bg-white/10"
                )}
              >
                <span className={cn(
                  "text-xs font-bold block",
                  activeId === p.id ? "text-sky" : "text-white"
                )}>
                  {p.acronym}
                </span>
                <span className="text-[10px] text-slate-400 mt-0.5 block leading-tight">{p.mapsTo}</span>
              </button>
            ))}
          </div>

          <div className="lg:col-span-3 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="h-full bg-white/5 border border-slate-700 rounded-xl p-5 sm:p-8"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-sky/20 flex items-center justify-center">
                    <ShieldCheck size={16} className="text-sky" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-sky">
                    Maps to {active.mapsTo}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-1">{active.title}</h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-5">{active.description}</p>
                <div className="bg-sky/10 border border-sky/30 rounded-lg px-4 py-3">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-sky mb-1">
                    Why it matters for you
                  </p>
                  <p className="text-sm text-slate-200 leading-relaxed">{active.trustPoint}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <MotionSection delay={0.15} className="mt-8 text-center">
          <Link
            href={ROUTES.about}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky hover:gap-2.5 transition-all"
          >
            Learn more about us <ArrowRight size={12} />
          </Link>
        </MotionSection>
      </div>
    </section>
  );
}
