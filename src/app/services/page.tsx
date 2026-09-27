import { SectionLink as Link } from "@/components/common/SectionLink";
import { ArrowRight } from "lucide-react";
import { SERVICES_HERO, ROUTES } from "@/lib/constants";
import { ServicesPageContent } from "@/components/services/ServicesPageContent";

export const metadata = {
  title: "Services | Tomscope",
  description: "End-to-end IT consulting and software development services for enterprise clients.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="bg-navy text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sky text-[10px] font-bold uppercase tracking-widest mb-4">
            {SERVICES_HERO.eyebrow}
          </p>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight max-w-2xl">
            {SERVICES_HERO.headline}
          </h1>
          <p className="mt-3 text-slate-300 text-sm leading-relaxed max-w-lg">
            {SERVICES_HERO.subheadline}
          </p>
        </div>
      </section>

      <ServicesPageContent />

      <section className="bg-off-white border-t border-[#E2E8F0] py-10 sm:py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-navy mb-2">
            Ready to accelerate your next project?
          </h2>
          <p className="text-sm text-[#64748B] mb-6">
            Let&apos;s build something great together.
          </p>
          <Link href={ROUTES.consultation} className="btn-sky inline-flex items-center gap-2 text-sm">
            Book a Consultation <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </>
  );
}
