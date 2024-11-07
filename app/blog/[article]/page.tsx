import { getArticleById } from "@/api/article";
import { BlogArticle } from "@/business/article/components/blog-article";
import { ViewCounter } from "@/business/article/components/view-counter";
import { extractDocumentIdFromEncodedArticleTitle } from "@/business/article/utils/article-utils";

//TODO: Handle error and throws by extracting the article id
export default async function BlogArticlePage({ params }: { params: { article: string } }) {
  const givenArticleDocumentId = extractDocumentIdFromEncodedArticleTitle(params.article);
  const article = await getArticleById(givenArticleDocumentId);

  return (
    <>
      <ViewCounter articleDocumentId={article.documentId} />
      <BlogArticle article={article} />
    </>
  );
}
