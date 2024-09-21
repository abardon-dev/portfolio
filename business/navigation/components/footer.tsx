import { Button } from "@/components/ui/button";
import Link from "next/link";
import { navItems } from "../constants/nav-items";
import { GithubIcon, Linkedin02Icon, Mail01Icon } from "hugeicons-react";
import { RealtimeClock } from "@/business/location/components/realtime-clock";
import { getCountryUnicode } from "@/business/location/utils/get-country-unicode";

export const Footer = async () => {
  //TODO: Remove this comment when production is ready
  /* const userIp = await getUserIp();
  const userCountry = userIp ? await getUserCountry(userIp) : null; */
  const userCountry = null;

  return (
    <footer className="px-20 py-10 2xl:container max-sm:mb-20">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-3">
          <div>
            <h1 className="text-4xl font-semibold">Curious?</h1>
            <p className="text-sm text-muted">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, vel libero voluptate similique expedita id
              laborum beatae ab iusto dolores veritatis rerum ipsa voluptatibus voluptatum, quibusdam optio et magni
              maiores.
            </p>
          </div>
          <div className="flex gap-3 text-background">
            <Button className="text-inherit" size={"icon"} asChild>
              <Link href="https://github.com/abardon-dev" target="_blank">
                <GithubIcon className="size-5 text-inherit" />
              </Link>
            </Button>

            <Button className="text-inherit" size={"icon"} asChild>
              <Link href="https://www.linkedin.com/in/arthur-bardon" target="_blank">
                <Linkedin02Icon className="size-5 text-inherit" />
              </Link>
            </Button>

            <Button className="text-inherit" size={"icon"} asChild>
              <Link href="mailto:arthur.bardon.dev@gmail.com">
                <Mail01Icon className="size-5 text-inherit" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:items-end">
          <h2 className="text-2xl font-semibold">NAVIGATION</h2>
          <nav>
            <ul className="flex flex-col">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Button className="px-0 font-normal" variant={"link"} size={"sm"} asChild>
                    <Link href={item.href}>{item.text}</Link>
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex w-full justify-between gap-6 max-sm:flex-col-reverse sm:col-span-2 sm:gap-10">
          <div className="font-mono text-5xl font-bold">
            <p>© {new Date().getFullYear()}</p>
            <p>ARTHUR BARDON</p>
          </div>

          <div className="flex flex-col justify-end gap-1 font-mono text-xl font-medium leading-5 sm:items-end">
            <div className="flex flex-nowrap items-center gap-2">
              <p>Local time -</p>
              <RealtimeClock />
              {userCountry && <span className="pb-1 font-twemoji">{getCountryUnicode(userCountry)}</span>}
            </div>
            <div className="flex flex-nowrap items-center gap-2">
              <p>Arthur Bardon local time - </p>
              <RealtimeClock locale="fr-FR" options={{ timeZone: "Europe/Paris" }} />
              {userCountry && <span className="pb-1 font-twemoji">🇫🇷</span>}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
