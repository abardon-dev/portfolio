import { getPopularArticles } from "@/api/article";
import { BlogArticleResume } from "@/business/blog/components/blog-article-resume";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export const BlogSection = async () => {
  const articleResumes = await getPopularArticles({ next: { revalidate: 1800 /** 30 minutes */ } });

  return (
    <section className="space-y-6">
      <div>
        <h1 className="section-title max-sm:text-9xl">Blog</h1>
        <p className="font-medium max-sm:text-sm">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil hic ipsum quas sed saepe excepturi ducimus,
          voluptatem asperiores eligendi vel molestias ullam iure possimus recusandae a, culpa nisi earum commodi!
        </p>
      </div>

      <div className="flex flex-col items-start gap-3 sm:flex-row">
        <h2 className="text-4xl font-bold uppercase sm:text-5xl">Recent blog posts</h2>
        <Button className="lg:hidden" variant={"secondary"} asChild size={"sm"}>
          <Link href={"/blog"}>See more</Link>
        </Button>
      </div>

      <div className="grid gap-10 lg:grid-cols-3">
        <div className="flex flex-col gap-4 lg:col-span-2">
          {articleResumes.map((article) => (
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
};
