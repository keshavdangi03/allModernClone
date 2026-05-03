"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { FilterOptionsList } from "./FilterOptions";

interface MobileSortFilterMenuProps {
  isOpen: boolean;
  onClose: () => void;
  productCount?: number;
}

export default function MobileSortFilterMenu({ isOpen, onClose, productCount = 546 }: MobileSortFilterMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed inset-0 z-[100] flex flex-col bg-white"
        >
          {/* Header */}
          <div className="flex shrink-0 items-center justify-between border-b border-slate-200 px-4 py-4">
            <div className="w-6" /> {/* Spacer */}
            <h2 className="text-[16px] font-bold text-slate-950">Sort & Filter</h2>
            <button onClick={onClose} className="p-1 text-slate-500 hover:text-slate-900 focus:outline-none">
              <X className="h-5 w-5 stroke-[1.5]" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-5 pb-24 pt-2">
            <FilterOptionsList isMobile={true} />
          </div>

          {/* Fixed Footer */}
          <div className="shrink-0 border-t border-slate-200 bg-white p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
            <div className="flex gap-4">
              <button 
                className="w-1/3 border border-slate-300 bg-white py-3.5 text-[15px] font-medium text-slate-500 transition hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                onClick={() => {}}
              >
                Clear All
              </button>
              <button 
                className="w-2/3 bg-[#222222] py-3.5 text-[15px] font-medium text-white transition hover:bg-black focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                onClick={onClose}
              >
                Show {productCount} Products
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
