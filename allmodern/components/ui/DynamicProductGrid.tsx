"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import Link from "next/link";
import { getProducts } from "@/lib/actions/products";
import { getProductUrl } from "@/lib/utils";

export default function DynamicProductGrid({ category }: { category: string }) {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    getProducts()
      .then((allProducts) => {
        const filtered = allProducts.filter((p: any) => 
          p.categories?.some((cat: string) => 
            cat === category || cat.startsWith(`${category} >`)
          )
        );
        setProducts(filtered);
      })
      .catch((e) => console.error("Failed to fetch products for grid", e));
  }, [category]);

  if (products.length === 0) return null;

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:gap-x-6 lg:gap-y-12 mb-12 border-b border-gray-200 pb-12">
      <div className="col-span-full mb-2">
        <h3 className="text-lg font-bold text-slate-900">Recently Added {category}</h3>
      </div>
      {products.map((p) => {
        const pUrl = getProductUrl({ id: p.id, name: p.name, slug: p.slug, categories: p.categories });
        return (
          <Link 
            key={p.id} 
            href={pUrl}
            target="_blank"
            className="group relative flex flex-col bg-white border border-slate-200/80 p-2.5 rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition duration-200"
          >
            <div className="relative aspect-square w-full overflow-hidden bg-[#f4f4f4] flex items-center justify-center p-4 rounded-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={p.image || "/images/hero.png"} 
                alt={p.name} 
                className="max-w-full max-h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105" 
                onError={(e) => (e.currentTarget.style.display = 'none')}
                onLoad={(e) => (e.currentTarget.style.display = 'block')}
              />
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-slate-600 shadow-sm backdrop-blur-sm hover:text-slate-950 hover:bg-white transition-colors z-10"
              >
                <Heart className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-3 flex flex-1 flex-col justify-between">
              <div>
                <h3 className="mt-0.5 text-[13px] leading-tight text-slate-900 group-hover:underline whitespace-pre-line font-medium line-clamp-2">
                  {p.name}
                </h3>
                {p.shortDescription && <div className="text-[12px] text-slate-500 mt-1 line-clamp-2">{p.shortDescription}</div>}
              </div>
              <div className="mt-2 flex flex-wrap items-baseline gap-2">
                <span className="text-[15px] font-bold text-[#a63f15]">${p.price}</span>
                {p.discountedPrice && p.discountedPrice !== "0" && (
                  <span className="text-[12px] text-slate-500 line-through">${p.discountedPrice}</span>
                )}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
