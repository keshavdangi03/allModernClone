import Image from "next/image";
import { ChevronDown, Heart } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HelpChat from "@/components/layout/HelpChat";

type Product = {
  id: string;
  name: string;
  subtitle?: string;
  price: number;
  originalPrice?: number | null;
  reviews: number;
  rating: number;
  badge?: "Sale" | "Limited Time Only" | null;
  image: string;
  colors?: string[];
  moreColors?: number;
  quickview?: boolean;
};

const products: Product[] = [
  {
    id: "n1",
    name: "Miller 86'' Upholstered Loveseat",
    subtitle: "Blue Velvet",
    price: 999,
    reviews: 345,
    rating: 4.5,
    image: "/images/cat_living_room.png",
    colors: ["#6b8197", "#7f8769", "#d9d8d2", "#f1efed", "#aaa39b"],
  },
  {
    id: "n2",
    name: "Charia Acacia Adirondack Chair",
    subtitle: "Teak Brown / Cream",
    price: 179,
    originalPrice: 199,
    reviews: 21,
    rating: 4.5,
    badge: "Sale",
    image: "/images/cat_outdoor.png",
    colors: ["#8b5a2b", "#e8dbc9"],
  },
  {
    id: "n3",
    name: "Miller 84'' Upholstered Sofa",
    subtitle: "Blue Velvet",
    price: 1099,
    originalPrice: 1229,
    reviews: 2467,
    rating: 4.5,
    badge: "Sale",
    image: "/images/cat_living_room.png",
    colors: ["#6b8197", "#f0efe8", "#b6b4ae", "#646d4f", "#ece9e1"],
  },
  {
    id: "n4",
    name: "Kalle 86'' Upholstered Sofa",
    subtitle: "Monroe Just Boucle",
    price: 1299,
    originalPrice: 1499,
    reviews: 74,
    rating: 4.5,
    image: "/images/cat_bedroom.png",
    colors: ["#dfddd6", "#ccc9bf", "#beb8ac", "#474441", "#1d2b3a"],
    moreColors: 18,
  },
  {
    id: "n5",
    name: "Dwyer 3 Piece Aluminum Outdoor Lounge Set",
    subtitle: "Black",
    price: 999,
    originalPrice: 1499,
    reviews: 1,
    rating: 4.5,
    image: "/images/hero.png",
    colors: ["#121212", "#e0d6c8"],
  },
  {
    id: "n6",
    name: "Dwyer Outdoor Dining Chairs (Set Of 2)",
    subtitle: "Black",
    price: 519,
    originalPrice: 599,
    reviews: 18,
    rating: 4.5,
    image: "/images/cat_dining.png",
    colors: ["#171717", "#f3efe7"],
  },
  {
    id: "n7",
    name: "Levit 39'' Teak Patio Coffee Table",
    subtitle: "",
    price: 1149,
    originalPrice: 1399,
    reviews: 2,
    rating: 4.5,
    badge: "Limited Time Only",
    image: "/images/cat_outdoor.png",
  },
  {
    id: "n8",
    name: "Block Bench",
    subtitle: "Black",
    price: 579,
    originalPrice: 829,
    reviews: 7,
    rating: 4.5,
    badge: "Sale",
    image: "/images/cat_dining.png",
  },
  {
    id: "n9",
    name: "Kalle Upholstered Ottoman",
    subtitle: "Bellan Blue Performance Velvet",
    price: 599,
    originalPrice: 699,
    reviews: 8,
    rating: 4.5,
    badge: "Limited Time Only",
    image: "/images/cat_living_room.png",
    colors: ["#1d3557", "#cdc7b8", "#403d39", "#6f7250", "#212121"],
    moreColors: 18,
  },
  {
    id: "n10",
    name: "Skyla Hand Tufted Rug",
    subtitle: "Ivory / Tan 7'9'' x 9'9''",
    price: 529,
    originalPrice: 779,
    reviews: 1,
    rating: 4.5,
    badge: "Limited Time Only",
    image: "/images/cat_bedroom.png",
  },
  {
    id: "n11",
    name: "Salina Colorful Framed End Table",
    subtitle: "Peru Blue",
    price: 249,
    originalPrice: 320,
    reviews: 8,
    rating: 4.5,
    image: "/images/cat_dining.png",
    colors: ["#96bad1", "#f4f1e8", "#ced5d6", "#5d7f89", "#d5526f"],
  },
  {
    id: "n12",
    name: "Miller 2 Piece Upholstered Chais Sectional",
    subtitle: "Right Hand Facing, Olive Green Polyester Blend",
    price: 2599,
    originalPrice: 2999,
    reviews: 173,
    rating: 4.5,
    badge: "Limited Time Only",
    image: "/images/hero.png",
    colors: ["#6c7c5f", "#dbd5ca", "#f2f0ea", "#b6cad8"],
  },
  {
    id: "n13",
    name: "Anzie End Table",
    subtitle: "",
    price: 185,
    originalPrice: 279,
    reviews: 5,
    rating: 4.5,
    image: "/images/cat_outdoor.png",
  },
  {
    id: "n14",
    name: "Tessa Upholstered Bed",
    subtitle: "Queen, Cream",
    price: 1299,
    originalPrice: 1599,
    reviews: 33,
    rating: 4.5,
    badge: "Sale",
    image: "/images/cat_bedroom.png",
    colors: ["#f1f1ec", "#7a8756"],
  },
  {
    id: "n15",
    name: "Dwyer Full-Grain Leather Ottoman",
    subtitle: "Cognac Tan",
    price: 599,
    originalPrice: 917,
    reviews: 208,
    rating: 4.5,
    badge: "Sale",
    image: "/images/cat_living_room.png",
    colors: ["#a55d2e", "#121212", "#2b3953"],
  },
  {
    id: "n16",
    name: "Essex 2 Piece 118'' Upholstered Sectional",
    subtitle: "Right Hand Facing, Beige Cotton Blend",
    price: 2599,
    originalPrice: 2999,
    reviews: 88,
    rating: 4.5,
    badge: "Sale",
    image: "/images/cat_outdoor.png",
    colors: ["#e9e2d7"],
    quickview: true,
  },
  {
    id: "n17",
    name: "Terrace Accent Pillow",
    subtitle: "Blue, Polyester, Square 18''",
    price: 55,
    reviews: 0,
    rating: 0,
    image: "/images/cat_living_room.png",
    colors: ["#d7dbe2", "#be3f3f"],
  },
  {
    id: "n18",
    name: "Argon 54'' 3 Piece Ottoman With Solid Wood Base",
    subtitle: "",
    price: 1299,
    originalPrice: 1499,
    reviews: 18,
    rating: 4.5,
    image: "/images/cat_dining.png",
  },
];

