import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Heart, ArrowRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HelpChat from "@/components/layout/HelpChat";

const topCategories = [
  { title: "Home Decor", image: "/images/cat_living_room.png" },
  { title: "Pillows + Throws", image: "/images/cat_bedroom.png" },
  { title: "Organizational Decor", image: "/images/cat_dining.png" },
  { title: "Botanicals", image: "/images/cat_outdoor.png" },
  { title: "Candlelight + Fragrances", image: "/images/hero.png" },
];

const homeDecorSubcats = [
  { title: "Shop Vases", image: "/images/cat_living_room.png" },
  { title: "Shop Planters", image: "/images/cat_outdoor.png" },
  { title: "Shop Decorative Objects", image: "/images/cat_bedroom.png" },
];

const homeDecorProducts = [
  { id: "hd1", name: "Block Series Span Planter", price: 192, originalPrice: null, badge: null, image: "/images/cat_living_room.png" },
  { id: "hd2", name: "Corten Steel Series Long Box Planter", price: 283, originalPrice: 340, badge: "Sale", image: "/images/cat_bedroom.png" },
  { id: "hd3", name: "Corten Steel Series Span Planter", price: 428, originalPrice: 543, badge: "Sale", image: "/images/cat_dining.png" },
  { id: "hd4", name: "Tormund Metal Planter Box", price: 269, originalPrice: 289, badge: null, image: "/images/cat_outdoor.png" },
  { id: "hd5", name: "Block Series Cube Planter", price: 155, originalPrice: null, badge: null, image: "/images/hero.png" },
  { id: "hd6", name: "Block Series Window Box Planter", price: 85, originalPrice: null, badge: null, image: "/images/cat_living_room.png" },
  { id: "hd7", name: "Milano Large Planter Pot", price: 189, originalPrice: 209, badge: null, image: "/images/cat_bedroom.png" },
  { id: "hd8", name: "Pure Series Midland Planter", price: 135, originalPrice: null, badge: null, image: "/images/cat_dining.png" },
];

const orgDecorSubcats = [
  { title: "Shop Decorative Storage", image: "/images/cat_living_room.png" },
  { title: "Shop Wall Shelves", image: "/images/cat_bedroom.png" },
  { title: "Shop Bookcases", image: "/images/cat_dining.png" },
];

const orgDecorProducts = [
  { id: "od1", name: "Iris Solid Wood Wall Mounted Floating Display Shelf", price: 75, originalPrice: 99, badge: "Limited Time Only", image: "/images/cat_living_room.png" },
  { id: "od2", name: "Glennon 3 Piece Solid Wood Wall Mounted Display Floating Shelves", price: 119, originalPrice: 145, badge: null, image: "/images/cat_bedroom.png" },
  { id: "od3", name: "Dandre Modern Brass Wooden Shelf", price: 119, originalPrice: 125, badge: null, image: "/images/cat_dining.png" },
  { id: "od4", name: "Sufjan Solid Wood Tiered Shelf", price: 219, originalPrice: 249, badge: "Limited Time Only", image: "/images/cat_outdoor.png" },
];

const pillowsSubcats = [
  { title: "Shop Pillows", image: "/images/cat_living_room.png" },
  { title: "Shop Throws", image: "/images/cat_bedroom.png" },
  { title: "Shop Poufs", image: "/images/cat_dining.png" },
];

const pillowsProducts = [
  { id: "p1", name: "Roshina Pillow Insert", price: 20, originalPrice: 23, badge: "Limited Time Only", image: "/images/cat_living_room.png" },
  { id: "p2", name: "Joshelin Embroidered Cotton Throw Pillow", price: 52, originalPrice: 59, badge: "Limited Time Only", image: "/images/cat_bedroom.png" },
  { id: "p3", name: "Selma Cotton Throw Pillow", price: 45, originalPrice: null, badge: null, image: "/images/cat_dining.png" },
  { id: "p4", name: "Fulbourn Embroidered Cotton Throw Pillow", price: 105, originalPrice: 125, badge: "Limited Time Only", image: "/images/cat_outdoor.png" },
  { id: "p5", name: "Zetta Polka Dots Cotton Throw Pillow", price: 35, originalPrice: 39, badge: null, image: "/images/hero.png" },
  { id: "p6", name: "Roya Cotton Throw Pillow", price: 57, originalPrice: 65, badge: "Sale", image: "/images/cat_living_room.png" },
  { id: "p7", name: "Plaid Indoor/Outdoor Lumbar Throw Pillow", price: 49, originalPrice: 52, badge: null, image: "/images/cat_bedroom.png" },
  { id: "p8", name: "Steves Down Pillow Insert", price: 35, originalPrice: 40, badge: "Limited Time Only", image: "/images/cat_dining.png" },
];

