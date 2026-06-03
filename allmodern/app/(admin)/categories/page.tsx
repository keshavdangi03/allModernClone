"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Pencil, Trash2, Plus, Copy, RefreshCw, Layers, Layout, ArrowUp, ArrowDown, Check, Save, ChevronRight, Tags, ArrowLeft } from "lucide-react";
import { departmentNavItems, categoryMenus } from "@/components/layout/navigation-data";
import { getCategories, resetCategories, deleteCategory, updateCategory } from "@/lib/actions/categories";

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
  const [activeTab, setActiveTab] = useState<"categories" | "subcategories" | "subsubcategories">("categories");
  const [synced, setSynced] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  // Subcategories Manager State
  const [subSelectedCatId, setSubSelectedCatId] = useState<string>("");
  const [subSections, setSubSections] = useState<any[]>([]);
  const [newSubName, setNewSubName] = useState("");
  const [editingSubIdx, setEditingSubIdx] = useState<number | null>(null);
  const [editingSubVal, setEditingSubVal] = useState("");

  // Sub-subcategories Manager State
  const [subsubSelectedCatId, setSubsubSelectedCatId] = useState<string>("");
  const [subsubSelectedSubIdx, setSubsubSelectedSubIdx] = useState<number>(-1);
  const [newSubsubName, setNewSubsubName] = useState("");
  const [editingSubsubIdx, setEditingSubsubIdx] = useState<number | null>(null);
  const [editingSubsubVal, setEditingSubsubVal] = useState("");

  // Fetch categories on mount
  const loadCategories = async () => {
    try {
      const data = await getCategories();
      if (!data) throw new Error("Failed to fetch categories");
      
      if (data && data.length > 0) {
        setCategories(data);
        if (data.length > 0) {
          setSubSelectedCatId(data[0].id);
          setSubSections(data[0].sections || []);
          setSubsubSelectedCatId(data[0].id);
        }
      } else {
        const defaults = buildDefaultCategories();
        await resetCategories(defaults);
        setCategories(defaults);
        if (defaults.length > 0) {
          setSubSelectedCatId(defaults[0].id);
          setSubSections(defaults[0].sections || []);
          setSubsubSelectedCatId(defaults[0].id);
        }
      }
    } catch (e) {
      console.error("Failed to load categories from DB", e);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  // Update local sections when selected category changes in Subcategories Tab
  useEffect(() => {
    if (subSelectedCatId) {
      const cat = categories.find(c => c.id === subSelectedCatId);
      if (cat) {
        setSubSections(cat.sections || []);
      }
    }
  }, [subSelectedCatId, categories]);

  // Update selected subcategory index when selected category changes in Sub-subcategories Tab
  useEffect(() => {
    if (subsubSelectedCatId) {
      const cat = categories.find(c => c.id === subsubSelectedCatId);
      if (cat && cat.sections && cat.sections.length > 0) {
        setSubsubSelectedSubIdx(0);
      } else {
        setSubsubSelectedSubIdx(-1);
      }
    }
  }, [subsubSelectedCatId, categories]);

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
      alert(`Added ${added} missing category/categories from defaults.`);
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

  // Subcategory Actions
  const handleAddSubcategory = () => {
    if (!newSubName.trim()) return;
    const updated = [...subSections, { title: newSubName.trim(), links: [] }];
    setSubSections(updated);
    setNewSubName("");
  };

  const handleRenameSubcategory = (idx: number) => {
    if (!editingSubVal.trim()) return;
    const updated = subSections.map((sec, i) => i === idx ? { ...sec, title: editingSubVal.trim() } : sec);
    setSubSections(updated);
    setEditingSubIdx(null);
  };

  const handleDeleteSubcategory = (idx: number) => {
    if (confirm("Are you sure you want to delete this subcategory and all of its sub-subcategories?")) {
      const updated = subSections.filter((_, i) => i !== idx);
      setSubSections(updated);
    }
  };

  const handleMoveSubcategory = (idx: number, direction: 'up' | 'down') => {
    if (direction === 'up' && idx === 0) return;
    if (direction === 'down' && idx === subSections.length - 1) return;
    
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    const updated = [...subSections];
    const temp = updated[idx];
    updated[idx] = updated[targetIdx];
    updated[targetIdx] = temp;
    
    setSubSections(updated);
  };

  const handleSaveSubcategories = async () => {
    if (!subSelectedCatId) return;
    setSaving(true);
    try {
      await updateCategory(subSelectedCatId, { sections: subSections });
      setCategories(prev => prev.map(c => c.id === subSelectedCatId ? { ...c, sections: subSections } : c));
      alert("Subcategories saved successfully!");
    } catch (e) {
      console.error(e);
      alert("Failed to save subcategories");
    } finally {
      setSaving(false);
    }
  };

  // Sub-subcategory Actions
  const handleAddSubsub = () => {
    if (!newSubsubName.trim() || subsubSelectedSubIdx === -1) return;
    
    const cat = categories.find(c => c.id === subsubSelectedCatId);
    if (!cat) return;
    
    const updatedSections = [...cat.sections];
    const section = { ...updatedSections[subsubSelectedSubIdx] };
    section.links = [...(section.links || []), newSubsubName.trim()];
    updatedSections[subsubSelectedSubIdx] = section;
    
    setCategories(prev => prev.map(c => c.id === subsubSelectedCatId ? { ...c, sections: updatedSections } : c));
    setNewSubsubName("");
  };

  const handleRenameSubsub = (idx: number) => {
    if (!editingSubsubVal.trim() || subsubSelectedSubIdx === -1) return;
    
    const cat = categories.find(c => c.id === subsubSelectedCatId);
    if (!cat) return;
    
    const updatedSections = [...cat.sections];
    const section = { ...updatedSections[subsubSelectedSubIdx] };
    section.links = section.links.map((lnk: string, i: number) => i === idx ? editingSubsubVal.trim() : lnk);
    updatedSections[subsubSelectedSubIdx] = section;
    
    setCategories(prev => prev.map(c => c.id === subsubSelectedCatId ? { ...c, sections: updatedSections } : c));
    setEditingSubsubIdx(null);
  };

  const handleDeleteSubsub = (idx: number) => {
    if (confirm("Are you sure you want to delete this sub-subcategory?")) {
      const cat = categories.find(c => c.id === subsubSelectedCatId);
      if (!cat) return;
      
      const updatedSections = [...cat.sections];
      const section = { ...updatedSections[subsubSelectedSubIdx] };
      section.links = section.links.filter((_: any, i: number) => i !== idx);
      updatedSections[subsubSelectedSubIdx] = section;
      
      setCategories(prev => prev.map(c => c.id === subsubSelectedCatId ? { ...c, sections: updatedSections } : c));
    }
  };

  const handleMoveSubsub = (idx: number, direction: 'up' | 'down') => {
    const cat = categories.find(c => c.id === subsubSelectedCatId);
    if (!cat) return;
    
    const section = cat.sections[subsubSelectedSubIdx];
    const links = [...(section.links || [])];
    
    if (direction === 'up' && idx === 0) return;
    if (direction === 'down' && idx === links.length - 1) return;
    
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    const temp = links[idx];
    links[idx] = links[targetIdx];
    links[targetIdx] = temp;
    
    const updatedSections = [...cat.sections];
    updatedSections[subsubSelectedSubIdx] = { ...section, links };
    
    setCategories(prev => prev.map(c => c.id === subsubSelectedCatId ? { ...c, sections: updatedSections } : c));
  };

  const handleSaveSubsub = async () => {
    if (!subsubSelectedCatId) return;
    const cat = categories.find(c => c.id === subsubSelectedCatId);
    if (!cat) return;
    
    setSaving(true);
    try {
      await updateCategory(subsubSelectedCatId, { sections: cat.sections });
      alert("Sub-subcategories saved successfully!");
    } catch (e) {
      console.error(e);
      alert("Failed to save sub-subcategories");
    } finally {
      setSaving(false);
    }
  };

  // Helper variables for rendering subsub list
  const activeSubsubCat = categories.find(c => c.id === subsubSelectedCatId);
  const activeSubsubSections = activeSubsubCat?.sections || [];
  const activeSubsubSec = activeSubsubSections[subsubSelectedSubIdx];
  const activeSubsubLinks = activeSubsubSec?.links || [];

  return (
    <div className="flex flex-col min-h-[600px] text-sm text-slate-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-2.5">
            <Tags className="text-indigo-600 w-8 h-8" />
            Categories Hierarchy
          </h1>
          <p className="text-gray-500 mt-1">Manage categories, subcategories, and sub-subcategories from one central panel.</p>
        </div>
        
        {activeTab === "categories" && (
          <div className="flex items-center gap-2">
            {synced && <span className="text-emerald-600 text-xs font-semibold mr-2 flex items-center gap-1">✓ Synced!</span>}
            <button
              onClick={handleSyncDefaults}
              className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-3.5 rounded-lg flex items-center gap-1.5 shadow-sm transition-colors"
              title="Sync Defaults"
            >
              <RefreshCw size={16} />
              Sync Defaults
            </button>
            <Link 
              href="/categories/add" 
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-3.5 rounded-lg flex items-center gap-1.5 shadow-sm transition-colors"
              title="Add New Category"
            >
              <Plus size={16} />
              Add Category
            </Link>
            <button 
              onClick={handleDeleteSelected}
              disabled={selectedIds.length === 0}
              className="bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white font-semibold py-2 px-3.5 rounded-lg flex items-center gap-1.5 shadow-sm transition-colors"
              title="Delete Selected"
            >
              <Trash2 size={16} />
              Delete ({selectedIds.length})
            </button>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6 bg-white p-1 rounded-xl shadow-sm gap-2 max-w-fit border border-gray-100">
        <button
          onClick={() => setActiveTab("categories")}
          className={`flex items-center gap-2 py-2.5 px-5 rounded-lg font-medium transition ${
            activeTab === "categories"
              ? "bg-indigo-50 text-indigo-700 shadow-sm"
              : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
          }`}
        >
          <Layout size={18} />
          1. Categories
        </button>
        <button
          onClick={() => setActiveTab("subcategories")}
          className={`flex items-center gap-2 py-2.5 px-5 rounded-lg font-medium transition ${
            activeTab === "subcategories"
              ? "bg-indigo-50 text-indigo-700 shadow-sm"
              : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
          }`}
        >
          <Layers size={18} />
          2. Subcategories
        </button>
        <button
          onClick={() => setActiveTab("subsubcategories")}
          className={`flex items-center gap-2 py-2.5 px-5 rounded-lg font-medium transition ${
            activeTab === "subsubcategories"
              ? "bg-indigo-50 text-indigo-700 shadow-sm"
              : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
          }`}
        >
          <ChevronRight size={18} />
          3. Sub-subcategories
        </button>
      </div>

      {/* Dynamic Tab Contents */}

      {/* TAB 1: TOP-LEVEL CATEGORIES LIST */}
      {activeTab === "categories" && (
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="border-b border-gray-200 p-4 bg-slate-50 flex items-center justify-between text-slate-800 font-bold text-base">
            <span>Category List</span>
            <span className="text-xs font-normal text-slate-500">{categories.length} Top-level categories</span>
          </div>
          <div className="p-4 overflow-x-auto">
            <table className="w-full text-left border-collapse border border-gray-100">
              <thead>
                <tr className="bg-slate-50/50 border-b border-gray-200 text-slate-500 font-semibold uppercase text-xs">
                  <th className="p-4 w-[50px] text-center border-r border-gray-100">
                    <input 
                      type="checkbox" 
                      onChange={handleSelectAll}
                      checked={selectedIds.length === paginatedCategories.length && paginatedCategories.length > 0}
                      className="cursor-pointer rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4"
                    />
                  </th>
                  <th className="p-4 border-r border-gray-100">Category Name</th>
                  <th className="p-4 border-r border-gray-100">Subcategories Count</th>
                  <th className="p-4 border-r border-gray-100 text-right">Sort Order</th>
                  <th className="p-4 text-right w-[120px]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedCategories.map((category, index) => (
                  <tr key={category.id} className="border-b border-gray-100 hover:bg-slate-50/30 transition-colors">
                    <td className="p-4 text-center border-r border-gray-100">
                      <input 
                        type="checkbox" 
                        checked={selectedIds.includes(category.id)}
                        onChange={() => handleSelect(category.id)}
                        className="cursor-pointer rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4"
                      />
                    </td>
                    <td className="p-4 border-r border-gray-100">
                      <div className="text-slate-900 font-semibold text-[15px]">{category.title}</div>
                      <div className="text-gray-400 text-xs mt-0.5 font-mono">ID: {category.id}</div>
                    </td>
                    <td className="p-4 border-r border-gray-100">
                      <span className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-700 text-xs px-2.5 py-1 rounded-full font-semibold">
                        {category.sections ? category.sections.length : 0} subcategories
                      </span>
                    </td>
                    <td className="p-4 border-r border-gray-100 text-right font-medium text-slate-600">
                      {index + 1}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link 
                          href={`/categories/add?id=${category.id}`}
                          className="bg-indigo-50 hover:bg-indigo-100 text-indigo-600 p-2 rounded-lg transition-colors border border-indigo-100"
                          title="Edit Category Details"
                        >
                          <Pencil size={15} />
                        </Link>
                        <button 
                          onClick={() => handleDelete(category.id)}
                          className="bg-rose-50 hover:bg-rose-100 text-rose-600 p-2 rounded-lg transition-colors border border-rose-100"
                          title="Delete Category"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {paginatedCategories.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-gray-500">
                      No categories found!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            
            {/* Pagination */}
            <div className="mt-4 flex items-center justify-between text-gray-500 text-sm">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => goToPage(1)}
                  disabled={currentPage === 1}
                  className="p-2 border border-gray-200 bg-white rounded-lg hover:bg-gray-50 disabled:opacity-50 transition"
                >
                  &lt;&lt;
                </button>
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 border border-gray-200 bg-white rounded-lg hover:bg-gray-50 disabled:opacity-50 transition"
                >
                  &lt;
                </button>
                <div className="flex items-center gap-1">
                  {[...Array(totalPages)].map((_, idx) => {
                    const pageNum = idx + 1;
                    if (pageNum < currentPage - 2 || pageNum > currentPage + 2) return null;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => goToPage(pageNum)}
                        className={`w-9 h-9 border rounded-lg transition font-medium ${
                          currentPage === pageNum
                            ? "bg-indigo-600 border-indigo-600 text-white shadow-sm"
                            : "bg-white border-gray-200 hover:bg-gray-50"
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
                  className="p-2 border border-gray-200 bg-white rounded-lg hover:bg-gray-50 disabled:opacity-50 transition"
                >
                  &gt;
                </button>
                <button
                  onClick={() => goToPage(totalPages)}
                  disabled={currentPage === totalPages}
                  className="p-2 border border-gray-200 bg-white rounded-lg hover:bg-gray-50 disabled:opacity-50 transition"
                >
                  &gt;&gt;
                </button>
              </div>
              <div className="font-medium">
                Showing {(currentPage - 1) * itemsPerPage + (paginatedCategories.length > 0 ? 1 : 0)} to {Math.min(currentPage * itemsPerPage, categories.length)} of {categories.length} entries
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SUBCATEGORIES MANAGEMENT */}
      {activeTab === "subcategories" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left panel: Category Selector */}
          <div className="bg-white border border-gray-200 p-5 rounded-2xl shadow-sm h-fit">
            <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Layout className="text-indigo-600 w-5 h-5" />
              1. Select Category
            </h2>
            <p className="text-gray-500 mb-4 text-xs">Choose the top-level parent category to edit its sub-levels.</p>
            
            <select
              value={subSelectedCatId}
              onChange={(e) => setSubSelectedCatId(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-slate-50 font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
            
            <div className="mt-6 p-4 bg-indigo-50/50 rounded-xl border border-indigo-100">
              <h4 className="font-semibold text-indigo-950 text-xs mb-1">Database Sync Notice</h4>
              <p className="text-xs text-indigo-700/80 leading-relaxed">
                Add, remove, rename, and sort subcategories. Make sure to click <strong>Save Changes</strong> below when you are finished!
              </p>
            </div>
            
            <button
              onClick={handleSaveSubcategories}
              disabled={saving}
              className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold py-3.5 rounded-xl shadow-sm flex items-center justify-center gap-2 transition"
            >
              <Save size={18} />
              {saving ? "Saving Changes..." : "Save Changes"}
            </button>
          </div>

          {/* Right panel: Subcategory Editor */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm col-span-2 overflow-hidden">
            <div className="border-b border-gray-200 p-5 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Subcategories inside <span className="text-indigo-600">"{categories.find(c => c.id === subSelectedCatId)?.title}"</span>
                </h3>
                <p className="text-xs text-gray-500 mt-1">Hierarchical Level 2</p>
              </div>
              
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="New subcategory name..."
                  value={newSubName}
                  onChange={(e) => setNewSubName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddSubcategory()}
                  className="border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 w-[200px]"
                />
                <button
                  onClick={handleAddSubcategory}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold p-2.5 rounded-xl flex items-center justify-center shadow-sm transition"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <div className="p-6">
              {subSections.length === 0 ? (
                <div className="py-12 text-center text-gray-500">
                  No subcategories present. Use the add panel in the header to create one!
                </div>
              ) : (
                <div className="space-y-3">
                  {subSections.map((sec, idx) => (
                    <div 
                      key={idx}
                      className="flex items-center justify-between p-4 bg-slate-50/50 hover:bg-slate-50 border border-gray-200 rounded-xl transition"
                    >
                      <div className="flex-1 flex items-center gap-3">
                        <span className="w-6 h-6 bg-indigo-100 text-indigo-700 font-bold rounded-lg text-xs flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        
                        {editingSubIdx === idx ? (
                          <div className="flex items-center gap-2 flex-1 max-w-sm">
                            <input
                              type="text"
                              value={editingSubVal}
                              onChange={(e) => setEditingSubVal(e.target.value)}
                              onKeyDown={(e) => e.key === 'Enter' && handleRenameSubcategory(idx)}
                              className="w-full border border-gray-300 rounded-lg px-2.5 py-1.5 text-sm focus:outline-none focus:border-indigo-500"
                              autoFocus
                            />
                            <button
                              onClick={() => handleRenameSubcategory(idx)}
                              className="bg-emerald-500 hover:bg-emerald-600 text-white p-2 rounded-lg transition"
                            >
                              <Check size={14} />
                            </button>
                            <button
                              onClick={() => setEditingSubIdx(null)}
                              className="text-gray-400 hover:text-gray-600 text-xs px-2"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-baseline gap-2">
                            <span className="font-semibold text-slate-800 text-[15px]">{sec.title}</span>
                            <span className="text-gray-400 text-xs">({sec.links ? sec.links.length : 0} links)</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => {
                            setEditingSubIdx(idx);
                            setEditingSubVal(sec.title);
                          }}
                          className="bg-white border border-gray-200 text-gray-600 p-2 rounded-lg hover:bg-slate-50 transition"
                          title="Rename Subcategory"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => handleMoveSubcategory(idx, 'up')}
                          disabled={idx === 0}
                          className="bg-white border border-gray-200 text-gray-600 p-2 rounded-lg hover:bg-slate-50 disabled:opacity-40 transition"
                          title="Move Up"
                        >
                          <ArrowUp size={14} />
                        </button>
                        <button
                          onClick={() => handleMoveSubcategory(idx, 'down')}
                          disabled={idx === subSections.length - 1}
                          className="bg-white border border-gray-200 text-gray-600 p-2 rounded-lg hover:bg-slate-50 disabled:opacity-40 transition"
                          title="Move Down"
                        >
                          <ArrowDown size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteSubcategory(idx)}
                          className="bg-rose-50 border border-rose-100 text-rose-600 p-2 rounded-lg hover:bg-rose-100 transition"
                          title="Delete Subcategory"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SUB-SUBCATEGORIES (LINKS) MANAGEMENT */}
      {activeTab === "subsubcategories" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel: Category & Subcategory Selectors */}
          <div className="bg-white border border-gray-200 p-5 rounded-2xl shadow-sm h-fit space-y-5">
            <div>
              <h2 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Layout className="text-indigo-600 w-5 h-5" />
                1. Parent Category
              </h2>
              <select
                value={subsubSelectedCatId}
                onChange={(e) => setSubsubSelectedCatId(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-slate-50 font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <h2 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Layers className="text-indigo-600 w-5 h-5" />
                2. Subcategory
              </h2>
              {activeSubsubSections.length === 0 ? (
                <div className="text-xs text-amber-600 bg-amber-50 p-3 rounded-lg border border-amber-100">
                  No subcategories present for this category. Create some in Step 2!
                </div>
              ) : (
                <select
                  value={subsubSelectedSubIdx}
                  onChange={(e) => setSubsubSelectedSubIdx(parseInt(e.target.value))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-slate-50 font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
                >
                  {activeSubsubSections.map((sec: { title: string; links?: string[] }, idx: number) => (
                    <option key={idx} value={idx}>
                      {sec.title}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div className="pt-2">
              <button
                onClick={handleSaveSubsub}
                disabled={saving || subsubSelectedSubIdx === -1}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold py-3.5 rounded-xl shadow-sm flex items-center justify-center gap-2 transition"
              >
                <Save size={18} />
                {saving ? "Saving Changes..." : "Save Changes"}
              </button>
            </div>
          </div>

          {/* Right Panel: Sub-subcategories (Links) Editor */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm col-span-2 overflow-hidden">
            <div className="border-b border-gray-200 p-5 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Sub-subcategories inside <span className="text-indigo-600">"{activeSubsubSec?.title || 'None'}"</span>
                </h3>
                <p className="text-xs text-gray-500 mt-1">Hierarchical Level 3</p>
              </div>
              
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="New sub-subcategory name..."
                  value={newSubsubName}
                  onChange={(e) => setNewSubsubName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddSubsub()}
                  disabled={subsubSelectedSubIdx === -1}
                  className="border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 w-[200px] disabled:opacity-50"
                />
                <button
                  onClick={handleAddSubsub}
                  disabled={subsubSelectedSubIdx === -1}
                  className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold p-2.5 rounded-xl flex items-center justify-center shadow-sm transition"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <div className="p-6">
              {subsubSelectedSubIdx === -1 ? (
                <div className="py-12 text-center text-gray-500">
                  Please select or create a parent subcategory from the left panel first.
                </div>
              ) : activeSubsubLinks.length === 0 ? (
                <div className="py-12 text-center text-gray-500">
                  No sub-subcategories present. Add your first item in the search field above!
                </div>
              ) : (
                <div className="space-y-3">
                  {activeSubsubLinks.map((link: string, idx: number) => (
                    <div 
                      key={idx}
                      className="flex items-center justify-between p-4 bg-slate-50/50 hover:bg-slate-50 border border-gray-200 rounded-xl transition"
                    >
                      <div className="flex-1 flex items-center gap-3">
                        <span className="w-6 h-6 bg-indigo-100 text-indigo-700 font-bold rounded-lg text-xs flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        
                        {editingSubsubIdx === idx ? (
                          <div className="flex items-center gap-2 flex-1 max-w-sm">
                            <input
                              type="text"
                              value={editingSubsubVal}
                              onChange={(e) => setEditingSubsubVal(e.target.value)}
                              onKeyDown={(e) => e.key === 'Enter' && handleRenameSubsub(idx)}
                              className="w-full border border-gray-300 rounded-lg px-2.5 py-1.5 text-sm focus:outline-none focus:border-indigo-500"
                              autoFocus
                            />
                            <button
                              onClick={() => handleRenameSubsub(idx)}
                              className="bg-emerald-500 hover:bg-emerald-600 text-white p-2 rounded-lg transition"
                            >
                              <Check size={14} />
                            </button>
                            <button
                              onClick={() => setEditingSubsubIdx(null)}
                              className="text-gray-400 hover:text-gray-600 text-xs px-2"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <span className="font-semibold text-slate-800 text-[15px]">{link}</span>
                        )}
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => {
                            setEditingSubsubIdx(idx);
                            setEditingSubsubVal(link);
                          }}
                          className="bg-white border border-gray-200 text-gray-600 p-2 rounded-lg hover:bg-slate-50 transition"
                          title="Rename Sub-subcategory"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => handleMoveSubsub(idx, 'up')}
                          disabled={idx === 0}
                          className="bg-white border border-gray-200 text-gray-600 p-2 rounded-lg hover:bg-slate-50 disabled:opacity-40 transition"
                          title="Move Up"
                        >
                          <ArrowUp size={14} />
                        </button>
                        <button
                          onClick={() => handleMoveSubsub(idx, 'down')}
                          disabled={idx === activeSubsubLinks.length - 1}
                          className="bg-white border border-gray-200 text-gray-600 p-2 rounded-lg hover:bg-slate-50 disabled:opacity-40 transition"
                          title="Move Down"
                        >
                          <ArrowDown size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteSubsub(idx)}
                          className="bg-rose-50 border border-rose-100 text-rose-600 p-2 rounded-lg hover:bg-rose-100 transition"
                          title="Delete Sub-subcategory"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
