"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { ChevronsUpDown, Check } from "lucide-react";
import { Arrays } from "@/utils/arrays";

type MultiSelectTagsProps = {
  availableTags: string[];
  tags: string[];
  onTagsChange: (tags: string[]) => void;
};

export const MultiSelectTags = ({ availableTags, tags, onTagsChange }: MultiSelectTagsProps) => {
  const handleTagItemToggle = (tag: string) => {
    onTagsChange(tags.includes(tag) ? tags.filter((selectedTag) => selectedTag !== tag) : [...tags, tag]);
  };

  const buttonText = Arrays.isEmpty(tags) ? "Select a tag" : `${tags.length} selected tag${tags.length > 1 ? "s" : ""}`;

  return (
    <div className="flex items-center gap-2">
      {tags.slice(0, 3).map((tag) => (
        //TODO: Make a selected style
        <Button
          key={tag}
          className="hidden font-sans text-sm @3xl:block"
          variant="ghost"
          size="sm"
          onClick={() => handleTagItemToggle(tag)}
        >
          {tag}
        </Button>
      ))}

      <Popover>
        <PopoverTrigger asChild>
          {/**TODO: Make an outline variant */}
          <Button variant="ghost" role="combobox" className="w-[150px] justify-between">
            {buttonText}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[150px] p-2">
          <ul className="max-h-[300px] overflow-auto">
            {availableTags.map((tag) => {
              const isSelected = tags.includes(tag);

              return (
                <li
                  key={tag}
                  className={cn(
                    "flex cursor-pointer items-center justify-between rounded-md p-2 text-sm hover:bg-primary/10"
                  )}
                  onClick={() => handleTagItemToggle(tag)}
                >
                  <span>{tag}</span>
                  <Check className={cn("h-4 w-4 text-primary", { invisible: !isSelected })} />
                </li>
              );
            })}
          </ul>
        </PopoverContent>
      </Popover>
    </div>
  );
};
