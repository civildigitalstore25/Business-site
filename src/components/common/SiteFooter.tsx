import { SectionLink as Link } from "@/components/common/SectionLink";
import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import {
  SITE,
  CONTACT,
  ROUTES,
  PUBLIC_ASSETS,
  FOOTER_SERVICES,
  FOOTER_EXPLORE,
  FOOTER_COMPANY,
  FOOTER_MOBILE_QUICK,
} from "@/lib/constants";
import { SocialIcons } from "@/components/common/SocialIcons";
import { FooterMobileSection } from "@/components/common/FooterMobileSection";

function FooterColumn({ title, links }: { title: string; links: readonly { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4">{title}</h3>
      <ul className="space-y-2.5">
        {links.map((l) => (
          <li key={l.label}>
            <Link href={l.href} className="text-xs text-slate-300 hover:text-white transition-colors">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FooterBrand() {
  return (
    <>
      <div className="flex items-center gap-2.5 mb-2">
        <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-white/20 shrink-0 bg-white/10">
          <Image
            src={PUBLIC_ASSETS.logo}
            alt={`${SITE.name} Logo`}
            fill
            className="object-cover object-center"
          />
        </div>
        <span className="text-lg font-bold tracking-tight">{SITE.name.toUpperCase()}</span>
      </div>
      <p className="mt-2 text-xs text-slate-400 leading-relaxed">{SITE.tagline}</p>
      <div className="mt-4">
        <SocialIcons />
      </div>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-navy text-white w-full">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-14">
        <div className="lg:hidden w-full">
          <FooterBrand />
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400">
            <a href={`mailto:${CONTACT.email}`} className="inline-flex items-center gap-1.5 hover:text-white transition-colors break-all">
              <Mail size={12} className="text-sky flex-shrink-0" />
              {CONTACT.email}
            </a>
            <span className="inline-flex items-center gap-1.5">
              <Phone size={12} className="text-sky flex-shrink-0" />
              {CONTACT.phone}
            </span>
          </div>

          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
            {FOOTER_MOBILE_QUICK.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="text-xs font-medium text-slate-300 hover:text-white transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="mt-4">
            <FooterMobileSection
              title="Browse Services"
              links={[
                ...FOOTER_SERVICES.slice(0, 5),
                { label: "View all services →", href: ROUTES.services },
              ]}
            />
          </div>
        </div>

        <div className="hidden lg:grid lg:grid-cols-4 gap-8">
          <div>
            <FooterBrand />
            <div className="mt-5 space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Mail size={12} className="text-sky flex-shrink-0" />
                <a href={`mailto:${CONTACT.email}`} className="hover:text-white transition-colors break-all">
                  {CONTACT.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={12} className="text-sky flex-shrink-0" />
                <span>{CONTACT.phone}</span>
              </div>
              <p className="text-slate-500 pt-1">{CONTACT.address}</p>
            </div>
          </div>
          <FooterColumn title="Services" links={FOOTER_SERVICES} />
          <FooterColumn title="Explore" links={FOOTER_EXPLORE} />
          <FooterColumn title="Company" links={FOOTER_COMPANY} />
        </div>

        <div className="mt-6 lg:mt-10 pt-4 lg:pt-5 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-slate-500">
          <p suppressHydrationWarning>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <Link href={ROUTES.consultation} className="text-sky hover:text-white transition-colors">
            Book a free consultation →
          </Link>
        </div>
      </div>
    </footer>
  );
}
