"use client";

import React, { useState, useEffect } from "react";

const DEFAULTS = {
  metaTitle: "AllModern - Shop Modern Furniture & Décor",
  metaDescription: "Shop AllModern for the best of modern in every style, smartly priced and delivered fast + free.",
  metaKeywords: "furniture, modern furniture, decor, allmodern, sofas, lighting, rugs",
};

export default function SeoSettingsPage() {
  const [metaTitle, setMetaTitle] = useState(DEFAULTS.metaTitle);
  const [metaDescription, setMetaDescription] = useState(DEFAULTS.metaDescription);
  const [metaKeywords, setMetaKeywords] = useState(DEFAULTS.metaKeywords);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const s = localStorage.getItem("allmodern_seo_settings");
    if (s) {
      try {
        const d = JSON.parse(s);
        setMetaTitle(d.metaTitle || DEFAULTS.metaTitle);
        setMetaDescription(d.metaDescription || DEFAULTS.metaDescription);
        setMetaKeywords(d.metaKeywords || DEFAULTS.metaKeywords);
      } catch {}
    }
  }, []);

  const handleSave = () => {
    const data = { metaTitle, metaDescription, metaKeywords };
    localStorage.setItem("allmodern_seo_settings", JSON.stringify(data));
    window.dispatchEvent(new Event("storage"));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden max-w-4xl mx-auto">
      <div className="p-6 border-b border-gray-50 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-[#1f2937]">SEO Settings</h2>
          <p className="text-xs text-gray-500 mt-0.5">Controls browser tab title and search engine metadata.</p>
        </div>
        {saved && <span className="text-green-600 text-sm font-medium">✓ Changes saved!</span>}
      </div>

      <div className="p-8 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Meta Title <span className="text-red-500">*</span></label>
          <input type="text" value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white" />
          <p className="text-xs text-gray-400 mt-1">{metaTitle.length}/60 characters (recommended: 60)</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description <span className="text-red-500">*</span></label>
          <textarea rows={4} value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white resize-y" />
          <p className="text-xs text-gray-400 mt-1">{metaDescription.length}/160 characters (recommended: 160)</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Meta Keywords</label>
          <input type="text" value={metaKeywords} onChange={(e) => setMetaKeywords(e.target.value)} className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white" />
          <p className="text-xs text-gray-500 mt-2">Separate keywords with a comma.</p>
        </div>

        <div className="p-4 bg-blue-50 rounded-xl text-sm">
          <p className="font-semibold mb-1 text-blue-700">Live Search Preview</p>
          <p className="font-bold text-[#1a0dab] text-base">{metaTitle}</p>
          <p className="text-[#006621] text-xs">allmodern.com</p>
          <p className="text-gray-600 text-xs mt-1">{metaDescription}</p>
        </div>

        <div className="pt-4">
          <button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-sm font-medium transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
