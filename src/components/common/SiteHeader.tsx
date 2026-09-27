"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ROUTES, NAV_LINKS, SITE, PUBLIC_ASSETS } from "@/lib/constants";
import { NavDropdown } from "@/components/common/NavDropdown";
import type { NavChild } from "@/lib/constants/nav";

function isNavActive(pathname: string, href: string, children?: readonly NavChild[]) {
  if (children?.length) {
    return children.some((child) => {
      if (child.href.startsWith("/#")) return false;
      return pathname === child.href || pathname.startsWith(`${child.href}/`);
    });
  }
  if (href.startsWith("/#")) return false;
  return pathname === href || (href !== "/" && pathname.startsWith(href));
}

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeMobile = () => setMobileOpen(false);

  const renderNavItem = (link: (typeof NAV_LINKS)[number], mobile = false) => {
    if (link.children) {
      return (
        <NavDropdown
          key={link.label}
          label={link.label}
          href={link.href}
          children={link.children}
          isActive={isNavActive(pathname, link.href, link.children)}
          onNavigate={mobile ? closeMobile : undefined}
          mobile={mobile}
          showViewAll={link.showViewAll ?? true}
        />
      );
    }
    return (
      <Link
        key={link.href}
        href={link.href}
        className={cn(
          mobile
            ? "block text-sm font-medium py-2 text-slate-300 hover:text-white"
            : "text-sm font-medium text-slate-300 hover:text-white transition-colors whitespace-nowrap",
          isNavActive(pathname, link.href) && "text-sky"
        )}
        onClick={mobile ? closeMobile : undefined}
      >
        {link.label}
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-50 bg-navy border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href={ROUTES.home} className="flex items-center gap-2.5 shrink-0 min-w-0 group">
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-lg overflow-hidden border border-white/20 shadow-sm shrink-0 bg-white/10">
              <Image
                src={PUBLIC_ASSETS.logo}
                alt={`${SITE.name} Logo`}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform"
                priority
              />
            </div>
            <span className="text-lg sm:text-xl font-bold text-white tracking-tight truncate">
              {SITE.name.toUpperCase()}
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {NAV_LINKS.map((link) => renderNavItem(link))}
          </nav>

          <div className="hidden lg:flex items-center shrink-0">
            <Link href={ROUTES.consultation} className="btn-sky text-sm whitespace-nowrap">
              Book a Consultation
            </Link>
          </div>

          <button
            className="lg:hidden p-2 text-slate-300 hover:text-white transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-navy border-t border-slate-800 px-4 py-4 space-y-1 max-h-[80vh] overflow-y-auto overscroll-contain">
          {NAV_LINKS.map((link) => renderNavItem(link, true))}
          <Link
            href={ROUTES.consultation}
            className="btn-sky text-sm block w-full text-center mt-3"
            onClick={closeMobile}
          >
            Book a Consultation
          </Link>
        </div>
      )}
    </header>
  );
}
