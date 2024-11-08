"use server";
import { getPaginatedArticleResumesAPI } from "@/api/article";
import { NB_ARTICLES_FETCH_LIMIT } from "../constants/blog-constants";

export const getPaginatedArticleResumes = async (offset: number) =>
  await getPaginatedArticleResumesAPI({ start: offset, limit: NB_ARTICLES_FETCH_LIMIT });
