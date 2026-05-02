import Image from "next/image";



import { ChevronRight } from "lucide-react";

const topSubcategories = [
  { name: "Bathroom Fixtures + Hardware", image: "/images/cat_dining.png" },
  { name: "Bathroom Vanities + Mirrors", image: "/images/cat_outdoor.png" },
  { name: "Bath Linens + Accessories", image: "/images/cat_bedroom.png" }
];

const renovationSubcategories = [
  { name: "Shop Bathroom Vanities", image: "/images/cat_living_room.png" },
  { name: "Shop Vanity Mirrors", image: "/images/hero.png" },
  { name: "Shop Floor + Wall Tile", image: "/images/cat_bedroom.png" }
];

const renovationProducts = [
  { name: "Core Travertine 24\" x 48\" Porcelain Stone Look Wall & Floor Tile", price: 9.10, originalPrice: 141, unit: "/sq. ft.", subtext: "$141 per box", sale: false, image: "/images/cat_outdoor.png", rating: 4, reviews: 144 },
  { name: "Camden 18 in. x 36 in. Gauged Slate Floor and Wall Tile", price: 7.11, unit: "/sq. ft.", subtext: "$32 per box", image: "/images/cat_dining.png", rating: 5, reviews: 89 },
  { name: "Stacy Garcia Victoria 8\" x 8\" Porcelain Encaustic Patterned Look Wall & Floor Tile", price: 9.03, originalPrice: 11.17, unit: "/sq. ft.", subtext: "$101 per box", sale: true, image: "/images/cat_living_room.png", rating: 4, reviews: 52 },
  { name: "Metropolitan 1.97 in. x 9.85 in. Polished Ceramic Subway Wall Tile", price: 11.23, unit: "/sq. ft.", subtext: "$81 per box", image: "/images/cat_bedroom.png", rating: 5, reviews: 34 },
  { name: "Brookline Polished 2\" x 10\" Ceramic Brick Look Subway Wall Tile", price: 7.25, originalPrice: 9.11, unit: "/sq. ft.", subtext: "$39 per box", sale: true, image: "/images/hero.png", rating: 4, reviews: 323 },
  { name: "Lorinda Solid Wood Oval Wall Mirror", price: 149, originalPrice: 159, image: "/images/cat_outdoor.png", rating: 5, reviews: 67 },
  { name: "Pacific 4\" x 12\" Ceramic Subway Wall Tile", price: 5.39, originalPrice: 6.80, unit: "/sq. ft.", subtext: "$58 per box", sale: true, image: "/images/cat_bedroom.png", rating: 4, reviews: 45 },
  { name: "Vivanta 5.27 in. x 17.71 in. Glossy Ceramic Mosaic Elongated Subway Wall Tile", price: 23.63, originalPrice: 27.99, unit: "/sq. ft.", subtext: "$121 per box", image: "/images/cat_dining.png", rating: 4, reviews: 23 },
];

const fixturesSubcategories = [
  { name: "Shop Sinks + Faucets", image: "/images/cat_dining.png" },
  { name: "Shop Tubs + Tub Faucets", image: "/images/cat_outdoor.png" },
  { name: "Shop Vanity Lighting", image: "/images/cat_bedroom.png" }
];

const fixturesProducts = [
  { name: "Byers 1 - Light Dimmable Armed Sconce", price: 79, image: "/images/cat_living_room.png", rating: 4, reviews: 144 },
  { name: "Rooks 2 - Light Dimmable Vanity Light", price: 108, image: "/images/cat_bedroom.png", rating: 5, reviews: 89 },
  { name: "Single Hole Bathroom Faucet with Drain Assembly", price: 98, originalPrice: 105, sale: true, image: "/images/cat_dining.png", rating: 4, reviews: 52 },
  { name: "Rooks Single Light Glass Steel Dimmable Armed Sconce", price: 54, image: "/images/cat_outdoor.png", rating: 5, reviews: 34 },
  { name: "Rooks 3 Light Dimmable Vanity Light", price: 162, image: "/images/hero.png", rating: 4, reviews: 12 },
  { name: "Childerley Single Light Glass Steel Dimmable Armed Sconce", price: 54, image: "/images/cat_living_room.png", rating: 5, reviews: 67 },
  { name: "Childerley 2 Light Vanity", price: 108, image: "/images/cat_bedroom.png", rating: 4, reviews: 45 },
  { name: "Align Wall Mounted Toilet Paper Holder", price: 54, image: "/images/cat_outdoor.png", rating: 4, reviews: 23 },
];

