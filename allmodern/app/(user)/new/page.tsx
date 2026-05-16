import Image from "next/image";
import { ChevronDown, Heart } from "lucide-react";
import FilterableProductLayout from "@/components/ui/FilterableProductLayout";
import SortFilterBar from "@/components/ui/SortFilterBar";

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

        <FilterableProductLayout title="New Arrivals" itemCount={53} products={products} categoryName="New"></FilterableProductLayout>
      </main>
    </>
  );
}
