import { getAllArticleSlugs, getArticleById } from "@/api/article";
import { Article } from "@/business/article/components/article";
import { ViewCounter } from "@/business/article/components/view-counter";
import { extractDocumentIdFromArticleSlug } from "@/business/article/utils/article-utils";
import { CustomMDX, extractToc } from "@/components/ui/mdx-renderer";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return await getAllArticleSlugs();
}

export default async function BlogArticlePage({ params }: { params: { articleSlug: string } }) {
  const { articleSlug } = params;
  const documentId = extractDocumentIdFromArticleSlug(articleSlug);

  if (!documentId) {
    return notFound();
  }

  const article = await getArticleById(documentId);

  if (!article) {
    return notFound();
  }

  return (
    <>
      <ViewCounter articleDocumentId={article.documentId} />
      <Article article={article} toc={extractToc(article.content)} content={<CustomMDX source={article.content} />} />
    </>
  );
}
