import { Button } from "@/components/ui/button";
import Link from "next/link";
import { navItems } from "../constants/nav-items";
import { RealtimeClock } from "@/business/location/components/realtime-clock";
import { getCountryUnicode } from "@/business/location/utils/get-country-unicode";
import Image from "next/image";

export const Footer = async () => {
  //TODO: Remove this comment when production is ready
  /* const userIp = await getUserIp();
  const userCountry = userIp ? await getUserCountry(userIp) : null; */
  const userCountry = null;

  return (
    <footer className="px-12 py-5 2xl:container max-sm:mb-20 sm:px-20 sm:py-10">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-3">
          <div>
            <h1 className="text-4xl font-semibold">Curious?</h1>
            <p className="relative text-sm text-muted">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, vel libero voluptate similique expedita id
              laborum beatae ab iusto dolores veritatis rerum ipsa voluptatibus voluptatum, quibusdam optio et magni
              maiores.
            </p>
          </div>
          <div className="relative">
            <p className="text-lg font-light text-muted">Check my social medias</p>
            <Image
              className="absolute -left-11 -top-7 size-12 sm:-left-14 sm:-top-10 sm:size-16"
              priority
              src="/img/arrow-thin.svg"
              alt="Arrow pointing to social medias on the left side"
              width={64}
              height={64}
            />
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
