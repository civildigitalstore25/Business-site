"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { rememberScrollTarget, scrollToSectionId } from "@/lib/scroll-to-section";
import type { SectionLinkProps } from "@/types";

function parseSectionHref(href: string) {
  const hashIndex = href.indexOf("#");
  if (hashIndex === -1) return null;
  const hash = href.slice(hashIndex + 1);
  if (!hash) return null;
  const rawPath = href.slice(0, hashIndex);
  if (!rawPath) return { path: "", hash };
  return { path: rawPath.startsWith("/") ? rawPath : `/${rawPath}`, hash };
}

function isModifiedClick(event: React.MouseEvent<HTMLAnchorElement>) {
  return event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0;
}

export function SectionLink({ href, className, children, onNavigate }: SectionLinkProps) {
  const pathname = usePathname();
  const router = useRouter();
  const target = parseSectionHref(href);

  const onClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!target || isModifiedClick(event)) {
      onNavigate?.();
      return;
    }
    event.preventDefault();
    onNavigate?.();
    const path = target.path || pathname;
    if (pathname === path) {
      scrollToSectionId(target.hash);
      window.history.pushState(null, "", `${path}#${target.hash}`);
      return;
    }
    rememberScrollTarget(target.hash);
    router.push(`${path}#${target.hash}`);
  };

  return (
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}
