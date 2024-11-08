"use client";

import { useEffect } from "react";
import { getArticleViewsById, increaseArticleViewCountAPI } from "@/api/article";

//FIXME: Use Redis to update the view count
export const ViewCounter = ({ articleDocumentId }: { articleDocumentId: string }) => {
  useEffect(() => {
    const abortController = new AbortController();

    const updateViewCount = async () => {
      try {
        const { nbViews } = await getArticleViewsById(articleDocumentId, { signal: abortController.signal });
        await increaseArticleViewCountAPI(articleDocumentId, Number(nbViews) + 1, { signal: abortController.signal });
      } catch (error) {
        console.error("Unable to increase article view count", error);
      }
    };

    updateViewCount();

    return () => abortController.abort();
  }, [articleDocumentId]);

  return null;
};
