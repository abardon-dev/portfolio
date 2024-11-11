import { SORT_ORDER, READ_TIMES } from "@/business/blog/constants/blog-constants";
import { parseAsArrayOf, parseAsNumberLiteral, parseAsStringLiteral, useQueryStates } from "nuqs";

export const useArticleFilters = ({ availableTags }: { availableTags: string[] }) =>
  useQueryStates({
    sortByDate: parseAsStringLiteral(SORT_ORDER).withDefault("DESC"),
    tags: parseAsArrayOf(parseAsStringLiteral(availableTags)).withDefault([]).withOptions({ clearOnDefault: true }),
    maxReadTime: parseAsNumberLiteral(READ_TIMES).withOptions({ clearOnDefault: true })
  });
