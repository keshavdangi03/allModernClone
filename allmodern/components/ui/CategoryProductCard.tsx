"use client";

import Image from "next/image";
import { Heart } from "lucide-react";

export type Product = {
  id: string;
  name: string;
  subtitle?: string | null;
  price?: number | string;
  priceStr?: string;
  originalPrice?: number | null;
  origPriceStr?: string;
  reviews?: number;
  rating?: number;
  badge?: "Sale" | "Limited Time Only" | null | string;
  image: string;
  colors?: string[];
  moreColors?: number;
  colorCount?: number;
  quickview?: boolean;
  extraText?: string | null;
  categories?: string[];
  shortDescription?: string;
  discountedPrice?: string;
};

function StarRating({ rating }: { rating: number }) {
  if (rating <= 0) return null;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex text-black text-[10px]">
      {[...Array(fullStars)].map((_, i) => (
        <span key={`full-${i}`}>★</span>
      ))}
      {hasHalfStar && <span>★</span>}
      {[...Array(emptyStars)].map((_, i) => (
        <span key={`empty-${i}`} className="text-slate-300">
          ★
        </span>
      ))}
    </div>
  );
}

export default function CategoryProductCard({ p }: { p: Product }) {
  const isExternalImage = p.image?.startsWith("http") || p.image?.startsWith("data:");
  const price = typeof p.price === 'string' ? parseFloat(p.price) : p.price;
  const originalPrice = p.originalPrice || (p.discountedPrice ? parseFloat(p.discountedPrice) : null);

  return (
    <div className="group relative flex flex-col h-full">
      <div className="relative aspect-square w-full overflow-hidden bg-[#f4f4f4] flex items-center justify-center">
        {isExternalImage ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img 
            src={p.image || "/images/hero.png"} 
            alt={p.name} 
            className="w-full h-full object-cover mix-blend-multiply transition-transform duration-500 group-hover:scale-105" 
            onError={(e) => (e.currentTarget.src = "/images/hero.png")}
          />
        ) : (
          <Image src={p.image || "/images/hero.png"} alt={p.name} fill className="object-cover mix-blend-multiply transition-transform duration-500 group-hover:scale-105" />
        )}
        <button className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-slate-600 shadow-sm backdrop-blur-sm hover:text-slate-950 hover:bg-white transition-colors z-10">
          <Heart className="h-4 w-4" />
        </button>
        {p.badge && (
          <div className="absolute bottom-0 left-0 bg-[#a63f15] px-2 py-0.5 text-[11px] font-bold text-white z-10">
            {p.badge}
          </div>
        )}
      </div>

      <div className="mt-3 flex flex-1 flex-col">
        {(p.colors || p.colorCount || p.moreColors) && (
          <div className="mb-1.5 flex items-center gap-1">
            {p.colors?.map((color, idx) => (
              <div key={idx} className="h-[15px] w-[15px] rounded-full border border-slate-300" style={{ backgroundColor: color }} />
            ))}
            {(p.moreColors || p.colorCount) ? <span className="text-[11px] text-slate-500">+ {p.moreColors || p.colorCount} Colors</span> : null}
          </div>
        )}
        <h3 className="mt-0.5 text-[13px] leading-tight text-slate-900 group-hover:underline whitespace-pre-line font-medium">
          {p.name}
        </h3>
        {(p.subtitle || p.shortDescription) && <div className="text-[12px] text-slate-500 mt-0.5 line-clamp-1">{p.subtitle || p.shortDescription}</div>}
        
        {(p.rating && p.rating > 0) ? (
          <div className="mt-1 flex items-center gap-1">
            <StarRating rating={p.rating} />
            <span className="text-[11px] text-slate-500">({p.reviews || 0})</span>
          </div>
        ) : null}

        <div className="mt-1 flex flex-wrap items-baseline gap-2">
          <span className="text-[15px] font-bold text-[#a63f15]">${price}</span>
          {(originalPrice && originalPrice > 0 && originalPrice !== price) ? (
            <span className="text-[12px] text-slate-500 line-through">${originalPrice}</span>
          ) : null}
        </div>
        {p.extraText && (
          <div className="mt-1 text-[11px] text-slate-600 whitespace-pre-line leading-tight">
            {p.extraText}
          </div>
        )}
        {p.quickview && <button className="mt-2 w-fit text-[11px] underline text-slate-500 hover:text-slate-800">Quickview</button>}
      </div>
    </div>
  );
}
