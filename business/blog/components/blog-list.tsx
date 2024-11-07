import { groupByMonthAndYear } from "../utils/blog-utils";
import React from "react";
import { BlogListContainer } from "./blog-list-container";
import { getArticleTags } from "@/api/article-tag";
import { getArticleResumes } from "@/api/article";
import { BlogArticleResume } from "./blog-article-resume";

//TODO: If tag failed it should not avoid to display the list
//TODO: Handle the error if data can't be fetched
export const BlogList = async () => {
  //TODO: Handle data invalidation for article resumes
  //TODO: Look for bypassed cache sometimes
  const [tags, articleResumesResponse] = await Promise.all([
    getArticleTags({ next: { tags: ["article-tags"] } }),
    getArticleResumes()
  ]);

  const { data: articleResumes } = articleResumesResponse;

  return (
    <BlogListContainer availableTags={tags}>
      <section className="mx-auto flex w-full flex-col gap-4 lg:w-4/5">
        {Object.entries(groupByMonthAndYear(articleResumes)).map(([date, articleResumes]) => (
          <React.Fragment key={date}>
            <div className="flex w-full items-center first:hidden">
              <hr className="h-0.5 w-full bg-accent" />
              <div className="rounded-full border border-accent bg-background px-3 py-2 shadow-md">
                <p className="whitespace-nowrap text-2xs font-semibold uppercase text-muted">
                  {new Date(date).toLocaleString(undefined, { month: "long", year: "numeric" })}
                </p>
              </div>
              <hr className="my-2 h-0.5 w-full bg-accent" />
            </div>
            {articleResumes.map((articleResume) => (
              <BlogArticleResume key={articleResume.title} articleResume={articleResume} />
            ))}
          </React.Fragment>
        ))}
      </section>
    </BlogListContainer>
  );
};
