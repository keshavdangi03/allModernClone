"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Pencil, Trash2, Plus, ArrowLeft, ArrowRight } from "lucide-react";

// Initial products are now fetched from /data/catalog.json

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Force re-seed to get subcategories
    const isSubcategorySeeded = localStorage.getItem("allmodern_subcategory_seeded_v3");
    if (!isSubcategorySeeded) {
      localStorage.removeItem("allmodern_admin_products");
      localStorage.removeItem("allmodern_catalog_seeded");
      localStorage.setItem("allmodern_subcategory_seeded_v3", "true");
    }

    const saved = localStorage.getItem("allmodern_admin_products");
    const isSeeded = localStorage.getItem("allmodern_catalog_seeded");
    
    let currentProducts: any[] = [];
    if (saved) {
      currentProducts = JSON.parse(saved);
      // Purge old mock products (ID 1-8) that lack categories
      const cleanProducts = currentProducts.filter(p => p.categories && p.categories.length > 0);
      
      if (cleanProducts.length !== currentProducts.length) {
        currentProducts = cleanProducts;
        localStorage.setItem("allmodern_admin_products", JSON.stringify(currentProducts));
      }

      setProducts(currentProducts);
      setIsLoaded(true);
    }

    if (!isSeeded || currentProducts.length < 20) {
      fetch("/data/catalog.json")
        .then((res) => res.json())
        .then((catalogData) => {
          // Merge existing products with catalog (keep existing user additions)
          // The catalog has IDs like "furniture_mg1", user items probably have numbers
          const existingIds = new Set(currentProducts.map(p => String(p.id)));
          const newItems = catalogData.filter((p: any) => !existingIds.has(String(p.id)));
          
          if (newItems.length > 0) {
            const merged = [...currentProducts, ...newItems];
            setProducts(merged);
            localStorage.setItem("allmodern_admin_products", JSON.stringify(merged));
          }
          localStorage.setItem("allmodern_catalog_seeded", "true");
          setIsLoaded(true);
        })
        .catch((err) => {
          console.error("Failed to load catalog", err);
          setIsLoaded(true);
        });
    }
  }, []);

  const itemsPerPage = 6;
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleDelete = (productId: any) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const updatedProducts = products.filter(p => p.id !== productId);
      setProducts(updatedProducts);
      localStorage.setItem("allmodern_admin_products", JSON.stringify(updatedProducts));
      
      // If we deleted the last item on the current page, go back one page
      if (updatedProducts.length > 0 && currentPage > Math.ceil(updatedProducts.length / itemsPerPage)) {
        setCurrentPage(Math.max(1, currentPage - 1));
      }
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col min-h-[600px]">
      {/* Header */}
      <div className="p-6 border-b border-gray-50 flex items-center justify-between">
        <h2 className="text-lg font-bold text-[#1f2937]">All Products</h2>
        <Link 
          href="/products/add" 
          className="bg-[#1f2937] hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
        >
          <Plus size={16} />
          Add Product
        </Link>
      </div>

      {/* Product Grid */}
      <div className="p-6 flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedProducts.map((product) => (
            <div key={product.id} className="group">
              <div className="border border-gray-100 rounded-xl p-4 flex flex-col h-[280px] bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="flex-1 relative w-full mb-4 flex items-center justify-center overflow-hidden rounded-lg bg-gray-50/50">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="object-contain max-h-full mix-blend-multiply w-[200px] h-[200px]"
                    onError={(e) => (e.currentTarget.style.display = 'none')}
                    onLoad={(e) => (e.currentTarget.style.display = 'block')}
                  />
                  {/* Category Badges */}
                  {product.categories && product.categories.length > 0 && (
                    <div className="absolute top-2 left-2 flex flex-wrap gap-1 max-w-[90%] z-10 pointer-events-none">
                      {product.categories.slice(0, 2).map((cat: string) => (
                        <span 
                          key={cat} 
                          className="bg-white/95 backdrop-blur-sm text-[10px] font-semibold text-gray-700 px-2 py-1 rounded shadow-sm border border-gray-200 truncate max-w-[120px]"
                          title={cat}
                        >
                          {cat.split(' > ').pop()}
                        </span>
                      ))}
                      {product.categories.length > 2 && (
                        <span className="bg-white/95 backdrop-blur-sm text-[10px] font-bold text-gray-700 px-2 py-1 rounded shadow-sm border border-gray-200">
                          +{product.categories.length - 2}
                        </span>
                      )}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-auto">
                  <Link 
                    href={`/products/add?id=${product.id}`}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2.5 text-sm font-medium flex items-center justify-center gap-2 transition-colors"
                  >
                    <Pencil size={16} />
                    Edit Product
                  </Link>
                  <button 
                    onClick={() => handleDelete(product.id)}
                    className="w-10 h-10 border border-gray-200 rounded-lg flex items-center justify-center text-gray-500 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-colors shrink-0"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <p className="mt-3 text-sm font-medium text-gray-700 px-1 line-clamp-2">
                {product.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="p-6 border-t border-gray-50 flex items-center justify-center sm:justify-end gap-2 mt-auto">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ArrowLeft size={16} />
          Previous
        </button>

        <div className="flex items-center gap-1">
          {[...Array(totalPages)].map((_, idx) => {
            const pageNum = idx + 1;
            return (
              <button
                key={pageNum}
                onClick={() => goToPage(pageNum)}
                className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                  currentPage === pageNum
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Next
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
