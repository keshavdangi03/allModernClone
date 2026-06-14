"use client";

import { useState, useEffect } from "react";
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
  selectedCount = 0,
  onApply,
  onClear,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  selectedCount?: number;
  onApply?: () => void;
  onClear?: () => void;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-slate-200 py-1">
      <button
        type="button"
        className="flex w-full items-center justify-between py-4 text-left font-bold text-slate-900 focus:outline-none hover:text-[#1a237e] transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="flex items-center gap-2">
          {title}
          {selectedCount > 0 && (
            <span className="inline-flex items-center justify-center bg-indigo-100 text-indigo-800 text-[11px] font-bold h-5 px-1.5 rounded-full">
              {selectedCount}
            </span>
          )}
        </span>
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
            <div className="pb-5">
              <div className="max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
                {children}
              </div>
              
              {/* Action Buttons for Apply / Clear */}
              {(onApply || onClear) && (
                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3.5">
                  {onClear ? (
                    <button
                      type="button"
                      onClick={onClear}
                      className="text-xs font-semibold text-gray-500 hover:text-slate-950 underline underline-offset-4"
                    >
                      Clear
                    </button>
                  ) : <div />}
                  {onApply && (
                    <button
                      type="button"
                      onClick={onApply}
                      className="h-8 px-4 bg-[#1f1d24] text-xs font-semibold text-white hover:bg-black transition-colors rounded-[3px] shadow-sm flex items-center justify-center gap-1 active:scale-[0.98]"
                    >
                      Apply
                    </button>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function CustomCheckbox({ 
  label, 
  id, 
  checked, 
  onChange 
}: { 
  label: React.ReactNode; 
  id: string; 
  checked?: boolean; 
  onChange?: (checked: boolean) => void;
}) {
  return (
    <label htmlFor={id} className="flex cursor-pointer items-start gap-3 py-1.5 group">
      <div className="relative flex h-[22px] w-[22px] shrink-0 items-center justify-center border-[1.5px] border-slate-400 bg-white group-hover:border-slate-800">
        <input 
          type="checkbox" 
          id={id} 
          className="peer sr-only" 
          checked={checked || false}
          onChange={(e) => onChange && onChange(e.target.checked)}
        />
        <Check className="pointer-events-none hidden h-4 w-4 text-slate-950 peer-checked:block" strokeWidth={3} />
      </div>
      <span className="text-[15px] text-slate-800">{label}</span>
    </label>
  );
}

export function CustomToggle({ 
  label, 
  id, 
  isSale = false, 
  checked, 
  onChange 
}: { 
  label: React.ReactNode; 
  id: string; 
  isSale?: boolean; 
  checked?: boolean; 
  onChange?: () => void;
}) {
  return (
    <label htmlFor={id} className="flex cursor-pointer items-center justify-between py-3">
      <div className="flex items-center gap-3">
        <div className="relative inline-flex h-8 w-[56px] items-center rounded-full border border-slate-400 bg-white transition-colors peer-checked:bg-slate-800">
          <input 
            type="checkbox" 
            id={id} 
            className="peer sr-only" 
            checked={checked || false} 
            onChange={onChange} 
          />
          <span className="inline-block h-6 w-6 translate-x-1 rounded-full bg-slate-600 transition-transform peer-checked:translate-x-[26px] peer-checked:bg-white" />
        </div>
        <span className={`text-[15px] ${isSale ? "bg-[#8f3a1e] px-2 py-0.5 text-white font-medium text-xs rounded" : "text-slate-800"}`}>
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

export function FilterOptionsList({ 
  isMobile = false, 
  activeFilters, 
  onApplyFilters,
  tempFiltersState,
  onChangeTempFilters,
  showAccordionButtons = true,
}: { 
  isMobile?: boolean;
  activeFilters: {
    categories: string[];
    priceRanges: string[];
    minPrice: number;
    maxPrice: number;
    rating: number | null;
    colors: string[];
    brands: string[];
    inStockOnly: boolean;
    isSaleOnly: boolean;
  };
  onApplyFilters: (updated: any) => void;
  tempFiltersState?: any;
  onChangeTempFilters?: (updated: any) => void;
  showAccordionButtons?: boolean;
}) {
  // Staged Temporary Selection States
  const [localCategories, setLocalCategories] = useState<string[]>(activeFilters.categories);
  const [localPriceRanges, setLocalPriceRanges] = useState<string[]>(activeFilters.priceRanges);
  const [localMinPrice, setLocalMinPrice] = useState<number>(activeFilters.minPrice);
  const [localMaxPrice, setLocalMaxPrice] = useState<number>(activeFilters.maxPrice);
  const [localRating, setLocalRating] = useState<number | null>(activeFilters.rating);
  const [localColors, setLocalColors] = useState<string[]>(activeFilters.colors);
  const [localBrands, setLocalBrands] = useState<string[]>(activeFilters.brands);
  const [localInStock, setLocalInStock] = useState<boolean>(activeFilters.inStockOnly);

  // Sync state if parent filter properties change
  useEffect(() => {
    setLocalCategories(activeFilters.categories);
    setLocalPriceRanges(activeFilters.priceRanges);
    setLocalMinPrice(activeFilters.minPrice);
    setLocalMaxPrice(activeFilters.maxPrice);
    setLocalRating(activeFilters.rating);
    setLocalColors(activeFilters.colors);
    setLocalBrands(activeFilters.brands);
    setLocalInStock(activeFilters.inStockOnly);
  }, [activeFilters]);

  // Use controlled state if provided, otherwise fall back to local state
  const tempCategories = tempFiltersState ? tempFiltersState.categories : localCategories;
  const tempPriceRanges = tempFiltersState ? tempFiltersState.priceRanges : localPriceRanges;
  const tempMinPrice = tempFiltersState ? tempFiltersState.minPrice : localMinPrice;
  const tempMaxPrice = tempFiltersState ? tempFiltersState.maxPrice : localMaxPrice;
  const tempRating = tempFiltersState ? tempFiltersState.rating : localRating;
  const tempColors = tempFiltersState ? tempFiltersState.colors : localColors;
  const tempBrands = tempFiltersState ? tempFiltersState.brands : localBrands;
  const tempInStock = tempFiltersState ? tempFiltersState.inStockOnly : localInStock;

  const setTempCategories = (val: string[] | ((prev: string[]) => string[])) => {
    const nextVal = typeof val === 'function' ? val(tempCategories) : val;
    if (onChangeTempFilters && tempFiltersState) {
      onChangeTempFilters({ categories: nextVal });
    } else {
      setLocalCategories(nextVal);
    }
  };

  const setTempPriceRanges = (val: string[] | ((prev: string[]) => string[])) => {
    const nextVal = typeof val === 'function' ? val(tempPriceRanges) : val;
    if (onChangeTempFilters && tempFiltersState) {
      onChangeTempFilters({ priceRanges: nextVal });
    } else {
      setLocalPriceRanges(nextVal);
    }
  };

  const setTempMinPrice = (val: number) => {
    if (onChangeTempFilters && tempFiltersState) {
      onChangeTempFilters({ minPrice: val });
    } else {
      setLocalMinPrice(val);
    }
  };

  const setTempMaxPrice = (val: number) => {
    if (onChangeTempFilters && tempFiltersState) {
      onChangeTempFilters({ maxPrice: val });
    } else {
      setLocalMaxPrice(val);
    }
  };

  const setTempRating = (val: number | null) => {
    if (onChangeTempFilters && tempFiltersState) {
      onChangeTempFilters({ rating: val });
    } else {
      setLocalRating(val);
    }
  };

  const setTempColors = (val: string[] | ((prev: string[]) => string[])) => {
    const nextVal = typeof val === 'function' ? val(tempColors) : val;
    if (onChangeTempFilters && tempFiltersState) {
      onChangeTempFilters({ colors: nextVal });
    } else {
      setLocalColors(nextVal);
    }
  };

  const setTempBrands = (val: string[] | ((prev: string[]) => string[])) => {
    const nextVal = typeof val === 'function' ? val(tempBrands) : val;
    if (onChangeTempFilters && tempFiltersState) {
      onChangeTempFilters({ brands: nextVal });
    } else {
      setLocalBrands(nextVal);
    }
  };

  const setTempInStock = (val: boolean) => {
    if (onChangeTempFilters && tempFiltersState) {
      onChangeTempFilters({ inStockOnly: val });
    } else {
      setLocalInStock(val);
    }
  };

  // Brand search criteria
  const [brandSearch, setBrandSearch] = useState("");
  const filteredBrands = brands.filter(b => b.toLowerCase().includes(brandSearch.toLowerCase()));

  const handlePriceCheckboxChange = (range: string, checked: boolean) => {
    if (checked) {
      setTempPriceRanges([...tempPriceRanges, range]);
    } else {
      setTempPriceRanges(tempPriceRanges.filter(r => r !== range));
    }
  };

  return (
    <>
      {/* Mobile Sort Accordion */}
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
            </div>
          </AccordionSection>
        </div>
      )}

      {/* Immediate Toggles (Sale) */}
      <div className="border-b border-slate-200 py-2">
        {isMobile && <h3 className="mb-2 font-bold text-slate-900">Filters</h3>}
        <CustomToggle 
          id="filter-sale" 
          label="Sale" 
          isSale 
          checked={activeFilters.isSaleOnly} 
          onChange={() => onApplyFilters({ isSaleOnly: !activeFilters.isSaleOnly })} 
        />
        <CustomToggle 
          id="filter-fast" 
          label={<>Fast Delivery to: <span className="underline">02116</span></>} 
          checked={tempInStock}
          onChange={() => {
            const next = !tempInStock;
            setTempInStock(next);
            onApplyFilters({ inStockOnly: next });
          }}
        />
      </div>

      {/* Category Accordion */}
      <AccordionSection 
        title="Category" 
        defaultOpen={true}
        selectedCount={tempCategories.length}
        onApply={showAccordionButtons ? () => onApplyFilters({ categories: tempCategories }) : undefined}
        onClear={showAccordionButtons ? () => {
          setTempCategories([]);
          onApplyFilters({ categories: [] });
        } : undefined}
      >
        <div className="flex flex-col gap-1">
          {categories.map((cat, i) => (
            <CustomCheckbox 
              key={i} 
              id={`cat-${i}`} 
              label={cat} 
              checked={tempCategories.includes(cat)}
              onChange={(checked) => {
                if (checked) {
                  setTempCategories([...tempCategories, cat]);
                } else {
                  setTempCategories(tempCategories.filter(c => c !== cat));
                }
              }}
            />
          ))}
        </div>
      </AccordionSection>

      {/* Price Accordion */}
      <AccordionSection 
        title="Price"
        selectedCount={tempPriceRanges.length + (tempMinPrice > 0 || tempMaxPrice < 1000000 ? 1 : 0)}
        onApply={showAccordionButtons ? () => onApplyFilters({ 
          priceRanges: tempPriceRanges, 
          minPrice: tempMinPrice, 
          maxPrice: tempMaxPrice 
        }) : undefined}
        onClear={showAccordionButtons ? () => {
          setTempPriceRanges([]);
          setTempMinPrice(0);
          setTempMaxPrice(1000000);
          onApplyFilters({ priceRanges: [], minPrice: 0, maxPrice: 1000000 });
        } : undefined}
      >
        <div className="mb-5 flex items-center gap-2">
          <div className="flex-1">
            <label className="mb-1 block text-[10px] font-semibold text-slate-500 uppercase tracking-tight">Min ($)</label>
            <input 
              type="number" 
              value={tempMinPrice} 
              onChange={(e) => setTempMinPrice(Number(e.target.value))}
              className="w-full border border-slate-300 rounded px-2.5 py-1.5 text-xs outline-none focus:border-[#1a237e]" 
            />
          </div>
          <div className="flex-1">
            <label className="mb-1 block text-[10px] font-semibold text-slate-500 uppercase tracking-tight">Max ($)</label>
            <input 
              type="number" 
              value={tempMaxPrice} 
              onChange={(e) => setTempMaxPrice(Number(e.target.value))}
              className="w-full border border-slate-300 rounded px-2.5 py-1.5 text-xs outline-none focus:border-[#1a237e]" 
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          {["Under $50", "$50 to $100", "$100 to $200", "$200 to $300", "$300 to $400", "$400 to $500", "$500 & Above"].map((p, i) => (
            <CustomCheckbox 
              key={i} 
              id={`price-${i}`} 
              label={p} 
              checked={tempPriceRanges.includes(p)}
              onChange={(checked) => handlePriceCheckboxChange(p, checked)}
            />
          ))}
        </div>
      </AccordionSection>

      {/* Customer Rating Accordion */}
      <AccordionSection 
        title="Customer Rating"
        selectedCount={tempRating ? 1 : 0}
        onApply={showAccordionButtons ? () => onApplyFilters({ rating: tempRating }) : undefined}
        onClear={showAccordionButtons ? () => {
          setTempRating(null);
          onApplyFilters({ rating: null });
        } : undefined}
      >
        <div className="flex flex-col gap-2 pt-1">
          <CustomCheckbox 
            id="rating-4" 
            label={<div className="flex items-center gap-2"><StarRating stars={4} /> <span className="text-[13px] text-slate-600 font-medium">& Up</span></div>} 
            checked={tempRating === 4}
            onChange={(checked) => setTempRating(checked ? 4 : null)}
          />
          <CustomCheckbox 
            id="rating-3" 
            label={<div className="flex items-center gap-2"><StarRating stars={3} /> <span className="text-[13px] text-slate-600 font-medium">& Up</span></div>} 
            checked={tempRating === 3}
            onChange={(checked) => setTempRating(checked ? 3 : null)}
          />
        </div>
      </AccordionSection>

      {/* Color Accordion */}
      <AccordionSection 
        title="Color"
        selectedCount={tempColors.length}
        onApply={showAccordionButtons ? () => onApplyFilters({ colors: tempColors }) : undefined}
        onClear={showAccordionButtons ? () => {
          setTempColors([]);
          onApplyFilters({ colors: [] });
        } : undefined}
      >
        <div className="grid grid-cols-3 gap-2">
          {colors.map((c) => {
            const isSelected = tempColors.includes(c.name);
            return (
              <button 
                key={c.name} 
                type="button"
                onClick={() => {
                  if (isSelected) {
                    setTempColors(tempColors.filter(col => col !== c.name));
                  } else {
                    setTempColors([...tempColors, c.name]);
                  }
                }}
                className={`group flex flex-col items-center focus:outline-none p-1 border rounded-[3px] transition-colors ${
                  isSelected ? "border-[#1a237e] bg-indigo-55/30" : "border-transparent hover:bg-slate-50"
                }`}
              >
                <div className={`relative mb-1 h-9 w-9 rounded-full border border-slate-200/80 ${c.bg} shadow-sm flex items-center justify-center`}>
                  {isSelected && (
                    <Check className={`h-4.5 w-4.5 ${c.name === 'White' || c.name === 'Silver' || c.name === 'Yellow' ? 'text-black' : 'text-white'}`} strokeWidth={3.5} />
                  )}
                </div>
                <span className="text-[11px] font-medium text-slate-700 tracking-tight">{c.name}</span>
              </button>
            );
          })}
        </div>
      </AccordionSection>

      {/* Brand Accordion */}
      <AccordionSection 
        title="Brand"
        selectedCount={tempBrands.length}
        onApply={showAccordionButtons ? () => onApplyFilters({ brands: tempBrands }) : undefined}
        onClear={showAccordionButtons ? () => {
          setTempBrands([]);
          onApplyFilters({ brands: [] });
        } : undefined}
      >
        <div className="mb-3.5 relative">
          <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search brand..." 
            value={brandSearch}
            onChange={(e) => setBrandSearch(e.target.value)}
            className="w-full border border-slate-300 rounded pl-8 pr-3 py-1.5 text-xs outline-none focus:border-[#1a237e]"
          />
        </div>
        <div className="flex flex-col gap-1 max-h-[160px] overflow-y-auto custom-scrollbar">
          {filteredBrands.map((b, i) => (
            <CustomCheckbox 
              key={i} 
              id={`brand-${i}`} 
              label={b} 
              checked={tempBrands.includes(b)}
              onChange={(checked) => {
                if (checked) {
                  setTempBrands([...tempBrands, b]);
                } else {
                  setTempBrands(tempBrands.filter(brand => brand !== b));
                }
              }}
            />
          ))}
        </div>
      </AccordionSection>

      {/* Availability Accordion */}
      <AccordionSection 
        title="Availability"
        selectedCount={tempInStock ? 1 : 0}
        onApply={showAccordionButtons ? () => onApplyFilters({ inStockOnly: tempInStock }) : undefined}
        onClear={showAccordionButtons ? () => {
          setTempInStock(false);
          onApplyFilters({ inStockOnly: false });
        } : undefined}
      >
        <CustomCheckbox 
          id="avail-instock" 
          label="In Stock Only" 
          checked={tempInStock}
          onChange={(checked) => setTempInStock(checked)}
        />
      </AccordionSection>
    </>
  );
}
