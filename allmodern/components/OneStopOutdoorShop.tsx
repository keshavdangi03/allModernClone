import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function OneStopOutdoorShop() {
  return (
    <section className="relative w-full h-[350px] sm:h-[450px] lg:h-[600px] overflow-hidden">
      <Image
        src="/images/cat_dining.png" // Placeholder
        alt="One-Stop Outdoor Shop"
        fill
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/10" />
      
      <div className="absolute inset-0 z-10 flex items-center px-6 sm:px-12 lg:px-24">
        <div className="max-w-xl">
          <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-black leading-[1.05] tracking-tight text-white drop-shadow-md">
            One-Stop<br />Outdoor Shop
          </h2>
          <div className="mt-6">
            <Link
              href="#"
              className="inline-flex items-center justify-center bg-white px-6 py-3.5 text-[14px] font-bold text-slate-950 transition hover:bg-slate-100"
            >
              SHOP MODERN OUTDOOR
              <ArrowRight className="ml-2 h-[18px] w-[18px]" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
