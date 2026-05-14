import Image from "next/image";
import Link from "next/link";
import { ChevronUp, ArrowRight, ChevronRight } from "lucide-react";

const collectionsData = [
  {
    id: "daylen",
    title: "Daylen\nCollection",
    mainImage: "/images/cat_living_room.png",
    secondaryImage: "/images/cat_bedroom.png",
    productsText: "Soft upholstery + removable covers bring a new layer of ease to mid-century style.",
    productsTitle: null,
    products: [
      { id: "daylen-1", name: "Daylen 86\" Upholstered Sofa", price: "1,049", originalPrice: "1,249", badge: null, image: "/images/cat_living_room.png" },
      { id: "daylen-2", name: "Daylen 2 - Piece Genuine Leather\nReversible L-Sectional", price: "2,399", originalPrice: "2,599", badge: null, image: "/images/cat_bedroom.png" },
      { id: "daylen-3", name: "Daylen Upholstered Armchair", price: "549", originalPrice: "579", extraText: "Free Fast Delivery", badge: null, image: "/images/cat_outdoor.png" },
      { id: "daylen-4", name: "Daylen Upholstered Armchair", price: "1,049", originalPrice: "1,199", badge: null, image: "/images/cat_dining.png" },
      { id: "daylen-5", name: "Daylen 2-Piece Upholstered Reversible\nL-Sectional", price: "1,199", originalPrice: "1,399", badge: null, image: "/images/hero.png" },
    ]
  },
  {
    id: "morrell",
    title: "Morrell\nCollection",
    mainImage: "/images/hero.png",
    secondaryImage: "/images/cat_living_room.png",
    productsText: "Modular forms + smooth curves let minimalist sophistication join movie night.",
    productsTitle: null,
    products: [
      { id: "morrell-1", name: "Morrell 5 - Piece Upholstered Reversible\nL-Sectional", price: "3,399", originalPrice: "4,299", badge: null, image: "/images/cat_living_room.png" },
      { id: "morrell-2", name: "Morrell 3 - Piece Genuine Leather Sofa", price: "2,899", originalPrice: "3,499", badge: null, image: "/images/cat_bedroom.png" },
      { id: "morrell-3", name: "Morrell Genuine Leather Sofa", price: "2,098", originalPrice: "2,499", badge: null, image: "/images/cat_outdoor.png" },
    ]
  },
  {
    id: "rae-leather",
    title: "Rae\nCollection",
    mainImage: "/images/cat_bedroom.png",
    secondaryImage: "/images/cat_outdoor.png",
    productsText: "A new leather finish + sleek metal legs bring an elevated edge to the best-selling collection.",
    productsTitle: null,
    products: [
      { id: "rae-l-1", name: "Rae Genuine Leather Upholstered Sofa", price: "2,299", originalPrice: null, badge: null, image: "/images/cat_bedroom.png" },
      { id: "rae-l-2", name: "Rae Genuine Leather Upholstered Armchair", price: "1,099", originalPrice: "1,249", extraText: "Free 3-Day Delivery", badge: null, image: "/images/cat_living_room.png" },
    ]
  },
  {
    id: "rae-fabric",
    title: "Rae\nCollection",
    mainImage: "/images/cat_outdoor.png",
    secondaryImage: "/images/cat_dining.png",
    productsText: "Sleek metal legs + water-resistant fabric infuse elevated style into laid-back lounging.",
    productsTitle: null,
    products: [
      { id: "rae-f-1", name: "Rae Upholstered Armchair", price: "849", originalPrice: "949", extraText: "Free 3-Day Delivery", badge: null, image: "/images/cat_living_room.png" },
      { id: "rae-f-2", name: "Rae Upholstered Armchair (Set of 2)", price: "1,398", originalPrice: "1,599", badge: null, image: "/images/cat_bedroom.png" },
      { id: "rae-f-3", name: "Rae 84\" Upholstered Sofa", price: "1,499", originalPrice: "1,699", badge: null, image: "/images/cat_outdoor.png" },
      { id: "rae-f-4", name: "Rae Genuine Leather Upholstered Sofa", price: "2,299", originalPrice: null, badge: null, image: "/images/cat_dining.png" },
      { id: "rae-f-5", name: "Rae 60\" Upholstered Loveseat", price: "1,299", originalPrice: null, badge: null, image: "/images/hero.png" },
    ]
  },
  {
    id: "kallie",
    title: "Kallie\nCollection",
    mainImage: "/images/hero.png",
    secondaryImage: "/images/cat_living_room.png",
    productsText: null,
    productsTitle: null,
    products: []
  }
];

export default function SofaSectionalCollectionsPage() {
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
                Sofa + Sectional Collections
              </h1>
              <span className="text-[24px] md:text-[32px] font-bold text-[#1f1d24] mt-2 md:mt-0 tracking-tight">
                (Get comfortable.)
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
