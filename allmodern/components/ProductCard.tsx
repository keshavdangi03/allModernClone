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
  badge?: string;
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
        <div className="aspect-[4/5] overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 24vw"
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
          />
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
      <div className="space-y-2.5 p-4 sm:p-[1.125rem]">
        <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">{product.category}</p>
        <h3 className="text-[15px] leading-5 font-semibold text-slate-950">{product.name}</h3>
        <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
          <span className="inline-flex items-center gap-1 text-amber-500">
            <Star className="h-3.5 w-3.5 fill-current" /> {product.rating}
          </span>
          <span className="text-slate-400">({product.reviews})</span>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <p className="text-base font-bold text-slate-950">{product.price}</p>
          {product.oldPrice ? (
            <p className="text-xs text-slate-400 line-through">{product.oldPrice}</p>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
