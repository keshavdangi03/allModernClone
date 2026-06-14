"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { getProducts } from "@/lib/actions/products";
import SortFilterBar from "./SortFilterBar";
import DesktopFilterSidebar from "./DesktopFilterSidebar";
import CategoryProductCard, { Product } from "./CategoryProductCard";

interface FilterableProductLayoutProps {
  title: string;
  itemCount?: number;
  products?: Product[];
  categoryName?: string;
  children?: React.ReactNode;
}

export default function FilterableProductLayout({ title, itemCount, products = [], categoryName = "", children }: FilterableProductLayoutProps) {
  const [showDesktopFilters, setShowDesktopFilters] = useState(true);
  const [isSticky, setIsSticky] = useState(false);
  const stickyTriggerRef = useRef<HTMLDivElement>(null);
  const sectionEndRef = useRef<HTMLDivElement>(null);

  // Dynamic Products State
  const [dynamicProducts, setDynamicProducts] = useState<Product[]>([]);
  const [combinedProducts, setCombinedProducts] = useState<Product[]>([]);

  // Filter/Sort/Pagination States
  const [sortBy, setSortBy] = useState("Recommended");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const [activeFilters, setActiveFilters] = useState({
    categories: [] as string[],
    priceRanges: [] as string[],
    minPrice: 0,
    maxPrice: 1000000,
    rating: null as number | null,
    colors: [] as string[],
    brands: [] as string[],
    inStockOnly: false,
    isSaleOnly: false,
  });

  const handleApplyFilters = (updatedFilters: Partial<typeof activeFilters>) => {
    setActiveFilters((prev) => ({ ...prev, ...updatedFilters }));
    setCurrentPage(1); // reset pagination on filter change
  };

  // 1. Fetch Dynamic Products from PostgreSQL
  useEffect(() => {
    getProducts()
      .then((allProducts) => {
        const filtered = allProducts.filter((p: any) => 
          p.categories?.some((cat: string) => 
            cat === categoryName || cat.startsWith(`${categoryName} >`) || cat === title || cat.startsWith(`${title} >`)
          )
        );
        // Normalize dynamic products to match Product type
        const normalized = filtered.map((p: any) => ({
          ...p,
          price: typeof p.price === 'string' ? parseFloat(p.price) : p.price,
          originalPrice: p.discountedPrice ? parseFloat(p.discountedPrice) : p.originalPrice,
          badge: p.discountedPrice ? "Sale" : p.badge,
          colors: p.colors || (Array.isArray(p.variants) ? p.variants : [])
        }));
        setDynamicProducts(normalized);
      })
      .catch((err) => console.error("Failed to get products from database", err));
  }, [categoryName, title]);

  // 2. Combine static and dynamic (Static will soon be phased out)
  useEffect(() => {
    setCombinedProducts([...dynamicProducts, ...(products || [])]);
  }, [dynamicProducts, products]);

  // 3. Apply Filters and Sort
  const processedProducts = useMemo(() => {
    let result = [...combinedProducts];

    // Sale filter
    if (activeFilters.isSaleOnly) {
      result = result.filter(p => 
        p.badge?.toLowerCase().includes("sale") || 
        (p.originalPrice && Number(p.price) < Number(p.originalPrice))
      );
    }

    // Category filter
    if (activeFilters.categories.length > 0) {
      result = result.filter(p => 
        p.categories?.some((cat: string) => 
          activeFilters.categories.some(selectedCat => 
            cat.toLowerCase().includes(selectedCat.toLowerCase())
          )
        )
      );
    }

    // Price range filters
    if (activeFilters.priceRanges.length > 0) {
      result = result.filter(p => {
        const priceVal = Number(p.price || 0);
        return activeFilters.priceRanges.some((range) => {
          if (range === "Under $50") return priceVal < 50;
          if (range === "$50 to $100") return priceVal >= 50 && priceVal <= 100;
          if (range === "$100 to $200") return priceVal >= 100 && priceVal <= 200;
          if (range === "$200 to $300") return priceVal >= 200 && priceVal <= 300;
          if (range === "$300 to $400") return priceVal >= 300 && priceVal <= 400;
          if (range === "$400 to $500") return priceVal >= 400 && priceVal <= 500;
          if (range === "$500 & Above") return priceVal >= 500;
          return true;
        });
      });
    }

    // Price bounds input filter
    if (activeFilters.minPrice > 0 || activeFilters.maxPrice < 1000000) {
      result = result.filter(p => {
        const priceVal = Number(p.price || 0);
        return priceVal >= activeFilters.minPrice && priceVal <= activeFilters.maxPrice;
      });
    }

    // Rating filter
    if (activeFilters.rating) {
      result = result.filter(p => p.rating && p.rating >= activeFilters.rating!);
    }

    // Brand filter
    if (activeFilters.brands.length > 0) {
      result = result.filter(p => 
        activeFilters.brands.some(selectedBrand => {
          const textToSearch = `${p.name} ${(p as any).description || ""}`.toLowerCase();
          return textToSearch.includes(selectedBrand.toLowerCase());
        })
      );
    }

    // Color filter (via name/desc match and hex maps)
    if (activeFilters.colors.length > 0) {
      const hexColorMap: Record<string, string[]> = {
        "Black": ["#000000", "#000", "#1f1d24", "#333333", "#333", "#121212", "#171717", "#212121", "#474441"],
        "Gray": ["#6c6c6c", "#ccc", "#ccc9bf", "#beb8ac", "#ced5d6", "#4a4a4a"],
        "White": ["#ffffff", "#fff", "#fcfcfc", "#f0efe8", "#ece9e1", "#f1efed", "#f3efe7", "#e8e0d5"],
        "Brown": ["#5c3a21", "#8b5a2b", "#8b4513", "#c19a6b", "#aaa39b", "#e8dbc9", "#d9c8b8", "#a0522d"],
        "Red": ["#d81b21", "#8b0000", "#c00", "#d5526f"],
        "Green": ["#18a221", "#5a684b", "#646d4f", "#6c7c5f", "#6f7250"],
        "Blue": ["#255ba4", "#0b105d", "#1e3a8a", "#6b8197", "#96bad1", "#5d7f89", "#1d3557", "#b6cad8"],
        "Yellow": ["#f9de58", "#ffcc00"],
        "Beige": ["#d4c3a3", "#dbd5ca", "#ece8e2", "#c4c0b6", "#d9d8d2"],
        "Gold": ["#d4af37", "#aa8017"],
        "Silver": ["#e5e5e5", "#a3a3a3"]
      };

      result = result.filter(p => {
        const productColors: string[] = p.colors || [];
        const matchesHex = productColors.some(hex => 
          activeFilters.colors.some(selectedColor => {
            const hexes = hexColorMap[selectedColor] || [];
            return hexes.includes(hex.toLowerCase());
          })
        );
        if (matchesHex) return true;

        const textToSearch = `${p.name} ${p.subtitle || ""} ${(p as any).description || ""}`.toLowerCase();
        const matchesText = activeFilters.colors.some(selectedColor => 
          textToSearch.includes(selectedColor.toLowerCase())
        );
        return matchesText;
      });
    }

    // Sort
    if (sortBy === "Price Per Item: Low to High") {
      result.sort((a, b) => {
        const pA = typeof a.price === 'number' ? a.price : parseFloat((a.priceStr || a.price || "0").toString().replace(/[^0-9.]/g, ''));
        const pB = typeof b.price === 'number' ? b.price : parseFloat((b.priceStr || b.price || "0").toString().replace(/[^0-9.]/g, ''));
        return pA - pB;
      });
    } else if (sortBy === "Price Per Item: High to Low") {
      result.sort((a, b) => {
        const pA = typeof a.price === 'number' ? a.price : parseFloat((a.priceStr || a.price || "0").toString().replace(/[^0-9.]/g, ''));
        const pB = typeof b.price === 'number' ? b.price : parseFloat((b.priceStr || b.price || "0").toString().replace(/[^0-9.]/g, ''));
        return pB - pA;
      });
    }

    return result;
  }, [combinedProducts, activeFilters, sortBy]);

  // 4. Pagination
  const totalPages = Math.ceil(processedProducts.length / itemsPerPage);
  const currentItems = processedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    // Reset to page 1 if filters change and we are out of bounds
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  // Sticky header logic
  useEffect(() => {
    const triggerEl = stickyTriggerRef.current;
    const endEl = sectionEndRef.current;
    if (!triggerEl || !endEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "0px 0px 0px 0px" }
    );

    observer.observe(triggerEl);

    const endObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsSticky(false);
        }
      },
      { threshold: 0 }
    );

    endObserver.observe(endEl);

    return () => {
      observer.disconnect();
      endObserver.disconnect();
    };
  }, []);

  // For sort change
  const handleSortChange = (newSort: string) => {
    setSortBy(newSort);
    setCurrentPage(1); // reset page on sort
  };

  return (
    <section className="mx-auto max-w-[1400px] px-4 pb-16 pt-8 sm:px-6">
      {/* Header */}
      <div className="flex items-end gap-2 pb-6">
        <h2 className="text-2xl font-bold text-slate-950 sm:text-[28px]">{title}</h2>
        <span className="pb-1 text-[13px] text-slate-600">{processedProducts.length.toLocaleString()} Items</span>
      </div>

      <div ref={stickyTriggerRef} className="h-0 w-full" aria-hidden="true" />

      <div
        className={`
          sm:relative sm:top-auto sm:z-auto sm:bg-transparent sm:shadow-none
          transition-shadow duration-200
          ${isSticky 
            ? "fixed top-0 left-0 right-0 z-[90] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] sm:static sm:shadow-none" 
            : ""
          }
        `}
      >
        {isSticky && (
          <div className="sm:hidden px-4 pt-3 pb-1 border-b border-slate-100">
            <div className="flex items-end gap-2">
              <h2 className="text-lg font-bold text-slate-950">{title}</h2>
              <span className="pb-0.5 text-[12px] text-slate-500">{processedProducts.length.toLocaleString()} Items</span>
            </div>
          </div>
        )}

        <div className={isSticky ? "px-4 sm:px-0 pb-2 sm:pb-0" : ""}>
          <SortFilterBar 
            productCount={processedProducts.length}
            showDesktopFilters={showDesktopFilters}
            onToggleDesktopFilters={() => setShowDesktopFilters(!showDesktopFilters)}
            selectedSort={sortBy}
            onSortChange={handleSortChange}
          />
        </div>
      </div>

      {isSticky && <div className="sm:hidden h-[72px]" aria-hidden="true" />}

      <div className="mt-6 flex flex-col sm:flex-row items-start">
        {showDesktopFilters && (
          <div className="hidden sm:block shrink-0 overflow-hidden w-[280px]">
            <DesktopFilterSidebar 
              activeFilters={activeFilters}
              onApplyFilters={handleApplyFilters}
            />
          </div>
        )}

        <div className="flex-1 w-full pt-4">
          {products.length > 0 || dynamicProducts.length > 0 ? (
            <>
              {/* Product Grid */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:gap-x-6 lg:gap-y-12">
                {currentItems.map((p) => (
                  <CategoryProductCard key={p.id} p={p} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-16 flex items-center justify-center gap-3">
                  <button 
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="flex h-10 w-10 items-center justify-center border border-slate-300 bg-white text-slate-400 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed" 
                    aria-label="Previous page"
                  >
                    <svg className="h-4 w-4 rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </button>
                  <div className="flex items-center gap-4 text-[13px] text-slate-700">
                    {[...Array(totalPages)].map((_, i) => {
                      const page = i + 1;
                      // Simple pagination display: show first, last, and around current
                      if (
                        page === 1 || 
                        page === totalPages || 
                        (page >= currentPage - 1 && page <= currentPage + 1)
                      ) {
                        return (
                          <button 
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={currentPage === page ? "font-bold underline underline-offset-4" : "hover:underline"}
                          >
                            {page}
                          </button>
                        );
                      } else if (
                        page === currentPage - 2 || 
                        page === currentPage + 2
                      ) {
                        return <span key={page}>...</span>;
                      }
                      return null;
                    })}
                  </div>
                  <button 
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="flex h-10 w-10 items-center justify-center border border-slate-900 bg-white text-slate-900 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed" 
                    aria-label="Next page"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </button>
                </div>
              )}
            </>
          ) : (
            // Fallback for pages that haven't been migrated yet
            children
          )}
        </div>
      </div>

      <div ref={sectionEndRef} className="h-0 w-full" aria-hidden="true" />
    </section>
  );
}
