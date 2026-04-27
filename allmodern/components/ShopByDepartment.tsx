import Image from "next/image";
import Link from "next/link";

const departments = [
  { name: "Sofas", image: "/images/cat_living_room.png" },
  { name: "Chairs", image: "/images/cat_dining.png" },
  { name: "Beds", image: "/images/cat_bedroom.png" },
  { name: "Outdoor", image: "/images/cat_outdoor.png" },
  { name: "Rugs", image: "/images/hero.png" },
  { name: "Lighting", image: "/images/cat_living_room.png" },
];

export default function ShopByDepartment() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-12 border-t border-gray-200">
      <div className="flex justify-between items-end mb-8">
        <h2 className="text-3xl font-black text-gray-900 tracking-tighter uppercase">
          Shop by Department
        </h2>
      </div>

      <div className="flex overflow-x-auto pb-8 space-x-6 sm:space-x-8 scrollbar-hide">
        {departments.map((dept, index) => (
          <Link
            key={index}
            href="#"
            className="flex flex-col items-center group min-w-[140px] sm:min-w-[180px]"
          >
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden mb-4 bg-gray-100">
              <Image
                src={dept.image}
                alt={dept.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <span className="text-sm font-bold text-gray-900 tracking-wide hover:underline text-center">
              {dept.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
