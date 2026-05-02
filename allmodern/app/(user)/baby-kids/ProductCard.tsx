import Image from "next/image";
import Link from "next/link";
import { Heart, Star } from "lucide-react";

export interface ProductProps {
  id: string;
  name: string;
  image: string;
  price: string;
  originalPrice?: string;
  isSale?: boolean;
  isBestSeller?: boolean;
  rating: number;
  reviews: number;
  shippingText?: string;
  colors?: { name: string; hex: string }[];
  colorCount?: number;
  brand?: string;
}

export default function ProductCard({ product }: { product: ProductProps }) {
  return (
    <div className="group relative flex flex-col">
      {/* Image Container */}
      <div className="relative aspect-square w-full overflow-hidden bg-[#f4f4f4] mb-3 p-4 flex items-center justify-center">
        <Link href={`/product/${product.id}`} className="absolute inset-0 z-10" aria-label={`View ${product.name}`} />
        
        <Image
          src={product.image}
          alt={product.name}
          width={300}
          height={300}
          className="object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-[1.03]"
        />

        {/* Tags */}
        <div className="absolute top-0 left-0 flex flex-col gap-1 p-3 z-20">
          {product.isBestSeller && (
            <span className="bg-white px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-900 border border-slate-200">
              Best Seller
            </span>
          )}
          {product.isSale && (
            <span className="bg-[#a63f15] px-2 py-1 text-[10px] font-bold text-white w-max">
              Sale
            </span>
          )}
        </div>

        {/* Favorite Button */}
        <button className="absolute top-3 right-3 z-20 bg-white w-8 h-8 rounded-full flex items-center justify-center shadow-sm border border-slate-200 hover:bg-slate-50 transition">
          <Heart className="w-4 h-4 text-slate-600" />
        </button>
      </div>

      {/* Product Info */}
      <div className="flex flex-col flex-1">
        {/* Colors / Options */}
        <div className="mb-2 h-[24px]">
          {product.colors && product.colors.length > 0 ? (
            <div className="flex gap-1.5 items-center">
              {product.colors.map((color, i) => (
                <button
                  key={i}
                  className={`w-5 h-5 rounded-full border border-slate-300 ${i === 0 ? 'ring-1 ring-offset-1 ring-slate-400' : ''}`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
              {product.colorCount && product.colorCount > product.colors.length && (
                <span className="text-[12px] text-slate-500 ml-1">+{product.colorCount - product.colors.length}</span>
              )}
            </div>
          ) : product.colorCount ? (
            <span className="text-[12px] text-slate-500">{product.colorCount} Colors</span>
          ) : (
            <span className="text-[11px] text-slate-500">More Options</span>
          )}
        </div>

        {/* Title */}
        <Link href={`/product/${product.id}`} className="text-[13px] font-medium leading-snug text-slate-900 hover:underline mb-1 line-clamp-2">
          {product.brand && <span className="font-bold">{product.brand} </span>}
          {product.name}
        </Link>
        {product.brand && <div className="text-[11px] text-slate-500 mb-1">{product.brand}</div>}

        {/* Ratings */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex text-slate-900">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'fill-current' : i < product.rating ? 'fill-current opacity-50' : 'text-slate-300'}`} />
            ))}
          </div>
          <span className="text-[12px] text-slate-600">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-end gap-2 mb-2 mt-auto">
          <span className="text-[15px] font-bold text-slate-900 ${product.isSale ? 'text-[#a63f15]' : ''}">
            {product.price}
          </span>
          {product.originalPrice && (
            <span className="text-[13px] text-slate-500 line-through pb-0.5">
              {product.originalPrice}
            </span>
          )}
        </div>

        {/* Shipping Text */}
        {product.shippingText && (
          <div className="text-[11px] text-slate-600">
            {product.shippingText}
          </div>
        )}
      </div>
    </div>
  );
}
