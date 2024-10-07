import { Badge } from "@/components/ui/badge";

type BlogResumeProps = {
  title: string;
  resume: string;
  date: Date;
  categories: string[];
};

export const BlogResume = ({ title, resume, date, categories }: BlogResumeProps) => (
  <div className="flex w-full gap-3">
    <div className="space-y-2">
      <div className="flex gap-1">
        {categories.map((category) => (
          <Badge key={category}>{category}</Badge>
        ))}
      </div>

      <div className="space-y-1">
        <h3 className="font-sans text-2xl font-medium">{title}</h3>
        <p className="font-sm text-primary/80">{resume}</p>
      </div>

      <p className="text-xs text-primary/70">{date.toLocaleDateString()}</p>
    </div>
    <div className="size-full rounded-2xl bg-gray-500" />
  </div>
);
