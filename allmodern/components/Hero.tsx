import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#ebeade]">
      <div className="relative h-[400px] sm:h-[500px] lg:h-[650px]">
        <Image
          src="/images/hero.png" // Placeholder, in screenshot it's sunflowers
          alt="Designed for Staycations"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Subtle gradient to make text readable if needed, or just let text stand out */}
        <div className="absolute inset-0 bg-black/10" />
      </div>

      <div className="absolute inset-0 z-10 flex items-end justify-center pb-16 sm:pb-24 lg:pb-32">
        <h1 className="text-[clamp(2.5rem,6vw,5.5rem)] font-black tracking-[-0.02em] leading-[1] text-white drop-shadow-md text-center px-4">
          Designed <span className="font-semibold tracking-normal text-[clamp(1.5rem,3vw,3rem)] align-middle mx-2">for</span> Staycations
        </h1>
      </div>
    </section>
  );
}
