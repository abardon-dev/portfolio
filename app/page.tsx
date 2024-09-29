import { ArrowDownDoubleIcon } from "hugeicons-react";
import Image from "next/image";

export default function Home() {
  return <HeroSection />;
}

const HeroSection = () => (
  <section className="py-10 text-center sm:mt-20 sm:py-20">
    {/**TODO: Try to clamp the text on mobile (+ desktop if looks good) */}
    <div className="flex flex-col items-center gap-6">
      <Image priority src="/img/react-logo.svg" alt="React logo" width={48} height={48} />
      <p className="font-mono text-xl uppercase sm:text-2xl">Front-end developer # Arthur Bardon</p>
      <h1 className="flex flex-col items-center text-6xl font-bold uppercase sm:text-9xl">
        <span className="underline decoration-accent decoration-wavy decoration-2 underline-offset-4 sm:decoration-[3px] sm:underline-offset-8">
          Take a look
        </span>
        <span>My Friend</span>
      </h1>

      <div className="flex flex-col items-center gap-4">
        <h2 className="text-5xl font-bold sm:text-8xl">Scroll</h2>
        <div className="flex size-16 items-center justify-center rounded-full border-2 border-accent sm:size-20">
          <ArrowDownDoubleIcon className="absolute m-auto size-9 animate-bounce text-primary sm:size-12" />
        </div>
      </div>
    </div>
  </section>
);
