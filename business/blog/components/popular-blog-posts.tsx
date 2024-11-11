import { getPopularArticles } from "@/api/article";
import { BlogArticleResume } from "./blog-article-resume";

export const PopularBlogPosts = async () => {
  const articleResumes = await getPopularArticles({ next: { revalidate: 1800 /** 30 minutes */ } });

  return (
    <section className="space-y-3">
      <h2 className="text-4xl font-bold uppercase sm:text-5xl">Popular blog posts</h2>

      <div className="grid gap-6 lg:grid-cols-2 lg:grid-rows-2">
        <div className="lg:col-span-2 lg:row-span-2 xl:col-span-1">
          <BlogArticleResume variant="vertical" articleResume={articleResumes[0]} />
        </div>
        {articleResumes.slice(1).map((articleResume) => (
          <BlogArticleResume key={articleResume.id} articleResume={articleResume} />
        ))}
      </div>
    </section>
  );
};
