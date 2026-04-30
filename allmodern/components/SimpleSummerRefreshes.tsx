import Image from "next/image";
import Link from "next/link";

export default function SimpleSummerRefreshes() {
  return (
    <section className="bg-white py-12 sm:py-20">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <div className="mb-8">
          <h2 className="text-[36px] sm:text-[48px] font-black tracking-tight text-slate-950">
            Simple Summer Refreshes
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <Link href="#" className="group block">
            <div className="relative aspect-[4/3] overflow-hidden bg-[#f4f4f4] mb-3">
              <Image
                src="/images/cat_outdoor.png" // Placeholder
                alt="Outdoor Tabletop"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>
            <h3 className="text-[17px] font-bold text-slate-950 mt-4">
              Shop Outdoor Tabletop From $25
            </h3>
          </Link>
          
          <Link href="#" className="group block">
            <div className="relative aspect-[4/3] overflow-hidden bg-[#f4f4f4] mb-3">
              <Image
                src="/images/cat_living_room.png" // Placeholder
                alt="Outdoor Lighting"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>
            <h3 className="text-[17px] font-bold text-slate-950 mt-4">
              Shop Outdoor Lighting From $80
            </h3>
          </Link>
        </div>
      </div>
    </section>
  );
}
