"use client";

import React, { useState, useEffect } from "react";
import { Search, ArrowLeft, ArrowRight, Trash2, ShieldAlert, CheckCircle, Loader2, Sparkles, AlertCircle } from "lucide-react";
import { getAllUsers, deleteUser, updateUserRole } from "@/lib/actions/auth";

interface User {
  id: string;
  email: string;
  phone: string | null;
  role: string;
  createdAt: Date;
}

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Modals / Deletion State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Active admin email to prevent self-deletion or self-demotion
  const [currentAdminEmail, setCurrentAdminEmail] = useState("");

  const loadUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getAllUsers();
      if (res.success && res.users) {
        setUsers(res.users);
      } else {
        setError(res.error || "Failed to load database users.");
      }
    } catch {
      setError("An unexpected error occurred while loading users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
    if (typeof window !== "undefined") {
      setCurrentAdminEmail(localStorage.getItem("allmodern-auth-email") || "");
    }
  }, []);

  const handleRoleChange = async (userId: string, newRole: string) => {
    setError("");
    setSuccess("");
    
    const targetUser = users.find(u => u.id === userId);
    if (targetUser && targetUser.email.toLowerCase() === currentAdminEmail.toLowerCase()) {
      setError("You cannot change your own admin role.");
      setTimeout(() => setError(""), 4000);
      return;
    }

    try {
      const res = await updateUserRole(userId, newRole);
      if (res.success) {
        setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
        setSuccess(`User role updated to ${newRole.toUpperCase()} successfully.`);
        setTimeout(() => setSuccess(""), 4000);
      } else {
        setError(res.error || "Failed to update user role.");
      }
    } catch {
      setError("Could not update user role due to a connection issue.");
    }
  };

  const openDeleteModal = (user: User) => {
    if (user.email.toLowerCase() === currentAdminEmail.toLowerCase()) {
      setError("You cannot delete your own admin account.");
      setTimeout(() => setError(""), 4000);
      return;
    }
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setTimeout(() => setSelectedUser(null), 200);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedUser) return;
    setIsDeleting(true);
    setError("");
    setSuccess("");

    try {
      const res = await deleteUser(selectedUser.id);
      if (res.success) {
        setUsers(users.filter(u => u.id !== selectedUser.id));
        setSuccess(`Account (${selectedUser.email}) deleted successfully.`);
        setTimeout(() => setSuccess(""), 4000);
      } else {
        setError(res.error || "Failed to delete user account.");
      }
    } catch {
      setError("An unexpected error occurred while deleting the user.");
    } finally {
      setIsDeleting(false);
      closeDeleteModal();
    }
  };

  // Name Parsing
  const getCleanName = (email: string) => {
    const parts = email.split("@");
    if (parts[0]) {
      return parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
    }
    return "Curator";
  };

  // Filter users by search query
  const filteredUsers = users.filter((u) => {
    const cleanName = getCleanName(u.email).toLowerCase();
    const email = u.email.toLowerCase();
    const query = searchQuery.toLowerCase();
    return cleanName.includes(query) || email.includes(query) || (u.phone && u.phone.includes(query));
  });

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage) || 1;

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[500px] items-center justify-center bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto" />
          <p className="mt-4 text-sm text-gray-500 font-medium">Fetching users from database...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Dynamic Sync Info */}
      <div className="flex items-center justify-between bg-white border border-gray-100 px-6 py-4 rounded-2xl shadow-sm shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-sm font-semibold text-gray-700">Database Connection Active</span>
        </div>
        <div className="text-xs text-gray-400 font-medium flex items-center gap-1.5">
          <Sparkles size={13} className="text-yellow-500" />
          Total registered users in DB: <span className="font-bold text-gray-700">{users.length}</span>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-h-[600px] flex flex-col transition-shadow duration-200 hover:shadow-md/50">
        
        {/* Header & Search */}
        <div className="p-6 border-b border-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
          <div>
            <h2 className="text-lg font-bold text-gray-800">User Management</h2>
            <p className="text-xs text-gray-400 font-medium mt-0.5">Control registered accounts, phone numbers, and security roles.</p>
          </div>
          
          <div className="relative w-full sm:w-72">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
              <Search size={18} />
            </span>
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-shadow bg-white text-gray-850"
            />
          </div>
        </div>

        {/* Global Feedback Banners */}
        {success && (
          <div className="mx-6 mt-4 flex items-center gap-2.5 bg-emerald-50 border border-emerald-100 text-emerald-800 px-4 py-3 rounded-xl text-sm animate-in slide-in-from-top-2">
            <CheckCircle size={16} className="text-emerald-600 shrink-0" />
            <span className="font-semibold">{success}</span>
          </div>
        )}

        {error && (
          <div className="mx-6 mt-4 flex items-center gap-2.5 bg-red-50 border border-red-100 text-red-800 px-4 py-3 rounded-xl text-sm animate-in slide-in-from-top-2">
            <AlertCircle size={16} className="text-red-600 shrink-0" />
            <span className="font-semibold">{error}</span>
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto flex-1 mt-4">
          {filteredUsers.length === 0 ? (
            <div className="py-24 text-center text-sm text-gray-400 font-semibold">
              No registered users found matching the search criteria.
            </div>
          ) : (
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="py-4 px-6 text-sm font-semibold text-gray-500 w-[8%]">No.</th>
                  <th className="py-4 px-6 text-sm font-semibold text-gray-500 w-[22%]">Name</th>
                  <th className="py-4 px-6 text-sm font-semibold text-gray-500 w-[30%]">Email Address</th>
                  <th className="py-4 px-6 text-sm font-semibold text-gray-500 w-[18%]">Phone</th>
                  <th className="py-4 px-6 text-sm font-semibold text-gray-500 w-[12%]">Role</th>
                  <th className="py-4 px-6 text-sm font-semibold text-gray-500 text-right w-[10%]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {paginatedUsers.map((user, idx) => {
                  const itemIndex = (currentPage - 1) * itemsPerPage + idx + 1;
                  const isCurrentUser = user.email.toLowerCase() === currentAdminEmail.toLowerCase();
                  
                  return (
                    <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-6 text-sm text-gray-400 font-semibold">
                        {itemIndex}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-800 font-bold">
                        {getCleanName(user.email)}
                        {isCurrentUser && (
                          <span className="ml-1.5 text-[9px] bg-slate-900 text-white font-extrabold px-1.5 py-0.5 rounded-md uppercase tracking-wider">
                            You
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-600 font-medium">
                        {user.email}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-500">
                        {user.phone || <span className="text-gray-300 italic text-xs">None</span>}
                      </td>
                      <td className="py-4 px-6">
                        <select
                          value={user.role}
                          onChange={(e) => handleRoleChange(user.id, e.target.value)}
                          disabled={isCurrentUser}
                          className={`w-full max-w-[130px] px-2.5 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white text-gray-700 font-semibold cursor-pointer ${
                            isCurrentUser ? "opacity-60 cursor-not-allowed select-none bg-gray-50" : ""
                          }`}
                        >
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => openDeleteModal(user)}
                          disabled={isCurrentUser}
                          title={isCurrentUser ? "You cannot delete your own account" : "Delete user account"}
                          className={`p-1.5 border border-gray-200 rounded-lg transition-colors cursor-pointer ${
                            isCurrentUser 
                              ? "text-gray-300 border-gray-150 cursor-not-allowed" 
                              : "text-gray-400 hover:text-red-500 hover:bg-red-50 hover:border-red-100"
                          }`}
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 0 && (
          <div className="p-6 border-t border-gray-50 flex items-center justify-between gap-2 mt-auto shrink-0 bg-gray-50/50">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Page {currentPage} of {totalPages}
            </span>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold border border-gray-200 rounded-lg text-gray-500 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
              >
                <ArrowLeft size={14} />
                Prev
              </button>

              <div className="hidden sm:flex items-center gap-1">
                {[...Array(totalPages)].map((_, idx) => {
                  const pageNum = idx + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => goToPage(pageNum)}
                      className={`w-9 h-9 flex items-center justify-center rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        currentPage === pageNum
                          ? "bg-blue-600 text-white shadow-sm shadow-blue-500/20"
                          : "text-gray-600 hover:bg-white hover:border hover:border-gray-200"
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
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold border border-gray-200 rounded-lg text-gray-600 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
              >
                Next
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-[420px] shadow-xl relative animate-in fade-in zoom-in-95 duration-200 p-8 flex flex-col items-center text-center border border-gray-100">
            
            {/* Warning Alert Icon */}
            <div className="w-20 h-20 rounded-full border-[3px] border-[#f8c49e] flex items-center justify-center mb-5 bg-[#fffaf0]">
              <ShieldAlert size={40} className="text-[#f6a570]" />
            </div>
            
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Are you absolutely sure?
            </h3>
            
            <p className="text-sm text-gray-500 mb-6">
              You are about to delete user account <span className="font-semibold text-gray-700 italic">{selectedUser.email}</span>. This action is permanent and cannot be undone.
            </p>
            
            <div className="flex items-center justify-center gap-3 w-full">
              <button 
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
                className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-semibold py-3 rounded-xl shadow-sm text-sm transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                {isDeleting ? (
                  <>
                    <Loader2 size={15} className="animate-spin" />
                    Deleting...
                  </>
                ) : (
                  "Yes, Delete Account"
                )}
              </button>
              <button 
                onClick={closeDeleteModal}
                disabled={isDeleting}
                className="flex-1 bg-gray-100 hover:bg-gray-250 text-gray-700 font-semibold py-3 rounded-xl border border-gray-200 text-sm transition-colors cursor-pointer"
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
