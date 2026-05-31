"use client";

import { useCart } from "@/components/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { 
  Trash2, 
  Plus, 
  Minus, 
  ShieldCheck, 
  Lock, 
  ArrowRight, 
  ShoppingBag, 
  Info, 
  ChevronRight,
  Heart,
  Truck
} from "lucide-react";

export default function CartPage() {
  const router = useRouter();
  const { cartItems, cartCount, isLoading, updateQuantity, removeItem, toggleProtection } = useCart();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showCheckoutSuccess, setShowCheckoutSuccess] = useState(false);

  useEffect(() => {
    setIsAuthenticated(localStorage.getItem("allmodern-auth") === "true");
  }, []);

  const subtotal = cartItems.reduce((acc, item) => acc + (item.product.price || 0) * item.quantity, 0);
  const protectionTotal = cartItems.filter(item => item.protection).reduce((acc, item) => acc + (50 * item.quantity), 0);
  const shipping = subtotal > 35 || subtotal === 0 ? 0 : 9.99;
  const orderTotal = subtotal + protectionTotal + shipping;

  const handleCheckout = () => {
    setShowCheckoutSuccess(true);
    // Simulating order processing
    setTimeout(() => {
      setShowCheckoutSuccess(false);
    }, 6000);
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-white">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-900 border-t-transparent" />
        <p className="mt-4 text-sm font-semibold text-slate-500 uppercase tracking-widest">Loading Your Cart...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#faf9f6] text-slate-900 pb-24 font-sans">
      <div className="mx-auto max-w-[1400px] px-4 pt-8 sm:px-6">
        
        {/* Breadcrumb Path */}
        <nav className="flex items-center gap-1.5 text-[12.5px] text-slate-500 mb-6">
          <Link href="/" className="hover:text-slate-900 transition">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-slate-900 font-bold">Shopping Cart</span>
        </nav>

        {showCheckoutSuccess && (
          <div className="mb-6 rounded-lg bg-emerald-50 border border-emerald-200 p-6 flex flex-col md:flex-row items-center justify-between gap-4 animate-fade-in shadow-sm">
            <div>
              <h3 className="text-[17px] font-black text-slate-950 uppercase tracking-wide">Thank You for Your Order!</h3>
              <p className="mt-1 text-[13.5px] text-slate-600 leading-normal">
                This clone simulates checkout. Your cart has been synced to Neon Postgres, and your modern items are ready to ship!
              </p>
            </div>
            <Link href="/" className="bg-slate-950 hover:bg-black text-white font-extrabold text-[12.5px] px-6 py-3 uppercase tracking-wider rounded transition shrink-0">
              Continue Shopping
            </Link>
          </div>
        )}

        {cartItems.length === 0 ? (
          /* EMPTY STATE */
          <div className="bg-white border border-slate-200/80 rounded-xl p-12 text-center max-w-3xl mx-auto shadow-sm">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-50 border border-slate-100 text-slate-600 mx-auto mb-6">
              <ShoppingBag className="h-7 w-7" />
            </div>
            <h1 className="text-[26px] font-black tracking-tight text-slate-950">Your shopping cart is empty</h1>
            <p className="mt-3 text-[14.5px] text-slate-500 max-w-md mx-auto leading-relaxed">
              Items you add will display here. Sign in to retrieve any saved furniture items, or begin exploring our collections.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
              {!isAuthenticated && (
                <Link
                  href="/account"
                  className="bg-slate-950 hover:bg-black text-white font-extrabold text-[13.5px] uppercase tracking-wide px-8 py-4 transition flex items-center justify-center gap-1.5"
                >
                  Sign In to Your Account
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}
              <Link
                href="/sale"
                className="bg-white hover:bg-slate-50 text-slate-950 border border-slate-300 font-extrabold text-[13.5px] uppercase tracking-wide px-8 py-4 transition"
              >
                Browse Daily Sales
              </Link>
            </div>

            {/* Quick Browse Categories */}
            <div className="mt-16 pt-10 border-t border-slate-100">
              <h3 className="text-[12px] uppercase tracking-[0.2em] font-black text-slate-950 mb-6">Quick Browse Categories</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {[
                  { name: "Sofas", href: "/furniture" },
                  { name: "Bedroom", href: "/bedroom-collections" },
                  { name: "Dining Room", href: "/furniture" },
                  { name: "Outdoor", href: "/outdoor-collections" },
                  { name: "Rugs", href: "/rugs" },
                  { name: "Lighting", href: "/lighting" }
                ].map((cat) => (
                  <Link
                    key={cat.name}
                    href={cat.href}
                    className="border border-slate-200 hover:border-slate-900 rounded-lg p-3 text-[13px] font-bold text-slate-800 bg-slate-50/50 hover:bg-white transition"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* ACTIVE CART CONTAINER */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT COLUMN: LIST OF ITEMS */}
            <div className="lg:col-span-8 space-y-4">
              <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 pb-5 mb-5">
                  <h1 className="text-[22px] sm:text-[26px] font-black text-slate-950 leading-none">
                    Shopping Cart
                  </h1>
                  <span className="text-[14.5px] font-bold text-slate-500">{cartCount} Items</span>
                </div>

                <div className="divide-y divide-slate-100">
                  {cartItems.map((item) => {
                    const itemSubtotal = (item.product.price || 0) * item.quantity;
                    return (
                      <div key={item.id} className="py-6 first:pt-0 last:pb-0 flex flex-col sm:flex-row gap-5">
                        
                        {/* Image Panel */}
                        <div className="relative h-28 w-28 shrink-0 bg-slate-50 border border-slate-100 rounded-lg overflow-hidden flex items-center justify-center p-3">
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            fill
                            sizes="120px"
                            className="object-contain mix-blend-multiply"
                          />
                        </div>

                        {/* Details Panel */}
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start gap-4">
                              <h3 className="text-[16px] font-bold text-slate-950 hover:underline leading-snug">
                                <Link href={`/${item.product.categories?.[0] || 'furniture'}/pdp/${item.product.slug}.html`} target="_blank">
                                  {item.product.name}
                                </Link>
                              </h3>
                              <div className="text-right">
                                <span className="text-[17px] font-black text-slate-950">${itemSubtotal}</span>
                                {item.quantity > 1 && (
                                  <p className="text-[11.5px] text-slate-400 mt-0.5">(${item.product.price} each)</p>
                                )}
                              </div>
                            </div>

                            {/* Color Finishes */}
                            {item.color && (
                              <p className="text-[13px] text-slate-500 mt-1">
                                Finish: <span className="font-semibold text-slate-800">{item.color}</span>
                              </p>
                            )}

                            {/* Shipping info */}
                            <div className="mt-2.5 flex items-center gap-1.5 text-[12.5px] text-[#1a6b44] font-semibold">
                              <Truck className="h-4 w-4 shrink-0" />
                              <span>Free Shipping</span>
                              <span className="text-slate-300">|</span>
                              <span className="text-slate-500 font-medium">Arrives in 3-5 Business Days</span>
                            </div>
                          </div>

                          {/* Action controls (Qty, Protection, Delete) */}
                          <div className="mt-5 space-y-4 pt-4 border-t border-slate-50">
                            
                            {/* Protection plan wrapper */}
                            <div className="bg-[#faf9f6] border border-slate-200/60 rounded-lg p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[13.5px]">
                              <label className="flex items-start gap-2.5 font-bold text-slate-950 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={item.protection}
                                  onChange={(e) => toggleProtection(item.id, e.target.checked)}
                                  className="h-4.5 w-4.5 rounded border-slate-300 text-slate-950 focus:ring-slate-900 mt-0.5"
                                />
                                <div>
                                  <span className="flex items-center gap-1.5">
                                    <ShieldCheck className="h-4.5 w-4.5 text-slate-700 shrink-0" />
                                    Add 5-Year Protection Plan
                                  </span>
                                  <span className="text-[12px] text-slate-500 font-normal block mt-0.5">
                                    Covers accidental stains, tears, and structural failures.
                                  </span>
                                </div>
                              </label>
                              <span className="font-black text-slate-950 sm:text-right shrink-0">+$50.00 / item</span>
                            </div>

                            <div className="flex items-center justify-between">
                              {/* Quantity Stepper */}
                              <div className="flex items-center border border-slate-300 rounded bg-white px-2.5 py-1 select-none">
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="p-1 text-slate-500 hover:text-slate-900 disabled:opacity-30 transition"
                                  aria-label="Decrease quantity"
                                >
                                  <Minus className="h-3.5 w-3.5" />
                                </button>
                                <span className="w-8 text-center text-[14px] font-black text-slate-950">
                                  {item.quantity}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="p-1 text-slate-500 hover:text-slate-900 transition"
                                  aria-label="Increase quantity"
                                >
                                  <Plus className="h-3.5 w-3.5" />
                                </button>
                              </div>

                              {/* Remove & Save buttons */}
                              <div className="flex gap-4">
                                <button
                                  type="button"
                                  onClick={() => removeItem(item.id)}
                                  className="text-[13px] font-bold text-slate-500 hover:text-red-600 transition flex items-center gap-1"
                                >
                                  <Trash2 className="h-4 w-4" />
                                  Remove
                                </button>
                              </div>
                            </div>

                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: STICKY CHECKOUT SUMMARY CARD */}
            <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-4">
              <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-sm space-y-6">
                <h2 className="text-[17px] font-black text-slate-950 uppercase tracking-wider">Order Summary</h2>

                <div className="space-y-3.5 text-[14px]">
                  <div className="flex justify-between text-slate-600">
                    <span>Items Subtotal ({cartCount})</span>
                    <span className="font-bold text-slate-900">${subtotal.toFixed(2)}</span>
                  </div>
                  {protectionTotal > 0 && (
                    <div className="flex justify-between text-slate-600">
                      <span>Protection Plans</span>
                      <span className="font-bold text-slate-900">${protectionTotal.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-600">
                    <span>Shipping</span>
                    {shipping === 0 ? (
                      <span className="text-[#1a6b44] font-bold uppercase tracking-wide">Free</span>
                    ) : (
                      <span className="font-bold text-slate-900">${shipping.toFixed(2)}</span>
                    )}
                  </div>
                  <div className="flex justify-between text-slate-600 border-b border-slate-100 pb-4">
                    <span className="flex items-center gap-1">
                      Estimated Tax
                      <Info className="h-3.5 w-3.5 text-slate-400" />
                    </span>
                    <span className="text-slate-400">Calculated at Checkout</span>
                  </div>
                  
                  <div className="flex justify-between text-[18px] font-black text-slate-950 uppercase pt-2">
                    <span>Estimated Total</span>
                    <span>${orderTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Affirm Promo */}
                <div className="bg-slate-50 border border-slate-100 p-3 rounded text-[12.5px] text-slate-600 leading-normal">
                  As low as <span className="font-extrabold text-slate-950">${Math.round(orderTotal / 16)}/mo.</span> or 0% APR with <span className="font-extrabold text-indigo-700 italic">affirm</span>. <br />
                  <span className="underline hover:text-slate-950 cursor-pointer">Check your purchasing power</span>
                </div>

                <div className="space-y-3 pt-2">
                  <button
                    type="button"
                    onClick={handleCheckout}
                    className="w-full bg-slate-950 hover:bg-black text-white font-extrabold text-[14px] uppercase tracking-wider py-4 transition flex items-center justify-center gap-1.5"
                  >
                    Proceed to Checkout
                    <ArrowRight className="h-4.5 w-4.5" />
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[12px] text-slate-500 font-bold uppercase tracking-wide pt-1">
                    <Lock className="h-3.5 w-3.5 text-slate-400" />
                    <span>SSL Secure Checkout</span>
                  </div>
                </div>
              </div>

              {/* Assistance info card */}
              <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-sm text-[13px] text-slate-600 space-y-3">
                <p className="font-bold text-slate-950">Need Help Placing an Order?</p>
                <p>Call our design and sales experts toll-free at <span className="font-extrabold text-slate-900">844-313-0570</span>.</p>
                <div className="pt-2 border-t border-slate-100 text-[12px] font-semibold flex items-center gap-2">
                  <Link href="#" className="underline hover:text-slate-900">Return Policy</Link>
                  <span className="text-slate-300">|</span>
                  <Link href="#" className="underline hover:text-slate-900">Shipping Details</Link>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </main>
  );
}
