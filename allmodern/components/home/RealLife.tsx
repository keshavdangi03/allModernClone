import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

export default function RealLife() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1400px]">
        {/* Carousel Image Container */}
        <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px] overflow-hidden group">
          <Image
            src="/images/hero.png" // Placeholder for store exterior
            alt="AllModern Store"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          
          <div className="absolute bottom-0 left-0 p-8 sm:p-12 z-10 w-full">
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold text-white leading-tight">
              AllModern in Real Life
            </h2>
            <p className="mt-2 text-[15px] sm:text-[18px] text-white/90">
              Stop by + experience the best of modern for yourself.
            </p>
          </div>

          {/* Carousel Arrows */}
          <button className="absolute left-4 top-1/2 -translate-y-1/2 bg-white border border-slate-300 w-12 h-12 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <ChevronLeft className="w-6 h-6 text-slate-700" />
          </button>
          <button className="absolute right-4 top-1/2 -translate-y-1/2 bg-white border border-slate-300 w-12 h-12 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <ChevronRight className="w-6 h-6 text-slate-700" />
          </button>
        </div>

        {/* Bottom Bar */}
        <div className="border border-t-0 border-slate-200 py-4 px-6 flex items-center justify-between">
          <div className="flex-1" />
          <div className="flex-1 flex justify-center gap-2">
            <button className="w-[5px] h-[5px] rounded-full border border-slate-950"></button>
            <button className="w-[5px] h-[5px] rounded-full bg-slate-950"></button>
            <button className="w-[5px] h-[5px] rounded-full border border-slate-950"></button>
            <button className="w-[5px] h-[5px] rounded-full border border-slate-950"></button>
          </div>
          <div className="flex-1 flex justify-end">
            <Link
              href="#"
              className="inline-flex items-center text-[13px] font-bold text-slate-950 hover:text-slate-700 transition"
            >
              EXPLORE NOW
              <ArrowRight className="ml-1 h-[14px] w-[14px]" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
