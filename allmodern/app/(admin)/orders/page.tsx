"use client";

import React, { useState } from "react";
import { Eye, Pencil, X, ArrowLeft, ArrowRight } from "lucide-react";

const allOrdersData = [
  { id: "#fmhn7g1p", name: "IAL Ra h", email: "fas@ff.nn", date: "Fri May 01 2026", status: "Pending", paymentMethod: "cod", total: "$812", statusColor: "text-orange-500 bg-orange-50" },
  { id: "#v4c1buca", name: "Md Rakib Hosen", email: "teams.ialbh@gmail.com", date: "Fri May 01 2026", status: "Pending", paymentMethod: "cod", total: "$777", statusColor: "text-orange-500 bg-orange-50" },
  { id: "#h57i7q83", name: "Nathan Julcah", email: "ljulcahuanca17@gmail.com", date: "Thu Apr 30 2026", status: "Processing", paymentMethod: "cod", total: "$1,634", statusColor: "text-purple-500 bg-purple-50" },
  { id: "#hzeyomq5", name: "Aminul Islam", email: "sadiaakter9406@gmail.com", date: "Mon Apr 27 2026", status: "Pending", paymentMethod: "cod", total: "$888", statusColor: "text-orange-500 bg-orange-50" },
  { id: "#e84b0953", name: "Anisur Rahman", email: "fbadssetuppro@gmail.com", date: "Thu Apr 23 2026", status: "Delivered", paymentMethod: "cod", total: "$500", statusColor: "text-emerald-500 bg-emerald-50" },
  { id: "#xzu1s06j", name: "user", email: "user@gmail.com", date: "Tue Mar 31 2026", status: "Delivered", paymentMethod: "cod", total: "$777", statusColor: "text-emerald-500 bg-emerald-50" },
  { id: "#s8t6u1k8", name: "user", email: "user@gmail.com", date: "Fri Apr 17 2026", status: "Delivered", paymentMethod: "cod", total: "$500", statusColor: "text-emerald-500 bg-emerald-50" },
  // Page 2 mock data from user screenshot
  { id: "#otkyhbqi", name: "Sun Apr 05 2026", email: "ererere rererere", date: "dfdf@fdd.df", status: "Pending", paymentMethod: "cod", total: "$400", statusColor: "text-orange-500 bg-orange-50" },
  { id: "#ky0ut2n4", name: "Thu Apr 02 2026", email: "Admin", date: "admin@gmail.com", status: "Processing", paymentMethod: "cod", total: "$120", statusColor: "text-purple-500 bg-purple-50" },
  { id: "#uktrzimz", name: "Sun Jan 04 2026", email: "user", date: "user@gmail.com", status: "Processing", paymentMethod: "cod", total: "$340", statusColor: "text-purple-500 bg-purple-50" },
  { id: "#4volk1cx", name: "Fri Jan 09 2026", email: "user", date: "user@gmail.com", status: "Cancel", paymentMethod: "cod", total: "$50", statusColor: "text-red-500 bg-red-50" },
  { id: "#bgc0p06o", name: "Wed Apr 01 2026", email: "Pakpoom Wianthaisong", date: "max555max2012@gmail.com", status: "Pending", paymentMethod: "cod", total: "$990", statusColor: "text-orange-500 bg-orange-50" },
  { id: "#u2398vqe", name: "Tue Mar 31 2026", email: "233 dfdf", date: "sd@dkd.com", status: "Pending", paymentMethod: "cod", total: "$230", statusColor: "text-orange-500 bg-orange-50" },
  // Additional mock data for more pages
  { id: "#a1b2c3d4", name: "John Doe", email: "john@example.com", date: "Mon Mar 30 2026", status: "Delivered", paymentMethod: "stripe", total: "$150", statusColor: "text-emerald-500 bg-emerald-50" },
  { id: "#e5f6g7h8", name: "Jane Smith", email: "jane@example.com", date: "Sun Mar 29 2026", status: "Processing", paymentMethod: "paypal", total: "$450", statusColor: "text-purple-500 bg-purple-50" },
  { id: "#i9j0k1l2", name: "Bob Wilson", email: "bob@example.com", date: "Sat Mar 28 2026", status: "Pending", paymentMethod: "cod", total: "$80", statusColor: "text-orange-500 bg-orange-50" },
];

const mockOrderDetails = {
  products: [
    { id: 1, title: "Portable Electric Grinder Maker", quantity: 1, price: "$777", amount: "$777" },
    { id: 2, title: "Havit HV-G69 USB Gamepad", quantity: 1, price: "$35", amount: "$35" },
  ],
  shippingCost: "$0",
  discount: "$0",
  totalAmount: "$812"
};

