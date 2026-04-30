import ProductCard, { ProductProps } from "./ProductCard";

const products: ProductProps[] = [
  {
    id: "1",
    name: "Sealy Baby Premium Firm Hypoallergenic Baby Crib Mattress & Toddler Bed Mattress, Waterproof Baby Mattress, 150 Coils, Air Quality Certified, 52\"x28\"",
    brand: "Mattress",
    image: "/images/cat_outdoor.png", // Using placeholders
    price: "$70",
    rating: 4.8,
    reviews: 10597,
    shippingText: "Free Fast Delivery"
  },
  {
    id: "2",
    name: "Graco Premium Crib and Toddler Bed Mattress",
    brand: "Mattress",
    image: "/images/cat_living_room.png",
    price: "$100",
    rating: 4.5,
    reviews: 5830,
    shippingText: "Free 1-Day Delivery"
  },
  {
    id: "3",
    name: "Horizon 6 Drawer Double Dresser",
    brand: "Driftwood",
    image: "/images/cat_bedroom.png",
    price: "$300",
    rating: 4.3,
    reviews: 270,
    colors: [
      { name: "Wood", hex: "#dcb285" },
      { name: "White", hex: "#ffffff" },
      { name: "Brown", hex: "#8b5a2b" },
      { name: "Grey", hex: "#808080" },
      { name: "Black", hex: "#222222" },
    ],
    colorCount: 6
  },
  {
    id: "4",
    name: "Marley 3-in-1 Convertible Crib",
    brand: "Walnut",
    image: "/images/hero.png",
    price: "$249",
    rating: 4.7,
    reviews: 5006,
    shippingText: "Free 2-Day Delivery",
    colors: [
      { name: "Walnut", hex: "#6b4226" },
      { name: "White", hex: "#ffffff" },
      { name: "Grey", hex: "#cccccc" },
      { name: "Black", hex: "#222222" },
    ]
  },
  {
    id: "5",
    name: "Porto Twin Bed",
    brand: "Natural",
    image: "/images/cat_dining.png",
    price: "$259",
    originalPrice: "$300",
    isSale: true,
    isBestSeller: true,
    rating: 4.6,
    reviews: 119,
    shippingText: "Free 1-Day Delivery",
    colors: [
      { name: "Natural", hex: "#e8d3b8" },
      { name: "Brown", hex: "#5c4033" },
      { name: "Green", hex: "#4a5d23" },
    ]
  },
  {
    id: "6",
    name: "Armadi Two Tone Wicker Basket with Handles",
    brand: "Black",
    image: "/images/cat_outdoor.png",
    price: "$70",
    isBestSeller: true,
    rating: 4.8,
    reviews: 365,
    colorCount: 3
  },
  {
    id: "7",
    name: "Piper Swivel Reclining Glider",
    brand: "Cream",
    image: "/images/cat_living_room.png",
    price: "$349",
    rating: 4.6,
    reviews: 2044,
    colors: [
      { name: "Cream", hex: "#f5f5dc" },
      { name: "Green", hex: "#2e8b57" },
      { name: "Light Blue", hex: "#add8e6" },
    ]
  },
  {
    id: "8",
    name: "Birdie 3 in 1 Convertible Crib",
    brand: "Honey",
    image: "/images/cat_bedroom.png",
    price: "$199",
    rating: 4.5,
    reviews: 203,
    colors: [
      { name: "Honey", hex: "#dcb285" },
      { name: "White", hex: "#ffffff" },
      { name: "Walnut", hex: "#6b4226" },
      { name: "Grey", hex: "#808080" },
    ]
  },
  {
    id: "9",
    name: "Solid Wood Upholstered Panel Bed with Rectangular Headboard",
    brand: "Blue, Full",
    image: "/images/hero.png",
    price: "$346",
    originalPrice: "$380",
    rating: 4.4,
    reviews: 103,
    shippingText: "Free Fast Delivery",
    colors: [
      { name: "Blue", hex: "#4682b4" },
      { name: "Cream", hex: "#f5f5dc" },
      { name: "Grey", hex: "#808080" },
    ]
  }
];

export default function ProductGrid() {
  return (
    <section className="bg-white pb-24">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-12">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {/* Pagination placeholder */}
        <div className="mt-16 border-t border-slate-200 pt-8 flex items-center justify-between">
          <button className="px-4 py-2 border border-slate-300 text-sm font-medium text-slate-400 cursor-not-allowed">
            Previous
          </button>
          <div className="text-sm text-slate-700">
            Page 1 of 61
          </div>
          <button className="px-4 py-2 border border-slate-300 text-sm font-medium text-slate-900 hover:bg-slate-50 transition">
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
