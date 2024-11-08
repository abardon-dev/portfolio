import { getPaginatedArticleResumesAPI } from "@/api/article";
import { getArticleTags } from "@/api/article-tag";
import { BlogHeroSection } from "@/business/blog/components/blog-hero-section";
import { BlogList } from "@/business/blog/components/blog-list";
import { BlogListContainer } from "@/business/blog/components/blog-list-container";
import { PopularBlogPosts } from "@/business/blog/components/popular-blog-posts";
import { NB_ARTICLES_FETCH_LIMIT } from "@/business/blog/constants/blog-constants";
import { Suspense } from "react";

export default function Blog() {
  return (
    <div className="space-y-6">
      <section className="mx-auto w-full sm:w-4/5 lg:w-2/3">
        <BlogHeroSection />
      </section>
      {/**TODO: Wrap with Suspense ? */}
      <PopularBlogPosts />

      <hr className="mx-auto h-0.5 w-4/5 bg-accent" />

      {/** Wrap with Suspense because of the usage of nuqs (and useSearchParams internally) */}
      <Suspense>
        <BlogListWrapper />
      </Suspense>
    </div>
  );
}

//TODO: If tag failed it should not avoid to display the list
//TODO: Handle the error if data can't be fetched
{
  /**TODO: Handle the suspense loading skeleton */
}

const BlogListWrapper = async () => {
  //TODO: Look for bypassed cache sometimes
  const [tags, articleResumesResponse] = await Promise.all([
    getArticleTags({ next: { tags: ["article-tags"] } }),
    getPaginatedArticleResumesAPI({ start: 0, limit: NB_ARTICLES_FETCH_LIMIT })
  ]);

  return (
    <BlogListContainer availableTags={tags}>
      <BlogList initialArticles={articleResumesResponse.data} />
    </BlogListContainer>
  );
};
