"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { 
  Save, Undo, Pencil, Plus, Trash2,
  Bold, Italic, Underline as UnderlineIcon, Strikethrough, 
  AlignLeft, AlignCenter, AlignRight, Image as ImageIcon, X
} from "lucide-react";
import { addCategory, updateCategory } from "@/lib/actions/categories";

const RichTextToolbar = () => (
  <div className="flex items-center gap-1 border-b border-[#e4e4e4] p-2 bg-[#f5f5f5] shrink-0 text-gray-600 text-sm">
    <button className="p-1 hover:bg-[#e4e4e4] rounded transition-colors" title="Source">Source</button>
    <div className="w-px h-4 bg-gray-300 mx-1"></div>
    <button className="p-1 hover:bg-[#e4e4e4] rounded transition-colors"><Bold size={14} /></button>
    <button className="p-1 hover:bg-[#e4e4e4] rounded transition-colors"><Italic size={14} /></button>
    <button className="p-1 hover:bg-[#e4e4e4] rounded transition-colors"><UnderlineIcon size={14} /></button>
    <button className="p-1 hover:bg-[#e4e4e4] rounded transition-colors"><Strikethrough size={14} /></button>
    <div className="w-px h-4 bg-gray-300 mx-1"></div>
    <button className="p-1 hover:bg-[#e4e4e4] rounded transition-colors"><AlignLeft size={14} /></button>
    <button className="p-1 hover:bg-[#e4e4e4] rounded transition-colors"><AlignCenter size={14} /></button>
    <button className="p-1 hover:bg-[#e4e4e4] rounded transition-colors"><AlignRight size={14} /></button>
    <div className="w-px h-4 bg-gray-300 mx-1"></div>
    <select className="bg-transparent border border-gray-300 rounded px-1 py-0.5 outline-none">
      <option>Format</option>
    </select>
    <select className="bg-transparent border border-gray-300 rounded px-1 py-0.5 outline-none ml-1">
      <option>Font</option>
    </select>
    <select className="bg-transparent border border-gray-300 rounded px-1 py-0.5 outline-none ml-1">
      <option>Size</option>
    </select>
  </div>
);

const InputRow = ({ label, required, children, helper, id }: { label: string, required?: boolean, children: React.ReactNode, helper?: string, id?: string }) => (
  <div className="flex items-start gap-4 border-b border-[#e4e4e4] py-4 last:border-b-0" id={id}>
    <label className="w-1/6 text-right pt-2 font-semibold text-gray-700">
      {required && <span className="text-red-500 font-bold">* </span>}
      {label}
    </label>
    <div className="w-5/6 relative">
      {children}
      {helper && <div className="text-xs text-gray-400 mt-1.5">{helper}</div>}
    </div>
  </div>
);

function AddCategoryForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("id");

  const [activeTab, setActiveTab] = useState("general");

  // General fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [metaKeywords, setMetaKeywords] = useState("");

  // Data fields
  const [slug, setSlug] = useState("");
  const [image, setImage] = useState("");
  const [badge, setBadge] = useState("");
  const [color, setColor] = useState("");
  const [sections, setSections] = useState<{ title: string; links: string[] }[]>([]);

  useEffect(() => {
    if (editId) {
      // Use fetch instead of getCategories to prevent server action issues
      fetch("/api/admin/categories")
        .then(res => res.json())
        .then((cats) => {
          const cat = cats.find((c: any) => c.id === editId);
          if (cat) {
            setTitle(cat.title || "");
            setDescription(cat.description || "");
            setMetaTitle(cat.metaTitle || cat.title || "");
            setMetaDescription(cat.metaDescription || "");
            setMetaKeywords(cat.metaKeywords || "");
            setSlug(cat.id || "");
            setImage(cat.image || "");
            setBadge(cat.badge || "");
            setColor(cat.color || "");
            setSections(cat.sections || []);
          }
        }).catch(console.error);
    }
  }, [editId]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    if (!metaTitle) setMetaTitle(newTitle);
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

  const handleSave = async () => {
    if (!title || !slug || !metaTitle) {
      alert("Please fill in required fields (Category Name, Meta Tag Title, Slug).");
      return;
    }

    // Filter out empty links
    const cleanSections = sections.map(s => ({
      title: s.title,
      links: s.links.filter(l => l.trim() !== "")
    })).filter(s => s.title.trim() !== "");

    const newCat = {
      id: slug,
      title,
      description,
      image,
      badge,
      color,
      sections: cleanSections,
      metaTitle,
      metaDescription,
      metaKeywords,
    };

    try {
      if (editId) {
        await updateCategory(editId, newCat);
      } else {
        await addCategory(newCat);
      }
      router.push("/categories");
    } catch (e: any) {
      console.error(e);
      alert("Error saving category: " + e.message);
    }
  };

  const tabs = ["General", "Data", "SEO", "Design"];

  return (
    <div className="flex flex-col min-h-[600px] text-sm text-gray-700">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-normal text-gray-700">{editId ? "Edit Category" : "Add Category"}</h1>
        <div className="flex items-center gap-1">
          <button 
            onClick={handleSave}
            className="bg-[#1e91cf] hover:bg-[#1978ab] text-white p-2 rounded flex items-center justify-center transition-colors"
            title="Save"
          >
            <Save size={16} />
          </button>
          <button 
            onClick={() => router.push("/categories")}
            className="bg-[#f3f7f9] hover:bg-[#e4ecef] border border-[#d2e2e7] text-gray-600 p-2 rounded flex items-center justify-center transition-colors"
            title="Cancel"
          >
            <Undo size={16} />
          </button>
        </div>
      </div>

      <div className="bg-white border border-[#e4e4e4] rounded shadow-sm mb-20">
        <div className="border-b border-[#e4e4e4] p-3 bg-gray-50 flex items-center gap-2 text-gray-600 font-medium">
          <Pencil size={16} />
          {editId ? "Edit Category" : "Add Category"}
        </div>
        
        <div className="p-4">
          {/* Tabs */}
          <div className="flex flex-wrap border-b border-[#e4e4e4] mb-4">
            {tabs.map((tab) => {
              const tabId = tab.toLowerCase().replace(" ", "-");
              return (
                <button
                  key={tabId}
                  onClick={() => setActiveTab(tabId)}
                  className={`px-4 py-2 border-t border-x rounded-t -mb-px mr-1 ${
                    activeTab === tabId
                      ? "bg-white border-[#e4e4e4] text-gray-700 font-medium"
                      : "bg-[#f5f5f5] border-transparent text-[#1e91cf] hover:bg-gray-100"
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {/* Tab Content: General */}
          {activeTab === "general" && (
            <div className="max-w-7xl">
              <div className="flex items-center gap-2 mb-4 border-b border-[#e4e4e4] pb-2">
                <span className="text-xl">🇬🇧</span>
                <span className="font-medium">English</span>
              </div>

              <InputRow label="Category Name" required>
                <input type="text" placeholder="Category Name" value={title} onChange={handleTitleChange} className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white" />
              </InputRow>

              <InputRow label="Description">
                <div className="border border-gray-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-500 bg-white">
                  <RichTextToolbar />
                  <textarea rows={10} value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-4 py-3 text-sm focus:outline-none resize-y min-h-[150px] font-sans bg-white"></textarea>
                </div>
              </InputRow>

              <InputRow label="Meta Tag Title" required>
                <input type="text" placeholder="Meta Tag Title" value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white" />
              </InputRow>

              <InputRow label="Meta Tag Description">
                <textarea rows={4} placeholder="Meta Tag Description" value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white resize-y"></textarea>
              </InputRow>

              <InputRow label="Meta Tag Keywords">
                <textarea rows={4} placeholder="Meta Tag Keywords" value={metaKeywords} onChange={(e) => setMetaKeywords(e.target.value)} className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white resize-y"></textarea>
              </InputRow>
            </div>
          )}

          {/* Tab Content: Data */}
          {activeTab === "data" && (
            <div className="max-w-7xl">
              <InputRow label="Slug (ID)" required helper="Used for URLs">
                <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} disabled={!!editId} placeholder="e.g. furniture" className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white disabled:bg-gray-100 disabled:text-gray-500" />
              </InputRow>
              
              <InputRow label="Image URL">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <input type="text" value={image} onChange={(e) => setImage(e.target.value)} placeholder="/images/cat_living_room.png" className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white" />
                  </div>
                  <div className="w-16 h-16 border border-gray-200 rounded-xl flex items-center justify-center bg-gray-50 shrink-0 overflow-hidden">
                    {image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={image} alt="preview" className="max-w-full max-h-full object-contain" onError={(e) => (e.currentTarget.style.display = 'none')} />
                    ) : (
                      <ImageIcon size={24} className="text-gray-400" />
                    )}
                  </div>
                </div>
              </InputRow>

              <InputRow label="Nav Label Color" helper="Leave blank for default">
                <div className="flex items-center gap-3">
                  <input type="color" value={color || "#1e293b"} onChange={(e) => setColor(e.target.value)} className="h-10 w-14 rounded-lg border border-gray-200 cursor-pointer" />
                  <input type="text" value={color} onChange={(e) => setColor(e.target.value)} placeholder="#e43216" className="w-32 px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white font-mono" />
                  {color && (
                    <button type="button" onClick={() => setColor("")} className="text-xs text-blue-600 hover:text-blue-700 underline font-medium">Clear</button>
                  )}
                  {color && (
                    <span className="ml-4 font-semibold text-sm" style={{ color }}>Preview: {title || "Category"}</span>
                  )}
                </div>
              </InputRow>

              <InputRow label="Badge Text" helper="Optional (e.g. New Arrivals)">
                <input type="text" value={badge} onChange={(e) => setBadge(e.target.value)} placeholder="e.g. New Arrivals" className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white" />
              </InputRow>

              <div className="mt-8 border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white">
                <div className="bg-gray-50 border-b border-gray-200 p-4 font-semibold text-gray-700 flex justify-between items-center">
                  <span>Mega Menu Sections & Subcategories</span>
                  <button onClick={handleAddSection} className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-xl transition-colors" title="Add Section">
                    <Plus size={16} />
                  </button>
                </div>
                <div className="p-4 space-y-6">
                  {sections.map((section, sIdx) => (
                    <div key={sIdx} className="border border-gray-200 rounded-xl p-6 relative bg-gray-50/30">
                      <button onClick={() => handleRemoveSection(sIdx)} className="absolute top-6 right-6 text-red-500 hover:text-red-600 transition-colors" title="Remove Section">
                        <Trash2 size={16} />
                      </button>
                      
                      <InputRow label="Section Title">
                        <input type="text" value={section.title} onChange={(e) => handleSectionTitleChange(sIdx, e.target.value)} placeholder="e.g. Living Room" className="w-full max-w-md px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white" />
                      </InputRow>
                      
                      <div className="mt-4">
                        <label className="block text-right w-1/6 font-semibold text-gray-700 pt-2 float-left pr-4">Links</label>
                        <div className="w-5/6 ml-[16.666667%] space-y-2">
                          {section.links.map((link, lIdx) => (
                            <div key={lIdx} className="flex items-center gap-2">
                              <input type="text" value={link} onChange={(e) => handleLinkChange(sIdx, lIdx, e.target.value)} placeholder="e.g. Sofas" className="w-full max-w-sm px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white" />
                              <button onClick={() => handleRemoveLink(sIdx, lIdx)} className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-xl transition-colors" title="Remove Link">
                                <Trash2 size={14} />
                              </button>
                            </div>
                          ))}
                          <button onClick={() => handleAddLink(sIdx)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs flex items-center gap-1 mt-2 transition-colors">
                            <Plus size={12} /> Add Link
                          </button>
                        </div>
                        <div className="clear-both"></div>
                      </div>
                    </div>
                  ))}
                  
                  {sections.length === 0 && (
                    <div className="text-center p-8 text-gray-400">
                      No sections added.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Placeholders for SEO and Design */}
          {["seo", "design"].includes(activeTab) && (
            <div className="p-8 text-center text-gray-500">
              This tab is currently under construction and data will be implemented here soon.
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default function AddCategoryPage() {
  return (
    <React.Suspense fallback={<div className="p-8 text-center text-gray-500">Loading...</div>}>
      <AddCategoryForm />
    </React.Suspense>
  );
}
