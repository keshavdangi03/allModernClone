import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Heart } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HelpChat from "@/components/layout/HelpChat";

const topCategories = [
  { title: "Outdoor Lounge Furniture", image: "/images/cat_living_room.png" },
  { title: "Outdoor Dining + Bar Furniture", image: "/images/cat_dining.png" },
  { title: "Outdoor Entertaining", image: "/images/cat_bedroom.png" },
  { title: "Patio Decor + Accessories", image: "/images/cat_outdoor.png" },
  { title: "Outdoor Lighting", image: "/images/hero.png" },
];

const loungeSubcats = [
  { title: "Shop Outdoor Sofas", image: "/images/cat_living_room.png" },
  { title: "Shop Outdoor Chairs", image: "/images/cat_bedroom.png" },
  { title: "Shop Outdoor Collections", image: "/images/cat_dining.png" },
];

const loungeProducts = [
  { id: "ol1", name: "Ratcliff Outdoor Adirondack Set\n(Set of 4)", price: 799, originalPrice: null, extraText: "$199.75 per item", badge: null, image: "/images/cat_living_room.png" },
  { id: "ol2", name: "Santiago Rattan Outdoor Swing Chair", price: 300, originalPrice: 366, badge: "Limited Time Only", image: "/images/cat_bedroom.png" },
  { id: "ol3", name: "Farrah Outdoor Armless Lounge Chair\n(Set of 2)", price: 299, originalPrice: 379, extraText: "$149.50 per item", badge: null, image: "/images/cat_dining.png" },
  { id: "ol4", name: "Byrnes Outdoor Adirondack Chair", price: 399, originalPrice: 419, badge: null, image: "/images/cat_outdoor.png" },
];

const diningSubcats = [
  { title: "Shop Outdoor Dining Tables", image: "/images/cat_outdoor.png" },
  { title: "Shop Outdoor Dining Chairs", image: "/images/cat_living_room.png" },
  { title: "Shop Patio Bar Sets", image: "/images/cat_bedroom.png" },
];

const diningProducts = [
  { id: "od1", name: "Farrah Outdoor Stacking Dining Side Chair\n(Set of 2)", price: 239, originalPrice: 379, extraText: "$119.50 per item", badge: "Sale", image: "/images/cat_living_room.png" },
  { id: "od2", name: "Farrah Stacking Patio Dining Side Chair\n(Set of 2)", price: 239, originalPrice: 379, extraText: "$119.50 per item", badge: "Limited Time Only", image: "/images/cat_bedroom.png" },
  { id: "od3", name: "Isla Indoor/Outdoor Dining Chair\n(Set of 4)", price: 181, originalPrice: 329, extraText: "$45.25 per item", badge: "Sale", image: "/images/cat_dining.png" },
  { id: "od4", name: "Zenni 12.2\" Concrete Outdoor Side Table", price: 139, originalPrice: 179, badge: "Sale", image: "/images/cat_outdoor.png" },
  { id: "od5", name: "Stella Stacking Patio Dining Armchair\n(Set of 2)", price: 329, originalPrice: 479, extraText: "$164.50 per item", badge: null, image: "/images/cat_living_room.png" },
  { id: "od6", name: "Ammelie 86\" Rectangular Aluminum Patio Dining Table", price: 860, originalPrice: 1100, badge: null, image: "/images/cat_bedroom.png" },
  { id: "od7", name: "Demi Shade Side Table", price: 140, originalPrice: null, badge: null, image: "/images/cat_dining.png" },
  { id: "od8", name: "Neil Accent Stool", price: 175, originalPrice: 207, badge: null, image: "/images/cat_outdoor.png" },
];

