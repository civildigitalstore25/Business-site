"use client";

import { useHydrated } from "@/hooks/useHydrated";
import { HomeConsultationForm } from "@/components/home/HomeConsultationForm";
import { HomeConsultationSkeleton } from "@/components/home/HomeConsultationSkeleton";

export function HomeConsultationClient() {
  const hydrated = useHydrated();
  return (
    <div id="consultation" className="scroll-mt-24">
      {hydrated ? <HomeConsultationForm /> : <HomeConsultationSkeleton />}
    </div>
  );
}
