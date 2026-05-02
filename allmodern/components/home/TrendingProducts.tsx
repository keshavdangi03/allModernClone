import ProductCard from "@/components/ui/ProductCard";

const products = [
  {
    name: "Miller 56\" Upholstered Loveseat",
    category: "Living Room",
    price: "$529",
    oldPrice: "$629",
    rating: "4.8",
    reviews: "142",
    image: "/images/cat_living_room.png",
    badge: "Sale",
  },
  {
    name: "Bennett Upholstered Swivel Barrel Chair",
    category: "Accent Seating",
    price: "$529",
    oldPrice: "$629",
    rating: "4.7",
    reviews: "98",
    image: "/images/cat_dining.png",
    badge: "Sale",
  },
  {
    name: "Miller 84\" Upholstered Sofa",
    category: "Living Room",
    price: "$1,149",
    oldPrice: "$1,299",
    rating: "4.9",
    reviews: "221",
    image: "/images/hero.png",
    badge: "Sale",
  },
  {
    name: "Miller Upholstered Armchair",
    category: "Occasional Seating",
    price: "$529",
    oldPrice: "$579",
    rating: "4.6",
    reviews: "87",
    image: "/images/cat_living_room.png",
    badge: "Sale",
  },
  {
    name: "Bennett Vegan Leather Swivel Barrel Chair",
    category: "Accent Seating",
    price: "$629",
    oldPrice: "$799",
    rating: "4.7",
    reviews: "103",
    image: "/images/cat_bedroom.png",
    badge: "Sale",
  },
];

export default function TrendingProducts() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 sm:py-14">
      <div className="mb-7 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-orange-600">New Arrivals</p>
          <h2 className="mt-2 text-[clamp(1.8rem,4vw,3rem)] font-black tracking-[-0.03em] text-slate-950">
            New Arrivals?
            <span className="block">Right Here.</span>
          </h2>
        </div>
        <button className="inline-flex h-10 items-center justify-center rounded-full border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-950 shadow-sm transition hover:border-slate-300">
          View all new arrivals
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-5">
        {products.map((product) => (
          <ProductCard key={product.name} product={product} />
        ))}
      </div>
    </section>
  );
}
