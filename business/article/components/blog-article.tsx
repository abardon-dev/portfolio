import { Button } from "@/components/ui/button";
import { TBlogArticleResume } from "../../blog/constants/blog-constants";
import { ArrowLeft, Calendar } from "lucide-react";
import Link from "next/link";
import { ShareArticleButton } from "./share-article-button";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AccordionContent } from "@radix-ui/react-accordion";

type BlogArticleProps = {
  articleResume: TBlogArticleResume;
};

export const BlogArticle = ({ articleResume }: BlogArticleProps) => (
  <section className="space-y-8">
    <BlogArticleHeader articleResume={articleResume} />
    <section className="flex flex-col gap-4 lg:flex-row lg:gap-8">
      {/**Mobile and tablet table of contents */}
      <Accordion className="w-full lg:hidden" type="single" collapsible>
        <AccordionItem value="table-of-contents">
          <AccordionTrigger className="text-2xl font-medium">Table of contents</AccordionTrigger>
          <AccordionContent>
            <BlogArticleTableOfContents />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <BlogArticleContent />

      {/**Laptop and desktop table of contents */}
      <aside className="relative hidden lg:block">
        <div className="sticky right-0 top-24 w-64 space-y-1 xl:top-8">
          <h3 className="mb-1 text-xl font-medium">Table of contents</h3>
          <BlogArticleTableOfContents />
        </div>
      </aside>
    </section>
  </section>
);

