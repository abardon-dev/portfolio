import { Button } from "@/components/ui/button";
import { GithubIcon, Linkedin02Icon, Mail01Icon } from "hugeicons-react";
import Link from "next/link";

export const SocialMedias = () => (
  <div className="flex flex-col items-center gap-6">
    <p className="-rotate-90 font-mono text-lg uppercase sm:text-xl">#Socials</p>
    <div className="flex flex-col gap-3 text-background">
      <Button className="text-inherit max-sm:size-7" size={"icon"} asChild>
        <Link href="https://github.com/abardon-dev" target="_blank">
          <GithubIcon className="size-4 text-inherit sm:size-5" />
        </Link>
      </Button>

      <Button className="text-inherit max-sm:size-7" size={"icon"} asChild>
        <Link href="https://www.linkedin.com/in/arthur-bardon" target="_blank">
          <Linkedin02Icon className="size-4 text-inherit sm:size-5" />
        </Link>
      </Button>

      <Button className="text-inherit max-sm:size-7" size={"icon"} asChild>
        <Link href="mailto:arthur.bardon.dev@gmail.com">
          <Mail01Icon className="size-4 text-inherit sm:size-5" />
        </Link>
      </Button>
    </div>
  </div>
);
