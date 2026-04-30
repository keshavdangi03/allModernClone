import Link from "next/link";
import { ArrowRight } from "lucide-react";

const promos = [
  { title: "Living Room Seating", copy: "Up to 60% off modern sofas & sectionals" },
  { title: "Bedroom Refresh", copy: "Save on beds, nightstands, and bedding" },
  { title: "Decor Essentials", copy: "Shop pillows, lighting, and art" },
  { title: "Outdoor Entertaining", copy: "Brighten patios with lounge & dining sets" },
];

export default function PromoGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {promos.map((promo) => (
        <Link
          key={promo.title}
          href="#"
          className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-orange-600">Limited time</p>
            <h3 className="mt-3 text-xl font-black text-slate-950">{promo.title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">{promo.copy}</p>
          </div>
          <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-950">
            Shop now
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </Link>
      ))}
    </div>
  );
}
