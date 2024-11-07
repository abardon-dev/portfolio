export const encodeArticleTitle = (title: string, documentId: string) =>
  `${encodeURIComponent(
    title
      .toLocaleLowerCase()
      .replace(/[^\w\s-]/g, "") // Remove special characters
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .trim()
  )}-${documentId}`;

export const extractDocumentIdFromEncodedArticleTitle = (encodedTitle: string): string => {
  const documentId = encodedTitle.split("-").pop();

  if (documentId === undefined) {
    throw new Error(`Invalid article document id: ${encodedTitle}`);
  }

  return documentId;
};
