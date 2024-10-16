import { BlogFilters } from "@/business/blog/components/blog-filters";
import { BlogHeroSection } from "@/business/blog/components/blog-hero-section";
import { PopularBlogPosts } from "@/business/blog/components/popular-blog-posts";

export default function Blog() {
  return (
    <div className="space-y-6">
      <BlogHeroSection />
      <PopularBlogPosts />

      <section className="space-y-4">
        <BlogFilters />
      </section>
    </div>
  );
}
