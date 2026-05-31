"use client";

import React, { useState, useEffect } from "react";
import { getUserDetails, updateUserDetails, changeUserPassword } from "@/lib/actions/auth";
import { User, ShieldAlert, CheckCircle, Lock, Phone, Mail, Loader2, Sparkles } from "lucide-react";

export default function AccountSettingsPage() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("Admin");
  const [lastName, setLastName] = useState("User");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(true);

  // Form Feedback States
  const [profileSuccess, setProfileSuccess] = useState("");
  const [profileError, setProfileError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Password fields
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("allmodern-auth-email") || "";
    setEmail(storedEmail);

    if (storedEmail) {
      setLoading(true);
      getUserDetails(storedEmail)
        .then((res) => {
          if (res.success && res.user) {
            setPhone(res.user.phone || "");
            setRole(res.user.role || "user");
            
            // Extract a beautiful placeholder name from the email prefix
            const prefix = res.user.email.split("@")[0] || "admin";
            const capitalized = prefix.charAt(0).toUpperCase() + prefix.slice(1);
            setFirstName(capitalized);
          } else {
            setProfileError(res.error || "Failed to load user details.");
          }
        })
        .catch(() => {
          setProfileError("Could not connect to the server to fetch user details.");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSuccess("");
    setProfileError("");

    if (!email) {
      setProfileError("Authentication required. Please log in again.");
      return;
    }

    try {
      const res = await updateUserDetails(email, { phone });
      if (res.success) {
        setProfileSuccess("Your profile details have been saved successfully!");
        setTimeout(() => setProfileSuccess(""), 4000);
      } else {
        setProfileError(res.error || "Failed to update profile settings.");
      }
    } catch {
      setProfileError("An unexpected error occurred while saving your profile.");
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordSuccess("");
    setPasswordError("");

    if (!oldPassword || !newPassword || !confirmPassword) {
      setPasswordError("Please fill out all password fields.");
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError("New password must be at least 6 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("The new password and confirmation password do not match.");
      return;
    }

    try {
      const res = await changeUserPassword({
        email,
        oldPassword,
        newPassword,
      });

      if (res.success) {
        setPasswordSuccess("Password changed successfully!");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setTimeout(() => setPasswordSuccess(""), 4000);
      } else {
        setPasswordError(res.error || "Failed to update password. Check your old password.");
      }
    } catch {
      setPasswordError("An unexpected error occurred while updating the password.");
    }
  };

  if (loading) {
    return (
      <div className="flex h-[400px] items-center justify-center bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto" />
          <p className="mt-4 text-sm text-gray-500 font-medium">Fetching settings from database...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      
      {/* Upper Status Banner (derived from DB) */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-6 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center border border-white/10 shrink-0">
            <User size={24} className="text-blue-300" />
          </div>
          <div>
            <h3 className="text-lg font-bold tracking-wide">
              {firstName} {lastName}
            </h3>
            <p className="text-sm text-slate-300 flex items-center gap-1.5 mt-0.5">
              <Mail size={14} className="text-slate-400" />
              {email || "admin@admin.np"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 self-start md:self-auto">
          <span className="text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-400/20">
            {role} Account
          </span>
          <span className="text-[10px] bg-emerald-500/20 border border-emerald-400/20 text-emerald-300 font-bold px-2 py-1 rounded-full flex items-center gap-1 uppercase">
            <Sparkles size={10} />
            Live DB Sync
          </span>
        </div>
      </div>

      {/* Profile Info */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-200 hover:shadow-md/50">
        <div className="p-6 border-b border-gray-100 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
            <User size={18} />
          </div>
          <h2 className="text-base font-bold text-[#1f2937]">Profile & Account Settings</h2>
        </div>

        <form onSubmit={handleProfileSave} className="p-8 space-y-6">
          {profileSuccess && (
            <div className="flex items-start gap-3 bg-emerald-50 border border-emerald-100 text-emerald-800 p-4 rounded-xl text-sm animate-in slide-in-from-top-2 duration-200">
              <CheckCircle size={18} className="text-emerald-600 shrink-0 mt-0.5" />
              <p className="font-medium">{profileSuccess}</p>
            </div>
          )}

          {profileError && (
            <div className="flex items-start gap-3 bg-red-50 border border-red-100 text-red-800 p-4 rounded-xl text-sm animate-in slide-in-from-top-2 duration-200">
              <ShieldAlert size={18} className="text-red-600 shrink-0 mt-0.5" />
              <p className="font-medium">{profileError}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">First Name <span className="text-red-400">*</span></label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white text-gray-800 font-medium transition-shadow"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white text-gray-800 font-medium transition-shadow"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                  <Mail size={16} />
                </span>
                <input
                  type="email"
                  value={email}
                  disabled
                  className="w-full pl-11 pr-4 py-3 text-sm border border-gray-200 rounded-xl bg-gray-50 text-gray-400 cursor-not-allowed select-none focus:outline-none"
                />
              </div>
              <p className="mt-1.5 text-xs text-gray-400">Email addresses cannot be modified directly for security reasons.</p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                  <Phone size={16} />
                </span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+977-9876543210"
                  className="w-full pl-11 pr-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white text-gray-800 font-medium transition-shadow"
                />
              </div>
              <p className="mt-1.5 text-xs text-gray-400">Database field: persisted permanently on save.</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Profile Image (Recommended: 80x80)</label>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden border border-gray-200 bg-gray-50 flex items-center justify-center shrink-0">
                <span className="text-gray-400 text-xs font-semibold uppercase">{firstName.slice(0, 2)}</span>
              </div>
              <div className="flex items-center gap-0 w-full max-w-md border border-gray-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-500">
                <label className="bg-blue-50 text-blue-600 px-4 py-3 text-sm font-semibold cursor-pointer border-r border-gray-200 hover:bg-blue-100 transition-colors whitespace-nowrap">
                  Choose File
                  <input type="file" className="hidden" />
                </label>
                <div className="px-4 py-3 text-sm text-gray-400 bg-white flex-1 truncate">
                  No file chosen
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3.5 rounded-xl text-sm font-semibold shadow-sm shadow-blue-500/10 hover:shadow-blue-500/20 active:scale-[0.98] transition-all duration-150 cursor-pointer"
            >
              Save Profile Changes
            </button>
          </div>
        </form>
      </div>

      {/* Password Change */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-200 hover:shadow-md/50">
        <div className="p-6 border-b border-gray-100 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
            <Lock size={18} />
          </div>
          <h2 className="text-base font-bold text-[#1f2937]">Change Security Password</h2>
        </div>

        <form onSubmit={handlePasswordChange} className="p-8 space-y-6">
          {passwordSuccess && (
            <div className="flex items-start gap-3 bg-emerald-50 border border-emerald-100 text-emerald-800 p-4 rounded-xl text-sm animate-in slide-in-from-top-2 duration-200">
              <CheckCircle size={18} className="text-emerald-600 shrink-0 mt-0.5" />
              <p className="font-medium">{passwordSuccess}</p>
            </div>
          )}

          {passwordError && (
            <div className="flex items-start gap-3 bg-red-50 border border-red-100 text-red-800 p-4 rounded-xl text-sm animate-in slide-in-from-top-2 duration-200">
              <ShieldAlert size={18} className="text-red-600 shrink-0 mt-0.5" />
              <p className="font-medium">{passwordError}</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Old Password <span className="text-red-400">*</span></label>
            <input
              type="password"
              placeholder="••••••••"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white text-gray-800 transition-shadow"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">New Password <span className="text-red-400">*</span></label>
              <input
                type="password"
                placeholder="Minimum 6 characters"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white text-gray-800 transition-shadow"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm New Password <span className="text-red-400">*</span></label>
              <input
                type="password"
                placeholder="Confirm your new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white text-gray-800 transition-shadow"
                required
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3.5 rounded-xl text-sm font-semibold shadow-sm shadow-blue-500/10 hover:shadow-blue-500/20 active:scale-[0.98] transition-all duration-150 cursor-pointer"
            >
              Update Security Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
