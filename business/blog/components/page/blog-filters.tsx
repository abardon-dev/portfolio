"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { parseAsStringLiteral, useQueryState } from "nuqs";
import { useState } from "react";

export const BlogFilters = () => (
  <section className="space-y-3">
    <div className="flex justify-between gap-3">
      {/**TODO:  Tags filters*/}
      <SortByDateButton />
    </div>
  </section>
);

const sortOrder = ["ASC", "DESC"] as const;
type SortOrder = (typeof sortOrder)[number];

const SortByDateButton = () => {
  const [sort, setSort] = useQueryState<SortOrder>("sortDate", parseAsStringLiteral(sortOrder).withDefault("DESC"));
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSortByDate = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setSort((newSort) => (newSort === "ASC" ? "DESC" : "ASC"));
    }
  };

  return (
    <Button
      className="relative flex items-center font-sans text-sm"
      variant="ghost"
      size="sm"
      onClick={handleSortByDate}
    >
      <ArrowUp
        className={cn("mr-1 size-5 transition-transform duration-300", {
          "rotate-180": sort === "DESC"
        })}
      />
      <span className="mr-1">Date </span>
      <div className="relative h-[1.2em] w-[4.1ch] overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.span
            key={sort}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onAnimationComplete={() => setIsAnimating(false)}
            className="absolute inset-0 flex items-center justify-start whitespace-nowrap"
          >
            {sort}
          </motion.span>
        </AnimatePresence>
      </div>
    </Button>
  );
};
