"use client";

import { groupByMonthAndYear } from "../utils/blog-utils";
import React, { useState } from "react";
import { TArticleResume } from "@/api/article";
import { BlogArticleResume } from "./blog-article-resume";
import { NB_ARTICLES_FETCH_LIMIT } from "../constants/blog-constants";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { getPaginatedArticleResumes } from "../actions/get-paginated-article-resumes";

type BlogListProps = {
  initialArticles: TArticleResume[];
};

//TODO: Add scrolling down to load more articles

export const BlogList = ({ initialArticles }: BlogListProps) => {
  const [articles, setArticles] = useState<TArticleResume[]>(initialArticles);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(NB_ARTICLES_FETCH_LIMIT);
  const [isLimitReached, setIsLimitReached] = useState<boolean>(false);

  const loadMoreArticles = async () => {
    setIsLoading(true);
    getPaginatedArticleResumes(offset)
      .then((response) => {
        const newArticles = response.data;
        setArticles((prevArticles) => [...prevArticles, ...newArticles]);

        const nextOffset = offset + NB_ARTICLES_FETCH_LIMIT;

        if (nextOffset >= response.meta.pagination.total) {
          setIsLimitReached(true);
        } else {
          setOffset(nextOffset);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

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

      {isLoading && <LoaderCircle className="mx-auto size-6 animate-spin" />}
      {!isLimitReached && <Button onClick={loadMoreArticles}>Load more</Button>}
    </section>
  );
};
