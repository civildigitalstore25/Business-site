import { SectionLink as Link } from "@/components/common/SectionLink";
import { ArrowRight, CheckCircle2, Target, Compass } from "lucide-react";
import {
  ABOUT_HERO, ABOUT_STATS, ABOUT_VISION, ABOUT_MISSION,
  ABOUT_VALUES, ABOUT_EXPERTISE, DEVELOPMENT_PRINCIPLES, ROUTES,
} from "@/lib/constants";

export const metadata = {
  title: "About Us | Tomscope",
  description: "Learn about Tomscope — our vision, mission, and development approach.",
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-navy text-white py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="min-w-0">
            <p className="text-sky text-xs font-bold uppercase tracking-widest mb-4">{ABOUT_HERO.eyebrow}</p>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">{ABOUT_HERO.headline}</h1>
            <p className="mt-4 sm:mt-5 text-slate-300 text-sm sm:text-base leading-relaxed">{ABOUT_HERO.subheadline}</p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {ABOUT_STATS.map((stat) => (
              <div key={stat.label} className="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-6">
                <p className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-slate-400 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-4 sm:gap-6">
          <div className="border border-border-light rounded-xl p-5 sm:p-7">
            <div className="flex items-center gap-2 mb-3">
              <Target size={18} className="text-sky" />
              <h2 className="text-lg font-bold text-navy">Our Vision</h2>
            </div>
            <p className="text-sm text-charcoal/80 leading-relaxed">{ABOUT_VISION}</p>
          </div>
          <div className="border border-border-light rounded-xl p-5 sm:p-7">
            <div className="flex items-center gap-2 mb-3">
              <Compass size={18} className="text-sky" />
              <h2 className="text-lg font-bold text-navy">Our Mission</h2>
            </div>
            <p className="text-sm text-charcoal/80 leading-relaxed">{ABOUT_MISSION}</p>
          </div>
        </div>
      </section>

      <section className="bg-off-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="section-label mb-3">How We Code</p>
          <h2 className="text-2xl font-bold text-navy mb-6">Development Principles</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {DEVELOPMENT_PRINCIPLES.map((item) => (
              <div key={item.id} className="bg-white border border-border-light rounded-lg px-4 py-4">
                <p className="text-xs font-bold text-sky mb-1">{item.acronym} — {item.mapsTo}</p>
                <p className="text-xs font-semibold text-navy mb-1">{item.title}</p>
                <p className="text-xs text-charcoal/70 leading-relaxed">{item.trustPoint}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8 lg:gap-12 min-w-0">
          <div>
            <p className="section-label mb-3">What We Do</p>
            <h2 className="text-2xl font-bold text-navy mb-5">Areas of Expertise</h2>
            <div className="space-y-2">
              {ABOUT_EXPERTISE.map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-charcoal">
                  <CheckCircle2 size={14} className="text-sky flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {ABOUT_VALUES.map((val) => (
              <div key={val.title} className="bg-off-white border border-border-light rounded-xl p-5">
                <h3 className="text-sm font-semibold text-navy mb-2">{val.title}</h3>
                <p className="text-xs text-charcoal/70 leading-relaxed">{val.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy py-14 text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-xl sm:text-2xl font-bold mb-3">Ready to start your project?</h2>
          <p className="text-slate-300 text-sm mb-6">Tell us what you need and we&apos;ll get back to you within 1 business day.</p>
          <Link href={ROUTES.consultation} className="btn-sky inline-flex items-center gap-2 text-sm">
            Book a Consultation <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </>
  );
}
