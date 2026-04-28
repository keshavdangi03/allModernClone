import { Search, User, ShoppingCart, Menu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import DepartmentNavigation from "./DepartmentNavigation";

const wayfairBrands = [
  { name: "Wayfair", href: "#" },
  { name: "AllModern", href: "#" },
  { name: "Birch Lane", href: "#" },
  { name: "Joss & Main", href: "#" },
  { name: "Perigold", href: "#" },
];

const primaryNavItems = [
  "New",
  "Furniture",
  "Outdoor",
  "Lighting",
  "Decor + Pillows",
  "Wall Decor + Mirrors",
  "Rugs",
  "Bedding",
  "Bath",
  "Kitchen + Tabletop",
  "Storage",
  "Baby + Kids",
];

const furnitureMenu = [
  {
    title: "LIVING ROOM",
    links: [
      "Sofa + Sectional Collections", "Sofas", "Sectionals", "Living Room Accent Collections",
      "Accent + Lounge Chairs", "Sleepers + Daybeds", "Coffee Tables", "End + Side Tables",
      "Console Tables", "TV Stands", "Ottomans, Poufs + Stools", "Benches", "Bookcases + Bookshelves",
      "Quick-Ship Made-To-Order Upholstery"
    ]
  },
  {
    title: "BEDROOM",
    links: [
      "Bedroom Collections", "Beds", "Dressers + Armoires", "Nightstands", "Bedroom Benches",
      "Sleepers + Daybeds", "Headboards", "Mattresses", "Bedroom Sets"
    ]
  },
  {
    title: "HOME OFFICE",
    links: [
      "Home Office Collections", "Desks", "Office Chairs", "Bookcases + Bookshelves", "Filing Cabinets"
    ]
  },
  {
    title: "KITCHEN + DINING ROOM",
    links: [
      "Kitchen + Dining Collections", "Dining Tables", "Dining Chairs + Benches", "Kitchen + Dining Sets",
      "Bar Stools + Counter Stools", "Bar Carts", "Sideboards + Buffets", "China Cabinets"
    ]
  },
  {
    title: "ORGANIZATIONAL FURNITURE",
    links: [
      "Modular Organization Collections", "Accent Cabinets", "Filing Cabinets", "Room Dividers", "Coat Racks + Hooks"
    ]
  },
  {
    title: "GET INSPIRED",
    links: [
      "Shop by Style", "Made-to-Order Upholstery", "Shop Storage + Small Space Solutions", "Shop Sustainable Furniture"
    ]
  }
];

const profileLinks = [
  "My Account",
  "My Orders",
  "My Boards",
  "Review My Purchases",
  "Recently Viewed",
  "Help & Contact",
  "Free Design Services",
  "Gift Card",
  "Wayfair Rewards",
  "AllModern Credit Card",
  "AllModern Financing",
];

export default function Header() {
  return (
    <div className="relative z-50 bg-white border-b border-gray-300">
      {/* Top Utility Bar */}
      <div className="bg-black text-white text-[11px] py-2 px-4 hidden sm:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center tracking-wider">
          <div className="flex space-x-6">
            {wayfairBrands.map((brand) => (
              <Link key={brand.name} href={brand.href} className="hover:underline">
                {brand.name}
              </Link>
            ))}
          </div>
          <div>
            <Link href="#"><span className="font-bold hover:underline">Join the trade program</span></Link>
            <span className="mx-2">|</span>
            <Link href="#"><span className="font-bold hover:underline">Everything shipped FREE*</span></Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 h-20 flex items-center justify-between relative">
        {/* Left: Mobile Menu & Search */}
        <div className="flex items-center flex-1">
          <button type="button" className="sm:hidden text-gray-900 mr-4">
            <Menu className="h-6 w-6" />
          </button>
          
          <div className="hidden sm:flex items-center w-full max-w-md relative group">
            <input
              type="text"
              placeholder="Search"
              className="w-80 bg-white border-b-1 border-gray-200 py-2 pl-9 pr-10 pb-3 text-sm focus:outline-none hover:border-gray-700 placeholder-gray-500 rounded-none transition-colors text-mx-2"
            />
            <Search className="absolute left-2 top-2 h-5 w-5 text-gray-700" />
          </div>
        </div>

        {/* Center: Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Link href="/" className="text-3xl md:text-4xl font-black tracking-tighter text-gray-900 uppercase">
            AllModern
          </Link>
        </div>

        {/* Right: Icons */}
        <div className="flex items-center justify-end flex-1 space-x-6">
          {/* Profile Dropdown Container */}
          <div className="hidden sm:flex flex-col items-center relative group">
            <button className="text-gray-900 hover:text-primary transition-colors flex-col items-center flex cursor-pointer py-2">
              <User className="h-6 w-6" strokeWidth={1.5} />
              <span className="text-[11px] mt-1 font-bold uppercase tracking-wider">Sign In</span>
            </button>
            
            {/* Profile Hover Dropdown */}
            <div className="absolute top-full right-0 mt-0 w-64 bg-white shadow-xl border border-gray-100 hidden group-hover:block z-50 p-6 transition-opacity duration-200">
              <div className="flex flex-col space-y-4">
                <button className="bg-purple-900 text-white font-bold py-3 px-4 w-full rounded hover:bg-purple-800 transition-colors">
                  Sign In
                </button>
                <div className="text-center text-sm">
                  <Link href="#" className="text-gray-600 hover:text-gray-900 underline">
                    Create an Account
                  </Link>
                </div>
                <hr className="border-gray-200 my-2" />
                <ul className="space-y-3">
                  {profileLinks.map((link) => (
                    <li key={link}>
                      <Link href="#" className="text-sm text-gray-700 hover:text-primary hover:underline block">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <button className="text-gray-900 hover:text-primary transition-colors flex flex-col items-center relative">
            <ShoppingCart className="h-6 w-6" strokeWidth={1.5} />
            <span className="absolute top-0 right-0 -mt-1 -mr-2 bg-primary text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">0</span>
            <span className="text-[11px] mt-1 font-bold uppercase tracking-wider hidden sm:block">Cart</span>
          </button>
        </div>
      </div>

      <DepartmentNavigation />

      {/* Navigation & Mega Menu */}
      <div className="hidden lg:block relative group/nav">
        <div className="max-w-[1400px] mx-auto px-4 flex justify-center space-x-6">
          {primaryNavItems.map((item) => (
            <div key={item} className="group/item relative">
              <Link href="#" className="flex items-center text-[12px] font-bold text-gray-900 py-4
               uppercase tracking-widest hover:text-black border-b-[3px] border-transparent hover:border-blue transition-all whitespace-nowrap">
                {item}
              </Link>
              
              {/* Mega Menu Dropdown */}
              {item === "Furniture" && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-[1200px] bg-white shadow-2xl border border-gray-100 hidden group-hover/item:flex z-50 p-8 transition-opacity duration-200 cursor-default">
                  <div className="w-full flex">
                    {/* Links columns */}
                    <div className="flex-1 grid grid-cols-4 gap-8">
                      {furnitureMenu.map((section) => (
                        <div key={section.title}>
                          <h4 className="font-bold text-gray-900 mb-3 text-xs uppercase tracking-wider">{section.title}</h4>
                          <ul className="space-y-2 text-sm text-gray-600">
                            {section.links.map((link) => (
                              <li key={link}>
                                <Link href="#" className="hover:underline hover:text-black text-[13px] text-gray-600 transition-colors">
                                  {link}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
          <Link href="#" className="flex items-center text-[12px] font-bold text-red-600 py-4 uppercase tracking-widest hover:text-red-700 border-b-[3px] border-transparent hover:border-red-600 transition-all whitespace-nowrap">
            SALE
          </Link>
        </div>
      </div>

      {/* Promo Banner */}
      <div className="bg-[#FF4500] text-white text-xs font-bold text-center py-2 px-4 tracking-widest uppercase cursor-pointer hover:bg-orange-700 transition-colors">
        <span className="hover:underline ml-2">Ends Tonight | Up to 70% off Best Sellers + More</span>
      </div>
    </div>
  );
}
