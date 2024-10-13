"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { ChevronsUpDown, Check } from "lucide-react";
import { useState } from "react";
import { READ_TIMES } from "../../constants/blog-constants";
import { useMaxReadTime } from "../../hooks/use-blog-filters";

const getOptionText = (option: number) => `< ${option} min`;

export const MaxReadTimeSelect = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedMaxReadTime, setSelectedMaxReadTime] = useMaxReadTime();

  const handleReadTimeToggle = (readTime: number) => {
    setOpen(false);
    setSelectedMaxReadTime((prev) => (prev !== readTime ? readTime : null));
  };

  const buttonText = selectedMaxReadTime === null ? "Select a read time" : getOptionText(selectedMaxReadTime);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {/**TODO: Make an outline variant */}
        <Button variant="ghost" role="combobox" className="w-[180px] justify-between">
          {buttonText}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[180px] p-2">
        <ul className="max-h-[300px] overflow-auto">
          {[...READ_TIMES].map((readTime) => {
            const isSelected = selectedMaxReadTime === readTime;

            return (
              <li
                key={readTime}
                className={cn(
                  "flex items-center justify-between rounded-md p-2 hover:bg-primary/10",
                  "cursor-pointer text-sm"
                )}
                onClick={() => handleReadTimeToggle(readTime)}
              >
                <span>{getOptionText(readTime)}</span>
                <Check className={cn("h-4 w-4 text-primary", { invisible: !isSelected })} />
              </li>
            );
          })}
        </ul>
      </PopoverContent>
    </Popover>
  );
};
