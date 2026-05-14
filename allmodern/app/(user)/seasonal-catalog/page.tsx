"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { 
  ZoomIn, 
  Grid3X3, 
  FileDown, 
  Search, 
  Share, 
  Flag, 
  ChevronRight, 
  ChevronLeft,
  X,
  Plus
} from "lucide-react";

// Mock Data for Catalog Pages
const catalogPages = [
  {
    id: 1,
    image: "/images/cat_outdoor.png",
    hotspots: [
      { 
        id: 1, 
        x: 45, 
        y: 65, 
        name: "Outdoor Dining Table", 
        details: { price: "$899", description: "Solid teak wood table perfect for summer gatherings. Weather-resistant finish.", image: "/images/cat_dining.png" } 
      },
      { 
        id: 2, 
        x: 60, 
        y: 75, 
        name: "Woven Dining Chair", 
        details: { price: "$199", description: "Durable, weather-resistant woven chair. Sold individually.", image: "/images/hero.png" } 
      }
    ]
  },
  {
    id: 2,
    image: "/images/cat_living_room.png",
    hotspots: [
      { 
        id: 3, 
        x: 50, 
        y: 55, 
        name: "Geo Upholstered Sofa", 
        details: { price: "$1,299", description: "Mid-century modern design with plush velvet upholstery.", image: "/images/cat_living_room.png" } 
      },
      { 
        id: 4, 
        x: 25, 
        y: 40, 
        name: "Abstract Wall Art", 
        details: { price: "$150", description: "Large canvas print featuring neutral tones.", image: "/images/cat_bedroom.png" } 
      }
    ]
  },
  {
    id: 3,
    image: "/images/cat_bedroom.png",
    hotspots: [
      { 
        id: 5, 
        x: 40, 
        y: 60, 
        name: "Minimalist Oak Bed", 
        details: { price: "$799", description: "Pared-back platform bed made from solid blonde oak.", image: "/images/cat_bedroom.png" } 
      }
    ]
  }
];

