"use client";

import React, { useState, useEffect } from "react";
import { Bold, Italic, Underline, Strikethrough, AlignLeft, AlignCenter, AlignRight, AlignJustify } from "lucide-react";

const DEFAULT_CONTENT = {
  title: "Privacy Policy",
  content: `1. Introduction\nWelcome to AllModern. We respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.\n\n2. Information We Collect\nWe may collect several types of information from and about users of our website, including:\n- Personal identifiers such as name, email address, postal address, phone number\n- Payment information (processed securely, never stored directly)\n- Usage data such as IP address, browser type, pages visited, and time spent\n\n3. How We Use Your Information\nWe use the information we collect to process and fulfill your orders, send you transactional and promotional emails, and improve our website and services.\n\n4. Contact Us\nIf you have questions about this Privacy Policy, contact us at privacy@allmodern.com.`,
};

export default function PrivacyPolicyPage() {
  const [title, setTitle] = useState(DEFAULT_CONTENT.title);
  const [content, setContent] = useState(DEFAULT_CONTENT.content);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const s = localStorage.getItem("allmodern_privacy_policy");
    if (s) {
      try {
        const d = JSON.parse(s);
        setTitle(d.title || DEFAULT_CONTENT.title);
        setContent(d.content || DEFAULT_CONTENT.content);
      } catch {}
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("allmodern_privacy_policy", JSON.stringify({ title, content }));
    window.dispatchEvent(new Event("storage"));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden max-w-4xl mx-auto mb-10">
      <div className="p-6 border-b border-gray-50 flex items-center justify-between shrink-0">
        <div>
          <h2 className="text-lg font-bold text-[#1f2937]">Privacy Policy</h2>
          <p className="text-xs text-gray-500 mt-0.5">Displayed at <strong>/privacy-policy</strong> and linked in the footer.</p>
        </div>
        {saved && <span className="text-green-600 text-sm font-medium">✓ Changes saved!</span>}
      </div>
      <div className="p-8 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Page Title <span className="text-red-500">*</span></label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Content <span className="text-red-500">*</span></label>
          <div className="border border-gray-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-500 transition-all">
            <div className="flex items-center flex-wrap gap-1 border-b border-gray-200 bg-gray-50/50 p-2">
              <button type="button" className="p-1.5 text-gray-600 hover:bg-gray-200 rounded transition-colors"><Bold size={16} /></button>
              <button type="button" className="p-1.5 text-gray-600 hover:bg-gray-200 rounded transition-colors"><Italic size={16} /></button>
              <button type="button" className="p-1.5 text-gray-600 hover:bg-gray-200 rounded transition-colors"><Underline size={16} /></button>
              <button type="button" className="p-1.5 text-gray-600 hover:bg-gray-200 rounded transition-colors"><Strikethrough size={16} /></button>
              <div className="w-px h-5 bg-gray-300 mx-1" />
              <button type="button" className="p-1.5 text-gray-600 hover:bg-gray-200 rounded transition-colors"><AlignLeft size={16} /></button>
              <button type="button" className="p-1.5 text-gray-600 hover:bg-gray-200 rounded transition-colors"><AlignCenter size={16} /></button>
              <button type="button" className="p-1.5 text-gray-600 hover:bg-gray-200 rounded transition-colors"><AlignRight size={16} /></button>
              <button type="button" className="p-1.5 text-gray-600 hover:bg-gray-200 rounded transition-colors"><AlignJustify size={16} /></button>
            </div>
            <textarea
              rows={14}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-3 text-sm border-none focus:ring-0 outline-none bg-white resize-y"
            />
          </div>
          <p className="text-xs text-gray-400 mt-2">This content will appear on the public /privacy-policy page.</p>
        </div>

        <div className="pt-2">
          <button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-sm font-medium transition-colors">
            Update Privacy Policy
          </button>
        </div>
      </div>
    </div>
  );
}
