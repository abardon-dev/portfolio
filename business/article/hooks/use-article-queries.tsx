import { TArticleFilters, getPaginatedArticles } from "@/api/article";
import { ARTICLES_PAGE_SIZE } from "@/business/blog/constants/blog-constants";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useInfiniteArticles = (filters: TArticleFilters) =>
  useInfiniteQuery({
    queryKey: ["articles", { ...filters }],
    queryFn: ({ pageParam }) => getPaginatedArticles({ page: pageParam, size: ARTICLES_PAGE_SIZE }, filters),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      const totalPages = lastPage.meta.pagination.pageCount;
      if (totalPages <= lastPageParam) {
        return undefined;
      }

      return lastPageParam + 1;
    },
    staleTime: 15 * 60 * 1000 // 15 minutes
  });
