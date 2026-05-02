import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const products = [
  { id: 1, name: "Miller 56\" Upholstered Loveseat", image: "/images/cat_living_room.png", salePrice: "$799", originalPrice: "$999", isSale: true },
  { id: 2, name: "Miller 84\" Upholstered Sofa", image: "/images/cat_bedroom.png", salePrice: "$1,099", originalPrice: "$1,299", isSale: true },
  { id: 3, name: "Miller Upholstered Armchair", image: "/images/hero.png", salePrice: "$459", originalPrice: "$579", isSale: true },
  { id: 4, name: "Miller 2 - Piece Upholstered Chaise Sectional", image: "/images/cat_outdoor.png", salePrice: "$1,899", originalPrice: "$2,199", isSale: true },
  { id: 5, name: "Salma Colorful Enamel End Table", image: "/images/cat_dining.png", salePrice: "$229", originalPrice: null, isSale: false },
];

export default function NewArrivals() {
  return (
    <section className="bg-white py-12 sm:py-20 overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between bg-[#f4f4f4] px-8 pt-10 pb-4">
          <h2 className="text-[36px] sm:text-[48px] font-black tracking-tight text-slate-950 leading-none">
            New Arrivals?
          </h2>
          <h2 className="text-[36px] sm:text-[48px] font-black tracking-tight text-slate-950 leading-none mt-2 sm:mt-0">
            Right Here.
          </h2>
        </div>

        <div className="relative group">
          <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-4 sm:gap-5 pb-8 -mx-4 px-4 sm:-mx-6 sm:px-6">
            {products.map((product) => (
              <div key={product.id} className="snap-start shrink-0 w-[240px] sm:w-[260px] lg:w-[270px]">
                <Link href="#" className="group/item block">
                  <div className="relative aspect-square bg-[#f4f4f4] mb-3 overflow-hidden flex items-center justify-center p-4">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={220}
                      height={220}
                      className="object-contain mix-blend-multiply transition-transform duration-500 group-hover/item:scale-105"
                    />
                    {product.isSale && (
                      <div className="absolute bottom-0 left-0 bg-[#a63f15] px-2 py-0.5 text-[11px] font-bold text-white">
                        Sale
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-[13px] text-slate-800 line-clamp-2 leading-snug min-h-[38px]">
                      {product.name}
                    </h3>
                    <div className="mt-1 flex items-center gap-1.5 text-[13px]">
                      <span className="font-bold text-[#a63f15]">{product.salePrice}</span>
                      {product.originalPrice && (
                        <span className="text-slate-500 line-through">{product.originalPrice}</span>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          
          <button className="hidden lg:flex absolute right-0 top-[40%] -translate-y-1/2 translate-x-1/2 bg-white border border-slate-300 w-11 h-11 items-center justify-center shadow-lg hover:bg-slate-50 opacity-0 group-hover:opacity-100 transition-opacity z-10">
            <ChevronRight className="w-5 h-5 text-slate-700" />
          </button>
        </div>
      </div>
    </section>
  );
}
