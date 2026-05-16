"use client";

import React, { useState, useEffect } from "react";
import { Pencil, Trash2, ArrowLeft, Plus, Star } from "lucide-react";
import Image from "next/image";

const DEFAULT_TESTIMONIALS = [
  { id: "1", name: "Sarah M.", designation: "Verified Buyer", rating: 5, comment: "Absolutely love my new sofa! The quality is exceptional and it arrived faster than expected. The modern design fits perfectly in my living room.", image: "/images/cat_living_room.png" },
  { id: "2", name: "James K.", designation: "Verified Buyer", rating: 5, comment: "Great experience from start to finish. The furniture is well-made and the delivery team was professional. Will definitely shop here again.", image: "/images/cat_bedroom.png" },
  { id: "3", name: "Emily R.", designation: "Verified Buyer", rating: 4, comment: "Beautiful dining set that looks even better in person. Assembly was straightforward and the instructions were clear.", image: "/images/cat_dining.png" },
];

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [editingTestimonial, setEditingTestimonial] = useState<any>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [newForm, setNewForm] = useState({ name: "", designation: "Verified Buyer", rating: 5, comment: "", image: "" });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const s = localStorage.getItem("allmodern_testimonials");
    if (s) { try { setTestimonials(JSON.parse(s)); } catch {} }
    else { setTestimonials(DEFAULT_TESTIMONIALS); localStorage.setItem("allmodern_testimonials", JSON.stringify(DEFAULT_TESTIMONIALS)); }
  }, []);

  const persist = (updated: any[]) => {
    setTestimonials(updated);
    localStorage.setItem("allmodern_testimonials", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this testimonial?")) persist(testimonials.filter(t => t.id !== id));
  };

  const handleUpdate = () => {
    if (!editingTestimonial.name || !editingTestimonial.comment) { alert("Name and comment are required."); return; }
    persist(testimonials.map(t => t.id === editingTestimonial.id ? editingTestimonial : t));
    setEditingTestimonial(null);
  };

  const handleAddSave = () => {
    if (!newForm.name || !newForm.comment) { alert("Name and comment are required."); return; }
    const entry = { ...newForm, id: Date.now().toString() };
    persist([...testimonials, entry]);
    setNewForm({ name: "", designation: "Verified Buyer", rating: 5, comment: "", image: "" });
    setShowAdd(false);
  };

  const StarDisplay = ({ rating }: { rating: number }) => (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <Star key={i} size={13} className={i <= rating ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"} />
      ))}
    </div>
  );

  // ----- Edit View -----
  if (editingTestimonial) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden max-w-4xl mx-auto mb-10">
        <div className="p-6 border-b border-gray-50 flex items-center gap-4">
          <button onClick={() => setEditingTestimonial(null)} className="text-gray-400 hover:text-gray-600"><ArrowLeft size={20} /></button>
          <h2 className="text-lg font-bold text-[#1f2937]">Edit Testimonial</h2>
        </div>
        <div className="p-8 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Author Name <span className="text-red-500">*</span></label>
              <input type="text" value={editingTestimonial.name} onChange={e => setEditingTestimonial({ ...editingTestimonial, name: e.target.value })} className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Designation</label>
              <input type="text" value={editingTestimonial.designation} onChange={e => setEditingTestimonial({ ...editingTestimonial, designation: e.target.value })} className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rating (1-5) <span className="text-red-500">*</span></label>
              <div className="flex gap-2 items-center">
                {[1,2,3,4,5].map(i => (
                  <button key={i} type="button" onClick={() => setEditingTestimonial({ ...editingTestimonial, rating: i })}>
                    <Star size={24} className={i <= editingTestimonial.rating ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"} />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Avatar Image URL</label>
              <input type="text" value={editingTestimonial.image || ""} onChange={e => setEditingTestimonial({ ...editingTestimonial, image: e.target.value })} placeholder="/images/cat_bedroom.png" className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Comment <span className="text-red-500">*</span></label>
            <textarea rows={4} value={editingTestimonial.comment} onChange={e => setEditingTestimonial({ ...editingTestimonial, comment: e.target.value })} className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white resize-y" />
          </div>
          <div className="pt-2 flex justify-end">
            <button onClick={handleUpdate} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl text-sm font-bold transition-colors">Update Testimonial</button>
          </div>
        </div>
      </div>
    );
  }

  // ----- Add View -----
  if (showAdd) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden max-w-4xl mx-auto mb-10">
        <div className="p-6 border-b border-gray-50 flex items-center gap-4">
          <button onClick={() => setShowAdd(false)} className="text-gray-400 hover:text-gray-600"><ArrowLeft size={20} /></button>
          <h2 className="text-lg font-bold text-[#1f2937]">Add Testimonial</h2>
        </div>
        <div className="p-8 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Author Name <span className="text-red-500">*</span></label>
              <input type="text" value={newForm.name} onChange={e => setNewForm({ ...newForm, name: e.target.value })} className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Designation</label>
              <input type="text" value={newForm.designation} onChange={e => setNewForm({ ...newForm, designation: e.target.value })} className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
              <div className="flex gap-2 items-center">
                {[1,2,3,4,5].map(i => (
                  <button key={i} type="button" onClick={() => setNewForm({ ...newForm, rating: i })}>
                    <Star size={24} className={i <= newForm.rating ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"} />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Avatar Image URL</label>
              <input type="text" value={newForm.image} onChange={e => setNewForm({ ...newForm, image: e.target.value })} placeholder="/images/cat_bedroom.png" className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Comment <span className="text-red-500">*</span></label>
            <textarea rows={4} value={newForm.comment} onChange={e => setNewForm({ ...newForm, comment: e.target.value })} className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white resize-y" />
          </div>
          <div className="pt-2 flex justify-end">
            <button onClick={handleAddSave} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl text-sm font-bold transition-colors">Save Testimonial</button>
          </div>
        </div>
      </div>
    );
  }

  // ----- List View -----
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-h-[600px] flex flex-col max-w-5xl mx-auto">
      <div className="p-6 border-b border-gray-50 flex items-center justify-between shrink-0">
        <div>
          <h2 className="text-lg font-bold text-[#1f2937]">Testimonials</h2>
          <p className="text-xs text-gray-500 mt-0.5">Shown in the customer reviews section on the homepage.</p>
        </div>
        <div className="flex items-center gap-3">
          {saved && <span className="text-green-600 text-sm font-medium">✓ Saved!</span>}
          <button onClick={() => setShowAdd(true)} className="bg-[#1f2937] hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
            <Plus size={16} /> Add Testimonial
          </button>
        </div>
      </div>
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="py-4 px-6 text-sm font-semibold text-[#1f2937] w-[60px]">Avatar</th>
              <th className="py-4 px-6 text-sm font-semibold text-[#1f2937]">Author</th>
              <th className="py-4 px-6 text-sm font-semibold text-[#1f2937]">Rating</th>
              <th className="py-4 px-6 text-sm font-semibold text-[#1f2937]">Comment</th>
              <th className="py-4 px-6 text-sm font-semibold text-[#1f2937] text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {testimonials.map((t) => (
              <tr key={t.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="py-4 px-6">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-100 bg-gray-50 relative">
                    {t.image ? <Image src={t.image} alt={t.name} fill className="object-cover" /> : (
                      <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-500 text-sm font-bold">{t.name[0]}</div>
                    )}
                  </div>
                </td>
                <td className="py-4 px-6">
                  <p className="text-sm font-medium text-[#1f2937]">{t.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{t.designation}</p>
                </td>
                <td className="py-4 px-6"><StarDisplay rating={t.rating} /></td>
                <td className="py-4 px-6 text-sm text-gray-500 max-w-[280px]">
                  <p className="line-clamp-2">{t.comment}</p>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleDelete(t.id)} className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 hover:border-red-200 transition-colors"><Trash2 size={14} /></button>
                    <button onClick={() => setEditingTestimonial({ ...t })} className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-200 transition-colors"><Pencil size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
            {testimonials.length === 0 && (
              <tr><td colSpan={5} className="py-12 text-center text-gray-400">No testimonials yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
