"use client";

import React, { useState } from "react";
import { Pencil, Trash2, ArrowLeft, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const initialTestimonials = [
  { id: 1, name: "Wilson Dias", designation: "Backend Developer", rating: 5, comment: "Lorem ipsum dolor sit amet, adipiscing elit. Donec malesuada justo vitaeauge suscipit beautiful vehicula", image: "/images/cat_living_room.png" },
  { id: 2, name: "John Doe", designation: "Frontend Developer", rating: 5, comment: "Very happy with my purchase. Fast delivery and easy assembly.", image: "/images/cat_bedroom.png" },
];

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [editingTestimonial, setEditingTestimonial] = useState<any>(null);

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this testimonial?")) {
      setTestimonials(testimonials.filter((t) => t.id !== id));
    }
  };

  const handleEditClick = (testimonial: any) => {
    setEditingTestimonial({ ...testimonial });
  };

  const handleUpdate = () => {
    if (editingTestimonial) {
      setTestimonials(testimonials.map(t => t.id === editingTestimonial.id ? editingTestimonial : t));
      setEditingTestimonial(null);
      alert("Testimonial updated successfully!");
    }
  };

  // ----- Edit View -----
  if (editingTestimonial) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden max-w-4xl mx-auto mb-10">
        <div className="p-6 border-b border-gray-50 flex items-center gap-4">
          <button 
            onClick={() => setEditingTestimonial(null)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h2 className="text-lg font-bold text-[#1f2937]">Edit Testimonial</h2>
        </div>

        <div className="p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Author Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={editingTestimonial.name}
              onChange={(e) => setEditingTestimonial({ ...editingTestimonial, name: e.target.value })}
              className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Designation (e.g., Serial Entrepreneur)</label>
            <input
              type="text"
              value={editingTestimonial.designation}
              onChange={(e) => setEditingTestimonial({ ...editingTestimonial, designation: e.target.value })}
              className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Rating (1-5) <span className="text-red-500">*</span></label>
            <input
              type="number"
              min="1"
              max="5"
              value={editingTestimonial.rating}
              onChange={(e) => setEditingTestimonial({ ...editingTestimonial, rating: e.target.value })}
              className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Avatar Image</label>
            <div className="flex items-center gap-0 w-full border border-gray-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-500 max-w-md mb-3">
              <label className="bg-blue-50 text-blue-600 px-4 py-3 text-sm font-medium cursor-pointer border-r border-gray-200 hover:bg-blue-100 transition-colors whitespace-nowrap">
                Choose File
                <input type="file" className="hidden" />
              </label>
              <div className="px-4 py-3 text-sm text-gray-400 bg-white flex-1 truncate">
                No file chosen
              </div>
            </div>
            {/* Preview Avatar Image */}
            <div className="w-16 h-16 rounded-full overflow-hidden border border-gray-200 relative mt-2">
              <Image
                src={editingTestimonial.image}
                alt={editingTestimonial.name}
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Testimonial Content <span className="text-red-500">*</span></label>
            <textarea
              rows={4}
              value={editingTestimonial.comment}
              onChange={(e) => setEditingTestimonial({ ...editingTestimonial, comment: e.target.value })}
              className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white resize-y"
            ></textarea>
          </div>

          <div className="pt-4">
            <button
              onClick={handleUpdate}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-sm font-medium transition-colors"
            >
              Update Testimonial
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ----- List View -----
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-h-[600px] flex flex-col max-w-5xl mx-auto">
      {/* Header */}
      <div className="p-6 border-b border-gray-50 flex items-center justify-between shrink-0">
        <h2 className="text-lg font-bold text-[#1f2937]">All Testimonials</h2>
        <Link 
          href="/admin/customization/testimonials/add"
          className="bg-[#1f2937] hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
        >
          <Plus size={16} />
          Add Testimonial
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="py-4 px-6 text-sm font-semibold text-[#1f2937]">Avatar</th>
              <th className="py-4 px-6 text-sm font-semibold text-[#1f2937]">Author</th>
              <th className="py-4 px-6 text-sm font-semibold text-[#1f2937]">Rating</th>
              <th className="py-4 px-6 text-sm font-semibold text-[#1f2937] text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {testimonials.map((testimonial) => (
              <tr key={testimonial.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="py-4 px-6">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-100 bg-gray-50 relative">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </td>
                <td className="py-4 px-6">
                  <p className="text-sm font-medium text-[#1f2937]">{testimonial.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{testimonial.designation}</p>
                </td>
                <td className="py-4 px-6">
                  <p className="text-sm text-[#1f2937]">{testimonial.rating} Stars</p>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => handleDelete(testimonial.id)}
                      className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 hover:border-red-200 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                    <button 
                      onClick={() => handleEditClick(testimonial)}
                      className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-200 transition-colors"
                    >
                      <Pencil size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
