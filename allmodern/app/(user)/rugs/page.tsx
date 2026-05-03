import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/Header";
import FilterableProductLayout from "@/components/ui/FilterableProductLayout";
import SortFilterBar from "@/components/ui/SortFilterBar";
import { ChevronDown, Heart, ArrowRight } from "lucide-react";




const rugCategories = [
  { title: "Area Rugs", image: "/images/cat_living_room.png" },
  { title: "Rug Pads + Mats", image: "/images/hero.png" },
  { title: "Rugs by Size", image: "/images/cat_outdoor.png" },
];

type Product = {
  id: string;
  name: string;
  size?: string;
  image: string;
  price: number;
  originalPrice?: number;
  isSale?: boolean;
  rating?: number;
  reviews?: number;
  shippingText?: string;
  sizesCount?: number;
  badgeText?: string;
  badge?: string;
  colors?: string[];
  colorCount?: number;
  subtitle?: string;
  priceStr?: string;
  origPriceStr?: string;
  extraText?: string;
};

const products: Product[] = [
  {
    id: "1",
    name: "Bottorff Dual Surface 0.25\" Non Slip Rug Pad",
    size: "Rectangle 8' x 10'",
    image: "/images/cat_living_room.png",
    price: 72,
    originalPrice: 78,
    isSale: true,
    rating: 4.5,
    reviews: 380585,
    shippingText: "Free Fast Delivery",
    sizesCount: 40,
  },
  {
    id: "2",
    name: "Bottorff Dual Surface 0.33\" Non Slip Rug Pad",
    size: "Rectangle 8' x 10'",
    image: "/images/cat_bedroom.png",
    price: 81,
    originalPrice: 87,
    isSale: true,
    rating: 4.5,
    reviews: 380585,
    shippingText: "Free 3-Day Delivery",
    sizesCount: 38,
  },
  {
    id: "3",
    name: "Wayfair Basics® All-Weather Rug Pad",
    size: "Rectangle 4' x 6'",
    image: "/images/cat_outdoor.png",
    price: 22,
    originalPrice: 31,
    isSale: false,
    rating: 4.5,
    reviews: 11458,
    shippingText: "3-Day Delivery",
    sizesCount: 16,
  },
  {
    id: "4",
    name: "Classic Felt Supreme Cushioned Rug Pad (1/2\")",
    size: "Rectangle 8' x 10'",
    image: "/images/cat_dining.png",
    price: 115,
    originalPrice: 181,
    isSale: true,
    rating: 5.0,
    reviews: 1498,
    shippingText: "Free Fast Delivery",
    sizesCount: 47,
  },
  {
    id: "5",
    name: "Chris Loves Julia x Loloi Polly Handmade Ivory/Natural Rug",
    size: "Rectangle 7'9\" x 9'9\"",
    image: "/images/hero.png",
    price: 311,
    originalPrice: 473,
    isSale: true,
    rating: 4.5,
    reviews: 873,
    shippingText: "Free Fast Delivery",
    sizesCount: 10,
  },
  {
    id: "6",
    name: "Icon Striped Indoor Outdoor Multi Rug",
    size: "Rectangle 3'7\" x 5'7\"",
    image: "/images/cat_living_room.png",
    price: 99,
    originalPrice: 119,
    isSale: true,
    rating: 5.0,
    reviews: 137,
    shippingText: "Free Fast Delivery",
    sizesCount: 7,
  },
  {
    id: "7",
    name: "Santiago Hand Loomed Wool Rug",
    size: "Runner 2'3\" x 8'",
    image: "/images/cat_bedroom.png",
    price: 142,
    originalPrice: 191,
    isSale: true,
    rating: 4.5,
    reviews: 286,
    shippingText: "Free Fast Delivery",
    sizesCount: 19,
  },
  {
    id: "8",
    name: "Ovilla Pet Friendly Dual Surface Non-Slip Rug Pad (0.25\")",
    size: "2'W x 8'L",
    image: "/images/cat_outdoor.png",
    price: 39,
    originalPrice: 45,
    isSale: true,
    rating: 4.5,
    reviews: 776,
    shippingText: "Free 3-Day Delivery",
    sizesCount: 13,
  },
  {
    id: "9",
    name: "Danette Hand Loomed Wool Rug",
    size: "Runner 2'3\" x 8'",
    image: "/images/cat_dining.png",
    price: 135,
    originalPrice: 189,
    isSale: true,
    rating: 4.5,
    reviews: 228,
    shippingText: "Free Fast Delivery",
    sizesCount: 23,
  },
  {
    id: "10",
    name: "Silva White Indoor/Outdoor Rug",
    size: "Rectangle 5'4\" x 7'",
    image: "/images/hero.png",
    price: 95,
    originalPrice: 129,
    isSale: true,
    rating: 4.5,
    reviews: 910,
    shippingText: "Free Fast Delivery",
    sizesCount: 3,
  },
  {
    id: "11",
    name: "Sola Wool Cream/Black/Light Beige Rug",
    size: "Rectangle 8' x 10'",
    image: "/images/cat_living_room.png",
    price: 549,
    originalPrice: 699,
    isSale: false,
    badgeText: "Limited Time Only",
    rating: 4.5,
    reviews: 419,
    shippingText: "Free Fast Delivery",
    sizesCount: 12,
  },
];

