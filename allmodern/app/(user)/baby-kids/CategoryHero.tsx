import Image from "next/image";

export default function CategoryHero() {
  return (
    <section className="relative w-full h-[240px] sm:h-[320px] md:h-[400px] overflow-hidden">
      <Image
        src="/images/cat_bedroom.png" // Placeholder
        alt="Baby and Kids Furniture"
        fill
        className="object-cover object-center"
        priority
      />
      {/* Dark overlay for text legibility */}
      <div className="absolute inset-0 bg-black/20" />
      
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold text-white drop-shadow-md">
          Baby + Kids
        </h1>
      </div>
    </section>
  );
}
