"use client";

import * as React from "react";
import { CheckIcon, ClipboardIcon } from "lucide-react";

import { cn } from "@/utils/cn";
import { Button, ButtonProps } from "@/components/ui/button";

interface CopyCodeButtonProps extends ButtonProps {
  rawValue: string;
}

export function CopyCodeButton({ rawValue: value, className, variant = "ghost", ...props }: CopyCodeButtonProps) {
  const [isCopied, setIsCopied] = React.useState<boolean>(false);

  const copyUrlToClipboard = () => {
    navigator.clipboard.writeText(value).then(() => {
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, 1000);
    });
  };

  const Icon = isCopied ? CheckIcon : ClipboardIcon;

  return (
    <Button
      className={cn("relative z-10 h-8 w-8 hover:bg-zinc-700", className)}
      size="icon"
      variant={variant}
      onClick={copyUrlToClipboard}
      {...props}
    >
      <span className="sr-only">Copy</span>
      <Icon className="size-4 text-primary-foreground" />
    </Button>
  );
}
