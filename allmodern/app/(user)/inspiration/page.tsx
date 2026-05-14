"use client";

import Image from "next/image";
import Link from "next/link";

const stylesGrid = [
  { title: "Mid-Century", image: "/images/cat_living_room.png" },
  { title: "Scandinavian", image: "/images/cat_bedroom.png" },
  { title: "Modern Farmhouse", image: "/images/cat_dining.png" },
  { title: "Organic Modern", image: "/images/cat_outdoor.png" },
  { title: "Maximalist", image: "/images/hero.png" },
  { title: "Minimalist", image: "/images/cat_living_room.png" },
  { title: "Japandi", image: "/images/cat_bedroom.png" },
  { title: "All Modern Styles", image: "/images/cat_dining.png" },
];

const guides = [
  { title: "Refresh the Kid's Bedroom", image: "/images/cat_living_room.png" },
  { title: "One-Stop Reno Shop", image: "/images/cat_bedroom.png" },
  { title: "All About Outdoor Materials", image: "/images/cat_dining.png" },
  { title: "Mix + Match Dining", image: "/images/cat_outdoor.png" },
  { title: "One-Stop Sofa Shop", image: "/images/hero.png" },
  { title: "Small-Space Solutions", image: "/images/cat_living_room.png" },
  { title: "All About Sustainable Style", image: "/images/cat_bedroom.png" },
  { title: "Easy Entryway Updates", image: "/images/cat_dining.png" },
];

