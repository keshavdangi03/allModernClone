import Image from "next/image";
import Link from "next/link";

const departments = [
  { name: "Living Room", image: "/images/cat_living_room.png" },
  { name: "Bedroom", image: "/images/cat_bedroom.png" },
  { name: "Dining Room", image: "/images/cat_dining.png" },
  { name: "Rugs", image: "/images/hero.png" },
  { name: "Decor", image: "/images/cat_living_room.png" },
  { name: "Lighting", image: "/images/cat_dining.png" },
  { name: "Outdoor", image: "/images/cat_outdoor.png" },
  { name: "New Arrivals", image: "/images/hero.png" },
];

export default function ShopByDepartment() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-12">
      {/* Title */}
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tighter uppercase">
          Shop by Department
        </h2>
      </div>

      {/* 4-Column Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10">
        {departments.map((dept, index) => (
          <Link
            key={index}
            href="#"
            className="flex flex-col group cursor-pointer"
          >
            <div className="relative w-full aspect-square overflow-hidden mb-3 bg-gray-100">
              <Image
                src={dept.image}
                alt={dept.name}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover group-hover:opacity-90 transition-opacity duration-300"
              />
            </div>
            <span className="text-[15px] sm:text-[16px] font-bold text-gray-900 group-hover:underline text-left">
              {dept.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
