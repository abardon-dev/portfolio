import { Button } from "@/components/ui/button";
import Link from "next/link";

export const BlogHeroSection = () => (
  <div className="space-y-3 text-pretty text-center @container">
    <div className="space-y-3">
      <h1 className="text-pretty text-3xl font-bold @sm:text-5xl">
        <span className="rounded-xl border border-accent bg-accent/25 px-1 py-2">Partageons</span> ensemble notre
        apprentissage sur les {""}
        <span className="whitespace-nowrap rounded-xl border border-accent bg-accent/25 px-1 py-2">techs du web</span>
      </h1>
      <p className="text-pretty text-sm font-medium @sm:text-base">
        Explorez mes apprentissages et astuces pour progresser ensemble dans le développement web. Des tips concrets
        pour booster vos compétences !
      </p>
    </div>

    <div>
      <p className="text-xs @sm:text-sm">
        Ne manquez aucun post, suivez-moi sur{" "}
        <Button className="px-0 text-base font-medium @sm:text-xl" variant={"link"} asChild>
          <Link href="https://www.linkedin.com/in/arthur-bardon" target="_blank">
            Linked In
          </Link>
        </Button>{" "}
        !
      </p>
    </div>
  </div>
);
