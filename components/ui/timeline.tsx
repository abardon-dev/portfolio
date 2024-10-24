"use client";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/utils/cn";

interface TimelineEntry {
  title: React.ReactNode;
  content: React.ReactNode;
}

/**TODO: Add a mask on the image when the section is not reached */

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start 25%", "end 50%"] });
  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);

  const handleScroll = () => {
    if (ref.current) {
      const items = Array.from(ref.current.children).slice(1);
      const refTop = ref.current.getBoundingClientRect().top + window.scrollY; // Top position of the reference element

      /**Reset the timeline when the user scrolls to the top */
      if (heightTransform.get() === 0) {
        setActiveIndex(null);
        return;
      }

      items.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        const itemTop = rect.top + window.scrollY; // Absolute top position of the item

        if (refTop + heightTransform.get() >= itemTop + 80) {
          setActiveIndex(index);
        }
      });
    }
  };

  useEffect(() => {
    /**Initialize the height of the timeline */
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref.current]);

  return (
    <div className="w-full" ref={containerRef}>
      <div ref={ref} className="relative mx-auto mb-20">
        <TimelineProgress timelineHeight={height} progressHeight={heightTransform} scrollYProgress={scrollYProgress} />
        {data.map((item, index) => {
          const isEven = index % 2 === 0;
          const isCurrentOrPassed = (activeIndex ?? -1) >= index;

          return (
            <div key={index} className={cn("relative flex items-start pt-20", { "justify-end": !isEven })}>
              {/** Image and title */}
              <div
                className={cn("absolute flex w-1/2 items-center gap-6", {
                  "right-6": isEven,
                  "left-6 flex-row-reverse": !isEven
                })}
              >
                <Image
                  className={cn("rounded-full grayscale transition-[filter] duration-500", {
                    "grayscale-0": isCurrentOrPassed
                  })}
                  src={"/img/betterfly-logo.png"}
                  alt="Blog article thumbnail"
                  width={48}
                  height={48}
                  style={{ objectFit: "cover" }}
                />
                <h3 className="hidden text-xl font-bold text-neutral-500 md:block md:text-5xl">{item.title}</h3>
              </div>

              {/** Content */}
              <div className={cn("relative w-1/2", { "pr-8": isEven, "pl-8": !isEven })}>{item.content}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

type TimelineProgressProps = {
  timelineHeight: number;
  progressHeight: MotionValue<number>;
  scrollYProgress: MotionValue<number>;
};

const TimelineProgress = ({ timelineHeight, progressHeight, scrollYProgress }: TimelineProgressProps) => {
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      style={{
        height: `${timelineHeight}px`
      }}
      className="absolute left-1/2 top-0 w-0.5 -translate-x-1/2 overflow-hidden bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-500 to-transparent to-[99%]"
    >
      <motion.div
        style={{
          height: progressHeight,
          opacity: opacityTransform
        }}
        className="absolute top-0 w-0.5 rounded-full bg-gradient-to-t from-purple-500 from-[0%] via-blue-500 via-[10%] to-transparent"
      />
    </div>
  );
};
