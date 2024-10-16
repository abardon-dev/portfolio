import { SortByDateButton } from "./filters/sort-by-date-button";
import { MultiSelectTags } from "./filters/multi-select-tags";
import { MaxReadTimeSelect } from "./filters/max-read-time-select";

export const BlogFilters = () => (
  <section className="space-y-3">
    <div className="flex justify-between gap-3">
      <MultiSelectTags tags={["react", "next.js", "typescript", "node.js", "tailwindcss"]} />
      <div className="flex gap-3">
        <MaxReadTimeSelect />
        <SortByDateButton />
      </div>
    </div>
  </section>
);
