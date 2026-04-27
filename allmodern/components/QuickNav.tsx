import Link from "next/link";

const categories = [
  { name: "Living Room", href: "#" },
  { name: "Bedroom", href: "#" },
  { name: "Dining & Kitchen", href: "#" },
  { name: "Outdoor Patio", href: "#" },
];

export default function QuickNav() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category) => (
          <Link
            key={category.name}
            href={category.href}
            className="group relative h-24 sm:h-32 bg-gray-900 rounded-xl overflow-hidden flex items-center justify-center shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black opacity-100 group-hover:opacity-80 transition-opacity duration-300"></div>
            <span className="relative z-10 text-white font-bold text-sm sm:text-base md:text-lg tracking-wide uppercase">
              {category.name}
            </span>
            {/* Subtle highlight effect on hover */}
            <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/50 rounded-xl transition-colors duration-300"></div>
          </Link>
        ))}
      </div>
    </div>
  );
}
