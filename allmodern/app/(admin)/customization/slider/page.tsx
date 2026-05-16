"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Plus, Pencil, Trash2, ArrowLeft } from "lucide-react";

const DEFAULT_SLIDERS = [
  { id: "1", name: "Modern Living Room Collection", image: "/images/cat_living_room.png", link: "/furniture" },
  { id: "2", name: "Outdoor Collection", image: "/images/cat_outdoor.png", link: "/outdoor" },
];

export default function HeroSlidersPage() {
  const [sliders, setSliders] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", image: "", link: "" });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const s = localStorage.getItem("allmodern_hero_slider");
    if (s) { try { setSliders(JSON.parse(s)); } catch {} }
    else { setSliders(DEFAULT_SLIDERS); localStorage.setItem("allmodern_hero_slider", JSON.stringify(DEFAULT_SLIDERS)); }
  }, []);

  const persist = (updated: any[]) => {
    setSliders(updated);
    localStorage.setItem("allmodern_hero_slider", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this slider?")) persist(sliders.filter(s => s.id !== id));
  };

  const openAdd = () => { setForm({ name: "", image: "", link: "" }); setEditingId(null); setShowForm(true); };
  const openEdit = (s: any) => { setForm({ name: s.name, image: s.image, link: s.link || "" }); setEditingId(s.id); setShowForm(true); };

  const handleSave = () => {
    if (!form.name || !form.image) { alert("Name and Image URL are required."); return; }
    const updated = editingId
      ? sliders.map(s => s.id === editingId ? { ...s, ...form } : s)
      : [...sliders, { id: Date.now().toString(), ...form }];
    persist(updated);
    setShowForm(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (showForm) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden max-w-4xl mx-auto">
        <div className="p-6 border-b border-gray-50 flex items-center gap-4">
          <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600"><ArrowLeft size={20} /></button>
          <h2 className="text-lg font-bold text-[#1f2937]">{editingId ? "Edit Slider" : "Add Slider"}</h2>
        </div>
        <div className="p-8 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Slider Name <span className="text-red-500">*</span></label>
            <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Summer Collection" className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Image URL <span className="text-red-500">*</span></label>
            <input type="text" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} placeholder="/images/cat_outdoor.png" className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Link (optional)</label>
            <input type="text" value={form.link} onChange={e => setForm({ ...form, link: e.target.value })} placeholder="/furniture" className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white" />
          </div>
          {form.image && (
            <div className="relative h-36 rounded-xl overflow-hidden bg-gray-100">
              <Image src={form.image} alt="preview" fill className="object-cover" />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <span className="text-white font-bold text-lg drop-shadow">{form.name}</span>
              </div>
            </div>
          )}
          <div className="pt-2 flex justify-end">
            <button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl text-sm font-bold transition-colors">
              {editingId ? "Update Slider" : "Save Slider"}
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
          <h2 className="text-lg font-bold text-[#1f2937]">Hero Sliders</h2>
          <p className="text-xs text-gray-500 mt-0.5">Manage the hero carousel slides.</p>
        </div>
        <div className="flex items-center gap-3">
          {saved && <span className="text-green-600 text-sm font-medium">✓ Saved!</span>}
          <button onClick={openAdd} className="bg-[#1f2937] hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
            <Plus size={16} /> Add Slider
          </button>
        </div>
      </div>
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="py-4 px-6 text-sm font-semibold text-gray-500 w-[20%]">Image</th>
              <th className="py-4 px-6 text-sm font-semibold text-gray-500 w-[50%]">Name</th>
              <th className="py-4 px-6 text-sm font-semibold text-gray-500 w-[15%]">Link</th>
              <th className="py-4 px-6 text-sm font-semibold text-gray-500 text-right w-[15%]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {sliders.map((slider) => (
              <tr key={slider.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="py-4 px-6">
                  <div className="w-20 h-12 rounded-lg overflow-hidden border border-gray-100 bg-gray-50 relative">
                    <Image src={slider.image} alt={slider.name} fill className="object-cover" />
                  </div>
                </td>
                <td className="py-4 px-6 text-sm text-gray-700 font-medium">{slider.name}</td>
                <td className="py-4 px-6 text-xs text-gray-400 truncate max-w-[120px]">{slider.link || "—"}</td>
                <td className="py-4 px-6">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleDelete(slider.id)} className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 hover:border-red-200 transition-colors"><Trash2 size={14} /></button>
                    <button onClick={() => openEdit(slider)} className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-200 transition-colors"><Pencil size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
            {sliders.length === 0 && (
              <tr><td colSpan={4} className="py-12 text-center text-gray-400">No sliders yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