const patioDecorProducts = [
  { id: "pd1", name: "6 ft. H x 4 ft. W Metal Privacy Screen", price: 120, originalPrice: 162, badge: "Sale", image: "/images/cat_living_room.png" },
  { id: "pd2", name: "Corten Steel Series Cube Planter Box", price: 189, originalPrice: 215, badge: "Sale", image: "/images/cat_dining.png" },
  { id: "pd3", name: "Block Series Pedestal Planter", price: 134, originalPrice: null, badge: null, image: "/images/cat_bedroom.png" },
  { id: "pd4", name: "Block Series Cube Planter", price: 155, originalPrice: null, badge: null, image: "/images/cat_outdoor.png" },
];

const exploreModernDesigns = [
  { image: "/images/cat_outdoor.png" },
  { image: "/images/hero.png" },
  { image: "/images/cat_living_room.png" },
];

const mainGridSubcats = [
  { title: "Shop Patio Umbrellas", image: "/images/cat_outdoor.png" },
  { title: "Shop Outdoor Pillows", image: "/images/hero.png" },
  { title: "Shop Outdoor Furniture Sets", image: "/images/cat_living_room.png" },
];

const mainGridProducts = [
  { id: "mg1", name: "Block Series Span Planter", subtitle: "Black", price: 192, originalPrice: null, extraText: "Free Fast Delivery", reviews: 2954, rating: 4.5, badge: null, image: "/images/cat_living_room.png", colorCount: 3 },
  { id: "mg2", name: "Lani Outdoor Sunbrella Seat/Back Cushion", subtitle: "Cast Ash Sunbrella Plainweave", price: 135, originalPrice: 169, extraText: "Free 3-Day Delivery", reviews: 403, rating: 4.5, badge: "Limited Time Only", image: "/images/cat_bedroom.png", colors: ["#d9c8b8", "#333", "#a66", "#e8e0d5", "#f4e4e9"] },
  { id: "mg3", name: "Block Series Long Box Planter", subtitle: "Black", price: 150, originalPrice: null, extraText: "Free Fast Delivery", reviews: 2444, rating: 4.5, badge: null, image: "/images/cat_dining.png", colorCount: 3 },
  { id: "mg4", name: "POLYWOOD Modern Curveback Adirondack Chair", subtitle: "Black", price: 319, originalPrice: null, extraText: "Free 3-Day Delivery", reviews: 899, rating: 4.5, badge: null, image: "/images/cat_outdoor.png", colors: ["#000", "#0078d7", "#ccc", "#c00", "#f90", "#8b4513"] },
  { id: "mg5", name: "Breshawna Aluminum Matte Black Outdoor Armed Sconce", subtitle: null, price: 74, originalPrice: 82, extraText: "Free Fast Delivery", reviews: 190, rating: 4.5, badge: null, image: "/images/hero.png" },
  { id: "mg6", name: "Sunbrella Outdoor Ottoman Cushion", subtitle: "Canvas Navy Sunbrella Canvas", price: 117, originalPrice: 134, extraText: "Free Fast Delivery", reviews: 420, rating: 4.5, badge: "Sale", image: "/images/cat_living_room.png", colors: ["#1e3a8a", "#ccc", "#87ceeb", "#f5f5dc", "#000"] },
  { id: "mg7", name: "Menades 157\" Cantilever Outdoor Umbrella", subtitle: "Black", price: 899, originalPrice: 1149, extraText: "Free 3-Day Delivery", reviews: 36, rating: 4.5, badge: "Sale", image: "/images/cat_bedroom.png", colors: ["#000", "#ccc"] },
  { id: "mg8", name: "6 ft. H x 4 ft. W Metal Privacy Screen", subtitle: "Black", price: 120, originalPrice: 162, extraText: "Free Fast Delivery", reviews: 381, rating: 4.5, badge: "Sale", image: "/images/cat_dining.png", colorCount: 3 },
  { id: "mg9", name: "Stevie 108\" Outdoor Umbrella", subtitle: "White - Olefin", price: 179, originalPrice: 249, extraText: "Free Fast Delivery", reviews: 2255, rating: 4.5, badge: "Sale", image: "/images/cat_outdoor.png", colors: ["#fff", "#1e3a8a", "#8b4513", "#c5b358", "#ffcc00"] },
];

