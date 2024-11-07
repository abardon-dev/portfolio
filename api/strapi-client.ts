export type PostRequestOptions = Omit<RequestInit, "body" | "method">;
export type GetRequestOptions = Omit<RequestInit, "method">;
export type PutRequestOptions = Omit<RequestInit, "body" | "method">;
export type DeleteRequestOptions = Omit<RequestInit, "method">;

export type StrapiDataResponse<T> = { id: number; documentId: string } & Omit<T, "id" | "documentId">;

export type StrapiResponse<T> = {
  data: StrapiDataResponse<T>;
  meta: { pagination: { page: number; pageSize: number; pageCount: number; total: number } };
};

const BASE_URL = process.env.STRAPI_API_URL;
const API_TOKEN = process.env.STRAPI_API_TOKEN;

const defaultOptions: Omit<RequestInit, "method" | "body"> = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${API_TOKEN}`
  }
};

const withBaseUrl = (url: string | URL | Request) => `${BASE_URL}/${url}`;

const handleResponse = <TResponse>(res: Response) => {
  if (!res.ok) {
    console.error(res);
    throw new Error(`Failed to fetch data`);
  }

  return res.json() as Promise<StrapiResponse<TResponse>>;
};

export const strapiClient = {
  post: <TResponse>(url: string | URL | Request, body: Record<string, unknown>, options?: PostRequestOptions) =>
    fetch(withBaseUrl(url), {
      method: "POST",
      body: JSON.stringify(body),
      ...defaultOptions,
      ...options
    }).then(handleResponse<TResponse>),
  get: <TResponse>(url: string | URL | Request, options?: GetRequestOptions) =>
    fetch(withBaseUrl(url), {
      method: "GET",
      ...defaultOptions,
      ...options
    }).then(handleResponse<TResponse>),
  put: <TResponse>(url: string | URL | Request, body: Record<string, unknown>, options?: PutRequestOptions) =>
    fetch(withBaseUrl(url), {
      method: "PUT",
      body: JSON.stringify(body),
      ...defaultOptions,
      ...options
    }).then(handleResponse<TResponse>),
  delete: (url: string | URL | Request, options?: DeleteRequestOptions) =>
    fetch(withBaseUrl(url), {
      method: "DELETE",
      ...defaultOptions,
      ...options
    })
};
