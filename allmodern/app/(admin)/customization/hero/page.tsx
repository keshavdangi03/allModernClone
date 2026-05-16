"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Plus, Pencil, Trash2, X, ArrowLeft } from "lucide-react";

const DEFAULT_BANNERS = [
  { id: "1", title: "Designed for Staycations", subtitle: "", image: "/images/hero.png", ctaText: "Shop Now", ctaLink: "#" },
];

export default function HeroBannersPage() {
  const [banners, setBanners] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ title: "", subtitle: "", image: "", ctaText: "Shop Now", ctaLink: "#" });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const s = localStorage.getItem("allmodern_hero_banners");
    if (s) { try { setBanners(JSON.parse(s)); } catch {} }
    else { setBanners(DEFAULT_BANNERS); localStorage.setItem("allmodern_hero_banners", JSON.stringify(DEFAULT_BANNERS)); }
  }, []);

  const persist = (updated: any[]) => {
    setBanners(updated);
    localStorage.setItem("allmodern_hero_banners", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this banner?")) persist(banners.filter(b => b.id !== id));
  };

  const openAdd = () => {
    setForm({ title: "", subtitle: "", image: "", ctaText: "Shop Now", ctaLink: "#" });
    setEditingId(null);
    setShowForm(true);
  };

  const openEdit = (b: any) => {
    setForm({ title: b.title, subtitle: b.subtitle || "", image: b.image, ctaText: b.ctaText || "Shop Now", ctaLink: b.ctaLink || "#" });
    setEditingId(b.id);
    setShowForm(true);
  };

  const handleSave = () => {
    if (!form.title || !form.image) { alert("Title and Image URL are required."); return; }
    let updated;
    if (editingId) {
      updated = banners.map(b => b.id === editingId ? { ...b, ...form } : b);
    } else {
      updated = [...banners, { id: Date.now().toString(), ...form }];
    }
    persist(updated);
    setShowForm(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (showForm) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden max-w-4xl mx-auto mb-10">
        <div className="p-6 border-b border-gray-50 flex items-center gap-4">
          <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600"><ArrowLeft size={20} /></button>
          <h2 className="text-lg font-bold text-[#1f2937]">{editingId ? "Edit Hero Banner" : "Add Hero Banner"}</h2>
        </div>
        <div className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title <span className="text-red-500">*</span></label>
              <input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="e.g. Summer Collection" className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
              <input type="text" value={form.subtitle} onChange={e => setForm({ ...form, subtitle: e.target.value })} placeholder="Optional subtitle text" className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Image URL <span className="text-red-500">*</span></label>
              <input type="text" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} placeholder="/images/hero.png" className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">CTA Button Text</label>
              <input type="text" value={form.ctaText} onChange={e => setForm({ ...form, ctaText: e.target.value })} placeholder="Shop Now" className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">CTA Button Link</label>
              <input type="text" value={form.ctaLink} onChange={e => setForm({ ...form, ctaLink: e.target.value })} placeholder="/furniture" className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white" />
            </div>
          </div>
          {form.image && (
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Preview</p>
              <div className="relative h-40 rounded-xl overflow-hidden bg-gray-100">
                <Image src={form.image} alt="preview" fill className="object-cover" />
                <div className="absolute inset-0 bg-black/20 flex items-end justify-center pb-4">
                  <span className="text-white font-bold text-xl drop-shadow">{form.title}</span>
                </div>
              </div>
            </div>
          )}
          <div className="pt-4 flex justify-end">
            <button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl text-sm font-bold transition-colors">
              {editingId ? "Update Banner" : "Save Banner"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-h-[600px] flex flex-col max-w-5xl mx-auto">
      <div className="p-6 border-b border-gray-50 flex items-center justify-between shrink-0">
        <div>
          <h2 className="text-lg font-bold text-[#1f2937]">Hero Banners</h2>
          <p className="text-xs text-gray-500 mt-0.5">The first banner is shown on the homepage.</p>
        </div>
        <div className="flex items-center gap-3">
          {saved && <span className="text-green-600 text-sm font-medium">✓ Saved!</span>}
          <button onClick={openAdd} className="bg-[#1f2937] hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
            <Plus size={16} /> Add Hero Banner
          </button>
        </div>
      </div>
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="py-4 px-6 text-sm font-semibold text-gray-500 w-[20%]">Image</th>
              <th className="py-4 px-6 text-sm font-semibold text-gray-500 w-[50%]">Title</th>
              <th className="py-4 px-6 text-sm font-semibold text-gray-500 w-[10%]">CTA</th>
              <th className="py-4 px-6 text-sm font-semibold text-gray-500 text-right w-[20%]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {banners.map((banner, i) => (
              <tr key={banner.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="py-4 px-6">
                  <div className="w-20 h-12 rounded-lg overflow-hidden border border-gray-100 bg-gray-50 relative">
                    <Image src={banner.image} alt={banner.title} fill className="object-cover" />
                  </div>
                </td>
                <td className="py-4 px-6">
                  <p className="text-sm text-gray-700 font-medium">{banner.title}</p>
                  {banner.subtitle && <p className="text-xs text-gray-400 mt-0.5">{banner.subtitle}</p>}
                  {i === 0 && <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold mt-1 inline-block">ACTIVE</span>}
                </td>
                <td className="py-4 px-6 text-xs text-gray-500">{banner.ctaText}</td>
                <td className="py-4 px-6">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleDelete(banner.id)} className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 hover:border-red-200 transition-colors"><Trash2 size={14} /></button>
                    <button onClick={() => openEdit(banner)} className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-200 transition-colors"><Pencil size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
            {banners.length === 0 && (
              <tr><td colSpan={4} className="py-12 text-center text-gray-400">No banners yet. Click "Add Hero Banner" to create one.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