export default function OrdersPage() {
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const totalPages = Math.ceil(allOrdersData.length / itemsPerPage);

  const paginatedOrders = allOrdersData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const openViewModal = (order: any) => {
    setSelectedOrder(order);
    setIsViewModalOpen(true);
  };

  const openEditModal = (order: any) => {
    setSelectedOrder(order);
    setIsEditModalOpen(true);
  };

  const closeModal = () => {
    setIsViewModalOpen(false);
    setIsEditModalOpen(false);
    setTimeout(() => setSelectedOrder(null), 200);
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="space-y-6">
      {/* Table Container */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col min-h-[600px]">
        {/* Header Section */}
        <div className="p-6 border-b border-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
          <h2 className="text-lg font-bold text-gray-800">All Orders</h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search by email..."
              className="w-full sm:w-64 pl-4 pr-10 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-white border-b border-gray-50">
                <th className="py-4 px-6 text-sm font-semibold text-gray-500">Order</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-500">Name</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-500">Email</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-500">Date</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-500">Status</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-500">Payment Method</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-500">Total</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-500 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {paginatedOrders.map((order, index) => (
                <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6 text-sm font-medium text-gray-800">{order.id}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{order.name}</td>
                  <td className="py-4 px-6 text-sm text-gray-500">{order.email}</td>
                  <td className="py-4 px-6 text-sm text-gray-500">{order.date}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${order.statusColor}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-500">{order.paymentMethod}</td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-800">{order.total}</td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => openViewModal(order)}
                        className="p-1.5 text-gray-400 hover:text-blue-600 border border-gray-200 rounded-lg hover:bg-blue-50 transition-colors"
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        onClick={() => openEditModal(order)}
                        className="p-1.5 text-gray-400 hover:text-blue-600 border border-gray-200 rounded-lg hover:bg-blue-50 transition-colors"
                      >
                        <Pencil size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Section */}
        <div className="p-6 border-t border-gray-50 flex items-center justify-between sm:justify-end gap-2 shrink-0">
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

      {/* View Modal */}
      {isViewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-xl relative animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={closeModal}
              className="absolute -top-3 -right-3 p-2 bg-white border border-gray-100 rounded-full text-gray-500 hover:text-gray-800 shadow-md transition-colors"
            >
              <X size={20} />
            </button>
            
            <div className="p-8">
              <div className="overflow-hidden border border-gray-100 rounded-xl mb-6">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-white border-b border-gray-100">
                      <th className="py-3 px-4 text-sm font-semibold text-gray-500">SR.</th>
                      <th className="py-3 px-4 text-sm font-semibold text-gray-500">Product Title</th>
                      <th className="py-3 px-4 text-sm font-semibold text-gray-500">Quantity</th>
                      <th className="py-3 px-4 text-sm font-semibold text-gray-500">Item Price</th>
                      <th className="py-3 px-4 text-sm font-semibold text-gray-500">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {mockOrderDetails.products.map((prod, idx) => (
                      <tr key={prod.id}>
                        <td className="py-4 px-4 text-sm text-gray-500">{idx + 1}</td>
                        <td className="py-4 px-4 text-sm text-gray-600">{prod.title}</td>
                        <td className="py-4 px-4 text-sm text-gray-600">{prod.quantity}</td>
                        <td className="py-4 px-4 text-sm text-gray-600">{prod.price}</td>
                        <td className="py-4 px-4 text-sm font-medium text-red-500">{prod.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-medium text-gray-600">Shipping Cost</span>
                  <span className="text-gray-600">{mockOrderDetails.shippingCost}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="font-medium text-gray-600">Discount</span>
                  <span className="text-gray-600">{mockOrderDetails.discount}</span>
                </div>
                <div className="flex justify-between items-center pt-3 mt-3">
                  <span className="font-semibold text-gray-800">Total Amount</span>
                  <span className="font-bold text-red-500 text-lg">{mockOrderDetails.totalAmount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl relative animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={closeModal}
              className="absolute -top-3 -right-3 p-2 bg-white border border-gray-100 rounded-full text-gray-500 hover:text-gray-800 shadow-md transition-colors"
            >
              <X size={20} />
            </button>
            
            <div className="p-8 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">Order Status</label>
                <select 
                  defaultValue={selectedOrder?.status}
                  className="w-full pl-4 pr-10 py-3 text-sm border border-blue-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white appearance-none text-gray-700"
                >
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancel">Cancel</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">Payment Status</label>
                <select 
                  defaultValue="Pending"
                  className="w-full pl-4 pr-10 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white appearance-none text-gray-700"
                >
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                  <option value="Failed">Failed</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
