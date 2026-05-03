"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Search, Check } from "lucide-react";

const colors = [
  { name: "Black", bg: "bg-[#1f1d24]" },
  { name: "Gray", bg: "bg-[#6c6c6c]" },
  { name: "White", bg: "bg-white", border: true },
  { name: "Brown", bg: "bg-[#5c3a21]" },
  { name: "Red", bg: "bg-[#d81b21]" },
  { name: "Orange", bg: "bg-[#f47833]" },
  { name: "Yellow", bg: "bg-[#f9de58]" },
  { name: "Green", bg: "bg-[#18a221]" },
  { name: "Blue", bg: "bg-[#255ba4]" },
  { name: "Navy", bg: "bg-[#0b105d]" },
  { name: "Purple", bg: "bg-[#a181e1]" },
  { name: "Pink", bg: "bg-[#f7aecd]" },
  { name: "Beige", bg: "bg-[#d4c3a3]" },
  { name: "Gold", bg: "bg-gradient-to-br from-[#d4af37] to-[#aa8017]" },
  { name: "Silver", bg: "bg-gradient-to-br from-[#e5e5e5] to-[#a3a3a3]" },
];

const categories = [
  "Patio Umbrellas",
  "Patio Dining Sets",
  "Patio Tables",
  "Patio Sofas",
  "Outdoor Conversation Sets",
  "Patio Dining Chairs",
  "Patio Lounge Chairs",
  "Patio Chaise Lounges",
  "Patio Bar Stools",
  "End Tables",
  "Outdoor Fireplaces",
  "Coffee & Cocktail Tables",
];

const brands = [
  "AllModern",
  "Joss & Main",
  "Blu Dot",
  "Arlmont & Co.",
  "Darby Home Co",
  "Wade Logan®",
  "Birch Lane™",
];

export function AccordionSection({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-slate-200">
      <button
        type="button"
        className="flex w-full items-center justify-between py-4 text-left font-bold text-slate-900 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title}</span>
        {isOpen ? <ChevronUp className="h-5 w-5 text-slate-500" /> : <ChevronDown className="h-5 w-5 text-slate-500" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pb-5">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function CustomCheckbox({ label, id }: { label: React.ReactNode; id: string }) {
  return (
    <label htmlFor={id} className="flex cursor-pointer items-start gap-3 py-1.5 group">
      <div className="relative flex h-[22px] w-[22px] shrink-0 items-center justify-center border-[1.5px] border-slate-400 bg-white group-hover:border-slate-800">
        <input type="checkbox" id={id} className="peer sr-only" />
        <Check className="pointer-events-none hidden h-4 w-4 text-slate-950 peer-checked:block" strokeWidth={3} />
      </div>
      <span className="text-[15px] text-slate-800">{label}</span>
    </label>
  );
}

export function CustomToggle({ label, id, isSale = false }: { label: React.ReactNode; id: string; isSale?: boolean }) {
  return (
    <label htmlFor={id} className="flex cursor-pointer items-center justify-between py-3">
      <div className="flex items-center gap-3">
        <div className="relative inline-flex h-8 w-[56px] items-center rounded-full border border-slate-400 bg-white transition-colors peer-checked:bg-slate-800">
          <input type="checkbox" id={id} className="peer sr-only" />
          <span className="inline-block h-6 w-6 translate-x-1 rounded-full bg-slate-600 transition-transform peer-checked:translate-x-[26px] peer-checked:bg-white" />
        </div>
        <span className={`text-[15px] ${isSale ? "bg-[#8f3a1e] px-2 py-0.5 text-white" : "text-slate-800"}`}>
          {label}
        </span>
      </div>
    </label>
  );
}

export function StarRating({ stars }: { stars: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} className={`text-xl ${s <= stars ? "text-slate-900" : "text-slate-300"}`}>
          {s <= stars ? "★" : "☆"}
        </span>
      ))}
    </div>
  );
}

