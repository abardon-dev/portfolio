import { getArticleTags } from "@/api/article-tag";
import { BlogHeroSection } from "@/business/blog/components/blog-hero-section";
import { BlogList } from "@/business/blog/components/blog-list";
import { PopularBlogPosts } from "@/business/blog/components/popular-blog-posts";
import { Suspense } from "react";

export default async function Blog() {
  const tags: string[] = await getArticleTags({ next: { tags: ["article-tags"] } });

  return (
    <div className="space-y-6">
      <section className="mx-auto w-full sm:w-4/5 lg:w-2/3">
        <BlogHeroSection />
      </section>
      <PopularBlogPosts />

      <hr className="mx-auto h-0.5 w-4/5 bg-accent" />

      {/** Wrap with Suspense because of the usage of nuqs (and useSearchParams internally) */}
      <Suspense>
        <BlogList availableTags={tags} />
      </Suspense>
    </div>
  );
}
