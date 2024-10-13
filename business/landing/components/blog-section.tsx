import { BlogArticleResume } from "@/business/blog/components/blog-article-resume";
import { blogArticlesResume } from "@/business/blog/constants/blog-constants";
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
      <h2 className="font-mono text-3xl font-semibold uppercase">Recent blog posts</h2>
      <Button className="lg:hidden" variant={"secondary"} asChild size={"sm"}>
        <Link href={"/blog"}>See more</Link>
      </Button>
    </div>

    <div className="grid gap-10 lg:grid-cols-3">
      <div className="flex flex-col gap-4 lg:col-span-2">
        {blogArticlesResume.slice(0, 3).map((article) => (
          <BlogArticleResume key={article.title} articleResume={article} />
        ))}
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