const BlogArticleHeader = ({ articleResume }: BlogArticleProps) => (
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
          <p>{articleResume.date.toLocaleDateString(undefined, { dateStyle: "medium" })}</p>

          <span>-</span>

          <p className="lowercase">{articleResume.readTime} min read</p>
        </div>

        <div className="flex gap-2">
          {articleResume.categories.map((category) => (
            <Badge key={category} size={"lg"}>
              {category}
            </Badge>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h1 className="text-pretty font-sans text-6xl font-bold">{articleResume.title}</h1>
        <p className="text-primary">{articleResume.resume}</p>
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

const BlogArticleTableOfContents = () => (
  <div className="flex w-full flex-col gap-1 overflow-x-hidden">
    <Button className="w-fit max-w-full font-sans text-sm font-medium" variant={"ghost"} size={"sm"}>
      <span className="truncate">Introduction</span>
    </Button>
    <Button className="w-fit max-w-full font-sans text-xs" variant={"ghost"} size={"sm"}>
      <span className="truncate">Lorem ipsum, dolor sit amet.</span>
    </Button>
    <Button className="w-fit max-w-full font-sans text-xs" variant={"ghost"} size={"sm"}>
      <span className="truncate">Lorem ipsum, dolor sit amet.</span>
    </Button>
    <Button className="w-fit max-w-full font-sans text-xs" variant={"ghost"} size={"sm"}>
      <span className="truncate">Lorem ipsum, dolor sit amet.</span>
    </Button>
  </div>
);
const BlogArticleContent = () => (
  <div className="text-justify font-sans">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia doloribus voluptatibus ad qui recusandae, voluptatum
    sequi nostrum officiis dolore repellat repellendus veritatis? Aperiam blanditiis dolores nobis consequatur nihil!
    Consequuntur, ad? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia doloribus voluptatibus ad qui
    recusandae, voluptatum sequi nostrum officiis dolore repellat repellendus veritatis? Aperiam blanditiis dolores
    nobis consequatur nihil! Consequuntur, ad? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia doloribus
    voluptatibus ad qui recusandae, voluptatum sequi nostrum officiis dolore repellat repellendus veritatis? Aperiam
    blanditiis dolores nobis consequatur nihil! Consequuntur, ad? Lorem ipsum dolor sit amet consectetur adipisicing
    elit. Quia doloribus voluptatibus ad qui recusandae, voluptatum sequi nostrum officiis dolore repellat repellendus
    veritatis? Aperiam blanditiis dolores nobis consequatur nihil! Consequuntur, ad? Lorem ipsum dolor sit amet
    consectetur adipisicing elit. Quia doloribus voluptatibus ad qui recusandae, voluptatum sequi nostrum officiis
    dolore repellat repellendus veritatis? Aperiam blanditiis dolores nobis consequatur nihil! Consequuntur, ad? Lorem
    ipsum dolor sit amet consectetur adipisicing elit. Quia doloribus voluptatibus ad qui recusandae, voluptatum sequi
    nostrum officiis dolore repellat repellendus veritatis? Aperiam blanditiis dolores nobis consequatur nihil!
    Consequuntur, ad? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia doloribus voluptatibus ad qui
    recusandae, voluptatum sequi nostrum officiis dolore repellat repellendus veritatis? Aperiam blanditiis dolores
    nobis consequatur nihil! Consequuntur, ad? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia doloribus
    voluptatibus ad qui recusandae, voluptatum sequi nostrum officiis dolore repellat repellendus veritatis? Aperiam
    blanditiis dolores nobis consequatur nihil! Consequuntur, ad? Lorem ipsum dolor sit amet consectetur adipisicing
    elit. Quia doloribus voluptatibus ad qui recusandae, voluptatum sequi nostrum officiis dolore repellat repellendus
    veritatis? Aperiam blanditiis dolores nobis consequatur nihil! Consequuntur, ad? Lorem ipsum dolor sit amet
    consectetur adipisicing elit. Quia doloribus voluptatibus ad qui recusandae, voluptatum sequi nostrum officiis
    dolore repellat repellendus veritatis? Aperiam blanditiis dolores nobis consequatur nihil! Consequuntur, ad? Lorem
    ipsum dolor sit amet consectetur adipisicing elit. Quia doloribus voluptatibus ad qui recusandae, voluptatum sequi
    nostrum officiis dolore repellat repellendus veritatis? Aperiam blanditiis dolores nobis consequatur nihil!
    Consequuntur, ad? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia doloribus voluptatibus ad qui
    recusandae, voluptatum sequi nostrum officiis dolore repellat repellendus veritatis? Aperiam blanditiis dolores
    nobis consequatur nihil! Consequuntur, ad? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia doloribus
    voluptatibus ad qui recusandae, voluptatum sequi nostrum officiis dolore repellat repellendus veritatis? Aperiam
    blanditiis dolores nobis consequatur nihil! Consequuntur, ad? Lorem ipsum dolor sit amet consectetur adipisicing
    elit. Quia doloribus voluptatibus ad qui recusandae, voluptatum sequi nostrum officiis dolore repellat repellendus
    veritatis? Aperiam blanditiis dolores nobis consequatur nihil! Consequuntur, ad? Lorem ipsum dolor sit amet
    consectetur adipisicing elit. Quia doloribus voluptatibus ad qui recusandae, voluptatum sequi nostrum officiis
    dolore repellat repellendus veritatis? Aperiam blanditiis dolores nobis consequatur nihil! Consequuntur, ad? Lorem
    ipsum dolor sit amet consectetur adipisicing elit. Quia doloribus voluptatibus ad qui recusandae, voluptatum sequi
    nostrum officiis dolore repellat repellendus veritatis? Aperiam blanditiis dolores nobis consequatur nihil!
    Consequuntur, ad? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia doloribus voluptatibus ad qui
    recusandae, voluptatum sequi nostrum officiis dolore repellat repellendus veritatis? Aperiam blanditiis dolores
    nobis consequatur nihil! Consequuntur, ad? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia doloribus
    voluptatibus ad qui recusandae, voluptatum sequi nostrum officiis dolore repellat repellendus veritatis? Aperiam
    blanditiis dolores nobis consequatur nihil! Consequuntur, ad? Lorem ipsum dolor sit amet consectetur adipisicing
    elit. Quia doloribus voluptatibus ad qui recusandae, voluptatum sequi nostrum officiis dolore repellat repellendus
    veritatis? Aperiam blanditiis dolores nobis consequatur nihil! Consequuntur, ad? Lorem ipsum dolor sit amet
    consectetur adipisicing elit. Quia doloribus voluptatibus ad qui recusandae, voluptatum sequi nostrum officiis
    dolore repellat repellendus veritatis? Aperiam blanditiis dolores nobis consequatur nihil! Consequuntur, ad? Lorem
    ipsum dolor sit amet consectetur adipisicing elit. Quia doloribus voluptatibus ad qui recusandae, voluptatum sequi
    nostrum officiis dolore repellat repellendus veritatis? Aperiam blanditiis dolores nobis consequatur nihil!
    Consequuntur, ad? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia doloribus voluptatibus ad qui
    recusandae, voluptatum sequi nostrum officiis dolore repellat repellendus veritatis? Aperiam blanditiis dolores
    nobis consequatur nihil! Consequuntur, ad? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia doloribus
    voluptatibus ad qui recusandae, voluptatum sequi nostrum officiis dolore repellat repellendus veritatis? Aperiam
    blanditiis dolores nobis consequatur nihil! Consequuntur, ad? Lorem ipsum dolor sit amet consectetur adipisicing
    elit. Quia doloribus voluptatibus ad qui recusandae, voluptatum sequi nostrum officiis dolore repellat repellendus
    veritatis? Aperiam blanditiis dolores nobis consequatur nihil! Consequuntur, ad? Lorem ipsum dolor sit amet
    consectetur adipisicing elit. Quia doloribus voluptatibus ad qui recusandae, voluptatum sequi nostrum officiis
    dolore repellat repellendus veritatis? Aperiam blanditiis dolores nobis consequatur nihil! Consequuntur, ad? Lorem
    ipsum dolor sit amet consectetur adipisicing elit. Quia doloribus voluptatibus ad qui recusandae, voluptatum sequi
    nostrum officiis dolore repellat repellendus veritatis? Aperiam blanditiis dolores nobis consequatur nihil!
    Consequuntur, ad? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia doloribus voluptatibus ad qui
    recusandae, voluptatum sequi nostrum officiis dolore repellat repellendus veritatis? Aperiam blanditiis dolores
    nobis consequatur nihil! Consequuntur, ad?
  </div>
);
