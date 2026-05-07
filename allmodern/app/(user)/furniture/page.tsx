import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Heart } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HelpChat from "@/components/layout/HelpChat";
import FilterableProductLayout from "@/components/ui/FilterableProductLayout";

const topCategories = [
  { title: "Living Room Furniture", image: "/images/cat_living_room.png" },
  { title: "Bedroom Furniture", image: "/images/cat_bedroom.png" },
  { title: "Home Office Furniture", image: "/images/cat_dining.png" },
  { title: "Kitchen + Dining Room Furniture", image: "/images/cat_outdoor.png" },
  { title: "Organizational Furniture", image: "/images/hero.png" },
];

const livingSubcats = [
  { title: "Shop Sofas + Sectionals", image: "/images/cat_living_room.png" },
  { title: "Shop Coffee Tables", image: "/images/cat_bedroom.png" },
  { title: "Shop Accent Chairs", image: "/images/cat_dining.png" },
];

const livingProducts = [
  { id: "lf1", name: "Cemil End Table", price: 100, originalPrice: 113, badge: "Sale", image: "/images/cat_living_room.png" },
  { id: "lf2", name: "Armengol Solid Wood End Table", price: 85, originalPrice: 99, badge: null, image: "/images/cat_bedroom.png" },
  { id: "lf3", name: "Kyo Chenille Upholstered Barrel Chair", price: 209, originalPrice: 329, badge: "Limited Time Only", image: "/images/cat_dining.png" },
  { id: "lf4", name: "Kamila Solid Wood End Table", price: 74, originalPrice: null, badge: "Sale", image: "/images/cat_outdoor.png" },
];

const bedroomSubcats = [
  { title: "Shop Beds", image: "/images/cat_living_room.png" },
  { title: "Shop Dressers", image: "/images/cat_bedroom.png" },
  { title: "Shop Nightstands", image: "/images/cat_dining.png" },
];

const bedroomProducts = [
  { id: "bf1", name: "Reni 1 - Drawer Solid Wood Nightstand", price: 219, originalPrice: 279, badge: "Sale", image: "/images/cat_living_room.png" },
  { id: "bf2", name: "Williams 2-Drawer Nightstand", price: 249, originalPrice: 319, badge: "Sale", image: "/images/cat_bedroom.png" },
  { id: "bf3", name: "Berkeley 2 - Drawer Nightstand", price: 379, originalPrice: 499, badge: "Limited Time Only", image: "/images/cat_dining.png" },
  { id: "bf4", name: "Sealy Cool 12\" Medium Memory Foam Mattress", price: 399, originalPrice: 587, badge: null, image: "/images/cat_outdoor.png" },
];

const diningSubcats = [
  { title: "Shop Dining Tables", image: "/images/cat_living_room.png" },
  { title: "Shop Dining Chairs", image: "/images/cat_bedroom.png" },
  { title: "Shop Bar Stools", image: "/images/cat_dining.png" },
];

const diningProducts = [
  { id: "kf1", name: "Lennart 71\" Pine Solid Wood Dining Table", price: 549, originalPrice: 650, badge: "Sale", image: "/images/cat_dining.png" },
  { id: "kf2", name: "Piedmont Solid Wood Dining Chair (Set of 2)", price: 299, originalPrice: 350, badge: null, image: "/images/cat_living_room.png" },
  { id: "kf3", name: "Amalfi 3-Piece Dining Set", price: 899, originalPrice: 1100, badge: "Sale", image: "/images/hero.png" },
  { id: "kf4", name: "Soren Upholstered Bar Stool", price: 159, originalPrice: null, badge: "Limited Time Only", image: "/images/cat_bedroom.png" },
];

const mainGridSubcats = [
  { title: "Shop Office Furniture", image: "/images/cat_outdoor.png" },
  { title: "Shop Organizational Furniture", image: "/images/hero.png" },
  { title: "Shop Entryway Furniture", image: "/images/cat_living_room.png" },
];

