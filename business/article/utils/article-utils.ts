import { z } from "zod";

export const encodeArticleTitle = (title: string, id: number) =>
  `${encodeURIComponent(
    title
      .toLocaleLowerCase()
      .replace(/[^\w\s-]/g, "") // Remove special characters
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .trim()
  )}-${id}`;

export const extractIdFromEncodedArticleTitle = (encodedTitle: string): number => {
  const id = encodedTitle.split("-").pop();

  const parseResult = z.coerce.number().safeParse(id);
  if (parseResult.success) {
    return parseResult.data;
  }

  throw new Error(`Invalid article id: ${id}`);
};
