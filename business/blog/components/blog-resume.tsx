import { Badge } from "@/components/ui/badge";
import { cn } from "@/utils/cn";
import Image from "next/image";

type BlogResumeProps = {
  variant?: "horizontal" | "vertical";
  title: string;
  resume: string;
  readTime: number; //in minutes
  categories: string[];
};

export const BlogResume = ({ variant = "horizontal", title, resume, readTime, categories }: BlogResumeProps) => (
  <div
    tabIndex={0}
    className="flex size-full cursor-pointer rounded-xl bg-background shadow-md transition-shadow duration-500 ease-out @container hover:shadow-accent"
  >
    <div
      className={cn("flex w-full flex-col-reverse gap-3 overflow-hidden", {
        "@sm:flex-row @sm:px-6 @sm:py-4": variant === "horizontal"
      })}
    >
      <div
        className={cn("flex size-full flex-col gap-2 px-4 pb-3", {
          "@sm:p-0": variant === "horizontal"
        })}
      >
        <div className={cn("hidden gap-1.5", { "@sm:flex": variant === "horizontal" })}>
          {categories.map((category) => (
            <Badge key={category}>{category}</Badge>
          ))}
        </div>

        <div className="flex flex-1 flex-col justify-between gap-2">
          <div className={cn("w-full overflow-x-hidden text-pretty", { "space-y-1": variant === "vertical" })}>
            <h3
              className={cn(
                "truncate font-sans font-medium",
                { "text-xl @sm:text-2xl": variant === "horizontal" },
                { "text-3xl": variant === "vertical" }
              )}
            >
              {title}
            </h3>
            <p
              className={cn("line-clamp-4 text-pretty text-primary/80", {
                "text-xs @sm:line-clamp-3": variant === "horizontal",
                "line-clamp-3 text-sm": variant === "vertical"
              })}
            >
              {resume}
            </p>
          </div>

          <p className="text-xs font-medium text-primary">{readTime} min read</p>
        </div>
      </div>

      <div
        className={cn("relative w-full shrink-0", {
          "aspect-[3/1] @sm:aspect-[3/2] @sm:h-full @sm:w-fit": variant === "horizontal",
          "aspect-[5/1]": variant === "vertical"
        })}
      >
        <div className={cn("size-full rounded-t-md", { "@sm:rounded-md": variant === "horizontal" })} />
        <Image
          className={cn("rounded-t-md", { "@sm:rounded-md": variant === "horizontal" })}
          src={"/img/blog-article-thumbnail.webp"}
          alt="Blog article thumbnail"
          fill
          priority
          objectFit={"cover"}
        />

        <div className={cn("absolute left-3 top-3 flex flex-wrap gap-1.5", { "@sm:hidden": variant === "horizontal" })}>
          {categories.map((category) => (
            <Badge key={category} variant={"secondary"}>
              {category}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  </div>
);
