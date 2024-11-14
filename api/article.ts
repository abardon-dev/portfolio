import { SortOrder } from "@/business/blog/constants/blog-constants";
import { TArticleTagResponse } from "./article-tag";
import { GetRequestOptions, PutRequestOptions, StrapiDataResponse, strapiClient } from "./strapi-client";
import { Arrays } from "@/utils/arrays";

type TArticleStrapiResponse = StrapiDataResponse<{
  title: string;
  resume: string;
  readTime: number;
  createdAt: string;
  updatedAt: string;
  tags: TArticleTagResponse[];
  nbViews: string;
  //TODO: Add the thumbnail
  /* thumbnail: Blob; */
  content: string;
}>;

//TODO: Install the qs package to build the query string
//TODO: Can be improved by sending only the id of the tags (the tags are already fetched with id and name)

export type TArticle = StrapiDataResponse<
  Omit<TArticleStrapiResponse, "createdAt" | "updatedAt"> & {
    createdAt: Date;
    updatedAt: Date;
  }
>;

export type TArticleFilters = {
  sortByDate?: SortOrder;
  tags?: string[];
  maxReadTime?: number | null;
};

export const getPaginatedArticles = (pageOptions: { page: number; size: number }, filters?: TArticleFilters) => {
  const { page, size } = pageOptions;

  const paginationQuery = `&pagination[page]=${page}&pagination[pageSize]=${size}`;
  const sortByDataQuery = `&sort=createdAt:${filters?.sortByDate?.toLowerCase() || "desc"}`;
  const tagsQuery = Arrays.isNotEmpty(filters?.tags)
    ? `&${filters.tags.map((tag, index) => `filters[tags][name][$in][${index}]=${tag}`).join("&")}`
    : "";
  const maxReadTimeQuery = filters?.maxReadTime ? `&filters[readTime][$lte]=${filters.maxReadTime}` : "";

  return strapiClient
    .get<
      TArticleStrapiResponse[]
    >(`articles?populate=tags${paginationQuery}${sortByDataQuery}${tagsQuery}${maxReadTimeQuery}`)
    .then((res) => ({
      ...res,
      data: res.data.map((article) => ({
        ...article,
        createdAt: new Date(article.createdAt),
        updatedAt: new Date(article.updatedAt)
      }))
    }));
};

export const getPopularArticles = (options?: GetRequestOptions) =>
  strapiClient
    .get<TArticleStrapiResponse[]>("articles?populate=tags&sort=nbViews:desc&pagination[limit]=3", options)
    .then((res) =>
      res.data.map((article) => ({
        ...article,
        createdAt: new Date(article.createdAt),
        updatedAt: new Date(article.updatedAt)
      }))
    );

//TODO: Handle caching and generate article statically
export const getArticleById = (articleDocumentId: string) =>
  strapiClient
    .get<TArticleStrapiResponse>(`articles/${articleDocumentId}?populate=tags`, { cache: "no-cache" })
    .then((res) => ({
      ...res.data,
      createdAt: new Date(res.data.createdAt),
      updatedAt: new Date(res.data.updatedAt)
    }));

export const getArticleViewsById = (articleDocumentId: string, options?: GetRequestOptions) =>
  strapiClient
    .get<Pick<TArticle, "nbViews">>(`articles/${articleDocumentId}?fields=nbViews`, options)
    .then((res) => res.data);

export const increaseArticleViewCountAPI = (
  articleDocumentId: string,
  newViewCount: number,
  options?: PutRequestOptions
) =>
  strapiClient.put<TArticleStrapiResponse>(
    `articles/${articleDocumentId}`,
    { data: { nbViews: newViewCount } },
    options
  );
