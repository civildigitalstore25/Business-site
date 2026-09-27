"use client";

import { SectionLink as Link } from "@/components/common/SectionLink";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { NavChild } from "@/lib/constants/nav";

type NavDropdownProps = {
  label: string;
  href: string;
  children: readonly NavChild[];
  isActive: boolean;
  onNavigate?: () => void;
  mobile?: boolean;
  showViewAll?: boolean;
};

export function NavDropdown({
  label,
  href,
  children,
  isActive,
  onNavigate,
  mobile = false,
  showViewAll = true,
}: NavDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mobile) return;
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [mobile]);

  if (mobile) {
    return (
      <div>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "flex w-full items-center justify-between text-sm font-medium py-2 text-slate-300 hover:text-white",
            isActive && "text-sky"
          )}
        >
          {label}
          <ChevronDown size={14} className={cn("transition-transform", open && "rotate-180")} />
        </button>
        {open && (
          <div className="pl-3 pb-2 space-y-1 border-l border-slate-700 ml-1">
            {showViewAll && (
              <Link
                href={href}
                onNavigate={onNavigate}
                className="block text-xs text-slate-400 hover:text-white py-1.5"
              >
                All {label}
              </Link>
            )}
            {children.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                onNavigate={onNavigate}
                className="block text-xs text-slate-400 hover:text-white py-1.5"
              >
                {child.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex items-center gap-1 text-sm font-medium text-slate-300 hover:text-white transition-colors",
          isActive && "text-sky"
        )}
      >
        {label}
        <ChevronDown size={14} className={cn("transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-2 w-56 bg-navy-light border border-slate-700 rounded-lg shadow-xl py-2 z-50">
          {showViewAll && (
            <>
              <Link
                href={href}
                onNavigate={() => { setOpen(false); onNavigate?.(); }}
                className="block px-4 py-2 text-xs font-semibold text-sky hover:bg-slate-800"
              >
                View all {label.toLowerCase()}
              </Link>
              <div className="my-1 h-px bg-slate-700" />
            </>
          )}
          {children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              onNavigate={() => { setOpen(false); onNavigate?.(); }}
              className="block px-4 py-2 text-xs text-slate-300 hover:text-white hover:bg-slate-800"
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