const linensSubcategories = [
  { name: "Shop Bath Towels", image: "/images/cat_bedroom.png" },
  { name: "Shop Bath Mats", image: "/images/cat_living_room.png" },
  { name: "Shop Countertop Accessories", image: "/images/cat_dining.png" }
];

const linensProducts = [
  { name: "Joseph Joseph Tota Laundry Hamper Separation Basket with Lid", price: 115, image: "/images/hero.png", rating: 5, reviews: 120 },
  { name: "Yamazaki Home Tissue Box Cover", price: 47, image: "/images/cat_outdoor.png", rating: 4, reviews: 85 },
  { name: "Brabantia Laundry Hamper with Cork Lid", price: 102, image: "/images/cat_bedroom.png", rating: 5, reviews: 340 },
  { name: "Tanglewood Cotton Non-Slip Bath Rug", price: 65, image: "/images/cat_dining.png", rating: 4, reviews: 210 },
  { name: "Lavanya Solid Cotton Bath Rug", price: 25, sale: true, image: "/images/cat_living_room.png", rating: 5, reviews: 45 },
  { name: "Kohler Sphere Boho Stain/Fade Resistant Non-Slip", price: 34, sale: true, image: "/images/cat_outdoor.png", rating: 4, reviews: 88 },
  { name: "SONO Tumbler Toothbrush Holder", price: 18, sale: true, image: "/images/cat_bedroom.png", rating: 5, reviews: 1237 },
  { name: "SONO Soap Dispenser", price: 29, image: "/images/hero.png", rating: 4, reviews: 4472 },
];

const allProducts = [
  { name: "Brabantia Foldable Laundry Basket 10.6 Gallon (40L)", price: 55, colors: 2, image: "/images/cat_bedroom.png", rating: 4, reviews: 87 },
  { name: "Brabantia Laundry Hamper, 9.2 Gallon (35L)", price: 75, originalPrice: 164, sale: true, image: "/images/cat_dining.png", rating: 4, reviews: 85 },
  { name: "SONO Bathroom Accessory Tray", price: 30, image: "/images/cat_outdoor.png", rating: 5, reviews: 340 },
  { name: "Thora Dots Mid-Century Shower Curtain", price: 75, originalPrice: 79, sale: true, image: "/images/cat_living_room.png", rating: 4, reviews: 210 },
  { name: "Nine Stars 13.2 Gallon Stainless Steel Motion Sensor Trash Can", price: 49, originalPrice: 59, sale: true, colors: 4, image: "/images/hero.png", rating: 5, reviews: 18009 },
  { name: "Nicoli Widespread Bathroom Faucet 3 Hole, 2-handle", price: 190, colors: 6, image: "/images/cat_bedroom.png", rating: 4, reviews: 1869 },
  { name: "Cloe 2.5\" x 8\" Ceramic Tile (Set of 76)", price: 8.83, originalPrice: 12.03, sale: true, colors: 8, image: "/images/cat_dining.png", rating: 5, reviews: 924, unit: "/sq. ft.", subtext: "$94 per box" },
  { name: "Rooks 3 Light Dimmable Vanity Light", price: 162, colors: 2, image: "/images/cat_outdoor.png", rating: 4, reviews: 785 },
  { name: "Auburn Ribbon 24 in. x 48 in. Porcelain Ribbed Wood Look", price: 10.20, originalPrice: 11.01, sale: true, colors: 3, image: "/images/cat_living_room.png", rating: 4, reviews: 546, unit: "/sq. ft.", subtext: "$158 per box" },
  { name: "Childerley 2 Light Vanity", price: 108, colors: 2, image: "/images/hero.png", rating: 5, reviews: 452 },
  { name: "Calheta Cotton Oversized Cabana Stripe Beach Towels", price: 26, originalPrice: 31, sale: true, badge: "Limited Time Only", colors: 6, image: "/images/cat_bedroom.png", rating: 4, reviews: 2374 },
  { name: "Radiant Inflex 4.43\" W x 17.62\" L Crackled Ceramic Subway", price: 12.40, originalPrice: 15.16, sale: true, colors: 4, image: "/images/cat_dining.png", rating: 4, reviews: 15, unit: "/sq. ft.", subtext: "$81 per box" },
];

