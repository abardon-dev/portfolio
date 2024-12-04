import { revalidateTag } from "next/cache";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const requestBody = await req.json();
  const articleId = requestBody.entry.documentId;

  if (articleId === undefined) {
    return Response.json({ error: "Invalid article id" }, { status: 400 });
  }

  revalidateTag(`article-${articleId}`);
  return Response.json({ revalidated: true, now: Date.now() });
}
