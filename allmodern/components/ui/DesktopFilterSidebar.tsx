"use client";

import { FilterOptionsList } from "./FilterOptions";

export default function DesktopFilterSidebar({ activeFilters, onApplyFilters }: any) {
  return (
    <div className="hidden sm:block w-[280px] shrink-0 pr-8">
      <div className="sticky top-[120px] max-h-[calc(100vh-140px)] overflow-y-auto pr-2 pb-10">
        <FilterOptionsList isMobile={false} activeFilters={activeFilters} onApplyFilters={onApplyFilters} />
      </div>
    </div>
  );
}
