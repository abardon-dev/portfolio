export const ARTICLES_PAGE_SIZE = 10;

export const READ_TIMES: number[] = [3, 5, 10, 15];

export const SORT_ORDER = ["ASC", "DESC"] as const;
export type SortOrder = (typeof SORT_ORDER)[number];
