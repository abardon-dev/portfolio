import Link from "next/link";

export const AboutMeSection = () => (
  /**TODO: Use fluid text with clamp ? */
  <section className="grid sm:grid-cols-4 md:grid-cols-3">
    <p className="text-pretty text-right font-mono text-4xl font-bold uppercase sm:col-span-3 sm:col-start-2 sm:text-6xl md:col-span-2 md:col-start-2">
      I’m an award{" "}
      <Link className="text-accent underline decoration-wavy" href={"/about"}>
        winning
      </Link>{" "}
      independent creative developer and parttime{" "}
      <Link className="text-accent underline decoration-wavy" href={"/about"}>
        teacher
      </Link>{" "}
      at the Amsterdam University of Applied Sciences, with over{" "}
      <Link className="text-accent underline decoration-wavy" href={"/about"}>
        7 years experience
      </Link>
      .
    </p>
  </section>
);
