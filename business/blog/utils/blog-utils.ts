import { TArticle } from "@/api/article";

export const groupByMonthAndYear = (articles: TArticle[]) =>
  articles.reduce<Record<string, TArticle[]>>((acc, article) => {
    const year = article.createdAt.getFullYear();
    const month = article.createdAt.getMonth() + 1;
    const key = `${year}-${month.toString().padStart(2, "0")}-01`; // Format "YYYY-MM-DD"

    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(article);

    return acc;
  }, {});
