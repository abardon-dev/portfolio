import { getArticleById } from "@/api/article";
import { Article } from "@/business/article/components/article";
import { ViewCounter } from "@/business/article/components/view-counter";
import { extractDocumentIdFromEncodedArticleTitle } from "@/business/article/utils/article-utils";
import { CustomMDX, extractToc } from "@/components/ui/mdx-renderer";

//TODO: Handle error and throws by extracting the article id
export default async function BlogArticlePage({ params }: { params: { article: string } }) {
  const givenArticleDocumentId = extractDocumentIdFromEncodedArticleTitle(params.article);
  const article = await getArticleById(givenArticleDocumentId);
  const toc = extractToc(article.content);

  return (
    <>
      <ViewCounter articleDocumentId={article.documentId} />
      <Article article={article} toc={toc} content={<CustomMDX source={article.content} />} />
    </>
  );
}
