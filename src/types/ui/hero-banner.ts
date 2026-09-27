export type HeroBanner = {
  id: string;
  src: string;
  alt: string;
  title: string;
  caption: string;
  ready?: boolean;
};

export type HeroBannerCarouselProps = {
  banners: readonly HeroBanner[];
};

export type HeroBannerSlideProps = {
  banner: HeroBanner;
  active: boolean;
  priority: boolean;
};
