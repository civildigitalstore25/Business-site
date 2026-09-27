"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { FAQ_ITEMS } from "@/lib/constants";
import { MotionSection } from "@/components/common/MotionSection";

export function HomeFaq() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section className="scroll-mt-24 bg-white py-12 sm:py-16 border-t border-[#E2E8F0]" id="faq">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <MotionSection className="text-center mb-8 sm:mb-10">
          <p className="section-label mb-2">FAQ</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-navy">Frequently Asked Questions</h2>
        </MotionSection>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div key={item.id} className="border border-[#E2E8F0] rounded-xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  className="w-full flex items-start justify-between gap-3 px-4 sm:px-5 py-3.5 sm:py-4 text-left hover:bg-off-white transition-colors"
                >
                  <span className="flex-1 min-w-0 text-sm font-semibold text-navy leading-snug">{item.question}</span>
                  <ChevronDown
                    size={16}
                    className={cn("text-sky flex-shrink-0 transition-transform", isOpen && "rotate-180")}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-4 text-sm text-[#64748B] leading-relaxed border-t border-[#F1F5F9] pt-3">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
