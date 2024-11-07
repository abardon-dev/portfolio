import { AboutMeSection } from "@/business/landing/components/about-me-section";
import { BlogSection } from "@/business/landing/components/blog-section";
import { HeroSection } from "@/business/landing/components/hero-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutMeSection />
      {/**TODO: Wrap with Suspense ? */}
      <BlogSection />
    </>
  );
}
