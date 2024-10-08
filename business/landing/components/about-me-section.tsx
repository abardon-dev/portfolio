import { BlogResume } from "@/business/blog/components/blog-resume";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export const AboutMeSection = () => (
  <section className="space-y-10">
    {/**TODO: Create a new font size in the Tailwind config and add a correspond leading */}
    <section className="space-y-4">
      <h1 className="section-title text-right text-[192px] leading-[168px]">About me</h1>

      <div className="grid grid-cols-3">
        <div className="flex flex-col items-center gap-3 border-r-2 border-t-0 border-dashed border-primary px-6">
          <Image priority src="/img/my-avatar.png" alt="My avatar" width={128} height={128} />
          <div className="flex flex-col items-center text-center">
            <h3 className="text-4xl font-bold uppercase">Arthur Bardon</h3>
            <h4 className="text-2xl font-medium">Front-end developer</h4>
          </div>
        </div>
      </div>
    </section>

    <section className="space-y-6">
      <div>
        <h1 className="section-title text-[192px] leading-[156px]">Blog</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil hic ipsum quas sed saepe excepturi ducimus,
          voluptatem asperiores eligendi vel molestias ullam iure possimus recusandae a, culpa nisi earum commodi!
        </p>
      </div>

      <h2 className="font-mono text-4xl font-semibold">My latest blog posts</h2>

      <div className="grid grid-cols-2 gap-10">
        <div className="flex flex-col gap-4">
          <BlogResume
            title="Heading title"
            resume="Lorem ipsum dolor sit amet consectetur adipisicing elit."
            date={new Date()}
            categories={["React", "Next.js"]}
          />
          <BlogResume
            title="Heading title"
            resume="Lorem ipsum dolor sit amet consectetur adipisicing elit."
            date={new Date()}
            categories={["React", "Next.js"]}
          />
          <BlogResume
            title="Heading title"
            resume="Lorem ipsum dolor sit amet consectetur adipisicing elit."
            date={new Date()}
            categories={["React", "Next.js"]}
          />
        </div>

        <div className="flex h-full flex-col items-center justify-center gap-2 px-20">
          <div className="relative aspect-[3/2] h-56">
            <Image src="/img/blog-illustration.svg" alt="Blog illustration" fill style={{ objectFit: "cover" }} />
          </div>
          <p className="text-pretty text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, quis. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Voluptas, quis.
          </p>
          <Button className="mt-4" variant={"secondary"} asChild>
            <Link href={"/blog"}>See more</Link>
          </Button>
        </div>
      </div>
    </section>
  </section>
);
