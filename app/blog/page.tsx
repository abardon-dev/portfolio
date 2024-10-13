import { BlogResume } from "@/business/blog/components/blog-resume";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Blog() {
  return (
    <div className="space-y-6">
      <section className="space-y-3 text-pretty px-72 py-10 text-center sm:mt-20 sm:pt-20">
        <div className="space-y-3">
          <h1 className="text-5xl font-bold">
            <span className="rounded-xl border border-accent bg-accent/25 px-1 py-2">Partageons</span> ensemble notre
            apprentissage sur les {""}
            <span className="whitespace-nowrap rounded-xl border border-accent bg-accent/25 px-1 py-2">
              techs du web
            </span>
          </h1>
          <p className="font-medium">
            Explorez mes apprentissages et astuces pour progresser ensemble dans le développement. Des tips concrets
            pour booster vos compétences !
          </p>
        </div>

        <div>
          <p className="text-sm">
            Ne manquez aucun post, suivez-moi sur{" "}
            <Button className="px-0 text-xl font-medium" variant={"link"} asChild>
              <Link href="https://www.linkedin.com/in/arthur-bardon" target="_blank">
                Linked In
              </Link>
            </Button>{" "}
            !
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="font-mono text-4xl font-semibold uppercase">Popular blog posts</h2>

        <div className="grid grid-cols-2 grid-rows-2 gap-6">
          <div className="row-span-2">
            {/**TODO: Create a variant for the blog resume to use it vertically */}
            <BlogResume
              title="Heading title"
              resume="Lorem ipsum dolor sit amet consectetur adipisicing elit."
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
    </div>
  );
}