const finalSubcats = [
  { title: "Shop Pet Accessories", image: "/images/cat_living_room.png" },
  { title: "Shop Botanicals", image: "/images/cat_bedroom.png" },
  { title: "Shop Candles + Fragrances", image: "/images/cat_dining.png" },
];

const mainGridProducts = [
  { id: "mg1", name: "Faux Olive Tree in Pot", subtitle: "4 Sizes", price: 120, originalPrice: null, extraText: "", reviews: 0, rating: 0, badge: "Sale", image: "/images/cat_living_room.png", colors: 0 },
  { id: "mg2", name: "Block Series Span Planter", subtitle: "3 Colors, 2 Sizes", price: 192, originalPrice: null, extraText: "", reviews: 0, rating: 0, badge: null, image: "/images/cat_outdoor.png", colors: 3 },
  { id: "mg3", name: "Velvet Square Pillow", subtitle: "16 Colors", price: 35, originalPrice: null, extraText: "", reviews: 0, rating: 0, badge: "Sale", image: "/images/cat_bedroom.png", colors: 16 },
  
  { id: "mg4", name: "Block Series Long Box Planter", subtitle: "Black, 16\" H x 38\" W x 15\" D", price: 150, originalPrice: null, extraText: "Free Fast Delivery", reviews: 2444, rating: 4.5, badge: null, image: "/images/cat_dining.png", colors: 3, sizes: 3 },
  { id: "mg5", name: "Corten Steel Series Long Box Planter", subtitle: "16.25\" H x 60\" W x 15\" D", price: 283, originalPrice: 340, extraText: "Free Fast Delivery", reviews: 2277, rating: 4.5, badge: "Sale", image: "/images/hero.png", sizes: 5 },
  { id: "mg6", name: "Waffle Weave 100% Cotton Blanket", subtitle: "White, Queen", price: 44, originalPrice: 56, extraText: "", reviews: 583, rating: 4.5, badge: null, image: "/images/cat_living_room.png", colors: 8 },
  
  { id: "mg7", name: "Valetta Set Of 4 Wall Mounted Shelves (Set of 4)", subtitle: "Walnut", price: 145, originalPrice: 165, extraText: "$36.25 per item\nFree 3-Day Delivery", reviews: 101, rating: 5, badge: "Limited Time Only", image: "/images/cat_bedroom.png", colors: 4 },
  { id: "mg8", name: "Waverly Wool Throw Pillow", subtitle: "Green, 20\" x 20\", Down", price: 51, originalPrice: null, extraText: "Free 3-Day Delivery", reviews: 86, rating: 4.5, badge: null, image: "/images/cat_dining.png", colors: 5 },
  { id: "mg9", name: "38\" Faux Snake Plant (Sansevieria) Succulent in Planter", subtitle: "Green", price: 119, originalPrice: null, extraText: "Free Fast Delivery", reviews: 299, rating: 4.5, badge: null, image: "/images/cat_outdoor.png", colors: 2 },
];

const relatedSearches = [
  "Modern Table Clocks", "Entryway Key Bowl", "Table Vases", "Tall Floor Sculpture", "Jewelry Organizers", 
  "Decorative Bowl Fillers", "Scents & Diffusers", "White Candle Holders", "Decorative Trays", "Black Decorative Bowl", 
  "Candle Holders", "Black Decorative Trays", "Picture Frames", "Vases", "Candles", 
  "Black Vases", "Extra Large (Over 17\" W) Decorative Trays", "Modern Mantel Clocks", "Decorative Boxes", "Bookends"
];