const relatedSearches = [
  "Rugs",
  "Rugs By Size",
  "10' X 14' Rugs",
  "5' X 8' Rugs",
  "Runner Rugs",
  "4' X 6' Rugs",
  "Indoor Rugs",
  "Rug Pads + Mats",
  "9' X 12' Rugs",
  "Rug Pads",
  "8' X 10' Rugs",
  "Outdoor Rugs",
  "6' X 9' Rugs",
  "Jute & Sisal Rugs",
  "Viscose Rugs",
  "Baby + Kids Rugs",
  "Wool Rugs",
  "Area Rugs",
  "Cotton Rugs",
  "Recycled P.E.T. Rugs"
];

function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex text-black text-[10px]">
      {[...Array(fullStars)].map((_, i) => (
        <span key={`full-${i}`}>★</span>
      ))}
      {hasHalfStar && <span>★</span> /* Simplification for half star using full char */}
      {[...Array(emptyStars)].map((_, i) => (
        <span key={`empty-${i}`} className="text-slate-300">★</span>
      ))}
    </div>
  );
}

export default function RugsPage() {
  return (
    <>

      <main className="bg-white">


        {/* Hero Banner */}
        <section className="relative h-[250px] w-full sm:h-[350px] md:h-[450px]">
          <Image
            src="/images/hero.png" // Placeholder
            alt="Rugs"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black/10" />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-5xl font-bold text-white drop-shadow-md sm:text-6xl md:text-[80px]">
              Rugs
            </h1>
          </div>
        </section>

        {/* Category Tiles */}
        <section className="mx-auto max-w-[1400px] px-4 pt-10 sm:px-6">
          <div className="grid grid-cols-3 gap-4">
            {rugCategories.map((cat) => (
              <Link key={cat.title} href="#" className="group block">
                <div className="relative aspect-square overflow-hidden bg-slate-100 sm:aspect-[4/3]">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    className="object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>
                <p className="mt-3 text-center text-[13px] text-slate-900 group-hover:underline">
                  {cat.title}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Filtering and Sort Header */}
        <FilterableProductLayout title="Rugs" itemCount={930}>

          <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:gap-x-6 lg:gap-y-12">
            {products.map((p) => (
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
                      {p.colorCount && <span className="text-[11px] text-slate-500">{p.colorCount} Colors</span>}
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
                    <span className="text-[15px] font-bold text-[#a63f15]">{p.priceStr || `${p.price}`}</span>
                    {(p.origPriceStr || p.originalPrice) && (
                      <span className="text-[12px] text-slate-500 line-through">{p.origPriceStr || `${p.originalPrice}`}</span>
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

        {/* SEO Text Section */}
        <section className="mx-auto max-w-[1400px] px-4 pb-12 pt-8 sm:px-6">
          <h3 className="text-xl font-bold text-slate-950">Rugs</h3>
          <p className="mt-4 text-[13px] leading-6 text-slate-700">
            A modern rug is an essential accent piece for any living room, bedroom or dining room. Contemporary rugs can help define the theme and color palette of a room, protect floors, and absorb the noise of day to day life. A modern rug can protect your floors from everyday wear and tear, and support your feet with comfortable padding, not chilly hardwood or tile flooring. Designer area rugs can also add a sophisticated splash of color and pattern to your bedroom or living room. When shopping for a rug, make sure to consider the size of the rug (5 x 8 is the most common rug size), the weave and material of the rug, and most importantly, its design. If you&apos;re looking to complement a modern aesthetic, look for a modern rug with bold patterns, like chevron or stripes, or abstract designs that make a statement.
          </p>
          <button className="mt-3 text-[13px] text-slate-900 underline underline-offset-2 hover:text-slate-600">
            Read More
          </button>
        </section>

        {/* Related Searches */}
        <section className="mx-auto max-w-[1400px] px-4 pb-20 sm:px-6">
          <h3 className="text-xl font-bold text-slate-950 mb-4">Related Searches</h3>
          <div className="flex flex-wrap gap-2.5">
            {relatedSearches.map((term) => (
              <Link
                key={term}
                href="#"
                className="rounded-full border border-slate-400 bg-white px-4 py-1.5 text-[12px] text-slate-700 hover:border-slate-900 hover:text-slate-900 transition"
              >
                {term}
              </Link>
            ))}
          </div>
        </section>
      </main>


    </>
  );
}
