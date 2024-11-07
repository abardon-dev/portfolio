"use client";

import { useRef, useEffect, PropsWithChildren } from "react";
import { useTags, useSortOrder, useMaxReadTime } from "../hooks/use-blog-filters";
import { BlogFilters } from "./filters/blog-filters";

type BlogListContainerProps = {
  availableTags: string[];
};

export const BlogListContainer = ({ children, availableTags }: PropsWithChildren<BlogListContainerProps>) => {
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
      {children}
    </section>
  );
};
