import { TBlogArticleResume } from "../constants/blog-constants";

export const groupByMonthAndYear = (articles: TBlogArticleResume[]) =>
  articles.reduce<Record<string, TBlogArticleResume[]>>((acc, article) => {
    const year = article.date.getFullYear();
    const month = article.date.getMonth() + 1;
    const key = `${year}-${month.toString().padStart(2, "0")}-01`; // Format "YYYY-MM-DD"

    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(article);

    return acc;
  }, {});
