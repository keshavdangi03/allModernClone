"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  User, 
  MapPin, 
  CreditCard, 
  Gift, 
  Award, 
  Briefcase, 
  Heart, 
  MessageSquare, 
  TrendingUp, 
  ChevronRight, 
  X, 
  HelpCircle, 
  Plus, 
  Phone,
  Mail,
  Calendar,
  Lock,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { getUserDetails, updateUserDetails } from "@/lib/actions/auth";

type ActiveTab = "dashboard" | "account" | "addresses" | "wallet" | "rewards" | "saved" | "reviews";

export default function MyAccountPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  const [userDetails, setUserDetails] = useState<{
    email: string;
    phone: string | null;
    role: string;
    createdAt: Date;
  } | null>(null);

  // Active overlay/tab state
  const [activeTab, setActiveTab] = useState<ActiveTab>("dashboard");
  
  // Interactive Form States
  const [editPhone, setEditPhone] = useState("");
  const [updatingPhone, setUpdatingPhone] = useState(false);
  const [phoneMessage, setPhoneMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Mock states for premium interactivity
  const [addresses, setAddresses] = useState([
    { id: 1, name: "Home Address", street: "123 Modern Way", city: "Boston", state: "MA", zip: "02116", phone: "987-654-3210", isDefault: true }
  ]);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({ street: "", city: "", state: "", zip: "", phone: "" });

  const [wallet, setWallet] = useState([
    { id: 1, type: "Visa", number: "**** **** **** 4321", name: "COZY CARDHOLD", expiry: "12/28" }
  ]);
  const [showAddCard, setShowAddCard] = useState(false);
  const [newCard, setNewCard] = useState({ number: "", name: "", expiry: "", cvv: "" });

  useEffect(() => {
    const authState = localStorage.getItem("allmodern-auth") === "true";
    const email = localStorage.getItem("allmodern-auth-email") || "";

    if (!authState || !email) {
      router.push("/account");
      return;
    }

    setUserEmail(email);

    // Fetch user details from database
    const loadDetails = async () => {
      try {
        const res = await getUserDetails(email);
        if (res.success && res.user) {
          setUserDetails(res.user);
          setEditPhone(res.user.phone || "");
        }
      } catch (err) {
        console.error("Failed to load user details", err);
      } finally {
        setLoading(false);
      }
    };

    loadDetails();
  }, [router]);

  const handleUpdatePhone = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdatingPhone(true);
    setPhoneMessage(null);

    try {
      const res = await updateUserDetails(userEmail, { phone: editPhone });
      if (res.success) {
        setPhoneMessage({ type: "success", text: "Phone number updated successfully." });
        if (userDetails) {
          setUserDetails({ ...userDetails, phone: editPhone });
        }
      } else {
        setPhoneMessage({ type: "error", text: res.error || "Failed to update phone number." });
      }
    } catch (err) {
      setPhoneMessage({ type: "error", text: "An error occurred. Please try again." });
    } finally {
      setUpdatingPhone(false);
    }
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddress.street || !newAddress.city || !newAddress.state || !newAddress.zip) return;
    setAddresses([...addresses, {
      id: Date.now(),
      name: "New Address",
      ...newAddress,
      isDefault: false
    }]);
    setNewAddress({ street: "", city: "", state: "", zip: "", phone: "" });
    setShowAddAddress(false);
  };

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCard.number || !newCard.name || !newCard.expiry) return;
    setWallet([...wallet, {
      id: Date.now(),
      type: "Mastercard",
      number: `**** **** **** ${newCard.number.slice(-4)}`,
      name: newCard.name.toUpperCase(),
      expiry: newCard.expiry
    }]);
    setNewCard({ number: "", name: "", expiry: "", cvv: "" });
    setShowAddCard(false);
  };

  const getCustomerSinceYear = () => {
    if (userDetails?.createdAt) {
      return new Date(userDetails.createdAt).getFullYear();
    }
    return 2026;
  };

  const handleSignOut = () => {
    localStorage.removeItem("allmodern-auth");
    localStorage.removeItem("allmodern-auth-email");
    localStorage.removeItem("allmodern-auth-role");
    router.push("/account");
  };

  if (loading) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-white">
        <div className="text-center font-sans">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-900 border-t-transparent mx-auto"></div>
          <p className="mt-4 text-[14px] text-gray-500 font-medium">Loading Account Information...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fcfcfc] text-[#111111] font-sans pb-16">
      
      {/* Promo banner matching AllModern */}
      <div className="w-full bg-[#f4eade] text-[#6b3117] text-xs font-semibold py-2.5 px-4 text-center tracking-wide border-b border-[#e2d5c4]">
        Ends Tonight | Up to 60% Off Memorial Day Sale →
      </div>

      <div className="max-w-[1240px] mx-auto px-4 md:px-8 mt-8">
        
        {/* Navigation Breadcrumb & Log Out */}
        <div className="flex items-center justify-between text-xs mb-8">
          <div className="flex items-center gap-1.5 text-gray-500 font-medium">
            <Link href="/" className="hover:text-black">Home</Link>
            <ChevronRight size={12} />
            <button 
              onClick={() => setActiveTab("dashboard")} 
              className={`hover:text-black ${activeTab === "dashboard" ? "text-black font-semibold" : ""}`}
            >
              My Account
            </button>
            {activeTab !== "dashboard" && (
              <>
                <ChevronRight size={12} />
                <span className="text-black font-semibold capitalize">{activeTab}</span>
              </>
            )}
          </div>
          <button 
            onClick={handleSignOut}
            className="text-xs font-semibold underline underline-offset-2 hover:text-[#555]"
          >
            Sign Out
          </button>
        </div>

        {/* Dashboard Grid (Rendered when activeTab === "dashboard") */}
        {activeTab === "dashboard" ? (
          <div className="space-y-8">
            
            {/* Top Three Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              
              {/* Card 1: Welcome Details */}
              <div className="bg-white border border-[#e5e5e5] p-6 flex flex-col justify-between hover:shadow-sm transition-shadow">
                <div>
                  <h2 className="text-[22px] font-bold tracking-tight mb-2">Welcome</h2>
                  <p className="text-sm text-gray-600 mb-1 font-medium">{userDetails?.email}</p>
                  <p className="text-xs text-gray-400">Wayfair customer since {getCustomerSinceYear()}</p>
                  {userDetails?.role === "admin" && (
                    <Link 
                      href="/dashboard" 
                      className="mt-4 inline-flex items-center justify-center h-9 w-full bg-[#1a237e] hover:bg-[#0d1b60] text-xs font-bold text-white tracking-wide transition rounded-[3px]"
                    >
                      Go to Admin Dashboard
                    </Link>
                  )}
                </div>
                <div className="mt-8 border-t border-[#f5f5f5] pt-4 flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-700">Account Balance:</span>
                  <span className="text-sm font-bold text-slate-900">$0.00</span>
                </div>
              </div>

              {/* Card 2: Wayfair Rewards */}
              <div className="bg-white border border-[#e5e5e5] p-6 flex flex-col justify-between hover:shadow-sm transition-shadow">
                <div>
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 bg-indigo-50 flex items-center justify-center rounded text-indigo-600 shrink-0">
                      <Award size={22} className="stroke-[1.8]" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold tracking-tight mb-1">Wayfair Rewards</h3>
                      <p className="text-xs text-gray-600 leading-relaxed">Get 5% back in rewards on qualifying items and save big on future purchases.</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 border-t border-[#f5f5f5] pt-4">
                  <button 
                    onClick={() => setActiveTab("rewards")}
                    className="text-xs font-bold text-slate-950 underline underline-offset-4 hover:text-[#555] inline-flex items-center gap-1"
                  >
                    Join Today <ChevronRight size={14} />
                  </button>
                </div>
              </div>

              {/* Card 3: Help & Contact */}
              <div className="bg-white border border-[#e5e5e5] p-6 flex flex-col justify-between hover:shadow-sm transition-shadow">
                <div>
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 bg-emerald-50 flex items-center justify-center rounded text-emerald-600 shrink-0">
                      <HelpCircle size={22} className="stroke-[1.8]" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold tracking-tight mb-1">Help & Contact</h3>
                      <p className="text-xs text-gray-600 leading-relaxed">Ask questions, request returns, and get dedicated support for recent purchases.</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 border-t border-[#f5f5f5] pt-4">
                  <Link 
                    href="/help&contact"
                    className="text-xs font-bold text-slate-950 underline underline-offset-4 hover:text-[#555] inline-flex items-center gap-1"
                  >
                    Get Help <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Manage My Orders Section */}
            <div className="bg-white border border-[#e5e5e5] p-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#f0f0f0] mb-6">
                <h3 className="text-[17px] font-bold text-slate-900 tracking-tight">Manage My Orders</h3>
                <Link href="#" className="text-xs font-bold text-slate-950 underline underline-offset-4 hover:text-[#555]">
                  See All
                </Link>
              </div>

              <div className="py-10 text-center max-w-lg mx-auto">
                <p className="text-sm font-semibold text-slate-900 mb-2">You haven&apos;t placed any orders yet</p>
                <p className="text-xs text-gray-500 mb-6 leading-relaxed">Discover custom designs, modern sofas, luxury beds, and seasonal markdowns to start building your dream home.</p>
                <Link 
                  href="/sale" 
                  className="inline-flex h-[42px] px-6 bg-[#1f1d24] text-xs font-semibold text-white items-center justify-center transition hover:bg-black tracking-wide"
                >
                  Shop New Arrivals
                </Link>
              </div>
            </div>

            {/* Three Columns Grid Options */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Column 1: Account & Preferences */}
              <div className="space-y-4">
                <h4 className="text-[15px] font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-gray-200">
                  Account & Preferences
                </h4>
                <div className="bg-white border border-[#e5e5e5] rounded-[3px] overflow-hidden">
                  {userDetails?.role === "admin" && (
                    <Link 
                      href="/dashboard"
                      className="w-full flex items-center justify-between p-4 text-left border-b border-[#e5e5e5] bg-indigo-50/45 hover:bg-indigo-50/70 transition"
                    >
                      <span className="text-xs font-bold text-indigo-900 flex items-center gap-2">
                        <Lock size={14} className="text-indigo-650" /> Admin Dashboard
                      </span>
                      <ChevronRight size={16} className="text-indigo-400" />
                    </Link>
                  )}
                  <button 
                    onClick={() => setActiveTab("account")}
                    className="w-full flex items-center justify-between p-4 text-left border-b border-[#e5e5e5] hover:bg-gray-50 transition"
                  >
                    <span className="text-xs font-semibold text-gray-800">Account Information</span>
                    <ChevronRight size={16} className="text-gray-400" />
                  </button>
                  <button 
                    onClick={() => setActiveTab("addresses")}
                    className="w-full flex items-center justify-between p-4 text-left border-b border-[#e5e5e5] hover:bg-gray-50 transition"
                  >
                    <span className="text-xs font-semibold text-gray-800">My Addresses</span>
                    <ChevronRight size={16} className="text-gray-400" />
                  </button>
                  <button 
                    onClick={() => setActiveTab("wallet")}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition"
                  >
                    <span className="text-xs font-semibold text-gray-800">My Wallet</span>
                    <ChevronRight size={16} className="text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Column 2: Ways to Shop */}
              <div className="space-y-4">
                <h4 className="text-[15px] font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-gray-200">
                  Ways to Shop
                </h4>
                <div className="bg-white border border-[#e5e5e5] rounded-[3px] overflow-hidden">
                  <Link 
                    href="/sale"
                    className="w-full flex items-center justify-between p-4 text-left border-b border-[#e5e5e5] hover:bg-gray-50 transition"
                  >
                    <span className="text-xs font-semibold text-gray-800">Buy a Gift Card</span>
                    <ChevronRight size={16} className="text-gray-400" />
                  </Link>
                  <button 
                    onClick={() => setActiveTab("rewards")}
                    className="w-full flex items-center justify-between p-4 text-left border-b border-[#e5e5e5] hover:bg-gray-50 transition"
                  >
                    <span className="text-xs font-semibold text-gray-800">Wayfair Rewards</span>
                    <ChevronRight size={16} className="text-gray-400" />
                  </button>
                  <a 
                    href="#"
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition"
                  >
                    <span className="text-xs font-semibold text-gray-800">Wayfair Professional</span>
                    <ChevronRight size={16} className="text-gray-400" />
                  </a>
                </div>
              </div>

              {/* Column 3: Jump Back In */}
              <div className="space-y-4">
                <h4 className="text-[15px] font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-gray-200">
                  Jump Back In
                </h4>
                <div className="bg-white border border-[#e5e5e5] rounded-[3px] overflow-hidden">
                  <button 
                    onClick={() => setActiveTab("saved")}
                    className="w-full flex items-center justify-between p-4 text-left border-b border-[#e5e5e5] hover:bg-gray-50 transition"
                  >
                    <span className="text-xs font-semibold text-gray-800">Saved</span>
                    <ChevronRight size={16} className="text-gray-400" />
                  </button>
                  <button 
                    onClick={() => setActiveTab("reviews")}
                    className="w-full flex items-center justify-between p-4 text-left border-b border-[#e5e5e5] hover:bg-gray-50 transition"
                  >
                    <span className="text-xs font-semibold text-gray-800">Submit a Review</span>
                    <ChevronRight size={16} className="text-gray-400" />
                  </button>
                  <Link 
                    href="/sale"
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition"
                  >
                    <span className="text-xs font-semibold text-gray-800">Deals of the Day</span>
                    <ChevronRight size={16} className="text-gray-400" />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        ) : (
          
          // Sub-Tab Content View
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1 space-y-2">
              <button 
                onClick={() => setActiveTab("dashboard")} 
                className="w-full text-left px-4 py-3 text-xs font-bold border border-transparent rounded-[3px] bg-slate-100 hover:bg-slate-200 transition mb-4"
              >
                ← Back to Dashboard
              </button>
              
              <div className="bg-white border border-[#e5e5e5] rounded-[3px] p-2 space-y-1">
                {[
                  { key: "account", label: "Account Information", icon: <User size={14} /> },
                  { key: "addresses", label: "My Addresses", icon: <MapPin size={14} /> },
                  { key: "wallet", label: "My Wallet", icon: <CreditCard size={14} /> },
                  { key: "rewards", label: "Wayfair Rewards", icon: <Award size={14} /> },
                  { key: "saved", label: "Saved Items", icon: <Heart size={14} /> },
                  { key: "reviews", label: "Submit a Review", icon: <MessageSquare size={14} /> },
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => {
                      setActiveTab(item.key as ActiveTab);
                      setPhoneMessage(null);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs font-semibold rounded-[3px] flex items-center gap-2.5 transition ${
                      activeTab === item.key ? "bg-[#1f1d24] text-white" : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ))}
                {userDetails?.role === "admin" && (
                  <Link
                    href="/dashboard"
                    className="w-full text-left px-3 py-2 text-xs font-bold rounded-[3px] flex items-center gap-2.5 transition text-indigo-750 bg-indigo-50/50 hover:bg-indigo-50"
                  >
                    <Lock size={14} />
                    Admin Dashboard
                  </Link>
                )}
              </div>
            </div>

            {/* Inner Dashboard Component */}
            <div className="lg:col-span-3">
              <div className="bg-white border border-[#e5e5e5] p-6 md:p-8 rounded-[3px]">
                
                {/* 1. Account Details Tab */}
                {activeTab === "account" && (
                  <div>
                    <h2 className="text-xl font-bold tracking-tight pb-3 border-b border-gray-100 mb-6">
                      Account Information
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <Mail size={16} className="text-gray-400" />
                          <div>
                            <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Email Address</p>
                            <p className="text-sm font-semibold text-slate-800">{userDetails?.email}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <Lock size={16} className="text-gray-400" />
                          <div>
                            <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Password</p>
                            <p className="text-sm font-semibold text-slate-800">••••••••••••</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <Calendar size={16} className="text-gray-400" />
                          <div>
                            <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Registered On</p>
                            <p className="text-sm font-semibold text-slate-800">
                              {userDetails?.createdAt ? new Date(userDetails.createdAt).toLocaleDateString(undefined, {
                                year: "numeric", month: "long", day: "numeric"
                              }) : "May 25, 2026"}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <Briefcase size={16} className="text-gray-400" />
                          <div>
                            <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Account Role</p>
                            <span className="inline-block mt-0.5 px-2 py-0.5 bg-slate-100 border border-slate-200 rounded text-[11px] font-bold text-slate-700 capitalize">
                              {userDetails?.role || "user"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Phone Update Form */}
                      <div>
                        <div className="bg-slate-50 border border-slate-150 p-5 rounded">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-4 flex items-center gap-1.5">
                            <Phone size={14} className="text-[#1a237e]" />
                            Update Phone Number
                          </h4>
                          <form onSubmit={handleUpdatePhone} className="space-y-4">
                            <div className="relative">
                              <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Mobile Phone</label>
                              <input 
                                type="tel" 
                                value={editPhone}
                                onChange={(e) => setEditPhone(e.target.value)}
                                placeholder="Enter phone number"
                                className="w-full h-10 border border-gray-300 px-3 text-xs outline-none focus:border-[#1a237e] rounded"
                              />
                            </div>
                            
                            {phoneMessage && (
                              <div className={`p-2.5 rounded text-xs flex items-center gap-2 ${
                                phoneMessage.type === "success" 
                                  ? "bg-emerald-50 text-emerald-800 border border-emerald-250" 
                                  : "bg-red-50 text-red-800 border border-red-250"
                              }`}>
                                {phoneMessage.type === "success" ? <CheckCircle size={14} /> : <AlertCircle size={14} />}
                                {phoneMessage.text}
                              </div>
                            )}

                            <button 
                              type="submit"
                              disabled={updatingPhone}
                              className="h-10 w-full bg-[#1f1d24] text-xs font-semibold text-white transition hover:bg-black disabled:opacity-55"
                            >
                              {updatingPhone ? "Saving..." : "Save Changes"}
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. Addresses Tab */}
                {activeTab === "addresses" && (
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-6">
                      <h2 className="text-xl font-bold tracking-tight">
                        My Addresses
                      </h2>
                      <button 
                        onClick={() => setShowAddAddress(!showAddAddress)}
                        className="text-xs font-bold bg-[#1f1d24] text-white px-3 py-1.5 hover:bg-black rounded-[3px] flex items-center gap-1.5"
                      >
                        {showAddAddress ? "Cancel" : <><Plus size={14} /> Add Address</>}
                      </button>
                    </div>

                    {showAddAddress && (
                      <form onSubmit={handleAddAddress} className="mb-8 p-5 bg-slate-50 border border-slate-150 rounded space-y-4 max-w-md">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">Add A New Shipping Address</h3>
                        <div className="grid grid-cols-1 gap-3">
                          <input 
                            type="text" 
                            placeholder="Street Address" 
                            value={newAddress.street}
                            onChange={(e) => setNewAddress({...newAddress, street: e.target.value})}
                            className="h-9 border border-gray-300 px-3 text-xs outline-none focus:border-[#1a237e] rounded"
                            required
                          />
                          <div className="grid grid-cols-3 gap-2">
                            <input 
                              type="text" 
                              placeholder="City" 
                              value={newAddress.city}
                              onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
                              className="h-9 border border-gray-300 px-3 text-xs outline-none focus:border-[#1a237e] rounded"
                              required
                            />
                            <input 
                              type="text" 
                              placeholder="State" 
                              value={newAddress.state}
                              onChange={(e) => setNewAddress({...newAddress, state: e.target.value})}
                              className="h-9 border border-gray-300 px-3 text-xs outline-none focus:border-[#1a237e] rounded"
                              required
                            />
                            <input 
                              type="text" 
                              placeholder="Zip" 
                              value={newAddress.zip}
                              onChange={(e) => setNewAddress({...newAddress, zip: e.target.value})}
                              className="h-9 border border-gray-300 px-3 text-xs outline-none focus:border-[#1a237e] rounded"
                              required
                            />
                          </div>
                          <input 
                            type="tel" 
                            placeholder="Phone Number" 
                            value={newAddress.phone}
                            onChange={(e) => setNewAddress({...newAddress, phone: e.target.value})}
                            className="h-9 border border-gray-300 px-3 text-xs outline-none focus:border-[#1a237e] rounded"
                          />
                          <button type="submit" className="h-9 bg-[#1f1d24] text-xs font-semibold text-white hover:bg-black rounded">
                            Save Address
                          </button>
                        </div>
                      </form>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {addresses.map((address) => (
                        <div key={address.id} className="border border-[#e5e5e5] p-5 rounded flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-xs font-bold text-slate-800">{address.name}</span>
                              {address.isDefault && (
                                <span className="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-[10px] font-bold text-indigo-700 rounded">
                                  Default
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-600 leading-relaxed font-medium">{address.street}</p>
                            <p className="text-xs text-gray-600 leading-relaxed font-medium">{address.city}, {address.state} {address.zip}</p>
                            {address.phone && <p className="text-xs text-gray-400 mt-2 font-medium">T: {address.phone}</p>}
                          </div>
                          <div className="mt-4 flex gap-3 text-xs font-semibold">
                            <button className="underline text-gray-500 hover:text-black">Edit</button>
                            <button className="underline text-red-500 hover:text-red-700">Delete</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. Wallet Tab */}
                {activeTab === "wallet" && (
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-6">
                      <h2 className="text-xl font-bold tracking-tight">
                        My Wallet
                      </h2>
                      <button 
                        onClick={() => setShowAddCard(!showAddCard)}
                        className="text-xs font-bold bg-[#1f1d24] text-white px-3 py-1.5 hover:bg-black rounded-[3px] flex items-center gap-1.5"
                      >
                        {showAddCard ? "Cancel" : <><Plus size={14} /> Add Card</>}
                      </button>
                    </div>

                    {showAddCard && (
                      <form onSubmit={handleAddCard} className="mb-8 p-5 bg-slate-50 border border-slate-150 rounded space-y-4 max-w-md">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">Add Credit / Debit Card</h3>
                        <div className="grid grid-cols-1 gap-3">
                          <input 
                            type="text" 
                            placeholder="Card Number" 
                            value={newCard.number}
                            onChange={(e) => setNewCard({...newCard, number: e.target.value})}
                            maxLength={16}
                            className="h-9 border border-gray-300 px-3 text-xs outline-none focus:border-[#1a237e] rounded"
                            required
                          />
                          <input 
                            type="text" 
                            placeholder="Cardholder Name" 
                            value={newCard.name}
                            onChange={(e) => setNewCard({...newCard, name: e.target.value})}
                            className="h-9 border border-gray-300 px-3 text-xs outline-none focus:border-[#1a237e] rounded"
                            required
                          />
                          <div className="grid grid-cols-2 gap-2">
                            <input 
                              type="text" 
                              placeholder="MM/YY" 
                              value={newCard.expiry}
                              onChange={(e) => setNewCard({...newCard, expiry: e.target.value})}
                              maxLength={5}
                              className="h-9 border border-gray-300 px-3 text-xs outline-none focus:border-[#1a237e] rounded"
                              required
                            />
                            <input 
                              type="text" 
                              placeholder="CVV" 
                              value={newCard.cvv}
                              onChange={(e) => setNewCard({...newCard, cvv: e.target.value})}
                              maxLength={3}
                              className="h-9 border border-gray-300 px-3 text-xs outline-none focus:border-[#1a237e] rounded"
                              required
                            />
                          </div>
                          <button type="submit" className="h-9 bg-[#1f1d24] text-xs font-semibold text-white hover:bg-black rounded">
                            Save Card
                          </button>
                        </div>
                      </form>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {wallet.map((card) => (
                        <div key={card.id} className="bg-gradient-to-r from-slate-900 to-slate-950 text-white p-6 rounded-lg shadow-sm flex flex-col justify-between min-h-[150px]">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">CozyCommerce Preferred</p>
                              <h3 className="text-sm font-bold mt-1 tracking-wider">{card.type}</h3>
                            </div>
                            <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-800 text-slate-300 border border-slate-700 rounded">
                              Active
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-semibold tracking-widest text-slate-100">{card.number}</p>
                            <div className="flex justify-between mt-4">
                              <div>
                                <p className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">Holder</p>
                                <p className="text-xs font-medium">{card.name}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">Expires</p>
                                <p className="text-xs font-medium">{card.expiry}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4. Rewards Tab */}
                {activeTab === "rewards" && (
                  <div>
                    <h2 className="text-xl font-bold tracking-tight pb-3 border-b border-gray-100 mb-6 flex items-center gap-2">
                      <Award className="text-indigo-600" />
                      Wayfair Rewards Program
                    </h2>

                    <div className="bg-slate-50 border border-slate-150 p-6 rounded mb-8 text-center max-w-lg mx-auto">
                      <h3 className="text-base font-bold text-slate-900 mb-2">You are currently at Bronze Tier</h3>
                      <p className="text-xs text-gray-600 mb-6 leading-relaxed">Unlock complimentary shipping, earn 5% back on all purchases, and gain early access to flash sales and designer collection launches.</p>
                      
                      <div className="w-full bg-slate-200 rounded-full h-2 mb-2">
                        <div className="bg-indigo-600 h-2 rounded-full" style={{ width: "30%" }}></div>
                      </div>
                      <div className="flex justify-between text-[10px] font-bold text-gray-400">
                        <span>0 Points (Bronze)</span>
                        <span>500 Points (Silver)</span>
                      </div>
                    </div>

                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4">Program Perks</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="border border-slate-150 p-4 rounded bg-white">
                        <h4 className="text-xs font-bold text-slate-900 mb-1">5% Rewards Back</h4>
                        <p className="text-xs text-gray-500 leading-relaxed font-medium">Earn 5% back in Cozy Points on every purchase. Redeem points at checkout.</p>
                      </div>
                      <div className="border border-slate-150 p-4 rounded bg-white">
                        <h4 className="text-xs font-bold text-slate-900 mb-1">Free Delivery</h4>
                        <p className="text-xs text-gray-500 leading-relaxed font-medium">Enjoy free standard shipping on orders of any size. No minimum spend needed.</p>
                      </div>
                      <div className="border border-slate-150 p-4 rounded bg-white">
                        <h4 className="text-xs font-bold text-slate-900 mb-1">Birthday Gift</h4>
                        <p className="text-xs text-gray-500 leading-relaxed font-medium">Receive a specialized $25 birthday card to treat yourself every year.</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 5. Saved Items Tab */}
                {activeTab === "saved" && (
                  <div>
                    <h2 className="text-xl font-bold tracking-tight pb-3 border-b border-gray-100 mb-6 flex items-center gap-2">
                      <Heart className="text-red-500" />
                      Saved Items
                    </h2>

                    <div className="py-12 text-center max-w-sm mx-auto">
                      <p className="text-sm font-semibold text-slate-900 mb-2">Your Saved list is currently empty</p>
                      <p className="text-xs text-gray-500 mb-6 leading-relaxed">Save items you love by tapping the heart icon on any design or product page.</p>
                      <Link 
                        href="/sale"
                        className="inline-flex h-[38px] px-5 bg-[#1f1d24] text-xs font-semibold text-white items-center justify-center transition hover:bg-black"
                      >
                        Explore Collections
                      </Link>
                    </div>
                  </div>
                )}

                {/* 6. Review Purchases Tab */}
                {activeTab === "reviews" && (
                  <div>
                    <h2 className="text-xl font-bold tracking-tight pb-3 border-b border-gray-100 mb-6 flex items-center gap-2">
                      <MessageSquare className="text-emerald-600" />
                      Review My Purchases
                    </h2>

                    <div className="py-12 text-center max-w-sm mx-auto">
                      <p className="text-sm font-semibold text-slate-900 mb-2">No reviewable items found</p>
                      <p className="text-xs text-gray-500 leading-relaxed">Once you make a purchase, you can rate and review your pieces here to help other curators!</p>
                    </div>
                  </div>
                )}

              </div>
            </div>

          </div>
        )}

      </div>
    </main>
  );
}
