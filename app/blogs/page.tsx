import { BlogFilters } from "@/business/blog/components/page/blog-filters";
import { BlogHeroSection } from "@/business/blog/components/page/blog-hero-section";
import { PopularBlogPosts } from "@/business/blog/components/page/popular-blog-posts";

export default function Blog() {
  return (
    <div className="space-y-6">
      <BlogHeroSection />
      <PopularBlogPosts />
      <BlogFilters />
    </div>
  );
}
