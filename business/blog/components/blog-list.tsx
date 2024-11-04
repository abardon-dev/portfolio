"use client";

import { BlogArticleResume } from "./blog-article-resume";
import { useMaxReadTime, useSortOrder, useTags } from "../hooks/use-blog-filters";
import { blogArticlesResume } from "../constants/blog-constants";
import { groupByMonthAndYear } from "../utils/blog-utils";
import React, { useEffect, useRef } from "react";
import { BlogFilters } from "./filters/blog-filters";

type BlogListProps = {
  availableTags: string[];
};

export const BlogList = ({ availableTags }: BlogListProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [tags] = useTags({ availableTags });
  const [sortOrder] = useSortOrder();
  const [maxReadTime] = useMaxReadTime();

  useEffect(
    function scrollOnFilterChange() {
      if (containerRef.current) {
        const containerTop = containerRef.current.getBoundingClientRect().top + window.scrollY;
        const currentScroll = window.scrollY;

        // Define the offset value (e.g., 120px above the container)
        const offset = 120;

        // Scroll only if the current scroll position is below the container
        if (currentScroll > containerTop - offset) {
          window.scrollTo({ top: containerTop - offset, behavior: "smooth" });
        }
      }
    },
    [tags, sortOrder, maxReadTime]
  );

  return (
    <section ref={containerRef} className="relative space-y-4">
      <BlogFilters availableTags={availableTags} />

      <section className="mx-auto flex w-full flex-col gap-4 lg:w-4/5">
        {Object.entries(groupByMonthAndYear(blogArticlesResume)).map(([date, articles]) => (
          <React.Fragment key={date}>
            <div className="flex w-full items-center first:hidden">
              <hr className="h-0.5 w-full bg-accent" />
              <div className="rounded-full border border-accent bg-background px-3 py-2 shadow-md">
                <p className="whitespace-nowrap text-2xs font-semibold uppercase text-muted">
                  {new Date(date).toLocaleString(undefined, { month: "long", year: "numeric" })}
                </p>
              </div>
              <hr className="my-2 h-0.5 w-full bg-accent" />
            </div>
            {articles.map((article) => (
              <BlogArticleResume key={article.title} articleResume={article} />
            ))}
          </React.Fragment>
        ))}
      </section>
    </section>
  );
};