const relatedSearches = [
  "Bath Mats", "Modern Bathroom Rugs", "Bath Linens + Accessories", "Baby + Kids Bath Sale", 
  "Bathroom Towel Basket", "Solid Bath Mats", "Bathroom Vanities + Mirrors", "Hanging Loop Bath Towels", 
  "Organic Cotton Bath Towels", "Black Bath Towels", "Shower Curtains", "Baby + Kids Bath", 
  "Hand Towels", "Same Size Set Bath Towels Under $25", "White Bath Towels On Sale", "Low Pile Bath Rug", 
  "Geometric Shower Curtains", "Blue Bath Towels", "Scandinavian Shower Curtains", "Bath Towels"
];

export default function BathPage() {
  return (
    <>

      <main className="bg-[#f3f3f3] pb-12">
        {/* Top Banner */}
        <div className="bg-[#e64900] text-center text-white py-2 text-[12px] font-bold tracking-wide flex items-center justify-center gap-1">
          Up to 60% Off | 48-Hour Markdowns <ChevronRight className="w-4 h-4 inline-block" />
        </div>

        <section className="mx-auto max-w-[1400px] px-4 pb-8 pt-4 sm:px-6">
          {/* Hero Section */}
          <div className="relative overflow-hidden bg-slate-200">
            <div className="relative h-[340px] md:h-[480px]">
              <Image src="/images/cat_outdoor.png" alt="Bath" fill className="object-cover" priority />
            </div>
            <div className="absolute inset-0 bg-black/10" />
            <h1 className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center text-5xl font-bold text-white md:text-[80px] drop-shadow-lg tracking-tight">
              Bath
            </h1>
          </div>

          {/* Top Subcategories Row */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4">
            {topSubcategories.map((cat, idx) => (
              <a key={idx} href="#" className="block bg-white text-center group border border-slate-200">
                <div className="relative aspect-[1.8/1] bg-slate-200 overflow-hidden">
                  <Image src={cat.image} alt={cat.name} fill className="object-cover transition duration-300 group-hover:opacity-90" />
                </div>
                <p className="py-3 px-2 text-[13px] text-slate-900 leading-tight">
                  {cat.name}
                </p>
              </a>
            ))}
          </div>

          {/* Bathroom Renovation Section */}
          <div className="mt-14 bg-white pt-6 pb-8 px-4 md:px-6 border border-slate-200">
            <h2 className="text-[32px] md:text-[38px] font-bold tracking-[-0.02em] text-slate-900 mb-6">
              Bathroom Renovation
            </h2>
            <div className="relative h-[300px] md:h-[400px] mb-8 overflow-hidden group cursor-pointer">
              <Image src="/images/cat_living_room.png" alt="Shop Bathroom Renovation" fill className="object-cover transition duration-500 group-hover:scale-105" />
              <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 bg-black/40 px-4 py-2 backdrop-blur-sm md:bg-transparent md:p-0 md:backdrop-blur-none">
                <span className="text-white text-lg md:text-[22px] font-semibold underline decoration-white decoration-2 underline-offset-4 tracking-wide drop-shadow-md uppercase">
                  SHOP BATHROOM RENOVATION
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
              {renovationSubcategories.map((cat) => (
                <a key={cat.name} href="#" className="block group">
                  <div className="relative aspect-[4/3] bg-slate-200 mb-3 border border-transparent group-hover:border-slate-300 transition-colors">
                    <Image src={cat.image} alt={cat.name} fill className="object-cover" />
                  </div>
                  <h3 className="font-semibold text-[15px] text-slate-900 group-hover:underline">{cat.name}</h3>
                </a>
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8">
              {renovationProducts.map((product, idx) => (
                <article key={idx} className="bg-white group cursor-pointer flex flex-col">
                  <div className="relative aspect-square bg-[#f8f8f8] mb-3 border border-transparent group-hover:border-slate-300 transition-colors">
                    <Image src={product.image} alt={product.name} fill className="object-cover mix-blend-multiply p-4" />
                    {product.sale && (
                      <span className="absolute left-3 bottom-3 bg-[#bf5a2e] px-1.5 py-0.5 text-[12px] font-semibold text-white tracking-wide z-10">Sale</span>
                    )}
                  </div>
                  <div className="px-1 flex flex-col flex-1">
                    <h4 className="text-[13px] leading-snug text-slate-800 mb-2 line-clamp-2 group-hover:underline">{product.name}</h4>
                    <div className="flex items-baseline gap-2 mt-auto">
                      {product.sale && product.originalPrice ? (
                        <>
                          <span className="font-bold text-[14px] text-[#bf5a2e]">${product.price} {product.unit}</span>
                          <span className="text-slate-500 line-through text-[12px]">${product.originalPrice} {product.unit}</span>
                        </>
                      ) : (
                        <span className="font-bold text-[14px] text-slate-900">${product.price} {product.unit}</span>
                      )}
                    </div>
                    {product.subtext && <div className="text-[12px] text-slate-500">{product.subtext}</div>}
                  </div>
                </article>
              ))}
            </div>
            
            <div className="mt-12 text-center md:text-right border-t border-slate-200 pt-6">
              <a href="#" className="inline-block text-[15px] font-bold tracking-wide text-slate-900 underline decoration-slate-900 decoration-2 underline-offset-4 hover:text-slate-700 hover:decoration-slate-700 transition-colors uppercase">
                SHOP ALL BATHROOM RENOVATION
              </a>
            </div>
          </div>

          {/* Bathroom Fixtures + Hardware Section */}
          <div className="mt-14 bg-white pt-6 pb-8 px-4 md:px-6 border border-slate-200">
            <h2 className="text-[32px] md:text-[38px] font-bold tracking-[-0.02em] text-slate-900 mb-6">
              Bathroom Fixtures + Hardware
            </h2>
            <div className="relative h-[300px] md:h-[400px] mb-8 overflow-hidden group cursor-pointer">
              <Image src="/images/cat_dining.png" alt="Shop Bathroom Fixtures + Hardware" fill className="object-cover transition duration-500 group-hover:scale-105" />
              <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 bg-black/40 px-4 py-2 backdrop-blur-sm md:bg-transparent md:p-0 md:backdrop-blur-none">
                <span className="text-white text-lg md:text-[22px] font-semibold underline decoration-white decoration-2 underline-offset-4 tracking-wide drop-shadow-md uppercase">
                  SHOP BATHROOM FIXTURES + HARDWARE
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
              {fixturesSubcategories.map((cat) => (
                <a key={cat.name} href="#" className="block group">
                  <div className="relative aspect-[4/3] bg-slate-200 mb-3 border border-transparent group-hover:border-slate-300 transition-colors">
                    <Image src={cat.image} alt={cat.name} fill className="object-cover" />
                  </div>
                  <h3 className="font-semibold text-[15px] text-slate-900 group-hover:underline">{cat.name}</h3>
                </a>
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8">
              {fixturesProducts.map((product, idx) => (
                <article key={idx} className="bg-white group cursor-pointer flex flex-col">
                  <div className="relative aspect-square bg-[#f8f8f8] mb-3 border border-transparent group-hover:border-slate-300 transition-colors">
                    <Image src={product.image} alt={product.name} fill className="object-cover mix-blend-multiply p-4" />
                    {product.sale && (
                      <span className="absolute left-3 bottom-3 bg-[#bf5a2e] px-1.5 py-0.5 text-[12px] font-semibold text-white tracking-wide z-10">Sale</span>
                    )}
                  </div>
                  <div className="px-1 flex flex-col flex-1">
                    <h4 className="text-[13px] leading-snug text-slate-800 mb-2 line-clamp-2 group-hover:underline">{product.name}</h4>
                    <div className="flex items-baseline gap-2 mt-auto">
                      {product.sale && product.originalPrice ? (
                        <>
                          <span className="font-bold text-[14px] text-[#bf5a2e]">${product.price}</span>
                          <span className="text-slate-500 line-through text-[12px]">${product.originalPrice}</span>
                        </>
                      ) : (
                        <span className="font-bold text-[14px] text-slate-900">${product.price}</span>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
            
            <div className="mt-12 text-center md:text-right border-t border-slate-200 pt-6">
              <a href="#" className="inline-block text-[15px] font-bold tracking-wide text-slate-900 underline decoration-slate-900 decoration-2 underline-offset-4 hover:text-slate-700 hover:decoration-slate-700 transition-colors uppercase">
                SHOP ALL BATHROOM FIXTURES + HARDWARE
              </a>
            </div>
          </div>

          {/* Bath Linens + Accessories Section */}
          <div className="mt-14 bg-white pt-6 pb-8 px-4 md:px-6 border border-slate-200">
            <h2 className="text-[32px] md:text-[38px] font-bold tracking-[-0.02em] text-slate-900 mb-6">
              Bath Linens + Accessories
            </h2>
            <div className="relative h-[300px] md:h-[400px] mb-8 overflow-hidden group cursor-pointer">
              <Image src="/images/hero.png" alt="Shop Bath Linens + Accessories" fill className="object-cover transition duration-500 group-hover:scale-105" />
              <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 bg-black/40 px-4 py-2 backdrop-blur-sm md:bg-transparent md:p-0 md:backdrop-blur-none">
                <span className="text-white text-lg md:text-[22px] font-semibold underline decoration-white decoration-2 underline-offset-4 tracking-wide drop-shadow-md uppercase">
                  SHOP BATH LINENS + ACCESSORIES
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
              {linensSubcategories.map((cat) => (
                <a key={cat.name} href="#" className="block group">
                  <div className="relative aspect-[4/3] bg-slate-200 mb-3 border border-transparent group-hover:border-slate-300 transition-colors">
                    <Image src={cat.image} alt={cat.name} fill className="object-cover" />
                  </div>
                  <h3 className="font-semibold text-[15px] text-slate-900 group-hover:underline">{cat.name}</h3>
                </a>
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8">
              {linensProducts.map((product, idx) => (
                <article key={idx} className="bg-white group cursor-pointer flex flex-col">
                  <div className="relative aspect-square bg-[#f8f8f8] mb-3 border border-transparent group-hover:border-slate-300 transition-colors">
                    <Image src={product.image} alt={product.name} fill className="object-cover mix-blend-multiply p-4" />
                    {product.sale && (
                      <span className="absolute left-3 bottom-3 bg-[#bf5a2e] px-1.5 py-0.5 text-[12px] font-semibold text-white tracking-wide z-10">Sale</span>
                    )}
                  </div>
                  <div className="px-1 flex flex-col flex-1">
                    <h4 className="text-[13px] leading-snug text-slate-800 mb-2 line-clamp-2 group-hover:underline">{product.name}</h4>
                    <div className="flex items-baseline gap-2 mt-auto">
                      {product.sale && (product as any).originalPrice ? (
                        <>
                          <span className="font-bold text-[14px] text-[#bf5a2e]">${product.price}</span>
                          <span className="text-slate-500 line-through text-[12px]">${(product as any).originalPrice}</span>
                        </>
                      ) : (
                        <span className="font-bold text-[14px] text-slate-900">${product.price}</span>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
            
            <div className="mt-12 text-center md:text-right border-t border-slate-200 pt-6">
              <a href="#" className="inline-block text-[15px] font-bold tracking-wide text-slate-900 underline decoration-slate-900 decoration-2 underline-offset-4 hover:text-slate-700 hover:decoration-slate-700 transition-colors uppercase">
                SHOP ALL BATH LINENS + ACCESSORIES
              </a>
            </div>
          </div>

          {/* Main Product Grid */}
          <div className="mt-12 bg-white p-4 md:p-6 border border-slate-200">
            <div className="flex flex-col md:flex-row items-baseline justify-between border-b border-slate-300 pb-4 mb-6">
              <div className="flex items-end gap-2">
                <h2 className="text-[28px] md:text-[34px] font-bold tracking-[-0.02em] text-slate-900">Bathroom</h2>
                <span className="pb-1.5 text-[14px] text-slate-500">1,516 Items</span>
              </div>
              <div className="flex items-center gap-4 mt-4 md:mt-0 w-full md:w-auto">
                <button className="flex-1 md:flex-none h-10 border border-slate-400 px-6 text-[14px] text-slate-800 flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2zM2.618 2L5.5 5.5h5L13.382 2H2.618z"/></svg>
                  Show Filters
                </button>
                <div className="flex-1 md:flex-none relative">
                  <select className="w-full h-10 border border-slate-400 bg-white px-3 text-[14px] text-slate-700 appearance-none pr-8 hover:bg-slate-50 transition-colors cursor-pointer">
                    <option>Recommended</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-3">
              {allProducts.map((product, idx) => (
                <article key={idx} className="bg-white group cursor-pointer flex flex-col">
                  <div className="relative aspect-square bg-[#f8f8f8] mb-3 border border-transparent group-hover:border-slate-300 transition-colors">
                    <Image src={product.image} alt={product.name} fill className="object-cover mix-blend-multiply p-6" />
                    <button className="absolute right-3 top-3 h-8 w-8 rounded-full bg-white/80 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-red-500 hover:bg-white shadow-sm transition-colors z-10">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16"><path d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/></svg>
                    </button>
                    {product.sale && (
                      <span className="absolute left-3 bottom-3 bg-[#bf5a2e] px-1.5 py-0.5 text-[12px] font-semibold text-white tracking-wide z-10">Sale</span>
                    )}
                    {product.badge && (
                      <span className="absolute left-3 top-3 bg-[#bf5a2e] px-2 py-0.5 text-[10px] font-bold text-white tracking-wide uppercase shadow-sm z-10">{product.badge}</span>
                    )}
                  </div>
                  <div className="px-1 flex flex-col flex-1">
                    {(product.colors) && (
                      <div className="flex items-center gap-1 mb-2">
                        {Array.from({ length: Math.min(product.colors, 5) }).map((_, i) => (
                           <div key={i} className={`w-5 h-5 rounded-full border border-slate-300 ${['bg-slate-800', 'bg-[#c5a687]', 'bg-white', 'bg-[#466a7b]', 'bg-slate-400'][i % 5]}`} />
                        ))}
                        {product.colors > 5 && <span className="text-[12px] text-slate-500 ml-1">+{product.colors - 5}</span>}
                      </div>
                    )}
                    <h3 className="text-[14px] leading-snug text-slate-800 mb-1 line-clamp-2 group-hover:underline">{product.name}</h3>
                    <div className="flex items-center gap-1 text-[12px] text-slate-600 mb-2">
                      <span className="text-slate-800 tracking-tighter">{"★".repeat(product.rating)}{"☆".repeat(5 - product.rating)}</span>
                      <span>({product.reviews})</span>
                    </div>
                    <div className="flex flex-col gap-1 mb-1 mt-auto">
                      <div className="flex items-baseline gap-2">
                        {product.sale && product.originalPrice ? (
                          <>
                            <span className="font-bold text-[18px] text-[#bf5a2e]">${product.price} {product.unit || ""}</span>
                            <span className="text-slate-500 line-through text-[14px]">${product.originalPrice} {product.unit || ""}</span>
                          </>
                        ) : (
                          <span className="font-bold text-[18px] text-slate-900">${product.price} {product.unit || ""}</span>
                        )}
                      </div>
                      {product.subtext && <div className="text-[12px] text-slate-500">{product.subtext}</div>}
                    </div>
                    <div className="mt-2 text-[12px] text-slate-500">Free Fast Delivery</div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-16 mb-8 flex items-center justify-center gap-2 text-[15px] text-slate-700">
              <button className="h-10 w-10 border border-slate-300 bg-white flex items-center justify-center text-slate-400 hover:border-slate-400 hover:text-slate-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/></svg>
              </button>
              <span className="h-10 w-10 flex items-center justify-center border-b-2 border-slate-900 font-semibold text-slate-900">1</span>
              <button className="h-10 w-10 flex items-center justify-center hover:bg-slate-100 rounded transition-colors">2</button>
              <button className="h-10 w-10 flex items-center justify-center hover:bg-slate-100 rounded transition-colors">3</button>
              <button className="h-10 w-10 flex items-center justify-center hover:bg-slate-100 rounded transition-colors">4</button>
              <span className="h-10 w-10 flex items-center justify-center">...</span>
              <button className="h-10 w-10 flex items-center justify-center hover:bg-slate-100 rounded transition-colors">32</button>
              <button className="h-10 w-10 border border-slate-400 bg-white flex items-center justify-center text-slate-800 hover:bg-slate-50 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/></svg>
              </button>
            </div>
          </div>

          {/* Related Searches */}
          <section className="mt-8 bg-white p-6 md:p-8">
            <h4 className="text-[20px] font-bold tracking-[-0.02em] text-slate-900 mb-6">Related Searches</h4>
            <div className="flex flex-wrap gap-2.5">
              {relatedSearches.map((item) => (
                <a key={item} href="#" className="rounded-full border border-slate-400 bg-white px-4 py-2 text-[13px] text-slate-800 hover:border-slate-800 hover:text-slate-900 transition-colors">
                  {item}
                </a>
              ))}
            </div>
          </section>

          {/* Newsletter Form */}
          <div className="mt-8 bg-white py-12 flex flex-col items-center justify-center text-center px-4">
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
          </div>
        </section>
      </main>


    </>
  );
}
