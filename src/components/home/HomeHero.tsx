import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HOME_HERO, HOME_STATS } from "@/lib/constants";
import { SectionLink } from "@/components/common/SectionLink";
import { MotionSection } from "@/components/common/MotionSection";
import { MotionStagger, MotionStaggerItem } from "@/components/common/MotionStagger";

export function HomeHero() {
  return (
    <section className="bg-[#F8FAFC] relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(226,232,240,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(226,232,240,0.5) 1px,transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center min-w-0">
          <MotionSection>
            <p className="section-label mb-4">{HOME_HERO.eyebrow}</p>
            <h1 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-extrabold text-[#0F172A] leading-[1.12] tracking-tight">
              {HOME_HERO.headline.split("\n").map((line, i) => (
                <span key={i}>
                  {line}
                  {i === 0 && <br />}
                </span>
              ))}
            </h1>
            <p className="mt-5 text-sm sm:text-base text-[#334155] leading-relaxed max-w-md">
              {HOME_HERO.subheadline}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3">
              <SectionLink href={HOME_HERO.primaryCta.href} className="btn-sky inline-flex items-center justify-center gap-2 text-sm w-full sm:w-auto">
                {HOME_HERO.primaryCta.label}
                <ArrowRight size={14} />
              </SectionLink>
              <Link href={HOME_HERO.secondaryCta.href} className="btn-outline inline-flex items-center justify-center gap-2 text-sm w-full sm:w-auto">
                {HOME_HERO.secondaryCta.label}
                <ArrowRight size={14} />
              </Link>
            </div>
          </MotionSection>

          <MotionStagger className="grid grid-cols-2 gap-4">
            {HOME_STATS.map((stat) => (
              <MotionStaggerItem key={stat.label}>
                <div className="card-hover bg-white border border-[#E2E8F0] rounded-xl p-5 sm:p-6 shadow-sm h-full">
                  <p className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">{stat.value}</p>
                  <p className="text-[11px] text-[#64748B] mt-1 leading-snug">{stat.label}</p>
                </div>
              </MotionStaggerItem>
            ))}
          </MotionStagger>
        </div>
      </div>
    </section>
  );
}
