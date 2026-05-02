import Image from "next/image";
import Link from "next/link";

const departments = [
  { name: "Living Room", image: "/images/cat_living_room.png" },
  { name: "Outdoor", image: "/images/cat_outdoor.png" },
  { name: "Bedroom", image: "/images/cat_bedroom.png" },
  { name: "Dining Room", image: "/images/cat_dining.png" },
  { name: "Rugs", image: "/images/hero.png" },
  { name: "Wall Art", image: "/images/cat_living_room.png" },
  { name: "Lighting", image: "/images/cat_dining.png" },
  { name: "Patio Furniture", image: "/images/cat_outdoor.png" },
];

export default function ShopByDepartment() {
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <div className="mb-8">
          <h2 className="text-[26px] md:text-[42px] font-black tracking-tight text-slate-950">
            Shop by Department
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {departments.map((dept) => (
            <Link
              key={dept.name}
              href="#"
              className="group block"
            >
              <div className="relative aspect-square overflow-hidden bg-[#f4f4f4] mb-3">
                <Image
                  src={dept.image}
                  alt={dept.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div>
                <h3 className="text-[13px] sm:text-[15px] font-bold text-slate-950">{dept.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
