import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Heart, ArrowRight } from "lucide-react";
import Header from "@/components/layout/Header";
import FilterableProductLayout from "@/components/ui/FilterableProductLayout";
import Footer from "@/components/layout/Footer";
import HelpChat from "@/components/layout/HelpChat";

const topCategories = [
  { title: "Wall Art", image: "/images/cat_living_room.png" },
  { title: "Wall Decor", image: "/images/cat_dining.png" },
  { title: "Mirrors", image: "/images/cat_bedroom.png" },
  { title: "Wallpaper", image: "/images/hero.png" },
  { title: "Curtains + Drapes", image: "/images/cat_outdoor.png" },
];

const wallArtSubcats = [
  { title: "Shop Abstract Art", image: "/images/cat_living_room.png" },
  { title: "Shop Paintings", image: "/images/cat_bedroom.png" },
  { title: "Shop Photography", image: "/images/cat_dining.png" },
];

const wallArtProducts = [
  { id: "wa1", name: "Mid Century Modern Boho Bauhaus Solar Sun Abstract Art Decor Framed On Canvas 2 Pieces Print", price: 99, originalPrice: null, badge: "Sale", image: "/images/cat_living_room.png" },
  { id: "wa2", name: "Hemkund Abstract Painting", price: 339, originalPrice: 419, badge: "Limited Time Only", image: "/images/cat_bedroom.png" },
  { id: "wa3", name: "Le Chien (The Dog) by Pablo Picasso", price: 129, originalPrice: 149, badge: "Limited Time Only", image: "/images/cat_dining.png" },
  { id: "wa4", name: "Tribal Code by Filippo Ioco", price: 649, originalPrice: 699, badge: null, image: "/images/cat_outdoor.png" },
  { id: "wa5", name: "Pink Record by Caroline Mint", price: 125, originalPrice: 159, badge: "Limited Time Only", image: "/images/hero.png" },
  { id: "wa6", name: "Midcentury Modern Object No 3 by Miuus", price: 319, originalPrice: 399, badge: "Limited Time Only", image: "/images/cat_living_room.png" },
  { id: "wa7", name: "Lost In The Woods by Studiom", price: 331, originalPrice: 365, badge: "Limited Time Only", image: "/images/cat_bedroom.png" },
  { id: "wa8", name: "Fiber by Eleni Psyllaki For Paradissi Digital Art", price: 549, originalPrice: 606, badge: null, image: "/images/cat_dining.png" },
];

const wallDecorSubcats = [
  { title: "Shop Wall Shelves", image: "/images/cat_outdoor.png" },
  { title: "Shop Wall Accents", image: "/images/cat_living_room.png" },
  { title: "Shop Mirrors", image: "/images/cat_bedroom.png" },
];

const wallDecorProducts = [
  { id: "wd1", name: "Baez Poplar Solid Wood Wall Shelf", price: 99, originalPrice: 105, badge: "Sale", image: "/images/cat_living_room.png" },
  { id: "wd2", name: "Valetta Set Of 4 Wall Mounted Shelves (Set of 4)", price: 145, originalPrice: 165, subtitle: "$36.25 per item", badge: "Limited Time Only", image: "/images/cat_bedroom.png" },
  { id: "wd3", name: "Marv Set Of 2 Wall Mounted Shelves", price: 129, originalPrice: 149, badge: "Limited Time Only", image: "/images/cat_dining.png" },
  { id: "wd4", name: "Sabine Metal Rounded Rectangle Wall Mirror", price: 127, originalPrice: null, badge: null, image: "/images/cat_outdoor.png" },
  { id: "wd5", name: "McGrath Hanging Planter", price: 65, originalPrice: 75, badge: "Sale", image: "/images/hero.png" },
  { id: "wd6", name: "Oiva Set Of 2 Wall Mounted Shelves", price: 115, originalPrice: 129, badge: "Sale", image: "/images/cat_living_room.png" },
  { id: "wd7", name: "Langley 9\" Tall Solid Wood Floating Shelf", price: 209, originalPrice: null, badge: null, image: "/images/cat_bedroom.png" },
  { id: "wd8", name: "Sabine Metal Round Wall Mirror", price: 140, originalPrice: null, badge: null, image: "/images/cat_dining.png" },
];

