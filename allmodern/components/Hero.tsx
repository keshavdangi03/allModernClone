import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="relative w-full h-[600px] overflow-hidden group">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero.png"
          alt="Modern Living Room"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-black/10"></div>
      </div>
      
      {/* Content strictly positioned */}
      <div className="absolute top-1/2 left-12 -translate-y-1/2 flex flex-col items-start bg-white/90 p-10 max-w-[450px]">
        <p className="text-gray-900 font-black tracking-widest uppercase text-xs mb-4">
          The Big Sale
        </p>
        <h1 className="text-4xl sm:text-5xl font-black text-gray-900 leading-[1.1] tracking-tighter mb-4 uppercase">
          Up To 70% Off
        </h1>
        <p className="text-base text-gray-700 mb-8 font-medium">
          Our biggest sale of the year is here. Shop modern essentials at unbeatable prices.
        </p>
        <Link
          href="#"
          className="inline-flex items-center justify-center bg-gray-900 text-white font-bold py-4 px-12 rounded-none text-sm uppercase tracking-widest hover:bg-primary transition-colors"
        >
          Shop The Sale
        </Link>
      </div>
    </div>
  );
}
