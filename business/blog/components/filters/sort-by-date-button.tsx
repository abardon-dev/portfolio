"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useState } from "react";
import { useSortOrder } from "../../hooks/use-blog-filters";

export const SortByDateButton = () => {
  const [sort, setSort] = useSortOrder();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSortByDate = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setSort((newSort) => (newSort === "ASC" ? "DESC" : "ASC"));
    }
  };

  return (
    <Button className="relative flex items-start font-sans text-sm" variant="ghost" onClick={handleSortByDate}>
      <ArrowUp
        className={cn("mr-1 size-5 transition-transform duration-300", {
          "rotate-180": sort === "DESC"
        })}
      />
      <span className="mr-1">Date </span>

      <div className="relative h-[1.2em] w-[4.1ch] overflow-hidden">
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: sort === "DESC" ? 0 : "-1.4em" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          onAnimationComplete={() => setIsAnimating(false)}
          className="absolute inset-0 flex flex-col items-start justify-start"
        >
          <span>DESC</span>
          <span>ASC</span>
        </motion.div>
      </div>
    </Button>
  );
};
