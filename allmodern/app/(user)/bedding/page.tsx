import Image from "next/image";
import FilterableProductLayout from "@/components/ui/FilterableProductLayout";



import { ChevronRight } from "lucide-react";

const topSubcategories = [
  { name: "Bedding Sets + Accessories", image: "/images/cat_bedroom.png" },
  { name: "Bedding Essentials", image: "/images/cat_outdoor.png" },
  { name: "Mattresses", image: "/images/hero.png" }
];

const allProducts = [
  { name: "Sealy Cool 12\" Medium Memory Foam Mattress", price: 399, originalPrice: 507, colors: 6, image: "/images/cat_bedroom.png", rating: 4, reviews: 10721, subtext: "Queen" },
  { name: "Sleep by Wayfair™ 6\"/8\"/10\"/12\" Firm Gel Memory Foam Mattress", price: 154, originalPrice: 162, colors: 5, image: "/images/cat_dining.png", rating: 4, reviews: 56404, subtext: "8\", Twin" },
  { name: "Sleep by Wayfair™ Polyester Pillow (Set of 2)", price: 20, originalPrice: 24, sale: true, colors: 2, image: "/images/cat_outdoor.png", rating: 4, reviews: 4198, unit: "$10 per item", subtext: "Queen, Plush" },
  { name: "Edgar 100% Cotton Throw Pillow", price: 34, originalPrice: 39, sale: true, colors: 21, image: "/images/cat_living_room.png", rating: 4, reviews: 7691, subtext: "Pillow Cover Only - No Insert, Sea Foam, 18\"H x 18\"W" },
  { name: "Sealy Cool 12\" Medium Hybrid Mattress", price: 530, colors: 6, image: "/images/hero.png", rating: 4, reviews: 5218, subtext: "Queen" },
  { name: "Sealy to Go 12\" Medium Memory Foam Mattress in a Box", price: 400, originalPrice: 470, colors: 6, image: "/images/cat_bedroom.png", rating: 4, reviews: 7840, subtext: "Queen" },
  { name: "Bedsure Luxury Soft 100% Cotton Waffle Weave Plaid Duvet Cover", price: 86, originalPrice: 96, sale: true, colors: 5, image: "/images/cat_dining.png", rating: 4, reviews: 579, subtext: "King Duvet Cover + 2 King Shams, Beige" },
  { name: "Waffle Weave 100% Cotton Blanket", price: 44, originalPrice: 59, sale: true, colors: 7, image: "/images/cat_outdoor.png", rating: 4, reviews: 583, subtext: "White, Queen" },
  { name: "Nora® Medium Cooling Gel Memory Foam Mattress with Cooling Cover", price: 390, originalPrice: 520, colors: 4, image: "/images/cat_living_room.png", rating: 4, reviews: 10726, subtext: "Queen, 12\"" },
  { name: "Roshina Pillow Insert", price: 27, originalPrice: 35, badge: "Limited Time Only", colors: 13, image: "/images/hero.png", rating: 4, reviews: 1874, subtext: "20\" x 20\"" },
  { name: "Stonewashed Crinkle Cotton Box Stitch Quilt Set", price: 111, originalPrice: 120, colors: 8, image: "/images/cat_bedroom.png", rating: 4, reviews: 330, subtext: "Ivory White, King Quilt + 2 King Shams" },
  { name: "Selma Cotton Throw Pillow", price: 45, colors: 6, image: "/images/cat_dining.png", rating: 4, reviews: 354, subtext: "Brick Red, 20\" x 20\"" },
  { name: "Adelaja 300 Thread Count Organic 100% Cotton Cool & Crisp Percale Weave Sheet Set", price: 60, originalPrice: 92, sale: true, colors: 6, image: "/images/cat_outdoor.png", rating: 4, reviews: 2071, subtext: "White, King" },
  { name: "Chenille Chunky Knit Luxurious Soft Handmade Throw", price: 69, originalPrice: 77, sale: true, colors: 6, image: "/images/cat_living_room.png", rating: 4, reviews: 321, subtext: "Navy Blue" },
  { name: "100% Cotton Lightweight Waffle Weave Summer Blanket", price: 65, originalPrice: 89, badge: "Limited Time Only", colors: 5, image: "/images/hero.png", rating: 4, reviews: 1300, subtext: "White, King" },
  { name: "Double Box Stitch Velvet Quilt set", price: 80, colors: 7, image: "/images/cat_bedroom.png", rating: 4, reviews: 78, subtext: "Cream White, King Quilt + 2 King Shams" },
  { name: "600 Fill Power All Season Down Comforter/Duvet Insert", price: 72, originalPrice: 86, colors: 5, image: "/images/cat_dining.png", rating: 4, reviews: 730, subtext: "White, Queen Down Comforter" },
  { name: "Lombard Wool Throw Pillow", price: 27, originalPrice: 35, colors: 5, image: "/images/cat_outdoor.png", rating: 4, reviews: 115, subtext: "18\" x 18\", Denim/Orange, Pillow Cover Only - No Insert" },
];

