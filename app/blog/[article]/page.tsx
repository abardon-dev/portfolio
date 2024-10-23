import { BlogArticle } from "@/business/article/components/blog-article";
import { extractIdFromEncodedArticleTitle } from "@/business/article/utils/article-utils";
import { blogArticlesResume } from "@/business/blog/constants/blog-constants";

export default function BlogArticlePage({ params }: { params: { article: string } }) {
  let article = null;

  try {
    const givenArticleId = extractIdFromEncodedArticleTitle(params.article);
    article = blogArticlesResume.find((article) => article.id === givenArticleId);
  } catch (error) {
    console.log(error);
  }

  //TODO: Handle 404
  if (!article) {
    return <div>Article not found</div>;
  }

  return <BlogArticle articleResume={article} />;
}
