import { BlogResume } from "./blog-resume";

export const PopularBlogPosts = () => (
  <section className="space-y-3">
    <h2 className="font-mono text-4xl font-semibold uppercase">Popular blog posts</h2>

    <div className="grid grid-cols-2 grid-rows-2 gap-6">
      <div className="row-span-2">
        <BlogResume
          variant="vertical"
          title="Heading title"
          resume={
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus adipisci expedita dolorem sunt nisi, sint nihil nostrum commodi illo quisquam qui blanditiis sapiente."
          }
          readTime={7}
          categories={["React", "Next.js"]}
        />
      </div>
      <BlogResume
        title="Heading title"
        resume="Lorem ipsum dolor sit amet consectetur adipisicing elit."
        readTime={7}
        categories={["React", "Next.js"]}
      />
      <BlogResume
        title="Heading title"
        resume="Lorem ipsum dolor sit amet consectetur adipisicing elit."
        readTime={3}
        categories={["React", "Next.js"]}
      />
    </div>
  </section>
);