const relatedSearches = [
  "Green Bedding Sets", "Devi Designs Pillows", "Modern Throw Pillows", "Blankets + Throws", 
  "King Bedding Sets", "Olive Green Pillows", "Lumbar Throw Pillows", "Outdoor Pillows", 
  "Black Throw Pillows", "Modern Quilts", "Ivory & Cream Bedding Sets", "Pillow Covers", 
  "Bedding Essentials", "12x20\" Lumbar Throw Pillows", "Bedding Sets", "Duvet Covers + Sets", 
  "Minimalist", "Bedding Sets + Accessories", "Blue Bedding Sets", "Sheets + Pillowcases"
];

export default function BeddingPage() {
  return (
    <>

      <main className="bg-white pb-12">
        <section className="mx-auto max-w-[1400px] px-4 pb-8 sm:px-6">
          {/* Hero Section */}
          <div className="relative overflow-hidden bg-slate-200">
            <div className="relative h-[280px] md:h-[400px]">
              <Image src="/images/cat_bedroom.png" alt="Bedding" fill className="object-cover" priority />
            </div>
            <div className="absolute inset-0 bg-black/10" />
            <h1 className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center text-5xl font-bold text-white md:text-[80px] drop-shadow-lg tracking-tight">
              Bedding
            </h1>
          </div>

          {/* Top Subcategories Row */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4">
            {topSubcategories.map((cat, idx) => (
              <a key={idx} href="#" className="block bg-white text-center group border border-slate-200">
                <div className="relative aspect-[1.3/1] bg-slate-200 overflow-hidden">
                  <Image src={cat.image} alt={cat.name} fill className="object-cover transition duration-300 group-hover:opacity-90" />
                </div>
                <p className="py-3 px-2 text-[13px] text-slate-900 leading-tight">
                  {cat.name}
                </p>
              </a>
            ))}
          </div>

          {/* Main Product Grid */}
          <FilterableProductLayout title="Bedding" itemCount={908}>
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
                           <div key={i} className={`w-5 h-5 rounded-full border border-slate-300 ${['bg-slate-200', 'bg-[#c5a687]', 'bg-white', 'bg-[#466a7b]', 'bg-slate-400'][i % 5]}`} />
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
              <button className="h-10 w-10 flex items-center justify-center hover:bg-slate-100 rounded transition-colors">19</button>
              <button className="h-10 w-10 border border-slate-400 bg-white flex items-center justify-center text-slate-800 hover:bg-slate-50 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/></svg>
              </button>
            </div>
          </FilterableProductLayout>
          
          <hr className="border-slate-200 my-8" />

          {/* SEO Text Section */}
          <div className="mb-12">
            <h3 className="text-[20px] font-bold text-slate-900 mb-3">Modern and Contemporary Bedding</h3>
            <p className="text-[13px] text-slate-600 leading-relaxed">
              Class, luxury and comfort. Whether looking to complete your space with the perfect modern and contemporary bedding set with a decorative modern throw pillow or looking to add modern flair with modern bedding essentials, Allmodern offers a great variety in stylish and sophisticated bedding + bath pieces to suit your every need. From mattresses and sheets, duvets and coverlets to modern bedroom accents and decorative throw pillows, let us help you perfect your modern bedding + bath selection. Modern bedding + bath all in one place at an amazing price!
            </p>
          </div>

          {/* Related Searches */}
          <section className="mt-8 bg-white pb-8">
            <h4 className="text-[20px] font-bold tracking-[-0.02em] text-slate-900 mb-6">Related Searches</h4>
            <div className="flex flex-wrap gap-2.5">
              {relatedSearches.map((item) => (
                <a key={item} href="#" className="rounded-full border border-slate-400 bg-white px-4 py-2 text-[13px] text-slate-800 hover:border-slate-800 hover:text-slate-900 transition-colors">
                  {item}
                </a>
              ))}
            </div>
          </section>

          <hr className="border-slate-200 mt-4 mb-8" />

          {/* Newsletter Form */}
          <div className="mt-8 bg-white py-6 flex flex-col items-center justify-center text-center px-4">
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