const mainGridProducts = [
  { id: "mg1", name: "Sleep by Wayfair 10\" Medium Memory Foam Mattress", subtitle: "Queen", price: 226, originalPrice: 270, extraText: "Free 3-Day Delivery", reviews: 89671, rating: 4.5, badge: "Sale", image: "/images/cat_bedroom.png" },
  { id: "mg2", name: "Sleep by Wayfair Medium Cooling Gel Memory Foam Mattress", subtitle: "Queen, 10\"", price: 257, originalPrice: 307, extraText: "Free 3-Day Delivery", reviews: 68419, rating: 4.5, badge: "Sale", image: "/images/cat_living_room.png", colorCount: 5 },
  { id: "mg3", name: "Amaryn Solid Wood Bed", subtitle: "Queen, Antique Espresso", price: 229, originalPrice: 259, extraText: "Free Fast Delivery", reviews: 12492, rating: 4.5, badge: "Limited Time Only", image: "/images/cat_dining.png", colors: ["#3d2b1f", "#fff", "#ccc", "#8b4513", "#f5deb3"] },
  { id: "mg4", name: "Anagrace Leather Upholstered Swivel Tilt Task Office Chair", subtitle: "Camel Pebbled Faux Leather", price: 160, originalPrice: 207, extraText: "Free 3-Day Delivery", reviews: 663, rating: 4.5, badge: "Sale", image: "/images/cat_outdoor.png", colors: ["#c19a6b", "#000", "#fff", "#a3b19b", "#2c3e50"] },
  { id: "mg5", name: "Bennett Upholstered Swivel Barrel Chair", subtitle: "Effie Linen Performance Linen", price: 459, originalPrice: 629, extraText: "Free 3-Day Delivery", reviews: 2565, rating: 4.5, badge: "Sale", image: "/images/hero.png", colors: ["#e5e0d8", "#1e3a8a", "#555", "#d2b48c", "#8b4513"] },
  { id: "mg6", name: "Ardin Solid Wood Bed Frame With Cream Boucle Upholstered Headboard", subtitle: "Natural, Queen", price: 320, originalPrice: 390, extraText: "Free 3-Day Delivery", reviews: 486, rating: 4.5, badge: "Sale", image: "/images/cat_bedroom.png", colors: ["#e1c699", "#000", "#3d2b1f"] },
  { id: "mg7", name: "Delpha Grounded Upholstered Wood Base Bed", subtitle: "King, Effie Linen Performance Linen", price: 1299, originalPrice: 1599, extraText: null, reviews: 291, rating: 4.5, badge: "Sale", image: "/images/cat_living_room.png", colors: ["#e5e0d8", "#555", "#fff", "#000", "#ccc"] },
  { id: "mg8", name: "Oxford Baby Uptown Upholstered Glider Recliner Rocking Chair Swivel...", subtitle: "Sand Polyester", price: 313, originalPrice: 400, extraText: null, reviews: 175, rating: 4.5, badge: "Sale", image: "/images/cat_dining.png", colors: ["#e5e0d8", "#8b4513", "#ccc", "#f5f5dc", "#ddd"] },
  { id: "mg9", name: "Bennett Genuine Leather Swivel Barrel Chair (Set of 2)", subtitle: "Marseille Brown Genuine Leather", price: 1398, originalPrice: 2199, extraText: "Free Fast Delivery", reviews: 476, rating: 4.5, badge: null, image: "/images/cat_outdoor.png", colors: ["#a0522d", "#8b4513", "#000"] },
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

export default function FurniturePage() {
  return (
    <>
      <main className="bg-white">

        {/* Hero Section */}
        <section className="relative h-[250px] w-full sm:h-[350px] md:h-[450px]">
          <Image src="/images/hero.png" alt="Furniture" fill className="object-cover object-center" priority />
          <div className="absolute inset-0 bg-black/10" />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-4xl font-bold text-white drop-shadow-md sm:text-5xl md:text-[80px]">
              Furniture
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

        {/* LIVING ROOM FURNITURE DEPARTMENT SECTION */}
        <section className="mx-auto max-w-[1400px] px-4 pt-16 sm:px-6">
          <h2 className="text-[28px] font-bold text-slate-950 mb-6">Living Room Furniture</h2>
          <div className="relative h-[300px] sm:h-[400px] md:h-[500px] w-full overflow-hidden mb-6 group cursor-pointer">
            <Image src="/images/cat_living_room.png" alt="Living Room Furniture Banner" fill className="object-cover transition duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 flex items-end justify-end p-8 md:p-12 bg-gradient-to-t from-black/50 to-transparent opacity-80">
               <span className="text-white text-2xl md:text-3xl font-bold underline underline-offset-8 drop-shadow-md decoration-white">SHOP LIVING ROOM</span>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-10">
            {livingSubcats.map((cat) => (
              <div key={cat.title} className="group cursor-pointer">
                <div className="relative aspect-square w-full overflow-hidden mb-2 bg-[#f4f4f4]">
                  <Image src={cat.image} alt={cat.title} fill className="object-cover mix-blend-multiply transition duration-300 group-hover:scale-105" />
                </div>
                <h3 className="font-bold text-[14px] text-slate-900 group-hover:underline">{cat.title}</h3>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 lg:gap-x-6 lg:gap-y-12 pb-6 border-b border-slate-200">
            {livingProducts.map((p) => (
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
               <Link href="#" className="text-[13px] sm:text-[15px] md:text-[17px] font-bold text-slate-900 underline underline-offset-4 hover:text-slate-600 uppercase tracking-wide text-right">
                 SHOP ALL LIVING ROOM
               </Link>
            </div>
          </div>
        </section>

        {/* BEDROOM FURNITURE DEPARTMENT SECTION */}
        <section className="mx-auto max-w-[1400px] px-4 pt-16 sm:px-6 pb-20">
          <h2 className="text-[28px] font-bold text-slate-950 mb-6">Bedroom Furniture</h2>
          <div className="relative h-[300px] sm:h-[400px] md:h-[500px] w-full overflow-hidden mb-6 group cursor-pointer">
            <Image src="/images/cat_bedroom.png" alt="Bedroom Furniture Banner" fill className="object-cover transition duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 flex items-end justify-end p-8 md:p-12 bg-gradient-to-t from-black/50 to-transparent opacity-80">
               <span className="text-white text-2xl md:text-3xl font-bold underline underline-offset-8 drop-shadow-md decoration-white">SHOP BEDROOM</span>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-10">
            {bedroomSubcats.map((cat) => (
              <div key={cat.title} className="group cursor-pointer">
                <div className="relative aspect-square w-full overflow-hidden mb-2 bg-[#f4f4f4]">
                  <Image src={cat.image} alt={cat.title} fill className="object-cover mix-blend-multiply transition duration-300 group-hover:scale-105" />
                </div>
                <h3 className="font-bold text-[14px] text-slate-900 group-hover:underline">{cat.title}</h3>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 lg:gap-x-6 lg:gap-y-12 pb-6 border-b border-slate-200">
            {bedroomProducts.map((p) => (
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
               <Link href="#" className="text-[13px] sm:text-[15px] md:text-[17px] font-bold text-slate-900 underline underline-offset-4 hover:text-slate-600 uppercase tracking-wide text-right">
                 SHOP ALL BEDROOM
               </Link>
            </div>
          </div>
        </section>

        {/* KITCHEN + DINING FURNITURE DEPARTMENT SECTION */}
        <section className="mx-auto max-w-[1400px] px-4 pt-16 sm:px-6 pb-20">
          <h2 className="text-[28px] font-bold text-slate-950 mb-6">Kitchen + Dining Furniture</h2>
          <div className="relative h-[300px] sm:h-[400px] md:h-[500px] w-full overflow-hidden mb-6 group cursor-pointer">
            <Image src="/images/cat_dining.png" alt="Kitchen Dining Furniture Banner" fill className="object-cover transition duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 flex items-end justify-end p-8 md:p-12 bg-gradient-to-t from-black/50 to-transparent opacity-80">
               <span className="text-white text-2xl md:text-3xl font-bold underline underline-offset-8 drop-shadow-md decoration-white">SHOP KITCHEN + DINING</span>
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
               </div>
            ))}

            <div className="col-span-2 md:col-span-4 flex justify-end pt-2 pb-10">
               <Link href="#" className="text-[13px] sm:text-[15px] md:text-[17px] font-bold text-slate-900 underline underline-offset-4 hover:text-slate-600 uppercase tracking-wide text-right">
                 SHOP ALL KITCHEN + DINING
               </Link>
            </div>
          </div>
        </section>

        {/* MAIN CATEGORY GRID: Furniture */}
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

        </section>

        <FilterableProductLayout title="Furniture" itemCount={3810}>

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
                  {p.colors && (
                    <div className="mb-1.5 flex items-center gap-1">
                      {p.colors.map((color, idx) => (
                        <div key={idx} className="h-[15px] w-[15px] rounded-full border border-slate-300" style={{ backgroundColor: color }}></div>
                      ))}

                    </div>
                  )}
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
      {/* SEO Text */}
        <section className="mx-auto max-w-[1400px] px-4 pb-20 pt-8 sm:px-6">
          <h2 className="mb-4 text-[19px] font-bold text-slate-950">Furniture</h2>
          <div className="space-y-4 text-[13px] leading-relaxed text-slate-700">
            <p>
              Infuse personality into your home with modern furniture. Your furniture should reflect your style. From the living room to the patio, find the modern furniture that creates your dream home inside and out. Whether your style tends to be more industrial or bohemian, bring your vision to life with modern and contemporary furniture:
            </p>
            <p>
              Modern Living Room Furniture: Sofas, TV stands, coffee tables and recliners are all crucial pieces of modern living room furniture. Whether you&apos;re looking to upgrade an old sofa or are redesigning the entire space, browse hundreds of products across multiple styles to find the pieces that feel true to you. Not sure which styles or materials fit best in your home? There are a few quick reference points that can help you decide. For instance, including a lot of wood-based furniture will give your living room a farmhouse look. The tv stand and coffee table are a couple of quick ways to infuse that rustic look into your modern living room. Metal-based stands and bookcases can help achieve an industrial look or minimalist vibe. Whichever pieces you choose, your modern living room furniture should reflect your personal style.
            </p>
            <p>
              Contemporary Office Furniture: Your home office should be the most productive room in your house. Contemporary office furniture brings a creative aesthetic to this space that inspires your best work. From the desk to a bookcase, find modern office furniture for any style. An underrated decor item and functional piece of contemporary office furniture is a desktop organizer. Organizers are a great way to add hints of style to the desk area, while keeping the space clean. Brighten up your desk with a gold letter box, or keep the space sleek with a black file sorter. If you&apos;re looking to upgrade more than just a few pieces of decor in the home office, the desk and office chairs are typically the first items that come to mind. From a modest writing desk to a more robust computer desk, choose the one that makes the most sense for your space. If you have a more confined office area and only work there a few times throughout the week, a smaller writing desk may be the choice for you. If you work from home often, a computer desk may be a more effective piece of furniture for you.
            </p>
            <p>
              Modern Bedroom Furniture: There is nothing quite like retreating to your bedroom after a long day. Make this space the most relaxing room in your home with modern bedroom furniture. Whether you&apos;re changing up your style or just want to replace a few pieces, find modern bedroom furniture that speaks to you. A modern metal-based bed frame will bring a minimalist, industrial vibe to your bedroom. An upholstered headboard adds a hint of elegance to this space, while maintaining a contemporary look. Whichever style you gravitate towards, upgrade your home with modern bedroom furniture.
            </p>
            <p>
              Modern furniture adds elegance to your home. Whether you&apos;re moving into a new house or simply looking to upgrade a few pieces, shop hundreds of products to find the furniture that fits your style.
            </p>
          </div>
        </section>

        {/* Related Searches */}
        <section className="mx-auto max-w-[1400px] px-4 pb-20 pt-2 sm:px-6">
          <h3 className="text-[19px] font-bold text-slate-950 mb-4">Related Searches</h3>
          <div className="flex flex-wrap gap-2.5">
            {["Black Console Tables", "Long (Above 55 In.) Benches", "Coat Racks + Hooks", "Benches", "Accent Cabinets", "Bedroom Benches", "Accent + Lounge Chairs", "Black Benches", "Oversized Rocking Chair", "Storage Cabinets", "Console Tables", "Organizational Furniture", "Narrow Entryway Bench", "Entryway + Hallway Furniture", "Corner Seating Bench", "Mid Century Console Cabinet", "Rocking Chairs", "Bedroom Bench For King Bed", "Room Dividers", "Dining Benches"].map((term) => (
              <Link key={term} href="#" className="rounded-full border border-slate-300 bg-white px-4 py-1.5 text-[12px] text-slate-700 hover:border-slate-900 hover:text-slate-900 transition">
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
