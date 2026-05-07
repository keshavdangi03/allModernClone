"use client";

import React, { useState } from "react";
import { Trash2, ArrowLeft, ArrowRight } from "lucide-react";

const allCustomersData = [
  { id: "#de3qam", date: "Thu Apr 09 2026", name: "1231", email: "123123231123123@gm.com" },
  { id: "#93dyu4", date: "Wed Dec 17 2025", name: "ALI hasan", email: "alihasan331229@gmail.com" },
  { id: "#nwd6a4", date: "Sun Jan 04 2026", name: "ARIS corleone", email: "ariscorleone04@gmail.com" },
  { id: "#h25tl9", date: "Fri Nov 14 2025", name: "Aaditya Verma", email: "aaditya220055@gmail.com" },
  { id: "#uzs36w", date: "Wed Apr 22 2026", name: "Aaron Santana", email: "santanavaldelomaraa@gmail.com" },
  { id: "#aa9vys", date: "Sun Oct 19 2025", name: "Abdallah DHOUIB", email: "abdallahdhouib7@gmail.com" },
  { id: "#gsqvck", date: "Sun Sep 28 2025", name: "Abdull", email: "dexabdull@gmail.com" },
  { id: "#64ht3x", date: "Wed Jan 14 2026", name: "Abhay", email: "a@gmail.com" },
  { id: "#j04k9c", date: "Sun Sep 28 2025", name: "Abhay Gupta (Hacky)", email: "abhayhacks007@gmail.com" },
  { id: "#wideqo", date: "Sun Sep 28 2025", name: "Abhishek Bhatia", email: "abhishek.bhatia@aqlix.com" },
  // Extra data for pagination
  { id: "#abc123d", date: "Mon Feb 10 2026", name: "Alex Johnson", email: "alexj@example.com" },
  { id: "#def456e", date: "Tue Mar 15 2026", name: "Amanda Smith", email: "amanda.s@example.com" },
  { id: "#ghi789f", date: "Wed Apr 20 2026", name: "Brian Clark", email: "brian.clark@example.com" },
  { id: "#jkl012g", date: "Thu May 25 2026", name: "Catherine Doe", email: "catherine.doe@example.com" },
  { id: "#mno345h", date: "Fri Jun 30 2026", name: "David Evans", email: "david.evans@example.com" },
];

export default function CustomersPage() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const totalPages = Math.ceil(allCustomersData.length / itemsPerPage);

  const paginatedCustomers = allCustomersData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const openDeleteModal = (customer: any) => {
    setSelectedCustomer(customer);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setTimeout(() => setSelectedCustomer(null), 200);
  };

  const handleDelete = () => {
    // In a real app, make API call here to delete `selectedCustomer`
    closeDeleteModal();
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col min-h-[600px]">
        {/* Header Section */}
        <div className="p-6 border-b border-gray-50 flex items-center justify-between shrink-0">
          <h2 className="text-lg font-bold text-gray-800">Customers</h2>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-white border-b border-gray-50">
                <th className="py-4 px-6 text-sm font-semibold text-gray-500 w-32">Id</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-500 w-48">Joining Date</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-500 w-64">Name</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-500">Email</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-500 text-right w-24">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {paginatedCustomers.map((customer, index) => (
                <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6 text-sm font-medium text-gray-500">{customer.id}</td>
                  <td className="py-4 px-6 text-sm text-gray-500">{customer.date}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{customer.name}</td>
                  <td className="py-4 px-6 text-sm text-gray-500">{customer.email}</td>
                  <td className="py-4 px-6 text-right">
                    <button 
                      onClick={() => openDeleteModal(customer)}
                      className="p-1.5 text-gray-400 hover:text-red-500 border border-gray-200 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Section */}
        <div className="p-6 border-t border-gray-50 flex items-center justify-center sm:justify-end gap-2 shrink-0">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors mr-2"
          >
            <ArrowLeft size={16} />
            Previous
          </button>

          <div className="hidden sm:flex items-center gap-1">
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
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors ml-2"
          >
            Next
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-[400px] shadow-xl relative animate-in fade-in zoom-in-95 duration-200 p-8 flex flex-col items-center text-center">
            
            {/* Warning Icon (Custom CSS circle to match design exactly) */}
            <div className="w-24 h-24 rounded-full border-[3px] border-[#f8c49e] flex items-center justify-center mb-6">
              <span className="text-[#f6a570] text-5xl font-light mb-2">!</span>
            </div>
            
            <h3 className="text-[28px] font-bold text-[#4a4a4a] mb-3">
              Are you sure?
            </h3>
            
            <p className="text-[17px] text-[#545454] mb-8 font-normal">
              Delete this user?
            </p>
            
            <div className="flex items-center justify-center gap-3 w-full">
              <button 
                onClick={handleDelete}
                className="bg-[#3085d6] hover:bg-[#2b78c1] text-white font-medium px-5 py-2.5 rounded shadow-sm text-base transition-colors"
              >
                Yes, delete it!
              </button>
              <button 
                onClick={closeDeleteModal}
                className="bg-[#d33] hover:bg-[#bd2d2d] text-white font-medium px-5 py-2.5 rounded shadow-sm text-base transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
