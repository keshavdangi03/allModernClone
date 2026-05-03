
"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { departmentNavItems, desktopMegaMenus } from "@/components/layout/navigation-data";

export default function DepartmentNavigation() {
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeMenu = activeMega ? desktopMegaMenus[activeMega] : null;

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
          {departmentNavItems.map((item) => (
            item.href !== "#" ? (
              <Link
                key={item.label}
                href={item.href}
                onMouseEnter={() => (item.label === "Sale" ? setActiveMega(null) : handleEnter(item.label))}
                className={`inline-flex items-center border-b border-transparent px-0 py-1 transition ${
                  item.label === "Sale" ? "text-red-600 hover:text-red-700" : "hover:border-slate-400 hover:text-slate-950"
                }`}
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
                  {activeMenu.columns.map((column) => (
                    <div key={column.title}>
                      <h3 className="mb-1 text-[15px] font-semibold uppercase tracking-[-0.01em] text-slate-900">
                        {column.title}
                        <span className="ml-1 text-slate-500">›</span>
                      </h3>
                      <div className="space-y-1">
                        {column.links.map((link, idx) => (
                          <Link key={`${column.title}-${link}-${idx}`} href="#" className="block text-[12px] leading-5 text-slate-700 transition hover:text-slate-950 hover:underline">
                            {link}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  {activeMenu.promos.map((promo) => (
                    <Link key={promo.title} href="#" className="block">
                      <div className="relative aspect-[2.2/1] overflow-hidden bg-slate-100">
                        <Image src={promo.image} alt={promo.title} fill className="object-cover" sizes="230px" />
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
