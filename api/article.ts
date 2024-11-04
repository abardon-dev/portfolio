import { strapiClient } from "./strapi-client";

type ArticleResponse = {
  title: string;
  resume: string;
  readTime: number;
  lastUpdateDate: string;
  tags: string[];
  thumbnail: string; //TODO: Blob ?
};

export const getArticles = () => strapiClient.get<ArticleResponse[]>("articles").then((res) => res.data);
