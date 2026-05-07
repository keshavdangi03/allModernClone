"use client";

import React, { useState } from "react";
import { Bold, Italic, Underline, Strikethrough, AlignLeft, AlignCenter, AlignRight, AlignJustify } from "lucide-react";

export default function PrivacyPolicyPage() {
  const [title, setTitle] = useState("Privacy Policy");
  const [content, setContent] = useState("1. Introduction\nWelcome to NextMerce. We respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.\n2. Information We Collect\nWe may collect several types of information from and about users of our website, including:\n1. Personal identifiers such as name, email address, postal address, phone number\n2. Payment information");

  const handleSave = () => {
    alert("Privacy Policy updated successfully!");
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden max-w-4xl mx-auto mb-10">
      <div className="p-6 border-b border-gray-50 flex items-center justify-between shrink-0">
        <h2 className="text-lg font-bold text-[#1f2937]">Privacy Policy</h2>
      </div>
      <div className="p-8 space-y-6">
        
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Title <span className="text-red-500">*</span></label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white"
          />
        </div>

        {/* Description / Rich Text Editor Mockup */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description <span className="text-red-500">*</span></label>
          <div className="border border-gray-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-500 transition-all">
            {/* Toolbar */}
            <div className="flex items-center flex-wrap gap-1 border-b border-gray-200 bg-gray-50/50 p-2">
              <button className="p-1.5 text-gray-600 hover:bg-gray-200 rounded transition-colors"><Bold size={16} /></button>
              <button className="p-1.5 text-gray-600 hover:bg-gray-200 rounded transition-colors"><Italic size={16} /></button>
              <button className="p-1.5 text-gray-600 hover:bg-gray-200 rounded transition-colors"><Underline size={16} /></button>
              <button className="p-1.5 text-gray-600 hover:bg-gray-200 rounded transition-colors"><Strikethrough size={16} /></button>
              
              <div className="w-px h-5 bg-gray-300 mx-1"></div>
              
              <button className="p-1.5 text-gray-600 hover:bg-gray-200 rounded transition-colors"><AlignLeft size={16} /></button>
              <button className="p-1.5 text-gray-600 hover:bg-gray-200 rounded transition-colors"><AlignCenter size={16} /></button>
              <button className="p-1.5 text-gray-600 hover:bg-gray-200 rounded transition-colors"><AlignRight size={16} /></button>
              <button className="p-1.5 text-gray-600 hover:bg-gray-200 rounded transition-colors"><AlignJustify size={16} /></button>

              <div className="w-px h-5 bg-gray-300 mx-1"></div>
              
              <select className="text-sm border-none bg-transparent focus:ring-0 text-gray-600 cursor-pointer outline-none">
                <option>Normal</option>
                <option>Heading 1</option>
                <option>Heading 2</option>
              </select>

              <div className="w-px h-5 bg-gray-300 mx-1"></div>

              <select className="text-sm border-none bg-transparent focus:ring-0 text-gray-600 cursor-pointer outline-none">
                <option>Normal</option>
                <option>Arial</option>
                <option>Sans-serif</option>
              </select>

              <div className="w-px h-5 bg-gray-300 mx-1"></div>

              <button className="p-1.5 text-gray-600 hover:bg-gray-200 rounded transition-colors font-serif font-bold px-2">A</button>
              <button className="p-1.5 text-gray-600 hover:bg-gray-200 rounded transition-colors font-serif px-2 line-through decoration-dotted">A</button>
            </div>
            
            {/* Textarea */}
            <textarea
              rows={12}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-3 text-sm border-none focus:ring-0 outline-none bg-white resize-y"
            />
          </div>
        </div>

        <div className="pt-4">
          <button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-sm font-medium transition-colors"
          >
            Update Privacy Policy
          </button>
        </div>
      </div>
    </div>
  );
}
