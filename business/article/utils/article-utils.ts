export const generateArticleSlug = (title: string, documentId: string) =>
  `${encodeURIComponent(
    title
      .toLocaleLowerCase()
      .replace(/[^\w\s-]/g, "") // Remove special characters
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .trim()
  )}-${documentId}`;

export const extractDocumentIdFromArticleSlug = (encodedTitle: string): string | undefined => {
  const documentId = encodedTitle.split("-").pop();

  return documentId;
};
