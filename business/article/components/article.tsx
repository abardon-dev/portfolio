import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar } from "lucide-react";
import Link from "next/link";
import { ShareArticleButton } from "./share-article-button";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { TArticle } from "@/api/article";
import { ArticleTocElement } from "./article-toc-element";
import { ToC } from "@/components/ui/mdx-renderer";

type ArticleProps = {
  article: TArticle;
  toc: ToC;
  content: React.ReactNode;
};

/**TODO: Handle current TOC element when the user scrolls */
export const Article = ({ article, toc, content }: ArticleProps) => (
  <section className="space-y-8">
    <ArticleHeader article={article} />
    <section className="flex gap-8">
      {content}

      <aside className="relative hidden lg:block">
        <div className="sticky right-0 top-24 w-64 space-y-1 xl:top-8">
          <h3 className="mb-1 font-sans font-medium">On this page</h3>
          <ol className="space-y-2">
            {toc.map(({ title, anchor, level }, index) => (
              <ArticleTocElement key={index} title={title} anchor={anchor} level={level} />
            ))}
          </ol>
        </div>
      </aside>
    </section>
  </section>
);

const ArticleHeader = ({ article }: Pick<ArticleProps, "article">) => (
  <>
    <div className="flex w-full justify-between">
      <Button className="font-sans text-sm" variant={"ghost"} asChild>
        <Link href="/blog">
          <ArrowLeft className="mr-1 size-5" />
          Retour
        </Link>
      </Button>

      <ShareArticleButton />
    </div>

    <section className="flex flex-col items-center gap-6 px-20 text-center">
      <div className="flex flex-col items-center gap-4">
        {/**TODO: Handle a LocaleDateTime */}
        <div className="flex items-center gap-2 text-sm uppercase text-primary/70">
          <Calendar className="mb-0.5 size-5 stroke-primary/70 stroke-[1.5]" />
          <p>{article.createdAt.toLocaleDateString(undefined, { dateStyle: "medium" })}</p>

          <span>-</span>

          <p className="lowercase">{article.readTime} min read</p>
        </div>

        <div className="flex gap-2">
          {article.tags.map(({ name }) => (
            <Badge key={name} size={"lg"}>
              {name}
            </Badge>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h1 className="text-pretty font-sans text-6xl font-bold">{article.title}</h1>
        <p className="text-primary">{article.resume}</p>
      </div>
    </section>

    <div className="relative aspect-[4/1] w-full">
      <Image
        className="rounded-md"
        src={"/img/blog-article-thumbnail.webp"}
        alt="Blog article thumbnail"
        fill
        priority
        style={{
          objectFit: "cover"
        }}
      />
    </div>
  </>
);
