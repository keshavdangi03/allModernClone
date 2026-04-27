import Link from "next/link";
import { ArrowRight } from "lucide-react";

const promos = [
  "Up to 60% Off Living Room Seating",
  "Up to 50% Off Beds",
  "Up to 60% Off Area Rugs",
  "Up to 40% Off Outdoor Furniture",
  "Up to 50% Off Dining Furniture",
  "Up to 60% Off Lighting",
  "Up to 50% Off Decor & Pillows",
  "Up to 40% Off Wall Art"
];

export default function PromoGrid() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {promos.map((promo, index) => (
          <Link
            key={index}
            href="#"
            className="group flex justify-between items-center bg-gray-900 p-6 h-24 hover:bg-primary transition-colors"
          >
            <span className="text-white font-bold text-sm tracking-wide max-w-[80%] uppercase leading-tight">
              {promo}
            </span>
            <ArrowRight className="text-white h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        ))}
      </div>
    </div>
  );
}
