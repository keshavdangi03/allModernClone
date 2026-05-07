"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  Package,
  Tags,
  Ticket,
  Star,
  Settings,
  MonitorPlay,
  FileText,
  ChevronDown,
  ChevronRight,
  Menu,
} from "lucide-react";

interface MenuItem {
  title: string;
  path?: string;
  icon?: React.ReactNode;
  submenu?: { title: string; path: string }[];
}

const menuItems: MenuItem[] = [
  { title: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={20} /> },
  { title: "Orders", path: "/orders", icon: <ShoppingCart size={20} /> },
  { title: "Customers", path: "/customers", icon: <Users size={20} /> },
  {
    title: "Products",
    icon: <Package size={20} />,
    submenu: [
      { title: "All Products", path: "/products" },
      { title: "Add Product", path: "/products/add" },
    ],
  },
  {
    title: "Categories",
    icon: <Tags size={20} />,
    submenu: [
      { title: "All Categories", path: "/categories" },
      { title: "Add Category", path: "/categories/add" },
    ],
  },
  { title: "Coupons", path: "/coupons", icon: <Ticket size={20} /> },
  { title: "Reviews", path: "/reviews", icon: <Star size={20} /> },
  {
    title: "Settings",
    icon: <Settings size={20} />,
    submenu: [
      { title: "Account Settings", path: "/settings/account" },
      { title: "User Management", path: "/settings/users" },
    ],
  },
  {
    title: "Customization",
    icon: <MonitorPlay size={20} />,
    submenu: [
      { title: "SEO Settings", path: "/customization/seo" },
      { title: "Header Settings", path: "/customization/header" },
      { title: "Hero Banner", path: "/customization/hero" },
      { title: "Hero Slider", path: "/customization/slider" },
      { title: "Countdown", path: "/customization/countdown" },
      { title: "Privacy Policy", path: "/customization/privacy" },
      { title: "Terms & Conditions", path: "/customization/terms" },
      { title: "Testimonials", path: "/customization/testimonials" },
    ],
  },
  {
    title: "Blog",
    icon: <FileText size={20} />,
    submenu: [
      { title: "Posts", path: "/blog/posts" },
      { title: "Post Authors", path: "/blog/authors" },
      { title: "Post Categories", path: "/blog/categories" },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});

  const toggleSubmenu = (title: string) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-100 flex flex-col h-full overflow-y-auto scrollbar-hide shrink-0 shadow-sm z-10">
      {/* Logo Area */}
      <div className="h-16 flex items-center px-6 border-b border-gray-100 sticky top-0 bg-white z-20">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="bg-blue-600 text-white p-1.5 rounded-lg">
            <ShoppingCart size={24} />
          </div>
          <span className="text-xl font-bold text-gray-800">
            Cozy
            <br />
            <span className="text-sm font-medium text-gray-500 -mt-1 block">commerce</span>
          </span>
        </Link>
      </div>

      {/* Menu Area */}
      <div className="flex-1 py-4 px-4">
        <p className="text-xs font-semibold text-gray-400 mb-4 px-2 tracking-wider">MENU</p>
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const isActive = item.path === pathname || (item.submenu && item.submenu.some((sub) => sub.path === pathname));
            const isOpen = openSubmenus[item.title] || (isActive && openSubmenus[item.title] !== false);

            return (
              <div key={item.title}>
                {item.submenu ? (
                  <div>
                    <button
                      onClick={() => toggleSubmenu(item.title)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors duration-200 ${isActive
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={isActive ? "text-blue-600" : "text-gray-400"}>
                          {item.icon}
                        </span>
                        <span className="text-sm font-medium">{item.title}</span>
                      </div>
                      {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </button>
                    {/* Submenu Dropdown */}
                    {isOpen && (
                      <div className="mt-1 ml-9 space-y-1">
                        {item.submenu.map((sub) => {
                          const isSubActive = pathname === sub.path;
                          return (
                            <Link
                              key={sub.title}
                              href={sub.path}
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${isSubActive
                                ? "text-blue-600 font-medium"
                                : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                                }`}
                            >
                              {sub.title}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.path!}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors duration-200 ${isActive
                      ? "bg-blue-50 text-blue-600 font-medium shadow-sm"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                  >
                    <span className={isActive ? "text-blue-600" : "text-gray-400"}>
                      {item.icon}
                    </span>
                    <span className="text-sm">{item.title}</span>
                  </Link>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