function StarRating({ rating }: { rating: number }) {
  if (rating <= 0) return null;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex text-black text-[10px]">
      {[...Array(fullStars)].map((_, i) => (
        <span key={`full-${i}`}>★</span>
      ))}
      {hasHalfStar && <span>★</span>}
      {[...Array(emptyStars)].map((_, i) => (
        <span key={`empty-${i}`} className="text-slate-300">
          ★
        </span>
      ))}
    </div>
  );
}

export default function NewPage() {
  return (
    <>
      <Header />
      <main className="bg-white">
        <section className="mx-auto max-w-[1400px] px-4 pt-6 sm:px-6">
          <div className="relative h-[180px] w-full overflow-hidden sm:h-[260px] md:h-[360px]">
            <Image src="/images/hero.png" alt="Fresh for Summer" fill className="object-cover object-center" priority />
            <div className="absolute inset-0 bg-black/15" />
            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
              <h1 className="max-w-[280px] text-[28px] font-bold leading-[0.95] text-white sm:text-[44px]">Fresh for Summer</h1>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1400px] px-4 pt-3 sm:px-6">
          <div className="flex items-end gap-2 pb-4">
            <h2 className="text-2xl font-bold text-slate-950 sm:text-[38px]">New Arrivals</h2>
            <span className="pb-1 text-[13px] text-slate-600">53 Items</span>
          </div>

          <div className="flex flex-col justify-between gap-4 pb-4 sm:flex-row sm:items-center">
            <button className="flex w-fit items-center justify-center border border-slate-400 bg-white px-10 py-1.5 text-[13px] font-medium text-slate-900 hover:border-slate-500">
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
              </svg>
              Show Filters
            </button>
            <div className="flex items-center text-[13px]">
              <span className="mr-3 text-slate-600">Sort By</span>
              <div className="relative w-[180px]">
                <select className="appearance-none w-full border border-slate-300 bg-white py-1.5 pl-3 pr-8 text-[13px] text-slate-900 outline-none hover:border-slate-400 focus:border-slate-900">
                  <option>Recommended</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Customer Ratings</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1400px] px-4 pb-12 pt-2 sm:px-6">
          <div className="grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-3 lg:gap-x-4 lg:gap-y-10">
            {products.map((p) => (
              <div key={p.id} className="group relative flex flex-col">
                <div className="relative aspect-square w-full overflow-hidden bg-[#f4f4f4]">
                  <Image src={p.image} alt={p.name} fill className="object-cover mix-blend-multiply" />
                  <button className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center bg-white/85 text-slate-600 hover:text-slate-950 hover:bg-white">
                    <Heart className="h-4 w-4" />
                  </button>
                  {p.badge && (
                    <div className="absolute bottom-0 left-0 bg-[#a63f15] px-2 py-0.5 text-[10px] font-bold text-white z-10">{p.badge}</div>
                  )}
                </div>

                <div className="mt-2 flex flex-1 flex-col">
                  {(p.colors || p.moreColors) && (
                    <div className="mb-1 flex items-center gap-1">
                      {p.colors?.map((color, idx) => (
                        <div key={idx} className="h-[15px] w-[15px] rounded-full border border-slate-300" style={{ backgroundColor: color }} />
                      ))}
                      {p.moreColors ? <span className="text-[11px] text-slate-500">+ {p.moreColors}</span> : null}
                    </div>
                  )}

                  <h3 className="text-[13px] leading-tight text-slate-900 group-hover:underline">{p.name}</h3>
                  {p.subtitle ? <div className="mt-0.5 text-[11px] text-slate-500">{p.subtitle}</div> : null}
                  {p.rating > 0 ? (
                    <div className="mt-0.5 flex items-center gap-1">
                      <StarRating rating={p.rating} />
                      <span className="text-[11px] text-slate-500">({p.reviews})</span>
                    </div>
                  ) : null}
                  <div className="mt-1 flex items-baseline gap-1.5">
                    <span className="text-[24px] font-semibold leading-none text-[#a63f15]">${p.price}</span>
                    {p.originalPrice ? <span className="text-[12px] text-slate-500 line-through">${p.originalPrice}</span> : null}
                  </div>
                  <div className="mt-0.5 text-[11px] text-slate-600">Free Fast Delivery</div>
                  {p.quickview ? <button className="mt-1 w-fit text-[11px] underline">Quickview</button> : null}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex items-center justify-center gap-4">
            <button className="flex h-8 w-8 items-center justify-center border border-slate-300 bg-white text-slate-500 hover:bg-slate-50" aria-label="Previous page">
              <svg className="h-4 w-4 rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <div className="flex items-center gap-4 text-[13px] text-slate-700">
              <span className="font-bold underline underline-offset-4">1</span>
              <button className="hover:underline">2</button>
              <button className="hover:underline">3</button>
              <button className="hover:underline">4</button>
            </div>
            <button className="flex h-8 w-8 items-center justify-center border border-slate-500 bg-white text-slate-900 hover:bg-slate-50" aria-label="Next page">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </section>
      </main>
      <Footer />
      <HelpChat />
    </>
  );
}
