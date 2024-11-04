import { GetRequestOptions, strapiClient } from "./strapi-client";

export type TArticleTagResponse = {
  name: string;
};

//TODO: Handle fetching all tags at the same time
export const getArticleTags = (options?: GetRequestOptions): Promise<string[]> =>
  strapiClient
    .get<TArticleTagResponse[]>("article-tags?fields=name&sort=name", options)
    .then((res) => res.data.map((tag) => tag.name));
