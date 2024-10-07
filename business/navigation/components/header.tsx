"use client";

import { Button } from "@/components/ui/button";
import { SlideTextButton } from "@/components/ui/slide-text-button";
import { cn } from "@/utils/cn";
import { breakpoints } from "@/utils/constants/breakpoints";
import { useMediaQuery } from "@/utils/hooks/use-media-query";
import useScrollPosition from "@/utils/hooks/use-scroll-position";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { useState } from "react";
import { navItems } from "../constants/nav-items";

const labels = ["Click me", "Press me", "Tap me", "Select me", "Choose me"];

const isItemActive = (href: string, segment: string) => segment === href.replace("/", "");

export function Header() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const isMobile = useMediaQuery(`(max-width: ${breakpoints.sm})`);
  const scrollPosition = useScrollPosition();
  const segment = useSelectedLayoutSegment() || "";

  const isScrollStarted = scrollPosition > 20;

  return (
    <header className="fixed bottom-10 z-50 h-fit w-full sm:top-10">
      <div className="mx-auto flex items-end justify-center gap-6 px-4 sm:gap-10">
        <div className="flex justify-center gap-6 max-sm:flex-wrap-reverse sm:gap-10">
          <nav className="z-10">
            <ul className="flex space-x-4 sm:space-x-8">
              {navItems.map((item) => (
                <li
                  key={item.href}
                  onFocus={() => setHoveredItem(item.href)}
                  onBlur={() => setHoveredItem(null)}
                  onMouseEnter={() => setHoveredItem(item.href)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <Button
                    size={isMobile ? "sm" : "default"}
                    className={cn({
                      "shadow-accent":
                        hoveredItem === item.href || (hoveredItem === null && isItemActive(item.href, segment))
                    })}
                    asChild
                  >
                    <Link href={item.href}>{item.text.toUpperCase()}</Link>
                  </Button>
                </li>
              ))}
            </ul>
          </nav>

          <AnimatePresence>
            {isScrollStarted && (
              <motion.div
                className="z-0"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <SlideTextButton variant={"secondary"} size={isMobile ? "sm" : "default"} labels={labels} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