const mainGridProducts = [
  { id: "mg1", name: "Grist 7.87 in. x 7.87 in. Matte Porcelain Floor and Wall Tile (12.48 Sq. Ft. / Case)", subtitle: "Light Gray", priceStr: "$7.69 /sq. ft.", origPriceStr: "$9.70 /sq. ft.", extraText: "$96 per box", reviews: 106, rating: 4.5, badge: null, image: "/images/cat_living_room.png" },
  { id: "mg2", name: "Bellamy 3 Piece Metal Tiered Shelf", subtitle: "Gold", price: 175, originalPrice: 189, extraText: "Free 3-Day Delivery", reviews: 84, rating: 4.5, badge: null, image: "/images/cat_bedroom.png" },
  { id: "mg3", name: "Nomalanga Peel & Stick Wallpaper Roll", subtitle: "Olive/Linen, Non-pasted", priceStr: "$4.70 /sq. ft.", extraText: "$98 per roll", reviews: 66, rating: 4.5, badge: null, image: "/images/cat_dining.png" },
  { id: "mg4", name: "Modern Acrylic Shadowbox with Linen Canvas 3\" Depth | UV Grade", subtitle: "16\" x 20\"", price: 180, extraText: "Free Fast Delivery", reviews: 119, rating: 5, badge: null, image: "/images/cat_outdoor.png" },
  { id: "mg5", name: "Camden 12 in. x 12 in. Gauged Slate Floor and Wall Tile", subtitle: "Charcoal", priceStr: "$4.50 /sq. ft.", extraText: "$45 per box\nFast Delivery", reviews: 347, rating: 4.5, badge: null, image: "/images/hero.png" },
  { id: "mg6", name: "Auburn Chevron 24 in. x 48 in. Matte Porcelain Floor and Wall Tile (15.49 Sq. Ft. / Case)", subtitle: "Brown", priceStr: "$11.68 /sq. ft.", extraText: "$181 per box", reviews: 93, rating: 4.5, badge: null, image: "/images/cat_living_room.png" },
  { id: "mg7", name: "Balone French Pleat Signature Velvet Curtains for Bedroom Blackout Curtains for Living Room Single Panel", subtitle: "Neutral Ground, 25\" W x 96\" L", price: 58, extraText: "Free Fast Delivery", reviews: 561, rating: 4.5, badge: null, image: "/images/cat_bedroom.png" },
  { id: "mg8", name: "Orwell Square Plastic Wall Clock 9.25 Inches", subtitle: "Orange", price: 24, originalPrice: 27, extraText: "Fast Delivery", reviews: 1022, rating: 4.5, badge: "Limited Time Only", image: "/images/cat_dining.png" },
  { id: "mg9", name: "Airy 2.83 in. x 7.67 in. Fishscale Matte Ceramic Wall Tile (5.15 Sq. Ft. / Case)", subtitle: "Terracotta", priceStr: "$14.17 /sq. ft.", origPriceStr: "$17.48 /sq. ft.", extraText: "$73 per box", reviews: 46, rating: 4.5, badge: "Sale", image: "/images/cat_outdoor.png" },
];

