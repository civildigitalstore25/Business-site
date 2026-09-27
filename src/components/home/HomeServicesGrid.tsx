import Link from "next/link";
import {
  Briefcase, Globe, Smartphone, Server, Search, GitBranch,
  MessageCircle, Mail, ShieldCheck, ArrowRight,
} from "lucide-react";
import { HOME_SERVICES } from "@/lib/constants";
import { MotionSection } from "@/components/common/MotionSection";
import { MotionStagger, MotionStaggerItem } from "@/components/common/MotionStagger";

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Briefcase, Globe, Smartphone, Server, Search, GitBranch, MessageCircle, Mail, ShieldCheck,
};

function ServiceCard({ service }: { service: (typeof HOME_SERVICES)[number] }) {
  const Icon = ICON_MAP[service.icon];
  return (
    <div className="group h-full bg-white border border-[#E2E8F0] rounded-xl p-4 sm:p-6 flex flex-col hover:-translate-y-1 hover:border-sky hover:shadow-[0_12px_32px_rgba(2,132,199,0.14)] transition-all duration-300 min-w-0">
      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg border border-[#E2E8F0] flex items-center justify-center mb-3 sm:mb-4 group-hover:border-sky/40 group-hover:bg-sky/5 transition-colors">
        {Icon && <Icon size={20} className="text-charcoal group-hover:text-sky transition-colors" />}
      </div>
      <h3 className="text-xs sm:text-sm font-bold text-navy mb-1.5 sm:mb-2 leading-snug">{service.title}</h3>
      <p className="text-[11px] sm:text-xs text-[#64748B] leading-relaxed flex-1 mb-3 sm:mb-4 line-clamp-3 sm:line-clamp-none">
        {service.description}
      </p>
      <Link
        href={service.href}
        className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-sky group-hover:gap-2 transition-all"
      >
        Learn more <ArrowRight size={11} />
      </Link>
    </div>
  );
}

export function HomeServicesGrid() {
  return (
    <section className="scroll-mt-24 bg-white py-10 sm:py-16 w-full" id="services">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MotionSection className="w-full mb-6 sm:mb-10">
          <p className="section-label mb-2">Our Services</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-navy leading-tight">
            Everything You Need to Build & Grow
          </h2>
        </MotionSection>

        <MotionStagger className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 w-full">
          {HOME_SERVICES.map((service) => (
            <MotionStaggerItem key={service.title}>
              <ServiceCard service={service} />
            </MotionStaggerItem>
          ))}
        </MotionStagger>
      </div>
    </section>
  );
}
