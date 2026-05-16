"use client";

import React, { useState, useEffect } from "react";

const DEFAULTS = {
  promoBarText: "Furniture Over $35 Ships FREE*",
  promoBarLink: "#",
  supportEmail: "support@allmodern.com",
  supportPhone: "1-866-672-2719",
};

export default function HeaderSettingsPage() {
  const [promoBarText, setPromoBarText] = useState(DEFAULTS.promoBarText);
  const [promoBarLink, setPromoBarLink] = useState(DEFAULTS.promoBarLink);
  const [supportEmail, setSupportEmail] = useState(DEFAULTS.supportEmail);
  const [supportPhone, setSupportPhone] = useState(DEFAULTS.supportPhone);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const s = localStorage.getItem("allmodern_header_settings");
    if (s) {
      try {
        const d = JSON.parse(s);
        setPromoBarText(d.promoBarText || DEFAULTS.promoBarText);
        setPromoBarLink(d.promoBarLink || DEFAULTS.promoBarLink);
        setSupportEmail(d.supportEmail || DEFAULTS.supportEmail);
        setSupportPhone(d.supportPhone || DEFAULTS.supportPhone);
      } catch {}
    }
  }, []);

  const handleSave = () => {
    const data = { promoBarText, promoBarLink, supportEmail, supportPhone };
    localStorage.setItem("allmodern_header_settings", JSON.stringify(data));
    window.dispatchEvent(new Event("storage"));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden max-w-4xl mx-auto">
      <div className="p-6 border-b border-gray-50 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-[#1f2937]">Header Settings</h2>
          <p className="text-xs text-gray-500 mt-0.5">Controls the promotional banner and contact details shown in the site header.</p>
        </div>
        {saved && <span className="text-green-600 text-sm font-medium">✓ Changes saved!</span>}
      </div>

      <div className="p-8 space-y-6">
        {/* Promo Bar Preview */}
        <div className="rounded-lg overflow-hidden border border-gray-200">
          <p className="text-xs font-semibold text-gray-500 px-3 py-2 bg-gray-50 border-b border-gray-200">Promotional Bar Preview</p>
          <div className="bg-black text-white px-4 py-2 flex items-center justify-between text-[11px]">
            <span className="text-[#a1a1a1]">wayfair · <strong className="text-white">ALLMODERN</strong> · BIRCH LN · JOSS &amp; MAIN</span>
            <span className="font-bold text-white">{promoBarText || "Promotional text..."}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Promo Bar Text <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={promoBarText}
              onChange={(e) => setPromoBarText(e.target.value)}
              placeholder="e.g. Furniture Over $35 Ships FREE*"
              className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Promo Bar Link</label>
            <input
              type="text"
              value={promoBarLink}
              onChange={(e) => setPromoBarLink(e.target.value)}
              placeholder="/sale"
              className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Support Email</label>
            <input
              type="email"
              value={supportEmail}
              onChange={(e) => setSupportEmail(e.target.value)}
              className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Support Phone</label>
            <input
              type="text"
              value={supportPhone}
              onChange={(e) => setSupportPhone(e.target.value)}
              className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white"
            />
          </div>
        </div>

        <div className="pt-4">
          <button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-sm font-medium transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
