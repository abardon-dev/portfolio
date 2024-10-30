"use client"; //TODO: Remove this before production

import { HardSkills } from "@/business/about/hard-skills";
import { SoftSkillsGrid } from "@/business/about/soft-skills-grid";
import { Timeline } from "@/components/ui/timeline";
import { BookOpen, Search, Shield, Stars } from "lucide-react";

const data = [
  {
    title: "Lead Developer Front - Betterfly Tourism",
    description: "March 2024 - Present",
    img: { src: "/img/betterfly-logo.png", alt: "Betterfly logo" },
    content: null
  },
  {
    title: "Fullstack Developer (Lead front) - Infotel",
    description: "March 2023 - March 2024",
    img: { src: "/img/infotel-logo.jpg", alt: "Infotel logo" },
    content: null
  },
  {
    title: "DevOps / Java Developer - Sopra Banking Software",
    description: "Octobre 2023 - March 2024",
    img: { src: "/img/sbs-logo.png", alt: "Sopra Banking Software logo" },
    content: null
  },
  {
    title: "Intership/Work-study Fullstack Developer - Infotel",
    description: "May 2022 - September 2023",
    img: { src: "/img/infotel-logo.jpg", alt: "Infotel logo" },
    content: null
  },
  {
    title: "Engineering Degree - Polytech Angers",
    description: "September 2017 - September 2022",
    img: { src: "/img/polytech-logo.png", alt: "Polytech logo" },
    content: null
  }
];

const items = [
  {
    title: "Next.js",
    description:
      "A React framework for building web applications with server-side rendering and generating static websites.",
    img: { src: "/img/nextjs-logo.svg", alt: "Next.js logo" }
  },
  {
    title: "Tailwind CSS",
    description: "A utility-first CSS framework for rapidly building custom designs.",
    img: { src: "/img/tailwindcss-logo.svg", alt: "Tailwind CSS logo" }
  },
  {
    title: "TypeScript",
    description: "A typed superset of JavaScript that compiles to plain JavaScript.",
    img: { src: "/img/typescript-logo.svg", alt: "TypeScript logo" }
  },
  {
    title: "React",
    description: "A JavaScript library for building user interfaces.",
    img: { src: "/img/react-logo.svg", alt: "React logo" }
  },
  {
    title: "Next.js 2",
    description:
      "A React framework for building web applications with server-side rendering and generating static websites.",
    img: { src: "/img/nextjs-logo.svg", alt: "Next.js logo" }
  },
  {
    title: "Tailwind CSS 2",
    description: "A utility-first CSS framework for rapidly building custom designs.",
    img: { src: "/img/tailwindcss-logo.svg", alt: "Tailwind CSS logo" }
  },
  {
    title: "TypeScript 2",
    description: "A typed superset of JavaScript that compiles to plain JavaScript.",
    img: { src: "/img/typescript-logo.svg", alt: "TypeScript logo" }
  },
  {
    title: "React 2",
    description: "A JavaScript library for building user interfaces.",
    img: { src: "/img/react-logo.svg", alt: "React logo" }
  }
];

export default function About() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-center">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-bold uppercase sm:text-5xl">Current stack</h2>
          <p className="font-medium sm:text-lg">A small list of my favorite tools to build my projects</p>
        </div>
        <HardSkills skills={items} />
      </div>

      <div className="flex w-full flex-col items-center gap-6">
        <h2 className="section-title text-center uppercase">{"I am"}</h2>
        <SoftSkillsGrid
          cards={[
            {
              title: "Curiosity-Driven",
              description:
                "I’m always eager to explore new technologies and concepts. This curiosity has driven me to continuously learn and improve my skills, turning challenges into opportunities for growth.",
              icon: Search
            },
            {
              title: "Passionate Learner",
              description:
                "Driven by a deep love for technology, constantly seeking to expand knowledge and skills, and always motivated to learn and grow in the ever-evolving tech landscape.",
              icon: BookOpen
            },
            {
              title: "Resilient",
              description:
                "I don’t give up easily. From getting stuck in “tutorial hell” to overcoming project roadblocks, I’ve learned to stay persistent and keep pushing forward, no matter the obstacles.",
              icon: Shield
            },
            {
              title: "Creative Thinker",
              description:
                "Brings a unique perspective to problem-solving, thinking outside the box to develop innovative solutions that push boundaries and challenge conventional methods.",
              icon: Stars
            }
          ]}
        />
      </div>

      <div className="space-y-6">
        <h2 className="text-4xl font-bold uppercase sm:text-5xl">My journey</h2>
        <Timeline data={data} />
      </div>
    </div>
  );
}
