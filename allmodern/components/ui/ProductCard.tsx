"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Star } from "lucide-react";

export interface Product {
  name: string;
  category: string;
  price: string;
  oldPrice?: string;
  rating: string;
  reviews: string;
  image: string;
  hoverImage?: string;
  badge?: string;
  colors?: string[];
  sizesText?: string;
  deliveryText?: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href="#"
      className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div className="relative overflow-hidden bg-slate-100">
        <div className="aspect-[4/5] overflow-hidden relative">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 24vw"
            className={`object-cover transition duration-500 ${product.hoverImage ? 'group-hover:opacity-0' : 'group-hover:scale-[1.03]'}`}
          />
          {product.hoverImage && (
            <Image
              src={product.hoverImage}
              alt={`${product.name} alternate`}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 24vw"
              className="object-cover absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 group-hover:scale-[1.03]"
            />
          )}
        </div>
        {product.badge ? (
          <span className="absolute left-3 top-3 inline-flex rounded-full bg-orange-600 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white shadow-md shadow-orange-600/20 sm:left-4 sm:top-4">
            {product.badge}
          </span>
        ) : null}
        <span className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/80 bg-white/90 text-slate-950 shadow-sm transition hover:bg-white sm:right-4 sm:top-4 sm:h-10 sm:w-10">
          <Heart className="h-4 w-4" />
        </span>
      </div>
      <div className="space-y-1.5 p-4 sm:p-[1.125rem]">
        {product.colors && (
          <div className="flex items-center gap-1.5 pb-1">
            {product.colors.map((color, idx) => (
              <span key={idx} className="h-5 w-5 rounded-full border border-slate-300" style={{ backgroundColor: color }} />
            ))}
          </div>
        )}
        {product.sizesText && <p className="text-[11px] text-[#a63f15] font-bold">{product.sizesText}</p>}
        <h3 className="text-[13px] leading-tight font-semibold text-slate-950 group-hover:underline">{product.name}</h3>
        {product.category && <p className="text-[12px] text-slate-500">{product.category}</p>}
        <div className="flex flex-wrap items-center gap-1 text-[11px] text-slate-600 pb-1">
          <span className="inline-flex items-center gap-0.5 text-black">
            <span className="text-[12px]">★★★★★</span> {/* Hardcoded for style matching, should use StarRating component ideally but this is fine for dummy */}
          </span>
          <span className="text-slate-500">({product.reviews})</span>
        </div>
        <div className="flex flex-wrap items-baseline gap-2">
          <p className="text-[13px] font-bold text-[#a63f15]">{product.price}</p>
          {product.oldPrice ? (
            <p className="text-[12px] text-slate-500 line-through">{product.oldPrice}</p>
          ) : null}
        </div>
        {product.deliveryText && <p className="text-[11px] text-slate-600 pt-1">{product.deliveryText}</p>}
      </div>
    </Link>
  );
}
