import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HelpChat from "@/components/HelpChat";

const storageByProductCategories = [
  { name: "Shop Bookcases", image: "/images/cat_living_room.png" },
  { name: "Shop Coat Racks + Hooks", image: "/images/cat_outdoor.png" },
  { name: "Shop Baskets + Boxes", image: "/images/cat_bedroom.png" }
];

const storageByRoomCategories = [
  { name: "Shop Living Room Storage", image: "/images/cat_living_room.png" },
  { name: "Shop Entryway Storage", image: "/images/cat_bedroom.png" },
  { name: "Shop Home Office Storage", image: "/images/cat_dining.png" }
];

const featuredProductsByProduct = [
  { name: "Yamazaki Home Coat Hanger, Steel, Weighted Base", price: 135, image: "/images/cat_living_room.png", rating: 4, reviews: 38 },
  { name: "Sifford 5 - Hook Solid Wood Coat Rack", price: 51, originalPrice: 66, image: "/images/cat_bedroom.png", rating: 5, reviews: 120 },
  { name: "Yamazaki Home Wall-Mounted Coat Hanger, Steel + Wood", price: 80, image: "/images/cat_outdoor.png", rating: 4, reviews: 15 },
  { name: "Kamal 72\" H x 24.75\" W Ladder Bookcase", price: 249, image: "/images/cat_dining.png", rating: 4, reviews: 89 },
  { name: "Stiles Etagere Bookcase", price: 499, image: "/images/cat_living_room.png", rating: 5, reviews: 210 },
  { name: "Eldorado Standard Etagere Bookcase", price: 820, image: "/images/cat_bedroom.png", rating: 4, reviews: 54 },
  { name: "Annora Wide Bookcase", price: 1398, image: "/images/cat_outdoor.png", rating: 5, reviews: 12 },
  { name: "Level Stainless Steel Etagere Bookcase", price: 399, originalPrice: 419, image: "/images/cat_dining.png", rating: 4, reviews: 45 },
  { name: "Ajax Narrow Bookcase", price: 359, image: "/images/cat_living_room.png", rating: 4, reviews: 67 },
  { name: "Annora Wide Bookcase", price: 782, image: "/images/cat_bedroom.png", rating: 5, reviews: 88 },
  { name: "Buddy Wall Mounted Coat Hooks, Decorative Single Hangers for Entryway, Bedroom, Set of 3", price: 30, image: "/images/cat_outdoor.png", rating: 4, reviews: 112 },
  { name: "Gwyneth Wide Etagere Bookcase", price: 479, image: "/images/cat_dining.png", rating: 5, reviews: 150 },
];

const featuredProductsByRoom = [
  { name: "Baer Poplar Solid Wood Wall Shelf", price: 89, image: "/images/cat_living_room.png", rating: 4, reviews: 34 },
  { name: "Bozovich Solid Wood End Table", price: 149, sale: true, image: "/images/cat_bedroom.png", rating: 5, reviews: 123 },
  { name: "Ceno 55\" Console Table", price: 299, image: "/images/cat_outdoor.png", rating: 4, reviews: 56 },
  { name: "Level End Table", price: 189, image: "/images/cat_dining.png", rating: 5, reviews: 78 },
];

const allProducts = [
  { name: "Trinsic Single Towel Hook Bath Hardware Accessory", price: 34, colors: 5, rating: 5, reviews: 1350, image: "/images/cat_living_room.png" },
  { name: "Trinsic Wall Mount Single Post Toilet Paper Holder Bath Hardware Accessory", price: 35, originalPrice: 67, sale: true, colors: 5, rating: 5, reviews: 3080, image: "/images/cat_bedroom.png" },
  { name: "Trinsic Wall Mount Towel Bar Bath Hardware Accessory", price: 42, originalPrice: 68, sale: true, colors: 5, sizes: 3, rating: 4, reviews: 1103, image: "/images/cat_outdoor.png" },
  { name: "Circular Toilet Paper Holder", price: 33, originalPrice: 38, colors: 5, rating: 4, reviews: 308, image: "/images/cat_dining.png" },
  { name: "Stiles Etagere Bookcase", price: 499, colors: 3, rating: 5, reviews: 1886, image: "/images/cat_living_room.png" },
  { name: "Yamazaki Home Tower Modern Slim Console Table, Metal And Wood Skinny Hallway Table, 32\" - Steel", price: 95, colors: 2, rating: 4, reviews: 408, image: "/images/cat_bedroom.png" },
];

const relatedSearches = [
  "Hampers + Baskets",
  "Decorative Baskets + Boxes",
  "Trash Cans",
  "Home Office Storage Solutions",
  "Kitchen Storage Solutions",
  "Entryway Storage Solutions",
  "Green Trash Cans",
  "Countertop Bathroom Accessories",
  "Storage By Product",
  "Living Room Storage Solutions",
  "Tall Narrow Cabinet",
  "Black Trash Cans",
  "Bedroom + Closet Storage Solutions",
  "Storage By Room",
  "Pot Stand",
  "Black Decorative Baskets",
  "Bathroom Trash Can With Lid",
  "Bathroom Benches And Seats",
  "Bathroom + Laundry Storage Solutions",
  "Shoe Storage",
];

