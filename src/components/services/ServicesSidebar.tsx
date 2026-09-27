"use client";

import { SectionLink as Link } from "@/components/common/SectionLink";
import { useEffect, useState } from "react";
import { ROUTES, SERVICES_LIST } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function ServicesSidebar() {
  const [activeId, setActiveId] = useState<string>(SERVICES_LIST[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );

    SERVICES_LIST.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="sticky top-24 hidden lg:block w-56 flex-shrink-0">
      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4">Services</p>
      <ul className="space-y-1">
        {SERVICES_LIST.map((s) => (
          <li key={s.id}>
            <Link
              href={`#${s.id}`}
              className={cn(
                "block text-sm py-2 px-3 rounded-lg transition-colors leading-snug",
                activeId === s.id
                  ? "bg-sky/10 text-sky font-semibold"
                  : "text-charcoal hover:text-navy hover:bg-slate-50"
              )}
            >
              {s.title}
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-8 p-4 bg-off-white border border-[#E2E8F0] rounded-xl">
        <p className="text-xs font-semibold text-navy mb-1">Ready to build your next big thing?</p>
        <p className="text-[11px] text-[#64748B] mb-3 leading-relaxed">
          We&apos;ll pair you with the right team for your project.
        </p>
        <Link
          href={ROUTES.consultation}
          className="block text-center text-xs font-semibold bg-sky text-white rounded-lg py-2 hover:bg-[#0369A1] transition-colors"
        >
          Book a Consultation
        </Link>
      </div>
    </nav>
  );
}
