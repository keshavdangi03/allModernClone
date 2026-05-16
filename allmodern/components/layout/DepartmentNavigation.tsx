"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { departmentNavItems, desktopMegaMenus, categoryMenus } from "@/components/layout/navigation-data";

export default function DepartmentNavigation() {
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  const [dynamicCategoryMenus, setDynamicCategoryMenus] = useState<any>(categoryMenus);
  const [dynamicDepartmentNavItems, setDynamicDepartmentNavItems] = useState<any[]>(departmentNavItems);
  const [dynamicMegaMenus, setDynamicMegaMenus] = useState<any>(desktopMegaMenus);

  useEffect(() => {
    const loadCategories = () => {
      const saved = localStorage.getItem("allmodern_admin_categories");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          const newCategoryMenus: any = {};
          const newMegaMenus: any = {};
          const newDepartmentNavItems: any[] = [];
          
          parsed.forEach((cat: any) => {
            // Skip duplicates
            if (newDepartmentNavItems.find((n) => n.label === cat.title)) return;
            // Look up the canonical href from static nav data (fixes old IDs like "Furniture" → /furniture)
            const canonical = departmentNavItems.find(
              (n) => n.label.toLowerCase() === cat.title.toLowerCase()
            );
            const href = canonical
              ? canonical.href
              : `/${cat.id.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}`;
            newDepartmentNavItems.push({ label: cat.title, href, color: cat.color || "" });
            newCategoryMenus[cat.title] = {
              image: cat.image,
              badge: cat.badge,
              sections: cat.sections
            };
            newMegaMenus[cat.title] = {
              columns: cat.sections.map((s: any) => ({
                title: s.title,
                links: s.links
              })),
              promos: cat.image ? [{ title: `Shop ${cat.title}`, image: cat.image }] : []
            };
          });
          
          // Fallbacks for critical categories if they are missing from localStorage
          if (!newDepartmentNavItems.find(n => n.label.toLowerCase() === "new")) {
            newDepartmentNavItems.unshift({ label: "New", href: "/new", color: "" });
            newCategoryMenus["New"] = categoryMenus["New"] || { image: "", badge: "", sections: [] };
          }
          if (!newDepartmentNavItems.find(n => n.label.toLowerCase() === "sale")) {
            newDepartmentNavItems.push({ label: "Sale", href: "/sale", color: "#e43216" });
            newCategoryMenus["Sale"] = categoryMenus["Sale"] || { image: "", badge: "", sections: [] };
          }
          
          setDynamicDepartmentNavItems(newDepartmentNavItems);
          setDynamicCategoryMenus(newCategoryMenus);
          setDynamicMegaMenus(newMegaMenus);
        } catch (e) {
          console.error("Failed to parse categories", e);
        }
      }
    };
    
    loadCategories();
    window.addEventListener("storage", loadCategories);
    return () => window.removeEventListener("storage", loadCategories);
  }, []);

  const activeMenu = activeMega ? dynamicMegaMenus[activeMega] : null;

  const handleEnter = (label: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveMega(label);
  };

  const handleLeave = () => {
    closeTimeoutRef.current = setTimeout(() => setActiveMega(null), 100);
  };

  const handleToggle = (label: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveMega((current) => (current === label ? null : label));
  };

  return (
    <div
      className="relative bg-white"
      onMouseLeave={handleLeave}
      onMouseEnter={() => {
        if (closeTimeoutRef.current) {
          clearTimeout(closeTimeoutRef.current);
          closeTimeoutRef.current = null;
        }
      }}
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <nav className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 py-2 text-[11px] font-semibold text-slate-800 sm:gap-x-5">
          {dynamicDepartmentNavItems.map((item) => (
            item.href !== "#" ? (
              <Link
                key={item.label}
                href={item.href}
                onMouseEnter={() => (item.label === "Sale" || item.color ? setActiveMega(null) : handleEnter(item.label))}
                className={`inline-flex items-center border-b border-transparent px-0 py-1 transition hover:border-current hover:opacity-80`}
                style={{ color: item.color || undefined }}
              >
                {item.label}
              </Link>
            ) : (
              <button
                key={item.label}
                type="button"
                onMouseEnter={() => handleEnter(item.label)}
                onFocus={() => handleEnter(item.label)}
                onClick={() => handleToggle(item.label)}
                aria-expanded={activeMega === item.label}
                className="inline-flex items-center border-b border-transparent px-0 py-1 transition hover:border-slate-400 hover:text-slate-950"
              >
                {item.label}
              </button>
            )
          ))}
        </nav>
      </div>

      <AnimatePresence>
        {activeMenu ? (
          <motion.div
            className="absolute inset-x-0 top-full z-40 border-t border-slate-200 bg-white shadow-sm"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.11, ease: "easeOut" }}
          >
            <div className="mx-auto max-w-[1400px] px-4 pb-4 pt-3 sm:px-6">
              <div className="grid grid-cols-[1fr_230px] gap-8">
                <div className="grid gap-x-8" style={{ gridTemplateColumns: `repeat(${Math.max(activeMenu.columns.length, 1)}, minmax(0, 1fr))` }}>
                  {activeMenu.columns.map((column: any) => (
                    <div key={column.title}>
                      <h3 className="mb-1 text-[15px] font-semibold uppercase tracking-[-0.01em] text-slate-900">
                        {column.title}
                        <span className="ml-1 text-slate-500">›</span>
                      </h3>
                      <div className="space-y-1">
                        {column.links.map((link: string, idx: number) => (
                          <Link key={`${column.title}-${link}-${idx}`} href="#" className="block text-[12px] leading-5 text-slate-700 transition hover:text-slate-950 hover:underline">
                            {link}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  {activeMenu.promos?.map((promo: any) => (
                    <Link key={promo.title} href="#" className="block">
                      <div className="relative aspect-[2.2/1] overflow-hidden bg-slate-100">
                        <Image src={promo.image || "/images/hero.png"} alt={promo.title} fill className="object-cover" sizes="230px" />
                      </div>
                      <p className="pt-1 text-[12px] font-semibold leading-4 text-slate-900">{promo.title}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
