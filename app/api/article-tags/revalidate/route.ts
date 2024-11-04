import { revalidateTag } from "next/cache";

export async function POST() {
  const tagToRevalidate = "article-tags";

  revalidateTag(tagToRevalidate);
  return Response.json({ revalidated: true, now: Date.now() });
}
