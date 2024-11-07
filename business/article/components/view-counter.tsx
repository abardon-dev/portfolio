"use client";

import { useEffect } from "react";
import { increaseArticleViewCount } from "../actions/increase-article-view-count";

//FIXME: Use an ORM or make a new increment endpoint
//TODO: Handle race condition
export const ViewCounter = ({ articleDocumentId }: { articleDocumentId: string }) => {
  useEffect(() => {
    const updateViewCount = async () => {
      await increaseArticleViewCount(articleDocumentId);
    };

    updateViewCount();
  }, [articleDocumentId]);

  return null;
};
