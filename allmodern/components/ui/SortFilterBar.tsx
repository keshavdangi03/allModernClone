"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, SlidersHorizontal, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import MobileSortFilterMenu from "./MobileSortFilterMenu";
import { FilterOptionsList } from "./FilterOptions";

interface SortFilterBarProps {
  productCount?: number;
  showDesktopFilters?: boolean;
  onToggleDesktopFilters?: () => void;
  selectedSort?: string;
  onSortChange?: (sort: string) => void;
  activeFilters?: any;
  onApplyFilters?: any;
}

const sortOptions = [
  "Recommended",
  "Price Per Item: Low to High",
  "Price Per Item: High to Low"
];

export default function SortFilterBar({ 
  productCount = 546,
  showDesktopFilters = false,
  onToggleDesktopFilters = () => {},
  selectedSort = sortOptions[0],
  onSortChange = () => {},
  activeFilters,
  onApplyFilters
}: SortFilterBarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const filterDropdownRef = useRef<HTMLDivElement>(null);

  // Staged temp state for the entire dropdown
  const [tempFilters, setTempFilters] = useState<any>(null);

  // Initialize/sync tempFilters when activeFilters changes or dropdown opens
  useEffect(() => {
    if (activeFilters) {
      setTempFilters({
        categories: activeFilters.categories || [],
        priceRanges: activeFilters.priceRanges || [],
        minPrice: activeFilters.minPrice ?? 0,
        maxPrice: activeFilters.maxPrice ?? 1000000,
        rating: activeFilters.rating ?? null,
        colors: activeFilters.colors || [],
        brands: activeFilters.brands || [],
        inStockOnly: activeFilters.inStockOnly ?? false,
        isSaleOnly: activeFilters.isSaleOnly ?? false,
      });
    }
  }, [activeFilters, showDesktopFilters]);

  const handleChangeTempFilters = (updated: any) => {
    setTempFilters((prev: any) => ({
      ...prev,
      ...updated,
    }));
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsSortDropdownOpen(false);
      }
      if (
        showDesktopFilters &&
        filterDropdownRef.current &&
        !filterDropdownRef.current.contains(event.target as Node)
      ) {
        onToggleDesktopFilters();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDesktopFilters, onToggleDesktopFilters]);

  // Close dropdown on scroll
  useEffect(() => {
    function handleScroll() {
      if (showDesktopFilters) {
        onToggleDesktopFilters();
      }
    }
    if (showDesktopFilters) {
      window.addEventListener("scroll", handleScroll, { passive: true });
    }
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showDesktopFilters, onToggleDesktopFilters]);

  return (
    <>
      {/* Mobile Sort & Filter Button (Only visible on screens < sm) */}
      <div className="sm:hidden mb-6 border-y border-slate-200 py-3">
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="flex w-full items-center justify-center border border-slate-300 bg-white px-6 py-3 text-[14px] font-medium text-slate-900 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
        >
          <SlidersHorizontal className="mr-2 h-[18px] w-[18px]" strokeWidth={1.5} />
          Sort & Filter
        </button>
      </div>

      {/* Desktop Toolbar (Hidden on screens < sm) */}
      <div className="hidden sm:flex flex-col justify-between gap-4 border-b border-slate-200 pb-4 sm:flex-row sm:items-center">
        <div className="relative" ref={filterDropdownRef}>
          <button 
            onClick={onToggleDesktopFilters}
            className="flex w-[280px] items-center justify-center border border-slate-300 bg-white py-2.5 text-[13px] font-medium text-slate-900 hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <SlidersHorizontal className="mr-2 h-4 w-4" strokeWidth={1.5} />
            {showDesktopFilters ? "Hide Filters" : "Show Filters"}
          </button>

          <AnimatePresence>
            {showDesktopFilters && tempFilters && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15 }}
                className="absolute left-0 top-full z-40 mt-1 w-[350px] border border-slate-300 bg-white shadow-xl flex flex-col max-h-[550px]"
              >
                {/* Scrollable Filters list */}
                <div className="flex-1 overflow-y-auto p-5 pb-2 custom-scrollbar overscroll-contain">
                  <FilterOptionsList 
                    activeFilters={activeFilters}
                    onApplyFilters={onApplyFilters}
                    tempFiltersState={tempFilters}
                    onChangeTempFilters={handleChangeTempFilters}
                    showAccordionButtons={false}
                  />
                </div>

                {/* Fixed Sticky Footer */}
                <div className="shrink-0 border-t border-slate-200 bg-slate-50 px-5 py-4 flex justify-between items-center gap-3">
                  <button
                    onClick={() => {
                      const cleared = {
                        categories: [],
                        priceRanges: [],
                        minPrice: 0,
                        maxPrice: 1000000,
                        rating: null,
                        colors: [],
                        brands: [],
                        inStockOnly: false,
                        isSaleOnly: false,
                      };
                      setTempFilters(cleared);
                      onApplyFilters(cleared);
                      onToggleDesktopFilters();
                    }}
                    className="text-[13px] font-bold text-slate-500 hover:text-slate-900 underline underline-offset-4 cursor-pointer"
                  >
                    Clear All
                  </button>
                  <button
                    onClick={() => {
                      onApplyFilters(tempFilters);
                      onToggleDesktopFilters();
                    }}
                    className="h-9 px-6 bg-[#1f1d24] text-[13px] font-semibold text-white hover:bg-black transition-colors rounded-[3px] shadow-sm flex items-center justify-center active:scale-[0.98] cursor-pointer"
                  >
                    Apply Filters
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center text-[13px]">
          <div className="relative w-[280px]" ref={dropdownRef}>
            <button 
              onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
              className={`flex w-full items-center justify-between border bg-white px-4 py-2 text-[14px] transition-colors focus:outline-none ${isSortDropdownOpen ? "border-blue-600" : "border-slate-300 hover:border-slate-400"}`}
            >
              <div className="flex flex-col items-start">
                <span className="text-[11px] text-slate-500">Sort By</span>
                <span className="font-medium text-slate-900">{selectedSort}</span>
              </div>
              <ChevronDown className={`h-4 w-4 text-slate-500 transition-transform ${isSortDropdownOpen ? "rotate-180 text-blue-600" : ""}`} />
            </button>

            <AnimatePresence>
              {isSortDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 right-0 top-full z-50 mt-1 border border-slate-300 bg-white shadow-lg"
                >
                  <ul className="flex flex-col py-1">
                    {sortOptions.map((option) => (
                      <li key={option}>
                        <button
                          className="flex w-full items-center justify-between px-4 py-3 text-left text-[14px] text-slate-800 hover:bg-slate-50 focus:bg-slate-50 focus:outline-none"
                          onClick={() => {
                            onSortChange(option);
                            setIsSortDropdownOpen(false);
                          }}
                        >
                          {option}
                          {selectedSort === option && <Check className="h-4 w-4 text-slate-900" />}
                        </button>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <MobileSortFilterMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
        productCount={productCount} 
        activeFilters={activeFilters}
        onApplyFilters={onApplyFilters}
      />
    </>
  );
}
