"use client";

import React, { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, ArrowLeft, Clock } from "lucide-react";

type CountdownItem = {
  id: string;
  title: string;
  subtitle: string;
  endDate: string;
  enabled: boolean;
  bgColor: string;
};

const DEFAULT_COUNTDOWN: CountdownItem = {
  id: "1",
  title: "48-Hour Markdowns",
  subtitle: "Up to 60% Off",
  endDate: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString().slice(0, 16),
  enabled: true,
  bgColor: "#e43a06",
};

export default function CountdownPage() {
  const [countdowns, setCountdowns] = useState<CountdownItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<CountdownItem, "id">>({ title: "", subtitle: "", endDate: "", enabled: true, bgColor: "#e43a06" });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const s = localStorage.getItem("allmodern_countdown");
    if (s) { try { setCountdowns(JSON.parse(s)); } catch {} }
    else { setCountdowns([DEFAULT_COUNTDOWN]); localStorage.setItem("allmodern_countdown", JSON.stringify([DEFAULT_COUNTDOWN])); }
  }, []);

  const persist = (updated: CountdownItem[]) => {
    setCountdowns(updated);
    localStorage.setItem("allmodern_countdown", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this countdown?")) persist(countdowns.filter(c => c.id !== id));
  };

  const toggleEnabled = (id: string) => {
    persist(countdowns.map(c => c.id === id ? { ...c, enabled: !c.enabled } : c));
  };

  const openAdd = () => {
    setForm({ title: "", subtitle: "", endDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 16), enabled: true, bgColor: "#e43a06" });
    setEditingId(null);
    setShowForm(true);
  };

  const openEdit = (c: CountdownItem) => {
    setForm({ title: c.title, subtitle: c.subtitle, endDate: c.endDate, enabled: c.enabled, bgColor: c.bgColor });
    setEditingId(c.id);
    setShowForm(true);
  };

  const handleSave = () => {
    if (!form.title || !form.endDate) { alert("Title and End Date are required."); return; }
    const updated = editingId
      ? countdowns.map(c => c.id === editingId ? { ...c, ...form } : c)
      : [...countdowns, { id: Date.now().toString(), ...form }];
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
          <h2 className="text-lg font-bold text-[#1f2937]">{editingId ? "Edit Countdown" : "Add Countdown"}</h2>
        </div>
        <div className="p-8 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title <span className="text-red-500">*</span></label>
              <input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="48-Hour Markdowns" className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
              <input type="text" value={form.subtitle} onChange={e => setForm({ ...form, subtitle: e.target.value })} placeholder="Up to 60% Off" className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">End Date & Time <span className="text-red-500">*</span></label>
              <input type="datetime-local" value={form.endDate} onChange={e => setForm({ ...form, endDate: e.target.value })} className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Background Color</label>
              <div className="flex items-center gap-3">
                <input type="color" value={form.bgColor} onChange={e => setForm({ ...form, bgColor: e.target.value })} className="h-10 w-16 rounded-lg border border-gray-200 cursor-pointer" />
                <span className="text-sm text-gray-500">{form.bgColor}</span>
              </div>
            </div>
          </div>

          {/* Live Preview */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Preview</p>
            <div className="rounded-lg overflow-hidden" style={{ backgroundColor: form.bgColor }}>
              <div className="px-6 py-3 flex items-center justify-between text-white">
                <div>
                  <span className="text-sm font-bold">{form.subtitle} | </span>
                  <span className="text-sm font-bold">{form.title}</span>
                </div>
                <div className="flex items-center gap-1 text-sm font-bold bg-white/20 px-3 py-1 rounded">
                  <Clock size={14} />
                  <span>12:00:00</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked={form.enabled} onChange={e => setForm({ ...form, enabled: e.target.checked })} className="sr-only peer" />
              <div className="w-10 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
            <span className="text-sm text-gray-700">Enable countdown on storefront</span>
          </div>

          <div className="pt-2 flex justify-end">
            <button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl text-sm font-bold transition-colors">
              {editingId ? "Update Countdown" : "Save Countdown"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-h-[500px] flex flex-col max-w-5xl mx-auto">
      <div className="p-6 border-b border-gray-50 flex items-center justify-between shrink-0">
        <div>
          <h2 className="text-lg font-bold text-[#1f2937]">Countdown Timers</h2>
          <p className="text-xs text-gray-500 mt-0.5">Shows a countdown banner on the homepage. The first enabled timer is shown.</p>
        </div>
        <div className="flex items-center gap-3">
          {saved && <span className="text-green-600 text-sm font-medium">✓ Saved!</span>}
          <button onClick={openAdd} className="bg-[#1f2937] hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
            <Plus size={16} /> Add Countdown
          </button>
        </div>
      </div>
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="py-4 px-6 text-sm font-semibold text-gray-500 w-[30%]">Title</th>
              <th className="py-4 px-6 text-sm font-semibold text-gray-500 w-[30%]">End Date</th>
              <th className="py-4 px-6 text-sm font-semibold text-gray-500 w-[15%]">Color</th>
              <th className="py-4 px-6 text-sm font-semibold text-gray-500 w-[10%]">Status</th>
              <th className="py-4 px-6 text-sm font-semibold text-gray-500 text-right w-[15%]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {countdowns.map((cd) => (
              <tr key={cd.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="py-4 px-6">
                  <p className="text-sm font-medium text-gray-700">{cd.title}</p>
                  {cd.subtitle && <p className="text-xs text-gray-400">{cd.subtitle}</p>}
                </td>
                <td className="py-4 px-6 text-sm text-gray-500">{new Date(cd.endDate).toLocaleString()}</td>
                <td className="py-4 px-6">
                  <div className="w-7 h-7 rounded-md border border-gray-200" style={{ backgroundColor: cd.bgColor }} />
                </td>
                <td className="py-4 px-6">
                  <button onClick={() => toggleEnabled(cd.id)} className={`text-xs font-bold px-2 py-1 rounded-full ${cd.enabled ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                    {cd.enabled ? "ON" : "OFF"}
                  </button>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleDelete(cd.id)} className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 hover:border-red-200 transition-colors"><Trash2 size={14} /></button>
                    <button onClick={() => openEdit(cd)} className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-200 transition-colors"><Pencil size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
            {countdowns.length === 0 && (
              <tr><td colSpan={5} className="py-12 text-center text-gray-400">No countdowns yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
