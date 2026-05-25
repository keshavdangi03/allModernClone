"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Pencil, Trash2, Plus, Filter, Copy } from "lucide-react";
import { deleteProduct } from "@/lib/actions/products";

interface Product {
  id: string;
  name: string;
  price: number | null;
  originalPrice: number | null;
  image: string;
  categories: string[];
  slug: string;
  reviews: number | null;
}

export default function ProductsTable() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Filter state
  const [filterName, setFilterName] = useState("");
  const [filterModel, setFilterModel] = useState("");
  const [filterPrice, setFilterPrice] = useState("");
  const [filterQuantity, setFilterQuantity] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [activeFilters, setActiveFilters] = useState({ name: "", model: "", price: "", quantity: "", status: "" });

  useEffect(() => {
    fetch("/api/admin/products")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          setError("Unexpected response format: " + JSON.stringify(data));
        }
      })
      .catch((err) => {
        console.error("Failed to fetch products:", err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  const itemsPerPage = 10;

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Filter by Product Name
      if (activeFilters.name && !p.name.toLowerCase().includes(activeFilters.name.toLowerCase())) return false;
      // Filter by Model (matches against product ID)
      if (activeFilters.model && !p.id.toLowerCase().includes(activeFilters.model.toLowerCase())) return false;
      // Filter by Price (max price — show products at or below entered price)
      if (activeFilters.price) {
        const maxPrice = parseFloat(activeFilters.price);
        if (!isNaN(maxPrice) && (p.price ?? 0) > maxPrice) return false;
      }
      // Filter by Quantity (min quantity — show products with at least this many reviews)
      if (activeFilters.quantity) {
        const minQty = parseInt(activeFilters.quantity, 10);
        if (!isNaN(minQty) && (p.reviews ?? 0) < minQty) return false;
      }
      // Filter by Status — all products are enabled currently
      if (activeFilters.status === "disabled") return false;
      return true;
    });
  }, [products, activeFilters]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const applyFilter = () => {
    setActiveFilters({ name: filterName, model: filterModel, price: filterPrice, quantity: filterQuantity, status: filterStatus });
    setCurrentPage(1);
  };

  const clearFilter = () => {
    setFilterName("");
    setFilterModel("");
    setFilterPrice("");
    setFilterQuantity("");
    setFilterStatus("");
    setActiveFilters({ name: "", model: "", price: "", quantity: "", status: "" });
    setCurrentPage(1);
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedIds(e.target.checked ? paginatedProducts.map((p) => p.id) : []);
  };

  const handleSelect = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  const handleDelete = async (productId: string) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    const res = await deleteProduct(productId);
    if (res.success) {
      setProducts((prev) => prev.filter((p) => p.id !== productId));
      setSelectedIds((prev) => prev.filter((id) => id !== productId));
    } else {
      alert(`Failed to delete: ${res.error}`);
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedIds.length === 0) return;
    if (!window.confirm(`Delete ${selectedIds.length} selected product(s)?`)) return;
    await Promise.all(selectedIds.map((id) => deleteProduct(id)));
    setProducts((prev) => prev.filter((p) => !selectedIds.includes(p.id)));
    setSelectedIds([]);
  };

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (n) => n === 1 || n === totalPages || (n >= currentPage - 2 && n <= currentPage + 2)
  );

  return (
    <div className="flex flex-col min-h-[600px] text-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-normal text-gray-700">
          Products <span className="text-base text-gray-400 ml-1">Home &rsaquo; Products</span>
        </h1>
        <div className="flex items-center gap-1">
          <Link
            href="/products/add"
            className="bg-[#1e91cf] hover:bg-[#1978ab] text-white p-2 rounded flex items-center justify-center transition-colors"
            title="Add New"
          >
            <Plus size={16} />
          </Link>
          <button
            className="bg-[#f3f7f9] hover:bg-[#e4ecef] border border-[#d2e2e7] text-gray-600 p-2 rounded flex items-center justify-center transition-colors"
            title="Copy"
          >
            <Copy size={16} />
          </button>
          <button
            onClick={handleDeleteSelected}
            className="bg-[#f56b6b] hover:bg-[#e45c5c] text-white p-2 rounded flex items-center justify-center transition-colors"
            title="Delete Selected"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="flex gap-4 items-start">
        {/* Main Table */}
        <div className="flex-1 bg-white border border-[#e4e4e4] rounded shadow-sm">
          <div className="border-b border-[#e4e4e4] px-4 py-3 bg-[#f5f5f5] flex items-center gap-2 text-gray-600 font-semibold text-sm">
            &#9776; Product List
          </div>

          {/* Loading / Error states */}
          {loading && (
            <div className="p-8 text-center text-gray-500">
              <div className="inline-block w-6 h-6 border-2 border-[#1e91cf] border-t-transparent rounded-full animate-spin mb-2"></div>
              <div>Loading products...</div>
            </div>
          )}

          {error && (
            <div className="p-8 text-center text-red-500">
              <div className="font-semibold mb-1">Error loading products</div>
              <div className="text-sm">{error}</div>
            </div>
          )}

          {!loading && !error && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e4e4e4] bg-white">
                    <th className="px-3 py-3 w-[40px] border-r border-[#e4e4e4] text-center">
                      <input
                        type="checkbox"
                        onChange={handleSelectAll}
                        checked={paginatedProducts.length > 0 && selectedIds.length === paginatedProducts.length}
                        className="cursor-pointer"
                      />
                    </th>
                    <th className="px-3 py-3 border-r border-[#e4e4e4] text-center w-[80px] text-gray-600">Image</th>
                    <th className="px-3 py-3 border-r border-[#e4e4e4] text-[#1e91cf] font-medium">Product Name &#9650;</th>
                    <th className="px-3 py-3 border-r border-[#e4e4e4] text-[#1e91cf] font-medium">Model</th>
                    <th className="px-3 py-3 border-r border-[#e4e4e4] text-[#1e91cf] font-medium text-right">Price</th>
                    <th className="px-3 py-3 border-r border-[#e4e4e4] text-[#1e91cf] font-medium text-right">Quantity</th>
                    <th className="px-3 py-3 text-gray-600 text-right w-[100px]">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedProducts.map((product) => (
                    <tr key={product.id} className="border-b border-[#eeeeee] hover:bg-[#f9f9f9]">
                      <td className="px-3 py-3 text-center border-r border-[#eeeeee]">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(product.id)}
                          onChange={() => handleSelect(product.id)}
                          className="cursor-pointer"
                        />
                      </td>
                      <td className="px-3 py-3 border-r border-[#eeeeee] text-center">
                        <div className="w-10 h-10 border border-[#e4e4e4] rounded p-0.5 mx-auto bg-white flex items-center justify-center overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={product.image}
                            alt={product.name}
                            className="max-w-full max-h-full object-contain"
                            onError={(e) => {
                              e.currentTarget.src = "/images/hero.png";
                            }}
                          />
                        </div>
                      </td>
                      <td className="px-3 py-3 border-r border-[#eeeeee] max-w-[260px]">
                        <div className="text-[#1e91cf] font-medium truncate" title={product.name}>{product.name}</div>
                        <div className="text-[#8fbb6c] text-xs mt-0.5">Enabled</div>
                      </td>
                      <td className="px-3 py-3 border-r border-[#eeeeee] text-gray-600 text-xs">
                        {product.id.substring(0, 14)}
                      </td>
                      <td className="px-3 py-3 border-r border-[#eeeeee] text-right whitespace-nowrap">
                        {product.originalPrice ? (
                          <div className="line-through text-gray-400 text-xs">${product.originalPrice.toFixed(2)}</div>
                        ) : null}
                        <div className={product.originalPrice ? "text-[#f56b6b] font-medium" : "text-gray-700"}>
                          ${(product.price ?? 0).toFixed(2)}
                        </div>
                      </td>
                      <td className="px-3 py-3 border-r border-[#eeeeee] text-right">
                        <span className={`text-white px-2 py-0.5 rounded text-xs font-medium ${(product.reviews ?? 0) > 100 ? "bg-[#8fbb6c]" : "bg-[#f0ad4e]"}`}>
                          {product.reviews ?? 0}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-right">
                        <div className="flex items-center justify-end gap-0">
                          <Link
                            href={`/products/add?id=${product.id}`}
                            title="Edit"
                            className="bg-[#1e91cf] hover:bg-[#1978ab] text-white px-2.5 py-1.5 rounded-l border-r border-[#1978ab]/40 transition-colors"
                          >
                            <Pencil size={13} />
                          </Link>
                          <button
                            onClick={() => handleDelete(product.id)}
                            title="Delete"
                            className="bg-[#f56b6b] hover:bg-[#e45c5c] text-white px-2.5 py-1.5 rounded-r transition-colors"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {paginatedProducts.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                        No products found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {!loading && !error && filteredProducts.length > 0 && (
            <div className="px-4 py-3 border-t border-[#e4e4e4] flex items-center justify-between text-sm flex-wrap gap-2">
              <div className="flex items-center gap-0">
                <button
                  onClick={() => goToPage(1)}
                  disabled={currentPage === 1}
                  className="px-2.5 py-1 border border-[#ddd] bg-[#f5f5f5] text-[#1e91cf] hover:bg-[#e8e8e8] disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  |&lt;
                </button>
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-2.5 py-1 border-y border-r border-[#ddd] bg-[#f5f5f5] text-[#1e91cf] hover:bg-[#e8e8e8] disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  &lt;
                </button>
                {pageNumbers.map((pageNum, idx) => {
                  const prevNum = pageNumbers[idx - 1];
                  const showEllipsis = prevNum && pageNum - prevNum > 1;
                  return (
                    <React.Fragment key={pageNum}>
                      {showEllipsis && (
                        <span className="px-2.5 py-1 border-y border-r border-[#ddd] bg-[#f5f5f5] text-gray-500">
                          ...
                        </span>
                      )}
                      <button
                        onClick={() => goToPage(pageNum)}
                        className={`px-2.5 py-1 border-y border-r border-[#ddd] ${
                          currentPage === pageNum
                            ? "bg-[#1e91cf] text-white"
                            : "bg-[#f5f5f5] text-[#1e91cf] hover:bg-[#e8e8e8]"
                        }`}
                      >
                        {pageNum}
                      </button>
                    </React.Fragment>
                  );
                })}
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-2.5 py-1 border-y border-r border-[#ddd] bg-[#f5f5f5] text-[#1e91cf] hover:bg-[#e8e8e8] disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  &gt;
                </button>
                <button
                  onClick={() => goToPage(totalPages)}
                  disabled={currentPage === totalPages}
                  className="px-2.5 py-1 border-y border-r border-[#ddd] bg-[#f5f5f5] text-[#1e91cf] hover:bg-[#e8e8e8] disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  &gt;|
                </button>
              </div>
              <div className="text-gray-500">
                Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                {Math.min(currentPage * itemsPerPage, filteredProducts.length)} of {filteredProducts.length} (
                {totalPages} Pages)
              </div>
            </div>
          )}
        </div>

        {/* Filter Sidebar */}
        <div className="w-[250px] shrink-0 bg-white border border-[#e4e4e4] rounded shadow-sm">
          {/* Filter Header */}
          <div className="border-b border-[#e4e4e4] px-4 py-2.5 bg-[#f5f5f5] flex items-center gap-2 text-gray-700 font-semibold text-sm">
            <Filter size={14} className="text-gray-500" /> Filter
          </div>
          <div className="p-4 flex flex-col gap-3">
            {/* Product Name */}
            <div>
              <label className="block text-gray-800 font-semibold mb-1 text-sm">Product Name</label>
              <input
                type="text"
                placeholder="Product Name"
                value={filterName}
                onChange={(e) => setFilterName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && applyFilter()}
                className="w-full border border-[#cccccc] px-3 py-[7px] text-sm rounded-sm focus:border-[#66afe9] focus:outline-none focus:shadow-[0_0_0_3px_rgba(102,175,233,0.3)] placeholder:text-gray-400"
              />
            </div>
            {/* Model */}
            <div>
              <label className="block text-gray-800 font-semibold mb-1 text-sm">Model</label>
              <input
                type="text"
                placeholder="Model"
                value={filterModel}
                onChange={(e) => setFilterModel(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && applyFilter()}
                className="w-full border border-[#cccccc] px-3 py-[7px] text-sm rounded-sm focus:border-[#66afe9] focus:outline-none focus:shadow-[0_0_0_3px_rgba(102,175,233,0.3)] placeholder:text-gray-400"
              />
            </div>
            {/* Price */}
            <div>
              <label className="block text-gray-800 font-semibold mb-1 text-sm">Price</label>
              <input
                type="number"
                placeholder="Price"
                value={filterPrice}
                onChange={(e) => setFilterPrice(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && applyFilter()}
                className="w-full border border-[#cccccc] px-3 py-[7px] text-sm rounded-sm focus:border-[#66afe9] focus:outline-none focus:shadow-[0_0_0_3px_rgba(102,175,233,0.3)] placeholder:text-gray-400"
              />
            </div>
            {/* Quantity */}
            <div>
              <label className="block text-gray-800 font-semibold mb-1 text-sm">Quantity</label>
              <input
                type="number"
                placeholder="Quantity"
                value={filterQuantity}
                onChange={(e) => setFilterQuantity(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && applyFilter()}
                className="w-full border border-[#cccccc] px-3 py-[7px] text-sm rounded-sm focus:border-[#66afe9] focus:outline-none focus:shadow-[0_0_0_3px_rgba(102,175,233,0.3)] placeholder:text-gray-400"
              />
            </div>
            {/* Status */}
            <div>
              <label className="block text-gray-800 font-semibold mb-1 text-sm">Status</label>
              <div className="relative">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full border border-[#cccccc] px-3 py-[7px] text-sm rounded-sm focus:border-[#66afe9] focus:outline-none focus:shadow-[0_0_0_3px_rgba(102,175,233,0.3)] bg-white appearance-none pr-8"
                >
                  <option value=""></option>
                  <option value="enabled">Enabled</option>
                  <option value="disabled">Disabled</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>
            </div>
            {/* Buttons */}
            <div className="flex items-center justify-between pt-1">
              {(activeFilters.name || activeFilters.model || activeFilters.price || activeFilters.quantity || activeFilters.status) && (
                <button
                  onClick={clearFilter}
                  className="text-xs text-gray-500 hover:text-red-500 underline transition-colors"
                >
                  Clear
                </button>
              )}
              <button
                onClick={applyFilter}
                className="ml-auto bg-[#f3f7f9] border border-[#aaaaaa] text-gray-700 hover:bg-[#e4ecef] px-4 py-1.5 rounded-sm flex items-center gap-1.5 text-sm transition-colors font-medium"
              >
                <Filter size={13} /> Filter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
