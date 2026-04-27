import { Search, User, ShoppingCart, Menu, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <div className="relative z-50 bg-white border-b border-gray-300">
      {/* Top Utility Bar */}
      <div className="bg-gray-900 text-white text-[11px] py-1.5 px-4 hidden sm:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center tracking-wider">
          <div className="flex space-x-6">
            <Link href="#" className="hover:underline">App</Link>
            <Link href="#" className="hover:underline">Financing</Link>
            <Link href="#" className="hover:underline">Professional</Link>
          </div>
          <div>
            <span className="font-bold">FREE SHIPPING OVER $35*</span>
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
              placeholder="Find anything home..."
              className="w-full bg-white border-b-2 border-gray-900 py-2 pl-2 pr-10 text-sm focus:outline-none placeholder-gray-500 rounded-none transition-colors"
            />
            <Search className="absolute right-2 top-2 h-5 w-5 text-gray-900" />
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
          <button className="hidden sm:flex text-gray-900 hover:text-primary transition-colors flex-col items-center">
            <User className="h-6 w-6" strokeWidth={1.5} />
            <span className="text-[11px] mt-1 font-bold uppercase tracking-wider">Sign In</span>
          </button>
          <button className="text-gray-900 hover:text-primary transition-colors flex flex-col items-center relative">
            <ShoppingCart className="h-6 w-6" strokeWidth={1.5} />
            <span className="absolute top-0 right-0 -mt-1 -mr-2 bg-primary text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">0</span>
            <span className="text-[11px] mt-1 font-bold uppercase tracking-wider hidden sm:block">Cart</span>
          </button>
        </div>
      </div>

      {/* Promo Banner */}
      <div className="bg-[#FF4500] text-white text-xs font-bold text-center py-2 px-4 tracking-widest uppercase cursor-pointer hover:bg-orange-700 transition-colors">
        3 DAYS ONLY. BIG SALE OF THE YEAR. UP TO 70% OFF. <span className="underline ml-2">SHOP NOW</span>
      </div>

      {/* Navigation & Mega Menu */}
      <div className="hidden sm:block border-t border-gray-200 relative group/nav">
        <div className="max-w-[1400px] mx-auto px-4 flex justify-center space-x-8">
          {['Furniture', 'Outdoor', 'Rugs', 'Decor', 'Lighting', 'Bed & Bath'].map((item) => (
            <div key={item} className="group/item">
              <Link href="#" className="flex items-center text-sm font-bold text-gray-900 py-4 uppercase tracking-widest hover:text-primary border-b-2 border-transparent hover:border-primary transition-all">
                {item}
              </Link>
              
              {/* Mega Menu Dropdown */}
              <div className="absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-100 hidden group-hover/item:flex h-[400px] z-50 p-8 transition-opacity duration-200">
                <div className="max-w-[1400px] mx-auto w-full flex">
                  {/* Links columns */}
                  <div className="flex-1 grid grid-cols-4 gap-8">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-4 border-b pb-2">{item} Categories</h4>
                      <ul className="space-y-3 text-sm text-gray-600">
                        <li><Link href="#" className="hover:underline hover:text-primary">Sofas & Sectionals</Link></li>
                        <li><Link href="#" className="hover:underline hover:text-primary">Chairs & Seating</Link></li>
                        <li><Link href="#" className="hover:underline hover:text-primary">Coffee Tables</Link></li>
                        <li><Link href="#" className="hover:underline hover:text-primary">TV Stands</Link></li>
                        <li><Link href="#" className="hover:underline hover:text-primary">Bookcases</Link></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-4 border-b pb-2">Trending</h4>
                      <ul className="space-y-3 text-sm text-gray-600">
                        <li><Link href="#" className="hover:underline hover:text-primary">Minimalist Living</Link></li>
                        <li><Link href="#" className="hover:underline hover:text-primary">Mid-Century Modern</Link></li>
                        <li><Link href="#" className="hover:underline hover:text-primary">Industrial</Link></li>
                        <li><Link href="#" className="hover:underline hover:text-primary">Scandinavian</Link></li>
                      </ul>
                    </div>
                  </div>
                  {/* Promo Image inside menu */}
                  <div className="w-[300px] bg-gray-100 relative group/promo overflow-hidden cursor-pointer">
                    <Image src="/images/cat_living_room.png" alt="Promo" fill className="object-cover group-hover/promo:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <span className="bg-white text-black font-bold uppercase tracking-widest px-6 py-2 text-sm">Shop {item}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <Link href="#" className="flex items-center text-sm font-bold text-red-600 py-4 uppercase tracking-widest hover:text-red-800 border-b-2 border-transparent hover:border-red-600 transition-all">
            Sale
          </Link>
        </div>
      </div>
    </div>
  );
}

