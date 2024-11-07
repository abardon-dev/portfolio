"use server";

import { getArticleViewsById, increaseArticleViewCountAPI } from "@/api/article";

export const increaseArticleViewCount = async (articleDocumentId: string) => {
  try {
    const { nbViews } = await getArticleViewsById(articleDocumentId);
    await increaseArticleViewCountAPI(articleDocumentId, Number(nbViews) + 1);
  } catch (error) {
    console.error("Unable to increase article view count", error);
  }
};
