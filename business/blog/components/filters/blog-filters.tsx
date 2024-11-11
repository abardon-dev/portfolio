"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/utils/cn";
import { MaxReadTimeSelect } from "./max-read-time-select";
import { MultiSelectTags } from "./multi-select-tags";
import { SortByDateButton } from "./sort-by-date-button";
import { TArticleFilters } from "@/api/article";
import { UseQueryStateOptions } from "nuqs";

type BlogFiltersProps = {
  availableTags: string[];
  filters: Required<TArticleFilters>;
  setFilters: (filters: TArticleFilters, options?: UseQueryStateOptions<TArticleFilters>) => void;
};

export const BlogFilters = ({ availableTags, filters, setFilters }: BlogFiltersProps) => {
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
          "glass-bg w-4/5 rounded-lg px-2 py-1": isSticky
        })}
      >
        <div className="flex justify-between gap-3">
          <MultiSelectTags
            availableTags={availableTags}
            tags={filters.tags}
            onTagsChange={(newTags) => setFilters({ ...filters, tags: newTags })}
          />
          <div className="flex gap-3">
            <MaxReadTimeSelect
              maxReadTime={filters.maxReadTime}
              onChange={(newMaxReadTime) => setFilters({ ...filters, maxReadTime: newMaxReadTime })}
            />
            <SortByDateButton
              sort={filters.sortByDate}
              onChange={(newSort) => setFilters({ ...filters, sortByDate: newSort })}
            />
          </div>
        </div>
      </section>
    </>
  );
};