export default function InspirationPage() {
  return (
    <main className="bg-white min-h-screen">
      
      {/* 1. Main Header Banner */}
      <section className="w-full bg-[#f6f4f0] py-16 sm:py-24 md:py-28">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 flex flex-col md:flex-row md:items-baseline justify-between gap-6">
          <h1 className="text-[40px] sm:text-5xl md:text-[80px] font-bold text-slate-950 tracking-tight leading-none">
            Modern Inspo Hub
          </h1>
          <p className="text-xl sm:text-2xl md:text-[28px] text-slate-900 md:ml-8 font-medium">
            (Because modern enthusiasts need inspiration too.)
          </p>
        </div>
      </section>

      {/* 2. What's Your Modern Style? Grid */}
      <section className="mx-auto max-w-[1400px] px-4 pt-16 sm:px-6 pb-20">
        <h2 className="text-2xl md:text-[28px] font-bold text-slate-950 mb-8">What's Your Modern Style? Find Out.</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 lg:gap-x-6">
          {stylesGrid.map((style, idx) => (
            <Link href="#" key={idx} className="group flex flex-col cursor-pointer">
              <div className="relative aspect-square w-full overflow-hidden mb-3 bg-slate-100">
                <Image 
                  src={style.image} 
                  alt={style.title} 
                  fill 
                  className="object-cover transition duration-500 group-hover:scale-[1.03]" 
                />
              </div>
              <h3 className="text-[15px] font-bold text-slate-950 group-hover:underline leading-snug">
                {style.title}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Interior Expert Hub Banner */}
      <section className="w-full bg-[#f6f4f0] py-16 sm:py-20 md:py-24 border-t border-b border-white">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <h2 className="text-4xl sm:text-5xl md:text-[54px] font-bold text-slate-950 tracking-tight leading-tight mb-2">
              The Interior Expert Hub
            </h2>
            <p className="text-xl md:text-[24px] text-slate-900">
              All our #AMpartners, all in one place.
            </p>
          </div>
          <Link 
            href="#" 
            className="text-lg sm:text-[20px] font-bold text-slate-950 underline underline-offset-8 uppercase tracking-wide hover:text-slate-600 transition self-start md:self-center shrink-0"
          >
            SHOP + EXPLORE THEM ALL
          </Link>
        </div>
      </section>

      {/* 4. Influencers Section */}
      <section className="pt-16 pb-20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 pb-8">
           <h2 className="text-2xl md:text-[28px] font-bold text-slate-950">Design Like an Interior Expert</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* EM Henderson */}
          <div className="flex flex-col group cursor-pointer border-r border-b border-slate-200 md:border-b-0 pb-6 md:pb-0">
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image 
                src="/images/cat_living_room.png" 
                alt="Emily Henderson" 
                fill 
                className="object-cover transition duration-700 group-hover:scale-105" 
                priority
              />
              <div className="absolute inset-0 bg-black/10 transition duration-500 group-hover:bg-black/0" />
              {/* Top Left Name */}
              <div className="absolute top-6 left-6 md:top-10 md:left-10 z-10">
                <h3 className="text-black text-4xl md:text-5xl lg:text-[70px] font-bold tracking-tight leading-[0.9] drop-shadow-sm">
                  Emily<br/>Henderson
                </h3>
              </div>
              {/* Bottom Right Handle */}
              <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 z-10">
                <span className="text-white text-2xl md:text-3xl lg:text-[40px] font-bold tracking-tight drop-shadow-md">
                  @em_henderson
                </span>
              </div>
            </div>
            <div className="p-4 sm:p-6 md:px-8 md:py-6">
              <h4 className="text-[15px] font-bold text-slate-950 mb-1 group-hover:underline">Eclectic + Natural</h4>
              <p className="text-[13px] text-slate-600">
                Natural foundations get bold, earthy color palettes with this interior designer's modern style.
              </p>
            </div>
          </div>

          {/* Renovation Husbands */}
          <div className="flex flex-col group cursor-pointer pb-6 md:pb-0">
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image 
                src="/images/cat_bedroom.png" 
                alt="Renovation Husbands" 
                fill 
                className="object-cover transition duration-700 group-hover:scale-105" 
                priority
              />
              <div className="absolute inset-0 bg-black/10 transition duration-500 group-hover:bg-black/0" />
               {/* Top Left Name */}
               <div className="absolute top-6 left-6 md:top-10 md:left-10 z-10">
                <h3 className="text-white text-4xl md:text-5xl lg:text-[70px] font-bold tracking-tight leading-[0.9] drop-shadow-md">
                  Renovation<br/>Husbands
                </h3>
              </div>
              {/* Bottom Right Handle */}
              <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 z-10">
                <span className="text-white text-2xl md:text-3xl lg:text-[40px] font-bold tracking-tight drop-shadow-md">
                  @renovationhusbands
                </span>
              </div>
            </div>
            <div className="p-4 sm:p-6 md:px-8 md:py-6">
              <h4 className="text-[15px] font-bold text-slate-950 mb-1 group-hover:underline">Retro + Functional</h4>
              <p className="text-[13px] text-slate-600">
                Mid-century designs get practical finishes with the award-winning renovators' modern style.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Modern Guides + How-Tos Section */}
      <section className="mx-auto max-w-[1400px] px-4 pt-10 sm:px-6 pb-20">
        <h2 className="text-2xl md:text-[28px] font-bold text-slate-950 mb-8">Modern Guides + How-Tos</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 lg:gap-x-6">
          {guides.map((guide, idx) => (
            <Link href="#" key={idx} className="group flex flex-col">
              <div className="relative aspect-[3/4] w-full overflow-hidden mb-3 bg-slate-100">
                <Image 
                  src={guide.image} 
                  alt={guide.title} 
                  fill 
                  className="object-cover transition duration-500 group-hover:scale-[1.03]" 
                />
              </div>
              <h3 className="text-[14px] font-bold text-slate-950 group-hover:underline leading-snug">
                {guide.title}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* 6. Promotional Banner Section */}
      <section className="w-full bg-[#f6f4f0] py-16 sm:py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <h2 className="text-4xl sm:text-5xl md:text-[64px] font-bold text-slate-950 tracking-tight leading-none max-w-2xl">
            The Latest + Greatest in Modern
          </h2>
          <Link 
            href="#" 
            className="text-lg sm:text-[20px] font-bold text-slate-950 underline underline-offset-8 uppercase tracking-wide hover:text-slate-600 transition self-start md:self-center shrink-0"
          >
            SHOP NEW ARRIVALS
          </Link>
        </div>
      </section>
      
    </main>
  );
}
