"use client";

import { ToC } from "@/components/ui/mdx-renderer";
import { cn } from "@/utils/cn";
import { useEffect, useState } from "react";

export const ArticleTocElement = ({ title, anchor, level }: ToC[number]) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    const handleAnchorChange = () => {
      const newAnchor = window.location.hash;
      setIsActive(newAnchor === anchor);
    };

    window.addEventListener("popstate", handleAnchorChange);
    handleAnchorChange();

    return () => {
      window.removeEventListener("popstate", handleAnchorChange);
    };
  }, [anchor]); // Empty dependency array to run only once on mount/unmount

  return (
    <li
      className={cn("text-sm text-primary/80", { "font-medium text-primary": isActive })}
      style={{ marginLeft: `${level * 0.5}rem` }}
    >
      <a href={anchor}>{title}</a>
    </li>
  );
};