function StarRating({ rating }: { rating: number }) {
  if (!rating) return null;
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

export default function DecorPillowsPage() {
  return (
    <>
      <Header />
      <main className="bg-white">


        {/* Hero Section */}
        <section className="relative h-[250px] w-full sm:h-[350px] md:h-[450px]">
          <Image src="/images/hero.png" alt="Decor + Pillows" fill className="object-cover object-center" priority />
          <div className="absolute inset-0 bg-black/15" />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-4xl font-bold text-white drop-shadow-md sm:text-5xl md:text-[70px]">
              Decor + Pillows
            </h1>
          </div>
        </section>

        {/* Top Category Tiles */}
        <section className="mx-auto max-w-[1400px] px-4 pt-10 sm:px-6">
          <div className="flex justify-between gap-4 overflow-x-auto pb-4">
            {topCategories.map((cat) => (
              <Link key={cat.title} href="#" className="group flex min-w-[140px] flex-1 flex-col items-center">
                <div className="relative aspect-[2/1] w-full overflow-hidden bg-slate-100 border border-slate-200">
                  <Image src={cat.image} alt={cat.title} fill className="object-cover transition duration-300 group-hover:scale-105" />
                </div>
                <p className="mt-3 text-center text-[13px] font-medium text-slate-900 group-hover:underline">
                  {cat.title}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* HOME DECOR DEPARTMENT SECTION */}
        <section className="mx-auto max-w-[1400px] px-4 pt-16 sm:px-6">
          <h2 className="text-[28px] font-bold text-slate-950 mb-6">Home Decor</h2>
          <div className="relative h-[250px] sm:h-[350px] md:h-[450px] w-full overflow-hidden mb-6 group cursor-pointer">
            <Image src="/images/cat_living_room.png" alt="Home Decor Banner" fill className="object-cover transition duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 flex items-end justify-end p-8 md:p-12">
               <span className="text-white text-2xl md:text-3xl font-bold underline underline-offset-8 drop-shadow-md decoration-white uppercase tracking-wide">SHOP HOME DECOR</span>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-8">
            {homeDecorSubcats.map((cat) => (
              <div key={cat.title} className="group cursor-pointer">
                <div className="relative aspect-[4/3] w-full overflow-hidden mb-2">
                  <Image src={cat.image} alt={cat.title} fill className="object-cover transition duration-300 group-hover:scale-105" />
                </div>
                <h3 className="font-bold text-[15px] text-slate-900 group-hover:underline">{cat.title}</h3>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 lg:gap-x-6 lg:gap-y-12 pb-6">
            {homeDecorProducts.map((p) => (
               <div key={p.id} className="group relative flex flex-col">
                 <div className="relative aspect-square w-full bg-[#f4f4f4] mb-3 overflow-hidden">
                    <Image src={p.image} alt={p.name} fill className="object-cover mix-blend-multiply" />
                    {p.badge && (
                      <div className="absolute bottom-0 left-0 bg-[#a63f15] px-2 py-0.5 text-[11px] font-bold text-white">
                        {p.badge}
                      </div>
                    )}
                 </div>
                 <h4 className="text-[13px] leading-tight text-slate-900 group-hover:underline">{p.name}</h4>
                 <div className="mt-1 flex items-center gap-2">
                   <span className="text-[13px] text-slate-900 font-bold">${p.price}</span>
                   {p.originalPrice && <span className="text-[12px] text-slate-500 line-through">${p.originalPrice}</span>}
                 </div>
               </div>
            ))}
          </div>
          
          <div className="flex justify-end pt-4 pb-16 border-b border-slate-200">
             <Link href="#" className="text-[15px] font-bold tracking-wide text-slate-900 underline underline-offset-4 hover:text-slate-600 uppercase">
               SHOP ALL HOME DECOR
             </Link>
          </div>
        </section>

        {/* ORGANIZATIONAL DECOR DEPARTMENT SECTION */}
        <section className="mx-auto max-w-[1400px] px-4 pt-16 sm:px-6">
          <h2 className="text-[28px] font-bold text-slate-950 mb-6">Organizational Decor</h2>
          <div className="relative h-[250px] sm:h-[350px] md:h-[450px] w-full overflow-hidden mb-6 group cursor-pointer">
            <Image src="/images/cat_bedroom.png" alt="Organizational Decor Banner" fill className="object-cover transition duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 flex items-start justify-end p-8 md:p-12">
               <span className="text-white text-2xl md:text-3xl font-bold underline underline-offset-8 drop-shadow-md decoration-white uppercase tracking-wide">SHOP ORGANIZATIONAL DECOR</span>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-8">
            {orgDecorSubcats.map((cat) => (
              <div key={cat.title} className="group cursor-pointer">
                <div className="relative aspect-[4/3] w-full overflow-hidden mb-2">
                  <Image src={cat.image} alt={cat.title} fill className="object-cover transition duration-300 group-hover:scale-105" />
                </div>
                <h3 className="font-bold text-[15px] text-slate-900 group-hover:underline">{cat.title}</h3>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 lg:gap-x-6 lg:gap-y-12 pb-6">
            {orgDecorProducts.map((p) => (
               <div key={p.id} className="group relative flex flex-col">
                 <div className="relative aspect-square w-full bg-[#f4f4f4] mb-3 overflow-hidden">
                    <Image src={p.image} alt={p.name} fill className="object-cover mix-blend-multiply" />
                    {p.badge && (
                      <div className="absolute bottom-0 left-0 bg-[#a63f15] px-2 py-0.5 text-[11px] font-bold text-white">
                        {p.badge}
                      </div>
                    )}
                 </div>
                 <h4 className="text-[13px] leading-tight text-slate-900 group-hover:underline">{p.name}</h4>
                 <div className="mt-1 flex items-center gap-2">
                   <span className="text-[13px] text-slate-900 font-bold">${p.price}</span>
                   {p.originalPrice && <span className="text-[12px] text-slate-500 line-through">${p.originalPrice}</span>}
                 </div>
               </div>
            ))}
          </div>
          
          <div className="flex justify-end pt-4 pb-16 border-b border-slate-200">
             <Link href="#" className="text-[15px] font-bold tracking-wide text-slate-900 underline underline-offset-4 hover:text-slate-600 uppercase">
               SHOP ALL ORGANIZATIONAL DECOR
             </Link>
          </div>
        </section>

        {/* PILLOWS + THROWS DEPARTMENT SECTION */}
        <section className="mx-auto max-w-[1400px] px-4 pt-16 sm:px-6">
          <h2 className="text-[28px] font-bold text-slate-950 mb-6">Pillows + Throws</h2>
          <div className="relative h-[250px] sm:h-[350px] md:h-[450px] w-full overflow-hidden mb-6 group cursor-pointer">
            <Image src="/images/cat_dining.png" alt="Pillows + Throws Banner" fill className="object-cover transition duration-500 group-hover:scale-105" />
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-8">
            {pillowsSubcats.map((cat) => (
              <div key={cat.title} className="group cursor-pointer">
                <div className="relative aspect-[4/3] w-full overflow-hidden mb-2">
                  <Image src={cat.image} alt={cat.title} fill className="object-cover transition duration-300 group-hover:scale-105" />
                </div>
                <h3 className="font-bold text-[15px] text-slate-900 group-hover:underline">{cat.title}</h3>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 lg:gap-x-6 lg:gap-y-12 pb-6">
            {pillowsProducts.map((p) => (
               <div key={p.id} className="group relative flex flex-col">
                 <div className="relative aspect-square w-full bg-[#f4f4f4] mb-3 overflow-hidden">
                    <Image src={p.image} alt={p.name} fill className="object-cover mix-blend-multiply" />
                    {p.badge && (
                      <div className="absolute bottom-0 left-0 bg-[#a63f15] px-2 py-0.5 text-[11px] font-bold text-white">
                        {p.badge}
                      </div>
                    )}
                 </div>
                 <h4 className="text-[13px] leading-tight text-slate-900 group-hover:underline">{p.name}</h4>
                 <div className="mt-1 flex items-center gap-2">
                   <span className="text-[13px] text-slate-900 font-bold">${p.price}</span>
                   {p.originalPrice && <span className="text-[12px] text-slate-500 line-through">${p.originalPrice}</span>}
                 </div>
               </div>
            ))}
          </div>
          
          <div className="flex justify-end pt-4 pb-16 border-b border-slate-200">
             <Link href="#" className="text-[15px] font-bold tracking-wide text-slate-900 underline underline-offset-4 hover:text-slate-600 uppercase">
               SHOP ALL PILLOWS + THROWS
             </Link>
          </div>
        </section>

        {/* EXPLORE MORE MODERN DESIGNS */}
        <section className="mx-auto max-w-[1400px] px-4 pt-16 pb-8 sm:px-6">
          <h2 className="text-[22px] font-bold text-slate-950 mb-6">Explore More Modern Designs</h2>
          <div className="grid grid-cols-3 gap-4 mb-8">
             <div className="relative aspect-square w-full overflow-hidden cursor-pointer group">
                <Image src="/images/cat_bedroom.png" alt="Pet bed" fill className="object-cover transition duration-300 group-hover:scale-105" />
             </div>
             <div className="relative aspect-square w-full overflow-hidden cursor-pointer group">
                <Image src="/images/cat_outdoor.png" alt="Botanicals" fill className="object-cover transition duration-300 group-hover:scale-105" />
             </div>
             <div className="relative aspect-square w-full overflow-hidden cursor-pointer group">
                <Image src="/images/hero.png" alt="Candle" fill className="object-cover transition duration-300 group-hover:scale-105" />
             </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-8 mt-12">
            {finalSubcats.map((cat) => (
              <div key={cat.title} className="group cursor-pointer border border-slate-200 bg-white">
                <div className="relative aspect-[2/1] w-full overflow-hidden mb-2 bg-[#f4f4f4]">
                  <Image src={cat.image} alt={cat.title} fill className="object-cover mix-blend-multiply transition duration-300 group-hover:scale-105" />
                </div>
                <h3 className="font-bold text-[14px] text-slate-900 px-3 pb-3 group-hover:underline">{cat.title}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* MAIN CATEGORY SECTION: DECOR + PILLOWS */}
        <section className="mx-auto max-w-[1400px] px-4 pt-4 sm:px-6">
          <div className="flex items-end gap-2 pb-6">
            <h2 className="text-[28px] font-bold text-slate-950 sm:text-[34px]">Decor + Pillows</h2>
            <span className="pb-2 text-[14px] text-slate-600">2,744 Items</span>
          </div>

          <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-4 sm:flex-row sm:items-center">
            <button className="flex w-fit items-center justify-center border border-slate-300 bg-white px-8 py-2 text-[14px] font-medium text-slate-900 hover:border-slate-400 transition">
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"/></svg>
              Show Filters
            </button>
            <div className="flex items-center text-[13px]">
              <span className="mr-2 text-slate-600">Sort By</span>
              <div className="relative">
                <select className="appearance-none border border-slate-300 bg-white py-2 pl-3 pr-8 text-[13px] text-slate-900 outline-none hover:border-slate-400 focus:border-slate-900 cursor-pointer">
                  <option>Recommended</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Customer Ratings</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              </div>
            </div>
          </div>
        </section>

        {/* 3-COLUMN PRODUCT GRID */}
        <section className="mx-auto max-w-[1400px] px-4 pb-16 pt-8 sm:px-6">
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:gap-x-6 lg:gap-y-12">
            {mainGridProducts.map((p) => (
              <div key={p.id} className="group relative flex flex-col">
                <div className="relative aspect-square w-full overflow-hidden bg-[#f4f4f4] border border-transparent group-hover:border-slate-200 transition">
                  <Image src={p.image} alt={p.name} fill className="object-cover mix-blend-multiply p-6" />
                  <button className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-slate-600 shadow-sm backdrop-blur-sm hover:text-red-500 hover:bg-white z-10 transition">
                    <Heart className="h-4 w-4" />
                  </button>
                  {p.badge && (
                    <div className="absolute bottom-3 left-3 bg-[#a63f15] px-1.5 py-0.5 text-[11px] font-bold text-white z-10 tracking-wide">
                      {p.badge}
                    </div>
                  )}
                </div>

                <div className="mt-3 flex flex-1 flex-col px-1">
                  {(p.colors > 0) && (
                    <div className="flex items-center gap-1 mb-2">
                      {Array.from({ length: Math.min(p.colors, 5) }).map((_, i) => (
                          <div key={i} className={`w-5 h-5 rounded-full border border-slate-300 ${['bg-slate-800', 'bg-[#c5a687]', 'bg-white', 'bg-[#466a7b]', 'bg-slate-400'][i % 5]}`} />
                      ))}
                      {p.colors > 5 && <span className="text-[12px] text-slate-500 ml-1">+{p.colors - 5}</span>}
                    </div>
                  )}
                  {p.subtitle && (p.colors === 0) && <div className="text-[11px] text-slate-500 mb-1">{p.subtitle}</div>}
                  {(p.sizes && p.colors > 0) && <div className="text-[11px] text-slate-500 mb-1">{p.colors} Colors, {p.sizes} Sizes</div>}
                  {(!p.sizes && p.colors > 0 && p.subtitle) && <div className="text-[11px] text-slate-500 mb-1">{p.colors} Colors</div>}
                  
                  <h3 className="mt-0.5 text-[13px] leading-snug text-slate-900 group-hover:underline">
                    {p.name}
                  </h3>
                  
                  {p.rating > 0 && (
                    <div className="mt-1 flex items-center gap-1">
                      <StarRating rating={p.rating} />
                      <span className="text-[11px] text-slate-500">({p.reviews})</span>
                    </div>
                  )}
                  
                  <div className="mt-1 flex flex-col gap-0.5 mt-auto">
                    <div className="flex items-baseline gap-2">
                      {p.badge === 'Sale' || p.originalPrice ? (
                        <>
                          <span className="text-[15px] font-bold text-[#a63f15]">${p.price}</span>
                          {p.originalPrice && <span className="text-[12px] text-slate-500 line-through">${p.originalPrice}</span>}
                        </>
                      ) : (
                        <span className="text-[15px] font-bold text-slate-900">${p.price}</span>
                      )}
                    </div>
                    {p.extraText && (
                      <div className="text-[12px] text-slate-600 whitespace-pre-line leading-tight">{p.extraText}</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-16 flex items-center justify-center gap-2">
            <button className="flex h-10 w-10 items-center justify-center border border-slate-300 bg-white text-slate-400 hover:border-slate-400 transition" aria-label="Previous page">
              <svg className="h-4 w-4 rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
            <div className="flex items-center text-[14px] text-slate-700">
              <span className="flex h-10 w-10 items-center justify-center border-b-2 border-slate-900 font-bold text-slate-900">1</span>
              <button className="flex h-10 w-10 items-center justify-center hover:bg-slate-100 rounded transition">2</button>
              <button className="flex h-10 w-10 items-center justify-center hover:bg-slate-100 rounded transition">3</button>
              <button className="flex h-10 w-10 items-center justify-center hover:bg-slate-100 rounded transition">4</button>
              <span className="flex h-10 w-10 items-center justify-center">...</span>
              <button className="flex h-10 w-10 items-center justify-center hover:bg-slate-100 rounded transition">58</button>
            </div>
            <button className="flex h-10 w-10 items-center justify-center border border-slate-400 bg-white text-slate-800 hover:bg-slate-50 transition" aria-label="Next page">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>
        </section>

        {/* SEO Text Block */}
        <section className="mx-auto max-w-[1400px] px-4 pb-8 sm:px-6">
          <h3 className="text-xl font-bold text-slate-950 mb-3">Decor + Pillows</h3>
          <p className="text-[13px] leading-relaxed text-slate-700">
            Nothing dresses up your home quite like decor and pillows. If your space is filled with dark and dull furniture, consider adding some colorful throw pillows to brighten up the look! This is a quick fix that can make a big difference, and really impress your guests. Another simple decoration tip is to add eye-catching geometric prints to add some more life into your room. Bringing new decor and pillows into a room, can transform your space and make it feel like a brand new room. So if you&apos;re looking to make some changes to liven up your home or apartment without breaking the bank, shop our wide variety of decor and pillows to create a space you&apos;ll love.
          </p>
        </section>

        {/* Related Searches */}
        <section className="mx-auto max-w-[1400px] px-4 pb-12 sm:px-6">
          <h3 className="text-lg font-bold text-slate-950 mb-4">Related Searches</h3>
          <div className="flex flex-wrap gap-2.5">
            {relatedSearches.map((term) => (
              <Link key={term} href="#" className="rounded-full border border-slate-400 bg-white px-4 py-1.5 text-[12px] text-slate-700 hover:border-slate-900 hover:text-slate-900 transition">
                {term}
              </Link>
            ))}
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="bg-white py-12 flex flex-col items-center justify-center text-center px-4 border-t border-slate-200">
           <h3 className="text-[18px] font-bold text-slate-900 mb-4">We like your style. Want to stay in touch?</h3>
           <form className="flex w-full max-w-[500px]">
             <input 
               type="email" 
               placeholder="Email Address" 
               className="flex-1 h-12 border border-slate-400 px-4 text-[14px] text-slate-800 focus:outline-none focus:border-slate-800 placeholder-slate-500"
             />
             <button type="submit" className="h-12 bg-[#222222] text-white px-8 text-[14px] font-semibold hover:bg-black transition-colors ml-[-1px]">
               Submit
             </button>
           </form>
           <a href="#" className="text-[12px] text-slate-500 underline mt-4 hover:text-slate-800">Privacy Policy</a>
        </section>
      </main>
      <Footer />
      <HelpChat />
    </>
  );
}
