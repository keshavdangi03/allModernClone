import { SlidersHorizontal, ChevronDown } from "lucide-react";

export default function CategoryToolbar() {
  return (
    <section className="bg-white pt-8 pb-4">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <div className="flex items-baseline gap-3 mb-6">
          <h2 className="text-[22px] font-bold text-slate-950">Baby + Kids</h2>
          <span className="text-[14px] text-slate-500">547 Items</span>
        </div>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <button className="flex items-center gap-2 border border-slate-300 px-6 py-2.5 text-[14px] font-medium text-slate-900 hover:bg-slate-50 transition w-full sm:w-auto justify-center sm:justify-start">
            <SlidersHorizontal className="w-[18px] h-[18px]" />
            Show Filters
          </button>
          
          <div className="relative w-full sm:w-auto">
            <label className="absolute -top-2 left-3 bg-white px-1 text-[11px] text-slate-500">Sort By</label>
            <select className="w-full sm:w-[220px] appearance-none border border-slate-300 px-4 py-2.5 text-[14px] text-slate-900 bg-white focus:outline-none focus:border-slate-500 pr-10">
              <option>Recommended</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Customer Rating</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
