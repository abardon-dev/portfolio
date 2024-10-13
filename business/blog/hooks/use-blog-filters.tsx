"use client";

import { parseAsArrayOf, parseAsNumberLiteral, parseAsStringLiteral, useQueryState } from "nuqs";
import { SortOrder, SORT_ORDER, READ_TIMES } from "../constants/blog-constants";

export const useTags = ({ availableTags }: { availableTags: string[] }) =>
  useQueryState(
    "tags",
    parseAsArrayOf(parseAsStringLiteral(availableTags)).withDefault([]).withOptions({ clearOnDefault: true })
  );

export const useSortOrder = () =>
  useQueryState<SortOrder>("sortDate", parseAsStringLiteral(SORT_ORDER).withDefault("DESC"));

export const useMaxReadTime = () => useQueryState("maxReadTime", parseAsNumberLiteral(READ_TIMES));
