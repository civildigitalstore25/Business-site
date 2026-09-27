export const SCROLL_TARGET_KEY = "tomscope-scroll-target";

export function scrollToSectionId(id: string) {
  const el = document.getElementById(id);
  if (!el) return false;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  return true;
}

export function rememberScrollTarget(id: string) {
  try {
    sessionStorage.setItem(SCROLL_TARGET_KEY, id);
  } catch {
    /* Private browsing can block storage. The URL hash still carries the target. */
  }
}

export function readScrollTarget() {
  try {
    return sessionStorage.getItem(SCROLL_TARGET_KEY) ?? "";
  } catch {
    return "";
  }
}

export function clearScrollTarget() {
  try {
    sessionStorage.removeItem(SCROLL_TARGET_KEY);
  } catch {
    /* ignore */
  }
}
