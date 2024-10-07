import { Badge } from "@/components/ui/badge";

type BlogResumeProps = {
  title: string;
  resume: string;
  readTime: number; //in minutes
  categories: string[];
};

export const BlogResume = ({ title, resume, readTime, categories }: BlogResumeProps) => (
  <div
    tabIndex={0}
    className="flex size-full cursor-pointer rounded-xl bg-background shadow-md transition-shadow duration-500 ease-out @container hover:shadow-accent"
  >
    <div className="flex w-full flex-col-reverse overflow-hidden @sm:flex-row @sm:gap-3 @sm:px-6 @sm:py-4">
      <div className="w-full space-y-2 px-4 pb-3 @sm:p-0">
        <div className="hidden gap-1.5 @sm:flex">
          {categories.map((category) => (
            <Badge key={category}>{category}</Badge>
          ))}
        </div>

        <div className="w-full overflow-x-hidden text-pretty">
          <h3 className="truncate font-sans text-xl font-medium @sm:text-2xl">{title}</h3>
          <p className="line-clamp-4 text-pretty text-xs text-primary/80 @sm:line-clamp-3">{resume}</p>
        </div>

        <p className="text-xs font-medium text-primary">{readTime} min read</p>
      </div>
      <div className="relative aspect-[3/1] w-full shrink-0 @sm:aspect-[3/2] @sm:h-full @sm:w-fit">
        <div className="size-full rounded-t-md bg-gray-400 @sm:rounded-md" />

        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5 @sm:hidden">
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
