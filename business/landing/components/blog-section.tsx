import { BlogResume } from "@/business/blog/components/blog-resume";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export const BlogSection = () => (
  <section className="space-y-6">
    <div>
      <h1 className="section-title max-sm:text-9xl">Blog</h1>
      <p className="max-sm:text-sm">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil hic ipsum quas sed saepe excepturi ducimus,
        voluptatem asperiores eligendi vel molestias ullam iure possimus recusandae a, culpa nisi earum commodi!
      </p>
    </div>

    <div className="flex flex-col items-start gap-3 sm:flex-row">
      <h2 className="font-mono text-4xl font-semibold uppercase">Recent blog posts</h2>
      <Button className="lg:hidden" variant={"secondary"} asChild size={"sm"}>
        <Link href={"/blog"}>See more</Link>
      </Button>
    </div>

    <div className="grid gap-10 lg:grid-cols-3 xl:grid-cols-2">
      <div className="flex flex-col gap-4 lg:col-span-2 xl:col-span-1">
        <BlogResume
          title="Heading title"
          resume="Lorem ipsum dolor sit amet consectetur adipisicing elit."
          readTime={5}
          categories={["React", "Next.js"]}
        />
        <BlogResume
          title="Heading title"
          resume="Lorem ipsum dolor sit amet consectetur adipisicing elit."
          readTime={7}
          categories={["React", "Next.js"]}
        />
        <BlogResume
          title="Heading title"
          resume="Lorem ipsum dolor sit amet consectetur adipisicing elit."
          readTime={3}
          categories={["React", "Next.js"]}
        />
      </div>

      <div className="flex h-full flex-col items-center justify-center gap-2 max-lg:hidden lg:px-5 xl:px-20">
        <div className="relative aspect-[3/2] h-56 max-xl:h-44">
          <Image src="/img/blog-illustration.svg" alt="Blog illustration" fill style={{ objectFit: "cover" }} />
        </div>
        <p className="text-pretty text-center max-xl:text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, quis. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Voluptas, quis.
        </p>
        <Button className="mt-4" variant={"secondary"} asChild>
          <Link href={"/blog"}>See more</Link>
        </Button>
      </div>
    </div>
  </section>
);
