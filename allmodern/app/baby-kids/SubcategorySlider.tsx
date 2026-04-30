import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const subcategories = [
  { name: "Baby Furniture", image: "/images/cat_bedroom.png" },
  { name: "Changing Tables + Toppers", image: "/images/cat_living_room.png" },
  { name: "Crib Bedding + Mattresses", image: "/images/cat_outdoor.png" },
  { name: "Kids Furniture", image: "/images/cat_dining.png" },
  { name: "Baby + Kids Rugs", image: "/images/hero.png" },
];

export default function SubcategorySlider() {
  return (
    <section className="bg-white pt-10 pb-6 border-b border-slate-200">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 relative group">
        <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-4 pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6">
          {subcategories.map((sub, idx) => (
            <div key={idx} className="snap-start shrink-0 w-[180px] sm:w-[220px] md:w-[240px]">
              <Link href="#" className="group/item block text-center border border-slate-200 hover:border-slate-300 transition shadow-sm bg-white">
                <div className="relative aspect-square overflow-hidden bg-[#f4f4f4]">
                  <Image
                    src={sub.image}
                    alt={sub.name}
                    fill
                    sizes="240px"
                    className="object-cover transition-transform duration-500 group-hover/item:scale-105"
                  />
                </div>
                <div className="p-3">
                  <h3 className="text-[13px] text-slate-800">{sub.name}</h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
        
        <button className="hidden lg:flex absolute right-6 top-[40%] -translate-y-1/2 translate-x-1/2 bg-white border border-slate-300 w-10 h-10 items-center justify-center shadow-lg hover:bg-slate-50 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <ChevronRight className="w-5 h-5 text-slate-700" />
        </button>
      </div>
    </section>
  );
}