function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  return (
    <div className="flex text-black text-[10px]">
      {[...Array(fullStars)].map((_, i) => <span key={`full-${i}`}>★</span>)}
      {hasHalfStar && <span>★</span>}
      {[...Array(emptyStars)].map((_, i) => <span key={`empty-${i}`} className="text-slate-300">★</span>)}
    </div>
  );
}

export default function OutdoorPage() {
  return (
    <>
      <Header />
      <main className="bg-white">

        {/* Hero Section */}
        <section className="relative h-[250px] w-full sm:h-[350px] md:h-[450px]">
          <Image src="/images/hero.png" alt="Outdoor" fill className="object-cover object-center" priority />
          <div className="absolute inset-0 bg-black/10" />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-4xl font-bold text-white drop-shadow-md sm:text-5xl md:text-[80px]">
              Outdoor
            </h1>
          </div>
        </section>

        {/* Top Category Tiles */}
        <section className="mx-auto max-w-[1400px] px-4 pt-10 sm:px-6 border-b border-slate-200 pb-10">
          <div className="flex justify-between gap-4 overflow-x-auto pb-4">
            {topCategories.map((cat) => (
              <Link key={cat.title} href="#" className="group flex min-w-[140px] flex-1 flex-col items-center">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 mb-3">
                  <Image src={cat.image} alt={cat.title} fill className="object-cover transition duration-300 group-hover:scale-105" />
                </div>
                <p className="text-center text-[13px] font-medium text-slate-900 group-hover:underline">
                  {cat.title}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* OUTDOOR LOUNGE FURNITURE DEPARTMENT SECTION */}
        <section className="mx-auto max-w-[1400px] px-4 pt-16 sm:px-6">
          <h2 className="text-[28px] font-bold text-slate-950 mb-6">Outdoor Lounge Furniture</h2>
          <div className="relative h-[300px] sm:h-[400px] md:h-[500px] w-full overflow-hidden mb-6 group cursor-pointer">
            <Image src="/images/cat_living_room.png" alt="Outdoor Lounge Furniture Banner" fill className="object-cover transition duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 flex items-end justify-end p-8 md:p-12 bg-gradient-to-t from-black/50 to-transparent opacity-80">
               <span className="text-white text-2xl md:text-3xl font-bold underline underline-offset-8 drop-shadow-md decoration-white">SHOP OUTDOOR LOUNGE</span>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-10">
            {loungeSubcats.map((cat) => (
              <div key={cat.title} className="group cursor-pointer">
                <div className="relative aspect-square w-full overflow-hidden mb-2 bg-[#f4f4f4]">
                  <Image src={cat.image} alt={cat.title} fill className="object-cover mix-blend-multiply transition duration-300 group-hover:scale-105" />
                </div>
                <h3 className="font-bold text-[14px] text-slate-900 group-hover:underline">{cat.title}</h3>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 lg:gap-x-6 lg:gap-y-12 pb-6 border-b border-slate-200">
            {loungeProducts.map((p) => (
               <div key={p.id} className="group relative flex flex-col">
                 <div className="relative aspect-square w-full bg-[#f4f4f4] mb-3 overflow-hidden">
                    <Image src={p.image} alt={p.name} fill className="object-cover mix-blend-multiply" />
                    {p.badge && (
                      <div className="absolute bottom-0 left-0 bg-[#a63f15] px-2 py-0.5 text-[11px] font-bold text-white z-10">
                        {p.badge}
                      </div>
                    )}
                 </div>
                 <h4 className="text-[13px] leading-tight text-slate-900 group-hover:underline whitespace-pre-line">{p.name}</h4>
                 <div className="mt-1 flex flex-wrap items-baseline gap-2">
                   <span className="text-[13px] text-[#a63f15] font-bold">${p.price}</span>
                   {p.originalPrice && <span className="text-[12px] text-slate-500 line-through">${p.originalPrice}</span>}
                 </div>
                 {p.extraText && <span className="text-[12px] text-slate-500 mt-0.5">{p.extraText}</span>}
               </div>
            ))}
            
            <div className="col-span-2 md:col-span-4 flex justify-end pt-2 pb-10">
               <Link href="#" className="text-lg font-bold text-slate-900 underline underline-offset-4 hover:text-slate-600 uppercase tracking-wide">
                 SHOP ALL OUTDOOR LOUNGE FURNITURE
               </Link>
            </div>
          </div>
        </section>

        {/* OUTDOOR DINING FURNITURE DEPARTMENT SECTION */}
        <section className="mx-auto max-w-[1400px] px-4 pt-16 sm:px-6">
          <h2 className="text-[28px] font-bold text-slate-950 mb-6">Outdoor Dining Furniture</h2>
          <div className="relative h-[300px] sm:h-[400px] md:h-[500px] w-full overflow-hidden mb-6 group cursor-pointer">
            <Image src="/images/cat_dining.png" alt="Outdoor Dining Furniture Banner" fill className="object-cover transition duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 flex items-end justify-end p-8 md:p-12 bg-gradient-to-t from-black/50 to-transparent opacity-80">
               <span className="text-white text-2xl md:text-3xl font-bold underline underline-offset-8 drop-shadow-md decoration-white">SHOP OUTDOOR DINING</span>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-10">
            {diningSubcats.map((cat) => (
              <div key={cat.title} className="group cursor-pointer">
                <div className="relative aspect-square w-full overflow-hidden mb-2 bg-[#f4f4f4]">
                  <Image src={cat.image} alt={cat.title} fill className="object-cover mix-blend-multiply transition duration-300 group-hover:scale-105" />
                </div>
                <h3 className="font-bold text-[14px] text-slate-900 group-hover:underline">{cat.title}</h3>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 lg:gap-x-6 lg:gap-y-12 pb-6 border-b border-slate-200">
            {diningProducts.map((p) => (
               <div key={p.id} className="group relative flex flex-col">
                 <div className="relative aspect-square w-full bg-[#f4f4f4] mb-3 overflow-hidden">
                    <Image src={p.image} alt={p.name} fill className="object-cover mix-blend-multiply" />
                    {p.badge && (
                      <div className="absolute bottom-0 left-0 bg-[#a63f15] px-2 py-0.5 text-[11px] font-bold text-white z-10">
                        {p.badge}
                      </div>
                    )}
                 </div>
                 <h4 className="text-[13px] leading-tight text-slate-900 group-hover:underline whitespace-pre-line">{p.name}</h4>
                 <div className="mt-1 flex flex-wrap items-baseline gap-2">
                   <span className="text-[13px] text-[#a63f15] font-bold">${p.price}</span>
                   {p.originalPrice && <span className="text-[12px] text-slate-500 line-through">${p.originalPrice}</span>}
                 </div>
                 {p.extraText && <span className="text-[12px] text-slate-500 mt-0.5">{p.extraText}</span>}
               </div>
            ))}
            
            <div className="col-span-2 md:col-span-4 flex justify-end pt-2 pb-10">
               <Link href="#" className="text-lg font-bold text-slate-900 underline underline-offset-4 hover:text-slate-600 uppercase tracking-wide">
                 SHOP ALL OUTDOOR DINING FURNITURE
               </Link>
            </div>
          </div>
        </section>

        {/* PATIO DECOR DEPARTMENT SECTION */}
        <section className="mx-auto max-w-[1400px] px-4 pt-16 sm:px-6">
          <h2 className="text-[28px] font-bold text-slate-950 mb-6">Patio Decor</h2>
          <div className="relative h-[300px] sm:h-[400px] md:h-[500px] w-full overflow-hidden mb-10 group cursor-pointer">
            <Image src="/images/cat_bedroom.png" alt="Patio Decor Banner" fill className="object-cover transition duration-500 group-hover:scale-105" />
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 lg:gap-x-6 lg:gap-y-12 pb-6 border-b border-slate-200">
            {patioDecorProducts.map((p) => (
               <div key={p.id} className="group relative flex flex-col">
                 <div className="relative aspect-square w-full bg-[#f4f4f4] mb-3 overflow-hidden">
                    <Image src={p.image} alt={p.name} fill className="object-cover mix-blend-multiply" />
                    {p.badge && (
                      <div className="absolute bottom-0 left-0 bg-[#a63f15] px-2 py-0.5 text-[11px] font-bold text-white z-10">
                        {p.badge}
                      </div>
                    )}
                 </div>
                 <h4 className="text-[13px] leading-tight text-slate-900 group-hover:underline whitespace-pre-line">{p.name}</h4>
                 <div className="mt-1 flex flex-wrap items-baseline gap-2">
                   <span className="text-[13px] text-[#a63f15] font-bold">${p.price}</span>
                   {p.originalPrice && <span className="text-[12px] text-slate-500 line-through">${p.originalPrice}</span>}
                 </div>
               </div>
            ))}
            
            <div className="col-span-2 md:col-span-4 flex justify-end pt-2 pb-10">
               <Link href="#" className="text-lg font-bold text-slate-900 underline underline-offset-4 hover:text-slate-600 uppercase tracking-wide">
                 SHOP ALL PATIO DECOR
               </Link>
            </div>
          </div>
        </section>

        {/* EXPLORE MORE MODERN DESIGNS */}
        <section className="mx-auto max-w-[1400px] px-4 pt-16 sm:px-6">
          <h2 className="text-[28px] font-bold text-slate-950 mb-6">Explore More Modern Designs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {exploreModernDesigns.map((item, idx) => (
              <div key={idx} className="relative aspect-square w-full overflow-hidden cursor-pointer group bg-slate-100">
                <Image src={item.image} alt="Explore design" fill className="object-cover transition duration-500 group-hover:scale-105" />
              </div>
            ))}
          </div>
        </section>

        {/* MAIN CATEGORY GRID: Outdoor */}
        <section className="mx-auto max-w-[1400px] px-4 pt-8 sm:px-6 border-t border-slate-200">
          
          <div className="grid grid-cols-3 gap-4 mb-12 pt-8">
            {mainGridSubcats.map((cat) => (
              <div key={cat.title} className="group cursor-pointer">
                <div className="relative aspect-[4/3] w-full overflow-hidden mb-2 bg-[#f4f4f4]">
                  <Image src={cat.image} alt={cat.title} fill className="object-cover mix-blend-multiply transition duration-300 group-hover:scale-105" />
                </div>
                <h3 className="font-bold text-[14px] text-slate-900 group-hover:underline">{cat.title}</h3>
              </div>
            ))}
          </div>

          <div className="flex items-end gap-2 pb-6">
            <h2 className="text-2xl font-bold text-slate-950 sm:text-[28px]">Outdoor</h2>
            <span className="pb-1 text-[13px] text-slate-600">2,766 Items</span>
          </div>

          <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-4 sm:flex-row sm:items-center">
            <button className="flex w-fit items-center justify-center border border-slate-300 bg-white px-10 py-2.5 text-[13px] font-medium text-slate-900 hover:border-slate-400">
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"/></svg>
              Show Filters
            </button>
            <div className="flex items-center text-[13px]">
              <span className="mr-3 text-slate-600">Sort By</span>
              <div className="relative w-[200px]">
                <select className="appearance-none w-full border border-slate-300 bg-white py-2.5 pl-3 pr-8 text-[13px] text-slate-900 outline-none hover:border-slate-400 focus:border-slate-900">
                  <option>Recommended</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Customer Ratings</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              </div>
            </div>
          </div>
        </section>

        {/* 3-COLUMN PRODUCT GRID */}
        <section className="mx-auto max-w-[1400px] px-4 pb-16 pt-8 sm:px-6">
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:gap-x-6 lg:gap-y-12">
            {mainGridProducts.map((p) => (
              <div key={p.id} className="group relative flex flex-col">
                <div className="relative aspect-square w-full overflow-hidden bg-[#f4f4f4]">
                  <Image src={p.image} alt={p.name} fill className="object-cover mix-blend-multiply" />
                  <button className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-slate-600 shadow-sm backdrop-blur-sm hover:text-slate-950 hover:bg-white">
                    <Heart className="h-4 w-4" />
                  </button>
                  {p.badge && (
                    <div className="absolute bottom-0 left-0 bg-[#a63f15] px-2 py-0.5 text-[11px] font-bold text-white z-10">
                      {p.badge}
                    </div>
                  )}
                </div>

                <div className="mt-3 flex flex-1 flex-col">
                  {/* Colors */}
                  <div className="mb-1.5 flex items-center gap-1">
                    {p.colors && p.colors.map((color, idx) => (
                      <div key={idx} className="h-[15px] w-[15px] rounded-full border border-slate-300" style={{ backgroundColor: color }}></div>
                    ))}
                    {p.colors && <span className="text-[11px] text-slate-500">+{p.colors.length}</span>}
                    {p.colorCount && <span className="text-[11px] text-slate-500">{p.colorCount} Colors</span>}
                  </div>

                  <h3 className="mt-0.5 text-[13px] leading-tight text-slate-900 group-hover:underline whitespace-pre-line">
                    {p.name}
                  </h3>
                  {p.subtitle && <div className="text-[12px] text-slate-500 mt-0.5">{p.subtitle}</div>}
                  <div className="mt-1 flex items-center gap-1">
                    <StarRating rating={p.rating} />
                    <span className="text-[11px] text-slate-500">({p.reviews})</span>
                  </div>
                  <div className="mt-1 flex flex-wrap items-baseline gap-2">
                    <span className="text-[15px] font-bold text-[#a63f15]">${p.price}</span>
                    {p.originalPrice && (
                      <span className="text-[12px] text-slate-500 line-through">${p.originalPrice}</span>
                    )}
                  </div>
                  {p.extraText && (
                    <div className="mt-1 text-[11px] text-slate-600 whitespace-pre-line leading-tight">
                      {p.extraText}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-16 flex items-center justify-center gap-3">
            <button className="flex h-10 w-10 items-center justify-center border border-slate-300 bg-white text-slate-400 hover:bg-slate-50" aria-label="Previous page">
              <svg className="h-4 w-4 rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
            <div className="flex items-center gap-4 text-[13px] text-slate-700">
              <span className="font-bold underline underline-offset-4">1</span>
              <button className="hover:underline">2</button>
              <button className="hover:underline">3</button>
              <button className="hover:underline">4</button>
              <span>...</span>
              <button className="hover:underline">58</button>
            </div>
            <button className="flex h-10 w-10 items-center justify-center border border-slate-900 bg-white text-slate-900 hover:bg-slate-50" aria-label="Next page">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>
        </section>

        {/* SEO Text */}
        <section className="mx-auto max-w-[1400px] px-4 pb-20 pt-8 sm:px-6">
          <h2 className="mb-4 text-[19px] font-bold text-slate-950">Modern Patio Furniture + Decor</h2>
          <div className="space-y-4 text-[13px] leading-relaxed text-slate-700">
            <p>
              Modern outdoor furniture gives you the ability to truly enjoy the spring, summer, and fall. You can celebrate the warm months out on your patio with friends, family, and guests if you have the right patio furniture. Modern outdoor patio furniture combines your love for the great outdoors, entertaining, and modern design in one simple and sophisticated package. Modern outdoor furniture, like tables, chairs, chaise lounges, and sofas are a great way to relax in style and comfort. If you have a pool, then you can place outdoor lounge chairs around the perimeter so that you can cool off whenever you get too warm while sunbathing. The best modern outdoor furniture combines high-quality materials and simple, sophisticated design to create a modern patio where you&apos;ll be proud to entertain your guests.
            </p>
          </div>
        </section>

      </main>
      <Footer />
      <HelpChat />
    </>
  );
}
