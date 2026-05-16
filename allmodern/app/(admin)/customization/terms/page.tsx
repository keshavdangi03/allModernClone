"use client";

import React, { useState, useEffect } from "react";
import { Bold, Italic, Underline, Strikethrough, AlignLeft, AlignCenter, AlignRight, AlignJustify } from "lucide-react";

const DEFAULT_CONTENT = {
  title: "Terms and Conditions of Use",
  subtitle: "Welcome to AllModern. By accessing or using our website, you agree to be bound by these Terms and Conditions.",
  content: `1. Introduction\nWelcome to AllModern ("we", "our", or "us"). These Terms and Conditions govern your use of our website, mobile application, and services. By accessing or using our Services, you agree to be bound by these Terms.\n\n2. Account Registration\nTo access certain features, you may register for an account. You agree to provide accurate, current, and complete information. You are responsible for maintaining the confidentiality of your credentials.\n\n3. Products and Purchases\nAll purchases are subject to product availability. We reserve the right to limit quantities. Prices may change without notice.\n\n4. Return Policy\nWe offer a 30-day return policy for most items in original condition and packaging.\n\n5. Intellectual Property\nAll content on this website is the property of AllModern or its content suppliers and is protected by intellectual property laws.\n\n6. Governing Law\nThese Terms shall be governed by the laws of the Commonwealth of Massachusetts.\n\n7. Contact Us\nQuestions about these Terms? Contact us at legal@allmodern.com.`,
};

export default function TermsConditionsPage() {
  const [title, setTitle] = useState(DEFAULT_CONTENT.title);
  const [subtitle, setSubtitle] = useState(DEFAULT_CONTENT.subtitle);
  const [content, setContent] = useState(DEFAULT_CONTENT.content);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const s = localStorage.getItem("allmodern_terms_conditions");
    if (s) {
      try {
        const d = JSON.parse(s);
        setTitle(d.title || DEFAULT_CONTENT.title);
        setSubtitle(d.subtitle || DEFAULT_CONTENT.subtitle);
        setContent(d.content || DEFAULT_CONTENT.content);
      } catch {}
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("allmodern_terms_conditions", JSON.stringify({ title, subtitle, content }));
    window.dispatchEvent(new Event("storage"));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden max-w-4xl mx-auto mb-10">
      <div className="p-6 border-b border-gray-50 flex items-center justify-between shrink-0">
        <div>
          <h2 className="text-lg font-bold text-[#1f2937]">Terms and Conditions</h2>
          <p className="text-xs text-gray-500 mt-0.5">Displayed at <strong>/terms</strong> and linked in the footer.</p>
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
          <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle / Introduction</label>
          <input
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
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
          <p className="text-xs text-gray-400 mt-2">This content will appear on the public /terms page.</p>
        </div>

        <div className="pt-2">
          <button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-sm font-medium transition-colors">
            Update Terms & Conditions
          </button>
        </div>
      </div>
    </div>
  );
}
