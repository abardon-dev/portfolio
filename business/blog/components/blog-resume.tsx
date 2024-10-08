import { Badge } from "@/components/ui/badge";

type BlogResumeProps = {
  title: string;
  resume: string;
  date: Date;
  categories: string[];
};

export const BlogResume = ({ title, resume, date, categories }: BlogResumeProps) => (
  <div
    tabIndex={0}
    className="flex cursor-pointer gap-3 rounded-xl bg-background px-6 py-4 shadow-md transition-shadow duration-500 ease-out hover:shadow-accent"
  >
    <div className="w-full space-y-2">
      <div className="flex gap-1.5">
        {categories.map((category) => (
          <Badge key={category}>{category}</Badge>
        ))}
      </div>

      <div className="w-full overflow-hidden text-pretty">
        <h3 className="truncate font-sans text-2xl font-medium">{title}</h3>
        <p className="line-clamp-2 text-sm font-light text-primary">{resume}</p>
      </div>

      <p className="text-xs font-light">{date.toLocaleDateString(undefined, { dateStyle: "medium" })}</p>
    </div>
    <div className="aspect-[3/2] h-full shrink-0 animate-pulse rounded-md bg-gray-400" />
  </div>
);
