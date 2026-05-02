import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function DesignDrop() {
  return (
    <section className="relative w-full h-[400px] sm:h-[500px] lg:h-[700px] overflow-hidden flex flex-col justify-end">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/cat_dining.png" // Placeholder
          alt="Design Drop"
          fill
          className="object-cover object-center"
        />
        {/* Dark gradient from bottom to make text legible */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      </div>
      
      <div className="relative z-10 w-full">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 pb-8 sm:pb-12">
          <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-black tracking-tight text-white leading-none">
            Design Drop
          </h2>
          <p className="mt-2 sm:mt-4 text-[clamp(1.1rem,2vw,1.5rem)] text-white/90">
            The Season&apos;s Top 10 Styles
          </p>
        </div>
        
        <div className="bg-white border-y border-slate-200">
          <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
            <Link
              href="#"
              className="flex w-full items-center py-4 sm:py-5 text-[15px] font-bold text-slate-950 transition hover:text-slate-700"
            >
              SHOP THE TOP 10
              <ArrowRight className="ml-2 h-[18px] w-[18px]" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
