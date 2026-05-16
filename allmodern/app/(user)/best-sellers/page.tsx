"use client";

import Image from "next/image";
import FilterableProductLayout from "@/components/ui/FilterableProductLayout";
import ProductCard from "@/components/ui/ProductCard";
import type { Product } from "@/components/ui/ProductCard";

const bestSellerProducts: Product[] = [
  {
    name: "Miller 56\" Upholstered Loveseat",
    category: "Blue Velvet",
    price: "$849",
    oldPrice: "$999",
    rating: "4.5",
    reviews: "346",
    image: "/images/hero.png",
    hoverImage: "/images/cat_living_room.png",
    colors: ["#5d7a96", "#5a684b", "#ece8e2", "#c4c0b6"],
    deliveryText: "Free Fast Delivery",
  },
  {
    name: "Miller 2 - Piece Upholstered Chaise Sectional",
    category: "Olive Green Polyester Blend, Right Hand Facing",
    price: "$1,999",
    oldPrice: "$2,199",
    rating: "4.5",
    reviews: "1739",
    image: "/images/cat_living_room.png",
    hoverImage: "/images/cat_bedroom.png",
    badge: "Limited Time Only",
    colors: ["#5a684b", "#ece8e2", "#5d7a96", "#c4c0b6"],
  },
  {
    name: "Miller 84\" Upholstered Sofa",
    category: "Blue Velvet",
    price: "$1,199",
    oldPrice: "$1,299",
    rating: "4.5",
    reviews: "2469",
    image: "/images/cat_dining.png",
    hoverImage: "/images/cat_outdoor.png",
    colors: ["#5d7a96", "#ece8e2", "#c4c0b6", "#5a684b"],
  },
  {
    name: "Miller Upholstered Armchair",
    category: "Blue Velvet",
    price: "$469",
    oldPrice: "$679",
    rating: "4.5",
    reviews: "1556",
    image: "/images/cat_outdoor.png",
    hoverImage: "/images/hero.png",
    badge: "Sale",
    colors: ["#5d7a96", "#c4c0b6", "#5a684b", "#ece8e2"],
    deliveryText: "Free Fast Delivery",
  },
  {
    name: "Reeves 84\" Vegan Leather Sofa",
    category: "Olive Green Performance Faux Leather",
    price: "$850",
    oldPrice: "$978",
    rating: "4.5",
    reviews: "166",
    image: "/images/cat_bedroom.png",
    hoverImage: "/images/cat_living_room.png",
    badge: "Sale",
    colors: ["#3b2f2f", "#8b5a2b", "#5a684b", "#a0522d"],
  },
  {
    name: "Mallory Area Rug",
    category: "Rectangle 8' x 9'",
    price: "$129",
    oldPrice: "$649",
    rating: "4.5",
    reviews: "276",
    image: "/images/cat_dining.png",
    hoverImage: "/images/hero.png",
    badge: "Limited Time Only",
    sizesText: "11 Sizes",
    deliveryText: "Free 3-Day Delivery",
  },
  {
    name: "Farrah Stacking Patio Dining Armchair\n(Set of 2)",
    category: "Taupe",
    price: "$329 $164.50 per item",
    oldPrice: "$449",
    rating: "4.5",
    reviews: "138",
    image: "/images/hero.png",
    hoverImage: "/images/cat_outdoor.png",
    badge: "Limited Time Only",
    colors: ["#ece8e2", "#000", "#1e3a8a", "#5a684b", "#4a4a4a"],
    deliveryText: "Free Fast Delivery",
  },
  {
    name: "POLYWOOD x AllModern Folding Plastic Adirondack Chair",
    category: "Black",
    price: "$249",
    oldPrice: "$269",
    rating: "4.5",
    reviews: "55",
    image: "/images/cat_living_room.png",
    hoverImage: "/images/cat_dining.png",
    colors: ["#fff", "#000", "#1e3a8a", "#c19a6b", "#8b0000", "+8"],
  },
  {
    name: "Farrah Stacking Patio Dining Side Chair\n(Set of 2)",
    category: "Olive Green",
    price: "$239 $119.50 per item",
    oldPrice: "$309",
    rating: "4.5",
    reviews: "194",
    image: "/images/cat_bedroom.png",
    hoverImage: "/images/hero.png",
    badge: "Sale",
    colors: ["#5a684b", "#ece8e2", "#000", "#1e3a8a", "#4a4a4a"],
    deliveryText: "Free Fast Delivery",
  },
];

export default function BestSellersPage() {
  return (
    <main className="bg-white min-h-screen">
      {/* Best Sellers Hero Section */}
      <section className="relative w-full h-[300px] md:h-[450px]">
        <Image 
          src="/images/cat_living_room.png" 
          alt="Simply the Best" 
          fill 
          className="object-cover object-center" 
          priority 
        />
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-0 flex items-end justify-start max-w-[1400px] mx-auto px-4 pb-8 sm:px-6 md:pb-12">
          <h1 className="text-white text-[32px] md:text-[54px] font-bold tracking-tight drop-shadow-md">
            Simply the Best
          </h1>
        </div>
      </section>

      {/* Main Filterable Layout */}
      <FilterableProductLayout title="Top-Rated Best Sellers" itemCount={486} products={[]} categoryName="Top-Rated Best Sellers"></FilterableProductLayout>
    </main>
  );
}
