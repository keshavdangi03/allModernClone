import Image from "next/image";
import Link from "next/link";
import { ChevronUp, ArrowRight, ChevronRight } from "lucide-react";

const collectionsData = [
  {
    id: "finnian",
    title: "Finnian\nCollection",
    mainImage: "/images/cat_bedroom.png",
    secondaryImage: "/images/cat_living_room.png",
    productsText: "Slatted storage + Japandi-inspired warm wood bring streamlined ease to the bedroom.",
    productsTitle: null,
    products: [
      { id: "finnian-1", name: "Finnian Solid Wood Bed", price: "2,299", originalPrice: null, badge: null, image: "/images/cat_bedroom.png" },
      { id: "finnian-2", name: "Finnian 2 - Drawer Nightstand", price: "459", originalPrice: "579", badge: null, image: "/images/cat_living_room.png" },
      { id: "finnian-3", name: "Finnian 6 Drawer Dresser", price: "1,499", originalPrice: "1,799", badge: null, image: "/images/cat_outdoor.png" },
      { id: "finnian-4", name: "Finnian 5 - Drawer Dresser", price: "1,099", originalPrice: "1,799", badge: null, image: "/images/hero.png" },
      { id: "finnian-5", name: "Finnian 3 - Drawer Nightstand", price: "599", originalPrice: "749", badge: null, image: "/images/cat_dining.png" },
    ]
  },
  {
    id: "mari",
    title: "Mari\nCollection",
    mainImage: "/images/cat_living_room.png",
    secondaryImage: "/images/cat_dining.png",
    productsText: "Smooth curves + soft-close drawers add a calming touch to the bedroom.",
    productsTitle: null,
    products: [
      { id: "mari-1", name: "Mari 60 in. W Quartz 4 Drawer Double\nBathroom Vanity", price: "2,281", originalPrice: "2,593", badge: null, image: "/images/cat_living_room.png" },
      { id: "mari-2", name: "Mari 60\" Sideboard", price: "1,789", originalPrice: "1,899", badge: null, image: "/images/cat_outdoor.png" },
      { id: "mari-3", name: "Mari 60\" 6-Drawer Dresser", price: "1,899", originalPrice: "2,199", badge: null, image: "/images/hero.png" },
      { id: "mari-4", name: "Mari 21 in. W Rectangular Wood 2 Drawer\nNightstand", price: "649", originalPrice: "749", extraText: "Free 3-Day Delivery", badge: null, image: "/images/cat_bedroom.png" },
    ]
  },
  {
    id: "nori",
    title: "Nori\nCollection",
    mainImage: "/images/cat_outdoor.png",
    secondaryImage: "/images/cat_living_room.png",
    productsText: "Solid wood + waterfall curves combine artistry with functional organization.",
    productsTitle: null,
    products: [
      { id: "nori-1", name: "Nori 7 - Drawer Dresser", price: "1,499", originalPrice: "1,849", badge: null, image: "/images/cat_outdoor.png" },
      { id: "nori-2", name: "Nori 2 - Drawer Nightstand", price: "579", originalPrice: "729", badge: null, image: "/images/hero.png" },
      { id: "nori-3", name: "Nori 1 - Drawer Nightstand in Jet Black", price: "629", originalPrice: "699", badge: null, image: "/images/cat_living_room.png" },
      { id: "nori-4", name: "Nori 5 - Drawer Dresser", price: "1,549", originalPrice: "1,799", badge: null, image: "/images/cat_bedroom.png" },
      { id: "nori-5", name: "Nori Solid Wood Platform Bed", price: "2,699", originalPrice: null, badge: null, image: "/images/cat_dining.png" },
    ]
  },
  {
    id: "paloma",
    title: "Paloma\nCollection",
    mainImage: "/images/cat_dining.png",
    secondaryImage: "/images/hero.png",
    productsText: "Clean lines, dovetail joinery + panel detailing add modern style to everyday storage.",
    productsTitle: null,
    products: [
      { id: "paloma-1", name: "Paloma 2 - Drawer Nightstand", price: "399", originalPrice: "449", badge: null, image: "/images/cat_dining.png" },
      { id: "paloma-2", name: "Paloma 5 - Drawer Dresser", price: "1,199", originalPrice: "1,349", badge: null, image: "/images/hero.png" },
      { id: "paloma-3", name: "Paloma 6 - Drawer Dresser", price: "1,399", originalPrice: "1,499", badge: null, image: "/images/cat_outdoor.png" },
      { id: "paloma-4", name: "Paloma 3 - Drawer Dresser", price: "999", originalPrice: "1,099", badge: null, image: "/images/cat_living_room.png" },
      { id: "paloma-5", name: "Paloma 62\" Sideboard", price: "1,399", originalPrice: "1,549", badge: null, image: "/images/cat_bedroom.png" },
    ]
  },
  {
    id: "williams",
    title: "Williams\nCollection",
    mainImage: "/images/hero.png",
    secondaryImage: "/images/cat_outdoor.png",
    productsText: "Dovetail joinery, clean lines + iconic tapered legs show off the best of mid-century style.",
    productsTitle: null,
    products: [
      { id: "wil-1", name: "Williams 2-Drawer Nightstand", price: "259", originalPrice: "319", extraText: "Free 3-Day Delivery", badge: null, image: "/images/hero.png" },
      { id: "wil-2", name: "Williams 2-Drawer Nightstand with Shelf", price: "309", originalPrice: "349", badge: null, image: "/images/cat_outdoor.png" },
      { id: "wil-3", name: "Williams 7-Drawer Dresser", price: "1,199", originalPrice: "1,499", badge: null, image: "/images/cat_living_room.png" },
      { id: "wil-4", name: "Williams 2-Drawer Mini Nightstand", price: "259", originalPrice: "299", badge: null, image: "/images/cat_bedroom.png" },
      { id: "wil-5", name: "Williams Upholstered Bed", price: "849", originalPrice: "899", badge: null, image: "/images/cat_dining.png" },
    ]
  }
];