export default function StoragePage() {
  return (
    <>
      <Header />
      <main className="bg-[#f3f3f3] pb-12">
        <section className="mx-auto max-w-[1400px] px-4 pb-8 pt-4 sm:px-6">
          {/* Hero Section */}
          <div className="relative overflow-hidden bg-slate-200">
            <div className="relative h-[340px] md:h-[420px]">
              <Image src="/images/cat_living_room.png" alt="Storage" fill className="object-cover" priority />
            </div>
            <div className="absolute inset-0 bg-black/20" />
            <h1 className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center text-5xl font-bold text-white md:text-7xl drop-shadow-md">
              Storage
            </h1>
          </div>

          {/* Top Category Links */}
          <div className="mt-2 grid grid-cols-2 gap-2">
            <a href="#storage-by-product" className="block bg-white text-center">
              <div className="relative aspect-[1.3/1] md:aspect-[2/1] bg-slate-200">
                <Image src="/images/cat_bedroom.png" alt="Storage by Product" fill className="object-cover" />
              </div>
              <p className="py-2 text-[14px] text-slate-800">Storage by Product</p>
            </a>
            <a href="#storage-by-room" className="block bg-white text-center">
              <div className="relative aspect-[1.3/1] md:aspect-[2/1] bg-slate-200">
                <Image src="/images/cat_dining.png" alt="Storage by Room" fill className="object-cover" />
              </div>
              <p className="py-2 text-[14px] text-slate-800">Storage by Room</p>
            </a>
          </div>

          {/* Storage by Product Section */}
          <div id="storage-by-product" className="mt-12 bg-white pt-4 pb-6 px-4">
            <h2 className="text-[32px] font-bold tracking-[-0.02em] text-slate-900 mb-4">Storage by Product</h2>
            <div className="relative h-[300px] md:h-[500px] mb-6 overflow-hidden">
              <Image src="/images/hero.png" alt="Shop Storage Products" fill className="object-cover" />
              <div className="absolute bottom-6 right-6">
                <span className="text-white text-xl md:text-2xl font-semibold underline decoration-white decoration-2 underline-offset-4 tracking-wide drop-shadow-md cursor-pointer">
                  SHOP STORAGE PRODUCTS
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {storageByProductCategories.map((cat) => (
                <a key={cat.name} href="#" className="block group">
                  <div className="relative aspect-square bg-slate-200 mb-2">
                    <Image src={cat.image} alt={cat.name} fill className="object-cover" />
                  </div>
                  <h3 className="font-semibold text-slate-900 group-hover:underline">{cat.name}</h3>
                </a>
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {featuredProductsByProduct.map((product, idx) => (
                <article key={idx} className="bg-white">
                  <div className="relative aspect-square bg-slate-100 mb-2 border border-slate-200">
                    <Image src={product.image} alt={product.name} fill className="object-cover mix-blend-multiply p-4" />
                    <button className="absolute right-2 top-2 h-8 w-8 rounded-full border border-slate-300 bg-white flex items-center justify-center text-slate-500 hover:text-red-500 transition-colors shadow-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16"><path d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/></svg>
                    </button>
                  </div>
                  <h4 className="text-[13px] leading-snug text-slate-800 mb-1 line-clamp-2">{product.name}</h4>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[15px] text-slate-900">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-slate-500 line-through text-[13px]">${product.originalPrice}</span>
                    )}
                  </div>
                </article>
              ))}
            </div>
            <div className="mt-10 mb-2 text-center md:text-right">
              <a href="#" className="inline-block text-[15px] font-bold tracking-wide text-slate-900 underline decoration-slate-900 decoration-2 underline-offset-4 hover:text-slate-700 hover:decoration-slate-700 transition-colors">
                SHOP ALL STORAGE PRODUCTS
              </a>
            </div>
          </div>

          {/* Storage by Room Section */}
          <div id="storage-by-room" className="mt-12 bg-white pt-4 pb-6 px-4">
            <h2 className="text-[32px] font-bold tracking-[-0.02em] text-slate-900 mb-4">Storage by Room</h2>
            <div className="relative h-[300px] md:h-[500px] mb-6 overflow-hidden">
              <Image src="/images/cat_outdoor.png" alt="Shop Storage by Room" fill className="object-cover" />
              <div className="absolute bottom-6 right-6">
                <span className="text-white text-xl md:text-2xl font-semibold underline decoration-white decoration-2 underline-offset-4 tracking-wide drop-shadow-md cursor-pointer">
                  SHOP STORAGE BY ROOM
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {storageByRoomCategories.map((cat) => (
                <a key={cat.name} href="#" className="block group">
                  <div className="relative aspect-square bg-slate-200 mb-2">
                    <Image src={cat.image} alt={cat.name} fill className="object-cover" />
                  </div>
                  <h3 className="font-semibold text-slate-900 group-hover:underline">{cat.name}</h3>
                </a>
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {featuredProductsByRoom.map((product, idx) => (
                <article key={idx} className="bg-white">
                  <div className="relative aspect-square bg-slate-100 mb-2 border border-slate-200">
                    <Image src={product.image} alt={product.name} fill className="object-cover mix-blend-multiply p-4" />
                    <button className="absolute right-2 top-2 h-8 w-8 rounded-full border border-slate-300 bg-white flex items-center justify-center text-slate-500 hover:text-red-500 transition-colors shadow-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16"><path d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/></svg>
                    </button>
                    {product.sale && (
                      <span className="absolute left-2 bottom-2 bg-[#bf5a2e] px-1.5 py-0.5 text-[11px] font-semibold text-white tracking-wide">Sale</span>
                    )}
                  </div>
                  <h4 className="text-[13px] leading-snug text-slate-800 mb-1 line-clamp-2">{product.name}</h4>
                  <div className="flex items-center gap-2">
                    {product.sale ? (
                      <span className="font-semibold text-[15px] text-[#bf5a2e]">${product.price}</span>
                    ) : (
                      <span className="font-semibold text-[15px] text-slate-900">${product.price}</span>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Main Product Grid */}
          <div className="mt-12 bg-white p-4">
            <div className="flex flex-col md:flex-row items-baseline justify-between border-b border-slate-300 pb-4 mb-6">
              <div className="flex items-end gap-2">
                <h2 className="text-[28px] md:text-[34px] font-bold tracking-[-0.02em] text-slate-900">Storage</h2>
                <span className="pb-1.5 text-[14px] text-slate-500">1,750 Items</span>
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

            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-3">
              {allProducts.map((product, idx) => (
                <article key={idx} className="bg-white group cursor-pointer">
                  <div className="relative aspect-square bg-[#f8f8f8] mb-3 border border-transparent group-hover:border-slate-300 transition-colors">
                    <Image src={product.image} alt={product.name} fill className="object-cover mix-blend-multiply p-6" />
                    <button className="absolute right-3 top-3 h-8 w-8 rounded-full bg-white/80 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-red-500 hover:bg-white shadow-sm transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16"><path d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/></svg>
                    </button>
                    {product.sale && (
                      <span className="absolute left-3 bottom-3 bg-[#bf5a2e] px-1.5 py-0.5 text-[12px] font-semibold text-white tracking-wide">Sale</span>
                    )}
                  </div>
                  <div className="px-1">
                    {(product.colors || product.sizes) && (
                      <div className="text-[12px] text-slate-500 mb-1">
                        {product.colors && `${product.colors} Colors`}
                        {product.colors && product.sizes && `, `}
                        {product.sizes && `${product.sizes} Sizes`}
                      </div>
                    )}
                    <h3 className="text-[14px] leading-snug text-slate-800 mb-1 line-clamp-2 group-hover:underline">{product.name}</h3>
                    <div className="flex items-center gap-1 text-[12px] text-slate-600 mb-1">
                      <span className="text-slate-800 tracking-tighter">{"★".repeat(product.rating)}{"☆".repeat(5 - product.rating)}</span>
                      <span>({product.reviews})</span>
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      {product.sale && product.originalPrice ? (
                        <>
                          <span className="font-bold text-[18px] text-[#bf5a2e]">${product.price}</span>
                          <span className="text-slate-500 line-through text-[14px]">${product.originalPrice}</span>
                        </>
                      ) : (
                        <span className="font-bold text-[18px] text-slate-900">${product.price}</span>
                      )}
                    </div>
                    <p className="text-[13px] text-slate-500 mb-2">Free Fast Delivery</p>
                    <button className="text-[13px] text-slate-800 border-b border-transparent group-hover:border-slate-800 transition-colors">Quickview</button>
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
              <button className="h-10 w-10 flex items-center justify-center hover:bg-slate-100 rounded transition-colors">37</button>
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
          <div className="mt-8 bg-white py-12 flex flex-col items-center justify-center text-center">
            <h3 className="text-[18px] font-bold text-slate-900 mb-4">We like your style. Want to stay in touch?</h3>
            <form className="flex w-full max-w-[500px]">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="flex-1 h-12 border border-slate-400 px-4 text-[14px] text-slate-800 focus:outline-none focus:border-slate-800 placeholder-slate-500"
              />
              <button type="submit" className="h-12 bg-[#222222] text-white px-8 text-[14px] font-semibold hover:bg-black transition-colors ml-2">
                Submit
              </button>
            </form>
            <a href="#" className="text-[12px] text-slate-500 underline mt-4 hover:text-slate-800">Privacy Policy</a>
          </div>
        </section>
      </main>
      <Footer />
      <HelpChat />
    </>
  );
}
