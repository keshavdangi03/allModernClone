"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, SlidersHorizontal, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import MobileSortFilterMenu from "./MobileSortFilterMenu";

interface SortFilterBarProps {
  productCount?: number;
  showDesktopFilters?: boolean;
  onToggleDesktopFilters?: () => void;
}

const sortOptions = [
  "Recommended",
  "Price Per Item: Low to High",
  "Price Per Item: High to Low"
];

export default function SortFilterBar({ 
  productCount = 546,
  showDesktopFilters = false,
  onToggleDesktopFilters = () => {}
}: SortFilterBarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState(sortOptions[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsSortDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
        <button 
          onClick={onToggleDesktopFilters}
          className="flex w-[280px] items-center justify-center border border-slate-300 bg-white py-2.5 text-[13px] font-medium text-slate-900 hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          <SlidersHorizontal className="mr-2 h-4 w-4" strokeWidth={1.5} />
          {showDesktopFilters ? "Hide Filters" : "Show Filters"}
        </button>

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
                            setSelectedSort(option);
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
      />
    </>
  );
}
