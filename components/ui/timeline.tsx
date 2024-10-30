"use client";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/utils/cn";
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

interface TimelineEntry {
  title: string;
  description: string;
  img: { src: string; alt: string };
  content: React.ReactNode;
}

const itemPadding: number = 40;
const scrollOffset: number = 25;

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: [`start ${scrollOffset}%`, `end ${scrollOffset}%`]
  });
  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);

  const updateTimelineHeight = () => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  };

  const handleScroll = () => {
    if (ref.current) {
      const items = Array.from(ref.current.children).slice(1);
      const refTop = ref.current.getBoundingClientRect().top + window.scrollY; // Top position of the reference element

      /** Reset the timeline when the user scrolls to the top */
      if (heightTransform.get() === 0) {
        setActiveIndex(null);
        return;
      }

      items.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        const itemTop = rect.top + window.scrollY; // Absolute top position of the item

        if (refTop + heightTransform.get() >= itemTop + itemPadding) {
          setActiveIndex(index);
        }
      });
    }
  };

  useEffect(() => {
    updateTimelineHeight();
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", updateTimelineHeight);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateTimelineHeight);
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
            <div key={index} className={"relative"} style={{ paddingTop: itemPadding }}>
              {/** Image and title */}
              <div
                style={{ top: `${scrollOffset + 5}%` }}
                className={cn(
                  "top-[30%] flex items-center gap-6 grayscale transition-[filter] duration-500 md:sticky md:w-1/2",
                  {
                    "md:ml-[calc(50%-24px)]": isEven,
                    "md:translate-x-6 md:flex-row-reverse": !isEven,
                    "grayscale-0": isCurrentOrPassed
                  }
                )}
              >
                <Image
                  className={"size-10 rounded-full md:size-12"}
                  src={item.img.src}
                  alt={item.img.alt}
                  width={48}
                  height={48}
                  style={{ objectFit: "cover" }}
                />
                <div className={cn("flex flex-col", { "md:items-end": !isEven })}>
                  <h3 className="text-2xl font-bold text-primary md:text-3xl">{item.title}</h3>
                  {Boolean(item.description) && <h4 className="text-lg text-primary sm:text-xl">{item.description}</h4>}
                </div>
              </div>

              {/** Content */}
              <div
                className={cn("relative pt-3 max-md:pl-10 md:w-1/2", {
                  "md:pr-8": isEven,
                  "md:ml-auto md:pl-8": !isEven
                })}
              >
                {/* {item.content} */}

                <div className={cn("space-y-2 text-justify md:space-y-3")}>
                  <div className={cn("flex items-center gap-2", { "md:flex-row-reverse": isEven })}>
                    <Image
                      className="size-10 md:size-12"
                      src={"/img/react-logo.svg"}
                      alt={item.img.alt}
                      width={48}
                      height={48}
                    />
                    <h5 className="text-2xl font-bold md:text-3xl">Winggy</h5>
                  </div>

                  <p className="max-sm:text-sm">
                    Plateforme pour la transition écologique dans le domaine du tourisme. Elle permet aux professionnels
                    de réduire considérablement leur impact environmental, de suivre cette évolution au fil des années
                    et de communiquer sur leur engagement auprès de leurs clients.
                  </p>

                  <div className="flex flex-col">
                    <h6 className="text-2xl font-medium">Missions :</h6>
                    <ul className="text-pretty max-sm:text-sm">
                      <li>{"Développement d'un Saas multi-services, internationalisable (+10 personnes)"}</li>
                      <li>{"Mise en place de l'architecture, déploiement continu, tests, revue de code, etc."}</li>
                      <li>Tablet first pour simplifier la saisie sur le terrain</li>
                    </ul>
                  </div>

                  <div className="flex justify-center gap-6 pt-3 md:pt-4">
                    <TooltipProvider>
                      <Tooltip delayDuration={0}>
                        <TooltipTrigger>
                          <Image
                            className="size-8 transition-filter-transform duration-200 hover:scale-125 hover:grayscale-0 md:size-10"
                            src={"/img/nextjs-logo.svg"}
                            alt="nextjs-logo"
                            width={40}
                            height={40}
                          />
                        </TooltipTrigger>
                        <TooltipContent sideOffset={9}>Next.js</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                      <Tooltip delayDuration={0}>
                        <TooltipTrigger>
                          <Image
                            className="size-8 transition-filter-transform duration-200 hover:scale-125 hover:grayscale-0 md:size-10"
                            src={"/img/tailwindcss-logo.svg"}
                            alt="tailwind-logo"
                            width={40}
                            height={40}
                          />
                        </TooltipTrigger>
                        <TooltipContent sideOffset={9}>Tailwind CSS</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                      <Tooltip delayDuration={0}>
                        <TooltipTrigger>
                          <Image
                            className="relative size-8 transition-filter-transform duration-200 hover:scale-125 hover:grayscale-0 md:size-10"
                            src={"/img/typescript-logo.svg"}
                            alt="typescript-logo"
                            width={40}
                            height={40}
                          />
                        </TooltipTrigger>
                        <TooltipContent sideOffset={9}>Typescript</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              </div>
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
      style={{ height: `${timelineHeight}px` }}
      className="absolute left-5 top-0 w-0.5 overflow-hidden bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-400 to-transparent to-[99%] md:left-1/2 md:-translate-x-1/2"
    >
      <motion.div
        style={{ height: progressHeight, opacity: opacityTransform }}
        className="absolute top-0 w-0.5 rounded-full bg-gradient-to-t from-primary from-[0%] via-accent via-[10%] to-transparent"
      />
    </div>
  );
};
