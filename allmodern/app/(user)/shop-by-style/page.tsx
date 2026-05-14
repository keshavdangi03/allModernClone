"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

// Dummy data for the different styles
const styleSections = [
  {
    id: "scandi",
    title: "Scandi",
    description: "Clean lines, soft textures + natural touches.",
    image: "/images/cat_bedroom.png",
    products: [
      { name: "Ambra Solid Wood Dining Chair", price: "$189", image: "/images/cat_dining.png" },
      { name: 'Mille 88" Dining Table', price: "$2,041", image: "/images/cat_outdoor.png" },
      { name: 'Mille 72" Sideboard', price: "$2,149", image: "/images/cat_living_room.png" },
      { name: 'Mille 104" Dining Table', price: "$2,199", image: "/images/cat_dining.png" },
      { name: "Ambra Vegan Leather Dining Chair", price: "$319", oldPrice: "$429", image: "/images/hero.png", sale: true },
      { name: "Sunrise 1 by Andrea Stokes", price: "$188", image: "/images/cat_bedroom.png" },
    ]
  },
  {
    id: "mid-century",
    title: "Mid-Century Modern",
    description: "Retro forms, purposeful function + bold hues.",
    image: "/images/hero.png",
    products: [
      { name: 'Geo 84" Upholstered Sofa', price: "$1,099", image: "/images/cat_living_room.png" },
      { name: "Eris Linen Dining Chair", price: "$1,149", image: "/images/cat_dining.png" },
      { name: "Hazy Gray by Julia Balfour", price: "$218", image: "/images/cat_bedroom.png" },
      { name: "Clouds 1 by Lee Lessem", price: "$218", image: "/images/cat_outdoor.png" },
      { name: "Lyndsey Module On Green 3 By Michael Kempon", price: "$251", image: "/images/cat_living_room.png" },
      { name: "Daisetta Upholstered Accent Chair", price: "$899", image: "/images/hero.png" },
    ]
  },
  {
    id: "farmhouse",
    title: "Modern Farmhouse",
    description: "Blonde woods, earthy touches + raw finishes.",
    image: "/images/cat_dining.png",
    products: [
      { name: "Fen Solid Wood End Table", price: "$260", oldPrice: "$407", image: "/images/cat_living_room.png", sale: true },
      { name: "Harding Vegan Leather Dining Chair", price: "$449", image: "/images/cat_dining.png" },
      { name: "Abstract #2 by StudioM", price: "$190", image: "/images/cat_bedroom.png" },
      { name: "Crosshatch Sunbrella Indoor/Outdoor Throw Pillow", price: "$80", image: "/images/cat_outdoor.png" },
      { name: "Succulent Set Of 2 by StudioM", price: "$355", image: "/images/cat_living_room.png" },
      { name: "Weaving by Marco Marella", price: "$359", image: "/images/hero.png" },
    ]
  },
  {
    id: "minimalist",
    title: "Minimalist",
    description: "Pared-back forms, artful touches + neutral hues.",
    image: "/images/cat_bedroom.png",
    products: [
      { name: 'Flow 39.4" Round Dining Table', price: "$899", image: "/images/cat_dining.png" },
      { name: "Celestia Upholstered Dining Chair", price: "$499", image: "/images/cat_living_room.png" },
      { name: "Lurie Glass Nesting Tables with Storage", price: "$165", oldPrice: "$299", image: "/images/cat_outdoor.png", sale: true },
      { name: "Lowell White Fragments from Greece 1 by Svetlana Smirnova", price: "$190", image: "/images/cat_bedroom.png" },
      { name: "White Fragments From Greece 2 by Svetlana Smirnova", price: "$190", image: "/images/hero.png" },
      { name: "Arthi Metal Table Lamp", price: "$599", image: "/images/cat_living_room.png" },
    ]
  },
  {
    id: "global",
    title: "Global",
    description: "Rich textiles, handcrafted elements + worldly touches.",
    image: "/images/hero.png",
    products: [
      { name: 'Daymon 84" Dining Table', price: "$1,899", image: "/images/cat_dining.png" },
      { name: "Kaybah Leather Dining Arm Chair", price: "$359", image: "/images/cat_living_room.png" },
      { name: "Missy Side Chair", price: "$600", image: "/images/cat_outdoor.png" },
      { name: "Gatsby Square Resin Table Lamp", price: "$350", image: "/images/cat_bedroom.png" },
      { name: 'Kana 74" Sideboard', price: "$4,498", image: "/images/cat_living_room.png" },
      { name: "Gatsby Cylinder Resin Table Lamp", price: "$350", image: "/images/hero.png" },
    ]
  }
];

