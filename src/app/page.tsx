import { HomeHero } from "@/components/home/HomeHero";
import { HomeServicesGrid } from "@/components/home/HomeServicesGrid";
import { HomePrinciplesClient } from "@/components/home/HomePrinciplesClient";
import { HomeProjectSection } from "@/components/home/HomeProjectSection";
import { HomeReviews } from "@/components/home/HomeReviews";
import { HomeTechStrip } from "@/components/home/HomeTechStrip";
import { HomeBlogPreview } from "@/components/home/HomeBlogPreview";
import { HomeConsultationClient } from "@/components/home/HomeConsultationClient";
import { ContactMap } from "@/components/home/ContactMap";
import { HomeFaq } from "@/components/home/HomeFaq";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeServicesGrid />
      <HomePrinciplesClient />
      <HomeProjectSection />
      <HomeReviews />
      <HomeTechStrip />
      <HomeBlogPreview />
      <HomeFaq />
      <HomeConsultationClient />
      <ContactMap />
    </>
  );
}
