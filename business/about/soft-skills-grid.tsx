"use client";

import { DotPattern } from "@/components/ui/dot-pattern-background";
import { cn } from "@/utils/cn";
import { breakpoints } from "@/utils/constants/breakpoints";
import { useMediaQuery } from "@/utils/hooks/use-media-query";
import { LucideIcon } from "lucide-react";
import { useState, useEffect } from "react";

type SoftSkillsGrid = {
  cards: { title: string; description: string; icon: LucideIcon }[];
};

export const SoftSkillsGrid = ({ cards }: SoftSkillsGrid) => {
  const isMobile = useMediaQuery(`(max-width: ${breakpoints.sm})`);
  const [scrollY, setScrollY] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMobile]);

  const getParallaxOffset = (itemIdx: number, scrollY: number) => {
    if (isMobile) {
      return 0;
    }

    const isRightColumn = itemIdx % 2 === 1;
    return isRightColumn ? scrollY * 0.2 : 0;
  };

  return (
    <div className="mx-auto grid gap-4 pb-10 sm:grid-cols-2 md:gap-8 md:px-10 md:pb-40 xl:px-20">
      {cards.toSpliced(4).map(({ title, description, icon: Icon }, index) => (
        <div
          key={index}
          className="relative rounded-lg bg-primary p-6 text-primary-foreground shadow-xl"
          style={{
            transform: `translateY(min(${getParallaxOffset(index, scrollY)}px, 75%))`,
            height: "100%"
          }}
        >
          <div className="lamp-effect absolute inset-0 z-10" />
          <DotPattern className={cn("[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]")} />

          <Icon className="mb-4 size-8 rounded-full bg-accent p-1 text-primary md:size-9 md:p-1.5" />
          <h2 className="mb-2 text-xl font-bold sm:text-2xl md:text-3xl">{title}</h2>
          <p className="text-xs text-primary-foreground sm:text-sm">{description}</p>
        </div>
      ))}
    </div>
  );
};
