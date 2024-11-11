"use client";

import { groupByMonthAndYear } from "../utils/blog-utils";
import React from "react";
import { BlogArticleResume } from "./blog-article-resume";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { useArticleFilters } from "@/business/article/hooks/use-article-filters";
import { useInfiniteArticles } from "@/business/article/hooks/use-article-queries";
import { Arrays } from "@/utils/arrays";
import { ARTICLES_PAGE_SIZE } from "../constants/blog-constants";
import { Skeleton } from "@/components/ui/skeleton";

//TODO: Add scrolling down to load more articles

export const BlogList = ({ availableTags }: { availableTags: string[] }) => {
  const [filters] = useArticleFilters({ availableTags });
  const { data, isFetchingNextPage, hasNextPage, fetchNextPage, isPending, isError } = useInfiniteArticles(filters);

  const articles = data?.pages.flatMap((page) => page.data) || [];

  if (isPending) {
    return Array.from({ length: ARTICLES_PAGE_SIZE }).map((_, index) => (
      <Skeleton className="mx-auto h-36 w-full lg:w-4/5" key={index} />
    ));
  }

  if (isError || (!isError && Arrays.isEmpty(articles))) {
    return <p className="mx-auto text-center">Aucun article correspondant à votre recherche</p>;
  }

  return (
    <section className="mx-auto flex w-full flex-col gap-4 lg:w-4/5">
      {Object.entries(groupByMonthAndYear(articles)).map(([date, articleResumes]) => (
        <React.Fragment key={date}>
          <div className="flex w-full items-center">
            <hr className="h-0.5 w-full bg-accent" />
            <div className="rounded-full border border-accent bg-background px-3 py-2 shadow-md">
              <p className="whitespace-nowrap text-2xs font-semibold uppercase text-muted">
                {new Date(date).toLocaleString(undefined, { month: "long", year: "numeric" })}
              </p>
            </div>
            <hr className="my-2 h-0.5 w-full bg-accent" />
          </div>
          {articleResumes.map((articleResume) => (
            <BlogArticleResume key={articleResume.title} articleResume={articleResume} />
          ))}
        </React.Fragment>
      ))}

      {isFetchingNextPage && <LoaderCircle className="mx-auto size-6 animate-spin" />}
      {hasNextPage && <Button onClick={() => fetchNextPage()}>Load more</Button>}
    </section>
  );
};
