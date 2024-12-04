import { SortOrder } from "@/business/blog/constants/blog-constants";
import { TArticleTagResponse } from "./article-tag";
import { GetRequestOptions, PutRequestOptions, StrapiDataResponse, strapiClient } from "./strapi-client";
import { Arrays } from "@/utils/arrays";
import { generateArticleSlug } from "@/business/article/utils/article-utils";

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
//TODO: Create a tag factory

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

export const getAllArticleSlugs = async (): Promise<string[]> => {
  const articleSlugs: string[] = [];

  let currentPage = 0;
  let hasNextPage = true;
  const paginationQuery = `&pagination[page]=${currentPage}&pagination[pageSize]=${100}`;

  while (hasNextPage) {
    const page = await strapiClient.get<StrapiDataResponse<{ title: string }>[]>(
      `articles?fields=title${paginationQuery}`
    );
    const newArticleSlugs = page.data.map((article) => generateArticleSlug(article.title, article.documentId));

    if (newArticleSlugs.length === 0) {
      break;
    }

    articleSlugs.push(...newArticleSlugs);
    currentPage++;
    hasNextPage = page.meta.pagination.pageCount > currentPage;
  }

  return articleSlugs;
};

export const getArticleById = (articleDocumentId: string): Promise<TArticle | null> =>
  strapiClient
    .get<TArticleStrapiResponse>(`articles/${articleDocumentId}?populate=tags`, {
      next: { tags: [`article-${articleDocumentId}`] }
    })
    .then((res) => ({
      ...res.data,
      createdAt: new Date(res.data.createdAt),
      updatedAt: new Date(res.data.updatedAt)
    }))
    .catch((error) => {
      console.error(`Error while fetching article with id: ${articleDocumentId}`, error);
      return null;
    });

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
