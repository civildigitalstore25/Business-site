import { SectionLink as Link } from "@/components/common/SectionLink";
import { ROUTES, NAV_LINKS, SITE } from "@/lib/constants";

/** Static header placeholder — same layout, no interactive buttons (SSR / pre-hydration). */
export function SiteHeaderShell() {
  return (
    <header className="sticky top-0 z-50 bg-navy border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href={ROUTES.home} className="text-lg sm:text-xl font-bold text-white tracking-tight truncate max-w-[60vw]">
            {SITE.name}
          </Link>
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8" aria-hidden>
            {NAV_LINKS.map((link) => (
              <span key={link.label} className="text-sm font-medium text-slate-300">
                {link.label}
              </span>
            ))}
          </nav>
          <Link href={ROUTES.consultation} className="btn-sky text-sm hidden lg:inline-flex">
            Book a Consultation
          </Link>
          <div className="lg:hidden w-8 h-8" aria-hidden />
        </div>
      </div>
    </header>
  );
}
