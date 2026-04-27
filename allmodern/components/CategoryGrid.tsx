import Image from "next/image";
import Link from "next/link";

const gridItems = [
  {
    title: "Living Room Seating",
    image: "/images/cat_living_room.png",
    colSpan: "col-span-1 md:col-span-2",
    rowSpan: "row-span-2",
  },
  {
    title: "Modern Beds",
    image: "/images/cat_bedroom.png",
    colSpan: "col-span-1 md:col-span-1",
    rowSpan: "row-span-1",
  },
  {
    title: "Dining Sets",
    image: "/images/cat_dining.png",
    colSpan: "col-span-1 md:col-span-1",
    rowSpan: "row-span-1",
  },
  {
    title: "Outdoor Living",
    image: "/images/cat_outdoor.png",
    colSpan: "col-span-1 md:col-span-2",
    rowSpan: "row-span-1",
  },
];

export default function CategoryGrid() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-16">
      <div className="flex justify-between items-end mb-8">
        <h2 className="text-3xl font-black text-gray-900 tracking-tight">
          Curated Spaces
        </h2>
        <Link href="#" className="text-sm font-bold text-primary hover:text-orange-700 transition-colors uppercase tracking-wider">
          View All &rarr;
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-auto gap-4 md:gap-6">
        {gridItems.map((item, index) => (
          <Link
            key={index}
            href="#"
            className={`group relative overflow-hidden rounded-2xl ${item.colSpan} ${item.rowSpan} min-h-[250px] md:min-h-[300px] shadow-sm hover:shadow-2xl transition-shadow duration-500`}
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-in-out"
            />
            {/* Gradient overlay for text */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-white/80 text-sm font-medium uppercase tracking-wider flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                Shop Now <span className="ml-2">&rarr;</span>
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
