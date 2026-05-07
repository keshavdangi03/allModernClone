"use client";

import React, { useState } from "react";

export default function AddCouponPage() {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState("0");
  const [maxRedemptions, setMaxRedemptions] = useState("0");
  const [timesRedemptions, setTimesRedemptions] = useState("0");

  const handleSave = () => {
    if (!name || !code || !discount) {
      alert("Please fill in required fields (Name, Code, Discount).");
      return;
    }
    alert("Coupon saved successfully!");
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden max-w-4xl mx-auto">
      {/* Header */}
      <div className="p-6 border-b border-gray-50">
        <h2 className="text-lg font-bold text-[#1f2937]">Add Coupon</h2>
      </div>

      {/* Form Content */}
      <div className="p-8 space-y-6">
        
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Coupon Name <span className="text-red-500">*</span></label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white"
          />
        </div>

        {/* Code */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Coupon Code <span className="text-red-500">*</span></label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white"
          />
        </div>

        {/* Discount (%) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Discount (%) <span className="text-red-500">*</span></label>
          <input
            type="number"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white"
          />
        </div>

        {/* Max Redemptions */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Max Redemptions <span className="text-red-500">*</span></label>
          <input
            type="number"
            value={maxRedemptions}
            onChange={(e) => setMaxRedemptions(e.target.value)}
            className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white"
          />
        </div>

        {/* Times Redemptions */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Times Redemptions</label>
          <input
            type="number"
            value={timesRedemptions}
            onChange={(e) => setTimesRedemptions(e.target.value)}
            className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white"
          />
        </div>

        {/* Submit */}
        <div className="pt-4">
          <button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-sm font-medium transition-colors"
          >
            Save Coupon
          </button>
        </div>
      </div>
    </div>
  );
}
