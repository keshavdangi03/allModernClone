"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Heart, 
  Share2, 
  Truck, 
  RotateCcw, 
  HelpCircle, 
  Check, 
  Plus, 
  Minus, 
  Star, 
  Calendar,
  Sparkles,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  MessageSquare
} from "lucide-react";
import { getProductUrl } from "@/lib/utils";
import { useCart } from "@/components/context/CartContext";

export type Product = {
  id: string;
  name: string;
  subtitle?: string | null;
  price?: number | null;
  discountedPrice?: number | null;
  priceStr?: string | null;
  originalPrice?: number | null;
  origPriceStr?: string | null;
  extraText?: string | null;
  reviews?: number | null;
  rating?: number | null;
  badge?: string | null;
  image: string;
  categories: string[];
  slug: string;
  description?: string | null;
  shortDescription?: string | null;
  colors?: string[];
  images?: string[];
  variants?: any;
  customAttributes?: any;
  additionalInfo?: any;
  body?: string | null;
};

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
  categoryName: string;
}

export default function ProductDetailClient({ product, relatedProducts, categoryName }: ProductDetailClientProps) {
  // 1. Gallery & Images State
  const defaultGallery = [
    product.image,
    "/images/cat_living_room.png",
    "/images/cat_bedroom.png",
    "/images/cat_dining.png"
  ];
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // 2. Swatches State
  const swatches = [
    { name: "Mellow Forest Chenille", value: "#3a4c41", outOfStock: false },
    { name: "Oatmeal Bouclé", value: "#eae3db", outOfStock: false },
    { name: "Rust Velvet", value: "#994c33", outOfStock: true },
    { name: "Charcoal Chenille", value: "#2e3033", outOfStock: false },
    { name: "Olive Chenille", value: "#4e5a47", outOfStock: false },
    { name: "Crimson Velvet", value: "#702028", outOfStock: true }
  ];
  const [selectedSwatch, setSelectedSwatch] = useState(swatches[0]);

  // 3. Buy Flow State
  const [quantity, setQuantity] = useState(1);
  const [protectionChecked, setProtectionChecked] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const { addToCart } = useCart();

  // 4. Accordions State
  const [accordionOpen, setAccordionOpen] = useState({
    overview: true,
    details: false,
    dimensions: false,
    reviews: false
  });

  // 5. Interactive Reviews List
  const defaultReviewsList = [
    {
      id: 1,
      author: "Chloe M.",
      rating: 5,
      date: "May 18, 2026",
      title: "Absolutely Stunning Accent Chair!",
      body: "Highly recommend! The chenille fabric is high quality, thick, and feels incredibly premium. It has the perfect level of firmness and supports my back nicely. The design elevates our entire living room.",
      verified: true,
      helpful: 12
    },
    {
      id: 2,
      author: "Marcus V.",
      rating: 5,
      date: "April 29, 2026",
      title: "Clean Lines & Beautiful Swivel Base",
      body: "Exceeded my expectations! The swivel is silent and rotates smoothly. I got the Forest Chenille color, and it looks beautiful. Assembly took under 10 minutes. A solid modern statement piece.",
      verified: true,
      helpful: 8
    }
  ];
  const [reviewsList, setReviewsList] = useState(defaultReviewsList);
  const [reviewForm, setReviewForm] = useState({ rating: 5, name: "", title: "", body: "" });
  const [showReviewSuccess, setShowReviewSuccess] = useState(false);

  // Computed Values
  const price = product.price || 499;
  const originalPrice = product.originalPrice || 529;
  
  const totalReviewsCount = 255 + (reviewsList.length - defaultReviewsList.length);
  const averageRating = 4.9;

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewForm.name || !reviewForm.title || !reviewForm.body) return;

    const newReview = {
      id: Date.now(),
      author: reviewForm.name,
      rating: reviewForm.rating,
      date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
      title: reviewForm.title,
      body: reviewForm.body,
      verified: true,
      helpful: 0
    };

    setReviewsList([newReview, ...reviewsList]);
    setReviewForm({ rating: 5, name: "", title: "", body: "" });
    setShowReviewSuccess(true);
    setTimeout(() => setShowReviewSuccess(false), 5000);
  };

  const handleAddToCart = async () => {
    setIsAdding(true);
    const success = await addToCart(product.id, quantity, selectedSwatch.name, protectionChecked);
    setIsAdding(false);
    if (success) {
      setIsAdded(true);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 4000);
    }
  };

  const toggleAccordion = (section: keyof typeof accordionOpen) => {
    setAccordionOpen(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 pb-20 font-sans">
      
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-[100] max-w-sm rounded bg-white p-4 border border-slate-200 shadow-xl transition-all animate-slide-in flex gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <Check className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-[14px] font-bold text-slate-950">Added to Cart</h4>
            <p className="mt-0.5 text-[12px] text-slate-500 leading-normal line-clamp-1">
              {quantity}x {product.name} ({selectedSwatch.name}) {protectionChecked && "+ Protection Plan"}
            </p>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="mx-auto max-w-[1400px] px-4 pt-6 sm:px-6">
        
        {/* Breadcrumb Path matching screenshot layout */}
        <nav className="flex items-center flex-wrap gap-1 text-[13px] text-slate-600 mb-6 font-sans">
          <Link href="/" className="hover:text-slate-950 transition">Furniture</Link>
          <span className="text-slate-400">/</span>
          <span className="hover:text-slate-950 cursor-pointer transition">Living Room Furniture</span>
          <span className="text-slate-400">/</span>
          <span className="hover:text-slate-950 cursor-pointer transition">Accent + Lounge Chairs</span>
          <span className="text-slate-400">/</span>
          <span className="hover:text-slate-950 cursor-pointer transition">Accent Chairs</span>
          <span className="text-slate-400">/</span>
          <span className="text-slate-500 font-medium">SKU: KKA{product.id.replace(/[^0-9]/g, "") || "1366"}</span>
        </nav>

        {/* Product Layout Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          
          {/* LEFT PANEL: Images Display (7 Columns) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Main Visual Display */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#faf9f6] flex items-center justify-center p-8 border border-slate-100">
              <span className="absolute left-6 top-6 z-10 bg-slate-950 text-white font-bold uppercase text-[11px] tracking-wider px-3.5 py-1">
                BEST SELLER
              </span>
              
              <button 
                onClick={() => setIsFavorited(!isFavorited)}
                className="absolute right-6 top-6 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-700 shadow-md border border-slate-100 hover:scale-105 active:scale-95 transition"
                aria-label="Add to board"
              >
                <Heart className={`h-5 w-5 transition duration-300 ${isFavorited ? "fill-red-500 text-red-500" : "text-slate-700"}`} />
              </button>
              
              <Image 
                src={defaultGallery[activeImageIndex]} 
                alt={product.name} 
                fill 
                priority
                className="object-contain mix-blend-multiply transition-all duration-300"
              />
            </div>

            {/* Grid of Lifestyle Secondary Images directly underneath */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-[4/3] bg-slate-50 overflow-hidden border border-slate-100 cursor-pointer" onClick={() => setActiveImageIndex(1)}>
                <Image src="/images/cat_living_room.png" alt="Lifestyle Room Setup 1" fill className="object-cover hover:scale-[1.02] transition duration-300" />
              </div>
              <div className="relative aspect-[4/3] bg-slate-50 overflow-hidden border border-slate-100 cursor-pointer" onClick={() => setActiveImageIndex(2)}>
                <Image src="/images/cat_bedroom.png" alt="Lifestyle Room Setup 2" fill className="object-cover hover:scale-[1.02] transition duration-300" />
              </div>
            </div>

          </div>

          {/* RIGHT PANEL: Product Customization & Buy Panel (5 Columns) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Header info */}
            <div>
              <h1 className="text-[28px] sm:text-[34px] font-black tracking-tight text-slate-950 leading-tight">
                {product.name}
              </h1>

              {/* Stars rating */}
              <div className="flex items-center gap-1.5 mt-2">
                <div className="flex text-slate-900 text-[15px]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4.5 w-4.5 fill-current text-slate-950" />
                  ))}
                </div>
                <span className="text-[14px] font-bold text-slate-900">{averageRating}</span>
                <a 
                  href="#accordion-reviews" 
                  onClick={() => setAccordionOpen({ ...accordionOpen, reviews: true })}
                  className="text-[14px] text-slate-500 underline underline-offset-2 hover:text-slate-950 transition ml-1"
                >
                  {totalReviewsCount} Reviews
                </a>
              </div>
            </div>

            {/* Slashed Prices + Affirm finance block */}
            <div className="flex items-start gap-4 border-t border-slate-200 pt-5">
              <div className="flex flex-col">
                <span className="text-[28px] font-black text-slate-950">${price}</span>
                <span className="text-[15px] text-slate-400 line-through">${originalPrice}</span>
              </div>
              <div className="h-12 w-[1px] bg-slate-200 mx-2 shrink-0" />
              <div className="text-[13px] text-slate-600 leading-normal max-w-sm">
                As low as <span className="font-extrabold text-slate-950">${Math.round(price / 16)}/mo.</span> or 0% APR with <span className="font-extrabold text-indigo-700 italic">affirm</span>. <br />
                <span className="underline text-[12.5px] hover:text-slate-950 cursor-pointer">Live beautifully now. Pay over time.</span>
              </div>
            </div>

            {/* Circular swatch finishes with out of stock markers */}
            <div className="space-y-3 pt-3">
              <div className="text-[14px] font-medium text-slate-900">
                <span className="font-bold text-slate-950">Body Fabric:</span> {selectedSwatch.name}
              </div>
              
              <div className="flex flex-wrap gap-2.5">
                {swatches.map((swatch) => (
                  <button
                    key={swatch.name}
                    onClick={() => setSelectedSwatch(swatch)}
                    className={`relative h-[42px] w-[42px] rounded border transition duration-150 flex items-center justify-center p-[2px] ${
                      selectedSwatch.name === swatch.name ? "border-slate-950 ring-1 ring-slate-950" : "border-slate-300 hover:border-slate-500"
                    }`}
                    title={swatch.name}
                  >
                    <span 
                      className="h-full w-full block rounded-[2px]" 
                      style={{ backgroundColor: swatch.value }}
                    />
                    
                    {/* Diagnostic out-of-stock slash line matching the screenshot */}
                    {swatch.outOfStock && (
                      <div className="absolute inset-0 bg-transparent overflow-hidden rounded pointer-events-none">
                        <div className="w-[150%] h-[1px] bg-slate-400 rotate-45 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                      </div>
                    )}
                  </button>
                ))}
                
                {/* See All 9 Box finish tile */}
                <button className="h-[42px] px-3.5 border border-slate-300 hover:border-slate-950 rounded text-[11px] font-extrabold text-slate-900 bg-white tracking-wider flex items-center justify-center uppercase shrink-0">
                  See All 9
                </button>
              </div>
              
              <button className="text-[13.5px] font-bold text-slate-700 underline underline-offset-2 hover:text-slate-950 block pt-1.5">
                Order Free Samples
              </button>
            </div>

            {/* Delivery Details Block */}
            <div className="border border-slate-200 p-4 flex items-center justify-between hover:bg-slate-50/50 transition cursor-pointer">
              <div>
                <p className="text-[14px] font-bold text-slate-950">Free 3-Day Delivery</p>
                <p className="text-[13px] text-slate-500 mt-0.5">
                  Get it by <span className="font-extrabold text-slate-900">Wed, Jun 3</span> to <span className="underline">67346</span>
                </p>
              </div>
              <ChevronRight className="h-5 w-5 text-slate-400" />
            </div>

            {/* Stepper, Add to Cart & Protection */}
            <div className="space-y-4 pt-4">
              
              {/* Stepper & Add to Cart */}
              <div className="flex gap-4">
                
                {/* Quant Stepper */}
                <div className="flex items-center border border-slate-300 rounded h-[50px] bg-white px-2 select-none shrink-0">
                  <button 
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    disabled={quantity === 1}
                    className="p-1.5 text-slate-500 hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed transition"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-8 text-center text-[15px] font-black text-slate-950">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(prev => Math.min(10, prev + 1))}
                    className="p-1.5 text-slate-500 hover:text-slate-900 transition"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                {/* Add to Cart wide black button */}
                <button
                  onClick={handleAddToCart}
                  disabled={isAdding}
                  className="flex-1 bg-slate-950 hover:bg-black text-white font-extrabold text-[15px] tracking-wide h-[50px] uppercase transition flex items-center justify-center gap-2"
                >
                  {isAdding ? (
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  ) : (
                    "Add to Cart"
                  )}
                </button>

              </div>

              {/* Protection plan layout */}
              <div className="flex items-center justify-between text-[13.5px] border-b border-slate-200 pb-5">
                <label className="flex items-center gap-2.5 font-bold text-slate-950 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={protectionChecked}
                    onChange={(e) => setProtectionChecked(e.target.checked)}
                    className="h-[18px] w-[18px] rounded border-slate-300 text-slate-950 focus:ring-slate-950" 
                  />
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="h-4.5 w-4.5 text-slate-700" />
                    5 Year Protection Plan - $50.00
                  </span>
                </label>
                <Link href="#" className="underline font-bold text-slate-600 hover:text-slate-950 text-[13px]">See Details</Link>
              </div>

            </div>

            {/* Secondary business & rewards details */}
            <div className="space-y-3.5 text-[13px] text-slate-600 leading-normal">
              <p>
                Start saving on select items. <Link href="#" className="underline font-bold text-slate-700 hover:text-slate-950">Enroll your business for FREE</Link>
              </p>
              <p>
                Earn <span className="font-bold text-slate-950">$24.95</span> in rewards, with 5% back, plus more exclusive perks. <Link href="#" className="underline font-bold text-slate-700 hover:text-slate-950">Learn more</Link>
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center gap-2 font-bold text-slate-950">
                <span>Free Design Services</span>
                <span className="text-slate-300">|</span>
                <Link href="#" className="underline text-slate-700 hover:text-slate-950 font-extrabold">Get Started with an Expert</Link>
              </div>
            </div>

            {/* At a Glance Grid Section */}
            <div className="border-t border-slate-200 pt-6">
              <h3 className="text-[15.5px] font-black text-slate-950 uppercase tracking-wider mb-4">At a Glance</h3>
              <div className="grid grid-cols-2 gap-x-6 gap-y-3.5 text-[13.5px] text-slate-700">
                <div className="flex flex-col">
                  <span className="font-semibold text-slate-950">General Features:</span>
                  <span>Reversible Cushions</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-slate-950">Adjustability Features:</span>
                  <span>Swivel Mechanism</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-slate-950">Arrives fully assembled:</span>
                  <span>Yes, ready to lounge</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-slate-950">Removable cushion cover:</span>
                  <span>Yes, easy wash fabric</span>
                </div>
              </div>
            </div>

            {/* Collapsible Vertical Accordion list */}
            <div className="border-t border-slate-200 pt-2 space-y-1">
              
              {/* ACCORDION 1: Overview */}
              <div className="border-b border-slate-200">
                <button 
                  onClick={() => toggleAccordion("overview")}
                  className="w-full flex items-center justify-between py-4 text-left font-bold text-[15px] text-slate-950 uppercase tracking-wider hover:text-slate-700 transition"
                >
                  <span>Overview</span>
                  {accordionOpen.overview ? <ChevronUp className="h-4.5 w-4.5" /> : <ChevronDown className="h-4.5 w-4.5" />}
                </button>
                {accordionOpen.overview && (
                  <div className="pb-5 text-[14px] text-slate-600 leading-relaxed font-sans space-y-3">
                    <p>
                      Maximum plush factor. Our accent chair features an extra-deep seat + a sculptural silhouette perched on top of a metal swivel base. The sturdy wooden frame ensures longevity + a mix of upholstery options that let you get the custom look you want. Made for cloud-like comfort + cozy corners. Arrives fully assembled.
                    </p>
                  </div>
                )}
              </div>

              {/* ACCORDION 2: Details */}
              <div className="border-b border-slate-200">
                <button 
                  onClick={() => toggleAccordion("details")}
                  className="w-full flex items-center justify-between py-4 text-left font-bold text-[15px] text-slate-950 uppercase tracking-wider hover:text-slate-700 transition"
                >
                  <span>Details</span>
                  {accordionOpen.details ? <ChevronUp className="h-4.5 w-4.5" /> : <ChevronDown className="h-4.5 w-4.5" />}
                </button>
                {accordionOpen.details && (
                  <div className="pb-5 text-[14px] text-slate-600 leading-relaxed space-y-2">
                    <p><span className="font-bold text-slate-950">Upholstery:</span> Premium chenille thread styling.</p>
                    <p><span className="font-bold text-slate-950">Frame Construction:</span> 100% kiln-dried hardwoods.</p>
                    <p><span className="font-bold text-slate-950">Weight Capacity:</span> Supports up to 300 lbs.</p>
                    <p><span className="font-bold text-slate-950">Upholstery Color:</span> Forest Green Blend.</p>
                  </div>
                )}
              </div>

              {/* ACCORDION 3: Dimensions */}
              <div className="border-b border-slate-200">
                <button 
                  onClick={() => toggleAccordion("dimensions")}
                  className="w-full flex items-center justify-between py-4 text-left font-bold text-[15px] text-slate-950 uppercase tracking-wider hover:text-slate-700 transition"
                >
                  <span>Dimensions</span>
                  {accordionOpen.dimensions ? <ChevronUp className="h-4.5 w-4.5" /> : <ChevronDown className="h-4.5 w-4.5" />}
                </button>
                {accordionOpen.dimensions && (
                  <div className="pb-5 text-[14px] text-slate-600 leading-relaxed space-y-2">
                    <p><span className="font-bold text-slate-950">Overall Height:</span> 33 inches</p>
                    <p><span className="font-bold text-slate-950">Seat Height:</span> 18.5 inches</p>
                    <p><span className="font-bold text-slate-950">Seat Width:</span> 29.8 inches</p>
                    <p><span className="font-bold text-slate-950">Seat Depth:</span> 22.5 inches</p>
                  </div>
                )}
              </div>

              {/* ACCORDION 4: Reviews */}
              <div id="accordion-reviews" className="border-b border-slate-200">
                <button 
                  onClick={() => toggleAccordion("reviews")}
                  className="w-full flex items-center justify-between py-4 text-left font-bold text-[15px] text-slate-950 uppercase tracking-wider hover:text-slate-700 transition"
                >
                  <span>Reviews ({totalReviewsCount})</span>
                  {accordionOpen.reviews ? <ChevronUp className="h-4.5 w-4.5" /> : <ChevronDown className="h-4.5 w-4.5" />}
                </button>
                {accordionOpen.reviews && (
                  <div className="pb-5 space-y-6">
                    
                    {/* Add Review Panel */}
                    <div className="bg-slate-50 p-4 rounded border border-slate-200">
                      <h4 className="font-bold text-slate-900 text-[13.5px] mb-1">Write a Review</h4>
                      {showReviewSuccess ? (
                        <p className="text-[12.5px] text-emerald-700 font-bold">Review submitted successfully!</p>
                      ) : (
                        <form onSubmit={handleReviewSubmit} className="space-y-3 mt-2">
                          <div className="grid grid-cols-2 gap-3">
                            <input 
                              type="text" 
                              required
                              placeholder="Your Name"
                              value={reviewForm.name}
                              onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                              className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-[12.5px]"
                            />
                            <input 
                              type="text" 
                              required
                              placeholder="Review Title"
                              value={reviewForm.title}
                              onChange={(e) => setReviewForm({ ...reviewForm, title: e.target.value })}
                              className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-[12.5px]"
                            />
                          </div>
                          <textarea 
                            required
                            placeholder="Write your review here..."
                            rows={2}
                            value={reviewForm.body}
                            onChange={(e) => setReviewForm({ ...reviewForm, body: e.target.value })}
                            className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-[12.5px] font-sans"
                          />
                          <button 
                            type="submit"
                            className="bg-slate-950 hover:bg-black text-white font-bold text-[11px] uppercase px-4 py-2 tracking-wider rounded"
                          >
                            Submit
                          </button>
                        </form>
                      )}
                    </div>

                    {/* Reviews List */}
                    <div className="space-y-4 pt-2">
                      {reviewsList.map((review) => (
                        <div key={review.id} className="border-b border-slate-100 pb-4 last:border-b-0 space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="font-extrabold text-[13.5px] text-slate-900">{review.author}</span>
                            <span className="text-[11.5px] text-slate-500">{review.date}</span>
                          </div>
                          <div className="flex text-amber-500">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`h-3 w-3 fill-current ${i < review.rating ? "text-amber-500" : "text-slate-200"}`} />
                            ))}
                          </div>
                          <h5 className="font-bold text-[13.5px] text-slate-950">{review.title}</h5>
                          <p className="text-[13px] text-slate-700 leading-relaxed font-sans">{review.body}</p>
                        </div>
                      ))}
                    </div>

                  </div>
                )}
              </div>

            </div>

          </div>

        </div>

        {/* RELATED PRODUCTS SLIDER CAROUSEL */}
        {relatedProducts.length > 0 && (
          <section className="mt-24 border-t border-slate-200 pt-12">
            <div className="mb-6 flex justify-between items-end">
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#a63f15] font-black">Complete the Look</p>
                <h3 className="mt-1 text-[24px] font-black tracking-tight text-slate-950 leading-none">You Might Also Like</h3>
              </div>
              <Link 
                href={`/${categoryName}`} 
                className="text-[13px] font-bold text-slate-800 underline underline-offset-4 hover:text-[#a63f15] transition"
              >
                Shop All {categoryName}
              </Link>
            </div>
            
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
              {relatedProducts.map((p) => {
                const cardPrice = p.price || 0;
                const cardOrigPrice = p.originalPrice || null;
                const pUrl = getProductUrl(p);

                return (
                  <Link 
                    key={p.id} 
                    href={pUrl}
                    target="_blank"
                    className="group bg-white border border-slate-200/80 rounded-xl overflow-hidden p-3 shadow-sm hover:shadow-lg transition duration-300 flex flex-col justify-between"
                  >
                    <div className="relative aspect-square w-full overflow-hidden bg-slate-50 flex items-center justify-center p-3 rounded-lg">
                      <Image 
                        src={p.image} 
                        alt={p.name} 
                        fill
                        sizes="(max-width: 768px) 50vw, 20vw"
                        className="object-contain mix-blend-multiply p-2 transition duration-500 group-hover:scale-105"
                      />
                      {p.badge && (
                        <span className="absolute bottom-2 left-2 bg-[#a63f15] text-white font-extrabold text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded">
                          {p.badge}
                        </span>
                      )}
                    </div>
                    <div className="mt-3 flex-1 flex flex-col justify-between">
                      <h4 className="text-[12.5px] font-semibold text-slate-800 line-clamp-2 leading-snug group-hover:underline">{p.name}</h4>
                      <div className="mt-2 flex items-baseline gap-1.5">
                        <span className="text-[14px] font-extrabold text-[#a63f15]">${cardPrice}</span>
                        {cardOrigPrice && cardOrigPrice > cardPrice && (
                          <span className="text-[11.5px] text-slate-400 line-through">${cardOrigPrice}</span>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
