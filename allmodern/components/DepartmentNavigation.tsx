
import React, { FC } from "react";
import Link from "next/link";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Collections", href: "https://www.allmodern.com/collections" },
  { label: "Best Sellers", href: "https://www.allmodern.com/daily-sales/shop-our-best-sellers~e308590.html?fromNEM=true&unifiedeventid=459479" },
  { label: "Inspiration", href: "https://www.allmodern.com/m/modern-inspo-hub" },
  { label: "Seasonal Catalog", href: "https://www.allmodern.com/catalog" },
  { label: "Shop by Style", href: "https://www.allmodern.com/shop-by-style~b413.html" },
  { label: "Free Design Services", href: "https://www.allmodern.com/design-services?src=second_nav" },
];

const DepartmentNavigation: FC = () => {
  return (
    <nav aria-label="Department Navigation" className="hidden sm:block border-b-1 border-gray-200 bg-white">
      <div className="max-w-[1400px] mx-auto px-4">
        <ul className="flex justify-center gap-8 py-2 text-sm">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link 
                href={item.href} 
                className="text-gray-700 transition-colors hover:text-blue uppercase tracking-widest text-xs font-semibold  border-b-[2px] border-transparent hover:border-black transition-all"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default DepartmentNavigation;
