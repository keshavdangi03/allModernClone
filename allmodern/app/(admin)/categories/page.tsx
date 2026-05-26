"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Pencil, Trash2, Plus, Copy, RefreshCw } from "lucide-react";
import { departmentNavItems, categoryMenus } from "@/components/layout/navigation-data";
import { getCategories, resetCategories, deleteCategory } from "@/lib/actions/categories";

function buildDefaultCategories() {
  return departmentNavItems.map((navItem) => {
    const menuKey = Object.keys(categoryMenus).find(
      (k) => k.toLowerCase() === navItem.label.toLowerCase()
    );
    const menuData = menuKey ? (categoryMenus as any)[menuKey] : null;
    return {
      id: navItem.href.replace("/", "") || navItem.label.toLowerCase().replace(/\s+/g, "-"),
      title: navItem.label,
      description: menuData?.description || "",
      image: menuData?.image || "/images/hero.png",
      badge: menuData?.badge || "",
      color: navItem.label === "Sale" ? "#e43216" : "",
      sections: menuData?.sections || [],
    };
  });
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [synced, setSynced] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/admin/categories");
        if (!res.ok) throw new Error("Failed to fetch categories");
        const data = await res.json();
        
        if (data && data.length > 0) {
          setCategories(data);
        } else {
          // If empty, fetch defaults and reset the DB to it
          const defaults = buildDefaultCategories();
          await resetCategories(defaults);
          setCategories(defaults);
        }
      } catch (e) {
        console.error("Failed to load categories from DB", e);
      }
    }
    load();
  }, []);

  const handleSyncDefaults = async () => {
    const defaults = buildDefaultCategories();
    let added = 0;
    const currentIds = categories.map(c => c.id);
    
    const merged = [...categories];
    defaults.forEach((def) => {
      if (!currentIds.includes(def.id)) {
        merged.push(def);
        added++;
      }
    });

    if (added > 0) {
      await resetCategories(merged);
      setCategories(merged);
      alert(`Added ${added} missing categor${added === 1 ? "y" : "ies"} from defaults.`);
    } else {
      alert("All default categories are already present.");
    }
  };

  const handleResetDefaults = async () => {
    if (!confirm("This will REPLACE all categories with the default list. Custom categories will be lost. Continue?")) return;
    const defaults = buildDefaultCategories();
    await resetCategories(defaults);
    setCategories(defaults);
    setSynced(true);
    setTimeout(() => setSynced(false), 3000);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this category?")) {
      await deleteCategory(id);
      setCategories(categories.filter((c) => c.id !== id));
    }
  };

  const itemsPerPage = 10;
  const totalPages = Math.ceil(categories.length / itemsPerPage) || 1;

  const paginatedCategories = categories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(paginatedCategories.map(c => c.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelect = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleDeleteSelected = async () => {
    if (selectedIds.length === 0) return;
    if (confirm("Are you sure you want to delete the selected categories?")) {
      await Promise.all(selectedIds.map(id => deleteCategory(id)));
      setCategories(categories.filter(c => !selectedIds.includes(c.id)));
      setSelectedIds([]);
    }
  };

  return (
    <div className="flex flex-col min-h-[600px] text-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-normal text-gray-700">Categories</h1>
        <div className="flex items-center gap-1">
          {synced && <span className="text-[#8fbb6c] text-sm font-medium mr-2">✓ Synced!</span>}
          <button
            onClick={handleSyncDefaults}
            className="bg-[#f0ad4e] hover:bg-[#eea236] text-white p-2 rounded flex items-center justify-center transition-colors"
            title="Sync Defaults"
          >
            <RefreshCw size={16} />
          </button>
          <Link 
            href="/categories/add" 
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
            title="Delete"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="bg-white border border-[#e4e4e4] rounded shadow-sm">
        <div className="border-b border-[#e4e4e4] p-3 bg-gray-50 flex items-center gap-2 text-gray-600 font-medium">
          <span className="flex items-center justify-center w-4 h-4 border border-gray-400 rounded-sm">
            <span className="w-2 h-2 bg-gray-400" />
          </span>
          Category List
        </div>
        <div className="p-4 overflow-x-auto">
          <table className="w-full text-left border border-[#e4e4e4]">
            <thead>
              <tr className="bg-[#f5f5f5] border-b border-[#e4e4e4]">
                <th className="p-3 w-[40px] text-center border-r border-[#e4e4e4]">
                  <input 
                    type="checkbox" 
                    onChange={handleSelectAll}
                    checked={selectedIds.length === paginatedCategories.length && paginatedCategories.length > 0}
                    className="cursor-pointer"
                  />
                </th>
                <th className="p-3 font-medium text-[#1e91cf] border-r border-[#e4e4e4]">Category Name ^</th>
                <th className="p-3 font-medium text-[#1e91cf] border-r border-[#e4e4e4] text-right">Sort Order</th>
                <th className="p-3 font-medium text-[#1e91cf] text-right w-[100px]">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedCategories.map((category, index) => (
                <tr key={category.id} className="border-b border-[#e4e4e4] hover:bg-[#f9f9f9]">
                  <td className="p-3 text-center border-r border-[#e4e4e4]">
                    <input 
                      type="checkbox" 
                      checked={selectedIds.includes(category.id)}
                      onChange={() => handleSelect(category.id)}
                      className="cursor-pointer"
                    />
                  </td>
                  <td className="p-3 border-r border-[#e4e4e4]">
                    <div className="text-gray-700">{category.title}</div>
                    <div className="text-[#8fbb6c] text-xs mt-0.5">Enabled</div>
                  </td>
                  <td className="p-3 border-r border-[#e4e4e4] text-right text-gray-700">
                    {index + 1}
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end">
                      <Link 
                        href={`/categories/add?id=${category.id}`}
                        className="bg-[#1e91cf] hover:bg-[#1978ab] text-white px-2.5 py-1.5 rounded-l border-r border-[#1978ab] transition-colors"
                      >
                        <Pencil size={14} />
                      </Link>
                      <button className="bg-[#1e91cf] hover:bg-[#1978ab] text-white px-2 py-1.5 rounded-r transition-colors">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {paginatedCategories.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-gray-500">
                    No results!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          
          {/* Pagination */}
          <div className="mt-4 flex items-center justify-between text-gray-600 text-sm">
            <div className="flex items-center gap-1">
              <button
                onClick={() => goToPage(1)}
                disabled={currentPage === 1}
                className="px-3 py-1.5 border border-[#e4e4e4] bg-[#f5f5f5] text-[#1e91cf] hover:bg-[#e6e6e6] disabled:opacity-50"
              >
                |&lt;
              </button>
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1.5 border border-[#e4e4e4] bg-[#f5f5f5] text-[#1e91cf] hover:bg-[#e6e6e6] disabled:opacity-50"
              >
                &lt;
              </button>
              <div className="flex">
                {[...Array(totalPages)].map((_, idx) => {
                  const pageNum = idx + 1;
                  if (pageNum < currentPage - 2 || pageNum > currentPage + 2) return null;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => goToPage(pageNum)}
                      className={`px-3 py-1.5 border-y border-r border-[#e4e4e4] ${
                        currentPage === pageNum
                          ? "bg-[#1e91cf] text-white border-l"
                          : "bg-[#f5f5f5] text-[#1e91cf] hover:bg-[#e6e6e6] first:border-l"
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
                className="px-3 py-1.5 border border-[#e4e4e4] bg-[#f5f5f5] text-[#1e91cf] hover:bg-[#e6e6e6] disabled:opacity-50"
              >
                &gt;
              </button>
              <button
                onClick={() => goToPage(totalPages)}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 border border-[#e4e4e4] bg-[#f5f5f5] text-[#1e91cf] hover:bg-[#e6e6e6] disabled:opacity-50"
              >
                &gt;|
              </button>
            </div>
            <div>
              Showing {(currentPage - 1) * itemsPerPage + (paginatedCategories.length > 0 ? 1 : 0)} to {Math.min(currentPage * itemsPerPage, categories.length)} of {categories.length} ({totalPages} Pages)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
