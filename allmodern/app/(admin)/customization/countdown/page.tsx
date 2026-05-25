"use client";

import React, { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import { getCountdown, updateCountdown } from "@/lib/actions/settings";

type CountdownItem = {
  title: string;
  subtitle: string;
  endDate: string;
  enabled: boolean;
  color: string;
};

export default function CountdownPage() {
  const [form, setForm] = useState<CountdownItem>({ title: "", subtitle: "", endDate: "", enabled: true, color: "#e43a06" });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function load() {
      const data = await getCountdown();
      if (data) {
        setForm({
          title: data.title,
          subtitle: "Up to 60% Off", // Fallback since subtitle wasn't originally in DB
          endDate: data.endDate,
          enabled: data.enabled,
          color: data.color
        });
      }
    }
    load();
  }, []);

  const handleSave = async () => {
    await updateCountdown({
      enabled: form.enabled,
      endDate: form.endDate,
      title: form.title,
      color: form.color,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const toggleEnabled = async () => {
    const updated = { ...form, enabled: !form.enabled };
    setForm(updated);
    await updateCountdown({
      enabled: updated.enabled,
      endDate: updated.endDate,
      title: updated.title,
      color: updated.color,
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden max-w-4xl mx-auto">
      <div className="p-6 border-b border-gray-50 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-[#1f2937]">Countdown Timer</h2>
          <p className="text-xs text-gray-500 mt-0.5">Configure the countdown banner shown on the homepage.</p>
        </div>
        {saved && <span className="text-green-600 text-sm font-medium">✓ Changes saved!</span>}
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
              <input type="color" value={form.color} onChange={e => setForm({ ...form, color: e.target.value })} className="h-10 w-16 rounded-lg border border-gray-200 cursor-pointer" />
              <span className="text-sm text-gray-500">{form.color}</span>
            </div>
          </div>
        </div>

        {/* Live Preview */}
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Preview</p>
          <div className="rounded-lg overflow-hidden" style={{ backgroundColor: form.color }}>
            <div className="px-6 py-3 flex items-center justify-between text-white">
              <div>
                {form.subtitle && <span className="text-sm font-bold">{form.subtitle} | </span>}
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
            <input type="checkbox" checked={form.enabled} onChange={toggleEnabled} className="sr-only peer" />
            <div className="w-10 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
          <span className="text-sm text-gray-700">Enable countdown on storefront</span>
        </div>

        <div className="pt-4 border-t border-gray-100 flex justify-end">
          <button onClick={handleSave} className="bg-[#1f2937] hover:bg-gray-800 text-white px-8 py-3 rounded-xl text-sm font-medium transition-colors">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
