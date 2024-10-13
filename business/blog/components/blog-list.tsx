"use client";

import { BlogArticleResume } from "./blog-article-resume";
import { useMaxReadTime, useSortOrder, useTags } from "../hooks/use-blog-filters";
import { blogArticlesResume } from "../constants/blog-constants";
import { groupByMonthAndYear } from "../utils/blog-utils";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/utils/cn";
import { MaxReadTimeSelect } from "./filters/max-read-time-select";
import { MultiSelectTags } from "./filters/multi-select-tags";
import { SortByDateButton } from "./filters/sort-by-date-button";

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
      <BlogFilters />

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

const BlogFilters = () => {
  const [isSticky, setIsSticky] = useState<boolean>(false);
  const filterSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stickyElement = filterSectionRef.current;
    if (!stickyElement) {
      return;
    }

    const handleScroll = () => {
      const rect = stickyElement.getBoundingClientRect();
      const topOffset = parseInt(getComputedStyle(stickyElement).top);
      setIsSticky(rect.top <= topOffset);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <section
        ref={filterSectionRef}
        className={cn("sticky top-10 z-10 mx-auto w-full space-y-3 transition-all duration-300 ease-out sm:top-28", {
          "glass-bg rounded-lg px-2 py-1 lg:w-4/5": isSticky
        })}
      >
        <div className="flex justify-between gap-3 @container">
          <MultiSelectTags tags={["react", "next.js", "typescript", "node.js", "tailwindcss"]} />
          <div className="flex gap-3">
            <MaxReadTimeSelect />
            <SortByDateButton />
          </div>
        </div>
      </section>
    </>
  );
};
