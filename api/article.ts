import { TArticleTagResponse } from "./article-tag";
import { GetRequestOptions, PutRequestOptions, StrapiDataResponse, strapiClient } from "./strapi-client";

type TArticleResumeStrapiResponse = StrapiDataResponse<{
  title: string;
  resume: string;
  readTime: number;
  createdAt: string;
  updatedAt: string;
  tags: TArticleTagResponse[];
  nbViews: string;
  //TODO: Add the thumbnail
  /* thumbnail: Blob; */
  //TODO: Remove content here
  content: string;
}>;

//TODO: Install the qs package to build the query string

export type TArticleResume = StrapiDataResponse<
  Omit<TArticleResumeStrapiResponse, "createdAt" | "updatedAt"> & {
    createdAt: Date;
    updatedAt: Date;
  }
>;

//TODO: Can be improved by sending only the id of the tags (the tags are already fetched with id and name)
export const getArticleResumes = () =>
  strapiClient.get<TArticleResumeStrapiResponse[]>("articles?populate=tags").then((res) => ({
    ...res,
    data: res.data.map((article) => ({
      ...article,
      createdAt: new Date(article.createdAt),
      updatedAt: new Date(article.updatedAt)
    }))
  }));

export const getPopularArticleResumes = (options?: GetRequestOptions) =>
  strapiClient
    .get<TArticleResumeStrapiResponse[]>("articles?populate=tags&sort=nbViews:desc&pagination[limit]=3", options)
    .then((res) =>
      res.data.map((article) => ({
        ...article,
        createdAt: new Date(article.createdAt),
        updatedAt: new Date(article.updatedAt)
      }))
    );

export const getArticleById = (articleDocumentId: string) =>
  strapiClient.get<TArticleResumeStrapiResponse>(`articles/${articleDocumentId}?populate=tags`).then((res) => ({
    ...res.data,
    createdAt: new Date(res.data.createdAt),
    updatedAt: new Date(res.data.updatedAt)
  }));

export const getArticleViewsById = (articleDocumentId: string) =>
  strapiClient
    .get<Pick<TArticleResume, "nbViews">>(`articles/${articleDocumentId}?fields=nbViews`)
    .then((res) => res.data);

export const increaseArticleViewCountAPI = (
  articleDocumentId: string,
  newViewCount: number,
  options?: PutRequestOptions
) =>
  strapiClient.put<TArticleResumeStrapiResponse>(
    `articles/${articleDocumentId}`,
    { data: { nbViews: newViewCount } },
    options
  );
