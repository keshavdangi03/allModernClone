"use client";

import React, { useState, useEffect } from "react";
import { Plus, Trash2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function AddCategoryPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("id");

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [image, setImage] = useState("");
  const [badge, setBadge] = useState("");
  const [color, setColor] = useState("");
  
  // Dynamic sections builder
  const [sections, setSections] = useState<{ title: string; links: string[] }[]>([]);

  useEffect(() => {
    if (editId) {
      const saved = localStorage.getItem("allmodern_admin_categories");
      if (saved) {
        const parsed = JSON.parse(saved);
        const cat = parsed.find((c: any) => c.id === editId);
        if (cat) {
          setTitle(cat.title || "");
          setSlug(cat.id || "");
          setImage(cat.image || "");
          setBadge(cat.badge || "");
          setColor(cat.color || "");
          setSections(cat.sections || []);
        }
      }
    }
  }, [editId]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    if (!editId) {
      setSlug(
        newTitle
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "")
      );
    }
  };

  const handleAddSection = () => {
    setSections([...sections, { title: "", links: [""] }]);
  };

  const handleRemoveSection = (index: number) => {
    const updated = [...sections];
    updated.splice(index, 1);
    setSections(updated);
  };

  const handleSectionTitleChange = (index: number, val: string) => {
    const updated = [...sections];
    updated[index].title = val;
    setSections(updated);
  };

  const handleAddLink = (sectionIndex: number) => {
    const updated = [...sections];
    updated[sectionIndex].links.push("");
    setSections(updated);
  };

  const handleRemoveLink = (sectionIndex: number, linkIndex: number) => {
    const updated = [...sections];
    updated[sectionIndex].links.splice(linkIndex, 1);
    setSections(updated);
  };

  const handleLinkChange = (sectionIndex: number, linkIndex: number, val: string) => {
    const updated = [...sections];
    updated[sectionIndex].links[linkIndex] = val;
    setSections(updated);
  };

  const handleSave = () => {
    if (!title || !slug) {
      alert("Please fill in required fields (Title, Slug).");
      return;
    }

    const saved = localStorage.getItem("allmodern_admin_categories");
    let cats = saved ? JSON.parse(saved) : [];

    // Filter out empty links
    const cleanSections = sections.map(s => ({
      title: s.title,
      links: s.links.filter(l => l.trim() !== "")
    })).filter(s => s.title.trim() !== "");

    const newCat = {
      id: slug,
      title,
      image,
      badge,
      color,
      sections: cleanSections,
    };

    if (editId) {
      const idx = cats.findIndex((c: any) => c.id === editId);
      if (idx >= 0) {
        cats[idx] = newCat;
      } else {
        cats.push(newCat);
      }
    } else {
      cats.push(newCat);
    }

    localStorage.setItem("allmodern_admin_categories", JSON.stringify(cats));
    alert("Category saved successfully!");
    router.push("/categories");
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mx-auto max-w-4xl mb-20">
      {/* Header */}
      <div className="p-6 border-b border-gray-50 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/categories" className="text-gray-400 hover:text-gray-600 transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <h2 className="text-lg font-bold text-[#1f2937]">{editId ? "Edit Category" : "Add Category"}</h2>
        </div>
      </div>

      {/* Form Content */}
      <div className="p-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              placeholder="e.g. Furniture"
              className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Slug <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              disabled={!!editId}
              className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white disabled:bg-gray-50 disabled:text-gray-500"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="/images/cat_living_room.png"
              className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white"
            />
          </div>

          {/* Nav Label Color */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nav Label Color
              <span className="ml-2 text-xs text-gray-400 font-normal">Optional — leave blank for default</span>
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={color || "#1e293b"}
                onChange={(e) => setColor(e.target.value)}
                className="h-10 w-16 rounded-lg border border-gray-200 cursor-pointer"
              />
              <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder="#e43216  or  leave blank"
                className="flex-1 px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white font-mono"
              />
              {color && (
                <button type="button" onClick={() => setColor("")} className="text-xs text-gray-400 hover:text-gray-600 underline whitespace-nowrap">Clear</button>
              )}
            </div>
            {color && (
              <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                <span>Preview:</span>
                <span className="font-semibold text-sm" style={{ color }}>{title || "Category Name"}</span>
              </div>
            )}
          </div>

          {/* Badge */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Badge Text (Optional)</label>
            <input
              type="text"
              value={badge}
              onChange={(e) => setBadge(e.target.value)}
              placeholder="e.g. New Arrivals"
              className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white"
            />
          </div>
        </div>

        <hr className="border-gray-100" />

        {/* Subcategories Builder */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-gray-800">Sections & Subcategories</h3>
              <p className="text-sm text-gray-500">Build the dropdown menu for this category.</p>
            </div>
            <button
              onClick={handleAddSection}
              className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
            >
              <Plus size={16} /> Add Section
            </button>
          </div>

          <div className="space-y-6">
            {sections.map((section, sIdx) => (
              <div key={sIdx} className="border border-gray-200 rounded-xl p-6 bg-gray-50 relative">
                <button 
                  onClick={() => handleRemoveSection(sIdx)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
                >
                  <Trash2 size={18} />
                </button>
                
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Section Title</label>
                  <input
                    type="text"
                    value={section.title}
                    onChange={(e) => handleSectionTitleChange(sIdx, e.target.value)}
                    placeholder="e.g. Living Room"
                    className="w-full max-w-md px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white"
                  />
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-600">Subcategory Links</label>
                  {section.links.map((link, lIdx) => (
                    <div key={lIdx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={link}
                        onChange={(e) => handleLinkChange(sIdx, lIdx, e.target.value)}
                        placeholder="e.g. Sofas"
                        className="w-full max-w-sm px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white"
                      />
                      <button 
                        onClick={() => handleRemoveLink(sIdx, lIdx)}
                        className="p-2 text-gray-400 hover:text-red-500 rounded-md hover:bg-red-50"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => handleAddLink(sIdx)}
                    className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 mt-2"
                  >
                    <Plus size={14} /> Add Link
                  </button>
                </div>
              </div>
            ))}
            
            {sections.length === 0 && (
              <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-xl text-gray-500 text-sm">
                No sections added yet. Click "Add Section" to start building your mega menu.
              </div>
            )}
          </div>
        </div>

        {/* Submit */}
        <div className="pt-6 border-t border-gray-100 flex justify-end">
          <button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl text-sm font-bold transition-colors shadow-sm"
          >
            {editId ? "Update Category" : "Save Category"}
          </button>
        </div>
      </div>
    </div>
  );
}
