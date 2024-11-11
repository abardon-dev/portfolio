import { Badge } from "@/components/ui/badge";
import { cn } from "@/utils/cn";
import Image from "next/image";
import Link from "next/link";
import { PropsWithChildren } from "react";
import { encodeArticleTitle } from "@/business/article/utils/article-utils";
import { TArticle } from "@/api/article";

type BlogArticleResumeProps = {
  variant?: "horizontal" | "vertical";
  articleResume: TArticle;
};

export const BlogArticleResume = ({ variant = "horizontal", articleResume }: BlogArticleResumeProps) => (
  <Link href={`/blog/${encodeArticleTitle(articleResume.title, articleResume.documentId)}`}>
    <Container>
      <div
        className={cn("flex w-full flex-col-reverse gap-3 overflow-hidden", {
          "@md:flex-row @md:px-6 @md:py-4": variant === "horizontal"
        })}
      >
        <ResumeContent articleResume={articleResume} variant={variant} />
        <ThumbnailSection tags={articleResume.tags} variant={variant} />
      </div>
    </Container>
  </Link>
);

const Container = ({ children }: PropsWithChildren) => (
  <div
    tabIndex={0}
    className="flex size-full cursor-pointer rounded-xl bg-background shadow-md transition-shadow duration-500 ease-out @container hover:shadow-accent"
  >
    {children}
  </div>
);

const ResumeContent = ({ articleResume: { title, resume, readTime, tags }, variant }: BlogArticleResumeProps) => (
  <div
    className={cn("flex size-full flex-col gap-2 overflow-x-hidden px-4 pb-3", {
      "@md:p-0": variant === "horizontal"
    })}
  >
    <div className={cn("hidden gap-1.5", { "@md:flex": variant === "horizontal" })}>
      {tags.map(({ name }) => (
        <Badge key={name}>{name}</Badge>
      ))}
    </div>

    <div className="flex flex-1 flex-col justify-between gap-2 overflow-x-hidden">
      <div className={cn("w-full overflow-x-hidden", { "space-y-1": variant === "vertical" })}>
        <h3
          className={cn(
            "line-clamp-2 text-pretty font-sans font-medium",
            { "@sm:text-lg @md:text-xl": variant === "horizontal" },
            { "@sm:text-2xl @md:text-3xl": variant === "vertical" }
          )}
        >
          {title}
        </h3>
        <p
          className={cn("line-clamp-3 text-pretty text-xs text-primary/80 @sm:text-sm", {
            "@md:text-base": variant === "vertical"
          })}
        >
          {resume}
        </p>
      </div>

      <p className="text-xs font-medium text-primary">{readTime} min read</p>
    </div>
  </div>
);

const ThumbnailSection = ({ tags, variant }: Pick<TArticle, "tags"> & Pick<BlogArticleResumeProps, "variant">) => (
  <div
    className={cn("relative my-auto h-20 w-full shrink-0", {
      "@md:w-48": variant === "horizontal",
      "@md:h-40": variant === "vertical"
    })}
  >
    <div className={cn("size-full rounded-t-md", { "@md:rounded-md": variant === "horizontal" })} />
    <Image
      className={cn("rounded-t-md", { "@md:rounded-md": variant === "horizontal" })}
      src={"/img/blog-article-thumbnail.webp"}
      alt="Blog article thumbnail"
      fill
      priority
      style={{
        objectFit: "cover"
      }}
    />

    <div className={cn("absolute left-3 top-3 flex flex-wrap gap-1.5", { "@md:hidden": variant === "horizontal" })}>
      {tags.map(({ name }) => (
        <Badge key={name} variant={"secondary"}>
          {name}
        </Badge>
      ))}
    </div>
  </div>
);