export default function SeasonalCatalogPage() {
  const [currentPage, setCurrentPage] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isGridOpen, setIsGridOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  
  // Selected product state for the modal
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  // Toast auto-hide
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const showToast = (msg: string) => setToastMessage(msg);

  // Navigation
  const handleNext = () => {
    if (currentPage < catalogPages.length - 1) {
      setCurrentPage(prev => prev + 1);
      setZoomLevel(1); // Reset zoom on page change
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
      setZoomLevel(1); // Reset zoom on page change
    }
  };

  // Toolbar Actions
  const handleZoom = () => {
    setZoomLevel(prev => prev === 1 ? 1.5 : prev === 1.5 ? 2 : 1);
  };

  const handleDownload = () => {
    showToast("Downloading Summer '26 PDF...");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast("Link copied to clipboard!");
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      showToast(`Searching for: "${searchQuery}"`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  const pageData = catalogPages[currentPage];

  return (
    <main className="bg-white min-h-screen flex flex-col">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-6 py-3 rounded shadow-lg text-sm font-medium transition-opacity">
          {toastMessage}
        </div>
      )}

      {/* Header */}
      <div className="text-center py-10 md:py-16">
        <p className="text-[11px] md:text-sm font-semibold tracking-widest text-slate-600 uppercase mb-2">
          SHOP THE BEST OF MODERN + GET INSPIRED
        </p>
        <h1 className="text-3xl md:text-4xl lg:text-[40px] font-bold text-slate-950 tracking-tight">
          ALLMODERN CATALOG
        </h1>
      </div>

      {/* Catalog Container */}
      <div className="flex-grow flex items-center justify-center p-4 sm:p-8 bg-slate-50 relative overflow-hidden">
        
        {/* Left Toolbar */}
        <div className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-6 z-20 h-full justify-center">
          <button onClick={handleZoom} className="p-2 text-slate-600 hover:text-slate-950 hover:bg-slate-200 transition rounded-full" title="Zoom">
            <ZoomIn className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <button onClick={() => setIsGridOpen(true)} className="p-2 text-slate-600 hover:text-slate-950 hover:bg-slate-200 transition rounded-full" title="View Pages">
            <Grid3X3 className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <button onClick={handleDownload} className="p-2 text-slate-600 hover:text-slate-950 hover:bg-slate-200 transition rounded-full" title="Download PDF">
            <FileDown className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="p-2 text-slate-600 hover:text-slate-950 hover:bg-slate-200 transition rounded-full relative" title="Search">
            <Search className="w-5 h-5 sm:w-6 sm:h-6" />
            
            {/* Search Popup */}
            {isSearchOpen && (
              <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 bg-white p-2 shadow-xl border border-slate-200 rounded flex w-[250px]">
                <form onSubmit={handleSearchSubmit} className="flex w-full">
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search catalog..." 
                    className="w-full text-sm outline-none px-2"
                    autoFocus
                  />
                  <button type="submit" className="bg-slate-900 text-white px-3 py-1 text-xs rounded hover:bg-slate-800">Go</button>
                </form>
              </div>
            )}
          </button>
          <button onClick={handleShare} className="p-2 text-slate-600 hover:text-slate-950 hover:bg-slate-200 transition rounded-full" title="Share">
            <Share className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          
          <div className="flex-grow"></div>
          
          <button onClick={() => setIsBookmarked(!isBookmarked)} className="p-2 mb-10 text-slate-600 hover:text-slate-950 hover:bg-slate-200 transition rounded-full" title="Bookmark">
            <Flag className={`w-5 h-5 sm:w-6 sm:h-6 ${isBookmarked ? 'fill-slate-900 text-slate-900' : ''}`} />
          </button>
        </div>

        {/* Viewer Area */}
        <div className="relative w-full max-w-[1000px] aspect-[3/4] md:aspect-[4/3] bg-white shadow-2xl border border-slate-200 flex items-center justify-center overflow-auto" style={{ cursor: zoomLevel > 1 ? 'grab' : 'default' }}>
          
          {/* Main Image Container */}
          <div 
            className="relative w-full h-full transition-transform duration-300 origin-center"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            <Image 
              src={pageData.image}
              alt={`Catalog Page ${currentPage + 1}`}
              fill
              className="object-cover"
              priority
            />

            {/* Hotspots */}
            {pageData.hotspots.map((spot) => (
              <div 
                key={spot.id}
                className="absolute z-10 group"
                style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
              >
                {/* Plus Icon */}
                <button 
                  onClick={() => setSelectedProduct(spot)}
                  className="w-8 h-8 md:w-10 md:h-10 bg-black/80 rounded-full flex items-center justify-center border-2 border-white hover:bg-black transition-colors shadow-lg"
                >
                  <Plus className="text-white w-5 h-5 md:w-6 md:h-6" />
                </button>
                
                {/* Tooltip (Name only) */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white px-3 py-1.5 shadow-lg border border-slate-200 text-xs font-bold text-slate-900 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  {spot.name}
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white border-l border-t border-slate-200 rotate-45"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Overlays */}
          {currentPage > 0 && (
            <button 
              onClick={handlePrev}
              className="absolute left-0 top-0 bottom-0 w-[15%] flex items-center justify-start pl-4 group z-10 hover:bg-gradient-to-r from-black/10 to-transparent"
            >
              <div className="w-12 h-12 bg-white/80 rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition duration-300 backdrop-blur-sm border border-slate-200">
                <ChevronLeft className="w-6 h-6 text-slate-900" />
              </div>
            </button>
          )}

          {currentPage < catalogPages.length - 1 && (
            <button 
              onClick={handleNext}
              className="absolute right-0 top-0 bottom-0 w-[15%] flex items-center justify-end pr-4 group z-10 hover:bg-gradient-to-l from-black/10 to-transparent"
            >
              <div className="w-12 h-12 bg-white/80 rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition duration-300 backdrop-blur-sm border border-slate-200">
                <ChevronRight className="w-6 h-6 text-slate-900" />
              </div>
            </button>
          )}

          {/* Page Indicator */}
          <div className="absolute bottom-4 right-4 text-[11px] font-medium text-slate-500 bg-white/80 px-2 py-1 rounded backdrop-blur border border-slate-200 z-10">
            {currentPage + 1} / {catalogPages.length}
          </div>
        </div>

      </div>

      {/* Bottom Banner */}
      <div className="w-full border-t border-slate-200 bg-white py-4 flex justify-center px-4">
        <p className="text-[13px] text-slate-600 text-center font-medium">
          Bookmark the shoppable AllModern online catalog, your source of inspiration for all things modern design.
        </p>
      </div>

      {/* Modals & Overlays */}
      
      {/* 1. Grid View Modal */}
      {isGridOpen && (
        <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-slate-200 p-4 flex justify-between items-center z-10">
            <h2 className="text-xl font-bold text-slate-950">Pages Overview</h2>
            <button onClick={() => setIsGridOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition">
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="p-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-[1600px] mx-auto">
            {catalogPages.map((page, idx) => (
              <button 
                key={page.id} 
                onClick={() => {
                  setCurrentPage(idx);
                  setIsGridOpen(false);
                }}
                className={`flex flex-col items-center group ${currentPage === idx ? 'ring-2 ring-slate-900 ring-offset-4' : ''}`}
              >
                <div className="relative w-full aspect-[3/4] bg-slate-100 border border-slate-200 mb-2 overflow-hidden shadow-sm group-hover:shadow-md transition">
                  <Image src={page.image} alt={`Page ${idx + 1}`} fill className="object-cover" />
                </div>
                <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900">{idx + 1}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 2. Product Details Modal (Hotspot Click) */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white max-w-[800px] w-full flex flex-col md:flex-row relative shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition shadow-sm border border-slate-200"
            >
              <X className="w-5 h-5 text-slate-900" />
            </button>
            
            {/* Image side */}
            <div className="w-full md:w-1/2 relative aspect-square bg-slate-100">
              <Image 
                src={selectedProduct.details.image} 
                alt={selectedProduct.name} 
                fill 
                className="object-cover"
              />
            </div>
            
            {/* Details side */}
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-slate-950 mb-2">{selectedProduct.name}</h3>
              <p className="text-xl font-bold text-slate-900 mb-6">{selectedProduct.details.price}</p>
              <p className="text-slate-600 text-[15px] mb-8 leading-relaxed">
                {selectedProduct.details.description}
              </p>
              <button className="w-full bg-slate-900 text-white font-bold py-4 hover:bg-slate-800 transition">
                Shop Now
              </button>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}
