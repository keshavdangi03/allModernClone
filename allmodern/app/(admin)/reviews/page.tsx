"use client";

import React, { useState } from "react";
import { Pencil, Trash2, Star, ArrowLeft, ArrowRight } from "lucide-react";

const initialReviews = [
  { id: 1, product: "Miller 56\" Upholstered Loveseat", slug: "miller-56-upholstered-loveseat", name: "User1", email: "user1@example.com", rating: 4, comment: "Good product.", approved: true },
  { id: 2, product: "Bennett Upholstered Swivel Barrel Chair", slug: "bennett-upholstered-swivel-barrel-chair", name: "User2", email: "user2@example.com", rating: 1, comment: "Not what I expected.", approved: false },
  { id: 3, product: "Miller 84\" Upholstered Sofa", slug: "miller-84-upholstered-sofa", name: "User3", email: "user3@example.com", rating: 5, comment: "Excellent piece!", approved: true },
  { id: 4, product: "Miller Upholstered Armchair", slug: "miller-upholstered-armchair", name: "User4", email: "user4@example.com", rating: 5, comment: "Great quality.", approved: true },
  { id: 5, product: "Bennett Vegan Leather Swivel Barrel Chair", slug: "bennett-vegan-leather-swivel-barrel-chair", name: "hanzlawebdev", email: "hanziidev@gmail.com", rating: 1, comment: "asasd", approved: false },
  { id: 6, product: "Miller 2 - Piece Upholstered Chaise Sectional", slug: "miller-2-piece-upholstered-chaise-sectional", name: "User6", email: "user6@example.com", rating: 3, comment: "It's okay.", approved: true },
  { id: 7, product: "Salma Colorful Enamel End Table", slug: "salma-colorful-enamel-end-table", name: "User7", email: "user7@example.com", rating: 5, comment: "Very cute table.", approved: true },
  { id: 8, product: "Rustic Pine Wood Platform Bed", slug: "rustic-pine-wood-platform-bed", name: "User8", email: "user8@example.com", rating: 4, comment: "Solid bed.", approved: true },
];

export default function ReviewsPage() {
  const [reviews, setReviews] = useState(initialReviews);
  const [editingReview, setEditingReview] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(reviews.length / itemsPerPage);

  const paginatedReviews = reviews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const openEditForm = (review: any) => {
    setEditingReview({ ...review });
  };

  const closeEditForm = () => {
    setEditingReview(null);
  };

  const handleUpdate = () => {
    setReviews(prev => prev.map(r => r.id === editingReview.id ? editingReview : r));
    alert("Review updated successfully!");
    closeEditForm();
  };

  if (editingReview) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden max-w-4xl mx-auto animate-in fade-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-gray-50 flex items-center gap-4">
          <button onClick={closeEditForm} className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">
            <ArrowLeft size={20} />
          </button>
          <h2 className="text-lg font-bold text-[#1f2937]">Edit Review</h2>
        </div>

        <div className="p-8 space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={editingReview.name}
              onChange={(e) => setEditingReview({ ...editingReview, name: e.target.value })}
              className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email <span className="text-red-500">*</span></label>
            <input
              type="email"
              value={editingReview.email}
              onChange={(e) => setEditingReview({ ...editingReview, email: e.target.value })}
              className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white"
            />
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Rating <span className="text-red-500">*</span></label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setEditingReview({ ...editingReview, rating: star })}
                  className={`p-1 ${star <= editingReview.rating ? "text-orange-400" : "text-gray-300"} hover:scale-110 transition-transform`}
                >
                  <Star size={24} fill={star <= editingReview.rating ? "currentColor" : "none"} />
                </button>
              ))}
            </div>
          </div>

          {/* Comment */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Comment <span className="text-red-500">*</span></label>
            <textarea
              rows={4}
              value={editingReview.comment}
              onChange={(e) => setEditingReview({ ...editingReview, comment: e.target.value })}
              className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white resize-y"
            ></textarea>
          </div>

          {/* Product Slug */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Slug <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={editingReview.slug}
              onChange={(e) => setEditingReview({ ...editingReview, slug: e.target.value })}
              className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white text-gray-500"
            />
          </div>

          {/* Approved */}
          <div className="flex items-center gap-4 py-2">
            <span className="text-sm font-medium text-gray-700">Approved:</span>
            <button 
              onClick={() => setEditingReview({ ...editingReview, approved: !editingReview.approved })}
              className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out relative ${editingReview.approved ? "bg-blue-600" : "bg-gray-200"}`}
            >
              <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform duration-200 ease-in-out ${editingReview.approved ? "translate-x-6" : "translate-x-0"}`} />
            </button>
            <span className="text-sm text-gray-600">{editingReview.approved ? "Yes" : "No"}</span>
          </div>

          {/* Submit */}
          <div className="pt-4">
            <button
              onClick={handleUpdate}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-sm font-medium transition-colors"
            >
              Update review
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-h-[600px] flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-50 flex items-center justify-between shrink-0">
        <h2 className="text-lg font-bold text-[#1f2937]">All Reviews</h2>
      </div>

      {/* Table */}
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="py-4 px-6 text-sm font-semibold text-gray-500">Product</th>
              <th className="py-4 px-6 text-sm font-semibold text-gray-500 w-[150px]">Rating</th>
              <th className="py-4 px-6 text-sm font-semibold text-gray-500 text-right w-[150px]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {paginatedReviews.map((review) => (
              <tr key={review.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="py-4 px-6 text-sm text-gray-600 font-medium">
                  {review.product}
                </td>
                <td className="py-4 px-6 text-sm font-medium text-orange-400 flex items-center gap-1">
                  {review.rating} <Star size={14} fill="currentColor" />
                </td>
                <td className="py-4 px-6 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-colors">
                      <Trash2 size={14} />
                    </button>
                    <button 
                      onClick={() => openEditForm(review)}
                      className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-colors"
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

      {/* Pagination */}
      <div className="p-6 border-t border-gray-50 flex items-center justify-center gap-2 mt-auto shrink-0">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ArrowLeft size={16} />
          Previous
        </button>

        <div className="flex items-center gap-1">
          {[...Array(totalPages)].map((_, idx) => {
            const pageNum = idx + 1;
            return (
              <button
                key={pageNum}
                onClick={() => goToPage(pageNum)}
                className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                  currentPage === pageNum
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Next
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