export function FilterOptionsList({ isMobile = false }: { isMobile?: boolean }) {
  return (
    <>
      {/* Sort (Only on Mobile, Desktop uses dropdown in toolbar) */}
      {isMobile && (
        <div className="mb-2">
          <AccordionSection title="Sort" defaultOpen={true}>
            <div className="flex flex-col gap-2">
              <label className="flex cursor-pointer items-center gap-3 py-2">
                <div className="relative flex h-5 w-5 items-center justify-center rounded-full border-2 border-slate-900">
                  <div className="h-2.5 w-2.5 rounded-full bg-slate-900"></div>
                  <input type="radio" name="sort" value="recommended" className="sr-only" defaultChecked />
                </div>
                <span className="text-[15px] text-slate-800">Recommended</span>
              </label>
              <label className="flex cursor-pointer items-center gap-3 py-2 group">
                <div className="relative flex h-5 w-5 items-center justify-center rounded-full border border-slate-400 group-hover:border-slate-800">
                  <input type="radio" name="sort" value="price_low" className="sr-only" />
                </div>
                <span className="text-[15px] text-slate-800">Price Per Item: Low to High</span>
              </label>
              <label className="flex cursor-pointer items-center gap-3 py-2 group">
                <div className="relative flex h-5 w-5 items-center justify-center rounded-full border border-slate-400 group-hover:border-slate-800">
                  <input type="radio" name="sort" value="price_high" className="sr-only" />
                </div>
                <span className="text-[15px] text-slate-800">Price Per Item: High to Low</span>
              </label>
            </div>
          </AccordionSection>
        </div>
      )}

      {/* Filters (Toggles) */}
      <div className="border-b border-slate-200 py-4">
        {isMobile && <h3 className="mb-2 font-bold text-slate-900">Filters</h3>}
        <CustomToggle id="filter-sale" label="Sale" isSale />
        <CustomToggle id="filter-fast" label={<>Fast Delivery to: <span className="underline">67346</span></>} />
      </div>

      {/* Category Accordion */}
      <AccordionSection title="Category" defaultOpen={true}>
        <div className="flex flex-col gap-1">
          {categories.map((cat, i) => (
            <CustomCheckbox key={i} id={`cat-${i}`} label={cat} />
          ))}
        </div>
      </AccordionSection>

      {/* Price Accordion */}
      <AccordionSection title="Price">
        <div className="mb-4 flex items-center gap-2">
          <div className="flex-1">
            <label className="mb-1 block text-[11px] text-slate-500">Minimum</label>
            <input type="number" defaultValue={0} className="w-full border border-slate-400 px-3 py-2 text-[15px] focus:border-blue-600 focus:outline-none" />
          </div>
          <div className="flex-1">
            <label className="mb-1 block text-[11px] text-slate-500">Maximum</label>
            <input type="number" defaultValue={1000000} className="w-full border border-slate-400 px-3 py-2 text-[15px] focus:border-blue-600 focus:outline-none" />
          </div>
          <button className="mt-[20px] flex h-[42px] w-[42px] items-center justify-center bg-slate-400 text-white hover:bg-slate-500">
            <ChevronDown className="h-5 w-5 -rotate-90" />
          </button>
        </div>
        <div className="flex flex-col gap-1">
          {["Under $50", "$50 to $100", "$100 to $200", "$200 to $300", "$300 to $400", "$400 to $500", "$500 & Above"].map((p, i) => (
            <CustomCheckbox key={i} id={`price-${i}`} label={p} />
          ))}
        </div>
      </AccordionSection>

      {/* Customer Rating Accordion */}
      <AccordionSection title="Customer Rating">
        <div className="flex flex-col gap-2 pt-1">
          <CustomCheckbox id="rating-5" label={<StarRating stars={5} />} />
          <CustomCheckbox id="rating-4" label={<div className="flex items-center gap-2"><StarRating stars={4} /> <span className="text-[14px]">& Up</span></div>} />
          <CustomCheckbox id="rating-3" label={<div className="flex items-center gap-2"><StarRating stars={3} /> <span className="text-[14px]">& Up</span></div>} />
          <CustomCheckbox id="rating-all" label={<span className="text-[15px]">All Reviewed Products</span>} />
        </div>
      </AccordionSection>

      {/* Color Accordion */}
      <AccordionSection title="Color">
        <div className="grid grid-cols-3 gap-2">
          {colors.map((c) => (
            <button key={c.name} className="group flex flex-col items-center focus:outline-none">
              <div className={`mb-1 h-14 w-full border border-slate-200 ${c.bg} group-hover:border-slate-800 focus:ring-2 focus:ring-blue-600`} />
              <span className="text-[13px] text-slate-800">{c.name}</span>
            </button>
          ))}
        </div>
      </AccordionSection>

      {/* Brand Accordion */}
      <AccordionSection title="Brand">
        <div className="mb-4 relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input 
            type="text" 
            placeholder="Search: Brand" 
            className="w-full border border-slate-400 py-2.5 pl-9 pr-8 text-[14px] outline-none focus:border-blue-600"
          />
          <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
        </div>
        <div className="flex flex-col gap-1">
          {brands.map((b, i) => (
            <CustomCheckbox key={i} id={`brand-${i}`} label={b} />
          ))}
        </div>
        <button className="mt-3 flex items-center text-[14px] font-medium text-slate-900 underline decoration-slate-400 underline-offset-4 hover:decoration-slate-900">
          <ChevronDown className="mr-1 h-4 w-4" /> Show More
        </button>
      </AccordionSection>

      {/* Availability Accordion */}
      <AccordionSection title="Availability">
        <CustomCheckbox id="avail-instock" label="In Stock Only" />
      </AccordionSection>

      {/* Special Offers Accordion */}
      <AccordionSection title="Special Offers">
        <CustomCheckbox id="offer-openbox" label="Open Box" />
      </AccordionSection>
    </>
  );
}