export default function BedroomCollectionsPage() {
  return (
    <>
      <main className="bg-white">
        {/* Hero Section */}
        <section className="bg-white pt-14 pb-16 px-4 border-b border-[#e5e5e5]">
          <div className="mx-auto max-w-[1400px]">
            <div className="mb-2">
              <span className="text-[14px] md:text-[16px] font-bold text-[#1f1d24] uppercase tracking-wider">
                EXPERTLY CURATED:
              </span>
            </div>
            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between">
              <h1 className="text-[52px] md:text-[76px] font-bold text-[#1f1d24] leading-[1.05] tracking-tight">
                Bedroom Collections
              </h1>
              <span className="text-[24px] md:text-[32px] font-bold text-[#1f1d24] mt-2 md:mt-0 tracking-tight">
                (Rest easy.)
              </span>
            </div>
          </div>
        </section>

        {/* Collections */}
        <section className="mx-auto max-w-[1440px] px-0 md:px-6 py-12 md:py-16">
          <div className="flex flex-col gap-16 md:gap-24">
            {collectionsData.map((collection) => (
              <div key={collection.id} className="flex flex-col">
                
                {/* Collection Split Hero */}
                <div className="flex flex-col md:flex-row md:min-h-[500px] lg:min-h-[560px] overflow-hidden mb-6">
                  {/* Left Side (Image) */}
                  <div className="relative w-full md:w-[68%] h-[350px] md:h-auto group cursor-pointer overflow-hidden">
                    <Image src={collection.mainImage} alt={collection.title.replace('\n', ' ')} fill className="object-cover transition duration-700 group-hover:scale-[1.02]" />
                  </div>
                  {/* Right Side (Text & Secondary Image) */}
                  <div className="relative w-full md:w-[32%] bg-[#FAF9F6] p-8 md:px-10 md:py-12 flex flex-col justify-between items-start">
                    <h2 className="text-[42px] sm:text-[48px] lg:text-[54px] font-bold text-[#1f1d24] leading-[1.05] tracking-[-0.02em] whitespace-pre-line mb-8">
                      {collection.title}
                    </h2>
                    <div className="w-full flex flex-col gap-4 mt-auto">
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#EAE8E4] group cursor-pointer">
                        <Image src={collection.secondaryImage} alt={`${collection.title.replace('\n', ' ')} detail`} fill className="object-cover transition duration-700 group-hover:scale-[1.03]" />
                        <button className="absolute bottom-3 right-3 w-8 h-8 bg-white border border-[#c8ceda] flex items-center justify-center text-[#1f1d24] hover:bg-[#f4f4f4] transition shadow-sm" aria-label="Expand">
                          <ChevronUp className="w-5 h-5 stroke-[1.5]" />
                        </button>
                      </div>
                      <Link href={`#shop-${collection.id}`} className="flex items-center justify-between w-full border border-[#1f1d24] bg-white py-3.5 px-5 text-[14px] font-bold text-[#1f1d24] transition hover:bg-[#1f1d24] hover:text-white uppercase tracking-[0.05em] group">
                        SHOP THE COLLECTION
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Collection Products */}
                {collection.products.length > 0 && (
                  <div id={`shop-${collection.id}`} className="px-4 md:px-0">
                    <div className="mb-8 flex justify-center text-center">
                      {collection.productsText && (
                        <p className="text-[17px] font-bold text-[#1f1d24]">{collection.productsText}</p>
                      )}
                    </div>

                    <div className="relative group/slider">
                      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x justify-center">
                        {collection.products.map((p) => (
                          <div key={p.id} className="group relative flex flex-col min-w-[210px] w-[210px] md:min-w-[250px] md:w-[250px] shrink-0 snap-start">
                            <div className="relative aspect-square w-full bg-[#f4f4f4] mb-3 overflow-hidden cursor-pointer">
                              <Image src={p.image} alt={p.name.replace('\n', ' ')} fill className="object-cover mix-blend-multiply transition duration-500 group-hover:scale-[1.03]" />
                              {p.badge && (
                                <div className="absolute bottom-0 left-0 bg-[#A63517] px-2 py-0.5 text-[11px] font-bold text-white z-10">
                                  {p.badge}
                                </div>
                              )}
                            </div>
                            <h4 className="text-[13px] leading-[1.3] text-[#1f1d24] group-hover:underline whitespace-pre-line cursor-pointer mb-1.5 font-medium">{p.name}</h4>
                            <div className="mt-auto flex flex-wrap items-baseline gap-1.5">
                              <span className="text-[13px] text-[#A63517] font-bold">${p.price}</span>
                              {p.originalPrice && <span className="text-[12px] text-[#717171] line-through">${p.originalPrice}</span>}
                            </div>
                            {(p as any).extraText && <span className="text-[12px] text-[#717171] mt-0.5">{(p as any).extraText}</span>}
                          </div>
                        ))}
                      </div>
                      
                      {/* Optional: Add a right scroll chevron (visible on hover) */}
                      <button className="absolute right-0 top-[35%] -translate-y-1/2 w-10 h-10 bg-white border border-[#c8ceda] shadow-md flex items-center justify-center opacity-0 group-hover/slider:opacity-100 transition hover:bg-[#f4f4f4]">
                         <ChevronRight className="w-6 h-6 text-[#1f1d24] stroke-[1.5]" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
