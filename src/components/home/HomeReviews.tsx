"use client";

import { Star, Quote } from "lucide-react";
import { CLIENT_REVIEWS } from "@/lib/constants";
import { MotionSection } from "@/components/common/MotionSection";
import { ScrollRow, ScrollRowItem } from "@/components/common/ScrollRow";

function ReviewCard({ review }: { review: (typeof CLIENT_REVIEWS)[number] }) {
  return (
    <article className="h-full bg-white border border-[#E2E8F0] rounded-xl p-5 flex flex-col hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(15,23,42,0.10)] transition-all duration-300">
      <Quote size={18} className="text-sky/60 mb-3 flex-shrink-0" />
      <p className="text-xs text-[#64748B] leading-relaxed flex-1 mb-4 line-clamp-4">
        &ldquo;{review.text}&rdquo;
      </p>
      <div className="flex gap-0.5 mb-3">
        {Array.from({ length: review.rating }).map((_, i) => (
          <Star key={i} size={12} className="fill-amber-400 text-amber-400" />
        ))}
      </div>
      <div>
        <p className="text-sm font-semibold text-navy">{review.name}</p>
        <p className="text-[11px] text-[#94A3B8]">{review.role}</p>
      </div>
    </article>
  );
}

export function HomeReviews() {
  return (
    <section className="scroll-mt-24 bg-off-white py-10 sm:py-16 border-y border-[#E2E8F0] w-full" id="reviews">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MotionSection className="w-full mb-6 sm:mb-10">
          <p className="section-label mb-2">Client Reviews</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-navy leading-tight">What Our Clients Say</h2>
          <p className="mt-2 text-[11px] text-slate-400 sm:hidden">Swipe to read more →</p>
        </MotionSection>

        <div className="sm:hidden">
          <ScrollRow>
            {CLIENT_REVIEWS.map((review) => (
              <ScrollRowItem key={review.id}>
                <ReviewCard review={review} />
              </ScrollRowItem>
            ))}
          </ScrollRow>
        </div>

        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 w-full">
          {CLIENT_REVIEWS.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
