"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, Trash2, RefreshCw } from "lucide-react";
import { departmentNavItems, categoryMenus } from "@/components/layout/navigation-data";

function buildDefaultCategories() {
  return departmentNavItems.map((navItem) => {
    const menuKey = Object.keys(categoryMenus).find(
      (k) => k.toLowerCase() === navItem.label.toLowerCase()
    );
    const menuData = menuKey ? (categoryMenus as any)[menuKey] : null;
    return {
      id: navItem.href.replace("/", "") || navItem.label.toLowerCase().replace(/\s+/g, "-"),
      title: navItem.label,
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

  useEffect(() => {
    const saved = localStorage.getItem("allmodern_admin_categories");
    const defaults = buildDefaultCategories();
    
    if (saved) {
      const parsed = JSON.parse(saved);
      // Automatically merge in missing canonical categories (like Sale or New)
      let modified = false;
      defaults.forEach((def) => {
        const exists = parsed.find((c: any) => c.title === def.title || c.id === def.id);
        if (!exists) {
          parsed.push(def);
          modified = true;
        }
      });
      
      setCategories(parsed);
      if (modified) {
        localStorage.setItem("allmodern_admin_categories", JSON.stringify(parsed));
        window.dispatchEvent(new Event("storage"));
      }
    } else {
      setCategories(defaults);
      localStorage.setItem("allmodern_admin_categories", JSON.stringify(defaults));
    }
  }, []);

  const persist = (updated: any[]) => {
    setCategories(updated);
    localStorage.setItem("allmodern_admin_categories", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this category?")) {
      persist(categories.filter((c) => c.id !== id));
    }
  };

  const handleSyncDefaults = () => {
    const defaults = buildDefaultCategories();
    const existing = [...categories];
    let added = 0;
    defaults.forEach((def) => {
      // Match by title OR id to handle old seeding that used display names as IDs
      const alreadyExists = existing.find(
        (c) => c.title === def.title || c.id === def.id
      );
      if (!alreadyExists) {
        existing.push(def);
        added++;
      }
    });
    persist(existing);
    setSynced(true);
    setTimeout(() => setSynced(false), 3000);
    if (added === 0) alert("All default categories are already present.");
    else alert(`Added ${added} missing categor${added === 1 ? "y" : "ies"} from defaults.`);
  };

  const handleResetDefaults = () => {
    if (!confirm("This will REPLACE all categories with the default list. Custom categories will be lost. Continue?")) return;
    const defaults = buildDefaultCategories();
    persist(defaults);
    setSynced(true);
    setTimeout(() => setSynced(false), 3000);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-h-[600px]">
      {/* Header */}
      <div className="p-6 border-b border-gray-50 flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-lg font-bold text-[#1f2937]">All Categories</h2>
          <p className="text-xs text-gray-500 mt-0.5">{categories.length} categories · drives the main navigation bar</p>
        </div>
        <div className="flex items-center gap-2">
          {synced && <span className="text-green-600 text-sm font-medium">✓ Synced!</span>}
          <button
            onClick={handleSyncDefaults}
            className="flex items-center gap-2 border border-gray-200 text-gray-600 hover:border-gray-400 hover:text-gray-800 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
            title="Add any missing default categories without overwriting existing ones"
          >
            <RefreshCw size={14} />
            Sync Defaults
          </button>
          <button
            onClick={handleResetDefaults}
            className="flex items-center gap-2 border border-red-200 text-red-500 hover:border-red-400 hover:text-red-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
            title="Replace all categories with defaults"
          >
            Reset All
          </button>
          <Link
            href="/categories/add"
            className="bg-[#1f2937] hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
          >
            <Plus size={16} />
            Add Category
          </Link>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="py-4 px-6 text-sm font-semibold text-gray-500 w-[72px]">Image</th>
              <th className="py-4 px-6 text-sm font-semibold text-gray-500">Title</th>
              <th className="py-4 px-6 text-sm font-semibold text-gray-500 w-[120px]">Color</th>
              <th className="py-4 px-6 text-sm font-semibold text-gray-500 text-right w-[120px]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {categories.map((category) => (
              <tr key={category.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="py-4 px-6">
                  <div className="w-12 h-12 bg-gray-50 rounded-lg border border-gray-100 flex items-center justify-center overflow-hidden p-1">
                    <Image
                      src={category.image || "/images/hero.png"}
                      alt={category.title}
                      width={48}
                      height={48}
                      className="object-contain w-full h-full mix-blend-multiply"
                    />
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span
                    className="text-sm font-medium"
                    style={{ color: category.color || "#374151" }}
                  >
                    {category.title}
                  </span>
                  {category.badge && (
                    <span className="ml-2 text-[10px] bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded font-semibold">
                      {category.badge}
                    </span>
                  )}
                </td>
                <td className="py-4 px-6">
                  {category.color ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded border border-gray-200" style={{ backgroundColor: category.color }} />
                      <span className="text-[10px] font-mono text-gray-400">{category.color}</span>
                    </div>
                  ) : (
                    <span className="text-xs text-gray-300">default</span>
                  )}
                </td>
                <td className="py-4 px-6 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                    <Link
                      href={`/categories/add?id=${category.id}`}
                      className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-colors"
                    >
                      <Pencil size={14} />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr>
                <td colSpan={4} className="py-8 text-center text-gray-500">
                  No categories found. Click &ldquo;Sync Defaults&rdquo; to restore all.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
