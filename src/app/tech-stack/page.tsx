import { SectionLink as Link } from "@/components/common/SectionLink";
import { ArrowRight } from "lucide-react";
import { ROUTES } from "@/lib/constants";
import { TechStackFilter } from "@/components/tech-stack/TechStackFilter";

export const metadata = {
  title: "Tech Stack | Tomscope",
  description: "Technologies, frameworks, and tools Tomscope uses for development and delivery.",
};

export default function TechStackPage() {
  return (
    <>
      <section className="bg-navy text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sky text-[10px] font-bold uppercase tracking-widest mb-4">Our Tech Stack</p>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight max-w-2xl">
            Technologies we use every day.
          </h1>
          <p className="mt-4 text-slate-300 text-sm leading-relaxed max-w-xl">
            Frontend, backend, mobile, databases, hosting, and DevOps tools — chosen for reliability and maintainability.
          </p>
        </div>
      </section>

      <section className="bg-off-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TechStackFilter />
        </div>
      </section>

      <section className="bg-white border-t border-border-light py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-lg font-bold text-navy mb-2">Need a specific technology?</h2>
          <p className="text-charcoal/70 text-sm mb-6">We can help you pick the right stack for your project.</p>
          <Link href={ROUTES.consultation} className="btn-sky inline-flex items-center gap-2 text-sm">
            Book a Consultation <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </>
  );
}
