"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  clearScrollTarget,
  readScrollTarget,
  scrollToSectionId,
} from "@/lib/scroll-to-section";

function targetId() {
  const fromHash = window.location.hash.replace(/^#/, "");
  if (fromHash) {
    clearScrollTarget();
    return fromHash;
  }
  return readScrollTarget();
}

export function HashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const id = targetId();
    if (!id) return;

    let tries = 0;
    let timer = 0;
    const run = () => {
      if (scrollToSectionId(id)) {
        clearScrollTarget();
        return;
      }
      if (tries++ < 30) timer = window.setTimeout(run, 80);
    };
    run();
    return () => window.clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    const onHashChange = () => {
      const id = window.location.hash.replace(/^#/, "");
      if (id) scrollToSectionId(id);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return null;
}
