import { Mail, MapPin } from "lucide-react";
import { CONTACT, MAP_EMBED_SRC, SITE } from "@/lib/constants";

export function ContactMap() {
  return (
    <section className="bg-off-white pb-12 sm:pb-20" aria-label="Office location">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full min-w-0">
      <div className="flex items-start gap-2 mb-3">
        <MapPin size={14} className="text-sky flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-navy">{CONTACT.visitLabel}</p>
          <p className="text-xs text-[#64748B] mt-0.5">{CONTACT.address}</p>
          <a href={`mailto:${CONTACT.email}`} className="mt-1 inline-flex items-center gap-1.5 text-xs text-sky hover:underline">
            <Mail size={12} />
            {CONTACT.email}
          </a>
        </div>
      </div>
      <div className="rounded-xl overflow-hidden border border-[#E2E8F0] bg-white shadow-sm h-[240px] sm:h-[320px] lg:h-[380px]">
        <iframe
          title={`${SITE.name} office on Google Maps`}
          src={MAP_EMBED_SRC}
          className="w-full h-full border-0"
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
      </div>
    </section>
  );
}
