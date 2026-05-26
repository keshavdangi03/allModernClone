"use client";

import React, { useState, useEffect } from "react";
import { Trash2, ArrowLeft, ArrowRight } from "lucide-react";
import { getAllUsers, deleteUser } from "@/lib/actions/auth";

export default function CustomersPage() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const loadCustomers = async () => {
    setLoading(true);
    try {
      const res = await getAllUsers();
      if (res.success && res.users) {
        setCustomers(res.users);
      } else {
        setError(res.error || "Failed to load customers.");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const totalPages = Math.ceil(customers.length / itemsPerPage) || 1;

  const paginatedCustomers = customers.slice(
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

  const handleDelete = async () => {
    if (!selectedCustomer) return;
    try {
      const res = await deleteUser(selectedCustomer.id);
      if (res.success) {
        setCustomers(customers.filter(c => c.id !== selectedCustomer.id));
      }
    } catch (e) {
      console.error(e);
    }
    closeDeleteModal();
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getCleanName = (email: string) => {
    const parts = email.split("@");
    if (parts[0]) {
      return parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
    }
    return "Curator";
  };

  if (loading) {
    return (
      <div className="flex h-[400px] items-center justify-center bg-white rounded-2xl border border-gray-100">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent mx-auto"></div>
          <p className="mt-4 text-sm text-gray-500 font-medium">Loading customers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col min-h-[600px]">
        {/* Header Section */}
        <div className="p-6 border-b border-gray-50 flex items-center justify-between shrink-0">
          <h2 className="text-lg font-bold text-gray-800">Customers ({customers.length})</h2>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto flex-1">
          {customers.length === 0 ? (
            <div className="py-20 text-center text-sm text-gray-400 font-medium">
              No registered customers found in the database.
            </div>
          ) : (
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
                  <tr key={customer.id || index} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-6 text-sm font-medium text-gray-500 max-w-[120px] truncate" title={customer.id}>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td className="py-4 px-6 text-sm text-gray-500">
                      {new Date(customer.createdAt).toLocaleDateString(undefined, {
                        year: 'numeric', month: 'short', day: 'numeric'
                      })}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600 font-medium">{getCleanName(customer.email)}</td>
                    <td className="py-4 px-6 text-sm text-gray-500">{customer.email}</td>
                    <td className="py-4 px-6 text-right">
                      {customer.role !== "admin" ? (
                        <button 
                          onClick={() => openDeleteModal(customer)}
                          className="p-1.5 text-gray-400 hover:text-red-500 border border-gray-200 rounded-lg hover:bg-red-50 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      ) : (
                        <span className="text-[10px] font-bold text-blue-600 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded uppercase">
                          Admin
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
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
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-750 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors ml-2"
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