const relatedSearches = [
  "Canvas Wall Art", "Wall Art", "Do You Have A Showroom", "Minimalist Wall Art", "Abstract Art", 
  "Paper Wall Art", "Tapestry", "3 Piece Wall Art", "Framed Wall Art", "Paintings", 
  "40 X 60 Art", "Large Wall Art", "Wall Art Sets", "Photography", "Oversized Wall Art", 
  "Dining Room Wall Art", "Bathroom Art Work For Wall", "Abstract Wall Art", "Wallpaper", "2 Piece Wall Art"
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

export default function WallDecorPage() {
  return (
    <>

      <main className="bg-white">


        {/* Hero Section */}
        <section className="relative h-[200px] w-full sm:h-[300px] md:h-[400px]">
          <Image src="/images/hero.png" alt="Wall Decor + Mirrors" fill className="object-cover object-center" priority />
          <div className="absolute inset-0 bg-black/15" />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-4xl font-bold text-white drop-shadow-md sm:text-5xl md:text-[70px]">
              Wall Decor + Mirrors
            </h1>
          </div>
        </section>

        {/* Top Category Tiles */}
        <section className="mx-auto max-w-[1400px] px-4 pt-10 sm:px-6">
          <div className="flex justify-between gap-4 overflow-x-auto pb-4">
            {topCategories.map((cat) => (
              <Link key={cat.title} href="#" className="group flex min-w-[140px] flex-1 flex-col items-center">
                <div className="relative aspect-square w-full overflow-hidden bg-slate-100">
                  <Image src={cat.image} alt={cat.title} fill className="object-cover transition duration-300 group-hover:scale-105" />
                </div>
                <p className="mt-3 text-center text-[13px] font-medium text-slate-900 group-hover:underline">
                  {cat.title}
                </p>
              </Link>
            ))}
            <button className="flex h-10 w-10 shrink-0 self-center items-center justify-center border border-slate-300 bg-white hover:bg-slate-50">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>
        </section>

        {/* WALL ART DEPARTMENT SECTION */}
        <section className="mx-auto max-w-[1400px] px-4 pt-16 sm:px-6">
          <h2 className="text-[28px] font-bold text-slate-950 mb-6">Wall Art</h2>
          <div className="relative h-[250px] sm:h-[350px] md:h-[450px] w-full overflow-hidden mb-6 group cursor-pointer">
            <Image src="/images/cat_living_room.png" alt="Wall Art Banner" fill className="object-cover transition duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 flex items-center justify-end p-12">
               <span className="text-white text-3xl font-bold underline underline-offset-8 drop-shadow-md decoration-white">SHOP WALL ART</span>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-8">
            {wallArtSubcats.map((cat) => (
              <div key={cat.title} className="group cursor-pointer">
                <div className="relative aspect-[4/3] w-full overflow-hidden mb-2">
                  <Image src={cat.image} alt={cat.title} fill className="object-cover transition duration-300 group-hover:scale-105" />
                </div>
                <h3 className="font-bold text-[15px] text-slate-900 group-hover:underline">{cat.title}</h3>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 lg:gap-x-6 lg:gap-y-12 pb-6">
            {wallArtProducts.map((p) => (
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
             <Link href="#" className="text-[13px] sm:text-[15px] md:text-[17px] font-bold text-slate-900 underline underline-offset-4 hover:text-slate-600 text-right">
               SHOP ALL WALL ART
             </Link>
          </div>
        </section>

        {/* WALL DECOR DEPARTMENT SECTION */}
        <section className="mx-auto max-w-[1400px] px-4 pt-16 sm:px-6">
          <h2 className="text-[28px] font-bold text-slate-950 mb-6">Wall Decor</h2>
          <div className="relative h-[250px] sm:h-[350px] md:h-[450px] w-full overflow-hidden mb-6 group cursor-pointer">
            <Image src="/images/cat_bedroom.png" alt="Wall Decor Banner" fill className="object-cover transition duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 flex items-end justify-end p-12">
               <span className="text-white text-3xl font-bold underline underline-offset-8 drop-shadow-md decoration-white">SHOP WALL DECOR</span>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-8">
            {wallDecorSubcats.map((cat) => (
              <div key={cat.title} className="group cursor-pointer">
                <div className="relative aspect-[4/3] w-full overflow-hidden mb-2">
                  <Image src={cat.image} alt={cat.title} fill className="object-cover transition duration-300 group-hover:scale-105" />
                </div>
                <h3 className="font-bold text-[15px] text-slate-900 group-hover:underline">{cat.title}</h3>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 lg:gap-x-6 lg:gap-y-12 pb-6">
            {wallDecorProducts.map((p) => (
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
                   {p.subtitle && <span className="text-[12px] text-slate-500 ml-1">{p.subtitle}</span>}
                 </div>
               </div>
            ))}
          </div>
          
          <div className="flex justify-end pt-4 pb-16">
             <Link href="#" className="text-[13px] sm:text-[15px] md:text-[17px] font-bold text-slate-900 underline underline-offset-4 hover:text-slate-600 text-right">
               SHOP ALL WALL DECOR
             </Link>
          </div>
        </section>

        {/* MAIN CATEGORY SECTION: WALL DECOR + MIRRORS */}
        <FilterableProductLayout title="Wall Decor + Mirrors" itemCount={1774}>

          <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:gap-x-6 lg:gap-y-12">
            {mainGridProducts.map((p) => (
              <div key={p.id} className="group relative flex flex-col">
                <div className="relative aspect-square w-full overflow-hidden bg-[#f4f4f4]">
                  <Image src={p.image || "/images/hero.png"} alt={p.name} fill className="object-cover mix-blend-multiply" />
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

                  <h3 className="mt-0.5 text-[13px] leading-tight text-slate-900 group-hover:underline whitespace-pre-line">
                    {p.name}
                  </h3>
                  {p.subtitle && <div className="text-[12px] text-slate-500 mt-0.5">{p.subtitle}</div>}
                  {p.rating && (
                    <div className="mt-1 flex items-center gap-1">
                      <StarRating rating={p.rating} />
                      <span className="text-[11px] text-slate-500">({p.reviews || 0})</span>
                    </div>
                  )}
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
              <button className="hover:underline">10</button>
            </div>
            <button className="flex h-10 w-10 items-center justify-center border border-slate-900 bg-white text-slate-900 hover:bg-slate-50" aria-label="Next page">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>

        </FilterableProductLayout>

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
      </main>
      <Footer />
      <HelpChat />
    </>
  );
}
