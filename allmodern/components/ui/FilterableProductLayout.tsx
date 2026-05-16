"use client";

import { useState, useRef, useEffect, useMemo } from "react";
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
  const [isSaleOnly, setIsSaleOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // 1. Fetch Dynamic Products
  useEffect(() => {
    const loadProducts = (parsed: any[]) => {
      const filtered = parsed.filter((p: any) => 
        p.categories?.some((cat: string) => 
          cat === categoryName || cat.startsWith(`${categoryName} >`) || cat === title || cat.startsWith(`${title} >`)
        )
      );
      // Normalize dynamic products to match Product type
      const normalized = filtered.map((p: any) => ({
        ...p,
        price: typeof p.price === 'string' ? parseFloat(p.price) : p.price,
        originalPrice: p.discountedPrice ? parseFloat(p.discountedPrice) : p.originalPrice,
        badge: p.discountedPrice ? "Sale" : p.badge
      }));
      setDynamicProducts(normalized);
    };

    const saved = localStorage.getItem("allmodern_admin_products");
    const isSeeded = localStorage.getItem("allmodern_catalog_seeded");
    
    let currentProducts: any[] = [];
    if (saved) {
      try {
        currentProducts = JSON.parse(saved);
        // Purge old mock products (ID 1-8) that lack categories
        const cleanProducts = currentProducts.filter(p => p.categories && p.categories.length > 0);
        
        if (cleanProducts.length !== currentProducts.length) {
          currentProducts = cleanProducts;
          localStorage.setItem("allmodern_admin_products", JSON.stringify(currentProducts));
        }
        
        loadProducts(currentProducts);
      } catch (e) {
        console.error("Failed to parse local products", e);
      }
    }

    if (!isSeeded || currentProducts.length < 20) {
      // Fetch the global catalog if localStorage is missing or not seeded
      fetch("/data/catalog.json")
        .then(res => res.json())
        .then(catalogData => {
          // Merge to protect user-added items
          const existingIds = new Set(currentProducts.map(p => String(p.id)));
          const newItems = catalogData.filter((p: any) => !existingIds.has(String(p.id)));
          
          if (newItems.length > 0) {
            const merged = [...currentProducts, ...newItems];
            localStorage.setItem("allmodern_admin_products", JSON.stringify(merged));
            loadProducts(merged);
          }
          localStorage.setItem("allmodern_catalog_seeded", "true");
        })
        .catch(err => console.error("Failed to load catalog.json", err));
    }
  }, [categoryName, title]);

  // 2. Combine static and dynamic (Static will soon be phased out)
  useEffect(() => {
    setCombinedProducts([...dynamicProducts, ...(products || [])]);
  }, [dynamicProducts, products]);

  // 3. Apply Filters and Sort
  const processedProducts = useMemo(() => {
    let result = [...combinedProducts];

    // Filter
    if (isSaleOnly) {
      result = result.filter(p => 
        p.badge?.toLowerCase().includes("sale") || 
        (p.originalPrice && Number(p.price) < Number(p.originalPrice))
      );
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
  }, [combinedProducts, isSaleOnly, sortBy]);

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
              isSaleOnly={isSaleOnly}
              onToggleSale={() => setIsSaleOnly(!isSaleOnly)}
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
