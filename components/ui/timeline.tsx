"use client";
import { useScroll, useTransform, motion } from "framer-motion";
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

  return (
    <div className="w-full" ref={containerRef}>
      <div ref={ref} className="relative mx-auto pb-20">
        <TimelineProgress containerRef={containerRef} contentRef={ref} />
        {data.map((item, index) => {
          const isEven = index % 2 === 0;

          return (
            <div key={index} className={cn("relative flex items-start pt-10 md:pt-40", { "justify-end": !isEven })}>
              {/** Image and title */}
              <div
                className={cn("absolute flex w-1/2 items-center gap-6", {
                  "right-6": isEven,
                  "left-6 flex-row-reverse": !isEven
                })}
              >
                <Image
                  className="rounded-full"
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
  containerRef: React.RefObject<HTMLDivElement>;
  contentRef: React.RefObject<HTMLDivElement>;
};

const TimelineProgress = ({ containerRef, contentRef }: TimelineProgressProps) => {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      const rect = contentRef.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [contentRef]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"]
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      style={{
        height: `${height}px`
      }}
      className="absolute left-1/2 top-0 w-0.5 -translate-x-1/2 overflow-hidden bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-500 to-transparent to-[99%]"
    >
      <motion.div
        style={{
          height: heightTransform,
          opacity: opacityTransform
        }}
        className="absolute top-0 w-0.5 rounded-full bg-gradient-to-t from-purple-500 from-[0%] via-blue-500 via-[10%] to-transparent"
      />
    </div>
  );
};
