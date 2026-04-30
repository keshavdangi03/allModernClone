import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function SaleBanner() {
  return (
    <section className="bg-[#e43a06] text-white">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-8 py-10 sm:py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <h2 className="text-[clamp(4rem,10vw,8rem)] font-black leading-none tracking-tight">
          Sale
        </h2>
        <div className="shrink-0 mt-4 md:mt-0">
          <Link
            href="#"
            className="inline-flex items-center justify-center bg-white px-8 py-4 text-[14px] font-bold text-slate-950 transition hover:bg-slate-100"
          >
            SHOP NOW
            <ArrowRight className="ml-2 h-[18px] w-[18px]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
