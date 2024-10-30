import { blogArticlesResume } from "../constants/blog-constants";
import { BlogArticleResume } from "./blog-article-resume";

export const PopularBlogPosts = () => (
  <section className="space-y-3">
    <h2 className="text-4xl font-bold uppercase sm:text-5xl">Popular blog posts</h2>

    <div className="grid gap-6 lg:grid-cols-2 lg:grid-rows-2">
      <div className="lg:col-span-2 lg:row-span-2 xl:col-span-1">
        <BlogArticleResume variant="vertical" articleResume={blogArticlesResume[0]} />
      </div>
      <BlogArticleResume articleResume={blogArticlesResume[1]} />
      <BlogArticleResume articleResume={blogArticlesResume[2]} />
    </div>
  </section>
);