export default function ShopByStylePage() {
  return (
    <main className="bg-white min-h-screen">
      {/* 1. Hero Banner */}
      <section className="w-full bg-[#f6f4f0] pt-16 sm:pt-20 lg:pt-24 pb-8 overflow-hidden flex flex-col items-center text-center">
        <h1 className="text-5xl sm:text-6xl md:text-[80px] lg:text-[96px] font-bold text-slate-950 tracking-tight leading-none px-4">
          Every Style of Modern
        </h1>
        <p className="text-2xl sm:text-3xl md:text-[40px] text-slate-900 font-medium mt-4 mb-10 px-4">
          (All in One Place)
        </p>
        <div className="relative w-full max-w-[1200px] aspect-[2/1] sm:aspect-[2.5/1] md:aspect-[3/1] px-4">
          <Image 
            src="/images/cat_living_room.png" 
            alt="Various Modern Chairs" 
            fill 
            className="object-cover object-bottom px-4"
            priority
          />
        </div>
      </section>

      <div className="text-center py-16 px-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-950">
          The best of modern, from minimalist to maximalist.
        </h2>
      </div>

      {/* 2. Style Sections */}
      {styleSections.map((section, idx) => (
        <section key={section.id} className="w-full mb-20 sm:mb-28">
          {/* Banner Image */}
          <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
            <div className="relative w-full aspect-[21/9] bg-slate-100 overflow-hidden">
              <Image 
                src={section.image} 
                alt={section.title} 
                fill 
                className="object-cover"
              />
            </div>
          </div>

          {/* Content Row */}
          <div className="mx-auto max-w-[1400px] px-4 sm:px-6 mt-8 sm:mt-12 flex flex-col lg:flex-row gap-8 lg:gap-12">
            
            {/* Left Column (Title & Description) */}
            <div className="lg:w-1/4 flex flex-col pt-4">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-950 mb-3">{section.title}</h3>
              <p className="text-[14px] text-slate-600 mb-6">{section.description}</p>
              <Link href="#" className="text-[13px] font-bold text-slate-950 underline underline-offset-4 hover:text-slate-600 transition">
                Shop Now
              </Link>
            </div>

            {/* Right Column (Product Carousel) */}
            <div className="lg:w-3/4 w-full overflow-x-auto pb-4 hide-scrollbar">
              <div className="flex gap-4 sm:gap-6 min-w-max">
                {section.products.map((product, pIdx) => (
                  <Link href="#" key={pIdx} className="group flex flex-col w-[160px] sm:w-[200px] md:w-[220px] shrink-0">
                    <div className="relative aspect-square w-full bg-slate-50 mb-4 overflow-hidden border border-slate-100">
                       <Image 
                        src={product.image} 
                        alt={product.name} 
                        fill 
                        className="object-cover transition duration-500 group-hover:scale-105" 
                      />
                      {/* Arrow indicator on hover (visible only on desktop usually, simulating here) */}
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white border border-slate-200 shadow-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ChevronRight className="w-5 h-5 text-slate-900" />
                      </div>
                    </div>
                    <h4 className="text-[13px] text-slate-900 leading-snug mb-1 group-hover:underline line-clamp-2">
                      {product.name}
                    </h4>
                    <div className="flex items-center gap-2 mt-auto">
                      {product.sale ? (
                        <>
                          <span className="text-[14px] font-bold text-[#b12024]">{product.price}</span>
                          <span className="text-[13px] text-slate-500 line-through">{product.oldPrice}</span>
                        </>
                      ) : (
                        <span className="text-[14px] font-bold text-slate-950">{product.price}</span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            
          </div>
        </section>
      ))}

      {/* 3. Bottom Collections Section */}
      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 pb-24 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-6">
        {/* Living Room */}
        <div className="flex flex-col">
          <div className="relative aspect-[21/9] w-full bg-slate-100 mb-6 overflow-hidden">
             <Image src="/images/hero.png" alt="Living Room Collections" fill className="object-cover" />
          </div>
          <h3 className="text-lg font-bold text-slate-950 mb-2">Living Room Collections</h3>
          <p className="text-[14px] text-slate-600 mb-4">
            Make designing your living room simple with expert-approved curations.
          </p>
          <Link href="#" className="text-[13px] font-bold text-slate-950 underline underline-offset-4 hover:text-slate-600 transition">
            Shop Now
          </Link>
        </div>
        
        {/* Bedroom */}
        <div className="flex flex-col">
           <div className="relative aspect-[21/9] w-full bg-slate-100 mb-6 overflow-hidden">
             <Image src="/images/cat_bedroom.png" alt="Bedroom Collections" fill className="object-cover" />
          </div>
          <h3 className="text-lg font-bold text-slate-950 mb-2">Bedroom Collections</h3>
          <p className="text-[14px] text-slate-600 mb-4">
            It's not a dream - our experts curated the best of bedroom, all in one place.
          </p>
          <Link href="#" className="text-[13px] font-bold text-slate-950 underline underline-offset-4 hover:text-slate-600 transition">
            Shop Now
          </Link>
        </div>
      </section>

      {/* Internal CSS for hiding scrollbar in carousels while keeping functionality */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </main>
  );
}
