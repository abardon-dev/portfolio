"use client";

import { Button } from "@/components/ui/button";
import { Check, Share2 } from "lucide-react";
import { useState } from "react";

export const ShareArticleButton = () => {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const copyUrlToClipboard = () => {
    const currentUrl = document.location.href;

    navigator.clipboard.writeText(currentUrl).then(() => {
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, 1000);
    });
  };

  return (
    <Button
      className="h-9 font-sans text-xs font-medium transition-all"
      aria-label="share-button"
      size={isCopied ? "sm" : "icon"}
      onClick={copyUrlToClipboard}
    >
      {!isCopied ? (
        <>
          <span className="sr-only">Share</span>
          <Share2 className="size-5" />
        </>
      ) : (
        <>
          <Check className="mr-1 size-4" />
          <span>Lien copié</span>
        </>
      )}
    </Button>
  );
};
