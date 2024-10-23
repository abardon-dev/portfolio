"use client";
import { useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface TimelineEntry {
  title: React.ReactNode;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full" ref={containerRef}>
      <div ref={ref} className="relative mx-auto pb-20">
        {data.map((item, index) => (
          <div key={index} className="flex justify-start pt-10 md:gap-10 md:pt-40">
            <div className="sticky top-40 z-40 flex max-w-xs flex-col items-center self-start md:w-full md:flex-row lg:max-w-sm">
              {/**TODO: Add a mask on the image when the section is not reached */}
              <Image
                className="absolute left-2 size-12 rounded-full"
                src={"/img/betterfly-logo.png"}
                alt="Blog article thumbnail"
                width={64}
                height={64}
                style={{ objectFit: "cover" }}
              />
              <h3 className="hidden text-xl font-bold text-neutral-500 md:block md:pl-20 md:text-5xl">{item.title}</h3>
            </div>

            <div className="relative w-full pl-20 pr-4 md:pl-4">
              <h3 className="mb-4 block text-left text-2xl font-bold text-neutral-500 md:hidden">{item.title}</h3>
              {item.content}
            </div>
          </div>
        ))}
        <TimelineProgress containerRef={containerRef} contentRef={ref} />
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
      className="absolute left-8 top-0 w-[2px] overflow-hidden bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-500 to-transparent to-[99%]"
    >
      <motion.div
        style={{
          height: heightTransform,
          opacity: opacityTransform
        }}
        className="absolute top-0 w-[2px] rounded-full bg-gradient-to-t from-purple-500 from-[0%] via-blue-500 via-[10%] to-transparent"
      />
    </div>
  );
};
