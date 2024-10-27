"use client";

import { cn } from "@/utils/cn";
import { useState } from "react";
import Image from "next/image";

type HardSkillsProps = {
  skills: {
    title: string;
    description: string;
    img: { src: string; alt: string };
  }[];
};

export const HardSkills = ({ skills }: HardSkillsProps) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-center gap-10 sm:hidden">
        {skills.map(({ img, title }, index) => (
          <div key={title} className="flex flex-col items-center justify-center gap-1">
            <Image key={index} className={"size-10"} src={img.src} alt={img.alt} width={40} height={40} />
            <p className="text-sm font-semibold">{title}</p>
          </div>
        ))}
      </div>

      {/** Tablet and more view */}
      <div className="relative mb-20 aspect-[3/1] w-[calc(100%-32px)] max-w-[700px] max-sm:hidden">
        {skills.map(({ img }, index) => {
          const isSkillActive = activeIndex === index;

          // Start from 180 degrees (left) and go to 0 degrees (right)
          const angle = 180 - index * (180 / (skills.length - 1));
          const notActiveTopPosition = `calc(100% - (100% * sin(${angle}deg)))`;
          const notActiveLeftPosition = `calc(50% + (50% * cos(${angle}deg)))`;

          return (
            <>
              <Image
                key={index}
                className={cn(
                  "absolute z-10 size-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform-top-left duration-500 ease-in-out md:size-12",
                  {
                    "-translate-y-[calc(50%+96px)]": isSkillActive
                  }
                )}
                style={{
                  top: isSkillActive ? "100%" : notActiveTopPosition,
                  left: isSkillActive ? "50%" : notActiveLeftPosition
                }}
                src={img.src}
                alt={img.alt}
                width={48}
                height={48}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => setActiveIndex(index)}
              />

              {/** Placeholder image for the active skill */}
              <Image
                className="absolute size-10 -translate-x-1/2 -translate-y-1/2 opacity-20 md:size-12"
                aria-hidden
                src={img.src}
                alt={img.alt}
                style={{ top: notActiveTopPosition, left: notActiveLeftPosition }}
                width={48}
                height={48}
              />
            </>
          );
        })}

        <div className="absolute left-1/2 top-full w-[calc(100%-80px)] -translate-x-1/2 -translate-y-[3.5rem] md:w-[calc(100%-96px)]">
          <div className="flex flex-col items-center justify-start gap-2 text-center sm:gap-3">
            <h3 className="mx-auto w-fit text-3xl font-bold">{skills[activeIndex].title}</h3>
            <p className="mx-auto w-fit text-pretty">{skills[activeIndex].description}</p>
          </div>
        </div>
      </div>
    </>
  );
};
