"use client";

import React, { useState } from "react";

export default function HeaderSettingsPage() {
  const [supportEmail, setSupportEmail] = useState("support@allmodernclone.com");
  const [supportPhone, setSupportPhone] = useState("+1 800 123 4567");

  const handleSave = () => {
    alert("Header Settings saved successfully!");
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden max-w-4xl mx-auto">
      {/* Header */}
      <div className="p-6 border-b border-gray-50">
        <h2 className="text-lg font-bold text-[#1f2937]">Header Settings</h2>
      </div>

      {/* Form Content */}
      <div className="p-8 space-y-6">
        
        {/* Site Logo */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Site Logo</label>
          <div className="flex items-center gap-0 w-full border border-gray-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-500 max-w-md">
            <label className="bg-blue-50 text-blue-600 px-4 py-3 text-sm font-medium cursor-pointer border-r border-gray-200 hover:bg-blue-100 transition-colors whitespace-nowrap">
              Choose File
              <input type="file" className="hidden" />
            </label>
            <div className="px-4 py-3 text-sm text-gray-400 bg-white flex-1 truncate">
              logo.png
            </div>
          </div>
        </div>

        {/* Favicon */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Favicon</label>
          <div className="flex items-center gap-0 w-full border border-gray-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-500 max-w-md">
            <label className="bg-blue-50 text-blue-600 px-4 py-3 text-sm font-medium cursor-pointer border-r border-gray-200 hover:bg-blue-100 transition-colors whitespace-nowrap">
              Choose File
              <input type="file" className="hidden" />
            </label>
            <div className="px-4 py-3 text-sm text-gray-400 bg-white flex-1 truncate">
              favicon.ico
            </div>
          </div>
        </div>

        {/* Support Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Support Email</label>
          <input
            type="email"
            value={supportEmail}
            onChange={(e) => setSupportEmail(e.target.value)}
            className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white"
          />
        </div>

        {/* Support Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Support Phone</label>
          <input
            type="text"
            value={supportPhone}
            onChange={(e) => setSupportPhone(e.target.value)}
            className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white"
          />
        </div>

        {/* Submit */}
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
